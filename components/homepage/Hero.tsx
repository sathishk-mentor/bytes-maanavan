'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';

interface HeroProps {
  onSearch?: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
            Learn Generative AI in{' '}
            <span className="text-primary-600">Bite-Size</span>{' '}
            (Tanglish)
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Simple explanations + real-time scenarios + copy-paste prompts
          </p>

          {/* Search Bar */}
          <div className="mt-10">
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search across all bytes by title, summary, or tags..."
              className="mx-auto max-w-2xl"
            />
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/category/generative-ai">
              Start GenAI Foundations
            </Button>
            <Button variant="secondary" size="lg" href="https://chat.whatsapp.com/invite">
              Join WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
