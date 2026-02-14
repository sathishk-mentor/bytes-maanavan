import { Hero } from '@/components/homepage/Hero';
import { TrackGrid } from '@/components/homepage/TrackGrid';
import { ReferenceHub } from '@/components/homepage/ReferenceHub';
import { PopularExamples } from '@/components/homepage/PopularExamples';
import { CategorySidebar } from '@/components/homepage/CategorySidebar';
import { ByteCardWithImage } from '@/components/homepage/ByteCardWithImage';
import { getPopularBytes, getAllBytes } from '@/lib/mdx';
import { getAllCategories } from '@/lib/categories';

export default async function HomePage() {
  const categories = getAllCategories();
  const popularBytes = await getPopularBytes();
  const allBytes = await getAllBytes();

  return (
    <>
      {/* Hero Section - Full Width */}
      <Hero />

      {/* Main Content with Sidebar */}
      <div className="bg-gray-50 min-h-screen">
        <div className="relative">
          {/* Left Category Sidebar */}
          <CategorySidebar categories={categories} />

          {/* Main Content Area */}
          <div className="ml-0 lg:ml-[280px] relative z-10">
            <div className="container-custom py-12">
              {/* Popular Bytes Section */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Popular Bytes
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Learn GenAI, Cloud, and Data Engineering in bite-sized lessons
                  </p>
                </div>

                {/* Bytes Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {popularBytes.slice(0, 9).map(byte => (
                    <ByteCardWithImage
                      key={byte.slug}
                      byte={byte}
                    />
                  ))}
                </div>
              </div>

              {/* Learning Tracks Section */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Learning Tracks
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Structured learning paths for mastering key technologies
                  </p>
                </div>
                <TrackGrid />
              </div>

              {/* Reference Hub Section */}
              <div className="mb-16">
                <ReferenceHub />
              </div>

              {/* Popular Examples Section */}
              <div>
                <PopularExamples />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
