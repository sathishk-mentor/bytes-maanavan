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
  ragFoundation: { eyebrow:'THE RAG REQUEST PATH', title:'The model answers only after the application finds evidence', steps:[
    {icon:MessageSquareText,title:'Question',note:'User intent'}, {icon:SearchCheck,title:'Retrieve',note:'Relevant chunks'},
    {icon:Layers3,title:'Augment',note:'Question + evidence'}, {icon:Sparkles,title:'Generate',note:'Grounded answer'},
  ], remember:'RAG changes the context supplied to the model; it does not retrain the model.' },
  ragDocuments: { eyebrow:'KNOWLEDGE PREPARATION', title:'Turn messy files into retrievable evidence', steps:[
    {icon:FileSearch,title:'Load',note:'PDF · DOCX · web'}, {icon:Wrench,title:'Clean',note:'Remove noise'},
    {icon:Layers3,title:'Chunk',note:'Preserve meaning'}, {icon:BadgeCheck,title:'Label',note:'Source + access'},
  ], remember:'A useful chunk is a self-contained unit of evidence with traceable metadata.' },
  ragSearch: { eyebrow:'SEMANTIC RETRIEVAL', title:'Search meaning, then improve precision with constraints', steps:[
    {icon:Braces,title:'Embed query',note:'Meaning as numbers'}, {icon:Database,title:'Vector search',note:'Nearest candidates'},
    {icon:FileSearch,title:'Filter + hybrid',note:'Scope + keywords'}, {icon:Radar,title:'Rerank',note:'Best evidence first'},
  ], remember:'Similarity finds candidates; filters, hybrid search and reranking make them more useful.' },
  ragApplication: { eyebrow:'END-TO-END RAG', title:'Keep the evidence chain visible from source to answer', steps:[
    {icon:Database,title:'Indexed knowledge',note:'Text + metadata'}, {icon:SearchCheck,title:'Authorised retrieval',note:'Top evidence'},
    {icon:MessageSquareText,title:'Grounded prompt',note:'Rules + context'}, {icon:BadgeCheck,title:'Answer + citations',note:'Validated sources'},
  ], remember:'Application code owns retrieval, permissions and citations; the model writes within that boundary.' },
  ragProduction: { eyebrow:'PRODUCTION QUALITY LOOP', title:'Measure every layer instead of trusting fluent answers', steps:[
    {icon:TestTube2,title:'Evaluate',note:'Retrieval + answer'}, {icon:ShieldCheck,title:'Protect',note:'Data + instructions'},
    {icon:Eye,title:'Observe',note:'Latency + cost'}, {icon:Repeat2,title:'Improve',note:'Evidence-driven'},
  ], remember:'A production RAG system must be relevant, grounded, authorised, observable and recoverable.' },
  fastapiFoundation: { eyebrow:'HTTP REQUEST LIFECYCLE', title:'FastAPI turns a typed Python function into a web contract', steps:[
    {icon:Users,title:'Client request',note:'Method + URL'}, {icon:Network,title:'Route',note:'Match endpoint'},
    {icon:ShieldCheck,title:'Validate',note:'Types + rules'}, {icon:Server,title:'JSON response',note:'Status + data'},
  ], remember:'An endpoint is a public contract: method, path, input, output and failure behaviour.' },
  fastapiValidation: { eyebrow:'SAFE REST CONTRACT', title:'Reject bad input before business logic runs', steps:[
    {icon:MessageSquareText,title:'Request body',note:'Untrusted JSON'}, {icon:Braces,title:'Pydantic model',note:'Validate + parse'},
    {icon:Wrench,title:'Service logic',note:'Perform work'}, {icon:BadgeCheck,title:'Typed response',note:'Predictable output'},
  ], remember:'Validation protects the application boundary; meaningful errors help clients recover.' },
  fastapiServices: { eyebrow:'APPLICATION BOUNDARIES', title:'Keep routes thin and dependencies explicit', steps:[
    {icon:Users,title:'API route',note:'HTTP contract'}, {icon:Layers3,title:'Service',note:'Business logic'},
    {icon:Database,title:'Repository',note:'Persistent data'}, {icon:Cloud,title:'External API',note:'Bounded call'},
  ], remember:'The route coordinates work; it should not contain database, provider and configuration details.' },
  fastapiStreaming: { eyebrow:'STREAMED AI RESPONSE', title:'Deliver useful progress without hiding the evidence contract', steps:[
    {icon:MessageSquareText,title:'Question',note:'Validated input'}, {icon:SearchCheck,title:'Retrieve',note:'Grounding chunks'},
    {icon:Sparkles,title:'LLM stream',note:'Incremental tokens'}, {icon:BadgeCheck,title:'Citations',note:'Final metadata'},
  ], remember:'Streaming changes delivery timing, not authentication, retrieval or citation requirements.' },
  fastapiProduction: { eyebrow:'PRODUCTION RELEASE PATH', title:'Protect and prove the API before deployment', steps:[
    {icon:ShieldCheck,title:'Authenticate',note:'Identity + scope'}, {icon:Gauge,title:'Limit + observe',note:'Cost + reliability'},
    {icon:TestTube2,title:'Test contract',note:'Success + failure'}, {icon:Rocket,title:'Docker deploy',note:'Repeatable runtime'},
  ], remember:'A production API is secure, testable, observable and recoverable—not merely reachable.' },
  agentFoundation: { eyebrow:'THE AGENT LOOP', title:'A goal becomes a sequence of checked actions', steps:[
    {icon:MessageSquareText,title:'Goal',note:'Desired outcome'}, {icon:ListChecks,title:'Plan',note:'Choose next step'},
    {icon:Wrench,title:'Use tool',note:'Read or act'}, {icon:CheckCircle2,title:'Check',note:'Stop or continue'},
  ], remember:'A chatbot responds once; an agent can choose and repeat actions until the goal is complete or it must ask for help.' },
  agentWorkflow: { eyebrow:'GOAL → VERIFIED OUTCOME', title:'The agent observes each result before choosing the next step', steps:[
    {icon:MessageSquareText,title:'Understand goal',note:'Outcome + limits'}, {icon:ListChecks,title:'Choose step',note:'Reason from state'},
    {icon:Wrench,title:'Act with tool',note:'Bounded operation'}, {icon:SearchCheck,title:'Observe + check',note:'Continue or stop'},
  ], remember:'An agent should not follow a rigid plan blindly; every tool result changes what it knows and what it should do next.' },
  agentContext: { eyebrow:'WHAT THE AGENT CAN USE', title:'Keep capability, evidence and continuity as separate layers', steps:[
    {icon:Wrench,title:'Tools',note:'Read or act'}, {icon:FileSearch,title:'Knowledge',note:'Trusted evidence'},
    {icon:Database,title:'Memory',note:'Relevant state'}, {icon:ShieldCheck,title:'Policy',note:'Permission boundary'},
  ], remember:'A tool performs an operation, knowledge supports an answer, memory carries useful state, and policy limits all three.' },
  agentNoCode: { eyebrow:'PERSONAL WORKDAY ASSISTANT', title:'Build one narrow workflow before adding more autonomy', steps:[
    {icon:ClipboardCheck,title:'Define brief',note:'Goal + done'}, {icon:FileSearch,title:'Connect source',note:'Authorised data'},
    {icon:MessageSquareText,title:'Draft result',note:'Structured output'}, {icon:Users,title:'Human approval',note:'Review before send'},
  ], remember:'A reliable no-code agent starts with one repeatable outcome, one trusted source and one visible approval gate.' },
  agentSafety: { eyebrow:'SAFE ACTION PATH', title:'Risk determines how much independence the agent receives', steps:[
    {icon:KeyRound,title:'Limit access',note:'Least privilege'}, {icon:ShieldCheck,title:'Apply rules',note:'Allow + deny'},
    {icon:Users,title:'Request approval',note:'High-impact action'}, {icon:Eye,title:'Log + review',note:'Trace outcome'},
  ], remember:'The safest agent is not the one that never acts; it is the one whose actions are bounded, reviewable and reversible.' },
  javaFoundation: { eyebrow:'MODERN JAVA MENTAL MODEL', title:'Turn a business rule into a readable domain model', steps:[
    {icon:MessageSquareText,title:'Requirement',note:'Policy rule'}, {icon:Braces,title:'Types + records',note:'Model data'},
    {icon:Code2,title:'Service method',note:'Apply behaviour'}, {icon:TestTube2,title:'Test + review',note:'Prove intent'},
  ], remember:'Use AI to accelerate explanation and review; keep Java types, business rules and tests under developer control.' },
  javaApi: { eyebrow:'SPRING REQUEST PATH', title:'Keep HTTP, business logic and errors in clear layers', steps:[
    {icon:Users,title:'HTTP request',note:'JSON input'}, {icon:Server,title:'Controller',note:'Web contract'},
    {icon:Layers3,title:'Service',note:'Business rule'}, {icon:BadgeCheck,title:'Response',note:'Status + JSON'},
  ], remember:'Controllers translate HTTP; services own application behaviour.' },
  javaData: { eyebrow:'PERSISTENCE PATH', title:'Map Java domain objects to durable relational data', steps:[
    {icon:Server,title:'Service',note:'Use case'}, {icon:Layers3,title:'Repository',note:'Data boundary'},
    {icon:Database,title:'JPA entity',note:'Mapping'}, {icon:HardDrive,title:'SQL database',note:'Durable state'},
  ], remember:'JPA maps objects to tables; transactions protect a complete business operation.' },
  javaRag: { eyebrow:'GROUNDED JAVA AI', title:'Retrieve authorised policy evidence before generation', steps:[
    {icon:MessageSquareText,title:'Question',note:'User intent'}, {icon:SearchCheck,title:'Retrieve',note:'Relevant policy'},
    {icon:Layers3,title:'Ground prompt',note:'Evidence + rules'}, {icon:BadgeCheck,title:'Cited answer',note:'Traceable output'},
  ], remember:'Spring AI coordinates the model and retrieval; your application still owns access, evidence and citations.' },
  javaProduction: { eyebrow:'ENTERPRISE RELEASE PATH', title:'Protect, prove and package the complete service', steps:[
    {icon:ShieldCheck,title:'Secure',note:'Identity + roles'}, {icon:TestTube2,title:'Test',note:'Unit + integration'},
    {icon:Eye,title:'Observe',note:'Logs + metrics'}, {icon:Rocket,title:'Containerise',note:'Deploy + recover'},
  ], remember:'Production readiness is a set of evidence: secure access, passing tests, useful telemetry and repeatable deployment.' },
  sqlFoundation: { eyebrow:'QUESTION → RESULT', title:'Translate a business question into a precise table query', steps:[
    {icon:MessageSquareText,title:'Question',note:'What do we need?'}, {icon:Database,title:'Table',note:'Where is the data?'},
    {icon:SearchCheck,title:'Filter + sort',note:'Which rows?'}, {icon:BadgeCheck,title:'Result',note:'Only useful columns'},
  ], remember:'SELECT chooses columns; WHERE chooses rows; ORDER BY arranges them; LIMIT controls result size.' },
  sqlAnalysis: { eyebrow:'BUSINESS ANALYSIS', title:'Move from individual rows to decision-ready measures', steps:[
    {icon:Database,title:'Transactions',note:'Raw rows'}, {icon:Braces,title:'Calculate',note:'SUM + COUNT'},
    {icon:Layers3,title:'Group',note:'Course + month'}, {icon:Gauge,title:'Explain',note:'Business insight'},
  ], remember:'WHERE filters rows before grouping; HAVING filters groups after aggregation.' },
  sqlJoins: { eyebrow:'RELATIONAL THINKING', title:'Follow keys to connect facts stored in different tables', steps:[
    {icon:Users,title:'Customers',note:'Primary key'}, {icon:Network,title:'Orders',note:'Foreign key'},
    {icon:Database,title:'Courses',note:'Referenced row'}, {icon:BadgeCheck,title:'Combined view',note:'Business meaning'},
  ], remember:'A join condition explains the relationship; the join type decides which unmatched rows survive.' },
  sqlAi: { eyebrow:'SAFE TEXT-TO-SQL', title:'Let AI propose a query without giving it uncontrolled execution', steps:[
    {icon:MessageSquareText,title:'Question',note:'User intent'}, {icon:Sparkles,title:'Generate SQL',note:'Schema scoped'},
    {icon:ShieldCheck,title:'Validate',note:'Read-only policy'}, {icon:BadgeCheck,title:'Execute + explain',note:'Bounded result'},
  ], remember:'The model proposes SQL; deterministic controls decide whether and how it runs.' },
  sqlProduction: { eyebrow:'PRODUCTION QUERY PATH', title:'Protect data while keeping queries fast and explainable', steps:[
    {icon:ShieldCheck,title:'Parameterise',note:'Separate code + data'}, {icon:Gauge,title:'Optimise',note:'Plan + index'},
    {icon:Repeat2,title:'Transact',note:'All or nothing'}, {icon:Eye,title:'Audit',note:'Who queried what'},
  ], remember:'Production SQL must be correct, bounded, authorised, observable and efficient.' },
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
