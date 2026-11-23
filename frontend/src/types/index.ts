export type IconName =
  | 'Bot'
  | 'BrainCircuit'
  | 'Workflow'
  | 'Code2'
  | 'Globe'
  | 'Building2'
  | 'MessageSquareCode'
  | 'CloudCog'
  | 'Stethoscope'
  | 'Landmark'
  | 'Factory'
  | 'ShoppingBag'
  | 'GraduationCap'
  | 'Building'
  | 'Truck'
  | 'Layers'
  | 'Search'
  | 'Database'
  | 'Zap'
  | 'Headphones'
  | 'BarChart3'
  | 'Cpu'
  | 'ShieldCheck'
  | 'Sparkles';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  icon: IconName;
  featured?: boolean;
  capabilities: string[];
  whatWeBuild: { title: string; description: string }[];
  useCases: string[];
  process: { step: string; description: string }[];
  proposedTechnologies: string[];
  faqs: { question: string; answer: string }[];
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  icon: IconName;
  accentTone: string;
  challenges: string[];
  potentialApplications: string[];
  recommendedServices: string[];
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  mockupType: 'agent-console' | 'workflow-studio' | 'insights-dashboard';
  architectureNotes: string[];
  intendedUsers: string[];
}

export type ProjectCategory =
  | 'Agentic AI'
  | 'AI & ML'
  | 'Automation'
  | 'Web Applications'
  | 'Enterprise Solutions';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  shortDescription: string;
  techStack: string[];
  coverVariant: number;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  implementationApproach: string[];
  keyFeatures: string[];
  intendedOutcomes: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  coverVariant: number;
  author: string;
  sections: { heading: string; body: string[] }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  role: string;
  organization: string;
}

export interface TechCategory {
  id: string;
  label: string;
  description: string;
  items: { name: string; role: string }[];
}

export interface NavItem {
  label: string;
  path: string;
  hasMegaMenu?: 'services' | 'solutions';
}
