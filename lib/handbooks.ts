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
  {
    slug: 'docker', title: 'The Docker Handbook', shortTitle: 'Docker',
    audience: 'Beginners · Developers', tone: 'cyan', status: 'available',
    description: 'Understand containers, package a Python application, manage runtime configuration and deploy a practical Generative AI service.',
    promise: 'Move from “works on my machine” to a repeatable container workflow you can explain and troubleshoot.',
    chapters: [
      { title: 'What is Docker?', outcome: 'Distinguish images, containers and virtual machines.', href: '/cloud-devops/01-what-is-docker-containers-explained/' },
      { title: 'Dockerize a Python application', outcome: 'Write a Dockerfile, build an image and run it.', href: '/cloud-devops/02-dockerize-first-python-application/' },
      { title: 'Ports, volumes and environment variables', outcome: 'Connect, persist and configure containers.', href: '/cloud-devops/03-docker-ports-volumes-environment-variables/' },
      { title: 'Multi-container apps with Compose', outcome: 'Run connected services from one configuration.', href: '/cloud-devops/04-multi-container-applications-docker-compose/' },
      { title: 'Deploy a Generative AI application', outcome: 'Package, protect and prepare an LLM app for cloud.', href: '/cloud-devops/05-dockerize-deploy-generative-ai-application/' },
    ],
  },
  {
    slug: 'langchain', title: 'LangChain for GenAI and AI Agents Handbook', shortTitle: 'LangChain',
    audience: 'Python Developers · AI Builders', tone: 'green', status: 'available',
    description: 'Build practical LLM, RAG and agentic AI applications with Python using current LangChain patterns.',
    promise: 'Move from a model call to a grounded, tool-using and observable AI application.',
    chapters: [
      { title: 'What is LangChain?', outcome: 'Place models, messages and structured output in one mental model.', href: '/langchain/01-what-is-langchain-build-llm-applications/' },
      { title: 'Connect Python with LLMs', outcome: 'Configure a model and validate its response.', href: '/langchain/02-connect-python-with-llms-using-langchain/' },
      { title: 'Build RAG with your documents', outcome: 'Load, chunk, embed, retrieve and ground answers.', href: '/langchain/03-build-rag-applications-with-your-documents/' },
      { title: 'Build agents with tools and memory', outcome: 'Create bounded tool use and thread-scoped state.', href: '/langchain/04-build-ai-agents-with-tools-and-memory/' },
      { title: 'Deploy a production application', outcome: 'Add contracts, traces, security and Docker packaging.', href: '/langchain/05-production-ready-langchain-application/' },
    ],
  },
];

export function getHandbook(slug: string) { return handbooks.find((handbook) => handbook.slug === slug); }
