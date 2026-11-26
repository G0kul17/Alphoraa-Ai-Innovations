import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

export const HOME_CHAPTERS = [
  { id: 'hero', label: 'Home' },
  { id: 'intelligence', label: '01 Intelligence' },
  { id: 'about', label: '02 About' },
  { id: 'services', label: '03 Services' },
  { id: 'industries', label: '04 Industries' },
  { id: 'products', label: '05 Products' },
  { id: 'portfolio', label: '06 Work' },
  { id: 'why-alphoraa', label: '07 Why ALPHORAA' },
  { id: 'technology-ecosystem', label: '08 Technology' },
  { id: 'how-we-work', label: '09 Process' },
  { id: 'insights', label: '10 Insights' },
];

/**
 * Thin scroll-progress bar plus a desktop chapter rail (dots).
 * The rail is keyboard accessible; clicking a dot scrolls to that section.
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const elements = HOME_CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    // A section is "active" while it crosses the vertical middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[45] origin-left bg-gradient-to-r from-[#1769AA] to-[#F36B21] pointer-events-none"
        style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      />

      <nav
        aria-label="Page chapters"
        className="hidden 2xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
      >
        {HOME_CHAPTERS.map((chapter) => {
          const isActive = active === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollTo(`#${chapter.id}`, { offset: chapter.id === 'hero' ? 0 : -72 })}
              aria-label={`Go to ${chapter.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex items-center justify-end cursor-pointer"
            >
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-[#0A0A0A]/95 border border-white/10 px-2 py-1 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
                {chapter.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive ? 'h-2.5 w-2.5 bg-[#F36B21]' : 'h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
