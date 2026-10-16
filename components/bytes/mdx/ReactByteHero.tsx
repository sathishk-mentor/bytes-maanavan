'use client';
import { useState } from 'react';

const themes=[
 {k:'01 / COMPONENT TREE',title:'One screen. Small reusable pieces.',detail:'An App component composes a header, example list and example cards.'},
 {k:'02 / PROPS FLOW',title:'One card. Different example data.',detail:'Change the parent input and see the reusable child render different information.'},
 {k:'03 / STATE UPDATE',title:'A click changes the React interface.',detail:'Watch the event → state setter → render → visible status sequence.'},
 {k:'04 / EFFECT LIFECYCLE',title:'Synchronize with the outside world.',detail:'React renders first; an Effect synchronizes with browser storage after committing.'},
 {k:'05 / HOOK SELECTION',title:'Different problems need different Hooks.',detail:'State changes the UI, refs address DOM nodes and memoization caches work when useful.'}
];
export function ReactByteHero({byte=1}:{byte?:number}){
 const [selected,setSelected]=useState(0);
 const data=themes[byte-1]||themes[0];
 const steps=byte===1?['App','GreetingList','Greeting']:byte===2?['Name data','Props','Greeting']:byte===3?['Click','setStatus','Re-render']:byte===4?['React commit','Effect','localStorage']:['useState','useRef','useMemo'];
 return <section className="react-byte-hero" aria-label={`React Byte ${byte} animated visual explainer`}>
 <div className="react-byte-hero-head"><div><p>{data.k}</p><h3>{data.title}</h3><span>{data.detail}</span></div><div className="react-byte-hero-orb" aria-hidden="true">⚛</div></div>
 <div className={`react-byte-hero-stage react-byte-hero-stage-${byte}`}>
 <div className="react-byte-hero-flow">{steps.map((step,i)=><div className="react-byte-hero-flow-item" key={step}><button type="button" onClick={()=>setSelected(i)} aria-pressed={selected===i} className={selected===i?'active':''}>{step}</button>{i<steps.length-1&&<span className="react-byte-hero-arrow" aria-hidden="true">→</span>}</div>)}</div>
 {byte===1&&<div className="react-byte-hero-preview"><div>Hello React</div><span>Counter · Hello Anu</span><span>Second greeting · Hello Ravi</span></div>}
 {byte===2&&<div className="react-byte-hero-preview"><div>Props: subject + priority</div><span>Hello Anu · High</span><span>Hello Ravi · Medium</span></div>}
 {byte===3&&<div className="react-byte-hero-preview"><div>Counter</div><span className="react-byte-hero-highlight">{selected===0?'Open':selected===1?'Update scheduled':'Resolved'}</span></div>}
 {byte===4&&<div className="react-byte-hero-preview"><div>Example storage synchronization</div><span>Render interface first</span><span>{selected===2?'Save counter to browser':'Wait for state update'}</span></div>}
 {byte===5&&<div className="react-byte-hero-preview"><div>Hook decision guide</div><span>{selected===0?'Value must update the UI':selected===1?'Need input focus without render':'Cache expensive calculation if measured'}</span></div>}
 <p className="react-byte-hero-caption" aria-live="polite">Step {selected+1}: {steps[selected]} — explore the stages above</p>
 </div>
 </section>;
}