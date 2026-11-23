import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { IconRenderer } from '../components/common/IconRenderer';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { INDUSTRIES } from '../data/industries';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Solutions() {
  useDocumentMeta(
    'Industry AI Solutions',
    'Explore potential AI applications and operational workflow solutions across 8 key industries.'
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]}
        title="AI Solutions Across Industries"
        subtitle="Sector-specific operational challenges and potential AI applications—presented as exploratory capabilities rather than claimed results."
      />

      <section className="py-16 sm:py-20 bg-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((industry) => (
              <article
                key={industry.id}
                className="group p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] hover:border-[#1769AA]/40 hover:shadow-[0_16px_40px_-12px_rgba(18,59,96,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <IconRenderer name={industry.icon} className="w-5 h-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-white">
                        {industry.name}
                      </h2>
                      <p className="text-xs text-[#9CA3AF]">Potential AI applications</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">
                    {industry.overview}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
                        Challenges
                      </p>
                      <ul className="space-y-1.5">
                        {industry.challenges.slice(0, 2).map((ch) => (
                          <li key={ch} className="text-xs text-white leading-snug">
                            • {ch}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5] mb-2">
                        Potential AI Uses
                      </p>
                      <ul className="space-y-1.5">
                        {industry.potentialApplications.slice(0, 2).map((app) => (
                          <li key={app} className="text-xs text-[#9CA3AF] leading-snug">
                            • {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    to={`/solutions/${industry.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BB4F5] group-hover:text-[#F36B21] transition-colors"
                  >
                    <span>Explore {industry.name} Solutions</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
