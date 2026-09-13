import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, Clock3, GraduationCap, Sparkles, Users } from 'lucide-react';
import { byteTopics } from '@/lib/topic-catalog';

export default function HomePage() {
  const chapters = byteTopics.filter((item) => item.category === 'software-engineering' && ['62-how-developers-use-ai-tools', '63-api-first-thinking', '64-debugging-ai-generated-code', '66-ai-assisted-coding-workflow', '75-secure-ai-coding'].includes(item.slug));
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
    <section id="tracks" className="bg-[#f5f8fa] py-20"><div className="container-custom">
      <div className="max-w-2xl"><p className="eyebrow dark">GitHub Copilot Handbook</p><h2 className="mt-4 text-4xl tracking-tight text-slate-950">Build understanding, one chapter at a time.</h2><p className="mt-4 text-slate-600">Follow the complete developer workflow—from context and generation to debugging, review and responsible delivery.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{chapters.map((chapter,index)=><Link href={`/${chapter.category}/${chapter.slug}/`} className="track-card group" key={chapter.slug}><span className="track-number">0{index+1}</span><h3 className="mt-8 text-xl text-slate-950">{chapter.title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{chapter.summary}</p><div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm"><span className="flex items-center gap-2 text-slate-500"><Clock3 className="h-4 w-4"/>{chapter.duration} read</span><ArrowRight className="h-5 w-5 text-cyan-700 transition-transform group-hover:translate-x-1"/></div></Link>)}</div>
    </div></section>
    <section id="interview-prep" className="interview-section"><div className="container-custom interview-inner"><div><p className="eyebrow">Interview-ready learning</p><h2>Understand Copilot well enough to explain your engineering decisions.</h2><p>Every Handbook chapter includes a concise interview answer, follow-up questions and a practical developer scenario.</p><Link className="primary-cta" href="/software-engineering/">Open the complete handbook <ArrowRight/></Link></div><div className="interview-card"><span>INTERVIEW BIT</span><h3>“How do you verify AI-generated code before shipping it?”</h3><p>Start with the requirement. Inspect the diff. Run tests and security checks. Finish with human approval.</p><small>Practical framework · Stronger answer</small></div></div></section>
    <section className="course-bridge"><div className="container-custom course-bridge-inner"><div><p className="eyebrow dark">From awareness to outcomes</p><h2>Learn the concept free. Build the complete skill with MaanavaN.</h2><p>Bytes give you focused explanations. The Course Library gives you structured learning, guided practice and project-based progression.</p><div className="bridge-steps"><span><b>01</b>Understand with Bytes</span><span><b>02</b>Practise in a course</span><span><b>03</b>Build practical evidence</span></div></div><div className="bridge-actions"><a className="bridge-primary" href="https://www.maanavan.com/course-library"><BookOpen/>Explore Course Library <ArrowRight/></a><a className="bridge-membership" href="https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247"><Users/>All-Access Membership<span>Learn across eligible courses with continued guidance.</span></a></div></div></section>
  </>;
}
