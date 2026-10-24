"use client";

import { motion, type Variants } from "motion/react";
import { HEAT_COLORS, seeded } from "@/lib/heatmap";
import { BACK, BACK_SILHOUETTE, BODY_COLOR, BODY_H, BODY_W, FRONT, FRONT_SILHOUETTE, IDLE_COLOR, shade, type Part } from "@/lib/body";
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
      {kind === "upnext" && <UpNext />}
      {kind === "muscles" && <Muscles />}
      {kind === "pr" && <Pr shown={shown} />}
      {kind === "grow" && <Grow />}
      {kind === "insights" && <Insights />}
      {kind === "streak" && <Streak />}
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
      <Head title="Bench press" note="Set 3 of 4 · rest 2:10" />
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

/** -1 = a planned day that was missed (outlined), 0 = rest, 1-4 = how complete the workout was. */
const STREAK = (() => {
  const rand = seeded(7);
  return Array.from({ length: 35 }, (_, k) => {
    const v = rand();
    if (k >= 33) return 4;
    if (k === 12 || k === 19) return -1;
    if (k % 7 === 6) return 0;
    return v < 0.2 ? 0 : Math.min(4, 2 + Math.floor(v * 3));
  });
})();
const fill: Variants = {
  hidden: { opacity: 0.1, scale: 0.6 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function Streak() {
  return (
    <>
      <Head title="Last 5 weeks" note="4 weeks on target" hot />
      <motion.div className={styles.streak} variants={{ shown: { transition: { staggerChildren: 0.025 } } }}>
        {STREAK.map((level, i) =>
          level === 0 ? (
            <span key={i} style={{ background: HEAT_COLORS[0] }} />
          ) : level === -1 ? (
            <motion.span key={i} variants={fill} className={styles.missed} />
          ) : (
            <motion.span key={i} variants={fill} style={{ background: HEAT_COLORS[level] }} />
          ),
        )}
      </motion.div>
      <div className={styles.legend}>
        <span className="label">Less</span>
        {[1, 2, 3, 4].map((l) => (
          <i key={l} style={{ background: HEAT_COLORS[l] }} />
        ))}
        <span className="label">Complete</span>
        <i className={styles.missed} />
        <span className="label">Missed</span>
      </div>
      <div className={styles.target}>
        <div className={styles.targetRow}>
          <span className="label">Weekly target</span>
          <span className={`label ${styles.textOn}`}>6 / 6 days</span>
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


// ---------------------------------------------------------------------------
// Body figure (the app's body map)
// ---------------------------------------------------------------------------

/** One figure. Parts in [lit] fill with orange one after another (by their
 *  number in [lit]) once the panel is in view; [level] sets their strength. */
function Figure({
  view,
  lit,
  level = {},
  width,
}: {
  view: "front" | "back";
  lit: Partial<Record<Part, number>>;
  level?: Partial<Record<Part, number>>;
  width: number;
}) {
  const shapes = view === "front" ? FRONT : BACK;
  return (
    <svg
      viewBox={`0 0 ${BODY_W} ${BODY_H}`}
      width={width}
      height={Math.round((width * BODY_H) / BODY_W)}
      aria-hidden="true"
      className={styles.figure}
    >
      <path d={view === "front" ? FRONT_SILHOUETTE : BACK_SILHOUETTE} fill={BODY_COLOR} />
      {shapes.map(([part, paths]) =>
        paths.map((d, k) => {
          const order = lit[part];
          if (order === undefined) {
            return <path key={part + k} d={d} fill={IDLE_COLOR} />;
          }
          return (
            <motion.path
              key={part + k}
              d={d}
              variants={{
                hidden: { fill: IDLE_COLOR },
                shown: { fill: shade(level[part] ?? 1), transition: { delay: 0.35 + order * 0.45, duration: 0.4 } },
              }}
            />
          );
        }),
      )}
    </svg>
  );
}

const PUSH: Partial<Record<Part, number>> = { upperChest: 0, midChest: 0, lowerChest: 0, frontDelt: 1, sideDelt: 1, rearDelt: 1, triLat: 2, triLong: 2, triMed: 2 };

function UpNext() {
  const reasons = [
    { t: "Chest", d: "rested 3 days" },
    { t: "Shoulders", d: "rested 3 days" },
    { t: "Triceps", d: "rested 3 days" },
    { t: "Legs", d: "recovering · trained yesterday", off: true },
  ];
  const week = [
    ["M", "Legs", "done"],
    ["T", "Push", "today"],
    ["W", "Pull", ""],
    ["T", "Legs", ""],
    ["F", "Push", ""],
    ["S", "Pull", ""],
    ["S", "Rest", "rest"],
  ];
  return (
    <>
      <Head title="Up next" note="Picked for you" hot />
      <div className={styles.upRow}>
        <Figure view="front" lit={PUSH} width={94} />
        <div className={styles.upCopy}>
          <motion.span variants={rise} className={`display ${styles.upDay}`}>
            Push day
          </motion.span>
          {reasons.map((r) => (
            <motion.div key={r.t} variants={rise} className={`${styles.reason} ${r.off ? styles.reasonOff : ""}`}>
              <b>{r.t}</b>
              <span>{r.d}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div variants={rise} className={styles.week}>
        {week.map(([d, t, s], i) => (
          <div key={i} className={`${styles.wd} ${s === "today" ? styles.wdToday : ""}`}>
            <span className={`${styles.wdBox} ${s === "done" ? styles.wdDone : s === "rest" ? styles.wdRest : ""}`}>{t}</span>
            {d}
          </div>
        ))}
      </motion.div>
    </>
  );
}

const SESSION: { name: string; part: string; parts: Part[] }[] = [
  { name: "Incline DB press", part: "Upper chest", parts: ["upperChest"] },
  { name: "Pec deck", part: "Middle chest", parts: ["midChest"] },
  { name: "Lateral raise", part: "Side delts", parts: ["sideDelt"] },
  { name: "Seated DB press", part: "Front delts", parts: ["frontDelt"] },
  { name: "Pushdown", part: "Triceps (lateral)", parts: ["triLat", "triMed"] },
];
const SESSION_LIT: Partial<Record<Part, number>> = Object.fromEntries(
  SESSION.flatMap((e, i) => e.parts.map((p) => [p, i] as const)),
);

function Muscles() {
  return (
    <>
      <Head title="Push day" note="What it hit" />
      <div className={styles.musclesRow}>
        <Figure view="front" lit={SESSION_LIT} width={96} />
        <Figure view="back" lit={SESSION_LIT} width={96} />
        <div className={styles.exList}>
          {SESSION.map((e, i) => (
            <motion.div
              key={e.name}
              className={styles.exRow}
              variants={{
                hidden: { opacity: 0.25 },
                shown: { opacity: 1, transition: { delay: 0.35 + i * 0.45, duration: 0.3 } },
              }}
            >
              <span>{e.name}</span>
              <b>{e.part}</b>
            </motion.div>
          ))}
          <motion.div
            className={`${styles.exRow} ${styles.exMissed}`}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { delay: 0.35 + SESSION.length * 0.45 } } }}
          >
            <span>Missed</span>
            <b>Rear delts · lower chest</b>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function Insights() {
  const cards = [
    { icon: <BalanceIcon />, title: "Bench press · form check-in", body: "Weight up 3 sessions in a row, reps down from 8 to 5. Worth a look at your form." },
    { icon: <TrendIcon />, title: "Squat", body: "+2 reps at 100 kg compared with last week." },
    { icon: <ClockIcon />, title: "Romanian deadlift", body: "Not done in 4 weeks. You used to do it every legs day." },
  ];
  return (
    <>
      <Head title="Insights" note="This week" />
      {cards.map((c) => (
        <motion.div key={c.title} variants={rise} className={styles.insight}>
          <span className={styles.insightIcon}>{c.icon}</span>
          <div className={styles.insightText}>
            <b>{c.title}</b>
            <span>{c.body}</span>
          </div>
          <span className={styles.insightX} aria-hidden="true">×</span>
        </motion.div>
      ))}
    </>
  );
}

function BalanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M15 7h5v5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Watch yourself grow - every lift ranked by its 3-month gain
// ---------------------------------------------------------------------------

const LIFTS: { name: string; muscle: string; top: string; gain: string; pct: number; line: number[] }[] = [
  { name: "Barbell squat", muscle: "Quads", top: "120 kg × 5", gain: "+20 kg", pct: 1, line: [100, 100, 105, 107.5, 110, 115, 115, 120] },
  { name: "Bench press", muscle: "Chest", top: "102.5 kg × 8", gain: "+12.5 kg", pct: 0.62, line: [90, 92.5, 92.5, 95, 97.5, 97.5, 100, 102.5] },
  { name: "Romanian deadlift", muscle: "Hamstrings", top: "110 kg × 8", gain: "+10 kg", pct: 0.5, line: [100, 100, 102.5, 105, 105, 107.5, 110, 110] },
  { name: "Overhead press", muscle: "Shoulders", top: "57.5 kg × 6", gain: "+5 kg", pct: 0.25, line: [52.5, 52.5, 55, 55, 55, 57.5, 57.5, 57.5] },
  { name: "Pull-up", muscle: "Lats", top: "12 reps", gain: "+3 reps", pct: 0.2, line: [9, 9, 10, 10, 11, 11, 12, 12] },
];

function Spark({ values }: { values: number[] }) {
  const min = Math.min(...values), max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 60},${18 - ((v - min) / (max - min || 1)) * 16}`).join(" ");
  return (
    <svg viewBox="-2 0 64 20" width="64" height="20" aria-hidden="true" className={styles.spark}>
      <motion.polyline
        points={pts}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: { duration: 0.8, delay: 0.3 } } }}
      />
    </svg>
  );
}

function Grow() {
  return (
    <>
      <Head title="Your lifts" note="Biggest gain · 3M" hot />
      {LIFTS.map((l) => (
        <motion.div key={l.name} variants={rise} className={styles.lift}>
          <div className={styles.liftName}>
            <b>{l.name}</b>
            <span>{l.muscle} · {l.top}</span>
          </div>
          <Spark values={l.line} />
          <div className={styles.liftGain}>
            <b>{l.gain}</b>
            <span className={styles.liftBar}>
              <motion.i
                variants={{ hidden: { scaleX: 0 }, shown: { scaleX: l.pct, transition: { duration: 0.7, delay: 0.4, ease: "easeOut" } } }}
              />
            </span>
          </div>
        </motion.div>
      ))}
    </>
  );
}
