import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';

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
    <section className="track-hero"><div className="container-custom py-16">
      <p className="eyebrow">{lessons.length}-chapter learning handbook</p>
      <h1>{category.title}</h1><p className="mt-5 max-w-2xl text-lg text-slate-300">{category.heroLine}. Every lesson includes a simple explanation, analogy, use case, architecture walkthrough and interview bit.</p>
    </div></section>
    <CategoryPageClient bytes={lessons} />
  </>;
}
