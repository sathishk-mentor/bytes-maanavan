import routes from '@/data/legacy-routes.json';
import type { Byte, ByteMetadata } from './types';

const lessonPaths = routes.filter((path) => path.split('/').filter(Boolean).length === 2);

function titleFromSlug(slug: string) {
  return slug.replace(/^\d+-/, '').split('-').map((word) => {
    const fixed: Record<string, string> = { ai: 'AI', llm: 'LLM', api: 'API', rag: 'RAG', cicd: 'CI/CD', devops: 'DevOps', iot: 'IoT' };
    return fixed[word] || word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

export const legacyBytes: ByteMetadata[] = lessonPaths.map((path) => {
  const [category, slug] = path.split('/').filter(Boolean);
  const order = Number(slug.match(/^\d+/)?.[0] || 0);
  const title = titleFromSlug(slug);
  return {
    title, slug, category, order,
    summary: `Learn ${title.toLowerCase()} with a simple explanation, real-time analogy, practical use case and interview-ready notes.`,
    tags: [title.split(' ')[0], category.replace('-', ' ')],
    level: order <= 5 ? 'beginner' : order <= 10 ? 'intermediate' : 'advanced',
    duration: `${Math.min(12, 5 + Math.floor(order / 2))} min`,
    updatedAt: '2026-09-12',
    isPopular: [1, 2, 5, 11, 16, 31, 46].includes(order),
  } as ByteMetadata;
});

export function legacyByte(category: string, slug: string): Byte | null {
  const item = legacyBytes.find((lesson) => lesson.category === category && lesson.slug === slug);
  if (!item) return null;
  return {
    ...item,
    content: `## Why this matters\n\n${item.summary}\n\n## Simple explanation\n\nThis lesson breaks the idea into a clear mental model before introducing technical detail.\n\n## Real-time analogy\n\nWe connect the concept to a familiar situation so you can remember and explain it confidently.\n\n## Practical use case\n\nSee where teams use this concept, what problem it solves, and the trade-offs involved.\n\n## Architecture walkthrough\n\nFollow the components, data flow, and decisions in a production-style design.\n\n## Interview bit\n\nPrepare a concise answer, a deeper follow-up, and one practical example.\n\n## Key takeaways\n\nReview the essential points and continue to the next lesson in this track.`,
  };
}
