'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { isByteComplete, markByteComplete, markByteIncomplete, getCompletedBytesByCategory } from '@/lib/progress';
import { ByteMetadata } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface ProgressSidebarProps {
  byteSlug: string;
  category: string;
  relatedBytes: ByteMetadata[];
  totalCategoryBytes: number;
}

export function ProgressSidebar({ byteSlug, category, relatedBytes, totalCategoryBytes }: ProgressSidebarProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsComplete(isByteComplete(byteSlug));

    // Calculate category progress
    const categoryByteSlugs = relatedBytes.map(b => b.slug).concat(byteSlug);
    const completed = getCompletedBytesByCategory(category, categoryByteSlugs);
    setProgress(Math.round((completed / totalCategoryBytes) * 100));
  }, [byteSlug, category, relatedBytes, totalCategoryBytes]);

  const handleToggle = () => {
    if (isComplete) {
      markByteIncomplete(byteSlug);
      setIsComplete(false);
    } else {
      markByteComplete(byteSlug);
      setIsComplete(true);
    }

    // Recalculate progress
    const categoryByteSlugs = relatedBytes.map(b => b.slug).concat(byteSlug);
    const completed = getCompletedBytesByCategory(category, categoryByteSlugs);
    setProgress(Math.round((completed / totalCategoryBytes) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card>
        <h3 className="font-bold text-gray-900">Your Progress</h3>

        <div className="mt-4">
          <ProgressBar percentage={progress} />
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isComplete}
              onChange={handleToggle}
              className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Mark as Completed
            </span>
          </label>
        </div>

        {relatedBytes.length > 0 && (
          <div className="mt-6">
            <Button variant="primary" href={`/bytes/${relatedBytes[0].slug}`} className="w-full">
              Next Byte
            </Button>
          </div>
        )}
      </Card>

      {/* Related Bytes */}
      {relatedBytes.length > 0 && (
        <Card>
          <h3 className="font-bold text-gray-900">Related Bytes</h3>

          <div className="mt-4 space-y-3">
            {relatedBytes.slice(0, 4).map((byte) => (
              <Link
                key={byte.slug}
                href={`/bytes/${byte.slug}`}
                className="group block rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <p className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                  {byte.title}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{byte.duration}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-primary-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
