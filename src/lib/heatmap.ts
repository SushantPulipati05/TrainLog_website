/** Heat levels 0 (rest day) to 4 (big day), matching the app's heatmap. */
export const HEAT_COLORS = [
  "var(--empty)",
  "rgba(255, 106, 61, 0.25)",
  "rgba(255, 106, 61, 0.5)",
  "rgba(255, 106, 61, 0.75)",
  "var(--accent)",
] as const;

/** Small deterministic PRNG so the server and the browser draw the same grid. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Levels for a grid that gets busier from left to right,
 * like someone who keeps showing up.
 */
export function heatLevels(count: number, columns: number, seed = 11): number[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const trend = (i % columns) / columns;
    const v = rand();
    return v < 0.45 - trend * 0.25 ? 0 : Math.min(4, Math.floor(v * 3 + trend * 2.2));
  });
}
