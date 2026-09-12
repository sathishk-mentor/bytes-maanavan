import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ByteHeader } from '@/components/bytes/ByteHeader';
import { ByteContent } from '@/components/bytes/ByteContent';
import { PrevNextNav } from '@/components/bytes/PrevNextNav';
import { AccordionTableOfContents } from '@/components/bytes/AccordionTableOfContents';
import {
  getAllBytes,
  getByteBySlug,
  getAdjacentBytes,
  extractHeadings,
} from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/categories';
import { legacyByte, legacyBytes } from '@/lib/legacy-content';
import { CourseRecommendation } from '@/components/bytes/CourseRecommendation';

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

export async function generateStaticParams() {
  return legacyBytes.map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.byteSlug) || legacyByte(params.categorySlug, params.byteSlug);

  if (!byte || byte.category !== params.categorySlug) {
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
  const { categorySlug, byteSlug } = params;

  // Get byte and validate category matches
  const byte = await getByteBySlug(byteSlug) || legacyByte(categorySlug, byteSlug);

  if (!byte || byte.category !== categorySlug) {
    notFound();
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(byteSlug);

  // Extract headings for accordion navigation
  const headings = extractHeadings(byte.content);

  const breadcrumbItems = [
    {
      label: category?.title || byte.category,
      href: `/category/${byte.category}`,
    },
  ];

  return (
    <>
      <ByteHeader byte={byte} breadcrumbItems={breadcrumbItems} />

      <div className="byte-reading-canvas">
        <div className="byte-reading-layout">
          <AccordionTableOfContents headings={headings} byteSlug={byte.slug} />
          <div className="byte-main-column">
            <ByteContent content={byte.content} />
            <CourseRecommendation categorySlug={categorySlug} />
            <div className="mt-12">
              <PrevNextNav prev={prev} next={next} />
            </div>
          </div>
          <aside className="byte-trust-rail"><div><span>REVIEWED BY</span><h3>Sathish Kumar</h3><p>Founder & Chief AI Educator, MaanavaN</p><small>17+ years of industry and learning experience</small></div><div><span>LEARNING FORMAT</span><p>Easy English</p><p>Limited Tamil support</p><p>Real-world application</p><p>Interview preparation</p></div></aside>
        </div>
      </div>
    </>
  );
}
