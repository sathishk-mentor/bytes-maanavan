import { ArrowRight, Bot, CheckCircle2, ClipboardList, MessageSquareText, ShieldCheck, Wrench } from 'lucide-react';

export function AgentCapabilityVisual() {
  const modes = [
    { Icon: MessageSquareText, name: 'Chatbot', job: 'Answers a question', boundary: 'Conversation' },
    { Icon: ClipboardList, name: 'Copilot', job: 'Assists your work', boundary: 'Human leads' },
    { Icon: Bot, name: 'AI agent', job: 'Pursues a goal', boundary: 'Acts within limits' },
  ];
  return <figure className="agent-capability-visual">
    <header><small>CHATBOT → COPILOT → AGENT</small><strong>The difference is not intelligence. It is responsibility and action.</strong></header>
    <div>{modes.map(({ Icon, name, job, boundary }, index) => <section key={name}>
      <span><Icon/></span><i>0{index + 1}</i><h3>{name}</h3><p>{job}</p><small>{boundary}</small>
      {index < modes.length - 1 && <ArrowRight/>}
    </section>)}</div>
    <figcaption><CheckCircle2/><span>An agent receives a goal, decides a next step, uses an authorised tool and checks the result.</span></figcaption>
  </figure>;
}

export function AgentBoundaryVisual() {
  return <figure className="agent-boundary-visual">
    <header><small>SAFE ACTION BOUNDARY</small><strong>Autonomy must sit inside permissions and human approval.</strong></header>
    <div><span><Bot/><b>Agent</b><small>Plans the next step</small></span><ArrowRight/><span><Wrench/><b>Allowed tools</b><small>Search · read · draft</small></span><ArrowRight/><span><ShieldCheck/><b>Approval gate</b><small>Send · buy · delete</small></span></div>
    <figcaption>The useful question is not “Can the agent act?” It is “Which actions may it take without asking?”</figcaption>
  </figure>;
}
