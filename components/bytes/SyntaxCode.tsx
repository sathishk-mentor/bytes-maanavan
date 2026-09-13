'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const keywords:Record<string,Set<string>>={
  python:new Set(['from','import','as','def','return','if','not','raise','class','with','for','in','True','False','None']),
  bash:new Set(['docker','curl','export','echo','cd','mkdir','source']),
  shell:new Set(['docker','curl','export','echo','cd','mkdir','source']),
  dockerfile:new Set(['FROM','WORKDIR','COPY','RUN','EXPOSE','CMD','ENV','USER','ARG','ENTRYPOINT','HEALTHCHECK']),
  yaml:new Set(['services','build','image','ports','environment','depends_on','condition','healthcheck','test','interval','timeout','retries','volumes']),
};

function highlightLine(line:string,language:string){
  const words=keywords[language]||new Set<string>();
  const pattern=/(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|--?[a-zA-Z][\w-]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][\w-]*\b|[{}[\]():=])/g;
  const nodes:React.ReactNode[]=[];let last=0;let match:RegExpExecArray|null;let index=0;
  while((match=pattern.exec(line))){
    if(match.index>last)nodes.push(line.slice(last,match.index));
    const token=match[0];let kind='plain';
    if(token.startsWith('#'))kind='comment';
    else if(/^['"`]/.test(token))kind='string';
    else if(token.startsWith('-'))kind='flag';
    else if(/^\d/.test(token))kind='number';
    else if(words.has(token))kind='keyword';
    else if(/^[{}[\]():=]$/.test(token))kind='punctuation';
    else if(language==='yaml'&&line.slice(pattern.lastIndex).trimStart().startsWith(':'))kind='property';
    else if(language==='python'&&/^[A-Z]/.test(token))kind='type';
    nodes.push(<span className={`syntax-${kind}`} key={`${index++}-${match.index}`}>{token}</span>);last=pattern.lastIndex;
  }
  if(last<line.length)nodes.push(line.slice(last));
  return nodes;
}

export function SyntaxCode({code,language='text'}:{code:string;language?:string}){
  const [copied,setCopied]=useState(false);const clean=code.replace(/\n$/,'');const lines=clean.split('\n');
  async function copy(){await navigator.clipboard.writeText(clean);setCopied(true);window.setTimeout(()=>setCopied(false),1600);}
  return <figure className="syntax-code"><header><span><i/><i/><i/></span><strong>{language==='dockerfile'?'Dockerfile':language.toUpperCase()}</strong><button type="button" onClick={copy} aria-label="Copy code">{copied?<Check/>:<Copy/>}{copied?'Copied':'Copy'}</button></header><pre aria-label={`${language} code example`}>{lines.map((line,index)=><span className="syntax-line" key={index}><i>{String(index+1).padStart(2,'0')}</i><code>{highlightLine(line,language)}</code></span>)}</pre></figure>;
}
