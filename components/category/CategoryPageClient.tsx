'use client';

import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/ui/SearchInput';
import { ByteLibraryCard } from '@/components/bytes/ByteLibraryCard';
import { ByteMetadata, Level, SortOption } from '@/lib/types';
import { applyFilters } from '@/lib/search';

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
    <div className="category-library">
      <div className="container-custom">
        {/* Filters */}
        <div className="category-library-tools">
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
        <p className="category-results">
          Showing <span className="font-medium">{filteredBytes.length}</span> of{' '}
          <span className="font-medium">{bytes.length}</span> bytes
        </p>

        {/* Bytes List */}
        <div className="library-grid category-byte-grid">
          {filteredBytes.map((byte) => (
            <ByteLibraryCard key={byte.slug} chapter={byte} chapterNumber={bytes.findIndex((item) => item.slug === byte.slug) + 1}/>
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
