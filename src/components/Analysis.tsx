"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  AREA_PATH,
  CHART_H,
  CHART_W,
  LINE_PATH,
  MONTHS,
  POINTS,
  PRS,
  Y_MAX,
  Y_MIN,
  pointAt,
} from "@/lib/chart";
import { usePinnedLayout } from "@/lib/hooks";
import { ANALYSIS_STATS } from "@/lib/site";
import styles from "./Analysis.module.css";

/**
 * Desktop: the section pins and scrolling draws the line.
 * Phones / reduced motion: no pinning; the chart draws as it scrolls through the screen.
 * Remounting on layout change keeps each version's scroll hooks simple.
 */
export default function Analysis() {
  const pinned = usePinnedLayout();
  return <AnalysisInner key={pinned ? "pinned" : "flow"} pinned={pinned} />;
}

const Y_TICKS = Array.from({ length: 6 }, (_, i) => Math.round(Y_MAX - (i * (Y_MAX - Y_MIN)) / 5));
const LAST = POINTS[POINTS.length - 1];

function AnalysisInner({ pinned }: { pinned: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll(
    pinned
      ? { target: sectionRef, offset: ["start start", "end end"] }
      : { target: chartRef, offset: ["start 85%", "end 45%"] },
  );
  // How much of the line is drawn (0-1), and the window the stat tiles count up in.
  const lineRange: [number, number] = pinned ? [0.06, 0.7] : [0, 0.8];
  const tilesStart = pinned ? 0.72 : 0.8;

  const line = useTransform(scrollYProgress, lineRange, [0, 1]);
  const riderX = useTransform(line, (t) => pointAt(t).x);
  const riderY = useTransform(line, (t) => pointAt(t).y);
  const areaOpacity = useTransform(line, [0.85, 1], [0, 1]);
  const tagOpacity = useTransform(line, [0.97, 1], [0, 1]);
  const tagScale = useTransform(line, [0.97, 1], [0.6, 1]);

  return (
    <section id="analysis" ref={sectionRef} className={styles.section} aria-label="Graphs and analysis">
      <div className={styles.pin}>
        <div className={styles.hud}>
          <div className={styles.hudTitle}>
            <h2 className="display">Analysis</h2>
            <span className="label">Every lift, charted</span>
          </div>
          <span className={`label ${styles.hudRight}`}>Bench press · Heaviest set · 1Y</span>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className={styles.kicker}>GRAPHS &amp; ANALYSIS</span>
            <h3 className={`display ${styles.title}`}>
              Watch the line go <span className="accent">up.</span>
            </h3>
            <p className={styles.body}>
              Every exercise gets its own chart. Switch between heaviest set, estimated 1RM and total
              volume, zoom from a week to a year, and see every PR marked on the way.
            </p>
            <div className={styles.chips} aria-hidden="true">
              <span className={styles.chipOn}>HEAVIEST SET</span>
              <span className={styles.chip}>EST. 1RM</span>
              <span className={styles.chip}>VOLUME</span>
            </div>
            <div className={styles.chips} aria-hidden="true">
              <span className={styles.chip}>1W</span>
              <span className={styles.chip}>1M</span>
              <span className={styles.chip}>3M</span>
              <span className={styles.chipOn}>1Y</span>
            </div>
          </motion.div>

          <div className={styles.right}>
            <div ref={chartRef} className={styles.chartCard}>
              <div className={styles.yAxis} aria-hidden="true">
                {Y_TICKS.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className={styles.plot}>
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  className={styles.svg}
                  role="img"
                  aria-label="Bench press heaviest set rising from 75 kg to 102.5 kg over a year"
                >
                  <defs>
                    <linearGradient id="anaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ff6a3d" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#ff6a3d" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="var(--empty)" strokeWidth="1">
                    {Y_TICKS.map((_, i) => {
                      const y = 20 + (i * (CHART_H - 40)) / 5;
                      return <line key={i} x1="0" y1={y} x2={CHART_W} y2={y} />;
                    })}
                  </g>
                  <motion.path d={AREA_PATH} fill="url(#anaFill)" style={{ opacity: areaOpacity }} />
                  <motion.path
                    d={LINE_PATH}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    style={{ pathLength: line }}
                  />
                  {PRS.map((pr) => (
                    <PrDot key={pr.at} line={line} x={pr.x} y={pr.y} at={pr.at} />
                  ))}
                  <motion.circle r="18" fill="rgba(255,106,61,0.18)" style={{ cx: riderX, cy: riderY }} />
                  <motion.circle r="10" fill="var(--accent)" style={{ cx: riderX, cy: riderY }} />
                </svg>
                <motion.span
                  className={styles.prTag}
                  style={{
                    opacity: tagOpacity,
                    scale: tagScale,
                    top: `${((LAST.y - 52) / CHART_H) * 100}%`,
                  }}
                >
                  NEW PR · 102.5 KG
                </motion.span>
              </div>
              <span />
              <div className={styles.xAxis} aria-hidden="true">
                {MONTHS.map((m, i) => (
                  <span key={m} className={i % 2 ? styles.oddMonth : undefined}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.tiles}>
              {ANALYSIS_STATS.map((s, i) => (
                <StatTile
                  key={s.label}
                  progress={scrollYProgress}
                  range={[tilesStart + i * 0.04, tilesStart + 0.08 + i * 0.04]}
                  {...s}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrDot({ line, x, y, at }: { line: MotionValue<number>; x: number; y: number; at: number }) {
  const scale = useTransform(line, [at - 0.01, at + 0.02], [0, 1]);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="6"
      fill="var(--bg)"
      stroke="var(--accent)"
      strokeWidth="3"
      style={{ scale, transformOrigin: "center", transformBox: "fill-box" }}
    />
  );
}

const fmt = new Intl.NumberFormat("en-US");

function StatTile({
  progress,
  range,
  value,
  prefix = "",
  decimals = 0,
  label,
  accent,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  value: number;
  prefix?: string;
  decimals?: number;
  label: string;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const text = useTransform(progress, (v: number) => {
    const t = Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0])));
    const n = value * t;
    return prefix + (decimals ? n.toFixed(decimals) : fmt.format(Math.round(n)));
  });
  return (
    <motion.div className={styles.tile} style={{ opacity, y }}>
      <motion.span className={`display ${styles.tileValue} ${accent ? "accent" : ""}`}>{text}</motion.span>
      <span className="label">{label}</span>
    </motion.div>
  );
}
