'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

type ReadingMode = 'english' | 'tanglish';

export function ReadingModeToggle({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<ReadingMode>('english');

  useEffect(() => {
    const sync = () => {
      const saved = window.localStorage.getItem('maanavan-reading-mode');
      const initial = saved === 'tanglish' ? 'tanglish' : 'english';
      setMode(initial);
      document.documentElement.dataset.readingMode = initial;
      document.documentElement.lang = initial === 'tanglish' ? 'ta-IN' : 'en-IN';
    };
    sync();
    window.addEventListener('reading-mode-change', sync);
    return () => window.removeEventListener('reading-mode-change', sync);
  }, []);

  function select(next: ReadingMode) {
    setMode(next);
    document.documentElement.dataset.readingMode = next;
    document.documentElement.lang = next === 'tanglish' ? 'ta-IN' : 'en-IN';
    window.localStorage.setItem('maanavan-reading-mode', next);
    window.dispatchEvent(new Event('reading-mode-change'));
  }

  return <section className={`reading-mode-control ${compact ? 'reading-mode-inline' : ''}`} aria-label="Choose explanation language">
    <div><span className="reading-mode-icon"><Languages/></span><span><small>LANGUAGE</small><strong>Read this Byte in your preferred language</strong></span></div>
    <div className="reading-mode-options" role="group" aria-label="Explanation mode">
      <button type="button" className={mode === 'english' ? 'active' : ''} aria-pressed={mode === 'english'} onClick={() => select('english')}><strong>English</strong><small>Default</small></button>
      <button type="button" className={mode === 'tanglish' ? 'active' : ''} aria-pressed={mode === 'tanglish'} onClick={() => select('tanglish')}><strong>தமிழ் + English</strong><small>தமிழில் விளக்கம்</small></button>
    </div>
  </section>;
}

export function ModeText({ english, tanglish }: { english: string; tanglish: string }) {
  return <div className="reading-mode-text">
    <p className="mode-english">{english}</p>
    <p className="mode-tanglish" lang="ta-Latn">{tanglish}</p>
  </div>;
}
