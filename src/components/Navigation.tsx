"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PROFILE, NAV } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Track scroll depth > 40px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "work", "certifications", "experience", "achievements", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-45% 0px -50% 0px"
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Update sliding indicator pill position
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeLink = navContainerRef.current.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement | null;

    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, scrolled]);

  // Lock scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 pointer-events-none transition-all duration-75 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main navigation header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 px-[var(--gutter)] pt-4 pb-3 transition-all duration-300"
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: favicon logo mark + full name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToTarget("#hero")}
              aria-label="Scroll to top"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-white/90 backdrop-blur-md shadow-md border border-[#0d0d0d]/10"
                  : "bg-white/60 backdrop-blur-sm border border-[#0d0d0d]/10"
              }`}
            >
              <Image
                src="/favicon.png"
                alt="Logo"
                width={26}
                height={26}
                className="w-[26px] h-[26px] object-contain select-none"
                priority
              />
            </button>

            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop centre/right: frosted glass pill with sliding indicator */}
          <nav
            ref={navContainerRef}
            className={`hidden md:flex items-center relative p-1.5 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-white/80 backdrop-blur-md border border-[#0d0d0d]/10 shadow-[0_8px_30px_rgba(13,13,13,0.06)]"
                : "bg-white/40 backdrop-blur-sm border border-[#0d0d0d]/5"
            }`}
            aria-label="Primary navigation"
          >
            {/* Sliding ink indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#0d0d0d] transition-all duration-300 pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />

            {NAV.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-section={secId}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-medium tracking-tight rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Pill */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider bg-white/80 backdrop-blur-md border border-[#0d0d0d]/15 text-[#0d0d0d] shadow-sm hover:bg-white"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-overlay-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay Menu */}
      <div
        id="mobile-overlay-menu"
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-[var(--gutter)] transition-all duration-500 ease-out md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "opacity-0 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <Image
              src="/favicon.png"
              alt="Logo"
              width={22}
              height={22}
              className="w-[22px] h-[22px] object-contain"
            />
            <span className="font-mono text-xs text-[#77756f]">MENU — NAVIGATION</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d] flex items-center justify-center text-xs font-bold"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group flex items-baseline gap-4 text-3xl font-bold tracking-tight text-[#0d0d0d] hover:translate-x-2 transition-transform duration-300"
              style={{
                transitionDelay: mobileMenuOpen ? `${idx * 60}ms` : "0ms"
              }}
            >
              <span className="font-mono text-xs text-[#77756f]">
                0{idx + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between pt-6 border-t border-[#0d0d0d]/10 text-xs text-[#77756f] font-mono">
          <span>{PROFILE.email}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="text-[#0d0d0d] font-semibold underline underline-offset-4"
          >
            RÉSUMÉ ↓
          </a>
        </div>
      </div>
    </>
  );
}
