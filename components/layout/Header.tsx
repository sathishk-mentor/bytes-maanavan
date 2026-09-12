'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronDown, Menu, X } from 'lucide-react';
import { getAllCategories } from '@/lib/categories';

const courseLibrary = 'https://www.maanavan.com/course-library';
const membership = 'https://aiupskills.maanavan.com/memberships/6a20ef646786ea4efcafb247';

export function Header() {
  const [open, setOpen] = useState(false);
  const [tracksOpen, setTracksOpen] = useState(false);
  const categories = getAllCategories();
  return <header className="site-header sticky top-0 z-50">
    <div className="header-main container-custom">
      <Link href="/" className="brand-lockup" aria-label="MaanavaN Bytes home"><span><strong>MaanavaN<sup>®</sup></strong><small><i/>AI UPSKILLS</small></span><b>BYTES</b></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/">Bytes Home</Link>
        <div className="nav-dropdown"><button onClick={()=>setTracksOpen(!tracksOpen)} aria-expanded={tracksOpen}>Learning Tracks <ChevronDown/></button>{tracksOpen&&<div className="track-menu">{categories.map(c=><Link key={c.slug} href={`/${c.slug}/`} onClick={()=>setTracksOpen(false)}><strong>{c.title}</strong><small>{c.description}</small></Link>)}</div>}</div>
        <Link href="/#career-paths">Career Paths</Link>
        <Link href="/#interview-prep">Interview Prep</Link>
        <a href={courseLibrary}>Course Library</a>
        <a href={membership}>Membership</a>
      </nav>
      <a className="header-course-cta" href={courseLibrary}><BookOpen/>Explore Courses <ArrowRight/></a>
      <button className="mobile-menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="mobile-nav container-custom" aria-label="Mobile navigation"><Link href="/" onClick={()=>setOpen(false)}>Bytes Home</Link><p>Learning Tracks</p>{categories.map(c=><Link className="mobile-track" key={c.slug} href={`/${c.slug}/`} onClick={()=>setOpen(false)}>{c.title}</Link>)}<Link href="/#career-paths" onClick={()=>setOpen(false)}>Career Paths</Link><Link href="/#interview-prep" onClick={()=>setOpen(false)}>Interview Prep</Link><a href={courseLibrary}>Course Library</a><a href={membership}>All-Access Membership</a><a className="mobile-course-cta" href={courseLibrary}>Explore Course Library <ArrowRight/></a></nav>}
  </header>;
}
