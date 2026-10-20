"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HEAT_COLORS, heatLevels } from "@/lib/heatmap";
import { useWeekLabel } from "@/lib/hooks";
import { APK_URL, APP_VERSION, MIN_ANDROID } from "@/lib/site";
import AppIcon from "./AppIcon";
import Logo from "./Logo";
import styles from "./Hero.module.css";

const CELLS = heatLevels(1000, 40);

export default function Hero() {
  const weekLabel = useWeekLabel();
  const { scrollY } = useScroll();
  // 0 at the top of the page, 1 once the first card fully covers the hero.
  const covered = useTransform(scrollY, (y) =>
    typeof window === "undefined" ? 0 : Math.min(1, Math.max(0, y / window.innerHeight)),
  );
  const scale = useTransform(covered, [0, 1], [1, 0.92]);
  const opacity = useTransform(covered, [0, 1], [1, 0.35]);
  const blur = useTransform(covered, [0, 1], ["blur(0px)", "blur(2px)"]);

  // The grid sits dimmed; a soft spotlight follows the mouse and brings the
  // squares under it back to full colour. Set straight on the element (no
  // re-render per mouse move). Touch screens just see the calm, dim grid.
  const litRef = useRef<HTMLDivElement>(null);
  const moveLight = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !litRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    litRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    litRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    litRef.current.dataset.on = "true";
  };
  const hideLight = () => {
    if (litRef.current) litRef.current.dataset.on = "false";
  };

  return (
    <motion.section
      id="top"
      className={styles.hero}
      style={{ scale, opacity, filter: blur }}
      onPointerMove={moveLight}
      onPointerLeave={hideLight}
    >
      <div className={`${styles.heat} ${styles.heatDim}`} aria-hidden="true">
        {CELLS.map((level, i) => (
          <span key={i} style={{ background: HEAT_COLORS[level] }} />
        ))}
      </div>
      <div ref={litRef} className={`${styles.heat} ${styles.heatLit}`} data-on="false" aria-hidden="true">
        {CELLS.map((level, i) => (
          <span key={i} style={{ background: HEAT_COLORS[level] }} />
        ))}
      </div>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Logo />
          <span className={styles.week}>{weekLabel}</span>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#log" className={styles.navLink}>THE LOG</a>
            <a href="#analysis" className={styles.navLink}>ANALYSIS</a>
            <a href="#install" className={styles.navLink}>INSTALL</a>
            <a href={APK_URL} download className={styles.navCta}>
              DOWNLOAD APK ↓
            </a>
          </nav>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.copy}>
          <div className={styles.brand}>
            <AppIcon size={60} />
            <span className={styles.kicker}>WORKOUT LOG FOR ANDROID · BETA</span>
          </div>
          <h1 className={`display ${styles.title}`}>
            Every square is a day you <span className="accent">showed up.</span>
          </h1>
          <p className={styles.lede}>
            TrainLog is a workout logger for Android. Log your sets, chart every lift, and watch the
            grid fill in.
          </p>
          <div className={styles.actions}>
            <a href={APK_URL} download className="btn">
              Download APK ↓
            </a>
            <a href="#install" className="btn-ghost">
              HOW TO INSTALL
            </a>
          </div>
          <span className="label">
            v{APP_VERSION} · {MIN_ANDROID} · FREE
          </span>
        </div>
      </div>

      <div className={styles.legend} aria-hidden="true">
        <span>LESS</span>
        {HEAT_COLORS.map((c) => (
          <i key={c} style={{ background: c }} />
        ))}
        <span>MORE</span>
      </div>
      <div className={styles.hint} aria-hidden="true">
        SCROLL TO START THE SESSION ↓
      </div>
    </motion.section>
  );
}
