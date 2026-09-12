'use client';
import { useState } from 'react';
import { CheckCircle2, List, X } from 'lucide-react';

interface Heading { id:string; text:string; level:2|3 }
export function AccordionTableOfContents({headings}:{headings:Heading[];byteSlug:string}) {
  const [open,setOpen]=useState(false);
  const sections=headings.filter(h=>h.level===2);
  const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});setOpen(false)};
  return <><button className="byte-toc-mobile" onClick={()=>setOpen(true)}><List/>Contents</button>{open&&<button className="byte-toc-overlay" aria-label="Close contents" onClick={()=>setOpen(false)}/>}<aside className={`byte-toc ${open?'is-open':''}`}><header><strong>IN THIS BYTE</strong><button onClick={()=>setOpen(false)} aria-label="Close contents"><X/></button></header><nav>{sections.map((section,index)=><button key={section.id} onClick={()=>go(section.id)}><span>{String(index+1).padStart(2,'0')}</span>{section.text}</button>)}</nav><footer><CheckCircle2/><span><b>12-minute guide</b><small>Learn at your own pace</small></span></footer></aside></>;
}
