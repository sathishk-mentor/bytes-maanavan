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
import { byteTopics, topicPreview } from '@/lib/topic-catalog';
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
  return byteTopics.filter((byte) => byte.category === 'software-engineering' && [
    '62-how-developers-use-ai-tools', '63-api-first-thinking', '64-debugging-ai-generated-code',
    '66-ai-assisted-coding-workflow', '75-secure-ai-coding',
  ].includes(byte.slug)).map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.byteSlug) || topicPreview(params.categorySlug, params.byteSlug);

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
  const byte = await getByteBySlug(byteSlug) || topicPreview(categorySlug, byteSlug);

  if (!byte || byte.category !== categorySlug) {
    notFound();
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(byteSlug);

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
          <aside className="byte-trust-rail"><div className="byte-progress-card"><span>LEARNING PROGRESS</span><h3>Chapter {Math.max(1, ['62-how-developers-use-ai-tools','63-api-first-thinking','66-ai-assisted-coding-workflow','64-debugging-ai-generated-code','75-secure-ai-coding'].indexOf(byte.slug) + 1)} of 5</h3><p>{category?.title}</p><div className="byte-progress-track"><i style={{width:`${Math.max(20,(['62-how-developers-use-ai-tools','63-api-first-thinking','66-ai-assisted-coding-workflow','64-debugging-ai-generated-code','75-secure-ai-coding'].indexOf(byte.slug) + 1)*20)}%`}} /></div><small>{byte.duration} focused reading</small></div><div className="byte-review-card"><span>PERSONALLY REVIEWED</span><h3>Sathish Kumar</h3><p>Founder & Chief AI Educator</p><small>17+ years of industry and learning experience</small></div></aside>
        </div>
      </div>
    </>
  );
}
