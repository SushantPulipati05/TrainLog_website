/**
 * Everything you'd normally change lives here: release info, links and copy.
 * Update APP_VERSION / APK_SIZE_MB whenever you publish a new APK.
 */

export const SITE_URL = "https://trainlog.sushnt.dev";
export const PORTFOLIO_URL = "https://sushnt.dev";
export const AUTHOR = "Sushant Pulipati";
/** Other places the author is on the web - tells search engines and AI it's the same person. */
export const AUTHOR_LINKS = ["https://sushnt.dev", "https://github.com/SushantPulipati05", "https://x.com/sushantpulipat"];

/** The one-paragraph description used for search results, link previews and structured data. */
export const APP_DESCRIPTION =
  "TrainLog is a free workout log app for Android. Log sets, reps and weight, follow your push/pull/legs split with an Up next that knows what's recovered, see every muscle you trained on a body map, chart every lift and PR, and keep your weekly streak.";

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
    stat: "33 MUSCLE PARTS",
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

/** Questions shown in the FAQ section - and given to search engines and AI as FAQ structured data. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is TrainLog?",
    a: "TrainLog is a workout log app for Android. You log your sets, reps and weight, and it charts every lift, marks your personal records, tracks your weekly training target and shows which muscles each workout trained on a body map.",
  },
  {
    q: "Is TrainLog free?",
    a: "Yes. TrainLog is free to download and use.",
  },
  {
    q: "Is TrainLog on the Google Play Store?",
    a: `Not yet. TrainLog installs straight from this site as an APK file and needs ${MIN_ANDROID}. Android asks you to allow the install once, which is expected for apps from outside the Play Store.`,
  },
  {
    q: "How does TrainLog decide what to train next?",
    a: "Up next looks at the muscles your recent workouts actually trained, not their names. Muscles trained hard in the last two days count as recovering, and it picks the split day (for example push, pull or legs) that has rested the longest - then shows you why.",
  },
  {
    q: "Can I see which muscles I trained?",
    a: "Yes. Every workout is shown on a front and back body map split into 33 muscle parts, such as upper chest, side delts and the long head of the triceps. Each exercise lights up the part it works, so you can see what a session missed. There is a male and a female figure.",
  },
  {
    q: "Does TrainLog track progress and personal records?",
    a: "Every exercise gets its own chart of your heaviest set, estimated one-rep max or total volume, from one week to a year, with personal records marked. The Progress tab ranks your lifts by how much they have grown over three months.",
  },
  {
    q: "Is there an iPhone version?",
    a: "Not yet - TrainLog is Android only for now.",
  },
  {
    q: "How do I sign in?",
    a: "With your Google account or an email and password. Your workouts are stored in your account, so they are there on a new phone too.",
  },
];
