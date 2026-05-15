import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stratos — Bursa Fen Lisesi İHA Takımı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #07101E 0%, #0F1D33 40%, #06181B 100%)",
          color: "#F2F4F7",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(42,145,160,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,120,73,0.20) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#1A6973",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#E6F5F7",
            }}
          >
            ST
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C5CCDB",
            }}
          >
            Bursa Fen Lisesi İHA Takımı
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4FB3BF",
            }}
          >
            TEKNOFEST 2026 · Döner Kanat
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              backgroundImage: "linear-gradient(180deg,#F2F4F7,#B5C8D0)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            STRATOS
          </div>
          <div style={{ fontSize: 30, color: "#9AA3BA", maxWidth: 900 }}>
            Tasarım, üretim, otonom yazılım ve uçuş — hepsini öğrenci eliyle
            yapan, ulusal yarışmalarda sahaya çıkan bir lise takımı.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#6B7691",
            fontSize: 20,
          }}
        >
          <div>stratosiha.vercel.app</div>
          <div style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Tofaş Fen Lisesi · Bursa
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
