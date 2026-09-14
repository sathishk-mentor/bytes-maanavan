import type { MetadataRoute } from 'next';
import { getAllBytes } from '@/lib/mdx';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bytes=await getAllBytes();
  const core:MetadataRoute.Sitemap=[
    {url:'https://bytes.maanavan.com/',lastModified:new Date('2026-09-13'),changeFrequency:'weekly',priority:1},
    {url:'https://bytes.maanavan.com/handbooks/',lastModified:new Date('2026-09-13'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/software-engineering/',lastModified:new Date('2026-09-13'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/forward-deployed-engineer/',lastModified:new Date('2026-09-13'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/cloud-devops/',lastModified:new Date('2026-09-13'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/langchain/',lastModified:new Date('2026-09-14'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/rag-application-engineering/',lastModified:new Date('2026-09-14'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/fastapi-ai-applications/',lastModified:new Date('2026-09-14'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/modern-java-spring-boot-genai/',lastModified:new Date('2026-09-14'),changeFrequency:'monthly',priority:.9},
    {url:'https://bytes.maanavan.com/sql-data-ai-applications/',lastModified:new Date('2026-09-14'),changeFrequency:'monthly',priority:.9},
  ];
  return [...core,...bytes.map((byte)=>({url:`https://bytes.maanavan.com/${byte.category}/${byte.slug}/`,lastModified:new Date(byte.updatedAt),changeFrequency:'monthly' as const,priority:.8}))];
}
