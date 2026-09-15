'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';
import { ByteLibraryCard } from '@/components/bytes/ByteLibraryCard';

const filters = [
  {label:'All Bytes',value:'all'},
  {label:'AI Agents',value:'ai-agents'},
  {label:'Software Engineering',value:'software-engineering'},
  {label:'Technology Careers',value:'forward-deployed-engineer'},
  {label:'Cloud & DevOps',value:'cloud-devops'},
  {label:'Generative AI & Agents',value:'langchain'},
  {label:'RAG Application Engineering',value:'rag-application-engineering'},
  {label:'API & Backend Engineering',value:'fastapi-ai-applications'},
  {label:'Modern Java & GenAI',value:'modern-java-spring-boot-genai'},
  {label:'SQL for Data & AI',value:'sql-data-ai-applications'},
  {label:'MongoDB for AI Apps',value:'mongodb'},
];
export function BytesLibrary({ chapters }: { chapters: ByteMetadata[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => chapters.filter((chapter) => {
    const searchable = `${chapter.title} ${chapter.summary} ${chapter.tags.join(' ')}`.toLowerCase();
    return searchable.includes(deferredQuery.trim().toLowerCase()) && (filter === 'all' || chapter.category === filter);
  }), [chapters, deferredQuery, filter]);
  const visibleResults = results.slice(0, visibleCount);

  return <section className="bytes-library" id="bytes-library">
    <div className="container-custom">
      <div className="library-heading"><div><p className="eyebrow dark">BYTE LIBRARY</p><h2>Find the exact concept you need.</h2><p>Search the library or choose a subject from the category sidebar.</p></div></div>
      <div className="library-search-row">
        <label className="library-search"><Search/><span className="sr-only">Search Bytes</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }} placeholder="Search FDE, Copilot, workflow, debugging…" />{query && <button onClick={() => { setQuery(''); setVisibleCount(12); }} aria-label="Clear search"><X/></button>}</label>
      </div>
      <div className="library-with-sidebar">
        <aside className="library-category-sidebar"><p>BYTE CATEGORIES</p><nav aria-label="Filter Bytes by category">{filters.map((item) => <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => { setFilter(item.value); setVisibleCount(12); }}><span>{item.label}</span><i>›</i></button>)}</nav><small>Choose a subject area to narrow the library.</small></aside>
        <div><div className="library-result-status" aria-live="polite"><span>Showing <b>{Math.min(visibleCount, results.length)}</b> of <b>{results.length}</b> matching Bytes</span></div><div className="library-grid">{visibleResults.map((chapter) => {
        const chapterNumber = chapters.filter((item)=>item.category===chapter.category).findIndex((item)=>item.slug===chapter.slug)+1;
        return <ByteLibraryCard chapter={chapter} chapterNumber={chapterNumber} key={chapter.slug}/>;
      })}</div>
      {visibleCount < results.length && <button className="library-load-more" onClick={() => setVisibleCount((count) => count + 12)}>Load more Bytes <ChevronDown/></button>}
      {results.length === 0 && <div className="library-empty"><Search/><h3>No matching Byte found</h3><p>Try another keyword or choose “All Bytes”.</p><button onClick={() => { setQuery(''); setFilter('all'); setVisibleCount(12); }}>Reset library</button></div>}</div>
      </div>
    </div>
  </section>;
}
