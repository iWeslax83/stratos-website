import { ImageResponse } from "next/og";

// Browser-tab favicon. The full emblem (with the "STRATOS" wordmark) turns into
// an illegible blur at 16px, so the tab uses a bold, high-contrast "S" monogram
// on the brand teal — readable on both light and dark tab bars.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4FB3BF 0%, #134E56 100%)",
          color: "#FFFFFF",
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -2,
          borderRadius: 14,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
