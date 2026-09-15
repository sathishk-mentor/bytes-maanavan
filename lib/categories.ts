import { Category } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'genai', title: 'Generative AI', description: 'Understand LLMs, prompting, RAG and practical AI applications.', icon: 'Sparkles', color: 'cyan', order: 1, heroLine: 'From your first prompt to production-ready AI thinking' },
  { slug: 'ai-agents', title: 'AI Agents', description: 'Design agents that reason, use tools and complete real work.', icon: 'Bot', color: 'violet', order: 2, heroLine: 'Build reliable AI systems that can take action' },
  { slug: 'data-engineering', title: 'Data Engineering', description: 'Learn pipelines, warehouses, streaming and dependable data systems.', icon: 'Database', color: 'blue', order: 3, heroLine: 'Turn raw data into trusted, useful products' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', description: 'Ship software with cloud, containers, automation and observability.', icon: 'Cloud', color: 'green', order: 4, heroLine: 'Build, deploy and operate with confidence' },
  { slug: 'langchain', title: 'LangChain for GenAI and AI Agents Handbook', description: 'Build practical LLM, RAG and agentic AI applications with Python.', icon: 'Network', color: 'green', order: 5, heroLine: 'From model calls to observable AI applications' },
  { slug: 'rag-application-engineering', title: 'The RAG Application Engineering Handbook', description: 'Build grounded AI applications with retrieval, citations, evaluation and secure deployment.', icon: 'FileSearch', color: 'purple', order: 6, heroLine: 'From private documents to grounded, cited answers' },
  { slug: 'fastapi-ai-applications', title: 'FastAPI for AI Applications Handbook', description: 'Build, secure and deploy production-ready GenAI APIs with Python.', icon: 'Server', color: 'cyan', order: 7, heroLine: 'Turn Python AI capabilities into dependable web APIs' },
  { slug: 'modern-java-spring-boot-genai', title: 'Modern Java with Spring Boot and GenAI Handbook', description: 'Build enterprise Java applications with REST APIs, data, grounded AI and production deployment.', icon: 'Coffee', color: 'orange', order: 8, heroLine: 'From modern Java foundations to a secure enterprise AI service' },
  { slug: 'sql-data-ai-applications', title: 'SQL for Data and AI Applications Handbook', description: 'Query, analyse and safely power data, RAG and AI-agent applications with SQL.', icon: 'Database', color: 'blue', order: 9, heroLine: 'From business questions to safe, explainable data answers' },
  { slug: 'mongodb', title: 'MongoDB for AI Application Engineering Handbook', description: 'Build document data models, APIs, vector retrieval and production-ready MongoDB systems for AI applications.', icon: 'Database', color: 'green', order: 10, heroLine: 'From flexible documents to secure, grounded AI applications' },
  { slug: 'python-genai-agentic-ai', title: 'Python for GenAI and Agentic AI Handbook', description: 'Learn Python through APIs, structured LLM applications, tool-using agents, testing, security and production deployment.', icon: 'Code2', color: 'blue', order: 11, heroLine: 'From Python foundations to safe, production-ready AI agents' },
  { slug: 'software-engineering', title: 'The GitHub Copilot Handbook', description: 'Use GitHub Copilot across context, feature delivery, debugging, testing and responsible review.', icon: 'Code2', color: 'orange', order: 7, heroLine: 'From code suggestions to disciplined agent-assisted engineering' },
  { slug: 'forward-deployed-engineer', title: 'The Forward Deployed Engineer Handbook', description: 'Move from customer ambiguity to production systems, adoption and reusable product learning.', icon: 'Workflow', color: 'violet', order: 7, heroLine: 'Bridge customer reality, engineering delivery and measurable outcomes' },
  { slug: 'cybersecurity', title: 'Cybersecurity', description: 'Develop security fundamentals through threats and practical defenses.', icon: 'ShieldCheck', color: 'red', order: 7, heroLine: 'Think like an attacker and defend like an engineer' },
  { slug: 'case-studies', title: 'Real-world Case Studies', description: 'Connect concepts through architecture decisions and industry scenarios.', icon: 'BriefcaseBusiness', color: 'purple', order: 8, heroLine: 'See how technology choices work in the real world' },
];

export function getAllCategories(): Category[] { return [...CATEGORIES].sort((a, b) => a.order - b.order); }
export function getCategoryBySlug(slug: string): Category | undefined { return CATEGORIES.find((cat) => cat.slug === slug); }
export function getCategoryColor(slug: string): string { return getCategoryBySlug(slug)?.color || 'cyan'; }
export function getCategoryIcon(slug: string): string { return getCategoryBySlug(slug)?.icon || 'BookOpen'; }
