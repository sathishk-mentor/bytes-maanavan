import type { MetadataRoute } from 'next';
import { getAllBytes } from '@/lib/mdx';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bytes=await getAllBytes();
  const newestSiteDate = bytes.reduce((latest, byte) => byte.updatedAt > latest ? byte.updatedAt : latest, '2026-09-13');
  const categoryDates = new Map<string, string>();
  for (const byte of bytes) {
    const current = categoryDates.get(byte.category) || '';
    if (byte.updatedAt > current) categoryDates.set(byte.category, byte.updatedAt);
  }
  const core:MetadataRoute.Sitemap=[
    {url:'https://bytes.maanavan.com/',lastModified:new Date(newestSiteDate),changeFrequency:'weekly',priority:1},
    {url:'https://bytes.maanavan.com/handbooks/',lastModified:new Date(newestSiteDate),changeFrequency:'weekly',priority:.9},
    ...Array.from(categoryDates.entries()).map(([category,lastModified])=>({url:`https://bytes.maanavan.com/${category}/`,lastModified:new Date(lastModified),changeFrequency:'monthly' as const,priority:.9})),
  ];
  return [...core,...bytes.map((byte)=>({url:`https://bytes.maanavan.com/${byte.category}/${byte.slug}/`,lastModified:new Date(byte.updatedAt),changeFrequency:'monthly' as const,priority:.8}))];
}
