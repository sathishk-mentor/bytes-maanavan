import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight, BadgeCheck, Box, Braces, CheckCircle2, ClipboardCheck, Cloud,
  Code2, Container, Database, Eye, FileCode2, FileSearch, Gauge, GitBranch,
  GitPullRequest, HardDrive, KeyRound, Layers3, ListChecks, MessageSquareText,
  Network, PackageCheck, Play, Radar, Repeat2, Rocket, Search, SearchCheck,
  Server, ShieldCheck, Sparkles, TestTube2, Users, Wrench,
} from 'lucide-react';

type Step = { icon: LucideIcon; title: string; note: string };
type Visual = { eyebrow: string; title: string; steps: Step[]; remember: string };

const visuals = {
  dockerObjects: { eyebrow:'DOCKER MENTAL MODEL', title:'Do not mix up these four objects', steps:[
    {icon:FileCode2,title:'Dockerfile',note:'Recipe'}, {icon:Box,title:'Image',note:'Sealed package'},
    {icon:Container,title:'Container',note:'Running instance'}, {icon:Cloud,title:'Registry',note:'Image store'},
  ], remember:'Build an image. Run a container. Share the image through a registry.' },
  dockerBuild: { eyebrow:'BUILD → RUN → VERIFY', title:'Follow one Python app from code to browser', steps:[
    {icon:Code2,title:'App + requirements',note:'Inputs'}, {icon:Box,title:'docker build',note:'Create image'},
    {icon:Play,title:'docker run',note:'Start container'}, {icon:SearchCheck,title:'Test endpoint',note:'Prove behaviour'},
  ], remember:'Build creates the reusable package; run creates a disposable process from it.' },
  dockerRuntime: { eyebrow:'RUNTIME RESPONSIBILITIES', title:'Match each need to one Docker feature', steps:[
    {icon:Network,title:'Port',note:'Reach the app'}, {icon:HardDrive,title:'Volume',note:'Keep the data'},
    {icon:KeyRound,title:'Environment',note:'Configure safely'}, {icon:Eye,title:'Inspect',note:'Confirm wiring'},
  ], remember:'Traffic uses ports, state uses volumes, and configuration uses environment variables.' },
  dockerCompose: { eyebrow:'COMPOSE ARCHITECTURE', title:'One command starts one connected application', steps:[
    {icon:Braces,title:'compose.yaml',note:'System definition'}, {icon:Layers3,title:'Services',note:'Separate jobs'},
    {icon:Network,title:'Compose network',note:'Service names connect'}, {icon:Database,title:'Named volume',note:'Durable state'},
  ], remember:'Compose coordinates containers; it does not merge them into one container.' },
  dockerAi: { eyebrow:'PRODUCTION REQUEST PATH', title:'Keep the model key behind the application boundary', steps:[
    {icon:Users,title:'User',note:'Sends request'}, {icon:Server,title:'Container API',note:'Validates input'},
    {icon:ShieldCheck,title:'Secret at runtime',note:'Never in image'}, {icon:Sparkles,title:'Model provider',note:'Returns response'},
  ], remember:'The browser talks to your API. Only the server-side application talks to the model provider.' },
  fdeRole: { eyebrow:'ROLE BOUNDARY', title:'An FDE connects customer reality to production software', steps:[
    {icon:Users,title:'Observe users',note:'Actual work'}, {icon:Search,title:'Find constraint',note:'Root problem'},
    {icon:Code2,title:'Build with product',note:'Working slice'}, {icon:Gauge,title:'Measure outcome',note:'Production evidence'},
  ], remember:'The deliverable is not a demo—it is a measurable customer outcome running in context.' },
  fdeDiscovery: { eyebrow:'DISCOVERY FUNNEL', title:'Turn a feature request into a testable problem', steps:[
    {icon:MessageSquareText,title:'Hear the request',note:'Stated need'}, {icon:Eye,title:'Watch the workflow',note:'Actual behaviour'},
    {icon:FileSearch,title:'Check evidence',note:'Logs + artefacts'}, {icon:ClipboardCheck,title:'Frame outcome',note:'Metric + boundary'},
  ], remember:'Do not design the solution until the workflow, exception and success measure are visible.' },
  fdeSlice: { eyebrow:'THIN PRODUCTION SLICE', title:'Make one narrow path work end to end', steps:[
    {icon:Radar,title:'Real trigger',note:'One use case'}, {icon:Database,title:'Real data',note:'Governed access'},
    {icon:ShieldCheck,title:'Human boundary',note:'Safe decision'}, {icon:Gauge,title:'Outcome signal',note:'Learn in production'},
  ], remember:'Reduce breadth, not production quality: keep identity, data, approval and observability real.' },
  fdeObserve: { eyebrow:'EVIDENCE LADDER', title:'A healthy service can still be a failed deployment', steps:[
    {icon:Server,title:'System',note:'Is it running?'}, {icon:Sparkles,title:'AI quality',note:'Is it useful?'},
    {icon:Repeat2,title:'Workflow',note:'Did work improve?'}, {icon:Users,title:'Adoption',note:'Do people trust it?'},
  ], remember:'Measure from infrastructure health up to user behaviour and business outcome.' },
  fdeProduct: { eyebrow:'FIELD → PLATFORM', title:'Separate reusable capability from customer configuration', steps:[
    {icon:Eye,title:'Observe repeats',note:'Across deployments'}, {icon:GitBranch,title:'Extract pattern',note:'Stable variation'},
    {icon:PackageCheck,title:'Build primitive',note:'Reusable product'}, {icon:Users,title:'Handoff owner',note:'Durable operation'},
  ], remember:'One customer need is configuration; repeated evidence can justify a product capability.' },
  copilotModes: { eyebrow:'CHOOSE THE RIGHT MODE', title:'Match the interaction to the size of the job', steps:[
    {icon:Code2,title:'Completion',note:'Next lines'}, {icon:MessageSquareText,title:'Ask',note:'Understand'},
    {icon:ListChecks,title:'Plan',note:'Sequence work'}, {icon:Wrench,title:'Agent',note:'Execute steps'},
  ], remember:'Start with the smallest capability that can safely complete the task.' },
  copilotContext: { eyebrow:'CONTEXT ASSEMBLY', title:'Give Copilot the same brief a teammate would need', steps:[
    {icon:MessageSquareText,title:'Goal',note:'Desired change'}, {icon:FileCode2,title:'Files',note:'Relevant code'},
    {icon:ShieldCheck,title:'Rules',note:'Constraints'}, {icon:CheckCircle2,title:'Checks',note:'Definition of done'},
  ], remember:'A precise prompt without project evidence is still an incomplete brief.' },
  copilotDebug: { eyebrow:'EVIDENCE-FIRST DEBUGGING', title:'Move from symptom to verified correction', steps:[
    {icon:SearchCheck,title:'Reproduce',note:'Stable failure'}, {icon:FileSearch,title:'Collect evidence',note:'Logs + state'},
    {icon:Wrench,title:'Smallest fix',note:'One cause'}, {icon:TestTube2,title:'Regression test',note:'Prevent return'},
  ], remember:'Ask AI to explain evidence and propose tests before asking it to rewrite the code.' },
  copilotFeature: { eyebrow:'SAFE FEATURE DELIVERY', title:'Keep every AI-assisted change reviewable', steps:[
    {icon:FileSearch,title:'Understand',note:'Current system'}, {icon:ListChecks,title:'Approve plan',note:'Small steps'},
    {icon:Code2,title:'Implement slice',note:'Focused diff'}, {icon:GitPullRequest,title:'Test + review',note:'Release evidence'},
  ], remember:'One small vertical slice gives faster feedback than one large generated change.' },
  copilotSecure: { eyebrow:'ACCOUNTABILITY GATES', title:'AI output crosses human-controlled release gates', steps:[
    {icon:FileSearch,title:'Inspect diff',note:'Every change'}, {icon:TestTube2,title:'Verify behaviour',note:'Expected + edge'},
    {icon:ShieldCheck,title:'Review risk',note:'Security + privacy'}, {icon:BadgeCheck,title:'Approve release',note:'Named owner'},
  ], remember:'Copilot can suggest and review; the accountable developer decides what reaches users.' },
} satisfies Record<string, Visual>;

export type HandbookLearningVisualVariant = keyof typeof visuals;

export function HandbookLearningVisual({ variant }: { variant: HandbookLearningVisualVariant }) {
  const visual = visuals[variant];
  return <figure className={`handbook-learning-visual handbook-learning-${variant}`}>
    <header><div><small>{visual.eyebrow}</small><strong>{visual.title}</strong></div><span><i /> FOLLOW THE FLOW</span></header>
    <div className="handbook-learning-flow">
      {visual.steps.map(({ icon: Icon, title, note }, index) => <div className="handbook-learning-wrap" key={title}>
        <section style={{ '--step': index } as CSSProperties}><em>0{index + 1}</em><span><Icon /></span><div><b>{title}</b><small>{note}</small></div></section>
        {index < visual.steps.length - 1 && <ArrowRight />}
      </div>)}
    </div>
    <figcaption><CheckCircle2 /><span><b>Remember:</b> {visual.remember}</span></figcaption>
  </figure>;
}
