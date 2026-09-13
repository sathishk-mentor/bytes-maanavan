import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers3, Search, Users } from 'lucide-react';
import { handbooks } from '@/lib/handbooks';

export const metadata: Metadata = {
  title: 'AI & Technology Handbooks',
  description: 'Explore visual, beginner-friendly handbooks for Generative AI, AI agents, Agentic AI, AGI, FDE, DevOps, Claude Code and GitHub Copilot.',
  alternates: { canonical: '/handbooks/' },
};

export default function HandbooksPage() {
  return <>
    <section className="handbooks-hero"><div className="container-custom"><p className="eyebrow">MAANAVAN HANDBOOK LIBRARY</p><h1>Complex technology, organised into clear learning paths.</h1><p>Choose a topic. Build the mental model first. Then move through visual explanations, practical scenarios and decisions you can apply.</p><div><span><BookOpen/> {handbooks.length} focused handbooks</span><span><Layers3/> 5 chapters in every path</span><span><Users/> Beginner-friendly choices</span></div></div></section>
    <section className="handbooks-library container-custom"><header><div><p className="eyebrow dark">EXPLORE BY TOPIC</p><h2>Find the handbook that fits your next step.</h2></div><div className="handbook-search-visual"><Search/><span>AI, engineering, careers and tools</span></div></header><div className="handbooks-grid">{handbooks.map((handbook,index)=><Link className={`handbook-tile handbook-tone-${handbook.tone}`} href={handbook.status === 'available' ? '/software-engineering/' : `/handbooks/${handbook.slug}/`} key={handbook.slug}><div className="handbook-tile-top"><span>{String(index+1).padStart(2,'0')}</span><small>{handbook.audience}</small></div><div className="handbook-tile-icon"><BookOpen/></div><h2>{handbook.title}</h2><p>{handbook.description}</p><footer><span>{handbook.chapters.length} chapters</span><b>{handbook.status === 'available' ? 'Start learning' : 'Preview path'} <ArrowRight/></b></footer></Link>)}</div></section>
  </>;
}
