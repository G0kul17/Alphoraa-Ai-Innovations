import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { IconRenderer } from '../components/common/IconRenderer';
import { getIndustryBySlug } from '../data/industries';
import { getServiceBySlug } from '../data/services';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFound from './NotFound';

export default function SolutionDetails() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  useDocumentMeta(
    industry ? `${industry.name} AI Solutions` : 'Solution Not Found',
    industry ? industry.tagline : 'Requested industry solution was not found.'
  );

  if (!industry) {
    return <NotFound />;
  }

  const recommended = industry.recommendedServices
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Solutions', to: '/solutions' },
          { label: industry.name },
        ]}
        title={`AI Solutions for ${industry.name}`}
        subtitle={industry.tagline}
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                    <IconRenderer name={industry.icon} className="w-5 h-5" />
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Sector Overview
                  </h2>
                </div>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  {industry.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                  <h2 className="font-display text-lg font-bold text-white">
                    Common Business Challenges
                  </h2>
                  <ul className="space-y-3">
                    {industry.challenges.map((ch) => (
                      <li key={ch} className="text-sm text-[#9CA3AF] flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                  <h2 className="font-display text-lg font-bold text-[#5BB4F5]">
                    Potential AI Applications
                  </h2>
                  <ul className="space-y-3">
                    {industry.potentialApplications.map((app) => (
                      <li key={app} className="text-sm text-white flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F36B21] shrink-0" aria-hidden="true" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-5">
                  Relevant Engineering Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommended.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="group p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#1769AA]/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="w-9 h-9 rounded-lg bg-[#141414] text-[#5BB4F5] flex items-center justify-center mb-3">
                          <IconRenderer name={service.icon} className="w-4 h-4" />
                        </span>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-[#5BB4F5]">
                          {service.title}
                        </h3>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5BB4F5]">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="p-7 rounded-3xl keep-dark bg-[#0B0B0B] border border-white/10 text-white space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F36B21]">
                  Explore Feasibility
                </p>
                <h2 className="font-display text-2xl font-bold">
                  Plan an Initiative for {industry.name}
                </h2>
                <p className="text-sm text-[#EAF4FB]/85 leading-relaxed">
                  Discuss your workflows and evaluate which AI or automation architecture aligns with your team&apos;s goals.
                </p>
                <Button to="/contact" variant="light" withArrow className="w-full">
                  Schedule Discovery
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
