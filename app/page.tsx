import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, Clock3, GraduationCap, Search, Sparkles } from 'lucide-react';
import { getAllCategories } from '@/lib/categories';
import { legacyBytes } from '@/lib/legacy-content';

export default function HomePage() {
  const categories = getAllCategories();
  return <>
    <section className="hero-grid overflow-hidden">
      <div className="container-custom grid gap-12 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28">
        <div>
          <p className="eyebrow"><Sparkles className="h-4 w-4"/> Learn clearly. Build confidently.</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.045em] text-white md:text-7xl">Technology explained for the way you actually learn.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Bite-sized tutorials with simple explanations, real-time analogies, practical use cases, architecture diagrams and interview insights.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="primary-cta" href="/genai/">Start learning <ArrowRight className="h-4 w-4"/></Link><Link className="ghost-cta" href="#tracks">Explore all tracks</Link></div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300"><span><b className="text-white">105</b> focused lessons</span><span><b className="text-white">7</b> career tracks</span><span><b className="text-white">Tamil-first</b> guidance</span></div>
        </div>
        <div className="learning-card self-end">
          <p className="text-sm font-semibold text-cyan-300">Inside every Byte</p>
          <div className="mt-6 space-y-5">
            <div className="flex gap-4"><span className="icon-box"><BookOpen className="h-5 w-5"/></span><div><h3 className="text-base text-white">Concept</h3><p className="mt-1 text-sm text-slate-400">A clear, jargon-free explanation</p></div></div>
            <div className="flex gap-4"><span className="icon-box"><BriefcaseBusiness className="h-5 w-5"/></span><div><h3 className="text-base text-white">Application</h3><p className="mt-1 text-sm text-slate-400">A practical, real-world use case</p></div></div>
            <div className="flex gap-4"><span className="icon-box"><GraduationCap className="h-5 w-5"/></span><div><h3 className="text-base text-white">Career</h3><p className="mt-1 text-sm text-slate-400">An interview question and answer</p></div></div>
          </div>
        </div>
      </div>
    </section>
    <section id="tracks" className="bg-[#f5f8fa] py-20"><div className="container-custom">
      <div className="max-w-2xl"><p className="eyebrow dark">Choose a learning track</p><h2 className="mt-4 text-4xl tracking-tight text-slate-950">Build understanding, one Byte at a time.</h2><p className="mt-4 text-slate-600">Follow the recommended order or jump directly to the concept you need today.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{categories.map((category,index)=><Link href={`/${category.slug}/`} className="track-card group" key={category.slug}><span className="track-number">0{index+1}</span><h3 className="mt-8 text-xl text-slate-950">{category.title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{category.description}</p><div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm"><span className="flex items-center gap-2 text-slate-500"><Clock3 className="h-4 w-4"/>15 lessons</span><ArrowRight className="h-5 w-5 text-cyan-700 transition-transform group-hover:translate-x-1"/></div></Link>)}</div>
    </div></section>
    <section className="bg-white py-20"><div className="container-custom"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow dark">Start with these</p><h2 className="mt-4 text-3xl text-slate-950">Popular lessons</h2></div><Search className="hidden h-8 w-8 text-slate-300 sm:block"/></div><div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{legacyBytes.filter(x=>x.isPopular).slice(0,6).map(x=><Link className="lesson-link" href={`/${x.category}/${x.slug}/`} key={x.slug}><span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">{x.category.replace('-',' ')}</span><h3 className="mt-3 text-lg text-slate-900">{x.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{x.summary}</p></Link>)}</div></div></section>
  </>;
}
