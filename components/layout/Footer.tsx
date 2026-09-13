import Link from 'next/link';
import { ArrowRight, Mail, Phone, Smartphone } from 'lucide-react';

const main = 'https://www.maanavan.com';
const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main container-custom">
      <section className="footer-brand"><p className="footer-logo">MaanavaN<sup>®</sup></p><span>AI UPSKILLS · BYTES</span><p>Practical AI and technology learning for Tamil-speaking learners worldwide. Learn concepts free, then build complete skills through structured courses.</p><a className="footer-membership" href={membership}>Explore All-Access Membership <ArrowRight/></a><div><a href="tel:+918073044127"><Phone/>+91 8073044127</a><a href="mailto:info@maanavan.com"><Mail/>info@maanavan.com</a></div></section>
      <section><h3>Learn with Bytes</h3><Link href="/genai/">Generative AI</Link><Link href="/ai-agents/">AI Agents</Link><Link href="/data-engineering/">Data Engineering</Link><Link href="/cloud-devops/">Cloud & DevOps</Link><Link href="/software-engineering/">GitHub Copilot Handbook</Link><Link href="/cybersecurity/">Cybersecurity</Link></section>
      <section><h3>Continue Learning</h3><a href={`${main}/course-library`}>All Tamil Courses</a><a href={`${main}/free-courses`}>Free Courses</a><a href={`${main}/solutions/career-learning-paths`}>Career Learning Paths</a><a href={`${main}/practice-tests`}>Practice Tests</a><a href={membership}>All-Access Membership</a><a href={`${main}/about/sathish-kumar`}>Meet the Founder</a></section>
      <section><h3>Learn on the go</h3><p>Continue learning with courses, practice and guidance through the MaanavaN Upskills app.</p><a className="app-link" href="https://play.google.com/store/apps/details?id=com.maanavanlearncode.courses&hl=en_IN"><Smartphone/>Open on Google Play <ArrowRight/></a><a href={`${main}/privacy-policy`}>Privacy Policy</a><a href={`${main}/terms-of-service`}>Terms of Service</a></section>
    </div>
    <div className="footer-bottom container-custom"><span>© 2026 MaanavaN®. All rights reserved.</span><span>MaanavaN® is a registered trademark.</span><a href={main}>Visit MaanavaN.com</a></div>
  </footer>;
}
