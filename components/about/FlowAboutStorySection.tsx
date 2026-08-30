'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { Trophy, Award, Zap, Globe, Rocket, CheckCircle2, ExternalLink, Sparkles, Monitor, ShieldCheck } from 'lucide-react';

interface CounterNumberProps {
  value: string | number;
  className?: string;
}

const CounterNumber: React.FC<CounterNumberProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    const strVal = String(value);
    const numericMatch = strVal.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(strVal);
      return;
    }

    const targetNum = parseInt(numericMatch[0], 10);
    const suffix = strVal.replace(/\d+/, '');
    const hasLeadingZero = strVal.startsWith('0') && targetNum < 10 && strVal.length > 1;

    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * targetNum);

      const formattedCurrent = hasLeadingZero && current < 10 ? `0${current}` : `${current}`;
      setDisplayValue(`${formattedCurrent}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        const finalFormatted = hasLeadingZero && targetNum < 10 ? `0${targetNum}` : `${targetNum}`;
        setDisplayValue(`${finalFormatted}${suffix}`);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

interface ShowcaseCard {
  id: string;
  title: string;
  domain: string;
  url: string;
  githubUrl: string;
  description: string;
  tags: string[];
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'jayam',
    title: 'Jayam Website',
    domain: 'jayamwebsite.vercel.app',
    url: 'https://jayamwebsite.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/jayam-website-',
    description: 'Full-stack corporate platform & bespoke web application with responsive architecture.',
    tags: ['REACT', 'NEXT.JS', 'TAILWIND'],
  },
  {
    id: 'land-vault',
    title: 'LandVault Blockchain',
    domain: 'land-vault-v2.vercel.app',
    url: 'https://land-vault-v2.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
    description: 'Tokenizing real estate assets & crypto transfers on EVM chains with automated yield.',
    tags: ['SOLIDITY', 'EVM', 'WEB3.JS'],
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
    description: 'Special event organic showcase platform with bespoke motion transitions & gallery.',
    tags: ['REACT', 'GSAP', 'GALLERY'],
  },
  {
    id: 'mediocto',
    title: 'MediOcto AI',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'AI-powered mental health support chat interface featuring an animated octopus companion.',
    tags: ['AI', 'HEALTH', 'NEXT.JS'],
  },
  {
    id: 'genproof',
    title: 'GenProof AI',
    domain: 'gen-proof-ai.vercel.app',
    url: 'https://gen-proof-ai.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Cryptographic content credentials engine detecting AI synthetic media via C2PA standards.',
    tags: ['PYTHON', 'C2PA', 'AI/ML'],
  },
  {
    id: 'steganography',
    title: 'Steganography CLI',
    domain: 'github.com/lakshangan',
    url: 'https://github.com/lakshangan/steganography',
    githubUrl: 'https://github.com/lakshangan/steganography',
    description: 'CLI tool securely hiding secret encrypted payloads inside digital image pixels via LSB.',
    tags: ['PYTHON', 'SECURITY', 'LSB'],
  },
];

export const FlowAboutStorySection: React.FC = () => {
  return (
    <FlowArt aria-label="About the Builder Story Scroll">
      {/* ========================================================================= */}
      {/* SLIDE 01: 01 — WHO I AM: CRAFTSMANSHIP & TECH STACK (INTRO1 RENAISSANCE ARTWORK) */}
      {/* ========================================================================= */}
      <FlowSection id="about" aria-label="01 — Who I am" style={{ backgroundColor: '#EADFC9', color: '#1A130F' }}>
        {/* Renaissance Artwork Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/intro1.png"
            alt="Renaissance Classical Tech Artwork"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Content Container (Centered in open parchment area framed by left books & right globe) */}
        <div className="relative z-10 my-auto max-w-5xl mx-auto w-full flex flex-col justify-between h-full py-[clamp(2rem,4vw,3.5rem)] space-y-5 sm:space-y-7">
          {/* Top Header Badge */}
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1A130F]/10 border border-[#8C4B18]/40 text-xs font-mono text-[#8C4B18] font-bold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C4B18] animate-pulse" />
              <span>01 — WHO I AM // LAKSHAN G.</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display text-[clamp(2.8rem,7.5vw,7rem)] font-extrabold leading-[0.88] uppercase tracking-tight text-[#1A130F]">
                CREATE
                <br />
                WITHOUT
                <br />
                LIMITS
              </h1>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="font-sans max-w-[54ch] text-[clamp(0.95rem,1.8vw,1.35rem)] font-medium leading-relaxed text-[#2C1D11] bg-[#1A130F]/5 p-4 sm:p-5 rounded-2xl border border-[#1A130F]/15 backdrop-blur-sm shadow-sm">
            Full-Stack Developer, AI Systems Engineer &amp; Web3 Researcher. Turning complex ideas into high-performance interfaces, backend infrastructure, and scalable applications.
          </p>

          {/* 3 Tech Feature Cards across the bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
            <div className="p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>⚡ First-Principles Mindset</span>
              </p>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#2C1D11] font-medium">
                Deconstructing architecture to fundamental truths before writing code. I turn raw concepts into production-ready software.
              </p>
            </div>

            <div className="p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#733610] flex items-center gap-1.5">
                <span>🛠️ My Core Tech Stack</span>
              </p>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#2C1D11] font-medium">
                Next.js, TypeScript, React, Node.js, Python, Solidity, EVM Smart Contracts, Three.js, GSAP, &amp; LLM Agents.
              </p>
            </div>

            <div className="p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>🚀 Rapid Execution</span>
              </p>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#2C1D11] font-medium">
                Thriving under strict 36-hour marathon deadlines to ship full-stack web products, APIs, &amp; audited Web3 smart contracts.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* SLIDE 02: RECOGNITION & COLLEGE ACHIEVEMENTS (RENAISSANCE STYLE) */}
      {/* ========================================================================= */}
      <FlowSection id="recognition" aria-label="02 — Recognition & College Achievements" style={{ backgroundColor: '#08080c' }}>
        {/* Background Grid & Volumetric Glows */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#111118_1px,transparent_1px),linear-gradient(to_bottom,#111118_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/8 rounded-full blur-[150px] pointer-events-none z-1" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 relative z-10 my-auto">
          {/* Header */}
          <div className="space-y-2 border-b border-white/10 pb-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 border border-[#5CE1E6]/40 text-xs font-mono text-[#5CE1E6] tracking-widest uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6] animate-pulse" />
              <span>02 // RECOGNITION &amp; COLLEGE ACHIEVEMENTS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              RECOGNIZED ACROSS NATIONAL &amp; GLOBAL STAGES
            </h2>
            <p className="text-xs sm:text-sm font-light text-white/70 max-w-2xl">
              Studying Computer Technology, I’ve served as Campus Ambassador, led technical developer initiatives, and competed across 25+ national and global marathons.
            </p>
          </div>

          {/* 5 Renaissance Glass Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-2 hover:border-[#5CE1E6]/40 transition-colors">
              <div className="text-xs font-mono text-[#5CE1E6] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Tech Hub Lead &amp; Campus Ambassador
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                <strong>Tech Hub Lead</strong> at College Tech Organization &amp; active Campus Ambassador driving Web3 &amp; AI developer workshops, guiding peer developers, and leading campus tech initiatives.
              </p>
            </div>

            <div className="p-5 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-2 hover:border-[#FACC15]/40 transition-colors">
              <div className="text-xs font-mono text-[#FACC15] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> 1st Place Track Winner
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                🏆 <strong>Build On Chain @ NIT Calicut</strong> — 1st Place Track Prize for EVM smart contract tokenization and liquidity vault innovation.
              </p>
            </div>

            <div className="p-5 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-2 hover:border-[#E88053]/40 transition-colors">
              <div className="text-xs font-mono text-[#E88053] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Smart India Hackathon Finalist
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                🇮🇳 National Stage Finalist in India&apos;s flagship government technology competition building real-world software solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-2 hover:border-[#C084FC]/40 transition-colors">
              <div className="text-xs font-mono text-[#C084FC] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> OpenLedger &amp; Uniswap Incubator
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                Technical Researcher with OpenLedger (AI/Web3 data pipelines) and selected for the Uniswap v4 Hook Incubator cohort.
              </p>
            </div>

            <div className="p-5 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-2 hover:border-[#5CE1E6]/40 transition-colors">
              <div className="text-xs font-mono text-[#5CE1E6] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Monitor className="w-4 h-4" /> International Silambam Medalist
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                Bronze Medalist at the International Silambam Championship—combining physical mastery, focus, and digital precision.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ========================================================================= */}
      {/* SLIDE 03: CREATIVE SHOWCASE (MACOS BROWSER MOCKUP CARDS GRID) */}
      {/* ========================================================================= */}
      <FlowSection id="showcase" aria-label="03 — Creative Showcase" style={{ backgroundColor: '#080808' }}>
        {/* Background Grid */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#1b1b26_1px,transparent_1px),linear-gradient(to_bottom,#1b1b26_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-20 pointer-events-none" />

        <div className="space-y-6 my-auto max-w-7xl mx-auto w-full relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 border border-[#FACC15]/40 text-xs font-mono text-[#FACC15] tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>03 // LATEST DEPLOYMENTS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
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
                    <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase group-hover:text-[#5CE1E6] transition-colors flex items-center justify-between gap-2">
                      <span className="truncate">{card.title}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {card.githubUrl && (
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8E8B85] hover:text-[#5CE1E6] transition-colors text-[10px] font-mono flex items-center gap-0.5"
                            title="View GitHub Repository"
                          >
                            Code ↗
                          </a>
                        )}
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5CE1E6] hover:text-white transition-colors"
                          title="Open Live Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
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
      {/* SLIDE 04: KEY METRICS & TELEMETRY WORKSPACE */}
      {/* ========================================================================= */}
      <FlowSection id="metrics" aria-label="04 — Key Metrics & Telemetry Workspace" style={{ backgroundColor: '#08080c' }}>
        {/* Background Glows */}
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/8 rounded-full blur-[150px] pointer-events-none z-1" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none z-1" />
        <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#111118_1px,transparent_1px),linear-gradient(to_bottom,#111118_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 relative z-10 my-auto">
          {/* Header */}
          <div className="space-y-1.5 border-b border-white/10 pb-3 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 border border-[#5CE1E6]/40 text-xs font-mono text-[#5CE1E6] tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
              <span>04 // KEY METRICS &amp; TELEMETRY WORKSPACE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
              AGENT BENTO METRICS
            </h2>
            <p className="text-xs sm:text-sm font-light text-white/60 max-w-xl">
              Compact multi-agent workspace grid tracking competitive marathons, top placements, and deployed full-stack products.
            </p>
          </div>

          {/* Outer Bento Grid Container */}
          <div className="p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] bg-[#07070a]/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-3">
            {/* Top Row: 3 Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Card 1: Hackathon Pipeline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 p-4 flex flex-col justify-between hover:border-[#5CE1E6]/40 transition-all group"
              >
                <AnimatedGradient colors={["#5CE1E6", "#3B82F6", "#1E40AF"]} speed={0.08} blur="medium" />

                <div className="relative z-10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[#5CE1E6]" />
                      Hackathon Pipeline
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 text-[9px] font-mono text-[#5CE1E6] uppercase">
                      25+ MARATHONS
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Visualise 25+ hackathons &amp; rapid software shipping workflows in real time.
                  </p>
                </div>

                <div className="relative z-10 mt-3 p-2.5 bg-[#08080c] border border-white/10 rounded-lg space-y-1 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60 text-xs">Total Competed:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#5CE1E6] font-display">
                      <CounterNumber value="25+" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 border-t border-white/10 text-[10px] text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6] animate-ping" />
                    <span>Sprint Duration: 36h Max</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Finalist Monitor */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 p-4 flex flex-col justify-between hover:border-[#C75B32]/40 transition-all group"
              >
                <AnimatedGradient colors={["#C75B32", "#E88053", "#FF6B35"]} speed={0.08} blur="medium" />

                <div className="relative z-10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C75B32]" />
                      Finalist Monitor
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#C75B32]/10 border border-[#C75B32]/30 text-[9px] font-mono text-[#C75B32] uppercase">
                      20+ PLACEMENTS
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Track 20+ top-tier placements &amp; high-impact prototype success rates.
                  </p>
                </div>

                <div className="relative z-10 mt-3 p-2.5 bg-[#08080c] border border-white/10 rounded-lg space-y-1 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60 text-xs">Finalist Placements:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#C75B32] font-display">
                      <CounterNumber value="20+" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/50">
                    <span>Success Rate: ~80%</span>
                    <span className="text-[#C75B32] font-bold">TOP-TIER</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Victory Feed */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 p-4 flex flex-col justify-between hover:border-[#FACC15]/40 transition-all group"
              >
                <AnimatedGradient colors={["#FACC15", "#E88053", "#C75B32"]} speed={0.08} blur="medium" />

                <div className="relative z-10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#FACC15]" />
                      Victory Feed
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/30 text-[9px] font-mono text-[#FACC15] uppercase">
                      1ST PLACE
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Real-time log of 1st place track wins &amp; EVM smart contract innovations.
                  </p>
                </div>

                <div className="relative z-10 mt-3 p-2.5 bg-[#08080c] border border-white/10 rounded-lg space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="truncate">🏆 Build On Chain @ NIT Calicut</span>
                    <span className="text-[#FACC15] font-bold font-display text-sm">
                      <CounterNumber value="01" />
                    </span>
                  </div>
                  <div className="text-[10px] text-white/50 truncate">
                    EVM Smart Contract Innovation
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: 2 Wider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Card 4: Global Recognition */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="md:col-span-3 relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 p-4 flex flex-col justify-between hover:border-[#C084FC]/40 transition-all group"
              >
                <AnimatedGradient colors={["#C084FC", "#8B5CF6", "#5CE1E6"]} speed={0.08} blur="medium" />

                <div className="relative z-10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#C084FC]" />
                      Global Recognition
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 text-[9px] font-mono text-[#C084FC] uppercase">
                      2 SELECTIONS
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Selected across India&apos;s flagship Smart India Hackathon &amp; UNESCO-IOC Ocean Platform.
                  </p>
                </div>

                <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="p-2 bg-[#08080c] border border-white/10 rounded-lg space-y-0.5">
                    <span className="text-[#C084FC] font-bold block text-xs">Smart India Hackathon</span>
                    <span className="text-[10px] text-white/50">National Stage Finalist</span>
                  </div>
                  <div className="p-2 bg-[#08080c] border border-white/10 rounded-lg space-y-0.5">
                    <span className="text-[#5CE1E6] font-bold block text-xs">UNESCO-IOC Network</span>
                    <span className="text-[10px] text-white/50">Circle Global Selection</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Deployment Inspector */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="md:col-span-2 relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 p-4 flex flex-col justify-between hover:border-[#10B981]/40 transition-all group"
              >
                <AnimatedGradient colors={["#10B981", "#059669", "#3B82F6"]} speed={0.08} blur="medium" />

                <div className="relative z-10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Rocket className="w-4 h-4 text-[#10B981]" />
                      Deployment Inspector
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[9px] font-mono text-[#10B981] uppercase">
                      15+ DEPLOYMENTS
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Full-stack web apps, AI provenance engines, &amp; EVM vaults.
                  </p>
                </div>

                <div className="relative z-10 mt-3 p-2.5 bg-[#08080c] border border-white/10 rounded-lg flex justify-between items-center font-mono">
                  <div className="space-y-0.5">
                    <span className="text-xs text-white/60 block">Shipped Applications:</span>
                    <span className="text-[10px] text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED DEPLOYED
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-[#10B981] font-display">
                    <CounterNumber value="15+" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </FlowSection>
    </FlowArt>
  );
};

export default FlowAboutStorySection;
