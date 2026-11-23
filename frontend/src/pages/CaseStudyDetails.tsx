import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { CoverArtwork } from '../components/common/CoverArtwork';
import { getProjectBySlug, PROJECTS } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFound from './NotFound';

const SECTIONS = [
  { id: 'overview', label: '1. Project Overview' },
  { id: 'problem', label: '2. Problem Statement' },
  { id: 'solution', label: '3. Proposed Solution' },
  { id: 'stack', label: '4. Technology Stack' },
  { id: 'approach', label: '5. Implementation Approach' },
  { id: 'features', label: '6. Key Features' },
  { id: 'outcomes', label: '7. Results and Outcomes' },
];

export default function CaseStudyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [scrollProgress, setScrollProgress] = useState(0);

  useDocumentMeta(
    project ? project.title : 'Case Study Not Found',
    project ? project.shortDescription : 'Requested case study was not found.'
  );

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!project) {
    return <NotFound />;
  }

  const currentIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#1769AA] to-[#F36B21] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Portfolio', to: '/portfolio' },
          { label: project.title },
        ]}
        title={project.title}
        subtitle={`${project.category} · ${project.industry}`}
        demoLabel="Demo case study — illustrative blueprint"
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="h-56 sm:h-72 rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-sm">
            <CoverArtwork variant={project.coverVariant} label={project.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sticky In-Page Section Nav */}
            <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-28">
              <nav
                aria-label="Case study sections"
                className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-1.5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-2 pb-2">
                  Case Study Sections
                </p>
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-2.5 py-2 rounded-lg text-xs font-medium text-white hover:bg-white/10 hover:text-[#5BB4F5] transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* 7 Case Study Sections */}
            <div className="lg:col-span-9 space-y-8">
              <div id="overview" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  1. Project Overview
                </h2>
                <p className="text-base text-[#9CA3AF] leading-relaxed">{project.overview}</p>
              </div>

              <div id="problem" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  2. Problem Statement
                </h2>
                <p className="text-base text-[#9CA3AF] leading-relaxed">{project.problemStatement}</p>
              </div>

              <div id="solution" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  3. Proposed Solution
                </h2>
                <p className="text-base text-[#9CA3AF] leading-relaxed">{project.proposedSolution}</p>
              </div>

              <div id="stack" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  4. Technology Stack
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs font-medium text-[#EAF4FB]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div id="approach" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  5. Implementation Approach
                </h2>
                <ol className="space-y-3">
                  {project.implementationApproach.map((step, idx) => (
                    <li key={step} className="flex items-start gap-3 text-sm sm:text-base text-[#9CA3AF]">
                      <span className="font-mono text-xs font-bold text-[#F36B21] mt-1">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="features" className="scroll-mt-28 p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  6. Key Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-white">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="outcomes" className="scroll-mt-28 p-7 rounded-3xl bg-[#141414]/70 border border-[#1769AA]/20 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#EAF4FB]">
                  7. Results and Outcomes (Intended outcomes / to be confirmed)
                </h2>
                <ul className="space-y-2">
                  {project.intendedOutcomes.map((out) => (
                    <li key={out} className="text-sm sm:text-base text-white flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F36B21] shrink-0" aria-hidden="true" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Previous / Next Navigation */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#1769AA] transition-colors flex items-center gap-3"
                >
                  <ArrowLeft className="w-4 h-4 text-[#5BB4F5] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#9CA3AF]">Previous Case Study</p>
                    <p className="font-display text-sm font-bold text-white truncate">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>

                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#1769AA] transition-colors flex items-center justify-between gap-3 text-right"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#9CA3AF]">Next Case Study</p>
                    <p className="font-display text-sm font-bold text-white truncate">
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#5BB4F5] shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
