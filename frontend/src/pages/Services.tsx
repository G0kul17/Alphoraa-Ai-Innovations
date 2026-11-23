import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { IconRenderer } from '../components/common/IconRenderer';
import { Reveal } from '../components/animations/Reveal';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { SERVICES } from '../data/services';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Services() {
  useDocumentMeta(
    'AI & Software Engineering Services',
    'Explore Agentic AI development, Machine Learning solutions, workflow automation, custom software, and enterprise AI architecture.'
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title="Intelligent Engineering Services"
        subtitle="Practical AI systems, autonomous agent architectures, and custom software built around clear business workflows."
      />

      {/* Alternating Service Rows */}
      <section className="py-16 sm:py-20 bg-black">
        <Container className="space-y-10">
          {SERVICES.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <Reveal key={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)]">
                  {/* Visual / Overview Block */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="p-7 rounded-2xl keep-dark bg-gradient-to-br from-[#161616] to-[#0B0B0B] border border-white/10 text-white space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                          <IconRenderer name={service.icon} className="w-6 h-6 text-[#F36B21]" />
                        </span>
                        <span className="font-mono text-xs text-[#EAF4FB]/70 tabular-nums">
                          0{idx + 1} / 0{SERVICES.length}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-white">
                        {service.title}
                      </h2>
                      <p className="text-sm text-[#EAF4FB]/85 leading-relaxed">
                        {service.tagline}
                      </p>
                      <div className="pt-2 border-t border-white/15">
                        <p className="text-[11px] uppercase tracking-wider text-[#EAF4FB]/70 mb-2">
                          Typical Use Cases
                        </p>
                        <ul className="space-y-1.5">
                          {service.useCases.slice(0, 3).map((uc) => (
                            <li key={uc} className="text-xs text-[#EAF4FB] flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F36B21] shrink-0" aria-hidden="true" />
                              <span>{uc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Description & Capabilities */}
                  <div
                    className={`lg:col-span-7 space-y-5 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <p className="text-base text-[#9CA3AF] leading-relaxed">
                      {service.overview}
                    </p>

                    <div>
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#EAF4FB] mb-3">
                        Core Capabilities
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2.5 text-sm text-white"
                          >
                            <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Button to={`/services/${service.slug}`} withArrow>
                        View Service Details
                      </Button>
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.slug)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5BB4F5] hover:text-[#F36B21] transition-colors"
                      >
                        <span>Discuss this service</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      {/* How We Work Mini-Strip */}
      <section className="py-14 bg-[#0A0A0A] border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5]">
                Delivery Framework
              </p>
              <h2 className="font-display text-2xl font-bold text-white mt-1">
                How We Work
              </h2>
            </div>
            <Button to="/contact" variant="secondary" size="sm" withArrow>
              Start Discovery
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {['01. Discover', '02. Strategize', '03. Design', '04. Develop', '05. Deploy & Optimize'].map(
              (step) => (
                <div
                  key={step}
                  className="p-4 rounded-2xl bg-black border border-white/10 text-sm font-display font-semibold text-[#EAF4FB]"
                >
                  {step}
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
