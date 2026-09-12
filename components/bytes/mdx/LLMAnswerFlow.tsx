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
    <header className="llm-infographic-header">
      <div><span>VISUAL EXPLAINER</span><h3>How one prompt becomes an answer</h3></div>
      <p><i></i>Animated conceptual flow</p>
    </header>
    <div className="llm-live-demo" aria-hidden="true">
      <div className="llm-demo-prompt"><small>USER PROMPT</small><strong>Explain cloud computing simply</strong></div>
      <div className="llm-token-stream"><span>Explain</span><span>cloud</span><span>comput</span><span>ing</span><span>simply</span></div>
      <div className="llm-attention-stage"><span className="attention-core">LLM</span><i className="orbit orbit-one"></i><i className="orbit orbit-two"></i><i className="orbit orbit-three"></i><small>context + attention</small></div>
      <div className="llm-probability"><small>NEXT TOKEN</small><span><b style={{width:'86%'}}></b><em>Cloud</em><i>86%</i></span><span><b style={{width:'9%'}}></b><em>It</em><i>9%</i></span><span><b style={{width:'5%'}}></b><em>A</em><i>5%</i></span></div>
      <div className="llm-demo-answer"><small>STREAMED ANSWER</small><strong>Cloud computing lets you use computing resources over the internet<span className="typing-cursor"></span></strong></div>
    </div>
    <div className="llm-flow-track">
      {steps.map(({ icon: Icon, label, note }, index) => <div className="llm-flow-wrap" key={label}>
        <div className="llm-flow-node"><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true"/><strong>{label}</strong><small>{note}</small></div>
        {index < steps.length - 1 && <ArrowRight className="llm-flow-arrow" aria-hidden="true"/>}
      </div>)}
    </div>
    <figcaption><strong>Read the animation from left to right.</strong> This is a conceptual learning visual; product implementations and model architectures differ.</figcaption>
  </figure>;
}
