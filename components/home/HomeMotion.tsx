'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = root.current?.querySelectorAll<HTMLElement>('.home-motion-section');
    if (!sections?.length) return;
    sections.forEach((section) => section.classList.add('motion-ready'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -9% 0px', threshold: .08 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="bytes-home" ref={root}>{children}</div>;
}
