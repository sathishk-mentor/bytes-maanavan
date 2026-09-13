import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {userAgent:'*',allow:'/'},
      {userAgent:['Googlebot','Bingbot','OAI-SearchBot','GPTBot','ChatGPT-User','ClaudeBot','PerplexityBot'],allow:'/'},
    ],
    sitemap:'https://bytes.maanavan.com/sitemap.xml',
    host:'https://bytes.maanavan.com',
  };
}
