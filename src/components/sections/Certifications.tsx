"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative py-[var(--section-py)] bg-white border-y border-[#0d0d0d]/10"
    >
      <style>{`
        .ink-flood-row {
          position: relative;
          overflow: hidden;
          transition: color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ink-flood-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: #0d0d0d;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .ink-flood-row:hover::before,
        .ink-flood-row:focus-visible::before {
          transform: scaleX(1);
        }
        .ink-flood-row:hover .flood-text,
        .ink-flood-row:focus-visible .flood-text {
          color: #ffffff;
        }
        .ink-flood-row:hover .flood-arrow,
        .ink-flood-row:focus-visible .flood-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: #ffffff;
        }
      `}</style>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
          {/* Left: Sticky Heading & Count */}
          <div className="sticky top-28 space-y-4">
            <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
              <span>04 — Credentials</span>
            </div>
            <h2
              id="certifications-heading"
              className="section-heading rv"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              Always <em>learning.</em>
            </h2>
            <p
              className="font-mono text-xs text-[#77756f] tracking-wider uppercase pt-2 rv"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              03 Verified Certifications
            </p>
          </div>

          {/* Right: Numbered Ink-Flood Rows */}
          <div className="divide-y divide-[#0d0d0d]/10 border-y border-[#0d0d0d]/10">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={cert.index}
                tabIndex={0}
                className="ink-flood-row group py-8 px-6 cursor-pointer outline-none rv"
                style={{ "--i": idx + 2 } as React.CSSProperties}
                aria-label={`${cert.title} issued by ${cert.issuer}`}
              >
                <div className="relative z-10 flex items-center justify-between gap-6">
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#77756f] flood-text transition-colors duration-300">
                      {cert.index}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flood-text transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#77756f] flood-text transition-colors duration-300">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Arrow ↗ sliding in */}
                  <div className="flood-arrow opacity-0 -translate-x-3 transition-all duration-300 text-lg font-bold text-[#0d0d0d] shrink-0">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
