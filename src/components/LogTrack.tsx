"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HEAT_COLORS, heatLevels } from "@/lib/heatmap";
import { LOG_SETS, type LogSet } from "@/lib/site";
import SetVisual from "./SetVisual";
import styles from "./LogTrack.module.css";

const N = LOG_SETS.length;
const HOLD = 0.04;
/** Scroll progress (0-1) at which each set sits centred on screen. */
const CENTRES = LOG_SETS.map((_, i) => 0.04 + (0.92 * i) / (N - 1));

// Piecewise track position: the track holds still around each set, then glides to the next.
const TRACK_INPUT: number[] = [0];
const TRACK_OUTPUT: string[] = ["0%"];
CENTRES.forEach((c, i) => {
  const pos = `${(-100 * i) / N}%`;
  TRACK_INPUT.push(Math.max(0.0001, c - HOLD), Math.min(0.9999, c + HOLD));
  TRACK_OUTPUT.push(pos, pos);
});
TRACK_INPUT.push(1);
TRACK_OUTPUT.push(`${(-100 * (N - 1)) / N}%`);

const STRIP = heatLevels(140, 140, 3);

function activeIndex(p: number): number {
  for (let i = N - 1; i > 0; i--) {
    if (p >= (CENTRES[i - 1] + CENTRES[i]) / 2) return i;
  }
  return 0;
}

export default function LogTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(activeIndex(p)));

  const x = useTransform(scrollYProgress, TRACK_INPUT, TRACK_OUTPUT);
  const stripX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="log"
      ref={sectionRef}
      className={styles.section}
      style={{ "--sets": N } as React.CSSProperties}
      aria-label="The log"
    >
      <div className={styles.pin}>
        <div className={styles.hud}>
          <div className={styles.hudTitle}>
            <h2 className="display">The log</h2>
            <span className="label">What TrainLog does, one set at a time</span>
          </div>
          <div className={styles.segments} aria-hidden="true">
            {CENTRES.map((c, i) => (
              <Segment
                key={i}
                progress={scrollYProgress}
                range={i === 0 ? [0, 0.02] : [c - 0.09, c - 0.02]}
              />
            ))}
          </div>
          <div className={styles.counter} aria-hidden="true">
            SET
            <span className={styles.odometer}>
              <span
                className={styles.odometerStrip}
                style={{ transform: `translateY(${-active * 1.15}em)` }}
              >
                {LOG_SETS.map((s) => (
                  <span key={s.n}>{s.n}</span>
                ))}
              </span>
            </span>
            / {String(N).padStart(2, "0")}
          </div>
        </div>

        <motion.div className={styles.track} style={{ x }}>
          {LOG_SETS.map((set) => (
            <Panel key={set.n} set={set} />
          ))}
        </motion.div>

        <div className={styles.stripWrap} aria-hidden="true">
          <motion.div className={styles.strip} style={{ x: stripX }}>
            {STRIP.map((level, i) => (
              <span key={i} style={{ background: HEAT_COLORS[level] }} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Segment({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const scaleX = useTransform(progress, range, [0, 1]);
  return (
    <span className={styles.segment}>
      <motion.i style={{ scaleX }} />
    </span>
  );
}

function Panel({ set }: { set: LogSet }) {
  const ref = useRef<HTMLDivElement>(null);
  // Panels outside the pinned window are clipped, so this only fires when a set slides into view.
  const shown = useInView(ref, { amount: 0.6, once: true });

  return (
    <div ref={ref} className={styles.panel}>
      <div className={styles.copy}>
        <span className={styles.setNo}>SET {set.n}</span>
        <h3 className={`display ${styles.title}`}>
          {set.highlight ? <span className="mark">{set.title}</span> : set.title}
        </h3>
        <p className={styles.body}>{set.body}</p>
        <span className={`${styles.stat} ${set.highlight ? styles.statHot : ""}`}>{set.stat}</span>
      </div>
      <div className={styles.visual}>
        <SetVisual kind={set.visual} shown={shown} />
      </div>
    </div>
  );
}
