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


const tanglishLabs = {
  messaging:{title:'Recipient offline aana',mission:'Message service-ku pochu; recipient phone offline. App adutha enna pannanum?',choices:['Message drop panni error kaattanum','Phone reconnect aagura varaikkum hold pannanum','Every second copy anuppanum'],result:'Pending message later deliver aagum; device receive pannina status update aagum.',lesson:'Sender and recipient ore nerathula online irukkanum-nu avasiyam illa.'},
  payment:{title:'Payment response varala',mission:'Bank debit process pannirukkalam; app-ku final response varala. Safe next step enna?',choices:['Udane same payment marubadiyum send pannanum','Check pannaama success nu kaattanum','Transaction status check panni appuram retry decide pannanum'],result:'App official transaction state verify panni duplicate payment risk-ai avoid pannudhu.',lesson:'Timeout-na failure-nu artham illa. Final result-ai verify pannanum.'},
  tracking:{title:'Rider move aaguraar',mission:'Full page refresh pannaama customer map-la location update epdi kaattanum?',choices:['Relevant updates-ai live channel-la send pannalam','Every second full order-ai reload pannanum','Customer refresh tap pannina mattum update pannanum'],result:'Fresh coordinate customer map-ku varudhu; timestamp-um kaattalam.',lesson:'Relevant small updates-ai send pannina map responsive-a irukkum.'},
  streaming:{title:'Network speed koraiyudhu',mission:'1080p chunk time-ku varala. Next chunk-ku player enna pannanum?',choices:['1080p varum varaikkum pause pannanum','Lighter quality chunk choose pannanum','Episode beginning-lendhu restart pannanum'],result:'Lighter next chunk buffer-ku timely-a varalam; playback continue aagum.',lesson:'Chunk-by-chunk quality change pannina interruption kuraiyum.'},
  routing:{title:'Ahead-la traffic jam',mission:'Current route-vida alternative route faster-a irukkalam. Navigation enna pannanum?',choices:['Old route eppavum keep pannanum','Updated ETA compare panni useful-a irundha reroute pannanum','Traffic ignore panni distance mattum paakkanum'],result:'Routes-oda fresh ETA compare panni better path suggest pannudhu.',lesson:'Reroute oru repeated prediction and decision.'},
} as const;

export function HowAppsWorkLab({variant,language='english'}:{variant:keyof typeof labs;language?:'english'|'tanglish'}){
  const lab=labs[variant];
  const copy=language==='tanglish'?tanglishLabs[variant]:lab;
  const ta=language==='tanglish';
  const [selected,setSelected]=useState<number|null>(null);
  const correct=selected===lab.answer;
  return <section className={`apps-decision-lab apps-decision-${variant}`}>
    <header><span><Play/></span><div><small>INTERACTIVE SYSTEM DECISION</small><h3>{copy.title}</h3></div><i>{selected===null?'CHOOSE':correct?'COMPLETE':'RETRY'}</i></header>
    <div className="apps-decision-body"><p>{copy.mission}</p><div className="apps-decision-options">{copy.choices.map((choice,index)=><button type="button" key={choice} disabled={correct} className={selected===index?(correct?'selected correct':'selected wrong'):''} onClick={()=>setSelected(index)}><b>{String.fromCharCode(65+index)}</b><span>{choice}</span></button>)}</div>
    {selected!==null&&<aside className={correct?'correct':'wrong'} aria-live="polite">{correct?<CheckCircle2/>:<XCircle/>}<div><b>{correct?(ta?'Correct decision':'System decision accepted'):(ta?'Indha choice-la problem irukku':'That choice creates a reliability problem')}</b><p>{correct?copy.result:copy.lesson}</p></div>{!correct&&<button type="button" onClick={()=>setSelected(null)}><RotateCcw/>{ta?'Marubadi try pannunga':'Try again'}</button>}</aside>}
    </div>
    <footer><ShieldCheck/><span><b>{ta?'Yen important:':'Why it matters:'}</b> {copy.lesson}</span><strong>{correct?'1 / 1':'0 / 1'}</strong></footer>
  </section>;
}

type JourneyVariant = keyof typeof labs;
type JourneyStep = { label: string; detail: string; status: string };
const journeys: Record<JourneyVariant, { en: {title:string;steps:JourneyStep[]}; ta:{title:string;steps:JourneyStep[]} }> = {
  messaging:{
    en:{title:'Follow the message',steps:[{label:'Send',detail:'The phone submits an encrypted message.',status:'SENT'},{label:'Route',detail:'The service tries the recipient device.',status:'ROUTING'},{label:'Offline?',detail:'If the device is offline, delivery waits.',status:'WAITING'},{label:'Confirm',detail:'Device acknowledgement updates the status.',status:'DELIVERED'}]},
    ta:{title:'Message-oda journey-ai paappom',steps:[{label:'Send',detail:'Phone message-ai service-ku anuppudhu.',status:'SENT'},{label:'Route',detail:'Service recipient device-ku delivery try pannudhu.',status:'ROUTING'},{label:'Offline?',detail:'Phone offline-na delivery wait pannudhu.',status:'WAITING'},{label:'Confirm',detail:'Device receive pannina status update aagudhu.',status:'DELIVERED'}]},
  },
  payment:{
    en:{title:'Follow the payment',steps:[{label:'Request',detail:'The app sends the authorised payment request.',status:'REQUEST'},{label:'Route',detail:'UPI connects the participating banks.',status:'ROUTING'},{label:'Banks',detail:'The banks process debit and credit.',status:'PROCESSING'},{label:'Verify',detail:'The app checks the final transaction result.',status:'CONFIRMED'}]},
    ta:{title:'Payment-oda journey-ai paappom',steps:[{label:'Request',detail:'App authorised request-ai anuppudhu.',status:'REQUEST'},{label:'Route',detail:'UPI network banks-ai connect pannudhu.',status:'ROUTING'},{label:'Banks',detail:'Banks debit and credit process pannudhu.',status:'PROCESSING'},{label:'Verify',detail:'App final transaction status check pannudhu.',status:'CONFIRMED'}]},
  },
  tracking:{
    en:{title:'Follow a location update',steps:[{label:'Locate',detail:'Rider phone gets a position and timestamp.',status:'GPS'},{label:'Send',detail:'The update travels to the tracking service.',status:'UPDATING'},{label:'Deliver',detail:'The customer receives a relevant update.',status:'RECEIVED'},{label:'Display',detail:'The map shows the last known position.',status:'ON MAP'}]},
    ta:{title:'Location update-ai follow pannunga',steps:[{label:'Locate',detail:'Rider phone position and time edukkudhu.',status:'GPS'},{label:'Send',detail:'Update tracking service-ku pogudhu.',status:'UPDATING'},{label:'Deliver',detail:'Customer app-ku relevant update varudhu.',status:'RECEIVED'},{label:'Display',detail:'Map last known position-ai kaattudhu.',status:'ON MAP'}]},
  },
  streaming:{
    en:{title:'Follow the next video chunk',steps:[{label:'Measure',detail:'Player estimates network and buffer health.',status:'CHECKING'},{label:'Choose',detail:'It selects a quality for the next chunk.',status:'CHOOSING'},{label:'Fetch',detail:'The video chunk downloads.',status:'BUFFERING'},{label:'Play',detail:'Playback continues from the buffer.',status:'PLAYING'}]},
    ta:{title:'Next video chunk-ai paappom',steps:[{label:'Measure',detail:'Player speed and buffer-ai estimate pannudhu.',status:'CHECKING'},{label:'Choose',detail:'Next chunk-ku quality choose pannudhu.',status:'CHOOSING'},{label:'Fetch',detail:'Video piece download aagudhu.',status:'BUFFERING'},{label:'Play',detail:'Buffer-la irundhu playback continue aagudhu.',status:'PLAYING'}]},
  },
  routing:{
    en:{title:'Follow a route decision',steps:[{label:'Map',detail:'The road network offers candidate paths.',status:'PATHS'},{label:'Estimate',detail:'Traffic changes the predicted travel times.',status:'ETA'},{label:'Compare',detail:'The system compares alternative routes.',status:'COMPARING'},{label:'Guide',detail:'Navigation presents the useful route.',status:'ROUTE READY'}]},
    ta:{title:'Route decision-ai paappom',steps:[{label:'Map',detail:'Road network candidate paths kaattudhu.',status:'PATHS'},{label:'Estimate',detail:'Traffic vechu travel time estimate aagudhu.',status:'ETA'},{label:'Compare',detail:'Alternative routes compare pannudhu.',status:'COMPARING'},{label:'Guide',detail:'Useful route navigation-la kaattudhu.',status:'ROUTE READY'}]},
  },
};

export function HowAppsWorkJourney({variant,language='english'}:{variant:JourneyVariant;language?:'english'|'tanglish'}){
  const [step,setStep]=useState(0);
  const journey=journeys[variant][language==='tanglish'?'ta':'en'];
  const current=journey.steps[step];
  return <section className={`apps-journey apps-journey-${variant}`} aria-label={journey.title}>
    <header><span><Play aria-hidden="true"/></span><div><small>{language==='tanglish'?'INTERACTIVE JOURNEY':'INTERACTIVE JOURNEY'}</small><h3>{journey.title}</h3></div><i>{current.status}</i></header>
    <div className="apps-journey-track" aria-label={language==='tanglish'?'Step choose pannunga':'Choose a step'}>
      {journey.steps.map((item,index)=><button key={item.label} type="button" aria-current={step===index?'step':undefined} className={index===step?'active':index<step?'visited':''} onClick={()=>setStep(index)}><b>{String(index+1).padStart(2,'0')}</b><span>{item.label}</span></button>)}
    </div>
    <div className="apps-journey-detail" key={variant+step} aria-live="polite"><strong>{current.label}</strong><p>{current.detail}</p><small>{step+1} / {journey.steps.length}</small></div>
    <footer><button type="button" onClick={()=>setStep((step+1)%journey.steps.length)}>{step===journey.steps.length-1?(language==='tanglish'?'Thirumbi start pannunga':'Start again'):(language==='tanglish'?'Adutha step':'Next step')} <span aria-hidden="true">→</span></button></footer>
  </section>;
}
