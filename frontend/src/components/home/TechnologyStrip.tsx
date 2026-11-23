import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import { BrainCircuit, Bot, Cpu, Workflow, CloudCog, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TECH_HIGHLIGHTS = [
  { label: 'Artificial Intelligence', icon: BrainCircuit },
  { label: 'Agentic AI', icon: Bot },
  { label: 'Machine Learning', icon: Cpu },
  { label: 'Intelligent Automation', icon: Workflow },
  { label: 'Cloud Technologies', icon: CloudCog },
  { label: 'Enterprise Solutions', icon: Building2 },
];

export function TechnologyStrip() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });
  const velocityShift = useTransform(smoothVelocity, [-1800, 1800], [-36, 36]);

  return (
    <section
      id="intelligence"
      ref={sectionRef}
      className="py-14 sm:py-16 bg-[#0A0A0A] border-b border-white/10 overflow-hidden"
    >
      <Container className="mb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5BB4F5] mb-2">
          <span className="font-mono">01 / </span>Intelligence
        </p>
        <h2 className="font-display text-lg sm:text-2xl font-bold text-[#EAF4FB]">
          Intelligence That Moves Businesses Forward.
        </h2>
      </Container>

      {reducedMotion ? (
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TECH_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-black border border-white/10 text-sm font-medium text-white"
                >
                  <Icon className="w-4 h-4 text-[#5BB4F5]" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </Container>
      ) : (
        <div
          className="space-y-4 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          {/* Row 1: Leftward */}
          <motion.div style={{ x: velocityShift }} className="w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-5">
              {[...TECH_HIGHLIGHTS, ...TECH_HIGHLIGHTS, ...TECH_HIGHLIGHTS].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={`r1-${item.label}-${idx}`} className="inline-flex items-center gap-5 shrink-0">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-black border border-white/10 text-sm font-semibold text-white whitespace-nowrap">
                      <span className="w-7 h-7 rounded-lg bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[#F36B21] text-sm" aria-hidden="true">✦</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Row 2: Opposite direction */}
          <motion.div style={{ x: velocityShift }} className="w-full overflow-hidden">
            <div className="animate-marquee-reverse flex items-center gap-5">
              {[...TECH_HIGHLIGHTS, ...TECH_HIGHLIGHTS, ...TECH_HIGHLIGHTS].reverse().map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={`r2-${item.label}-${idx}`} className="inline-flex items-center gap-5 shrink-0">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141414]/50 border border-[#1769AA]/15 text-sm font-semibold text-[#EAF4FB] whitespace-nowrap">
                      <span className="w-7 h-7 rounded-lg bg-[#0A0A0A] text-[#F36B21] flex items-center justify-center">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[#F36B21] text-sm" aria-hidden="true">✦</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
