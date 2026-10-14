"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, SkillElement } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [inspectSkill, setInspectSkill] = useState<SkillElement>(SKILLS[0]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-[var(--section-py)] bg-[#f4f2ee] border-t border-[#0d0d0d]/10"
    >
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .logo-pop {
          animation: popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            <span>02 — Stack Table</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="skills-heading"
              className="section-heading rv"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              The periodic table of my <em>stack.</em>
            </h2>

            {/* Filter Chips */}
            <div
              className="flex flex-wrap items-center gap-2 rv"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {SKILL_FAMILIES.map((family) => {
                const isActive = selectedFamily === family;
                return (
                  <button
                    key={family}
                    onClick={() => setSelectedFamily(family)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-tight transition-all duration-200 ${
                      isActive
                        ? "bg-[#0d0d0d] text-white shadow-sm"
                        : "bg-white text-[#3a3a3a] border border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30"
                    }`}
                  >
                    {family}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid + Sticky Inspector Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Table Grid: 8 columns desktop, 4 mobile */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5">
            {SKILLS.map((skill, index) => {
              const col = index % 8;
              const row = Math.floor(index / 8);
              const staggerI = row + col; // diagonal stagger: (row + col) * 40ms via CSS var --i
              const matchesFilter =
                selectedFamily === "All" || skill.family === selectedFamily;
              const isInspected = inspectSkill.name === skill.name;

              return (
                <button
                  key={skill.atomicNumber}
                  type="button"
                  onMouseEnter={() => setInspectSkill(skill)}
                  onFocus={() => setInspectSkill(skill)}
                  className={`group relative flex flex-col justify-between p-2 sm:p-3 rounded-2xl text-left border transition-all duration-300 ${
                    matchesFilter
                      ? "opacity-100 scale-100"
                      : "opacity-25 grayscale scale-95 pointer-events-none"
                  } ${
                    isInspected
                      ? "bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-md -translate-y-1"
                      : "bg-white text-[#0d0d0d] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/40 hover:-translate-y-0.5"
                  } rv`}
                  style={{
                    "--i": staggerI,
                    aspectRatio: "1 / 1.15"
                  } as React.CSSProperties}
                  aria-label={`${skill.atomicNumber} ${skill.symbol} ${skill.name} — ${skill.family}`}
                >
                  {/* Top row: atomic number & tiny category indicator */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-[10px] ${
                        isInspected ? "text-[#a9a6a0]" : "text-[#77756f]"
                      }`}
                    >
                      {skill.atomicNumber}
                    </span>
                    <span
                      className={`text-[8px] font-mono uppercase px-1 rounded ${
                        isInspected
                          ? "bg-white/20 text-white"
                          : "bg-[#f4f2ee] text-[#77756f]"
                      }`}
                    >
                      {skill.symbol}
                    </span>
                  </div>

                  {/* Centre: large 2-letter symbol */}
                  <span className="my-auto text-center font-mono text-xl sm:text-2xl font-bold tracking-tight block">
                    {skill.symbol}
                  </span>

                  {/* Bottom: element name truncated cleanly */}
                  <span
                    className={`w-full text-[11px] font-medium tracking-tight block truncate ${
                      isInspected ? "text-white" : "text-[#0d0d0d]"
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide on right) */}
          <aside
            className="sticky top-24 w-full rounded-[28px] bg-white border border-[#0d0d0d]/10 p-6 shadow-[0_8px_30px_rgba(13,13,13,0.04)] rv"
            style={{ "--i": 3 } as React.CSSProperties}
            aria-label="Skill inspector"
          >
            <div className="flex items-center justify-between border-b border-[#0d0d0d]/10 pb-4 mb-6">
              <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                ELEMENT #{inspectSkill.atomicNumber}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[#0d0d0d] font-mono text-[10px] font-bold">
                {inspectSkill.family}
              </span>
            </div>

            {/* 150px Brand Logo with Pop Animation */}
            <div className="my-4 flex items-center justify-center h-[170px] bg-[#f4f2ee] rounded-2xl overflow-hidden relative">
              <div key={inspectSkill.name} className="logo-pop">
                <TechLogo
                  name={inspectSkill.name}
                  brandKey={inspectSkill.brandKey}
                  size={140}
                  showGlow={true}
                />
              </div>
            </div>

            {/* Information */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                  {inspectSkill.name}
                </h3>
                <span className="text-xs text-[#77756f] font-mono">
                  Symbol: {inspectSkill.symbol} · Atomic weight: {inspectSkill.atomicNumber}.00
                </span>
              </div>

              {inspectSkill.description && (
                <p className="text-xs text-[#3a3a3a] leading-relaxed">
                  {inspectSkill.description}
                </p>
              )}

              {/* Projects Utilizing Skill */}
              {inspectSkill.projects && inspectSkill.projects.length > 0 && (
                <div className="pt-3 border-t border-[#0d0d0d]/10">
                  <span className="font-mono text-[11px] text-[#77756f] uppercase tracking-wider block mb-2">
                    Applied In
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {inspectSkill.projects.map((proj) => (
                      <div
                        key={proj}
                        className="px-2.5 py-1.5 rounded-lg bg-[#f4f2ee] text-[#0d0d0d] text-xs font-medium flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                        <span className="truncate">{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
