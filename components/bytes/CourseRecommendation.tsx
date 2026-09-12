import { ArrowRight, BookOpenCheck, Layers3 } from 'lucide-react';
import { getCategoryBySlug } from '@/lib/categories';

const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';
const courseLinks: Record<string,string> = {
  genai: 'https://www.maanavan.com/courses/generative-ai',
  'ai-agents': 'https://www.maanavan.com/courses/ai-agents-automation',
  'data-engineering': 'https://www.maanavan.com/courses/data-engineering',
  'cloud-devops': 'https://www.maanavan.com/courses/cloud-devops',
  'software-engineering': 'https://www.maanavan.com/courses/software-engineering',
  cybersecurity: 'https://www.maanavan.com/courses/cybersecurity',
  'case-studies': 'https://www.maanavan.com/course-library',
};

export function CourseRecommendation({categorySlug}:{categorySlug:string}) {
  const category=getCategoryBySlug(categorySlug);
  return <aside className="course-recommendation"><div className="recommendation-icon"><BookOpenCheck/></div><div className="recommendation-copy"><p>CONTINUE WITH STRUCTURED LEARNING</p><h2>Turn this {category?.title || 'technology'} concept into a practical skill.</h2><span>Bytes help you understand the idea. MaanavaN courses connect the concepts through guided lessons, practice and projects.</span><div><a className="recommendation-primary" href={courseLinks[categorySlug] || 'https://www.maanavan.com/course-library'}>Explore related courses <ArrowRight/></a><a className="recommendation-secondary" href={membership}><Layers3/>View All-Access Membership</a></div></div></aside>;
}
