"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const CURRENT_YEAR = 2026;

function HoppingText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <span
            key={index}
            className="inline-block transition-transform duration-200 ease-out hover:-translate-y-3 cursor-default"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      className="relative pt-[var(--section-py)] pb-12 bg-[#f4f2ee] border-t border-[#0d0d0d]/10 overflow-hidden"
    >
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spinSlow 18s linear infinite;
        }
      `}</style>

      <div className="section-container">
        {/* Top Tag & Spinning "Say Hello" Badge */}
        <div className="flex items-start justify-between mb-8">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            <span>07 — Connection</span>
          </div>

          {/* Circular Spinning Text Badge */}
          <div className="relative w-28 h-28 hidden sm:flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full spin-slow text-[#0d0d0d]"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="10.5" letterSpacing="2" fill="currentColor">
                <textPath xlinkHref="#circlePath">
                  · SAY HELLO · GET IN TOUCH · REACH OUT
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xl">↗</span>
            </div>
          </div>
        </div>

        {/* Large Hopping Heading */}
        <div className="space-y-2 mb-16 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.95] text-[#0d0d0d] select-none">
            <div>
              <HoppingText text="Let's build" />
            </div>
            <div>
              <HoppingText text="something together." />
            </div>
          </h2>
        </div>

        {/* Email & Copy Chip */}
        <div className="space-y-4 mb-16 rv" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block">
            Direct Electronic Mail
          </span>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0d0d0d] underline underline-offset-8 decoration-[#0d0d0d]/30 hover:decoration-[#0d0d0d] transition-all"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="px-4 py-2 rounded-full border border-[#0d0d0d]/20 bg-white text-xs font-mono font-medium hover:bg-[#0d0d0d] hover:text-white transition-all duration-200 active:scale-95"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>

            {/* Accessible aria-live notification */}
            <div aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </div>
          </div>
        </div>

        {/* Channels Grid: Phone, GitHub, LinkedIn */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#0d0d0d]/10 mb-20 rv" style={{ "--i": 2 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-2">
              Telephone
            </span>
            <a
              href={PROFILE.phoneHref}
              className="font-bold text-base text-[#0d0d0d] hover:underline"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div>
            <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-2">
              Source Code
            </span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-base text-[#0d0d0d] hover:underline inline-flex items-center gap-1"
            >
              github.com/abh1j1th207 ↗
            </a>
          </div>

          <div>
            <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-2">
              Professional Network
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-base text-[#0d0d0d] hover:underline inline-flex items-center gap-1"
            >
              linkedin.com/in/a6h1j1th ↗
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <div>
            © {CURRENT_YEAR} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 · TypeScript · Tailwind CSS v4</span>
            <button
              onClick={() => scrollToTarget("#hero")}
              className="text-[#0d0d0d] font-bold hover:underline"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
