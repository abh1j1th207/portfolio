"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

// Illustrative Mini-UI for each project type
function ProjectMiniUI({ uiType }: { uiType: ProjectItem["uiType"] }) {
  return (
    <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col rounded-2xl bg-[#f4f2ee] border border-[#0d0d0d]/10 p-4 overflow-hidden relative">
      <div className="flex items-center justify-between pb-3 border-b border-[#0d0d0d]/10 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#77756f] px-2 py-0.5 rounded bg-white/80 border border-[#0d0d0d]/5">
          Illustrative UI
        </span>
      </div>

      {uiType === "dtm" && (
        <div className="space-y-3 text-xs font-mono">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/5 shadow-xs">
              <span className="text-[10px] text-[#77756f] block">ACTIVE FORM</span>
              <span className="text-xs font-bold text-[#0d0d0d]">Daily Log #402</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/5 shadow-xs">
              <span className="text-[10px] text-[#77756f] block">RBAC TIER</span>
              <span className="text-xs font-bold text-[#0d0d0d]">Tier 6 Admin</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/5 space-y-2">
            <div className="flex justify-between text-[10px] text-[#77756f]">
              <span>DYNAMIC FIELD SCHEMA</span>
              <span className="text-[#0d0d0d] font-bold">Inertia.js SPA</span>
            </div>
            <div className="h-6 w-full bg-[#f4f2ee] rounded flex items-center px-2 text-[10px] text-[#77756f]">
              Task: Multi-Branch Audit Report
            </div>
            <div className="h-6 w-full bg-[#f4f2ee] rounded flex items-center px-2 text-[10px] text-[#77756f]">
              Department: Electrical Operations
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#0d0d0d]/5 flex items-center justify-between text-[10px]">
            <span className="text-[#77756f]">EXPORT PIPELINES</span>
            <div className="flex gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-[#0d0d0d] text-white">PDF</span>
              <span className="px-1.5 py-0.5 rounded bg-[#0d0d0d] text-white">XLSX</span>
            </div>
          </div>
        </div>
      )}

      {uiType === "attendance" && (
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3 bg-white rounded-xl border border-[#0d0d0d]/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/10 flex items-center justify-center text-[10px] text-[#77756f]">
              [📸]
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-[#77756f] block">GEO AUDIT LIGHTBOX</span>
              <span className="text-xs font-bold text-[#0d0d0d]">Kochi HQ · Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-white p-2 rounded-lg border border-[#0d0d0d]/5">
              <span className="text-[9px] text-[#77756f] block">STATUS</span>
              <span className="text-[11px] font-bold text-[#0d0d0d]">Present</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-[#0d0d0d]/5">
              <span className="text-[9px] text-[#77756f] block">SHIFT</span>
              <span className="text-[11px] font-bold text-[#0d0d0d]">09:00–18:00</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-[#0d0d0d]/5">
              <span className="text-[9px] text-[#77756f] block">QUOTA</span>
              <span className="text-[11px] font-bold text-[#0d0d0d]">Full Day</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/5 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#77756f]">AUTOMATED PAYROLL</span>
              <span className="font-bold text-[#0d0d0d]">3-Tier Engine</span>
            </div>
            <div className="w-full bg-[#f4f2ee] h-2 rounded-full overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-[88%]" />
            </div>
            <span className="text-[9px] text-[#77756f] block text-right">Calculations locked</span>
          </div>
        </div>
      )}

      {uiType === "erp" && (
        <div className="space-y-3 text-xs font-mono">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/5">
              <span className="text-[10px] text-[#77756f] block">WAREHOUSES</span>
              <span className="text-xs font-bold text-[#0d0d0d]">4 Facilities</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/5">
              <span className="text-[10px] text-[#77756f] block">SKU TRACKING</span>
              <span className="text-xs font-bold text-[#0d0d0d]">Real-Time Sync</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/5 space-y-2">
            <span className="text-[10px] text-[#77756f] block">FINANCIAL LEDGER (AP/AR)</span>
            <div className="flex justify-between items-center text-[10px] border-b border-[#f4f2ee] pb-1">
              <span>PO #8920 — Inventory</span>
              <span className="font-bold">Balanced</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span>Tax &amp; Audit Logs</span>
              <span className="font-bold">Verified</span>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-[#0d0d0d]/5 flex justify-between items-center text-[10px]">
            <span className="text-[#77756f]">STOCK TRANSFER</span>
            <span className="px-2 py-0.5 rounded bg-[#0d0d0d] text-white">Inter-Branch</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Work() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-[var(--section-py)] bg-[#f4f2ee] border-t border-[#0d0d0d]/10"
    >
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .panel-expand {
          transition: flex 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .accordion-mobile-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .accordion-mobile-content.open {
          grid-template-rows: 1fr;
        }
        .accordion-mobile-inner {
          overflow: hidden;
        }
      `}</style>

      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            <span>03 — Selected Work</span>
          </div>
          <h2
            id="work-heading"
            className="section-heading rv"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Things I&apos;ve <em>built.</em>
          </h2>
        </div>

        {/* Desktop: Expanding Accordion Gallery (horizontal) */}
        <div className="hidden md:flex gap-3 h-[min(78svh,620px)] w-full items-stretch rv" style={{ "--i": 2 } as React.CSSProperties}>
          {PROJECTS.map((project) => {
            const isActive = activeProject === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(project.id)}
                onClick={() => setActiveProject(project.id)}
                className={`relative rounded-[28px] bg-white border border-[#0d0d0d]/10 shadow-[0_4px_24px_rgba(13,13,13,0.03)] overflow-hidden panel-expand ${
                  isActive
                    ? "flex-[8] p-6 sm:p-8 cursor-default"
                    : "flex-[1] p-4 cursor-pointer hover:border-[#0d0d0d]/30 hover:bg-[#faf9f7]"
                }`}
              >
                {/* INACTIVE SPINDLE */}
                <div
                  className={`flex flex-col justify-between items-center h-full w-full py-4 transition-all duration-500 ${
                    isActive ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-[#77756f]">
                    {project.index}
                  </span>
                  <span className="writing-vertical font-bold text-sm tracking-tight text-[#0d0d0d] whitespace-nowrap">
                    {project.title}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full bg-[#f4f2ee] text-[#0d0d0d] flex items-center justify-center font-bold text-sm transition-transform duration-300 hover:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </div>
                </div>

                {/* ACTIVE OPEN CONTENT */}
                <div
                  className={`h-full w-full flex flex-row gap-6 justify-between transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Left Side: Information & Features */}
                  <div className="flex-1 flex flex-col justify-between space-y-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#0d0d0d] text-white">
                          {project.index}
                        </span>
                        <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                          {project.kicker}
                        </span>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0d0d0d]">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#3a3a3a] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Feature List */}
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 pt-1">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#3a3a3a] bg-[#f4f2ee]/60 p-2 rounded-xl border border-[#0d0d0d]/5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1 shrink-0" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Chips + GitHub Link */}
                    <div className="pt-3 border-t border-[#0d0d0d]/10 flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f4f2ee] text-[11px] font-mono font-medium text-[#0d0d0d]"
                          >
                            <TechLogo name={t} size={12} />
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary text-xs !h-9 !px-3"
                        >
                          View on GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Illustrative Mini-UI */}
                  <ProjectMiniUI uiType={project.uiType} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical Accordion */}
        <div className="md:hidden flex flex-col gap-3 rv" style={{ "--i": 2 } as React.CSSProperties}>
          {PROJECTS.map((project) => {
            const isActive = activeProject === project.id;

            return (
              <div
                key={project.id}
                className="rounded-[28px] bg-white border border-[#0d0d0d]/10 overflow-hidden shadow-[0_4px_24px_rgba(13,13,13,0.03)]"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveProject(isActive ? "" : project.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#77756f]">
                      {project.index}
                    </span>
                    <span className="font-bold text-base text-[#0d0d0d] tracking-tight">
                      {project.title}
                    </span>
                  </div>
                  <span
                    className={`text-xl font-bold text-[#77756f] transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>

                {/* Accordion Content */}
                <div className={`accordion-mobile-content ${isActive ? "open" : ""}`}>
                  <div className="accordion-mobile-inner">
                    <div className="px-5 pb-6 space-y-4">
                      <p className="text-xs text-[#77756f] font-mono uppercase tracking-wider">
                        {project.kicker}
                      </p>
                      <p className="text-sm text-[#3a3a3a] leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#3a3a3a] bg-[#f4f2ee]/60 p-2 rounded-xl border border-[#0d0d0d]/5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1 shrink-0" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#0d0d0d]/10">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f4f2ee] text-[11px] font-mono font-medium text-[#0d0d0d]"
                          >
                            <TechLogo name={t} size={10} />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
