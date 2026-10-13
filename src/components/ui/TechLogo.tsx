import React from "react";
import Image from "next/image";

export const BRAND_KEYS = [
  "react",
  "inertia",
  "typescript",
  "javascript",
  "tailwindcss",
  "alpinejs",
  "html5",
  "css3",
  "bootstrap",
  "laravel",
  "filament",
  "php",
  "livewire",
  "mysql",
  "mariadb",
  "postgresql",
  "sqlite",
  "git",
  "vite",
  "figma",
  "adobexd",
  "github",
  "linkedin",
  "cisco",
  "webauthn",
  "sutherland"
] as const;

export type BrandKey = typeof BRAND_KEYS[number];

export function isBrand(key?: string): boolean {
  if (!key) return false;
  return (BRAND_KEYS as readonly string[]).includes(key);
}

// Brand official SVGs or fallback icons
const BRAND_SVG_MAP: Record<string, string> = {
  react: "/logos/react.svg",
  inertia: "/logos/inertia.svg",
  typescript: "/logos/typescript.svg",
  javascript: "/logos/javascript.svg",
  tailwindcss: "/logos/tailwindcss.svg",
  alpinejs: "/logos/alpinejs.svg",
  html5: "/logos/html5.svg",
  css3: "/logos/css3.svg",
  bootstrap: "/logos/bootstrap.svg",
  laravel: "/logos/laravel.svg",
  filament: "/logos/filament.svg",
  php: "/logos/php.svg",
  livewire: "/logos/livewire.svg",
  mysql: "/logos/mysql.svg",
  mariadb: "/logos/mariadb.svg",
  postgresql: "/logos/postgresql.svg",
  sqlite: "/logos/sqlite.svg",
  git: "/logos/git.svg",
  vite: "/logos/vite.svg",
  figma: "/logos/figma.svg",
  adobexd: "/logos/adobexd.svg",
  github: "/logos/github.svg",
  linkedin: "/logos/linkedin.svg",
  cisco: "/logos/cisco.svg",
  webauthn: "/logos/webauthn.svg"
};

// Brand accent colors for subtle glow
export const BRAND_GLOW_MAP: Record<string, string> = {
  react: "rgba(97, 218, 251, 0.25)",
  inertia: "rgba(149, 83, 237, 0.25)",
  typescript: "rgba(49, 120, 198, 0.25)",
  javascript: "rgba(247, 223, 30, 0.25)",
  tailwindcss: "rgba(56, 189, 248, 0.25)",
  alpinejs: "rgba(119, 193, 209, 0.25)",
  html5: "rgba(227, 79, 38, 0.25)",
  css3: "rgba(21, 114, 182, 0.25)",
  bootstrap: "rgba(121, 82, 179, 0.25)",
  laravel: "rgba(255, 45, 32, 0.25)",
  filament: "rgba(250, 180, 24, 0.25)",
  php: "rgba(119, 123, 179, 0.25)",
  livewire: "rgba(251, 112, 154, 0.25)",
  mysql: "rgba(0, 117, 143, 0.25)",
  mariadb: "rgba(192, 118, 81, 0.25)",
  postgresql: "rgba(51, 103, 145, 0.25)",
  sqlite: "rgba(0, 59, 84, 0.25)",
  git: "rgba(240, 80, 50, 0.25)",
  vite: "rgba(100, 108, 255, 0.25)",
  figma: "rgba(242, 78, 29, 0.25)",
  adobexd: "rgba(255, 97, 226, 0.25)",
  github: "rgba(13, 13, 13, 0.15)",
  linkedin: "rgba(10, 102, 194, 0.25)",
  cisco: "rgba(27, 98, 151, 0.25)",
  webauthn: "rgba(46, 117, 182, 0.25)",
  sutherland: "rgba(230, 68, 55, 0.2)"
};

interface TechLogoProps {
  name: string;
  brandKey?: string;
  size?: number;
  showGlow?: boolean;
  className?: string;
}

export function TechLogo({
  name,
  brandKey,
  size = 40,
  showGlow = false,
  className = ""
}: TechLogoProps) {
  const key = brandKey || name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const svgPath = BRAND_SVG_MAP[key];
  const glow = BRAND_GLOW_MAP[key] || "rgba(13, 13, 13, 0.08)";

  if (key === "sutherland") {
    return (
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-white ${className}`}
        style={{
          width: size,
          height: size,
          boxShadow: showGlow ? `0 12px 32px ${glow}` : "none"
        }}
      >
        <span
          className="font-bold tracking-tighter"
          style={{ fontSize: size * 0.38, color: "#e64437", fontFamily: "var(--font-display)" }}
        >
          S
        </span>
      </div>
    );
  }

  if (svgPath) {
    return (
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ${className}`}
        style={{
          width: size,
          height: size
        }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-500"
            style={{
              backgroundColor: glow,
              transform: "scale(1.2)"
            }}
          />
        )}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src={svgPath}
            alt={name}
            width={size}
            height={size}
            className="object-contain max-h-full max-w-full"
            unoptimized
          />
        </div>
      </div>
    );
  }

  // Thin line concept icons for DSA, OOP, REST APIs, Security, etc.
  return (
    <div
      className={`relative flex items-center justify-center text-[#3a3a3a] ${className}`}
      style={{
        width: size,
        height: size
      }}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-lg pointer-events-none"
          style={{ backgroundColor: "rgba(13, 13, 13, 0.06)", transform: "scale(1.1)" }}
        />
      )}
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
      >
        {name.includes("API") ? (
          <>
            <rect x="2" y="2" width="20" height="8" rx="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </>
        ) : name.includes("Shield") || name.includes("Fortify") || name.includes("Security") || name.includes("RBAC") ? (
          <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </>
        ) : name.includes("Pest") || name.includes("Stan") ? (
          <>
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </>
        ) : name.includes("UI") || name.includes("Design") ? (
          <>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </>
        )}
      </svg>
    </div>
  );
}
