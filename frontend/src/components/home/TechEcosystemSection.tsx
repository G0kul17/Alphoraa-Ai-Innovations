import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { Section } from '../common/Section';
import { DemoTag } from '../common/DemoTag';
import { TECH_CATEGORIES } from '../../data/techStack';
import { EASE_SMOOTH } from '../../animations/variants';

export function TechEcosystemSection() {
  const [activeCat, setActiveCat] = useState(TECH_CATEGORIES[0].id);
  const current = TECH_CATEGORIES.find((c) => c.id === activeCat) || TECH_CATEGORIES[0];

  return (
    <Section
      id="technology-ecosystem"
      chapterNumber="08"
      eyebrow="Technology"
      title="Powered by Modern Technologies."
      subtitle="A modular engineering stack spanning model inference, modern web interfaces, cloud infrastructure, and intelligent automation."
      className="bg-black"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0A0A0A] border border-white/10"
          role="tablist"
          aria-label="Technology categories"
        >
          {TECH_CATEGORIES.map((cat) => {
            const active = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#141414]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <DemoTag label="Proposed technology capabilities, pending confirmation" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: EASE_SMOOTH }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)]"
        >
          <p className="text-sm text-[#9CA3AF] mb-6">{current.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {current.items.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.25 }}
                className="group p-5 rounded-2xl bg-black border border-white/10 hover:border-[#1769AA]/40 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-[#0A0A0A] border border-white/10 text-[#EAF4FB] flex items-center justify-center group-hover:text-[#5BB4F5] group-hover:border-[#1769AA]/30 transition-colors">
                    <Cpu className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-mono text-[#9CA3AF]">
                    {current.label}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-white">
                  {tech.name}
                </h3>
                <p className="mt-1 text-xs text-[#9CA3AF] leading-relaxed">
                  {tech.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
