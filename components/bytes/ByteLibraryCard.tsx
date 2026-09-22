import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, Blocks, Bot, Box, Braces, BriefcaseBusiness, CheckCircle2, Code2, Compass,
  Container, Database, FileText, Gauge, GitPullRequestArrow, HardDrive, Layers3,
  MessageSquareText, Network, Rocket, Search, ShieldCheck, Sparkles, TerminalSquare,
  Workflow, Wrench,
} from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

const journeyProfiles = {
  'software-engineering': { category: 'Software Engineering', handbook: 'GitHub Copilot Handbook', accent: '#2f6fed', glow: '#8bb8ff', stages: ['Understand Copilot', 'Work with context', 'Prompt well', 'Use agent mode', 'Review & govern'], icons: [Bot, MessageSquareText, Braces, GitPullRequestArrow, ShieldCheck] },
  'forward-deployed-engineer': { category: 'Technology Careers', handbook: 'Forward Deployed Engineer', accent: '#7657d6', glow: '#c9b9ff', stages: ['Understand the role', 'Build the skillset', 'Run the engagement', 'Earn customer trust', 'Grow the career'], icons: [BriefcaseBusiness, Blocks, Layers3, ShieldCheck, Rocket] },
  'cloud-devops': { category: 'Cloud & DevOps', handbook: 'Docker Handbook', accent: '#1678c8', glow: '#87d7ff', stages: ['Understand Docker', 'Build an image', 'Configure runtime', 'Compose services', 'Deploy an AI app'], icons: [Container, Box, HardDrive, Network, Rocket] },
  langchain: { category: 'Generative AI & Agents', handbook: 'LangChain Handbook', accent: '#0c8b74', glow: '#7ae8cd', stages: ['Understand LangChain', 'Build chains', 'Build RAG', 'Add memory', 'Build safe agents'], icons: [Network, Workflow, FileText, MessageSquareText, ShieldCheck] },
  'ai-agents': { category: 'Generative AI & Agents', handbook: 'AI Agents Handbook', accent: '#6b57d9', glow: '#b9afff', stages: ['Understand', 'Reason & act', 'See adoption', 'Add guardrails', 'Start building'], icons: [Bot, Workflow, BriefcaseBusiness, ShieldCheck, Rocket] },
  mongodb: { category: 'Database & AI Engineering', handbook: 'MongoDB for AI Applications', accent: '#07805c', glow: '#83e5be', stages: ['Understand MongoDB', 'Model documents', 'Query data', 'Connect applications', 'Run production'], icons: [Database, Blocks, Search, Network, ShieldCheck] },
  'python-genai-agentic-ai': { category: 'Python & AI Engineering', handbook: 'Python for GenAI & Agents', accent: '#2672c9', glow: '#8fc9ff', stages: ['Build foundations', 'Connect APIs', 'Create GenAI', 'Build agents', 'Ship safely'], icons: [Code2, Braces, MessageSquareText, Wrench, ShieldCheck] },
  'sql-data-ai-applications': { category: 'Data & AI Engineering', handbook: 'SQL for Data & AI Applications', accent: '#176dc1', glow: '#84c7ff', stages: ['Query data', 'Analyse data', 'Search vectors', 'Engineer features', 'Use AI agents'], icons: [Database, Gauge, Search, Blocks, Bot] },
  'rag-application-engineering': { category: 'Generative AI & Knowledge', handbook: 'RAG Application Engineering', accent: '#7657d6', glow: '#ccbaff', stages: ['Understand RAG', 'Follow the pipeline', 'Diagnose failures', 'Improve quality', 'Run production'], icons: [Compass, Workflow, Search, Gauge, ShieldCheck] },
  'fastapi-ai-applications': { category: 'Backend & AI Engineering', handbook: 'FastAPI for AI Applications', accent: '#078a78', glow: '#7ce7d2', stages: ['Understand FastAPI', 'Validate APIs', 'Connect services', 'Stream GenAI', 'Run production'], icons: [TerminalSquare, Braces, Network, Workflow, ShieldCheck] },
  'modern-java-spring-boot-genai': { category: 'Java & Enterprise AI', handbook: 'Modern Java, Spring Boot & GenAI', accent: '#b16428', glow: '#ffc285', stages: ['Java + Spring Boot', 'Connect LLMs', 'Build RAG', 'Add AI agents', 'Run production'], icons: [Code2, MessageSquareText, Search, Workflow, ShieldCheck] },
} as const;

const defaultProfile = { category: 'Technology Learning', handbook: 'MaanavaN Handbook', accent: '#087f87', glow: '#7ce5e9', stages: ['Understand', 'Explore', 'Apply', 'Practise', 'Master'], icons: [Compass, Blocks, Workflow, Wrench, Rocket] } as const;

const learningVisuals: Record<string, readonly (readonly string[])[]> = {
  'ai-agents': [
    ['Chatbot|Answers', 'Copilot|Suggests', 'Agent|Plans & acts'],
    ['Goal', 'Plan', 'Use tools', 'Act', 'Check'],
    ['Support|Lower risk', 'Finance|Review first', 'Hiring|Human decides'],
    ['Request', 'Permission', 'Human approval', 'Action + log'],
    ['Identify', 'Try', 'Pilot', 'Review', 'Scale'],
  ],
  'software-engineering': [
    ['Developer', 'Copilot', 'Better code'], ['Question', 'Repository context', 'Useful answer'], ['Intent', 'Clear instruction', 'Better output'], ['Task', 'Multi-file work', 'Pull request'], ['Suggestion', 'Human review', 'Approved code'],
  ],
  'forward-deployed-engineer': [
    ['Customer problem', 'Technical solution', 'Business outcome'], ['Technical depth', 'Customer thinking', 'Commercial impact'], ['Discovery', 'Prototype', 'Production'], ['First conversation', 'Reliable delivery', 'Trusted partner'], ['Skillset', 'Experience', 'Career growth'],
  ],
  'cloud-devops': [
    ['Application', 'Container image', 'Same runtime'], ['Python code', 'Docker image', 'Running container'], ['Ports', 'Volumes', 'Runtime config'], ['App service', 'Database service', 'One Compose stack'], ['GenAI app', 'Container platform', 'Live deployment'],
  ],
  langchain: [
    ['LLM call', 'LangChain components', 'AI application'], ['Prompt', 'Chain', 'Structured result'], ['Question', 'Your documents', 'Grounded answer'], ['Message history', 'Conversation memory', 'Context-aware reply'], ['Goal', 'Tools + guardrails', 'Safe agent action'],
  ],
  mongodb: [
    ['Document', 'Collection', 'Database'], ['Access pattern', 'Embed', 'Reference'], ['Filter', 'Index', 'Result'], ['Application', 'MongoDB', 'AI service'], ['Secure', 'Monitor', 'Scale'],
  ],
  'python-genai-agentic-ai': [
    ['Value', 'Function', 'Program'], ['Request', 'API', 'JSON'], ['Prompt', 'Model', 'Response'], ['Goal', 'Tool', 'Result'], ['Test', 'Protect', 'Deploy'],
  ],
  'sql-data-ai-applications': [
    ['Table', 'Query', 'Rows'], ['Group', 'Window', 'Insight'], ['Text', 'Embedding', 'Nearest match'], ['Raw data', 'Feature', 'Model'], ['Question', 'SQL agent', 'Verified answer'],
  ],
  'rag-application-engineering': [
    ['Question', 'Trusted knowledge', 'Grounded answer'], ['User question', 'RAG pipeline', 'Cited answer'], ['Retrieval miss', 'Weak context', 'Wrong answer'], ['Test question', 'Quality score', 'Improved RAG'], ['Prototype', 'Scale + governance', 'Production RAG'],
  ],
  'fastapi-ai-applications': [
    ['Python function', 'FastAPI route', 'Web API'], ['Client input', 'Pydantic validation', 'Safe response'], ['API request', 'Database + service', 'Connected result'], ['AI prompt', 'Async generation', 'Streamed tokens'], ['Local API', 'Security + tests', 'Production API'],
  ],
  'modern-java-spring-boot-genai': [
    ['Java code', 'Spring Boot', 'AI-ready service'], ['Spring application', 'Spring AI', 'LLM response'], ['Question', 'Enterprise knowledge', 'Grounded answer'], ['User goal', 'Java tool call', 'Checked action'], ['Prototype', 'Secure operations', 'Production service'],
  ],
};

export function ByteLibraryCard({ chapter, chapterNumber, totalChapters = 5 }: { chapter: ByteMetadata; chapterNumber: number; totalChapters?: number }) {
  const profile = journeyProfiles[chapter.category as keyof typeof journeyProfiles] ?? defaultProfile;
  const safeIndex = Math.max(0, Math.min(chapterNumber - 1, profile.stages.length - 1));
  const Icon = profile.icons[safeIndex];
  const visualSteps = learningVisuals[chapter.category]?.[safeIndex] ?? [profile.stages[safeIndex], 'Practise', 'Apply'];
  const coverStart = visualSteps[0].split('|')[0];
  const coverEnd = visualSteps[visualSteps.length - 1].split('|')[0];
  const outcomes = ['Build a clear foundation', 'Follow the working process', 'Connect the concept to practice', 'Recognise risks and controls', 'Apply it with confidence'];
  const cardStyle = { '--path-accent': profile.accent, '--path-glow': profile.glow, '--path-index': chapterNumber - 1 } as CSSProperties;

  return <Link className={`library-byte-card journey-byte-card journey-scene-${safeIndex + 1}`} href={`/${chapter.category}/${chapter.slug}/`} target="_blank" rel="noopener noreferrer" style={cardStyle} aria-label={`Byte ${chapterNumber}: ${chapter.title}`}>
    <span className="journey-connector" aria-hidden="true"><i/></span>
    <div className="journey-card-visual" aria-hidden="true">
      <span className="journey-grid"/>
      <span className="journey-scene-label">BYTE {String(chapterNumber).padStart(2, '0')}</span>
      <div className="journey-scene">
        <div className="scene-ui scene-ui-cover">
          <span className="scene-cover-icon"><Icon/></span>
          <div><small>{profile.category}</small><strong>{profile.stages[safeIndex]}</strong><p><span>{coverStart}</span><i>→</i><span>{coverEnd}</span></p></div>
          <footer><span>LEARNING STEP</span><b>{String(chapterNumber).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}</b></footer>
        </div>
      </div>
      <b>{String(chapterNumber).padStart(2, '0')}</b>
    </div>
    <div className="journey-card-content">
      <header className="journey-card-header">
        <div><small>BYTE {String(chapterNumber).padStart(2, '0')} OF {String(totalChapters).padStart(2, '0')} · {profile.category}</small><strong>{profile.stages[safeIndex]}</strong></div>
        <i>{chapter.level} · {chapter.duration}</i>
      </header>
      <div className="journey-card-copy">
        <h3>{chapter.title}</h3><p>{chapter.summary}</p>
        <div className="journey-card-outcome"><CheckCircle2/><div><span>AFTER THIS BYTE</span><strong>{outcomes[safeIndex]}</strong></div></div>
      </div>
      <footer><span><Sparkles/>{profile.handbook}</span><b>Start this Byte <ArrowUpRight/></b></footer>
    </div>
  </Link>;
}
