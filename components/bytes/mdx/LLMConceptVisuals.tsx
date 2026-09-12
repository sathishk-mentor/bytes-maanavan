import { ArrowDown, ArrowRight, Bot, Braces, CheckCircle2, Database, FileSearch, MessageSquareText, SearchCheck, ShieldCheck, UserRoundCheck, Wrench } from 'lucide-react';

export function ContextAssemblyVisual() {
  const inputs = [
    ['System rules', ShieldCheck], ['User prompt', MessageSquareText], ['Conversation', Braces], ['Retrieved facts', FileSearch],
  ] as const;
  return <figure className="concept-visual context-visual">
    <header><span>CONTEXT ASSEMBLY</span><h3>The model receives more than the visible question</h3></header>
    <div className="context-inputs">{inputs.map(([label, Icon], index) => <div key={label} style={{animationDelay:`${index * .18}s`}}><Icon/><strong>{label}</strong></div>)}</div>
    <ArrowDown className="concept-down"/>
    <div className="context-window"><span>MODEL INPUT</span><div><b>Rules</b><b>History</b><b>Question</b><b>Evidence</b></div><small>All selected information must fit inside the available context window.</small></div>
    <figcaption>Good context is relevant, trusted and organised—not simply large.</figcaption>
  </figure>;
}

export function TokenisationVisual() {
  return <figure className="concept-visual token-visual">
    <header><span>TOKENISATION</span><h3>Text is converted into model-readable units</h3></header>
    <div className="tokenisation-row"><div className="visual-sentence">“Cloud computing is useful.”</div><ArrowRight/><div className="visual-tokens"><span>Cloud</span><span> comput</span><span>ing</span><span> is</span><span> useful</span><span>.</span></div><ArrowRight/><div className="visual-ids"><span>8421</span><span>1267</span><span>287</span><small>Illustrative IDs</small></div></div>
    <figcaption>Exact token boundaries and IDs vary by tokenizer and model.</figcaption>
  </figure>;
}

export function ProductVsModelVisual() {
  const app = [['Account & chat',UserRoundCheck],['Files & retrieval',Database],['Tools',Wrench],['Safety controls',ShieldCheck]] as const;
  return <figure className="concept-visual product-model-visual">
    <header><span>SYSTEM VIEW</span><h3>The chat product wraps capabilities around the model</h3></header>
    <div className="product-shell"><div className="product-capabilities">{app.map(([label,Icon])=><span key={label}><Icon/>{label}</span>)}</div><div className="model-core"><Bot/><small>LANGUAGE MODEL</small><strong>Generate the next token</strong></div></div>
    <figcaption>Search, memory, file access and tools are application capabilities; they are not automatically part of every language model call.</figcaption>
  </figure>;
}

export function GroundedAnswerVisual() {
  const steps = [['Question',MessageSquareText],['Find evidence',FileSearch],['Generate draft',Bot],['Check claims',SearchCheck],['Human approval',UserRoundCheck]] as const;
  return <figure className="concept-visual grounding-visual">
    <header><span>DEPENDABLE WORKFLOW</span><h3>Generation becomes safer when evidence and verification surround it</h3></header>
    <div className="grounding-track">{steps.map(([label,Icon],index)=><div className="grounding-wrap" key={label}><div><Icon/><small>0{index+1}</small><strong>{label}</strong></div>{index<steps.length-1&&<ArrowRight/>}</div>)}</div>
    <div className="grounding-outcome"><CheckCircle2/><span><strong>Usable answer</strong><small>Evidence visible · uncertainty marked · owner accountable</small></span></div>
    <figcaption>The required controls depend on the impact of a wrong answer.</figcaption>
  </figure>;
}
