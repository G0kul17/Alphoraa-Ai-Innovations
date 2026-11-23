import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LEGAL_COPY = {
  privacy: {
    title: 'Privacy Policy (Placeholder)',
    subtitle: 'Placeholder legal notice for the ALPHORAA AI INNOVATIONS frontend preview.',
    sections: [
      {
        heading: '1. Frontend-Only Preview Notice',
        body: 'This website operates strictly as a frontend demonstration. Enquiry forms, newsletter fields, and the scripted demo assistant do not transmit or store personal data on any backend server.',
      },
      {
        heading: '2. Official Policy Replacement',
        body: 'Before commercial launch, replace this placeholder document with your organization’s jurisdiction-specific privacy policy reviewed by legal counsel.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions (Placeholder)',
    subtitle: 'Placeholder terms governing access to the ALPHORAA AI INNOVATIONS preview site.',
    sections: [
      {
        heading: '1. Illustrative Demonstration Content',
        body: 'Products, case studies, sample testimonials, and proposed technology capabilities displayed on this preview are illustrative placeholders and do not constitute binding service commitments.',
      },
      {
        heading: '2. Official Terms Replacement',
        body: 'Replace this placeholder page with finalized terms of service and acceptable use policies prior to production deployment.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy (Placeholder)',
    subtitle: 'Information about local browser preferences stored on this preview.',
    sections: [
      {
        heading: '1. Essential Browser Storage',
        body: 'When you accept or reject the cookie notice banner, your selection is stored locally in your browser’s localStorage so the banner does not reappear on every page load.',
      },
      {
        heading: '2. Analytics & Third-Party Scripts',
        body: 'This preview does not load third-party advertising trackers. Update this policy if analytics scripts are added later.',
      },
    ],
  },
};

export default function LegalPage({ type }: LegalPageProps) {
  const doc = LEGAL_COPY[type];
  useDocumentMeta(doc.title, doc.subtitle);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: doc.title }]}
        title={doc.title}
        subtitle={doc.subtitle}
        demoLabel="Placeholder legal copy"
      />
      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="max-w-3xl p-7 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-6">
            {doc.sections.map((sec) => (
              <div key={sec.heading} className="space-y-2">
                <h2 className="font-display text-lg font-bold text-[#EAF4FB]">
                  {sec.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
