import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/scroll";
import { JsonLd } from "@/components/seo/JsonLd";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithc.online";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abhijith C — Full-Stack & Frontend Developer",
    template: "%s | Abhijith C",
  },
  description:
    "Full-Stack Developer in Kerala, India building enterprise ERPs & SPAs with React 19, Inertia.js, TypeScript, and Laravel. View engineering portfolio.",
  applicationName: "Abhijith C Portfolio",
  authors: [{ name: "Abhijith C", url: siteUrl }],
  creator: "Abhijith C",
  publisher: "Abhijith C",
  keywords: [
    "Abhijith C",
    "Abhijith C developer",
    "Full-stack developer Kerala",
    "Laravel React developer India",
    "Inertia.js developer",
    "TypeScript developer India",
    "Enterprise web applications",
    "Full stack engineer Kochi",
    "React 19 Laravel 13 developer",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Abhijith C — Full-Stack Developer Portfolio",
    title: "Abhijith C — Full-Stack & Frontend Developer",
    description:
      "Full-Stack Developer in Kerala, India building enterprise ERPs & SPAs with React 19, Inertia.js, TypeScript, and Laravel.",
    images: [
      {
        url: "/og.png",
        width: 1917,
        height: 983,
        alt: "Abhijith C — Full-Stack & Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijith C — Full-Stack & Frontend Developer",
    description:
      "Full-Stack Developer in Kerala, India building enterprise ERPs & SPAs with React 19, Inertia.js, TypeScript, and Laravel.",
    images: ["/og.png"],
    creator: "@abh1j1th207",
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: googleVerification || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd siteUrl={siteUrl} />
        <link
          rel="preload"
          as="image"
          href="/portrait-bust.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var m = window.matchMedia('(prefers-color-scheme: dark)');
                  function updateIcon(e) {
                    var isDark = e.matches;
                    var links = document.querySelectorAll("link[rel*='icon']");
                    links.forEach(function(link) {
                      if (link.getAttribute('type') === 'image/png') {
                        link.href = isDark ? '/favicon-light.png' : '/favicon.png';
                      }
                    });
                  }
                  if (m.matches) updateIcon(m);
                  if (m.addEventListener) m.addEventListener('change', updateIcon);
                  else if (m.addListener) m.addListener(updateIcon);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {/* Skip to Content accessible link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0d0d0d] focus:text-[#f4f2ee] focus:rounded-md focus:shadow-lg focus:outline-none font-mono text-xs font-bold"
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />

        {/* Optional Google Analytics Script via environment variable */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
