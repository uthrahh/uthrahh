import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, in the same palette as the site and GitHub profile.
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
          background: "#131310",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#e07a1f", letterSpacing: 3 }}>
          <span style={{ display: "flex", color: "#85847a", marginRight: 14 }}>~/uthrahh</span>
          DATA ENGINEER · DATA ANALYST · SDE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, color: "#efeee6", fontWeight: 700, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a9a89b", marginTop: 22, maxWidth: 980, lineHeight: 1.35 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#85847a" }}>
          <span style={{ display: "flex" }}>PySpark · Databricks · Delta Lake · SQL · Power BI</span>
          <span style={{ display: "flex", color: "#e07a1f" }}>uthrahrk.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
