import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';
import { ByteMetadata } from '@/lib/types';

interface PopularBytesProps {
  bytes: ByteMetadata[];
}

export function PopularBytes({ bytes }: PopularBytesProps) {
  if (bytes.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900">Popular Bytes</h2>
        <p className="mt-3 text-lg text-gray-600">
          Start with these crowd favorites
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bytes.slice(0, 8).map((byte) => (
            <Link key={byte.slug} href={`/${byte.category}/${byte.slug}`}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <Badge variant="level" level={byte.level}>
                    {byte.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    {byte.duration}
                  </div>
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  {byte.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {byte.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {byte.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="tag">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="mt-4 flex items-center text-sm font-medium text-primary-600">
                  Read <ArrowRight className="ml-1 h-4 w-4" />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
