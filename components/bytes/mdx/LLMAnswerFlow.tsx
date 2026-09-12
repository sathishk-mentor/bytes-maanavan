import { ArrowRight, Binary, Braces, CheckCircle2, MessageSquareText, Network, SlidersHorizontal } from 'lucide-react';

const steps = [
  { icon: MessageSquareText, label: 'Prompt', note: 'Instruction + context' },
  { icon: Braces, label: 'Tokens', note: 'Text becomes token IDs' },
  { icon: Network, label: 'Context', note: 'Relationships are processed' },
  { icon: Binary, label: 'Probabilities', note: 'Possible next tokens scored' },
  { icon: SlidersHorizontal, label: 'Selection', note: 'One token is selected' },
  { icon: CheckCircle2, label: 'Response', note: 'Cycle repeats until stop' },
];

export function LLMAnswerFlow() {
  return <figure className="llm-answer-flow">
    <div className="llm-flow-track">
      {steps.map(({ icon: Icon, label, note }, index) => <div className="llm-flow-wrap" key={label}>
        <div className="llm-flow-node"><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true"/><strong>{label}</strong><small>{note}</small></div>
        {index < steps.length - 1 && <ArrowRight className="llm-flow-arrow" aria-hidden="true"/>}
      </div>)}
    </div>
    <figcaption>Conceptual generation workflow. Product implementations and model architectures differ.</figcaption>
  </figure>;
}
