import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MaanavaN Bytes - Learn GenAI in Bite-Size (Tanglish)',
  description: 'Learn Generative AI, Cloud, and Data Engineering in bite-sized Tanglish content. Simple explanations + real-time scenarios + copy-paste prompts.',
  keywords: ['Generative AI', 'GenAI', 'Prompt Engineering', 'Cloud', 'Data Engineering', 'AI Agents', 'Tanglish', 'Tamil', 'Learning'],
  authors: [{ name: 'MaanavaN' }],
  openGraph: {
    title: 'MaanavaN Bytes - Learn GenAI in Bite-Size (Tanglish)',
    description: 'Learn Generative AI, Cloud, and Data Engineering in bite-sized Tanglish content.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MaanavaN Bytes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaanavaN Bytes - Learn GenAI in Bite-Size (Tanglish)',
    description: 'Learn Generative AI, Cloud, and Data Engineering in bite-sized Tanglish content.',
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
