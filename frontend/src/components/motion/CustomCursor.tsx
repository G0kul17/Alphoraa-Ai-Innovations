import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hiddenOnInput, setHiddenOnInput] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false);
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    const media = window.matchMedia?.('(pointer: fine)');
    const check = () => {
      const fine = Boolean(media?.matches) && window.innerWidth >= 1024;
      setEnabled(fine);
      if (fine) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    check();
    media?.addEventListener('change', check);
    window.addEventListener('resize', check);
    return () => {
      media?.removeEventListener('change', check);
      window.removeEventListener('resize', check);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isField = Boolean(target.closest('input, textarea, select, [data-cursor="hide"]'));
      setHiddenOnInput(isField);

      const customEl = target.closest('[data-cursor]') as HTMLElement | null;
      const customVal = customEl?.getAttribute('data-cursor');
      if (customVal && customVal !== 'hide') {
        setCursorLabel(customVal);
        setIsHoveringInteractive(true);
        return;
      }

      const interactive = target.closest('a, button, [role="button"], [role="tab"]');
      setCursorLabel(null);
      setIsHoveringInteractive(Boolean(interactive));
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled || !visible || hiddenOnInput) return null;

  const ringSize = cursorLabel ? 64 : isHoveringInteractive ? 46 : 36;

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none" aria-hidden="true">
      {/* Inner 10px Orange dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#F36B21] transition-opacity duration-150 ${
          cursorLabel ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Outer spring-lag ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
        }}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ${
          cursorLabel
            ? 'bg-[#F36B21] border-[#F36B21] text-white shadow-md'
            : isHoveringInteractive
            ? 'border-[#F36B21] bg-[#F36B21]/10'
            : 'border-[#1769AA]/60 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="font-display text-[11px] font-semibold tracking-wide">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
