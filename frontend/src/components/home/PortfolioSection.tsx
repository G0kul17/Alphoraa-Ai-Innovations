import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { CoverArtwork } from '../common/CoverArtwork';
import { DemoTag } from '../common/DemoTag';
import { PROJECTS } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE_SMOOTH } from '../../animations/variants';
import type { ProjectCategory } from '../../types';

const FILTER_OPTIONS: Array<'All Projects' | ProjectCategory> = [
  'All Projects',
  'Agentic AI',
  'AI & ML',
  'Automation',
  'Web Applications',
  'Enterprise Solutions',
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<'All Projects' | ProjectCategory>('All Projects');
  const reducedMotion = useReducedMotion();

  const filtered =
    activeFilter === 'All Projects'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <Section
      id="portfolio"
      chapterNumber="06"
      eyebrow="Work"
      title="Turning Intelligent Ideas Into Real-World Solutions."
      subtitle="Illustrative architecture blueprints and demo case studies showing how AI systems can solve operational bottlenecks. No fabricated client names or unverified metrics."
      className="bg-black"
    >
      <div
        className="flex flex-wrap items-center gap-2 mb-10"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTER_OPTIONS.map((cat) => {
          const active = activeFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              aria-pressed={active}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#1769AA] text-white shadow-sm'
                  : 'bg-[#0A0A0A] text-[#9CA3AF] border border-white/10 hover:border-[#1769AA]/40 hover-strong'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#0A0A0A] border border-white/10 text-center">
          <p className="text-base font-medium text-white">
            No demo projects match the selected category.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter('All Projects')}
            className="mt-3 text-sm font-semibold text-[#5BB4F5] hover:underline cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] hover:shadow-[0_16px_40px_-12px_rgba(18,59,96,0.14)] hover:border-[#1769AA]/35 transition-all duration-300 flex flex-col"
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  data-cursor="View"
                  className="block h-44 overflow-hidden"
                >
                  <motion.div
                    initial={reducedMotion ? false : { scale: 1.14 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.75, ease: EASE_SMOOTH }}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none">
                      <CoverArtwork
                        variant={project.coverVariant}
                        label={`${project.title} abstract illustration`}
                      />
                    </div>
                  </motion.div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-2.5">
                      <DemoTag label="Demo case study" />
                      <span aria-hidden="true">·</span>
                      <span>{project.industry}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#5BB4F5] transition-colors leading-snug">
                      <Link to={`/portfolio/${project.slug}`} data-cursor="View">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-sm text-[#9CA3AF] leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <p className="mt-4 text-xs text-[#9CA3AF] leading-relaxed">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      data-cursor="View"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] group-hover:text-[#F36B21] transition-colors"
                    >
                      <span>View Case Study</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Section>
  );
}
