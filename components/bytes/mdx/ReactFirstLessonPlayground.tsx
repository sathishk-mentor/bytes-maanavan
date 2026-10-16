'use client';
import { useState } from 'react';
const defaultItems=['Read React notes','Practise JSX'];
const makeCode=(heading:string,items:string[])=>`export default function App() {
  return (
    <main>
      <h1>${heading}</h1>
      <p>Tasks to complete today</p>
      <ul>
${items.map(item=>`        <li>${item}</li>`).join('\n')}
      </ul>
    </main>
  );
}`;
function HighlightedSource({heading,tasks}:{heading:string;tasks:string[]}) {
 const lines=[
 {indent:0,parts:[['kw','export default function'],['fn',' App'],['plain','() {']]},
 {indent:1,parts:[['kw','return'],['plain',' (']]},
 {indent:2,parts:[['tag','<main>']]},
 {indent:3,parts:[['tag','<h1>'],['str',heading],['tag','</h1>']]},
 {indent:3,parts:[['tag','<p>'],['str','Tasks to complete today'],['tag','</p>']]},
 {indent:3,parts:[['tag','<ul>']]},
 ...tasks.map(task=>({indent:4,parts:[['tag','<li>'],['str',task],['tag','</li>']]})),
 {indent:3,parts:[['tag','</ul>']]},
 {indent:2,parts:[['tag','</main>']]},
 {indent:1,parts:[['plain',');']]},
 {indent:0,parts:[['plain','}']]}
 ];
 return <pre className="overflow-x-auto p-4 text-[13px] leading-7 sm:text-sm" aria-label="Syntax highlighted App.tsx"><code>{lines.map((line,i)=><span key={i} className="block whitespace-pre"><span className="mr-4 inline-block w-5 select-none text-right text-slate-500" aria-hidden="true">{i+1}</span>{'  '.repeat(line.indent)}{line.parts.map(([type,value],j)=><span key={j} className={type==='kw'?'text-fuchsia-300':type==='fn'?'text-sky-300':type==='tag'?'text-cyan-300':type==='str'?'text-amber-200':'text-slate-100'}>{value}</span>)}</span>)}</code></pre>;
}

export function ReactFirstLessonPlayground(){
 const [heading,setHeading]=useState('My Task Manager');
 const [tasks,setTasks]=useState<string[]>(defaultItems);
 const [draft,setDraft]=useState('Learn JSX');
 const [hint,setHint]=useState(false);
 const [copied,setCopied]=useState(false);
 const code=makeCode(heading,tasks);
 const add=()=>{const v=draft.trim();if(v){setTasks(items=>[...items,v]);setDraft('')}};
 return <section className="react-gold-lab my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="React Byte one edit and preview lab">
 <header className="border-b bg-slate-900 p-5 text-white"><p className="text-xs font-extrabold tracking-widest text-cyan-200">TRY IT YOURSELF · REACT BYTE 01</p><h3 className="mt-2 text-xl font-bold">Change the data. See the matching JSX and output.</h3><p className="mt-2 text-sm text-slate-200">A guided live-output simulator—not a JavaScript compiler. Copy the generated component into your own React project to run it.</p></header>
 <div className="grid gap-4 p-4 lg:grid-cols-2">
 <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h4 className="font-bold text-slate-900">1. Edit this screen</h4><label htmlFor="react-gold-heading" className="mt-3 block text-sm font-semibold">Heading text</label><input id="react-gold-heading" value={heading} maxLength={65} onChange={e=>setHeading(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm"/>
 <label htmlFor="react-gold-task" className="mt-3 block text-sm font-semibold">Add a list item</label><div className="mt-1 flex gap-2"><input id="react-gold-task" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')add()}} className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white p-2 text-sm"/><button type="button" className="rounded-lg bg-blue-700 px-3 text-sm font-bold text-white" onClick={add}>Add item</button></div>
 <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={()=>{setHeading('My First To-Do List');setTasks([...defaultItems,'Learn JSX'])}} className="rounded-lg border bg-white px-3 py-2 text-xs font-semibold">Apply practice solution</button><button type="button" onClick={()=>{setHeading('My Task Manager');setTasks(defaultItems);setDraft('Learn JSX');setHint(false)}} className="rounded-lg border bg-white px-3 py-2 text-xs font-semibold">Reset</button></div>
 <button className="mt-4 text-sm font-semibold text-blue-800 underline" type="button" onClick={()=>setHint(x=>!x)} aria-expanded={hint}> {hint?'Hide':'Show'} beginner explanation</button>{hint&&<p className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-slate-700">The heading becomes an h1 element. Each task becomes an li element. This first version only renders fixed JSX; there is no React useState inside App yet. The editor above is a learning simulator.</p>}
 </div>
 <div className="overflow-hidden rounded-xl border border-slate-200"><div className="border-b bg-slate-100 px-4 py-2 text-xs text-slate-600">2. Browser output · instant preview</div><div className="min-h-52 bg-white p-5" aria-live="polite"><h4 className="text-xl font-bold text-slate-900">{heading||' '}</h4><p className="mt-1 text-sm text-slate-600">Tasks to complete today</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-800">{tasks.map((t,i)=><li key={i}>{t}</li>)}</ul></div></div>
 </div>
 <div className="mx-4 mb-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-slate-100"><div className="flex items-center justify-between gap-2 border-b border-slate-700 p-3"><strong className="text-xs">3. Matching App.tsx source</strong><button type="button" className="rounded-lg border border-slate-500 px-3 py-1 text-xs font-semibold" onClick={async()=>{try{await navigator.clipboard.writeText(code);setCopied(true)}catch{setCopied(false)}}}>{copied?'Copied':'Copy code'}</button></div><HighlightedSource heading={heading} tasks={tasks}/></div>
 <p className="px-5 pb-5 text-xs leading-relaxed text-slate-600">Safety note: The editable fields are converted to text in a demonstration component. This is not a JSX editor and does not execute arbitrary code. For real JSX execution, use Vite locally or an official React sandbox.</p>
 </section>;
}
