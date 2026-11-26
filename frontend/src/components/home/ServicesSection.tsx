import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../common/Section';
import { IconRenderer } from '../common/IconRenderer';
import { Card3DTilt } from '../3d/Card3DTilt';
import { SERVICES } from '../../data/services';
import { fadeUp } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Services: pinned, scroll-driven horizontal showcase on desktop (GSAP owns it).
 * Below 1024px or with reduced motion, a plain vertical list is shown instead.
 * Both layouts stay in the DOM and CSS toggles them, so React never fights
 * with the DOM nodes ScrollTrigger wraps when it pins.
 */
export function ServicesSection() {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const idx = Math.min(
                SERVICES.length,
                Math.max(1, Math.round(self.progress * (SERVICES.length - 1)) + 1)
              );
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Section
        id="services"
        chapterNumber="03"
        eyebrow="Services"
        title="Intelligent Services. Measurable Impact."
        subtitle="Modular engineering capabilities spanning autonomous agents, custom machine learning, resilient automation, and modern web software."
        className="bg-[#0A0A0A] pb-0!"
      >
        {/* Vertical list: mobile, tablet and reduced motion */}
        <div className="space-y-6 pb-16 sm:pb-24 lg:hidden motion-reduce:block">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Card3DTilt maxTilt={5} className="rounded-3xl">
                <Link
                  to={`/services/${service.slug}`}
                  data-cursor="Open"
                  className="group relative grid grid-cols-1 gap-5 p-6 sm:p-8 rounded-3xl bg-black border border-white/10 hover:bg-[#141414] hover:border-[#1769AA]/45 transition-colors duration-300"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="font-display text-5xl font-bold leading-none tabular-nums outlined-digit select-none"
                      aria-hidden="true"
                    >
                      {`0${index + 1}`}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 text-[#5BB4F5] flex items-center justify-center">
                      <IconRenderer name={service.icon} className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] group-hover:text-[#F36B21] transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Pinned horizontal showcase: desktop with motion allowed */}
      <div
        ref={stageRef}
        className="hidden lg:flex motion-reduce:hidden relative h-screen items-center overflow-hidden bg-[#0A0A0A] pt-20"
      >
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 pl-[max(2rem,calc((100vw-1280px)/2+2rem))] pr-[20vw] will-change-transform"
        >
          {SERVICES.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              data-cursor="Open"
              className="group relative flex w-[min(520px,42vw)] shrink-0 flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-black p-9 transition-colors duration-300 hover:border-[#1769AA]/60 hover:bg-[#141414]"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-display text-7xl font-bold leading-none tabular-nums outlined-digit select-none"
                  aria-hidden="true"
                >
                  {`0${index + 1}`}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] text-[#5BB4F5] transition-colors duration-300 group-hover:bg-[#1769AA] group-hover:text-white">
                  <IconRenderer name={service.icon} className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-base leading-relaxed text-[#9CA3AF]">{service.shortDescription}</p>
                <div className="flex flex-col gap-1.5 pt-1 text-xs text-[#EAF4FB]/80">
                  {service.capabilities.slice(0, 2).map((cap) => (
                    <span key={cap} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F36B21]" aria-hidden="true" />
                      <span>{cap}</span>
                    </span>
                  ))}
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] transition-colors group-hover:text-[#F36B21]">
                <span>Explore Service</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Progress + counter */}
        <div className="absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-[1280px] items-center gap-4 px-8">
          <span className="font-mono text-xs text-[#EAF4FB]">
            <span ref={counterRef}>01</span>
            <span className="text-white/40"> / {String(SERVICES.length).padStart(2, '0')}</span>
          </span>
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-[#1769AA] to-[#F36B21]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
