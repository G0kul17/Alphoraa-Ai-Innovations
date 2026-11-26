import type { Variants } from 'motion/react';

import { DISTANCE, DURATION, EASE } from './tokens';

export const EASE_SMOOTH = EASE.entrance;
export const EASE_SETTLE = EASE.settle;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const wordRevealItem: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: DISTANCE.sm },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: -DISTANCE.xs,
    transition: { duration: DURATION.pageExit, ease: EASE_SMOOTH },
  },
};
