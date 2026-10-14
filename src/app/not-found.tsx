import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f4f2ee] text-[#0d0d0d] px-6 text-center">
      <div className="space-y-4 max-w-md">
        <span className="font-mono text-xs uppercase tracking-widest text-[#77756f]">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
          Page not found.
        </h1>
        <p className="text-sm sm:text-base text-[#77756f] leading-relaxed">
          The requested resource does not exist or has been relocated.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0d0d0d] text-[#f4f2ee] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
