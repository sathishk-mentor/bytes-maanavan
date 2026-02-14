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

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

export async function generateStaticParams() {
  const bytes = await getAllBytes();

  return bytes.map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.byteSlug);

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
  const byte = await getByteBySlug(byteSlug);

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

      <div className="bg-white min-h-screen">
        <div className="relative">
          {/* Left Accordion Sidebar */}
          <AccordionTableOfContents headings={headings} byteSlug={byte.slug} />

          {/* Main Content Area */}
          <div className="ml-0 lg:ml-[300px] max-w-full lg:max-w-[900px] px-6 lg:px-12 py-10 relative z-10">
            <ByteContent content={byte.content} />

            <div className="mt-12">
              <PrevNextNav prev={prev} next={next} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
