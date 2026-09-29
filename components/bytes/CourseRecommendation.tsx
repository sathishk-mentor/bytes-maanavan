import { ArrowUpRight, BookOpenCheck, Check, Layers3, Sparkles } from 'lucide-react';
import { getCategoryBySlug } from '@/lib/categories';

const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';
const courseLinks: Record<string,string> = {
  genai: 'https://www.maanavan.com/courses/generative-ai',
  'ai-agents': 'https://www.maanavan.com/courses/ai-agents-automation',
  'data-engineering': 'https://www.maanavan.com/courses/data-engineering',
  'cloud-devops': 'https://www.maanavan.com/courses/cloud-devops',
  'langchain': 'https://www.maanavan.com/courses/generative-ai',
  'software-engineering': 'https://www.maanavan.com/courses/software-engineering',
  'forward-deployed-engineer': 'https://www.maanavan.com/course-library',
  cybersecurity: 'https://www.maanavan.com/courses/cybersecurity',
  'case-studies': 'https://www.maanavan.com/course-library',
};

export function CourseRecommendation({categorySlug}:{categorySlug:string}) {
  const category=getCategoryBySlug(categorySlug);
  const topic=categorySlug==='software-engineering'?'GitHub Copilot':categorySlug==='forward-deployed-engineer'?'forward deployment':categorySlug==='cloud-devops'?'Docker and cloud deployment':categorySlug==='langchain'?'LangChain, RAG and AI agents':categorySlug==='rag-application-engineering'?'RAG application engineering':categorySlug==='fastapi-ai-applications'?'FastAPI for AI applications':categorySlug==='modern-java-spring-boot-genai'?'Java, Spring Boot and GenAI':categorySlug==='sql-data-ai-applications'?'SQL, data and AI application':categorySlug==='mongodb'?'MongoDB and AI application engineering':category?.title || 'technology';
  const courseHref = courseLinks[categorySlug] || 'https://www.maanavan.com/course-library';
  const hasTopicCollection = Boolean(courseLinks[categorySlug]);
  return <aside className="course-recommendation">
    <div className="recommendation-intro">
      <div className="recommendation-icon"><BookOpenCheck/></div>
      <div className="recommendation-copy">
        <p><Sparkles/>YOUR NEXT STEP</p>
        <h2>Build the skill—not just the understanding.</h2>
        <span>Explore courses related to {topic}. Check the level, lessons and format before choosing what to learn next.</span>
        <ul aria-label="Course experience">
          <li><Check/>Choose a suitable level</li>
          <li><Check/>Check the course syllabus</li>
          <li><Check/>Practise what you learn</li>
        </ul>
      </div>
    </div>
    <div className="recommendation-actions">
      <a className="recommendation-primary" href={courseHref} target="_blank" rel="noopener noreferrer" aria-label={hasTopicCollection ? `Explore ${topic} courses in a new tab` : 'Browse the MaanavaN course library in a new tab'}>
        <span><BookOpenCheck/></span>
        <b>{hasTopicCollection ? 'Explore related courses' : 'Browse the course library'}<small>Compare courses before you choose</small></b>
        <ArrowUpRight/>
      </a>
      <a className="recommendation-secondary" href={membership} target="_blank" rel="noopener noreferrer" aria-label="Explore MaanavaN Membership in a new tab">
        <span><Layers3/></span>
        <b>View Membership<small>Learn across eligible courses</small></b>
        <ArrowUpRight/>
      </a>
    </div>
  </aside>;
}
