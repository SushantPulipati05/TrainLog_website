"use client";

import { MotionConfig } from "motion/react";

/** Respects the visitor's "reduce motion" setting for every animation on the page. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
