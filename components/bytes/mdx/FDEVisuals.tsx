import { ArrowRight, Blocks, CheckCircle2, ClipboardList, Code2, Gauge, GitMerge, Network, PackageCheck, Radar, Repeat2, Rocket, Search, Settings2, Users } from 'lucide-react';

const visuals = {
  role: { label:'THE FDE OUTCOME LOOP', caption:'Customer reality becomes production evidence—and production evidence improves the product.', steps:[[Users,'Observe','Real workflow'],[ClipboardList,'Frame','Measurable outcome'],[Code2,'Build','Thin slice'],[Rocket,'Deploy','Real users'],[Repeat2,'Productise','Reusable pattern']] },
  discovery: { label:'DISCOVERY EVIDENCE MAP', caption:'Interviews reveal beliefs, observation reveals behaviour and logs reveal system reality.', steps:[[Users,'People','Goals and pain'],[Search,'Workflow','Steps and exceptions'],[Network,'Systems','Data and ownership'],[Gauge,'Measure','Outcome and risk']] },
  slice: { label:'THIN PRODUCTION SLICE', caption:'Thin scope crosses the full value path with production-quality boundaries.', steps:[[Radar,'Trigger','Real request'],[Network,'Context','Governed data'],[Settings2,'Decision','Rules + model'],[CheckCircle2,'Approval','Human boundary'],[Gauge,'Evidence','Outcome signal']] },
  feedback: { label:'PRODUCTION LEARNING LOOP', caption:'Classify the failure before changing the model, prompt or system.', steps:[[Gauge,'Observe','Health + quality'],[Search,'Diagnose','Failure class'],[Code2,'Correct','One variable'],[PackageCheck,'Evaluate','Regression set'],[Rocket,'Release','Limited cohort']] },
  product: { label:'FIELD-TO-PRODUCT LOOP', caption:'Keep customer configuration local while moving repeated capability into the product.', steps:[[Users,'Deployment','Local evidence'],[GitMerge,'Pattern','Repeated need'],[Blocks,'Platform','Reusable module'],[PackageCheck,'Handoff','Durable owner']] },
} as const;

export function FDEJourneyVisual({variant}:{variant:keyof typeof visuals}) {
  const visual=visuals[variant];
  return <figure className={`fde-journey fde-${variant}`}><header><small>VISUAL EXPLAINER</small><strong>{visual.label}</strong></header><div>{visual.steps.map(([Icon,title,note],index)=><section key={title}><span><Icon/></span><b>{title}</b><small>{note}</small>{index<visual.steps.length-1&&<ArrowRight/>}</section>)}</div><figcaption>{visual.caption}</figcaption></figure>;
}
