/**
 * Everything you'd normally change lives here: release info, links and copy.
 * Update APP_VERSION / APK_SIZE_MB whenever you publish a new APK.
 */

export const SITE_URL = "https://trainlog.sushnt.dev";
export const PORTFOLIO_URL = "https://sushnt.dev";

/** Put the APK at public/trainlog.apk and it is served from this path. */
export const APK_URL = "/trainlog.apk";
export const APP_VERSION = "1.0.0";
/** Size shown on the install step, e.g. "12". Leave empty to hide it. */
export const APK_SIZE_MB = "";
export const MIN_ANDROID = "Android 7.0+";

export type LogSet = {
  n: string;
  title: string;
  body: string;
  stat: string;
  highlight?: boolean;
  visual: "sets" | "pr" | "streak" | "saved";
};

export const LOG_SETS: LogSet[] = [
  {
    n: "01",
    title: "Log every set.",
    body: "Add exercises, type the weight and reps, swipe to delete. Start from empty or from a template.",
    stat: "100 KG × 8",
    visual: "sets",
  },
  {
    n: "02",
    title: "See every PR.",
    body: "Every exercise gets its own chart - heaviest set or total volume, from a week to a year - with your PRs marked.",
    stat: "102.5 KG × 8 · PR",
    highlight: true,
    visual: "pr",
  },
  {
    n: "03",
    title: "Keep the streak.",
    body: "The heatmap and your weekly target show how consistent you really are, at a glance.",
    stat: "4 / 4 DAYS",
    visual: "streak",
  },
  {
    n: "04",
    title: "Never lose a set.",
    body: "Your workout is saved on your phone as you go. Close the app or lose signal - it is still there.",
    stat: "SAVED ON-DEVICE",
    visual: "saved",
  },
];

export const ANALYSIS_STATS: { value: number; prefix?: string; decimals?: number; label: string; accent?: boolean }[] = [
  { value: 48320, label: "KG LIFTED · 1Y" },
  { value: 164, label: "WORKOUTS" },
  { value: 23, label: "PERSONAL RECORDS", accent: true },
  { value: 27.5, prefix: "+", decimals: 1, label: "KG ON BENCH" },
];

export const INSTALL_STEPS = [
  {
    n: "A",
    title: "Download the APK",
    body: "Open this page on your Android phone and tap Download APK.",
    stat: APK_SIZE_MB ? `~${APK_SIZE_MB} MB` : "ONE FILE",
  },
  {
    n: "B",
    title: "Allow the install",
    body: "When Android asks, allow your browser to install apps, then tap Install. If Play Protect warns you, tap Install anyway.",
    stat: "ONE-TIME",
  },
  {
    n: "C",
    title: "Sign in and train",
    body: "Open TrainLog, sign in with Google or email, and set up your profile in under a minute.",
    stat: "< 1 MIN",
  },
];
