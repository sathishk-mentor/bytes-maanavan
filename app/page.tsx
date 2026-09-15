import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Bot, CheckCircle2, Code2, Database, Eye, FileSearch, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { BytesLibrary } from '@/components/home/BytesLibrary';
import { PublishedHandbooks } from '@/components/home/PublishedHandbooks';
import { HomeMotion } from '@/components/home/HomeMotion';
import { getAllBytes } from '@/lib/mdx';
import { handbooks } from '@/lib/handbooks';

export const metadata: Metadata = {
  title: 'Free Visual AI & Technology Handbooks',
  description: 'Learn AI Agents, Generative AI, RAG, LangChain, Java, SQL, FastAPI, Docker and software engineering through beginner-friendly visual Bytes and practical workflows.',
  alternates: { canonical: '/' },
  openGraph: { title: 'MaanavaN Bytes | Visual Technology Learning', description: 'Beginner-friendly visual handbooks, real scenarios and practical technology workflows.', url: '/', type: 'website' },
};

export default async function HomePage() {
  const allBytes = await getAllBytes();
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':'https://bytes.maanavan.com/#collection',name:'MaanavaN Bytes',url:'https://bytes.maanavan.com/',description:'A visual library of practical technology learning Bytes.',isPartOf:{'@id':'https://bytes.maanavan.com/#website'},mainEntity:{'@type':'ItemList',itemListElement:allBytes.map((byte,index)=>({'@type':'ListItem',position:index+1,url:`https://bytes.maanavan.com/${byte.category}/${byte.slug}/`,name:byte.title}))}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MaanavaN Bytes',item:'https://bytes.maanavan.com/'}]}
  ]};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><HomeMotion>
    <section className="bytes-premium-hero bytes-premium-hero-v2">
      <div className="hero-aurora hero-aurora-one"/><div className="hero-aurora hero-aurora-two"/>
      <div className="container-custom bytes-hero-layout">
        <div className="bytes-hero-copy">
          <p className="eyebrow"><Sparkles/> Free visual handbooks · Personally reviewed</p>
          <h1>Build technology skills.<br/><span>One practical Byte at a time.</span></h1>
          <p>Learn AI, software, data and cloud through simple explanations, visual workflows and real-world scenarios—designed for beginners and busy professionals.</p>
          <div className="bytes-hero-actions"><Link className="primary-cta" href="#tracks">Start a learning path <ArrowRight/></Link><Link className="ghost-cta" href="#bytes-library">Search all Bytes</Link></div>
          <div className="bytes-hero-trust"><span><CheckCircle2/>Complete visual handbooks</span><span><CheckCircle2/>Practical bite-sized learning</span><span><CheckCircle2/>Free access</span></div>
        </div>
        <div className="hero-learning-console hero-path-console" aria-label="Animated MaanavaN Bytes learning-path preview">
          <header><span><i/><i/><i/></span><small>MAANAVAN LEARNING PATH</small><b><i/> UPDATED</b></header>
          <div className="hero-path-heading"><div><small>START HERE</small><strong>Choose the outcome you want</strong></div><span>Explore paths</span></div>
          <div className="hero-path-list">
            <Link href="/ai-agents/"><span className="path-icon path-violet"><Bot/></span><div><small>BEGINNER · 5 BYTES</small><strong>Understand AI Agents</strong><em>From answering to taking action</em></div><ArrowRight/></Link>
            <Link href="/modern-java-spring-boot-genai/"><span className="path-icon path-orange"><Code2/></span><div><small>BUILD · 5 BYTES</small><strong>Modern Java + GenAI</strong><em>From foundations to enterprise AI</em></div><ArrowRight/></Link>
            <Link href="/sql-data-ai-applications/"><span className="path-icon path-blue"><Database/></span><div><small>DATA · 5 BYTES</small><strong>SQL for AI Applications</strong><em>From questions to safe workflows</em></div><ArrowRight/></Link>
          </div>
          <footer><span><FileSearch/></span><div><small>EVERY LEARNING PATH</small><strong>Concept → Visual → Scenario → Practice</strong></div><Link href="/handbooks/">View all</Link></footer>
        </div>
      </div>
      <div className="hero-topic-ribbon"><div className="container-custom"><span><Bot/>AI Agents</span><i/><span><Code2/>Software Engineering</span><i/><span><Database/>Data & SQL</span><i/><span><ShieldCheck/>Cloud & DevOps</span><i/><span><Sparkles/>Generative AI</span></div></div>
      <div className="bytes-learning-promise"><div className="container-custom">
        <div><span><Eye/></span><p><b>See how it works</b><small>Professional diagrams turn complex systems into clear mental models.</small></p></div>
        <div><span><Code2/></span><p><b>Use it in real work</b><small>Apply every concept through scenarios, prompts and practical projects.</small></p></div>
        <div><span><ShieldCheck/></span><p><b>Explain with confidence</b><small>Remember key decisions, common mistakes and interview-ready answers.</small></p></div>
      </div></div>
    </section>
    <div id="tracks" className="home-motion-section"><PublishedHandbooks handbooks={handbooks} /></div>
    <div className="home-motion-section"><BytesLibrary chapters={allBytes} /></div>
    <section id="interview-prep" className="interview-section home-motion-section"><div className="container-custom interview-inner"><div><p className="eyebrow">Interview-ready learning</p><h2>Understand the concept well enough to explain your decisions.</h2><p>Every published Byte connects the mental model to a practical scenario, common mistakes and a concise interview answer.</p><Link className="primary-cta" href="/handbooks/">Explore all handbooks <ArrowRight/></Link></div><div className="interview-card"><span>INTERVIEW BIT</span><h3>“How would you move an AI solution from customer request to production?”</h3><p>Discover the workflow, define the outcome, build a thin production slice, observe evidence and improve deliberately.</p><small>Practical framework · Stronger answer</small></div></div></section>
    <section className="course-bridge home-motion-section"><div className="container-custom course-bridge-inner"><div><p className="eyebrow dark">From awareness to outcomes</p><h2>Learn the concept free. Build the complete skill with MaanavaN.</h2><p>Bytes give you focused explanations. The Course Library gives you structured learning, guided practice and project-based progression.</p><div className="bridge-steps"><span><b>01</b>Understand with Bytes</span><span><b>02</b>Practise in a course</span><span><b>03</b>Build practical evidence</span></div></div><div className="bridge-actions"><a className="bridge-primary" href="https://www.maanavan.com/course-library"><BookOpen/>Explore Course Library <ArrowRight/></a><a className="bridge-membership" href="https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247"><Users/>All-Access Membership<span>Learn across eligible courses with continued guidance.</span></a></div></div></section>
  </HomeMotion></>;
}
