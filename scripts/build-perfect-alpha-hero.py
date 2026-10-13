import os
import subprocess
import time
import cv2
import numpy as np
from PIL import Image
from rembg import remove, new_session

def main():
    input_video = "public/hero/hero.mp4"
    audio_file = "scratch/loop_audio.m4a"
    out_webm = "public/hero/hero.webm"

    w, h = 768, 960
    fps = 24

    if not os.path.exists(audio_file):
        os.makedirs("scratch", exist_ok=True)
        subprocess.run(
            ["ffmpeg", "-y", "-i", input_video, "-vn", "-c:a", "copy", audio_file],
            check=True
        )

    # Decode video frames
    dec_cmd = [
        "ffmpeg", "-y",
        "-i", input_video,
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "pipe:1"
    ]
    dec_proc = subprocess.Popen(dec_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # Encode transparent WebM (VP9 yuva420p with alpha_mode=1)
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
        "-metadata:s:v:0", "alpha_mode=1",
        "-crf", "26",
        "-b:v", "1.6M",
        "-c:a", "libopus",
        "-b:a", "96k",
        "-shortest",
        out_webm
    ]
    webm_proc = subprocess.Popen(webm_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    print("Initializing u2net_human_seg model for pixel-perfect segmentation...")
    session = new_session("u2net_human_seg")

    frame_bytes = w * h * 3
    frame_idx = 0
    t0 = time.time()

    # Pre-build morphological kernel for alpha choke/defringe
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

    print("Processing video frames with AI human segmentation + edge defringing...")

    while True:
        raw = dec_proc.stdout.read(frame_bytes)
        if not raw or len(raw) < frame_bytes:
            break

        img = Image.frombytes("RGB", (w, h), raw)

        # AI human background removal
        raw_rgba_img = remove(img, session=session, only_mask=False)
        rgba = np.array(raw_rgba_img)

        rgb = rgba[:, :, :3]
        alpha = rgba[:, :, 3]

        # 1. Erode alpha mask by 1 iteration to strip away dark studio wall shadow fringe
        eroded_alpha = cv2.erode(alpha, kernel, iterations=1)

        # 2. Smooth edge with 1.0px Gaussian blur for liquid-smooth antialiasing
        smooth_alpha = cv2.GaussianBlur(eroded_alpha, (3, 3), 1.0)

        # 3. Defringe: inpaint boundary RGB pixels from interior solid foreground
        # This replaces dark shadow pixels with pure shirt / skin color so there is ZERO dark outline
        inpaint_mask = ((smooth_alpha > 0) & (smooth_alpha <= 210)).astype(np.uint8) * 255
        clean_rgb = cv2.inpaint(rgb, inpaint_mask, 3, cv2.INPAINT_TELEA)

        clean_rgba = np.zeros_like(rgba)
        clean_rgba[:, :, :3] = clean_rgb
        clean_rgba[:, :, 3] = smooth_alpha

        # Pipe RGBA raw bytes to WebM encoder
        webm_proc.stdin.write(clean_rgba.tobytes())

        frame_idx += 1
        if frame_idx % 12 == 0:
            elapsed = time.time() - t0
            fps_proc = frame_idx / elapsed
            print(f"Processed {frame_idx} frames ({frame_idx/fps:.1f}s) in {elapsed:.1f}s ({fps_proc:.2f} fps)...")

    dec_proc.stdout.close()
    dec_proc.wait()

    webm_proc.stdin.close()
    webm_proc.wait()

    print(f"Complete! Processed {frame_idx} frames in {time.time()-t0:.1f}s.")
    print(f"Saved defringed, silky-smooth transparent WebM: {out_webm}")

if __name__ == "__main__":
    main()
