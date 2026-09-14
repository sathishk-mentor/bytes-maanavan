import Link from 'next/link';
import { ArrowRight, BookOpen, Linkedin, Mail, Phone, Play } from 'lucide-react';
import { SocialIcon, socialLinks } from './SocialLinks';

const main = 'https://www.maanavan.com';
const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-glow" aria-hidden="true"/>
    <div className="footer-main container-custom">
      <section className="footer-brand"><a className="footer-brand-logo" href={main} aria-label="MaanavaN home"><span className="footer-logo-mark">M</span><span><strong>MaanavaN<sup>®</sup></strong><small>AI UPSKILLS · BYTES</small></span></a><p>Visual, practical technology learning for Tamil-speaking learners worldwide—from one clear concept to confident application.</p><a className="footer-membership" href={membership}>Explore All-Access Membership <ArrowRight/></a><div><a href="tel:+918073044127"><Phone/>+91 8073044127</a><a href="mailto:info@maanavan.com"><Mail/>info@maanavan.com</a><a href="https://www.linkedin.com/in/sathish-kumar-ceo/" target="_blank" rel="noreferrer"><Linkedin/>Connect with Sathish Kumar</a></div><div className="footer-social-links" aria-label="Follow MaanavaN">{socialLinks.map((social)=><a className={`social-brand social-${social.label.toLowerCase()}`} key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Follow MaanavaN on ${social.label}`} title={social.label}><SocialIcon label={social.label}/></a>)}</div></section>
      <section><h3>Explore Handbooks</h3><Link href="/handbooks/">Browse all Bytes</Link><Link href="/langchain/">LangChain Handbook</Link><Link href="/software-engineering/">GitHub Copilot Handbook</Link><Link href="/forward-deployed-engineer/">FDE Handbook</Link><Link href="/cloud-devops/">Docker Handbook</Link></section>
      <section><h3>Continue Learning</h3><a href={`${main}/course-library`}>All Tamil Courses</a><a href={`${main}/free-courses`}>Free Courses</a><a href={`${main}/solutions/career-learning-paths`}>Career Learning Paths</a><a href={`${main}/practice-tests`}>Practice Tests</a><a href={membership}>All-Access Membership</a><a href={`${main}/about/sathish-kumar`}>Meet the Founder</a></section>
      <section className="footer-app"><div className="footer-app-icon"><BookOpen/></div><p className="footer-app-label">LEARN ANYWHERE</p><h3>Take MaanavaN with you.</h3><p>Access courses, practise skills and continue your learning journey from your phone.</p><a className="google-play-button" href="https://play.google.com/store/apps/details?id=com.maanavanlearncode.courses&hl=en_IN" target="_blank" rel="noreferrer" aria-label="Get the MaanavaN Upskills app on Google Play"><span className="google-play-mark"><Play fill="currentColor"/></span><span><small>GET IT ON</small><strong>Google Play</strong></span><ArrowRight className="store-arrow"/></a><div className="footer-legal-links"><a href={`${main}/privacy-policy`}>Privacy</a><a href={`${main}/terms-of-service`}>Terms</a></div></section>
    </div>
    <div className="footer-bottom container-custom"><span>© 2026 MaanavaN®. All rights reserved.</span><span>MaanavaN® is a registered trademark.</span><a href={main}>Visit MaanavaN.com</a></div>
  </footer>;
}
