import { Category } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'genai', title: 'Generative AI', description: 'Understand LLMs, prompting, RAG and practical AI applications.', icon: 'Sparkles', color: 'cyan', order: 1, heroLine: 'From your first prompt to production-ready AI thinking' },
  { slug: 'ai-agents', title: 'AI Agents', description: 'Design agents that reason, use tools and complete real work.', icon: 'Bot', color: 'violet', order: 2, heroLine: 'Build reliable AI systems that can take action' },
  { slug: 'data-engineering', title: 'Data Engineering', description: 'Learn pipelines, warehouses, streaming and dependable data systems.', icon: 'Database', color: 'blue', order: 3, heroLine: 'Turn raw data into trusted, useful products' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', description: 'Ship software with cloud, containers, automation and observability.', icon: 'Cloud', color: 'green', order: 4, heroLine: 'Build, deploy and operate with confidence' },
  { slug: 'langchain', title: 'LangChain for GenAI and AI Agents', description: 'Build practical LLM, RAG and agentic AI applications with Python.', icon: 'Network', color: 'green', order: 5, heroLine: 'From model calls to observable AI applications' },
  { slug: 'software-engineering', title: 'The GitHub Copilot Handbook', description: 'Use GitHub Copilot across context, feature delivery, debugging, testing and responsible review.', icon: 'Code2', color: 'orange', order: 6, heroLine: 'From code suggestions to disciplined agent-assisted engineering' },
  { slug: 'forward-deployed-engineer', title: 'The Forward Deployed Engineer Handbook', description: 'Move from customer ambiguity to production systems, adoption and reusable product learning.', icon: 'Workflow', color: 'violet', order: 7, heroLine: 'Bridge customer reality, engineering delivery and measurable outcomes' },
  { slug: 'cybersecurity', title: 'Cybersecurity', description: 'Develop security fundamentals through threats and practical defenses.', icon: 'ShieldCheck', color: 'red', order: 7, heroLine: 'Think like an attacker and defend like an engineer' },
  { slug: 'case-studies', title: 'Real-world Case Studies', description: 'Connect concepts through architecture decisions and industry scenarios.', icon: 'BriefcaseBusiness', color: 'purple', order: 8, heroLine: 'See how technology choices work in the real world' },
];

export function getAllCategories(): Category[] { return [...CATEGORIES].sort((a, b) => a.order - b.order); }
export function getCategoryBySlug(slug: string): Category | undefined { return CATEGORIES.find((cat) => cat.slug === slug); }
export function getCategoryColor(slug: string): string { return getCategoryBySlug(slug)?.color || 'cyan'; }
export function getCategoryIcon(slug: string): string { return getCategoryBySlug(slug)?.icon || 'BookOpen'; }
