'use client';

import { useState } from 'react';
import { ArrowRight, Bot, Braces, CheckCircle2, Database, FileText, MessageSquareText, Network, Play, Search, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

const flows = {
  foundation: { label:'LANGCHAIN APPLICATION MODEL', caption:'LangChain supplies standard interfaces and an application harness around the model; the model still generates the answer.', steps:[[MessageSquareText,'Messages','Role-based input'],[Bot,'Model','Reasoning engine'],[Braces,'Parser','Typed result'],[CheckCircle2,'Application','Uses output']] },
  model: { label:'PYTHON TO STRUCTURED AI RESPONSE', caption:'Configuration stays outside the code, messages state the task and a schema makes the result usable by software.', steps:[[ShieldCheck,'Environment','Protect API key'],[MessageSquareText,'Prompt','Define task'],[Bot,'Chat model','Generate'],[Braces,'Schema','Validate output']] },
  rag: { label:'TWO-PHASE RAG PIPELINE', caption:'Index documents once; at question time retrieve only the most relevant chunks and place them in the model context.', steps:[[FileText,'Documents','Load + split'],[Sparkles,'Embeddings','Represent meaning'],[Database,'Vector store','Index chunks'],[Search,'Retriever','Ground answer']] },
  agent: { label:'AGENT TOOL-USE LOOP', caption:'The model chooses an action, a tool executes it, the result returns as context and the loop stops when the goal is complete.', steps:[[MessageSquareText,'Goal','User request'],[Bot,'Agent','Choose action'],[Wrench,'Tool','Execute safely'],[Network,'State','Continue or finish']] },
  production: { label:'PRODUCTION RELIABILITY LOOP', caption:'A useful demo becomes a dependable service only when outputs, failures, traces, security and deployment are engineered together.', steps:[[Braces,'Contract','Structured output'],[ShieldCheck,'Controls','Validate + limit'],[Search,'Traces','Observe runs'],[CheckCircle2,'Release','Deploy + improve']] },
} as const;

export function LangChainFlowVisual({variant}:{variant:keyof typeof flows}) {
  const flow=flows[variant];
  const [active,setActive]=useState(0);
  return <figure className={`langchain-flow langchain-flow-${variant}`}><header><span><Network/></span><div><small>INSIDE THE WORKFLOW · TAP EACH STEP</small><strong>{flow.label}</strong></div><i>LANGCHAIN</i></header><div className="langchain-flow-steps">{flow.steps.map(([Icon,title,note],index)=><section key={title}><button className={active===index?'active':''} onClick={()=>setActive(index)} aria-pressed={active===index}><span><Icon/></span><div><b>{index+1}. {title}</b><small>{note}</small></div></button>{index<flow.steps.length-1&&<ArrowRight/>}</section>)}</div><div className="langchain-active-step"><small>NOW HAPPENING</small><b>{flow.steps[active][1]}</b><span>{flow.steps[active][2]}. {active<flow.steps.length-1?`Next, the application moves to ${flow.steps[active+1][1]}.`:'The workflow now returns a usable result.'}</span></div><figcaption>{flow.caption}</figcaption></figure>;
}

const labs = {
  foundation:{person:'Learner asks for a course recommendation',problem:'A raw model answer may be inconsistent',solution:'Messages + model + schema produce a predictable recommendation',output:'course: Generative AI Basics · level: beginner'},
  model:{person:'Learner reports a locked paid course',problem:'Support needs category and urgency—not a paragraph',solution:'A structured-output model classifies the ticket',output:'category: access · urgency: high'},
  rag:{person:'Employee asks about the leave policy',problem:'The model should not guess from general knowledge',solution:'Retrieve the relevant policy chunk before answering',output:'Answer grounded in Leave-Policy.pdf · page 4'},
  agent:{person:'Learner asks to find a course and draft a reply',problem:'The task needs a search tool and multiple decisions',solution:'The agent selects a tool, observes the result and continues',output:'Course found · reply drafted · approval required'},
  production:{person:'A live request reaches the AI service',problem:'Providers can time out and outputs can be invalid',solution:'Validate, trace, retry safely and return a controlled response',output:'200 OK · validated · trace ID lc-2048'},
} as const;

export function LangChainScenarioLab({variant}:{variant:keyof typeof labs}){
  const item=labs[variant]; const [stage,setStage]=useState(0); const stages=[['NEED',item.person],['PROBLEM',item.problem],['SOLUTION',item.solution]];
  return <figure className="langchain-scenario-lab"><header><div><small>FAMILIAR SCENARIO</small><strong>See why LangChain is needed</strong></div><span>Tap 1 → 2 → 3</span></header><div className="langchain-scenario-stages">{stages.map(([label,text],index)=><button key={label} className={stage===index?'active':''} onClick={()=>setStage(index)}><i>0{index+1}</i><b>{label}</b><small>{text}</small></button>)}</div><footer><CheckCircle2/><div><small>WHAT THE LEARNER SHOULD NOTICE</small><b>{stages[stage][1]}</b></div></footer></figure>
}

export function LangChainCodeResult({variant}:{variant:keyof typeof labs}){
  const item=labs[variant]; const [ran,setRan]=useState(false);
  return <figure className="langchain-code-result"><header><div><small>CODE RESULT</small><strong>Run the example mentally</strong></div><button onClick={()=>setRan(true)}><Play/> Run simulation</button></header><div><section><small>INPUT</small><b>{item.person}</b></section><ArrowRight/><section className={ran?'active':''}><small>LANGCHAIN APP</small><b>{ran?item.solution:'Waiting to run'}</b></section><ArrowRight/><section className={ran?'success':''}><small>OUTPUT</small><b>{ran?item.output:'Result appears here'}</b></section></div><figcaption>{ran?'The output is now usable by the next screen or business workflow.':'Select “Run simulation” to connect the code with its visible result.'}</figcaption></figure>
}

export function LangChainBuildingBlocks() {
  const blocks=[[MessageSquareText,'Messages','Who said what—and in which role'],[Sparkles,'Prompt','Task, context and boundaries'],[Bot,'Model','Generates or chooses an action'],[Braces,'Structured output','Returns a predictable data shape'],[Network,'Harness','Coordinates tools, state and middleware']] as const;
  return <figure className="langchain-blocks"><header><small>BEGINNER MENTAL MODEL</small><strong>One request, five clear responsibilities</strong></header><div>{blocks.map(([Icon,title,note],index)=><section key={title}><i>0{index+1}</i><span><Icon/></span><b>{title}</b><small>{note}</small>{index<blocks.length-1&&<ArrowRight/>}</section>)}</div><figcaption><b>Remember:</b> the model produces the intelligence; LangChain helps your application organise the work around it.</figcaption></figure>;
}

export function OfficialLangChainDiagram({variant}:{variant:'agent-loop'|'agent-harness'}) {
  const agentLoop=variant==='agent-loop';
  return <figure className="official-langchain-diagram"><header><div><small>OFFICIAL LANGCHAIN DIAGRAM</small><strong>{agentLoop?'The core agent loop':'Agent = model + harness'}</strong></div><a href="https://docs.langchain.com/oss/python/langchain/agents" target="_blank" rel="noreferrer">View official source <ArrowRight/></a></header><img src={`/images/langchain/${agentLoop?'core-agent-loop-official.svg':'agent-model-harness-official.svg'}`} alt={agentLoop?'Official LangChain diagram showing a request entering a model, the model choosing tools, observations returning to the model and a final result':'Official LangChain diagram showing the model surrounded by the agent harness: memory, skills, tools, context, subagents and system prompt'} loading="lazy"/><figcaption>Source: LangChain official documentation. Displayed without redesign so learners can recognise the original architecture.</figcaption></figure>;
}
