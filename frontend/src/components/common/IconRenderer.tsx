import {
  Bot,
  BrainCircuit,
  Workflow,
  Code2,
  Globe,
  Building2,
  MessageSquareCode,
  CloudCog,
  Stethoscope,
  Landmark,
  Factory,
  ShoppingBag,
  GraduationCap,
  Building,
  Truck,
  Layers,
  Search,
  Database,
  Zap,
  Headphones,
  BarChart3,
  Cpu,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { IconName } from '../../types';

const ICON_MAP = {
  Bot,
  BrainCircuit,
  Workflow,
  Code2,
  Globe,
  Building2,
  MessageSquareCode,
  CloudCog,
  Stethoscope,
  Landmark,
  Factory,
  ShoppingBag,
  GraduationCap,
  Building,
  Truck,
  Layers,
  Search,
  Database,
  Zap,
  Headphones,
  BarChart3,
  Cpu,
  ShieldCheck,
  Sparkles,
};

interface IconRendererProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function IconRenderer({ name, className = 'w-5 h-5', strokeWidth = 1.75 }: IconRendererProps) {
  const Icon = ICON_MAP[name] || Cpu;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
