import os
import subprocess
import time
import cv2
import numpy as np

def main():
    input_video = "public/hero/hero.mp4"
    audio_file = "scratch/loop_audio.m4a"
    out_webm = "public/hero/hero.webm"

    w, h = 768, 960
    fps = 24

    # Extract audio if not present
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
        "-pix_fmt", "bgr24",
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
        "-crf", "28",
        "-b:v", "1.4M",
        "-c:a", "libopus",
        "-b:a", "96k",
        "-shortest",
        out_webm
    ]
    webm_proc = subprocess.Popen(webm_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    sw, sh = w // 2, h // 2
    frame_bytes = w * h * 3
    frame_idx = 0
    t0 = time.time()

    # Initial mask template
    base_mask = np.full((sh, sw), cv2.GC_BGD, dtype=np.uint8)
    # Probable foreground box around person
    base_mask[5:sh-5, int(sw*0.18):int(sw*0.82)] = cv2.GC_PR_FGD
    # Solid core of torso & head
    base_mask[20:int(sh*0.65), int(sw*0.35):int(sw*0.65)] = cv2.GC_FGD
    # Solid core of black trousers
    base_mask[int(sh*0.5):int(sh*0.9), int(sw*0.35):int(sw*0.65)] = cv2.GC_FGD

    prev_mask = base_mask.copy()
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    print("Generating alpha-matte video with GrabCut foreground preservation...")

    while True:
        raw = dec_proc.stdout.read(frame_bytes)
        if not raw or len(raw) < frame_bytes:
            break

        bgr = np.frombuffer(raw, dtype=np.uint8).reshape((h, w, 3))
        small = cv2.resize(bgr, (sw, sh))

        # Use previous mask to initialize current frame for smooth temporal tracking
        mask = prev_mask.copy()
        # Reinforce core seeds
        mask[20:int(sh*0.62), int(sw*0.36):int(sw*0.64)] = cv2.GC_FGD
        mask[int(sh*0.52):int(sh*0.88), int(sw*0.36):int(sw*0.64)] = cv2.GC_FGD
        mask[:5, :] = cv2.GC_BGD
        mask[:, :int(sw*0.15)] = cv2.GC_BGD
        mask[:, int(sw*0.85):] = cv2.GC_BGD

        cv2.grabCut(small, mask, None, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_MASK)
        prev_mask = mask.copy()

        fg = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)

        # Preserve shoes at bottom
        for y in range(int(sh*0.87), sh-4):
            for x in range(int(sw*0.25), int(sw*0.75)):
                if np.mean(small[y, x]) < 252:
                    fg[y, x] = 255

        # Upsample mask to full resolution
        fg_full = cv2.resize(fg, (w, h), interpolation=cv2.INTER_LINEAR)
        alpha = cv2.GaussianBlur(fg_full, (5, 5), 0)

        # Convert BGR to RGB
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

        # Combine RGB + Alpha
        rgba = np.zeros((h, w, 4), dtype=np.uint8)
        rgba[:, :, :3] = rgb
        rgba[:, :, 3] = alpha

        webm_proc.stdin.write(rgba.tobytes())

        frame_idx += 1
        if frame_idx % 24 == 0:
            print(f"Processed {frame_idx} frames ({frame_idx/fps:.1f}s) in {time.time()-t0:.1f}s...")

    dec_proc.stdout.close()
    dec_proc.wait()

    webm_proc.stdin.close()
    webm_proc.wait()

    print(f"Alpha video generation complete! Processed {frame_idx} frames in {time.time()-t0:.1f}s.")
    print(f"Saved transparent WebM: {out_webm}")

if __name__ == "__main__":
    main()
