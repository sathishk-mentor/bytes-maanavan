import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Code2, Eye, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { BytesLibrary } from '@/components/home/BytesLibrary';
import { PublishedHandbooks } from '@/components/home/PublishedHandbooks';
import { HomeMotion } from '@/components/home/HomeMotion';
import { getAllBytes, getBytesByCategory } from '@/lib/mdx';

export default async function HomePage() {
  const chapters = await getBytesByCategory('software-engineering');
  const fdeChapters = await getBytesByCategory('forward-deployed-engineer');
  const allBytes = await getAllBytes();
  return <HomeMotion>
    <section className="bytes-premium-hero">
      <div className="hero-aurora hero-aurora-one"/><div className="hero-aurora hero-aurora-two"/>
      <div className="container-custom bytes-hero-layout">
        <div className="bytes-hero-copy">
          <p className="eyebrow"><Sparkles/> MaanavaN Bytes · Visual technology handbooks</p>
          <h1>Understand technology.<br/><span>One visual Byte at a time.</span></h1>
          <p>Start with a clear mental model, explore the workflow visually, apply it to a real scenario and finish ready to explain the concept with confidence.</p>
          <div className="bytes-hero-actions"><Link className="primary-cta" href="#bytes-library">Explore Bytes Library <ArrowRight/></Link><Link className="ghost-cta" href="/handbooks/">Browse Handbooks</Link></div>
          <div className="bytes-hero-trust"><span><CheckCircle2/>Visual-first explanations</span><span><CheckCircle2/>Primary-source research</span><span><CheckCircle2/>Free to learn</span></div>
        </div>
        <div className="hero-learning-console hero-byte-demo" aria-label="Animated example showing how a MaanavaN Byte teaches one concept">
          <header><span><i/><i/><i/></span><small>ONE BYTE · ONE CLEAR OUTCOME</small><b>LIVE LEARNING FLOW</b></header>
          <div className="demo-question"><small>START WITH A REAL QUESTION</small><strong>Why does Copilot need context?</strong><p>A beginner should understand the reason before learning the feature.</p></div>
          <div className="demo-flow"><span><i>01</i><b>Understand</b><small>Simple explanation</small></span><em>→</em><span><i>02</i><b>Visualise</b><small>See the workflow</small></span><em>→</em><span><i>03</i><b>Apply</b><small>Real scenario</small></span><em>→</em><span><i>04</i><b>Explain</b><small>Interview insight</small></span></div>
          <footer><span><CheckCircle2/></span><div><small>LEARNING OUTCOME</small><strong>“I understand it, can apply it and can explain my decision.”</strong></div></footer>
        </div>
      </div>
      <div className="bytes-learning-promise"><div className="container-custom">
        <div><span><Eye/></span><p><b>Understand visually</b><small>Animated flows make the concept easier to see.</small></p></div>
        <div><span><Code2/></span><p><b>Apply immediately</b><small>Use practical examples and copy-ready prompts.</small></p></div>
        <div><span><ShieldCheck/></span><p><b>Learn with confidence</b><small>Clear explanations grounded in practical evidence.</small></p></div>
      </div></div>
    </section>
    <div id="tracks" className="home-motion-section"><PublishedHandbooks handbooks={[{slug:'software-engineering',title:'The GitHub Copilot Handbook',label:'AI-ASSISTED SOFTWARE ENGINEERING',description:'Use Copilot across context, feature delivery, debugging, testing and responsible engineering decisions.',chapters},{slug:'forward-deployed-engineer',title:'The Forward Deployed Engineer Handbook',label:'CUSTOMER TO PRODUCTION',description:'Move from customer ambiguity to production systems, adoption evidence and reusable product learning.',chapters:fdeChapters}]} /></div>
    <div className="home-motion-section"><BytesLibrary chapters={allBytes} /></div>
    <section id="interview-prep" className="interview-section home-motion-section"><div className="container-custom interview-inner"><div><p className="eyebrow">Interview-ready learning</p><h2>Understand the concept well enough to explain your decisions.</h2><p>Every published Byte connects the mental model to a practical scenario, common mistakes and a concise interview answer.</p><Link className="primary-cta" href="/handbooks/">Explore all handbooks <ArrowRight/></Link></div><div className="interview-card"><span>INTERVIEW BIT</span><h3>“How would you move an AI solution from customer request to production?”</h3><p>Discover the workflow, define the outcome, build a thin production slice, observe evidence and improve deliberately.</p><small>Practical framework · Stronger answer</small></div></div></section>
    <section className="course-bridge home-motion-section"><div className="container-custom course-bridge-inner"><div><p className="eyebrow dark">From awareness to outcomes</p><h2>Learn the concept free. Build the complete skill with MaanavaN.</h2><p>Bytes give you focused explanations. The Course Library gives you structured learning, guided practice and project-based progression.</p><div className="bridge-steps"><span><b>01</b>Understand with Bytes</span><span><b>02</b>Practise in a course</span><span><b>03</b>Build practical evidence</span></div></div><div className="bridge-actions"><a className="bridge-primary" href="https://www.maanavan.com/course-library"><BookOpen/>Explore Course Library <ArrowRight/></a><a className="bridge-membership" href="https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247"><Users/>All-Access Membership<span>Learn across eligible courses with continued guidance.</span></a></div></div></section>
  </HomeMotion>;
}
