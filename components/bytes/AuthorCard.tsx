import { ArrowUpRight, Linkedin, Sparkles } from 'lucide-react';

export function AuthorCard() {
  return <aside className="byte-author-card" aria-label="About the author">
    <div className="author-avatar" aria-hidden="true"><span>SK</span><i><Sparkles/></i></div>
    <div className="author-copy"><p>ABOUT THE AUTHOR</p><h2>Sathish Kumar K</h2><strong>AI Educator · Founder, MaanavaN</strong><span>Explaining AI, cloud and software engineering through practical workflows that learners can apply with confidence.</span></div>
    <div className="author-actions"><a className="author-linkedin" href="https://www.linkedin.com/in/sathish-kumar-ceo/" target="_blank" rel="noreferrer"><Linkedin/>Connect on LinkedIn <ArrowUpRight/></a><a href="https://www.maanavan.com/about/sathish-kumar">View educator profile <ArrowUpRight/></a></div>
  </aside>;
}
