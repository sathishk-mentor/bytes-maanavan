import { ArrowRight, BookOpenCheck, Layers3 } from 'lucide-react';
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
  const topic=categorySlug==='software-engineering'?'GitHub Copilot':categorySlug==='forward-deployed-engineer'?'forward deployment':categorySlug==='cloud-devops'?'Docker and cloud deployment':categorySlug==='langchain'?'LangChain, RAG and AI agents':category?.title || 'technology';
  return <aside className="course-recommendation"><div className="recommendation-icon"><BookOpenCheck/></div><div className="recommendation-copy"><p>CONTINUE YOUR LEARNING PATH</p><h2>Turn this {topic} concept into a practical skill.</h2><span>Move from one clear concept to guided lessons, hands-on practice and portfolio-ready application.</span><div className="recommendation-path" aria-label="Learning path"><i>Understand</i><b>→</b><i>Practise</i><b>→</b><i>Build</i></div><div className="recommendation-actions"><a className="recommendation-primary" href={courseLinks[categorySlug] || 'https://www.maanavan.com/course-library'}>Explore related courses <ArrowRight/></a><a className="recommendation-secondary" href={membership}><Layers3/>Explore Membership <ArrowRight/></a></div></div></aside>;
}
