"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { APK_URL, INSTALL_STEPS } from "@/lib/site";
import styles from "./Install.module.css";

export default function Install() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <section id="install" className={styles.section} aria-labelledby="install-title">
      <div className={styles.head}>
        <h2 id="install-title" className={`display ${styles.title}`}>
          Warm-up: install
        </h2>
        <span className="label">Three sets. About a minute.</span>
      </div>

      <p className={styles.note}>
        <span className="accent">NOTE · </span>
        TrainLog isn&apos;t on the Play Store yet - it installs straight from this site. Android will ask you to
        confirm because of that. That&apos;s expected.
      </p>

      <ol ref={stepsRef} className={styles.steps}>
        <span className={styles.rail} aria-hidden="true" />
        <motion.span className={styles.railFill} style={{ scaleY: scrollYProgress }} aria-hidden="true" />
        {INSTALL_STEPS.map((step, i) => (
          <Step key={step.n} step={step} progress={scrollYProgress} at={i / INSTALL_STEPS.length} />
        ))}
      </ol>

      <div className={styles.cta}>
        <motion.div
          className={styles.day1}
          initial={{ backgroundColor: "#1c1c20", scale: 0.85 }}
          whileInView={{ backgroundColor: "#ff6a3d", scale: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 16 }}
          aria-hidden="true"
        >
          DAY 1
        </motion.div>
        <div className={styles.ctaCopy}>
          <span className={`display ${styles.ctaTitle}`}>
            Ready? <span className="accent">First set.</span>
          </span>
          <span className={styles.ctaSub}>Your first square is waiting.</span>
        </div>
        <a href={APK_URL} download className={`btn ${styles.ctaBtn}`}>
          Download APK ↓
        </a>
      </div>
    </section>
  );
}

function Step({
  step,
  progress,
  at,
}: {
  step: (typeof INSTALL_STEPS)[number];
  progress: MotionValue<number>;
  at: number;
}) {
  const dot = useTransform(progress, [at, at + 0.02], ["#1c1c20", "#ff6a3d"]);
  return (
    <motion.li
      className={styles.step}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.span className={styles.dot} style={{ backgroundColor: dot }} aria-hidden="true" />
      <div className={styles.stepCopy}>
        <h3 className={`display-md ${styles.stepTitle}`}>
          <span className="accent">{step.n} · </span>
          {step.title}
        </h3>
        <p className={styles.stepBody}>{step.body}</p>
      </div>
      <span className={styles.stepStat}>{step.stat}</span>
    </motion.li>
  );
}
