import Image from 'next/image';
import { ArrowUpRight, Linkedin } from 'lucide-react';

export function AuthorCard() {
  return <aside className="byte-author-card" aria-label="About the author">
    <div className="author-avatar"><Image src="/sathish-kumar-maanavan-mentor.webp" alt="Sathish Kumar K, AI Educator and Founder of MaanavaN" width={720} height={900} sizes="72px" /></div>
    <div className="author-copy"><p>ABOUT THE AUTHOR</p><h2>Sathish Kumar K</h2><strong>AI Educator · Founder, MaanavaN</strong><span>Explaining AI, cloud and software engineering through practical workflows that learners can apply with confidence.</span></div>
    <div className="author-actions"><a className="author-linkedin" href="https://www.linkedin.com/in/sathish-kumar-ceo/" target="_blank" rel="noreferrer"><span><Linkedin/></span><b>Follow Sathish on LinkedIn<small>Insights on AI, cloud and careers</small></b><ArrowUpRight/></a><a className="author-profile" href="https://www.maanavan.com/about/sathish-kumar"><b>Meet your educator<small>Experience, mentoring and work</small></b><ArrowUpRight/></a></div>
  </aside>;
}
