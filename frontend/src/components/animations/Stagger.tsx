import React from 'react';
import { motion } from 'motion/react';
import { staggerContainer } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StaggerProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function Stagger({
  children,
  stagger = 0.09,
  delay = 0,
  className = '',
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
