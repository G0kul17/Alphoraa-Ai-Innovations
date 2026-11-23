import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, LayoutGrid, List } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { CoverArtwork } from '../components/common/CoverArtwork';
import { DemoTag } from '../components/common/DemoTag';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { BLOG_POSTS } from '../data/posts';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { BlogPost } from '../types';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const CATEGORIES = [
  'All',
  'Agentic AI',
  'Business Automation',
  'AI Trends',
  'Machine Learning',
  'Technology Innovations',
  'Industry Applications',
];

export default function Insights() {
  useDocumentMeta(
    'Insights & Articles',
    'General-knowledge engineering articles on Agentic AI, automation, machine learning, and human-AI interface design.'
  );

  const reducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredPost, setHoveredPost] = useState<BlogPost | null>(null);

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 24 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 24 });

  const handleListMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    cursorX.set(e.clientX + 24);
    cursorY.set(e.clientY - 70);
  };

  const filtered =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]}
        title="Explore the Future of AI"
        subtitle="General-knowledge demo articles exploring practical AI engineering, hybrid automation, and enterprise system design."
        demoLabel="Demo articles"
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by topic">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
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

            <div
              className="inline-flex items-center p-1 rounded-xl bg-[#0A0A0A] border border-white/10 self-start lg:self-auto"
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

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] hover:shadow-[0_16px_40px_-12px_rgba(18,59,96,0.14)] transition-all duration-300 flex flex-col"
                >
                  <Link to={`/insights/${post.slug}`} data-cursor="View" className="block h-44 overflow-hidden">
                    <CoverArtwork variant={post.coverVariant} label={post.title} />
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9CA3AF] mb-2.5">
                        <span className="font-semibold text-[#5BB4F5]">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <DemoTag label="Demo article" />
                      </div>
                      <h2 className="font-display text-lg font-bold text-white group-hover:text-[#5BB4F5] transition-colors">
                        <Link to={`/insights/${post.slug}`} data-cursor="View">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-2.5 text-sm text-[#9CA3AF] leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <Link
                        to={`/insights/${post.slug}`}
                        data-cursor="View"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] group-hover:text-[#F36B21] transition-colors"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <span className="text-xs text-[#9CA3AF]">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Hover Image-Reveal Index List */
            <div
              onMouseMove={handleListMouseMove}
              onMouseLeave={() => setHoveredPost(null)}
              className="relative divide-y divide-white/10 border-y border-white/10 bg-[#0A0A0A] rounded-3xl px-6 sm:px-8"
            >
              {filtered.map((post, idx) => (
                <Link
                  key={post.id}
                  to={`/insights/${post.slug}`}
                  data-cursor="View"
                  onMouseEnter={() => setHoveredPost(post)}
                  onFocus={() => setHoveredPost(post)}
                  onBlur={() => setHoveredPost(null)}
                  className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-xs text-[#9CA3AF] tabular-nums shrink-0 mt-1 sm:mt-0">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0 transition-transform duration-200 group-hover:translate-x-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-1">
                        <span className="font-semibold text-[#5BB4F5]">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <DemoTag label="Demo article" />
                      </div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#5BB4F5] transition-colors">
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-200 shrink-0">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              ))}

              {!reducedMotion && hoveredPost && (
                <motion.div
                  aria-hidden="true"
                  style={{ left: springX, top: springY }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="hidden lg:block fixed z-30 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/20 pointer-events-none"
                >
                  <CoverArtwork variant={hoveredPost.coverVariant} />
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
