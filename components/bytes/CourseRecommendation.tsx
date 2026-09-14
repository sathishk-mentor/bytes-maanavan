import { ArrowRight, BookOpenCheck, Check, Layers3, Sparkles } from 'lucide-react';
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
  const topic=categorySlug==='software-engineering'?'GitHub Copilot':categorySlug==='forward-deployed-engineer'?'forward deployment':categorySlug==='cloud-devops'?'Docker and cloud deployment':categorySlug==='langchain'?'LangChain, RAG and AI agents':categorySlug==='rag-application-engineering'?'RAG application engineering':categorySlug==='fastapi-ai-applications'?'FastAPI for AI applications':categorySlug==='modern-java-spring-boot-genai'?'Java, Spring Boot and GenAI':categorySlug==='sql-data-ai-applications'?'SQL, data and AI application':category?.title || 'technology';
  return <aside className="course-recommendation"><div className="recommendation-icon"><BookOpenCheck/></div><div className="recommendation-copy"><p><Sparkles/>CONTINUE WITH MAANAVAN</p><h2>Turn this {topic} concept into a practical skill.</h2><span>Move from one clear concept to guided lessons, hands-on practice and portfolio-ready application.</span><div className="recommendation-path" aria-label="Learning path"><i><Check/>Understand</i><b>→</b><i><Check/>Practise</i><b>→</b><i><Check/>Build</i></div><div className="recommendation-actions"><a className="recommendation-primary" href={courseLinks[categorySlug] || 'https://www.maanavan.com/course-library'}><span><BookOpenCheck/></span><b>Explore related courses<small>Choose your structured learning path</small></b><ArrowRight/></a><a className="recommendation-secondary" href={membership}><span><Layers3/></span><b>Explore Membership<small>Access eligible courses in one plan</small></b><ArrowRight/></a></div></div></aside>;
}
