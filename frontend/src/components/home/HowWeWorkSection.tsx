import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Compass, Map, PenTool, Code2, Rocket } from 'lucide-react';
import { Section } from '../common/Section';
import { EASE_SMOOTH } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    icon: Compass,
    summary: 'Audit operational workflows, data readiness, security boundaries, and high-friction manual handoffs.',
    deliverables: ['Workflow map & pain-point brief', 'Data & API readiness assessment', 'Feasibility & risk framing'],
  },
  {
    id: 'strategize',
    number: '02',
    title: 'Strategize',
    icon: Map,
    summary: 'Select the right blend of Agentic AI, machine learning, or deterministic automation with clear guardrails.',
    deliverables: ['System architecture blueprint', 'Model & tool boundary plan', 'Phased delivery roadmap'],
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    icon: PenTool,
    summary: 'Craft intuitive interfaces, human-in-the-loop review queues, and structured data schemas.',
    deliverables: ['Interactive UI prototypes', 'JSON schema & API contracts', 'Accessibility & UX review'],
  },
  {
    id: 'develop',
    number: '04',
    title: 'Develop',
    icon: Code2,
    summary: 'Engineer modular services, agent orchestrators, automated evaluation suites, and clean web applications.',
    deliverables: ['Full-stack software & agent code', 'Scenario evaluation tests', 'Staging environment demos'],
  },
  {
    id: 'deploy',
    number: '05',
    title: 'Deploy & Optimize',
    icon: Rocket,
    summary: 'Launch safely with observability logs, exception routing, and iterative refinement as usage grows.',
    deliverables: ['Production CI/CD deployment', 'Logging & monitoring setup', 'Post-launch tuning cycles'],
  },
];

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const current = PROCESS_STEPS[activeStep];
  const CurrentIcon = current.icon;

  return (
    <Section
      id="how-we-work"
      chapterNumber="09"
      eyebrow="Process"
      title="From Business Challenges to Intelligent Solutions."
      subtitle="A structured five-stage engineering process built for transparency, safety, and maintainable delivery."
      className="bg-[#0A0A0A]"
    >
      <div ref={containerRef}>
        {/* Desktop Horizontal Timeline with Outlined Digits */}
        <div className="hidden lg:block">
          <div className="relative mb-10 pt-4">
            <div className="absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-white/10" aria-hidden="true" />
            <motion.div
              aria-hidden="true"
              style={{
                scaleX: reducedMotion ? 1 : lineScale,
                transformOrigin: 'left',
              }}
              className="absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#1769AA] to-[#F36B21]"
            />

            <div className="relative grid grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeStep;
                const isReached = idx <= activeStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center cursor-pointer focus-visible:rounded-xl p-2"
                  >
                    <div
                      className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                        isActive
                          ? 'bg-[#F36B21] text-white border-[#F36B21] scale-110 shadow-[0_10px_24px_-6px_rgba(243,107,33,0.45)]'
                          : isReached
                          ? 'bg-[#1769AA] text-white border-[#1769AA]'
                          : 'bg-[#0A0A0A] text-[#5BB4F5] border-white/15 group-hover:border-[#F36B21] group-hover:text-[#F36B21] group-hover:scale-105'
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span
                      className={`mt-4 font-display text-3xl font-extrabold tabular-nums leading-none transition-all duration-300 ${
                        isActive
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#F36B21] via-[#FF8533] to-[#D95512] drop-shadow-[0_2px_10px_rgba(243,107,33,0.35)] scale-110'
                          : isReached
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#1769AA] to-[#5BB4F5]'
                          : 'text-slate-400 group-hover:text-[#F36B21] group-hover:scale-105'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`mt-1.5 font-display text-sm font-bold transition-colors ${
                        isActive
                          ? 'text-[#F36B21]'
                          : 'text-white group-hover:text-[#F36B21]'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: EASE_SMOOTH }}
              className="p-8 rounded-3xl bg-black border border-white/10 grid grid-cols-12 gap-8 items-center"
            >
              <div className="col-span-7 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                    <CurrentIcon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-mono text-[#F36B21] font-semibold">
                      Stage {current.number}
                    </p>
                    <h3 className="font-display text-xl font-bold text-white">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  {current.summary}
                </p>
              </div>

              <div className="col-span-5 p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FB]">
                  Key Outputs
                </p>
                {current.deliverables.map((del) => (
                  <p key={del} className="text-sm text-[#9CA3AF] flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1769AA] shrink-0" aria-hidden="true" />
                    <span>{del}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative pl-8 space-y-6">
          <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-white/10" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: reducedMotion ? 1 : scrollYProgress,
              transformOrigin: 'top',
            }}
            className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#1769AA] to-[#F36B21]"
          />

          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative p-5 rounded-2xl bg-black border border-white/10">
                <span className="absolute -left-[29px] top-6 w-7 h-7 rounded-lg bg-[#1769AA] text-white flex items-center justify-center shadow-xs">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <p className="text-xs font-mono text-[#F36B21] font-semibold">
                  Stage {step.number}
                </p>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                  {step.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
