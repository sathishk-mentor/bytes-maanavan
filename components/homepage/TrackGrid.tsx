import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Sparkles, MessageSquare, Bot, Cable, Cloud, Database } from 'lucide-react';
import { getAllCategories } from '@/lib/categories';
import { getCategoryColorClass } from '@/lib/utils';

const iconMap = {
  Sparkles,
  MessageSquare,
  Bot,
  Cable,
  Cloud,
  Database,
};

export function TrackGrid() {
  const categories = getAllCategories();

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900">Explore Learning Tracks</h2>
        <p className="mt-3 text-lg text-gray-600">
          Choose your path and start learning bite by bite
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Sparkles;
            const bgClass = getCategoryColorClass(category.color, 'bg');
            const textClass = getCategoryColorClass(category.color, 'text');

            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card hover className="h-full">
                  <div className={`inline-flex rounded-lg ${bgClass} p-3`}>
                    <Icon className={`h-6 w-6 ${textClass}`} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-gray-600">{category.description}</p>

                  <p className="mt-4 text-sm font-medium text-primary-600">
                    Explore →
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
