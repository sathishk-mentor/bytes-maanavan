import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

interface CategoryPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: 'software-engineering' },
    { slug: 'forward-deployed-engineer' },
  ];
}

export const metadata: Metadata = {
  title: 'Handbook moved',
  robots: { index: false, follow: true },
};

export default function LegacyCategoryPage({ params }: CategoryPageProps) {
  permanentRedirect(`/${params.slug}/`);
}
