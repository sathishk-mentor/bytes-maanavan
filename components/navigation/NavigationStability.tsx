'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function normalisePath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}

export function NavigationStability() {
  const pathname = usePathname();

  useEffect(() => {
    const currentRouteLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]')).filter((anchor) => {
      const destination = new URL(anchor.href, window.location.href);
      return destination.origin === window.location.origin
        && normalisePath(destination.pathname) === normalisePath(window.location.pathname)
        && !destination.hash
        && destination.search === window.location.search;
    });

    currentRouteLinks.forEach((anchor) => {
      anchor.classList.add('is-current-route');
      anchor.setAttribute('aria-current', 'page');
    });

    const preventSamePageReload = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      const samePage = destination.origin === window.location.origin
        && normalisePath(destination.pathname) === normalisePath(window.location.pathname)
        && !destination.hash
        && destination.search === window.location.search;

      if (samePage) event.preventDefault();
    };

    document.addEventListener('click', preventSamePageReload, true);
    return () => {
      document.removeEventListener('click', preventSamePageReload, true);
      currentRouteLinks.forEach((anchor) => {
        anchor.classList.remove('is-current-route');
        anchor.removeAttribute('aria-current');
      });
    };
  }, [pathname]);

  return null;
}
