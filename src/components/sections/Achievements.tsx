"use client";

import React, { useRef, useState, useEffect } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function CounterNumber({ item, isVisible }: { item: AchievementItem; isVisible: boolean }) {
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start: number | null = null;
    const duration = 1400; // 1.4s
    const target = item.number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(easeOutQuart(progress) * target);
      setDisplayNum(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayNum(target);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, item.number]);

  if (item.displayValue && !item.number) {
    return <span>{item.displayValue}</span>;
  }

  // Format big numbers like 1,000,000
  const formatted = displayNum.toLocaleString();

  return (
    <span>
      {item.numberPrefix || ""}
      {formatted}
      {item.numberSuffix || ""}
    </span>
  );
}

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [centeredCardIdx, setCenteredCardIdx] = useState(0);
  const [hasStartedScroll, setHasStartedScroll] = useState(false);
  const [maxDistance, setMaxDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile && trackRef.current) {
        const viewportWidth = window.innerWidth;
        const scrollWidth = trackRef.current.scrollWidth;
        const distance = Math.max(0, scrollWidth - viewportWidth + 64);
        setMaxDistance(distance);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 350);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Desktop pinned scroll handler
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.clientHeight - window.innerHeight;

      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
        setScrollProgress(progress);
        if (progress > 0.02) setHasStartedScroll(true);

        // Calculate which card is nearest the viewport center
        const cards = track.querySelectorAll(".achievement-card");
        let minDistance = Infinity;
        let nearestIdx = 0;
        const viewportCenterX = window.innerWidth / 2;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(viewportCenterX - cardCenterX);
          if (dist < minDistance) {
            minDistance = dist;
            nearestIdx = idx;
          }
        });

        setCenteredCardIdx(nearestIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Mobile horizontal swipe track listener
  const handleMobileTrackScroll = () => {
    if (!isMobile || !trackRef.current) return;
    const track = trackRef.current;
    const cards = track.querySelectorAll(".achievement-card");
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let minDistance = Infinity;
    let nearestIdx = 0;

    cards.forEach((card, idx) => {
      const cardEl = card as HTMLElement;
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const dist = Math.abs(trackCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = idx;
      }
    });

    setCenteredCardIdx(nearestIdx);
  };

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = track.querySelectorAll(".achievement-card");
    if (!cards[index]) return;

    const card = cards[index] as HTMLElement;

    if (isMobile) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setCenteredCardIdx(index);
      return;
    }

    const viewportWidth = window.innerWidth;
    const cardCenterInTrack = card.offsetLeft + card.offsetWidth / 2;
    const desiredTranslateX = Math.max(
      0,
      Math.min(maxDistance, cardCenterInTrack - viewportWidth / 2)
    );
    const progress = maxDistance > 0 ? desiredTranslateX / maxDistance : 0;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = container.clientHeight - window.innerHeight;
    const targetY = containerTop + progress * totalScrollable;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative bg-[#f4f2ee] border-t border-[#0d0d0d]/10 overflow-hidden"
      style={{
        // Desktop uses 360svh pinned scroll budget; mobile uses natural height without scroll-locking
        height: isMobile ? "auto" : "360svh"
      }}
    >
      {/* Container: Relative with top clearance on mobile, sticky on desktop */}
      <div
        className={`w-full flex flex-col justify-between ${
          isMobile
            ? "relative py-12 pt-24 pb-16"
            : "sticky top-0 h-[100svh] overflow-hidden py-8 sm:py-10"
        }`}
      >
        {/* Header with Title, Stepper and Thin Progress Bar */}
        <div className="w-full max-w-[1320px] mx-auto px-[var(--gutter)] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="section-tag mb-1">
                <span>06 — Benchmarks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d]">
                Numbers &amp; verified <em>honours.</em>
              </h2>
            </div>

            {/* Stepper pills and Prev / Next navigation */}
            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto flex-wrap">
              {/* Card Index Pills */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-[#0d0d0d]/10 rounded-full p-1 shadow-xs">
                {ACHIEVEMENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                      centeredCardIdx === i
                        ? "bg-[#0d0d0d] text-white font-bold shadow-xs"
                        : "text-[#77756f] hover:text-[#0d0d0d] hover:bg-[#0d0d0d]/5"
                    }`}
                    aria-label={`Jump to benchmark 0${i + 1}`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollToCard(Math.max(0, centeredCardIdx - 1))}
                  disabled={centeredCardIdx === 0}
                  className="w-8 h-8 rounded-full border border-[#0d0d0d]/15 bg-white flex items-center justify-center text-[#0d0d0d] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0d0d0d] hover:text-white transition-all cursor-pointer shadow-xs"
                  aria-label="Previous benchmark"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollToCard(Math.min(ACHIEVEMENTS.length - 1, centeredCardIdx + 1))}
                  disabled={centeredCardIdx === ACHIEVEMENTS.length - 1}
                  className="w-8 h-8 rounded-full border border-[#0d0d0d]/15 bg-white flex items-center justify-center text-[#0d0d0d] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0d0d0d] hover:text-white transition-all cursor-pointer shadow-xs"
                  aria-label="Next benchmark"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="font-mono text-xs text-[#77756f] min-w-[80px] text-right hidden md:block">
                {Math.round(scrollProgress * 100)}% EXPLORED
              </div>
            </div>
          </div>

          {/* Thin Progress Bar in Header (Desktop) */}
          <div className="w-full h-[2px] bg-[#0d0d0d]/10 rounded-full overflow-hidden hidden md:block">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Card Track: Native Touch Swipe on mobile, Pinned Transform on desktop */}
        <div
          ref={trackRef}
          onScroll={handleMobileTrackScroll}
          className={`relative w-full ${
            isMobile
              ? "overflow-x-auto snap-x snap-mandatory flex items-stretch gap-4 px-[var(--gutter)] py-6 scrollbar-none"
              : "overflow-hidden py-6 sm:py-8"
          }`}
        >
          <div
            className={`flex items-stretch gap-4 sm:gap-8 will-change-transform ${
              isMobile ? "w-max" : "pl-[var(--gutter)]"
            }`}
            style={{
              transform: isMobile ? "none" : `translateX(-${scrollProgress * maxDistance}px)`,
              transition: isMobile ? "none" : "transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isNearest = centeredCardIdx === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToCard(idx)}
                  className={`achievement-card shrink-0 rounded-[28px] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer ${
                    isMobile
                      ? "snap-center border border-[#0d0d0d]/10 shadow-[0_8px_24px_rgba(13,13,13,0.04)]"
                      : isNearest
                      ? "-translate-y-3 shadow-[0_24px_50px_rgba(13,13,13,0.12)] border border-[#0d0d0d]/10"
                      : "translate-y-0 shadow-[0_8px_30px_rgba(13,13,13,0.04)] border border-[#0d0d0d]/5 hover:-translate-y-1"
                  }`}
                  style={{
                    width: isMobile ? "min(82vw, 360px)" : "clamp(340px, 38vw, 520px)",
                    height: isMobile ? "auto" : "clamp(260px, 34vh, 310px)",
                    minHeight: isMobile ? "240px" : undefined
                  }}
                >
                  {/* Top: 64-72px Logo Tile + Index */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-[60px] sm:w-[72px] h-[60px] sm:h-[72px] rounded-2xl bg-[#f4f2ee] flex items-center justify-center relative p-2 shadow-inner"
                      style={{
                        boxShadow: isNearest
                          ? `0 12px 30px ${item.glowColor || "rgba(13,13,13,0.1)"}`
                          : "none"
                      }}
                    >
                      <TechLogo
                        name={item.platform}
                        brandKey={item.brandKey}
                        size={40}
                        showGlow={isNearest}
                      />
                    </div>

                    <span className="font-mono text-xs font-bold text-[#77756f]">
                      {item.index}
                    </span>
                  </div>

                  {/* Bottom: Left info & Right big count-up number */}
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-[#0d0d0d]/10">
                    <div className="space-y-1 max-w-[65%]">
                      <h3 className="font-bold text-base sm:text-lg text-[#0d0d0d] tracking-tight">
                        {item.label}
                      </h3>
                      <p className="text-xs text-[#77756f] font-medium">
                        {item.caption}
                      </p>
                      <p className="text-[11px] text-[#3a3a3a] leading-tight pt-1">
                        {item.detail}
                      </p>
                    </div>

                    <div className="font-mono text-2xl sm:text-4xl md:text-5xl font-black text-[#0d0d0d] tracking-tighter shrink-0 text-right">
                      <CounterNumber item={item} isVisible={hasStartedScroll || isMobile || idx === 0} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Card: and counting → */}
            <div
              className="shrink-0 rounded-[28px] border-2 border-dashed border-[#0d0d0d]/20 flex items-center justify-center px-8 sm:px-10 text-[#77756f] font-mono text-sm tracking-wider uppercase mr-[var(--gutter)]"
              style={{
                width: isMobile ? "200px" : "240px",
                height: isMobile ? "auto" : "clamp(260px, 34vh, 310px)",
                minHeight: isMobile ? "240px" : undefined
              }}
            >
              and counting →
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="w-full max-w-[1320px] mx-auto px-[var(--gutter)] flex items-center justify-between mt-2">
          <span className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-widest">
            {isMobile ? "SWIPE CARDS OR TAP PILLS" : "CLICK ANY CARD OR PILL TO JUMP"}
          </span>
          <span className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-widest ml-auto">
            {isMobile ? "05 BENCHMARKS" : "PINNED GALLERY · SCROLL DOWN TO ADVANCE"}
          </span>
        </div>
      </div>
    </section>
  );
}
