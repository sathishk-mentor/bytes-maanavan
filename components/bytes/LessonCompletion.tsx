'use client';

import { useEffect, useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { isByteComplete, markByteComplete, markByteIncomplete } from '@/lib/progress';

export function LessonCompletion({ slug }: { slug: string }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(isByteComplete(slug));
  }, [slug]);

  const toggle = () => {
    if (complete) markByteIncomplete(slug);
    else markByteComplete(slug);
    setComplete(!complete);
    window.dispatchEvent(new Event('byte-progress-change'));
  };

  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="lesson-completion-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-blue-700">Your learning progress</p>
          <h2 id="lesson-completion-title" className="mt-2 text-2xl font-semibold text-slate-900">Finished this Byte?</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">After the example and knowledge check, mark this lesson complete. Your progress is saved in this browser.</p>
        </div>
        <button type="button" onClick={toggle} aria-pressed={complete} className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${complete ? 'border border-emerald-300 bg-emerald-50 text-emerald-900' : 'bg-slate-900 text-white hover:bg-blue-800'}`}>
          {complete ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Check className="h-5 w-5" aria-hidden="true" />}
          {complete ? 'Completed · Undo' : 'Mark Byte complete'}
        </button>
      </div>
    </section>
  );
}
