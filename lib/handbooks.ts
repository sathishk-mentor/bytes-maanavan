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
    promise: 'Understand agents, tools, memory and human approval.',
    chapters: [
      { title: 'What is an AI agent?', outcome: 'Distinguish chatbots, copilots and agents.', href: '/ai-agents/01-what-is-an-ai-agent-from-answering-to-taking-action/' },
      { title: 'How an AI agent works', outcome: 'Trace goals, reasoning, tools, actions and completion checks.', href: '/ai-agents/02-how-an-ai-agent-works-goal-reasoning-tools-actions/' },
      { title: 'AI agents at work', outcome: 'Evaluate real use cases and choose a measurable first pilot.', href: '/ai-agents/03-tools-knowledge-memory-explained-simply/' },
      { title: 'Risks and guardrails', outcome: 'Apply permissions, validation, approval, logs and stop rules.', href: '/ai-agents/04-build-first-ai-agent-without-coding/' },
      { title: 'Getting started with AI agents', outcome: 'Plan a safe pilot using Identify, Try, Pilot, Review and Scale.', href: '/ai-agents/05-use-ai-agents-safely-responsibly/' },
    ],
  },
  {
    slug: 'github-copilot', title: 'The GitHub Copilot Handbook', shortTitle: 'GitHub Copilot',
    audience: 'Developers', tone: 'blue', status: 'available', category: 'software-engineering', label: 'AI-ASSISTED SOFTWARE ENGINEERING',
    description: 'Learn inline suggestions, Copilot Chat, effective prompting, agent mode and responsible engineering governance.',
    promise: 'Use GitHub Copilot productively without giving up engineering judgement.',
    chapters: [
      { title: 'What is GitHub Copilot?', outcome: 'Inspect inline suggestions instead of accepting blindly.', href: '/software-engineering/01-github-copilot-for-developers/' },
      { title: 'Use Copilot Chat with context', outcome: 'Combine code, evidence and expected behaviour.', href: '/software-engineering/02-give-github-copilot-better-context/' },
      { title: 'Prompt engineering for Copilot', outcome: 'Define goals, constraints and acceptance checks.', href: '/software-engineering/03-debug-test-refactor-with-github-copilot/' },
      { title: 'Agent mode and multi-file work', outcome: 'Supervise planning, edits, tools and validation.', href: '/software-engineering/04-build-feature-with-github-copilot/' },
      { title: 'Review and governance', outcome: 'Match safeguards to the impact of a change.', href: '/software-engineering/05-use-github-copilot-responsibly/' },
    ],
  },
  {
    slug: 'forward-deployed-engineer', title: 'The Forward Deployed Engineer Handbook', shortTitle: 'FDE',
    audience: 'Engineers · Consultants · AI Builders', tone: 'orange', status: 'available', category: 'technology-careers', label: 'CUSTOMER REALITY TO PRODUCTION OUTCOME',
    description: 'Understand the FDE role, balanced skillset, engagement lifecycle, customer trust and evidence-based career path.',
    promise: 'Learn how FDEs combine engineering depth, business judgement and field delivery.',
    chapters: [
      { title: 'What is a Forward Deployed Engineer?', outcome: 'Distinguish FDE work from adjacent customer-facing roles.', href: '/forward-deployed-engineer/01-what-is-a-forward-deployed-engineer/' },
      { title: 'The FDE skillset', outcome: 'Balance technical depth, commercial thinking and ambiguity.', href: '/forward-deployed-engineer/02-forward-deployed-engineer-skillset/' },
      { title: 'The engagement lifecycle', outcome: 'Move from discovery to production and handoff.', href: '/forward-deployed-engineer/03-forward-deployed-engineer-engagement-lifecycle/' },
      { title: 'Build customer trust', outcome: 'Build with the customer through visible evidence.', href: '/forward-deployed-engineer/04-build-customer-trust-as-an-fde/' },
      { title: 'Career path and compensation', outcome: 'Plan a transition and interpret market figures carefully.', href: '/forward-deployed-engineer/05-forward-deployed-engineer-career-path-compensation/' },
    ],
  },
  {
    slug: 'docker', title: 'The Docker Handbook', shortTitle: 'Docker',
    audience: 'Beginners · Developers', tone: 'cyan', status: 'available', category: 'cloud-devops', label: 'CONTAINERS TO CLOUD',
    description: 'Understand containers, package a Python application, manage runtime configuration and deploy a practical Generative AI service.',
    promise: 'Build a repeatable container workflow from code to cloud.',
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
    promise: 'Build grounded, tool-using and observable LangChain applications.',
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
    promise: 'Build and improve a secure, cited document assistant.',
    chapters: [
      { title: 'What is RAG?', outcome: 'Understand retrieval, context and grounded generation.', href: '/rag-application-engineering/01-what-is-rag-give-ai-access-to-your-knowledge/' },
      { title: 'How RAG works end to end', outcome: 'Follow documents, retrieval, context and generation as one pipeline.', href: '/rag-application-engineering/02-prepare-documents-loading-cleaning-chunking/' },
      { title: 'Why RAG answers go wrong', outcome: 'Diagnose source, chunking, retrieval and generation failures.', href: '/rag-application-engineering/03-embeddings-vector-databases-semantic-search/' },
      { title: 'Evaluate and improve RAG quality', outcome: 'Measure retrieval, groundedness and relevance with repeatable tests.', href: '/rag-application-engineering/04-build-complete-rag-application-python-langchain/' },
      { title: 'RAG in production', outcome: 'Control scale, cost, access, freshness and auditability.', href: '/rag-application-engineering/05-production-rag-evaluation-security-deployment/' },
    ],
  },
  {
    slug: 'fastapi-ai-applications', title: 'FastAPI for AI Applications Handbook', shortTitle: 'FastAPI for AI',
    audience: 'Python Developers · AI Builders', tone: 'teal', status: 'available', category: 'ai-application-engineering', label: 'PYTHON TO PRODUCTION AI API',
    description: 'Build, validate, stream, secure, test and deploy production-ready Python APIs for Generative AI, RAG and agent applications.',
    promise: 'Turn Python functions into dependable production AI APIs.',
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
    promise: 'Build a secure enterprise AI assistant with Java.',
    chapters: [
      { title: 'Spring Boot basics for AI apps', outcome: 'Trace controllers, services, dependency injection and request flow.', href: '/modern-java-spring-boot-genai/01-modern-java-foundations-ai-era/' },
      { title: 'Connect LLMs with Spring AI', outcome: 'Build a predictable ChatClient call with typed output.', href: '/modern-java-spring-boot-genai/02-build-rest-apis-java-spring-boot/' },
      { title: 'Build RAG in Spring Boot', outcome: 'Connect VectorStore retrieval, advisors and grounded answers.', href: '/modern-java-spring-boot-genai/03-connect-spring-boot-database/' },
      { title: 'Agents and tool calling', outcome: 'Execute bounded Java tools with approval and audit controls.', href: '/modern-java-spring-boot-genai/04-add-generative-ai-rag-java/' },
      { title: 'Production Java GenAI apps', outcome: 'Add security, resilience, observability and cost controls.', href: '/modern-java-spring-boot-genai/05-build-deploy-enterprise-ai-application/' },
    ],
  },
  {
    slug: 'sql-data-ai-applications', title: 'SQL for Data and AI Applications Handbook', shortTitle: 'SQL for Data & AI',
    audience: 'Beginners · Data and AI Builders', tone: 'indigo', status: 'available', category: 'ai-application-engineering', label: 'DATA FOUNDATIONS FOR INTELLIGENT SYSTEMS',
    description: 'Query, analyse and safely power analytics, data engineering, RAG and AI-agent applications with SQL.',
    promise: 'Turn business questions into safe, validated SQL insights.',
    chapters: [
      { title: 'SQL fundamentals for AI applications', outcome: 'Retrieve dependable application facts with focused, parameterised SQL.', href: '/sql-data-ai-applications/01-sql-foundations-ask-questions-using-data/' },
      { title: 'Aggregations and window functions', outcome: 'Summarise business events, then rank and compare the results.', href: '/sql-data-ai-applications/02-analyse-business-data-with-sql/' },
      { title: 'Vector search in SQL with pgvector', outcome: 'Store embeddings and retrieve semantic matches with measured trade-offs.', href: '/sql-data-ai-applications/03-connect-data-across-tables-joins/' },
      { title: 'Feature engineering for machine learning', outcome: 'Create point-in-time-correct features without leaking future data.', href: '/sql-data-ai-applications/04-sql-data-rag-ai-agent-workflows/' },
      { title: 'Text-to-SQL and safe AI agents', outcome: 'Clarify, validate and execute natural-language SQL with least privilege.', href: '/sql-data-ai-applications/05-write-production-ready-sql/' },
    ],
  },
  {
    slug: 'mongodb', title: 'MongoDB for AI Application Engineering Handbook', shortTitle: 'MongoDB for AI',
    audience: 'Beginners · Backend and AI Builders', tone: 'emerald', status: 'available', category: 'ai-application-engineering', label: 'DOCUMENT DATA TO GROUNDED AI',
    description: 'Learn MongoDB documents, data modelling, queries, FastAPI integration, Vector Search and production operations through one connected AI application project.',
    promise: 'Build the data foundation for an AI-powered learning support platform.',
    chapters: [
      { title: 'What is MongoDB?', outcome: 'Understand databases, collections, documents, fields, BSON and CRUD.', href: '/mongodb/what-is-mongodb-documents-collections-databases/' },
      { title: 'Design MongoDB documents and data models', outcome: 'Choose embedding, referencing and validation from application query patterns.', href: '/mongodb/mongodb-data-modeling-embedding-vs-referencing/' },
      { title: 'Query, update and analyse MongoDB data', outcome: 'Use filters, updates, pagination and aggregation to answer business questions.', href: '/mongodb/mongodb-queries-updates-aggregation-pipeline/' },
      { title: 'Connect MongoDB with Python, FastAPI and AI', outcome: 'Build APIs, persist history and retrieve approved evidence with Vector Search.', href: '/mongodb/mongodb-python-fastapi-ai-application/' },
      { title: 'Production MongoDB', outcome: 'Apply indexing, security, backups, monitoring and capacity controls.', href: '/mongodb/production-mongodb-indexing-security-deployment/' },
    ],
  },
  {
    slug: 'python-genai-agentic-ai', title: 'Python for GenAI and Agentic AI Handbook', shortTitle: 'Python for GenAI & Agents',
    audience: 'Beginners · Python and AI Builders', tone: 'blue', status: 'available', category: 'ai-application-engineering', label: 'PYTHON FOUNDATIONS TO PRODUCTION AI AGENTS',
    description: 'Learn Python through one connected GenAI and agentic AI project—from language foundations and APIs to tools, evaluation, security and deployment.',
    promise: 'Build a validated AI-powered personal learning assistant.',
    chapters: [
      { title: 'Python foundations for AI applications', outcome: 'Use core Python, functions, errors, environments and packages with confidence.', href: '/python-genai-agentic-ai/python-foundations-for-ai-applications/' },
      { title: 'APIs, JSON and LLM responses', outcome: 'Call services safely and validate structured responses.', href: '/python-genai-agentic-ai/python-apis-json-llm-responses/' },
      { title: 'Build a Generative AI application', outcome: 'Create a grounded movie advisor with structured output and verified catalogue facts.', href: '/python-genai-agentic-ai/build-generative-ai-application-python/' },
      { title: 'Build tool-using AI agents', outcome: 'Create bounded tools, memory, stop rules and human approval.', href: '/python-genai-agentic-ai/build-ai-agents-tools-memory-python/' },
      { title: 'Test, secure and deploy', outcome: 'Evaluate, protect, containerise, monitor and roll back the application.', href: '/python-genai-agentic-ai/test-secure-deploy-python-ai-applications/' },
    ],
  },
];

export function getHandbook(slug: string) { return handbooks.find((handbook) => handbook.slug === slug); }
