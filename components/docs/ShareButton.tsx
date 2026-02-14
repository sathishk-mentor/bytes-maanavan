'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Try native Web Share API first (mobile-friendly)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MaanavaN Bytes Documentation',
          text: 'Check out the MaanavaN Bytes website documentation - learn about all the technical areas and components',
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="flex items-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Share Docs
        </>
      )}
    </Button>
  );
}
