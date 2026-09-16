'use client';

import { useMemo, useState } from 'react';
import { Bot, CheckCircle2, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

const actions = [
  { label: 'Answer from an FAQ', result: 'Chatbot', note: 'It responds, but it does not inspect a live system or complete work.' },
  { label: 'Compare options with you', result: 'Copilot', note: 'It assists while you continue to drive the workflow.' },
  { label: 'Check stock and prepare an order', result: 'AI agent', note: 'It uses an authorised tool and moves a bounded outcome forward.' },
];

export function AgentRoleLab() {
  const [choice, setChoice] = useState<number | null>(null);
  return <Lab title="Reply or resolve?" eyebrow="BYTE 01 · ROLE EXPLORER" onReset={() => setChoice(null)}>
    <p>Karthik receives a WhatsApp question: “Is the blue notebook available?” Choose what the system does.</p>
    <div className="agent-lab-options">{actions.map((item, index) => <button aria-pressed={choice === index} onClick={() => setChoice(index)} key={item.label}>{item.label}</button>)}</div>
    <Result>{choice === null ? 'Select an action to identify the system.' : <><b>{actions[choice].result}</b><span>{actions[choice].note}</span></>}</Result>
  </Lab>;
}

const loop = ['Perceive the request', 'Plan the next step', 'Use an authorised tool', 'Observe the result', 'Complete or replan'];
export function AgentLoopLab() {
  const [step, setStep] = useState(0);
  return <Lab title="Follow the agent’s decision loop" eyebrow="BYTE 02 · LIVE TRACE" onReset={() => setStep(0)}>
    <p>Goal: prepare a customer meeting brief from approved project notes.</p>
    <div className="agent-loop-track">{loop.map((label, index) => <button className={index === step ? 'active' : index < step ? 'done' : ''} onClick={() => setStep(index)} key={label}><i>{index + 1}</i><span>{label}</span></button>)}</div>
    <Result><b>Current decision</b><span>{step === 0 ? 'Identify the requested outcome and boundaries.' : step === 1 ? 'Break the outcome into evidence-gathering steps.' : step === 2 ? 'Search only the approved project source.' : step === 3 ? 'Check whether the tool returned current, usable evidence.' : 'Stop if complete; otherwise replan or ask a person.'}</span></Result>
  </Lab>;
}

export function AgentFitLab() {
  const [repeat, setRepeat] = useState(2); const [time, setTime] = useState(2); const [risk, setRisk] = useState(0);
  const score = repeat + time - risk;
  const verdict = score >= 3 ? 'Strong pilot candidate' : score >= 1 ? 'Investigate before piloting' : 'Use normal automation or keep human-led';
  return <Lab title="Which workflow is worth piloting?" eyebrow="BYTE 03 · USE-CASE SCORER" onReset={() => { setRepeat(2); setTime(2); setRisk(0); }}>
    <div className="agent-score-grid"><Range label="Repetition" value={repeat} set={setRepeat}/><Range label="Time consumed" value={time} set={setTime}/><Range label="Mistake risk" value={risk} set={setRisk}/></div>
    <Result><b>{verdict}</b><span>{score >= 3 ? 'High repetition and time with low risk is a sensible place to start small.' : 'Clarify the workflow, data and consequences before adding an agent.'}</span></Result>
  </Lab>;
}

export function AgentGuardrailLab() {
  const [access, setAccess] = useState(0); const [approval, setApproval] = useState(true); const [logs, setLogs] = useState(true);
  const risk = Math.max(0, access * 2 + (approval ? -2 : 2) + (logs ? -1 : 1));
  return <Lab title="Stop the unsafe order" eyebrow="BYTE 04 · GUARDRAIL SANDBOX" onReset={() => { setAccess(0); setApproval(true); setLogs(true); }}>
    <div className="agent-guardrail-grid"><label>Agent access<select value={access} onChange={e => setAccess(Number(e.target.value))}><option value={0}>Read stock only</option><option value={1}>Prepare order</option><option value={2}>Place and pay</option></select></label><Toggle label="Human approval" value={approval} set={setApproval}/><Toggle label="Activity log" value={logs} set={setLogs}/></div>
    <div className={`agent-risk-meter risk-${Math.min(3, risk)}`}><span style={{ width: `${Math.min(100, 24 + risk * 16)}%` }}/></div>
    <Result><b>{risk <= 0 ? 'Controlled' : risk <= 2 ? 'Review required' : 'High risk'}</b><span>{risk <= 0 ? 'The agent can read and prepare while consequential action stays human-controlled.' : 'Reduce access or add explicit approval and evidence logging.'}</span></Result>
  </Lab>;
}

export function AgentPilotLab() {
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false]);
  const stages = ['Identify one low-risk task', 'Try it manually', 'Pilot with human review', 'Review evidence', 'Scale only after success'];
  const completed = done.filter(Boolean).length;
  return <Lab title="Build your first safe pilot" eyebrow="BYTE 05 · ACTION PLANNER" onReset={() => setDone([false, false, false, false, false])}>
    <div className="agent-pilot-list">{stages.map((label, index) => <button className={done[index] ? 'done' : ''} onClick={() => setDone(items => items.map((item, i) => i === index ? !item : item))} key={label}><CheckCircle2/><span><b>0{index + 1}</b>{label}</span></button>)}</div>
    <Result><b>{completed}/5 stages ready</b><span>{completed === 5 ? 'Your pilot has a measurable path. Set dates and an owner before starting.' : 'Complete each stage to turn an idea into a controlled experiment.'}</span></Result>
  </Lab>;
}

export function AgentStoryVisual({ variant }: { variant:'role'|'loop'|'work'|'risk'|'pilot' }) {
  if (variant === 'role') return <figure className="agent-story agent-story-role"><header><small>FROM RESPONSE TO OUTCOME</small><strong>Watch responsibility increase</strong></header><div><span><b>Customer asks</b><small>“Is it in stock?”</small></span><i>→</i><span><b>System checks</b><small>Authorised inventory</small></span><i>→</i><span><b>Human approves</b><small>Before order or payment</small></span></div><figcaption>Conversation becomes agentic only when the system can choose and verify bounded actions.</figcaption></figure>;
  if (variant === 'loop') return <figure className="agent-story agent-story-loop"><header><small>ADAPTIVE DECISION PATH</small><strong>The result changes the next step</strong></header><div><span>Goal</span><span>Choose</span><span>Tool</span><span>Observe</span><span>Replan</span></div><figcaption>A fixed workflow follows a script. An agent uses each observation to continue, retry, ask or stop.</figcaption></figure>;
  if (variant === 'work') return <figure className="agent-story agent-story-work"><header><small>USE-CASE LANDSCAPE</small><strong>Match the agent to the work</strong></header><div><span><b>Customer</b><small>Support · orders</small></span><span><b>Operations</b><small>HR · service desk</small></span><span><b>Research</b><small>Evidence · briefs</small></span><span><b>Software</b><small>Code · tests</small></span></div><figcaption>The best pilot is not the most complex—it is the easiest useful workflow to measure safely.</figcaption></figure>;
  if (variant === 'risk') return <figure className="agent-story agent-story-risk"><header><small>DEFENCE IN DEPTH</small><strong>One prompt is not a guardrail</strong></header><div><span>Approved data</span><span>Least privilege</span><span>Validation</span><span>Human approval</span><b>Safe action</b></div><figcaption>Independent controls reduce the chance that one model or tool failure becomes business harm.</figcaption></figure>;
  return <figure className="agent-story agent-story-pilot"><header><small>PILOT MATURITY</small><strong>Earn autonomy with evidence</strong></header><div><span><i>01</i><b>Identify</b></span><span><i>02</i><b>Try</b></span><span><i>03</i><b>Pilot</b></span><span><i>04</i><b>Review</b></span><span><i>05</i><b>Scale</b></span></div><figcaption>Each stage produces evidence for the next decision. Scaling is earned, not assumed.</figcaption></figure>;
}

function Range({ label, value, set }: { label:string; value:number; set:(value:number)=>void }) { return <label><span>{label}</span><input aria-label={label} type="range" min="0" max="2" value={value} onChange={e => set(Number(e.target.value))}/><small>{['Low','Medium','High'][value]}</small></label>; }
function Toggle({ label, value, set }: { label:string; value:boolean; set:(value:boolean)=>void }) { return <button className={`agent-toggle ${value ? 'on' : ''}`} aria-pressed={value} onClick={() => set(!value)}><span>{label}</span><i>{value ? 'ON' : 'OFF'}</i></button>; }
function Result({ children }: { children:React.ReactNode }) { return <div className="agent-lab-result" aria-live="polite"><Sparkles/>{typeof children === 'string' ? <span>{children}</span> : children}</div>; }
function Lab({ title, eyebrow, onReset, children }: { title:string; eyebrow:string; onReset:()=>void; children:React.ReactNode }) {
  return <section className="agent-learning-lab"><header><span><Bot/><small>{eyebrow}</small><strong>{title}</strong></span><button onClick={onReset}><RotateCcw/>Reset</button></header><div className="agent-lab-body">{children}</div><footer><ShieldCheck/>Guided practice · no external action is performed</footer></section>;
}
