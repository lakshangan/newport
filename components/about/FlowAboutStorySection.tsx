'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
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
    <FlowArt aria-label="About the Builder Story Scroll">
      {/* ========================================================================= */}
      {/* SLIDE 01: ABOUT THE BUILDER (RENAISSANCE STYLE) */}
      {/* ========================================================================= */}
      <FlowSection id="about" aria-label="01 — About the Builder" style={{ backgroundColor: '#080808' }}>
        {/* Renaissance Artwork Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Image
            src="/images/about section .png"
            alt="Renaissance Art Texture"
            fill
            priority
            className="object-cover object-center filter contrast-105 brightness-90"
            sizes="100vw"
          />
        </div>

        {/* Renaissance Vitruvian Blueprint Grid & Overlays */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-25 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/55 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85 pointer-events-none" />

        {/* Volumetric Warm Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-[#C75B32]/12 rounded-full blur-[140px] pointer-events-none z-2" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#5CE1E6]/8 rounded-full blur-[120px] pointer-events-none z-2" />

        <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 relative z-10 my-auto">
          {/* Header */}
          <div className="space-y-3 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/70 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C75B32] animate-pulse" />
              <span>01 // ABOUT THE BUILDER</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-black text-[#E8E5DF] tracking-tight leading-tight">
              Hey, I’m <span className="text-[#C75B32]">Lakshan.</span>
            </h2>

            <p className="font-sans text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-snug font-medium">
              Full-Stack Developer building applications across <span className="text-[#5CE1E6] font-bold">full-stack web</span>, <span className="text-[#E88053] font-bold">cloud backends</span>, <span className="text-[#C084FC] font-bold">AI systems</span>, and <span className="text-[#FACC15] font-bold">blockchain protocols</span>.
            </p>
          </div>

          {/* 2-Column Compact Editorial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">
            {/* Left Column: Education & Philosophy */}
            <div className="p-6 sm:p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-[#5CE1E6]/40 transition-colors">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#5CE1E6] tracking-widest uppercase flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6]" />
                  <span>BUILDING REAL SYSTEMS</span>
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase">
                  <AsciiGlitchRipple dur={1000}>FIRST-PRINCIPLES ENGINEERING</AsciiGlitchRipple>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                  Studying <strong className="text-white font-semibold">Computer Technology</strong>, I focused on full-stack development enriched with AI and blockchain technologies. I turn concepts into working production products—from Next.js web applications and server backends to AI agent tools and smart contracts.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ Full-Stack Web</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ AI Integration</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ DApps &amp; DeFi</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ Cloud APIs</span>
              </div>
            </div>

            {/* Right Column: Track Record & Research */}
            <div className="p-6 sm:p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-[#C75B32]/40 transition-colors">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#C75B32] tracking-widest uppercase flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C75B32]" />
                  <span>TRACK RECORD &amp; RESEARCH</span>
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase">
                  <AsciiGlitchRipple dur={1000}>COMPETING &amp; GOING DEEPER</AsciiGlitchRipple>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                  Competed in 25+ hackathons with 20+ finalist finishes. <strong className="text-white font-semibold">1st Place Track Winner at Build on Chain</strong>, <strong className="text-white font-semibold">Smart India Hackathon Finalist</strong>, and researcher with <strong className="text-[#5CE1E6] font-semibold">OpenLedger</strong> (AI/Web3 data pipelines) and the <strong className="text-[#E88053] font-semibold">Uniswap Hook Incubator</strong> (Uniswap v4 hooks).
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-white/80">
                <div className="p-2 bg-black/60 border border-[#C75B32]/30 rounded-lg">
                  <span className="text-[#C75B32] font-bold block">BUILD ON CHAIN</span>
                  <span>Track Winner 🏆</span>
                </div>
                <div className="p-2 bg-black/60 border border-[#5CE1E6]/30 rounded-lg">
                  <span className="text-[#5CE1E6] font-bold block">SMART INDIA HACKATHON</span>
                  <span>National Finalist 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap justify-center items-center gap-2">
            {[
              'FULL-STACK WEB DEVELOPMENT',
              'AI SYSTEMS & LLM AGENTS',
              'BLOCKCHAIN & SOLIDITY EVM',
              'OPENLEDGER TECHNICAL RESEARCH',
              'UNISWAP HOOK INCUBATOR',
              'SYSTEM ARCHITECTURE & APIS',
            ].map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-black/60 border border-white/15 rounded-full font-mono text-[11px] text-white/90 hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors"
              >
                • {skill}
              </span>
            ))}
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
                <Award className="w-4 h-4" /> Campus Ambassador &amp; Leader
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-medium">
                Active Campus Ambassador driving Web3 &amp; AI developer workshops, guiding peer developers, and representing campus tech initiatives.
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
