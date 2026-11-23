import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { useChatbot } from '../../context/ChatbotContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BASE_NODES = [
  { x: 110, y: 70 },
  { x: 260, y: 45 },
  { x: 430, y: 95 },
  { x: 640, y: 55 },
  { x: 820, y: 110 },
  { x: 170, y: 185 },
  { x: 370, y: 205 },
  { x: 560, y: 175 },
  { x: 760, y: 220 },
  { x: 910, y: 150 },
];

const NETWORK_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 5], [2, 6], [3, 7], [4, 8], [4, 9],
  [5, 6], [6, 7], [7, 8], [8, 9],
];

export function FinalCtaSection() {
  const { openChat } = useChatbot();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [pointerSvg, setPointerSvg] = useState<{ x: number; y: number } | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !sectionRef.current) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setPointerSvg({
      x: ((e.clientX - rect.left) / rect.width) * 1000,
      y: ((e.clientY - rect.top) / rect.height) * 280,
    });
  };

  const getAttractedNode = (node: { x: number; y: number }) => {
    if (!pointerSvg || reducedMotion) return node;
    const dx = pointerSvg.x - node.x;
    const dy = pointerSvg.y - node.y;
    const dist = Math.hypot(dx, dy);
    const radius = 260;
    if (dist > radius || dist === 0) return node;
    const strength = (1 - dist / radius) * 24;
    return {
      x: node.x + (dx / dist) * strength,
      y: node.y + (dy / dist) * strength,
    };
  };

  const displacedNodes = BASE_NODES.map(getAttractedNode);

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPointerSvg(null)}
      className="relative py-20 sm:py-28 gradient-dark-cinematic text-white overflow-hidden"
    >
      {/* Interactive Network SVG Backdrop */}
      <svg
        viewBox="0 0 1000 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        {NETWORK_EDGES.map(([a, b], idx) => {
          const n1 = displacedNodes[a];
          const n2 = displacedNodes[b];
          return (
            <line
              key={idx}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke={idx % 4 === 0 || ctaHovered ? '#F36B21' : '#EAF4FB'}
              strokeOpacity={ctaHovered ? 0.55 : 0.35}
              strokeWidth="1.2"
              style={{ transition: 'all 0.25s ease-out' }}
            />
          );
        })}
        {displacedNodes.map((node, idx) => (
          <motion.circle
            key={idx}
            cx={node.x}
            cy={node.y}
            r={idx % 3 === 0 ? 4.5 : 3}
            fill={idx % 3 === 0 || ctaHovered ? '#F36B21' : '#FFFFFF'}
            animate={
              reducedMotion || !inView
                ? undefined
                : { opacity: [0.45, 0.95, 0.45] }
            }
            transition={{
              duration: 4 + (idx % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.3,
            }}
          />
        ))}
      </svg>

      <Container className="relative z-10 text-center max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#F36B21] mb-4">
          <span className="font-mono">11 / </span>Start
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-white leading-[1.15]">
          Ready to Build Something Intelligent?
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#EAF4FB]/85 leading-relaxed max-w-2xl mx-auto">
          Let&apos;s turn your ideas into intelligent solutions. Connect with ALPHORAA AI INNOVATIONS and discover what&apos;s possible with next-generation AI.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <div
            className="relative"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            {ctaHovered && !reducedMotion && (
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="absolute inset-0 rounded-xl border-2 border-[#F36B21] pointer-events-none"
              />
            )}
            <Button to="/contact" variant="light" size="lg" withArrow magnetic>
              Start a Project
            </Button>
          </div>

          <button
            type="button"
            onClick={() => openChat()}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/25 hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#F36B21]" aria-hidden="true" />
            <span>Talk to Our AI Assistant</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
