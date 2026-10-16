'use client';
import {useState} from 'react';
const steps:Record<number,{title:string;nodes:[string,string][];result:string}>={
1:{title:'From project files to browser output',nodes:[['index.html','Root mounting point'],['main.tsx','Starts React'],['App.tsx','Returns Support Desk UI'],['Browser','Shows your heading']],result:'The first app screen appears once you run npm run dev.'},
2:{title:'From typed data to reusable ticket cards',nodes:[['Ticket[]','Typed array of records'],['App.map','Visits each record'],['TicketCard props','Receives one ticket'],['Dashboard','Shows cards and counts']],result:'Adding a third record automatically renders a third ticket card.'},
3:{title:'From form input to updated dashboard',nodes:[['Input','Subject state changes'],['Validate','Reject blank subjects'],['Dispatch','Send add/resolve action'],['Reducer','Return new ticket list']],result:'Valid subjects create tickets; Resolve changes status.'},
4:{title:'From URL to mock API output',nodes:[['BrowserRouter','Tracks current URL'],['Route','Selects list or detail'],['Adapter','Returns mock ticket data'],['Page','Displays results or error']],result:'List and details have distinct URLs; the adapter is still a mock.'},
5:{title:'From requirements to a checked release',nodes:[['Behavior','Define expected result'],['Test','Run assertions'],['Build','Compile production assets'],['Review','Check routes and accessibility']],result:'Tests and builds catch problems before publishing.'}
};
export function ReactTicketLearningFlow({byte=1}:{byte?:number}){
 const d=steps[byte]||steps[1];const [active,setActive]=useState(0);
 return <section className="my-8 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm" aria-label={d.title}>
 <header className="bg-gradient-to-r from-slate-900 to-indigo-800 p-5 text-white"><p className="text-xs font-bold tracking-widest text-cyan-200">BUILD THE PROJECT · CHECKPOINT {byte}/5</p><h3 className="mt-2 text-xl font-bold">{d.title}</h3></header>
 <div className="grid gap-2 p-4 sm:grid-cols-4">{d.nodes.map(([name,explain],i)=><button type="button" key={name} aria-pressed={active===i} onClick={()=>setActive(i)} className={`min-h-28 rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${active===i?'border-blue-500 bg-blue-50':'border-slate-200 bg-slate-50'}`}><span className="text-xs font-bold text-blue-700">STEP {i+1}</span><strong className="mt-2 block text-sm text-slate-900">{name}</strong><small className="mt-2 block text-xs leading-relaxed text-slate-600">{explain}</small></button>)}</div>
 <div className="mx-4 mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm" aria-live="polite"><strong>{d.nodes[active][0]}</strong><p className="mt-1">{d.nodes[active][1]}</p><p className="mt-2 text-xs text-blue-900">Expected outcome: {d.result}</p></div></section>;
}
