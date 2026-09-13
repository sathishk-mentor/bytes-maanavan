import Link from 'next/link';
import { ArrowRight, Code2, Workflow } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

type PublishedHandbook = { slug:string; title:string; label:string; description:string; chapters:ByteMetadata[] };

export function PublishedHandbooks({handbooks}:{handbooks:PublishedHandbook[]}) {
  return <section className="published-handbooks"><div className="container-custom"><header className="published-heading"><div><p className="eyebrow dark">PUBLISHED HANDBOOKS</p><h2>Choose a path. Learn one connected chapter at a time.</h2><p>Each handbook turns a broad topic into five focused Bytes with visuals, real scenarios and practical decisions.</p></div><Link href="/handbooks/">View complete library <ArrowRight/></Link></header><div className="published-handbook-grid">{handbooks.map((handbook,index)=>{const Icon=handbook.slug==='software-engineering'?Code2:Workflow;return <article className={`published-handbook-card published-${index===0?'copilot':'fde'}`} key={handbook.slug}><div className="published-card-intro"><span><Icon/></span><small>{handbook.label}</small><h3>{handbook.title}</h3><p>{handbook.description}</p><div><b>{handbook.chapters.length}</b><span>published Bytes</span></div><Link href={`/${handbook.slug}/`}>Open handbook <ArrowRight/></Link></div><nav aria-label={`${handbook.title} chapters`}>{handbook.chapters.map((chapter,chapterIndex)=><Link href={`/${chapter.category}/${chapter.slug}/`} key={chapter.slug}><span>{String(chapterIndex+1).padStart(2,'0')}</span><div><small>BYTE {chapterIndex+1}</small><strong>{chapter.title}</strong></div><ArrowRight/></Link>)}</nav></article>})}</div></div></section>;
}
