import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Sparkles, Users } from 'lucide-react';
import { byteTopics } from '@/lib/topic-catalog';
import { BytesLibrary } from '@/components/home/BytesLibrary';

export default function HomePage() {
  const chapterOrder = ['62-how-developers-use-ai-tools', '63-api-first-thinking', '66-ai-assisted-coding-workflow', '64-debugging-ai-generated-code', '75-secure-ai-coding'];
  const chapters = byteTopics.filter((item) => item.category === 'software-engineering' && chapterOrder.includes(item.slug)).sort((a, b) => chapterOrder.indexOf(a.slug) - chapterOrder.indexOf(b.slug));
  return <>
    <section className="hero-grid overflow-hidden">
      <div className="container-custom grid gap-12 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28">
        <div>
          <p className="eyebrow"><Sparkles className="h-4 w-4"/> Learn clearly. Build confidently.</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.045em] text-white md:text-7xl">Technology explained for the way you actually learn.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Bite-sized tutorials with simple explanations, real-time analogies, practical use cases, architecture diagrams and interview insights.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="primary-cta" href="/software-engineering/">Start the handbook <ArrowRight className="h-4 w-4"/></Link><Link className="ghost-cta" href="#tracks">Explore five chapters</Link></div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300"><span><b className="text-white">5</b> focused chapters</span><span><b className="text-white">1</b> complete handbook</span><span><b className="text-white">Human-reviewed</b> guidance</span></div>
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
    <section id="tracks" className="handbook-showcase"><div className="container-custom"><div className="handbook-card">
      <div className="handbook-card-copy"><p className="eyebrow dark">Featured Handbook · 01</p><h2>The GitHub Copilot Handbook</h2><p>One connected learning path for developers—not scattered AI tips. Understand how Copilot uses context, supports feature delivery, assists debugging and fits inside a responsible engineering workflow.</p><div className="handbook-outcomes"><span><b>5</b> practical chapters</span><span><b>5</b> animated explainers</span><span><b>100%</b> human reviewed</span></div><Link href="/software-engineering/">Explore the Handbook <ArrowRight/></Link></div>
      <div className="handbook-map" aria-label="Five chapter GitHub Copilot learning path">{chapters.map((chapter,index)=><Link href={`/${chapter.category}/${chapter.slug}/`} key={chapter.slug}><span>0{index+1}</span><div><small>CHAPTER</small><strong>{chapter.title}</strong></div><ArrowRight/></Link>)}</div>
    </div></div></section>
    <BytesLibrary chapters={chapters} />
    <section id="interview-prep" className="interview-section"><div className="container-custom interview-inner"><div><p className="eyebrow">Interview-ready learning</p><h2>Understand Copilot well enough to explain your engineering decisions.</h2><p>Every Handbook chapter includes a concise interview answer, follow-up questions and a practical developer scenario.</p><Link className="primary-cta" href="/software-engineering/">Open the complete handbook <ArrowRight/></Link></div><div className="interview-card"><span>INTERVIEW BIT</span><h3>“How do you verify AI-generated code before shipping it?”</h3><p>Start with the requirement. Inspect the diff. Run tests and security checks. Finish with human approval.</p><small>Practical framework · Stronger answer</small></div></div></section>
    <section className="course-bridge"><div className="container-custom course-bridge-inner"><div><p className="eyebrow dark">From awareness to outcomes</p><h2>Learn the concept free. Build the complete skill with MaanavaN.</h2><p>Bytes give you focused explanations. The Course Library gives you structured learning, guided practice and project-based progression.</p><div className="bridge-steps"><span><b>01</b>Understand with Bytes</span><span><b>02</b>Practise in a course</span><span><b>03</b>Build practical evidence</span></div></div><div className="bridge-actions"><a className="bridge-primary" href="https://www.maanavan.com/course-library"><BookOpen/>Explore Course Library <ArrowRight/></a><a className="bridge-membership" href="https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247"><Users/>All-Access Membership<span>Learn across eligible courses with continued guidance.</span></a></div></div></section>
  </>;
}
