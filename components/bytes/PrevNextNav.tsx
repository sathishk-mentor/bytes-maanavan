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
    <nav className="byte-prev-next" aria-label="Continue learning">
      {prev && (
        <Link
          href={`/${prev.category}/${prev.slug}`}
          className="byte-prev-card"
        >
          <ArrowLeft />
          <div>
            <p>PREVIOUS BYTE</p>
            <strong>
              {prev.title}
            </strong>
          </div>
        </Link>
      )}

      {next && (
        <Link
          href={`/${next.category}/${next.slug}`}
          className="byte-next-card"
        >
          <div>
            <p>NEXT BYTE</p>
            <strong>
              {next.title}
            </strong>
          </div>
          <ArrowRight />
        </Link>
      )}
    </nav>
  );
}
