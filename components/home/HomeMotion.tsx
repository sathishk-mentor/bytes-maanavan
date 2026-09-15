import type { ReactNode } from 'react';

export function HomeMotion({ children }: { children: ReactNode }) {
  return <div className="bytes-home">{children}</div>;
}
