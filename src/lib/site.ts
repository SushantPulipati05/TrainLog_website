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
  visual: "sets" | "upnext" | "muscles" | "pr" | "grow" | "insights" | "streak";
};

export const LOG_SETS: LogSet[] = [
  {
    n: "01",
    title: "Log every set.",
    body: "Add exercises, type the weight and reps, swipe to delete. Every set is time-stamped, so you see how long you rested.",
    stat: "100 KG × 8 · 2:10 REST",
    visual: "sets",
  },
  {
    n: "02",
    title: "Know what's next.",
    body: "Push, pull or legs? TrainLog reads what you actually trained, skips what's still recovering and tells you why. It's on your home screen too.",
    stat: "UP NEXT · PUSH DAY",
    highlight: true,
    visual: "upnext",
  },
  {
    n: "03",
    title: "See every muscle.",
    body: "Upper chest, side delts, the long head of your triceps. Each exercise lights up the part it works, so you can see what a session missed.",
    stat: "32 MUSCLE PARTS",
    visual: "muscles",
  },
  {
    n: "04",
    title: "See every PR.",
    body: "Every exercise gets its own chart - heaviest set, estimated 1RM or volume, from a week to a year - with your PRs marked.",
    stat: "102.5 KG × 8 · PR",
    highlight: true,
    visual: "pr",
  },
  {
    n: "05",
    title: "Watch yourself grow.",
    body: "Every lift you've logged, ranked by how much it has grown. Your top set now and the change over three months - in kilos, in reps, or in estimated 1RM.",
    stat: "+20 KG ON SQUAT · 3 MONTHS",
    visual: "grow",
  },
  {
    n: "06",
    title: "Get honest notes.",
    body: "Small wins, lifts you've dropped, and a nudge to check your form when the weight climbs but the reps fall. No judgement, cross them off any time.",
    stat: "INSIGHTS · NOT LECTURES",
    visual: "insights",
  },
  {
    n: "07",
    title: "Keep the streak.",
    body: "The heatmap fills in by how complete each workout was, outlines the planned days you missed, and tracks your weekly target.",
    stat: "4 WEEKS ON TARGET",
    visual: "streak",
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
