export type Handbook = {
  slug: string;
  title: string;
  shortTitle: string;
  audience: string;
  description: string;
  promise: string;
  tone: string;
  status: 'available' | 'in-development';
  chapters: { title: string; outcome: string; href?: string }[];
};

export const handbooks: Handbook[] = [
  {
    slug: 'github-copilot', title: 'The GitHub Copilot Handbook', shortTitle: 'GitHub Copilot', audience: 'Developers', tone: 'blue', status: 'available',
    description: 'Use Copilot as an engineering partner—from context and feature work to debugging, testing and safer delivery.',
    promise: 'Move beyond code completion and build a repeatable AI-assisted engineering workflow.',
    chapters: [
      { title: 'How developers use AI tools', outcome: 'Choose the right mode for the task.', href: '/software-engineering/62-how-developers-use-ai-tools/' },
      { title: 'Context engineering', outcome: 'Give Copilot the information it needs.', href: '/software-engineering/63-api-first-thinking/' },
      { title: 'AI-assisted feature workflow', outcome: 'Plan, build and verify a feature.', href: '/software-engineering/66-ai-assisted-coding-workflow/' },
      { title: 'Debug, test and refactor', outcome: 'Use evidence to find and fix problems.', href: '/software-engineering/64-debugging-ai-generated-code/' },
      { title: 'Responsible AI coding', outcome: 'Protect security, quality and ownership.', href: '/software-engineering/75-secure-ai-coding/' },
    ],
  },
  {
    slug: 'generative-ai', title: 'Generative AI for Everyone', shortTitle: 'Generative AI', audience: 'Beginners · Non-tech', tone: 'cyan', status: 'in-development',
    description: 'Understand what generative AI creates, how it learns patterns and where it fits in everyday work.',
    promise: 'Build an accurate mental model without mathematics, jargon or product hype.',
    chapters: [
      { title: 'What generative AI really does', outcome: 'Separate generation from search and prediction.' },
      { title: 'How an LLM produces an answer', outcome: 'Follow tokens, context and next-token prediction.' },
      { title: 'Prompts, context and better results', outcome: 'Turn a vague request into a useful brief.' },
      { title: 'Hallucinations, limits and verification', outcome: 'Know when and how to check an answer.' },
      { title: 'Everyday GenAI workflows', outcome: 'Apply AI safely to documents, ideas and analysis.' },
    ],
  },
  {
    slug: 'ai-agents', title: 'AI Agents Explained', shortTitle: 'AI Agents', audience: 'Beginners · Builders', tone: 'violet', status: 'in-development',
    description: 'See how a model can use tools, observe results and take the next useful action toward a goal.',
    promise: 'Understand the agent loop through familiar real-world analogies and visual workflows.',
    chapters: [
      { title: 'From chatbot to agent', outcome: 'Recognise the difference between answering and acting.' },
      { title: 'The goal–tool–action loop', outcome: 'Visualise how an agent completes work.' },
      { title: 'Tools, memory and knowledge', outcome: 'Understand what extends a model.' },
      { title: 'A practical support agent', outcome: 'Trace one agent from request to resolution.' },
      { title: 'Boundaries, approvals and failure', outcome: 'Design safer stopping and escalation rules.' },
    ],
  },
  {
    slug: 'agentic-ai', title: 'Agentic AI Systems Handbook', shortTitle: 'Agentic AI', audience: 'Builders · Leaders', tone: 'indigo', status: 'in-development',
    description: 'Choose between a single prompt, a fixed workflow and an autonomous agent—then design the right system.',
    promise: 'Learn agentic patterns without adding complexity before it creates measurable value.',
    chapters: [
      { title: 'Workflow or agent?', outcome: 'Select predictability or flexibility deliberately.' },
      { title: 'Prompt chaining and routing', outcome: 'Build dependable multi-step flows.' },
      { title: 'Parallel and orchestrator patterns', outcome: 'Divide complex work effectively.' },
      { title: 'Evaluation and recovery loops', outcome: 'Measure progress and correct failures.' },
      { title: 'Production guardrails', outcome: 'Control cost, permissions and autonomy.' },
    ],
  },
  {
    slug: 'agi', title: 'Artificial General Intelligence, Clearly Explained', shortTitle: 'AGI', audience: 'Everyone', tone: 'amber', status: 'in-development',
    description: 'Understand what people mean by AGI, how it differs from today’s systems and why definitions matter.',
    promise: 'Replace headlines and speculation with careful concepts, evidence and uncertainty.',
    chapters: [
      { title: 'AI, narrow AI and AGI', outcome: 'Use the terms accurately.' },
      { title: 'Capability is not consciousness', outcome: 'Separate performance from human-like experience.' },
      { title: 'How AGI might be evaluated', outcome: 'Compare tasks, generalisation and autonomy.' },
      { title: 'Claims, forecasts and uncertainty', outcome: 'Read AGI news without falling for hype.' },
      { title: 'Opportunity, risk and governance', outcome: 'Discuss impact with balance and precision.' },
    ],
  },
  {
    slug: 'ai-foundations-non-tech', title: 'AI Foundations for Non‑Tech Professionals', shortTitle: 'AI for Non‑Tech', audience: 'Students · Professionals', tone: 'green', status: 'in-development',
    description: 'Use AI confidently at work without coding—from asking better questions to checking and improving outputs.',
    promise: 'Develop practical AI judgement for everyday decisions, communication and productivity.',
    chapters: [
      { title: 'The AI vocabulary that matters', outcome: 'Explain models, prompts and context simply.' },
      { title: 'Turn work into an AI-ready task', outcome: 'Identify inputs, outcome and constraints.' },
      { title: 'A reliable prompting framework', outcome: 'Write instructions that reduce ambiguity.' },
      { title: 'Verify before you use', outcome: 'Check facts, privacy and business fit.' },
      { title: 'Build your personal AI workflow', outcome: 'Combine judgement with repeatable assistance.' },
    ],
  },
  {
    slug: 'forward-deployed-engineer', title: 'Forward Deployed Engineer Handbook', shortTitle: 'FDE', audience: 'Engineers · Consultants', tone: 'orange', status: 'available',
    description: 'Connect customer problems, product capability and production delivery in one field-facing engineering role.',
    promise: 'Understand the job through discovery, architecture, delivery and measurable adoption.',
    chapters: [
      { title: 'What an FDE actually does', outcome: 'Distinguish FDE from consultant and product engineer.', href: '/forward-deployed-engineer/01-what-does-a-forward-deployed-engineer-do/' },
      { title: 'Problem discovery in the field', outcome: 'Turn ambiguity into testable requirements.', href: '/forward-deployed-engineer/02-problem-discovery-and-workflow-mapping/' },
      { title: 'Design the thin production slice', outcome: 'Choose the smallest valuable architecture.', href: '/forward-deployed-engineer/03-design-thin-production-slice/' },
      { title: 'Deploy, observe and adapt', outcome: 'Learn from real users and system evidence.', href: '/forward-deployed-engineer/04-deploy-observe-and-improve/' },
      { title: 'From delivery to reusable product', outcome: 'Convert field learning into product leverage.', href: '/forward-deployed-engineer/05-turn-field-learning-into-product/' },
    ],
  },
  {
    slug: 'devops-ai-era', title: 'DevOps in the AI Era', shortTitle: 'AI-era DevOps', audience: 'Developers · DevOps', tone: 'teal', status: 'in-development',
    description: 'Evolve CI/CD, operations and platform engineering for AI-generated code and AI-enabled applications.',
    promise: 'Keep delivery fast without surrendering reliability, security or operational understanding.',
    chapters: [
      { title: 'What AI changes in DevOps', outcome: 'Identify where work accelerates and risk shifts.' },
      { title: 'AI-assisted CI/CD', outcome: 'Generate carefully and verify automatically.' },
      { title: 'Operating AI applications', outcome: 'Monitor models, prompts, cost and drift.' },
      { title: 'AIOps without blind automation', outcome: 'Use signals and approval boundaries well.' },
      { title: 'The AI-ready platform team', outcome: 'Create paved roads for safe experimentation.' },
    ],
  },
  {
    slug: 'claude-code', title: 'The Claude Code Handbook', shortTitle: 'Claude Code', audience: 'Developers', tone: 'rose', status: 'in-development',
    description: 'Work with an agentic coding tool across your terminal, IDE and repository while staying in control of changes.',
    promise: 'Use Claude Code as a disciplined workflow—not a one-line code generator.',
    chapters: [
      { title: 'How Claude Code works', outcome: 'Understand codebase context, tools and permissions.' },
      { title: 'Project context with CLAUDE.md', outcome: 'Make architecture and standards explicit.' },
      { title: 'Plan, edit, test and inspect', outcome: 'Run a controlled feature workflow.' },
      { title: 'MCP, skills and hooks', outcome: 'Connect tools and automate repeatable checks.' },
      { title: 'Teams, CI and safe automation', outcome: 'Scale usage without losing governance.' },
    ],
  },
];

export function getHandbook(slug: string) { return handbooks.find((handbook) => handbook.slug === slug); }
