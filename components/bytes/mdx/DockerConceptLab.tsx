'use client';

import { useState } from 'react';
import { ArrowRight, Box, CheckCircle2, Container, Database, FileCode2, Globe2, KeyRound, Network, Play, Server, Sparkles } from 'lucide-react';

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

export function DockerConceptLab({concept,language='en'}:{concept:Concept;language?:Language}) {
  const lab=labs[concept][language];
  const [active,setActive]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const step=lab.steps[active];
  const Icon=step[0];
  return <section className="docker-concept-lab" aria-label={lab.title}>
    <header><small>{lab.eyebrow}</small><h3>{lab.title}</h3><p>{lab.prompt}</p></header>
    <div className="docker-concept-track">{lab.steps.map((item,index)=>{const StepIcon=item[0];return <button key={item[1]} type="button" className={index===active?'active':''} onClick={()=>{setActive(index);setRevealed(false)}}><span>{index+1}</span><StepIcon/><b>{item[1]}</b>{index<lab.steps.length-1&&<ArrowRight/>}</button>})}</div>
    <div className="docker-concept-focus"><span><Icon/></span><div><small>{step[2]}</small><p>{step[3]}</p></div></div>
    <div className="docker-concept-check"><div><small>QUICK PREDICTION</small><b>{lab.check}</b></div><button type="button" onClick={()=>setRevealed(v=>!v)}>{revealed?'Hide answer':'Check answer'}</button>{revealed&&<p><CheckCircle2/>{lab.answer}</p>}</div>
  </section>;
}
