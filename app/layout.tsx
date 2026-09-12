import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './maanavan-brand.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bytes.maanavan.com'),
  title: { default: 'Free AI & Technology Tutorials | MaanavaN Bytes', template: '%s | MaanavaN Bytes' },
  description: 'Learn AI, AI agents, data engineering, cloud, DevOps, software engineering and cybersecurity through clear bite-sized tutorials with Tamil learner support.',
  keywords: ['Generative AI', 'GenAI', 'Prompt Engineering', 'Cloud', 'Data Engineering', 'AI Agents', 'Tanglish', 'Tamil', 'Learning'],
  authors: [{ name: 'Sathish Kumar', url: 'https://www.maanavan.com/about/sathish-kumar' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'MaanavaN Bytes | Free AI and Technology Learning',
    description: 'Clear technology lessons with practical examples, architecture walkthroughs and interview insights.',
    url: '/',
    type: 'website',
    locale: 'en_US',
    siteName: 'MaanavaN Bytes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaanavaN Bytes | Free AI and Technology Learning',
    description: 'Clear technology lessons with practical examples, architecture walkthroughs and interview insights.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
