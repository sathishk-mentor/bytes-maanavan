import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Code2, Eye, SearchCheck, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { BytesLibrary } from '@/components/home/BytesLibrary';
import { HomeMotion } from '@/components/home/HomeMotion';
import { getBytesByCategory } from '@/lib/mdx';

export default async function HomePage() {
  const chapters = await getBytesByCategory('software-engineering');
  return <HomeMotion>
    <section className="bytes-premium-hero">
      <div className="hero-aurora hero-aurora-one"/><div className="hero-aurora hero-aurora-two"/>
      <div className="container-custom bytes-hero-layout">
        <div className="bytes-hero-copy">
          <p className="eyebrow"><Sparkles/> MaanavaN Bytes · Visual technology handbooks</p>
          <h1>Understand technology.<br/><span>One visual Byte at a time.</span></h1>
          <p>Start with a clear mental model, explore the workflow visually, apply it to a real scenario and finish ready to explain the concept with confidence.</p>
          <div className="bytes-hero-actions"><Link className="primary-cta" href="#bytes-library">Explore Bytes Library <ArrowRight/></Link><Link className="ghost-cta" href="/software-engineering/">Open Copilot Handbook</Link></div>
          <div className="bytes-hero-trust"><span><CheckCircle2/>Visual-first explanations</span><span><CheckCircle2/>Primary-source research</span><span><CheckCircle2/>Free to learn</span></div>
        </div>
        <div className="hero-learning-console" aria-label="Animated MaanavaN Bytes learning approach">
          <header><span><i/><i/><i/></span><small>MAANAVAN / HOW A BYTE WORKS</small><b>LEARNING FLOW</b></header>
          <div className="console-question"><span>01</span><div><small>DISCOVER</small><strong>Start with one important question</strong><p>What is the concept—and why does it matter?</p></div></div>
          <div className="console-learning-track"><i/><div><span><Eye/></span><small>VISUAL</small><b>See the workflow</b></div><div><span><Code2/></span><small>APPLY</small><b>Try a real example</b></div><div><span><SearchCheck/></span><small>DECIDE</small><b>Explain the trade-off</b></div></div>
          <footer><span><ShieldCheck/></span><div><small>DEEP DIVE → DELIVER</small><strong>Analogy · Architecture · Prompt · Interview insight</strong></div></footer>
        </div>
      </div>
      <div className="bytes-learning-promise"><div className="container-custom">
        <div><span><Eye/></span><p><b>Understand visually</b><small>Animated flows make the concept easier to see.</small></p></div>
        <div><span><Code2/></span><p><b>Apply immediately</b><small>Use practical examples and copy-ready prompts.</small></p></div>
        <div><span><ShieldCheck/></span><p><b>Learn with confidence</b><small>Official sources and human review support every guide.</small></p></div>
      </div></div>
    </section>
    <section id="tracks" className="handbook-showcase home-motion-section"><div className="container-custom"><div className="handbook-card">
      <div className="handbook-card-copy"><p className="eyebrow dark">Featured Handbook · 01</p><h2>The GitHub Copilot Handbook</h2><p>One connected learning path for developers—not scattered AI tips. Understand how Copilot uses context, supports feature delivery, assists debugging and fits inside a responsible engineering workflow.</p><div className="handbook-outcomes"><span><b>5</b> practical chapters</span><span><b>5</b> animated explainers</span><span><b>Real</b> workflow examples</span></div><Link href="/software-engineering/">Explore the Handbook <ArrowRight/></Link></div>
      <div className="handbook-map" aria-label="Five chapter GitHub Copilot learning path">{chapters.map((chapter,index)=><Link href={`/${chapter.category}/${chapter.slug}/`} key={chapter.slug}><span>0{index+1}</span><div><small>CHAPTER</small><strong>{chapter.title}</strong></div><ArrowRight/></Link>)}</div>
    </div></div></section>
    <div className="home-motion-section"><BytesLibrary chapters={chapters} /></div>
    <section id="interview-prep" className="interview-section home-motion-section"><div className="container-custom interview-inner"><div><p className="eyebrow">Interview-ready learning</p><h2>Understand Copilot well enough to explain your engineering decisions.</h2><p>Every Handbook chapter includes a concise interview answer, follow-up questions and a practical developer scenario.</p><Link className="primary-cta" href="/software-engineering/">Open the complete handbook <ArrowRight/></Link></div><div className="interview-card"><span>INTERVIEW BIT</span><h3>“How do you verify AI-generated code before shipping it?”</h3><p>Start with the requirement. Inspect the diff. Run tests and security checks. Finish with human approval.</p><small>Practical framework · Stronger answer</small></div></div></section>
    <section className="course-bridge home-motion-section"><div className="container-custom course-bridge-inner"><div><p className="eyebrow dark">From awareness to outcomes</p><h2>Learn the concept free. Build the complete skill with MaanavaN.</h2><p>Bytes give you focused explanations. The Course Library gives you structured learning, guided practice and project-based progression.</p><div className="bridge-steps"><span><b>01</b>Understand with Bytes</span><span><b>02</b>Practise in a course</span><span><b>03</b>Build practical evidence</span></div></div><div className="bridge-actions"><a className="bridge-primary" href="https://www.maanavan.com/course-library"><BookOpen/>Explore Course Library <ArrowRight/></a><a className="bridge-membership" href="https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247"><Users/>All-Access Membership<span>Learn across eligible courses with continued guidance.</span></a></div></div></section>
  </HomeMotion>;
}
