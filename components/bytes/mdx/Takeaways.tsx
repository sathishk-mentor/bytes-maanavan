import { CheckCircle2 } from 'lucide-react';

interface TakeawaysProps {
  children: React.ReactNode;
}

export function Takeaways({ children }: TakeawaysProps) {
  return (
    <section className="byte-callout byte-callout-takeaways">
      <header className="byte-callout-header">
        <span className="byte-callout-icon"><CheckCircle2 /></span>
        <div>
          <span>REMEMBER THIS</span>
          <h4>Key takeaways</h4>
        </div>
      </header>
      <div className="byte-callout-body">{children}</div>
    </section>
  );
}
