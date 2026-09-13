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

export default function RetiredHandbookPage() {
  permanentRedirect('/handbooks/');
}
