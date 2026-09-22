import { ArrowRight, BookOpen, Boxes, CheckCircle2, Database, FileJson2, Filter, Gauge, KeyRound, Layers3, Network, Search, Server, ShieldCheck, Sparkles, UserRound } from 'lucide-react';

const flows = {
  foundation: {
    eyebrow: 'MONGODB MENTAL MODEL',
    title: 'One application database, organised from broad to specific',
    steps: [[Database, 'Database', 'learning_platform'], [Boxes, 'Collection', 'learners'], [FileJson2, 'Document', 'one learner'], [KeyRound, 'Field', 'name, skills']],
    note: 'A document keeps related facts together in a JSON-like structure.',
  },
  modeling: {
    eyebrow: 'SCOPED AGENT MEMORY',
    title: 'Remember only what the next step is allowed to use',
    steps: [[UserRound, 'Identity', 'Confirm owner'], [BookOpen, 'Recent turns', 'Short context'], [Layers3, 'Preference', 'Durable choice'], [ShieldCheck, 'Policy', 'Expire or protect']],
    note: 'Useful memory is selected, owned and governed—not the complete conversation archive.',
  },
  aggregation: {
    eyebrow: 'AGGREGATION PIPELINE',
    title: 'Each stage transforms the result for the next stage',
    steps: [[Filter, '$match', 'Paid enrolments'], [Layers3, '$group', 'Revenue by course'], [FileJson2, '$project', 'Useful fields'], [Gauge, '$sort', 'Highest first']],
    note: 'Filter early so later stages process fewer documents.',
  },
  aiArchitecture: {
    eyebrow: 'AI LEARNING SUPPORT ARCHITECTURE',
    title: 'Operational data and approved knowledge follow separate paths',
    steps: [[UserRound, 'Learner', 'Question + identity'], [Server, 'FastAPI', 'Validate + authorise'], [Search, 'Vector Search', 'Approved evidence'], [Sparkles, 'LLM', 'Grounded answer']],
    note: 'MongoDB stores learner and conversation history; Vector Search supplies authorised learning evidence to the LLM.',
  },
  production: {
    eyebrow: 'PRODUCTION READINESS',
    title: 'Performance and protection work as one system',
    steps: [[Gauge, 'Explain', 'Inspect query plan'], [Search, 'Index', 'Support real queries'], [ShieldCheck, 'Protect', 'Roles + network'], [CheckCircle2, 'Operate', 'Backup + monitor']],
    note: 'A fast database that exposes private data is not production-ready.',
  },
} as const;

export type MongoDBVisualVariant = keyof typeof flows;

export function MongoDBVisual({ variant }: { variant: MongoDBVisualVariant }) {
  const visual = flows[variant];
  if (variant === 'aiArchitecture') return <figure className="mongodb-learning-visual mongodb-learning-aiArchitecture">
    <header><span><BookOpen /></span><div><small>{visual.eyebrow}</small><strong>{visual.title}</strong></div><i>MONGODB</i></header>
    <div className="mongodb-ai-map">
      <section><span><UserRound /></span><div><b>Learner</b><small>Question + identity</small></div></section><ArrowRight />
      <section><span><Server /></span><div><b>FastAPI</b><small>Validate + authorise</small></div></section><ArrowRight />
      <div className="mongodb-ai-branches">
        <section><span><Database /></span><div><b>MongoDB</b><small>Profile, progress and governed history</small></div></section>
        <section><span><Search /></span><div><b>Vector Search</b><small>Approved course evidence</small></div></section>
      </div><ArrowRight />
      <section><span><Sparkles /></span><div><b>LLM</b><small>Grounded answer with sources</small></div></section>
    </div>
    <div className="mongodb-ai-return"><ArrowRight /><span>Answer returns through FastAPI to the learner</span></div>
    <figcaption><CheckCircle2 />{visual.note}</figcaption>
  </figure>;
  return <figure className={`mongodb-learning-visual mongodb-learning-${variant}`}>
    <header><span><BookOpen /></span><div><small>{visual.eyebrow}</small><strong>{visual.title}</strong></div><i>MONGODB</i></header>
    <div className="mongodb-learning-flow">
      {visual.steps.map(([Icon, label, detail], index) => <div className="mongodb-learning-step-wrap" key={label}>
        <section><span><Icon /></span><div><b>{label}</b><small>{detail}</small></div></section>
        {index < visual.steps.length - 1 && <ArrowRight />}
      </div>)}
    </div>
    <figcaption><CheckCircle2 />{visual.note}</figcaption>
  </figure>;
}
