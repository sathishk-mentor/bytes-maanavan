import { Category } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'genai', title: 'Generative AI', description: 'Understand LLMs, prompting, RAG and practical AI applications.', icon: 'Sparkles', color: 'cyan', order: 1, heroLine: 'From your first prompt to production-ready AI thinking' },
  { slug: 'ai-agents', title: 'AI Agents', description: 'Design agents that reason, use tools and complete real work.', icon: 'Bot', color: 'violet', order: 2, heroLine: 'Build reliable AI systems that can take action' },
  { slug: 'data-engineering', title: 'Data Engineering', description: 'Learn pipelines, warehouses, streaming and dependable data systems.', icon: 'Database', color: 'blue', order: 3, heroLine: 'Turn raw data into trusted, useful products' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', description: 'Ship software with cloud, containers, automation and observability.', icon: 'Cloud', color: 'green', order: 4, heroLine: 'Build, deploy and operate with confidence' },
  { slug: 'software-engineering', title: 'Software Engineering', description: 'Strengthen coding, architecture, testing and system-design skills.', icon: 'Code2', color: 'orange', order: 5, heroLine: 'Learn the engineering behind dependable software' },
  { slug: 'cybersecurity', title: 'Cybersecurity', description: 'Develop security fundamentals through threats and practical defenses.', icon: 'ShieldCheck', color: 'red', order: 6, heroLine: 'Think like an attacker and defend like an engineer' },
  { slug: 'case-studies', title: 'Real-world Case Studies', description: 'Connect concepts through architecture decisions and industry scenarios.', icon: 'BriefcaseBusiness', color: 'purple', order: 7, heroLine: 'See how technology choices work in the real world' },
];

export function getAllCategories(): Category[] { return [...CATEGORIES].sort((a, b) => a.order - b.order); }
export function getCategoryBySlug(slug: string): Category | undefined { return CATEGORIES.find((cat) => cat.slug === slug); }
export function getCategoryColor(slug: string): string { return getCategoryBySlug(slug)?.color || 'cyan'; }
export function getCategoryIcon(slug: string): string { return getCategoryBySlug(slug)?.icon || 'BookOpen'; }
