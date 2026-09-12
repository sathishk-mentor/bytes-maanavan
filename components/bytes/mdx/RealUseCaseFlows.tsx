import { ArrowRight, BookOpenCheck, CheckCircle2, Code2, Headphones, ListChecks, MessageSquareText, UserRoundCheck } from 'lucide-react';

const workflows = [
  {
    number: '01',
    title: 'Turn meeting notes into actions',
    context: 'Project management',
    icon: ListChecks,
    steps: ['Raw meeting notes', 'AI drafts decisions and owners', 'Manager verifies names and dates', 'Approved action list'],
  },
  {
    number: '02',
    title: 'Explain a difficult concept',
    context: 'Learning',
    icon: BookOpenCheck,
    steps: ['Learner asks a question', 'AI creates three explanation levels', 'Learner checks trusted material', 'Learner explains it independently'],
  },
  {
    number: '03',
    title: 'Create and test code',
    context: 'Software development',
    icon: Code2,
    steps: ['Developer defines requirement', 'AI proposes code and tests', 'Developer runs and reviews it', 'Verified change'],
  },
  {
    number: '04',
    title: 'Draft a support response',
    context: 'Customer service',
    icon: Headphones,
    steps: ['Customer question', 'AI uses approved knowledge', 'Agent checks accuracy and tone', 'Response or escalation'],
  },
];

const stepIcons = [MessageSquareText, ListChecks, UserRoundCheck, CheckCircle2];

export function RealUseCaseFlows() {
  return (
    <div className="use-case-flows">
      {workflows.map(({ number, title, context, icon: Icon, steps }) => (
        <section className="use-case-flow" key={title}>
          <header>
            <div className="use-case-icon"><Icon aria-hidden="true" /></div>
            <div><span>{number} · {context}</span><h3>{title}</h3></div>
          </header>
          <div className="use-case-steps">
            {steps.map((step, index) => {
              const StepIcon = stepIcons[index];
              return <div className="use-case-step-wrap" key={step}>
                <div className="use-case-step"><StepIcon aria-hidden="true" /><small>Step {index + 1}</small><strong>{step}</strong></div>
                {index < steps.length - 1 && <ArrowRight className="use-case-arrow" aria-hidden="true" />}
              </div>;
            })}
          </div>
        </section>
      ))}
      <p className="use-case-rule"><UserRoundCheck aria-hidden="true" /><span><strong>Human review is part of the workflow.</strong> AI creates a draft; the responsible person verifies important facts and approves the final action.</span></p>
    </div>
  );
}
