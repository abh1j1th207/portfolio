"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPingRing, setShowPingRing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with sound
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setShowPingRing(false);
        })
        .catch(() => {
          video.muted = true;
          video.play().catch(() => {});
          setIsMuted(true);
          setShowPingRing(true);
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
        setShowPingRing(false);
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      cleanupListeners();
    };
  }, []);

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
          if (video.paused) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        }
      },
      { threshold: [0, 0.35, 0.5, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
      setIsMuted(false);
      setShowPingRing(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  void isPlaying;

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
            height: "clamp(340px, 58svh, 960px)",
            maxWidth: "min(90vw, 768px)",
            aspectRatio: "768 / 960",
          }}
        >
          <video
            key="hero-video-v3"
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-none select-none relative"
            style={{ zIndex: 10 }}
          >
            <source src="/hero/hero.webm?v=v3_new_intro" type="video/webm" />
            <source src="/hero/hero.mp4?v=v3_new_intro" type="video/mp4" />
          </video>

          {/* Sound button */}
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
                onClick={toggleSound}
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
                aria-label={isMuted ? "Unmute video introduction" : "Mute video introduction"}
              >
                {isMuted ? (
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
