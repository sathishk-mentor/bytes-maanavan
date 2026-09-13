import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowDown, BookOpenCheck, Box, CheckCircle2, Code2, Compass, Container, Layers3, Network, Rocket, Sparkles, Workflow } from 'lucide-react';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';

export const dynamicParams = false;
export function generateStaticParams() {
  return ['software-engineering', 'forward-deployed-engineer', 'genai', 'ai-agents', 'data-engineering', 'cloud-devops', 'cybersecurity', 'case-studies'].map((categorySlug) => ({ categorySlug }));
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

      <section className="handbook-overview"><div className="container-custom handbook-overview-grid">
        <div className="handbook-overview-intro"><p className="eyebrow dark">HANDBOOK OVERVIEW</p><h2>Understand the complete workflow—not isolated tips.</h2><p>Each Byte builds on the previous chapter. Understand the mental model, then apply it through an analogy, a real-time scenario, a visual explainer and an interview-ready decision.</p></div>
        <div className="handbook-facts">
          <article><Code2/><div><small>WHO THIS IS FOR</small><strong>{detail.audience}</strong></div></article>
          <article><Compass/><div><small>PREREQUISITE</small><strong>{detail.prerequisite}</strong></div></article>
          <article><Layers3/><div><small>YOUR OUTCOME</small><strong>{detail.result}</strong></div></article>
        </div>
      </div><div className="container-custom handbook-method">
        <span><b>01</b><strong>Understand</strong><small>Plain-English mental model</small></span>
        <span><b>02</b><strong>Visualise</strong><small>Workflow and architecture</small></span>
        <span><b>03</b><strong>Apply</strong><small>Real project situation</small></span>
        <span><b>04</b><strong>Explain</strong><small>Interview-ready takeaway</small></span>
      </div></section>

      <section id="handbook-learning-path" className="handbook-learning-path">
        <div className="container-custom"><header><div><p className="eyebrow dark">CONNECTED LEARNING PATH</p><h2>Learn in the order the work happens.</h2><p>Complete one focused concept at a time. Every chapter includes practical guidance you can use immediately.</p></div><span><CheckCircle2/>Complete handbook</span></header></div>
        <CategoryPageClient bytes={lessons}/>
      </section>
    </div>
  </>;
}
