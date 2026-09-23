import Link from 'next/link';
import {
  Blocks, Bot, Box, Braces, BriefcaseBusiness, Bug, CheckCircle2, ChevronRight, Clock3, Code2,
  Container, MapPin, Database, FileCode2, FileSearch, FileText, Gauge, GitPullRequestArrow, HardDrive, KeyRound, MessageSquareText, Network, Rocket, ScanSearch, Search, Server, ShieldCheck, Sparkles, TestTube2, Users, Wrench,
} from 'lucide-react';
import { ByteMetadata } from '@/lib/types';
import { getCategoryBySlug } from '@/lib/categories';

const handbookHeroes = {
  '01-what-happens-when-you-send-whatsapp-message': { label: 'MESSAGE JOURNEY', icon: MessageSquareText, steps: [[MessageSquareText, 'Send'], [Server, 'Route'], [Clock3, 'Wait or deliver'], [CheckCircle2, 'Confirm']] },
  '02-what-happens-when-you-complete-upi-payment': { label: 'UPI PAYMENT FLOW', icon: ShieldCheck, steps: [[KeyRound, 'Authorize'], [Network, 'Route'], [Database, 'Bank update'], [CheckCircle2, 'Confirm']] },
  '03-how-live-food-delivery-tracking-works': { label: 'LIVE TRACKING', icon: MapPin, steps: [[Users, 'Rider'], [MapPin, 'Location'], [Server, 'Update'], [Gauge, 'Map']] },
  '04-how-netflix-adaptive-streaming-works': { label: 'ADAPTIVE PLAYBACK', icon: Gauge, steps: [[Server, 'Video chunks'], [Network, 'Transfer'], [Database, 'Buffer'], [Gauge, 'Quality']] },
  '05-how-google-maps-routing-and-rerouting-works': { label: 'ROUTE AND REROUTE', icon: MapPin, steps: [[MapPin, 'Destination'], [Network, 'Roads'], [Gauge, 'Traffic'], [CheckCircle2, 'Route']] },
  '01-what-is-an-ai-agent-from-answering-to-taking-action': { label: 'REPLY TO RESOLUTION', icon: Bot, steps: [[MessageSquareText, 'Question'], [Bot, 'Choose'], [Wrench, 'Use tool'], [CheckCircle2, 'Resolve']] },
  '02-how-an-ai-agent-works-goal-reasoning-tools-actions': { label: 'AGENT DECISION LOOP', icon: Network, steps: [[Users, 'Goal'], [Bot, 'Reason'], [Wrench, 'Act'], [ScanSearch, 'Observe']] },
  '03-tools-knowledge-memory-explained-simply': { label: 'USE-CASE FIT', icon: Gauge, steps: [[Search, 'Find task'], [Clock3, 'Measure time'], [ShieldCheck, 'Check risk'], [CheckCircle2, 'Pilot']] },
  '04-build-first-ai-agent-without-coding': { label: 'GUARDRAIL PATH', icon: ShieldCheck, steps: [[KeyRound, 'Limit access'], [ShieldCheck, 'Validate'], [Users, 'Approve'], [FileText, 'Log']] },
  '05-use-ai-agents-safely-responsibly': { label: 'SAFE PILOT PATH', icon: Rocket, steps: [[Search, 'Identify'], [Sparkles, 'Try'], [TestTube2, 'Pilot'], [Gauge, 'Review']] },
  '62-how-developers-use-ai-tools': { label: 'COPILOT WORKFLOW', icon: Bot, steps: [[FileCode2, 'Your context'], [Sparkles, 'Copilot suggests'], [ScanSearch, 'You inspect'], [CheckCircle2, 'You decide']] },
  '63-api-first-thinking': { label: 'CONTEXT ENGINE', icon: Braces, steps: [[FileCode2, 'Instructions'], [Code2, 'Open files'], [Braces, 'Codebase context'], [Sparkles, 'Grounded answer']] },
  '66-ai-assisted-coding-workflow': { label: 'FEATURE DELIVERY', icon: GitPullRequestArrow, steps: [[FileCode2, 'Define task'], [Sparkles, 'Generate change'], [TestTube2, 'Run checks'], [GitPullRequestArrow, 'Review diff']] },
  '64-debugging-ai-generated-code': { label: 'PROMPT BUILDER', icon: Braces, steps: [[Braces, 'Define goal'], [FileCode2, 'Add context'], [ShieldCheck, 'Set constraints'], [CheckCircle2, 'Define evidence']] },
  '75-secure-ai-coding': { label: 'TRUST GATE', icon: ShieldCheck, steps: [[Sparkles, 'AI output'], [ScanSearch, 'Security review'], [TestTube2, 'Automated tests'], [ShieldCheck, 'Human approval']] },
  '01-github-copilot-for-developers': { label: 'COPILOT WORKFLOW', icon: Bot, steps: [[FileCode2, 'Your context'], [Sparkles, 'Copilot suggests'], [ScanSearch, 'You inspect'], [CheckCircle2, 'You decide']] },
  '02-give-github-copilot-better-context': { label: 'CONTEXT ENGINE', icon: Braces, steps: [[FileCode2, 'Instructions'], [Code2, 'Open files'], [Braces, 'Codebase context'], [Sparkles, 'Grounded answer']] },
  '03-debug-test-refactor-with-github-copilot': { label: 'DEBUGGING LOOP', icon: Bug, steps: [[Bug, 'Reproduce'], [ScanSearch, 'Collect evidence'], [Sparkles, 'Test hypothesis'], [CheckCircle2, 'Verify fix']] },
  '04-build-feature-with-github-copilot': { label: 'FEATURE DELIVERY', icon: GitPullRequestArrow, steps: [[FileCode2, 'Define task'], [Sparkles, 'Generate change'], [TestTube2, 'Run checks'], [GitPullRequestArrow, 'Review diff']] },
  '05-use-github-copilot-responsibly': { label: 'TRUST GATE', icon: ShieldCheck, steps: [[Sparkles, 'AI output'], [ScanSearch, 'Security review'], [TestTube2, 'Automated tests'], [ShieldCheck, 'Human approval']] },
  '01-what-does-a-forward-deployed-engineer-do': { label: 'FDE OUTCOME LOOP', icon: BriefcaseBusiness, steps: [[Users, 'Customer reality'], [Search, 'Problem frame'], [Code2, 'Build'], [Rocket, 'Production']] },
  '02-problem-discovery-and-workflow-mapping': { label: 'DISCOVERY MAP', icon: Search, steps: [[Users, 'Observe users'], [Search, 'Map workflow'], [Network, 'Trace systems'], [Gauge, 'Define success']] },
  '03-design-thin-production-slice': { label: 'THIN SLICE', icon: Network, steps: [[Gauge, 'Real trigger'], [Network, 'Governed context'], [Code2, 'Bounded build'], [CheckCircle2, 'Approval']] },
  '04-deploy-observe-and-improve': { label: 'LEARNING LOOP', icon: Gauge, steps: [[Rocket, 'Release'], [Gauge, 'Observe'], [Bug, 'Diagnose'], [TestTube2, 'Improve']] },
  '05-turn-field-learning-into-product': { label: 'PRODUCT LOOP', icon: Blocks, steps: [[Users, 'Field evidence'], [Search, 'Find pattern'], [Blocks, 'Productise'], [CheckCircle2, 'Handoff']] },
  '01-what-is-docker-containers-explained': { label: 'CONTAINER MENTAL MODEL', icon: Container, steps: [[Code2, 'Application'], [Box, 'Image'], [Container, 'Container'], [Server, 'Any host']] },
  '02-dockerize-first-python-application': { label: 'BUILD AND RUN', icon: Box, steps: [[FileCode2, 'Dockerfile'], [Box, 'Build image'], [Container, 'Run container'], [CheckCircle2, 'Test app']] },
  '03-docker-ports-volumes-environment-variables': { label: 'RUNTIME CONNECTIONS', icon: HardDrive, steps: [[Network, 'Publish port'], [HardDrive, 'Mount volume'], [KeyRound, 'Inject config'], [Gauge, 'Inspect']] },
  '04-multi-container-applications-docker-compose': { label: 'COMPOSE APPLICATION', icon: Network, steps: [[Code2, 'Frontend'], [Server, 'API'], [Database, 'Database'], [Bot, 'AI service']] },
  '05-dockerize-deploy-generative-ai-application': { label: 'AI DEPLOYMENT PATH', icon: Rocket, steps: [[Code2, 'LLM app'], [ShieldCheck, 'Protect key'], [Container, 'Package'], [Rocket, 'Deploy']] },
  '01-what-is-langchain-build-llm-applications': { label: 'LANGCHAIN APP MODEL', icon: Network, steps: [[MessageSquareText, 'Messages'], [Bot, 'Model'], [Braces, 'Structure'], [Code2, 'Application']] },
  '02-connect-python-with-llms-using-langchain': { label: 'MODEL INTEGRATION', icon: MessageSquareText, steps: [[KeyRound, 'Secret config'], [MessageSquareText, 'Messages'], [Bot, 'Model call'], [Braces, 'Typed result']] },
  '03-build-rag-applications-with-your-documents': { label: 'RAG PIPELINE', icon: FileText, steps: [[FileText, 'Documents'], [Blocks, 'Chunks'], [Database, 'Vectors'], [Search, 'Evidence']] },
  '04-build-ai-agents-with-tools-and-memory': { label: 'AGENT LOOP', icon: Wrench, steps: [[Users, 'Goal'], [Bot, 'Decide'], [Wrench, 'Use tool'], [Network, 'Update state']] },
  '05-production-ready-langchain-application': { label: 'PRODUCTION GATES', icon: ShieldCheck, steps: [[Braces, 'Contract'], [ShieldCheck, 'Controls'], [Gauge, 'Observe'], [Rocket, 'Release']] },
  '01-what-is-rag-give-ai-access-to-your-knowledge': { label: 'GROUND THE ANSWER', icon: FileSearch, steps: [[MessageSquareText, 'Question'], [Search, 'Retrieve'], [FileText, 'Evidence'], [Sparkles, 'Answer']] },
  '02-prepare-documents-loading-cleaning-chunking': { label: 'END-TO-END RAG', icon: Network, steps: [[FileText, 'Documents'], [Blocks, 'Chunks'], [Search, 'Retrieve'], [MessageSquareText, 'Respond']] },
  '03-embeddings-vector-databases-semantic-search': { label: 'FAILURE DIAGNOSIS', icon: Bug, steps: [[FileText, 'Source'], [Blocks, 'Chunk'], [Search, 'Ranking'], [ScanSearch, 'Verify']] },
  '04-build-complete-rag-application-python-langchain': { label: 'QUALITY EVALUATION', icon: Gauge, steps: [[TestTube2, 'Test set'], [Search, 'Retrieve'], [Gauge, 'Score'], [CheckCircle2, 'Improve']] },
  '05-production-rag-evaluation-security-deployment': { label: 'PRODUCTION CONTROL', icon: ShieldCheck, steps: [[KeyRound, 'Identity'], [FileSearch, 'Filter'], [Gauge, 'Observe'], [FileText, 'Audit']] },
  '01-modern-java-foundations-ai-era': { label: 'SPRING REQUEST PATH', icon: Server, steps: [[MessageSquareText, 'Request'], [Braces, 'Controller'], [Code2, 'Service'], [CheckCircle2, 'Response']] },
  '02-build-rest-apis-java-spring-boot': { label: 'SPRING AI CLIENT', icon: Bot, steps: [[MessageSquareText, 'Prompt'], [Bot, 'ChatClient'], [Braces, 'Validate'], [FileText, 'Typed output']] },
  '03-connect-spring-boot-database': { label: 'JAVA RAG FLOW', icon: Database, steps: [[FileText, 'Documents'], [Database, 'VectorStore'], [Wrench, 'Advisor'], [Sparkles, 'Answer']] },
  '04-add-generative-ai-rag-java': { label: 'CONTROLLED TOOL CALL', icon: Wrench, steps: [[Users, 'Intent'], [ShieldCheck, 'Policy'], [Wrench, '@Tool'], [FileText, 'Audit']] },
  '05-build-deploy-enterprise-ai-application': { label: 'RESILIENT AI SERVICE', icon: Gauge, steps: [[Users, 'Traffic'], [ShieldCheck, 'Guardrail'], [Server, 'Fallback'], [Gauge, 'Observe']] },
  'what-is-mongodb-documents-collections-databases': { label: 'MONGODB MENTAL MODEL', icon: Database, steps: [[Database, 'Database'], [Blocks, 'Collection'], [FileText, 'Document'], [KeyRound, 'Field']] },
  'mongodb-data-modeling-embedding-vs-referencing': { label: 'VECTOR RETRIEVAL', icon: Search, steps: [[FileText, 'Approved text'], [Blocks, 'Embedding'], [Search, 'Rank + filter'], [Sparkles, 'Evidence']] },
  'mongodb-queries-updates-aggregation-pipeline': { label: 'AGENT MEMORY', icon: MessageSquareText, steps: [[Users, 'User'], [MessageSquareText, 'Recent turns'], [Database, 'Preference'], [ShieldCheck, 'Scoped recall']] },
  'mongodb-python-fastapi-ai-application': { label: 'AI FEATURE PIPELINE', icon: Gauge, steps: [[FileText, 'Events'], [Search, 'Match'], [Blocks, 'Group'], [Sparkles, 'Feature']] },
  'production-mongodb-indexing-security-deployment': { label: 'PRODUCTION GATES', icon: ShieldCheck, steps: [[Gauge, 'Explain'], [Search, 'Index'], [ShieldCheck, 'Protect'], [Rocket, 'Operate']] },
} as const;

function TopicHeroVisual({ slug }: { slug: string }) {
  const visual = handbookHeroes[slug as keyof typeof handbookHeroes] || handbookHeroes['62-how-developers-use-ai-tools'];
  const VisualIcon = visual.icon;
  return <aside className={`topic-hero-visual visual-${slug}`} aria-label={`${visual.label} animated visual`}>
    <header><span><VisualIcon /></span><div><small>ANIMATED EXPLAINER</small><strong>{visual.label}</strong></div><i>LIVE</i></header>
    <div className="topic-hero-flow">
      {visual.steps.map(([Icon, label], index) => <div className="topic-hero-step-wrap" key={label}>
        <div className="topic-hero-step" style={{'--step': index} as React.CSSProperties}><span><Icon /></span><strong>{label}</strong><small>0{index + 1}</small></div>
        {index < visual.steps.length - 1 && <ChevronRight className="topic-hero-arrow" />}
      </div>)}
    </div>
    <footer><span></span>{slug.includes('how-') || slug.includes('upi-payment') ? 'Follow the events behind what you see on screen' : 'Evidence and accountable ownership guide every stage'}</footer>
  </aside>;
}

export function ByteHeader({ byte, chapterNumber }: { byte: ByteMetadata; chapterNumber: number }) {
  const category = getCategoryBySlug(byte.category);
  return <header className="byte-editorial-hero"><div className="byte-hero-inner">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/${byte.category}/`}>{category?.title}</Link><span>/</span><b>Chapter {chapterNumber}</b></nav>
    <div className="byte-hero-grid"><div><p className="byte-eyebrow"><Sparkles/>{category?.title} · PRACTICAL GUIDE</p><h1>{byte.title}</h1><p className="byte-deck">{byte.summary}</p><div className="byte-byline"><span><Clock3/>{byte.duration} read</span><time dateTime={byte.updatedAt}>Updated {byte.updatedAt}</time><span>Free learning guide</span></div></div>
    <TopicHeroVisual slug={byte.slug} /></div>
  </div></header>;
}
