import Link from 'next/link';
import { ArrowRight, Blocks, Bot, Braces, BriefcaseBusiness, Bug, Clock3, Gauge, GitPullRequestArrow, Network, Search, ShieldCheck, Workflow } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

const cardVisuals = {
  '62-how-developers-use-ai-tools': { icon: Bot, label: 'Copilot Foundations', tone: 'blue' },
  '63-api-first-thinking': { icon: Braces, label: 'Context Engineering', tone: 'teal' },
  '66-ai-assisted-coding-workflow': { icon: GitPullRequestArrow, label: 'Feature Workflow', tone: 'indigo' },
  '64-debugging-ai-generated-code': { icon: Bug, label: 'Debug & Test', tone: 'violet' },
  '75-secure-ai-coding': { icon: ShieldCheck, label: 'Responsible Coding', tone: 'emerald' },
  '01-what-does-a-forward-deployed-engineer-do': { icon: BriefcaseBusiness, label: 'FDE Foundations', tone: 'violet' },
  '02-problem-discovery-and-workflow-mapping': { icon: Search, label: 'Problem Discovery', tone: 'teal' },
  '03-design-thin-production-slice': { icon: Network, label: 'Solution Architecture', tone: 'indigo' },
  '04-deploy-observe-and-improve': { icon: Gauge, label: 'Production Learning', tone: 'emerald' },
  '05-turn-field-learning-into-product': { icon: Blocks, label: 'Product Loop', tone: 'blue' },
} as const;

export function ByteLibraryCard({ chapter, chapterNumber }: { chapter: ByteMetadata; chapterNumber: number }) {
  const visual = cardVisuals[chapter.slug as keyof typeof cardVisuals] || { icon: Workflow, label: 'Technology Guide', tone: 'blue' };
  const Icon = visual.icon;
  const isFde = chapter.category === 'forward-deployed-engineer';
  const category = isFde ? 'Technology Careers' : 'Software Engineering';
  const handbook = isFde ? 'FDE Handbook' : 'GitHub Copilot Handbook';

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
