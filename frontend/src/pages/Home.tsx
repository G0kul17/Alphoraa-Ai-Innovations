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
import { Story3DScrollytelling } from '../components/3d/Story3DScrollytelling';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta(
    'ALPHORAA AI INNOVATIONS | Building the Future with Agentic AI',
    'Transforming businesses through intelligent AI systems, autonomous agents and next-generation automation.'
  );

  return (
    <>
      <HeroSection />
      <TechnologyStrip />
      <AboutSection />
      <ServicesSection />
      <Story3DScrollytelling />
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
