'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function ReadingReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>('.byte-article > *, .course-recommendation, .byte-prev-next');
    if (!elements?.length) return;
    elements.forEach((element, index) => {
      element.classList.add('reveal-ready');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div ref={root}>{children}</div>;
}
