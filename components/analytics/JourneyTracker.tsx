'use client';

import { useEffect } from 'react';

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

export function JourneyTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      let destination: URL;
      try { destination = new URL(link.href); } catch { return; }
      const host = destination.hostname;
      const path = destination.pathname;
      const source = window.location.pathname;
      let step: string | undefined;
      if (host === 'www.maanavan.com' || host === 'maanavan.com') {
        if (path.startsWith('/course/') || path === '/course-library') step = 'open_courses';
        else if (path.startsWith('/start-here')) step = 'open_learning_guides';
      } else if (host === 'courses.maanavanlearncode.com') step = 'lms_handoff';
      else if (host === window.location.hostname || host === 'bytes.maanavan.com') {
        if (/^\/[^/]+\/[^/]+\/$/.test(path)) step = 'byte_open';
        else if (path === '/handbooks/') step = 'handbook_library_open';
        else if (/^\/[^/]+\/$/.test(path)) step = 'handbook_open';
      }
      if (!step) return;
      (window as AnalyticsWindow).gtag?.('event', 'journey_step', {
        step, source_page: source, destination_path: path, site: 'bytes'
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
