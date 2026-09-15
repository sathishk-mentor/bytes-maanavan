'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

type ReadingMode = 'english' | 'tanglish';

export function ReadingModeToggle() {
  const [mode, setMode] = useState<ReadingMode>('english');

  useEffect(() => {
    const saved = window.localStorage.getItem('maanavan-reading-mode');
    const initial = saved === 'tanglish' ? 'tanglish' : 'english';
    setMode(initial);
    document.documentElement.dataset.readingMode = initial;
    return () => { delete document.documentElement.dataset.readingMode; };
  }, []);

  function select(next: ReadingMode) {
    setMode(next);
    document.documentElement.dataset.readingMode = next;
    window.localStorage.setItem('maanavan-reading-mode', next);
    window.dispatchEvent(new Event('reading-mode-change'));
  }

  return <section className="reading-mode-control" aria-label="Choose explanation language">
    <div><Languages/><span><small>EXPLANATION MODE</small><strong>Choose the language that feels easier</strong></span></div>
    <div className="reading-mode-options" role="group" aria-label="Explanation mode">
      <button type="button" className={mode === 'english' ? 'active' : ''} aria-pressed={mode === 'english'} onClick={() => select('english')}>English</button>
      <button type="button" className={mode === 'tanglish' ? 'active' : ''} aria-pressed={mode === 'tanglish'} onClick={() => select('tanglish')}>Tanglish</button>
    </div>
  </section>;
}

export function ModeText({ english, tanglish }: { english: string; tanglish: string }) {
  return <div className="reading-mode-text">
    <p className="mode-english">{english}</p>
    <p className="mode-tanglish" lang="ta-Latn">{tanglish}</p>
  </div>;
}
