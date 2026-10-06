/** Fake-but-believable year of bench press progress, shared by the charts. */

export const CHART_W = 630;
export const CHART_H = 320;
export const Y_MIN = 70;
export const Y_MAX = 105;
export const MONTHS = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"];

const MONTHLY = [75, 77.5, 77.5, 80, 80, 82.5, 85, 85, 90, 92.5, 97.5, 102.5];
const SAMPLES = 36;

export type Point = { x: number; y: number; kg: number };

export const POINTS: Point[] = Array.from({ length: SAMPLES }, (_, k) => {
  const t = (k / (SAMPLES - 1)) * 11;
  const a = Math.min(10, Math.floor(t));
  const f = t - a;
  const wobble = k > 0 && k < SAMPLES - 1 ? Math.sin(k * 1.7) * 1.3 : 0;
  const kg = MONTHLY[a] * (1 - f) + MONTHLY[a + 1] * f + wobble;
  return {
    x: 16 + (k * (CHART_W - 32)) / (SAMPLES - 1),
    y: CHART_H - 20 - ((kg - Y_MIN) / (Y_MAX - Y_MIN)) * (CHART_H - 40),
    kg,
  };
});

export const LINE_PATH = "M" + POINTS.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L");
export const AREA_PATH =
  LINE_PATH + ` L${POINTS[SAMPLES - 1].x.toFixed(1)} ${CHART_H} L${POINTS[0].x.toFixed(1)} ${CHART_H} Z`;

// Cumulative arc length, so a dot can ride the line in step with pathLength.
const LENGTHS = POINTS.reduce<number[]>((acc, p, i) => {
  if (i === 0) return [0];
  const prev = POINTS[i - 1];
  acc.push(acc[i - 1] + Math.hypot(p.x - prev.x, p.y - prev.y));
  return acc;
}, []);
const TOTAL = LENGTHS[LENGTHS.length - 1];

/** Point at fraction t (0-1) of the line's length. */
export function pointAt(t: number): { x: number; y: number } {
  const target = Math.min(1, Math.max(0, t)) * TOTAL;
  let i = 1;
  while (i < LENGTHS.length - 1 && LENGTHS[i] < target) i++;
  const seg = LENGTHS[i] - LENGTHS[i - 1] || 1;
  const f = (target - LENGTHS[i - 1]) / seg;
  return {
    x: POINTS[i - 1].x + (POINTS[i].x - POINTS[i - 1].x) * f,
    y: POINTS[i - 1].y + (POINTS[i].y - POINTS[i - 1].y) * f,
  };
}

/** New all-time highs along the way, with where they sit on the line (0-1). */
export const PRS = (() => {
  const out: { x: number; y: number; at: number }[] = [];
  let best = 0;
  POINTS.forEach((p, i) => {
    if (p.kg > best + 3.2 || i === POINTS.length - 1) {
      if (i > 2) out.push({ x: p.x, y: p.y, at: LENGTHS[i] / TOTAL });
      best = p.kg;
    }
  });
  return out;
})();
