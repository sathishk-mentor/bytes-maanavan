import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { CategoryPageClient } from '@/components/category/CategoryPageClient';
import { getAllCategories, getCategoryBySlug } from '@/lib/categories';
import { getBytesByCategory, getBeginnerBytesCount } from '@/lib/mdx';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} | MaanavaN Bytes`,
    description: category.description,
    openGraph: {
      title: `${category.title} Bytes`,
      description: category.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const bytes = await getBytesByCategory(params.slug);
  const beginnerCount = await getBeginnerBytesCount(params.slug);

  const breadcrumbItems = [
    {
      label: category.title,
      href: `/category/${category.slug}`,
    },
  ];

  return (
    <>
      <div className="mb-8 bg-white py-6">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <CategoryHeader
        category={category}
        totalBytes={bytes.length}
        beginnerCount={beginnerCount}
      />

      <CategoryPageClient bytes={bytes} />
    </>
  );
}
