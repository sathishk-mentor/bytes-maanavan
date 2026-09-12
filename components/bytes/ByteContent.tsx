import { MDXRemote } from 'next-mdx-remote/rsc';
import { ThemeCard } from './ThemeCard';
import { BulletList } from './mdx/BulletList';
import { Scenario } from './mdx/Scenario';
import { Takeaways } from './mdx/Takeaways';
import { PromptBox } from './mdx/PromptBox';
import { Mistakes } from './mdx/Mistakes';
import { slugify } from '@/lib/mdx';

const components = {
  h2: ({children,...props}:any)=><h2 id={slugify(children.toString())} className="byte-section-title" {...props}>{children}</h2>,
  h3: ({children,...props}:any)=><h3 id={slugify(children.toString())} className="byte-subtitle" {...props}>{children}</h3>,
  p: ({children,...props}:any)=><p className="byte-paragraph" {...props}>{children}</p>,
  a: ({children,...props}:any)=><a className="byte-link" target="_blank" rel="noreferrer" {...props}>{children}</a>,
  ul: ({children,...props}:any)=><ul className="byte-list" {...props}>{children}</ul>,
  ol: ({children,...props}:any)=><ol className="byte-list numbered" {...props}>{children}</ol>,
  li: ({children,...props}:any)=><li {...props}>{children}</li>,
  strong: ({children,...props}:any)=><strong className="byte-strong" {...props}>{children}</strong>,
  blockquote: ({children,...props}:any)=><blockquote className="byte-quote" {...props}>{children}</blockquote>,
  img: (props:any)=><figure className="byte-visual"><img {...props}/><figcaption>Conceptual learning architecture · MaanavaN Bytes</figcaption></figure>,
  table: ({children,...props}:any)=><div className="byte-table-wrap"><table {...props}>{children}</table></div>,
  th: ({children,...props}:any)=><th {...props}>{children}</th>, td: ({children,...props}:any)=><td {...props}>{children}</td>,
  code: ({children,...props}:any)=><code className="byte-code" {...props}>{children}</code>,
  ThemeCard, BulletList, Scenario, Takeaways, PromptBox, Mistakes,
};

export function ByteContent({content}:{content:string}) { return <article className="byte-article"><MDXRemote source={content} components={components}/></article>; }
