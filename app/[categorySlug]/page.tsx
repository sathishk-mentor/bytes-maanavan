import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowDown, BookOpenCheck, CheckCircle2, Code2, Compass, Layers3, Sparkles, Workflow } from 'lucide-react';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';

export const dynamicParams = false;
export function generateStaticParams() {
  return ['software-engineering', 'forward-deployed-engineer', 'genai', 'ai-agents', 'data-engineering', 'cloud-devops', 'cybersecurity', 'case-studies'].map((categorySlug) => ({ categorySlug }));
}

const handbookDetails = {
  'software-engineering': {
    eyebrow: 'AI-ASSISTED SOFTWARE ENGINEERING',
    intro: 'A practical five-part guide to using GitHub Copilot with better context, smaller changes, stronger testing and responsible engineering judgement.',
    audience: 'Developers learning AI-assisted delivery',
    prerequisite: 'Basic coding and Git awareness',
    result: 'A repeatable plan → build → test → review workflow',
    keywords: ['GitHub Copilot handbook', 'GitHub Copilot tutorial', 'AI coding assistant', 'Copilot for developers', 'AI-assisted software engineering'],
  },
  'forward-deployed-engineer': {
    eyebrow: 'CUSTOMER PROBLEM TO PRODUCTION',
    intro: 'A practical five-part guide to discovering real workflow problems, designing a thin production slice, deploying safely and converting field learning into product value.',
    audience: 'Engineers, consultants and solution leaders',
    prerequisite: 'No FDE experience required',
    result: 'A customer → discovery → production → product framework',
    keywords: ['Forward Deployed Engineer handbook', 'FDE role explained', 'FDE tutorial', 'customer engineering', 'AI solution delivery'],
  },
} as const;
type PublishedCategory = keyof typeof handbookDetails;

export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  const detail = handbookDetails[params.categorySlug as PublishedCategory];
  if (!category || !detail) return { title: 'Handbook moved', robots: { index: false, follow: true } };
  return {
    title: `${category.title}: 5 Practical Bytes`,
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

  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: category.title,
    description: detail.intro, url: `https://bytes.maanavan.com/${params.categorySlug}/`,
    isPartOf: { '@type': 'WebSite', name: 'MaanavaN Bytes', url: 'https://bytes.maanavan.com/' },
    hasPart: lessons.map((lesson, index) => ({
      '@type': 'LearningResource', position: index + 1, name: lesson.title,
      description: lesson.summary, educationalLevel: lesson.level, timeRequired: lesson.duration,
      url: `https://bytes.maanavan.com/${lesson.category}/${lesson.slug}/`,
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <main>
      <section className={`track-hero track-hero-${params.categorySlug}`}><div className="container-custom track-hero-inner">
        <div className="track-hero-copy"><p className="eyebrow"><Sparkles/>{detail.eyebrow}</p><h1>{category.title}</h1><p>{detail.intro}</p>
          <div className="track-hero-points"><span><BookOpenCheck/>5 connected Bytes</span><span>Beginner-friendly</span><span>Real project scenarios</span></div>
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
        <div className="container-custom"><header><div><p className="eyebrow dark">5-BYTE LEARNING PATH</p><h2>Learn in the order the work happens.</h2><p>Complete one focused concept at a time. Every chapter includes practical guidance you can use immediately.</p></div><span><CheckCircle2/>5 of 5 published</span></header></div>
        <CategoryPageClient bytes={lessons}/>
      </section>
    </main>
  </>;
}
