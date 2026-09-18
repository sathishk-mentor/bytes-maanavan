export interface LearningConnection {
  slug: string;
  reason: string;
  label: 'Foundation' | 'Apply it' | 'Go deeper' | 'Production next';
}

type ConnectionMap = Record<string, Record<number, LearningConnection[]>>;

const c = (slug: string, reason: string, label: LearningConnection['label']): LearningConnection => ({ slug, reason, label });

/** Curated cross-handbook routes. Same-handbook order is handled by Previous/Next. */
const connections: ConnectionMap = {
  'ai-agents': {
    1: [c('01-what-is-langchain-build-llm-applications', 'See where agent workflows fit inside an LLM application.', 'Go deeper'), c('01-what-is-rag-give-ai-access-to-your-knowledge', 'Understand how an assistant looks up trusted knowledge.', 'Foundation')],
    2: [c('04-build-ai-agents-with-tools-and-memory', 'Implement the model–tool–observation loop in Python.', 'Apply it'), c('04-add-generative-ai-rag-java', 'See controlled tool calling in a Spring application.', 'Apply it')],
    3: [c('01-what-is-rag-give-ai-access-to-your-knowledge', 'Explore knowledge retrieval without assuming agent experience.', 'Go deeper'), c('build-ai-agents-tools-memory-python', 'Build tools and memory with Python.', 'Apply it')],
    4: [c('04-build-ai-agents-with-tools-and-memory', 'Move from no-code concepts to a coded agent workflow.', 'Apply it'), c('04-sql-data-rag-ai-agent-workflows', 'Connect an agent to governed business data.', 'Go deeper')],
    5: [c('05-production-ready-langchain-application', 'Apply permissions, limits and traces to an agent application.', 'Production next'), c('05-build-deploy-enterprise-ai-application', 'Compare production guardrails in Spring Boot.', 'Production next')],
  },
  'cloud-devops': {
    1: [c('01-what-is-fastapi-turn-python-into-web-api', 'See the kind of API commonly packaged inside a container.', 'Apply it'), c('python-foundations-for-ai-applications', 'Prepare a small Python application to containerise.', 'Foundation')],
    2: [c('build-generative-ai-application-python', 'Build a Python AI service that can become a Docker image.', 'Apply it'), c('01-what-is-fastapi-turn-python-into-web-api', 'Turn Python logic into a web service before packaging it.', 'Go deeper')],
    3: [c('03-databases-external-services-configuration', 'Connect API configuration and secrets to container environments.', 'Apply it'), c('mongodb-python-fastapi-ai-application', 'Use ports, environment variables and a database together.', 'Apply it')],
    4: [c('mongodb-python-fastapi-ai-application', 'See an API and database working as separate services.', 'Apply it'), c('03-connect-spring-boot-database', 'Compare a Java service connected to external storage.', 'Go deeper')],
    5: [c('05-secure-test-deploy-production-fastapi', 'Harden the API running inside the container.', 'Production next'), c('05-production-ready-langchain-application', 'Add production controls around an AI workflow.', 'Production next')],
  },
  'fastapi-ai-applications': {
    1: [c('63-api-first-thinking', 'Understand the contract-first thinking behind an API.', 'Foundation'), c('python-apis-json-llm-responses', 'Practise Python, JSON and response handling.', 'Foundation')],
    2: [c('64-debugging-ai-generated-code', 'Debug validation and generated-code failures systematically.', 'Go deeper'), c('test-secure-deploy-python-ai-applications', 'Add focused tests to a Python AI application.', 'Apply it')],
    3: [c('mongodb-python-fastapi-ai-application', 'Connect FastAPI to MongoDB in a complete example.', 'Apply it'), c('03-docker-ports-volumes-environment-variables', 'Manage database URLs and secrets through container configuration.', 'Go deeper')],
    4: [c('build-generative-ai-application-python', 'Build the model-calling logic behind the streaming endpoint.', 'Foundation'), c('02-connect-python-with-llms-using-langchain', 'Compare direct model calls with a LangChain integration.', 'Go deeper')],
    5: [c('05-dockerize-deploy-generative-ai-application', 'Package and deploy the secured API as a container.', 'Production next'), c('75-secure-ai-coding', 'Extend the security review to AI-assisted code.', 'Go deeper')],
  },
  'forward-deployed-engineer': {
    1: [c('62-how-developers-use-ai-tools', 'See how delivery engineers use AI tools in daily work.', 'Go deeper'), c('63-api-first-thinking', 'Understand a common integration boundary in customer projects.', 'Foundation')],
    2: [c('66-ai-assisted-coding-workflow', 'Practise a disciplined AI-assisted engineering workflow.', 'Apply it'), c('64-debugging-ai-generated-code', 'Strengthen the debugging skill required on customer sites.', 'Apply it')],
    3: [c('05-production-ready-langchain-application', 'Study the production concerns behind an AI engagement.', 'Go deeper'), c('05-secure-test-deploy-production-fastapi', 'See delivery readiness translated into API controls.', 'Apply it')],
    4: [c('05-use-ai-agents-safely-responsibly', 'Connect trust with permissions, review and accountability.', 'Go deeper'), c('75-secure-ai-coding', 'Use secure evidence when discussing delivery risk.', 'Apply it')],
    5: [c('62-how-developers-use-ai-tools', 'Map the role to modern AI-assisted engineering work.', 'Go deeper'), c('01-modern-java-foundations-ai-era', 'Explore one enterprise technology path used in FDE engagements.', 'Apply it')],
  },
  'langchain': {
    1: [c('build-generative-ai-application-python', 'Build the underlying Python model call first.', 'Foundation'), c('01-what-is-an-ai-agent-from-answering-to-taking-action', 'Understand when an application becomes agentic.', 'Go deeper')],
    2: [c('python-apis-json-llm-responses', 'Strengthen Python and structured-response fundamentals.', 'Foundation'), c('04-build-stream-generative-ai-api', 'Expose the chain through a streaming API.', 'Apply it')],
    3: [c('01-what-is-rag-give-ai-access-to-your-knowledge', 'Learn the RAG mental model before implementation details.', 'Foundation'), c('03-embeddings-vector-databases-semantic-search', 'Go deeper into embeddings and semantic retrieval.', 'Go deeper')],
    4: [c('02-how-an-ai-agent-works-goal-reasoning-tools-actions', 'Review the agent loop in plain language.', 'Foundation'), c('build-ai-agents-tools-memory-python', 'Build the same pattern with Python fundamentals.', 'Apply it')],
    5: [c('05-secure-test-deploy-production-fastapi', 'Add API security, tests and deployment controls.', 'Production next'), c('05-dockerize-deploy-generative-ai-application', 'Package the application for repeatable deployment.', 'Production next')],
  },
  'modern-java-spring-boot-genai': {
    1: [c('63-api-first-thinking', 'Review API contracts before implementing Spring endpoints.', 'Foundation'), c('01-what-is-fastapi-turn-python-into-web-api', 'Compare the same web-service idea in Python.', 'Go deeper')],
    2: [c('01-what-is-langchain-build-llm-applications', 'Compare another framework for organising LLM calls.', 'Go deeper'), c('build-generative-ai-application-python', 'See the same model-call fundamentals in Python.', 'Go deeper')],
    3: [c('01-what-is-rag-give-ai-access-to-your-knowledge', 'Start with the RAG mental model if retrieval is new.', 'Foundation'), c('03-embeddings-vector-databases-semantic-search', 'Understand embeddings and vector search in more depth.', 'Go deeper')],
    4: [c('02-how-an-ai-agent-works-goal-reasoning-tools-actions', 'Learn the tool-using agent loop without Java syntax.', 'Foundation'), c('04-build-ai-agents-with-tools-and-memory', 'Compare tool calling through LangChain.', 'Go deeper')],
    5: [c('05-dockerize-deploy-generative-ai-application', 'Package the Java AI service for deployment.', 'Production next'), c('75-secure-ai-coding', 'Extend the review to AI-assisted code security.', 'Go deeper')],
  },
  mongodb: {
    1: [c('01-sql-foundations-ask-questions-using-data', 'Compare document storage with relational tables.', 'Go deeper'), c('python-foundations-for-ai-applications', 'Prepare the Python basics used in database examples.', 'Foundation')],
    2: [c('03-connect-data-across-tables-joins', 'Compare references with relational joins.', 'Go deeper'), c('03-embeddings-vector-databases-semantic-search', 'See how data modelling affects retrieval.', 'Go deeper')],
    3: [c('02-analyse-business-data-with-sql', 'Compare aggregation pipelines with SQL aggregation.', 'Go deeper'), c('04-sql-data-rag-ai-agent-workflows', 'Use aggregated data inside an AI workflow.', 'Apply it')],
    4: [c('01-what-is-fastapi-turn-python-into-web-api', 'Understand the API layer connected to MongoDB.', 'Foundation'), c('03-databases-external-services-configuration', 'Apply configuration and database integration in FastAPI.', 'Apply it')],
    5: [c('05-write-production-ready-sql', 'Compare production database safety across data models.', 'Production next'), c('05-secure-test-deploy-production-fastapi', 'Secure the API that exposes database operations.', 'Production next')],
  },
  'python-genai-agentic-ai': {
    1: [c('62-how-developers-use-ai-tools', 'See how Python skills fit an AI-assisted workflow.', 'Go deeper'), c('01-what-is-fastapi-turn-python-into-web-api', 'Turn basic Python functions into an API.', 'Apply it')],
    2: [c('02-rest-api-validation-error-handling', 'Apply JSON and validation in a real API.', 'Apply it'), c('01-sql-foundations-ask-questions-using-data', 'Use Python inputs with structured business data.', 'Go deeper')],
    3: [c('01-what-is-langchain-build-llm-applications', 'See when a framework helps organise model calls.', 'Go deeper'), c('04-build-stream-generative-ai-api', 'Expose the GenAI application as a streaming endpoint.', 'Apply it')],
    4: [c('02-how-an-ai-agent-works-goal-reasoning-tools-actions', 'Review the agent loop before expanding the code.', 'Foundation'), c('04-build-ai-agents-with-tools-and-memory', 'Implement tools and memory through LangChain.', 'Go deeper')],
    5: [c('05-dockerize-deploy-generative-ai-application', 'Package the tested application for deployment.', 'Production next'), c('75-secure-ai-coding', 'Review security risks in AI-assisted development.', 'Go deeper')],
  },
  'rag-application-engineering': {
    1: [c('03-tools-knowledge-memory-explained-simply', 'See where retrieved knowledge fits inside an agent.', 'Go deeper'), c('03-build-rag-applications-with-your-documents', 'Implement the concept through LangChain.', 'Apply it')],
    2: [c('mongodb-data-modeling-embedding-vs-referencing', 'Connect chunk structure with practical data modelling.', 'Go deeper'), c('03-embeddings-vector-databases-semantic-search', 'Continue from chunks into embeddings and search.', 'Go deeper')],
    3: [c('03-connect-spring-boot-database', 'Implement vector retrieval in a Spring application.', 'Apply it'), c('04-sql-data-rag-ai-agent-workflows', 'Connect vector search with governed SQL data.', 'Apply it')],
    4: [c('03-build-rag-applications-with-your-documents', 'Compare a hands-on LangChain RAG implementation.', 'Apply it'), c('04-build-stream-generative-ai-api', 'Serve the RAG workflow through an API.', 'Apply it')],
    5: [c('05-production-ready-langchain-application', 'Add tracing and runtime controls to the RAG application.', 'Production next'), c('05-secure-test-deploy-production-fastapi', 'Secure, test and deploy its API boundary.', 'Production next')],
  },
  'software-engineering': {
    62: [c('python-foundations-for-ai-applications', 'Apply AI-assisted development to a beginner Python task.', 'Apply it'), c('66-ai-assisted-coding-workflow', 'Move from individual tools to a controlled workflow.', 'Go deeper')],
    63: [c('01-what-is-fastapi-turn-python-into-web-api', 'See API-first thinking implemented in FastAPI.', 'Apply it'), c('01-modern-java-foundations-ai-era', 'See the same boundary implemented with Spring Boot.', 'Apply it')],
    64: [c('02-rest-api-validation-error-handling', 'Practise debugging through validation failures.', 'Apply it'), c('test-secure-deploy-python-ai-applications', 'Turn debugging into repeatable tests.', 'Go deeper')],
    66: [c('05-use-ai-agents-safely-responsibly', 'Connect workflow controls with responsible AI use.', 'Go deeper'), c('02-forward-deployed-engineer-skillset', 'See where disciplined AI-assisted coding fits a delivery role.', 'Go deeper')],
    75: [c('05-secure-test-deploy-production-fastapi', 'Apply secure coding at the API boundary.', 'Apply it'), c('05-dockerize-deploy-generative-ai-application', 'Carry secure configuration into deployment.', 'Production next')],
  },
  'sql-data-ai-applications': {
    1: [c('what-is-mongodb-documents-collections-databases', 'Compare tables with a document database.', 'Go deeper'), c('python-foundations-for-ai-applications', 'Use Python to work with the data you query.', 'Apply it')],
    2: [c('mongodb-queries-updates-aggregation-pipeline', 'Compare SQL analysis with MongoDB aggregation.', 'Go deeper'), c('03-databases-external-services-configuration', 'Connect analysed data to an API service.', 'Apply it')],
    3: [c('mongodb-data-modeling-embedding-vs-referencing', 'Compare relational joins with document references.', 'Go deeper'), c('63-api-first-thinking', 'Design a clean API contract over related data.', 'Apply it')],
    4: [c('03-embeddings-vector-databases-semantic-search', 'Understand the vector retrieval part of the workflow.', 'Foundation'), c('03-tools-knowledge-memory-explained-simply', 'See how agents use business data as knowledge.', 'Go deeper')],
    5: [c('05-secure-test-deploy-production-fastapi', 'Protect the API that executes database operations.', 'Production next'), c('production-mongodb-indexing-security-deployment', 'Compare production controls in a document database.', 'Production next')],
  },
};

export function getLearningConnections(category: string, order: number): LearningConnection[] {
  return connections[category]?.[order] ?? [];
}
