'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Code2, Mail, Menu, Phone, X } from 'lucide-react';

const courseLibrary = 'https://www.maanavan.com/course-library';
const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';

export function Header() {
  const [open, setOpen] = useState(false);
  const [tracksOpen, setTracksOpen] = useState(false);
  const chapters = [
    ['01', 'Copilot foundations', '62-how-developers-use-ai-tools'],
    ['02', 'Context engineering', '63-api-first-thinking'],
    ['03', 'Feature workflow', '66-ai-assisted-coding-workflow'],
    ['04', 'Debug, test and refactor', '64-debugging-ai-generated-code'],
    ['05', 'Responsible AI coding', '75-secure-ai-coding'],
  ];
  return <header className="site-header sticky top-0 z-50">
    <div className="header-utility-bar"><div className="header-utility-inner"><div className="header-utility-contact"><a href="tel:+918073044127"><Phone/><span>Call:</span> +91 8073044127</a><a className="utility-email" href="mailto:info@maanavan.com"><Mail/><span>Email:</span> info@maanavan.com</a></div><div className="header-utility-right"><a className="learner-portal-link" href="https://courses.maanavanlearncode.com/learn">Learner Portal <ArrowUpRight/></a><a className="membership-portal-link" href={membership}>Membership Portal <ArrowUpRight/></a></div></div></div>
    <div className="header-main container-custom">
      <Link href="/" className="brand-lockup" aria-label="MaanavaN Bytes home"><span><strong>MaanavaN<sup>®</sup></strong><small><i/>AI UPSKILLS</small></span><b>BYTES</b></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/">Bytes Home</Link>
        <div className="nav-dropdown handbook-dropdown" onMouseEnter={()=>setTracksOpen(true)} onMouseLeave={()=>setTracksOpen(false)}><button onClick={()=>setTracksOpen(!tracksOpen)} aria-expanded={tracksOpen}>Handbook <ChevronDown/></button><div className={`track-menu handbook-menu ${tracksOpen?'is-open':''}`}><header><span><Code2/></span><div><strong>The GitHub Copilot Handbook</strong><small>Five practical chapters · Human reviewed</small></div><Link href="/software-engineering/">View all <ArrowRight/></Link></header>{chapters.map(([number,title,slug])=><Link key={slug} href={`/software-engineering/${slug}/`} onClick={()=>setTracksOpen(false)}><i>{number}</i><strong>{title}</strong><ArrowRight/></Link>)}</div></div>
        <Link href="/#interview-prep">Interview Prep</Link>
        <a href={courseLibrary}>Course Library</a>
        <a href={membership}>Membership</a>
      </nav>
      <a className="header-course-cta" href={courseLibrary}><BookOpen/>Explore Courses <ArrowRight/></a>
      <button className="mobile-menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="mobile-nav container-custom" aria-label="Mobile navigation"><Link href="/" onClick={()=>setOpen(false)}>Bytes Home</Link><p>GitHub Copilot Handbook</p>{chapters.map(([number,title,slug])=><Link className="mobile-track" key={slug} href={`/software-engineering/${slug}/`} onClick={()=>setOpen(false)}><span>{number}</span>{title}</Link>)}<Link href="/#interview-prep" onClick={()=>setOpen(false)}>Interview Prep</Link><a href={courseLibrary}>Course Library</a><a href={membership}>All-Access Membership</a><a className="mobile-course-cta" href={courseLibrary}>Explore Course Library <ArrowRight/></a></nav>}
  </header>;
}
