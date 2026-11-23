import type { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'agentic-ai',
    slug: 'agentic-ai-development',
    title: 'Agentic AI Development',
    shortTitle: 'Agentic AI',
    tagline: 'Autonomous multi-step software agents designed with clear boundaries and human oversight.',
    shortDescription:
      'Architect goal-driven AI agents capable of planning tasks, invoking enterprise tools, and coordinating multi-step workflows safely.',
    overview:
      'Agentic AI moves beyond single-turn chat interfaces into systems that can plan, retrieve context, execute structured tool calls, and verify outcomes. We engineer modular agent architectures with explicit guardrails, audit trails, and human-in-the-loop checkpoints.',
    icon: 'Bot',
    featured: true,
    capabilities: [
      'Multi-agent orchestration and task delegation',
      'Structured tool-use and API integration',
      'Memory, retrieval-augmented context, and state persistence',
      'Human-in-the-loop approval gates and execution logs',
    ],
    whatWeBuild: [
      {
        title: 'Research & Synthesis Agents',
        description: 'Agents that gather internal documentation, compare structured sources, and prepare concise review briefs.',
      },
      {
        title: 'Operations Coordination Agents',
        description: 'Task routers that triage incoming requests, validate required fields, and trigger downstream workflows.',
      },
      {
        title: 'Tool-Using Copilots',
        description: 'Domain-specific assistants connected securely to CRM, ticketing, or ERP endpoints with role-based permissions.',
      },
      {
        title: 'Evaluation & Guardrail Harnesses',
        description: 'Testing suites and policy filters to verify agent behavior before production rollout.',
      },
    ],
    useCases: [
      'Automated research and vendor comparison briefings',
      'Internal IT and operations ticket triage with draft resolution',
      'Document verification and multi-system data reconciliation',
      'Assisted customer onboarding coordination',
    ],
    process: [
      { step: 'Scope & Guardrails', description: 'Define allowed actions, approval thresholds, and failure fallbacks.' },
      { step: 'Tool & Memory Architecture', description: 'Connect clean APIs, knowledge indexes, and structured schemas.' },
      { step: 'Iterative Evaluation', description: 'Run scenario test cases to verify reasoning consistency and safety.' },
      { step: 'Controlled Deployment', description: 'Roll out with observability logs and human review controls.' },
    ],
    proposedTechnologies: ['Python', 'TypeScript', 'OpenAI / LLM APIs', 'LangGraph / Custom Orchestrators', 'Vector Indexes', 'PostgreSQL'],
    faqs: [
      {
        question: 'How do you prevent autonomous agents from taking unintended actions?',
        answer: 'We separate read-only discovery from write actions, enforce strict JSON tool schemas, and route sensitive actions through explicit human confirmation.',
      },
      {
        question: 'Can agents integrate with existing internal software?',
        answer: 'Yes. Agents interact through standard REST or GraphQL APIs and service accounts scoped to least-privilege permissions.',
      },
    ],
  },
  {
    id: 'ai-ml-solutions',
    slug: 'ai-machine-learning-solutions',
    title: 'AI & Machine Learning Solutions',
    shortTitle: 'AI & ML',
    tagline: 'Applied predictive modeling, classification, and tailored intelligence built around your data.',
    shortDescription:
      'Design and train custom machine learning pipelines for forecasting, anomaly detection, document parsing, and semantic search.',
    overview:
      'Every organization sits on distinct operational patterns. We help structure messy datasets, select appropriate model architectures—from classical gradient boosting to fine-tuned transformers—and deploy maintainable inference services.',
    icon: 'BrainCircuit',
    featured: true,
    capabilities: [
      'Predictive modeling and time-series forecasting',
      'Natural language processing and document extraction',
      'Semantic search and hybrid retrieval pipelines',
      'Model evaluation, drift monitoring, and retraining workflows',
    ],
    whatWeBuild: [
      {
        title: 'Forecasting Engines',
        description: 'Demand, capacity, and resource planning models calibrated to historical seasonality.',
      },
      {
        title: 'Document Intelligence Pipelines',
        description: 'OCR and structured extraction systems turning PDFs, invoices, and forms into clean records.',
      },
      {
        title: 'Anomaly & Quality Detectors',
        description: 'Pattern-monitoring services that flag unusual operational signals early for review.',
      },
      {
        title: 'Semantic Knowledge Search',
        description: 'Hybrid keyword and embedding search tailored to technical catalogs and internal wikis.',
      },
    ],
    useCases: [
      'Inventory and staffing demand forecasting',
      'Automated contract and invoice field extraction',
      'Equipment telemetry anomaly flagging',
      'Enterprise knowledge base search and citation',
    ],
    process: [
      { step: 'Data Readiness Audit', description: 'Inspect data quality, labeling consistency, and baseline heuristics.' },
      { step: 'Baseline & Prototyping', description: 'Establish simple interpretable benchmarks before adding model complexity.' },
      { step: 'Validation & Testing', description: 'Evaluate precision, recall, and edge-case behavior on holdout sets.' },
      { step: 'Production Serving', description: 'Containerize inference APIs with latency monitoring and logging.' },
    ],
    proposedTechnologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'FastAPI', 'PostgreSQL / pgvector'],
    faqs: [
      {
        question: 'Do we always need a custom-trained model?',
        answer: 'Not always. We evaluate whether foundation APIs, fine-tuned open models, or classical ML offer the best balance of accuracy, cost, and maintainability.',
      },
      {
        question: 'How is data privacy handled during model development?',
        answer: 'Pipelines can be deployed inside your private cloud or VPC so training and inference data never leaves your controlled environment.',
      },
    ],
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    tagline: 'Streamline repetitive operational workflows by combining deterministic rules with AI reasoning.',
    shortDescription:
      'Eliminate manual handoffs across email, spreadsheets, CRMs, and back-office tools through resilient intelligent pipelines.',
    overview:
      'Pure rule-based automation breaks when inputs vary; pure AI can be unpredictable. We blend deterministic workflow engines with targeted AI classification and extraction steps so your back-office runs reliably.',
    icon: 'Workflow',
    capabilities: [
      'Cross-app workflow orchestration and webhook pipelines',
      'Unstructured email, form, and attachment triage',
      'Automated data validation and enrichment',
      'Exception routing and retry handling',
    ],
    whatWeBuild: [
      {
        title: 'Intelligent Intake Pipelines',
        description: 'Capture inbound requests from email or web forms, classify intent, and populate structured CRM records.',
      },
      {
        title: 'Finance & Admin Workflows',
        description: 'Reconcile purchase orders, receipts, and approval status across accounting tools.',
      },
      {
        title: 'Reporting & Digest Automations',
        description: 'Compile scheduled operational summaries from multiple dashboards without manual copy-pasting.',
      },
      {
        title: 'Exception Queues',
        description: 'Clean review interfaces when low-confidence items require a quick human decision.',
      },
    ],
    useCases: [
      'Lead routing and CRM enrichment',
      'Vendor onboarding document checklists',
      'Automated support ticket tagging and prioritization',
      'Scheduled multi-source operational reporting',
    ],
    process: [
      { step: 'Workflow Mapping', description: 'Trace current manual steps, bottlenecks, and edge cases.' },
      { step: 'Hybrid Design', description: 'Assign deterministic rules to fixed logic and AI to unstructured inputs.' },
      { step: 'Connector Build', description: 'Implement idempotent integrations with clear error alerts.' },
      { step: 'Rollout & Refinement', description: 'Monitor exception rates and tune confidence thresholds.' },
    ],
    proposedTechnologies: ['Node.js', 'Python', 'FastAPI', 'Webhook Queues', 'REST / GraphQL APIs', 'Cloudflare Workers'],
    faqs: [
      {
        question: 'What happens when an automated workflow encounters missing information?',
        answer: 'Rather than failing silently, the pipeline pauses the item into an exception queue and notifies the responsible team member with full context.',
      },
    ],
  },
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    tagline: 'Tailored internal platforms, APIs, and domain-specific tools engineered for longevity.',
    shortDescription:
      'Build clean, maintainable software tailored to your exact business logic when off-the-shelf tools fall short.',
    overview:
      'AI capabilities only deliver value when wrapped in dependable software. We design and engineer full-stack custom applications, internal operations portals, and integration middleware built around how your teams actually work.',
    icon: 'Code2',
    capabilities: [
      'Domain-driven backend services and API design',
      'Internal operations dashboards and admin portals',
      'Legacy system integration and modernization',
      'Automated testing and clean CI/CD delivery',
    ],
    whatWeBuild: [
      {
        title: 'Operations Portals',
        description: 'Custom consoles unifying fragmented spreadsheets and third-party tools into one workspace.',
      },
      {
        title: 'Integration Middleware',
        description: 'Reliable synchronization services bridging legacy databases with modern cloud apps.',
      },
      {
        title: 'B2B Client Platforms',
        description: 'Role-aware portals enabling your clients to track orders, deliverables, or analytics.',
      },
      {
        title: 'Modular Microservices',
        description: 'Well-documented APIs ready to power web, mobile, and AI agent clients simultaneously.',
      },
    ],
    useCases: [
      'Replacing brittle multi-sheet operational trackers',
      'Building custom partner or client self-service portals',
      'Creating unified middleware for disparate ERPs',
      'Modernizing aging internal desktop or web tools',
    ],
    process: [
      { step: 'Discovery & Architecture', description: 'Model core domain entities, permissions, and integration contracts.' },
      { step: 'Design & Prototyping', description: 'Validate user flows with interactive wireframes before heavy coding.' },
      { step: 'Iterative Engineering', description: 'Deliver tested milestones in transparent weekly cycles.' },
      { step: 'Handover & Support', description: 'Provide full documentation, deployment scripts, and ongoing maintenance.' },
    ],
    proposedTechnologies: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
    faqs: [
      {
        question: 'Who owns the source code of custom software projects?',
        answer: 'Ownership terms are defined transparently in the engagement agreement, with standard full intellectual property transfer upon completion.',
      },
    ],
  },
  {
    id: 'web-app-dev',
    slug: 'web-application-development',
    title: 'Web & Application Development',
    shortTitle: 'Web & Apps',
    tagline: 'Fast, accessible, responsive web applications and AI-enabled digital interfaces.',
    shortDescription:
      'Craft modern web platforms, SaaS interfaces, and interactive customer portals engineered for speed and clarity.',
    overview:
      'First impressions and daily usability depend on frontend craftsmanship. We build responsive, WCAG-conscious web applications with thoughtful information architecture, crisp visual design, and smooth performance across devices.',
    icon: 'Globe',
    capabilities: [
      'Modern React and TypeScript single-page and SSR apps',
      'Responsive design systems and component libraries',
      'Interactive data visualization and AI workspaces',
      'Performance optimization and accessibility compliance',
    ],
    whatWeBuild: [
      {
        title: 'SaaS Product Frontends',
        description: 'Multi-view web applications with fast filtering, keyboard navigation, and clean state management.',
      },
      {
        title: 'Interactive AI Interfaces',
        description: 'Streaming chat, canvas editors, and human-review UIs built specifically for AI workflows.',
      },
      {
        title: 'Design Systems',
        description: 'Reusable component libraries and tokens ensuring visual consistency across product teams.',
      },
      {
        title: 'High-Converting Web Platforms',
        description: 'Fast-loading corporate and product sites engineered with semantic HTML and clean SEO structure.',
      },
    ],
    useCases: [
      'Launching a new AI-powered SaaS product interface',
      'Rebuilding slow legacy portals into modern React apps',
      'Creating interactive analytics and reporting dashboards',
      'Establishing a scalable frontend component library',
    ],
    process: [
      { step: 'UX Architecture', description: 'Map user journeys, navigation hierarchy, and responsive breakpoints.' },
      { step: 'UI Design System', description: 'Define typography, color contrast, spacing, and component states.' },
      { step: 'Frontend Engineering', description: 'Build modular, accessible components integrated with backend APIs.' },
      { step: 'QA & Launch', description: 'Verify cross-browser behavior, keyboard access, and Core Web Vitals.' },
    ],
    proposedTechnologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Cloudflare'],
    faqs: [
      {
        question: 'Do your web applications support mobile and tablet viewports?',
        answer: 'Yes. Every interface is designed mobile-first and tested across phones, tablets, laptops, and wide desktop screens.',
      },
    ],
  },
  {
    id: 'enterprise-ai',
    slug: 'enterprise-ai-solutions',
    title: 'Enterprise AI Solutions',
    shortTitle: 'Enterprise AI',
    tagline: 'Governed, scalable AI infrastructure built for security, auditability, and cross-team adoption.',
    shortDescription:
      'Deploy organization-wide AI gateways, private knowledge assistants, and governance controls tailored for enterprise standards.',
    overview:
      'Scaling AI beyond isolated experiments requires centralized governance, identity integration, cost visibility, and reliable access control. We help organizations establish secure AI foundations across departments.',
    icon: 'Building2',
    capabilities: [
      'Private RAG over permission-aware corporate repositories',
      'Centralized model routing, usage quotas, and audit logging',
      'SSO / RBAC access control alignment',
      'Deployment within private cloud or hybrid environments',
    ],
    whatWeBuild: [
      {
        title: 'Permission-Aware Knowledge Hubs',
        description: 'Enterprise search and Q&A that respects document-level user permissions.',
      },
      {
        title: 'Internal AI Gateways',
        description: 'Unified proxies managing model selection, PII redaction hooks, and department cost tracking.',
      },
      {
        title: 'Compliance Review Assistants',
        description: 'Tools that cross-check internal policy documents and flag missing clauses for legal or risk teams.',
      },
      {
        title: 'Governance Playbooks',
        description: 'Technical documentation, evaluation benchmarks, and operational runbooks for IT teams.',
      },
    ],
    useCases: [
      'Company-wide secure internal AI workspace',
      'Departmental knowledge search across SharePoint, Drive, and Confluence',
      'Policy and compliance document pre-screening',
      'Centralized LLM observability and spend governance',
    ],
    process: [
      { step: 'Security & Readiness Review', description: 'Align with IT, security, and compliance requirements upfront.' },
      { step: 'Pilot Environment', description: 'Deploy a scoped proof-of-architecture with a target business unit.' },
      { step: 'Governance Hardening', description: 'Integrate SSO, logging, rate limits, and evaluation checks.' },
      { step: 'Organization Rollout', description: 'Support team onboarding and continuous monitoring.' },
    ],
    proposedTechnologies: ['AWS / Azure / GCP', 'Python', 'FastAPI', 'PostgreSQL', 'Enterprise SSO / OIDC', 'Vector Stores'],
    faqs: [
      {
        question: 'Can enterprise solutions enforce existing document permissions?',
        answer: 'Yes. Retrieval pipelines filter indexed chunks against user group and ACL metadata before passing context to any model.',
      },
    ],
  },
  {
    id: 'conversational-ai',
    slug: 'ai-chatbots-conversational-ai',
    title: 'AI Chatbots & Conversational AI',
    shortTitle: 'Conversational AI',
    tagline: 'Context-aware virtual assistants that resolve inquiries accurately and escalate smoothly.',
    shortDescription:
      'Build intelligent web, messaging, and internal support assistants grounded in verified documentation with seamless human handoff.',
    overview:
      'Effective conversational interfaces go beyond scripted trees while avoiding ungrounded answers. We engineer assistants grounded in your verified knowledge base, connected to live booking or ticket APIs, and designed to escalate cleanly to human agents.',
    icon: 'MessageSquareCode',
    capabilities: [
      'Knowledge-grounded Q&A with source citations',
      'Guided workflows for booking, intake, and troubleshooting',
      'Context-preserving human agent handoff',
      'Multi-channel web widget and messaging integration',
    ],
    whatWeBuild: [
      {
        title: 'Customer Support Assistants',
        description: 'Web and portal assistants that answer product questions from verified help docs and create support tickets.',
      },
      {
        title: 'Lead Qualification Concierges',
        description: 'Conversational intake flows that gather project requirements and route leads appropriately.',
      },
      {
        title: 'Internal HR & IT Helpdesks',
        description: 'Employee assistants for policy lookup, onboarding checklists, and IT troubleshooting.',
      },
      {
        title: 'Conversation Analytics Views',
        description: 'Dashboards highlighting unanswered topics and documentation gaps.',
      },
    ],
    useCases: [
      '24/7 customer FAQ resolution with grounded answers',
      'Guided appointment or consultation scheduling',
      'Internal employee policy and benefits lookup',
      'Structured pre-sales requirement gathering',
    ],
    process: [
      { step: 'Intent & Knowledge Audit', description: 'Review common questions, tone guidelines, and source documents.' },
      { step: 'Grounded Assistant Build', description: 'Configure retrieval, citation formatting, and fallback rules.' },
      { step: 'Escalation Integration', description: 'Connect ticket creation, CRM logging, or live agent handoff.' },
      { step: 'Transcript Review', description: 'Refine knowledge coverage based on real usage patterns.' },
    ],
    proposedTechnologies: ['TypeScript', 'React', 'Python', 'Retrieval APIs', 'Webhook Integrations', 'PostgreSQL'],
    faqs: [
      {
        question: 'How do you keep the chatbot from making up answers?',
        answer: 'We constrain responses to retrieved documentation snippets, configure strict fallback responses when confidence is low, and surface source references.',
      },
    ],
  },
  {
    id: 'cloud-tech',
    slug: 'cloud-technology-solutions',
    title: 'Cloud & Technology Solutions',
    shortTitle: 'Cloud & Tech',
    tagline: 'Resilient cloud architecture, automated deployment pipelines, and scalable data foundations.',
    shortDescription:
      'Architect secure cloud infrastructure, containerized workloads, and automated CI/CD pipelines ready for AI and modern web scale.',
    overview:
      'Modern AI and software products rely on dependable infrastructure underneath. We design clean cloud topologies, infrastructure-as-code setups, and observability stacks so deployments stay repeatable and predictable.',
    icon: 'CloudCog',
    capabilities: [
      'Cloud architecture design across AWS, Azure, and GCP',
      'Infrastructure as Code and reproducible environments',
      'Containerization, serverless APIs, and edge routing',
      'Observability, alerting, and cost-optimization reviews',
    ],
    whatWeBuild: [
      {
        title: 'Scalable API Backends',
        description: 'Containerized or serverless API clusters configured for high availability and clean autoscaling.',
      },
      {
        title: 'Automated CI/CD Pipelines',
        description: 'Build, test, security-scan, and zero-downtime deployment workflows.',
      },
      {
        title: 'Data & Storage Foundations',
        description: 'Structured relational databases, object storage pipelines, and automated backup policies.',
      },
      {
        title: 'Edge & CDN Accelerators',
        description: 'Global edge caching, DNS routing, and security rules for fast web delivery.',
      },
    ],
    useCases: [
      'Migrating manual server deployments to automated CI/CD',
      'Setting up isolated staging and production cloud environments',
      'Deploying GPU or container workloads for ML inference',
      'Improving cloud reliability, backups, and monitoring',
    ],
    process: [
      { step: 'Infrastructure Assessment', description: 'Review current workloads, bottlenecks, and security posture.' },
      { step: 'Topology Blueprint', description: 'Design network boundaries, storage tiers, and deployment flows.' },
      { step: 'IaC Implementation', description: 'Codify infrastructure cleanly for repeatable provisioning.' },
      { step: 'Monitoring & Handover', description: 'Configure logs, alerts, and team runbooks.' },
    ],
    proposedTechnologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Cloudflare', 'Docker', 'GitHub Actions'],
    faqs: [
      {
        question: 'Can you work inside our existing cloud provider account?',
        answer: 'Yes. We design and deploy directly inside your AWS, Azure, or Google Cloud organization with clear IAM roles.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
