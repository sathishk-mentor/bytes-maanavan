import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getAllCategories, getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory } from '@/lib/mdx';

export function generateStaticParams() { return getAllCategories().map(({ slug }) => ({ categorySlug: slug })); }

export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  return category ? { title: `${category.title} tutorials | MaanavaN Bytes`, description: category.description } : {};
}

export default async function TrackPage({ params }: { params: { categorySlug: string } }) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();
  const lessons = await getBytesByCategory(category.slug);
  return <>
    <section className="track-hero"><div className="container-custom py-16">
      <p className="eyebrow">15-lesson learning track</p>
      <h1>{category.title}</h1><p className="mt-5 max-w-2xl text-lg text-slate-300">{category.heroLine}. Every lesson includes a simple explanation, analogy, use case, architecture walkthrough and interview bit.</p>
    </div></section>
    <CategoryPageClient bytes={lessons} />
  </>;
}
