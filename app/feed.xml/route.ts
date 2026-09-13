import { getAllBytes } from '@/lib/mdx';

const escapeXml=(value:string)=>value.replace(/[<>&'\"]/g,(character)=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','\"':'&quot;'}[character] || character));

export async function GET() {
  const bytes=await getAllBytes();
  const items=bytes.map((byte)=>`<item><title>${escapeXml(byte.title)}</title><link>https://bytes.maanavan.com/${byte.category}/${byte.slug}/</link><guid isPermaLink="true">https://bytes.maanavan.com/${byte.category}/${byte.slug}/</guid><description>${escapeXml(byte.summary)}</description><pubDate>${new Date(byte.updatedAt).toUTCString()}</pubDate></item>`).join('');
  const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>MaanavaN Bytes</title><link>https://bytes.maanavan.com/</link><description>Visual, practical technology learning Bytes.</description><language>en-IN</language>${items}</channel></rss>`;
  return new Response(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
