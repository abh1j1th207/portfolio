import os
import subprocess
import time
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def main():
    input_video = "public/hero/hero.mp4"
    out_webm = "public/hero/hero.webm"
    out_mp4 = "public/hero/hero.mp4"
    temp_mp4 = "scratch/temp_hero.mp4"
    audio_file = "scratch/loop_audio.m4a"

    w, h = 768, 960
    fps = 24
    bg_color = (244, 242, 238) # #f4f2ee

    # 1. Start ffmpeg decoder reading raw frames as rgb24
    dec_cmd = [
        "ffmpeg", "-y",
        "-i", input_video,
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "pipe:1"
    ]
    dec_proc = subprocess.Popen(dec_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # 2. Start ffmpeg encoder for transparent WebM (yuva420p, VP9, opus audio)
    webm_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgba",
        "-s", f"{w}x{h}",
        "-r", str(fps),
        "-i", "pipe:0",
        "-i", audio_file,
        "-c:v", "libvpx-vp9",
        "-pix_fmt", "yuva420p",
        "-crf", "30",
        "-b:v", "1.2M",
        "-c:a", "libopus",
        "-b:a", "96k",
        "-shortest",
        out_webm
    ]
    webm_proc = subprocess.Popen(webm_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # 3. Start ffmpeg encoder for MP4 (composited over #f4f2ee, H.264, AAC audio)
    mp4_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{w}x{h}",
        "-r", str(fps),
        "-i", "pipe:0",
        "-i", audio_file,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-shortest",
        temp_mp4
    ]
    mp4_proc = subprocess.Popen(mp4_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    frame_bytes = w * h * 3
    frame_idx = 0
    t0 = time.time()

    bg_arr = np.zeros((h, w, 3), dtype=np.uint8)
    bg_arr[:, :] = bg_color

    print("Processing frames with border-floodfill background removal...")

    while True:
        raw_frame = dec_proc.stdout.read(frame_bytes)
        if not raw_frame or len(raw_frame) < frame_bytes:
            break

        img = Image.frombytes("RGB", (w, h), raw_frame)

        # Downsample 2x for fast topological flood fill
        small = img.resize((w // 2, h // 2), Image.Resampling.BILINEAR).convert("RGBA")
        sw, sh = small.size

        # Flood fill from all 4 corners
        ImageDraw.floodfill(small, (0, 0), (0, 0, 0, 0), thresh=22)
        ImageDraw.floodfill(small, (sw - 1, 0), (0, 0, 0, 0), thresh=22)
        ImageDraw.floodfill(small, (0, sh - 1), (0, 0, 0, 0), thresh=22)
        ImageDraw.floodfill(small, (sw - 1, sh - 1), (0, 0, 0, 0), thresh=22)

        small_arr = np.array(small)
        mask_small = Image.fromarray(small_arr[:, :, 3], mode="L")
        mask_full = mask_small.resize((w, h), Image.Resampling.BILINEAR).filter(
            ImageFilter.GaussianBlur(radius=1.5)
        )

        # Alpha channel for WebM
        alpha_arr = np.array(mask_full)
        rgb_arr = np.array(img)

        rgba_arr = np.zeros((h, w, 4), dtype=np.uint8)
        rgba_arr[:, :, :3] = rgb_arr
        rgba_arr[:, :, 3] = alpha_arr

        # Composite over #f4f2ee for MP4
        alpha_norm = (alpha_arr.astype(np.float32) / 255.0)[:, :, None]
        composite_rgb = (rgb_arr.astype(np.float32) * alpha_norm + bg_arr.astype(np.float32) * (1.0 - alpha_norm)).astype(np.uint8)

        # Write to ffmpeg encoders
        webm_proc.stdin.write(rgba_arr.tobytes())
        mp4_proc.stdin.write(composite_rgb.tobytes())

        frame_idx += 1
        if frame_idx % 24 == 0:
            print(f"Processed {frame_idx} frames ({frame_idx/fps:.1f}s) in {time.time()-t0:.1f}s...")

    dec_proc.stdout.close()
    dec_proc.wait()

    webm_proc.stdin.close()
    webm_proc.wait()

    mp4_proc.stdin.close()
    mp4_proc.wait()

    # Replace original mp4 with newly composited mp4
    if os.path.exists(temp_mp4):
        if os.path.exists(out_mp4):
            os.remove(out_mp4)
        os.rename(temp_mp4, out_mp4)

    print(f"Done! Processed {frame_idx} frames in {time.time()-t0:.1f}s.")
    print(f"Generated transparent WebM: {out_webm}")
    print(f"Generated seamlessly blended MP4: {out_mp4}")

if __name__ == "__main__":
    main()
