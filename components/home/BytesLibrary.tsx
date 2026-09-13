'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Blocks, Bot, Braces, BriefcaseBusiness, Bug, Clock3, Gauge, GitPullRequestArrow, Network, Search, ShieldCheck, Workflow, X } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

const filters = [
  {label:'All Bytes',value:'all'},
  {label:'GitHub Copilot',value:'software-engineering'},
  {label:'Forward Deployed Engineer',value:'forward-deployed-engineer'},
];
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

export function BytesLibrary({ chapters }: { chapters: ByteMetadata[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const results = useMemo(() => chapters.filter((chapter) => {
    const searchable = `${chapter.title} ${chapter.summary} ${chapter.tags.join(' ')}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (filter === 'all' || chapter.category === filter);
  }), [chapters, query, filter]);

  return <section className="bytes-library" id="bytes-library">
    <div className="container-custom">
      <div className="library-heading"><div><p className="eyebrow dark">All Published Bytes</p><h2>Find the exact concept you need.</h2><p>Search across every published handbook or choose one learning path. New Bytes join this library automatically.</p></div><span>{results.length} of {chapters.length} Bytes</span></div>
      <div className="library-tools">
        <label className="library-search"><Search/><span className="sr-only">Search Bytes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search FDE, Copilot, workflow, debugging…" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X/></button>}</label>
        <div className="library-tags" aria-label="Filter Bytes by handbook">{filters.map((item) => <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div>
      </div>
      <div className="library-grid">{results.map((chapter) => {
        const visual = cardVisuals[chapter.slug as keyof typeof cardVisuals] || {icon:Workflow,label:'Technology Guide',tone:'blue'};
        const Icon = visual.icon;
        const chapterNumber = chapters.filter((item)=>item.category===chapter.category).findIndex((item)=>item.slug===chapter.slug)+1;
        return <Link className={`library-byte-card tone-${visual.tone}`} href={`/${chapter.category}/${chapter.slug}/`} key={chapter.slug}>
          <div className="byte-card-cover"><span>{chapter.category==='forward-deployed-engineer'?'FDE HANDBOOK':'GITHUB COPILOT HANDBOOK'}</span><Icon/><i>{String(chapterNumber).padStart(2,'0')}</i></div>
          <div className="byte-card-title-tab"><span><Icon/></span><div><small>{visual.label}</small><h3>{chapter.title}</h3></div></div>
          <p className="byte-card-description">{chapter.summary}</p>
          <footer><div><i>{chapter.level}</i><i><Clock3/>{chapter.duration}</i></div><b>Read <ArrowRight/></b></footer>
        </Link>;
      })}</div>
      {results.length === 0 && <div className="library-empty"><Search/><h3>No matching Byte found</h3><p>Try another keyword or choose “All Bytes”.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>Reset library</button></div>}
    </div>
  </section>;
}
