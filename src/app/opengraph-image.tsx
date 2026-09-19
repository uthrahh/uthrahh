import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ee",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8a5423", letterSpacing: 4 }}>
          {site.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, color: "#16181a", fontWeight: 600 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#55564f", marginTop: 24, maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
