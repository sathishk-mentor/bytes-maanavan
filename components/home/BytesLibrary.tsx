'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
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
];
export function BytesLibrary({ chapters }: { chapters: ByteMetadata[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const results = useMemo(() => chapters.filter((chapter) => {
    const searchable = `${chapter.title} ${chapter.summary} ${chapter.tags.join(' ')}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (filter === 'all' || chapter.category === filter);
  }), [chapters, query, filter]);

  return <section className="bytes-library" id="bytes-library">
    <div className="container-custom">
      <div className="library-heading"><div><p className="eyebrow dark">BYTE LIBRARY</p><h2>Find the exact concept you need.</h2><p>Search the library or choose a subject from the category sidebar.</p></div></div>
      <div className="library-search-row">
        <label className="library-search"><Search/><span className="sr-only">Search Bytes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search FDE, Copilot, workflow, debugging…" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X/></button>}</label>
      </div>
      <div className="library-with-sidebar">
        <aside className="library-category-sidebar"><p>BYTE CATEGORIES</p><nav aria-label="Filter Bytes by category">{filters.map((item) => <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}><span>{item.label}</span><i>›</i></button>)}</nav><small>Choose a subject area to narrow the library.</small></aside>
        <div><div className="library-grid">{results.map((chapter) => {
        const chapterNumber = chapters.filter((item)=>item.category===chapter.category).findIndex((item)=>item.slug===chapter.slug)+1;
        return <ByteLibraryCard chapter={chapter} chapterNumber={chapterNumber} key={chapter.slug}/>;
      })}</div>
      {results.length === 0 && <div className="library-empty"><Search/><h3>No matching Byte found</h3><p>Try another keyword or choose “All Bytes”.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>Reset library</button></div>}</div>
      </div>
    </div>
  </section>;
}
