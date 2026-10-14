import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Abhijith C — Full-Stack & Frontend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const interTightBold = fs.readFileSync(
    path.join(process.cwd(), "src/fonts/InterTight-Bold.woff")
  );
  const instrumentSerif = fs.readFileSync(
    path.join(process.cwd(), "src/fonts/InstrumentSerif-Regular.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f2ee",
          padding: "72px 80px",
          fontFamily: "Inter Tight, sans-serif",
          color: "#0d0d0d",
          position: "relative",
        }}
      >
        {/* Subtle grid border frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(13, 13, 13, 0.12)",
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />

        {/* Top bar: Section indicator & status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              backgroundColor: "rgba(13, 13, 13, 0.05)",
              borderRadius: "9999px",
              border: "1px solid rgba(13, 13, 13, 0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#0d0d0d",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#0d0d0d",
              }}
            >
              Portfolio · 2026
            </span>
          </div>

          <span
            style={{
              fontSize: "15px",
              color: "#77756f",
              letterSpacing: "0.02em",
            }}
          >
            Kochi, Kerala, India
          </span>
        </div>

        {/* Center: Hero typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "960px",
          }}
        >
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#0d0d0d",
            }}
          >
            Abhijith C
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              fontSize: "44px",
              color: "#3a3a3a",
              lineHeight: 1.1,
            }}
          >
            <span>Full-Stack &amp;</span>
            <span
              style={{
                fontFamily: "Instrument Serif, serif",
                fontStyle: "italic",
                color: "#77756f",
                fontSize: "48px",
              }}
            >
              Frontend Developer.
            </span>
          </div>
        </div>

        {/* Bottom bar: Tech Stack Pills & Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(13, 13, 13, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {["React 19", "Inertia.js", "TypeScript", "Laravel 13", "Filament"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(13, 13, 13, 0.1)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0d0d0d",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#0d0d0d",
              letterSpacing: "-0.01em",
            }}
          >
            abhijithc.online
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter Tight",
          data: interTightBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Instrument Serif",
          data: instrumentSerif,
          style: "italic",
          weight: 400,
        },
      ],
    }
  );
}
