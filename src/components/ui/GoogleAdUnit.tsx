"use client";

import React, { useEffect, useRef } from "react";

interface GoogleAdUnitProps {
  slot?: string;
  client?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  label?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function GoogleAdUnit({
  slot = "1554546740",
  client = "ca-pub-4049435921186193",
  format = "auto",
  responsive = true,
  className = "",
  label = true,
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate push calls in React Strict Mode
    if (pushedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      // Ignore adsbygoogle duplicate or pending error silently
      console.warn("Google AdSense push notice:", err);
    }
  }, []);

  return (
    <div
      className={`w-full my-8 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      {label && (
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#77756f]/70 mb-1.5 select-none">
          Advertisement
        </span>
      )}
      <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white/40 border border-[#0d0d0d]/5 p-2 sm:p-4 min-h-[100px] flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px", width: "100%" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
