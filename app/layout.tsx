import type { Metadata } from 'next';
import { Inter, Noto_Sans_Tamil } from 'next/font/google';
import './globals.css';
import './maanavan-brand.css';
import './handbook-quick-nav.css';
import './reading-mode.css';
import './ai-agents.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NavigationStability } from '@/components/navigation/NavigationStability';

const inter = Inter({ subsets: ['latin'] });
const notoTamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://bytes.maanavan.com'),
  title: { default: 'Free AI & Technology Tutorials | MaanavaN Bytes', template: '%s | MaanavaN Bytes' },
  description: 'Learn AI, AI agents, data engineering, cloud, DevOps, software engineering and cybersecurity through clear bite-sized tutorials with Tamil learner support.',
  keywords: ['Generative AI', 'GenAI', 'Prompt Engineering', 'Cloud', 'Data Engineering', 'AI Agents', 'Tanglish', 'Tamil', 'Learning'],
  authors: [{ name: 'Sathish Kumar', url: 'https://www.maanavan.com/about/sathish-kumar' }],
  creator: 'Sathish Kumar',
  publisher: 'MaanavaN',
  category: 'Technology education',
  alternates: { types: { 'application/rss+xml': 'https://bytes.maanavan.com/feed.xml' } },
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
    <html lang="en-IN">
      <body className={`${inter.className} ${notoTamil.variable}`}>
        <NavigationStability />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          '@context':'https://schema.org','@graph':[
            {'@type':'Organization','@id':'https://www.maanavan.com/#organization',name:'MaanavaN',url:'https://www.maanavan.com/',founder:{'@type':'Person',name:'Sathish Kumar',url:'https://www.maanavan.com/about/sathish-kumar'},sameAs:['https://www.linkedin.com/in/sathish-kumar-ceo/']},
            {'@type':'WebSite','@id':'https://bytes.maanavan.com/#website',name:'MaanavaN Bytes',alternateName:'MaanavaN Technology Handbooks',url:'https://bytes.maanavan.com/',description:'Free visual technology handbooks and practical bite-sized tutorials for Tamil-speaking learners worldwide.',publisher:{'@id':'https://www.maanavan.com/#organization'},inLanguage:['en-IN','ta-IN']}
          ]
        })}} />
      </body>
    </html>
  );
}
