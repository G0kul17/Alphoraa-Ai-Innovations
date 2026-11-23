import React from 'react';
import { motion } from 'motion/react';
import { pageTransition } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
