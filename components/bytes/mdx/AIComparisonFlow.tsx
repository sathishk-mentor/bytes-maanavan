import { ArrowRight, FilePenLine, MailCheck, ShieldCheck, TriangleAlert } from 'lucide-react';

const lanes = [
  {
    type: 'Traditional AI',
    question: 'What is this?',
    tone: 'predictive',
    steps: [
      { icon: MailCheck, label: 'Incoming email', note: 'Input' },
      { icon: ShieldCheck, label: 'Detect patterns', note: 'Classification model' },
      { icon: ShieldCheck, label: 'Spam: 96%', note: 'Label or score' },
    ],
    takeaway: 'Chooses or predicts from defined outcomes.',
  },
  {
    type: 'Generative AI',
    question: 'What can I create?',
    tone: 'generative',
    steps: [
      { icon: FilePenLine, label: 'Customer email', note: 'Input + instruction' },
      { icon: FilePenLine, label: 'Generate response', note: 'Foundation model' },
      { icon: TriangleAlert, label: 'Draft reply', note: 'New content to review' },
    ],
    takeaway: 'Creates a new output that fits the instruction and context.',
  },
];

export function AIComparisonFlow() {
  return (
    <div className="ai-comparison" aria-label="Traditional AI and generative AI workflow comparison">
      {lanes.map((lane) => (
        <section className={`ai-comparison-lane ${lane.tone}`} key={lane.type}>
          <header>
            <span>{lane.type}</span>
            <p>{lane.question}</p>
          </header>
          <div className="ai-flow-steps">
            {lane.steps.map(({ icon: Icon, label, note }, index) => (
              <div className="ai-flow-step-wrap" key={label}>
                <div className="ai-flow-step">
                  <Icon aria-hidden="true" />
                  <strong>{label}</strong>
                  <small>{note}</small>
                </div>
                {index < lane.steps.length - 1 && <ArrowRight className="ai-flow-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <footer>{lane.takeaway}</footer>
        </section>
      ))}
    </div>
  );
}
