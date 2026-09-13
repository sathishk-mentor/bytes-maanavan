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

interface BytePageProps {
  params: {
    categorySlug: string;
    byteSlug: string;
  };
}

const searchTitles:Record<string,string>={
  '62-how-developers-use-ai-tools':'GitHub Copilot Explained for Developers',
  '63-api-first-thinking':'Give GitHub Copilot Better Context',
  '66-ai-assisted-coding-workflow':'Build a Feature with GitHub Copilot',
  '64-debugging-ai-generated-code':'Debug and Test with GitHub Copilot',
  '75-secure-ai-coding':'Responsible GitHub Copilot Use',
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
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const bytes = await getAllBytes();
  const published = bytes.filter((byte) => ['software-engineering','forward-deployed-engineer','cloud-devops'].includes(byte.category)).map((byte) => ({
    categorySlug: byte.category,
    byteSlug: byte.slug,
  }));
  const legacy = legacyRoutes
    .map((route) => route.split('/').filter(Boolean))
    .filter((parts) => parts.length === 2)
    .map(([categorySlug, byteSlug]) => ({ categorySlug, byteSlug }));

  return [...published, ...legacy, { categorySlug: 'ai-agents', byteSlug: 'introduction-to-ai-agents' }]
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
    {'@type':['Article','LearningResource'],'@id':`${canonical}#learning-resource`,headline:byte.title,name:byte.title,description:byte.summary,url:canonical,dateModified:byte.updatedAt,author:{'@type':'Person',name:'Sathish Kumar',url:'https://www.maanavan.com/about/sathish-kumar'},publisher:{'@id':'https://www.maanavan.com/#organization'},isPartOf:{'@id':`https://bytes.maanavan.com/${categorySlug}/#collection`},educationalLevel:byte.level,learningResourceType:'Tutorial',timeRequired:`PT${minutes}M`,inLanguage:'en-IN',audience:{'@type':'Audience',audienceType:'Tamil-speaking technology learners'}},
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
            <ReadingReveal><ByteContent content={byte.content} /><CourseRecommendation categorySlug={categorySlug} /><div className="mt-12"><PrevNextNav prev={prev} next={next} /></div></ReadingReveal>
          </div>
          <aside className="byte-trust-rail"><div className="byte-progress-card"><span>LEARNING PROGRESS</span><h3>Chapter {chapterNumber} of {handbookBytes.length}</h3><p>{category?.title}</p><div className="byte-progress-track"><i style={{width:`${chapterNumber * 20}%`}} /></div><small>{byte.duration} focused reading</small></div><div className="byte-review-card"><span>INSIDE THIS BYTE</span><h3>Learn it visually</h3><p>Workflow · example · practical takeaway</p><small>Designed for focused, self-paced learning</small></div></aside>
        </div>
      </div>
    </>
  );
}
