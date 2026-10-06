"use client";

import { motion, type Variants } from "motion/react";
import { HEAT_COLORS, seeded } from "@/lib/heatmap";
import type { LogSet } from "@/lib/site";
import styles from "./SetVisual.module.css";

type Props = { kind: LogSet["visual"]; shown: boolean };

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } },
};
export default function SetVisual({ kind, shown }: Props) {
  const state = shown ? "shown" : "hidden";
  return (
    <motion.div className={styles.box} initial="hidden" animate={state} variants={list}>
      {kind === "sets" && <Sets />}
      {kind === "pr" && <Pr shown={shown} />}
      {kind === "streak" && <Streak />}
      {kind === "saved" && <Saved />}
    </motion.div>
  );
}

function Head({ title, note, hot }: { title: string; note: string; hot?: boolean }) {
  return (
    <div className={styles.head}>
      <span className={`display-md ${styles.headTitle}`}>{title}</span>
      <span className={`label ${hot ? "accent" : ""}`}>{note}</span>
    </div>
  );
}

function Sets() {
  const rows = [
    { n: 1, kg: 60, reps: 10 },
    { n: 2, kg: 80, reps: 8 },
    { n: 3, kg: 100, reps: 8, hot: true },
  ];
  return (
    <>
      <Head title="Bench press" note="Set 3 of 4" />
      <div className={`${styles.setRow} ${styles.setHead}`}>
        <span>SET</span>
        <span>KG</span>
        <span>REPS</span>
        <span>✓</span>
      </div>
      {rows.map((r) => (
        <motion.div key={r.n} variants={rise} className={`${styles.setRow} ${r.hot ? styles.hot : ""}`}>
          <span className={styles.muted}>{r.n}</span>
          <span>{r.kg}</span>
          <span>{r.reps}</span>
          <span className={styles.check}>✓</span>
        </motion.div>
      ))}
      <motion.div variants={rise} className={styles.dashed}>
        + ADD SET
      </motion.div>
    </>
  );
}

const MINI = [230, 222, 226, 205, 210, 182, 188, 158, 150, 120, 70];
const MINI_PATH = "M" + MINI.map((y, i) => `${12 + i * 40} ${y}`).join(" L");

function Pr({ shown }: { shown: boolean }) {
  return (
    <>
      <Head title="Bench press" note="Heaviest set · 3M" />
      <div className={styles.chart}>
        <svg viewBox="0 0 424 260" className={styles.chartSvg} aria-hidden="true">
          <g stroke="var(--empty)" strokeWidth="1">
            {[60, 120, 180, 240].map((y) => (
              <line key={y} x1="0" y1={y} x2="424" y2={y} />
            ))}
          </g>
          <motion.path
            d={MINI_PATH}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
          />
          <motion.circle
            cx="412"
            cy="70"
            r="9"
            fill="var(--accent)"
            initial={{ scale: 0 }}
            animate={{ scale: shown ? 1 : 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 18 }}
          />
        </svg>
        <motion.span
          className={styles.prTag}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ delay: 1.25, type: "spring", stiffness: 400, damping: 18 }}
        >
          PR · 102.5 KG
        </motion.span>
      </div>
      <div className={styles.axis}>
        <span>JUL</span>
        <span>AUG</span>
        <span>SEP</span>
        <span>OCT</span>
      </div>
    </>
  );
}

const STREAK = (() => {
  const rand = seeded(7);
  return Array.from({ length: 35 }, (_, k) => {
    const v = rand();
    if (k >= 33) return 4;
    return v < 0.32 ? 0 : Math.min(4, 1 + Math.floor(v * 4));
  });
})();
const fill: Variants = {
  hidden: { opacity: 0.1, scale: 0.6 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function Streak() {
  return (
    <>
      <Head title="Last 5 weeks" note="Streak · 12 days" hot />
      <motion.div className={styles.streak} variants={{ shown: { transition: { staggerChildren: 0.025 } } }}>
        {STREAK.map((level, i) =>
          level === 0 ? (
            <span key={i} style={{ background: HEAT_COLORS[0] }} />
          ) : (
            <motion.span key={i} variants={fill} style={{ background: HEAT_COLORS[level] }} />
          ),
        )}
      </motion.div>
      <div className={styles.target}>
        <div className={styles.targetRow}>
          <span className="label">Weekly target</span>
          <span className={`label ${styles.textOn}`}>4 / 4 days</span>
        </div>
        <div className={styles.bar}>
          <motion.i
            variants={{
              hidden: { scaleX: 0 },
              shown: { scaleX: 1, transition: { delay: 1, duration: 0.6, ease: "easeOut" } },
            }}
          />
        </div>
      </div>
    </>
  );
}

function Saved() {
  return (
    <>
      <Head title="Push day" note="In progress" hot />
      <span className={`display ${styles.timer}`}>32:14</span>
      <span className="label">14 sets logged · 6 exercises</span>
      <motion.div className={styles.bottom} variants={{ shown: { transition: { staggerChildren: 0.5, delayChildren: 0.3 } } }}>
        <motion.div variants={rise} className={styles.statusOff}>
          <s>APP CLOSED · NO SIGNAL</s>
        </motion.div>
        <motion.div variants={rise} className={styles.statusOn}>
          ✓ REOPENED · ALL 14 SETS STILL HERE
        </motion.div>
      </motion.div>
    </>
  );
}
