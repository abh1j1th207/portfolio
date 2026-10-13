export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  heroHeadline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  secondarySummary: string;
  shortQuote: string;
  github: string;
  linkedin: string;
  resumePath: string;
  idNo: string;
  dept: string;
  validTill: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Frontend' | 'Backend & CMS' | 'Databases & Tools' | 'Design & Security' | 'Architecture & Concepts';
  isBrand: boolean;
  brandKey?: string;
  projects?: string[];
  description?: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  uiType: 'dtm' | 'attendance' | 'erp';
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  year?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  detail: string[];
  isEducation?: boolean;
  isNext?: boolean;
}

export interface AchievementItem {
  id: string;
  index: string;
  number: number;
  numberPrefix?: string;
  numberSuffix?: string;
  displayValue?: string;
  label: string;
  caption: string;
  detail: string;
  platform: string;
  brandKey: string;
  glowColor?: string;
}

export const PROFILE: Profile = {
  name: "Abhijith C",
  firstName: "ABHIJITH",
  lastName: "C",
  initials: "AC",
  role: "Full-Stack & Frontend Developer",
  heroHeadline: "Full Stack Developer.",
  email: "chandraabhijith207@gmail.com",
  phone: "+91 7558000490",
  phoneHref: "tel:+917558000490",
  location: "Kochi, Kerala, India",
  resumeSummary:
    "Full-Stack and Frontend Developer experienced in building enterprise web applications, ERPs, and SPAs. Proficient in pairing modern client architectures (React 19, Inertia.js 3.0, TypeScript, Tailwind CSS v4) with robust backend platforms (Laravel 13, Filament v5, PHP 8.4) and relational database systems (PostgreSQL, MariaDB, MySQL). Skilled in transforming Figma designs into responsive interfaces with granular role-based access control.",
  secondarySummary:
    "Skilled in transforming Figma designs into responsive interfaces with granular role-based access control and high operational uptime.",
  shortQuote:
    "Engineering robust enterprise systems by bridging modern reactive front-ends with resilient backend architectures.",
  github: "https://github.com/abh1j1th207",
  linkedin: "https://linkedin.com/in/a6h1j1th",
  resumePath: "/resume.pdf",
  idNo: "AC-2023-DEV",
  dept: "Engineering & Architecture",
  validTill: "2023" // Graduation year from résumé
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export const SKILL_FAMILIES = [
  "All",
  "Frontend",
  "Backend & CMS",
  "Databases & Tools",
  "Design & Security"
] as const;

export const SKILLS: SkillElement[] = [
  // Frontend
  {
    atomicNumber: 1,
    symbol: "Re",
    name: "React 19",
    family: "Frontend",
    isBrand: true,
    brandKey: "react",
    projects: ["Sunfocuz Daily Task Management (DTM)"],
    description: "Component architecture, hooks, concurrent rendering, and single-page apps."
  },
  {
    atomicNumber: 2,
    symbol: "In",
    name: "Inertia.js 3.0",
    family: "Frontend",
    isBrand: true,
    brandKey: "inertia",
    projects: ["Sunfocuz Daily Task Management (DTM)"],
    description: "Monolithic single-page app glue connecting modern client views with Laravel backends."
  },
  {
    atomicNumber: 3,
    symbol: "Ts",
    name: "TypeScript",
    family: "Frontend",
    isBrand: true,
    brandKey: "typescript",
    projects: ["Sunfocuz Daily Task Management (DTM)"],
    description: "Strict compile-time type safety, interfaces, generics, and enterprise contracts."
  },
  {
    atomicNumber: 4,
    symbol: "Js",
    name: "JavaScript (ES6+)",
    family: "Frontend",
    isBrand: true,
    brandKey: "javascript",
    projects: ["Ceymox Wireframes & Modular UI"],
    description: "Asynchronous programming, closures, event-driven DOM handling, and modular code."
  },
  {
    atomicNumber: 5,
    symbol: "Tw",
    name: "Tailwind CSS v4",
    family: "Frontend",
    isBrand: true,
    brandKey: "tailwindcss",
    projects: ["Sunfocuz Attendance & Payroll System", "Prime Gate ERP System"],
    description: "Utility-first CSS engine, responsive layouts, design tokens, and CSS variables."
  },
  {
    atomicNumber: 6,
    symbol: "Al",
    name: "Alpine.js",
    family: "Frontend",
    isBrand: true,
    brandKey: "alpinejs",
    projects: ["Sunfocuz Internal Platforms"],
    description: "Lightweight reactive declarative behavior injected directly into templates."
  },
  {
    atomicNumber: 7,
    symbol: "Ht",
    name: "HTML5",
    family: "Frontend",
    isBrand: true,
    brandKey: "html5",
    projects: ["Ceymox Frontend Modules"],
    description: "Semantic structures, accessible landmarks, form validation, and native web standards."
  },
  {
    atomicNumber: 8,
    symbol: "Cs",
    name: "CSS3",
    family: "Frontend",
    isBrand: true,
    brandKey: "css3",
    projects: ["Ceymox Front-End Components"],
    description: "Modern CSS Grid, Flexbox, custom properties, animations, and responsive media queries."
  },
  {
    atomicNumber: 9,
    symbol: "Bs",
    name: "Bootstrap",
    family: "Frontend",
    isBrand: true,
    brandKey: "bootstrap",
    projects: ["Legacy Internal Dashboards"],
    description: "Rapid responsive grid scaffolding and accessible UI components."
  },

  // Backend & CMS
  {
    atomicNumber: 10,
    symbol: "La",
    name: "Laravel 13",
    family: "Backend & CMS",
    isBrand: true,
    brandKey: "laravel",
    projects: ["Sunfocuz Daily Task Management (DTM)", "Sunfocuz Attendance & Payroll", "Prime Gate ERP"],
    description: "Eloquent ORM, service providers, queue pipelines, middleware, and route architecture."
  },
  {
    atomicNumber: 11,
    symbol: "Fi",
    name: "Filament v5",
    family: "Backend & CMS",
    isBrand: true,
    brandKey: "filament",
    projects: ["Sunfocuz Daily Task Management (DTM)", "Sunfocuz Attendance & Payroll", "Prime Gate ERP"],
    description: "TALL-stack admin panel, dynamic form schemas, tables, and resource controllers."
  },
  {
    atomicNumber: 12,
    symbol: "Ph",
    name: "PHP 8.4",
    family: "Backend & CMS",
    isBrand: true,
    brandKey: "php",
    projects: ["Sunfocuz Attendance & Payroll", "coreminds CRM/ERP"],
    description: "Modern typed object-oriented PHP, property hooks, enums, and fiber coroutines."
  },
  {
    atomicNumber: 13,
    symbol: "Lw",
    name: "Livewire",
    family: "Backend & CMS",
    isBrand: true,
    brandKey: "livewire",
    projects: ["Filament Resource Components"],
    description: "Full-stack reactive framework building dynamic front-ends without writing client JS."
  },
  {
    atomicNumber: 14,
    symbol: "Co",
    name: "Couch CMS",
    family: "Backend & CMS",
    isBrand: false,
    projects: ["Content Management Integrations"],
    description: "Tag-based PHP content management system for designer-friendly administrative portals."
  },
  {
    atomicNumber: 15,
    symbol: "Ap",
    name: "RESTful APIs",
    family: "Backend & CMS",
    isBrand: false,
    projects: ["Sunfocuz CRM & Branch Analytics"],
    description: "Stateless REST endpoints, resource transformers, JSON API specifications, and rate limiting."
  },
  {
    atomicNumber: 16,
    symbol: "Fs",
    name: "Filament Shield",
    family: "Backend & CMS",
    isBrand: false,
    projects: ["Sunfocuz DTM 6-tier RBAC"],
    description: "Automated permission generation and granular policy enforcement for admin panels."
  },
  {
    atomicNumber: 17,
    symbol: "Sp",
    name: "Spatie RBAC",
    family: "Backend & CMS",
    isBrand: false,
    projects: ["Sunfocuz Daily Task Management (DTM)"],
    description: "Enterprise multi-role permissions, inheritance, and guards across backend services."
  },

  // Databases & Tools
  {
    atomicNumber: 18,
    symbol: "My",
    name: "MySQL",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "mysql",
    projects: ["Prime Gate ERP System", "coreminds CRM/ERP"],
    description: "Relational schema design, ACID transactions, indexing strategies, and query optimization."
  },
  {
    atomicNumber: 19,
    symbol: "Ma",
    name: "MariaDB",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "mariadb",
    projects: ["Sunfocuz Attendance & Payroll System"],
    description: "High-performance enterprise relational engine, column store, and clustering."
  },
  {
    atomicNumber: 20,
    symbol: "Pg",
    name: "PostgreSQL (pgAdmin 4)",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "postgresql",
    projects: ["Sunfocuz Operational Platforms"],
    description: "Advanced relational database, JSONB storage, CTEs, window functions, and pgAdmin 4."
  },
  {
    atomicNumber: 21,
    symbol: "Sq",
    name: "SQLite",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "sqlite",
    projects: ["Local Prototyping & Automated Testing"],
    description: "Zero-configuration serverless database engine for embedded testing and rapid fixtures."
  },
  {
    atomicNumber: 22,
    symbol: "Gt",
    name: "Git",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "git",
    projects: ["Sunfocuz Deployment Pipelines"],
    description: "Branching workflows, version control, rebase strategies, and CI/CD triggers."
  },
  {
    atomicNumber: 23,
    symbol: "Vi",
    name: "Vite",
    family: "Databases & Tools",
    isBrand: true,
    brandKey: "vite",
    projects: ["Sunfocuz React & Inertia Pipelines"],
    description: "Next-generation ESM frontend tooling, instant HMR, and Rollup production builds."
  },
  {
    atomicNumber: 24,
    symbol: "Pt",
    name: "Pest PHP",
    family: "Databases & Tools",
    isBrand: false,
    projects: ["Sunfocuz Test Suites"],
    description: "Expressive test framework for elegant unit, feature, and integration validation."
  },
  {
    atomicNumber: 25,
    symbol: "Ps",
    name: "Larastan / PHPStan",
    family: "Databases & Tools",
    isBrand: false,
    projects: ["Sunfocuz Code Audits"],
    description: "Static code analysis catching edge cases, type errors, and dead paths before deployment."
  },

  // Design & Security
  {
    atomicNumber: 26,
    symbol: "Fg",
    name: "Figma",
    family: "Design & Security",
    isBrand: true,
    brandKey: "figma",
    projects: ["Ceymox Wireframes & Sunfocuz UI/UX"],
    description: "Design systems, auto-layout, interactive prototyping, and developer handoff specs."
  },
  {
    atomicNumber: 27,
    symbol: "Xd",
    name: "Adobe XD",
    family: "Design & Security",
    isBrand: true,
    brandKey: "adobexd",
    projects: ["Interactive UI Prototyping"],
    description: "Vector-based experience design, artboards, wireframes, and component states."
  },
  {
    atomicNumber: 28,
    symbol: "Ux",
    name: "UI/UX Prototyping",
    family: "Design & Security",
    isBrand: false,
    projects: ["Ceymox & Sunfocuz Platforms"],
    description: "User journey mapping, wireframing, usability heuristics, and visual hierarchy."
  },
  {
    atomicNumber: 29,
    symbol: "Wa",
    name: "WebAuthn / Passkeys",
    family: "Design & Security",
    isBrand: true,
    brandKey: "webauthn",
    projects: ["Sunfocuz Daily Task Management (DTM)"],
    description: "FIDO2 passwordless public-key cryptography and biometrics for zero-trust login."
  },
  {
    atomicNumber: 30,
    symbol: "Fo",
    name: "Laravel Fortify",
    family: "Design & Security",
    isBrand: false,
    projects: ["Sunfocuz Enterprise Auth Pipeline"],
    description: "Headless backend authentication, 2FA, password broker, and session guard."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "dtm",
    index: "01",
    title: "Sunfocuz Daily Task Management",
    kicker: "Enterprise Daily Activity Logging, Reporting & Dynamic Form Platform",
    description:
      "Enterprise single-page application engineered with React 19, Inertia.js 3.0, and Laravel 13 with a Filament v5 admin suite, designed for high-throughput activity logging and multi-branch analytics.",
    features: [
      "Built an enterprise SPA utilizing React 19, Inertia.js 3.0, Radix UI primitives, Laravel 13, and a Filament v5 admin suite.",
      "Designed a runtime dynamic field engine enabling departments to configure custom task forms without code alterations.",
      "Enforced 6-tier hierarchical RBAC via Spatie Permissions, Fortify, and WebAuthn/Passkey passwordless authentication.",
      "Integrated multi-branch analytics modules featuring automated PDF (DomPDF) and Excel (Maatwebsite) export pipelines."
    ],
    tech: ["Laravel 13", "React 19", "Inertia.js 3.0", "TypeScript", "Filament v5"],
    github: null,
    uiType: "dtm"
  },
  {
    id: "attendance-payroll",
    index: "02",
    title: "Sunfocuz Attendance & Payroll System",
    kicker: "Smart Employee Lifecycle, Selfie Attendance & Automated Payroll Engine",
    description:
      "Mission-critical workforce operations platform featuring biometric selfie verification, live geolocation mapping, and one-click multi-tier payroll calculation.",
    features: [
      "Developed an attendance engine featuring selfie photo verification, real-time geolocation mapping, and an audit lightbox.",
      "Automated business logic for shift timings, leave quotas, and status calculations (Present, Half Day, Absent).",
      "Built a one-click payroll generator calculating gross earnings and attendance-based deductions across a 3-tier lifecycle."
    ],
    tech: ["Laravel 13", "Filament v5", "PHP 8.4", "Tailwind CSS v4", "MariaDB"],
    github: null,
    uiType: "attendance"
  },
  {
    id: "prime-gate",
    index: "03",
    title: "Prime Gate ERP System",
    kicker: "Comprehensive Procurement, Inventory, Sales & Financial Ledger Platform",
    description:
      "Full-scale enterprise resource planning platform powering multi-warehouse logistics, customer-tier sales pricing, purchase orders, and complete double-entry financial accounting.",
    features: [
      "Built multi-warehouse inventory management featuring real-time SKU tracking, inter-branch stock transfers, and stock alerts.",
      "Integrated sales and procurement workflows with customer-tier pricing, quotations, purchase orders, and returns.",
      "Engineered financial ledger modules managing Accounts Payable/Receivable (AP/AR), tax calculations, and audit logs."
    ],
    tech: ["Laravel 13", "Filament v5", "MySQL", "Tailwind CSS v4"],
    github: null,
    uiType: "erp"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: "01",
    title: "One Million Prompters",
    issuer: "UAE Govt / MBZUAI (Mohamed bin Zayed University of Artificial Intelligence)"
  },
  {
    index: "02",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy"
  },
  {
    index: "03",
    title: "UI/UX Design & Development Certification",
    issuer: "Techmindz powered by NDZ"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2019 – 2023",
    title: "Bachelor of Technology (B.Tech) — Computer Science & Engineering",
    place: "Saintgits College of Engineering, Kottayam",
    detail: [
      "Four-year engineering degree in Computer Science & Engineering covering algorithms, operating systems, database management systems, and software engineering.",
      "Built academic and practical software foundations in full-stack architecture and database systems."
    ],
    isEducation: true
  },
  {
    year: "Mar 2024 – Apr 2024",
    title: "UI/UX Design & Development Trainee",
    place: "Ceymox — Magento Development Agency",
    detail: [
      "Designed interactive wireframes and prototypes in Figma.",
      "Developed modular front-end components using HTML, CSS, and JavaScript."
    ]
  },
  {
    year: "May 2025 – Nov 2025",
    title: "Associate — Account Management",
    place: "Sutherland — Kochi, Kerala",
    detail: [
      "Provided technical issue resolution for US client accounts.",
      "Earned Top Performer (Sep 2025) and raised customer satisfaction rating by 25%."
    ]
  },
  {
    year: "Dec 2025 – May 2026",
    title: "Junior Software Engineer",
    place: "coreminds — Kochi, Kerala",
    detail: [
      "Developed and maintained CRM/ERP applications using PHP, Laravel, and Filament for internal administration.",
      "Managed relational databases (MySQL, MariaDB, PostgreSQL) to support application data integrity and reporting queries."
    ]
  },
  {
    year: "May 2026 – Present",
    title: "IT Executive",
    place: "Sunfocuz Electric Pvt Ltd",
    detail: [
      "Lead development and UI/UX improvements of internal CRM and web platforms, improving daily operational workflows.",
      "Manage server uptime, deployment pipelines, and office network infrastructure to maintain high operational availability."
    ]
  },
  {
    year: "Next",
    title: "Your team?",
    place: "Available for high-impact full-stack & front-end engineering",
    detail: [
      "Ready to bring enterprise architecture, React 19, Inertia.js, Laravel, and resilient UX to your mission."
    ],
    isNext: true
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "satisfaction",
    index: "01 / 05",
    number: 25,
    numberPrefix: "+",
    numberSuffix: "%",
    displayValue: "+25%",
    label: "Customer Satisfaction",
    caption: "Technical issue resolution for US client accounts",
    detail: "Directly raised account satisfaction by 25% through proactive debugging and workflow optimizations.",
    platform: "Sutherland Global",
    brandKey: "sutherland",
    glowColor: "rgba(13, 13, 13, 0.08)"
  },
  {
    id: "top-performer",
    index: "02 / 05",
    number: 1,
    numberPrefix: "#",
    numberSuffix: " Top",
    displayValue: "Sep 2025",
    label: "Top Performer Award",
    caption: "Recognized across account management team",
    detail: "Awarded Top Performer in September 2025 for rapid technical problem solving and client service excellence.",
    platform: "Sutherland Global",
    brandKey: "sutherland",
    glowColor: "rgba(13, 13, 13, 0.08)"
  },
  {
    id: "prompters",
    index: "03 / 05",
    number: 1000000,
    numberPrefix: "",
    numberSuffix: "",
    displayValue: "1,000,000",
    label: "One Million Prompters",
    caption: "UAE Govt / MBZUAI Initiative",
    detail: "Selected & certified in advanced prompt engineering, LLM architectures, and AI-assisted workflows.",
    platform: "UAE Govt / MBZUAI",
    brandKey: "cisco",
    glowColor: "rgba(13, 13, 13, 0.08)"
  },
  {
    id: "rbac",
    index: "04 / 05",
    number: 6,
    numberPrefix: "",
    numberSuffix: "-Tier",
    displayValue: "6-Tier",
    label: "Hierarchical RBAC",
    caption: "Granular Enterprise Security Architecture",
    detail: "Architected multi-tier permissions with Spatie, Fortify, and WebAuthn/Passkey passwordless auth.",
    platform: "Sunfocuz Electric",
    brandKey: "laravel",
    glowColor: "rgba(13, 13, 13, 0.08)"
  },
  {
    id: "payroll-engine",
    index: "05 / 05",
    number: 3,
    numberPrefix: "",
    numberSuffix: "-Tier",
    displayValue: "3-Tier",
    label: "Lifecycle Payroll Engine",
    caption: "Automated business logic calculation",
    detail: "Automated shift quotas, biometric selfie audit lightboxes, and one-click earnings/deduction pipeline.",
    platform: "Sunfocuz Electric",
    brandKey: "filament",
    glowColor: "rgba(13, 13, 13, 0.08)"
  }
];
