import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  withArrow?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1769AA] text-white shadow-[0_10px_24px_-6px_rgba(23,105,170,0.5)] hover:shadow-[0_14px_28px_-6px_rgba(243,107,33,0.45)]',
  secondary:
    'bg-[#0A0A0A] text-white border border-white/15 hover:border-[#5BB4F5] hover:bg-[#141414]',
  outlineLight:
    'bg-white/10 text-white border border-white/25 hover:bg-white/20 hover:border-white/50',
  ghost:
    'bg-transparent text-[#5BB4F5] hover:bg-white/10',
  light:
    'bg-white text-[#123B60] hover:bg-[#EAF4FB] shadow-sm',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs min-h-[38px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-7 py-3.5 text-sm min-h-[48px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  withArrow = false,
  magnetic,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();
  const isMagnetic = magnetic ?? variant === 'primary';
  const ref = useRef<HTMLDivElement>(null);
  const [hoverOrigin, setHoverOrigin] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.3 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !isMagnetic || !ref.current) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rawX.set(Math.max(-1, Math.min(1, dx)) * 10);
    rawY.set(Math.max(-1, Math.min(1, dy)) * 10);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setHoverOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const classes = `group relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  const innerContent = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          style={{
            background: 'linear-gradient(135deg, #1769AA 0%, #F36B21 100%)',
            clipPath: hovered
              ? `circle(150% at ${hoverOrigin.x}% ${hoverOrigin.y}%)`
              : `circle(0% at ${hoverOrigin.x}% ${hoverOrigin.y}%)`,
            transition: 'clip-path 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="absolute inset-0 pointer-events-none"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        <span>{children}</span>
        {withArrow && (
          <ArrowRight
            className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
    </>
  );

  const element = to ? (
    <Link to={to} className={classes}>
      {innerContent}
    </Link>
  ) : href ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {innerContent}
    </a>
  ) : (
    <button className={classes} {...props}>
      {innerContent}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={reducedMotion || !isMagnetic ? undefined : { x: springX, y: springY }}
      className="inline-flex"
    >
      {element}
    </motion.div>
  );
}
