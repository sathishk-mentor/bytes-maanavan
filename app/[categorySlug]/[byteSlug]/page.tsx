import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import legacyRoutes from '@/data/legacy-routes.json';
import { ByteHeader } from '@/components/bytes/ByteHeader';
import { ByteContent } from '@/components/bytes/ByteContent';
import { PrevNextNav } from '@/components/bytes/PrevNextNav';
import { AccordionTableOfContents } from '@/components/bytes/AccordionTableOfContents';
import {
  getAllBytes,
  getByteBySlug,
  getAdjacentBytes,
  getBytesByCategory,
  extractHeadings,
} from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/categories';
import { CourseRecommendation } from '@/components/bytes/CourseRecommendation';
import { ReadingReveal } from '@/components/bytes/ReadingReveal';

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const bytes = await getAllBytes();
  const published = bytes.filter((byte) => ['software-engineering','forward-deployed-engineer'].includes(byte.category)).map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
  const legacy = legacyRoutes
    .map((route) => route.split('/').filter(Boolean))
    .filter((parts) => parts.length === 2)
    .map(([categorySlug, byteSlug]) => ({ categorySlug, byteSlug }));

  return [...published, ...legacy, { categorySlug: 'ai-agents', byteSlug: 'introduction-to-ai-agents' }]
    .filter((route, index, routes) => routes.findIndex((item) => item.categorySlug === route.categorySlug && item.byteSlug === route.byteSlug) === index);
}

function legacyDestination(categorySlug: string) {
  return '/handbooks/';
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.byteSlug);

  if (!byte || byte.category !== params.categorySlug) {
    return { title: 'This Byte has moved | MaanavaN Bytes', robots: { index: false, follow: true } };
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
    permanentRedirect(legacyDestination(categorySlug));
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(byteSlug);
  const handbookBytes = await getBytesByCategory(categorySlug);
  const chapterNumber = handbookBytes.findIndex((item) => item.slug === byteSlug) + 1;

  // Extract headings for accordion navigation
  const headings = extractHeadings(byte.content);

  return (
    <>
      <ByteHeader byte={byte} />

      <div className="byte-reading-canvas">
        <div className="byte-reading-layout">
          <AccordionTableOfContents headings={headings} byteSlug={byte.slug} />
          <div className="byte-main-column">
            <ReadingReveal><ByteContent content={byte.content} /><CourseRecommendation categorySlug={categorySlug} /><div className="mt-12"><PrevNextNav prev={prev} next={next} /></div></ReadingReveal>
          </div>
          <aside className="byte-trust-rail"><div className="byte-progress-card"><span>LEARNING PROGRESS</span><h3>Chapter {chapterNumber} of {handbookBytes.length}</h3><p>{category?.title}</p><div className="byte-progress-track"><i style={{width:`${chapterNumber * 20}%`}} /></div><small>{byte.duration} focused reading</small></div><div className="byte-review-card"><span>INSIDE THIS BYTE</span><h3>Learn it visually</h3><p>Workflow · example · practical takeaway</p><small>Designed for focused, self-paced learning</small></div></aside>
        </div>
      </div>
    </>
  );
}
