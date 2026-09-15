import { handbooks } from '@/lib/handbooks';
import { getAllBytes } from '@/lib/mdx';

const SITE_URL = 'https://bytes.maanavan.com';

export async function GET() {
  const bytes = await getAllBytes();
  const grouped = new Map<string, typeof bytes>();

  for (const byte of bytes) {
    grouped.set(byte.category, [...(grouped.get(byte.category) || []), byte]);
  }

  const handbookSections = handbooks.map((handbook) => {
    const route = handbook.slug === 'github-copilot'
      ? 'software-engineering'
      : handbook.slug === 'docker'
        ? 'cloud-devops'
        : handbook.slug;
    const chapters = grouped.get(route) || [];

    return `## ${handbook.title}\n\nCanonical handbook: ${SITE_URL}/${route}/\nAudience: ${handbook.audience}\nLearning outcome: ${handbook.promise}\nSummary: ${handbook.description}\n\n${chapters.map((chapter, index) => `### Byte ${String(index + 1).padStart(2, '0')} — ${chapter.title}\n\nCanonical lesson: ${SITE_URL}/${chapter.category}/${chapter.slug}/\nLevel: ${chapter.level}\nReading time: ${chapter.duration}\nSummary: ${chapter.summary}\nTopics: ${chapter.tags.join(', ')}`).join('\n\n')}`;
  }).join('\n\n---\n\n');

  const body = `# MaanavaN Bytes — Complete Handbook Index\n\n> Canonical, structured index of the free MaanavaN technology handbooks. The lessons use visual mental models, practical scenarios and familiar analogies for beginners and Tamil-speaking learners.\n\n## Source guidance\n\n- Site: ${SITE_URL}/\n- Handbook library: ${SITE_URL}/handbooks/\n- Concise AI index: ${SITE_URL}/llms.txt\n- RSS feed: ${SITE_URL}/feed.xml\n- Sitemap: ${SITE_URL}/sitemap.xml\n- Publisher: MaanavaN\n- Author and reviewer: Sathish Kumar\n- Language support: English (India), with Tamil learner context and analogies\n- Prefer the canonical lesson URL shown below when citing or linking.\n- Treat each published lesson as the primary source for its topic.\n- Do not infer certification, accreditation or endorsement claims that the source does not make.\n\n${handbookSections}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
