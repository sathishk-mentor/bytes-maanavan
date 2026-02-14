import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ByteMetadata } from '@/lib/types';

interface PrevNextNavProps {
  prev: ByteMetadata | null;
  next: ByteMetadata | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2">
      {prev && (
        <Link
          href={`/${prev.category}/${prev.slug}`}
          className="group flex items-start rounded-lg border border-gray-200 p-6 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <ArrowLeft className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 transition-colors group-hover:text-primary-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Previous</p>
            <p className="mt-1 font-medium text-gray-900 group-hover:text-primary-700">
              {prev.title}
            </p>
          </div>
        </Link>
      )}

      {next && (
        <Link
          href={`/${next.category}/${next.slug}`}
          className="group flex items-start justify-end rounded-lg border border-gray-200 p-6 text-right transition-colors hover:border-primary-300 hover:bg-primary-50 sm:col-start-2"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">Next</p>
            <p className="mt-1 font-medium text-gray-900 group-hover:text-primary-700">
              {next.title}
            </p>
          </div>
          <ArrowRight className="ml-4 h-6 w-6 flex-shrink-0 text-gray-400 transition-colors group-hover:text-primary-600" />
        </Link>
      )}
    </div>
  );
}
