import type { IndustryItem } from '../types';

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Supporting clinical and administrative teams with structured intake, documentation, and workflow automation.',
    overview:
      'Healthcare organizations balance strict privacy requirements with high administrative workloads. Potential AI applications focus on reducing paperwork, organizing patient intake, and streamlining back-office coordination—always with clinician oversight.',
    icon: 'Stethoscope',
    accentTone: '#1769AA',
    challenges: [
      'High volume of repetitive administrative intake and referral paperwork',
      'Fragmented patient communication across portals, phone, and email',
      'Time-consuming manual review of clinical policy and scheduling rules',
    ],
    potentialApplications: [
      'Structured patient intake pre-screening and appointment routing assistants',
      'Automated summarization of administrative records for staff review',
      'Internal policy and protocol search tools for care coordinators',
    ],
    recommendedServices: ['agentic-ai-development', 'ai-chatbots-conversational-ai', 'enterprise-ai-solutions'],
  },
  {
    id: 'finance-banking',
    slug: 'finance-banking',
    name: 'Finance & Banking',
    tagline: 'Accelerating document verification, compliance checks, and internal analytical workflows.',
    overview:
      'Financial institutions handle dense regulatory documentation, KYC packets, and multi-system reconciliations. Intelligent automation and auditable AI pipelines help analysts review information faster while preserving clear audit trails.',
    icon: 'Landmark',
    accentTone: '#123B60',
    challenges: [
      'Manual extraction and cross-checking across lengthy PDFs and statements',
      'Complex compliance guidelines requiring fast, accurate internal lookup',
      'Operational delays in client onboarding and exception handling',
    ],
    potentialApplications: [
      'Automated document parsing and field verification for onboarding packets',
      'Citation-backed compliance and policy research assistants',
      'Exception-routing workflows for transaction or reconciliation alerts',
    ],
    recommendedServices: ['ai-machine-learning-solutions', 'enterprise-ai-solutions', 'ai-automation'],
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Connecting production telemetry, maintenance manuals, and supply workflows.',
    overview:
      'Modern manufacturing environments generate continuous equipment logs alongside extensive technical manuals and supplier communications. AI and custom software can unify floor visibility and accelerate maintenance troubleshooting.',
    icon: 'Factory',
    accentTone: '#F36B21',
    challenges: [
      'Siloed machine logs, maintenance histories, and SOP binders',
      'Reactive equipment maintenance causing unplanned line interruptions',
      'Manual supplier follow-ups and quality inspection reporting',
    ],
    potentialApplications: [
      'Technician copilots grounded in equipment manuals and repair logs',
      'Time-series anomaly flagging on sensor and production telemetry',
      'Automated shift handover summaries and quality checklist portals',
    ],
    recommendedServices: ['ai-machine-learning-solutions', 'custom-software-development', 'cloud-technology-solutions'],
  },
  {
    id: 'retail-ecommerce',
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    tagline: 'Improving catalog discovery, customer support, and inventory planning.',
    overview:
      'Retailers manage large product catalogs, seasonal demand swings, and round-the-clock customer questions. Semantic search, conversational concierges, and forecasting models help teams deliver smoother shopping experiences.',
    icon: 'ShoppingBag',
    accentTone: '#1769AA',
    challenges: [
      'Keyword search failing on natural-language product queries',
      'Repetitive order-status, sizing, and return inquiries',
      'Disconnected merchandising, catalog enrichment, and demand planning',
    ],
    potentialApplications: [
      'Conversational shopping assistants connected to live catalog metadata',
      'Automated product attribute tagging and catalog enrichment workflows',
      'Seasonal demand and stock-replenishment forecasting pipelines',
    ],
    recommendedServices: ['ai-chatbots-conversational-ai', 'web-application-development', 'ai-machine-learning-solutions'],
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education',
    tagline: 'Empowering institutions with accessible learning portals and administrative automation.',
    overview:
      'Educational institutions and EdTech platforms serve diverse learners while managing heavy admissions and student-support operations. Thoughtful AI tools can support guided study and streamline campus administration.',
    icon: 'GraduationCap',
    accentTone: '#123B60',
    challenges: [
      'High volume of repetitive admissions, syllabus, and enrollment questions',
      'Manual grading preparation and course material organization',
      'Outdated student portals lacking responsive accessibility',
    ],
    potentialApplications: [
      'Course-grounded study companions that guide learners step-by-step',
      '24/7 admissions and campus FAQ assistants for prospective students',
      'Modern accessible web portals for curriculum and administrative tracking',
    ],
    recommendedServices: ['web-application-development', 'ai-chatbots-conversational-ai', 'custom-software-development'],
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    name: 'Real Estate',
    tagline: 'Simplifying property discovery, lease analysis, and client qualification.',
    overview:
      'Brokerages and property management teams juggle listing updates, tenant inquiries, and lengthy lease agreements. Intelligent automation keeps inquiries moving and surfaces key terms quickly.',
    icon: 'Building',
    accentTone: '#F36B21',
    challenges: [
      'Delayed responses to off-hours buyer and tenant inquiries',
      'Manual review of multi-page lease clauses and inspection reports',
      'Fragmented listing data across internal CRMs and web portals',
    ],
    potentialApplications: [
      'Automated lead qualification and viewing-schedule assistants',
      'Lease and property document extraction and summary tools',
      'Semantic property search matching natural-language buyer criteria',
    ],
    recommendedServices: ['ai-automation', 'ai-chatbots-conversational-ai', 'web-application-development'],
  },
  {
    id: 'logistics-supply-chain',
    slug: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    tagline: 'Coordinating shipments, carrier documents, and exception resolution.',
    overview:
      'Logistics teams operate on tight timelines across carriers, warehouses, and customs paperwork. AI agents and automated pipelines help parse shipping documents and flag route or schedule exceptions early.',
    icon: 'Truck',
    accentTone: '#1769AA',
    challenges: [
      'Inconsistent bill-of-lading, customs, and carrier email formats',
      'Manual status tracking across multiple carrier portals',
      'Slow exception handling when transit delays occur',
    ],
    potentialApplications: [
      'Automated extraction from shipping manifests and carrier updates',
      'Delay detection and proactive customer notification workflows',
      'Custom dispatch and shipment visibility control dashboards',
    ],
    recommendedServices: ['agentic-ai-development', 'ai-automation', 'custom-software-development'],
  },
  {
    id: 'enterprise-operations',
    slug: 'enterprise-operations',
    name: 'Enterprise Operations',
    tagline: 'Unifying cross-departmental workflows across IT, HR, procurement, and finance.',
    overview:
      'Large organizations lose hours each week to internal handoffs, ticket routing, and knowledge hunting. Governed Agentic AI and internal workflow orchestration connect core operational tools smoothly.',
    icon: 'Layers',
    accentTone: '#123B60',
    challenges: [
      'Knowledge scattered across wikis, shared drives, and ticketing systems',
      'Manual procurement, IT access, and onboarding approvals',
      'Lack of unified visibility across departmental software tools',
    ],
    potentialApplications: [
      'Internal agentic helpdesks for IT, HR, and procurement requests',
      'Cross-system approval orchestration with audit logs',
      'Unified operations portals with semantic document search',
    ],
    recommendedServices: ['enterprise-ai-solutions', 'agentic-ai-development', 'cloud-technology-solutions'],
  },
];

export function getIndustryBySlug(slug: string): IndustryItem | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
