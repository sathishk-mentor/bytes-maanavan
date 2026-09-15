import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ChevronRight } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';

interface HandbookQuickNavProps {
  bytes: ByteMetadata[];
  currentSlug: string;
  handbookTitle: string;
  duration: string;
  mobile?: boolean;
}

function shortTitle(title: string) {
  return title
    .replace(/^\d+\s*[—–:-]\s*/, '')
    .replace(/^Byte\s+\d+\s*[—–:-]\s*/i, '');
}

export function HandbookQuickNav({
  bytes,
  currentSlug,
  handbookTitle,
  duration,
  mobile = false,
}: HandbookQuickNavProps) {
  const currentIndex = Math.max(0, bytes.findIndex((item) => item.slug === currentSlug));
  const currentNumber = currentIndex + 1;
  const progress = bytes.length ? (currentNumber / bytes.length) * 100 : 0;
  const previous = bytes[currentIndex - 1];
  const next = bytes[currentIndex + 1];

  const content = (
    <>
      <div className="handbook-nav-heading">
        <span>HANDBOOK JOURNEY</span>
        <strong>Byte {currentNumber} of {bytes.length}</strong>
        <p>{handbookTitle}</p>
        <div className="byte-progress-track" aria-label={`${currentNumber} of ${bytes.length} Bytes`}>
          <i style={{ width: `${progress}%` }} />
        </div>
        <small>{duration} focused reading</small>
      </div>

      <ol className="handbook-byte-list">
        {bytes.map((item, index) => {
          const number = index + 1;
          const isCurrent = item.slug === currentSlug;
          const isComplete = index < currentIndex;

          return (
            <li key={item.slug} className={isCurrent ? 'is-current' : isComplete ? 'is-complete' : ''}>
              <Link
                href={`/${item.category}/${item.slug}/`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="handbook-byte-number">
                  {isComplete ? <Check aria-hidden="true" /> : String(number).padStart(2, '0')}
                </span>
                <span className="handbook-byte-copy">
                  <small>BYTE {String(number).padStart(2, '0')}</small>
                  <strong>{shortTitle(item.title)}</strong>
                </span>
                <ChevronRight className="handbook-byte-arrow" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className={`handbook-rail-actions ${previous && next ? 'has-both' : 'has-single'}`}>
        {previous ? (
          <Link href={`/${previous.category}/${previous.slug}/`} aria-label={`Previous Byte: ${previous.title}`}>
            <ArrowLeft aria-hidden="true" /> <span><small>GO BACK</small>Byte {currentNumber - 1}</span>
          </Link>
        ) : null}
        {next ? (
          <Link href={`/${next.category}/${next.slug}/`} aria-label={`Next Byte: ${next.title}`}>
            <span><small>CONTINUE TO</small>Byte {currentNumber + 1}</span> <ArrowRight aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </>
  );

  if (mobile) {
    return (
      <details className="handbook-quick-nav-mobile">
        <summary>
          <span><small>HANDBOOK JOURNEY</small><strong>Byte {currentNumber} of {bytes.length}</strong></span>
          <span>View all Bytes <ChevronRight aria-hidden="true" /></span>
        </summary>
        <div className="handbook-mobile-panel">{content}</div>
      </details>
    );
  }

  return <div className="handbook-quick-nav">{content}</div>;
}
