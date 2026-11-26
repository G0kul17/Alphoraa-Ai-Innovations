import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { CoverArtwork } from '../common/CoverArtwork';
import { DemoTag } from '../common/DemoTag';
import { Stagger } from '../animations/Stagger';
import { EASE_SMOOTH, fadeUp } from '../../animations/variants';
import { BLOG_POSTS } from '../../data/posts';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function InsightsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="insights"
      chapterNumber="10"
      eyebrow="Insights"
      title="Explore the Future of AI."
      subtitle="General-knowledge engineering notes on Agentic AI, hybrid automation, machine learning retrieval, and human-centered interfaces."
      className="bg-black"
    >
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <motion.article
            key={post.id}
            variants={fadeUp}
            className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] hover:shadow-[0_16px_40px_-12px_rgba(18,59,96,0.14)] hover:border-[#1769AA]/35 transition-all duration-300 flex flex-col"
          >
            <Link
              to={`/insights/${post.slug}`}
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
                    variant={post.coverVariant}
                    label={`${post.title} illustration`}
                  />
                </div>
              </motion.div>
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

                <h3 className="font-display text-lg font-bold text-white group-hover:text-[#5BB4F5] transition-colors leading-snug">
                  <Link to={`/insights/${post.slug}`} data-cursor="View">
                    {post.title}
                  </Link>
                </h3>

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
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <span className="text-xs text-[#9CA3AF]">{post.readTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </Section>
  );
}
