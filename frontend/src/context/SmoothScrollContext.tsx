import React, { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
  setLocked: (locked: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  setLocked: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window && window.innerWidth < 1024);

    if (reducedMotion || isTouch) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Stop/start Lenis when modals/drawers are open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [locked]);

  // Reset scroll to top on route change and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
      const offset = options?.offset ?? -80;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset,
          immediate: options?.immediate ?? false,
        });
      } else {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
        } else {
          const el =
            typeof target === 'string' ? document.querySelector(target) : target;
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' });
          }
        }
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, setLocked }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
