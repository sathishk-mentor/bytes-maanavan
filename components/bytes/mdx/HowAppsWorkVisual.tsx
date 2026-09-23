import { Banknote, CheckCircle2, CreditCard, MapPin, MessageCircle, Navigation, Play, Radio, Route, Server, Smartphone, Store, Tv, Wifi } from 'lucide-react';

const visuals = {
  messaging: {
    kicker: 'MESSAGE JOURNEY', title: 'One tap. Four visible states.', status: 'DELIVERED',
    steps: [[Smartphone,'Your phone','Encrypt + send'],[Server,'Message service','Route or queue'],[Smartphone,'Recipient','Receive locally'],[CheckCircle2,'Acknowledgement','Update the ticks']],
    note: 'If the recipient is offline, the message waits safely instead of disappearing.',
  },
  payment: {
    kicker: 'PAYMENT RAIL', title: 'A ₹500 payment is a coordinated state change.', status: 'SUCCESS',
    steps: [[CreditCard,'UPI app','Authorise request'],[Banknote,'NPCI switch','Route securely'],[Server,'Your bank','Debit account'],[Store,'Receiver bank','Credit account']],
    note: 'A timeout calls for status verification before another payment attempt.',
  },
  tracking: {
    kicker: 'LIVE LOCATION', title: 'The map moves as new updates arrive.', status: 'LIVE',
    steps: [[MapPin,'Rider GPS','Send coordinates'],[Server,'Location service','Process updates'],[Radio,'Live channel','Push changes'],[Smartphone,'Your map','Animate position']],
    note: 'The map can smooth movement between periodic location reports.',
  },
  streaming: {
    kicker: 'ADAPTIVE STREAM', title: 'Smooth playback wins over fixed quality.', status: 'PLAYING',
    steps: [[Tv,'Video library','Multiple qualities'],[Server,'Nearby CDN','Serve short chunks'],[Wifi,'Network signal','Measure capacity'],[Play,'Video player','Choose next chunk']],
    note: 'Quality can change every few seconds while the story continues without stopping.',
  },
  routing: {
    kicker: 'ROUTE INTELLIGENCE', title: 'The best route changes as the city changes.', status: 'REROUTING',
    steps: [[MapPin,'Destination','Set the goal'],[Route,'Road graph','Compare paths'],[Radio,'Traffic signals','Predict delays'],[Navigation,'Navigation','Update the route']],
    note: 'Historical patterns explain what usually happens; live signals explain what is happening now.',
  },
} as const;


const tanglishVisuals = {
  messaging:{title:'Oru tap. Naalu events.',note:'Recipient offline-na delivery confirmation later varum.',steps:['Unga phone','Message service','Recipient phone','Delivery status'],details:['Encrypt + send','Route or wait','Receive','Ticks update']},
  payment:{title:'₹500 payment-la pala participants.',note:'Timeout aana final status check pannunga; udane repeat pay pannaadheenga.',steps:['UPI app','NPCI network','Unga bank','Recipient bank'],details:['Request','Route','Debit','Credit']},
  tracking:{title:'Fresh update vandha map maarum.',note:'Smooth dot exact live GPS proof illa; timestamp check pannunga.',steps:['Rider GPS','Location service','Update channel','Unga map'],details:['Coordinate','Process','Deliver','Display']},
  streaming:{title:'Next chunk-ku quality choose pannum.',note:'Picture konjam soft aanaalum playback continue aagalam.',steps:['Video library','CDN','Network','Player'],details:['Quality versions','Chunks','Speed','Next chunk']},
  routing:{title:'Traffic maarina route-um maaralam.',note:'Past traffic and live signals ETA estimate-ku help pannum.',steps:['Destination','Road graph','Traffic','Navigation'],details:['Goal','Paths','Delays','Route']},
} as const;

export function HowAppsWorkVisual({variant,language='english'}:{variant:keyof typeof visuals;language?:'english'|'tanglish'}) {
  const visual=visuals[variant];
  const ta=language==='tanglish'?tanglishVisuals[variant]:null;
  return <figure className={`apps-work-visual apps-work-${variant}`}>
    <header><span><MessageCircle/></span><div><small>{visual.kicker}</small><h3>{ta?.title||visual.title}</h3></div><i>{visual.status}</i></header>
    <div className="apps-work-flow">{visual.steps.map(([Icon,label,detail],index)=><div className="apps-work-step-wrap" key={label}><section><span><Icon/></span><div><b>{ta?.steps[index]||label}</b><small>{ta?.details[index]||detail}</small></div></section>{index<visual.steps.length-1&&<em>→</em>}</div>)}</div>
    <figcaption><CheckCircle2/>{ta?.note||visual.note}</figcaption>
  </figure>;
}
