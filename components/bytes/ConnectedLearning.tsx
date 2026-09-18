import Link from 'next/link';
import { ArrowUpRight, Route } from 'lucide-react';
import type { ByteMetadata } from '@/lib/types';
import type { LearningConnection } from '@/lib/byte-connections';

export interface ResolvedLearningConnection extends LearningConnection {
  byte: ByteMetadata;
}

export function ConnectedLearning({ items }: { items: ResolvedLearningConnection[] }) {
  if (!items.length) return null;

  return (
    <section className="connected-learning" aria-labelledby="connected-learning-title">
      <header>
        <span><Route /></span>
        <div>
          <p>OPTIONAL LEARNING CONNECTIONS</p>
          <h2 id="connected-learning-title">Continue by concept</h2>
          <small>Choose only what supports your next goal. This Byte does not require either link.</small>
        </div>
      </header>
      <div className="connected-learning-grid">
        {items.map(({ byte, reason, label }) => (
          <Link href={`/${byte.category}/${byte.slug}/`} key={`${byte.category}/${byte.slug}`}>
            <span>{label}</span>
            <strong>{byte.title}</strong>
            <p>{reason}</p>
            <em>Open related Byte <ArrowUpRight /></em>
          </Link>
        ))}
      </div>
    </section>
  );
}
