import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reactChapters, reactHandbook } from '@/lib/react-handbook';
export function generateStaticParams(){return reactChapters.map(chapter=>({chapter:chapter.slug}));}
export function generateMetadata({params}:{params:{chapter:string}}):Metadata {
 const item=reactChapters.find(x=>x.slug===params.chapter); if(!item)return {title:'React tutorial not found'};
 return {title:item.title,description:item.description,alternates:{canonical:`/react-js/${item.slug}/`},openGraph:{title:item.title,url:`/react-js/${item.slug}/`,description:item.description,type:'article'}};
}
export default function ReactBytePage({params}:{params:{chapter:string}}){
 const i=reactChapters.findIndex(x=>x.slug===params.chapter);if(i<0)notFound();const item=reactChapters[i];
 const url=reactHandbook.url+item.slug+'/';
 const graph={'@context':'https://schema.org','@graph':[
 {'@type':'TechArticle',headline:item.title,description:item.description,url,mainEntityOfPage:url,author:{'@id':'https://www.maanavan.com/#sathish-kumar'},publisher:{'@id':'https://www.maanavan.com/#organization'},inLanguage:'en-IN',isPartOf:{'@id':reactHandbook.url+'#page'},datePublished:'2026-10-16',dateModified:'2026-10-16'},
 {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Bytes',item:'https://bytes.maanavan.com/'},{'@type':'ListItem',position:2,name:'React JS Handbook',item:reactHandbook.url},{'@type':'ListItem',position:3,name:item.title,item:url}]}
 ]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,'\\u003c')}}/>
 <article className="container-custom max-w-5xl px-5 py-12"><nav className="mb-6 text-sm text-slate-600"><Link href="/react-js/" className="font-semibold text-teal-700">React Handbook</Link> / Byte {i+1}</nav><p className="text-sm font-bold uppercase tracking-widest text-teal-700">FREE REACT TUTORIAL · BYTE {i+1} OF 5</p><h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">{item.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{item.intro}</p><div className="mt-10 space-y-12">{item.sections.map(section=><section key={section.heading}><h2 className="text-2xl font-extrabold text-slate-900">{section.heading}</h2><p className="mt-4 leading-8 text-slate-700">{section.body}</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-[#0a2035] p-6 text-sm leading-7 text-teal-100"><code>{section.code}</code></pre></section>)}</div>
 <section className="mt-12 rounded-3xl bg-teal-50 p-7"><h2 className="text-2xl font-bold text-slate-900">Learn through a complete project</h2><p className="mt-3 leading-7 text-slate-700">Continue to the next Byte to connect this concept with the Student Learning Dashboard. Prefer instructor guidance in Tamil? Explore MaanavaN&apos;s live React training or start with the self-paced course.</p><div className="mt-5 flex flex-wrap gap-4"><a href="https://www.maanavan.com/react-js-training?utm_source=bytes&utm_medium=byte&utm_campaign=react-learning" className="font-bold text-teal-800 underline">Live one-to-one React training</a><a href="https://www.maanavan.com/course/react-19-course-in-tamil-a-beginner-s-complete-guide?utm_source=bytes&utm_medium=byte&utm_campaign=react-learning" className="font-bold text-teal-800 underline">Self-paced React course</a></div></section>
 <nav className="mt-10 flex flex-wrap justify-between gap-4 border-t pt-7" aria-label="React handbook chapters">{i>0?<Link className="font-bold text-teal-800" href={`/react-js/${reactChapters[i-1].slug}/`}>← Previous Byte</Link>:<Link className="font-bold text-teal-800" href="/react-js/">← All Bytes</Link>}{i<reactChapters.length-1?<Link className="font-bold text-teal-800" href={`/react-js/${reactChapters[i+1].slug}/`}>Next Byte →</Link>:<Link className="font-bold text-teal-800" href="/react-js/">Back to handbook →</Link>}</nav>
 </article></>;
}
