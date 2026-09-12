'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptBoxProps {
  children: React.ReactNode;
  label?: string;
}

export function PromptBox({ children, label = 'Copy-paste prompt' }: PromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = typeof children === 'string' ? children : extractText(children);
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  function extractText(node: any): string {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
  }

  return (
    <div className="prompt-box">
      <div className="prompt-box-header">
        <span>{label}</span>
      <button
        onClick={handleCopy}
        className={copied ? 'is-copied' : ''}
        title="Copy prompt"
        aria-label={copied ? 'Prompt copied' : 'Copy prompt'}
      >
        {copied ? (
          <><Check />Copied</>
        ) : (
          <><Copy />Copy prompt</>
        )}
      </button>
      </div>

      <div className="prompt-box-content">
        <pre className="whitespace-pre-wrap">{children}</pre>
      </div>
    </div>
  );
}
