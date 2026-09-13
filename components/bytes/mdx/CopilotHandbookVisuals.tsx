import { ArrowRight, Bot, CheckCircle2, Code2, FileCode2, FileSearch, GitPullRequest, ListChecks, MessageSquareText, Play, SearchCheck, ShieldCheck, Sparkles, TestTube2, UserRoundCheck, Wrench } from 'lucide-react';

const visualData = {
  lifecycle: {
    label: 'COPILOT CAPABILITY MAP',
    title: 'One assistant across the development lifecycle',
    steps: [['Understand', FileSearch], ['Plan', ListChecks], ['Create', Code2], ['Test', TestTube2], ['Review', GitPullRequest]],
    outcome: 'The developer remains responsible for requirements, validation and release.',
  },
  context: {
    label: 'CONTEXT ENGINEERING',
    title: 'Better context reduces guessing',
    steps: [['Goal', MessageSquareText], ['Relevant files', FileCode2], ['Project rules', ShieldCheck], ['Examples', Sparkles], ['Acceptance checks', CheckCircle2]],
    outcome: 'Copilot combines your request with available project context before producing an answer.',
  },
  feature: {
    label: 'FEATURE DELIVERY LOOP',
    title: 'Move from requirement to reviewed change',
    steps: [['Clarify', MessageSquareText], ['Plan', ListChecks], ['Edit', Wrench], ['Run checks', Play], ['Inspect diff', GitPullRequest]],
    outcome: 'Small reviewed iterations are safer than one large unverified generation.',
  },
  quality: {
    label: 'QUALITY FEEDBACK LOOP',
    title: 'Use failures as new context',
    steps: [['Reproduce', SearchCheck], ['Explain', Bot], ['Fix', Wrench], ['Test', TestTube2], ['Review', UserRoundCheck]],
    outcome: 'A passing test is evidence—not proof that every requirement and risk has been handled.',
  },
  responsible: {
    label: 'HUMAN REVIEW GATE',
    title: 'AI proposes; accountable people decide',
    steps: [['Inspect', FileSearch], ['Verify', SearchCheck], ['Secure', ShieldCheck], ['Approve', UserRoundCheck], ['Release', GitPullRequest]],
    outcome: 'Raise the depth of review when the impact of a wrong change is higher.',
  },
} as const;

export function CopilotHandbookVisual({ variant }: { variant: keyof typeof visualData }) {
  const data = visualData[variant];
  return <figure className={`copilot-handbook-visual copilot-${variant}`}>
    <header><span>{data.label}</span><h3>{data.title}</h3><p><i /> Animated workflow</p></header>
    <div className="copilot-flow-line">
      {data.steps.map(([label, Icon], index) => <div className="copilot-flow-wrap" key={label}>
        <div className="copilot-flow-node" style={{ animationDelay: `${index * .45}s` }}><small>0{index + 1}</small><Icon /><strong>{label}</strong></div>
        {index < data.steps.length - 1 && <ArrowRight />}
      </div>)}
    </div>
    <figcaption><CheckCircle2 />{data.outcome}</figcaption>
  </figure>;
}

export function OfficialScreenshot({ src, alt, sourceUrl, note }: { src: string; alt: string; sourceUrl: string; note: string }) {
  return <figure className="official-product-shot">
    <div className="official-shot-bar"><span>OFFICIAL INTERFACE REFERENCE</span><a href={sourceUrl} target="_blank" rel="noreferrer">Source: GitHub Docs ↗</a></div>
    <div className="official-shot-stage"><img src={src} alt={alt} /></div>
    <figcaption>{note} Interface details can change as GitHub updates Copilot.</figcaption>
  </figure>;
}
