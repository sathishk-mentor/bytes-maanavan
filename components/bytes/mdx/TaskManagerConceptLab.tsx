'use client';
import { useRef, useState } from 'react';
type Task={id:number;title:string;done:boolean};
const initial:Task[]=[{id:1,title:'Read React notes',done:false},{id:2,title:'Practise JSX',done:false}];
const stages=[
 {heading:'Component tree',sub:'One App component describes the first task list.',names:['App','main','ul','li'],explain:'Each nested JSX element describes part of the screen.'},
 {heading:'Props',sub:'One reusable TaskItem receives different task data.',names:['App','task data','TaskItem','render'],explain:'The parent supplies a title prop; the child renders it. Keys preserve list identity.'},
 {heading:'State and events',sub:'Add and complete tasks; React updates the view.',names:['input','handler','setTasks','render'],explain:'React updates UI when state setters produce the next state snapshot.'},
 {heading:'Effects',sub:'Save the current tasks to browser storage.',names:['state','render','effect','storage'],explain:'Effects synchronize with localStorage after React commits. Storage is outside React.'},
 {heading:'Refs and optional memoization',sub:'Search the list, focus the input and choose whether to memoize.',names:['query','filter','ref','output'],explain:'State controls search text, a ref focuses the input, and memoization is optional.'}
];
export function TaskManagerConceptLab({byte=1}:{byte?:number}){
 const [tasks,setTasks]=useState<Task[]>(initial),[draft,setDraft]=useState(''),[query,setQuery]=useState(''),[stage,setStage]=useState(0),[saved,setSaved]=useState(false);
 const searchRef=useRef<HTMLInputElement>(null);
 const data=stages[byte-1]||stages[0];
 const visible=tasks.filter(t=>t.title.toLowerCase().includes(query.toLowerCase()));
 const add=()=>{const title=draft.trim();if(!title)return;setTasks(t=>[...t,{id:Math.max(0,...t.map(x=>x.id))+1,title,done:false}]);setDraft('')};
 return <section className="my-8 overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm" aria-label="Task Manager React concept explorer">
 <header className="bg-gradient-to-r from-slate-900 to-blue-800 p-5 text-white"><p className="text-xs font-bold tracking-widest text-cyan-200">REACT VISUAL LAB · BYTE {String(byte).padStart(2,'0')}</p><h3 className="mt-2 text-xl font-bold">{data.heading}</h3><p className="mt-1 text-sm text-blue-100">{data.sub}</p></header>
 <div className="p-4 sm:p-6"><div className="grid gap-2 sm:grid-cols-4">{data.names.map((s,i)=><button type="button" key={s} aria-pressed={stage===i} onClick={()=>setStage(i)} className={`rounded-lg border p-3 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 ${stage===i?'border-sky-500 bg-sky-100 text-blue-900':'border-slate-200 bg-slate-50 text-slate-700'}`}>{i+1}. {s}</button>)}</div>
 <div className="mt-3 rounded-lg bg-sky-50 p-3 text-sm text-blue-900" aria-live="polite"><strong>{data.names[stage]}</strong> — {data.explain}</div>
 <div className="mt-5 rounded-xl border border-slate-200"><div className="flex items-center gap-2 border-b bg-slate-100 px-4 py-2 text-xs text-slate-600"><span className="text-rose-500">●</span><span className="text-amber-500">●</span><span className="text-emerald-500">●</span><span className="ml-3">localhost:5173 · Task Manager preview</span></div><div className="bg-gradient-to-br from-sky-50 via-white to-violet-50 p-5"><h4 className="text-lg font-bold text-slate-900">My Task Manager</h4><p className="text-sm text-slate-500">Learn React one small step at a time.</p>
 {byte>=3&&<div className="mt-4 flex flex-wrap gap-2"><label className="sr-only" htmlFor={'task-draft-'+byte}>New task</label><input id={'task-draft-'+byte} className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white p-2" placeholder="New task" value={draft} onChange={e=>setDraft(e.target.value)}/><button type="button" className="rounded-lg bg-blue-700 px-4 py-2 font-bold text-white" onClick={add}>Add</button></div>}
 {byte===5&&<div className="mt-3 flex gap-2"><input ref={searchRef} aria-label="Search tasks" placeholder="Search tasks" className="min-w-0 flex-1 rounded-lg border p-2" value={query} onChange={e=>setQuery(e.target.value)}/><button type="button" className="rounded-lg border bg-white px-3" onClick={()=>searchRef.current?.focus()}>Focus</button></div>}
 <ul className="mt-4 space-y-2">{(byte===5?visible:tasks).map(t=><li key={t.id} className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-white p-3 text-sm text-slate-900">{byte>=3&&<input aria-label={'Complete '+t.title} type="checkbox" checked={t.done} onChange={()=>setTasks(cur=>cur.map(x=>x.id===t.id?{...x,done:!x.done}:x))}/>}<span className={t.done?'line-through text-slate-500':''}>{t.title}</span>{byte===2&&<span className="ml-auto rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-800">TaskItem prop</span>}</li>)}</ul>
 {byte===4&&<div className="mt-3 flex items-center gap-3"><button type="button" className="rounded-lg border bg-white px-3 py-2 text-sm" onClick={()=>setSaved(true)}>Simulate Effect save</button><span aria-live="polite" className="text-sm">{saved?'Snapshot saved (demo only)':'React state → external storage'}</span></div>}
 </div></div><p className="mt-3 text-xs text-slate-500">This is a concept simulator. Build the actual React code in the walkthrough below.</p><button type="button" className="mt-3 text-sm font-semibold text-blue-700 underline" onClick={()=>{setTasks(initial);setDraft('');setQuery('');setStage(0);setSaved(false)}}>Reset lab</button></div>
 </section>;
}
export function TaskManagerByteHero({byte=1}:{byte?:number}){
 const data=stages[byte-1]||stages[0];const [active,setActive]=useState(0);
 return <section className={`react-byte-hero react-byte-hero-lesson-${byte}`} aria-label={`React Byte ${byte} visual introduction`}><div className="react-byte-hero-head"><div><p>REACT FUNDAMENTALS · BYTE {String(byte).padStart(2,'0')}</p><h3>{data.heading}</h3><span>{data.sub}</span></div><div className="react-byte-hero-orb" aria-hidden="true">⚛</div></div><div className={`react-byte-hero-stage react-byte-hero-stage-${byte}`}><div className="react-byte-hero-flow">{data.names.map((step,i)=><div key={step} className="react-byte-hero-flow-item"><button type="button" className={active===i?'active':''} aria-pressed={active===i} onClick={()=>setActive(i)}>{step}</button>{i<data.names.length-1&&<span className="react-byte-hero-arrow" aria-hidden="true">→</span>}</div>)}</div><div className="react-byte-hero-preview"><div>Step {active+1}: {data.names[active]}</div><span>{data.explain}</span></div></div></section>
}
