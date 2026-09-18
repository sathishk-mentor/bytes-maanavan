'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, FileSearch, Gauge, LockKeyhole, Play, RefreshCw, Search, ShieldCheck, Sparkles } from 'lucide-react';

function LabShell({number,title,subtitle,children}:{number:number;title:string;subtitle:string;children:React.ReactNode}){
  return <section className={`rag-lab rag-lab-${number}`}><header><span><FileSearch/><small>INTERACTIVE RAG LAB · BYTE 0{number}</small><strong>{title}</strong></span><em>GUIDED SIMULATION</em></header><p>{subtitle}</p>{children}<footer><ShieldCheck/>Learning simulation using a safe sample knowledge base</footer></section>;
}
function RunButton({onClick,label='Run simulation'}:{onClick:()=>void;label?:string}){return <button className="rag-run" onClick={onClick}><Play/>{label}</button>}

const policies=[
  {title:'Failed UPI refund',text:'Failed UPI payments are automatically reversed within 3–5 working days.',score:94},
  {title:'Card payment dispute',text:'Card disputes may take up to 30 days after supporting evidence is received.',score:66},
  {title:'Account closure',text:'Customers must clear pending balances before closing an account.',score:31},
];

export function RAGGroundingLab(){
  const [rag,setRag]=useState(true);const [ran,setRan]=useState(false);
  return <LabShell number={1} title="Compare a guess with a grounded answer" subtitle="Ask the same policy question with retrieval turned off and on."><div className="rag-question"><b>Customer question</b><span>When will my failed UPI payment be refunded?</span></div><button className={`rag-switch ${rag?'on':''}`} onClick={()=>{setRag(!rag);setRan(false)}}><i/><span>{rag?'RAG ON · Search company policy':'RAG OFF · Model knowledge only'}</span></button><RunButton onClick={()=>setRan(true)}/>{ran&&<div className={`rag-answer ${rag?'grounded':'warning'}`}><header>{rag?<><CheckCircle2/>GROUNDED ANSWER</>:<>⚠ POSSIBLE GUESS</>}</header><p>{rag?'Your failed UPI payment should be reversed within 3–5 working days.':'Refunds usually take a few days, but the exact timeline may vary.'}</p>{rag&&<small>Source: Failed UPI Refund Policy · Section 2.1</small>}</div>}</LabShell>;
}

export function RAGPipelineLab(){
  const [step,setStep]=useState(0);const stages=[['1','Question','“Failed UPI refund?”'],['2','Retrieve','Find policy passages'],['3','Augment','Attach evidence to prompt'],['4','Generate','Write cited answer']];
  return <LabShell number={2} title="Walk through the RAG pipeline" subtitle="Move one stage at a time and watch the question become a grounded response."><div className="rag-pipeline">{stages.map((s,i)=><button className={i<=step?'active':''} onClick={()=>setStep(i)} key={s[1]}><i>{s[0]}</i><b>{s[1]}</b><small>{s[2]}</small></button>)}</div><div className="rag-stage-output"><Sparkles/><span><b>{stages[step][1]} stage</b>{['The application receives the user’s real question.','Semantic search returns the most relevant policy chunks.','The selected passages are placed inside the model prompt.','The model answers from the evidence and includes a source.'][step]}</span></div><div className="rag-actions"><button onClick={()=>setStep(0)}><RefreshCw/>Reset</button><button className="rag-run" onClick={()=>setStep(Math.min(3,step+1))}>{step===3?'Pipeline complete':'Next stage'}</button></div></LabShell>;
}

export function RAGFailureLab(){
  const [failure,setFailure]=useState<'stale'|'chunk'|'retrieve'>('stale');const [checked,setChecked]=useState(false);
  const data={stale:['Stale source','An old policy says 7 days while the current policy says 3–5 days.','Assign an owner and re-index approved updates.'],chunk:['Broken chunk','The refund timeline and its exception were split into different chunks.','Chunk around headings and preserve related sentences.'],retrieve:['Poor retrieval','The correct policy exists, but an unrelated dispute policy ranked first.','Test search settings, metadata filters and reranking.']}[failure];
  return <LabShell number={3} title="Diagnose why an answer went wrong" subtitle="Choose a failure point, inspect the evidence, and reveal the appropriate fix."><div className="rag-tabs">{(['stale','chunk','retrieve'] as const).map(x=><button aria-pressed={failure===x} onClick={()=>{setFailure(x);setChecked(false)}} key={x}>{x==='stale'?'Stale document':x==='chunk'?'Bad chunking':'Wrong retrieval'}</button>)}</div><div className="rag-diagnosis"><Search/><span><small>OBSERVATION</small><b>{data[0]}</b><p>{data[1]}</p></span></div><RunButton label="Reveal corrective action" onClick={()=>setChecked(true)}/>{checked&&<div className="rag-fix"><CheckCircle2/><span><b>Recommended fix</b>{data[2]}</span></div>}</LabShell>;
}

export function RAGEvaluationLab(){
  const [retrieval,setRetrieval]=useState(4);const [grounded,setGrounded]=useState(4);const [relevance,setRelevance]=useState(3);const score=Math.round((retrieval+grounded+relevance)/15*100);
  return <LabShell number={4} title="Score a RAG answer before release" subtitle="Adjust three quality signals and observe the release decision."><div className="rag-meters"><Metric label="Retrieval" value={retrieval} set={setRetrieval}/><Metric label="Groundedness" value={grounded} set={setGrounded}/><Metric label="Relevance" value={relevance} set={setRelevance}/></div><div className={`rag-score ${score>=75?'pass':'fail'}`}><Gauge/><span><small>QUALITY SCORE</small><b>{score}%</b></span><em>{score>=75?'Ready for controlled pilot':'Improve before release'}</em></div></LabShell>;
}

export function RAGProductionLab(){
  const [role,setRole]=useState<'customer'|'support'|'admin'>('customer');const [audit,setAudit]=useState(false);
  const access=useMemo(()=>({customer:['Public FAQ','Own transactions'],support:['Public FAQ','Support playbook','Assigned cases'],admin:['Approved policies','Audit logs','Index controls']})[role],[role]);
  return <LabShell number={5} title="Apply production access and audit controls" subtitle="Change the user role and see which knowledge the retriever is permitted to use."><div className="rag-tabs">{(['customer','support','admin'] as const).map(x=><button aria-pressed={role===x} onClick={()=>{setRole(x);setAudit(false)}} key={x}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div><div className="rag-access"><LockKeyhole/><span><small>RETRIEVAL SCOPE</small><b>{role} role</b><ul>{access.map(x=><li key={x}><CheckCircle2/>{x}</li>)}</ul></span></div><RunButton label="Run governed retrieval" onClick={()=>setAudit(true)}/>{audit&&<div className="rag-audit"><ShieldCheck/><span><b>Audit event recorded</b>Role, question, permitted sources, retrieved chunk IDs and response status were logged.</span></div>}</LabShell>;
}

function Metric({label,value,set}:{label:string;value:number;set:(n:number)=>void}){return <label><span><b>{label}</b><em>{value}/5</em></span><input type="range" min="1" max="5" value={value} onChange={e=>set(Number(e.target.value))}/></label>}

export function RAGStoryVisual({variant}:{variant:'foundation'|'pipeline'|'failure'|'evaluation'|'production'}){
  const items={foundation:['Question','Retrieve','Evidence','Answer'],pipeline:['Load','Chunk','Embed','Search'],failure:['Source','Chunk','Rank','Generate'],evaluation:['Test set','Retrieve','Score','Improve'],production:['Identity','Filter','Answer','Audit']}[variant];
  return <figure className={`rag-story rag-story-${variant}`}><figcaption><small>VISUAL MODEL</small><strong>{items.join(' → ')}</strong></figcaption><div>{items.map((x,i)=><span key={x}><i>0{i+1}</i><b>{x}</b>{i<3&&<em>→</em>}</span>)}</div></figure>;
}
