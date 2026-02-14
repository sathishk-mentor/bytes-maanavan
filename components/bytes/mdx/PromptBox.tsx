'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptBoxProps {
  children: React.ReactNode;
}

export function PromptBox({ children }: PromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function extractText(node: any): string {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
  }

  return (
    <div className="group relative my-6 rounded-lg bg-gray-900 p-6">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 rounded-md bg-gray-800 p-2 text-gray-400 opacity-0 transition-opacity hover:bg-gray-700 hover:text-white group-hover:opacity-100"
        title="Copy prompt"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </button>

      <div className="pr-12 font-mono text-sm text-gray-100">
        <pre className="whitespace-pre-wrap">{children}</pre>
      </div>
    </div>
  );
}
