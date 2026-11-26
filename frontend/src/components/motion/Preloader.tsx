import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE, INTRO_SESSION_KEY } from '../../animations/tokens';

const SHUTTER_COLUMNS = 5;

/** True when the intro already played in this browser session. */
function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    /* storage unavailable: intro may replay on reload, which is acceptable */
  }
}

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !introAlreadySeen());
  const [animStage, setAnimStage] = useState<'drawing' | 'ignite' | 'revealed'>('drawing');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reducedMotion || !visible) {
      setVisible(false);
      return;
    }

    markIntroSeen();

    const clearAll = () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };

    // Total length <= 1.5s: draw (0-450ms), ignite (450-800ms), shutter wipe (800-1500ms).
    timers.current.push(window.setTimeout(() => setAnimStage('ignite'), 450));
    timers.current.push(window.setTimeout(() => setAnimStage('revealed'), 800));
    timers.current.push(window.setTimeout(() => setVisible(false), 1500));

    // Skip with any click or key press.
    const skip = () => {
      clearAll();
      setAnimStage('revealed');
      timers.current.push(window.setTimeout(() => setVisible(false), 650));
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      clearAll();
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (reducedMotion) return null;


  return (
    <AnimatePresence>
      {visible && (
        <div
          className="keep-dark fixed inset-0 z-[100] pointer-events-none select-none flex flex-col items-center justify-center"
          aria-label="Loading ALPHORAA"
          role="status"
        >
          {/* 5-Column Cascading Shutter Curtain Panels */}
          <div className="absolute inset-0 flex w-full h-full">
            {Array.from({ length: SHUTTER_COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={
                  animStage === 'revealed'
                    ? {
                        y: '-100%',
                        transition: {
                          duration: 0.5,
                          delay: i * 0.05, // Staggered cascade wave
                          ease: EASE.inOut, // Luxury cubic ease
                        },
                      }
                    : { y: 0 }
                }
                className="relative h-full flex-1 bg-[#050505] border-r border-white/[0.04] last:border-r-0"
              />
            ))}
          </div>

          {/* Center Stage: Holographic Vector Laser Reveal */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={
              animStage === 'revealed'
                ? {
                    opacity: 0,
                    scale: 1.08,
                    y: -30,
                    transition: { duration: 0.4, ease: 'easeIn' },
                  }
                : { opacity: 1, scale: 1, y: 0 }
            }
            className="relative z-10 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Glowing Ambient Halo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                animStage === 'ignite'
                  ? { scale: [0.8, 1.4, 1.1], opacity: [0.2, 0.65, 0.45] }
                  : { scale: 0.6, opacity: 0 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#1769AA]/40 to-[#F36B21]/50 blur-[60px] pointer-events-none"
            />

            {/* Vector Laser Drawing Triangle "i" Logo */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_20px_rgba(243,107,33,0.6)]"
              >
                {/* Outer Triangle Frame */}
                <motion.polygon
                  points="50,10 12,85 88,85"
                  stroke="#F36B21"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                />

                {/* Inner "i" Dot */}
                <motion.circle
                  cx="50"
                  cy="42"
                  r="5"
                  fill="#F36B21"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    animStage !== 'drawing'
                      ? { scale: [0, 1.3, 1], opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.35, delay: 0.4 }}
                />

                {/* Inner "i" Stem */}
                <motion.path
                  d="M50 54 L50 85"
                  stroke="#F36B21"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    animStage !== 'drawing'
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.35, delay: 0.45 }}
                />
              </svg>
            </div>

            {/* Masked Typographic Brand Reveal */}
            <div className="overflow-hidden mt-5 text-center">
              <motion.div
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.25, ease: EASE.settle }}
                className="font-brand text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-1"
              >
                <span>ALPHORAA</span>
              </motion.div>
            </div>

            <div className="overflow-hidden mt-1 text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-brand text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#5BB4F5]"
              >
                AI Innovations
              </motion.p>
            </div>

            {/* Subtle Pulsing Spark Bar */}
            <div className="mt-8 w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#F36B21] to-transparent"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
