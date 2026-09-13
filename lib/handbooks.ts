export type Handbook = {
  slug: string; title: string; shortTitle: string; audience: string;
  description: string; promise: string; tone: string; status: 'available';
  chapters: { title: string; outcome: string; href: string }[];
};

export const handbooks: Handbook[] = [
  {
    slug: 'github-copilot', title: 'The GitHub Copilot Handbook', shortTitle: 'GitHub Copilot',
    audience: 'Developers', tone: 'blue', status: 'available',
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
    slug: 'forward-deployed-engineer', title: 'The Forward Deployed Engineer Handbook', shortTitle: 'FDE',
    audience: 'Engineers · Consultants', tone: 'orange', status: 'available',
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
];

export function getHandbook(slug: string) { return handbooks.find((handbook) => handbook.slug === slug); }
