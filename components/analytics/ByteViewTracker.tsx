'use client';

import { useEffect } from 'react';

export function ByteViewTracker({ category, slug }: { category: string; slug: string }) {
  useEffect(() => {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'byte_view', {
      handbook: category, byte_slug: slug, site: 'bytes'
    });
  }, [category, slug]);
  return null;
}
