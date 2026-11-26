/**
 * Shared motion tokens. Reuse these everywhere instead of hard-coding values.
 */

export type Bezier = [number, number, number, number];

export const EASE = {
  /** Default entrance: cubic-bezier(0.22, 1, 0.36, 1) */
  entrance: [0.22, 1, 0.36, 1] as Bezier,
  /** Soft settle for panels and menus */
  settle: [0.16, 1, 0.3, 1] as Bezier,
  /** Symmetric in-out for wipes and shutters */
  inOut: [0.85, 0, 0.15, 1] as Bezier,
  /** GSAP equivalents */
  gsapEntrance: 'power3.out',
  gsapInOut: 'power3.inOut',
} as const;

/** Durations in seconds. */
export const DURATION = {
  hover: 0.3, // 250 to 350ms
  fast: 0.2,
  base: 0.35,
  reveal: 0.7, // 600 to 900ms
  revealLong: 0.9,
  page: 0.35,
  pageExit: 0.2,
  intro: 1.5, // max length of the cinematic intro
} as const;

/** Travel distances in px. Never exceed 40. */
export const DISTANCE = {
  xs: 8,
  sm: 12,
  md: 24,
  lg: 40,
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  tight: 0.04,
  base: 0.09,
  loose: 0.14,
} as const;

/** Session key for the once-per-session intro. */
export const INTRO_SESSION_KEY = 'alphoraa-intro-seen';
