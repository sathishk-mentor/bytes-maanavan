'use client';

import { useState } from 'react';
import { CheckCircle2, HelpCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';

type Props={children?:React.ReactNode;question?:string;options?:string[];answer?:number;explanation?:string};

export function KnowledgeCheck({children,question,options=[],answer=0,explanation=''}:Props) {
  const [selected,setSelected]=useState<number|null>(null);
  const correct=selected===answer;
  return <section className="knowledge-check-panel">
    <header><span><HelpCircle/></span><div><small>LESSON CHECKPOINT</small><strong>Confirm the concept before moving forward</strong><p>Choose an answer, inspect the explanation and explain the idea in your own words.</p></div><i><Trophy/> RETENTION</i></header>
    <div className="knowledge-check-content">
      {question&&<div className="knowledge-check-interactive"><h4>{question}</h4><div>{options.map((option,index)=><button type="button" key={option} className={selected===index?(index===answer?'selected correct':'selected wrong'):''} disabled={selected!==null} onClick={()=>setSelected(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>{selected!==null&&<aside className={correct?'correct':'wrong'} aria-live="polite">{correct?<CheckCircle2/>:<XCircle/>}<p><b>{correct?'Correct':'Try once more'}</b>{correct?explanation:`${explanation} Reset and compare the choices again.`}</p><button type="button" onClick={()=>setSelected(null)}><RotateCcw/>Reset</button></aside>}</div>}
      {children}
    </div>
    <footer><CheckCircle2/><span><b>Learning rule:</b> explain the answer in your own words before checking the next Byte.</span></footer>
  </section>;
}
