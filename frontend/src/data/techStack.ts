import type { TechCategory } from '../types';

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'ai-ml',
    label: 'AI & ML',
    description: 'Model orchestration, custom inference, and retrieval pipelines.',
    items: [
      { name: 'Python', role: 'Core AI & data runtime' },
      { name: 'TensorFlow', role: 'Deep learning pipelines' },
      { name: 'PyTorch', role: 'Custom model research & serving' },
      { name: 'OpenAI APIs', role: 'Foundation model reasoning & tools' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Accessible, responsive interfaces and interactive AI workspaces.',
    items: [
      { name: 'React', role: 'Component-driven web UI' },
      { name: 'Next.js', role: 'Full-stack & SSR architecture' },
      { name: 'TypeScript', role: 'End-to-end type safety' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'High-throughput APIs, agent orchestrators, and middleware.',
    items: [
      { name: 'Node.js', role: 'Event-driven web services' },
      { name: 'FastAPI', role: 'Typed Python inference APIs' },
      { name: 'Python', role: 'Async task & data pipelines' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    description: 'Structured persistence, document storage, and vector indexing.',
    items: [
      { name: 'PostgreSQL', role: 'Relational & pgvector storage' },
      { name: 'MongoDB', role: 'Flexible document workloads' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    description: 'Resilient infrastructure, edge delivery, and private deployments.',
    items: [
      { name: 'AWS', role: 'Scalable cloud compute & VPCs' },
      { name: 'Azure', role: 'Enterprise identity & cloud services' },
      { name: 'Google Cloud', role: 'AI & containerized workloads' },
      { name: 'Cloudflare', role: 'Edge routing & global delivery' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Autonomous task execution and deterministic system connectors.',
    items: [
      { name: 'AI Agents', role: 'Goal-directed tool execution' },
      { name: 'Workflow Automation', role: 'Multi-step process orchestration' },
      { name: 'API Integrations', role: 'CRM, ERP & webhook bridges' },
    ],
  },
];
