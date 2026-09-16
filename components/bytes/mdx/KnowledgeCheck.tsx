import { CheckCircle2, HelpCircle, Trophy } from 'lucide-react';

export function KnowledgeCheck({children}:{children:React.ReactNode}) {
  return <section className="knowledge-check-panel">
    <header>
      <span><HelpCircle/></span>
      <div><small>LESSON CHECKPOINT</small><strong>Confirm the concept before moving forward</strong><p>Review the beginner questions, practise the interview answer and check what you can recall.</p></div>
      <i><Trophy/> RETENTION</i>
    </header>
    <div className="knowledge-check-content">{children}</div>
    <footer><CheckCircle2/><span><b>Learning rule:</b> explain the answer in your own words before checking the next Byte.</span></footer>
  </section>;
}
