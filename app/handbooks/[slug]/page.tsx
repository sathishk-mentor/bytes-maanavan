import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const retiredHandbooks = [
  'generative-ai',
  'ai-agents',
  'agentic-ai',
  'agi',
  'ai-foundations-non-tech',
  'devops-ai-era',
  'claude-code',
];

export const dynamicParams = false;
export function generateStaticParams() { return retiredHandbooks.map((slug) => ({ slug })); }
export function generateMetadata(): Metadata {
  return { title: 'This handbook has moved | MaanavaN Bytes', robots: { index: false, follow: true } };
}

export default function RetiredHandbookPage({params}:{params:{slug:string}}) {
  const destinations:Record<string,string>={
    'generative-ai':'https://www.maanavan.com/courses/generative-ai',
    'ai-agents':'https://www.maanavan.com/courses/ai-agents-automation',
    'agentic-ai':'https://www.maanavan.com/courses/ai-agents-automation',
    agi:'https://www.maanavan.com/courses/generative-ai',
    'ai-foundations-non-tech':'https://www.maanavan.com/courses/generative-ai',
    'devops-ai-era':'/cloud-devops/',
    'claude-code':'https://www.maanavan.com/courses/generative-ai',
  };
  permanentRedirect(destinations[params.slug] || '/handbooks/');
}
