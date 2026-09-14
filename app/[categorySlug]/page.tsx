import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowDown, BookOpenCheck, Box, CheckCircle2, Code2, Compass, Container, Database, FileSearch, Layers3, Network, Rocket, SearchCheck, Server, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';

export const dynamicParams = false;
export function generateStaticParams() {
  return ['software-engineering', 'forward-deployed-engineer', 'langchain', 'rag-application-engineering', 'fastapi-ai-applications', 'modern-java-spring-boot-genai', 'genai', 'ai-agents', 'data-engineering', 'cloud-devops', 'cybersecurity', 'case-studies'].map((categorySlug) => ({ categorySlug }));
}

const handbookDetails = {
  'software-engineering': {
    searchTitle: 'GitHub Copilot Handbook for Developers',
    eyebrow: 'AI-ASSISTED SOFTWARE ENGINEERING',
    intro: 'A practical five-part guide to using GitHub Copilot with better context, smaller changes, stronger testing and responsible engineering judgement.',
    audience: 'Developers learning AI-assisted delivery',
    prerequisite: 'Basic coding and Git awareness',
    result: 'A repeatable plan → build → test → review workflow',
    keywords: ['GitHub Copilot handbook', 'GitHub Copilot tutorial', 'AI coding assistant', 'Copilot for developers', 'AI-assisted software engineering'],
  },
  'forward-deployed-engineer': {
    searchTitle: 'Forward Deployed Engineer (FDE) Handbook',
    eyebrow: 'CUSTOMER PROBLEM TO PRODUCTION',
    intro: 'A practical five-part guide to discovering real workflow problems, designing a thin production slice, deploying safely and converting field learning into product value.',
    audience: 'Engineers, consultants and solution leaders',
    prerequisite: 'No FDE experience required',
    result: 'A customer → discovery → production → product framework',
    keywords: ['Forward Deployed Engineer handbook', 'FDE role explained', 'FDE tutorial', 'customer engineering', 'AI solution delivery'],
  },
  'cloud-devops': {
    searchTitle: 'Docker Handbook for Beginners',
    eyebrow: 'CONTAINERS TO CLOUD',
    intro: 'A practical five-part Docker guide covering containers, Python application packaging, ports, volumes, environment variables, Compose and Generative AI deployment.',
    audience: 'Beginners, developers and AI builders',
    prerequisite: 'Basic command-line awareness',
    result: 'A build → run → connect → compose → deploy workflow',
    keywords: ['Docker handbook', 'Docker tutorial for beginners', 'Docker Python tutorial', 'Docker Compose tutorial', 'Docker Generative AI application'],
  },
  'langchain': {
    searchTitle: 'LangChain for GenAI and AI Agents Handbook',
    eyebrow: 'LLM APPLICATION ENGINEERING',
    intro: 'Build practical LLM, RAG and agentic AI applications with Python—from model calls and structured responses to tools, memory, observability and Docker deployment.',
    audience: 'Python developers and practical AI builders',
    prerequisite: 'Basic Python; no LangChain experience required',
    result: 'A model → RAG → agent → production learning path',
    keywords: ['LangChain tutorial', 'LangChain Python', 'LangChain RAG', 'LangChain agents', 'LangChain for beginners', 'GenAI application development'],
  },
  'rag-application-engineering': {
    searchTitle: 'RAG Application Engineering Handbook for Beginners',
    eyebrow: 'PRIVATE KNOWLEDGE TO GROUNDED ANSWERS',
    intro: 'Build reliable Retrieval-Augmented Generation applications—from loading and chunking documents to semantic search, cited answers, evaluation, security and deployment.',
    audience: 'Beginners, Python developers and AI builders',
    prerequisite: 'Basic Python; no RAG experience required',
    result: 'An ingest → retrieve → ground → evaluate → deploy workflow',
    keywords: ['RAG tutorial for beginners', 'Retrieval Augmented Generation handbook', 'RAG application with Python', 'LangChain RAG tutorial', 'vector database semantic search', 'production RAG evaluation'],
  },
  'fastapi-ai-applications': {
    searchTitle: 'FastAPI for AI Applications Handbook',
    eyebrow: 'PYTHON TO PRODUCTION AI API',
    intro: 'Build, secure and deploy production-ready GenAI APIs with Python—from endpoints and Pydantic validation to streamed RAG responses, authentication, testing and Docker.',
    audience: 'Python developers and practical AI builders',
    prerequisite: 'Basic Python; no web API experience required',
    result: 'A request → validate → retrieve → stream → operate workflow',
    keywords: ['FastAPI tutorial for beginners', 'FastAPI AI application', 'FastAPI GenAI API', 'FastAPI streaming response', 'FastAPI RAG API', 'production FastAPI Docker'],
  },
  'modern-java-spring-boot-genai': {
    searchTitle: 'Modern Java with Spring Boot and GenAI Handbook',
    eyebrow: 'ENTERPRISE JAVA IN THE AI ERA',
    intro: 'Build an enterprise Java application from modern language foundations and Spring Boot APIs to JPA persistence, grounded Generative AI, security, testing and Docker deployment.',
    audience: 'Java beginners and enterprise application developers',
    prerequisite: 'Basic programming awareness; no Spring experience required',
    result: 'A Java → API → database → RAG → production workflow',
    keywords: ['modern Java tutorial', 'Spring Boot tutorial for beginners', 'Spring AI RAG tutorial', 'Java Generative AI application', 'Spring Boot REST API', 'enterprise Java AI application'],
  },
} as const;
type PublishedCategory = keyof typeof handbookDetails;

export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  const detail = handbookDetails[params.categorySlug as PublishedCategory];
  if (!category || !detail) return { title: 'Handbook moved', robots: { index: false, follow: true } };
  return {
    title: detail.searchTitle,
    description: detail.intro,
    keywords: [...detail.keywords],
    alternates: { canonical: `/${params.categorySlug}/` },
    openGraph: { title: category.title, description: detail.intro, type: 'website', url: `/${params.categorySlug}/` },
  };
}

function HandbookHeroVisual({ categorySlug }: { categorySlug: PublishedCategory }) {
  if (categorySlug === 'software-engineering') {
    return <div className="handbook-hero-visual copilot-hero-visual" aria-label="Animated GitHub Copilot development workflow">
      <div className="copilot-window">
        <div className="window-bar"><i/><i/><i/><span>feature.ts</span></div>
        <div className="code-lines"><span/><span/><span/><span/><span/></div>
        <div className="copilot-suggestion"><Sparkles/><div><small>COPILOT SUGGESTION</small><b>Implement the smallest safe change</b></div></div>
        <div className="code-scan"/>
      </div>
      <div className="workflow-chips"><span>Context</span><i>→</i><span>Plan</span><i>→</i><span>Build</span><i>→</i><span>Verify</span></div>
    </div>;
  }
  if (categorySlug === 'cloud-devops') {
    return <div className="handbook-hero-visual docker-hero-visual" aria-label="Animated Docker build and deployment workflow">
      <div className="docker-pipeline">
        <header><Container/><span><small>DOCKER WORKFLOW</small><strong>Package once. Run consistently.</strong></span><i>READY</i></header>
        <div><span><Code2/><small>Source</small></span><b>→</b><span><Box/><small>Image</small></span><b>→</b><span><Container/><small>Container</small></span><b>→</b><span><Rocket/><small>Cloud</small></span></div>
        <footer><Network/><span>Portable runtime with explicit configuration</span></footer>
      </div>
    </div>;
  }
  if (categorySlug === 'langchain') {
    return <div className="handbook-hero-visual langchain-hero-visual" aria-label="Animated LangChain application workflow">
      <div className="langchain-orchestrator"><header><Network/><span><small>LANGCHAIN APPLICATION</small><strong>Compose the right capabilities</strong></span><i>RUNNING</i></header><div><span><Code2/><small>Python</small></span><b>→</b><span><Sparkles/><small>Model</small></span><b>→</b><span><Database/><small>Knowledge</small></span><b>→</b><span><Workflow/><small>Tools</small></span></div><footer><CheckCircle2/><span>Grounded · stateful · observable</span></footer></div>
    </div>;
  }
  if (categorySlug === 'rag-application-engineering') {
    return <div className="handbook-hero-visual langchain-hero-visual" aria-label="Animated retrieval augmented generation application workflow">
      <div className="langchain-orchestrator"><header><FileSearch/><span><small>RAG APPLICATION</small><strong>Retrieve evidence before answering</strong></span><i>GROUNDED</i></header><div><span><Database/><small>Knowledge</small></span><b>→</b><span><SearchCheck/><small>Retrieve</small></span><b>→</b><span><Layers3/><small>Context</small></span><b>→</b><span><Sparkles/><small>Cited answer</small></span></div><footer><CheckCircle2/><span>Relevant · authorised · traceable</span></footer></div>
    </div>;
  }
  if (categorySlug === 'fastapi-ai-applications') {
    return <div className="handbook-hero-visual docker-hero-visual" aria-label="Animated FastAPI request to streamed AI response workflow">
      <div className="docker-pipeline"><header><Server/><span><small>ENTERPRISE AI ASSISTANT API</small><strong>Validate every request. Stream useful evidence.</strong></span><i>200 OK</i></header><div><span><Code2/><small>Client</small></span><b>→</b><span><ShieldCheck/><small>Validate</small></span><b>→</b><span><Database/><small>Retrieve</small></span><b>→</b><span><Sparkles/><small>Stream</small></span></div><footer><Network/><span>Typed · protected · observable</span></footer></div>
    </div>;
  }
  if (categorySlug === 'modern-java-spring-boot-genai') {
    return <div className="handbook-hero-visual docker-hero-visual" aria-label="Animated Java enterprise AI application workflow">
      <div className="docker-pipeline"><header><Code2/><span><small>ENTERPRISE POLICY ASSISTANT</small><strong>Build dependable Java systems with grounded AI.</strong></span><i>SPRING</i></header><div><span><Code2/><small>Java</small></span><b>→</b><span><Server/><small>REST API</small></span><b>→</b><span><Database/><small>Policies</small></span><b>→</b><span><Sparkles/><small>Grounded AI</small></span></div><footer><ShieldCheck/><span>Typed · secure · testable · deployable</span></footer></div>
    </div>;
  }
  return <div className="handbook-hero-visual fde-hero-visual" aria-label="Animated Forward Deployed Engineer outcome loop">
    <div className="fde-loop">
      <div className="fde-core"><Workflow/><small>FIELD EVIDENCE</small><strong>Production outcome</strong></div>
      <span className="fde-node node-one">Discover</span><span className="fde-node node-two">Design</span>
      <span className="fde-node node-three">Deploy</span><span className="fde-node node-four">Productise</span>
      <i className="fde-orbit"/>
    </div>
  </div>;
}

export default async function TrackPage({ params }: { params: { categorySlug: string } }) {
  const detail = handbookDetails[params.categorySlug as PublishedCategory];
  if (!detail) permanentRedirect('/handbooks/');
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();
  const lessons = await getBytesByCategory(category.slug);
  if (!lessons.length) permanentRedirect('/handbooks/');

  const canonical = `https://bytes.maanavan.com/${params.categorySlug}/`;
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':`${canonical}#collection`,name:category.title,description:detail.intro,url:canonical,isPartOf:{'@id':'https://bytes.maanavan.com/#website'},audience:{'@type':'Audience',audienceType:detail.audience},mainEntity:{'@type':'ItemList',itemListElement:lessons.map((lesson,index)=>({'@type':'ListItem',position:index+1,url:`https://bytes.maanavan.com/${lesson.category}/${lesson.slug}/`,name:lesson.title}))}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MaanavaN Bytes',item:'https://bytes.maanavan.com/'},{'@type':'ListItem',position:2,name:category.title,item:canonical}]}
  ]};

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <div>
      <section className={`track-hero track-hero-${params.categorySlug}`}><div className="container-custom track-hero-inner">
        <div className="track-hero-copy"><p className="eyebrow"><Sparkles/>{detail.eyebrow}</p><h1>{category.title}</h1><p>{detail.intro}</p>
          <div className="track-hero-points"><span><BookOpenCheck/>Connected learning path</span><span>Beginner-friendly</span><span>Real project scenarios</span></div>
          <a href="#handbook-learning-path">Start with Byte 01 <ArrowDown/></a>
        </div>
        <HandbookHeroVisual categorySlug={params.categorySlug as PublishedCategory}/>
      </div></section>

      <section className={`handbook-overview handbook-overview-${params.categorySlug}`}><div className="container-custom">
        <div className="handbook-overview-shell">
          <div className="handbook-overview-grid">
            <div className="handbook-overview-intro">
              <p className="eyebrow dark"><span/>HANDBOOK OVERVIEW</p>
              <h2>See the whole system.<br/><em>Then master each decision.</em></h2>
              <p>This is a connected learning path—not a collection of isolated tips. Every Byte builds the mental model, makes the workflow visible and applies it to a situation you could meet in a real project.</p>
              <div className="overview-learning-promise"><CheckCircle2/><span><b>Designed for practical understanding</b><small>Finish ready to recognise, apply and explain the concept.</small></span></div>
            </div>
            <div className="handbook-facts" aria-label="Handbook learning details">
              <article><span><Code2/></span><div><small>WHO THIS IS FOR</small><strong>{detail.audience}</strong></div><i>01</i></article>
              <article><span><Compass/></span><div><small>STARTING POINT</small><strong>{detail.prerequisite}</strong></div><i>02</i></article>
              <article><span><Layers3/></span><div><small>WHAT YOU WILL BUILD</small><strong>{detail.result}</strong></div><i>03</i></article>
            </div>
          </div>
          <div className="handbook-method-heading"><div><small>THE MAANAVAN LEARNING METHOD</small><strong>One clear progression in every Byte</strong></div><p>Move from first understanding to confident explanation.</p></div>
          <div className="handbook-method">
            <span><i><BookOpenCheck/></i><b>UNDERSTAND</b><strong>Build the mental model</strong><small>Start with plain language and a familiar analogy.</small></span>
            <span><i><Network/></i><b>VISUALISE</b><strong>Follow the workflow</strong><small>See how each component connects and why it matters.</small></span>
            <span><i><Workflow/></i><b>APPLY</b><strong>Enter a real scenario</strong><small>Use the concept in a practical project situation.</small></span>
            <span><i><CheckCircle2/></i><b>EXPLAIN</b><strong>Make the decision clear</strong><small>Finish with mistakes, takeaways and an interview answer.</small></span>
          </div>
        </div>
      </div></section>

      <section id="handbook-learning-path" className="handbook-learning-path">
        <div className="container-custom"><header><div><p className="eyebrow dark">CONNECTED LEARNING PATH</p><h2>Learn in the order the work happens.</h2><p>Complete one focused concept at a time. Every chapter includes practical guidance you can use immediately.</p></div><span><CheckCircle2/>Complete handbook</span></header></div>
        <CategoryPageClient bytes={lessons}/>
      </section>
    </div>
  </>;
}
