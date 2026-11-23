import { motion } from 'motion/react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function NotFound() {
  useDocumentMeta('Page Not Found (404)', 'The requested page could not be found.');
  const reducedMotion = useReducedMotion();

  return (
    <section className="min-h-[75vh] pt-32 pb-20 flex items-center bg-gradient-to-b from-black to-[#141414]">
      <Container className="text-center max-w-2xl space-y-6">
        <div className="mx-auto w-56 h-32">
          <svg viewBox="0 0 240 120" fill="none" className="w-full h-full" aria-hidden="true">
            <path d="M35 85 L95 35 L155 75 L205 30" stroke="#1769AA" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="5 5" />
            {[
              { x: 35, y: 85 },
              { x: 95, y: 35 },
              { x: 155, y: 75 },
              { x: 205, y: 30 },
            ].map((pt, idx) => (
              <motion.circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={idx === 2 ? 8 : 5}
                fill={idx === 2 ? '#F36B21' : '#1769AA'}
                animate={reducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.3 }}
              />
            ))}
          </svg>
        </div>

        <p className="font-mono text-sm font-semibold text-[#F36B21]">404 — Route Not Found</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          This Node Doesn&apos;t Exist Yet
        </h1>
        <p className="text-base text-[#9CA3AF] leading-relaxed">
          The page you requested may have moved or the URL may be mistyped. Return to our core sections below.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" withArrow>
            Go Home
          </Button>
          <Button to="/services" variant="secondary">
            Explore Services
          </Button>
          <Button to="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
