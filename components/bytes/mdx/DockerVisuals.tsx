import { ArrowDown, ArrowRight, Box, CheckCircle2, Cloud, Code2, Container, Database, ExternalLink, FileCode2, Gauge, Globe2, GraduationCap, HardDrive, KeyRound, Network, PackageOpen, Play, Rocket, Server, Settings2, ShieldCheck, ShoppingBag, Sparkles, Truck, UploadCloud, UserCheck, Users } from 'lucide-react';

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

export function DockerRealWorldVisual() {
  const examples=[
    [Truck,'Delivery tracking','QA cannot start the API','Share order-status:1.0','Same tested setup'],
    [GraduationCap,'College project','Evaluator misses a library','Share the project image','Demo starts predictably'],
    [Users,'New developer','Setup guide is outdated','Start the team image','Project opens faster'],
  ] as const;
  return <figure className="docker-market-visual docker-story-visual"><header><small>PROBLEM → DOCKER DECISION → RESULT</small><strong>Watch Docker remove one setup problem in each situation.</strong></header><div>{examples.map(([Icon,title,problem,decision,result],index)=><article key={title} style={{'--market-delay':`${index*.7}s`} as React.CSSProperties}><span><Icon/></span><b>{title}</b><dl><div><dt>Problem</dt><dd>{problem}</dd></div><ArrowDown/><div><dt>Docker decision</dt><dd>{decision}</dd></div><ArrowDown/><div><dt>Visible result</dt><dd>{result}</dd></div></dl><i><CheckCircle2/> READY TO TEST</i></article>)}</div><figcaption>Each example uses the same beginner pattern: prepare one versioned image, then start containers from that known package.</figcaption></figure>;
}

export function DockerUseCaseVisual() {
  const roles=[
    [Code2,'Developer','“Will it run for my teammate?”','Create a repeatable image'],
    [UserCheck,'QA engineer','“Am I testing the same version?”','Start the approved tag'],
    [Settings2,'DevOps engineer','“Can the same release move through environments?”','Promote one versioned image'],
    [Gauge,'Platform / SRE engineer','“Can we operate and replace it safely?”','Apply limits, health checks and monitoring'],
  ] as const;
  return <figure className="docker-role-map"><header><small>WHO USES THIS — AND WHY?</small><strong>Choose the person first; the Docker benefit becomes clearer.</strong></header><div>{roles.map(([Icon,role,question,action],index)=><article key={role} style={{'--role-delay':`${index*.16}s`} as React.CSSProperties}><span><Icon/></span><div><b>{role}</b><p>{question}</p><small>{action}</small></div><ArrowRight/></article>)}</div><figcaption><Sparkles/> Docker is useful when the learner needs the same prepared application setup in another place.</figcaption></figure>;
}

export function DockerObjectArchitecture() {
  return <figure className="docker-object-architecture">
    <header><div><small>BUILD, SHARE AND RUN</small><strong>One application. Four Docker objects. Two different paths.</strong></div><span><i /> ANIMATED MODEL</span></header>
    <div className="docker-object-stage">
      <section className="docker-build-lane">
        <p><b>01</b> BUILD PATH <span>happens when the code changes</span></p>
        <div className="docker-object-flow">
          <article><span><Code2 /></span><div><b>Application</b><small>Code + dependencies</small></div></article>
          <i><em>+</em></i>
          <article><span><FileCode2 /></span><div><b>Dockerfile</b><small>Build instructions</small></div></article>
          <ArrowRight />
          <article className="docker-action"><span><PackageOpen /></span><div><b>docker build</b><small>Executes the recipe</small></div></article>
          <ArrowRight />
          <article className="docker-image-object"><span><Box /></span><div><b>Image</b><small>Immutable, versioned package</small></div></article>
        </div>
      </section>
      <div className="docker-object-branches"><ArrowDown /><b>The image can now be shared or run</b></div>
      <section className="docker-use-lanes">
        <article><header><UploadCloud /><b>SHARE PATH</b></header><div><strong>docker push</strong><ArrowRight/><span><Cloud/>Registry<small>stores images</small></span><ArrowRight/><strong>docker pull</strong></div></article>
        <article><header><Play /><b>RUN PATH</b></header><div><strong>docker run</strong><ArrowRight/><span><Container/>Container A<small>running process</small></span><span><Container/>Container B<small>same image, separate process</small></span></div></article>
      </section>
    </div>
    <figcaption><CheckCircle2/><span><b>The key distinction:</b> a registry stores images—not running containers. One image can create many independent containers.</span></figcaption>
  </figure>;
}

export function OfficialDockerDiagram() {
  return <figure className="official-docker-diagram">
    <header><div><small>OFFICIAL DOCKER DIAGRAM</small><strong>Docker client, daemon, registry, images and containers</strong></div><a href="https://docs.docker.com/get-started/docker-overview/#docker-architecture" target="_blank" rel="noreferrer">Docker Docs <ExternalLink/></a></header>
    <div><img src="/images/docker/docker-architecture-official.webp" alt="Official Docker architecture showing the Docker client communicating with the Docker daemon and registry" /></div>
    <figcaption>Source: Docker Docs, “What is Docker?” The original diagram is preserved for technical accuracy.</figcaption>
  </figure>;
}
