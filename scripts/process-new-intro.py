import os
import sys
import wave
import time
import subprocess
import cv2
import numpy as np
from PIL import Image
from rembg import remove, new_session

def main():
    input_video = "intro.mp4"
    output_dir = "public"
    hero_dir = os.path.join(output_dir, "hero")
    os.makedirs(hero_dir, exist_ok=True)
    os.makedirs("scratch", exist_ok=True)

    w, h = 768, 960
    fps = 24
    crop_spec = "848:1060:535:10"
    xfade = 0.5

    # 1. Inspect duration of intro.mp4
    probe_cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        input_video
    ]
    duration = float(subprocess.check_output(probe_cmd).decode().strip())
    print(f"New intro.mp4 duration: {duration:.3f}s")

    t_end = min(duration, 10.0)
    loop_duration = t_end - xfade
    offset = loop_duration - xfade

    # 2. Seamless Audio Generation
    print("Extracting and cross-fading audio...")
    audio_cmd = [
        "ffmpeg", "-y", "-i", input_video,
        "-t", str(t_end),
        "-vn", "-f", "f32le", "-ar", "48000", "-ac", "2", "pipe:1"
    ]
    proc = subprocess.Popen(audio_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw_audio, _ = proc.communicate()

    audio = np.frombuffer(raw_audio, dtype=np.float32).reshape(-1, 2)
    n_xfade = int(xfade * 48000)
    main_audio = audio[n_xfade:].copy()
    head_audio = audio[:n_xfade].copy()

    t = np.linspace(0.0, 1.0, n_xfade, endpoint=False)[:, None]
    main_audio[-n_xfade:] = main_audio[-n_xfade:] * (1.0 - t) + head_audio * t

    temp_wav = os.path.join("scratch", "new_loop_audio.wav")
    audio_int16 = np.clip(main_audio * 32767.0, -32768, 32767).astype(np.int16)
    with wave.open(temp_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(48000)
        wf.writeframes(audio_int16.tobytes())
    print("Seamless audio ready.")

    # 3. Create intermediate cropped looped video
    inter_mp4 = os.path.join("scratch", "intermediate_loop.mp4")
    crop_filter = f"crop={crop_spec},scale={w}:{h}"
    filter_complex = (
        f"[0:v]{crop_filter},split=2[v_all1][v_all2];"
        f"[v_all1]trim=start={xfade}:end={t_end},setpts=PTS-STARTPTS[v_main];"
        f"[v_all2]trim=start=0:end={xfade},setpts=PTS-STARTPTS[v_head];"
        f"[v_main][v_head]xfade=transition=fade:duration={xfade}:offset={offset},format=yuv420p[v_out]"
    )

    print("Encoding intermediate cropped looped video...")
    loop_cmd = [
        "ffmpeg", "-y",
        "-i", input_video,
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "fast",
        inter_mp4
    ]
    subprocess.run(loop_cmd, check=True)

    # 4. Extract portrait bust (head to shirt crop) at 480x600 and og.jpg
    print("Generating portrait-bust.webp and og.jpg from new video...")
    still_png = os.path.join("scratch", "new_bust_frame.png")
    subprocess.run([
        "ffmpeg", "-y",
        "-ss", "00:00:01.00",
        "-i", inter_mp4,
        "-vframes", "1",
        still_png
    ], check=True)

    still_img = Image.open(still_png)
    # Bust crop from 768x960: center x 384, y from 30 to 510
    bust_crop = (384 - 190, 30, 384 + 190, 510)
    bust = still_img.crop(bust_crop).resize((480, 600), Image.Resampling.LANCZOS)
    out_bust = os.path.join(output_dir, "portrait-bust.webp")
    bust.save(out_bust, "WEBP", quality=92)

    og_img = Image.new("RGB", (1200, 630), (244, 242, 238)) # #f4f2ee
    bust_og = bust.resize((384, 480), Image.Resampling.LANCZOS)
    og_img.paste(bust_og, (720, 75))
    out_og = os.path.join(output_dir, "og.jpg")
    og_img.save(out_og, "JPEG", quality=90)
    print("Bust still and OG image updated.")

    # 5. Process AI background segmentation + edge defringing
    out_webm = os.path.join(hero_dir, "hero.webm")
    out_mp4 = os.path.join(hero_dir, "hero.mp4")

    # Decoder
    dec_cmd = [
        "ffmpeg", "-y",
        "-i", inter_mp4,
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "pipe:1"
    ]
    dec_proc = subprocess.Popen(dec_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # Transparent WebM encoder
    webm_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgba",
        "-s", f"{w}x{h}",
        "-r", str(fps),
        "-i", "pipe:0",
        "-i", temp_wav,
        "-c:v", "libvpx-vp9",
        "-pix_fmt", "yuva420p",
        "-metadata:s:v:0", "alpha_mode=1",
        "-crf", "26",
        "-b:v", "1.6M",
        "-c:a", "libopus",
        "-b:a", "96k",
        "-shortest",
        out_webm
    ]
    webm_proc = subprocess.Popen(webm_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # Composited fallback MP4 encoder (pre-composited over #f4f2ee)
    mp4_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{w}x{h}",
        "-r", str(fps),
        "-i", "pipe:0",
        "-i", temp_wav,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-shortest",
        out_mp4
    ]
    mp4_proc = subprocess.Popen(mp4_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    print("Initializing u2net_human_seg model for segmentation...")
    session = new_session("u2net_human_seg")

    frame_bytes = w * h * 3
    frame_idx = 0
    t0 = time.time()
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    bg_color = np.array([244, 242, 238], dtype=np.float32) # #f4f2ee

    print("Processing all frames of the new video with AI human segmentation + defringing...")

    while True:
        raw = dec_proc.stdout.read(frame_bytes)
        if not raw or len(raw) < frame_bytes:
            break

        img = Image.frombytes("RGB", (w, h), raw)

        # AI cutout
        raw_rgba = np.array(remove(img, session=session))
        rgb = raw_rgba[:, :, :3]
        alpha = raw_rgba[:, :, 3]

        # Erode 1px to eliminate dark wall shadow edge
        eroded_alpha = cv2.erode(alpha, kernel, iterations=1)
        smooth_alpha = cv2.GaussianBlur(eroded_alpha, (3, 3), 1.0)

        # Inpaint boundary pixels from foreground to eliminate black outline
        inpaint_mask = ((smooth_alpha > 0) & (smooth_alpha <= 210)).astype(np.uint8) * 255
        clean_rgb = cv2.inpaint(rgb, inpaint_mask, 3, cv2.INPAINT_TELEA)

        # RGBA for WebM
        clean_rgba = np.zeros_like(raw_rgba)
        clean_rgba[:, :, :3] = clean_rgb
        clean_rgba[:, :, 3] = smooth_alpha
        webm_proc.stdin.write(clean_rgba.tobytes())

        # Composite RGB for fallback MP4
        a_norm = (smooth_alpha.astype(np.float32) / 255.0)[:, :, None]
        comp_rgb = (clean_rgb.astype(np.float32) * a_norm + bg_color * (1.0 - a_norm)).astype(np.uint8)
        mp4_proc.stdin.write(comp_rgb.tobytes())

        frame_idx += 1
        if frame_idx % 12 == 0:
            elapsed = time.time() - t0
            fps_proc = frame_idx / elapsed
            print(f"Processed {frame_idx} frames ({frame_idx/fps:.1f}s) in {elapsed:.1f}s ({fps_proc:.2f} fps)...")

    dec_proc.stdout.close()
    dec_proc.wait()

    webm_proc.stdin.close()
    webm_proc.wait()

    mp4_proc.stdin.close()
    mp4_proc.wait()

    print(f"\nAll complete! Processed {frame_idx} frames in {time.time()-t0:.1f}s.")
    print(f"Generated: {out_webm}")
    print(f"Generated: {out_mp4}")
    print(f"Generated: {out_bust}")
    print(f"Generated: {out_og}")

if __name__ == "__main__":
    main()
