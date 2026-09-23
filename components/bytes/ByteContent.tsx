import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ThemeCard } from './ThemeCard';
import { BulletList } from './mdx/BulletList';
import { Scenario } from './mdx/Scenario';
import { Takeaways } from './mdx/Takeaways';
import { PromptBox } from './mdx/PromptBox';
import { Mistakes } from './mdx/Mistakes';
import { AIComparisonFlow } from './mdx/AIComparisonFlow';
import { RealUseCaseFlows } from './mdx/RealUseCaseFlows';
import { GenAIDecisionGuide } from './mdx/GenAIDecisionGuide';
import { LLMAnswerFlow } from './mdx/LLMAnswerFlow';
import { ContextAssemblyVisual, GroundedAnswerVisual, ProductVsModelVisual, TokenisationVisual } from './mdx/LLMConceptVisuals';
import { CopilotHandbookVisual, OfficialScreenshot } from './mdx/CopilotHandbookVisuals';
import { CopilotAgentLab, CopilotChatLab, CopilotGovernanceLab, CopilotPromptLab, CopilotSuggestionLab } from './mdx/CopilotLearningLabs';
import { FDEJourneyVisual } from './mdx/FDEVisuals';
import { FDEConceptLab, FDEOutcomeVisual, FDEScenarioExplorer, FDEWorkflowExplorer } from './mdx/FDELearningLabs';
import { DockerCommand, DockerFlowVisual, DockerObjectArchitecture, DockerRealWorldVisual, DockerUseCaseVisual, OfficialDockerDiagram } from './mdx/DockerVisuals';
import { DockerConceptLab } from './mdx/DockerConceptLab';
import { LangChainBuildingBlocks, LangChainFlowVisual, OfficialLangChainDiagram } from './mdx/LangChainVisuals';
import { LangChainCodeOutcome, LangChainConceptLab, LangChainScenarioVisual, LangChainWorkflowExplorer } from './mdx/LangChainLearningLabs';
import { HandbookLearningVisual } from './mdx/HandbookLearningVisual';
import { AgentBoundaryVisual, AgentCapabilityVisual } from './mdx/AgentVisuals';
import { AgentFitLab, AgentGuardrailLab, AgentLoopLab, AgentPilotLab, AgentRoleLab, AgentStoryVisual } from './mdx/AgentLearningLabs';
import { SQLAgentLab, SQLFeatureLab, SQLProjectPath, SQLQueryLab, SQLStoryVisual, SQLVectorLab, SQLWindowLab } from './mdx/SQLLearningLabs';
import { RAGEvaluationLab, RAGFailureLab, RAGGroundingLab, RAGPipelineLab, RAGProductionLab, RAGStoryVisual } from './mdx/RAGLearningLabs';
import { JavaProductionLab, JavaRAGLab, JavaRequestLab, JavaStoryVisual, JavaToolLab, SpringAIClientLab } from './mdx/JavaLearningLabs';
import { MongoDBVisual } from './mdx/MongoDBVisuals';
import { MongoDBConceptLab } from './mdx/MongoDBLearningLabs';
import { FastAPIConceptLab } from './mdx/FastAPILearningLabs';
import { PythonConceptLab, PythonRealWorldVisual, PythonRoleVisual } from './mdx/PythonLearningVisuals';
import { PythonCodeOutcome } from './mdx/PythonCodeOutcome';
import { HowAppsWorkVisual } from './mdx/HowAppsWorkVisual';
import { HowAppsWorkLab } from './mdx/HowAppsWorkLab';
import { HowAppsWorkQuiz } from './mdx/HowAppsWorkQuiz';
import { BeginnerLearningJourney } from './mdx/BeginnerLearningJourney';
import { KnowledgeCheck } from './mdx/KnowledgeCheck';
import { ModeText, ReadingModeToggle } from './ReadingMode';
import { SyntaxCode } from './SyntaxCode';
import { slugify } from '@/lib/mdx';
import { BookOpen, Boxes, Building2, CheckCircle2, GitCompareArrows, HelpCircle, Lightbulb, Network, Rocket, Route, Target, Workflow } from 'lucide-react';

const sectionIcon = (text:string) => {
  if (/quick start/i.test(text)) return Rocket;
  if (/start from basics/i.test(text)) return BookOpen;
  if (/core explanation/i.test(text)) return Lightbulb;
  if (/architecture|flow diagram/i.test(text)) return Network;
  if (/types|components/i.test(text)) return Boxes;
  if (/comparison|\bvs\b/i.test(text)) return GitCompareArrows;
  if (/real-world/i.test(text)) return Building2;
  if (/imagine/i.test(text)) return Workflow;
  if (/use cases/i.test(text)) return Target;
  if (/takeaways/i.test(text)) return CheckCircle2;
  if (/final thought|next path/i.test(text)) return Route;
  return HelpCircle;
};

const createComponents = (idPrefix = '') => ({
  h2: ({children,...props}:any)=>{
    const text=children.toString();
    const Icon=sectionIcon(text);
    const heading=<h2 id={`${idPrefix}${slugify(text)}`} className="byte-section-title" {...props}><span className="byte-section-icon" aria-hidden="true"><Icon/></span><span>{children}</span></h2>;
    return heading;
  },
  h3: ({children,...props}:any)=><h3 id={`${idPrefix}${slugify(children.toString())}`} className="byte-subtitle" {...props}>{children}</h3>,
  p: ({children,...props}:any)=><p className="byte-paragraph" {...props}>{children}</p>,
  a: ({children,...props}:any)=><a className="byte-link" target="_blank" rel="noreferrer" {...props}>{children}</a>,
  ul: ({children,...props}:any)=><ul className="byte-list" {...props}>{children}</ul>,
  ol: ({children,...props}:any)=><ol className="byte-list numbered" {...props}>{children}</ol>,
  li: ({children,...props}:any)=><li {...props}>{children}</li>,
  strong: ({children,...props}:any)=><strong className="byte-strong" {...props}>{children}</strong>,
  blockquote: ({children,...props}:any)=><blockquote className="byte-quote" {...props}>{children}</blockquote>,
  img: ({alt='',...props}:any)=><figure className="byte-visual"><img alt={alt} loading="lazy" decoding="async" {...props}/>{alt&&<figcaption>{alt}</figcaption>}</figure>,
  table: ({children,...props}:any)=><div className="byte-table-wrap"><table {...props}>{children}</table></div>,
  th: ({children,...props}:any)=><th {...props}>{children}</th>, td: ({children,...props}:any)=><td {...props}>{children}</td>,
  pre: ({children}:any)=>{const child=children as any;const code=child?.props?.children?.toString?.()||'';const language=(child?.props?.className||'').replace('language-','')||'text';return <SyntaxCode code={code} language={language}/>;},
  code: ({children,...props}:any)=><code className="byte-code" {...props}>{children}</code>,
  ThemeCard, BulletList, Scenario, Takeaways, PromptBox, Mistakes, AIComparisonFlow, RealUseCaseFlows, GenAIDecisionGuide, LLMAnswerFlow, ContextAssemblyVisual, TokenisationVisual, ProductVsModelVisual, GroundedAnswerVisual, CopilotHandbookVisual, OfficialScreenshot, CopilotSuggestionLab, CopilotChatLab, CopilotPromptLab, CopilotAgentLab, CopilotGovernanceLab, FDEJourneyVisual, FDEConceptLab, FDEOutcomeVisual, FDEScenarioExplorer, FDEWorkflowExplorer, DockerCommand, DockerFlowVisual, DockerObjectArchitecture, DockerRealWorldVisual, DockerUseCaseVisual, OfficialDockerDiagram, DockerConceptLab, PythonConceptLab, PythonCodeOutcome, PythonRealWorldVisual, PythonRoleVisual, HowAppsWorkVisual, HowAppsWorkLab, HowAppsWorkQuiz, LangChainFlowVisual, LangChainBuildingBlocks, LangChainConceptLab, LangChainScenarioVisual, LangChainWorkflowExplorer, LangChainCodeOutcome, OfficialLangChainDiagram, HandbookLearningVisual, BeginnerLearningJourney, AgentBoundaryVisual, AgentCapabilityVisual, AgentRoleLab, AgentLoopLab, AgentFitLab, AgentGuardrailLab, AgentPilotLab, AgentStoryVisual, SQLQueryLab, SQLWindowLab, SQLVectorLab, SQLFeatureLab, SQLAgentLab, SQLStoryVisual, SQLProjectPath, RAGGroundingLab, RAGPipelineLab, RAGFailureLab, RAGEvaluationLab, RAGProductionLab, RAGStoryVisual, JavaRequestLab, SpringAIClientLab, JavaRAGLab, JavaToolLab, JavaProductionLab, JavaStoryVisual, MongoDBVisual, MongoDBConceptLab, FastAPIConceptLab, KnowledgeCheck, ModeText, ReadingModeToggle,
});

export function ByteContent({content,tanglishContent}:{content:string;tanglishContent?:string|null}) {
  return <>
    <article className="byte-article byte-article-english" lang="en-IN"><MDXRemote source={content} components={createComponents('')} options={{mdxOptions:{remarkPlugins:[remarkGfm]}}}/></article>
    {tanglishContent && <article className="byte-article byte-article-tanglish" lang="ta"><MDXRemote source={tanglishContent} components={createComponents('ta-')} options={{mdxOptions:{remarkPlugins:[remarkGfm]}}}/></article>}
  </>;
}
