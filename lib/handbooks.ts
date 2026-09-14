export type Handbook = {
  slug: string; title: string; shortTitle: string; audience: string;
  description: string; promise: string; tone: string; status: 'available';
  category: 'ai-application-engineering' | 'cloud-devops' | 'software-engineering' | 'technology-careers';
  label: string;
  chapters: { title: string; outcome: string; href: string }[];
};

export const handbooks: Handbook[] = [
  {
    slug: 'ai-agents', title: 'AI Agents Handbook for Everyone', shortTitle: 'AI Agents',
    audience: 'Non-technical Beginners · Professionals', tone: 'violet', status: 'available', category: 'ai-application-engineering', label: 'FROM ANSWERING TO TAKING ACTION',
    description: 'Understand AI agents through familiar work and life scenarios—without coding or unnecessary technical language.',
    promise: 'Learn what makes an agent different, how it works and where human approval belongs.',
    chapters: [
      { title: 'What is an AI agent?', outcome: 'Distinguish chatbots, copilots and agents.', href: '/ai-agents/01-what-is-an-ai-agent-from-answering-to-taking-action/' },
      { title: 'How an AI agent works', outcome: 'Trace goals, reasoning, tools, actions and completion checks.', href: '/ai-agents/02-how-an-ai-agent-works-goal-reasoning-tools-actions/' },
      { title: 'Tools, knowledge and memory', outcome: 'Understand how agents access systems, evidence and useful context.', href: '/ai-agents/03-tools-knowledge-memory-explained-simply/' },
      { title: 'Build your first AI agent without coding', outcome: 'Create a bounded Personal Workday Assistant with human approval.', href: '/ai-agents/04-build-first-ai-agent-without-coding/' },
      { title: 'Use AI agents safely and responsibly', outcome: 'Apply permissions, privacy, validation, logs and stop rules.', href: '/ai-agents/05-use-ai-agents-safely-responsibly/' },
    ],
  },
  {
    slug: 'github-copilot', title: 'The GitHub Copilot Handbook', shortTitle: 'GitHub Copilot',
    audience: 'Developers', tone: 'blue', status: 'available', category: 'software-engineering', label: 'AI-ASSISTED SOFTWARE ENGINEERING',
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
    audience: 'Engineers · Consultants', tone: 'orange', status: 'available', category: 'technology-careers', label: 'CUSTOMER TO PRODUCTION',
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
    audience: 'Beginners · Developers', tone: 'cyan', status: 'available', category: 'cloud-devops', label: 'CONTAINERS TO CLOUD',
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
    audience: 'Python Developers · AI Builders', tone: 'green', status: 'available', category: 'ai-application-engineering', label: 'LLM APPLICATION ENGINEERING',
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
  {
    slug: 'rag-application-engineering', title: 'The RAG Application Engineering Handbook', shortTitle: 'RAG Engineering',
    audience: 'Beginners · AI Builders', tone: 'purple', status: 'available', category: 'ai-application-engineering', label: 'PRIVATE KNOWLEDGE TO GROUNDED ANSWERS',
    description: 'Give AI governed access to private knowledge—from document preparation and semantic retrieval to cited answers, evaluation and deployment.',
    promise: 'Build a complete RAG mental model and a production-minded document assistant you can explain, test and improve.',
    chapters: [
      { title: 'What is RAG?', outcome: 'Understand retrieval, context and grounded generation.', href: '/rag-application-engineering/01-what-is-rag-give-ai-access-to-your-knowledge/' },
      { title: 'Prepare documents for RAG', outcome: 'Load, clean, chunk and label useful evidence.', href: '/rag-application-engineering/02-prepare-documents-loading-cleaning-chunking/' },
      { title: 'Embeddings and semantic search', outcome: 'Retrieve by meaning, filters and hybrid search.', href: '/rag-application-engineering/03-embeddings-vector-databases-semantic-search/' },
      { title: 'Build a complete RAG application', outcome: 'Connect ingestion, retrieval, prompting and citations.', href: '/rag-application-engineering/04-build-complete-rag-application-python-langchain/' },
      { title: 'Production RAG', outcome: 'Evaluate, secure, observe and deploy the system.', href: '/rag-application-engineering/05-production-rag-evaluation-security-deployment/' },
    ],
  },
  {
    slug: 'fastapi-ai-applications', title: 'FastAPI for AI Applications Handbook', shortTitle: 'FastAPI for AI',
    audience: 'Python Developers · AI Builders', tone: 'teal', status: 'available', category: 'ai-application-engineering', label: 'PYTHON TO PRODUCTION AI API',
    description: 'Build, validate, stream, secure, test and deploy production-ready Python APIs for Generative AI, RAG and agent applications.',
    promise: 'Turn one Python function into a dependable Enterprise AI Assistant API with clear contracts and production controls.',
    chapters: [
      { title: 'What is FastAPI?', outcome: 'Turn Python functions into documented HTTP endpoints.', href: '/fastapi-ai-applications/01-what-is-fastapi-turn-python-into-web-api/' },
      { title: 'Validation and error handling', outcome: 'Build predictable REST contracts with Pydantic.', href: '/fastapi-ai-applications/02-rest-api-validation-error-handling/' },
      { title: 'Databases and external services', outcome: 'Persist data, call services and protect configuration.', href: '/fastapi-ai-applications/03-databases-external-services-configuration/' },
      { title: 'Build and stream a GenAI API', outcome: 'Expose grounded, cited AI responses as a stream.', href: '/fastapi-ai-applications/04-build-stream-generative-ai-api/' },
      { title: 'Secure, test and deploy', outcome: 'Add authentication, limits, tests, Docker and operations.', href: '/fastapi-ai-applications/05-secure-test-deploy-production-fastapi/' },
    ],
  },
  {
    slug: 'modern-java-spring-boot-genai', title: 'Modern Java with Spring Boot and GenAI Handbook', shortTitle: 'Java, Spring Boot & GenAI',
    audience: 'Java Beginners · Enterprise Developers', tone: 'orange', status: 'available', category: 'software-engineering', label: 'ENTERPRISE JAVA IN THE AI ERA',
    description: 'Build enterprise applications with modern Java, Spring Boot, databases, grounded Generative AI and production deployment.',
    promise: 'Build an Enterprise Policy Assistant from Java foundations to a secure, cited and containerised AI application.',
    chapters: [
      { title: 'Modern Java foundations for the AI era', outcome: 'Model application behaviour with readable Java and AI-assisted review.', href: '/modern-java-spring-boot-genai/01-modern-java-foundations-ai-era/' },
      { title: 'Build REST APIs with Spring Boot', outcome: 'Create clear controller, service, validation and error boundaries.', href: '/modern-java-spring-boot-genai/02-build-rest-apis-java-spring-boot/' },
      { title: 'Connect Spring Boot with a database', outcome: 'Persist policies safely with JPA, SQL and configuration.', href: '/modern-java-spring-boot-genai/03-connect-spring-boot-database/' },
      { title: 'Add Generative AI and RAG', outcome: 'Retrieve policy evidence and generate grounded answers.', href: '/modern-java-spring-boot-genai/04-add-generative-ai-rag-java/' },
      { title: 'Build and deploy the enterprise application', outcome: 'Secure, test, observe, containerise and deploy the service.', href: '/modern-java-spring-boot-genai/05-build-deploy-enterprise-ai-application/' },
    ],
  },
  {
    slug: 'sql-data-ai-applications', title: 'SQL for Data and AI Applications Handbook', shortTitle: 'SQL for Data & AI',
    audience: 'Beginners · Data and AI Builders', tone: 'indigo', status: 'available', category: 'ai-application-engineering', label: 'DATA FOUNDATIONS FOR INTELLIGENT SYSTEMS',
    description: 'Query, analyse and safely power analytics, data engineering, RAG and AI-agent applications with SQL.',
    promise: 'Build an AI-Powered Business Data Analyst that converts questions into validated, read-only SQL and clear explanations.',
    chapters: [
      { title: 'SQL foundations: ask questions using data', outcome: 'Read tables with SELECT, filters, sorting and limits.', href: '/sql-data-ai-applications/01-sql-foundations-ask-questions-using-data/' },
      { title: 'Analyse business data with SQL', outcome: 'Use aggregates, groups, conditions and dates for insight.', href: '/sql-data-ai-applications/02-analyse-business-data-with-sql/' },
      { title: 'Connect data across tables using joins', outcome: 'Combine customers, orders and courses through reliable keys.', href: '/sql-data-ai-applications/03-connect-data-across-tables-joins/' },
      { title: 'Use SQL in data, RAG and AI-agent workflows', outcome: 'Generate, validate and execute bounded SQL from natural language.', href: '/sql-data-ai-applications/04-sql-data-rag-ai-agent-workflows/' },
      { title: 'Write production-ready SQL', outcome: 'Optimise, secure, audit and protect database operations.', href: '/sql-data-ai-applications/05-write-production-ready-sql/' },
    ],
  },
];

export function getHandbook(slug: string) { return handbooks.find((handbook) => handbook.slug === slug); }
