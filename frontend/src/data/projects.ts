import type { ProjectItem } from '../types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'autonomous-vendor-onboarding-agent',
    title: 'Autonomous Vendor Onboarding & Document Verification Agent',
    category: 'Agentic AI',
    industry: 'Enterprise Operations',
    shortDescription:
      'A multi-step agentic workflow designed to validate incoming supplier packets, flag missing compliance fields, and prepare structured review summaries.',
    techStack: ['Python', 'Agent Orchestrator', 'Document OCR', 'PostgreSQL', 'TypeScript'],
    coverVariant: 1,
    overview:
      'Demo case study illustrating how an enterprise procurement team can streamline multi-document vendor onboarding using structured AI agents with human-in-the-loop approval.',
    problemStatement:
      'Procurement specialists frequently receive inconsistent tax forms, insurance certificates, and bank letters across email attachments, leading to slow back-and-forth verification cycles.',
    proposedSolution:
      'An agentic intake pipeline that classifies attachments, extracts required fields into validated schemas, checks expiry dates, and drafts a concise exception checklist for procurement officers.',
    implementationApproach: [
      'Defined strict JSON validation schemas for each mandatory onboarding document type.',
      'Built an isolated extraction agent with confidence scoring and source-page bounding references.',
      'Integrated a human review queue where specialists approve or request missing documents in one click.',
    ],
    keyFeatures: [
      'Automated document type classification and completeness check',
      'Confidence-threshold routing to human review',
      'Immutable audit log of every agent step and human decision',
      'Structured export to internal ERP endpoints',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: reduce manual document cross-checking effort during supplier intake.',
      'Target: standardize compliance checklists with consistent audit trails.',
    ],
  },
  {
    id: 'proj-2',
    slug: 'predictive-maintenance-telemetry-pipeline',
    title: 'Industrial Telemetry Anomaly & Maintenance Copilot',
    category: 'AI & ML',
    industry: 'Manufacturing',
    shortDescription:
      'Time-series anomaly flagging paired with a retrieval assistant grounded in equipment service manuals and historical repair logs.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'pgvector', 'React'],
    coverVariant: 2,
    overview:
      'Demo case study demonstrating how sensor monitoring and technical manual search can work together in a single technician-facing interface.',
    problemStatement:
      'Maintenance teams often discover equipment drift too late and spend valuable floor time searching across hundreds of pages of PDF service manuals.',
    proposedSolution:
      'A two-part system combining streaming anomaly detection models with a retrieval-augmented technician assistant indexed over equipment schematics and maintenance notes.',
    implementationApproach: [
      'Cleaned historical sensor time-series data and established statistical baseline thresholds.',
      'Indexed OEM maintenance PDFs with section-aware chunking for accurate technical citations.',
      'Built a tablet-friendly diagnostic dashboard displaying flagged signals alongside relevant manual excerpts.',
    ],
    keyFeatures: [
      'Configurable anomaly sensitivity per machine class',
      'Citation-linked manual Q&A for field technicians',
      'Shift handover log generator',
      'Role-based access for supervisors and engineers',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: surface early mechanical drift signals for proactive inspection.',
      'Target: shorten manual diagnostic lookup time on the shop floor.',
    ],
  },
  {
    id: 'proj-3',
    slug: 'hybrid-support-triage-automation',
    title: 'Intelligent Support Triage & CRM Routing Engine',
    category: 'Automation',
    industry: 'Retail & E-commerce',
    shortDescription:
      'Hybrid rule-and-AI intake pipeline classifying inbound customer messages, enriching order context, and routing priority cases.',
    techStack: ['Node.js', 'TypeScript', 'Webhook Queues', 'LLM Classification', 'REST APIs'],
    coverVariant: 3,
    overview:
      'Demo case study showcasing resilient back-office automation that bridges storefront order systems and customer support queues.',
    problemStatement:
      'High-volume support inboxes mix urgent delivery issues with routine inquiries, forcing agents to manually look up order IDs before categorizing each ticket.',
    proposedSolution:
      'An automated triage pipeline that extracts order references, pulls live fulfillment status via API, tags urgency using deterministic + AI rules, and drafts a contextual summary.',
    implementationApproach: [
      'Mapped existing ticket categories and SLA priorities with support leads.',
      'Implemented idempotent webhook processors with dead-letter retry queues.',
      'Added a confidence fallback ensuring ambiguous tickets route cleanly to senior agents.',
    ],
    keyFeatures: [
      'Automatic order context attachment prior to agent assignment',
      'Deterministic SLA escalation rules combined with intent detection',
      'Draft response suggestions grounded in return policies',
      'Exception alerting for failed upstream API lookups',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: eliminate repetitive ticket tagging and order lookup steps.',
      'Target: ensure urgent fulfillment issues reach specialists promptly.',
    ],
  },
  {
    id: 'proj-4',
    slug: 'interactive-ai-analytics-portal',
    title: 'Modular Operations & Natural-Language Insights Portal',
    category: 'Web Applications',
    industry: 'Logistics & Supply Chain',
    shortDescription:
      'Responsive web application unifying shipment milestones, exception tables, and natural-language dataset querying.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
    coverVariant: 4,
    overview:
      'Demo case study illustrating a custom modern web platform built for operations coordinators managing multi-region workflows.',
    problemStatement:
      'Coordinators relied on disconnected spreadsheets and rigid legacy reports that required engineering tickets whenever new filter views were needed.',
    proposedSolution:
      'A fast, accessible React web workspace offering interactive filtering, clear milestone timelines, and a constrained natural-language query bar translated safely into parameterized SQL.',
    implementationApproach: [
      'Designed an uncluttered information hierarchy prioritizing exceptions and daily tasks.',
      'Implemented strict read-only query translation with schema whitelisting.',
      'Optimized table rendering and keyboard navigation across desktop and tablet screens.',
    ],
    keyFeatures: [
      'Real-time client filtering and saved operational views',
      'Constrained natural-language-to-query builder with preview',
      'Accessible keyboard-navigable data tables',
      'Exportable summary views for stakeholder briefings',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: consolidate fragmented tracking sheets into one web workspace.',
      'Target: enable self-serve operational filtering without engineering bottlenecks.',
    ],
  },
  {
    id: 'proj-5',
    slug: 'governed-enterprise-knowledge-hub',
    title: 'Permission-Aware Enterprise Knowledge Assistant',
    category: 'Enterprise Solutions',
    industry: 'Finance & Banking',
    shortDescription:
      'Private retrieval-augmented workspace indexing internal policies with document-level access controls and source citations.',
    techStack: ['AWS / VPC', 'Python', 'OIDC / SSO', 'Hybrid Search', 'React'],
    coverVariant: 5,
    overview:
      'Demo case study highlighting how regulated teams can deploy internal generative AI while respecting strict document permissions.',
    problemStatement:
      'Employees struggled to locate current policy clauses across multiple repositories, while standard AI chat tools lacked permission awareness and audit logging.',
    proposedSolution:
      'A private enterprise knowledge hub that syncs group ACLs during indexing, enforces citation-first answers, and logs every query for governance review.',
    implementationApproach: [
      'Integrated corporate SSO and mapped document-level access lists into retrieval metadata.',
      'Built hybrid BM25 + semantic vector retrieval for exact policy terminology recall.',
      'Added inline source-passage previews so reviewers verify answers immediately.',
    ],
    keyFeatures: [
      'ACL-filtered retrieval respecting user group permissions',
      'Mandatory inline citations pointing to exact policy sections',
      'Centralized prompt and usage audit logging',
      'Private VPC deployment blueprint',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: improve discoverability of internal policies across departments.',
      'Target: maintain strict compliance alignment and source verifiability.',
    ],
  },
  {
    id: 'proj-6',
    slug: 'clinical-intake-triage-assistant',
    title: 'Structured Patient Intake & Routing Assistant',
    category: 'Agentic AI',
    industry: 'Healthcare',
    shortDescription:
      'Conversational intake pre-screening interface structuring referral details and appointment routing for administrative teams.',
    techStack: ['TypeScript', 'React', 'Conversational AI', 'Node.js', 'HL7 / API Ready'],
    coverVariant: 6,
    overview:
      'Demo case study exploring how guided conversational interfaces can turn unstructured patient inquiries into clean administrative intake packets.',
    problemStatement:
      'Front-desk staff spent substantial time re-keying incomplete referral notes and answering standard preparation questions over the phone.',
    proposedSolution:
      'A guided, accessibility-focused intake assistant that collects required administrative fields step-by-step and produces a structured summary for coordinator review.',
    implementationApproach: [
      'Designed clear, plain-language prompts with accessible keyboard and screen-reader support.',
      'Separated administrative scheduling assistance from clinical guidance with strict guardrails.',
      'Built clean escalation paths connecting callers directly to clinic staff whenever needed.',
    ],
    keyFeatures: [
      'Step-by-step structured intake capture with validation',
      'Plain-language clinic preparation FAQ grounded in approved guides',
      'Immediate human coordinator escalation option',
      'Structured summary output ready for scheduling queues',
    ],
    intendedOutcomes: [
      'Intended outcomes / to be confirmed upon production deployment.',
      'Target: reduce incomplete referral submissions at intake.',
      'Target: free front-desk coordinators for complex patient support.',
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
