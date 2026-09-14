import type { Metadata } from 'next';
import { BookOpen, Layers3, Users } from 'lucide-react';
import { handbooks } from '@/lib/handbooks';
import { PublishedHandbooks } from '@/components/home/PublishedHandbooks';

export const metadata: Metadata = {
  title: 'AI & Technology Handbooks',
  description: 'Explore beginner-friendly visual handbooks for FastAPI, RAG, LangChain, Docker, GitHub Copilot and Forward Deployed Engineering.',
  alternates: { canonical: '/handbooks/' },
  openGraph: {title:'Visual Technology Handbooks | MaanavaN Bytes',description:'Connected, beginner-friendly handbooks for FastAPI, RAG, LangChain, Docker, GitHub Copilot and Forward Deployed Engineering.',url:'/handbooks/',type:'website'},
};

export default function HandbooksPage() {
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':'https://bytes.maanavan.com/handbooks/#collection',name:'MaanavaN Technology Handbooks',url:'https://bytes.maanavan.com/handbooks/',description:'Visual technology handbooks with connected practical Bytes.',mainEntity:{'@type':'ItemList',itemListElement:handbooks.map((handbook,index)=>({'@type':'ListItem',position:index+1,name:handbook.title,url:`https://bytes.maanavan.com/${handbook.slug==='github-copilot'?'software-engineering':handbook.slug==='docker'?'cloud-devops':handbook.slug}/`}))}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MaanavaN Bytes',item:'https://bytes.maanavan.com/'},{'@type':'ListItem',position:2,name:'Handbooks',item:'https://bytes.maanavan.com/handbooks/'}]}
  ]};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="handbooks-hero"><div className="container-custom"><p className="eyebrow">MAANAVAN HANDBOOK LIBRARY</p><h1>Focused handbooks for practical technology learning.</h1><p>Build the mental model first, then learn through visual explanations, familiar analogies, real project scenarios and decisions you can apply.</p><div><span><BookOpen/>Connected learning paths</span><span><Layers3/>Practical visual Bytes</span><span><Users/>Beginner-friendly learning</span></div></div></section>
    <PublishedHandbooks handbooks={handbooks} variant="library"/>
  </>;
}
