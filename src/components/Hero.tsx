"use client";

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

  return (
    <motion.section id="top" className={styles.hero} style={{ scale, opacity, filter: blur }}>
      <div className={styles.heat} aria-hidden="true">
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
