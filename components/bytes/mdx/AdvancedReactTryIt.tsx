'use client';
import {useReducer,useRef,useState} from 'react';
type Issue={id:number;title:string;priority:'Low'|'High';done:boolean};
type Action={type:'add';title:string;priority:Issue['priority']}|{type:'toggle';id:number};
const sample:Issue[]=[{id:1,title:'Fix sign-in issue',priority:'High',done:false},{id:2,title:'Update help page',priority:'Low',done:true}];
function reducer(state:Issue[],action:Action):Issue[]{
 if(action.type==='add')return [...state,{id:Math.max(0,...state.map(x=>x.id))+1,title:action.title,priority:action.priority,done:false}];
 return state.map(x=>x.id===action.id?{...x,done:!x.done}:x);
}
const samples:Record<number,{file:string;description:string;source:string;experiment:string;explain:string}>={
1:{file:'src/App.tsx',description:'A working issue form using controlled inputs and useReducer.',experiment:'Submit an empty title, then enter a title and select a priority.',explain:'The browser first validates the form. A valid submission dispatches an action; the reducer returns a new array and React renders the added issue.',source:`import { useReducer, useState } from 'react';
type Issue = { id: number; title: string; priority: 'Low' | 'High' };
type Action = { type: 'add'; issue: Issue };
function reducer(state: Issue[], action: Action): Issue[] {
  switch (action.type) {
    case 'add': return [...state, action.issue];
  }
}
export default function App() {
  const [issues, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  function addIssue() {
    if (!title.trim()) { setError('Title is required'); return; }
    dispatch({ type: 'add', issue: {
      id: Date.now(), title: title.trim(), priority: 'Low'
    } });
    setTitle(''); setError('');
  }
  return <main>
    <h1>Issue Desk</h1>
    <label htmlFor="issue">Issue title</label>
    <input id="issue" value={title} onChange={e => setTitle(e.target.value)} />
    {error && <p role="alert">{error}</p>}
    <button onClick={addIssue}>Add issue</button>
    <ul>{issues.map(i => <li key={i.id}>{i.title}</li>)}</ul>
  </main>;
}`},
2:{file:'src/App.tsx',description:'Load issue records with explicit loading, error and retry states.',experiment:'Switch to an error response, then click Retry to recover.',explain:'Fetching is asynchronous: a pending request should show loading; failure should show an actionable error. A new request can recover when the source succeeds.',source:`import { useCallback, useEffect, useState } from 'react';
type Issue = { id: number; title: string };
async function getIssues(): Promise<Issue[]> {
  const response = await fetch('/api/issues');
  if (!response.ok) throw new Error('Unable to load issues');
  return response.json() as Promise<Issue[]>;
}
export default function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setIssues(await getIssues()); }
    catch { setError('Unable to load. Please retry.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  return <main>
    <h1>Issue Desk</h1>
    {loading && <p role="status">Loading…</p>}
    {error && <p role="alert">{error}</p>}
    {error && <button onClick={() => void load()}>Retry</button>}
    <ul>{issues.map(i => <li key={i.id}>{i.title}</li>)}</ul>
  </main>;
}`},
3:{file:'src/App.tsx',description:'Use client-side routes to switch between list and detail screens.',experiment:'Select List or Details and inspect which page is shown.',explain:'Routes select components according to the URL. Context is for genuinely shared values; it is not needed for every local input.',source:`import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router';
function List() {
  return <div><h2>All issues</h2><Link to="/issues/42">Issue 42</Link></div>;
}
function Details() {
  const { id } = useParams();
  return <h2>Issue details: {id}</h2>;
}
export default function App() {
  return <BrowserRouter>
    <nav><Link to="/issues">Issues</Link></nav>
    <Routes>
      <Route path="/issues" element={<List />} />
      <Route path="/issues/:id" element={<Details />} />
    </Routes>
  </BrowserRouter>;
}`},
4:{file:'src/IssueBadge.tsx',description:'Use a union type for known values; verify outside data before trusting it.',experiment:'Select a supported priority, then try an unexpected API value.',explain:'TypeScript checks values while developing, but external JSON must also be validated when the application runs.',source:`type Priority = 'low' | 'medium' | 'high';
type Props = { priority: Priority };
export default function IssueBadge({ priority }: Props) {
  return <strong>{priority.toUpperCase()}</strong>;
}
export function isPriority(value: unknown): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high';
}
// Example after JSON parsing:
// if (isPriority(data.priority)) render <IssueBadge priority={data.priority} />`},
5:{file:'src/IssueBadge.test.tsx',description:'Test what users see, then validate real keyboard behavior.',experiment:'Switch between passing and failing expected output.',explain:'React Testing Library checks visible output. Accessible names and roles make tests easier to understand and closer to real user behavior.',source:`import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import IssueBadge from './IssueBadge';
test('shows priority', () => {
  render(<IssueBadge priority="high" />);
  expect(screen.getByText('HIGH')).toBeTruthy();
});
// Also test forms with screen.getByRole and screen.getByLabelText.`}
};
function Source({source}:{source:string}){
 const lines=source.split('\n');
 const re=/(\b(?:import|from|export|default|function|return|const|let|type|interface|async|await|if|else|try|catch|finally|new)\b|\b(?:useState|useReducer|useEffect|useCallback|setError|setIssues|dispatch|fetch|render|test|expect)\b|<\/?[A-Za-z][\w.]*(?:\s|>|\/)?|\b(?:true|false|null)\b|'[^']*'|"[^"]*")/g;
 return <pre className="max-h-[440px] overflow-auto p-4 text-[12px] leading-6 text-slate-100 sm:text-[13px]" aria-label="Syntax-highlighted reference source"><code>{lines.map((line,i)=><span key={i} className="block whitespace-pre"><span className="mr-4 inline-block w-5 select-none text-right text-slate-500" aria-hidden="true">{i+1}</span>{line.split(re).map((part,j)=><span key={j} className={/^(import|from|export|default|function|return|const|let|type|interface|async|await|if|else|try|catch|finally|new)$/.test(part)?'text-fuchsia-300':/^<\/?[A-Za-z]/.test(part)?'text-cyan-300':/^['"]/.test(part)?'text-amber-200':/^(useState|useReducer|useEffect|useCallback|setError|setIssues|dispatch|fetch|render|test|expect)$/.test(part)?'text-sky-300':'text-slate-100'}>{part}</span>)}</span>)}</code></pre>
}
export function AdvancedReactTryIt({byte=1}:{byte?:number}){
 const d=samples[byte]||samples[1];
 const [issues,dispatch]=useReducer(reducer,sample);
 const [title,setTitle]=useState(''),[priority,setPriority]=useState<'Low'|'High'>('Low'),[error,setError]=useState('');
 const [loadError,setLoadError]=useState(false),[attempt,setAttempt]=useState(0);
 const [route,setRoute]=useState<'list'|'detail'>('list'),[apiValue,setApiValue]=useState('high'),[expected,setExpected]=useState('HIGH');
 const input=useRef<HTMLInputElement>(null);
 const add=()=>{if(!title.trim()){setError('Please enter an issue title.');input.current?.focus();return;}dispatch({type:'add',title:title.trim(),priority});setTitle('');setError('')};
 const code=d.source;
 return <section className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Advanced React code and output lab">
 <header className="border-b bg-slate-900 p-5 text-white"><p className="text-xs font-bold tracking-widest text-cyan-200">TRY IT YOURSELF · ADVANCED REACT {byte}/5</p><h3 className="mt-2 text-xl font-bold">Code → experiment → visible output</h3><p className="mt-2 text-sm text-slate-200">{d.description}</p></header>
 <div className="grid gap-4 p-4 lg:grid-cols-2">
 <div className="min-w-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-950"><div className="flex items-center justify-between border-b border-slate-700 px-3 py-2"><span className="text-xs font-semibold text-slate-200">{d.file}</span><button type="button" className="rounded border border-slate-500 px-2 py-1 text-xs text-white" onClick={()=>{void navigator.clipboard?.writeText(code)}}>Copy code</button></div><Source source={code}/></div>
 <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Interactive output simulation</p><p className="mt-2 text-sm text-slate-600">{d.experiment}</p>
 {byte===1&&<div className="mt-4 space-y-3"><label className="block text-sm font-semibold" htmlFor="adv-title">Issue title</label><input id="adv-title" ref={input} value={title} onChange={e=>setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 p-2" placeholder="Describe an issue"/><label className="block text-sm font-semibold" htmlFor="adv-priority">Priority</label><select id="adv-priority" className="w-full rounded-lg border p-2" value={priority} onChange={e=>setPriority(e.target.value as 'Low'|'High')}><option>Low</option><option>High</option></select>{error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}<button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white" onClick={add}>Add issue</button><ul className="space-y-2">{issues.map(i=><li className="rounded-lg border bg-white p-2 text-sm" key={i.id}>{i.title} · {i.priority}</li>)}</ul></div>}
 {byte===2&&<div className="mt-4 space-y-3"><label className="flex gap-2 text-sm"><input type="checkbox" checked={loadError} onChange={e=>setLoadError(e.target.checked)}/>Simulate server failure</label><button type="button" onClick={()=>setAttempt(x=>x+1)} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Load / Retry</button><div aria-live="polite" className="rounded-lg border bg-white p-3 text-sm">{attempt===0?'Ready to request issues':loadError?'Error: unable to load. Change the setting and Retry.':'Loaded: Fix sign-in issue, Update help page'}</div><p className="text-xs text-slate-600">Demo controls simulate network states. Running the source code requires an /api/issues endpoint.</p></div>}
 {byte===3&&<div className="mt-4 space-y-3"><nav aria-label="Example pages" className="flex gap-2"><button className="rounded-lg bg-blue-700 px-3 py-2 text-sm text-white" onClick={()=>setRoute('list')}>/issues</button><button className="rounded-lg border bg-white px-3 py-2 text-sm" onClick={()=>setRoute('detail')}>/issues/42</button></nav><div className="rounded-lg border bg-white p-4"><strong>{route==='list'?'All issues':'Issue details: 42'}</strong><p className="mt-1 text-sm">{route==='list'?'Choose an issue to open details.':'Route parameter id = 42'}</p></div></div>}
 {byte===4&&<div className="mt-4 space-y-3"><label className="block text-sm font-semibold" htmlFor="adv-api-priority">API priority value</label><select id="adv-api-priority" value={apiValue} onChange={e=>setApiValue(e.target.value)} className="w-full rounded-lg border p-2"><option value="high">high</option><option value="medium">medium</option><option value="urgent">urgent (invalid)</option></select><div className="rounded-lg border bg-white p-3 text-sm" aria-live="polite">{['low','medium','high'].includes(apiValue)?'Valid priority: '+apiValue.toUpperCase():'Invalid API value: reject or handle safely'}</div></div>}
 {byte===5&&<div className="mt-4 space-y-3"><label className="block text-sm font-semibold" htmlFor="adv-expected">Expected visible text</label><select id="adv-expected" value={expected} onChange={e=>setExpected(e.target.value)} className="w-full rounded-lg border p-2"><option>HIGH</option><option>LOW</option></select><div role="status" className={`rounded-lg border p-3 text-sm ${expected==='HIGH'?'bg-emerald-50 text-emerald-800':'bg-amber-50 text-amber-900'}`}>{expected==='HIGH'?'PASS: expected HIGH matches output.':'FAIL: expected LOW does not match output HIGH.'}</div></div>}
 </div></div><p className="px-5 pb-5 text-sm leading-relaxed text-slate-700"><strong>Why this happens:</strong> {d.explain} The right side is a learning simulator, not a compiled execution environment. Copy the code into a configured React project to execute it.</p></section>;
}
