'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, Search, X } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

const tags = ['All', 'Copilot', 'Context', 'Workflow', 'Debugging', 'Security'];

export function BytesLibrary({ chapters }: { chapters: ByteMetadata[] }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const results = useMemo(() => chapters.filter((chapter) => {
    const searchable = `${chapter.title} ${chapter.summary} ${chapter.tags.join(' ')}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (tag === 'All' || searchable.includes(tag.toLowerCase()));
  }), [chapters, query, tag]);

  return <section className="bytes-library" id="bytes-library">
    <div className="container-custom">
      <div className="library-heading"><div><p className="eyebrow dark">Bytes Library</p><h2>Find the exact Copilot concept you need.</h2><p>Search by task or filter by skill. Each Byte is one focused chapter inside the complete Handbook.</p></div><span>{results.length} of {chapters.length} Bytes</span></div>
      <div className="library-tools">
        <label className="library-search"><Search/><span className="sr-only">Search Bytes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prompts, debugging, security…" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X/></button>}</label>
        <div className="library-tags" aria-label="Filter Bytes by topic">{tags.map((item) => <button key={item} className={tag === item ? 'active' : ''} onClick={() => setTag(item)}>{item}</button>)}</div>
      </div>
      <div className="library-grid">{results.map((chapter, index) => <Link className="library-byte-card" href={`/${chapter.category}/${chapter.slug}/`} key={chapter.slug}>
        <div><span>CHAPTER {String(chapters.indexOf(chapter) + 1).padStart(2, '0')}</span><small><Clock3/>{chapter.duration} read</small></div><h3>{chapter.title}</h3><p>{chapter.summary}</p><footer><div>{chapter.tags.slice(0, 3).map((item) => <i key={item}>{item}</i>)}</div><b>Read Byte <ArrowRight/></b></footer>
      </Link>)}</div>
      {results.length === 0 && <div className="library-empty"><Search/><h3>No matching Byte found</h3><p>Try another keyword or choose “All”.</p><button onClick={() => { setQuery(''); setTag('All'); }}>Reset library</button></div>}
    </div>
  </section>;
}
