import { ArrowRight, Bot, Braces, CheckCircle2, Database, FileText, MessageSquareText, Network, Search, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

const flows = {
  foundation: { label:'LANGCHAIN APPLICATION MODEL', caption:'LangChain supplies standard interfaces and an application harness around the model; the model still generates the answer.', steps:[[MessageSquareText,'Messages','Role-based input'],[Bot,'Model','Reasoning engine'],[Braces,'Parser','Typed result'],[CheckCircle2,'Application','Uses output']] },
  model: { label:'PYTHON TO STRUCTURED AI RESPONSE', caption:'Configuration stays outside the code, messages state the task and a schema makes the result usable by software.', steps:[[ShieldCheck,'Environment','Protect API key'],[MessageSquareText,'Prompt','Define task'],[Bot,'Chat model','Generate'],[Braces,'Schema','Validate output']] },
  rag: { label:'TWO-PHASE RAG PIPELINE', caption:'Index documents once; at question time retrieve only the most relevant chunks and place them in the model context.', steps:[[FileText,'Documents','Load + split'],[Sparkles,'Embeddings','Represent meaning'],[Database,'Vector store','Index chunks'],[Search,'Retriever','Ground answer']] },
  agent: { label:'AGENT TOOL-USE LOOP', caption:'The model chooses an action, a tool executes it, the result returns as context and the loop stops when the goal is complete.', steps:[[MessageSquareText,'Goal','User request'],[Bot,'Agent','Choose action'],[Wrench,'Tool','Execute safely'],[Network,'State','Continue or finish']] },
  production: { label:'PRODUCTION RELIABILITY LOOP', caption:'A useful demo becomes a dependable service only when outputs, failures, traces, security and deployment are engineered together.', steps:[[Braces,'Contract','Structured output'],[ShieldCheck,'Controls','Validate + limit'],[Search,'Traces','Observe runs'],[CheckCircle2,'Release','Deploy + improve']] },
} as const;

export function LangChainFlowVisual({variant}:{variant:keyof typeof flows}) {
  const flow=flows[variant];
  return <figure className={`langchain-flow langchain-flow-${variant}`}><header><span><Network/></span><div><small>VISUAL EXPLAINER</small><strong>{flow.label}</strong></div><i>LANGCHAIN</i></header><div className="langchain-flow-steps">{flow.steps.map(([Icon,title,note],index)=><section key={title}><span><Icon/></span><div><b>{title}</b><small>{note}</small></div>{index<flow.steps.length-1&&<ArrowRight/>}</section>)}</div><figcaption>{flow.caption}</figcaption></figure>;
}
