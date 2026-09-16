'use client';

import { useState } from 'react';
import { ArrowRight, Check, CirclePlay, Lightbulb, Route, Target } from 'lucide-react';

type Handbook = 'docker' | 'python' | 'langchain';

type Lesson = {
  title: string;
  question: string;
  without: string;
  action: string;
  result: string;
  prerequisite: string;
  steps: string[];
};

const journeys: Record<Handbook, { label: string; promise: string; bytes: Lesson[] }> = {
  docker: {
    label: 'Docker from zero to deployment',
    promise: 'Package one Python application once, run it consistently, connect its services and release it safely.',
    bytes: [
      { title: 'Why containers exist', question: 'Why does an app work on one laptop and fail on another?', without: 'The code travels, but its Python version, libraries and system setup do not.', action: 'Package the code and its runtime as an image, then start a container from it.', result: 'The same packaged app starts with the same dependencies on another machine.', prerequisite: 'You only need to know that an application uses code and installed libraries.', steps: ['See the setup mismatch', 'Separate image from container', 'Run one container', 'Explain the result'] },
      { title: 'Build your first image', question: 'How do we write a repeatable recipe for the application?', without: 'Every teammate follows a different installation document and small differences cause failures.', action: 'Write a Dockerfile, build an image and run the packaged Python app.', result: 'A teammate can reproduce the app with Docker instead of rebuilding the environment manually.', prerequisite: 'Byte 01: image is the package; container is its running instance.', steps: ['Read the app', 'Write the recipe', 'Build the image', 'Run and verify'] },
      { title: 'Give the container connections and memory', question: 'How can a container receive traffic, keep data and read configuration?', without: 'The app may run, but users cannot reach it, data disappears and settings are hard-coded.', action: 'Add a port mapping, a volume and environment variables—one concern at a time.', result: 'The app becomes reachable, persistent and configurable without rebuilding it.', prerequisite: 'Byte 02: you can build and run a single application image.', steps: ['Expose the service', 'Pass configuration', 'Persist data', 'Test each boundary'] },
      { title: 'Run cooperating services', question: 'How do an API and database start and communicate as one application?', without: 'Long docker run commands become fragile and developers connect services differently.', action: 'Describe services, networks, volumes and startup settings in Docker Compose.', result: 'One command starts a repeatable multi-container development environment.', prerequisite: 'Byte 03: ports, volumes, environment variables and container networking have different jobs.', steps: ['Name the services', 'Create shared network', 'Add persistent data', 'Start and inspect'] },
      { title: 'Move from local container to service', question: 'What changes before a container can serve real users?', without: 'A local demo lacks a registry, secret handling, health checks and a safe release path.', action: 'Build an immutable image, scan it, publish it, deploy it and observe its health.', result: 'The AI API has a traceable artifact and a controlled route to production.', prerequisite: 'Bytes 01–04: package, configure and connect containerised services.', steps: ['Harden the image', 'Publish artifact', 'Deploy with secrets', 'Observe and roll back'] },
    ],
  },
  python: {
    label: 'Python for GenAI and Agentic AI',
    promise: 'Build one learning assistant from basic Python logic to a tested, deployable AI service.',
    bytes: [
      { title: 'Teach the computer a clear decision', question: 'How does Python turn a learner request into a predictable result?', without: 'A computer cannot infer our intention; it needs values, rules and reusable steps.', action: 'Store data, make a decision and place repeated logic inside a function.', result: 'A small course recommendation runs and returns the same result for the same input.', prerequisite: 'No coding experience required; we explain every line before adding the next.', steps: ['Store a value', 'Check a condition', 'Call a function', 'Read the output'] },
      { title: 'Connect Python to another service', question: 'How does an application request live information from an API?', without: 'Your program only knows values already written inside its own code.', action: 'Send a request, inspect the status, decode JSON and handle failure safely.', result: 'Python can consume an external service without assuming every response is valid.', prerequisite: 'Byte 01: variables, dictionaries, functions and errors.', steps: ['Create request', 'Receive response', 'Validate status', 'Use JSON safely'] },
      { title: 'Build an AI feature—not just a prompt', question: 'What must surround an LLM call before users can trust the feature?', without: 'Free-form model text may ignore required fields, private context or business rules.', action: 'Assemble verified context, request structured output and validate it in Python.', result: 'The course advisor returns a usable recommendation with required fields and checks.', prerequisite: 'Byte 02: Python can call an API and validate a JSON-shaped response.', steps: ['Collect context', 'Call the model', 'Validate structure', 'Present answer'] },
      { title: 'Let the model request bounded tools', question: 'When should an AI application choose an action instead of only writing text?', without: 'The model can describe a calculation or lookup but cannot prove that it performed it.', action: 'Expose small Python tools, record observations and stop or request approval at clear boundaries.', result: 'A learning agent can search and calculate while application code controls real actions.', prerequisite: 'Byte 03: model output is a proposal that Python must validate.', steps: ['Define one tool', 'Choose safely', 'Observe result', 'Stop or approve'] },
      { title: 'Make the application release-ready', question: 'Why is “it worked on my laptop” not enough for an AI service?', without: 'Prompt changes, API failures, leaked secrets and unmeasured quality can reach users.', action: 'Add tests, fixed evaluations, logging, limits, packaging and rollback evidence.', result: 'The assistant has a repeatable release decision instead of an optimistic deployment.', prerequisite: 'Bytes 01–04: Python logic, APIs, an AI feature and bounded tools.', steps: ['Test code', 'Evaluate AI', 'Secure service', 'Deploy and observe'] },
    ],
  },
  langchain: {
    label: 'LangChain from first call to production',
    promise: 'Understand why LangChain exists, then add structured output, retrieval and agents only when the problem requires them.',
    bytes: [
      { title: 'Understand where LangChain fits', question: 'If a provider SDK can call an LLM, why would an application need LangChain?', without: 'One call is simple, but provider-specific code spreads when messages, schemas, retrieval, tools and traces grow.', action: 'Start with one model call, identify the surrounding application jobs and add only the LangChain interface you need.', result: 'You can explain model versus application versus framework—and decide when not to use LangChain.', prerequisite: 'Basic Python function knowledge helps, but every LangChain term is introduced here.', steps: ['Make one model call', 'Find repeated concerns', 'Place LangChain correctly', 'Choose smallest approach'] },
      { title: 'Build a reusable prompt pipeline', question: 'How can the same model task run predictably for many different inputs?', without: 'Hand-built prompt strings spread through the code and free-form replies are difficult for Python to use.', action: 'Connect a prompt template, chat model and typed output as a fixed chain.', result: 'A support message becomes a validated category, priority and explanation object.', prerequisite: 'Byte 01: messages go into a chat model and an AI message comes back.', steps: ['Define variables', 'Build prompt', 'Connect model', 'Validate result'] },
      { title: 'Answer from private documents', question: 'How can an LLM answer from policy pages it was never trained on?', without: 'The model may guess because your current internal documents are outside its knowledge.', action: 'Split documents, create searchable representations, retrieve relevant chunks and include them as evidence.', result: 'The application answers from selected sources and can show where the evidence came from.', prerequisite: 'Byte 02: messages carry context and schemas make results dependable.', steps: ['Prepare documents', 'Index chunks', 'Retrieve evidence', 'Answer with sources'] },
      { title: 'Preserve follow-up context safely', question: 'How does the application understand words such as “it” or “that limit” in the next message?', without: 'Every model call is stateless unless earlier messages are deliberately supplied again.', action: 'Store messages by thread, attach a checkpointer and trim or summarise long histories.', result: 'The assistant understands follow-ups without mixing users or treating chat history as a business database.', prerequisite: 'Byte 03: retrieved documents provide knowledge; memory provides conversation context.', steps: ['Create thread', 'Store messages', 'Resume context', 'Control growth'] },
      { title: 'Build a bounded tool-using agent', question: 'When should the model choose the next step instead of following a fixed chain?', without: 'A model can describe a database lookup but cannot prove that the lookup happened.', action: 'Give an agent narrowly described tools, stop limits and approval boundaries.', result: 'The agent can request a read-only balance lookup while application code controls execution and side effects.', prerequisite: 'Bytes 01–04: models, chains, retrieval and thread memory.', steps: ['Define tools', 'Let agent choose', 'Return observation', 'Stop or approve'] },
    ],
  },
};

export function BeginnerLearningJourney({ handbook, step }: { handbook: Handbook; step: number | string }) {
  const [stage, setStage] = useState(0);
  const journey = journeys[handbook];
  const byteNumber = Math.max(1, Math.min(Number(step) || 1, 5));
  const lesson = journey.bytes[byteNumber - 1];
  const stageLabels = ['The problem', 'What you build', 'Proof it worked'];
  const stageText = [lesson.without, lesson.action, lesson.result];

  return (
    <section className={`beginner-journey beginner-journey--${handbook}`} aria-label={`${journey.label}, Byte ${byteNumber}`}>
      <header className="beginner-journey__header">
        <div><span className="beginner-journey__eyebrow"><Route /> Connected learning path</span><h3>{lesson.title}</h3><p>{journey.promise}</p></div>
        <span className="beginner-journey__byte">Byte {String(byteNumber).padStart(2, '0')} / 05</span>
      </header>

      <div className="beginner-journey__question"><Lightbulb /><div><span>Beginner question</span><strong>{lesson.question}</strong></div></div>

      <div className="beginner-journey__tabs" role="tablist" aria-label="Explore the lesson outcome">
        {stageLabels.map((label, index) => <button key={label} type="button" role="tab" aria-selected={stage === index} onClick={() => setStage(index)}><span>{index + 1}</span>{label}</button>)}
      </div>
      <div className="beginner-journey__stage" role="tabpanel">
        <div className="beginner-journey__stage-icon">{stage === 2 ? <Check /> : stage === 1 ? <CirclePlay /> : <Target />}</div>
        <p>{stageText[stage]}</p>
        {stage < 2 && <button type="button" onClick={() => setStage(stage + 1)}>Show next <ArrowRight /></button>}
      </div>

      <div className="beginner-journey__footer">
        <div><span>Start here</span><p>{lesson.prerequisite}</p></div>
        <ol>{lesson.steps.map((item, index) => <li key={item} className={index === stage ? 'is-active' : ''}><span>{index + 1}</span>{item}</li>)}</ol>
      </div>
    </section>
  );
}
