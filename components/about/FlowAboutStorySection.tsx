'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { Trophy, Award, Zap, Globe, Rocket, CheckCircle2, ExternalLink, Sparkles, Monitor, ShieldCheck, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  type?: 'web' | 'cli' | 'ai' | 'web3';
  status?: string;
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
    type: 'web',
    status: 'ONLINE',
  },
  {
    id: 'land-vault',
    title: 'LandVault Blockchain',
    domain: 'land-vault-v2.vercel.app',
    url: 'https://land-vault-v2.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
    description: 'Tokenizing real estate assets & crypto transfers on EVM chains with automated yield.',
    tags: ['SOLIDITY', 'EVM', 'WEB3.JS'],
    type: 'web3',
    status: 'EVM CHAIN',
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
    description: 'Special event organic showcase platform with bespoke motion transitions & gallery.',
    tags: ['REACT', 'GSAP', 'GALLERY'],
    type: 'web',
    status: 'ONLINE',
  },
  {
    id: 'mediocto',
    title: 'MediOcto AI',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'AI-powered mental health support chat interface featuring an animated octopus companion.',
    tags: ['AI', 'HEALTH', 'NEXT.JS'],
    type: 'ai',
    status: 'AI AGENT',
  },
  {
    id: 'genproof',
    title: 'GenProof AI',
    domain: 'gen-proof-ai.vercel.app',
    url: 'https://gen-proof-ai.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Cryptographic content credentials engine detecting AI synthetic media via C2PA standards.',
    tags: ['PYTHON', 'C2PA', 'AI/ML'],
    type: 'ai',
    status: 'C2PA AUDIT',
  },
  {
    id: 'steganography',
    title: 'Steganography CLI',
    domain: 'github.com/lakshangan/steganography',
    url: 'https://github.com/lakshangan/steganography',
    githubUrl: 'https://github.com/lakshangan/steganography',
    description: 'CLI tool securely hiding secret encrypted payloads inside digital image pixels via LSB.',
    tags: ['PYTHON', 'SECURITY', 'LSB'],
    type: 'cli',
    status: 'SECURITY CLI',
  },
];

export const FlowAboutStorySection: React.FC = () => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToCompetitiveMilestones = () => {
    const el = document.getElementById('competitive-milestones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    const container = horizontalContainerRef.current;
    const track = horizontalTrackRef.current;
    if (!container || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel', container);
    const totalPanels = panels.length;
    if (totalPanels <= 1) return;

    // Total scroll duration: horizontal movement + 600px resting buffer on panel 3
    const totalDistance = window.innerWidth * (totalPanels - 1) + 600;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalDistance}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const moveProgress = Math.min(1, self.progress / 0.82);
          const index = Math.min(
            totalPanels - 1,
            Math.floor(moveProgress * totalPanels)
          );
          setActiveSlide(index);
        },
      },
    });

    // Horizontal shift of the continuous track containing panorama background and panels
    tl.to(track, {
      x: () => -(window.innerWidth * (totalPanels - 1)),
      ease: 'none',
      duration: 0.82,
    });

    // Comfortable resting pause on the final panel before unpinning
    tl.to({}, { duration: 0.18 });

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  });

  return (
    <div className="w-full relative block" aria-label="About the Builder Story Scroll">
      {/* ========================================================================= */}
      {/* SLIDE 01: 01 — WHO I AM: CRAFTSMANSHIP & TECH STACK (INTRO1 RENAISSANCE ARTWORK) */}
      {/* ========================================================================= */}
      <section
        id="about"
        aria-label="01 — Who I am"
        className="relative h-screen min-h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-12"
        style={{ backgroundColor: '#EADFC9', color: '#1A130F' }}
      >
        {/* Renaissance Artwork Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
          <Image
            src="/images/intro1.png"
            alt="Renaissance Classical Tech Artwork"
            fill
            priority
            className="object-cover object-center w-full h-full"
            sizes="100vw"
          />
        </div>

        {/* Content Container (Centered in open parchment area framed by left books & right globe) */}
        <div className="relative z-10 my-auto max-w-5xl mx-auto w-full flex flex-col justify-between h-full py-2 sm:py-4 space-y-3 sm:space-y-4">
          {/* Top Header Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1A130F]/10 border border-[#8C4B18]/40 text-xs font-mono text-[#8C4B18] font-bold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C4B18] animate-pulse" />
              <span>01 — WHO I AM // LAKSHAN G.</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.8rem)] font-extrabold leading-[0.88] uppercase tracking-tight text-[#1A130F]">
                CREATE
                <br />
                WITHOUT
                <br />
                LIMITS
              </h1>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="font-sans max-w-[54ch] text-[clamp(0.85rem,1.5vw,1.15rem)] font-medium leading-relaxed text-[#2C1D11] bg-[#1A130F]/5 p-3 sm:p-4 rounded-2xl border border-[#1A130F]/15 backdrop-blur-sm shadow-sm">
            Full-Stack Developer, AI Systems Engineer &amp; Web3 Researcher. Turning complex ideas into high-performance interfaces, backend infrastructure, and scalable applications.
          </p>

          {/* 3 Tech Feature Cards across the bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-3.5 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1 text-xs font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>⚡ First-Principles Mindset</span>
              </p>
              <p className="font-sans text-xs leading-relaxed text-[#2C1D11] font-medium">
                Deconstructing architecture to fundamental truths before writing code. I turn raw concepts into production-ready software.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1 text-xs font-bold uppercase tracking-wider text-[#733610] flex items-center gap-1.5">
                <span>🛠️ My Core Tech Stack</span>
              </p>
              <p className="font-sans text-xs leading-relaxed text-[#2C1D11] font-medium">
                Next.js, TypeScript, React, Node.js, Python, Solidity, EVM Smart Contracts, Three.js, GSAP, &amp; LLM Agents.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1 text-xs font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>🚀 Rapid Execution</span>
              </p>
              <p className="font-sans text-xs leading-relaxed text-[#2C1D11] font-medium">
                Thriving under strict 36-hour marathon deadlines to ship full-stack web products, APIs, &amp; audited Web3 smart contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PINNED HORIZONTAL SCROLL: 02 RECOGNITION, 03 SHOWCASE, 04 METRICS */}
      {/* ========================================================================= */}
      <div
        ref={horizontalContainerRef}
        className="relative w-full h-screen overflow-hidden bg-[#08080c] select-none"
      >
        <div
          ref={horizontalTrackRef}
          className="flex flex-row w-[300vw] h-full will-change-transform relative"
        >
          {/* Continuous Ultra-Wide Panoramic Studio & Engineering Workspace Background */}
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/horizontal-workspace.png"
              alt="Creative Engineering Workspace Studio Panorama"
              fill
              priority
              className="object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.05]"
              sizes="300vw"
            />
            {/* Subtle atmospheric vignette and tone mapping overlays */}
            <div className="absolute inset-0 bg-[#120D0A]/40 backdrop-blur-[0.5px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-transparent to-[#0C0907]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* ========================================================================= */}
          {/* PANEL 1 (SLIDE 02): RECOGNITION & COLLEGE ACHIEVEMENTS */}
          {/* ========================================================================= */}
          <div
            id="recognition"
            className="horizontal-panel w-screen h-screen shrink-0 relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#E88053]/10 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/12 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-5 sm:space-y-6 relative z-10 my-auto">
              {/* Header */}
              <div className="space-y-2 border-b border-[#D4BC98]/20 pb-4 text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#16120E]/90 border border-[#D4BC98]/30 text-xs font-mono text-[#E88053] tracking-widest uppercase backdrop-blur-md shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                  <span>02 // RECOGNITION &amp; COLLEGE ACHIEVEMENTS</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  RECOGNIZED ACROSS NATIONAL &amp; GLOBAL STAGES
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#EADFC9]/95 max-w-2xl bg-[#16120E]/70 backdrop-blur-md p-3 rounded-xl border border-[#D4BC98]/20 shadow-md">
                  Studying Computer Technology, I’ve served as Campus Ambassador, led technical developer initiatives, and competed across 25+ national and global marathons.
                </p>
              </div>

              {/* 5 Warm Bronze Glass Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div className="p-4 sm:p-5 bg-[#16120E]/85 border border-[#D4BC98]/20 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#5CE1E6]/60 hover:bg-[#1E1712]/95 transition-all group">
                  <div className="text-xs font-mono text-[#5CE1E6] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Tech Hub Lead &amp; Campus Ambassador
                  </div>
                  <p className="font-sans text-xs text-[#EADFC9]/90 leading-relaxed font-medium">
                    <strong className="text-white font-bold">Tech Hub Lead</strong> at College Tech Organization &amp; active Campus Ambassador driving Web3 &amp; AI developer workshops, guiding peer developers, and leading campus tech initiatives.
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#16120E]/85 border border-[#D4BC98]/20 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#FACC15]/60 hover:bg-[#1E1712]/95 transition-all group">
                  <div className="text-xs font-mono text-[#FACC15] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" /> 1st Place Track Winner
                  </div>
                  <p className="font-sans text-xs text-[#EADFC9]/90 leading-relaxed font-medium">
                    🏆 <strong className="text-white font-bold">Build On Chain @ NIT Calicut</strong> — 1st Place Track Prize for EVM smart contract tokenization and liquidity vault innovation.
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#16120E]/85 border border-[#D4BC98]/20 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#E88053]/60 hover:bg-[#1E1712]/95 transition-all group">
                  <div className="text-xs font-mono text-[#E88053] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> Smart India Hackathon Finalist
                  </div>
                  <p className="font-sans text-xs text-[#EADFC9]/90 leading-relaxed font-medium">
                    🇮🇳 <strong className="text-white font-bold">National Stage Finalist</strong> in India&apos;s flagship government technology competition building real-world software solutions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="p-4 sm:p-5 bg-[#16120E]/85 border border-[#D4BC98]/20 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#C084FC]/60 hover:bg-[#1E1712]/95 transition-all group">
                  <div className="text-xs font-mono text-[#C084FC] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> OpenLedger &amp; Uniswap Incubator
                  </div>
                  <p className="font-sans text-xs text-[#EADFC9]/90 leading-relaxed font-medium">
                    <strong className="text-white font-bold">Technical Researcher</strong> with OpenLedger (AI/Web3 data pipelines) and selected for the Uniswap v4 Hook Incubator cohort.
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#16120E]/85 border border-[#D4BC98]/20 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#5CE1E6]/60 hover:bg-[#1E1712]/95 transition-all group">
                  <div className="text-xs font-mono text-[#5CE1E6] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Monitor className="w-4 h-4" /> International Silambam Medalist
                  </div>
                  <p className="font-sans text-xs text-[#EADFC9]/90 leading-relaxed font-medium">
                    <strong className="text-white font-bold">Bronze Medalist</strong> at the International Silambam Championship—combining physical mastery, focus, and digital precision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 2 (SLIDE 03): CREATIVE SHOWCASE */}
          {/* ========================================================================= */}
          <div
            id="showcase"
            className="horizontal-panel w-screen h-screen shrink-0 relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-[#C75B32]/12 rounded-full blur-[170px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#E88053]/10 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="space-y-4 sm:space-y-5 my-auto max-w-7xl mx-auto w-full relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#D4BC98]/20 pb-3">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#16120E]/90 border border-[#D4BC98]/30 text-xs font-mono text-[#E88053] tracking-wider uppercase backdrop-blur-md shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#E88053]" />
                    <span>03 // LATEST DEPLOYMENTS</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] leading-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                    CREATIVE <span className="text-[#E88053] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">SHOWCASE</span>
                  </h2>
                </div>
                <p className="font-sans text-xs sm:text-sm max-w-md text-[#EADFC9]/95 font-medium leading-relaxed bg-[#16120E]/70 backdrop-blur-md p-3 rounded-xl border border-[#D4BC98]/20 shadow-md">
                  Pushing the boundaries of full-stack engineering with 3D WebGL interactions, AI agents, smart contracts, and cryptographic tooling.
                </p>
              </div>

              {/* 6 Ultra-Modern Glassmorphic Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {SHOWCASE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-[#D4BC98]/20 bg-[#16120E]/90 backdrop-blur-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-[#C75B32] hover:bg-[#1E1712] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(199,91,50,0.25)]"
                  >
                    {/* macOS Window Header */}
                    <div className="px-3 py-1.5 bg-[#0E0B08]/90 border-b border-[#D4BC98]/15 flex items-center justify-between backdrop-blur-md">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-mono text-[#EADFC9] truncate max-w-[150px] backdrop-blur-sm">
                        {card.domain}
                      </div>
                      <span className="text-[8px] font-mono font-bold text-[#E88053] uppercase tracking-wider">
                        {card.status}
                      </span>
                    </div>

                    {/* Card Screen Preview Container */}
                    {card.type === 'cli' ? (
                      <div className="relative w-full h-[115px] sm:h-[130px] bg-[#0A0806]/95 p-3 font-mono text-[10px] flex flex-col justify-between overflow-hidden border-b border-[#D4BC98]/15 group-hover:border-[#C75B32]/40 transition-colors">
                        <div className="space-y-1">
                          <div className="text-white/40 text-[9px]">$ stego-cli --embed --file secret.enc</div>
                          <div className="text-emerald-400 font-bold">[+] Encrypting AES-256...</div>
                          <div className="text-[#E88053]">[+] Embedding LSB into cover.png</div>
                          <div className="text-white/90 font-bold">[✓] Payload hidden successfully.</div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-white/50 pt-1 border-t border-white/10">
                          <span>LSB Spatial Algorithm</span>
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E88053] hover:underline font-bold flex items-center gap-0.5"
                          >
                            GitHub CLI ↗
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-[115px] sm:h-[130px] bg-black/70 overflow-hidden group/screen border-b border-[#D4BC98]/15">
                        <iframe
                          src={card.url}
                          title={card.title}
                          className="w-full h-full border-none pointer-events-none transform group-hover/screen:scale-105 transition-transform duration-500 bg-white"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-75 pointer-events-none" />
                        
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-2.5 right-2.5 px-3 py-1 bg-[#C75B32] hover:bg-[#E88053] text-white font-mono font-bold text-[11px] tracking-wider rounded-md transition-all shadow-[0_4px_15px_rgba(199,91,50,0.4)] flex items-center gap-1 hover:scale-105"
                        >
                          Launch ↗
                        </a>
                      </div>
                    )}

                    {/* Card Body & Details */}
                    <div className="p-3 sm:p-3.5 space-y-2 bg-[#120E0B]/60 backdrop-blur-md flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-mono text-xs sm:text-sm font-bold text-[#FFFDF9] uppercase group-hover:text-[#E88053] transition-colors flex items-center justify-between gap-2">
                          <span className="truncate">{card.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {card.githubUrl && (
                              <a
                                href={card.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#C75B32] hover:text-white border border-[#D4BC98]/20 text-[#EADFC9] transition-all text-[9px] font-mono flex items-center gap-0.5 shadow-sm"
                                title="View GitHub Repository"
                              >
                                Code ↗
                              </a>
                            )}
                            <a
                              href={card.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-white/10 hover:bg-[#C75B32] hover:text-white border border-[#D4BC98]/20 text-[#E88053] hover:text-white transition-all"
                              title="Open Live Website"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </h3>
                        <p className="font-sans text-[11px] sm:text-xs text-[#EADFC9]/85 font-medium leading-snug line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#D4BC98]/15 flex flex-wrap gap-1 font-mono text-[8px] sm:text-[9px] font-bold">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#221A14]/90 border border-[#D4BC98]/20 text-[#EADFC9] rounded uppercase tracking-wider backdrop-blur-md shadow-sm"
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
          </div>

          {/* ========================================================================= */}
          {/* PANEL 3 (SLIDE 04): KEY METRICS & TELEMETRY WORKSPACE */}
          {/* ========================================================================= */}
          <div
            id="metrics"
            className="horizontal-panel w-screen h-screen shrink-0 relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 overflow-hidden bg-transparent"
          >
            {/* Background Glows */}
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/8 rounded-full blur-[150px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none z-1" />
            <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#111118_1px,transparent_1px),linear-gradient(to_bottom,#111118_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-5 relative z-10 my-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D4BC98]/20 pb-3 text-left">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#16120E]/90 border border-[#5CE1E6]/40 text-xs font-mono text-[#5CE1E6] tracking-widest uppercase backdrop-blur-md shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
                    <span>04 // KEY METRICS &amp; TELEMETRY WORKSPACE</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                    AGENT BENTO METRICS
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#EADFC9]/90 max-w-xl">
                    Compact multi-agent workspace grid tracking competitive marathons, top placements, and deployed full-stack products.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCompetitiveMilestones}
                  className="self-start sm:self-end inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C75B32]/30 hover:bg-[#C75B32] border border-[#C75B32]/60 hover:border-[#C75B32] text-xs font-mono font-bold text-white transition-all shadow-md group cursor-pointer"
                >
                  <span>Competitive Milestones</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#E88053] group-hover:text-white" />
                </button>
              </div>

              {/* Outer Bento Grid Container */}
              <div className="p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] bg-[#14100C]/90 border border-[#D4BC98]/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-3">
                {/* Top Row: 3 Agent Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Card 1: Hackathon Pipeline */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="relative overflow-hidden rounded-xl bg-[#18130F]/90 border border-[#5CE1E6]/30 p-4 flex flex-col justify-between hover:border-[#5CE1E6]/60 transition-all group shadow-lg"
                  >
                    <AnimatedGradient colors={["#5CE1E6", "#3B82F6", "#1E40AF"]} speed={0.08} blur="medium" />

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-[#5CE1E6]" />
                          Hackathon Pipeline
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#5CE1E6]/15 border border-[#5CE1E6]/30 text-[9px] font-mono text-[#5CE1E6] uppercase">
                          25+ MARATHONS
                        </span>
                      </div>
                      <p className="text-xs text-[#EADFC9]/85 font-sans leading-relaxed">
                        Visualise 25+ hackathons &amp; rapid software shipping workflows in real time.
                      </p>
                    </div>

                    <div className="relative z-10 mt-3 p-2.5 bg-[#0C0907]/90 border border-white/10 rounded-lg space-y-1 font-mono">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#EADFC9]/70 text-xs">Total Competed:</span>
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
                    className="relative overflow-hidden rounded-xl bg-[#18130F]/90 border border-[#C75B32]/30 p-4 flex flex-col justify-between hover:border-[#C75B32]/60 transition-all group shadow-lg"
                  >
                    <AnimatedGradient colors={["#C75B32", "#E88053", "#FF6B35"]} speed={0.08} blur="medium" />

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#C75B32]" />
                          Finalist Monitor
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#C75B32]/15 border border-[#C75B32]/30 text-[9px] font-mono text-[#C75B32] uppercase">
                          20+ PLACEMENTS
                        </span>
                      </div>
                      <p className="text-xs text-[#EADFC9]/85 font-sans leading-relaxed">
                        Track 20+ top-tier placements &amp; high-impact prototype success rates.
                      </p>
                    </div>

                    <div className="relative z-10 mt-3 p-2.5 bg-[#0C0907]/90 border border-white/10 rounded-lg space-y-1 font-mono">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#EADFC9]/70 text-xs">Finalist Placements:</span>
                        <span className="text-xl sm:text-2xl font-bold text-[#E88053] font-display">
                          <CounterNumber value="20+" />
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/50">
                        <span>Success Rate: ~80%</span>
                        <span className="text-[#E88053] font-bold">TOP-TIER</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Victory Feed */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="relative overflow-hidden rounded-xl bg-[#18130F]/90 border border-[#FACC15]/30 p-4 flex flex-col justify-between hover:border-[#FACC15]/60 transition-all group shadow-lg"
                  >
                    <AnimatedGradient colors={["#FACC15", "#E88053", "#C75B32"]} speed={0.08} blur="medium" />

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-[#FACC15]" />
                          Victory Feed
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/30 text-[9px] font-mono text-[#FACC15] uppercase">
                          1ST PLACE
                        </span>
                      </div>
                      <p className="text-xs text-[#EADFC9]/85 font-sans leading-relaxed">
                        Real-time log of 1st place track wins &amp; EVM smart contract innovations.
                      </p>
                    </div>

                    <div className="relative z-10 mt-3 p-2.5 bg-[#0C0907]/90 border border-white/10 rounded-lg space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between text-white/90">
                        <span className="truncate">🏆 Build On Chain @ NIT Calicut</span>
                        <span className="text-[#FACC15] font-bold font-display text-sm">
                          <CounterNumber value="01" />
                        </span>
                      </div>
                      <div className="text-[10px] text-[#EADFC9]/60 truncate">
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
                    className="md:col-span-3 relative overflow-hidden rounded-xl bg-[#18130F]/90 border border-[#C084FC]/30 p-4 flex flex-col justify-between hover:border-[#C084FC]/60 transition-all group shadow-lg"
                  >
                    <AnimatedGradient colors={["#C084FC", "#8B5CF6", "#5CE1E6"]} speed={0.08} blur="medium" />

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-[#C084FC]" />
                          Global Recognition
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#C084FC]/15 border border-[#C084FC]/30 text-[9px] font-mono text-[#C084FC] uppercase">
                          2 SELECTIONS
                        </span>
                      </div>
                      <p className="text-xs text-[#EADFC9]/85 font-sans leading-relaxed">
                        Selected across India&apos;s flagship Smart India Hackathon &amp; UNESCO-IOC Ocean Platform.
                      </p>
                    </div>

                    <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                      <div className="p-2 bg-[#0C0907]/90 border border-white/10 rounded-lg space-y-0.5">
                        <span className="text-[#C084FC] font-bold block text-xs">Smart India Hackathon</span>
                        <span className="text-[10px] text-[#EADFC9]/60">National Stage Finalist</span>
                      </div>
                      <div className="p-2 bg-[#0C0907]/90 border border-white/10 rounded-lg space-y-0.5">
                        <span className="text-[#5CE1E6] font-bold block text-xs">UNESCO-IOC Network</span>
                        <span className="text-[10px] text-[#EADFC9]/60">Circle Global Selection</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 5: Deployment Inspector */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="md:col-span-2 relative overflow-hidden rounded-xl bg-[#18130F]/90 border border-[#10B981]/30 p-4 flex flex-col justify-between hover:border-[#10B981]/60 transition-all group shadow-lg"
                  >
                    <AnimatedGradient colors={["#10B981", "#059669", "#3B82F6"]} speed={0.08} blur="medium" />

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                          <Rocket className="w-4 h-4 text-[#10B981]" />
                          Deployment Inspector
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[9px] font-mono text-[#10B981] uppercase">
                          15+ DEPLOYMENTS
                        </span>
                      </div>
                      <p className="text-xs text-[#EADFC9]/85 font-sans leading-relaxed">
                        Full-stack web apps, AI provenance engines, &amp; EVM vaults.
                      </p>
                    </div>

                    <div className="relative z-10 mt-3 p-2.5 bg-[#0C0907]/90 border border-white/10 rounded-lg flex justify-between items-center font-mono">
                      <div className="space-y-0.5">
                        <span className="text-xs text-[#EADFC9]/70 block">Shipped Applications:</span>
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
          </div>
        </div>

        {/* Bottom Horizontal Scroll Progress HUD */}
        <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none text-xs font-mono">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16120E]/90 border border-[#D4BC98]/20 backdrop-blur-xl text-[#FFFDF9] shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#E88053] animate-pulse" />
            <span className="font-bold">
              {activeSlide === 0 && '01 / 03 — RECOGNITION & ACHIEVEMENTS'}
              {activeSlide === 1 && '02 / 03 — CREATIVE SHOWCASE'}
              {activeSlide === 2 && '03 / 03 — AGENT BENTO METRICS'}
            </span>
          </div>

          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#16120E]/90 border border-[#D4BC98]/20 backdrop-blur-xl text-[#EADFC9] shadow-2xl pointer-events-auto">
            {activeSlide < 2 ? (
              <>
                <span className="hidden sm:inline text-[#EADFC9]/60">HORIZONTAL FLOW</span>
                <span className="text-[#E88053] font-semibold">SCROLL ↓ TO ADVANCE →</span>
              </>
            ) : (
              <button
                type="button"
                onClick={scrollToCompetitiveMilestones}
                className="flex items-center gap-2 text-[#E88053] hover:text-white font-bold transition-colors cursor-pointer"
              >
                <span>COMPETITIVE MILESTONES</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowAboutStorySection;
