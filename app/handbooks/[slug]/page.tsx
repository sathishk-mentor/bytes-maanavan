import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { getHandbook, handbooks } from '@/lib/handbooks';

export const dynamicParams = false;
export function generateStaticParams() { return handbooks.filter((item)=>item.status !== 'available').map(({slug})=>({slug})); }
export function generateMetadata({params}:{params:{slug:string}}): Metadata { const handbook=getHandbook(params.slug); return handbook ? {title:handbook.title,description:handbook.description,alternates:{canonical:`/handbooks/${handbook.slug}/`}} : {}; }

export default function HandbookPage({params}:{params:{slug:string}}) {
  const handbook=getHandbook(params.slug); if(!handbook) notFound();
  return <><section className={`handbook-detail-hero handbook-tone-${handbook.tone}`}><div className="container-custom"><Link href="/handbooks/"><ArrowLeft/> All handbooks</Link><p className="eyebrow">5-CHAPTER VISUAL LEARNING PATH</p><h1>{handbook.title}</h1><p>{handbook.description}</p><div className="handbook-audience"><span>{handbook.audience}</span><span>Visual explainers</span><span>Practical examples</span></div></div></section><section className="handbook-detail-body container-custom"><div className="handbook-promise"><BookOpen/><div><small>WHAT YOU WILL BE ABLE TO DO</small><h2>{handbook.promise}</h2></div></div><div className="handbook-chapters"><header><p className="eyebrow dark">LEARNING PATH</p><h2>Build understanding in the order the work happens.</h2></header>{handbook.chapters.map((chapter,index)=><article key={chapter.title}><span>{String(index+1).padStart(2,'0')}</span><div><small>CHAPTER {index+1}</small><h3>{chapter.title}</h3><p><CheckCircle2/>{chapter.outcome}</p></div>{chapter.href?<Link href={chapter.href}>Open chapter <ArrowRight/></Link>:<b>In development</b>}</article>)}</div><div className="handbook-next"><div><small>DEVELOPMENT APPROACH</small><h2>Each chapter will be useful on its own—and stronger as part of the complete path.</h2><p>Every release will include a real-world analogy, visual workflow, practical scenario, key mistakes, interview insight and credited primary sources.</p></div><Link href="/handbooks/">Explore all handbooks <ArrowRight/></Link></div></section></>;
}
