# TrainLog website

The landing page for [TrainLog](https://trainlog.sushnt.dev), a workout logger for Android.
Built with Next.js (App Router), TypeScript, CSS Modules and [Motion](https://motion.dev) for the scroll animations.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

## Where things live

| What | File |
| --- | --- |
| App version, APK link, all the copy (sets, stats, install steps) | `src/lib/site.ts` |
| Colours, spacing, shared classes (`.display`, `.btn`, …) | `src/app/globals.css` |
| Page order | `src/app/page.tsx` |
| Hero (stays pinned; the rest slides over it) | `src/components/Hero.tsx` |
| The log: six sets that slide sideways while you scroll | `src/components/LogTrack.tsx` |
| The little demo inside each set | `src/components/SetVisual.tsx` |
| Graphs & analysis: line draws with scroll, stats count up | `src/components/Analysis.tsx`, data in `src/lib/chart.ts` |
| Install steps + "Ready? First set." | `src/components/Install.tsx` |
| Link preview image (WhatsApp, Discord…) | `src/app/opengraph-image.tsx` |
| Fonts (self-hosted, SIL OFL) | `src/app/fonts/` |

## Releasing a new APK

1. Build the release APK in Android Studio.
2. Copy it to `public/trainlog.apk` (replace the old one).
3. Update `APP_VERSION` (and `APK_SIZE_MB` if you want the size shown) in `src/lib/site.ts`.
4. Deploy.

## How the scrolling works

- **Desktop** (wider than 900px): the log and analysis sections are tall (`600vh` / `300vh`) with a
  `position: sticky` inner "pin". `useScroll` gives a 0–1 progress through each section and `useTransform`
  maps it to the track position, line length, counters, etc.
- **Phones and "reduce motion"**: the same sections become a normal vertical list (see the
  `@media (max-width: 900px), (prefers-reduced-motion: reduce)` blocks), and the demos play as they come into view.
