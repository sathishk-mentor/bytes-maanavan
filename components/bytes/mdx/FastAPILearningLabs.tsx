'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronRight, Gauge, Route, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

const labs = {
  foundation:{eyebrow:'REQUEST ROUTER LAB',title:'Change the request and inspect the endpoint result',tabs:['GET /health','GET /documents/42','GET /documents/abc'],rows:[['Route matched','Function executed','200 · JSON response'],['Path value parsed as int','Document handler executed','200 · document 42'],['Path value failed int validation','Handler not executed','422 · error details']],notes:['A route combines method and path.','Typed path values are converted before business logic.','Invalid input is rejected before the route function runs.']},
  validation:{eyebrow:'VALIDATION LAB',title:'Send three payloads through the same API contract',tabs:['Valid request','Missing field','Unsafe length'],rows:[['question is a string','length is within limit','200 · accepted'],['question is missing','validation identifies field','422 · structured error'],['question exceeds limit','constraint blocks request','422 · safe rejection']],notes:['Valid data reaches business logic.','The client receives a precise field-level problem.','Boundary rules stop unsuitable work before expensive AI calls.']},
  services:{eyebrow:'DEPENDENCY LAB',title:'Follow one request across database and external-service boundaries',tabs:['Healthy path','Database timeout','Provider failure'],rows:[['Dependency injected','Repository returns record','200 · stable response'],['Timeout caught','Transaction rolled back','503 · retryable failure'],['Provider error mapped','Internal detail protected','502 · dependency failure']],notes:['Thin routes coordinate explicit services.','Timeouts need rollback and a clear client contract.','External errors should be mapped without leaking secrets.']},
  streaming:{eyebrow:'STREAMING LAB',title:'Compare buffered and streamed AI responses',tabs:['Buffered','Streamed','Client disconnect'],rows:[['Wait for full model output','Return one JSON body','Simple error contract'],['Emit bounded chunks','Show progress early','Need stream event contract'],['Detect cancellation','Stop provider work','Close resources safely']],notes:['Buffered responses are simpler when latency is acceptable.','Streaming improves perceived latency but needs a defined event format.','Cancellation must stop unnecessary model cost and cleanup resources.']},
  production:{eyebrow:'RELEASE GATE LAB',title:'Inspect evidence before allowing production traffic',tabs:['Authentication','Load test','Deployment'],rows:[['Token validated','Scope checked','Request allowed or 401/403'],['Concurrency increased','Latency and errors measured','Limit selected from evidence'],['New version gets limited traffic','Health and quality observed','Promote or rollback']],notes:['Identity and permission answer different security questions.','Capacity decisions should come from measured behaviour.','A gradual release keeps rollback practical.']},
} as const;

export type FastAPILabVariant=keyof typeof labs;

export function FastAPIConceptLab({variant}:{variant:FastAPILabVariant}){
  const [active,setActive]=useState(0);const lab=labs[variant];
  const Icon=variant==='production'?ShieldCheck:variant==='services'?Workflow:variant==='streaming'?Sparkles:Route;
  return <section className="fastapi-concept-lab">
    <header><span><Icon/></span><div><small>{lab.eyebrow}</small><h3>{lab.title}</h3></div><i>INTERACTIVE</i></header>
    <nav aria-label="FastAPI lab choices">{lab.tabs.map((tab,index)=><button key={tab} type="button" className={active===index?'active':''} onClick={()=>setActive(index)}>{tab}</button>)}</nav>
    <div className="fastapi-lab-stage"><div className="fastapi-lab-input"><small>REQUEST CASE</small><strong>{lab.tabs[active]}</strong><span><Gauge/> Case {active+1} of 3</span></div><ChevronRight className="fastapi-lab-arrow"/><div className="fastapi-lab-result">{lab.rows[active].map((row,index)=><span key={row}><b>{index+1}</b>{row}</span>)}</div></div>
    <footer><CheckCircle2/><p><strong>Why it matters</strong>{lab.notes[active]}</p></footer>
  </section>;
}
