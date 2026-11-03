import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card: the "two sides" split, paper on the left, night on the right.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0f1217",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 600, height: "100%", background: "#f4f1ea" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, letterSpacing: 4, fontWeight: 700 }}>
            <span style={{ display: "flex", color: "#16130f" }}>DATA ENGINEER</span>
            <span style={{ display: "flex", color: "#ff6a13", margin: "0 18px" }}>+</span>
            <span style={{ display: "flex", color: "#ffb547" }}>FREELANCE APP DEVELOPER</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, color: "#16130f", fontWeight: 900, letterSpacing: -3, textTransform: "uppercase" }}>
              {site.name.split(" ").slice(0, 2).join(" ")}
            </div>
            <div style={{ display: "flex", fontSize: 32, color: "#f4f1ea", marginTop: 22, maxWidth: 760, lineHeight: 1.35, background: "#ff6a13", padding: "10px 18px" }}>
              <span style={{ display: "flex", color: "#16130f", fontWeight: 700 }}>
                Every product has two sides.
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#8d96a6" }}>
            <span style={{ display: "flex", color: "#6f685d" }}>PySpark · Databricks · Delta Lake</span>
            <span style={{ display: "flex", color: "#ff8a3d", fontWeight: 700 }}>uthrahrk.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
