import Link from 'next/link';
import { BookOpenCheck, CheckCircle2, ChevronRight, Clock3, Sparkles, UserRoundCheck } from 'lucide-react';
import { ByteMetadata } from '@/lib/types';
import { getCategoryBySlug } from '@/lib/categories';

export function ByteHeader({ byte }: { byte: ByteMetadata; breadcrumbItems?: {label:string;href:string}[] }) {
  const category=getCategoryBySlug(byte.category);
  return <header className="byte-editorial-hero"><div className="byte-hero-inner">
    <nav aria-label="Breadcrumb"><Link href="/">Bytes</Link><ChevronRight/><Link href={`/${byte.category}/`}>{category?.title}</Link><ChevronRight/><span>Lesson {String(byte.order).padStart(2,'0')}</span></nav>
    <div className="byte-hero-grid"><div><p className="byte-eyebrow"><Sparkles/>{category?.title} · BEGINNER GUIDE</p><h1>{byte.title}</h1><p className="byte-deck">{byte.summary}</p><div className="byte-byline"><span><Clock3/>{byte.duration} read</span><time dateTime={byte.updatedAt}>Reviewed 12 September 2026</time><span>Free learning guide</span></div></div>
    <aside className="byte-hero-proof"><div className="proof-icon"><BookOpenCheck/></div><small>MAANAVAN LEARNING STANDARD</small><h2>Understand. Apply. Explain.</h2><ul><li><CheckCircle2/>Simple English</li><li><CheckCircle2/>Practical examples</li><li><CheckCircle2/>Interview insight</li></ul><p><UserRoundCheck/>Personally reviewed learning guidance</p></aside></div>
  </div></header>;
}
