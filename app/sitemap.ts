import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/software-engineering/', '/software-engineering/62-how-developers-use-ai-tools/', '/software-engineering/63-api-first-thinking/', '/software-engineering/66-ai-assisted-coding-workflow/', '/software-engineering/64-debugging-ai-generated-code/', '/software-engineering/75-secure-ai-coding/'];
  return paths.map((path) => ({ url: `https://bytes.maanavan.com${path}`, lastModified: new Date('2026-09-13'), changeFrequency: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : path.split('/').filter(Boolean).length === 1 ? .9 : .8 }));
}
