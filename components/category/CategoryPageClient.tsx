'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/SearchInput';
import { ByteMetadata, Level, SortOption } from '@/lib/types';
import { applyFilters } from '@/lib/search';
import { Clock, ArrowRight } from 'lucide-react';

interface CategoryPageClientProps {
  bytes: ByteMetadata[];
}

export function CategoryPageClient({ bytes }: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<Level>('all');
  const [sortBy, setSortBy] = useState<SortOption>('order');

  const filteredBytes = useMemo(() => {
    return applyFilters(bytes, searchQuery, levelFilter, sortBy);
  }, [bytes, searchQuery, levelFilter, sortBy]);

  return (
    <div className="bg-white py-12">
      <div className="container-custom">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search bytes..."
            className="flex-1 sm:max-w-md"
          />

          <div className="flex gap-3">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as Level)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            >
              <option value="order">Recommended</option>
              <option value="title">Title (A-Z)</option>
              <option value="recent">Latest</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing <span className="font-medium">{filteredBytes.length}</span> of{' '}
          <span className="font-medium">{bytes.length}</span> bytes
        </p>

        {/* Bytes List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBytes.map((byte) => (
            <Link key={byte.slug} href={`/bytes/${byte.slug}`}>
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

                <h3 className="mt-4 font-bold text-gray-900">{byte.title}</h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{byte.summary}</p>

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

        {filteredBytes.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No bytes found matching your filters.</p>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
