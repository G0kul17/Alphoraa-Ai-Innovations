import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, LayoutGrid, List, Search } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { CoverArtwork } from '../components/common/CoverArtwork';
import { DemoTag } from '../components/common/DemoTag';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { PROJECTS } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { ProjectCategory, ProjectItem } from '../types';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const CATEGORIES: Array<'All Projects' | ProjectCategory> = [
  'All Projects',
  'Agentic AI',
  'AI & ML',
  'Automation',
  'Web Applications',
  'Enterprise Solutions',
];

export default function Portfolio() {
  useDocumentMeta(
    'Portfolio & Demo Case Studies',
    'Illustrative AI architecture blueprints and demo case studies across industries.'
  );

  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState<'All Projects' | ProjectCategory>('All Projects');
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredItem, setHoveredItem] = useState<ProjectItem | null>(null);

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 24 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 24 });

  const handleListMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    cursorX.set(e.clientX + 24);
    cursorY.set(e.clientY - 70);
  };

  const filtered = PROJECTS.filter((proj) => {
    const matchesCat = category === 'All Projects' || proj.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      proj.title.toLowerCase().includes(q) ||
      proj.industry.toLowerCase().includes(q) ||
      proj.shortDescription.toLowerCase().includes(q) ||
      proj.techStack.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
        title="Turning Intelligent Ideas Into Real-World Solutions"
        subtitle="Demo case studies illustrating architecture, workflow design, and intended outcomes—without invented client names or unverified statistics."
        demoLabel="Demo case studies"
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          {/* Filter + Search + View Switcher Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
              {CATEGORIES.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#1769AA] text-white'
                        : 'bg-[#0A0A0A] text-[#9CA3AF] border border-white/10 hover-strong'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-64">
                <Search
                  className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <label htmlFor="portfolio-search" className="sr-only">
                  Search demo case studies
                </label>
                <input
                  id="portfolio-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, industry..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white placeholder:text-[#9CA3AF] focus:border-[#1769AA] focus:outline-none"
                />
              </div>

              <div
                className="inline-flex items-center p-1 rounded-xl bg-[#0A0A0A] border border-white/10"
                role="group"
                aria-label="Toggle layout view"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#1769AA] text-white' : 'text-[#9CA3AF] hover-strong'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  aria-label="Index list view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#1769AA] text-white' : 'text-[#9CA3AF] hover-strong'
                  }`}
                >
                  <List className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0A0A0A] border border-white/10 text-center space-y-3">
              <p className="text-base font-medium text-white">
                No demo case studies matched your search or filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All Projects');
                  setQuery('');
                }}
                className="text-sm font-semibold text-[#5BB4F5] hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24 }}
                    className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] hover:shadow-[0_16px_40px_-12px_rgba(18,59,96,0.14)] transition-all duration-300 flex flex-col"
                  >
                    <Link to={`/portfolio/${project.slug}`} data-cursor="View" className="block h-44 overflow-hidden">
                      <CoverArtwork variant={project.coverVariant} label={project.title} />
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-2.5">
                          <DemoTag label="Demo case study" />
                          <span aria-hidden="true">·</span>
                          <span>{project.industry}</span>
                        </div>
                        <h2 className="font-display text-lg font-bold text-white group-hover:text-[#5BB4F5] transition-colors">
                          <Link to={`/portfolio/${project.slug}`} data-cursor="View">
                            {project.title}
                          </Link>
                        </h2>
                        <p className="mt-2.5 text-sm text-[#9CA3AF] leading-relaxed">
                          {project.shortDescription}
                        </p>
                        <p className="mt-3 text-xs text-[#9CA3AF]">
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
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Hover Image-Reveal Index List */
            <div
              onMouseMove={handleListMouseMove}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative divide-y divide-white/10 border-y border-white/10 bg-[#0A0A0A] rounded-3xl px-6 sm:px-8"
            >
              {filtered.map((project, idx) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  data-cursor="View"
                  onMouseEnter={() => setHoveredItem(project)}
                  onFocus={() => setHoveredItem(project)}
                  onBlur={() => setHoveredItem(null)}
                  className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-xs text-[#9CA3AF] tabular-nums shrink-0 mt-1 sm:mt-0">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0 transition-transform duration-200 group-hover:translate-x-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-1">
                        <DemoTag label="Demo case study" />
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.industry}</span>
                      </div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#5BB4F5] transition-colors">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-200 shrink-0">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              ))}

              {/* Floating Cursor Cover Preview (Desktop only) */}
              {!reducedMotion && hoveredItem && (
                <motion.div
                  aria-hidden="true"
                  style={{ left: springX, top: springY }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="hidden lg:block fixed z-30 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/20 pointer-events-none"
                >
                  <CoverArtwork variant={hoveredItem.coverVariant} />
                </motion.div>
              )}
            </div>
          )}
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
