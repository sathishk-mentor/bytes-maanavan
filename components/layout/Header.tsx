'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Mail, Menu, Phone, X } from 'lucide-react';
import { SocialIcon, socialLinks } from './SocialLinks';

const courseLibrary = 'https://www.maanavan.com/course-library';
const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header sticky top-0 z-50">
    <div className="header-utility-bar"><div className="header-utility-inner"><div className="header-utility-contact"><a href="tel:+918073044127"><Phone/><span>Call:</span> +91 8073044127</a><a className="utility-email" href="mailto:info@maanavan.com"><Mail/><span>Email:</span> info@maanavan.com</a></div><div className="header-utility-right"><div className="header-social-links" aria-label="Follow MaanavaN on social media">{socialLinks.map((social)=><a className={`social-brand social-${social.label.toLowerCase()}`} key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Follow MaanavaN on ${social.label}`} title={social.label}><SocialIcon label={social.label}/></a>)}</div><a className="learner-portal-link" href="https://courses.maanavanlearncode.com/learn" target="_blank" rel="noreferrer">Learner Portal <ArrowUpRight/></a><a className="membership-portal-link" href={membership} target="_blank" rel="noreferrer">Membership Portal <ArrowUpRight/></a></div></div></div>
    <div className="premium-header-main"><div className="maanavan-header-shell">
      <Link href="/" className="premium-logo bytes-premium-logo" aria-label="MaanavaN Bytes home"><span className="maanavan-wordmark"><strong>MaanavaN<sup>®</sup></strong><small><i/><span>AI UPSKILLS</span></small></span><b>BYTES</b></Link>
      <nav className="organized-nav bytes-organized-nav" aria-label="Main navigation"><Link href="/">Bytes Home</Link><Link href="/handbooks/">Handbooks</Link><Link href="/#bytes-library">Bytes Library</Link><a href={courseLibrary}>Course Library</a><a href={membership}>Membership</a></nav>
      <a className="header-cta bytes-header-cta" href={courseLibrary}><BookOpen/>Explore Courses <ArrowRight/></a>
      <button className="mobile-menu-trigger" onClick={()=>setOpen(!open)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation">{open?<X/>:<Menu/>}</button>
    </div></div>
    {open&&<nav id="mobile-navigation" className="mobile-nav maanavan-mobile-nav" aria-label="Mobile navigation"><Link href="/" onClick={()=>setOpen(false)}>Bytes Home</Link><Link href="/handbooks/" onClick={()=>setOpen(false)}>Handbooks</Link><Link href="/#bytes-library" onClick={()=>setOpen(false)}>Bytes Library</Link><a href={courseLibrary}>Course Library</a><a href={membership}>All-Access Membership</a><a className="mobile-course-cta" href={courseLibrary}>Explore Course Library <ArrowRight/></a></nav>}
  </header>;
}
