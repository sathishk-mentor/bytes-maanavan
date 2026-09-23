'use client';

import { CheckCircle2, Play, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';
import { useState } from 'react';

const labs = {
  messaging:{title:'The recipient goes offline',mission:'Your message reaches the service, but the recipient disconnects. What should happen next?',choices:['Drop the message and show an error','Queue it until the device reconnects','Keep sending copies every second'],answer:1,result:'The service stores the pending message, delivers it after reconnection and then records the acknowledgement.',lesson:'A queue separates the sender’s timing from the receiver’s availability.'},
  payment:{title:'The payment screen times out',mission:'Your bank may have processed the debit, but the app did not receive the final response. What is the safest next step?',choices:['Send the same payment again immediately','Mark it successful without checking','Verify the transaction state before retrying'],answer:2,result:'The app checks the authoritative transaction state and avoids creating a duplicate payment.',lesson:'Timeout does not mean failure. Payment systems reconcile before deciding the outcome.'},
  tracking:{title:'The rider is moving',mission:'The customer map needs frequent location changes without refreshing the whole page. Which design fits best?',choices:['Keep an open real-time channel for updates','Reload the complete order every second','Update only when the customer taps refresh'],answer:0,result:'Fresh coordinates move through the location service and are pushed to the customer’s open map.',lesson:'Real-time delivery works best when the server can push small changes as they happen.'},
  streaming:{title:'Network speed suddenly drops',mission:'The current 1080p chunk is arriving too slowly. What should the player do for the next chunk?',choices:['Pause until 1080p becomes available','Switch to a lighter rendition','Restart the episode from the beginning'],answer:1,result:'The next chunk arrives at a lower bitrate, protecting the playback buffer while the network recovers.',lesson:'Adaptive streaming changes quality chunk by chunk to preserve continuity.'},
  routing:{title:'A traffic jam appears ahead',mission:'The current route is now slower than an alternative. What should navigation do?',choices:['Keep the original route because it was once fastest','Compare updated ETAs and reroute when the gain is meaningful','Remove traffic data and calculate only by distance'],answer:1,result:'The routing service recalculates alternatives using live conditions and proposes the better path.',lesson:'Routing is a repeated prediction problem, not a one-time shortest-path answer.'},
} as const;

export function HowAppsWorkLab({variant}:{variant:keyof typeof labs}){
  const lab=labs[variant];
  const [selected,setSelected]=useState<number|null>(null);
  const correct=selected===lab.answer;
  return <section className={`apps-decision-lab apps-decision-${variant}`}>
    <header><span><Play/></span><div><small>INTERACTIVE SYSTEM DECISION</small><h3>{lab.title}</h3></div><i>{selected===null?'CHOOSE':correct?'COMPLETE':'RETRY'}</i></header>
    <div className="apps-decision-body"><p>{lab.mission}</p><div className="apps-decision-options">{lab.choices.map((choice,index)=><button type="button" key={choice} disabled={correct} className={selected===index?(correct?'selected correct':'selected wrong'):''} onClick={()=>setSelected(index)}><b>{String.fromCharCode(65+index)}</b><span>{choice}</span></button>)}</div>
    {selected!==null&&<aside className={correct?'correct':'wrong'} aria-live="polite">{correct?<CheckCircle2/>:<XCircle/>}<div><b>{correct?'System decision accepted':'That choice creates a reliability problem'}</b><p>{correct?lab.result:lab.lesson}</p></div>{!correct&&<button type="button" onClick={()=>setSelected(null)}><RotateCcw/>Try again</button>}</aside>}
    </div>
    <footer><ShieldCheck/><span><b>Why it matters:</b> {lab.lesson}</span><strong>{correct?'1 / 1':'0 / 1'}</strong></footer>
  </section>;
}
