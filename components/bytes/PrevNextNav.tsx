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
    <nav className={`byte-prev-next ${!prev ? 'only-next' : ''} ${!next ? 'only-prev' : ''}`} aria-label="Continue learning">
      {prev && (
        <Link
          href={`/${prev.category}/${prev.slug}`}
          className="byte-prev-card"
        >
          <span className="byte-nav-arrow"><ArrowLeft /></span>
          <div>
            <p><span>PREVIOUS</span> Continue the handbook</p>
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
            <p>Continue the handbook <span>NEXT</span></p>
            <strong>
              {next.title}
            </strong>
          </div>
          <span className="byte-nav-arrow"><ArrowRight /></span>
        </Link>
      )}
    </nav>
  );
}
