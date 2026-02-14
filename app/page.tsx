import { Hero } from '@/components/homepage/Hero';
import { TrackGrid } from '@/components/homepage/TrackGrid';
import { PopularBytes } from '@/components/homepage/PopularBytes';
import { ReferenceHub } from '@/components/homepage/ReferenceHub';
import { PopularExamples } from '@/components/homepage/PopularExamples';
import { getPopularBytes } from '@/lib/mdx';

export default async function HomePage() {
  const popularBytes = await getPopularBytes();

  return (
    <>
      <Hero />
      <TrackGrid />
      <PopularBytes bytes={popularBytes} />
      <ReferenceHub />
      <PopularExamples />
    </>
  );
}
