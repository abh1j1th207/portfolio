#!/usr/bin/env python3
"""
Hero video processing pipeline for personal portfolio.
Turns input intro video into seamless looping hero.mp4 and hero.webm,
and exports portrait-bust.webp and og.jpg.
"""

import os
import sys
import shutil
import argparse
import subprocess
import numpy as np
from PIL import Image

def find_ffmpeg():
    # 1. Check PATH
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg:
        return ffmpeg
    # 2. Check WinGet Gyan.FFmpeg installation directory
    local_app_data = os.environ.get("LOCALAPPDATA", "")
    if local_app_data:
        winget_path = os.path.join(local_app_data, "Microsoft", "WinGet", "Packages")
        if os.path.exists(winget_path):
            for root, dirs, files in os.walk(winget_path):
                if "ffmpeg.exe" in files:
                    return os.path.join(root, "ffmpeg.exe")
    # 3. Check common program files
    for p in [r"C:\ffmpeg\bin\ffmpeg.exe", r"C:\Program Files\ffmpeg\bin\ffmpeg.exe"]:
        if os.path.exists(p):
            return p
    return "ffmpeg"

def find_ffprobe():
    ffprobe = shutil.which("ffprobe")
    if ffprobe:
        return ffprobe
    local_app_data = os.environ.get("LOCALAPPDATA", "")
    if local_app_data:
        winget_path = os.path.join(local_app_data, "Microsoft", "WinGet", "Packages")
        if os.path.exists(winget_path):
            for root, dirs, files in os.walk(winget_path):
                if "ffprobe.exe" in files:
                    return os.path.join(root, "ffprobe.exe")
    return "ffprobe"

def get_video_duration(ffprobe_path, video_file):
    cmd = [
        ffprobe_path, "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        video_file
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(res.stdout.strip())

def main():
    parser = argparse.ArgumentParser(description="Build hero video assets and stills.")
    parser.add_argument("--input", default="intro.mp4", help="Input intro video file")
    parser.add_argument("--output-dir", default="public", help="Output directory for assets")
    parser.add_argument("--crop", default="848:1060:510:15", help="Crop filter specification (w:h:x:y)")
    parser.add_argument("--xfade-duration", type=float, default=0.5, help="Crossfade duration in seconds")
    args = parser.parse_args()

    ffmpeg_bin = find_ffmpeg()
    ffprobe_bin = find_ffprobe()
    print(f"Using ffmpeg: {ffmpeg_bin}")
    print(f"Using ffprobe: {ffprobe_bin}")

    if not os.path.exists(args.input):
        print(f"Error: Input video '{args.input}' not found.")
        sys.exit(1)

    hero_dir = os.path.join(args.output_dir, "hero")
    os.makedirs(hero_dir, exist_ok=True)
    os.makedirs(args.output_dir, exist_ok=True)

    duration = get_video_duration(ffprobe_bin, args.input)
    print(f"Input video duration: {duration:.3f}s")

    xfade = args.xfade_duration
    t_end = min(duration, 10.0)
    loop_duration = t_end - xfade
    offset = loop_duration - xfade

    print(f"Loop params: duration={loop_duration:.3f}s, xfade={xfade:.3f}s, offset={offset:.3f}s")

    # 1. Process sample-accurate audio crossfade using numpy
    print("Extracting and cross-fading audio with numpy...")
    audio_cmd = [
        ffmpeg_bin, "-y", "-i", args.input,
        "-t", str(t_end),
        "-vn", "-f", "f32le", "-ar", "48000", "-ac", "2", "pipe:1"
    ]
    proc = subprocess.Popen(audio_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw_audio, err = proc.communicate()
    if proc.returncode != 0:
        print(f"Audio extraction error: {err.decode('utf-8', errors='ignore')}")
        sys.exit(1)

    audio = np.frombuffer(raw_audio, dtype=np.float32).reshape(-1, 2)
    n_xfade = int(xfade * 48000)

    # Main audio is from xfade to t_end
    main_audio = audio[n_xfade:].copy()
    head_audio = audio[:n_xfade].copy()

    # Smooth equal-power or linear ramp crossfade
    t = np.linspace(0.0, 1.0, n_xfade, endpoint=False)[:, None]
    fade_out = 1.0 - t
    fade_in = t
    main_audio[-n_xfade:] = main_audio[-n_xfade:] * fade_out + head_audio * fade_in

    temp_wav = os.path.join(hero_dir, "temp_loop_audio.wav")
    # Export seamless audio to temp wav
    import wave
    audio_int16 = np.clip(main_audio * 32767.0, -32768, 32767).astype(np.int16)
    with wave.open(temp_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(48000)
        wf.writeframes(audio_int16.tobytes())
    print("Seamless audio generated.")

    # 2. Build video filter complex
    # Crop tightly around person (head to toe), scale to 768x960, whiten background
    crop_filter = (
        f"crop={args.crop},"
        f"scale=768:960,"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    )

    filter_complex = (
        f"[0:v]{crop_filter},split=2[v_all1][v_all2];"
        f"[v_all1]trim=start={xfade}:end={t_end},setpts=PTS-STARTPTS[v_main];"
        f"[v_all2]trim=start=0:end={xfade},setpts=PTS-STARTPTS[v_head];"
        f"[v_main][v_head]xfade=transition=fade:duration={xfade}:offset={offset},format=yuv420p[v_out]"
    )

    # 3. Export hero.mp4: H.264 yuv420p video (CRF 24, -preset slow) with AAC audio at 96 kbps and +faststart
    out_mp4 = os.path.join(hero_dir, "hero.mp4")
    print(f"Encoding {out_mp4}...")
    mp4_cmd = [
        ffmpeg_bin, "-y",
        "-i", args.input,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-map", "1:a",
        "-c:v", "libx264",
        "-crf", "24",
        "-preset", "slow",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        out_mp4
    ]
    subprocess.run(mp4_cmd, check=True)
    print(f"Successfully generated {out_mp4}")

    # 4. Export hero.webm: VP9 video (CRF 36) with Opus audio at 80 kbps
    out_webm = os.path.join(hero_dir, "hero.webm")
    print(f"Encoding {out_webm}...")
    webm_cmd = [
        ffmpeg_bin, "-y",
        "-i", args.input,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-map", "1:a",
        "-c:v", "libvpx-vp9",
        "-crf", "36",
        "-b:v", "0",
        "-c:a", "libopus",
        "-b:a", "80k",
        out_webm
    ]
    subprocess.run(webm_cmd, check=True)
    print(f"Successfully generated {out_webm}")

    # Clean up temp wav
    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    # 5. Extract portrait still: head-to-shirt crop at 480x600 saved as portrait-bust.webp
    print("Generating portrait-bust.webp (480x600)...")
    still_frame_png = os.path.join(args.output_dir, "temp_frame.png")
    # Grab clear frame at t=1.0s
    grab_cmd = [
        ffmpeg_bin, "-y",
        "-ss", "00:00:01.00",
        "-i", args.input,
        "-vframes", "1",
        still_frame_png
    ]
    subprocess.run(grab_cmd, check=True)

    img = Image.open(still_frame_png)
    # Head to shirt crop: width 400, height 500 centered around 934, y from 15 to 515
    bust_crop = (934 - 200, 15, 934 + 200, 515)
    bust = img.crop(bust_crop).resize((480, 600), Image.Resampling.LANCZOS)
    out_bust = os.path.join(args.output_dir, "portrait-bust.webp")
    bust.save(out_bust, "WEBP", quality=92)
    print(f"Saved {out_bust}")

    # 6. Export og.jpg at 1200x630
    print("Generating og.jpg (1200x630)...")
    og_img = Image.new("RGB", (1200, 630), (244, 242, 238)) # #f4f2ee paper color
    # Paste centered bust on the right side, with elegant paper backdrop
    bust_for_og = bust.resize((384, 480), Image.Resampling.LANCZOS)
    # Paste on right
    og_img.paste(bust_for_og, (720, 75))
    out_og = os.path.join(args.output_dir, "og.jpg")
    og_img.save(out_og, "JPEG", quality=90)
    print(f"Saved {out_og}")

    # Also clean up temp png
    if os.path.exists(still_frame_png):
        os.remove(still_frame_png)

    print("\nHero video assets and stills build complete!")

if __name__ == "__main__":
    main()
