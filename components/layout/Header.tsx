import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Header() {
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071f2c]/95 text-white backdrop-blur"><div className="container-custom flex h-[72px] items-center justify-between">
    <Link href="/" className="flex items-baseline gap-2"><span className="text-xl font-bold tracking-tight">MaanavaN</span><span className="rounded-full bg-cyan-300 px-2 py-0.5 text-xs font-bold text-[#06202d]">BYTES</span></Link>
    <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex"><Link href="/genai/">GenAI</Link><Link href="/ai-agents/">AI Agents</Link><Link href="/data-engineering/">Data</Link><Link href="/cloud-devops/">Cloud & DevOps</Link><Link href="/case-studies/">Case Studies</Link></nav>
    <Link href="https://www.maanavan.com/" className="flex items-center gap-1 text-sm font-semibold text-cyan-300">MaanavaN Home <ArrowUpRight className="h-4 w-4"/></Link>
  </div></header>;
}
