/**
 * TrainLog's barbell mark, redrawn as SVG from the app's launcher icon
 * (ic_launcher_foreground.png in the Android project's mipmap folders).
 */
export function BarbellMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="128 171 176 90" className={className} style={style} aria-hidden="true">
      <rect x="132" y="175" width="18" height="82" rx="5" fill="var(--accent, #ff6a3d)" />
      <rect x="153" y="189" width="13" height="54" rx="4" fill="var(--accent, #ff6a3d)" opacity="0.55" />
      <rect x="168" y="210" width="96" height="12" rx="6" fill="var(--accent, #ff6a3d)" />
      <rect x="266" y="189" width="13" height="54" rx="4" fill="var(--accent, #ff6a3d)" opacity="0.55" />
      <rect x="282" y="175" width="18" height="82" rx="5" fill="var(--accent, #ff6a3d)" />
    </svg>
  );
}

/** The full app icon: barbell on the dark rounded tile, as it appears on the home screen. */
export default function AppIcon({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: size,
        height: size,
        borderRadius: size * 0.26,
        background: "#141417",
        boxShadow: "inset 0 0 0 1px var(--line-strong)",
      }}
    >
      <BarbellMark style={{ width: "58%", height: "auto", display: "block" }} />
    </span>
  );
}
