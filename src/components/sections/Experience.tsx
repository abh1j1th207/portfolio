"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spineProgress, setSpineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress of section through the viewport
      const start = rect.top - viewportHeight * 0.7;
      const total = rect.height;
      const current = -start;
      const progress = Math.min(1, Math.max(0, current / total));

      setSpineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-[var(--section-py)] bg-[#f4f2ee] border-t border-[#0d0d0d]/10"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            <span>05 — Trajectory</span>
          </div>
          <h2
            className="section-heading rv"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Education &amp; experience as one <em>path.</em>
          </h2>
        </div>

        {/* Timeline Container with dynamic drawing spine */}
        <div className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Background Pale Spine Line */}
          <div className="absolute left-[7px] sm:left-[11px] md:left-[15px] top-4 bottom-4 w-[2px] bg-[#0d0d0d]/10" />

          {/* Animated Foreground Ink Spine Line (drawn as you scroll) */}
          <div
            className="absolute left-[7px] sm:left-[11px] md:left-[15px] top-4 w-[2px] bg-[#0d0d0d] transition-all duration-100 ease-out origin-top"
            style={{
              height: `calc((100% - 32px) * ${spineProgress})`
            }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const itemThreshold = idx / (TIMELINE.length - 1);
              const isLit = spineProgress >= itemThreshold * 0.9;

              if (item.isNext) {
                return (
                  <div
                    key={idx}
                    className="relative group rv"
                    style={{ "--i": idx + 2 } as React.CSSProperties}
                  >
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[30px] sm:-left-[38px] md:-left-[54px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isLit
                          ? "bg-[#0d0d0d] border-[#0d0d0d] scale-110"
                          : "bg-white border-[#0d0d0d]/30"
                      }`}
                    />

                    {/* Dashed Final Card: "Next — Your team?" */}
                    <div className="p-8 rounded-[28px] border-2 border-dashed border-[#0d0d0d]/25 bg-transparent hover:border-[#0d0d0d] hover:bg-white/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0d0d0d] text-white w-fit">
                          {item.year}
                        </span>
                        <span className="font-mono text-xs text-[#77756f]">
                          Forward Horizon
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-[#77756f] mt-1 mb-3">
                        {item.place}
                      </p>
                      <p className="text-xs text-[#3a3a3a] leading-relaxed">
                        {item.detail[0]}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="relative group rv"
                  style={{ "--i": idx + 2 } as React.CSSProperties}
                >
                  {/* Node Dot */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[38px] md:-left-[54px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isLit
                        ? "bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-sm"
                        : "bg-white border-[#0d0d0d]/30"
                    }`}
                  />

                  {/* Standard Card */}
                  <div
                    className={`p-6 sm:p-8 rounded-[28px] bg-white border transition-all duration-500 ${
                      isLit
                        ? "border-[#0d0d0d]/20 shadow-[0_8px_30px_rgba(13,13,13,0.04)]"
                        : "border-[#0d0d0d]/10 opacity-70"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#0d0d0d]">
                        {item.year}
                      </span>
                      {item.isEducation ? (
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#f4f2ee] text-[#0d0d0d] uppercase tracking-wider w-fit">
                          Degree Education
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#f4f2ee] text-[#77756f] uppercase tracking-wider w-fit">
                          Industry Experience
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d]">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-[#77756f] mt-1 mb-4">
                      {item.place}
                    </p>

                    <div className="space-y-2">
                      {item.detail.map((d, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#3a3a3a]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/40 mt-1 shrink-0" />
                          <span className="leading-relaxed">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
