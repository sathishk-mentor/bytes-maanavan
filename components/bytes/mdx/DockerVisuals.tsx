import { ArrowRight, Box, CheckCircle2, Cloud, Code2, Container, Database, FileCode2, Globe2, HardDrive, KeyRound, Network, Rocket, Server, ShieldCheck, Sparkles } from 'lucide-react';

const visuals = {
  mentalModel: {
    label: 'FROM SOURCE CODE TO RUNNING CONTAINER',
    caption: 'A Dockerfile describes the package, an image stores it and a container runs one isolated instance.',
    steps: [[Code2,'Source code','Your application'],[FileCode2,'Dockerfile','Build instructions'],[Box,'Image','Read-only package'],[Container,'Container','Running process']],
  },
  buildRun: {
    label: 'YOUR FIRST PYTHON CONTAINER',
    caption: 'Build converts the Dockerfile into an image. Run creates a container from that image.',
    steps: [[FileCode2,'Dockerfile','Define runtime'],[Box,'docker build','Create image'],[Container,'docker run','Start instance'],[Globe2,'localhost','Reach the app']],
  },
  runtime: {
    label: 'THREE RUNTIME CONNECTIONS',
    caption: 'Ports connect traffic, volumes preserve state and environment variables provide runtime configuration.',
    steps: [[Network,'Port','Host → container'],[HardDrive,'Volume','Persistent data'],[KeyRound,'Environment','Runtime config'],[CheckCircle2,'Inspect','Verify behaviour']],
  },
  compose: {
    label: 'ONE APPLICATION, MULTIPLE SERVICES',
    caption: 'Compose defines services, networks, volumes and configuration as one repeatable application model.',
    steps: [[Globe2,'Frontend','User interface'],[Server,'Backend','Application API'],[Database,'Database','Durable state'],[Sparkles,'AI service','Model workflow']],
  },
  aiDeploy: {
    label: 'GENERATIVE AI DEPLOYMENT GATES',
    caption: 'Package the application—not the secret—then validate health, security and observability before release.',
    steps: [[Code2,'LLM app','Code + dependencies'],[ShieldCheck,'Secret boundary','Key at runtime'],[Container,'Image','Portable package'],[Cloud,'Cloud runtime','Managed deployment']],
  },
} as const;

export function DockerFlowVisual({variant}:{variant:keyof typeof visuals}) {
  const visual=visuals[variant];
  return <figure className={`docker-flow docker-flow-${variant}`}><header><span><Container/></span><div><small>VISUAL EXPLAINER</small><strong>{visual.label}</strong></div><i>DOCKER</i></header><div className="docker-flow-steps">{visual.steps.map(([Icon,title,note],index)=><section key={title}><span><Icon/></span><div><b>{title}</b><small>{note}</small></div>{index<visual.steps.length-1&&<ArrowRight/>}</section>)}</div><figcaption>{visual.caption}</figcaption></figure>;
}

export function DockerCommand({label,children}:{label:string;children:React.ReactNode}) {
  return <div className="docker-command"><header><span><i/><i/><i/></span><small>{label}</small><b>TERMINAL</b></header><pre><code>{children}</code></pre></div>;
}
