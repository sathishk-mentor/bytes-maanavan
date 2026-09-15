import Link from 'next/link';
import { ArrowRight, Blocks, Bot, Box, Braces, BriefcaseBusiness, Bug, Clock3, Code2, Container, Database, FileText, Gauge, GitPullRequestArrow, HardDrive, MessageSquareText, Network, Rocket, Search, ShieldCheck, Workflow, Wrench } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

const cardVisuals = {
  '62-how-developers-use-ai-tools': { icon: Bot, label: 'Copilot Foundations', tone: 'blue' },
  '63-api-first-thinking': { icon: Braces, label: 'Context Engineering', tone: 'teal' },
  '66-ai-assisted-coding-workflow': { icon: GitPullRequestArrow, label: 'Feature Workflow', tone: 'indigo' },
  '64-debugging-ai-generated-code': { icon: Bug, label: 'Debug & Test', tone: 'violet' },
  '75-secure-ai-coding': { icon: ShieldCheck, label: 'Responsible Coding', tone: 'emerald' },
  '01-github-copilot-for-developers': { icon: Bot, label: 'Copilot Foundations', tone: 'blue' },
  '02-give-github-copilot-better-context': { icon: Braces, label: 'Context Engineering', tone: 'teal' },
  '03-debug-test-refactor-with-github-copilot': { icon: Bug, label: 'Debug & Test', tone: 'violet' },
  '04-build-feature-with-github-copilot': { icon: GitPullRequestArrow, label: 'Feature Workflow', tone: 'indigo' },
  '05-use-github-copilot-responsibly': { icon: ShieldCheck, label: 'Responsible Coding', tone: 'emerald' },
  '01-what-does-a-forward-deployed-engineer-do': { icon: BriefcaseBusiness, label: 'FDE Foundations', tone: 'violet' },
  '02-problem-discovery-and-workflow-mapping': { icon: Search, label: 'Problem Discovery', tone: 'teal' },
  '03-design-thin-production-slice': { icon: Network, label: 'Solution Architecture', tone: 'indigo' },
  '04-deploy-observe-and-improve': { icon: Gauge, label: 'Production Learning', tone: 'emerald' },
  '05-turn-field-learning-into-product': { icon: Blocks, label: 'Product Loop', tone: 'blue' },
  '01-what-is-docker-containers-explained': { icon: Container, label: 'Docker Foundations', tone: 'blue' },
  '02-dockerize-first-python-application': { icon: Box, label: 'Build an Image', tone: 'teal' },
  '03-docker-ports-volumes-environment-variables': { icon: HardDrive, label: 'Container Runtime', tone: 'indigo' },
  '04-multi-container-applications-docker-compose': { icon: Network, label: 'Docker Compose', tone: 'violet' },
  '05-dockerize-deploy-generative-ai-application': { icon: Rocket, label: 'AI Deployment', tone: 'emerald' },
  '01-what-is-langchain-build-llm-applications': { icon: Network, label: 'LangChain Foundations', tone: 'emerald' },
  '02-connect-python-with-llms-using-langchain': { icon: MessageSquareText, label: 'Models & Messages', tone: 'teal' },
  '03-build-rag-applications-with-your-documents': { icon: FileText, label: 'RAG Architecture', tone: 'blue' },
  '04-build-ai-agents-with-tools-and-memory': { icon: Wrench, label: 'Agents & Tools', tone: 'violet' },
  '05-production-ready-langchain-application': { icon: ShieldCheck, label: 'Production AI', tone: 'indigo' },
  '01-what-is-an-ai-agent-from-answering-to-taking-action': { icon: Bot, label: 'Agent Foundations', tone: 'violet' },
  'what-is-mongodb-documents-collections-databases': { icon: Database, label: 'MongoDB Foundations', tone: 'emerald' },
  'mongodb-data-modeling-embedding-vs-referencing': { icon: Blocks, label: 'Document Modeling', tone: 'teal' },
  'mongodb-queries-updates-aggregation-pipeline': { icon: Gauge, label: 'Query & Aggregation', tone: 'blue' },
  'mongodb-python-fastapi-ai-application': { icon: Network, label: 'AI App Integration', tone: 'violet' },
  'production-mongodb-indexing-security-deployment': { icon: ShieldCheck, label: 'Production MongoDB', tone: 'indigo' },
  'python-foundations-for-ai-applications': { icon: Code2, label: 'Python Foundations', tone: 'blue' },
  'python-apis-json-llm-responses': { icon: Braces, label: 'APIs & JSON', tone: 'teal' },
  'build-generative-ai-application-python': { icon: MessageSquareText, label: 'GenAI Application', tone: 'violet' },
  'build-ai-agents-tools-memory-python': { icon: Wrench, label: 'Agents & Tools', tone: 'emerald' },
  'test-secure-deploy-python-ai-applications': { icon: ShieldCheck, label: 'Production AI', tone: 'indigo' },
} as const;

export function ByteLibraryCard({ chapter, chapterNumber }: { chapter: ByteMetadata; chapterNumber: number }) {
  const visual = cardVisuals[chapter.slug as keyof typeof cardVisuals] || { icon: Workflow, label: 'Technology Guide', tone: 'blue' };
  const Icon = visual.icon;
  const isFde = chapter.category === 'forward-deployed-engineer';
  const isDocker = chapter.category === 'cloud-devops';
  const isLangChain = chapter.category === 'langchain';
  const isAgent = chapter.category === 'ai-agents';
  const isMongoDB = chapter.category === 'mongodb';
  const isPythonAI = chapter.category === 'python-genai-agentic-ai';
  const category = isPythonAI ? 'Python & AI Engineering' : isMongoDB ? 'Database & AI Engineering' : isFde ? 'Technology Careers' : isDocker ? 'Cloud & DevOps' : isLangChain || isAgent ? 'Generative AI & Agents' : 'Software Engineering';
  const handbook = isPythonAI ? 'Python for GenAI & Agents' : isMongoDB ? 'MongoDB for AI Handbook' : isFde ? 'FDE Handbook' : isDocker ? 'Docker Handbook' : isLangChain ? 'LangChain Handbook' : isAgent ? 'AI Agents Handbook' : 'GitHub Copilot Handbook';

  return <Link className={`library-byte-card tone-${visual.tone}`} href={`/${chapter.category}/${chapter.slug}/`}>
    <div className="byte-card-cover"><span>MAANAVAN BYTE</span><Icon/><i>BYTE {String(chapterNumber).padStart(2, '0')}</i></div>
    <div className="byte-card-title-tab"><span><Icon/></span><div><small>{category}</small><strong>{visual.label}</strong></div></div>
    <div className="byte-card-body">
      <div className="byte-card-meta"><i>{chapter.level}</i><i><Clock3/>{chapter.duration}</i></div>
      <h3>{chapter.title}</h3>
      <p className="byte-card-description">{chapter.summary}</p>
      <small className="byte-card-handbook">{handbook}</small>
    </div>
    <footer><b>Start Learning <ArrowRight/></b></footer>
  </Link>;
}
