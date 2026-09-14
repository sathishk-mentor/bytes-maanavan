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

export function LangChainBuildingBlocks() {
  const blocks=[[MessageSquareText,'Messages','Who said what—and in which role'],[Sparkles,'Prompt','Task, context and boundaries'],[Bot,'Model','Generates or chooses an action'],[Braces,'Structured output','Returns a predictable data shape'],[Network,'Harness','Coordinates tools, state and middleware']] as const;
  return <figure className="langchain-blocks"><header><small>BEGINNER MENTAL MODEL</small><strong>One request, five clear responsibilities</strong></header><div>{blocks.map(([Icon,title,note],index)=><section key={title}><i>0{index+1}</i><span><Icon/></span><b>{title}</b><small>{note}</small>{index<blocks.length-1&&<ArrowRight/>}</section>)}</div><figcaption><b>Remember:</b> the model produces the intelligence; LangChain helps your application organise the work around it.</figcaption></figure>;
}

export function OfficialLangChainDiagram({variant}:{variant:'agent-loop'|'agent-harness'}) {
  const agentLoop=variant==='agent-loop';
  return <figure className="official-langchain-diagram"><header><div><small>OFFICIAL LANGCHAIN DIAGRAM</small><strong>{agentLoop?'The core agent loop':'Agent = model + harness'}</strong></div><a href="https://docs.langchain.com/oss/python/langchain/agents" target="_blank" rel="noreferrer">View official source <ArrowRight/></a></header><img src={`/images/langchain/${agentLoop?'core-agent-loop-official.svg':'agent-model-harness-official.svg'}`} alt={agentLoop?'Official LangChain diagram showing a request entering a model, the model choosing tools, observations returning to the model and a final result':'Official LangChain diagram showing the model surrounded by the agent harness: memory, skills, tools, context, subagents and system prompt'} loading="lazy"/><figcaption>Source: LangChain official documentation. Displayed without redesign so learners can recognise the original architecture.</figcaption></figure>;
}
