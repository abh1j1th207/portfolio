"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {}
});

export const useScroll = () => useContext(ScrollContext);

let globalLenis: Lenis | null = null;

export function scrollToTarget(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
  if (globalLenis) {
    globalLenis.scrollTo(target, options);
  } else {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, [prefersReduced]);

  // Global RevealObserver for .rv and .rv-mask elements using data-in attribute
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Use data attribute instead of classList mutation to ensure
              // React never encounters a className hydration mismatch
              entry.target.setAttribute("data-in", "true");
              observer?.unobserve(entry.target); // Animate once only
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      const elements = document.querySelectorAll(
        ".rv:not([data-in='true']), .rv-mask:not([data-in='true'])"
      );
      elements.forEach((el) => observer?.observe(el));
    };

    // Double RAF ensures all client components have completely finished hydration
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setupObserver();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      observer?.disconnect();
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    scrollToTarget(target, options);
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
