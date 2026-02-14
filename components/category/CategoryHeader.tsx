import { Button } from '@/components/ui/Button';
import { Category } from '@/lib/types';

interface CategoryHeaderProps {
  category: Category;
  totalBytes: number;
  beginnerCount: number;
}

export function CategoryHeader({ category, totalBytes, beginnerCount }: CategoryHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-gradient-to-b from-primary-50 to-white pb-12 pt-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          {category.title}
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          {category.description}
        </p>

        {category.heroLine && (
          <p className="mt-2 text-lg font-medium text-primary-600">
            {category.heroLine}
          </p>
        )}

        {/* Stats */}
        <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
          <span className="font-medium">
            <span className="text-2xl font-bold text-gray-900">{totalBytes}</span> bytes
          </span>
          <span className="font-medium">
            <span className="text-2xl font-bold text-green-600">{beginnerCount}</span> beginner-friendly
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" href="#start">
            Start from First Byte
          </Button>
          <Button variant="outline" href="/">
            View All Categories
          </Button>
        </div>
      </div>
    </div>
  );
}
