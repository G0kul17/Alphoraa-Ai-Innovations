import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { Search, Database, Zap, Headphones, BarChart3, ChevronDown } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { WordReveal } from '../animations/WordReveal';
import { EASE_SMOOTH } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Hero3DScene } from '../3d/Hero3DScene';

interface AgentNode {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof Search;
  xPct: number;
  yPct: number;
  svgX: number;
  svgY: number;
  duration: number;
  href: string;
}

const AGENT_NODES: AgentNode[] = [
  {
    id: 'research',
    label: 'Research Agent',
    shortLabel: 'Research',
    description: 'Gathers internal documentation and synthesizes structured source briefs.',
    icon: Search,
    xPct: 24,
    yPct: 18,
    svgX: 120,
    svgY: 83,
    duration: 5.5,
    href: '/services/agentic-ai-development',
  },
  {
    id: 'data',
    label: 'Data Agent',
    shortLabel: 'Data',
    description: 'Validates, transforms, and queries structured business datasets safely.',
    icon: Database,
    xPct: 76,
    yPct: 18,
    svgX: 380,
    svgY: 83,
    duration: 6.4,
    href: '/services/ai-machine-learning-solutions',
  },
  {
    id: 'automation',
    label: 'Automation Agent',
    shortLabel: 'Automation',
    description: 'Orchestrates multi-step tool actions and cross-system API handoffs.',
    icon: Zap,
    xPct: 22,
    yPct: 71,
    svgX: 110,
    svgY: 327,
    duration: 7.1,
    href: '/services/ai-automation',
  },
  {
    id: 'support',
    label: 'Customer Support Agent',
    shortLabel: 'Support',
    description: 'Resolves inquiries from verified knowledge bases with clean escalation.',
    icon: Headphones,
    xPct: 74,
    yPct: 71,
    svgX: 370,
    svgY: 327,
    duration: 6.0,
    href: '/services/ai-chatbots-conversational-ai',
  },
  {
    id: 'bi',
    label: 'Business Intelligence Agent',
    shortLabel: 'Intelligence',
    description: 'Monitors operational patterns and prepares concise decision summaries.',
    icon: BarChart3,
    xPct: 50,
    yPct: 83,
    svgX: 250,
    svgY: 382,
    duration: 7.6,
    href: '/services/enterprise-ai-solutions',
  },
];

const CORE_X = 250;
const CORE_Y = 230;

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const scrollY = useScrollPosition();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDesktopFine, setIsDesktopFine] = useState(false);
  const [particleCount, setParticleCount] = useState(20);
  const heroContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkEnv = () => {
      const coarse = window.matchMedia?.('(pointer: coarse)').matches;
      const wide = window.innerWidth >= 1024;
      setIsDesktopFine(!coarse && wide);
      setParticleCount(window.innerWidth < 768 ? 10 : 20);
    };
    checkEnv();
    window.addEventListener('resize', checkEnv);
    return () => window.removeEventListener('resize', checkEnv);
  }, []);

  const enableScrollPin = isDesktopFine && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll-driven transforms across 150vh pinned stage
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.45]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const coreScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.94, 1.06, 1.12]);
  const orbitExpand = useTransform(scrollYProgress, [0, 0.85], [0.78, 1.04]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const coreShiftX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const coreShiftY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const nodesShiftX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const nodesShiftY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enableScrollPin || !heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeNodeObj = AGENT_NODES.find((n) => n.id === hoveredNode);
  const showScrollCue = scrollY < 80;

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative gradient-dark-cinematic text-white ${
        enableScrollPin ? 'lg:min-h-[150vh]' : 'min-h-screen'
      }`}
    >
      <div
        className={`${
          enableScrollPin ? 'lg:sticky lg:top-0 lg:h-screen' : 'min-h-screen'
        } relative flex items-center pt-24 pb-20 lg:pt-24 lg:pb-16 overflow-hidden`}
      >
        {/* Subtle dark dotted grid */}
        <div
          className="absolute inset-0 bg-dot-grid-dark opacity-50 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Two slow drifting orbs (Primary Blue & Orange at ~15-20% opacity) */}
        {!reducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              animate={{ x: [0, 36, 0], y: [0, -24, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 -left-24 w-[440px] h-[440px] rounded-full bg-[#1769AA]/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 28, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F36B21]/18 blur-3xl"
            />
          </div>
        )}

        {/* Subtle floating particles */}
        {!reducedMotion && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {Array.from({ length: particleCount }).map((_, idx) => {
              const left = `${(idx * 37 + 11) % 94}%`;
              const top = `${(idx * 53 + 7) % 88}%`;
              const dur = 9 + (idx % 6) * 1.6;
              const isOrange = idx % 4 === 0;
              return (
                <motion.span
                  key={idx}
                  style={{ left, top }}
                  animate={{ y: [0, -14, 0], opacity: [0.15, 0.45, 0.15] }}
                  transition={{
                    duration: dur,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (idx % 5) * 0.5,
                  }}
                  className={`absolute w-1.5 h-1.5 rounded-full ${
                    isOrange ? 'bg-[#F36B21]/45' : 'bg-[#EAF4FB]/30'
                  }`}
                />
              );
            })}
          </div>
        )}

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: White Copy & Primary Actions */}
            <motion.div
              style={enableScrollPin ? { opacity: headingOpacity, y: headingY } : undefined}
              className="lg:col-span-6 space-y-6"
            >
              <WordReveal
                as="h1"
                text="Building the Future with Agentic AI."
                highlightWords={['Agentic', 'AI.']}
                className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1]"
              />

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE_SMOOTH }}
                className="text-base sm:text-lg text-[#EAF4FB]/80 leading-relaxed max-w-xl"
              >
                Transforming businesses through intelligent AI systems, autonomous agents and next-generation automation. We engineer intelligent solutions that help businesses operate smarter, faster and better.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38, ease: EASE_SMOOTH }}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                <Button to="/services" size="lg" withArrow magnetic>
                  Explore Our Services
                </Button>
                <Button to="/contact" variant="outlineLight" size="lg">
                  Let&apos;s Build Together
                </Button>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.52 }}
                className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-medium text-[#EAF4FB]/75"
              >
                <span>Agentic AI</span>
                <span className="text-[#F36B21]" aria-hidden="true">·</span>
                <span>Intelligent Automation</span>
                <span className="text-[#F36B21]" aria-hidden="true">·</span>
                <span>Enterprise-ready</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive 3D WebGL Neural Core + Agent Ecosystem */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <motion.div
                style={enableScrollPin ? { scale: coreScale } : undefined}
                className="relative mx-auto w-full max-w-[500px] aspect-[500/460] select-none"
              >
                {/* 1. 3D WebGL Three.js Scene - Positioned in the exact center behind the nodes */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                  <Hero3DScene className="w-full h-full" />
                </div>

                {/* 2. SVG connection lines overlay radiating from center (250, 230) */}
                <motion.svg
                  viewBox="0 0 500 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                  aria-label="Interactive AI ecosystem diagram connecting central AI core to five specialized agents"
                  style={
                    enableScrollPin
                      ? { x: coreShiftX, y: coreShiftY }
                      : undefined
                  }
                >
                  <defs>
                    <radialGradient id="darkCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1769AA" stopOpacity="0.3" />
                      <stop offset="65%" stopColor="#F36B21" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx={CORE_X} cy={CORE_Y} r="120" fill="url(#darkCoreGlow)" />

                  {AGENT_NODES.map((node, idx) => {
                    const ctrlX = (CORE_X + node.svgX) / 2 + (idx % 2 === 0 ? 18 : -18);
                    const ctrlY = (CORE_Y + node.svgY) / 2 - 12;
                    const pathD = `M ${CORE_X} ${CORE_Y} Q ${ctrlX} ${ctrlY} ${node.svgX} ${node.svgY}`;
                    const isHighlighted = hoveredNode === node.id;

                    return (
                      <g key={node.id}>
                        <motion.path
                          d={pathD}
                          stroke={isHighlighted ? '#F36B21' : '#5BB4F5'}
                          strokeOpacity={isHighlighted ? 0.95 : 0.35}
                          strokeWidth={isHighlighted ? 2.5 : 1.4}
                          strokeLinecap="round"
                          initial={reducedMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, delay: 0.2 + idx * 0.08, ease: EASE_SMOOTH }}
                        />
                        {!reducedMotion && (
                          <circle r={isHighlighted ? 4 : 3} fill={isHighlighted ? '#F36B21' : '#EAF4FB'}>
                            <animateMotion
                              dur={`${3.4 + idx * 0.5}s`}
                              repeatCount="indefinite"
                              path={pathD}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </motion.svg>

                {/* 3. The 5 Agent Nodes floating directly around the 3D Core */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={
                    enableScrollPin
                      ? { x: nodesShiftX, y: nodesShiftY, scale: orbitExpand }
                      : undefined
                  }
                >
                  {AGENT_NODES.map((node, idx) => {
                    const Icon = node.icon;
                    const isActive = hoveredNode === node.id;

                    return (
                      <motion.div
                        key={node.id}
                        style={{
                          left: `${node.xPct}%`,
                          top: `${node.yPct}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
                        animate={
                          reducedMotion
                            ? { opacity: 1, scale: 1 }
                            : {
                                opacity: 1,
                                scale: 1,
                                y: [0, -7, 0],
                              }
                        }
                        transition={
                          reducedMotion
                            ? { duration: 0.3 }
                            : {
                                opacity: { duration: 0.5, delay: 0.3 + idx * 0.08 },
                                scale: { duration: 0.5, delay: 0.3 + idx * 0.08 },
                                y: {
                                  duration: node.duration,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: idx * 0.4,
                                },
                              }
                        }
                        className="absolute pointer-events-auto"
                      >
                        <Link
                          to={node.href}
                          data-cursor="Open"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onFocus={() => setHoveredNode(node.id)}
                          onBlur={() => setHoveredNode(null)}
                          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-md border transition-all duration-200 shadow-lg cursor-pointer ${
                            isActive
                              ? 'border-[#F36B21] scale-105 shadow-[0_12px_28px_-8px_rgba(243,107,33,0.45)]'
                              : 'border-white/20 hover:border-[#5BB4F5]'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-[#F36B21] text-white'
                                : 'bg-[#1769AA]/35 text-[#EAF4FB]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-white whitespace-nowrap">
                            <span className="sm:hidden">{node.shortLabel}</span>
                            <span className="hidden sm:inline">{node.label}</span>
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* 4. Tooltip / Inspector Panel underneath — Displays ONLY on hover/focus */}
              <div
                aria-live="polite"
                className="mt-6 min-h-[52px] w-full max-w-[500px] flex items-center justify-start text-left"
              >
                <AnimatePresence>
                  {activeNodeObj && (
                    <motion.div
                      key={activeNodeObj.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Link
                        to={activeNodeObj.href}
                        data-cursor="Open"
                        className="group px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#0A0A0A]/95 border border-[#F36B21]/50 shadow-xl w-full block hover:border-[#F36B21] hover:scale-[1.01] transition-all cursor-pointer backdrop-blur-md"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-[#F36B21] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F36B21] animate-pulse" />
                            <span>{activeNodeObj.label}</span>
                          </p>
                          <span className="text-[11px] text-[#5BB4F5] group-hover:underline font-medium">
                            Explore Service →
                          </span>
                        </div>
                        <p className="text-xs text-[#EAF4FB]/85 mt-1 leading-relaxed">
                          {activeNodeObj.description}
                        </p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll to begin cue — fades out after 80px scroll */}
        <motion.div
          animate={{ opacity: showScrollCue ? 1 : 0, y: showScrollCue ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#EAF4FB]/70"
          aria-hidden="true"
        >
          <span className="tracking-wider uppercase text-[10px] font-medium">
            Scroll to begin
          </span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
            <motion.span
              animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-[#F36B21]"
            />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#EAF4FB]/50" />
        </motion.div>
      </div>
    </section>
  );
}
