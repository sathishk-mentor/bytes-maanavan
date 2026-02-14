import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    slug: 'genai',
    title: 'Generative AI',
    description: 'Fundamentals of GenAI models and applications',
    icon: 'Sparkles',
    color: 'blue',
    order: 1,
    heroLine: 'Master the basics of AI that creates content',
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Master the art of crafting effective prompts',
    icon: 'MessageSquare',
    color: 'purple',
    order: 2,
    heroLine: 'Learn to communicate effectively with AI',
  },
  {
    slug: 'ai-agents',
    title: 'AI Agents',
    description: 'Build autonomous AI-powered assistants',
    icon: 'Bot',
    color: 'green',
    order: 3,
    heroLine: 'Create intelligent agents that take action',
  },
  {
    slug: 'api-vs-mcp',
    title: 'API vs MCP',
    description: 'Understand APIs and Model Context Protocol',
    icon: 'Cable',
    color: 'orange',
    order: 4,
    heroLine: 'Connect systems and extend AI capabilities',
  },
  {
    slug: 'cloud',
    title: 'Cloud Basics',
    description: 'Essential cloud computing concepts',
    icon: 'Cloud',
    color: 'cyan',
    order: 5,
    heroLine: 'Deploy and scale applications in the cloud',
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    description: 'Build data pipelines and infrastructure',
    icon: 'Database',
    color: 'red',
    order: 6,
    heroLine: 'Transform and move data at scale',
  },
];

export function getAllCategories(): Category[] {
  return CATEGORIES.sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(cat => cat.slug === slug);
}

export function getCategoryColor(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.color || 'blue';
}

export function getCategoryIcon(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.icon || 'BookOpen';
}
