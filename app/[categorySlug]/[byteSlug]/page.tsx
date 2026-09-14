import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import legacyRoutes from '@/data/legacy-routes.json';
import { ByteHeader } from '@/components/bytes/ByteHeader';
import { ByteContent } from '@/components/bytes/ByteContent';
import { PrevNextNav } from '@/components/bytes/PrevNextNav';
import { AccordionTableOfContents } from '@/components/bytes/AccordionTableOfContents';
import {
  getAllBytes,
  getByteBySlug,
  getAdjacentBytes,
  getBytesByCategory,
  extractHeadings,
} from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/categories';
import { CourseRecommendation } from '@/components/bytes/CourseRecommendation';
import { ReadingReveal } from '@/components/bytes/ReadingReveal';
import { AuthorCard } from '@/components/bytes/AuthorCard';
import { BeginnerAnalogy } from '@/components/bytes/BeginnerAnalogy';

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

const searchTitles:Record<string,string>={
  '01-what-is-an-ai-agent-from-answering-to-taking-action':'What Is an AI Agent? A Beginner-Friendly Explanation',
  '02-how-an-ai-agent-works-goal-reasoning-tools-actions':'How AI Agents Work: Goal, Tools and Actions',
  '03-tools-knowledge-memory-explained-simply':'AI Agent Tools, Knowledge and Memory Explained',
  '04-build-first-ai-agent-without-coding':'Build Your First No-Code AI Agent',
  '05-use-ai-agents-safely-responsibly':'AI Agent Safety: Permissions, Privacy and Human Review',
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
};

const movedRoutes:Record<string,string>={
  '62-how-developers-use-ai-tools':'01-github-copilot-for-developers',
  '63-api-first-thinking':'02-give-github-copilot-better-context',
  '64-debugging-ai-generated-code':'03-debug-test-refactor-with-github-copilot',
  '66-ai-assisted-coding-workflow':'04-build-feature-with-github-copilot',
  '75-secure-ai-coding':'05-use-github-copilot-responsibly',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const bytes = await getAllBytes();
  const published = bytes.filter((byte) => ['ai-agents','software-engineering','forward-deployed-engineer','cloud-devops','langchain','rag-application-engineering','fastapi-ai-applications','modern-java-spring-boot-genai','sql-data-ai-applications'].includes(byte.category)).map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
  const legacy = legacyRoutes
    .map((route) => route.split('/').filter(Boolean))
    .filter((parts) => parts.length === 2)
    .map(([categorySlug, byteSlug]) => ({ categorySlug, byteSlug }));

  const moved = Object.keys(movedRoutes).map((byteSlug)=>({categorySlug:'software-engineering',byteSlug}));
  return [...published, ...legacy, ...moved, { categorySlug: 'ai-agents', byteSlug: 'introduction-to-ai-agents' }]
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

  // Get byte and validate category matches
  const byte = await getByteBySlug(byteSlug);

  if (!byte || byte.category !== categorySlug) {
    permanentRedirect(legacyDestination(categorySlug));
  }

  const category = getCategoryBySlug(byte.category);
  const { prev, next } = await getAdjacentBytes(byteSlug);
  const handbookBytes = await getBytesByCategory(categorySlug);
  const chapterNumber = handbookBytes.findIndex((item) => item.slug === byteSlug) + 1;

  // Extract headings for accordion navigation
  const headings = extractHeadings(byte.content);

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
          <AccordionTableOfContents headings={headings} byteSlug={byte.slug} />
          <div className="byte-main-column">
            <ReadingReveal><BeginnerAnalogy slug={byte.slug}/><ByteContent content={byte.content} /><AuthorCard/><CourseRecommendation categorySlug={categorySlug} /><div className="mt-12"><PrevNextNav prev={prev} next={next} /></div></ReadingReveal>
          </div>
          <aside className="byte-trust-rail"><div className="byte-progress-card"><span>LEARNING PROGRESS</span><h3>Chapter {chapterNumber} of {handbookBytes.length}</h3><p>{category?.title}</p><div className="byte-progress-track"><i style={{width:`${chapterNumber * 20}%`}} /></div><small>{byte.duration} focused reading</small></div><div className="byte-review-card"><span>INSIDE THIS BYTE</span><h3>Learn it visually</h3><p>Workflow · example · practical takeaway</p><small>Designed for focused, self-paced learning</small></div></aside>
        </div>
      </div>
    </>
  );
}
