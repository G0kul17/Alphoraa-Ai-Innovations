import { Compass, Eye, ShieldCheck, Cpu, Workflow } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { DemoTag } from '../components/common/DemoTag';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { SITE_CONFIG } from '../data/config';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function About() {
  useDocumentMeta(
    'About ALPHORAA AI INNOVATIONS',
    'Learn about our focus on Agentic AI, practical automation, and human-aligned software architecture.'
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        title="Beyond Traditional Technology. Into Intelligent Possibilities."
        subtitle="At ALPHORAA AI INNOVATIONS, we engineer intelligent AI systems, autonomous agents, and resilient software workflows."
      />

      <section className="py-16 sm:py-20 bg-black">
        <Container className="space-y-16">
          {/* Core Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5]">
                Who We Are
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Engineering Systems That Understand, Adapt, and Act
              </h2>
              <p className="text-base text-[#9CA3AF] leading-relaxed">
                At ALPHORAA AI INNOVATIONS, we believe the future of technology lies in intelligent systems that can understand, adapt and act. We focus on building innovative AI-powered solutions that simplify complex operations, automate workflows and unlock new possibilities for businesses.
              </p>
              <p className="text-base text-[#9CA3AF] leading-relaxed">
                Rather than chasing hype, we pair foundational AI capabilities with disciplined software engineering—typed APIs, evaluation harnesses, permission boundaries, and clear human-in-the-loop controls.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                    <Compass className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <DemoTag label={SITE_CONFIG.mission.note} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {SITE_CONFIG.mission.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {SITE_CONFIG.mission.body}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#141414] text-[#F36B21] flex items-center justify-center">
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <DemoTag label={SITE_CONFIG.vision.note} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {SITE_CONFIG.vision.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {SITE_CONFIG.vision.body}
                </p>
              </div>
            </div>
          </div>

          {/* Operating Principles */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              How We Approach Every Build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Safety & Human Oversight',
                  body: 'Clear permissions, structured tool schemas, and explicit review gates ensure autonomous capabilities remain accountable.',
                },
                {
                  icon: Workflow,
                  title: 'Workflow-First Scoping',
                  body: 'We start by mapping real operational handoffs so AI integrates naturally into existing team routines.',
                },
                {
                  icon: Cpu,
                  title: 'Maintainable Foundations',
                  body: 'Clean TypeScript and Python codebases, modular APIs, and documented architectures built for long-term ownership.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3"
                  >
                    <span className="w-11 h-11 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
