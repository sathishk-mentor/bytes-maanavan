'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';
import { ByteLibraryCard } from '@/components/bytes/ByteLibraryCard';

const filters = [
  {label:'All Bytes',value:'all'},
  {label:'GitHub Copilot',value:'software-engineering'},
  {label:'Forward Deployed Engineer',value:'forward-deployed-engineer'},
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
      <div className="library-heading"><div><p className="eyebrow dark">All Published Bytes</p><h2>Find the exact concept you need.</h2><p>Search across every published handbook or choose one learning path. New Bytes join this library automatically.</p></div><span>{results.length} of {chapters.length} Bytes</span></div>
      <div className="library-tools">
        <label className="library-search"><Search/><span className="sr-only">Search Bytes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search FDE, Copilot, workflow, debugging…" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X/></button>}</label>
        <div className="library-tags" aria-label="Filter Bytes by handbook">{filters.map((item) => <button key={item.value} className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div>
      </div>
      <div className="library-grid">{results.map((chapter) => {
        const chapterNumber = chapters.filter((item)=>item.category===chapter.category).findIndex((item)=>item.slug===chapter.slug)+1;
        return <ByteLibraryCard chapter={chapter} chapterNumber={chapterNumber} key={chapter.slug}/>;
      })}</div>
      {results.length === 0 && <div className="library-empty"><Search/><h3>No matching Byte found</h3><p>Try another keyword or choose “All Bytes”.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>Reset library</button></div>}
    </div>
  </section>;
}
