<div align="center">

# Abhijith C — Portfolio

**Production Personal Portfolio & Creative Engineering Showcase**

A quiet, refined monochrome portfolio built with an Awwwards *Site of the Day* editorial aesthetic.  
Engineered with Next.js 16, React 19, strict TypeScript, Tailwind CSS v4, and native VP9 alpha video keying.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lenis](https://img.shields.io/badge/Scroll-Lenis_Smooth-0d0d0d?style=for-the-badge)](https://lenis.darkroom.engineering/)

</div>

---

## ✦ Key Highlights

- **Awwwards Editorial Aesthetic**: Strict monochrome palette (`#f4f2ee` warm gallery paper, `#ffffff` card surfaces, `#0d0d0d` deep ink) with authentic brand logos and subtle ambient glows.
- **AI Alpha Video Hero**: Neural-segmented (`u2net_human_seg`) transparent VP9 video layer with edge defringing and inpainting, allowing giant typography to sit directly behind the subject without color bleed or dark halos.
- **Interactive Developer ID Card**: 3D perspective flip badge with lanyard physics, pendular tilt, and photo portrait.
- **Periodic Table of Stack**: Interactive 8-column chemical grid with family filters, modal inspections, and dynamic project cross-references.
- **Expanding Work Accordion**: Smooth horizontal expanding accordion with active flex transitions and detailed engineering case studies.
- **Pinned Benchmarks Gallery**: 360svh pinned horizontal scroll track with dynamic pixel-accurate translation, count-up metric counters, stepper pills, and arrow controls.
- **Zero Fabrication Guarantee**: 100% of names, metrics, dates, companies, and certifications are sourced verbatim from `resume.pdf`.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create and validate production build
npm run build

# Start production server
npm start
```

---

## 📐 Architecture & Design System

### Technology Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Runtime**: [React 19](https://react.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS variables and GPU transitions
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) with double-RAF hydration protection
- **Media Pipeline**: FFmpeg + Python (`rembg`, `OpenCV`, `NumPy`)

### Typography Hierarchy

All fonts are self-hosted in `src/fonts/` as variable WOFF2 assets:

| Font Family | Style / Weight | CSS Token | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Inter Tight** | Variable (100–900) | `--font-inter-tight` | Primary UI, body copy, headings |
| **Instrument Serif** | Regular & Italic | `--font-instrument-serif` | Editorial accent words & callouts |
| **JetBrains Mono** | Variable (100–800) | `--font-jetbrains-mono` | Badges, code chips, indices, numbers |

### Design Tokens

```css
:root {
  --paper:  #f4f2ee;                     /* Warm off-white paper canvas */
  --card:   #ffffff;                     /* Elevated surface cards */
  --ink:    #0d0d0d;                     /* Deep primary ink */
  --ink-2:  #3a3a3a;                     /* Secondary body copy */
  --mute:   #77756f;                     /* Muted metadata & labels */
  --faint:  #a9a6a0;                     /* Subtle borders & hints */
  --line:   rgba(13, 13, 13, 0.10);      /* Hairline dividers */
  --ease:   cubic-bezier(0.16, 1, 0.3, 1);/* Fluid organic curve */
}
```

---

## 🧩 Sections Breakdown

| # | Section | Component File | Key Features |
| :---: | :--- | :--- | :--- |
| **`00`** | **Hero** | `src/components/hero/Hero.tsx` | Alpha VP9 video loop, background typography layering, audio unmute with pulsing ping ring |
| **`01`** | **About** | `src/components/sections/About.tsx` | 3D flippable Developer ID badge, personal statement, education, and fast facts |
| **`02`** | **Skills** | `src/components/sections/Skills.tsx` | Interactive Periodic Table of My Stack, family filters, live element inspector |
| **`03`** | **Work** | `src/components/sections/Work.tsx` | Horizontal expanding accordion, Sunfocuz DTM, Attendance/Payroll, Prime Gate ERP |
| **`04`** | **Certifications** | `src/components/sections/Certifications.tsx` | Ink-flood hover rows with slide-in directional arrows and verified credential links |
| **`05`** | **Experience** | `src/components/sections/Experience.tsx` | Chronological timeline with progressive ink spine and company profile badges |
| **`06`** | **Benchmarks** | `src/components/sections/Achievements.tsx` | 360svh pinned horizontal milestone track with easing count-up numbers and navigation pills |
| **`07`** | **Contact** | `src/components/sections/Contact.tsx` | Kinetic letter-hover micro-interactions, one-click copy email button, spinning badge |

---

## 🎬 AI Alpha Hero Video Pipeline

The video processing script at [`scripts/process-new-intro.py`](scripts/process-new-intro.py) automates high-end video preparation:

```
[intro.mp4] 
    │
    ├── 1. Audio Extraction ──> 0.5s seamless crossfade in NumPy ──> [new_loop_audio.wav]
    │
    ├── 2. Video Crop (848:1060:535:10 @ 768x960) ──> 0.5s xfade loop ──> [intermediate_loop.mp4]
    │
    ├── 3. AI Matting (u2net_human_seg) ──> Alpha Erosion (1px) ──> Edge Defringing (Inpaint Telea)
    │
    ├── 4. Transparent VP9 Encode (-pix_fmt yuva420p -metadata:s:v:0 alpha_mode=1) ──> [hero.webm]
    │
    └── 5. Pre-composited Fallback (-pix_fmt yuv420p over #f4f2ee) ──> [hero.mp4]
```

To re-run video generation:

```bash
python scripts/process-new-intro.py
```

---

## 📜 Source of Truth Protocol

Every datum on this website adheres to a strict anti-hallucination standard:
- **Zero Invented Metrics**: All client satisfaction numbers (+25%), dates, and positions originate directly from `resume.pdf`.
- **Authentic Hyperlinks**: Outbound links map strictly to verified profiles (GitHub, LinkedIn, Email, Phone).
- **Exact Project Details**: Technology stacks (Laravel, React, Inertia.js, MySQL, Tailwind) and architectures (Spatie RBAC, biometric audits) reflect verified production deployments.

---

## ⚖️ Credits & Asset Licenses

- **Fonts**:
  - *Inter Tight* (SIL Open Font License 1.1)
  - *Instrument Serif* (SIL Open Font License 1.1)
  - *JetBrains Mono* (Apache 2.0 / SIL Open Font License 1.1)
- **Brand Marks**:
  - Vector brand assets sourced from [Devicon](https://devicon.dev/) (MIT) and [Simple Icons](https://simpleicons.org/) (CC0 1.0 Universal).
- **Smooth Scroll Engine**:
  - [Lenis](https://github.com/darkroomengineering/lenis) (MIT License).

---

<div align="center">
  <sub>Crafted by ME for MYSELF · Built with precision, care, and quiet confidence.</sub>
</div>