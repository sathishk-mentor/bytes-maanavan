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
  'software-engineering': { category: 'Software Engineering', handbook: 'GitHub Copilot Handbook', accent: '#2f6fed', glow: '#8bb8ff', stages: ['Orient', 'Give context', 'Validate', 'Build', 'Ship responsibly'], icons: [Bot, Braces, ShieldCheck, GitPullRequestArrow, Rocket] },
  'forward-deployed-engineer': { category: 'Technology Careers', handbook: 'Forward Deployed Engineer', accent: '#7657d6', glow: '#c9b9ff', stages: ['Understand', 'Discover', 'Shape', 'Deliver', 'Scale learning'], icons: [BriefcaseBusiness, Search, Layers3, Gauge, Blocks] },
  'cloud-devops': { category: 'Cloud & DevOps', handbook: 'Docker Handbook', accent: '#1678c8', glow: '#87d7ff', stages: ['Understand', 'Package', 'Configure', 'Compose', 'Deploy'], icons: [Container, Box, HardDrive, Network, Rocket] },
  langchain: { category: 'Generative AI & Agents', handbook: 'LangChain Handbook', accent: '#0c8b74', glow: '#7ae8cd', stages: ['Understand', 'Connect', 'Ground', 'Orchestrate', 'Operate'], icons: [Network, MessageSquareText, FileText, Wrench, ShieldCheck] },
  'ai-agents': { category: 'Generative AI & Agents', handbook: 'AI Agents Handbook', accent: '#6b57d9', glow: '#b9afff', stages: ['Understand', 'Reason & act', 'See adoption', 'Add guardrails', 'Start building'], icons: [Bot, Workflow, BriefcaseBusiness, ShieldCheck, Rocket] },
  mongodb: { category: 'Database & AI Engineering', handbook: 'MongoDB for AI Applications', accent: '#07805c', glow: '#83e5be', stages: ['Understand', 'Model', 'Query', 'Integrate', 'Operate'], icons: [Database, Blocks, Gauge, Network, ShieldCheck] },
  'python-genai-agentic-ai': { category: 'Python & AI Engineering', handbook: 'Python for GenAI & Agents', accent: '#2672c9', glow: '#8fc9ff', stages: ['Build foundations', 'Connect APIs', 'Create GenAI', 'Build agents', 'Ship safely'], icons: [Code2, Braces, MessageSquareText, Wrench, ShieldCheck] },
  'sql-data-ai-applications': { category: 'Data & AI Engineering', handbook: 'SQL for Data & AI Applications', accent: '#176dc1', glow: '#84c7ff', stages: ['Query', 'Analyse', 'Search meaning', 'Engineer features', 'Add agents'], icons: [Database, Gauge, Search, Blocks, Bot] },
  'rag-application-engineering': { category: 'Generative AI & Knowledge', handbook: 'RAG Application Engineering', accent: '#7657d6', glow: '#ccbaff', stages: ['Understand', 'Prepare knowledge', 'Retrieve', 'Generate', 'Evaluate'], icons: [Compass, FileText, Search, MessageSquareText, Gauge] },
  'fastapi-ai-applications': { category: 'Backend & AI Engineering', handbook: 'FastAPI for AI Applications', accent: '#078a78', glow: '#7ce7d2', stages: ['Route', 'Validate', 'Stream', 'Build RAG', 'Operate'], icons: [TerminalSquare, Braces, Workflow, Network, ShieldCheck] },
  'modern-java-spring-boot-genai': { category: 'Java & Enterprise AI', handbook: 'Modern Java, Spring Boot & GenAI', accent: '#b16428', glow: '#ffc285', stages: ['Modernise', 'Build APIs', 'Connect AI', 'Orchestrate', 'Operate'], icons: [Code2, Braces, MessageSquareText, Workflow, ShieldCheck] },
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
    ['Developer intent', 'Copilot suggestion', 'Human decision'], ['Prompt', 'Context', 'Suggestion', 'Test'], ['Requirement', 'Generated code', 'Validation'], ['Task', 'Agent workspace', 'Pull request'], ['Policy', 'Review', 'Merge'],
  ],
  'forward-deployed-engineer': [
    ['Customer problem', 'Technical insight', 'Working outcome'], ['Observe', 'Ask', 'Find constraint'], ['Problem', 'Prototype', 'Feedback'], ['Build', 'Adopt', 'Measure'], ['Pattern', 'Playbook', 'Scale'],
  ],
  'cloud-devops': [
    ['Application', 'Container image', 'Same runtime'], ['Code', 'Dockerfile', 'Image', 'Container'], ['Config', 'Volume', 'Network'], ['App', 'API', 'Database'], ['Build', 'Registry', 'Deploy'],
  ],
  langchain: [
    ['User message', 'Chat model', 'Response'], ['Prompt', 'Model', 'Parser'], ['Question', 'Retriever', 'Context'], ['State', 'Tools', 'Decision'], ['Trace', 'Evaluate', 'Improve'],
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
    ['Question', 'Knowledge', 'Grounded answer'], ['Load', 'Chunk', 'Embed'], ['Query', 'Retrieve', 'Rank'], ['Context', 'Prompt', 'Answer'], ['Test set', 'Measure', 'Improve'],
  ],
  'fastapi-ai-applications': [
    ['Request', 'Route', 'Response'], ['Input', 'Pydantic', 'Validated data'], ['Request', 'Async task', 'Stream'], ['Question', 'RAG service', 'Answer'], ['Secure', 'Observe', 'Scale'],
  ],
  'modern-java-spring-boot-genai': [
    ['Controller', 'Service', 'Repository'], ['Request', 'Spring API', 'Response'], ['Prompt', 'Spring AI', 'Model'], ['Goal', 'Tool call', 'Result'], ['Secure', 'Observe', 'Operate'],
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
