import routes from '@/data/legacy-routes.json';
import type { Byte, ByteMetadata } from './types';
import { TOPIC_QUALITY_OVERRIDES } from '@/data/topic-quality-overrides';

const lessonPaths = routes.filter((path) => path.split('/').filter(Boolean).length === 2);

function titleFromSlug(slug: string) {
  return slug.replace(/^\d+-/, '').split('-').map((word) => {
    const fixed: Record<string, string> = { ai: 'AI', llm: 'LLM', api: 'API', rag: 'RAG', cicd: 'CI/CD', devops: 'DevOps', iot: 'IoT' };
    return fixed[word] || word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

/**
 * Canonical topic catalogue built only from the URLs already indexed by search
 * engines. The catalogue preserves routes; it is not a source for tutorial prose.
 */
export const byteTopics: ByteMetadata[] = lessonPaths.map((path) => {
  const [category, slug] = path.split('/').filter(Boolean);
  const order = Number(slug.match(/^\d+/)?.[0] || 0);
  const override = TOPIC_QUALITY_OVERRIDES[slug];
  const title = override?.title || titleFromSlug(slug);
  return {
    title, slug, category, order,
    summary: override?.summary || `Learn ${title.toLowerCase()} with a simple explanation, real-time analogy, practical use case and interview-ready notes.`,
    tags: override?.tags || [title.split(' ')[0], category.replace('-', ' ')],
    level: order <= 5 ? 'beginner' : order <= 10 ? 'intermediate' : 'advanced',
    duration: `${Math.min(12, 5 + Math.floor(order / 2))} min`,
    updatedAt: '2026-09-12',
    isPopular: [1, 2, 5, 11, 16, 31, 46].includes(order),
  } as ByteMetadata;
});

export function topicPreview(category: string, slug: string): Byte | null {
  const item = byteTopics.find((lesson) => lesson.category === category && lesson.slug === slug);
  if (!item) return null;
  return {
    ...item,
    content: `## This Byte is being rebuilt\n\nWe are researching **${item.title}** from first principles using current primary sources. The finished lesson will include a clear mental model, an original real-world analogy, a practical example, an architecture visual, common mistakes, responsible-use guidance and interview preparation.\n\n## What you can expect\n\n- Simple English with one brief Tamil clarification where it genuinely helps\n- Original examples instead of recycled definitions\n- Self-created diagrams and verified screenshots\n- Claims linked to official documentation or primary research\n- A visible reviewed date and human quality check\n\nThis page keeps the original learning-path URL while the new tutorial completes editorial review.`,
  };
}
