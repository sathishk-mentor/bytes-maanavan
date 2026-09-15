import { ArrowDown, ArrowRight, Box, CheckCircle2, Cloud, Code2, Container, Database, ExternalLink, FileCode2, Globe2, HardDrive, KeyRound, Network, PackageOpen, Play, Rocket, Server, ShieldCheck, ShoppingBag, Sparkles, Truck, UploadCloud, Users } from 'lucide-react';

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
  const examples=[[Truck,'Delivery API','Same image · many containers'],[ShoppingBag,'Sale traffic','Scale a tested service'],[Users,'Project team','Dev · QA · Cloud consistency']] as const;
  return <figure className="docker-market-visual"><header><small>FROM ONE IMAGE TO REAL WORK</small><strong>Three teams. One repeatable delivery idea.</strong></header><div>{examples.map(([Icon,title,note],index)=><article key={title} style={{'--market-delay':`${index*.9}s`} as React.CSSProperties}><span><Icon/></span><b>{title}</b><small>{note}</small><i><CheckCircle2/> READY</i></article>)}</div><figcaption>Illustrative Indian product scenarios—not claims about private company infrastructure.</figcaption></figure>;
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
