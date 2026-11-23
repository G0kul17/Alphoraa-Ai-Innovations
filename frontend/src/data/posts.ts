import type { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'designing-guardrails-for-agentic-ai',
    title: 'Designing Practical Guardrails for Agentic AI Workflows',
    category: 'Agentic AI',
    publishedAt: 'October 2026',
    readTime: '5 min read',
    excerpt:
      'Why reliable autonomous agents depend less on clever prompts and more on scoped permissions, structured schemas, and human approval checkpoints.',
    coverVariant: 1,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'From Open-Ended Chat to Bounded Execution',
        body: [
          'As software teams move from conversational prototypes to agents that invoke real business tools, reliability becomes an architectural problem rather than purely a prompting exercise.',
          'Separating read-only discovery actions from state-changing write actions lets teams grant autonomy where risk is low while keeping explicit human sign-off on high-impact steps.',
        ],
      },
      {
        heading: 'Core Patterns for Safe Tool Use',
        body: [
          'Enforcing strict typed schemas on tool inputs and outputs eliminates whole classes of malformed API requests. When a model output fails validation, deterministic retry or fallback routing keeps workflows predictable.',
          'Comprehensive execution traces—capturing which tools were called, what context was retrieved, and why a branch was taken—make debugging and auditing straightforward.',
        ],
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'hybrid-automation-rules-plus-ai',
    title: 'Hybrid Automation: Combining Deterministic Rules with AI Reasoning',
    category: 'Business Automation',
    publishedAt: 'October 2026',
    readTime: '4 min read',
    excerpt:
      'Pure rule engines break on messy inputs, while unconstrained AI can drift. Combining both creates resilient back-office pipelines.',
    coverVariant: 2,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'Let Each Layer Do What It Does Best',
        body: [
          'Traditional workflow automation excels at exact calculations, conditional routing, and transactional API calls. However, it struggles whenever inputs arrive as free-form emails or varied PDF layouts.',
          'By placing AI strictly at the classification and structured-extraction boundary—and handing clean JSON over to deterministic business logic—organizations get flexibility without sacrificing predictability.',
        ],
      },
      {
        heading: 'Planning for Exceptions Early',
        body: [
          'No extraction pipeline should operate without an exception queue. Routing low-confidence records to a clean human review screen ensures data integrity across downstream ERPs and CRMs.',
        ],
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'enterprise-ai-readiness-checklist',
    title: 'What Makes an Enterprise AI Architecture Production-Ready',
    category: 'AI Trends',
    publishedAt: 'September 2026',
    readTime: '6 min read',
    excerpt:
      'Moving from isolated department pilots to governed, permission-aware AI infrastructure across an organization.',
    coverVariant: 3,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'Identity, Permissions, and Observability First',
        body: [
          'Before connecting models to internal wikis or document stores, enterprise teams need clear answers on access control. A knowledge assistant must never surface a document to a user who lacks permission to view the source file.',
          'Centralized AI gateways help organizations standardize model routing, monitor token budgets, and maintain consistent logging across teams.',
        ],
      },
      {
        heading: 'Evaluation as an Ongoing Practice',
        body: [
          'Building small, domain-specific evaluation datasets allows engineering teams to compare model updates and prompt revisions objectively rather than relying on ad-hoc visual checks.',
        ],
      },
    ],
  },
  {
    id: 'post-4',
    slug: 'hybrid-retrieval-for-technical-knowledge',
    title: 'Why Hybrid Search Matters for Applied Machine Learning & RAG',
    category: 'Machine Learning',
    publishedAt: 'September 2026',
    readTime: '5 min read',
    excerpt:
      'Combining semantic embeddings with exact keyword matching dramatically improves recall on part numbers, policy codes, and domain jargon.',
    coverVariant: 4,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'Where Pure Vector Search Falls Short',
        body: [
          'Dense vector embeddings are great at capturing conceptual similarity, yet they often struggle with exact SKU identifiers, error codes, or regulatory clause numbers.',
          'Pairing lexical search (such as BM25) with semantic retrieval and a lightweight reranker consistently surfaces more accurate context passages for downstream reasoning.',
        ],
      },
      {
        heading: 'Document Structure Is Context',
        body: [
          'Preserving table headers, section titles, and document metadata during chunking prevents answers from losing critical qualifiers.',
        ],
      },
    ],
  },
  {
    id: 'post-5',
    slug: 'interfaces-built-for-human-ai-collaboration',
    title: 'Designing Web Interfaces Built for Human–AI Collaboration',
    category: 'Technology Innovations',
    publishedAt: 'August 2026',
    readTime: '4 min read',
    excerpt:
      'Beyond the chat box: how structured side-by-side workspaces, inline citations, and undoable actions build user trust.',
    coverVariant: 5,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'Moving Beyond Single-Column Chat',
        body: [
          'Chat is helpful for exploration, but operational work often benefits from visual structure—editable drafts, diff views, selectable options, and transparent confidence indicators.',
          'When users can inspect sources in one click and edit AI-generated drafts directly in place, adoption grows naturally.',
        ],
      },
    ],
  },
  {
    id: 'post-6',
    slug: 'practical-ai-in-supply-chain-and-ops',
    title: 'Practical AI Applications Across Supply Chain & Daily Operations',
    category: 'Industry Applications',
    publishedAt: 'August 2026',
    readTime: '5 min read',
    excerpt:
      'Where operational teams are focusing first: document intake, exception triage, and unified cross-system visibility.',
    coverVariant: 6,
    author: 'ALPHORAA Editorial Team',
    sections: [
      {
        heading: 'Start with High-Friction Handoffs',
        body: [
          'Rather than attempting sweeping transformations overnight, operational leaders often achieve clearer momentum by targeting specific bottlenecks—such as carrier manifest parsing or internal ticket routing.',
          'Starting with narrow, measurable workflows builds organizational familiarity and creates reusable integration building blocks.',
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
