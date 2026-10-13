import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/scroll";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap"
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-instrument-serif",
  display: "swap"
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Abhijith C — Full-Stack & Frontend Developer",
  description:
    "Full-Stack and Frontend Developer experienced in building enterprise web applications, ERPs, and SPAs with React 19, Inertia.js 3.0, TypeScript, Tailwind CSS v4, and Laravel 13.",
  metadataBase: new URL("https://abhijith.dev"),
  openGraph: {
    title: "Abhijith C — Full-Stack & Frontend Developer",
    description:
      "Enterprise web applications, ERPs, and SPAs with React 19, Inertia.js 3.0, TypeScript, Tailwind CSS v4, and Laravel 13.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Abhijith C — Full-Stack & Frontend Developer"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijith C — Full-Stack & Frontend Developer",
    description: "Enterprise web applications, ERPs, and SPAs.",
    images: ["/og.jpg"]
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png"
      },
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
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
            `
          }}
        />
      </head>
      <body className="antialiased bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
