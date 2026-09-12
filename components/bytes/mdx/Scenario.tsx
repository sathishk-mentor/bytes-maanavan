import { Lightbulb } from 'lucide-react';

interface ScenarioProps {
  title?: string;
  children: React.ReactNode;
}

export function Scenario({ title = 'Real-world Scenario', children }: ScenarioProps) {
  return (
    <section className="byte-callout byte-callout-scenario">
      <header className="byte-callout-header">
        <span className="byte-callout-icon"><Lightbulb /></span>
        <div>
          <span>SEE IT IN PRACTICE</span>
          <h4>{title}</h4>
        </div>
      </header>
      <div className="byte-callout-body">{children}</div>
    </section>
  );
}
