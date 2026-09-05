import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brand} — ${site.name}`;

/** Social preview card, generated at build time. No image file to maintain. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          color: "#ecece8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8b8b94" }}>
          <span>{site.name.toUpperCase()}</span>
          <span>{site.role.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: -12, lineHeight: 0.85 }}>{site.brand.toUpperCase()}</div>
          <div style={{ width: 56, height: 56, background: "#c8f542", transform: "rotate(45deg)", marginBottom: 24 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8b8b94" }}>
          <span>{site.facts.studio.toUpperCase()} · {site.facts.years} YRS</span>
          <span>{site.facts.university.toUpperCase()}</span>
        </div>
      </div>
    ),
    size,
  );
}
