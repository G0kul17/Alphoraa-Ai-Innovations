import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Container } from '../common/Container';
import { IconRenderer } from '../common/IconRenderer';
import { INDUSTRIES } from '../../data/industries';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Industry3DCardProps {
  industry: (typeof INDUSTRIES)[number];
  idx: number;
  activeIndex: number;
  onSelect: (idx: number) => void;
  reducedMotion: boolean;
}

function Industry3DCard({
  industry,
  idx,
  activeIndex,
  onSelect,
  reducedMotion,
}: Industry3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const offset = idx - activeIndex;
  const isActive = offset === 0;
  const isNeighbor = Math.abs(offset) === 1;

  // Coverflow 3D spatial perspective angles
  let baseRotateY = 0;
  let baseScale = 1;
  let baseTranslateZ = 0;
  let baseOpacity = 1;

  if (isActive) {
    baseRotateY = 0;
    baseScale = 1.04;
    baseTranslateZ = 35;
    baseOpacity = 1;
  } else if (isNeighbor) {
    baseRotateY = offset < 0 ? 14 : -14;
    baseScale = 0.95;
    baseTranslateZ = 0;
    baseOpacity = 0.82;
  } else {
    baseRotateY = offset < 0 ? 22 : -22;
    baseScale = 0.88;
    baseTranslateZ = -40;
    baseOpacity = 0.48;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setMouseTilt({ rotateX, rotateY, isHovered: true });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0, isHovered: false });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const effectiveRotateY = baseRotateY + (mouseTilt.isHovered ? mouseTilt.rotateY : 0);
  const effectiveRotateX = mouseTilt.isHovered ? mouseTilt.rotateX : 0;
  const effectiveScale = mouseTilt.isHovered ? baseScale * 1.02 : baseScale;
  const effectiveTranslateZ = baseTranslateZ + (mouseTilt.isHovered ? 15 : 0);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!isActive) onSelect(idx);
      }}
      style={{
        transform: reducedMotion
          ? undefined
          : `perspective(1400px) rotateX(${effectiveRotateX.toFixed(2)}deg) rotateY(${effectiveRotateY.toFixed(2)}deg) translateZ(${effectiveTranslateZ}px) scale(${effectiveScale.toFixed(3)})`,
        opacity: baseOpacity,
        transformStyle: 'preserve-3d',
        transition: mouseTilt.isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
          : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease-out, box-shadow 0.4s ease-out',
        zIndex: isActive ? 30 : isNeighbor ? 20 : 10,
      }}
      className={`relative w-[380px] sm:w-[420px] lg:w-[450px] shrink-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-b from-[#141414]/95 via-[#0A0A0A]/95 to-[#050505]/98 border-2 border-[#F36B21] shadow-[0_28px_70px_-15px_rgba(243,107,33,0.38),0_0_35px_rgba(23,105,170,0.22)]'
          : isNeighbor
          ? 'bg-[#141414]/85 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-[0_14px_35px_-8px_rgba(0,0,0,0.6)]'
          : 'bg-[#141414]/60 backdrop-blur-sm border border-white/10 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.7)]'
      }`}
    >
      {/* 1. Active scanning laser bar on top edge */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F36B21] to-transparent animate-pulse" />
      )}

      {/* 2. Cyber Reticle corner markers */}
      <span className="absolute top-3 left-3 text-[10px] font-mono text-white/25 select-none" aria-hidden="true">+</span>
      <span className="absolute top-3 right-3 text-[10px] font-mono text-white/25 select-none" aria-hidden="true">+</span>
      <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/25 select-none" aria-hidden="true">+</span>
      <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/25 select-none" aria-hidden="true">+</span>

      {/* 3. Watermark Sector Number in background */}
      <span
        className="font-mono text-7xl font-black text-white/[0.04] select-none absolute top-4 right-6 pointer-events-none"
        aria-hidden="true"
      >
        0{idx + 1}
      </span>

      {/* 4. Top Header & Sector Status Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
              isActive
                ? 'bg-[#F36B21]/20 text-[#F36B21] border border-[#F36B21]/40'
                : 'bg-white/5 text-[#EAF4FB]/60 border border-white/10'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? 'bg-[#F36B21] animate-ping' : 'bg-white/40'
              }`}
            />
            {isActive ? `Live Blueprint · 0${idx + 1}` : `Sector 0${idx + 1}`}
          </span>

          <span className="font-mono text-xs font-semibold text-[#5BB4F5] tabular-nums">
            0{idx + 1} / 0{INDUSTRIES.length}
          </span>
        </div>

        {/* Sector Icon and Title */}
        <div className="flex items-start gap-3.5 mb-5 pb-4 border-b border-white/10">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-br from-[#1769AA] to-[#F36B21] text-white shadow-[0_0_20px_rgba(243,107,33,0.5)] scale-105'
                : 'bg-[#1769AA]/30 text-white/90 border border-white/10'
            }`}
          >
            <IconRenderer name={industry.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
              {industry.name}
            </h3>
            <p className="text-xs text-[#EAF4FB]/70 mt-0.5 line-clamp-1">
              {industry.tagline || 'Sector capability profile'}
            </p>
          </div>
        </div>

        {/* Content Boxes: Challenges vs Potential AI Applications */}
        <div className="space-y-3.5">
          {/* Box 1: Business Challenges */}
          <div className="bg-black/35 rounded-2xl border border-white/10 p-3.5 backdrop-blur-sm">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#EAF4FB]/70 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#F36B21]" />
              <span>Business Challenges</span>
            </p>
            <ul className="space-y-1.5">
              {industry.challenges.map((ch) => (
                <li key={ch} className="text-xs text-[#EAF4FB]/85 flex items-start gap-2 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 shrink-0" aria-hidden="true" />
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2: Potential AI Applications */}
          <div
            className={`rounded-2xl p-3.5 backdrop-blur-sm transition-colors ${
              isActive
                ? 'bg-gradient-to-br from-[#1769AA]/20 via-[#F36B21]/15 to-transparent border border-[#F36B21]/35 shadow-inner'
                : 'bg-white/[0.03] border border-white/10'
            }`}
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#F36B21] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F36B21]" />
              <span>Potential AI Applications</span>
            </p>
            <ul className="space-y-1.5">
              {industry.potentialApplications.map((app) => (
                <li key={app} className="text-xs text-[#EAF4FB]/90 flex items-start gap-2 leading-relaxed font-medium">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F36B21] shadow-[0_0_6px_#F36B21] shrink-0" aria-hidden="true" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Footer Action: Explore Solutions CTA */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <Link
          to={`/solutions/${industry.slug}`}
          data-cursor="Open"
          onClick={(e) => e.stopPropagation()}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#F36B21] text-xs font-semibold text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_4px_16px_rgba(243,107,33,0.4)]"
        >
          <span>Explore Solutions</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <span className="text-[11px] font-mono text-[#EAF4FB]/50">
          Agent Ready
        </span>
      </div>

      {/* 6. Dynamic Specular Holographic Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 75%)`,
        }}
        aria-hidden="true"
      />
    </article>
  );
}

export function IndustriesSection() {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  const pinTriggerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia?.('(pointer: coarse)').matches;
      setIsDesktop(window.innerWidth >= 1024 && !coarse);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop GSAP ScrollTrigger pinned horizontal scroll
  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const triggerEl = pinTriggerRef.current;
    const trackEl = horizontalTrackRef.current;
    if (!triggerEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(trackEl, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const prog = self.progress;
            setProgressPct(prog * 100);
            const rawIdx = prog * (INDUSTRIES.length - 1);
            setActiveIndex(Math.min(INDUSTRIES.length - 1, Math.max(0, Math.round(rawIdx))));
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, pinTriggerRef);

    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  // Programmatic scroll helper for both desktop and mobile
  const scrollToIndustry = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(INDUSTRIES.length - 1, targetIndex));
      setActiveIndex(clamped);

      if (isDesktop && scrollTriggerRef.current) {
        const st = scrollTriggerRef.current;
        const total = st.end - st.start;
        const targetScroll = st.start + (clamped / (INDUSTRIES.length - 1)) * total + 2;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      } else if (mobileTrackRef.current) {
        const card = mobileTrackRef.current.children[clamped] as HTMLElement | undefined;
        if (card) {
          mobileTrackRef.current.scrollTo({
            left: card.offsetLeft - 16,
            behavior: 'smooth',
          });
        }
      }
    },
    [isDesktop]
  );

  // Mobile slider scroll sync
  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const scrollLeft = container.scrollLeft;
    let closest = 0;
    let minDiff = Infinity;
    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const diff = Math.abs(el.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    });
    setActiveIndex(closest);
    setProgressPct((closest / (INDUSTRIES.length - 1)) * 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndustry(activeIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndustry(activeIndex - 1);
    }
  };

  return (
    <section
      id="industries"
      className="relative gradient-dark-cinematic text-white overflow-hidden py-10 lg:py-0"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Industries section with interactive 3D carousel"
    >
      {/* Background ambient decorative glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#1769AA]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#F36B21]/15 blur-3xl" />
      </div>

      {/* Desktop Pinned Horizontal 3D Coverflow Stage */}
      {isDesktop && !reducedMotion ? (
        <div ref={pinTriggerRef} className="min-h-screen flex flex-col justify-center py-16">
          <Container className="mb-6">
            {/* Header: Title, Subtitle, Counter, Navigation Arrows & Segmented Track */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F36B21] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F36B21] animate-pulse" />
                  <span className="font-mono">04 / </span>Industries Ecosystem
                </p>
                <h2 className="font-display text-3xl lg:text-[2.6rem] font-bold tracking-tight text-white leading-[1.14]">
                  AI Solutions Across Industries.
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#EAF4FB]/80 leading-relaxed">
                  Exploratory sector challenges and potential AI applications—engineered for measurable enterprise impact.
                </p>
              </div>

              {/* Controls Column: Large Monospace Counter, Arrows, & Segmented Progress */}
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="flex items-center gap-4">
                  {/* Left / Right Interactive Glass Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => scrollToIndustry(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      aria-label="Previous industry"
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F36B21] border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:hover:bg-white/10 cursor-pointer transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToIndustry(activeIndex + 1)}
                      disabled={activeIndex === INDUSTRIES.length - 1}
                      aria-label="Next industry"
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F36B21] border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:hover:bg-white/10 cursor-pointer transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  <span className="font-display text-3xl font-black tabular-nums text-white">
                    0{activeIndex + 1}
                    <span className="text-[#EAF4FB]/35 text-xl font-normal"> / 0{INDUSTRIES.length}</span>
                  </span>
                </div>

                {/* 8-Segment Interactive Clickable Progress Bar */}
                <div className="flex items-center gap-1.5 w-48 pt-1" aria-label="Carousel progress">
                  {INDUSTRIES.map((ind, i) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => scrollToIndustry(i)}
                      title={`Jump to ${ind.name}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex
                          ? 'w-10 bg-[#F36B21] shadow-[0_0_10px_#F36B21]'
                          : i < activeIndex
                          ? 'w-4 bg-[#1769AA]'
                          : 'w-4 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Sector Category Navigation Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 no-scrollbar border-t border-white/10">
              {INDUSTRIES.map((ind, i) => {
                const isSelected = i === activeIndex;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => scrollToIndustry(i)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F36B21] text-white shadow-[0_4px_18px_rgba(243,107,33,0.45)] scale-105 border border-[#F36B21]'
                        : 'bg-white/10 text-[#EAF4FB]/75 hover:bg-white/20 hover:text-white border border-white/10'
                    }`}
                  >
                    <IconRenderer name={ind.icon} className="w-3.5 h-3.5" />
                    <span>{ind.name}</span>
                  </button>
                );
              })}
            </div>
          </Container>

          {/* 3D Coverflow Horizontal Track Viewport */}
          <div className="pl-8 xl:pl-[calc((100vw-1280px)/2+2rem)] overflow-visible">
            <div
              ref={horizontalTrackRef}
              data-cursor="Drag"
              className="flex gap-7 w-max pr-24 py-8 items-center"
              style={{
                perspective: '1600px',
                transformStyle: 'preserve-3d',
              }}
            >
              {INDUSTRIES.map((industry, idx) => (
                <Industry3DCard
                  key={industry.id}
                  industry={industry}
                  idx={idx}
                  activeIndex={activeIndex}
                  onSelect={scrollToIndustry}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Mobile / Tablet / Touch & Reduced Motion Slider */
        <div className="py-16 sm:py-24">
          <Container>
            <div className="max-w-2xl mb-6">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F36B21] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F36B21] animate-pulse" />
                <span className="font-mono">04 / </span>Industries Ecosystem
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-[1.18]">
                AI Solutions Across Industries.
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#EAF4FB]/80 leading-relaxed">
                Exploratory sector challenges and potential AI applications—engineered for measurable enterprise impact.
              </p>
            </div>

            {/* Quick Sector Nav Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              {INDUSTRIES.map((ind, i) => {
                const isSelected = i === activeIndex;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => scrollToIndustry(i)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F36B21] text-white shadow-md'
                        : 'bg-white/10 text-white/80 border border-white/10'
                    }`}
                  >
                    <IconRenderer name={ind.icon} className="w-3.5 h-3.5" />
                    <span>{ind.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Counter and Navigation Controls */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-sm font-mono font-bold tabular-nums text-white">
                0{activeIndex + 1} / 0{INDUSTRIES.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToIndustry(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous industry"
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndustry(activeIndex + 1)}
                  disabled={activeIndex === INDUSTRIES.length - 1}
                  aria-label="Next industry"
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Mobile Horizontal Snap-Track */}
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              tabIndex={0}
              role="region"
              aria-label="Industries slider"
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar"
            >
              {INDUSTRIES.map((industry, idx) => (
                <div key={industry.id} className="snap-start shrink-0">
                  <Industry3DCard
                    industry={industry}
                    idx={idx}
                    activeIndex={activeIndex}
                    onSelect={scrollToIndustry}
                    reducedMotion={true}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
