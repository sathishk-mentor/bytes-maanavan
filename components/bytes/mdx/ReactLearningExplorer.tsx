'use client';
import { useMemo, useRef, useState } from 'react';

const labels=['Component tree','Props playground','State snapshots','Effect lifecycle','Hook decision guide'];
const topics=[
  {title:'Break the dashboard into components',items:['App','Dashboard','GreetingList','Greeting'],explain:'Each component owns a focused responsibility. A parent composes children; React renders the tree.'},
  {title:'Change a prop and inspect the result',items:['GreetingList','Greeting','subject','priority'],explain:'Parent data becomes child props. Props are read-only inputs; JSX uses them to describe the card.'},
  {title:'Change counter with a state setter',items:['click','setStatus','new render','updated label'],explain:'An event invokes the setter. React processes the update and renders a new state snapshot.'},
  {title:'Compare subscription, cleanup and derived values',items:['render','commit','subscribe','cleanup'],explain:'Effects synchronize with external systems after commit. Derived values belong in rendering, not an Effect.'},
  {title:'Match the Hook to the reason it exists',items:['useState','useRef','useMemo','useCallback'],explain:'Choose the simplest tool for the job. Memoization is optional and should solve a measured problem.'}
];
export function ReactLearningExplorer({byte=1}:{byte?:number}){
 const [active,setActive]=useState(0);
 const [subject,setSubject]=useState('Anu');
 const [priority,setPriority]=useState('High');
 const [status,setStatus]=useState<'open'|'resolved'>('open');
 const [mounted,setMounted]=useState(true);
 const [online,setOnline]=useState(true);
 const inputRef=useRef<HTMLInputElement>(null);
 const [query,setQuery]=useState('');
 const names=['Anu','Login blocked','Refund delay','Account update'];
 const filtered=useMemo(()=>names.filter(t=>t.toLowerCase().includes(query.toLowerCase())),[query]);
 const topic=topics[byte-1]||topics[0];
 const item=topic.items[active]||topic.items[0];
 return <section aria-label={labels[byte-1]||labels[0]} className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
 <header className="mb-5"><p className="text-xs font-bold tracking-widest uppercase text-sky-700">React visual learning lab · {labels[byte-1]}</p><h3 className="mt-2 text-xl font-bold">{topic.title}</h3><p className="text-sm mt-1 text-slate-600">{topic.explain}</p></header>
 <div className="grid gap-3 sm:grid-cols-4" role="group" aria-label="Explore execution stages">{topic.items.map((s,i)=><button key={s} type="button" aria-pressed={active===i} onClick={()=>setActive(i)} className={`rounded-xl border px-3 py-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-700 ${active===i?'border-sky-500 bg-sky-50 text-sky-900':'border-slate-200 bg-slate-50 text-slate-700'}`}>{String(i+1).padStart(2,'0')} · {s}</button>)}</div>
 <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4" aria-live="polite"><strong>Selected: {item}</strong><p className="text-sm mt-2">{topic.explain}</p></div>
 {byte===1&&<div className="mt-5 rounded-xl border p-4"><strong>Rendered example component tree</strong><div className="mt-3 space-y-2 text-sm"><div className="rounded-lg bg-slate-100 p-3">App</div><div className="ml-4 rounded-lg bg-sky-50 p-3">Dashboard</div><div className="ml-8 rounded-lg bg-slate-100 p-3">GreetingList</div><div className="ml-12 rounded-lg bg-white border p-3">Greeting · Anu</div></div><p className="text-sm mt-3 text-slate-600">Select a stage above to examine its role in the UI.</p></div>}
 {byte===2&&<div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className="block text-sm font-semibold" htmlFor="react-subject">Example subject (prop)</label><input id="react-subject" className="w-full rounded-lg border p-2 mt-1" value={subject} onChange={e=>setSubject(e.target.value)}/><label className="block text-sm font-semibold mt-3" htmlFor="react-priority">Priority (prop)</label><select id="react-priority" className="w-full rounded-lg border p-2 mt-1" value={priority} onChange={e=>setPriority(e.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></div><div className="rounded-xl border p-4"><small className="font-semibold text-slate-500">LIVE COMPONENT PREVIEW</small><h4 className="font-bold mt-4">{subject||'Untitled example'}</h4><p className="mt-2">Priority: {priority}</p><p className="text-xs text-slate-500 mt-3">Parent input → props → Greeting output</p></div></div>}
 {byte===3&&<div className="mt-5 rounded-xl border p-4"><p className="text-sm text-slate-500">Current state snapshot</p><strong className="block text-xl my-3">{status}</strong><div className="flex flex-wrap gap-3"><button type="button" onClick={()=>setStatus('resolved')} className="rounded-lg bg-slate-900 px-4 py-2 text-white">Resolve example</button><button type="button" onClick={()=>setStatus('open')} className="rounded-lg border px-4 py-2">Reopen example</button></div><p className="text-sm mt-3" aria-live="polite">Handler → setStatus → new render → status: {status}</p></div>}
 {byte===4&&<div className="mt-5 rounded-xl border p-4"><p className="text-sm font-semibold">Illustrative external subscription simulator</p><div className="flex flex-wrap gap-2 mt-3"><button type="button" onClick={()=>setMounted(x=>!x)} className="rounded-lg border px-3 py-2">{mounted?'Unmount component':'Mount component'}</button><button type="button" disabled={!mounted} onClick={()=>setOnline(v=>!v)} className="rounded-lg border px-3 py-2 disabled:opacity-50">Simulate connectivity change</button></div><p className="text-sm mt-3" aria-live="polite">{mounted?`Subscription active · connection: ${online?'online':'offline'}`:'Component removed · cleanup unsubscribes'}</p><p className="text-xs mt-2 text-slate-500">This is a conceptual simulation, not a real browser network monitor.</p></div>}
 {byte===5&&<div className="mt-5 rounded-xl border p-4"><label className="block font-semibold text-sm" htmlFor="react-hooks-query">Filter example names (state + optional memoization)</label><input id="react-hooks-query" ref={inputRef} className="rounded-lg border p-2 mt-2 w-full" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search names"/><button type="button" onClick={()=>inputRef.current?.focus()} className="rounded-lg border px-3 py-2 mt-3">Focus input using useRef</button><ul className="mt-3 list-disc pl-5">{filtered.map(t=><li key={t}>{t}</li>)}</ul><p className="text-xs mt-3 text-slate-500">useState drives the query, useRef focuses the field, useMemo caches a calculation when beneficial. This tiny dataset does not need memoization for speed.</p></div>}
 <button type="button" className="mt-4 text-sm font-semibold underline" onClick={()=>{setActive(0);setSubject('Anu');setPriority('High');setStatus('open');setMounted(true);setOnline(true);setQuery('')}}>Reset visual lab</button>
 </section>
}