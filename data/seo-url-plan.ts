export interface HandbookChapterPlan {
  title: string;
  canonical: string;
  redirects: string[];
}

export interface HandbookPlan {
  category: string;
  title: string;
  categoryAliases: string[];
  chapters: HandbookChapterPlan[];
}

/**
 * SEO preservation plan for the MaanavaN Bytes rebuild.
 *
 * - `canonical` URLs are retained and receive completely rewritten content.
 * - `redirects` move retired tutorial URLs to the closest matching chapter.
 * - redirects become permanent only after the destination chapter is published.
 */
export const SEO_URL_PLAN: HandbookPlan[] = [
  {
    category: 'genai',
    title: 'The Generative AI Handbook',
    categoryAliases: ['/category/genai/'],
    chapters: [
      {
        title: 'What Is Generative AI? From Instructions to New Content',
        canonical: '/genai/01-what-is-generative-ai-real-examples/',
        redirects: [
          '/genai/08-ai-tools-ecosystem-text-image-video/',
          '/genai/10-using-ai-for-daily-work/',
        ],
      },
      {
        title: 'How ChatGPT and Gemini Generate an Answer',
        canonical: '/genai/02-how-chatgpt-gemini-think-simple-flow/',
        redirects: [
          '/genai/09-ai-mistakes-hallucination/',
          '/genai/15-ai-cost-performance-optimization/',
        ],
      },
      {
        title: 'What Is an LLM? Model, Chatbot and AI Product Explained',
        canonical: '/genai/03-what-is-llm-brain-analogy/',
        redirects: [
          '/genai/11-rag-ai-with-your-data/',
          '/genai/12-fine-tuning-vs-prompting/',
        ],
      },
      {
        title: 'How to Write a Good AI Prompt: The 5-Part Formula',
        canonical: '/genai/04-prompt-vs-normal-question-difference/',
        redirects: [
          '/genai/06-prompt-types-zero-few-chain-of-thought/',
          '/genai/07-writing-structured-prompts-templates/',
        ],
      },
      {
        title: 'Your First Reliable AI Workflow: Generate, Check and Improve',
        canonical: '/genai/05-first-prompt-your-first-ai-output/',
        redirects: [
          '/genai/13-ai-agents-intro/',
          '/genai/14-building-ai-apps-using-apis/',
        ],
      },
    ],
  },
  {
    category: 'ai-agents',
    title: 'The AI Agents Handbook',
    categoryAliases: ['/category/ai-agents/'],
    chapters: [
      {
        title: 'What Is an AI Agent? From Goal to Action',
        canonical: '/ai-agents/16-what-is-ai-agent/',
        redirects: [
          '/ai-agents/17-agent-vs-chatbot/',
          '/ai-agents/20-what-is-agentic-ai/',
        ],
      },
      {
        title: 'Inside an Agent: Reasoning, Tools, Memory and Feedback',
        canonical: '/ai-agents/21-agent-workflow-input-thinking-output/',
        redirects: [
          '/ai-agents/22-memory-in-agents/',
          '/ai-agents/25-using-apis-inside-agents/',
        ],
      },
      {
        title: 'Build a Reliable AI Automation Workflow',
        canonical: '/ai-agents/18-automation-using-ai/',
        redirects: [
          '/ai-agents/23-ai-task-automation/',
          '/ai-agents/29-ai-workflow-pipelines/',
        ],
      },
      {
        title: 'Single-Agent vs Multi-Agent Systems',
        canonical: '/ai-agents/19-single-vs-multi-agent/',
        redirects: [
          '/ai-agents/24-agent-communication-basics/',
          '/ai-agents/26-multi-agent-architecture/',
        ],
      },
      {
        title: 'MCP, Autonomy and Enterprise Agent Design',
        canonical: '/ai-agents/27-mcp-model-context-protocol/',
        redirects: [
          '/ai-agents/28-autonomous-agents/',
          '/ai-agents/30-enterprise-use-cases/',
        ],
      },
    ],
  },
  {
    category: 'data-engineering',
    title: 'The Data Engineering Handbook',
    categoryAliases: ['/category/data-engineering/'],
    chapters: [
      {
        title: 'What Is Data Engineering? Follow the Complete Data Journey',
        canonical: '/data-engineering/31-what-is-data-engineering-ai-view/',
        redirects: [
          '/data-engineering/32-data-types-structured-unstructured/',
          '/data-engineering/33-data-flow-in-ai-apps/',
        ],
      },
      {
        title: 'ETL and Data Pipelines Explained',
        canonical: '/data-engineering/34-what-is-etl/',
        redirects: [
          '/data-engineering/36-data-pipelines/',
          '/data-engineering/40-data-cleaning-basics/',
        ],
      },
      {
        title: 'Batch vs Real-Time Data Systems',
        canonical: '/data-engineering/35-batch-vs-real-time/',
        redirects: [
          '/data-engineering/41-real-time-data-systems/',
          '/data-engineering/42-kafka-basics/',
        ],
      },
      {
        title: 'Data Lakes, Warehouses, SQL and Orchestration',
        canonical: '/data-engineering/37-data-lakes-vs-warehouses/',
        redirects: [
          '/data-engineering/39-sql-for-ai-apps/',
          '/data-engineering/43-airflow-orchestration/',
        ],
      },
      {
        title: 'Design Data Architecture for AI',
        canonical: '/data-engineering/45-ai-data-architecture/',
        redirects: [
          '/data-engineering/38-preparing-data-for-ai/',
          '/data-engineering/44-data-governance/',
        ],
      },
    ],
  },
  {
    category: 'cloud-devops',
    title: 'The Cloud & DevOps Handbook',
    categoryAliases: ['/category/cloud-devops/'],
    chapters: [
      {
        title: 'Cloud Computing for Modern AI Applications',
        canonical: '/cloud-devops/46-what-is-cloud-ai-apps/',
        redirects: [
          '/cloud-devops/47-aws-vs-azure-vs-gcp/',
          '/cloud-devops/48-hosting-ai-apps/',
        ],
      },
      {
        title: 'DevOps and CI/CD: From Code to Production',
        canonical: '/cloud-devops/49-what-is-devops/',
        redirects: [
          '/cloud-devops/50-cicd-basics/',
          '/cloud-devops/53-deploy-ai-app/',
        ],
      },
      {
        title: 'Containers and Kubernetes Explained',
        canonical: '/cloud-devops/51-docker-for-ai-apps/',
        redirects: [
          '/cloud-devops/52-kubernetes-basics/',
          '/cloud-devops/54-infrastructure-as-code/',
        ],
      },
      {
        title: 'Build Observable and Scalable Cloud Systems',
        canonical: '/cloud-devops/55-monitoring-ai-apps/',
        redirects: [
          '/cloud-devops/56-scalable-ai-architecture/',
          '/cloud-devops/57-load-balancing-auto-scaling/',
        ],
      },
      {
        title: 'Secure and Control Cloud Architecture',
        canonical: '/cloud-devops/59-devsecops/',
        redirects: [
          '/cloud-devops/58-multi-cloud-ai-systems/',
          '/cloud-devops/60-cloud-cost-optimization/',
        ],
      },
    ],
  },
  {
    category: 'software-engineering',
    title: 'The GitHub Copilot Handbook',
    categoryAliases: ['/category/software-engineering/'],
    chapters: [
      {
        title: 'GitHub Copilot Explained: More Than Code Completion',
        canonical: '/software-engineering/62-how-developers-use-ai-tools/',
        redirects: [
          '/software-engineering/61-software-engineering-in-ai-era/',
          '/software-engineering/65-app-flow-understanding/',
        ],
      },
      {
        title: 'Give GitHub Copilot Better Context',
        canonical: '/software-engineering/63-api-first-thinking/',
        redirects: [
          '/software-engineering/68-clean-code-with-ai/',
          '/software-engineering/70-git-ai-workflows/',
        ],
      },
      {
        title: 'Build a Feature with GitHub Copilot',
        canonical: '/software-engineering/66-ai-assisted-coding-workflow/',
        redirects: [
          '/software-engineering/67-building-apps-using-ai-apis/',
          '/software-engineering/74-ai-devops-integration/',
        ],
      },
      {
        title: 'Debug, Test and Refactor with GitHub Copilot',
        canonical: '/software-engineering/64-debugging-ai-generated-code/',
        redirects: [
          '/software-engineering/69-testing-ai-generated-code/',
          '/software-engineering/71-ai-system-design-basics/',
        ],
      },
      {
        title: 'Use GitHub Copilot Responsibly in Real Projects',
        canonical: '/software-engineering/75-secure-ai-coding/',
        redirects: [
          '/software-engineering/72-scalable-ai-apps/',
          '/software-engineering/73-microservices-ai/',
        ],
      },
    ],
  },
  {
    category: 'cybersecurity',
    title: 'The AI Cybersecurity Handbook',
    categoryAliases: ['/category/cybersecurity/'],
    chapters: [
      {
        title: 'Cybersecurity Fundamentals: Assets, Threats and Controls',
        canonical: '/cybersecurity/76-what-is-cybersecurity/',
        redirects: [
          '/cybersecurity/77-common-cyber-attacks/',
          '/cybersecurity/80-network-basics/',
        ],
      },
      {
        title: 'Identity, Passwords and Zero-Trust Access',
        canonical: '/cybersecurity/78-iam-basics/',
        redirects: [
          '/cybersecurity/79-password-security/',
          '/cybersecurity/86-zero-trust-architecture/',
        ],
      },
      {
        title: 'How AI Changes Threat Detection and Attacks',
        canonical: '/cybersecurity/81-ai-in-cybersecurity/',
        redirects: [
          '/cybersecurity/82-threat-detection-systems/',
          '/cybersecurity/87-ai-based-cyber-attacks/',
        ],
      },
      {
        title: 'Protect Cloud and AI Applications',
        canonical: '/cybersecurity/84-cloud-security/',
        redirects: [
          '/cybersecurity/83-encryption-basics/',
          '/cybersecurity/88-securing-ai-applications/',
        ],
      },
      {
        title: 'Find, Respond to and Learn from Security Incidents',
        canonical: '/cybersecurity/89-incident-response-systems/',
        redirects: [
          '/cybersecurity/85-vulnerability-scanning/',
          '/cybersecurity/90-enterprise-security-design/',
        ],
      },
    ],
  },
  {
    category: 'case-studies',
    title: 'The Real-World AI Systems Handbook',
    categoryAliases: ['/category/case-studies/'],
    chapters: [
      {
        title: 'How an AI Content Workflow Works End to End',
        canonical: '/case-studies/100-ai-content-creation-workflow/',
        redirects: [
          '/case-studies/91-student-using-chatgpt/',
          '/case-studies/94-ai-in-daily-apps/',
        ],
      },
      {
        title: 'Inside a Complete AI Product',
        canonical: '/case-studies/101-full-ai-product-breakdown/',
        redirects: [
          '/case-studies/95-simple-ai-startup-story/',
          '/case-studies/99-ai-in-e-commerce/',
        ],
      },
      {
        title: 'Design an AI Startup Architecture',
        canonical: '/case-studies/102-startup-architecture-case-study/',
        redirects: [
          '/case-studies/92-ai-in-agriculture/',
          '/case-studies/96-ai-in-companies/',
        ],
      },
      {
        title: 'Scale an AI System Reliably',
        canonical: '/case-studies/103-scaling-ai-systems/',
        redirects: [
          '/case-studies/98-ai-in-finance/',
          '/case-studies/105-future-of-ai-jobs/',
        ],
      },
      {
        title: 'Build Responsible AI for High-Stakes Use Cases',
        canonical: '/case-studies/97-ai-in-healthcare/',
        redirects: [
          '/case-studies/93-ai-in-education/',
          '/case-studies/104-ai-ethics/',
        ],
      },
    ],
  },
];

export const HANDBOOK_CANONICAL_URLS = SEO_URL_PLAN.flatMap((handbook) =>
  handbook.chapters.map((chapter) => chapter.canonical),
);

export const LEGACY_TUTORIAL_REDIRECTS = SEO_URL_PLAN.flatMap((handbook) =>
  handbook.chapters.flatMap((chapter) =>
    chapter.redirects.map((source) => ({ source, destination: chapter.canonical })),
  ),
);

export const LEGACY_CATEGORY_REDIRECTS = SEO_URL_PLAN.flatMap((handbook) =>
  handbook.categoryAliases.map((source) => ({ source, destination: `/${handbook.category}/` })),
);
