import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers3, Search, Users } from 'lucide-react';
import { handbooks } from '@/lib/handbooks';

export const metadata: Metadata = {
  title: 'AI & Technology Handbooks',
  description: 'Explore the GitHub Copilot and Forward Deployed Engineer visual handbooks—10 practical, beginner-friendly Bytes.',
  alternates: { canonical: '/handbooks/' },
};

export default function HandbooksPage() {
  return <>
    <section className="handbooks-hero"><div className="container-custom"><p className="eyebrow">MAANAVAN HANDBOOK LIBRARY</p><h1>Two focused handbooks. Ten practical Bytes.</h1><p>Build the mental model first, then learn through visual explanations, familiar analogies, real project scenarios and decisions you can apply.</p><div><span><BookOpen/> 2 published handbooks</span><span><Layers3/> 10 complete Bytes</span><span><Users/> Beginner-friendly learning</span></div></div></section>
    <section className="handbooks-library container-custom"><header><div><p className="eyebrow dark">PUBLISHED HANDBOOKS</p><h2>Choose the path that fits your next step.</h2></div><div className="handbook-search-visual"><Search/><span>Copilot engineering · Forward deployment</span></div></header><div className="handbooks-grid">{handbooks.map((handbook,index)=><Link className={`handbook-tile handbook-tone-${handbook.tone}`} href={handbook.slug === 'github-copilot' ? '/software-engineering/' : '/forward-deployed-engineer/'} key={handbook.slug}><div className="handbook-tile-top"><span>{String(index+1).padStart(2,'0')}</span><small>{handbook.audience}</small></div><div className="handbook-tile-icon"><BookOpen/></div><h2>{handbook.title}</h2><p>{handbook.description}</p><footer><span>{handbook.chapters.length} published Bytes</span><b>Start learning <ArrowRight/></b></footer></Link>)}</div></section>
  </>;
}
