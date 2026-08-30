'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { ExternalLink, Sparkles, Monitor, Globe, Award, ShieldCheck } from 'lucide-react';

interface ShowcaseCard {
  id: string;
  title: string;
  domain: string;
  url: string;
  description: string;
  tags: string[];
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'sbk-3d',
    title: 'SBK Birthday 3D',
    domain: 'sbk-hd.vercel.app',
    url: 'https://sbk-hd.vercel.app',
    description: 'Interactive 3D audio-visual experience with particle effects and gamified interactions.',
    tags: ['THREE.JS', 'AUDIO', 'GSAP'],
  },
  {
    id: 'internocto',
    title: 'InternOcTO',
    domain: 'internocto-portfolio.vercel.app',
    url: 'https://internocto-portfolio.vercel.app',
    description: "The official chaotic portfolio for OpenLedger's octopus mascot. Pure mayhem & motion.",
    tags: ['REACT', 'CHAOS', 'TAILWIND'],
  },
  {
    id: 'iphone-3d',
    title: 'iPhone 3D Shop',
    domain: 'antigravity-test-alpha.vercel.app',
    url: 'https://antigravity-test-alpha.vercel.app',
    description: 'Immersive 3D product showcase with GSAP animations and floating interactive models.',
    tags: ['R3F', 'GSAP', 'DREI'],
  },
  {
    id: 'mediocto',
    title: 'MediOcto AI',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    description: 'AI-powered mental health support chat interface with a friendly octopus companion.',
    tags: ['AI', 'HEALTH', 'NEXT.JS'],
  },
  {
    id: 'lakshan-dev',
    title: 'Lakshan Dev',
    domain: 'lakshan-dev.vercel.app',
    url: 'https://lakshan-dev.vercel.app',
    description: 'Personal developer hub showcasing full-stack web applications, AI systems, & Web3 experiments.',
    tags: ['PORTFOLIO', 'WEB3', 'FULLSTACK'],
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    description: 'Special event showcase platform with custom motion animations and dynamic gallery.',
    tags: ['EVENT', 'GALLERY', 'GSAP'],
  },
];

export const FlowAboutStorySection: React.FC = () => {
  return (
    <FlowArt aria-label="Présentation Flow Art">
      {/* ========================================================================= */}
      {/* 01 — WHO I AM: CRAFTSMANSHIP & TECH STACK */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Who I am" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
        <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
          01 — Who I am // LAKSHAN G.
        </p>
        <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
        <div>
          <h1 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Create
            <br />
            Without
            <br />
            Limits
          </h1>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
        
        <p className="font-sans max-w-[55ch] text-[clamp(1rem,2.2vw,1.8rem)] font-medium leading-relaxed">
          Full-Stack Developer, AI Systems Engineer &amp; Web3 Researcher. I solve complex engineering problems from first principles—building ultra-fast web applications, autonomous AI agents, and secure smart contracts.
        </p>

        <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />

        {/* How I am Better & Tech Stack Grid */}
        <div className="flex flex-wrap gap-[2.5vw]">
          <div className="min-w-[200px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
              ⚡ First-Principles Mindset
            </p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-95 text-white/90">
              Deconstructing architecture to fundamental truths before writing code. I turn raw concepts into production-ready software without reliance on superficial templates.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
              🛠️ My Core Tech Stack
            </p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-95 text-white/90">
              Next.js, TypeScript, React, Node.js, Python, Solidity, EVM Smart Contracts, Three.js, GSAP, and LLM Agent SDKs.
            </p>
          </div>
          <div className="min-w-[200px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
              🚀 Rapid Hackathon Execution
            </p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-95 text-white/90">
              Thriving under strict 36-hour marathon deadlines to ship full-stack web products, robust APIs, and audited Web3 smart contracts.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* 02 — RECOGNITION & COLLEGE ACHIEVEMENTS */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Recognition & Achievements" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C75B32]">
          02 — Recognition &amp; Campus Achievements
        </p>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <div>
          <h2 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Systems
            <br />
            First
            <br />
            Always
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        
        <p className="font-sans max-w-[55ch] text-[clamp(1rem,2.2vw,1.8rem)] font-medium leading-relaxed">
          Studying Computer Technology, I’ve served as Campus Ambassador, led technical developer initiatives, and competed across 25+ national and global marathons.
        </p>

        <hr className="my-[1.5vw] border-none border-t border-white/60" />

        {/* Achievements & Recognition Grid */}
        <div className="flex flex-wrap gap-[2.5vw]">
          <div className="min-w-[200px] flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5CE1E6] flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Campus Ambassador &amp; Leader
            </p>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
              Active Campus Ambassador driving Web3 &amp; AI developer workshops, guiding peer developers, and representing campus tech initiatives.
            </p>
          </div>

          <div className="min-w-[200px] flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FACC15] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 1st Place Track Winner
            </p>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
              🏆 <strong>Build On Chain @ NIT Calicut</strong> — 1st Place Track Prize for EVM smart contract tokenization and liquidity vault innovation.
            </p>
          </div>

          <div className="min-w-[200px] flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E88053] flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Smart India Hackathon Finalist
            </p>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
              🇮🇳 National Stage Finalist in India&apos;s flagship government technology competition building real-world software solutions.
            </p>
          </div>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/60" />

        <div className="flex flex-wrap gap-[2.5vw]">
          <div className="min-w-[200px] flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C084FC] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> OpenLedger &amp; Uniswap Incubator
            </p>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
              Technical Researcher with OpenLedger (AI/Web3 data pipelines) and selected for the Uniswap v4 Hook Incubator cohort.
            </p>
          </div>

          <div className="min-w-[200px] flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5CE1E6] flex items-center gap-1.5">
              <Monitor className="w-4 h-4" /> International Silambam Medalist
            </p>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
              Bronze Medalist at the International Silambam Championship—combining physical mastery, focus, and digital precision.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* 03 — CREATIVE SHOWCASE: MACOS BROWSER MOCKUP CARDS GRID */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Creative Showcase" style={{ backgroundColor: '#080808', color: '#fff' }}>
        <div className="space-y-6 my-auto max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#FACC15] text-black font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>🚀 LATEST DEPLOYMENTS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                CREATIVE <span className="text-[#5CE1E6]">SHOWCASE</span>
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm max-w-md text-white/70 font-medium leading-relaxed">
              Pushing the boundaries of frontend development with 3D interactions, AI integrations, smart contracts, and chaotic creativity.
            </p>
          </div>

          {/* 6-Card macOS Browser Mockup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SHOWCASE_CARDS.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-white/15 bg-[#0e0e14] overflow-hidden shadow-2xl hover:border-[#5CE1E6]/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
              >
                {/* macOS Browser Window Bar */}
                <div className="px-3.5 py-2.5 bg-[#161620] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-white/50 truncate max-w-[160px]">
                    {card.domain}
                  </div>
                  <div className="w-6" />
                </div>

                {/* Live Preview Screen Container */}
                <div className="relative w-full h-[180px] bg-black overflow-hidden group/screen">
                  <iframe
                    src={card.url}
                    title={card.title}
                    className="w-full h-full border-none pointer-events-none transform group-hover/screen:scale-105 transition-transform duration-500 bg-white"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent opacity-40 pointer-events-none" />
                  
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 px-3 py-1 bg-black/90 hover:bg-[#5CE1E6] hover:text-black border border-white/20 rounded-md font-mono text-[11px] font-bold text-white transition-all flex items-center gap-1 shadow-lg"
                  >
                    Launch ↗
                  </a>
                </div>

                {/* Card Body & Details */}
                <div className="p-4 sm:p-5 space-y-3 bg-[#0e0e14] flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-mono text-base font-bold text-white uppercase group-hover:text-[#5CE1E6] transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <a href={card.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </h3>
                    <p className="font-sans text-xs text-white/70 font-medium leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px] font-bold">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/5 border border-white/15 text-white/80 rounded uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* 04 — TRACK RECORD & VISION */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Track Record & Vision" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
        <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">04 — Track Record &amp; Vision</p>
        <hr className="my-[1.5vw] border-none border-t border-white/50" />
        <div>
          <h2 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Future
            <br />
            Of
            <br />
            Software
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/50" />
        <p className="font-sans max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-medium leading-relaxed">
          Building tools, systems, and platforms that empower developers and users worldwide.
        </p>
        <hr className="my-[1.5vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[2.5vw]">
          <div className="min-w-[180px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider">25+ Marathons</p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-85">
              Participated in 25+ hackathons delivering working Web3, AI, and full-stack software.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider">20+ Finalists</p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-85">
              Top-tier finalist placements across national and global engineering marathons.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="font-mono mb-1 text-xs sm:text-sm font-bold uppercase tracking-wider">15+ Deployments</p>
            <p className="font-sans text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed opacity-85">
              Production web applications, AI provenance engines, and EVM vaults live.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* 05 — JOIN US / LET'S BUILD */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Let's Collaborate" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C75B32]">05 — Let&apos;s Collaborate</p>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <div>
          <h2 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Ready
            <br />
            To
            <br />
            Build?
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <p className="font-sans mt-auto max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-medium leading-relaxed">
          Let&apos;s bring ambitious software concepts into production. Open for full-stack engineering, Web3 protocols, AI research, and high-impact hackathon builds.
        </p>
      </FlowSection>
    </FlowArt>
  );
};

export default FlowAboutStorySection;
