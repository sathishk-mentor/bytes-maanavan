'use client';

import { CheckCircle2, ChevronRight, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { useState } from 'react';

type Variant='messaging'|'payment'|'tracking'|'streaming'|'routing';
type Language='english'|'tanglish';
type Question={q:string;options:string[];answer:number;why:string};

const quiz:Record<Variant,Record<Language,Question[]>>={
  messaging:{
    english:[
      {q:'What should protect a message while the recipient is offline?',options:['A queue','A route graph','A video buffer'],answer:0,why:'A queue holds pending work until the receiver becomes available.'},
      {q:'What does one grey tick commonly indicate in this model?',options:['The message was understood','The service accepted the message','The recipient deleted it'],answer:1,why:'The service accepted the message, but delivery to the recipient device is not confirmed yet.'},
      {q:'What do two grey ticks represent?',options:['Delivered to the device','Read carefully','Sent to a group'],answer:0,why:'Delivery and reading are separate events.'},
      {q:'Why is an acknowledgement useful?',options:['It confirms a stage completed','It compresses the message','It hides the recipient'],answer:0,why:'An acknowledgement gives the sender visible proof that a system stage completed.'},
      {q:'Which is the strongest system-design explanation?',options:['Messages are instant magic','Trace send, route, queue, deliver and confirm','Only describe the screen'],answer:1,why:'A useful explanation connects the user action to states, components and failure handling.'},
    ],
    tanglish:[
      {q:'Recipient offline-a irukkumbodhu message-ai edhu protect pannanum?',options:['Queue','Route graph','Video buffer'],answer:0,why:'Receiver available aagura varaikkum queue pending message-ai hold pannum.'},
      {q:'Indha model-la one grey tick usually enna sollum?',options:['Message understand pannitaanga','Service message-ai accept panniduchu','Recipient delete pannitaanga'],answer:1,why:'Service accept panniduchu; recipient device delivery innum confirm aagala.'},
      {q:'Two grey ticks enna represent pannum?',options:['Device-ku delivered','Careful-a read pannitaanga','Group-ku send aayiduchu'],answer:0,why:'Delivery and reading rendu different events.'},
      {q:'Acknowledgement yaen useful?',options:['Oru stage complete aayiduchu-nu confirm pannum','Message compress pannum','Recipient-ai hide pannum'],answer:0,why:'System stage complete aana visible proof sender-ku kidaikkum.'},
      {q:'Strong system-design explanation edhu?',options:['Message instant magic','Send, route, queue, deliver, confirm trace pannuradhu','Screen mattum describe pannuradhu'],answer:1,why:'User action-ai states, components and failure handling-oda connect pannanum.'},
    ]
  },
  payment:{
    english:[
      {q:'A payment request times out. What should happen before retrying?',options:['Verify the transaction state','Retry immediately','Always mark failed'],answer:0,why:'A timeout does not prove failure; verification prevents duplicate payment.'},
      {q:'What does NPCI do in this simplified flow?',options:['Streams video','Routes payment requests','Tracks rider GPS'],answer:1,why:'NPCI acts as the routing layer between UPI participants.'},
      {q:'Does PIN acceptance alone prove final settlement?',options:['Yes','No','Only at night'],answer:1,why:'Authentication and final transaction settlement are different stages.'},
      {q:'What can a pending payment eventually become?',options:['Only success','Only failure','Completed or reversed'],answer:2,why:'Reconciliation resolves the authoritative final state.'},
      {q:'Which control makes retries safer?',options:['Idempotency','Higher screen brightness','A longer UPI ID'],answer:0,why:'Idempotency prevents the same logical payment from being created twice.'},
    ],
    tanglish:[
      {q:'Payment request timeout aana retry-ku munnadi enna pannanum?',options:['Transaction state verify pannanum','Udane retry pannanum','Always failed-nu mark pannanum'],answer:0,why:'Timeout failure proof illai; verification duplicate payment-ai avoid pannum.'},
      {q:'Indha simplified flow-la NPCI enna pannuthu?',options:['Video stream pannuthu','Payment request route pannuthu','Rider GPS track pannuthu'],answer:1,why:'UPI participants idaiyila NPCI routing layer-a work pannuthu.'},
      {q:'PIN accept aana mattum final settlement prove aaguma?',options:['Aam','Illai','Night-la mattum'],answer:1,why:'Authentication and final settlement different stages.'},
      {q:'Pending payment final-a epdi resolve aagalam?',options:['Success mattum','Failure mattum','Completed illa reversed'],answer:2,why:'Reconciliation authoritative final state-ai decide pannum.'},
      {q:'Retry-ai safer-aakkura control edhu?',options:['Idempotency','Screen brightness','Long UPI ID'],answer:0,why:'Same logical payment twice create aagaama idempotency protect pannum.'},
    ]
  },
  tracking:{
    english:[
      {q:'What is best for frequent live-location changes?',options:['A push channel','A daily file','Manual refresh only'],answer:0,why:'A persistent channel can push small changes as they happen.'},
      {q:'Why separate live location from order history?',options:['They have different update and retention needs','Maps cannot use databases','Orders have no state'],answer:0,why:'Temporary fast-changing data and durable business records need different storage behaviour.'},
      {q:'What makes the rider marker move smoothly?',options:['Interpolation','A larger database','A payment switch'],answer:0,why:'The interface animates between known coordinates.'},
      {q:'What should the app show when updates stop?',options:['Pretend the old point is live','A stale-location state','Delete the order'],answer:1,why:'A stale indicator communicates uncertainty honestly.'},
      {q:'What should reconnection restore first?',options:['Every obsolete coordinate','The latest useful state','The login screen'],answer:1,why:'The latest useful state is more valuable than replaying expired positions.'},
    ],
    tanglish:[
      {q:'Frequent live-location changes-ku best approach edhu?',options:['Push channel','Daily file','Manual refresh mattum'],answer:0,why:'Persistent channel small changes-ai nadakkumbodhe push pannum.'},
      {q:'Live location-ai order history-lendhu yaen separate pannanum?',options:['Update and retention needs different','Map database use panna mudiyadhu','Order-ku state illai'],answer:0,why:'Temporary fast-changing data and durable records-ku different storage behaviour venum.'},
      {q:'Rider marker smooth-a move aaga enna help pannum?',options:['Interpolation','Periya database','Payment switch'],answer:0,why:'Known coordinates idaiyila interface movement-ai animate pannum.'},
      {q:'Updates stop aana app enna kaamikkanum?',options:['Old point live-nu pretend pannanum','Stale-location state','Order-ai delete pannanum'],answer:1,why:'Stale indicator uncertainty-ai honest-a communicate pannum.'},
      {q:'Reconnect aana first edhai restore pannanum?',options:['Ella obsolete coordinates','Latest useful state','Login screen'],answer:1,why:'Expired positions replay pannuradhai vida latest useful state valuable.'},
    ]
  },
  streaming:{
    english:[
      {q:'Network capacity drops. What should the next chunk do?',options:['Use a lower bitrate','Restart the video','Stay highest quality'],answer:0,why:'A lighter rendition protects buffer continuity.'},
      {q:'What is a rendition?',options:['A quality version of the video','A payment receipt','A map route'],answer:0,why:'The same video is prepared at several quality and bitrate levels.'},
      {q:'Why split video into short chunks?',options:['To adapt upcoming downloads','To hide the title','To remove audio'],answer:0,why:'The player can change rendition for the next small segment.'},
      {q:'What else matters besides download speed?',options:['Buffer health','Phone colour','Subtitle font'],answer:0,why:'A healthy buffer gives the player time to handle changing bandwidth.'},
      {q:'What trade-off usually protects the viewer?',options:['Temporary quality reduction over a stall','Always maximum quality','Restart on every change'],answer:0,why:'Continuous playback is usually better than freezing at maximum resolution.'},
    ],
    tanglish:[
      {q:'Network capacity kurainja next chunk enna pannanum?',options:['Lower bitrate use pannanum','Video restart pannanum','Highest quality-la irukkanum'],answer:0,why:'Lighter rendition buffer continuity-ai protect pannum.'},
      {q:'Rendition-naa enna?',options:['Video-oda quality version','Payment receipt','Map route'],answer:0,why:'Same video different quality and bitrate levels-la prepare aagum.'},
      {q:'Video-ai short chunks-a yaen split pannuvaanga?',options:['Upcoming download-ai adapt panna','Title-ai hide panna','Audio remove panna'],answer:0,why:'Next small segment-ku player rendition change panna mudiyum.'},
      {q:'Download speed-oda vera edhu important?',options:['Buffer health','Phone colour','Subtitle font'],answer:0,why:'Healthy buffer changing bandwidth-ai handle panna time kodukkum.'},
      {q:'Endha trade-off viewer experience-ai protect pannum?',options:['Stall-vida temporary quality reduction','Always maximum quality','Every change-ku restart'],answer:0,why:'Maximum resolution-la freeze aaguradhai vida continuous playback better.'},
    ]
  },
  routing:{
    english:[
      {q:'Why combine historical and live traffic data?',options:['Either source alone can miss context','To avoid alternatives','Only to colour the map'],answer:0,why:'History shows normal patterns; live data reveals today’s surprises.'},
      {q:'What does a road segment carry in the routing graph?',options:['A changing travel cost','A video buffer','A payment PIN'],answer:0,why:'Traffic and road conditions change the predicted cost of each segment.'},
      {q:'Should Maps reroute for every tiny saving?',options:['Yes','No','Only on weekends'],answer:1,why:'A meaningful threshold avoids distracting route changes.'},
      {q:'What can change even if the route stays the same?',options:['ETA confidence','The destination name','The phone owner'],answer:0,why:'New signals can change predicted arrival time without changing the chosen path.'},
      {q:'What is the strongest reroute decision?',options:['Compare updated ETAs and disruption','Always choose shortest distance','Ignore live traffic'],answer:0,why:'A good decision balances predicted gain with user stability.'},
    ],
    tanglish:[
      {q:'Historical and live traffic data-ai yaen combine pannanum?',options:['Oru source mattum context-ai miss pannalam','Alternatives avoid panna','Map colour-ku mattum'],answer:0,why:'History normal pattern-ai sollum; live data innikku surprise-ai kaattum.'},
      {q:'Routing graph-la road segment enna carry pannum?',options:['Changing travel cost','Video buffer','Payment PIN'],answer:0,why:'Traffic and road condition ovvoru segment-oda predicted cost-ai change pannum.'},
      {q:'Ella tiny saving-kum Maps reroute pannanuma?',options:['Aam','Illai','Weekend-la mattum'],answer:1,why:'Meaningful threshold distracting route changes-ai avoid pannum.'},
      {q:'Route same-a irundhaalum edhu change aagalam?',options:['ETA confidence','Destination name','Phone owner'],answer:0,why:'New signals chosen path change pannaama arrival prediction-ai change pannalam.'},
      {q:'Strong reroute decision edhu?',options:['Updated ETA and disruption compare pannuradhu','Shortest distance mattum','Live traffic ignore pannuradhu'],answer:0,why:'Good decision predicted gain-ai user stability-oda balance pannum.'},
    ]
  }
};

export function HowAppsWorkQuiz({variant,language='english'}:{variant:Variant;language?:Language}){
  const questions=quiz[variant][language];
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<(number|null)[]>(Array(questions.length).fill(null));
  const selected=answers[index];
  const done=index===questions.length-1&&selected!==null;
  const score=answers.reduce<number>((total,value,i)=>total+(value===questions[i].answer?1:0),0);
  const reset=()=>{setAnswers(Array(questions.length).fill(null));setIndex(0);};
  const choose=(choice:number)=>setAnswers(current=>current.map((value,i)=>i===index?choice:value));
  const q=questions[index];
  return <section className="apps-knowledge-quiz">
    <header><span><Trophy/></span><div><small>5-QUESTION KNOWLEDGE CHECK</small><h3>{language==='english'?'Prove the mental model':'Mental model-ai check pannunga'}</h3></div><strong>{index+1} / {questions.length}</strong></header>
    <div className="apps-quiz-progress"><i style={{width:`${((index+(selected!==null?1:0))/questions.length)*100}%`}}/></div>
    <div className="apps-quiz-body"><h4>{q.q}</h4><div className="apps-quiz-options">{q.options.map((option,i)=><button type="button" key={option} disabled={selected!==null} className={selected===i?(i===q.answer?'selected correct':'selected wrong'):''} onClick={()=>choose(i)}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div>
      {selected!==null&&<aside className={selected===q.answer?'correct':'wrong'} aria-live="polite">{selected===q.answer?<CheckCircle2/>:<XCircle/>}<p><b>{selected===q.answer?(language==='english'?'Correct decision':'Correct decision'):(language==='english'?'Review this idea':'Indha idea-ai review pannunga')}</b>{q.why}</p></aside>}
    </div>
    <footer>{done?<><div><small>{language==='english'?'FINAL SCORE':'FINAL SCORE'}</small><strong>{score} / {questions.length}</strong></div><button type="button" onClick={reset}><RotateCcw/>{language==='english'?'Retry all questions':'Ella questions-um retry pannunga'}</button></>:<><span>{selected===null?(language==='english'?'Choose one answer to continue':'Continue panna oru answer choose pannunga'):(language==='english'?'Feedback reviewed—continue when ready':'Feedback review pannitu continue pannunga')}</span><button type="button" disabled={selected===null} onClick={()=>setIndex(value=>Math.min(value+1,questions.length-1))}>{language==='english'?'Next question':'Next question'}<ChevronRight/></button></>}</footer>
  </section>;
}
