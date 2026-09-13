import Link from 'next/link';
import {
  Blocks, Bot, Braces, BriefcaseBusiness, Bug, CheckCircle2, ChevronRight, Clock3, Code2,
  FileCode2, Gauge, GitPullRequestArrow, Network, Rocket, ScanSearch, Search, ShieldCheck, Sparkles, TestTube2, Users,
} from 'lucide-react';
import { ByteMetadata } from '@/lib/types';
import { getCategoryBySlug } from '@/lib/categories';

const handbookHeroes = {
  '62-how-developers-use-ai-tools': { label: 'COPILOT WORKFLOW', icon: Bot, steps: [[FileCode2, 'Your context'], [Sparkles, 'Copilot suggests'], [ScanSearch, 'You inspect'], [CheckCircle2, 'You decide']] },
  '63-api-first-thinking': { label: 'CONTEXT ENGINE', icon: Braces, steps: [[FileCode2, 'Instructions'], [Code2, 'Open files'], [Braces, 'Codebase context'], [Sparkles, 'Grounded answer']] },
  '66-ai-assisted-coding-workflow': { label: 'FEATURE DELIVERY', icon: GitPullRequestArrow, steps: [[FileCode2, 'Define task'], [Sparkles, 'Generate change'], [TestTube2, 'Run checks'], [GitPullRequestArrow, 'Review diff']] },
  '64-debugging-ai-generated-code': { label: 'DEBUGGING LOOP', icon: Bug, steps: [[Bug, 'Reproduce'], [ScanSearch, 'Collect evidence'], [Sparkles, 'Test hypothesis'], [CheckCircle2, 'Verify fix']] },
  '75-secure-ai-coding': { label: 'TRUST GATE', icon: ShieldCheck, steps: [[Sparkles, 'AI output'], [ScanSearch, 'Security review'], [TestTube2, 'Automated tests'], [ShieldCheck, 'Human approval']] },
  '01-what-does-a-forward-deployed-engineer-do': { label: 'FDE OUTCOME LOOP', icon: BriefcaseBusiness, steps: [[Users, 'Customer reality'], [Search, 'Problem frame'], [Code2, 'Build'], [Rocket, 'Production']] },
  '02-problem-discovery-and-workflow-mapping': { label: 'DISCOVERY MAP', icon: Search, steps: [[Users, 'Observe users'], [Search, 'Map workflow'], [Network, 'Trace systems'], [Gauge, 'Define success']] },
  '03-design-thin-production-slice': { label: 'THIN SLICE', icon: Network, steps: [[Gauge, 'Real trigger'], [Network, 'Governed context'], [Code2, 'Bounded build'], [CheckCircle2, 'Approval']] },
  '04-deploy-observe-and-improve': { label: 'LEARNING LOOP', icon: Gauge, steps: [[Rocket, 'Release'], [Gauge, 'Observe'], [Bug, 'Diagnose'], [TestTube2, 'Improve']] },
  '05-turn-field-learning-into-product': { label: 'PRODUCT LOOP', icon: Blocks, steps: [[Users, 'Field evidence'], [Search, 'Find pattern'], [Blocks, 'Productise'], [CheckCircle2, 'Handoff']] },
} as const;

function TopicHeroVisual({ slug }: { slug: string }) {
  const visual = handbookHeroes[slug as keyof typeof handbookHeroes] || handbookHeroes['62-how-developers-use-ai-tools'];
  const VisualIcon = visual.icon;
  return <aside className={`topic-hero-visual visual-${slug}`} aria-label={`${visual.label} animated visual`}>
    <header><span><VisualIcon /></span><div><small>ANIMATED EXPLAINER</small><strong>{visual.label}</strong></div><i>LIVE</i></header>
    <div className="topic-hero-flow">
      {visual.steps.map(([Icon, label], index) => <div className="topic-hero-step-wrap" key={label}>
        <div className="topic-hero-step" style={{'--step': index} as React.CSSProperties}><span><Icon /></span><strong>{label}</strong><small>0{index + 1}</small></div>
        {index < visual.steps.length - 1 && <ChevronRight className="topic-hero-arrow" />}
      </div>)}
    </div>
    <footer><span></span>Evidence and accountable ownership guide every stage</footer>
  </aside>;
}

export function ByteHeader({ byte }: { byte: ByteMetadata }) {
  const category = getCategoryBySlug(byte.category);
  const chapter = byte.order;
  return <header className="byte-editorial-hero"><div className="byte-hero-inner">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/${byte.category}/`}>{category?.title}</Link><span>/</span><b>Chapter {chapter > 0 ? chapter : byte.order}</b></nav>
    <div className="byte-hero-grid"><div><p className="byte-eyebrow"><Sparkles/>{category?.title} · PRACTICAL GUIDE</p><h1>{byte.title}</h1><p className="byte-deck">{byte.summary}</p><div className="byte-byline"><span><Clock3/>{byte.duration} read</span><time dateTime={byte.updatedAt}>Updated {byte.updatedAt}</time><span>Free learning guide</span></div></div>
    <TopicHeroVisual slug={byte.slug} /></div>
  </div></header>;
}
