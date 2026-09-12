import { AlertTriangle } from 'lucide-react';

interface MistakesProps {
  children: React.ReactNode;
}

export function Mistakes({ children }: MistakesProps) {
  return (
    <section className="byte-callout byte-callout-mistakes">
      <header className="byte-callout-header">
        <span className="byte-callout-icon"><AlertTriangle /></span>
        <div>
          <span>AVOID THESE</span>
          <h4>Common mistakes</h4>
        </div>
      </header>
      <div className="byte-callout-body">{children}</div>
    </section>
  );
}
