import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';
import { ArrowDown, BookOpenCheck, Sparkles } from 'lucide-react';

export const dynamicParams = false;
export function generateStaticParams() {
  return ['software-engineering', 'forward-deployed-engineer', 'genai', 'ai-agents', 'data-engineering', 'cloud-devops', 'cybersecurity', 'case-studies']
    .map((categorySlug) => ({ categorySlug }));
}

function legacyDestination(categorySlug: string) {
  if (categorySlug === 'genai') return '/handbooks/generative-ai/';
  if (categorySlug === 'ai-agents') return '/handbooks/ai-agents/';
  if (categorySlug === 'cloud-devops') return '/handbooks/devops-ai-era/';
  return '/handbooks/';
}

export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  return category ? { title: `${category.title} tutorials | MaanavaN Bytes`, description: category.description } : {};
}

export default async function TrackPage({ params }: { params: { categorySlug: string } }) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();
  const lessons = await getBytesByCategory(category.slug);
  if (!lessons.length) permanentRedirect(legacyDestination(params.categorySlug));
  return <>
    <section className={`track-hero track-hero-${params.categorySlug}`}><div className="container-custom track-hero-inner">
      <div className="track-hero-copy"><p className="eyebrow"><Sparkles/>{lessons.length}-chapter visual handbook</p>
      <h1>{category.title}</h1><p>{category.heroLine}. Learn through plain-English explanations, familiar analogies, real project situations and visual workflows.</p>
      <div className="track-hero-points"><span><BookOpenCheck/>Beginner-friendly</span><span>Real-world scenarios</span><span>Interview-ready</span></div>
      <a href="#handbook-bytes">Start with Byte 01 <ArrowDown/></a></div>
      <div className="track-hero-visual" aria-hidden="true"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-code-card"><small>LEARN THE WORKFLOW</small><strong>Understand</strong><i>→</i><strong>Apply</strong><i>→</i><strong>Explain</strong></div></div>
    </div></section>
    <div id="handbook-bytes">
    <CategoryPageClient bytes={lessons} />
    </div>
  </>;
}
