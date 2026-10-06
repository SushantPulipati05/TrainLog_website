import { ImageResponse } from "next/og";
import { heatLevels } from "@/lib/heatmap";

export const alt = "TrainLog — Every square is a day you showed up.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = ["#1c1c20", "rgba(255,106,61,0.25)", "rgba(255,106,61,0.5)", "rgba(255,106,61,0.75)", "#ff6a3d"];
const COLS = 24;
const ROWS = 13;

/** Link preview image (WhatsApp, Discord, etc.): the heatmap with the headline on top. */
export default function Image() {
  const levels = heatLevels(COLS * ROWS, COLS);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b0b0d" }}>
        <div style={{ position: "absolute", inset: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {levels.map((l, i) => (
            <div key={i} style={{ width: 39, height: 39, borderRadius: 6, background: COLORS[l] }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 56,
            top: 120,
            padding: "40px 48px",
            background: "#0b0b0d",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#f5f5f7", fontSize: 30, fontWeight: 900, letterSpacing: 2 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "#141417", border: "1px solid #3a3a40", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="38" height="20" viewBox="128 171 176 90">
                <rect x="132" y="175" width="18" height="82" rx="5" fill="#ff6a3d" />
                <rect x="153" y="189" width="13" height="54" rx="4" fill="#ff6a3d" fillOpacity="0.55" />
                <rect x="168" y="210" width="96" height="12" rx="6" fill="#ff6a3d" />
                <rect x="266" y="189" width="13" height="54" rx="4" fill="#ff6a3d" fillOpacity="0.55" />
                <rect x="282" y="175" width="18" height="82" rx="5" fill="#ff6a3d" />
              </svg>
            </div>
            TRAINLOG
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#f5f5f7", fontSize: 76, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>
            <span>Every square is</span>
            <span>a day you</span>
            <span style={{ color: "#ff6a3d" }}>showed up.</span>
          </div>
          <div style={{ color: "#b4b4ba", fontSize: 24 }}>Free workout log for Android</div>
        </div>
      </div>
    ),
    size,
  );
}
