import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE } from "@/lib/data";
import { GoogleAdUnit } from "@/components/ui/GoogleAdUnit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithc.online";
const LAST_UPDATED = "October 23, 2026";
const EFFECTIVE_DATE = "October 23, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — EU GDPR, US Regulations & Cookie Disclosures",
  description:
    "Privacy Policy for abhijithc.online detailing data collection, Google AdSense cookie usage, user rights under the European GDPR/UK GDPR, California CCPA/CPRA, and US State privacy regulations.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-[#f4f2ee] text-[#0d0d0d] font-sans antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#f4f2ee]/90 backdrop-blur-md border-b border-[#0d0d0d]/10">
        <div className="section-container h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-lg p-1"
            aria-label="Return to homepage"
          >
            <span className="w-8 h-8 rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center font-mono text-xs font-bold group-hover:scale-105 transition-transform">
              AC
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#0d0d0d] group-hover:underline">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider">
                Portfolio & Legal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#0d0d0d]/15 bg-white text-xs font-mono font-medium hover:bg-[#0d0d0d] hover:text-white transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="section-container pt-12 pb-24 max-w-4xl">
        {/* Title and Metadata Header */}
        <div className="mb-12 border-b border-[#0d0d0d]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0d0d0d]/15 bg-white text-[11px] font-mono uppercase tracking-wider text-[#77756f] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
            Regulatory Compliance Notice
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0d0d0d] mb-4 font-display">
            Privacy Policy
          </h1>

          <p className="text-base sm:text-lg text-[#3a3a3a] leading-relaxed max-w-3xl mb-6">
            This Privacy Policy explains how <strong>{PROFILE.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, protects, and discloses personal information through{" "}
            <a href={siteUrl} className="font-semibold underline underline-offset-4 decoration-[#0d0d0d]/30 hover:decoration-[#0d0d0d]">
              {siteUrl}
            </a>. It addresses compliance with European privacy standards (including the <strong>General Data Protection Regulation / GDPR</strong> and the <strong>ePrivacy Directive</strong>) as well as United States federal and state laws (including the <strong>California Consumer Privacy Act / CCPA</strong> as amended by the <strong>CPRA</strong>, <strong>COPPA</strong>, and other state privacy regulations).
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#77756f]">
            <div>
              <span className="text-[#0d0d0d] font-bold">Effective Date:</span> {EFFECTIVE_DATE}
            </div>
            <div>
              <span className="text-[#0d0d0d] font-bold">Last Updated:</span> {LAST_UPDATED}
            </div>
            <div>
              <span className="text-[#0d0d0d] font-bold">Publisher:</span> {PROFILE.name} (Kochi, Kerala, India)
            </div>
          </div>
        </div>

        {/* Quick Jump Links */}
        <nav aria-label="Table of Contents" className="mb-12 p-6 rounded-2xl bg-white border border-[#0d0d0d]/10 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#77756f] mb-3 font-bold">
            Contents & Quick Navigation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <a href="#controller" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>01.</span> Data Controller & Contact
            </a>
            <a href="#information-collected" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>02.</span> Information We Collect
            </a>
            <a href="#adsense-cookies" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5 font-bold">
              <span>03.</span> Google AdSense & Cookies
            </a>
            <a href="#analytics" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>04.</span> Analytics & Performance
            </a>
            <a href="#gdpr" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5 font-bold">
              <span>05.</span> European Rights (GDPR)
            </a>
            <a href="#us-regulations" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5 font-bold">
              <span>06.</span> US Regulations (CCPA / CPRA)
            </a>
            <a href="#opt-out" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>07.</span> Do Not Sell or Share My Info
            </a>
            <a href="#children" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>08.</span> Children&rsquo;s Privacy (COPPA)
            </a>
            <a href="#retention-security" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>09.</span> Security & Retention
            </a>
            <a href="#contact" className="text-[#0d0d0d] hover:underline flex items-center gap-1.5">
              <span>10.</span> Inquiries & Rights Requests
            </a>
          </div>
        </nav>

        {/* Article Body */}
        <article className="space-y-12 text-[#2a2a2a] leading-relaxed text-sm sm:text-base">

          {/* Section 1: Controller */}
          <section id="controller" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">01.</span>
              Data Controller & Responsible Entity
            </h2>
            <p>
              Under Article 4(7) of the EU General Data Protection Regulation (GDPR) and related data protection statutes, the Data Controller responsible for processing personal data on this website is:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10 font-mono text-xs space-y-1">
              <div><strong className="text-[#0d0d0d]">Entity:</strong> {PROFILE.name}</div>
              <div><strong className="text-[#0d0d0d]">Location:</strong> {PROFILE.location}</div>
              <div>
                <strong className="text-[#0d0d0d]">Email:</strong>{" "}
                <a href={`mailto:${PROFILE.email}`} className="text-[#0d0d0d] underline font-bold">
                  {PROFILE.email}
                </a>
              </div>
              <div><strong className="text-[#0d0d0d]">Website:</strong> {siteUrl}</div>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="information-collected" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">02.</span>
              Information We Collect
            </h2>
            <p>
              We collect information in two principal manners: directly from you when you communicate with us, and automatically via technical infrastructure when you browse our site.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10">
                <h3 className="text-base font-bold text-[#0d0d0d] mb-1">A. Information You Voluntarily Provide</h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                  When you send us an email, request collaboration, or initiate communication, you may voluntarily provide identifiers such as your <strong>full name</strong>, <strong>email address</strong>, <strong>phone number</strong>, <strong>organization name</strong>, and any free-form text or documents included in your message.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10">
                <h3 className="text-base font-bold text-[#0d0d0d] mb-1">B. Information Automatically Collected</h3>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-3">
                  When accessing this website, our hosting provider (Vercel) and third-party advertising partners (Google AdSense) may automatically collect standard electronic telemetry, including:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#555] space-y-1 pl-2 font-mono">
                  <li>Internet Protocol (IP) address (truncated/anonymized where applicable)</li>
                  <li>Browser type, version, language preferences, and operating system</li>
                  <li>Referring URL and exit pages</li>
                  <li>Timestamps, date/time of requests, and duration of visits</li>
                  <li>Device characteristics (screen resolution, device model, touch capability)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Native In-Article AdSense Unit */}
          <div className="py-2">
            <GoogleAdUnit
              client="ca-pub-4049435921186193"
              slot="3394242025"
              layout="in-article"
              format="fluid"
            />
          </div>

          {/* Section 3: Google AdSense, Advertising & Cookies */}
          <section id="adsense-cookies" className="scroll-mt-24 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0d0d0d] text-[#f4f2ee] space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#f4f2ee]/15 text-[11px] font-mono uppercase tracking-wider text-[#f4f2ee]/80">
                Crucial Disclosure
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="font-mono text-sm text-[#f4f2ee]/60">03.</span>
                Google AdSense, Third-Party Advertising & Cookies
              </h2>
              <p className="text-xs sm:text-sm text-[#f4f2ee]/80 leading-relaxed">
                This website integrates <strong>Google AdSense</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) to display advertisements. Because of this integration, Google and third-party vendors use cookies and similar technologies to serve and personalize ads.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0d0d0d]">How Google AdSense Uses Cookies</h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#444] pl-2">
                <li>
                  <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this website or other websites on the Internet.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites across the web.
                </li>
                <li>
                  <strong>Personalized vs. Non-Personalized Ads:</strong> For users in regions subject to consent frameworks (such as the EU/EEA and UK), ads served will conform to your consent selection. Where consent is not given or personalized ads are opted out of, ads served will be non-personalized (contextual, based on current page content and coarse geography).
                </li>
              </ul>

              <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10 space-y-3">
                <h4 className="text-sm font-bold text-[#0d0d0d]">How to Control and Opt-Out of Personalized Ads</h4>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                  You can opt out of personalized advertising and manage your preferences at any time through the following official opt-out portals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#0d0d0d]/10 hover:border-[#0d0d0d] bg-[#f4f2ee]/50 transition-colors flex items-center justify-between"
                  >
                    <span>Google Ads Settings</span>
                    <span className="font-bold">↗</span>
                  </a>
                  <a
                    href="https://aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#0d0d0d]/10 hover:border-[#0d0d0d] bg-[#f4f2ee]/50 transition-colors flex items-center justify-between"
                  >
                    <span>AboutAds Choices (DAA)</span>
                    <span className="font-bold">↗</span>
                  </a>
                  <a
                    href="https://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#0d0d0d]/10 hover:border-[#0d0d0d] bg-[#f4f2ee]/50 transition-colors flex items-center justify-between"
                  >
                    <span>Your Online Choices (EU/EDAA)</span>
                    <span className="font-bold">↗</span>
                  </a>
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-[#0d0d0d]/10 hover:border-[#0d0d0d] bg-[#f4f2ee]/50 transition-colors flex items-center justify-between"
                  >
                    <span>Network Advertising Initiative (NAI)</span>
                    <span className="font-bold">↗</span>
                  </a>
                </div>
                <p className="text-xs text-[#77756f] pt-1">
                  To learn in detail how Google handles information when you visit partner sites, review:{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#0d0d0d] font-bold"
                  >
                    How Google uses information from sites or apps that use our services ↗
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Analytics */}
          <section id="analytics" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">04.</span>
              Analytics & Telemetry
            </h2>
            <p>
              To maintain site performance, uptime, and accessibility standards, we utilize privacy-focused analytics:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#444] pl-2">
              <li>
                <strong>Vercel Analytics:</strong> Deployed via Vercel Inc. It measures core web vitals (Largest Contentful Paint, Cumulative Layout Shift, First Input Delay) and aggregated audience traffic without collecting persistent personally identifiable information (PII) or profiling visitors across separate websites.
              </li>
              <li>
                <strong>Google Analytics (if active):</strong> If enabled, Google Analytics processes anonymized usage data to evaluate general visitor trends. IP masking is enabled to prevent individual identification.
              </li>
            </ul>
          </section>

          {/* Section 5: European Regulations (GDPR) */}
          <section id="gdpr" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
                <span className="font-mono text-sm text-[#77756f]">05.</span>
                European Privacy Rights (GDPR & UK GDPR)
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#0d0d0d] text-white text-[10px] font-mono font-bold uppercase">
                EU / EEA / UK
              </span>
            </div>

            <p>
              If you are a resident of the European Economic Area (EEA), the United Kingdom (UK), or Switzerland, your personal data is protected under the <strong>General Data Protection Regulation (Regulation (EU) 2016/679)</strong> and the <strong>UK GDPR / Data Protection Act 2018</strong>.
            </p>

            <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10 space-y-3">
              <h3 className="text-base font-bold text-[#0d0d0d]">Legal Bases for Processing (Article 6 GDPR)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#0d0d0d]/10 text-[#77756f]">
                      <th className="py-2 pr-4 font-bold uppercase">Legal Basis</th>
                      <th className="py-2 pr-4 font-bold uppercase">Processing Purpose</th>
                      <th className="py-2 font-bold uppercase">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0d0d0d]/5 text-[#3a3a3a]">
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">Consent (Art. 6(1)(a))</td>
                      <td className="py-2.5 pr-4">Personalized advertising cookies & tracking technologies.</td>
                      <td className="py-2.5">AdSense personalized ads, optional tracking.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">Legitimate Interests (Art. 6(1)(f))</td>
                      <td className="py-2.5 pr-4">Website security, fraud prevention, server error diagnostics.</td>
                      <td className="py-2.5">Server access logs, Vercel performance telemetry.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">Contractual Necessity (Art. 6(1)(b))</td>
                      <td className="py-2.5 pr-4">Responding to professional contact, job offers, client contracts.</td>
                      <td className="py-2.5">Direct emails sent to our inbox.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0d0d0d]">Your GDPR Rights</h3>
              <p className="text-xs sm:text-sm text-[#555]">
                Under GDPR Articles 15 through 22, you are entitled to exercise the following statutory rights at no cost:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right of Access (Art. 15)</strong>
                  <span>Obtain confirmation whether your personal data is processed, and receive a copy of your records.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right to Rectification (Art. 16)</strong>
                  <span>Demand correction of inaccurate or incomplete personal information.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right to Erasure (Art. 17)</strong>
                  <span>Request deletion of your data (&ldquo;Right to be Forgotten&rdquo;) where no legal retention requirement exists.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right to Restriction (Art. 18)</strong>
                  <span>Limit the processing of your data while an objection or accuracy dispute is verified.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right to Data Portability (Art. 20)</strong>
                  <span>Receive your personal data in an interoperable, machine-readable format.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#0d0d0d]/10">
                  <strong className="block text-[#0d0d0d] font-mono mb-1">Right to Object (Art. 21)</strong>
                  <span>Object at any time to data processing carried out under legitimate interests or for marketing.</span>
                </div>
              </div>
              <p className="text-xs text-[#77756f]">
                <strong>Right to Lodge a Complaint:</strong> If you believe our data processing infringes European data protection legislation, you have the right to lodge a complaint with your local Data Protection Authority (DPA) in the EU member state of your habitual residence or workplace.
              </p>
            </div>
          </section>

          {/* Section 6: United States Privacy Regulations (CCPA/CPRA, etc.) */}
          <section id="us-regulations" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
                <span className="font-mono text-sm text-[#77756f]">06.</span>
                United States Privacy Regulations
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#0d0d0d] text-white text-[10px] font-mono font-bold uppercase">
                US / CCPA / CPRA
              </span>
            </div>

            <p>
              This section provides disclosures required under United States state privacy statutes, including the <strong>California Consumer Privacy Act (CCPA)</strong> as amended by the <strong>California Privacy Rights Act (CPRA)</strong> (Cal. Civ. Code § 1798.100 et seq.), the <strong>Virginia Consumer Data Protection Act (VCDPA)</strong>, the <strong>Colorado Privacy Act (CPA)</strong>, the <strong>Connecticut Data Privacy Act (CTDPA)</strong>, and the <strong>Texas Data Privacy and Security Act (TDPSA)</strong>.
            </p>

            <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10 space-y-4">
              <h3 className="text-base font-bold text-[#0d0d0d]">Notice at Collection: Categories of Personal Information</h3>
              <p className="text-xs text-[#555]">
                In the preceding 12 months, we have collected (or our third-party advertising partners have collected) the following categories of personal information defined by the CCPA:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[#0d0d0d]/10 text-[#77756f]">
                      <th className="py-2 pr-4 font-bold uppercase">Category</th>
                      <th className="py-2 pr-4 font-bold uppercase">Source</th>
                      <th className="py-2 pr-4 font-bold uppercase">Purpose</th>
                      <th className="py-2 font-bold uppercase">Disclosed / Shared With</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0d0d0d]/5 text-[#3a3a3a]">
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">A. Identifiers</td>
                      <td className="py-2.5 pr-4">Direct interaction, Browser cookies</td>
                      <td className="py-2.5 pr-4">Communications, security, ad delivery</td>
                      <td className="py-2.5">Cloud hosts (Vercel), Google AdSense</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">B. Internet / Network Activity</td>
                      <td className="py-2.5 pr-4">Automated device logs</td>
                      <td className="py-2.5 pr-4">Site telemetry, advertising measurement</td>
                      <td className="py-2.5">Vercel Analytics, Google LLC</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">C. Geolocation Data</td>
                      <td className="py-2.5 pr-4">IP address (coarse country/city level)</td>
                      <td className="py-2.5 pr-4">Ad delivery & regional routing</td>
                      <td className="py-2.5">Google LLC</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#0d0d0d]">D. Inferences</td>
                      <td className="py-2.5 pr-4">Advertising network profiling</td>
                      <td className="py-2.5 pr-4">Interest-based advertising</td>
                      <td className="py-2.5">Google AdSense partners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0d0d0d]">Your California & US State Consumer Rights</h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#444] pl-2">
                <li>
                  <strong>Right to Know & Access:</strong> You have the right to request disclosure of the specific pieces and categories of personal information collected, the sources, commercial purposes, and categories of third parties to whom data was disclosed.
                </li>
                <li>
                  <strong>Right to Delete:</strong> You have the right to request the deletion of personal information collected from you, subject to statutory exceptions.
                </li>
                <li>
                  <strong>Right to Correct:</strong> You have the right to request the correction of inaccurate personal information maintained about you.
                </li>
                <li>
                  <strong>Right to Non-Discrimination:</strong> We will not discriminate against you (such as charging different prices or degrading site access) for exercising any of your privacy rights.
                </li>
                <li>
                  <strong>Sensitive Personal Information:</strong> We do <em>not</em> collect or process &ldquo;Sensitive Personal Information&rdquo; (e.g., government identifiers, racial or ethnic origin, precise geolocation, health records, or biometric data).
                </li>
                <li>
                  <strong>California &ldquo;Shine the Light&rdquo; Law:</strong> Under California Civil Code Section 1798.83, California residents may request once per calendar year a list of third parties to whom we disclosed personal information for direct marketing purposes during the prior calendar year.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7: Opt-out / Do Not Sell or Share */}
          <section id="opt-out" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">07.</span>
              &ldquo;Do Not Sell or Share My Personal Information&rdquo; Notice
            </h2>
            <p>
              Under the CPRA, the disclosure of electronic identifiers and browsing activity to third-party advertising networks (like Google AdSense) for interest-based advertising may be classified as a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information.
            </p>
            <div className="p-5 rounded-xl bg-white border border-[#0d0d0d]/10 space-y-3">
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                We do not sell personal information for monetary compensation. However, to the extent that advertising cookies are considered &ldquo;selling&rdquo; or &ldquo;sharing&rdquo; under California or other US state laws, you may exercise your opt-out right by:
              </p>
              <ol className="list-decimal list-inside text-xs sm:text-sm text-[#555] space-y-1.5 pl-2">
                <li>
                  Visiting the{" "}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#0d0d0d]">
                    Google Ads Settings
                  </a>{" "}
                  page and turning off personalized ads.
                </li>
                <li>
                  Opting out via industry-standard consumer choice mechanisms at{" "}
                  <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#0d0d0d]">
                    DAA WebChoices
                  </a>{" "}
                  or{" "}
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#0d0d0d]">
                    NAI Consumer Opt-Out
                  </a>.
                </li>
                <li>
                  Enabling the <strong>Global Privacy Control (GPC)</strong> signal in your browser. When our site detects a GPC signal, we honor it as a valid opt-out request for targeted advertising.
                </li>
                <li>
                  Emailing us directly at{" "}
                  <a href={`mailto:${PROFILE.email}?subject=Do%20Not%20Sell%20My%20Info`} className="font-bold underline text-[#0d0d0d]">
                    {PROFILE.email}
                  </a>.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 8: Children's Privacy */}
          <section id="children" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">08.</span>
              Children&rsquo;s Privacy (COPPA & GDPR)
            </h2>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              This website is an engineering portfolio and is not directed at children. In accordance with the <strong>Children&rsquo;s Online Privacy Protection Act (COPPA)</strong> in the United States and Article 8 of the GDPR in Europe, we do not knowingly collect, solicit, or share personal data from children under the age of 13 (or under 16 in applicable EU jurisdictions). If you are a parent or guardian and believe that a child has provided us with personal data, please contact us immediately at{" "}
              <a href={`mailto:${PROFILE.email}`} className="font-bold underline text-[#0d0d0d]">
                {PROFILE.email}
              </a>
              , and we will promptly delete such information from our records.
            </p>
          </section>

          {/* Section 9: Retention & Security */}
          <section id="retention-security" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">09.</span>
              Data Retention, Security & International Transfers
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#555]">
              <p>
                <strong>Security Measures:</strong> We employ industry-standard technical measures including HTTPS/TLS cryptographic encryption, automated security headers, and secure deployment pipelines via Vercel to protect all data transmissions.
              </p>
              <p>
                <strong>Data Retention:</strong> Direct correspondence is retained only as long as necessary to address inquiries, conduct professional business, or comply with statutory record-keeping obligations. Server logs are maintained for diagnostic and anti-abuse purposes and automatically rolled over within 30 to 90 days.
              </p>
              <p>
                <strong>International Transfers:</strong> If you access this website from the EU, UK, or other territories, your data may be transferred to and processed in countries outside your residence (including the United States), where servers hosting Vercel infrastructure and Google AdSense are located. Such transfers are safeguarded via Standard Contractual Clauses (SCCs) and adherence to approved adequacy mechanisms.
              </p>
            </div>
          </section>

          {/* Section 10: Inquiries & Contact */}
          <section id="contact" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#0d0d0d]/10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] flex items-center gap-2">
              <span className="font-mono text-sm text-[#77756f]">10.</span>
              How to Exercise Your Rights & Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              To exercise any of your GDPR, CCPA/CPRA, or state privacy rights, or to submit questions, comments, or complaints concerning this Privacy Policy, please contact us directly:
            </p>

            <div className="p-6 rounded-2xl bg-white border border-[#0d0d0d]/15 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0d0d0d]/10 pb-4">
                <div>
                  <div className="font-bold text-base text-[#0d0d0d]">{PROFILE.name}</div>
                  <div className="font-mono text-xs text-[#77756f]">{PROFILE.role}</div>
                </div>
                <div className="font-mono text-xs text-[#77756f]">
                  {PROFILE.location}
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#77756f] block">Electronic Mail:</span>
                  <a
                    href={`mailto:${PROFILE.email}?subject=Privacy%20Inquiry%20-%20${encodeURIComponent(PROFILE.name)}`}
                    className="text-[#0d0d0d] font-bold underline text-sm"
                  >
                    {PROFILE.email}
                  </a>
                </div>
                <div className="sm:ml-auto">
                  <span className="text-[#77756f] block">Statutory Response Window:</span>
                  <span className="font-bold text-[#0d0d0d]">GDPR: &le; 30 Days · CCPA: &le; 45 Days</span>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* AdSense Unit */}
        <div className="pt-8">
          <GoogleAdUnit
            client="ca-pub-4049435921186193"
            slot="1554546740"
            format="auto"
            responsive={true}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <Link
            href="/"
            className="text-[#0d0d0d] font-bold hover:underline flex items-center gap-1"
          >
            ← Return to Homepage
          </Link>
          <div className="flex items-center gap-4">
            <a href="#top" className="text-[#0d0d0d] font-bold hover:underline">
              Back to top ↑
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
