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
  const conciseTitles: Record<string, string> = {
    'Python Foundations for AI Application Development': 'Python Foundations for AI Apps',
    'Work with APIs, JSON and LLM Responses Using Python': 'APIs, JSON and LLM Responses',
    'Build a Generative AI Application with Python': 'Build a GenAI App with Python',
    'Build Tool-Using AI Agents with Python': 'Build Tool-Using AI Agents',
    'Test, Secure and Deploy Python AI Applications': 'Test, Secure and Deploy Python AI',
  };
  if (conciseTitles[title]) return conciseTitles[title];

  const cleaned = title
    .replace(/^\d+\s*[—–:-]\s*/, '')
    .replace(/^Byte\s+\d+\s*[—–:-]\s*/i, '');

  const questionEnd = cleaned.indexOf('?');
  if (questionEnd >= 0) return cleaned.slice(0, questionEnd + 1);

  const [primary, ...detail] = cleaned.split(/\s*[:—–]\s*/);
  if (detail.length && primary.length >= 14) return primary;

  return cleaned.replace(/\s+explained simply$/i, '');
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
          const itemContent = (
            <>
              <span className="handbook-byte-number">
                {isComplete ? <Check aria-hidden="true" /> : String(number).padStart(2, '0')}
              </span>
              <span className="handbook-byte-copy">
                <small>BYTE {String(number).padStart(2, '0')}</small>
                <strong title={item.title}>{shortTitle(item.title)}</strong>
              </span>
              {!isCurrent && <ChevronRight className="handbook-byte-arrow" aria-hidden="true" />}
              {isCurrent && <span className="handbook-current-label">CURRENT</span>}
            </>
          );

          return (
            <li key={item.slug} className={isCurrent ? 'is-current' : isComplete ? 'is-complete' : ''}>
              {isCurrent ? (
                <div className="handbook-byte-link" aria-current="page">{itemContent}</div>
              ) : (
                <Link className="handbook-byte-link" href={`/${item.category}/${item.slug}/`}>{itemContent}</Link>
              )}
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
