import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Bot, GitBranch, BarChart2, Layers, CheckCircle2, Clock } from 'lucide-react';
import type { ProductItem } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE_SMOOTH } from '../../animations/variants';

interface ProductMockupProps {
  type: ProductItem['mockupType'];
}

export function ProductMockup({ type }: ProductMockupProps) {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        style={reducedMotion ? undefined : { rotateX, rotateY }}
        className="keep-dark rounded-2xl bg-[#0B0B0B] border border-white/10 shadow-[0_24px_60px_-15px_rgba(18,59,96,0.35)] overflow-hidden text-white select-none"
      >
        {/* Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F36B21]/85" aria-hidden="true" />
            <span className="ml-2 text-[11px] font-mono text-[#EAF4FB]/70">
              {type === 'agent-console' && 'alphoraa-demo / agent-console'}
              {type === 'workflow-studio' && 'alphoraa-demo / workflow-studio'}
              {type === 'insights-dashboard' && 'alphoraa-demo / insights-view'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#F36B21]">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-[#F36B21] ${
                reducedMotion ? '' : 'animate-pulse'
              }`}
              aria-hidden="true"
            />
            Sample UI Mockup
          </span>
        </div>

        {/* App Shell */}
        <div className="grid grid-cols-12 min-h-[300px]">
          {/* Left Sidebar */}
          <div className="hidden sm:flex col-span-3 flex-col gap-1.5 p-3 bg-[#050505] border-r border-white/10">
            <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#1769AA]/30 text-xs font-medium text-white">
              {type === 'agent-console' && <Bot className="w-3.5 h-3.5 text-[#F36B21]" />}
              {type === 'workflow-studio' && <GitBranch className="w-3.5 h-3.5 text-[#F36B21]" />}
              {type === 'insights-dashboard' && <BarChart2 className="w-3.5 h-3.5 text-[#F36B21]" />}
              <span className="truncate">Workspace</span>
            </div>
            {['Pipelines', 'Approvals', 'Schemas', 'Audit Log'].map((nav) => (
              <div
                key={nav}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-[#EAF4FB]/60"
              >
                <Layers className="w-3 h-3 opacity-60" />
                <span className="truncate">{nav}</span>
              </div>
            ))}
          </div>

          {/* Main Panel */}
          <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 space-y-4">
            {/* Staggered Demo Placeholder KPI Row (No animated counters) */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Active Flows (Sample)', value: '12', accent: false },
                { label: 'Review Queue', value: '3 pending', accent: true },
                { label: 'Mode', value: 'Supervised', accent: false },
              ].map((tile, idx) => (
                <motion.div
                  key={tile.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4, ease: EASE_SMOOTH }}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <p className="text-[10px] text-[#EAF4FB]/60">{tile.label}</p>
                  <p
                    className={`mt-1 font-mono text-sm font-semibold tabular-nums ${
                      tile.accent ? 'text-[#F36B21]' : 'text-white'
                    }`}
                  >
                    {tile.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {type === 'agent-console' && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-[11px] text-[#EAF4FB]/80 mb-2">
                  <span>Execution Trace (Illustrative)</span>
                  <span className="font-mono text-[#EAF4FB]/60">Step 3 of 4</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { step: '1. Retrieve policy context', state: 'Completed' },
                    { step: '2. Validate schema fields', state: 'Completed' },
                    { step: '3. Await human sign-off', state: 'Pending review' },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-black/70"
                    >
                      <span className="flex items-center gap-1.5 text-[#EAF4FB]/90">
                        {item.state === 'Completed' ? (
                          <CheckCircle2 className="w-3 h-3 text-[#5BB4F5]" />
                        ) : (
                          <Clock className="w-3 h-3 text-[#F36B21]" />
                        )}
                        {item.step}
                      </span>
                      <span className="font-mono text-[10px] text-[#EAF4FB]/60">{item.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === 'workflow-studio' && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-[#EAF4FB]/70 mb-3">
                  Hybrid Flow Canvas (Illustrative)
                </p>
                <svg viewBox="0 0 360 110" className="w-full h-24" fill="none">
                  <rect x="8" y="34" width="84" height="42" rx="10" fill="#123B60" stroke="#1769AA" />
                  <text x="50" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Inter, sans-serif">
                    Intake Email
                  </text>

                  <motion.path
                    d="M92 55 H132"
                    stroke="#F36B21"
                    strokeWidth="2"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  />
                  <rect x="132" y="34" width="96" height="42" rx="10" fill="#123B60" stroke="#F36B21" />
                  <text x="180" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Inter, sans-serif">
                    AI Extractor
                  </text>

                  <motion.path
                    d="M228 55 H268"
                    stroke="#1769AA"
                    strokeWidth="2"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  />
                  <rect x="268" y="34" width="84" height="42" rx="10" fill="#123B60" stroke="#1769AA" />
                  <text x="310" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Inter, sans-serif">
                    CRM Sync
                  </text>
                </svg>
              </div>
            )}

            {type === 'insights-dashboard' && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#EAF4FB]/75">
                  <span>Sample Activity Distribution</span>
                  <span className="font-mono text-[10px]">Placeholder series</span>
                </div>
                <svg viewBox="0 0 320 90" className="w-full h-20" fill="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1769AA" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#1769AA" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 72 L45 58 L90 62 L135 40 L180 46 L225 24 L270 30 L320 14 L320 90 L0 90 Z"
                    fill="url(#chartFill)"
                  />
                  <motion.path
                    d="M0 72 L45 58 L90 62 L135 40 L180 46 L225 24 L270 30 L320 14"
                    stroke="#F36B21"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: EASE_SMOOTH }}
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
