import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, Blocks, Bot, Box, Braces, BriefcaseBusiness, Clock3, Code2, Compass,
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

export function ByteLibraryCard({ chapter, chapterNumber, totalChapters = 5 }: { chapter: ByteMetadata; chapterNumber: number; totalChapters?: number }) {
  const profile = journeyProfiles[chapter.category as keyof typeof journeyProfiles] ?? defaultProfile;
  const safeIndex = Math.max(0, Math.min(chapterNumber - 1, profile.stages.length - 1));
  const Icon = profile.icons[safeIndex];
  const cardStyle = { '--path-accent': profile.accent, '--path-glow': profile.glow, '--path-index': chapterNumber - 1 } as CSSProperties;

  return <Link className={`library-byte-card journey-byte-card journey-scene-${safeIndex + 1}`} href={`/${chapter.category}/${chapter.slug}/`} style={cardStyle} aria-label={`Byte ${chapterNumber}: ${chapter.title}`}>
    <span className="journey-connector" aria-hidden="true"><i/></span>
    <div className="journey-card-visual" aria-hidden="true">
      <span className="journey-grid"/>
      <span className="journey-scene-label">{profile.stages[safeIndex]}</span>
      <div className="journey-scene">
        {safeIndex === 0 && <div className="scene-ui scene-ui-concept"><span className="scene-icon"><Icon/></span><div><small>CORE CONCEPT</small><strong>{profile.stages[safeIndex]}</strong><i>Build the mental model</i></div><b>01</b></div>}
        {safeIndex === 1 && <div className="scene-ui scene-ui-flow"><header><span><Icon/>WORKFLOW</span><i>ACTIVE</i></header><div><b>Input</b><em>→</em><b>Decide</b><em>→</em><b>Act</b></div><footer><span/><span/><span/></footer></div>}
        {safeIndex === 2 && <div className="scene-ui scene-ui-evidence"><header><span><Icon/>REAL-WORLD VIEW</span><i>LIVE</i></header><div className="scene-bars"><span/><span/><span/><span/></div><footer><b>Evidence</b><b>Pattern</b><b>Decision</b></footer></div>}
        {safeIndex === 3 && <div className="scene-ui scene-ui-guard"><span className="scene-shield"><Icon/></span><div><small>CONTROL GATE</small><strong>Review required</strong><i><b/>Permission checked</i><i><b/>Human approval</i></div></div>}
        {safeIndex >= 4 && <div className="scene-ui scene-ui-launch"><div className="scene-launch-ring"><Icon/><span>READY</span></div><div><small>PRACTICAL OUTCOME</small><strong>{profile.stages[safeIndex]}</strong><i>Measured · reviewed · ready</i></div></div>}
      </div>
      <b>{String(chapterNumber).padStart(2, '0')}</b>
    </div>
    <div className="journey-card-content">
      <header className="journey-card-header">
        <span><small>BYTE</small><b>{String(chapterNumber).padStart(2, '0')}</b></span>
        <div><small>{profile.category}</small><strong>{profile.stages[safeIndex]}</strong></div>
        <i>{chapterNumber} / {totalChapters}</i>
      </header>
      <div className="journey-card-copy">
        <div className="journey-card-meta"><span>{chapter.level}</span><span><Clock3/>{chapter.duration}</span></div>
        <h3>{chapter.title}</h3><p>{chapter.summary}</p>
      </div>
      <footer><span><Sparkles/>{profile.handbook}</span><b>Open Byte <ArrowUpRight/></b></footer>
    </div>
  </Link>;
}
