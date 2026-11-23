import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrainCircuit, Target, Layers, Workflow, Code2, RefreshCw } from 'lucide-react';
import { Section } from '../common/Section';
import { EASE_SMOOTH } from '../../animations/variants';

const DIFFERENTIATORS = [
  {
    id: 'ai-first',
    title: 'AI-First Approach',
    icon: BrainCircuit,
    summary: 'Designing architectures where reasoning, retrieval, and structured tool use are core primitives rather than bolted-on widgets.',
    principle: 'Evaluate problem fit first—applying foundation models, classical ML, or deterministic rules where each performs best.',
    highlights: [
      'Grounded retrieval over verified internal documentation',
      'Structured input/output contracts for dependable tool calling',
      'Built-in evaluation sets before production rollout',
    ],
  },
  {
    id: 'business-focused',
    title: 'Business-Focused Innovation',
    icon: Target,
    summary: 'Focusing on concrete operational bottlenecks, handoffs, and team adoption instead of technology for its own sake.',
    principle: 'Every capability begins with workflow mapping alongside the people who perform the work daily.',
    highlights: [
      'Clear scoping around high-friction operational bottlenecks',
      'Plain-language interfaces built for non-technical staff',
      'Transparent milestone reviews throughout delivery',
    ],
  },
  {
    id: 'scalable-tech',
    title: 'Scalable Technology',
    icon: Layers,
    summary: 'Modular APIs, typed schemas, and cloud-ready infrastructure designed to grow cleanly as usage expands.',
    principle: 'Clean separation between model providers, business logic, and data storage prevents vendor lock-in.',
    highlights: [
      'Provider-agnostic model routing and gateway patterns',
      'Containerized services ready for private VPC deployment',
      'Structured observability, logging, and error recovery',
    ],
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    icon: Workflow,
    summary: 'Blending deterministic workflow orchestration with AI classification so back-office processes stay predictable.',
    principle: 'Human-in-the-loop exception queues handle edge cases gracefully without stalling the entire pipeline.',
    highlights: [
      'Idempotent webhook and API connectors across tools',
      'Confidence thresholds routing edge cases to human review',
      'Elimination of repetitive manual re-keying',
    ],
  },
  {
    id: 'custom-built',
    title: 'Custom-Built Solutions',
    icon: Code2,
    summary: 'Tailored software crafted around your exact domain rules, permissions, and existing enterprise ecosystem.',
    principle: 'Rather than forcing teams into rigid templates, we build clean interfaces around your real operating model.',
    highlights: [
      'Role-based access control aligned with internal permissions',
      'Direct integration with existing CRMs, ERPs, and databases',
      'Clean, documented TypeScript and Python codebases',
    ],
  },
  {
    id: 'continuous-innovation',
    title: 'Continuous Innovation',
    icon: RefreshCw,
    summary: 'Structured post-launch refinement so prompts, retrieval indexes, and workflows keep pace as models evolve.',
    principle: 'Model capabilities change rapidly; modular evaluation pipelines let you upgrade safely without rewriting apps.',
    highlights: [
      'Regression testing harnesses for model or prompt updates',
      'Ongoing knowledge-base hygiene and indexing pipelines',
      'Iterative feature expansion guided by real team feedback',
    ],
  },
];

export function WhyChooseSection() {
  const [activeId, setActiveId] = useState(DIFFERENTIATORS[0].id);
  const activeItem = DIFFERENTIATORS.find((d) => d.id === activeId) || DIFFERENTIATORS[0];
  const ActiveIcon = activeItem.icon;

  return (
    <Section
      id="why-alphoraa"
      chapterNumber="07"
      eyebrow="Why ALPHORAA"
      title="Why Businesses Choose Intelligent Innovation."
      subtitle="Six engineering commitments guiding how we design, validate, and ship AI-enabled software."
      theme="dark"
      className="gradient-dark-cinematic text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-2" role="tablist" aria-label="ALPHORAA differentiators">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(item.id)}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white/12 border-[#F36B21]/60 shadow-sm'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#F36B21] text-white'
                      : 'bg-white/10 text-[#EAF4FB]'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono text-[#EAF4FB]/60 tabular-nums">0{idx + 1}</p>
                  <p className="font-display text-sm sm:text-base font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: EASE_SMOOTH }}
              className="p-7 sm:p-10 keep-dark rounded-3xl bg-[#0B0B0B] text-white shadow-[0_24px_48px_-16px_rgba(0,0,0,0.35)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#141414] flex items-center justify-center mb-6">
                <ActiveIcon className="w-7 h-7 text-[#5BB4F5]" aria-hidden="true" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {activeItem.title}
              </h3>

              <p className="mt-4 text-base text-[#9CA3AF] leading-relaxed">
                {activeItem.summary}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-black border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F36B21] mb-1.5">
                  Engineering Principle
                </p>
                <p className="text-sm text-[#EAF4FB] leading-relaxed">
                  {activeItem.principle}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5">
                {activeItem.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-white">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1769AA] shrink-0" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
