import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Bot, Cpu, RotateCw, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function AgentIdCard() {
  const reducedMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (reducedMotion || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width)));
    mouseY.set(Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height)));
  };

  const handleTouchEnd = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="w-full max-w-[380px] mx-auto" style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -8, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          data-cursor="Open"
          aria-pressed={flipped}
          aria-label="Interactive AI Agent ID Card. Tap or click to flip between front pass and capabilities."
          className="relative w-full text-left rounded-3xl cursor-pointer focus-visible:rounded-3xl block touch-manipulation"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full min-h-[240px]"
          >
            {/* FRONT FACE */}
            <div
              style={{ backfaceVisibility: 'hidden' }}
              className="relative p-6 sm:p-7 rounded-3xl keep-dark bg-gradient-to-br from-[#161616] via-[#0B0B0B] to-[#161616] text-white border border-white/20 shadow-[0_24px_48px_-14px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Moving Glare */}
              {!reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-12 opacity-25"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.65) 0%, transparent 55%)',
                    left: glareX,
                    top: glareY,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#F36B21]" aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs font-bold tracking-wider uppercase text-[#EAF4FB]">
                    ALPHORAA PASS
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#F36B21]">
                  DEMO · PASS
                </span>
              </div>

              {/* Orange Metallic Chip Accent */}
              <div className="relative z-10 flex items-center gap-3 mb-5">
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#F36B21] to-[#D95512] border border-white/30 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-white/90" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs text-[#EAF4FB]/75 tracking-wider">
                  SN-DEMO-0492
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <p className="font-display text-lg font-bold text-white">
                  ALPHORAA-ORCH-01
                </p>
                <p className="text-xs text-[#EAF4FB]/85">
                  Autonomous Research &amp; Routing Agent (Sample Card)
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-[#EAF4FB]/75">
                <span>Click to inspect capabilities</span>
                <RotateCw className="w-3.5 h-3.5 text-[#F36B21]" aria-hidden="true" />
              </div>
            </div>

            {/* BACK FACE */}
            <div
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              className="absolute inset-0 keep-dark p-6 sm:p-7 rounded-3xl bg-[#0B0B0B] text-white border border-[#1769AA]/40 shadow-[0_24px_48px_-14px_rgba(18,59,96,0.45)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-[#F36B21]">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    Agent Guardrails (Demo)
                  </span>
                  <span className="font-mono text-[10px] text-[#EAF4FB]/60">SN-DEMO-0492</span>
                </div>

                <ul className="space-y-2 text-xs text-[#EAF4FB]/90">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F36B21] shrink-0" />
                    <span>Scoped read/write tool schemas with strict validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F36B21] shrink-0" />
                    <span>Retrieval grounded in verified internal policy docs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F36B21] shrink-0" />
                    <span>Human approval gate required for external actions</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#EAF4FB]/70">
                <span>Demo concept card</span>
                <span className="inline-flex items-center gap-1 text-[#F36B21]">
                  Flip back <RotateCw className="w-3 h-3" aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}
