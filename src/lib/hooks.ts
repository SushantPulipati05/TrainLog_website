"use client";

import { useSyncExternalStore } from "react";

/** Matches the CSS breakpoint where the pinned, sideways scrolling turns on. */
export const PINNED_QUERY = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

export function useMediaQuery(query: string, serverValue = true): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True when the page should use the pinned, scroll-scrubbed layout. */
export function usePinnedLayout(): boolean {
  return useMediaQuery(PINNED_QUERY);
}

function isoWeek(date: Date): { week: number; day: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7; // Monday = 1 ... Sunday = 7
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, day };
}

const noopSubscribe = () => () => {};

/** "WEEK 41/52 // DAY 2", computed in the visitor's browser. Empty on the server. */
export function useWeekLabel(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const { week, day } = isoWeek(new Date());
      return `WEEK ${String(week).padStart(2, "0")}/52 // DAY ${day}`;
    },
    () => "",
  );
}
