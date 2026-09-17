'use client';

import { useMemo, useState } from 'react';
import { Database, RotateCcw, Search, ShieldCheck, Sparkles } from 'lucide-react';

function Shell({eyebrow,title,onReset,children}:{eyebrow:string;title:string;onReset:()=>void;children:React.ReactNode}){
  const tone=eyebrow.includes('01')?'query':eyebrow.includes('02')?'window':eyebrow.includes('03')?'vector':eyebrow.includes('04')?'feature':'agent';
  return <section className={`sql-lab sql-lab-${tone}`}><header><span><Database/><small>{eyebrow}</small><strong>{title}</strong></span><button onClick={onReset}><RotateCcw/>Reset</button></header><div className="sql-lab-body">{children}</div><footer><ShieldCheck/>Guided browser simulation · no database is changed</footer></section>;
}
function Result({title,children}:{title:string;children:React.ReactNode}){return <div className="sql-lab-result" aria-live="polite"><Sparkles/><b>{title}</b><span>{children}</span></div>}
const products=[['101','Wireless Headphones','₹4,999'],['104','Studio Headphones','₹3,499'],['108','Sports Headphones','₹2,799']];

export function SQLQueryLab(){
  const [filter,setFilter]=useState(true);const [sort,setSort]=useState(true);const [limit,setLimit]=useState(true);const rows=limit?products.slice(0,2):products;
  return <Shell eyebrow="BYTE 01 · QUERY BUILDER" title="Build a focused product query" onReset={()=>{setFilter(true);setSort(true);setLimit(true)}}><div className="sql-controls"><Toggle label="WHERE active headphones" value={filter} set={setFilter}/><Toggle label="ORDER BY price DESC" value={sort} set={setSort}/><Toggle label="LIMIT 2" value={limit} set={setLimit}/></div><pre className="sql-preview">SELECT product_id, name, price{`\n`}FROM products{filter?`\nWHERE category = 'Headphones' AND status = 'ACTIVE'`:''}{sort?'\nORDER BY price DESC':''}{limit?'\nLIMIT 2;':';'}</pre><MiniTable headers={['product_id','name','price']} rows={sort?rows:[...rows].reverse()}/><Result title={filter?'Focused request':'Query is too broad'}>{filter?'The database returns only the columns and rows the application needs.':'Add a WHERE condition before using this query in an application.'}</Result></Shell>;
}

const sales=[['Meena','₹12,000','1'],['Arun','₹9,500','2'],['Farah','₹7,200','3']];
export function SQLWindowLab(){
  const [mode,setMode]=useState<'group'|'window'>('group');
  return <Shell eyebrow="BYTE 02 · ROW BEHAVIOUR" title="See what GROUP BY and windows preserve" onReset={()=>setMode('group')}><div className="sql-tabs"><button aria-pressed={mode==='group'} onClick={()=>setMode('group')}>GROUP BY</button><button aria-pressed={mode==='window'} onClick={()=>setMode('window')}>Window function</button></div>{mode==='group'?<MiniTable headers={['customer','total_spend']} rows={sales.map(r=>r.slice(0,2))}/>:<MiniTable headers={['customer','total_spend','spend_rank']} rows={sales}/>}<Result title={mode==='group'?'Rows collapse':'Rows stay visible'}>{mode==='group'?'One summary row is returned for each customer.':'RANK() adds analysis without hiding the aggregated customer rows.'}</Result></Shell>;
}

const docs=[{name:'Refund policy',score:.91},{name:'Delivery policy',score:.72},{name:'Warranty guide',score:.48}];
export function SQLVectorLab(){
  const [top,setTop]=useState(2);const [indexed,setIndexed]=useState(true);
  return <Shell eyebrow="BYTE 03 · VECTOR SEARCH" title="Find meaning, not only matching words" onReset={()=>{setTop(2);setIndexed(true)}}><label className="sql-range"><span>Top results: {top}</span><input type="range" min="1" max="3" value={top} onChange={e=>setTop(Number(e.target.value))}/></label><Toggle label="Use HNSW index" value={indexed} set={setIndexed}/><div className="sql-vector-path"><span><Search/>“Can I get my money back?”</span><i>→</i><span>Embedding</span><i>→</i><span>{indexed?'HNSW candidates':'Exact scan'}</span></div><MiniTable headers={['document','similarity']} rows={docs.slice(0,top).map(d=>[d.name,d.score.toFixed(2)])}/><Result title={indexed?'Approximate indexed search':'Exact search'}>{indexed?'Faster candidate search for larger collections; benchmark recall for your workload.':'Compares against every row; useful for correctness checks and smaller datasets.'}</Result></Shell>;
}

export function SQLFeatureLab(){
  const [days,setDays]=useState(30);const [leakage,setLeakage]=useState(false);const count=days===7?2:days===30?7:14;
  return <Shell eyebrow="BYTE 04 · FEATURE LAB" title="Create features as they were known at prediction time" onReset={()=>{setDays(30);setLeakage(false)}}><label className="sql-range"><span>Lookback window: {days} days</span><input type="range" min="7" max="60" step="23" value={days} onChange={e=>setDays(Number(e.target.value))}/></label><Toggle label="Include transactions after cutoff" value={leakage} set={setLeakage}/><MiniTable headers={['customer_id',`orders_${days}d`,`spend_${days}d`]} rows={[["C101",String(count),`₹${(count*1240).toLocaleString('en-IN')}`]]}/><Result title={leakage?'Leakage detected':'Point-in-time safe'}>{leakage?'Post-cutoff information would let the model see the future. Remove it before training.':'Every feature uses data available on or before the prediction cutoff.'}</Result></Shell>;
}

export function SQLAgentLab(){
  const [question,setQuestion]=useState<'clear'|'ambiguous'|'unsafe'>('ambiguous');const state=useMemo(()=>question==='unsafe'?['BLOCKED','DELETE is not allowed for the read-only role.']:question==='ambiguous'?['CLARIFY','Does “best customer” mean highest revenue, order count or margin?']:['APPROVED','Validated SELECT; execute with row and time limits, then log the result.'],[question]);
  return <Shell eyebrow="BYTE 05 · SAFE TEXT-TO-SQL" title="Watch the agent decide before execution" onReset={()=>setQuestion('ambiguous')}><div className="sql-tabs three"><button aria-pressed={question==='ambiguous'} onClick={()=>setQuestion('ambiguous')}>Ambiguous metric</button><button aria-pressed={question==='clear'} onClick={()=>setQuestion('clear')}>Clear request</button><button aria-pressed={question==='unsafe'} onClick={()=>setQuestion('unsafe')}>Unsafe write</button></div><div className="sql-agent-flow"><span>Question</span><i>→</i><span>Definitions</span><i>→</i><span>Generate</span><i>→</i><span>Validate</span><i>→</i><b>{state[0]}</b></div><Result title={state[0]}>{state[1]}</Result></Shell>;
}

export function SQLStoryVisual({variant}:{variant:'foundation'|'aggregate'|'vector'|'feature'|'agent'}){
 const data={foundation:['APP REQUEST TO ANSWER',['Question','Filter','Query','Rows'],'SQL narrows a broad table into a predictable application response.'],aggregate:['FROM EVENTS TO INSIGHT',['Order rows','Aggregate','Window','Rank'],'Aggregate first, then use a window to compare each summary row.'],vector:['SEMANTIC RETRIEVAL',['Text','Embedding','Distance','Top matches'],'Embeddings turn meaning into vectors; SQL orders candidates by distance.'],feature:['POINT-IN-TIME PIPELINE',['Raw events','Cutoff','Features','Model'],'A cutoff prevents the feature pipeline from leaking future information.'],agent:['GOVERNED SQL AGENT',['Question','Clarify','Validate','Read only'],'Generation is only one step; validation and database permissions enforce safety.']}[variant];
 return <figure className={`sql-story sql-story-${variant}`}><header><small>{data[0] as string}</small><strong>{data[2] as string}</strong></header><div>{(data[1] as string[]).map((x,i)=><span key={x}><i>0{i+1}</i><b>{x}</b>{i<3&&<em>→</em>}</span>)}</div><figcaption>{data[2] as string}</figcaption></figure>;
}

function Toggle({label,value,set}:{label:string;value:boolean;set:(v:boolean)=>void}){return <button className={`sql-toggle ${value?'on':''}`} aria-pressed={value} onClick={()=>set(!value)}><span>{label}</span><i>{value?'ON':'OFF'}</i></button>}
function MiniTable({headers,rows}:{headers:string[];rows:string[][]}){return <div className="sql-mini-table" role="table"><div role="row">{headers.map(h=><b role="columnheader" key={h}>{h}</b>)}</div>{rows.map((row,i)=><div role="row" key={i}>{row.map((cell,j)=><span role="cell" key={j}>{cell}</span>)}</div>)}</div>}

export function SQLProjectPath({current}:{current:number}){
  const steps=['Query facts','Analyse trends','Search meaning','Build features','Govern agents'];
  return <nav className="sql-project-path" aria-label="AI-Powered Business Data Analyst project progress"><header><small>CONTINUOUS PROJECT</small><strong>AI-Powered Business Data Analyst</strong></header><ol>{steps.map((step,index)=><li className={index+1===current?'active':index+1<current?'done':''} key={step}><i>{index+1}</i><span>{step}</span></li>)}</ol></nav>;
}
