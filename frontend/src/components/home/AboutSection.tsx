import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Compass, Eye, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../common/Button';
import { DemoTag } from '../common/DemoTag';
import { AgentIdCard } from '../motion/AgentIdCard';
import { EASE_SMOOTH } from '../../animations/variants';
import { SITE_CONFIG } from '../../data/config';

interface StoryBeat {
  id: string;
  step: string;
  tag: string;
  title: string;
  description: string;
  icon: typeof Compass;
  badgeColor: string;
  highlights: string[];
}

const STORY_BEATS: StoryBeat[] = [
  {
    id: 'who-we-are',
    step: '01',
    tag: 'Who We Are',
    title: 'Beyond Traditional Code. Into Autonomous Cognition.',
    description:
      'ALPHORAA AI INNOVATIONS engineers intelligent, self-correcting AI systems that understand context, formulate plans, and execute multi-step workflows with mathematical precision.',
    icon: Sparkles,
    badgeColor: '#1769AA',
    highlights: [
      'Grounded in verifiable business logic & private data indexes',
      'Purpose-built architectures avoiding fragile single-prompt wrappers',
      'Engineered for security, compliance, and enterprise scale',
    ],
  },
  {
    id: 'mission',
    step: '02',
    tag: 'Our Mission',
    title: SITE_CONFIG.mission.title,
    description: SITE_CONFIG.mission.body,
    icon: Compass,
    badgeColor: '#5BB4F5',
    highlights: [
      'Automate high-friction cross-system data handoffs',
      'Safeguard operational decisions with deterministic policy filters',
      'Empower teams with domain-specific tool-using copilots',
    ],
  },
  {
    id: 'vision',
    step: '03',
    tag: 'Our Vision',
    title: SITE_CONFIG.vision.title,
    description: SITE_CONFIG.vision.body,
    icon: Eye,
    badgeColor: '#F36B21',
    highlights: [
      'Continuous machine learning that improves with usage',
      'Multi-agent orchestration delegating complex parallel operations',
      'Human-in-the-loop review queues for total visibility & safety',
    ],
  },
  {
    id: 'what-we-build',
    step: '04',
    tag: 'What We Build',
    title: 'Enterprise AI Systems Engineered for Real Impact.',
    description:
      'From custom agentic orchestrators to hybrid workflow pipelines and conversational intelligence, we deliver production software ready for operational deployment.',
    icon: ShieldCheck,
    badgeColor: '#10B981',
    highlights: [
      'Autonomous Agent Swarms with tool calling & state memory',
      'Predictive ML pipelines & intelligent data extraction',
      'Resilient backend APIs integrated with enterprise ERPs & CRMs',
    ],
  },
];

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active story beat based on scroll progress
  useEffect(() => {
    if (reducedMotion) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const step = Math.min(
        STORY_BEATS.length - 1,
        Math.max(0, Math.floor(v * STORY_BEATS.length))
      );
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress, reducedMotion]);

  // Scroll-linked circuit line draw progress
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const currentBeat = STORY_BEATS[activeStep];
  const CurrentIcon = currentBeat.icon;

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative bg-black text-white ${
        reducedMotion ? 'py-20' : 'min-h-[100vh] lg:min-h-[320vh]'
      }`}
    >
      {/* Sticky Storytelling Stage on Desktop */}
      <div
        className={`${
          reducedMotion ? '' : 'lg:sticky lg:top-0 lg:h-screen'
        } flex items-center overflow-hidden py-16 sm:py-20 lg:py-0`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-[#1769AA]/15 blur-[120px] transition-all duration-700"
            style={{
              backgroundColor:
                activeStep === 2 ? 'rgba(243,107,33,0.18)' : 'rgba(23,105,170,0.18)',
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Chapter Header */}
          <div className="mb-8 lg:mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5BB4F5] flex items-center gap-2">
                <span className="font-mono text-[#F36B21]">02 / </span>
                <span>About ALPHORAA</span>
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Intelligent Possibilities. Purpose-Built Architecture.
              </h2>
            </div>

            {/* Step Indicators (Interactive tabs visible across mobile, tablet & desktop) */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Story stages">
              {STORY_BEATS.map((beat, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={beat.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    role="tab"
                    aria-selected={isActive}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#F36B21] bg-[#F36B21]/15 text-white shadow-[0_0_15px_rgba(243,107,33,0.3)]'
                        : 'border-white/10 bg-[#0A0A0A] text-[#9CA3AF] hover:text-white hover:border-white/25'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#F36B21]">{beat.step}</span>
                    <span>{beat.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Dynamic Story Beat Content (Cross-fading on scroll) */}
            <div className="lg:col-span-7 min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBeat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-md"
                      style={{ backgroundColor: `${currentBeat.badgeColor}25`, color: currentBeat.badgeColor }}
                    >
                      <CurrentIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F36B21]">
                      Stage {currentBeat.step} · {currentBeat.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {currentBeat.title}
                  </h3>

                  <p className="text-base sm:text-lg text-[#EAF4FB]/85 leading-relaxed max-w-xl">
                    {currentBeat.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {currentBeat.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-[#9CA3AF]">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: currentBeat.badgeColor }}
                          aria-hidden="true"
                        />
                        <span className="leading-snug text-[#EAF4FB]/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button to="/about" variant="secondary" withArrow>
                      Explore Our Philosophy
                    </Button>
                    <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                      Scroll to advance through our engineering blueprint ↓
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Interactive 3D Agent Card + Dynamic Circuit Matrix */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[420px]">
                {/* Circuit Lines linking around card */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute -inset-6 sm:-inset-10 w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+5rem)] pointer-events-none"
                >
                  <motion.path
                    d="M 5 15 L 5 45 L 2 52"
                    fill="none"
                    stroke={activeStep % 2 === 0 ? '#1769AA' : '#F36B21'}
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: lineProgress }}
                  />
                  <motion.path
                    d="M 95 15 L 95 45 L 98 52"
                    fill="none"
                    stroke={activeStep % 2 === 0 ? '#F36B21' : '#5BB4F5'}
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: lineProgress }}
                  />
                  <motion.path
                    d="M 5 85 L 5 65 L 1 58"
                    fill="none"
                    stroke="#1769AA"
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: lineProgress }}
                  />
                  <motion.path
                    d="M 95 85 L 95 65 L 99 58"
                    fill="none"
                    stroke="#F36B21"
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: lineProgress }}
                  />
                </svg>

                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#141414] via-[#0A0A0A] to-black border border-white/10 shadow-[0_20px_50px_-15px_rgba(18,59,96,0.25)]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FB] flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: currentBeat.badgeColor }}
                      />
                      <span>Active Node: {currentBeat.tag}</span>
                    </p>
                    <DemoTag label="Interactive 3D Pass" />
                  </div>

                  <AgentIdCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
