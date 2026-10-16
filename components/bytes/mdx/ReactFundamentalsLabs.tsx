'use client';
import { useState } from 'react';
type Case={prompt:string;options:string[];correct:number;feedback:string;result:string};
const cases:Record<number,Case[]>={
1:[{prompt:'Which React component describes the Task Manager screen?',options:['A database connection','A function returning JSX','A CSS animation'],correct:1,feedback:'Components return JSX describing the UI.',result:'App → JSX → task list on screen'}],
2:[{prompt:'How should TaskItem receive a different title?',options:['Via a title prop','By rewriting the component for every item','By changing browser HTML manually'],correct:0,feedback:'Props are reusable read-only inputs.',result:'<TaskItem title="Read React notes" />'}],
3:[{prompt:'Which action correctly updates the task list?',options:['tasks.push(newTask)','setTasks(current => [...current, newTask])','Reassign the props'],correct:1,feedback:'Create a new array and update state through its setter.',result:'Add click → setTasks → UI refreshes'}],
4:[{prompt:'Why use an Effect to save tasks?',options:['To calculate pending count','To synchronize with browser localStorage','To create JSX'],correct:1,feedback:'An Effect syncs with a system outside React.',result:'State changes → effect writes storage'}],
5:[{prompt:'Which Hook lets the Focus button select the search input?',options:['useRef','useMemo','useCallback'],correct:0,feedback:'useRef holds an input DOM reference.',result:'searchRef.current?.focus()'}]
};
export function ReactConceptLab({byte=1}:{byte?:number}){
 const [step,setStep]=useState(0);const [selected,setSelected]=useState<number|null>(null);const c=(cases[byte]||cases[1])[step]; const correct=selected===c.correct;
 return <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 my-7" aria-label="React decision lab">
 <p className="text-xs font-bold uppercase tracking-widest text-cyan-700">INTERACTIVE REACT LAB · BYTE {String(byte).padStart(2,'0')}</p>
 <h3 className="text-lg font-semibold mt-2">{c.prompt}</h3><div className="grid gap-2 mt-4">{c.options.map((o,i)=><button key={o} type="button" disabled={selected!==null} onClick={()=>setSelected(i)} className="rounded-lg border border-slate-300 bg-white text-left p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 disabled:opacity-80">{String.fromCharCode(65+i)}. {o}</button>)}</div>
 {selected!==null&&<div className="mt-4 rounded-lg bg-white border p-4" aria-live="polite"><strong>{correct?'Correct decision':'Not quite — inspect the explanation'}</strong><p className="mt-2">{c.feedback}</p><pre className="whitespace-pre-wrap text-sm mt-3 bg-slate-100 p-3 rounded-lg">{c.result}</pre><button type="button" className="mt-3 underline font-semibold" onClick={()=>setSelected(null)}>Try again / Reset</button></div>}</section>
}
const questions:Record<number,[string,string,string,string,number,string][]>={
1:[['React primarily helps build','User interfaces','Databases','Operating systems',0,'React is a UI library.'],['Component is','Reusable UI unit','HTTP server','CSS file',0,'Components compose the interface.'],['React render describes','What UI should look like','Database migration','Git merge',0,'Render computes UI.'],['A list should use','Stable keys','Random keys each render','No key',0,'Stable keys preserve identity.'],['Vite is commonly used for','Development tooling','State management','API security',0,'Vite builds and serves project assets.']],
2:[['JSX lets developers write','UI markup within JavaScript','Database SQL','HTTP headers',0,'JSX expresses the view.'],['Props are','Inputs from parent','Local mutations','Browser storage',0,'Props pass inputs.'],['Props should be','Treated as read-only','Mutated in child','Stored in window',0,'Component inputs are immutable.'],['A list item needs','A stable key','A random timestamp','No identity',0,'Keys identify siblings.'],['A component name convention is','PascalCase','lowercase HTML tag only','Numeric name',0,'PascalCase distinguishes components.']],
3:[['State update should use','Setter returned from useState','Direct mutation','Reassign prop',0,'The setter schedules an update.'],['Event handler onClick is','Passed as a function','Immediately invoked in JSX','A string',0,'React calls the handler after interaction.'],['Array state update uses','New array with map/filter','push on same array','Editing props',0,'Treat state immutably.'],['State is a','Snapshot for a render','Global DOM variable','CSS file',0,'Each render sees a snapshot.'],['Derived value should often be','Calculated while rendering','Duplicated in another state','Stored in browser always',0,'Avoid redundant state.']],
4:[['Effects are intended for','Synchronizing with external systems','Calculating all values','Handling every click',0,'Effects synchronize with outside systems.'],['Effect cleanup is useful for','Unsubscribing from events','Editing JSX','Setting CSS colors',0,'Clean up subscriptions.'],['Dependencies describe','Reactive values used by effect','Only function names','Server ports',0,'Include reactive dependencies.'],['Fetch race conditions can be handled with','Cleanup and cancellation/ignore guards','Removing all dependencies','Mutating state',0,'Ignore stale results.'],['Derived full name needs','Direct render calculation','useEffect always','useRef always',0,'Derive pure values in render.']],
5:[['DOM focus reference uses','useRef','useMemo','useEffect for every click',0,'Refs reference DOM nodes.'],['useMemo is mainly for','Caching expensive calculation when appropriate','All variables','Network authentication',0,'Avoid unnecessary memoization.'],['useCallback caches','Function identity','API response','DOM mutation',0,'It caches a function reference.'],['Changing ref.current usually','Does not cause a render','Always causes render','Resets state',0,'Refs do not notify React.'],['A custom Hook name begins with','use','Component','handle',0,'Hook naming follows use prefix.']]
};
export function ReactFiveQuestionQuiz({byte=1}:{byte?:number}){
 const rows=(questions[byte]||questions[1]).map(([q,a,b,c,answer,why],i)=>{
  const opts=[a,b,c], shift=(i+byte)%3;
  return {q,opts:opts.map((_,j)=>opts[(j+shift)%3]),a:(answer-shift+3)%3,why};
 });
 const [answers,setAnswers]=useState<Record<number,number>>({}),[submitted,setSubmitted]=useState(false);
 const score=rows.filter((r,i)=>answers[i]===r.a).length;
 return <section aria-label="Five question React knowledge check" className="my-9 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-5 sm:px-7">
    <p className="text-xs font-bold uppercase tracking-widest text-blue-700">PRACTISE AND CHECK</p>
    <h3 className="mt-2 text-xl font-bold text-slate-900">Knowledge Check · 5 questions</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate-600">Choose one answer for every question. Submit to see your score and explanations.</p>
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={5} aria-valuenow={Object.keys(answers).length}><div className="h-full rounded-full bg-blue-600 transition-all" style={{width:(Object.keys(answers).length/5*100)+'%'}}/></div>
    <p className="mt-1 text-right text-xs text-slate-500">{Object.keys(answers).length} of 5 answered</p>
  </div>
  <div className="space-y-4 p-4 sm:p-6">{rows.map((r,i)=><fieldset key={i} className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
    <legend className="sr-only">Question {i+1}</legend>
    <p className="mb-4 font-semibold leading-relaxed text-slate-900"><span className="mr-2 text-blue-700">{String(i+1).padStart(2,'0')}.</span>{r.q}?</p>
    <div className="grid gap-2">{r.opts.map((o,j)=><label key={j} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 transition-colors focus-within:ring-2 focus-within:ring-blue-500 ${answers[i]===j?'border-blue-500 bg-blue-50':'border-slate-200 bg-slate-50 hover:border-slate-300'} ${submitted?'cursor-default':''}`}>
      <input className="mt-1 h-4 w-4 shrink-0 accent-blue-700" type="radio" name={'react-'+byte+'-'+i} checked={answers[i]===j} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/><span>{o}</span>
    </label>)}</div>
    {submitted&&<div role="status" className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${answers[i]===r.a?'bg-emerald-50 text-emerald-800':'bg-amber-50 text-amber-900'}`}><strong>{answers[i]===r.a?'Correct. ':'Review this answer. '}</strong>{r.why} <span className="block mt-1">Correct choice: {r.opts[r.a]}.</span></div>}
  </fieldset>)}</div>
  <footer className="flex flex-wrap items-center justify-between gap-3 border-t bg-slate-50 p-5 sm:px-7"><div aria-live="polite" className="text-sm font-semibold text-slate-800">{submitted?`Your score: ${score}/5`:'Answer all five questions to check your understanding.'}</div><div className="flex flex-wrap gap-2"><button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold" type="button" onClick={()=>{setSubmitted(false);setAnswers({})}}>Reset / Retry</button><button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={Object.keys(answers).length!==5||submitted} onClick={()=>setSubmitted(true)}>Check answers</button></div></footer>
 </section>;
}
