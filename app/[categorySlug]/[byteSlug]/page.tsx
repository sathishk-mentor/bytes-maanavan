import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import legacyRoutes from '@/data/legacy-routes.json';
import { ByteHeader } from '@/components/bytes/ByteHeader';
import { ByteContent } from '@/components/bytes/ByteContent';
import { PrevNextNav } from '@/components/bytes/PrevNextNav';
import { ConnectedLearning } from '@/components/bytes/ConnectedLearning';
import { getLearningConnections } from '@/lib/byte-connections';
import { AccordionTableOfContents } from '@/components/bytes/AccordionTableOfContents';
import {
  getAllBytes,
  getByteBySlug,
  getAdjacentBytes,
  getBytesByCategory,
  extractHeadings,
  getEnglishContent,
  getTanglishContent,
} from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/categories';
import { CourseRecommendation } from '@/components/bytes/CourseRecommendation';
import { ReadingReveal } from '@/components/bytes/ReadingReveal';
import { AuthorCard } from '@/components/bytes/AuthorCard';
import { BeginnerAnalogy } from '@/components/bytes/BeginnerAnalogy';
import { HandbookQuickNav } from '@/components/bytes/HandbookQuickNav';
import { ReadingModeToggle } from '@/components/bytes/ReadingMode';

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

const searchTitles:Record<string,string>={
  '01-what-is-an-ai-agent-from-answering-to-taking-action':'What Is an AI Agent? A Beginner-Friendly Explanation',
  '02-how-an-ai-agent-works-goal-reasoning-tools-actions':'How AI Agents Work: Goal, Tools and Actions',
  '03-tools-knowledge-memory-explained-simply':'AI Agent Use Cases and Adoption in India',
  '04-build-first-ai-agent-without-coding':'AI Agent Risks and Guardrails for Beginners',
  '05-use-ai-agents-safely-responsibly':'Getting Started with AI Agents: A Safe Pilot Plan',
  '01-github-copilot-for-developers':'GitHub Copilot Explained for Developers',
  '02-give-github-copilot-better-context':'Give GitHub Copilot Better Context',
  '03-debug-test-refactor-with-github-copilot':'Debug, Test and Refactor with GitHub Copilot',
  '04-build-feature-with-github-copilot':'Build a Feature with GitHub Copilot',
  '05-use-github-copilot-responsibly':'Use GitHub Copilot Responsibly',
  '01-what-does-a-forward-deployed-engineer-do':'Forward Deployed Engineer Role Explained',
  '02-problem-discovery-and-workflow-mapping':'FDE Problem Discovery and Workflow Mapping',
  '03-design-thin-production-slice':'FDE Thin Production Slice Architecture',
  '04-deploy-observe-and-improve':'FDE Production Feedback Loop',
  '05-turn-field-learning-into-product':'FDE Field Learning to Product Strategy',
  '01-what-is-docker-containers-explained':'What Is Docker? Containers Explained',
  '02-dockerize-first-python-application':'Dockerize Your First Python Application',
  '03-docker-ports-volumes-environment-variables':'Docker Ports, Volumes and Environment Variables',
  '04-multi-container-applications-docker-compose':'Docker Compose Multi-Container Tutorial',
  '05-dockerize-deploy-generative-ai-application':'Dockerize and Deploy a Generative AI App',
  '01-what-is-langchain-build-llm-applications':'What Is LangChain? LLM Applications Explained',
  '02-connect-python-with-llms-using-langchain':'Connect Python with LLMs Using LangChain',
  '03-build-rag-applications-with-your-documents':'LangChain RAG Tutorial with Your Documents',
  '04-build-ai-agents-with-tools-and-memory':'LangChain AI Agents with Tools and Memory',
  '05-production-ready-langchain-application':'Production-Ready LangChain Application',
  '01-what-is-rag-give-ai-access-to-your-knowledge':'What Is RAG? Retrieval-Augmented Generation Explained',
  '02-prepare-documents-loading-cleaning-chunking':'RAG Document Loading, Cleaning and Chunking',
  '03-embeddings-vector-databases-semantic-search':'Embeddings, Vector Databases and Semantic Search',
  '04-build-complete-rag-application-python-langchain':'Build a RAG Application with Python and LangChain',
  '05-production-rag-evaluation-security-deployment':'Production RAG Evaluation, Security and Deployment',
  '01-what-is-fastapi-turn-python-into-web-api':'What Is FastAPI? Python Web APIs Explained',
  '02-rest-api-validation-error-handling':'FastAPI Validation and Error Handling Tutorial',
  '03-databases-external-services-configuration':'FastAPI Databases and External API Integration',
  '04-build-stream-generative-ai-api':'Build and Stream a Generative AI API with FastAPI',
  '05-secure-test-deploy-production-fastapi':'Secure, Test and Deploy FastAPI in Production',
  '01-modern-java-foundations-ai-era':'Modern Java Foundations for the AI Era',
  '02-build-rest-apis-java-spring-boot':'Build REST APIs with Java and Spring Boot',
  '03-connect-spring-boot-database':'Connect Spring Boot with a Database',
  '04-add-generative-ai-rag-java':'Add Generative AI and RAG to a Java Application',
  '05-build-deploy-enterprise-ai-application':'Build and Deploy an Enterprise Java AI Application',
  '01-sql-foundations-ask-questions-using-data':'SQL Foundations: Ask Questions Using Data',
  '02-analyse-business-data-with-sql':'Analyse Business Data with SQL',
  '03-connect-data-across-tables-joins':'Connect Data Across Tables Using Joins',
  '04-sql-data-rag-ai-agent-workflows':'Use SQL in Data, RAG and AI-Agent Workflows',
  '05-write-production-ready-sql':'Write Production-Ready SQL',
  'what-is-mongodb-documents-collections-databases':'Document Model Basics for AI Apps',
  'mongodb-data-modeling-embedding-vs-referencing':'Atlas Vector Search and RAG with MongoDB',
  'mongodb-queries-updates-aggregation-pipeline':'Storing Conversation and Agent Memory in MongoDB',
  'mongodb-python-fastapi-ai-application':'Aggregation Pipeline for AI Features',
  'production-mongodb-indexing-security-deployment':'Production Concerns for MongoDB AI Apps',
  'python-foundations-for-ai-applications':'Python Foundations for AI Application Development',
  'python-apis-json-llm-responses':'Python APIs, JSON and LLM Responses',
  'build-generative-ai-application-python':'Build a Generative AI Application with Python',
  'build-ai-agents-tools-memory-python':'Build AI Agents with Tools and Memory Using Python',
  'test-secure-deploy-python-ai-applications':'Test, Secure and Deploy Python AI Applications',
};

const movedRoutes:Record<string,string>={
  '62-how-developers-use-ai-tools':'01-github-copilot-for-developers',
  '63-api-first-thinking':'02-give-github-copilot-better-context',
  '64-debugging-ai-generated-code':'03-debug-test-refactor-with-github-copilot',
  '66-ai-assisted-coding-workflow':'04-build-feature-with-github-copilot',
  '75-secure-ai-coding':'05-use-github-copilot-responsibly',
};

const movedFdeRoutes:Record<string,string>={
  '01-what-does-a-forward-deployed-engineer-do':'01-what-is-a-forward-deployed-engineer',
  '02-problem-discovery-and-workflow-mapping':'03-forward-deployed-engineer-engagement-lifecycle',
  '03-design-thin-production-slice':'03-forward-deployed-engineer-engagement-lifecycle',
  '04-deploy-observe-and-improve':'04-build-customer-trust-as-an-fde',
  '05-turn-field-learning-into-product':'02-forward-deployed-engineer-skillset',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const bytes = await getAllBytes();
  const published = bytes.filter((byte) => ['ai-agents','software-engineering','forward-deployed-engineer','cloud-devops','langchain','rag-application-engineering','fastapi-ai-applications','modern-java-spring-boot-genai','sql-data-ai-applications','mongodb','python-genai-agentic-ai'].includes(byte.category)).map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
  const legacy = legacyRoutes
    .map((route) => route.split('/').filter(Boolean))
    .filter((parts) => parts.length === 2)
    .map(([categorySlug, byteSlug]) => ({ categorySlug, byteSlug }));

  const moved = Object.keys(movedRoutes).map((byteSlug)=>({categorySlug:'software-engineering',byteSlug}));
  const movedFde = Object.keys(movedFdeRoutes).map((byteSlug)=>({categorySlug:'forward-deployed-engineer',byteSlug}));
  return [...published, ...legacy, ...moved, ...movedFde, { categorySlug: 'ai-agents', byteSlug: 'introduction-to-ai-agents' }]
    .filter((route, index, routes) => routes.findIndex((item) => item.categorySlug === route.categorySlug && item.byteSlug === route.byteSlug) === index);
}

function legacyDestination(categorySlug: string) {
  const destinations: Record<string,string> = {
    'software-engineering':'/software-engineering/',
    'forward-deployed-engineer':'/forward-deployed-engineer/',
    genai:'https://www.maanavan.com/courses/generative-ai',
    'ai-agents':'https://www.maanavan.com/courses/ai-agents-automation',
    'data-engineering':'https://www.maanavan.com/courses/data-engineering',
    'cloud-devops':'https://www.maanavan.com/courses/cloud-devops',
    langchain:'/langchain/',
    'rag-application-engineering':'/rag-application-engineering/',
    'fastapi-ai-applications':'/fastapi-ai-applications/',
    'modern-java-spring-boot-genai':'/modern-java-spring-boot-genai/',
    'sql-data-ai-applications':'/sql-data-ai-applications/',
    mongodb:'/mongodb/',
    'python-genai-agentic-ai':'/python-genai-agentic-ai/',
    cybersecurity:'https://www.maanavan.com/courses/cybersecurity',
    'case-studies':'/forward-deployed-engineer/',
  };
  return destinations[categorySlug] || '/handbooks/';
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = await getByteBySlug(params.byteSlug);

  if (!byte || byte.category !== params.categorySlug) {
    return { title: 'This Byte has moved | MaanavaN Bytes', robots: { index: false, follow: true } };
  }

  return {
    title: searchTitles[byte.slug] || byte.title,
    description: byte.summary,
    keywords: byte.tags,
    authors: [{name:'Sathish Kumar',url:'https://www.maanavan.com/about/sathish-kumar'}],
    alternates: { canonical: `/${byte.category}/${byte.slug}/` },
    openGraph: {
      title: byte.title,
      description: byte.summary,
      type: 'article',
      url: `/${byte.category}/${byte.slug}/`,
      modifiedTime: byte.updatedAt,
    },
    twitter: {card:'summary_large_image',title:byte.title,description:byte.summary},
  };
}

export default async function BytePage({ params }: BytePageProps) {
  const { categorySlug, byteSlug } = params;

  if (categorySlug === 'software-engineering' && movedRoutes[byteSlug]) {
    permanentRedirect(`/software-engineering/${movedRoutes[byteSlug]}/`);
  }
  if (categorySlug === 'forward-deployed-engineer' && movedFdeRoutes[byteSlug]) {
    permanentRedirect(`/forward-deployed-engineer/${movedFdeRoutes[byteSlug]}/`);
  }

  // Get byte and validate category matches
  const byte = await getByteBySlug(byteSlug);

  if (!byte || byte.category !== categorySlug) {
    permanentRedirect(legacyDestination(categorySlug));
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(byteSlug);
  const handbookBytes = await getBytesByCategory(categorySlug);
  const chapterNumber = handbookBytes.findIndex((item) => item.slug === byteSlug) + 1;
  const connectionDefinitions = getLearningConnections(categorySlug, byte.order);
  const connectedLearning = (await Promise.all(connectionDefinitions.map(async (connection) => {
    const linkedByte = await getByteBySlug(connection.slug);
    return linkedByte ? { ...connection, byte: linkedByte } : null;
  }))).filter((item): item is NonNullable<typeof item> => item !== null);

  const uploadedEnglishContent = await getEnglishContent(categorySlug, byteSlug);
  const primaryContent = uploadedEnglishContent || byte.content;
  const tanglishContent = await getTanglishContent(categorySlug, byteSlug);
  const headings = extractHeadings(primaryContent);
  const tanglishHeadings = tanglishContent ? extractHeadings(tanglishContent) : [];

  const canonical=`https://bytes.maanavan.com/${categorySlug}/${byteSlug}/`;
  const minutes=Number.parseInt(byte.duration,10) || 10;
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':['Article','LearningResource'],'@id':`${canonical}#learning-resource`,headline:byte.title,name:byte.title,description:byte.summary,abstract:byte.summary,url:canonical,dateModified:byte.updatedAt,author:{'@type':'Person',name:'Sathish Kumar',url:'https://www.maanavan.com/about/sathish-kumar'},publisher:{'@id':'https://www.maanavan.com/#organization'},isPartOf:{'@id':`https://bytes.maanavan.com/${categorySlug}/#collection`},educationalLevel:byte.level,learningResourceType:'Tutorial',timeRequired:`PT${minutes}M`,inLanguage:['en-IN','ta-IN'],isAccessibleForFree:true,keywords:byte.tags.join(', '),about:byte.tags.map((name)=>({'@type':'Thing',name})),teaches:[byte.title,byte.summary],audience:{'@type':'Audience',audienceType:'Beginners, working professionals and Tamil-speaking technology learners'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MaanavaN Bytes',item:'https://bytes.maanavan.com/'},{'@type':'ListItem',position:2,name:category?.title,item:`https://bytes.maanavan.com/${categorySlug}/`},{'@type':'ListItem',position:3,name:byte.title,item:canonical}]}
  ]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
      <ByteHeader byte={byte} chapterNumber={chapterNumber} />

      <div className="byte-reading-canvas">
        <div className="byte-reading-layout">
          <AccordionTableOfContents headings={headings} tanglishHeadings={tanglishHeadings} byteSlug={byte.slug} />
          <div className="byte-main-column">
            <HandbookQuickNav bytes={handbookBytes} currentSlug={byteSlug} handbookTitle={category?.title || 'MaanavaN Handbook'} duration={byte.duration} mobile />
            {tanglishContent && <ReadingModeToggle />}
            <ReadingReveal><BeginnerAnalogy slug={byte.slug}/><ByteContent content={primaryContent} tanglishContent={tanglishContent} /><AuthorCard/><ConnectedLearning items={connectedLearning}/><CourseRecommendation categorySlug={categorySlug} /><div className="mt-12"><PrevNextNav prev={prev} next={next} /></div></ReadingReveal>
          </div>
          <aside className="byte-trust-rail" aria-label="Handbook quick navigation">
            <HandbookQuickNav bytes={handbookBytes} currentSlug={byteSlug} handbookTitle={category?.title || 'MaanavaN Handbook'} duration={byte.duration} />
          </aside>
        </div>
      </div>
    </>
  );
}
