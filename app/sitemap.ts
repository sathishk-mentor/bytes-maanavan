import type { MetadataRoute } from 'next';
import routes from '@/data/legacy-routes.json';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `https://bytes.maanavan.com${path}`, lastModified: new Date('2026-09-12'), changeFrequency: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : path.split('/').filter(Boolean).length === 1 ? .8 : .6 }));
}
