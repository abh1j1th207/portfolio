"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const pendulumRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Physics-based pendulum swing with spring damping
  useEffect(() => {
    // On touch/mobile devices, disable JS mouse physics entirely to prevent iOS Safari 120Hz jitter/vibration
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsMobileDevice(isTouch);
    if (isTouch) return;

    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    const springK = 0.04;
    const damping = 0.88;
    let idleTime = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardContainerRef.current) return;
      const rect = cardContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = (e.clientX - centerX) / (window.innerWidth / 2);
      targetAngle = Math.max(-12, Math.min(12, dist * 12));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updatePhysics = () => {
      idleTime += 0.02;
      const idleSway = Math.sin(idleTime) * 1.2;
      const effectiveTarget = targetAngle + idleSway;

      const force = (effectiveTarget - currentAngle) * springK;
      velocity = velocity * damping + force;
      currentAngle += velocity;

      // Mutate ref transform directly to avoid React re-renders and transition conflicts
      if (pendulumRef.current) {
        pendulumRef.current.style.transform = `rotate(${currentAngle.toFixed(2)}deg)`;
      }
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-[var(--section-py)] bg-[#f4f2ee] border-t border-[#0d0d0d]/10 overflow-hidden"
    >
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .lanyard-strap {
          background: repeating-linear-gradient(
            0deg,
            #171717,
            #171717 6px,
            #262626 6px,
            #262626 12px
          );
        }
        .hologram-effect {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.4) 0%,
            rgba(200,200,200,0.1) 40%,
            rgba(180,180,180,0.5) 70%,
            rgba(255,255,255,0.2) 100%
          );
        }
        @keyframes gentleLanyardSway {
          0%, 100% {
            transform: rotate(-1.5deg);
          }
          50% {
            transform: rotate(1.5deg);
          }
        }
        .lanyard-sway-mobile {
          animation: gentleLanyardSway 5s ease-in-out infinite;
          transform-origin: top center;
          will-change: transform;
        }
      `}</style>

      <div className="section-container">
        {/* Section Heading Tag */}
        <div className="mb-12">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            <span>01 — Identity</span>
          </div>
          <h2
            id="about-heading"
            className="section-heading rv"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Engineering with <em>intent.</em>
          </h2>
        </div>

        {/* Three Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-10 items-stretch">
          {/* Left Column: Summary & CTAs */}
          <div
            className="flex flex-col justify-between p-8 rounded-[28px] bg-white border border-[#0d0d0d]/10 shadow-[0_4px_24px_rgba(13,13,13,0.03)] rv"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <div className="space-y-6">
              <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block">
                Overview &amp; Philosophy
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="text-base text-[#3a3a3a] leading-relaxed">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-sm text-[#77756f] leading-relaxed pt-2 border-t border-[#0d0d0d]/10">
                {PROFILE.secondarySummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-8">
              <a
                href={PROFILE.resumePath}
                download
                className="btn-primary text-xs"
              >
                Résumé ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            ref={cardContainerRef}
            className="flex flex-col items-center justify-start relative pt-0 select-none rv"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {/* Hanging Lanyard Strap (30x56 px with scrolling text and metal clip) */}
            <div className="flex flex-col items-center z-20">
              <div className="w-[30px] h-[56px] rounded-t-sm lanyard-strap relative overflow-hidden flex items-center justify-center border-x border-[#0d0d0d]/30 shadow-sm">
                <span className="text-[7px] text-[#a9a6a0] font-mono tracking-widest uppercase rotate-90 whitespace-nowrap">
                  DEV · {PROFILE.name.toUpperCase()}
                </span>
              </div>
              {/* Metal Buckle Clip */}
              <div className="w-[20px] h-[10px] bg-[#3a3a3a] rounded-sm border border-[#171717] relative shadow-md">
                <div className="w-[8px] h-[3px] bg-[#a9a6a0] mx-auto mt-[2px] rounded-xs" />
              </div>
            </div>

            {/* Pendulum Swinging Wrapper */}
            <div
              ref={pendulumRef}
              className={`relative mt-1 origin-top ${
                isMobileDevice ? "lanyard-sway-mobile" : ""
              }`}
            >
              {/* 3D Flip Card Container */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press Enter to flip."
                onKeyDown={handleKeyDown}
                onClick={() => setIsFlipped((prev) => !prev)}
                onMouseEnter={() => {
                  if (!isMobileDevice && window.matchMedia("(hover: hover)").matches) {
                    setIsFlipped(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobileDevice && window.matchMedia("(hover: hover)").matches) {
                    setIsFlipped(false);
                  }
                }}
                className="perspective-1000 cursor-pointer w-[300px] max-w-[calc(100vw-3rem)] h-[404px] outline-none"
              >
                <div
                  className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-[#0d0d0d]/15 shadow-[0_16px_40px_rgba(13,13,13,0.08)] p-5 flex flex-col justify-between backface-hidden">
                    {/* Black top band reading "DEVELOPER ID" */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#0d0d0d]/10">
                      <div className="px-2.5 py-1 rounded-md bg-[#0d0d0d] text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                        DEVELOPER ID
                      </div>
                      <span className="font-mono text-[10px] text-[#77756f]">
                        {PROFILE.validTill}
                      </span>
                    </div>

                    {/* Portrait Photo in 128x156 Frame */}
                    <div className="relative mx-auto my-2 w-[128px] h-[156px] rounded-2xl overflow-hidden p-[2px] bg-gradient-to-b from-[#e9e6e0] to-[#a9a6a0] shadow-sm group">
                      <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-[#f4f2ee]">
                        <Image
                          src="/image.jpg"
                          alt="Portrait photo of Abhijith C, Full-Stack and Frontend Developer"
                          fill
                          sizes="128px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Name, Role & Fields */}
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-[#0d0d0d] tracking-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="text-xs text-[#77756f] font-medium">
                        {PROFILE.role}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1 py-2 px-3 bg-[#f4f2ee] rounded-xl text-center font-mono text-[9px] text-[#3a3a3a]">
                      <div>
                        <span className="text-[#77756f] block">ID NO</span>
                        <span className="font-bold">{PROFILE.idNo}</span>
                      </div>
                      <div>
                        <span className="text-[#77756f] block">DEPT</span>
                        <span className="font-bold">ENG</span>
                      </div>
                      <div>
                        <span className="text-[#77756f] block">VALID</span>
                        <span className="font-bold">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Bottom Barcode & Hologram */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#0d0d0d]/10">
                      {/* Stylized Grayscale Barcode */}
                      <div className="flex items-end gap-[2px] h-6">
                        {[4, 12, 6, 16, 8, 14, 5, 10, 16, 6, 12, 4, 15, 8, 10, 6, 14].map((h, i) => (
                          <div
                            key={i}
                            className="w-[2px] bg-[#0d0d0d]"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>

                      {/* Holographic Sticker in grays */}
                      <div className="w-9 h-6 rounded-md hologram-effect border border-white/60 shadow-inner flex items-center justify-center">
                        <span className="text-[8px] font-mono font-bold text-[#3a3a3a]/80">
                          AUTH
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#0d0d0d] text-white border border-[#3a3a3a] shadow-[0_16px_40px_rgba(13,13,13,0.12)] p-6 flex flex-col justify-between rotate-y-180 backface-hidden">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/20 pb-2">
                        <span className="font-mono text-[10px] tracking-widest text-[#a9a6a0] uppercase">
                          WHAT I AM
                        </span>
                        <span className="font-mono text-[10px] text-[#a9a6a0]">
                          SECURITY PASS
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs text-[#e9e6e0] font-sans">
                        <div className="flex items-start gap-2">
                          <span className="text-[#a9a6a0] font-mono">01.</span>
                          <span>B.Tech in Computer Science &amp; Engineering (2019–2023)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#a9a6a0] font-mono">02.</span>
                          <span>Architect of 6-Tier Hierarchical RBAC &amp; Passkey Auth</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#a9a6a0] font-mono">03.</span>
                          <span>3-Tier Employee Lifecycle Automated Payroll Engine</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#a9a6a0] font-mono">04.</span>
                          <span>Sutherland Top Performer &amp; +25% Satisfaction</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/15 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-[#a9a6a0] font-mono">
                        <span>SIGNATURE</span>
                        <span className="font-serif italic text-white text-sm">
                          Abhijith C.
                        </span>
                      </div>
                      <p className="text-[10px] text-[#77756f] text-center font-mono">
                        If found, say hello · {PROFILE.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div
            className="flex flex-col justify-between p-8 rounded-[28px] bg-white border border-[#0d0d0d]/10 shadow-[0_4px_24px_rgba(13,13,13,0.03)] rv"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <div>
              <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-6">
                Quick Facts
              </span>
              <div className="space-y-4 text-sm divide-y divide-[#0d0d0d]/10">
                <div className="pt-2 flex justify-between items-baseline gap-4">
                  <span className="text-[#77756f] font-mono text-xs">Location</span>
                  <span className="font-medium text-[#0d0d0d] text-right">{PROFILE.location}</span>
                </div>
                <div className="pt-3 flex justify-between items-baseline gap-4">
                  <span className="text-[#77756f] font-mono text-xs">Education</span>
                  <span className="font-medium text-[#0d0d0d] text-right">B.Tech CSE (2019–2023)</span>
                </div>
                <div className="pt-3 flex justify-between items-baseline gap-4">
                  <span className="text-[#77756f] font-mono text-xs">Role</span>
                  <span className="font-medium text-[#0d0d0d] text-right">IT Executive · Sunfocuz</span>
                </div>
                <div className="pt-3 flex justify-between items-baseline gap-4">
                  <span className="text-[#77756f] font-mono text-xs">Email</span>
                  <span className="font-medium text-[#0d0d0d] text-right break-all">{PROFILE.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#0d0d0d]/10">
              <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-2">
                Core Principle
              </span>
              <blockquote className="text-sm font-serif italic text-[#3a3a3a] leading-relaxed">
                &ldquo;{PROFILE.shortQuote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
