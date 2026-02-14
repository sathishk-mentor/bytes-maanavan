import { MDXRemote } from 'next-mdx-remote/rsc';
import { ThemeCard } from './ThemeCard';
import { BulletList } from './mdx/BulletList';
import { Scenario } from './mdx/Scenario';
import { Takeaways } from './mdx/Takeaways';
import { PromptBox } from './mdx/PromptBox';
import { Mistakes } from './mdx/Mistakes';
import { slugify } from '@/lib/mdx';

const components = {
  h2: ({ children, ...props }: any) => {
    const id = slugify(children.toString());
    return (
      <h2 id={id} className="sr-only" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = slugify(children.toString());
    return (
      <h3 id={id} className="text-xl font-semibold text-gray-900 mb-3" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: any) => {
    return (
      <p className="text-gray-700 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    );
  },
  ul: ({ children, ...props }: any) => {
    return (
      <ul className="space-y-2 text-gray-700 list-disc list-inside mb-4" {...props}>
        {children}
      </ul>
    );
  },
  ol: ({ children, ...props }: any) => {
    return (
      <ol className="space-y-2 text-gray-700 list-decimal list-inside mb-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }: any) => {
    return (
      <li className="text-gray-700" {...props}>
        {children}
      </li>
    );
  },
  strong: ({ children, ...props }: any) => {
    return (
      <strong className="font-bold text-gray-900" {...props}>
        {children}
      </strong>
    );
  },
  code: ({ children, ...props }: any) => {
    return (
      <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },
  table: ({ children, ...props }: any) => {
    return (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200" {...props}>
          {children}
        </table>
      </div>
    );
  },
  thead: ({ children, ...props }: any) => {
    return (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    );
  },
  th: ({ children, ...props }: any) => {
    return (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" {...props}>
        {children}
      </th>
    );
  },
  td: ({ children, ...props }: any) => {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props}>
        {children}
      </td>
    );
  },
  ThemeCard,
  BulletList,
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
