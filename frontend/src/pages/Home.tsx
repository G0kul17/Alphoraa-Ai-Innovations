import { lazy, Suspense, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from '../components/home/HeroSection';
import { TechnologyStrip } from '../components/home/TechnologyStrip';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { ProductsSection } from '../components/home/ProductsSection';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { TechEcosystemSection } from '../components/home/TechEcosystemSection';
import { HowWeWorkSection } from '../components/home/HowWeWorkSection';
import { InsightsSection } from '../components/home/InsightsSection';
import { TestimonialsAndFaqSection } from '../components/home/TestimonialsAndFaqSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ScrollProgress } from '../components/motion/ScrollProgress';

// Three.js is heavy: load the story scene on its own chunk.
const Story3DScrollytelling = lazy(() =>
  import('../components/3d/Story3DScrollytelling').then((m) => ({ default: m.Story3DScrollytelling }))
);

/** Re-measure ScrollTrigger positions once the lazy section has mounted. */
function RefreshOnMount() {
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}

export default function Home() {
  useDocumentMeta(
    'ALPHORAA AI INNOVATIONS | Building the Future with Agentic AI',
    'Transforming businesses through intelligent AI systems, autonomous agents and next-generation automation.'
  );

  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <TechnologyStrip />
      <AboutSection />
      <ServicesSection />
      <Suspense fallback={<div aria-hidden="true" className="min-h-screen bg-black" />}>
        <Story3DScrollytelling />
        <RefreshOnMount />
      </Suspense>
      <IndustriesSection />
      <ProductsSection />
      <PortfolioSection />
      <WhyChooseSection />
      <TechEcosystemSection />
      <HowWeWorkSection />
      <InsightsSection />
      <TestimonialsAndFaqSection />
      <FinalCtaSection />
    </>
  );
}
