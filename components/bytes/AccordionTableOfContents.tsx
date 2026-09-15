'use client';
import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, List, X } from 'lucide-react';

interface Heading { id:string; text:string; level:2|3 }
export function AccordionTableOfContents({headings,tanglishHeadings=[]}:{headings:Heading[];tanglishHeadings?:Heading[];byteSlug:string}) {
  const [open,setOpen]=useState(false);
  const [mode,setMode]=useState<'english'|'tanglish'>('english');
  const englishSections=useMemo(()=>headings.filter(h=>h.level===2),[headings]);
  const translatedSections=useMemo(()=>tanglishHeadings.filter(h=>h.level===2),[tanglishHeadings]);
  const sections=mode==='tanglish'&&translatedSections.length?translatedSections:englishSections;
  const [activeId,setActiveId]=useState(sections[0]?.id || '');
  useEffect(()=>{
    const syncMode=()=>setMode(document.documentElement.dataset.readingMode==='tanglish'?'tanglish':'english');
    syncMode();
    window.addEventListener('reading-mode-change',syncMode);
    return()=>window.removeEventListener('reading-mode-change',syncMode);
  },[]);
  useEffect(()=>{
    const prefix=mode==='tanglish'?'ta-':'';
    const targets=sections.map((section)=>document.getElementById(`${prefix}${section.id}`)).filter(Boolean) as HTMLElement[];
    if(!targets.length) return;
    const observer=new IntersectionObserver((entries)=>{
      const visible=entries.filter((entry)=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0]) setActiveId(visible[0].target.id.replace(/^ta-/,''));
    },{rootMargin:'-18% 0px -68% 0px',threshold:[0,.1,1]});
    targets.forEach((target)=>observer.observe(target));
    return()=>observer.disconnect();
  },[sections,mode]);
  const go=(id:string)=>{setActiveId(id);const prefix=mode==='tanglish'?'ta-':'';document.getElementById(`${prefix}${id}`)?.scrollIntoView({behavior:'smooth',block:'start'});setOpen(false)};
  return <><button className="byte-toc-mobile" onClick={()=>setOpen(true)}><List/>Contents</button>{open&&<button className="byte-toc-overlay" aria-label="Close contents" onClick={()=>setOpen(false)}/>}<aside className={`byte-toc ${open?'is-open':''}`}><header><strong>IN THIS BYTE</strong><button onClick={()=>setOpen(false)} aria-label="Close contents"><X/></button></header><nav>{sections.map((section,index)=><button className={activeId===section.id?'is-active':''} aria-current={activeId===section.id?'location':undefined} key={section.id} onClick={()=>go(section.id)}><span>{String(index+1).padStart(2,'0')}</span>{section.text}</button>)}</nav><footer><CheckCircle2/><span><b>Focused visual guide</b><small>Learn at your own pace</small></span></footer></aside></>;
}
