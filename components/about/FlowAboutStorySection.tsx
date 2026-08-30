'use client';

import React, { useState } from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { ExternalLink, Sparkles, Monitor, Globe, Award, ShieldCheck } from 'lucide-react';

interface ProjectPreview {
  id: string;
  name: string;
  tagline: string;
  url: string;
  tech: string[];
}

const LIVE_PROJECTS: ProjectPreview[] = [
  {
    id: 'sbk-3d',
    name: 'SBK BIRTHDAY 3D',
    tagline: 'Interactive 3D Spatial Audio Particle Experience',
    url: 'https://sbk-hd.vercel.app',
    tech: ['Three.js', 'Web Audio API', 'GSAP'],
  },
  {
    id: 'internocto',
    name: 'INTERNOCTO',
    tagline: 'High-Energy Motion Portfolio for OpenLedger Mascot',
    url: 'https://internocto-portfolio.vercel.app',
    tech: ['React', 'Framer Motion', 'Tailwind'],
  },
  {
    id: 'mediocto',
    name: 'MEDIOCTO AI',
    tagline: 'AI Mental Health Support Chat Companion Interface',
    url: 'https://mediocto-lovat.vercel.app/',
    tech: ['Next.js', 'LLM API', 'Tailwind'],
  },
  {
    id: 'nuna',
    name: 'NUNA ORGANIC',
    tagline: 'Bespoke Organic Product Event Showcase Platform',
    url: 'https://nunaorganic.vercel.app/',
    tech: ['React', 'CSS Grid', 'GSAP'],
  },
];

export const FlowAboutStorySection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectPreview>(LIVE_PROJECTS[0]);

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
      {/* 03 — LIVE DEPLOYED PROJECTS WITH INTERACTIVE IFRAME PREVIEW */}
      {/* ========================================================================= */}
      <FlowSection aria-label="Live Deployed Projects" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
        <div className="flex flex-col h-full space-y-4">
          <div>
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C75B32]">
              03 — Live Deployed Projects
            </p>
            <hr className="my-2 border-none border-t border-black/30" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-none">
                Show Up. Stand Out.
              </h2>
              <p className="font-sans text-xs sm:text-sm max-w-xl text-black/80 font-medium">
                Interact with live production web applications shipped directly to Vercel. Click any project tab below to load the live preview.
              </p>
            </div>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {LIVE_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                  activeProject.id === proj.id
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
              >
                <span>{proj.name}</span>
                {activeProject.id === proj.id && <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6] animate-pulse" />}
              </button>
            ))}
          </div>

          {/* Active Project Meta Details Bar */}
          <div className="flex flex-wrap justify-between items-center bg-black/5 p-3 rounded-xl border border-black/10 gap-2 font-mono text-xs">
            <div>
              <span className="font-bold text-black uppercase">{activeProject.name}: </span>
              <span className="text-black/70 font-sans">{activeProject.tagline}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {activeProject.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-black/10 text-black rounded text-[10px] font-bold">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#C75B32] text-white font-mono text-xs font-bold rounded hover:bg-[#b04d27] transition-colors"
              >
                Open Live ↗ <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Embedded Interactive Iframe Container */}
          <div className="relative w-full flex-1 min-h-[350px] sm:min-h-[420px] rounded-2xl overflow-hidden border-2 border-black/20 bg-black/90 shadow-2xl">
            {/* Embedded Live Web App Iframe */}
            <iframe
              key={activeProject.id}
              src={activeProject.url}
              title={activeProject.name}
              className="w-full h-full border-none rounded-xl bg-white"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
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
