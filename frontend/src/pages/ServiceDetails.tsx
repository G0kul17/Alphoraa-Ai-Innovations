import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { DemoTag } from '../components/common/DemoTag';
import { IconRenderer } from '../components/common/IconRenderer';
import { getServiceBySlug, SERVICES } from '../data/services';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFound from './NotFound';

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useDocumentMeta(
    service ? service.title : 'Service Not Found',
    service ? service.tagline : 'Requested service was not found.'
  );

  if (!service) {
    return <NotFound />;
  }

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
        title={service.title}
        subtitle={service.tagline}
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                    <IconRenderer name={service.icon} className="w-5 h-5" />
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Service Overview
                  </h2>
                </div>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  {service.overview}
                </p>
              </div>

              {/* What We Build */}
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-5">
                  What We Build
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.whatWeBuild.map((item) => (
                    <div
                      key={item.title}
                      className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-2"
                    >
                      <h3 className="font-display text-base font-bold text-[#EAF4FB]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Use Cases */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                  Typical Use Cases
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.useCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-2.5 text-sm text-white">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Steps */}
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-5">
                  Implementation Approach
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-1.5"
                    >
                      <span className="text-xs font-mono font-semibold text-[#F36B21]">
                        Step 0{idx + 1}
                      </span>
                      <h3 className="font-display text-base font-bold text-white">
                        {step.step}
                      </h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposed Technologies */}
              <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-white">
                    Proposed Technologies
                  </h2>
                  <DemoTag label="Proposed stack, pending confirmation" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {service.proposedTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs font-medium text-[#EAF4FB]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service-specific FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">
                    Service Questions
                  </h2>
                  <div className="divide-y divide-white/10 border-y border-white/10 bg-[#0A0A0A] rounded-2xl px-6">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div key={faq.question}>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                          >
                            <span className="font-display text-sm sm:text-base font-semibold text-white">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform ${
                                isOpen ? 'rotate-180 text-[#5BB4F5]' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          {isOpen && (
                            <p className="pb-4 text-sm text-[#9CA3AF] leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Side CTA */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="p-7 rounded-3xl keep-dark bg-[#0B0B0B] border border-white/10 text-white shadow-[0_20px_40px_-14px_rgba(18,59,96,0.28)] space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F36B21]">
                  Project Scoping
                </p>
                <h2 className="font-display text-2xl font-bold">
                  Discuss {service.shortTitle}
                </h2>
                <p className="text-sm text-[#EAF4FB]/85 leading-relaxed">
                  Share your operational requirements and explore how {service.title} can fit into your workflow.
                </p>
                <Button
                  to={`/contact?service=${encodeURIComponent(service.slug)}`}
                  variant="light"
                  withArrow
                  className="w-full"
                >
                  Discuss this service
                </Button>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <h3 className="font-display text-base font-bold text-white">
                  Related Services
                </h3>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/services/${rel.slug}`}
                      className="group flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <span className="text-sm font-medium text-white group-hover:text-[#5BB4F5]">
                        {rel.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#5BB4F5] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
