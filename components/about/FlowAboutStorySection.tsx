'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
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
    title: 'Jayam Fashion Institute',
    domain: 'jayamwebsite.vercel.app',
    url: 'https://jayamwebsite.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/jayam-website-',
    description: 'Bespoke corporate platform built for an apparel design institute with responsive editorial layout, course catalog, and fluid performance.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    type: 'web',
    status: 'Corporate Platform',
  },
  {
    id: 'land-vault',
    title: 'LandVault Protocol',
    domain: 'land-vault-v2.vercel.app',
    url: 'https://land-vault-v2.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
    description: 'Decentralized real-world asset (RWA) protocol tokenizing real estate with automated yield distribution smart contracts on EVM networks.',
    tags: ['Solidity', 'EVM', 'Web3.js'],
    type: 'web3',
    status: 'RWA Protocol',
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
    description: 'Interactive brand showcase crafted with bespoke GSAP motion choreography, kinetic transitions, and immersive visual storytelling.',
    tags: ['React', 'GSAP', 'Kinetic Motion'],
    type: 'web',
    status: 'Brand Experience',
  },
  {
    id: 'mediocto',
    title: 'MediOcto AI',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Conversational mental wellness interface integrating intelligent LLM agent routing with an interactive real-time 3D companion.',
    tags: ['AI Agents', 'Three.js', 'Next.js'],
    type: 'ai',
    status: 'AI Wellness',
  },
  {
    id: 'genproof',
    title: 'GenProof AI',
    domain: 'gen-proof-ai.vercel.app',
    url: 'https://gen-proof-ai.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Cryptographic provenance verification engine implementing C2PA open standards to detect and verify synthetic AI media.',
    tags: ['Python', 'C2PA Standards', 'AI Forensics'],
    type: 'ai',
    status: 'Provenance Engine',
  },
  {
    id: 'steganography',
    title: 'Steganography Tool',
    domain: 'github.com/lakshangan/steganography',
    url: 'https://github.com/lakshangan/steganography',
    githubUrl: 'https://github.com/lakshangan/steganography',
    description: 'Open-source security CLI embedding AES-256 encrypted payloads into image pixel bit planes via least significant bit (LSB) manipulation.',
    tags: ['Python', 'AES-256', 'Cryptography'],
    type: 'cli',
    status: 'Security CLI',
  },
];


export const FlowAboutStorySection: React.FC = () => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalBgRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToCompetitiveMilestones = () => {
    const el = document.getElementById('competitive-milestones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const advanceToSlide = (targetIndex: number) => {
    if (targetIndex >= 3) {
      scrollToCompetitiveMilestones();
      return;
    }
    const st = ScrollTrigger.getById('about-horizontal');
    if (st) {
      const start = st.start;
      const end = st.end;
      const targetProgress = targetIndex === 1 ? 0.42 * 0.82 : 0.78 * 0.82;
      const targetScroll = start + targetProgress * (end - start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      if (targetIndex >= 3) {
        scrollToCompetitiveMilestones();
      }
    }
  };

  useGSAP(() => {
    const container = horizontalContainerRef.current;
    const track = horizontalTrackRef.current;
    const bg = horizontalBgRef.current;
    if (!container || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel', container);
    const totalPanels = panels.length;
    if (totalPanels <= 1) return;

    // Total scroll duration: horizontal movement + 600px resting buffer on panel 3
    const totalDistance = window.innerWidth * (totalPanels - 1) + 600;

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'about-horizontal',
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

    // Horizontal shift of the continuous track containing panels
    tl.to(
      track,
      {
        x: () => -(window.innerWidth * (totalPanels - 1)),
        ease: 'none',
        duration: 0.82,
      },
      0
    );

    // Panoramic shift of the unzoomed background image across its native aspect ratio
    if (bg) {
      tl.to(
        bg,
        {
          x: () => {
            const maxScroll = Math.max(0, bg.offsetWidth - window.innerWidth);
            return -maxScroll;
          },
          ease: 'none',
          duration: 0.82,
        },
        0
      );
    }

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
        className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-10 sm:pb-14"
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

        {/* Content Container (Balanced vertical layout centered in open parchment area) */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-7">
          {/* Top Header Badge & One-Line Display Title */}
          <div className="space-y-2 sm:space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1A130F]/10 border border-[#8C4B18]/40 text-xs font-mono text-[#8C4B18] font-bold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C4B18] animate-pulse" />
                <span>01 — WHO I AM // LAKSHAN G.</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#733610]/60 uppercase">
                [ ARCHITECTURE &amp; CRAFT ]
              </span>
            </div>

            {/* One-Line Headline */}
            <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-none tracking-tight uppercase select-none flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <span className="text-[#1A130F] hover:text-[#8C4B18] transition-colors cursor-default">
                <AsciiGlitchRipple dur={900}>
                  CREATE
                </AsciiGlitchRipple>
              </span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_#2C1D11] sm:[-webkit-text-stroke:2px_#2C1D11] hover:text-[#2C1D11] hover:[-webkit-text-stroke:0px] transition-all duration-300 cursor-default">
                <AsciiGlitchRipple dur={1000}>
                  WITHOUT
                </AsciiGlitchRipple>
              </span>
              <span className="inline-flex items-baseline gap-1.5 sm:gap-2 text-[#C75B32] drop-shadow-[0_2px_18px_rgba(199,91,50,0.3)] hover:text-[#E06D43] transition-colors cursor-default">
                <AsciiGlitchRipple dur={1200}>
                  LIMITS
                </AsciiGlitchRipple>
                <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C75B32] animate-pulse align-middle" />
              </span>
            </h1>
          </div>

          {/* Description Paragraph */}
          <p className="font-sans max-w-[58ch] text-xs sm:text-sm md:text-base font-medium leading-relaxed text-[#2C1D11] bg-[#1A130F]/5 p-3.5 sm:p-4 rounded-xl border border-[#1A130F]/15 border-l-[3px] border-l-[#C75B32] backdrop-blur-sm shadow-sm">
            Full-Stack Developer, AI Systems Engineer &amp; Web3 Researcher. Turning complex ideas into high-performance interfaces, backend infrastructure, and scalable applications.
          </p>

          {/* 3 Tech Feature Cards across the bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
            <div className="p-3.5 sm:p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>⚡ First-Principles Mindset</span>
              </p>
              <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#2C1D11] font-medium">
                Deconstructing architecture to fundamental truths before writing code. I turn raw concepts into production-ready software.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs font-bold uppercase tracking-wider text-[#733610] flex items-center gap-1.5">
                <span>🛠️ My Core Tech Stack</span>
              </p>
              <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#2C1D11] font-medium">
                Next.js, TypeScript, React, Node.js, Python, Solidity, EVM Smart Contracts, Three.js, GSAP, &amp; LLM Agents.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#1A130F]/10 border border-[#1A130F]/20 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#8C4B18]/50 transition-all hover:-translate-y-0.5 group">
              <p className="font-mono mb-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4B18] flex items-center gap-1.5">
                <span>🚀 Rapid Execution</span>
              </p>
              <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#2C1D11] font-medium">
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
        className="relative w-full h-screen overflow-hidden bg-[#0C0907] select-none"
      >
        {/* Continuous Panoramic Studio & Engineering Workspace Background */}
        {/* Sized with natural 2048:768 aspect ratio (266.67vh) so the full height is visible with ZERO zoom */}
        <div
          ref={horizontalBgRef}
          className="absolute inset-y-0 left-0 h-full w-[266.67vh] min-w-full pointer-events-none select-none z-0 overflow-hidden will-change-transform"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/horizontal-workspace.png"
              alt="Creative Engineering Workspace Studio Panorama"
              fill
              priority
              className="object-cover object-left md:object-center filter brightness-[0.85] contrast-[1.05]"
              sizes="267vh"
            />
            {/* Subtle atmospheric vignette and tone mapping overlays */}
            <div className="absolute inset-0 bg-[#0C0907]/25 backdrop-blur-[0.2px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/90 via-transparent to-[#0C0907]/70 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
          </div>
        </div>

        <div
          ref={horizontalTrackRef}
          className="flex flex-row w-[300vw] h-full will-change-transform relative z-10"
        >

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
                  <span>02 // LEADERSHIP &amp; ACCOLADES</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  PROVEN ON NATIONAL &amp; GLOBAL STAGES
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#EADFC9]/90 max-w-2xl bg-[#16120E]/70 backdrop-blur-md p-3 rounded-xl border border-[#D4BC98]/20 shadow-md">
                  Combining competitive hackathon execution, decentralized protocol research, and campus community leadership with unwavering discipline.
                </p>
              </div>

              {/* Natural Editorial Grid: 2 Headline Breakthroughs + 3 Distinct Pillars */}
              <div className="space-y-4">
                {/* Row 1: Two Major Headline Breakthroughs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Card 1: 1st Place Track Winner NIT Calicut */}
                  <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/25 hover:border-[#E88053]/60 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#E88053] uppercase tracking-wider">
                          <Trophy className="w-3.5 h-3.5 text-[#E88053]" /> 1ST PLACE TRACK WINNER
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#C75B32]/15 border border-[#C75B32]/30 text-[#E88053]">
                          NIT CALICUT
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-[#FFFDF9] mb-2 group-hover:text-[#E88053] transition-colors">
                        Build On Chain @ NIT Calicut
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EADFC9]/85 font-sans leading-relaxed mb-4">
                        Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour hackathon marathon, placing 1st against top national university engineering teams.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4BC98]/15 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">Solidity</span>
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">EVM Smart Contracts</span>
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">DeFi Vaults</span>
                    </div>
                  </div>

                  {/* Card 2: Smart India Hackathon Finalist */}
                  <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/25 hover:border-[#E88053]/60 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#EADFC9] uppercase tracking-wider">
                          <Globe className="w-3.5 h-3.5 text-[#D4BC98]" /> NATIONAL STAGE FINALIST
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#D4BC98]/15 border border-[#D4BC98]/30 text-[#EADFC9]">
                          GOVT. OF INDIA
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-[#FFFDF9] mb-2 group-hover:text-[#E88053] transition-colors">
                        Smart India Hackathon
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EADFC9]/85 font-sans leading-relaxed mb-4">
                        Selected among tens of thousands of nationwide applicants in India’s premier government hackathon, engineering software solutions addressing national public infrastructure challenges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4BC98]/15 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">National Finalist</span>
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">Full-Stack Systems</span>
                      <span className="px-2 py-0.5 rounded bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98]">Public Infrastructure</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Three Distinct Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {/* Card 3: Campus Tech Lead */}
                  <div className="p-4 sm:p-5 bg-[#16120E]/80 border border-[#D4BC98]/20 hover:border-[#D4BC98]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#E88053] uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5" /> LEADERSHIP
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5">
                      Tech Hub Lead &amp; Campus Ambassador
                    </h4>
                    <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                      Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
                    </p>
                  </div>

                  {/* Card 4: Uniswap & OpenLedger */}
                  <div className="p-4 sm:p-5 bg-[#16120E]/80 border border-[#D4BC98]/20 hover:border-[#D4BC98]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#D4BC98] uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> RESEARCH
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5">
                      Uniswap v4 &amp; OpenLedger
                    </h4>
                    <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                      Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
                    </p>
                  </div>

                  {/* Card 5: International Silambam */}
                  <div className="p-4 sm:p-5 bg-[#16120E]/80 border border-[#D4BC98]/20 hover:border-[#D4BC98]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#E88053] uppercase tracking-wider mb-2">
                      <Monitor className="w-3.5 h-3.5" /> DISCIPLINE
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5">
                      International Silambam Medalist
                    </h4>
                    <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                      Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and discipline that directly shape my engineering stamina.
                    </p>
                  </div>
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

              {/* 6 Clean Architectural Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {SHOWCASE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-[#D4BC98]/20 bg-[#16120E]/90 backdrop-blur-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-[#E88053]/50 hover:bg-[#1E1712] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(199,91,50,0.2)]"
                  >
                    {/* Architectural Header */}
                    <div className="px-3.5 py-2 bg-[#0E0B08]/90 border-b border-[#D4BC98]/15 flex items-center justify-between backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88053]" />
                        <span className="text-[10px] font-mono text-[#D4BC98] uppercase tracking-wider font-semibold">
                          {card.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        {card.githubUrl && (
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EADFC9]/60 hover:text-[#FFFDF9] transition-colors flex items-center gap-0.5"
                            title="View GitHub Repository"
                          >
                            Code ↗
                          </a>
                        )}
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E88053] hover:text-[#FFFDF9] font-bold transition-colors flex items-center gap-0.5"
                          title="Open Live Website"
                        >
                          Visit ↗
                        </a>
                      </div>
                    </div>

                    {/* Card Screen Preview Container */}
                    {card.type === 'cli' ? (
                      <div className="relative w-full h-[120px] sm:h-[135px] bg-[#0A0806]/95 p-3.5 font-mono text-[10px] flex flex-col justify-between overflow-hidden border-b border-[#D4BC98]/15 group-hover:border-[#E88053]/30 transition-colors">
                        <div className="space-y-1">
                          <div className="text-white/40 text-[9px]">$ stego-cli --embed --file secret.enc</div>
                          <div className="text-emerald-400 font-bold">[+] Encrypting AES-256...</div>
                          <div className="text-[#E88053]">[+] Embedding LSB into cover.png</div>
                          <div className="text-white/90 font-bold">[✓] Payload hidden successfully.</div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-white/50 pt-1.5 border-t border-white/10">
                          <span>LSB Spatial Algorithm</span>
                          <span className="text-[#E88053] font-bold">Python CLI</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-[120px] sm:h-[135px] bg-black/70 overflow-hidden group/screen border-b border-[#D4BC98]/15">
                        <iframe
                          src={card.url}
                          title={card.title}
                          className="w-full h-full border-none pointer-events-none transform group-hover/screen:scale-105 transition-transform duration-500 bg-white"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 pointer-events-none" />

                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-2.5 right-2.5 px-3 py-1 bg-[#C75B32] hover:bg-[#E88053] text-white font-mono font-bold text-[10px] tracking-wider rounded-md transition-all shadow-[0_4px_15px_rgba(199,91,50,0.4)] flex items-center gap-1 hover:scale-105"
                        >
                          Launch ↗
                        </a>
                      </div>
                    )}

                    {/* Card Body & Details */}
                    <div className="p-3.5 sm:p-4 space-y-2.5 bg-[#120E0B]/60 backdrop-blur-md flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-sans text-sm sm:text-base font-bold text-[#FFFDF9] group-hover:text-[#E88053] transition-colors truncate">
                          {card.title}
                        </h3>
                        <p className="font-sans text-xs text-[#EADFC9]/85 font-medium leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#D4BC98]/15 flex flex-wrap gap-1 font-mono text-[9px] font-bold">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#1F1711] border border-[#D4BC98]/20 text-[#D4BC98] rounded uppercase tracking-wider backdrop-blur-md"
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
          {/* PANEL 3 (SLIDE 04): ENGINEERING IMPACT & VELOCITY */}
          {/* ========================================================================= */}
          <div
            id="metrics"
            className="horizontal-panel w-screen h-screen shrink-0 relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#E88053]/10 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/12 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-5 sm:space-y-6 relative z-10 my-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D4BC98]/20 pb-4 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#16120E]/90 border border-[#D4BC98]/30 text-xs font-mono text-[#E88053] tracking-widest uppercase backdrop-blur-md shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                    <span>04 // THE BUILDER’S TRACK RECORD</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                    ENGINEERING VELOCITY &amp; REAL IMPACT
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#EADFC9]/90 max-w-xl">
                    Real output over artificial metrics. A track record built through competitive hackathon marathons, production deployments, and peer developer mentorship.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCompetitiveMilestones}
                  className="self-start sm:self-end inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16120E]/90 hover:bg-[#1F1610] border border-[#D4BC98]/25 hover:border-[#E88053]/60 text-xs font-mono text-[#EADFC9] hover:text-[#FFFDF9] transition-all shadow-md group cursor-pointer backdrop-blur-xl shrink-0"
                >
                  <span>Explore Milestones</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#E88053]" />
                </button>
              </div>

              {/* 4 Clean Authentic Impact Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Pillar 1: Hackathons */}
                <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/20 hover:border-[#E88053]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#E88053] transition-colors">
                        <CounterNumber value="25+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#1F1711] border border-[#D4BC98]/20 text-[#E88053]">
                        <Trophy className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Competitive Marathons
                      </h3>
                      <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                        Thriving under 24-to-36 hour sprint constraints to build production-grade prototypes, APIs, and working smart contracts from scratch.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/15 font-mono text-[10px] text-[#D4BC98]/75">
                    36H MARATHON SPRINTS
                  </div>
                </div>

                {/* Pillar 2: Podium Placements */}
                <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/20 hover:border-[#E88053]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#E88053] transition-colors">
                        <CounterNumber value="20+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#1F1711] border border-[#D4BC98]/20 text-[#E88053]">
                        <Award className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Podium &amp; Finalist Finishes
                      </h3>
                      <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                        Recognized across premier national platforms including 1st Place Track at NIT Calicut and finalist entry in Smart India Hackathon.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/15 font-mono text-[10px] text-[#D4BC98]/75">
                    NATIONAL RECOGNITION
                  </div>
                </div>

                {/* Pillar 3: Deployed Systems */}
                <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/20 hover:border-[#E88053]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#E88053] transition-colors">
                        <CounterNumber value="15+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#1F1711] border border-[#D4BC98]/20 text-[#E88053]">
                        <Rocket className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Applications Shipped
                      </h3>
                      <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                        Full-stack corporate platforms, AI provenance engines, EVM liquidity vaults, and open-source cryptographic security packages.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/15 font-mono text-[10px] text-[#D4BC98]/75">
                    LIVE IN PRODUCTION
                  </div>
                </div>

                {/* Pillar 4: Community Mentorship */}
                <div className="p-5 sm:p-6 bg-[#16120E]/85 border border-[#D4BC98]/20 hover:border-[#E88053]/50 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#E88053] transition-colors">
                        <CounterNumber value="200+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#1F1711] border border-[#D4BC98]/20 text-[#E88053]">
                        <Globe className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Developers Mentored
                      </h3>
                      <p className="text-xs text-[#EADFC9]/80 font-sans leading-relaxed">
                        Serving as Campus Ambassador to organize technical workshops, lead peer study circles in Web3 and AI, and inspire future builders.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/15 font-mono text-[10px] text-[#D4BC98]/75">
                    COMMUNITY LEADERSHIP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Apple-Style Dotted Status Bar */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#16120E]/85 hover:bg-[#1E1611] border border-[#D4BC98]/25 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,188,152,0.1)_inset] transition-all"
          >
            {[0, 1, 2].map((idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => advanceToSlide(idx)}
                  className="p-1 cursor-pointer focus:outline-none flex items-center justify-center group"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`h-2 sm:h-2.5 rounded-full transition-colors duration-300 ${
                      isActive
                        ? 'w-7 sm:w-8 bg-[#E88053] shadow-[0_0_12px_rgba(232,128,83,0.5)]'
                        : 'w-2 sm:w-2.5 bg-[#D4BC98]/30 group-hover:bg-[#D4BC98]/60'
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlowAboutStorySection;
