import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export function SectionDivider({ fromColor, toColor, flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const curveScaleY = useTransform(scrollYProgress, [0, 1], [0.6, 1.15]);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: fromColor }}
      className="relative w-full h-12 sm:h-16 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          scaleY: reducedMotion ? 1 : curveScaleY,
          transformOrigin: 'bottom',
        }}
        className="w-full h-full"
      >
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V32C320 76 620 4 960 32C1200 52 1340 42 1440 20V80H0Z"
            fill={toColor}
          />
        </svg>
      </motion.div>
    </div>
  );
}
