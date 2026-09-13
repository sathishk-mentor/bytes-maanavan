import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers3, Search, Users } from 'lucide-react';
import { handbooks } from '@/lib/handbooks';

export const metadata: Metadata = {
  title: 'AI & Technology Handbooks',
  description: 'Explore beginner-friendly visual handbooks for Docker, GitHub Copilot and Forward Deployed Engineering with practical workflows, scenarios and interview insights.',
  alternates: { canonical: '/handbooks/' },
  openGraph: {title:'Visual Technology Handbooks | MaanavaN Bytes',description:'Connected, beginner-friendly handbooks for Docker, GitHub Copilot and Forward Deployed Engineering.',url:'/handbooks/',type:'website'},
};

export default function HandbooksPage() {
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':'https://bytes.maanavan.com/handbooks/#collection',name:'MaanavaN Technology Handbooks',url:'https://bytes.maanavan.com/handbooks/',description:'Visual technology handbooks with connected practical Bytes.',mainEntity:{'@type':'ItemList',itemListElement:handbooks.map((handbook,index)=>({'@type':'ListItem',position:index+1,name:handbook.title,url:`https://bytes.maanavan.com/${handbook.slug==='github-copilot'?'software-engineering':handbook.slug==='docker'?'cloud-devops':'forward-deployed-engineer'}/`}))}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MaanavaN Bytes',item:'https://bytes.maanavan.com/'},{'@type':'ListItem',position:2,name:'Handbooks',item:'https://bytes.maanavan.com/handbooks/'}]}
  ]};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="handbooks-hero"><div className="container-custom"><p className="eyebrow">MAANAVAN HANDBOOK LIBRARY</p><h1>Focused handbooks for practical technology learning.</h1><p>Build the mental model first, then learn through visual explanations, familiar analogies, real project scenarios and decisions you can apply.</p><div><span><BookOpen/>Connected learning paths</span><span><Layers3/>Practical visual Bytes</span><span><Users/>Beginner-friendly learning</span></div></div></section>
    <section className="handbooks-library container-custom"><header><div><p className="eyebrow dark">PUBLISHED HANDBOOKS</p><h2>Choose the path that fits your next step.</h2></div><div className="handbook-search-visual"><Search/><span>Docker · Copilot engineering · Forward deployment</span></div></header><div className="handbooks-grid">{handbooks.map((handbook)=><Link className={`handbook-tile handbook-tone-${handbook.tone}`} href={handbook.slug === 'github-copilot' ? '/software-engineering/' : handbook.slug === 'docker' ? '/cloud-devops/' : '/forward-deployed-engineer/'} key={handbook.slug}><div className="handbook-tile-top"><span>VISUAL GUIDE</span><small>{handbook.audience}</small></div><div className="handbook-tile-icon"><BookOpen/></div><h2>{handbook.title}</h2><p>{handbook.description}</p><footer><span>Visual learning path</span><b>Start learning <ArrowRight/></b></footer></Link>)}</div></section>
  </>;
}
