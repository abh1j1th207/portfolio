import React from "react";
import { PROFILE, SKILLS } from "@/lib/data";

interface JsonLdProps {
  siteUrl?: string;
}

export function JsonLd({ siteUrl }: JsonLdProps) {
  const baseUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://abhijith.dev";

  // Skills extracted directly from verified data
  const keySkills = SKILLS.map((s) => s.name);

  // Person schema - STRICT ZERO FABRICATION: extracted strictly from resume.pdf and verified site copy
  // No personal phone number or email exposed (spam protection)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    description: PROFILE.resumeSummary,
    url: baseUrl,
    image: `${baseUrl}/portrait-bust.webp`,
    sameAs: [PROFILE.github, PROFILE.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "Sunfocuz Electric Pvt Ltd",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Saintgits College of Engineering, Kottayam",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    knowsAbout: keySkills,
  };

  // WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Abhijith C — Full-Stack Developer Portfolio",
    description:
      "Full-Stack and Frontend Developer experienced in building enterprise web applications, ERPs, and SPAs.",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-IN",
  };

  // ProfilePage schema
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#webpage`,
    url: baseUrl,
    name: "Abhijith C — Full-Stack & Frontend Developer",
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-IN",
  };

  // Escape '<' to prevent XSS / HTML parser breakout
  const safeJsonString = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonString(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonString(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonString(profilePageSchema) }}
      />
    </>
  );
}
