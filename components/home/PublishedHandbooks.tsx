'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Box, Code2, FileSearch, Network, Search, Server, Workflow, X } from 'lucide-react';
import type { Handbook } from '@/lib/handbooks';

const filters = [
  { value: 'all', label: 'All handbooks' },
  { value: 'ai-application-engineering', label: 'AI Application Engineering' },
  { value: 'cloud-devops', label: 'Cloud & DevOps' },
  { value: 'software-engineering', label: 'Software Engineering' },
  { value: 'technology-careers', label: 'Technology Careers' },
] as const;

function handbookHref(slug: string) {
  if (slug === 'github-copilot') return '/software-engineering/';
  if (slug === 'docker') return '/cloud-devops/';
  return `/${slug}/`;
}

function handbookVisual(slug: string) {
  if (slug === 'github-copilot') return { Icon: Code2, tone: 'copilot' };
  if (slug === 'docker') return { Icon: Box, tone: 'docker' };
  if (slug === 'langchain') return { Icon: Network, tone: 'langchain' };
  if (slug === 'rag-application-engineering') return { Icon: FileSearch, tone: 'rag' };
  if (slug === 'fastapi-ai-applications') return { Icon: Server, tone: 'fastapi' };
  return { Icon: Workflow, tone: 'fde' };
}

function HandbookCard({ handbook }: { handbook: Handbook }) {
  const { Icon, tone } = handbookVisual(handbook.slug);
  return <article className={`published-handbook-card published-${tone}`}>
    <div className="published-card-intro">
      <span className="published-card-icon"><Icon/></span><small>{handbook.label}</small>
      <h3>{handbook.title}</h3><p>{handbook.description}</p>
      <div className="handbook-card-focus"><b>VISUAL LEARNING PATH</b><span>Concept → workflow → application</span></div>
      <Link className="handbook-card-cta" href={handbookHref(handbook.slug)}>Explore handbook <ArrowRight/></Link>
    </div>
    <nav aria-label={`${handbook.title} chapters`}>{handbook.chapters.map((chapter, index) => <Link href={chapter.href} key={chapter.href}>
      <span>{String(index + 1).padStart(2, '0')}</span><div><small>BYTE {index + 1}</small><strong>{chapter.title}</strong></div><span className="chapter-link-icon" aria-hidden="true"><ArrowRight/></span>
    </Link>)}</nav>
  </article>;
}

export function PublishedHandbooks({ handbooks, variant = 'home' }: { handbooks: Handbook[]; variant?: 'home' | 'library' }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const results = useMemo(() => handbooks.filter((handbook) => {
    const searchable = `${handbook.title} ${handbook.shortTitle} ${handbook.description} ${handbook.audience} ${handbook.label} ${handbook.chapters.map((chapter) => `${chapter.title} ${chapter.outcome}`).join(' ')}`.toLowerCase();
    return (filter === 'all' || handbook.category === filter) && searchable.includes(query.trim().toLowerCase());
  }), [filter, handbooks, query]);

  return <section className={`published-handbooks handbook-collection handbook-collection-${variant}`}><div className="container-custom">
    <header className="published-heading"><div><p className="eyebrow dark">PUBLISHED HANDBOOKS</p><h2>{variant === 'home' ? 'Choose a path. Learn one connected chapter at a time.' : 'Find the handbook for your next practical skill.'}</h2><p>Search by skill or choose a subject area. Every handbook connects visual explanations, real scenarios and practical engineering decisions.</p></div>{variant === 'home' && <Link href="/handbooks/">View complete library <ArrowRight/></Link>}</header>
    <div className="handbook-discovery-panel"><label className="handbook-search"><Search/><span className="sr-only">Search handbooks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search FastAPI, RAG, Docker, Copilot…"/>{query && <button aria-label="Clear handbook search" onClick={() => setQuery('')}><X/></button>}</label><div className="handbook-filter-row" aria-label="Filter handbooks by category">{filters.map((item) => <button className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)} key={item.value}>{item.label}</button>)}</div></div>
    <div className="handbook-result-summary"><span><BookOpen/>Showing <b>{results.length}</b> matching {results.length === 1 ? 'handbook' : 'handbooks'}</span>{(query || filter !== 'all') && <button onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</button>}</div>
    <div className="published-handbook-grid">{results.map((handbook) => <HandbookCard handbook={handbook} key={handbook.slug}/>)}</div>
    {!results.length && <div className="handbook-empty"><Search/><h3>No matching handbook</h3><p>Try a broader skill or view all subject areas.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>View all handbooks</button></div>}
  </div></section>;
}
