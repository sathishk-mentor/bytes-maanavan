import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ByteHeader } from '@/components/bytes/ByteHeader';
import { ByteContent } from '@/components/bytes/ByteContent';
import { ProgressSidebar } from '@/components/bytes/ProgressSidebar';
import { PrevNextNav } from '@/components/bytes/PrevNextNav';
import {
  getAllBytes,
  getByteBySlug,
  getAdjacentBytes,
  getRelatedBytes,
  getCategoryBytesCount,
} from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/categories';

interface BytePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const bytes = await getAllBytes();

  return bytes.map((byte) => ({
    slug: byte.slug,
  }));
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.slug);

  if (!byte) {
    return {
      title: 'Byte Not Found',
    };
  }

  return {
    title: `${byte.title} | MaanavaN Bytes`,
    description: byte.summary,
    keywords: byte.tags,
    openGraph: {
      title: byte.title,
      description: byte.summary,
      type: 'article',
      publishedTime: byte.updatedAt,
    },
  };
}

export default async function BytePage({ params }: BytePageProps) {
  const byte = await getByteBySlug(params.slug);

  if (!byte) {
    notFound();
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(params.slug);
  const relatedBytes = await getRelatedBytes(params.slug);
  const totalCategoryBytes = await getCategoryBytesCount(byte.category);

  const breadcrumbItems = [
    {
      label: category?.title || byte.category,
      href: `/category/${byte.category}`,
    },
    {
      label: byte.title,
      href: `/bytes/${byte.slug}`,
    },
  ];

  return (
    <>
      <ByteHeader byte={byte} />

      <div className="bg-white py-12">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,320px]">
            {/* Main Content */}
            <div>
              <ByteContent content={byte.content} />
              <PrevNextNav prev={prev} next={next} />
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <ProgressSidebar
                byteSlug={byte.slug}
                category={byte.category}
                relatedBytes={relatedBytes}
                totalCategoryBytes={totalCategoryBytes}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
