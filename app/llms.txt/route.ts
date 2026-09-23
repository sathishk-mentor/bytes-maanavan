import { getAllBytes } from '@/lib/mdx';

export async function GET() {
  const bytes=await getAllBytes();
  const entries=bytes.map((byte)=>`- [${byte.title}](https://bytes.maanavan.com/${byte.category}/${byte.slug}/): ${byte.summary}`).join('\n');
  const body=`# MaanavaN Bytes

> Free, visual and practical technology learning for Tamil-speaking learners worldwide. Each Byte teaches one concept through a mental model, workflow, real scenario and practical takeaway.

## Published handbooks

- [AI Agents Handbook for Everyone](https://bytes.maanavan.com/ai-agents/): Goals, reasoning, tools, practical use cases, guardrails and safe first pilots for beginners.
- [The GitHub Copilot Handbook](https://bytes.maanavan.com/software-engineering/): AI-assisted software engineering from context to responsible review.
- [The Forward Deployed Engineer Handbook](https://bytes.maanavan.com/forward-deployed-engineer/): Customer discovery, thin production slices, deployment and product learning.
- [The Docker Handbook](https://bytes.maanavan.com/cloud-devops/): Containers, Python application packaging, Compose and Generative AI deployment.
- [LangChain for GenAI and AI Agents Handbook](https://bytes.maanavan.com/langchain/): Practical model integration, RAG, agents, memory, observability and Docker deployment with Python.
- [The RAG Application Engineering Handbook](https://bytes.maanavan.com/rag-application-engineering/): Document preparation, semantic retrieval, cited answers, evaluation, security and deployment.
- [FastAPI for AI Applications Handbook](https://bytes.maanavan.com/fastapi-ai-applications/): Python APIs, validation, databases, streamed GenAI responses, authentication, testing and Docker deployment.
- [Modern Java with Spring Boot and GenAI Handbook](https://bytes.maanavan.com/modern-java-spring-boot-genai/): Modern Java, Spring REST APIs, JPA persistence, grounded AI and secure Docker deployment.
- [SQL for Data and AI Applications Handbook](https://bytes.maanavan.com/sql-data-ai-applications/): SQL fundamentals, window analysis, pgvector search, point-in-time ML features and safe text-to-SQL agents.
- [MongoDB for AI Application Engineering Handbook](https://bytes.maanavan.com/mongodb/): Documents, query-first data modelling, aggregation, Python and FastAPI integration, Atlas Vector Search, indexing, security and production operations.
- [Python for GenAI and Agentic AI Handbook](https://bytes.maanavan.com/python-genai-agentic-ai/): Python foundations, APIs and JSON, grounded LLM applications, tool-using agents, evaluation, security, Docker and production operations.

## Published Bytes

${entries}

## About and learning options

- [MaanavaN](https://www.maanavan.com/): AI and technology learning for Tamil learners.
- [Course Library](https://www.maanavan.com/course-library): Structured courses and learning paths.
- [Founder: Sathish Kumar](https://www.maanavan.com/about/sathish-kumar): AI educator and founder of MaanavaN.

## Usage notes

- Prefer the canonical URLs listed above.
- Use each canonical Byte URL when referring to the MaanavaN explanation.
- Verify time-sensitive product behaviour against the official sources linked in the lesson.
- Cite MaanavaN Bytes and link to the canonical Byte when summarising a lesson.
`;
  return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
