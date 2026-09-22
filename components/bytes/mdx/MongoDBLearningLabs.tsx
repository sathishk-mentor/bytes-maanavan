'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronRight, Database, Gauge, Layers3, Search, ShieldCheck, Sparkles } from 'lucide-react';

const labs = {
  document: { eyebrow:'DOCUMENT SHAPE LAB', title:'See one conversation evolve without empty columns', tabs:['Text answer','Tool call','Grounded answer'], rows:[['user_message','assistant_message','timestamp'],['user_message','tool_calls','tool_result'],['user_message','retrieved_context','citations']], notes:['Store only the fields this exchange needs.','Keep the tool result beside the exchange that produced it.','Add evidence and citations only when retrieval was used.'] },
  vector: { eyebrow:'VECTOR SEARCH LAB', title:'Change the question and inspect semantic ranking', tabs:['UPI limit','Card blocked','Refund delay'], rows:[['UPI policy · 0.94','Daily transfer FAQ · 0.86','Account limits · 0.71'],['Card security guide · 0.92','Lost card steps · 0.88','Payment FAQ · 0.63'],['Refund timeline · 0.96','Merchant disputes · 0.81','Transaction status · 0.72']], notes:['Meaning—not exact wording—places the UPI policy first.','Metadata can restrict results to the current product and language.','The top passages become evidence; the answer still needs checks.'] },
  memory: { eyebrow:'AGENT MEMORY LAB', title:'Choose what the next turn is allowed to remember', tabs:['Recent turns','User preference','Sensitive detail'], rows:[['Keep: last 6 messages','Scope: this session','Expiry: 24 hours'],['Keep: preferred language','Scope: this user','Expiry: until changed'],['Do not retain by default','Require: explicit purpose','Protect: restricted access']], notes:['Short-term context keeps the conversation coherent.','Durable preferences need correction and deletion paths.','Memory is a policy decision—not a dump of everything seen.'] },
  aggregation: { eyebrow:'PIPELINE BUILDER', title:'Run each stage and watch data become a feature', tabs:['$match','$group','$project'], rows:[['Input: 2,400 events','Keep: completed lessons','Output: 860 events'],['Group by learner_id','Calculate count + latest date','Output: 214 learners'],['Rename useful fields','Remove internal values','Output: model-ready features']], notes:['Filter early so later stages process less data.','Grouping turns many events into one learner summary.','Projection creates a stable contract for the AI feature.'] },
  production: { eyebrow:'PRODUCTION READINESS LAB', title:'Diagnose a slow, unsafe query before release', tabs:['Query plan','Access scope','Data lifecycle'], rows:[['Observed: COLLSCAN','Fix: compound index','Target: IXSCAN'],['Filter: authenticated user_id','Role: least privilege','Network: private access'],['Session TTL: 30 days','Archive: audit records','Test: restore backup']], notes:['Match indexes to real filters and sorting.','Fast is unsafe if one user can read another user’s data.','Retention and recovery rules keep growth deliberate.'] },
} as const;

export type MongoDBLabVariant = keyof typeof labs;

export function MongoDBConceptLab({variant}:{variant:MongoDBLabVariant}) {
  const [active,setActive]=useState(0); const lab=labs[variant];
  const Icon=variant==='vector'?Search:variant==='aggregation'?Layers3:variant==='production'?ShieldCheck:variant==='memory'?Sparkles:Database;
  return <section className="mongodb-concept-lab">
    <header><span><Icon/></span><div><small>{lab.eyebrow}</small><h3>{lab.title}</h3></div><i>INTERACTIVE</i></header>
    <nav aria-label="Lab choices">{lab.tabs.map((tab,index)=><button key={tab} type="button" className={active===index?'active':''} onClick={()=>setActive(index)}>{tab}</button>)}</nav>
    <div className="mongodb-lab-stage"><div className="mongodb-lab-input"><small>SELECTED VIEW</small><strong>{lab.tabs[active]}</strong><span><Gauge/> Step {active+1} of 3</span></div><ChevronRight className="mongodb-lab-arrow"/><div className="mongodb-lab-result">{lab.rows[active].map((row,index)=><span key={row}><b>{String(index+1).padStart(2,'0')}</b>{row}</span>)}</div></div>
    <footer><CheckCircle2/><p><strong>What changed?</strong>{lab.notes[active]}</p></footer>
  </section>;
}
