import type { ProductItem } from '../types';

export const PRODUCTS: ProductItem[] = [
  {
    id: 'agent-console',
    slug: 'demo-ai-agent-console',
    name: 'Demo Product A: AI Agent Console',
    category: 'Agentic Orchestration (Placeholder)',
    tagline: 'Unified control plane for monitoring, testing, and governing multi-step AI agents.',
    description:
      'A conceptual operations console designed to inspect agent reasoning traces, manage tool permissions, and review human-in-the-loop approval queues from one workspace.',
    features: [
      'Step-by-step execution trace viewer with tool call inspection',
      'Role-based permission policies and approval checkpoint queues',
      'Scenario evaluation runner for prompt and model regression checks',
      'Configurable fallback routing and rate-limit controls',
    ],
    mockupType: 'agent-console',
    architectureNotes: [
      'Placeholder architecture concept built for demonstration purposes.',
      'Real product specifications, deployment options, and naming will be supplied.',
    ],
    intendedUsers: ['AI Engineering Teams', 'Operations Leads', 'Compliance Reviewers'],
  },
  {
    id: 'workflow-studio',
    slug: 'demo-workflow-automation-studio',
    name: 'Demo Product B: Workflow Automation Studio',
    category: 'Intelligent Automation (Placeholder)',
    tagline: 'Visual orchestration builder combining deterministic logic with AI extraction nodes.',
    description:
      'A conceptual studio enabling teams to design hybrid automations—connecting inbound emails, document parsers, approval steps, and external business APIs.',
    features: [
      'Modular node canvas blending rules, webhooks, and AI steps',
      'Structured JSON schema enforcement between workflow stages',
      'Built-in exception queue for low-confidence items',
      'Versioned workflow drafts with one-click test payloads',
    ],
    mockupType: 'workflow-studio',
    architectureNotes: [
      'Placeholder architecture concept built for demonstration purposes.',
      'Real product specifications, deployment options, and naming will be supplied.',
    ],
    intendedUsers: ['Business Operations', 'Automation Architects', 'IT Integration Teams'],
  },
  {
    id: 'insights-dashboard',
    slug: 'demo-insights-dashboard',
    name: 'Demo Product C: Insights Dashboard',
    category: 'Operational Intelligence (Placeholder)',
    tagline: 'Clean decision-support interface turning fragmented operational feeds into clear views.',
    description:
      'A conceptual analytics interface demonstrating how natural-language querying, trend summaries, and anomaly alerts can sit alongside structured business tables.',
    features: [
      'Natural-language question bar grounded in structured datasets',
      'Interactive trend visualizations and variance breakdowns',
      'Automated anomaly digest panels with drill-down filtering',
      'Export-ready operational summary views',
    ],
    mockupType: 'insights-dashboard',
    architectureNotes: [
      'Placeholder architecture concept built for demonstration purposes.',
      'Real product specifications, deployment options, and naming will be supplied.',
    ],
    intendedUsers: ['Operations Managers', 'Data Analysts', 'Executive Leadership'],
  },
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
