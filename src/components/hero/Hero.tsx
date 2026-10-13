"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [showPingRing, setShowPingRing] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("/hero/hero.mp4?v=v4_ios_clean");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Apple devices (iPhone, iPad, Safari) do not support VP9 alpha in WebM and render transparent pixels as solid black.
    // Defaulting to hero.mp4 provides a clean, pre-composited #f4f2ee background with zero black box.
    // For Chromium/Firefox/Edge on Windows/Android/Mac, we upgrade to hero.webm for native alpha transparency.
    const isApple =
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)));

    if (!isApple) {
      setVideoSrc("/hero/hero.webm?v=v4_clean");
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video with sound immediately from 0.56s (speech beginning)
    try {
      if (video.currentTime < 0.56) {
        video.currentTime = 0.56;
      }
    } catch {}

    video.muted = false;
    const playPromise = video.play();

    let removeListeners: (() => void) | null = null;

    const onPlaySuccess = () => {
      setIsMuted(false);
      setShowPingRing(false);
      if (removeListeners) {
        removeListeners();
        removeListeners = null;
      }
    };

    if (playPromise !== undefined) {
      playPromise
        .then(onPlaySuccess)
        .catch(() => {
          // If the browser policy temporarily blocks sound before interaction,
          // keep video playing and automatically unmute on ANY user presence or activity
          // (such as moving the mouse, scrolling, wheel, or touching anywhere)
          video.muted = true;
          video.play().catch(() => {});
          setIsMuted(true);
          setShowPingRing(true);

          const attemptAutoUnmute = (e?: Event) => {
            const target = e?.target as HTMLElement | null;
            if (target?.closest?.("#hero-sound-btn")) {
              cleanup();
              return;
            }

            if (videoRef.current && videoRef.current.muted) {
              if (videoRef.current.currentTime > 1.2 || videoRef.current.currentTime < 0.56) {
                videoRef.current.currentTime = 0.56;
              }
              videoRef.current.muted = false;
              videoRef.current
                .play()
                .then(() => {
                  onPlaySuccess();
                })
                .catch(() => {
                  // Keep listening until permission is unlocked
                });
            }
          };

          const cleanup = () => {
            window.removeEventListener("mousemove", attemptAutoUnmute);
            window.removeEventListener("pointermove", attemptAutoUnmute);
            window.removeEventListener("wheel", attemptAutoUnmute);
            window.removeEventListener("scroll", attemptAutoUnmute);
            window.removeEventListener("pointerdown", attemptAutoUnmute);
            window.removeEventListener("touchstart", attemptAutoUnmute);
            window.removeEventListener("keydown", attemptAutoUnmute);
          };

          removeListeners = cleanup;

          window.addEventListener("mousemove", attemptAutoUnmute, { passive: true });
          window.addEventListener("pointermove", attemptAutoUnmute, { passive: true });
          window.addEventListener("wheel", attemptAutoUnmute, { passive: true });
          window.addEventListener("scroll", attemptAutoUnmute, { passive: true });
          window.addEventListener("pointerdown", attemptAutoUnmute, { passive: true });
          window.addEventListener("touchstart", attemptAutoUnmute, { passive: true });
          window.addEventListener("keydown", attemptAutoUnmute, { passive: true });
        });
    }

    return () => {
      if (removeListeners) {
        removeListeners();
      }
    };
  }, [videoSrc]);

  // Pause when less than 35% of the hero is visible
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else {
          // Only auto-resume if it hasn't finished its initial one-time play
          if (video.paused && !video.ended && !hasEnded) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        }
      },
      { threshold: [0, 0.35, 0.5, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [hasEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended || hasEnded) {
      // Replay from speech start if video finished or near the end
      if (hasEnded || video.ended || video.currentTime >= video.duration - 0.5) {
        video.currentTime = 0.56;
      }
      video.muted = false;
      setIsMuted(false);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasEnded(false);
          setShowPingRing(false);
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#f4f2ee]"
    >
      <style>{`
        /* Solid filled, muted warm-gray giant typography sitting BEHIND person */
        .ghost-name {
          color: #e4e0d7;
          font-family: var(--font-display);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.055em;
          user-select: none;
          pointer-events: none;
        }

        @keyframes softPing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .ping-ring {
          animation: softPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Giant solid name — positioned at z-1, BEHIND the person */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden max-w-full px-2"
        style={{ zIndex: 1 }}
      >
        <span
          className={`ghost-name text-[clamp(4rem,18vw,20rem)] uppercase text-center select-none transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Video area — Person standing on z-10, IN FRONT OF the name */}
      <div
        className="flex-1 flex items-center justify-center my-auto relative w-full px-2 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          className="relative max-w-full"
          style={{
            width: "auto",
            height: "clamp(280px, 50svh, 920px)",
            maxWidth: "min(90vw, 768px)",
            aspectRatio: "768 / 960",
          }}
        >
          <video
            key={videoSrc}
            ref={videoRef}
            autoPlay
            playsInline
            preload="auto"
            onPlay={() => {
              setIsPlaying(true);
              setHasEnded(false);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setHasEnded(true);
              setShowPingRing(true);
            }}
            className="w-full h-full object-contain pointer-events-none select-none relative"
            style={{ zIndex: 10 }}
          >
            <source
              src={videoSrc}
              type={videoSrc.includes(".webm") ? "video/webm" : "video/mp4"}
            />
          </video>

          {/* Play/Pause Button */}
          <div style={{ position: "absolute", bottom: "1rem", right: "1rem", zIndex: 30 }}>
            <div style={{ position: "relative" }}>
              {showPingRing && (
                <div
                  className="ping-ring"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    backgroundColor: "#0d0d0d",
                    width: 46,
                    height: 46,
                    pointerEvents: "none",
                  }}
                />
              )}
              <button
                id="hero-sound-btn"
                type="button"
                onClick={togglePlay}
                style={{
                  position: "relative",
                  width: 46,
                  height: 46,
                  borderRadius: "9999px",
                  backgroundColor: "#0d0d0d",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                aria-label={!isPlaying || hasEnded ? "Play video introduction" : "Pause video introduction"}
              >
                {!isPlaying || hasEnded ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginLeft: 2 }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Info & CTAs — on z-20 */}
      <div
        className="relative w-full max-w-[1320px] mx-auto px-[var(--gutter)] pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        style={{ zIndex: 20 }}
      >
        <div>
          <div className="section-tag hero-fade" style={{ "--i": 0 } as React.CSSProperties}>
            <span>00 — Introduction</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.045em] leading-[1.02] text-[#0d0d0d] hero-fade"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {PROFILE.role.split("&")[0].trim()}{" "}
            <em className="font-serif italic font-normal text-[#77756f]">Developer.</em>
          </h1>
        </div>

        <div
          className="flex flex-wrap items-center gap-3 hero-fade"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <button onClick={() => scrollToTarget("#work")} className="btn-primary">
            Explore work
          </button>
          <button onClick={() => scrollToTarget("#contact")} className="btn-secondary">
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumePath}
            download
            className="btn-secondary"
            aria-label="Download Résumé PDF"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
