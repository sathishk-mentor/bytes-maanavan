'use client';
import {useState} from 'react';
const flows={
 render:[['Browser','Loads your React application'],['main.tsx','Starts React at the root element'],['App()','Returns the JSX description'],['React DOM','Displays the heading and tasks']],
 files:[['index.html','Contains the root element'],['src/main.tsx','Finds root and renders App'],['src/App.tsx','Defines your To-Do List UI'],['Browser screen','Displays the final visible elements']]
};
export function ReactBeginnerFlow({kind='render'}:{kind?:'render'|'files'}){
 const [active,setActive]=useState(0);const stages=flows[kind];const current=stages[Math.min(active,stages.length-1)];
 return <section className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label={kind==='render'?'How React renders a page':'How React project files connect'}>
 <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-widest text-blue-700">VISUAL WALKTHROUGH · {kind==='render'?'RENDERING':'FILE CONNECTIONS'}</p><h3 className="mt-2 text-lg font-bold text-slate-900">{kind==='render'?'From opening your app to seeing the page':'Understand which file does what'}</h3></div>
 <div className="grid gap-2 p-4 sm:grid-cols-4">{stages.map(([name,meaning],i)=><button type="button" key={name} aria-pressed={active===i} onClick={()=>setActive(i)} className={`relative min-h-28 rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${active===i?'border-blue-500 bg-blue-50':'border-slate-200 bg-slate-50 hover:border-blue-300'}`}><span className="text-xs font-bold text-blue-700">STEP {i+1}</span><strong className="mt-2 block break-words text-sm text-slate-900">{name}</strong><small className="mt-2 block text-xs leading-relaxed text-slate-600">{meaning}</small>{i!==3&&<span className="absolute -right-2 top-1/2 z-10 hidden rounded-full bg-white px-1 text-blue-600 sm:block" aria-hidden="true">→</span>}</button>)}</div>
 <div className="mx-4 mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700" aria-live="polite"><strong className="text-blue-900">{current[0]}</strong><p className="mt-1">{current[1]}</p><p className="mt-2 text-xs text-slate-600">Select another step above to explore the flow.</p></div></section>;
}
