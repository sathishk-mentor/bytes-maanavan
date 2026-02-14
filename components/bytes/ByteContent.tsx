import { MDXRemote } from 'next-mdx-remote/rsc';
import { Scenario } from './mdx/Scenario';
import { Takeaways } from './mdx/Takeaways';
import { PromptBox } from './mdx/PromptBox';
import { Mistakes } from './mdx/Mistakes';
import { slugify } from '@/lib/mdx';

const components = {
  h2: ({ children, ...props }: any) => {
    const id = slugify(children.toString());
    return (
      <h2 id={id} className="mt-10 mb-4 text-2xl font-bold text-gray-900" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = slugify(children.toString());
    return (
      <h3 id={id} className="mt-8 mb-3 text-xl font-semibold text-gray-900" {...props}>
        {children}
      </h3>
    );
  },
  Scenario,
  Takeaways,
  PromptBox,
  Mistakes,
};

interface ByteContentProps {
  content: string;
}

export function ByteContent({ content }: ByteContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
