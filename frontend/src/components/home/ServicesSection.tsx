import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { IconRenderer } from '../common/IconRenderer';
import { Card3DTilt } from '../3d/Card3DTilt';
import { SERVICES } from '../../data/services';
import { fadeUp } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ServicesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="services"
      chapterNumber="03"
      eyebrow="Services"
      title="Intelligent Services. Measurable Impact."
      subtitle="Modular engineering capabilities spanning autonomous agents, custom machine learning, resilient automation, and modern web software."
      className="bg-[#0A0A0A]"
    >
      {/* Desktop: Sticky Stacking Cards Sequence | Mobile: Normal Vertical List */}
      <div className="space-y-6 lg:space-y-8">
        {SERVICES.map((service, index) => {
          const numStr = `0${index + 1}`;
          // Smooth staggered sticky top offsets so stacked cards layer cleanly on both mobile and desktop
          const stickyTopStyle = `clamp(72px, calc(70px + ${(index % 4) * 12}px), 136px)`;

          return (
            <motion.div
              key={service.id}
              variants={fadeUp}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              style={reducedMotion ? undefined : { top: stickyTopStyle }}
              className="sticky"
            >
              <Card3DTilt maxTilt={5} className="rounded-3xl">
                <Link
                  to={`/services/${service.slug}`}
                  data-cursor="Open"
                  className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:p-10 rounded-3xl bg-black border border-white/10 shadow-[0_12px_32px_-12px_rgba(18,59,96,0.1)] hover:bg-[#141414] hover:border-[#1769AA]/45 transition-all duration-300"
                >
                  {/* Left: Large Outlined Number + Icon */}
                  <div className="lg:col-span-4 flex items-center gap-6">
                    <span
                      className="font-display text-5xl sm:text-6xl font-bold leading-none tabular-nums outlined-digit select-none"
                      aria-hidden="true"
                    >
                      {numStr}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 text-[#5BB4F5] flex items-center justify-center shadow-xs transition-all duration-300 group-hover:bg-[#1769AA] group-hover:text-white group-hover:scale-105">
                      <IconRenderer name={service.icon} className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Middle: Title + Description + Capabilities */}
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#EAF4FB] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#EAF4FB]/80">
                      {service.capabilities.slice(0, 2).map((cap) => (
                        <span key={cap} className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F36B21]" aria-hidden="true" />
                          <span>{cap}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA Arrow */}
                  <div className="lg:col-span-2 flex lg:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] group-hover:text-[#F36B21] transition-colors whitespace-nowrap">
                      <span>Explore Service</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Card3DTilt>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
