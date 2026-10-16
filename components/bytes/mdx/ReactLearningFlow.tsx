'use client';
import {useState} from 'react';
const flows:Record<number,{title:string;steps:[string,string][];test:string}>={
 2:{title:'From data to a reusable TaskItem',steps:[['tasks array','Stores task objects with an id and title'],['App.map()','Visits each task to create one TaskItem'],['title prop','Supplies each TaskItem with its text'],['TaskItem','Returns an li containing the task title']],test:'Add a third task object. The same component renders a third list item.'},
 3:{title:'From a click to an updated list',steps:[['Type a task','The controlled input updates draft state'],['Click Add','The event handler checks the text'],['setTasks()','Creates a new array with the added task'],['New render','The task appears in the visible list']],test:'Use a checkbox to mark one task complete; the state changes, then the UI responds.'},
 4:{title:'From React state to browser storage',steps:[['Open app','Lazy initialization reads saved tasks'],['Change a task','React updates task state'],['Effect runs','The tasks dependency has changed'],['localStorage','Saved JSON can be restored on refresh']],test:'Add a task and refresh the page. The saved task should remain in the same browser.'},
 5:{title:'From search text to focused results',steps:[['Type search','useState remembers the query'],['Filter tasks','JavaScript matches task titles'],['Show results','The list renders only matching tasks'],['Focus button','useRef points to the input element']],test:'Search for “React” and click Focus. Filtering changes the list; focus moves to the text box.'}
};
export function ReactLearningFlow({byte=2}:{byte?:number}){
 const d=flows[byte]||flows[2];const [active,setActive]=useState(0);
 return <section className="my-8 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm" aria-label={d.title}>
 <header className="bg-gradient-to-r from-slate-900 to-indigo-800 p-5 text-white"><p className="text-xs font-extrabold tracking-widest text-cyan-200">CONCEPT → CODE → OUTPUT · BYTE {String(byte).padStart(2,'0')}</p><h3 className="mt-2 text-xl font-bold">{d.title}</h3><p className="mt-2 text-sm text-indigo-100">Select any stage to inspect what React or JavaScript does.</p></header>
 <div className="grid gap-2 p-4 sm:grid-cols-4">{d.steps.map(([name,description],i)=><button type="button" key={name} onClick={()=>setActive(i)} aria-pressed={active===i} className={`rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${i===active?'border-blue-500 bg-blue-50':'border-slate-200 bg-slate-50'}`}><span className="text-xs font-bold text-blue-700">STEP {i+1}</span><strong className="mt-2 block text-sm text-slate-900">{name}</strong><small className="mt-2 block text-xs leading-relaxed text-slate-600">{description}</small></button>)}</div>
 <div className="mx-4 mb-4 rounded-xl bg-blue-50 p-4 text-sm" aria-live="polite"><strong className="text-blue-900">{d.steps[active][0]}</strong><p className="mt-1 text-slate-700">{d.steps[active][1]}</p></div>
 <div className="border-t bg-slate-50 p-4 text-sm"><strong>Try it in your own project:</strong> {d.test}</div></section>;
}
