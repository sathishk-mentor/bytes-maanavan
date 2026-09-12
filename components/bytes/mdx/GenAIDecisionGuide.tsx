import { CheckCircle2, ShieldAlert, XCircle } from 'lucide-react';

const columns = [
  { type: 'good', icon: CheckCircle2, title: 'Good fit for GenAI', items: ['Drafting a first version', 'Summarising supplied material', 'Rewriting for an audience', 'Brainstorming alternatives', 'Explaining or transforming content'] },
  { type: 'careful', icon: ShieldAlert, title: 'Use with controls', items: ['Customer communication', 'Code used in production', 'Organisation-specific answers', 'Decisions affecting people', 'Confidential business workflows'] },
  { type: 'avoid', icon: XCircle, title: 'Do not trust alone', items: ['Medical or legal decisions', 'Current facts without retrieval', 'Final security approval', 'Unreviewed financial action', 'Irreversible high-impact decisions'] },
];

export function GenAIDecisionGuide() {
  return <div className="genai-decision-grid">
    {columns.map(({ type, icon: Icon, title, items }) => <section className={type} key={title}>
      <header><Icon aria-hidden="true"/><h3>{title}</h3></header>
      <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
    </section>)}
  </div>;
}
