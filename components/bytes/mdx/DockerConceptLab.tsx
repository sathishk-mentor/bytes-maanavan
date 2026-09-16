'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Box, CheckCircle2, Container, Database, FileCode2, Globe2, KeyRound, LoaderCircle, Network, Play, RotateCcw, Server, Sparkles, TerminalSquare } from 'lucide-react';

type Concept = 'imageContainer' | 'buildRun' | 'runtime' | 'compose' | 'deploy';
type Language = 'en' | 'ta';

const labs = {
  imageContainer: {
    en: {
      eyebrow: 'CONCEPT LAB 01', title: 'Watch one app become a container', prompt: 'Select each stage. Notice when the app is only prepared and when it is actually running.',
      steps: [
        [FileCode2, 'Dockerfile', 'Recipe', 'Records how the app package must be prepared. Nothing is running yet.'],
        [Box, 'Image', 'Ready package', 'Docker finishes the build and saves a reusable package. The app is still not running.'],
        [Container, 'Container', 'Running copy', 'Docker starts the image. Now the application process is running.'],
      ],
      check: 'If this container stops, what can start the app again?', answer: 'The same image can create a new container.'
    },
    ta: {
      eyebrow: 'CONCEPT LAB 01', title: 'One app எப்படி container ஆகுது?', prompt: 'ஒவ்வொரு stage-ஐயும் select பண்ணுங்க. App ready package-ஆ இருக்கிறதா, real-ஆ run ஆகிறதா என்று கவனிங்க.',
      steps: [
        [FileCode2, 'Dockerfile', 'Recipe', 'App package எப்படி prepare ஆகணும் என்று சொல்லும். இன்னும் app run ஆகவில்லை.'],
        [Box, 'Image', 'Ready package', 'Docker build finish செய்து reusable package save பண்ணும். இன்னும் app run ஆகவில்லை.'],
        [Container, 'Container', 'Running copy', 'Docker image-ஐ start பண்ணும். இப்போதுதான் app real-ஆ run ஆகுது.'],
      ],
      check: 'இந்த container stop ஆனால் app-ஐ மறுபடியும் எதிலிருந்து start பண்ணலாம்?', answer: 'Same image-லிருந்து new container start பண்ணலாம்.'
    }
  },
  buildRun: {
    en: {
      eyebrow: 'CONCEPT LAB 02', title: 'Build once, then run the result', prompt: 'Follow the command and observe what Docker creates.',
      steps: [[FileCode2,'docker build','Creates an image','Docker reads the Dockerfile and prepares python-health:1.0.'],[Play,'docker run','Creates a container','Docker starts one running copy from python-health:1.0.'],[Globe2,'Browser check','Proves reachability','Opening /health confirms that the running app can answer.']],
      check: 'After changing app.py, is docker run alone enough?', answer: 'No. Rebuild the image first, then start a new container.'
    },
    ta: {
      eyebrow: 'CONCEPT LAB 02', title: 'First build; next run', prompt: 'Command select பண்ணி Docker என்ன create பண்ணுது என்று பாருங்க.',
      steps: [[FileCode2,'docker build','Image create ஆகும்','Dockerfile-ஐ read பண்ணி python-health:1.0 package prepare பண்ணும்.'],[Play,'docker run','Container create ஆகும்','python-health:1.0 image-லிருந்து one running copy start ஆகும்.'],[Globe2,'Browser check','App answer வருதா?','/health open பண்ணி running app response கொடுக்குதா என்று check பண்ணுவோம்.']],
      check: 'app.py change செய்த பிறகு docker run மட்டும் போதுமா?', answer: 'போதாது. First image rebuild பண்ணி, new container start பண்ணணும்.'
    }
  },
  runtime: {
    en: {
      eyebrow: 'CONCEPT LAB 03', title: 'Three problems, three separate tools', prompt: 'Choose the learner’s problem before choosing the Docker feature.',
      steps: [[Globe2,'Reach the app','Port','Connect the laptop address to the application address inside the container.'],[Database,'Keep important data','Volume','Keep selected data outside the replaceable container.'],[KeyRound,'Change a setting','Environment variable','Give the same image a different setting when it starts.']],
      check: 'Which feature keeps uploaded files after a container is replaced?', answer: 'A volume, or another external storage service.'
    },
    ta: {
      eyebrow: 'CONCEPT LAB 03', title: 'Three problems; three different tools', prompt: 'Docker feature choose பண்ணுவதற்கு முன்னாடி actual problem என்ன என்று select பண்ணுங்க.',
      steps: [[Globe2,'App-ஐ reach பண்ணணும்','Port','Laptop address-ஐ container app address-க்கு connect பண்ணும்.'],[Database,'Important data save ஆகணும்','Volume','Container replace ஆனாலும் selected data outside-ல் safe-ஆ இருக்கும்.'],[KeyRound,'Setting change பண்ணணும்','Environment variable','Same image start ஆகும்போது different setting கொடுக்கலாம்.']],
      check: 'Container replace ஆன பிறகும் uploaded files இருக்க எந்த feature help பண்ணும்?', answer: 'Volume அல்லது external storage service.'
    }
  },
  compose: {
    en: {
      eyebrow: 'CONCEPT LAB 04', title: 'Connect a small application team', prompt: 'Select a service to see whom it calls. Inside Compose, service names act like contact names.',
      steps: [[Globe2,'Frontend','Calls backend:8000','The browser-facing screen sends work to the backend service.'],[Server,'Backend','Calls postgres:5432','The API uses the database service name—not localhost.'],[Database,'Postgres','Keeps order data','The database has one focused responsibility.'],[Network,'Compose','Starts the team','One file records how the services work together.']],
      check: 'From the backend container, should the database address be localhost?', answer: 'No. Use the Compose service name, such as postgres.'
    },
    ta: {
      eyebrow: 'CONCEPT LAB 04', title: 'Small app team-ஐ connect பண்ணலாம்', prompt: 'Service select பண்ணி அது யாரை call பண்ணுது என்று பாருங்க. Compose-க்குள் service name contact name மாதிரி work ஆகும்.',
      steps: [[Globe2,'Frontend','backend:8000 call பண்ணும்','User பார்க்கும் screen work-ஐ backend service-க்கு அனுப்பும்.'],[Server,'Backend','postgres:5432 call பண்ணும்','API database service name use பண்ணும்; localhost இல்லை.'],[Database,'Postgres','Order data save பண்ணும்','Database one clear job மட்டும் handle பண்ணும்.'],[Network,'Compose','Team-ஐ start பண்ணும்','Services எப்படி together work ஆகணும் என்று one file record பண்ணும்.']],
      check: 'Backend container-லிருந்து database address localhost-ஆ இருக்கணுமா?', answer: 'வேண்டாம். postgres மாதிரி Compose service name use பண்ணணும்.'
    }
  },
  deploy: {
    en: {
      eyebrow: 'CONCEPT LAB 05', title: 'Decide what belongs inside the image', prompt: 'Open each boundary before releasing an AI application.',
      steps: [[Box,'Inside image','Code + dependencies','Package repeatable application files in the versioned image.'],[KeyRound,'Outside image','API keys + settings','Provide secrets when the container starts; never bake them into the image.'],[CheckCircle2,'Release checks','Health + safety + cost','A running container is not enough; verify useful and controlled behaviour.'],[Sparkles,'Deployment','Small release first','Send limited traffic, observe evidence and keep a rollback version.']],
      check: 'Should an LLM API key be copied into the Docker image?', answer: 'No. Inject it at runtime through the deployment platform’s secret system.'
    },
    ta: {
      eyebrow: 'CONCEPT LAB 05', title: 'Image-க்குள் என்ன போகணும்?', prompt: 'AI app release பண்ணுவதற்கு முன்னாடி ஒவ்வொரு boundary-யும் open பண்ணி பாருங்க.',
      steps: [[Box,'Inside image','Code + dependencies','Repeatable app files-ஐ versioned image-க்குள் package பண்ணலாம்.'],[KeyRound,'Outside image','API keys + settings','Container start ஆகும்போது secret கொடுக்கணும்; image-க்குள் copy பண்ணக்கூடாது.'],[CheckCircle2,'Release checks','Health + safety + cost','Container run ஆகுது மட்டும் enough இல்லை; useful answer controlled-ஆ வருதா check பண்ணணும்.'],[Sparkles,'Deployment','Small release first','First limited traffic அனுப்பி result observe பண்ணி rollback version ready-ஆ வைத்திருக்கணும்.']],
      check: 'LLM API key-ஐ Docker image-க்குள் copy பண்ணலாமா?', answer: 'கூடாது. Deployment platform secret system மூலம் runtime-ல் கொடுக்கணும்.'
    }
  }
} as const;

const simulations = {
  imageContainer: {
    en: [
      ['Build image','docker build -t order-app:1.0 .','Docker reads the Dockerfile','Image created: order-app:1.0','IMAGE'],
      ['Start container','docker run --name order-api order-app:1.0','Docker uses the saved image','Container running: order-api','CONTAINER'],
    ],
    ta: [
      ['Image build பண்ணு','docker build -t order-app:1.0 .','Dockerfile instructions read ஆகுது','Image ready: order-app:1.0','IMAGE'],
      ['Container start பண்ணு','docker run --name order-api order-app:1.0','Saved image use ஆகுது','Container running: order-api','CONTAINER'],
    ],
  },
  buildRun: {
    en: [['Build the app','docker build -t delivery-status:1.0 .','Installing the recorded dependencies','Image ready: delivery-status:1.0','IMAGE'],['Run and check','docker run -p 8000:8000 delivery-status:1.0','Starting the application process','Healthy response: localhost:8000/health','HEALTHY']],
    ta: [['App image build பண்ணு','docker build -t delivery-status:1.0 .','Required libraries install ஆகுது','Image ready: delivery-status:1.0','IMAGE'],['Run செய்து check பண்ணு','docker run -p 8000:8000 delivery-status:1.0','Application process start ஆகுது','Healthy response: localhost:8000/health','HEALTHY']],
  },
  runtime: {
    en: [['Open the app door','docker run -p 8080:8000 delivery-status:1.0','Connecting laptop 8080 to container 8000','Browser can reach localhost:8080','PORT'],['Attach safe storage','docker run -v delivery-data:/app/data delivery-status:1.0','Mounting storage outside the container','Volume attached: delivery-data','VOLUME']],
    ta: [['App door open பண்ணு','docker run -p 8080:8000 delivery-status:1.0','Laptop 8080 → container 8000 connect ஆகுது','Browser localhost:8080-ஐ reach பண்ணலாம்','PORT'],['Data notebook attach பண்ணு','docker run -v delivery-data:/app/data delivery-status:1.0','Container outside storage mount ஆகுது','Volume attached: delivery-data','VOLUME']],
  },
  compose: {
    en: [['Start the app team','docker compose up --build','Creating the private network and services','order-api and postgres are running','2 SERVICES'],['Check the team','docker compose ps','Reading each service state','Both services report running','READY']],
    ta: [['App team start பண்ணு','docker compose up --build','Private network மற்றும் services create ஆகுது','order-api + postgres running','2 SERVICES'],['Team status check பண்ணு','docker compose ps','ஒவ்வொரு service state-ம் read ஆகுது','Both services running','READY']],
  },
  deploy: {
    en: [['Validate the image','docker run --read-only support-app:1.0','Checking the versioned application package','Image starts without a baked-in secret','VALID'],['Release safely','deploy support-app:1.0 --traffic 10%','Sending limited traffic first','Release observed; rollback remains ready','10% LIVE']],
    ta: [['Image validate பண்ணு','docker run --read-only support-app:1.0','Versioned app package check ஆகுது','Secret இல்லாமல் image start ஆகுது','VALID'],['Safe release பண்ணு','deploy support-app:1.0 --traffic 10%','First limited traffic மட்டும் அனுப்புது','Release observe ஆகுது; rollback ready','10% LIVE']],
  },
} as const;

export function DockerConceptLab({concept,language='en'}:{concept:Concept;language?:Language}) {
  const lab=labs[concept][language];
  const [active,setActive]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const [simStep,setSimStep]=useState(0);
  const [running,setRunning]=useState(false);
  const [completed,setCompleted]=useState<number[]>([]);
  const step=lab.steps[active];
  const Icon=step[0];
  const sim=simulations[concept][language];
  const currentSim=sim[simStep];
  useEffect(()=>()=>setRunning(false),[]);
  const execute=()=>{
    if(running)return;
    setRunning(true);
    window.setTimeout(()=>{
      setRunning(false);
      setCompleted(previous=>previous.includes(simStep)?previous:[...previous,simStep]);
    },1100);
  };
  const reset=()=>{setSimStep(0);setRunning(false);setCompleted([])};
  return <section className="docker-concept-lab" aria-label={lab.title}>
    <header><small>{lab.eyebrow}</small><h3>{lab.title}</h3><p>{lab.prompt}</p></header>
    <div className="docker-concept-track">{lab.steps.map((item,index)=>{const StepIcon=item[0];return <button key={item[1]} type="button" className={index===active?'active':''} onClick={()=>{setActive(index);setRevealed(false)}}><span>{index+1}</span><StepIcon/><b>{item[1]}</b>{index<lab.steps.length-1&&<ArrowRight/>}</button>})}</div>
    <div className="docker-concept-focus"><span><Icon/></span><div><small>{step[2]}</small><p>{step[3]}</p></div></div>
    <div className="docker-command-simulator">
      <header><div><TerminalSquare/><span><small>GUIDED COMMAND SIMULATION</small><b>{language==='ta'?'Command run பண்ணி result பாருங்க':'Run a command and watch what Docker creates'}</b></span></div><i>LEARNING MODE</i></header>
      <div className="docker-sim-workspace">
        <nav>{sim.map((item,index)=><button type="button" key={item[0]} className={index===simStep?'active':''} disabled={index>0&&!completed.includes(index-1)} onClick={()=>setSimStep(index)}><span>{completed.includes(index)?<CheckCircle2/>:index+1}</span>{item[0]}</button>)}</nav>
        <section className="docker-sim-terminal"><div><i/><i/><i/><small>SIMULATED TERMINAL</small></div><code><em>$</em> {currentSim[1]}</code><p className={running?'running':''}>{running?<><LoaderCircle/>{currentSim[2]}...</>:completed.includes(simStep)?<><CheckCircle2/>{currentSim[3]}</>:language==='ta'?'Execute click பண்ணுங்க — real system change ஆகாது':'Click execute — no real system changes are made'}</p><button type="button" onClick={execute} disabled={running||completed.includes(simStep)}>{running?<><LoaderCircle/>Running...</>:completed.includes(simStep)?<><CheckCircle2/>Completed</>:<><Play/>Execute</>}</button></section>
        <section className={`docker-sim-output ${completed.includes(simStep)?'created':''}`}><span>{completed.includes(simStep)?<CheckCircle2/>:<Box/>}</span><small>DOCKER OUTPUT</small><strong>{completed.includes(simStep)?currentSim[4]:'WAITING'}</strong><p>{completed.includes(simStep)?currentSim[3]:language==='ta'?'Command execute ஆன பிறகு result இங்கே வரும்':'The created object will appear here'}</p></section>
      </div>
      <footer><span>{language==='ta'?'இது browser learning simulation; உங்கள் computer-ல் command execute ஆகாது.':'Browser learning simulation — this does not execute on your computer.'}</span><button type="button" onClick={reset}><RotateCcw/>Reset</button></footer>
    </div>
    <div className="docker-concept-check"><div><small>QUICK PREDICTION</small><b>{lab.check}</b></div><button type="button" onClick={()=>setRevealed(v=>!v)}>{revealed?'Hide answer':'Check answer'}</button>{revealed&&<p><CheckCircle2/>{lab.answer}</p>}</div>
  </section>;
}
