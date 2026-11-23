import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from './Container';
import { DemoTag } from './DemoTag';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  demoLabel?: string;
}

export function PageHeader({ breadcrumbs, title, subtitle, demoLabel }: PageHeaderProps) {
  return (
    <section className="pt-28 pb-14 sm:pt-32 sm:pb-16 bg-gradient-to-b from-[#141414] via-[#0A0A0A] to-black border-b border-white/10">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#9CA3AF]">
            {breadcrumbs.map((crumb, idx) => (
              <li key={crumb.label} className="inline-flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-[#5BB4F5] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#EAF4FB]" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl space-y-4">
          {demoLabel && <DemoTag label={demoLabel} />}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
