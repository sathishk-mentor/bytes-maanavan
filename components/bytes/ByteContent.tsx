import { MDXRemote } from 'next-mdx-remote/rsc';
import { Scenario } from './mdx/Scenario';
import { Takeaways } from './mdx/Takeaways';
import { PromptBox } from './mdx/PromptBox';
import { Mistakes } from './mdx/Mistakes';

const components = {
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
