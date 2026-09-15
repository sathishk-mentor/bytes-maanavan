'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Bot, Box, Code2, Database, FileSearch, Network, Search, Server, Workflow, X } from 'lucide-react';
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
  if (slug === 'ai-agents') return { Icon: Bot, tone: 'agents' };
  if (slug === 'github-copilot') return { Icon: Code2, tone: 'copilot' };
  if (slug === 'docker') return { Icon: Box, tone: 'docker' };
  if (slug === 'langchain') return { Icon: Network, tone: 'langchain' };
  if (slug === 'rag-application-engineering') return { Icon: FileSearch, tone: 'rag' };
  if (slug === 'fastapi-ai-applications') return { Icon: Server, tone: 'fastapi' };
  if (slug === 'modern-java-spring-boot-genai') return { Icon: Code2, tone: 'java' };
  if (slug === 'sql-data-ai-applications') return { Icon: Database, tone: 'sql' };
  if (slug === 'mongodb') return { Icon: Database, tone: 'mongodb' };
  return { Icon: Workflow, tone: 'fde' };
}

function HandbookScene({ slug }: { slug: string }) {
  const common = { viewBox: '0 0 300 118', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 };
  if (slug === 'ai-agents') return <svg {...common}><rect x="30" y="27" width="50" height="44" rx="11"/><path d="M43 44h24M43 55h24M55 27v-8M96 49h45m-9-8 9 8-9 8"/><rect x="158" y="27" width="54" height="44" rx="9"/><path d="m173 49 8 8 16-19M225 49h42"/></svg>;
  if (slug === 'github-copilot') return <svg {...common}><rect x="29" y="23" width="120" height="57" rx="10"/><path d="m58 43-12 10 12 10m31-20 12 10-12 10M79 36 68 70M168 39h72M168 51h92M168 63h55"/></svg>;
  if (slug === 'docker') return <svg {...common}><rect x="35" y="26" width="27" height="21" rx="3"/><rect x="67" y="26" width="27" height="21" rx="3"/><rect x="99" y="26" width="27" height="21" rx="3"/><rect x="67" y="52" width="27" height="21" rx="3"/><rect x="99" y="52" width="27" height="21" rx="3"/><path d="M31 79h110c18 0 31-10 36-25 7 5 14 5 19 2-5 22-24 37-48 37H62c-14 0-25-5-31-14zM202 50h60m-9-8 9 8-9 8"/></svg>;
  if (slug === 'langchain') return <svg {...common}><circle cx="45" cy="50" r="16"/><circle cx="113" cy="30" r="14"/><circle cx="113" cy="72" r="14"/><circle cx="188" cy="50" r="19"/><path d="M61 46l38-13M61 55l38 14M127 33l42 13M127 69l42-15M207 50h58m-9-8 9 8-9 8"/></svg>;
  if (slug === 'rag-application-engineering') return <svg {...common}><rect x="30" y="24" width="56" height="54" rx="8"/><path d="M43 40h30M43 51h23M43 62h27"/><circle cx="126" cy="49" r="19"/><circle cx="120" cy="43" r="7"/><path d="m126 49 14 14M147 49h35"/><rect x="197" y="27" width="65" height="46" rx="9"/><path d="M211 43h37M211 55h26"/></svg>;
  if (slug === 'fastapi-ai-applications') return <svg {...common}><rect x="27" y="31" width="55" height="38" rx="9"/><path d="M40 50h29M94 50h37m-8-8 8 8-8 8"/><circle cx="158" cy="50" r="21"/><path d="m152 62 13-25-2 13h11zM191 50h34"/><rect x="237" y="31" width="36" height="38" rx="8"/></svg>;
  if (slug === 'modern-java-spring-boot-genai') return <svg {...common}><path d="M42 73h99l-13 12H55zM55 55h73l13 12H42zM68 37h47l13 12H55z"/><path d="M163 51h38m-8-8 8 8-8 8"/><circle cx="235" cy="51" r="25"/><path d="M226 42h18v18h-18zM231 36c9 4 13 12 13 23"/></svg>;
  if (slug === 'sql-data-ai-applications') return <svg {...common}><ellipse cx="68" cy="32" rx="35" ry="12"/><path d="M33 32v42c0 7 16 12 35 12s35-5 35-12V32M33 53c0 7 16 12 35 12s35-5 35-12"/><path d="M121 52h43m-8-8 8 8-8 8"/><rect x="180" y="29" width="82" height="48" rx="10"/><path d="M195 61V48m17 13V39m17 22v-8m17 8V44"/></svg>;
  if (slug === 'mongodb') return <svg {...common}><ellipse cx="62" cy="28" rx="31" ry="10"/><path d="M31 28v43c0 6 14 10 31 10s31-4 31-10V28M31 48c0 6 14 10 31 10s31-4 31-10"/><path d="M109 51h42m-8-8 8 8-8 8"/><circle cx="186" cy="51" r="19"/><path d="m199 64 16 16M180 51h12M186 45v12"/><path d="M220 51h45m-8-8 8 8-8 8"/></svg>;
  return <svg {...common}><circle cx="47" cy="42" r="16"/><path d="M27 73c5-14 16-19 20-19s17 5 22 19M76 49h45m-8-8 8 8-8 8"/><rect x="139" y="26" width="55" height="46" rx="9"/><path d="M153 60V45m14 15V36m14 24V49M205 49h45m-8-8 8 8-8 8"/></svg>;
}

function HandbookCard({ handbook, compact = false }: { handbook: Handbook; compact?: boolean }) {
  const { Icon, tone } = handbookVisual(handbook.slug);
  if (compact) return <article className={`home-handbook-cover home-handbook-${tone}`}>
    <span className="home-handbook-spine" aria-hidden="true"/>
    <div className="home-handbook-visual" aria-hidden="true"><span className="home-handbook-grid"/><div className="home-handbook-visual-top"><span>MAANAVAN HANDBOOK</span><b>{handbook.chapters.length} BYTES</b></div><div className="home-handbook-scene"><BookOpen className="home-handbook-book"/><span className="home-handbook-topic-icon"><Icon/></span></div><small>{handbook.label}</small></div>
    <div className="home-handbook-content"><h3>{handbook.title}</h3><p>{handbook.description}</p><div className="home-handbook-outcome"><b>WHAT YOU WILL LEARN</b><span>{handbook.promise}</span></div><Link className="home-handbook-cta" href={handbookHref(handbook.slug)}><span>Explore handbook</span><ArrowRight aria-hidden="true"/></Link></div>
  </article>;
  return <article className={`published-handbook-card published-${tone} ${compact ? 'published-handbook-compact' : ''}`}>
    <div className="published-card-intro">
      <div className="published-card-topline"><span className="published-card-icon" aria-hidden="true"><span className="published-icon-orbit published-icon-orbit-one"/><span className="published-icon-orbit published-icon-orbit-two"/><Icon/></span>{compact && <b>{handbook.chapters.length} BYTES</b>}</div><small>{handbook.label}</small>
      <h3>{handbook.title}</h3><p>{handbook.description}</p>
      <div className="handbook-card-focus"><b>{compact ? handbook.audience : 'VISUAL LEARNING PATH'}</b><span>{compact ? handbook.promise : 'Concept → workflow → application'}</span></div>
      <Link className="handbook-card-cta" href={handbookHref(handbook.slug)}><span>Explore handbook</span><span className="handbook-card-cta-icon" aria-hidden="true"><ArrowRight/></span></Link>
    </div>
    {!compact && <nav aria-label={`${handbook.title} chapters`}>{handbook.chapters.map((chapter, index) => <Link href={chapter.href} key={chapter.href}>
      <span>{String(index + 1).padStart(2, '0')}</span><div><small>BYTE {index + 1}</small><strong>{chapter.title}</strong></div><span className="chapter-link-icon" aria-hidden="true"><ArrowRight/></span>
    </Link>)}</nav>}
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
    <div className="handbook-discovery-panel"><label className="handbook-search"><Search/><span className="sr-only">Search handbooks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search AI Agents, FastAPI, RAG, Docker…"/>{query && <button aria-label="Clear handbook search" onClick={() => setQuery('')}><X/></button>}</label>{variant === 'library' && <div className="handbook-filter-row" aria-label="Filter handbooks by category">{filters.map((item) => <button className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)} key={item.value}>{item.label}</button>)}</div>}</div>
    {variant === 'home' ? <div className="handbook-library-layout"><aside className="handbook-category-sidebar" aria-label="Handbook categories"><strong>HANDBOOK CATEGORIES</strong>{filters.map((item) => <button className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)} key={item.value}><span>{item.label}</span><i aria-hidden="true">›</i></button>)}</aside><div className="handbook-library-results"><div className="handbook-result-summary"><span><BookOpen/>Showing <b>{results.length}</b> matching {results.length === 1 ? 'handbook' : 'handbooks'}</span>{(query || filter !== 'all') && <button onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</button>}</div>
    <div className="published-handbook-grid">{results.map((handbook) => <HandbookCard handbook={handbook} compact key={handbook.slug}/>)}</div></div></div> : <><div className="handbook-result-summary"><span><BookOpen/>Showing <b>{results.length}</b> matching {results.length === 1 ? 'handbook' : 'handbooks'}</span>{(query || filter !== 'all') && <button onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</button>}</div><div className="published-handbook-grid">{results.map((handbook) => <HandbookCard handbook={handbook} key={handbook.slug}/>)}</div></>}
    {!results.length && <div className="handbook-empty"><Search/><h3>No matching handbook</h3><p>Try a broader skill or view all subject areas.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>View all handbooks</button></div>}
  </div></section>;
}
