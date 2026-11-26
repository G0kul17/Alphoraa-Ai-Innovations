import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Compass, Map, PenTool, Code2, Rocket, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { EASE_SMOOTH } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    icon: Compass,
    accentColor: '#1769AA',
    summary: 'Audit operational workflows, data readiness, security boundaries, and high-friction manual handoffs.',
    deliverables: ['Workflow map & pain-point brief', 'Data & API readiness assessment', 'Feasibility & risk framing'],
  },
  {
    id: 'strategize',
    number: '02',
    title: 'Strategize',
    icon: Map,
    accentColor: '#5BB4F5',
    summary: 'Select the right blend of Agentic AI, machine learning, or deterministic automation with clear guardrails.',
    deliverables: ['System architecture blueprint', 'Model & tool boundary plan', 'Phased delivery roadmap'],
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    icon: PenTool,
    accentColor: '#F36B21',
    summary: 'Craft intuitive interfaces, human-in-the-loop review queues, and structured data schemas.',
    deliverables: ['Interactive UI prototypes', 'JSON schema & API contracts', 'Accessibility & UX review'],
  },
  {
    id: 'develop',
    number: '04',
    title: 'Develop',
    icon: Code2,
    accentColor: '#10B981',
    summary: 'Engineer modular services, agent orchestrators, automated evaluation suites, and clean web applications.',
    deliverables: ['Full-stack software & agent code', 'Scenario evaluation tests', 'Staging environment demos'],
  },
  {
    id: 'deploy',
    number: '05',
    title: 'Deploy & Optimize',
    icon: Rocket,
    accentColor: '#F36B21',
    summary: 'Launch safely with observability logs, exception routing, and iterative refinement as usage grows.',
    deliverables: ['Production CI/CD deployment', 'Logging & monitoring setup', 'Post-launch tuning cycles'],
  },
];

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking across the section height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active step based on scroll progress (desktop)
  useEffect(() => {
    if (reducedMotion) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        PROCESS_STEPS.length - 1,
        Math.max(0, Math.floor(v * PROCESS_STEPS.length))
      );
      setActiveStep(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, reducedMotion]);

  // Dynamic moving visual properties driven by scroll
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const beadLeft = useTransform(scrollYProgress, [0, 1], ['8%', '92%']);

  const goToStep = (idx: number) => {
    setActiveStep(idx);
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        const targetY = sectionTop + (idx / (PROCESS_STEPS.length - 1)) * scrollableHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const current = PROCESS_STEPS[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className={`relative bg-[#0A0A0A] text-white ${
        reducedMotion ? 'py-20' : 'min-h-[100vh] lg:min-h-[260vh]'
      }`}
    >
      {/* Sticky Storytelling Stage on Desktop — Locked cleanly in view with ZERO gaps */}
      <div
        className={`${
          reducedMotion ? '' : 'lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]'
        } flex flex-col justify-center overflow-hidden py-16 sm:py-20 lg:py-0`}
      >
        {/* Dynamic Background Ambient Glow that shifts based on the active stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[620px] rounded-full blur-[130px] transition-all duration-700 opacity-20"
            style={{ backgroundColor: current.accentColor }}
          />
        </div>

        <Container className="relative z-10 w-full">
          {/* Section Chapter Header */}
          <div className="mb-8 lg:mb-10 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5BB4F5] flex items-center gap-2">
              <span className="font-mono text-[#F36B21]">09 / </span>
              <span>Process</span>
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight text-white leading-tight">
              From Business Challenges to Intelligent Solutions.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#9CA3AF] max-w-2xl">
              A structured five-stage engineering process built for transparency, safety, and maintainable delivery.
            </p>
          </div>

          {/* Desktop Cinematic Horizontal Timeline with Traveling Energy Bead */}
          <div className="hidden lg:block motion-reduce:hidden">
            {/* The Timeline Track & Glowing Energy Bead */}
            <div className="relative mb-8 pt-4">
              {/* Inactive Base Track */}
              <div className="absolute top-[52px] left-[8%] right-[8%] h-1 rounded-full bg-white/10" aria-hidden="true" />

              {/* Active Gradient Filled Line */}
              <motion.div
                aria-hidden="true"
                style={{
                  scaleX: reducedMotion ? 1 : lineScale,
                  transformOrigin: 'left',
                }}
                className="absolute top-[52px] left-[8%] right-[8%] h-1 rounded-full bg-gradient-to-r from-[#1769AA] via-[#5BB4F5] to-[#F36B21] shadow-[0_0_12px_rgba(243,107,33,0.5)]"
              />

              {/* Moving Glowing Laser Bead traveling along the track */}
              {!reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  style={{ left: beadLeft }}
                  className="absolute top-[52px] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F36B21] shadow-[0_0_18px_6px_rgba(243,107,33,0.8),0_0_30px_10px_rgba(23,105,170,0.5)] z-20 pointer-events-none"
                >
                  <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
                </motion.div>
              )}

              {/* 5 Process Step Nodes */}
              <div className="relative grid grid-cols-5 gap-4">
                {PROCESS_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === activeStep;
                  const isReached = idx <= activeStep;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => goToStep(idx)}
                      className="group flex flex-col items-center text-center cursor-pointer focus-visible:rounded-xl p-2 relative"
                    >
                      {/* Active Sonar Ripple Ring */}
                      {isActive && (
                        <span
                          className="absolute top-2 w-16 h-16 rounded-2xl border-2 border-[#F36B21] animate-ping opacity-30 pointer-events-none"
                          aria-hidden="true"
                        />
                      )}

                      <div
                        className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                          isActive
                            ? 'bg-[#F36B21] text-white border-[#F36B21] scale-110 shadow-[0_10px_28px_-4px_rgba(243,107,33,0.6)] ring-4 ring-[#F36B21]/20'
                            : isReached
                            ? 'bg-[#1769AA] text-white border-[#1769AA] shadow-[0_4px_16px_rgba(23,105,170,0.35)]'
                            : 'bg-[#0A0A0A] text-[#5BB4F5] border-white/15 group-hover:border-[#F36B21] group-hover:text-[#F36B21] group-hover:scale-105'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>

                      <span
                        className={`mt-4 font-display text-3xl font-extrabold tabular-nums leading-none transition-all duration-300 ${
                          isActive
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#F36B21] via-[#FF8533] to-[#D95512] drop-shadow-[0_2px_12px_rgba(243,107,33,0.45)] scale-110'
                            : isReached
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#1769AA] to-[#5BB4F5]'
                            : 'text-slate-400 group-hover:text-[#F36B21] group-hover:scale-105'
                        }`}
                      >
                        {step.number}
                      </span>

                      <span
                        className={`mt-1.5 font-display text-sm font-bold transition-colors ${
                          isActive ? 'text-[#F36B21]' : 'text-white group-hover:text-[#F36B21]'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Stage Details Card with Watermark Numeral & Laser Edge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121212] via-[#0B0B0B] to-[#050505] border border-white/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden"
              >
                {/* 1. Top Edge Laser Glow Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${current.accentColor}, transparent)`,
                  }}
                />

                {/* 2. Cyber Reticles in corners */}
                <span className="absolute top-3 left-3 text-[10px] font-mono text-white/20 select-none" aria-hidden="true">+</span>
                <span className="absolute top-3 right-3 text-[10px] font-mono text-white/20 select-none" aria-hidden="true">+</span>

                {/* 3. Watermark Outlined Stage Number in background */}
                <span
                  className="absolute right-6 bottom-2 font-display text-[130px] font-black text-white/[0.04] select-none pointer-events-none tabular-nums leading-none"
                  aria-hidden="true"
                >
                  {current.number}
                </span>

                <div className="grid grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left Column: Stage description & Icon */}
                  <div className="col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors"
                        style={{
                          backgroundColor: `${current.accentColor}25`,
                          color: current.accentColor,
                          boxShadow: `0 8px 20px -4px ${current.accentColor}40`,
                        }}
                      >
                        <CurrentIcon className="w-6 h-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F36B21]">
                          Stage {current.number} · Methodology
                        </p>
                        <h3 className="font-display text-2xl font-bold text-white">
                          {current.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base text-[#9CA3AF] leading-relaxed max-w-xl">
                      {current.summary}
                    </p>
                  </div>

                  {/* Right Column: Key Deliverables Panel */}
                  <div className="col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0A0A0A]/90 border border-white/10 space-y-3 backdrop-blur-md shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FB] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#F36B21]" aria-hidden="true" />
                        <span>Key Deliverables</span>
                      </p>
                      <span className="text-[10px] font-mono text-[#5BB4F5] font-semibold">
                        VERIFIED SPEC
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {current.deliverables.map((del, dIdx) => (
                        <motion.div
                          key={del}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: dIdx * 0.08 }}
                          className="text-xs sm:text-sm text-[#EAF4FB]/85 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F36B21] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{del}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Vertical Timeline (Simple, responsive layout) */}
          <div className="lg:hidden motion-reduce:block relative pl-8 space-y-6">
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
        </Container>
      </div>
    </section>
  );
}
