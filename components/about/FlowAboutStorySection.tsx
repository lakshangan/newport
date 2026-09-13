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
  githubUrl?: string;
  description: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'jayam',
    title: 'Jayam Fashion Institute',
    domain: 'jayamwebsite.vercel.app',
    url: 'https://jayamwebsite.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/jayam-website-',
    description: 'Bespoke corporate platform built for an apparel design institute with responsive editorial layout, course catalog, and fluid performance.',
  },
  {
    id: 'land-vault',
    title: 'LandVault Protocol',
    domain: 'land-vault-v2.vercel.app',
    url: 'https://land-vault-v2.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
    description: 'Decentralized real-world asset (RWA) protocol tokenizing real estate with automated yield distribution smart contracts on EVM networks.',
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
    description: 'Interactive brand showcase crafted with bespoke GSAP motion choreography, kinetic transitions, and immersive visual storytelling.',
  },
  {
    id: 'mediocto',
    title: 'MediOcto AI',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Conversational mental wellness interface integrating intelligent LLM agent routing with an interactive real-time 3D companion.',
  },
  {
    id: 'genproof',
    title: 'GenProof AI',
    domain: 'gen-proof-ai.vercel.app',
    url: 'https://gen-proof-ai.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'Cryptographic provenance verification engine implementing C2PA open standards to detect and verify synthetic AI media.',
  },
  {
    id: 'internocto',
    title: 'InternOcTO',
    domain: 'internocto-portfolio.vercel.app',
    url: 'https://internocto-portfolio.vercel.app',
    githubUrl: 'https://github.com/lakshangan',
    description: "The official chaotic portfolio for OpenLedger's octopus mascot. Pure mayhem, interactive 3D motion, and fluid physics.",
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
              className="object-cover object-left md:object-center filter brightness-[1.05] contrast-[1.02] saturate-[1.08]"
              sizes="267vh"
            />
            {/* Luminous warm ambient vignette - soft at outer edges only so text remains crisp while studio shines through */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/55 via-transparent to-[#0C0907]/35 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(12,9,7,0.35)_100%)] pointer-events-none" />
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
            {/* Ambient Volumetric Glows - Warm Studio Golden Hour */}
            <div className="absolute top-1/4 left-1/4 w-[550px] h-[400px] bg-[#E88053]/20 rounded-full blur-[150px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[160px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-5 sm:space-y-6 relative z-10 my-auto">
              {/* Header */}
              <div className="space-y-2 border-b border-[#D4BC98]/25 pb-4 text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/35 text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-xl shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                  <span>02 // LEADERSHIP &amp; ACCOLADES</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  PROVEN ON NATIONAL &amp; GLOBAL STAGES
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#FFFDF9]/95 max-w-2xl bg-[#18120D]/50 backdrop-blur-xl p-3 rounded-xl border border-[#D4BC98]/25 shadow-lg leading-relaxed">
                  Combining competitive hackathon execution, decentralized protocol research, and campus community leadership with unwavering discipline.
                </p>
              </div>

              {/* Natural Editorial Grid: 2 Headline Breakthroughs + 3 Distinct Pillars */}
              <div className="space-y-4">
                {/* Row 1: Two Major Headline Breakthroughs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Card 1: 1st Place Track Winner NIT Calicut */}
                  <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.14)_inset] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                          <Trophy className="w-3.5 h-3.5 text-[#E88053]" /> 1ST PLACE TRACK WINNER
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E88053]/20 border border-[#E88053]/40 text-[#FFA266] font-semibold">
                          NIT CALICUT
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-[#FFFDF9] mb-2 group-hover:text-[#FFA266] transition-colors drop-shadow-sm">
                        Build On Chain @ NIT Calicut
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F5EBD9] font-sans leading-relaxed mb-4">
                        Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour hackathon marathon, placing 1st against top national university engineering teams.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4BC98]/20 font-mono text-[10px]">
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Solidity</span>
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">EVM Smart Contracts</span>
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">DeFi Vaults</span>
                    </div>
                  </div>

                  {/* Card 2: Smart India Hackathon Finalist */}
                  <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.14)_inset] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#FFFDF9] uppercase tracking-wider">
                          <Globe className="w-3.5 h-3.5 text-[#E88053]" /> NATIONAL STAGE FINALIST
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#D4BC98]/20 border border-[#D4BC98]/40 text-[#FFFDF9] font-semibold">
                          GOVT. OF INDIA
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-[#FFFDF9] mb-2 group-hover:text-[#FFA266] transition-colors drop-shadow-sm">
                        Smart India Hackathon
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F5EBD9] font-sans leading-relaxed mb-4">
                        Selected among tens of thousands of nationwide applicants in India’s premier government hackathon, engineering software solutions addressing national public infrastructure challenges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4BC98]/20 font-mono text-[10px]">
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">National Finalist</span>
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Full-Stack Systems</span>
                      <span className="px-2.5 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Public Infrastructure</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Three Distinct Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {/* Card 3: Campus Tech Lead */}
                  <div className="p-4 sm:p-5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5 text-[#E88053]" /> LEADERSHIP
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5 group-hover:text-[#FFA266] transition-colors">
                      Tech Hub Lead &amp; Campus Ambassador
                    </h4>
                    <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                      Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
                    </p>
                  </div>

                  {/* Card 4: Uniswap & OpenLedger */}
                  <div className="p-4 sm:p-5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E88053]" /> RESEARCH
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5 group-hover:text-[#FFA266] transition-colors">
                      Uniswap v4 &amp; OpenLedger
                    </h4>
                    <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                      Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
                    </p>
                  </div>

                  {/* Card 5: International Silambam */}
                  <div className="p-4 sm:p-5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-2">
                      <Monitor className="w-3.5 h-3.5 text-[#E88053]" /> DISCIPLINE
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-[#FFFDF9] mb-1.5 group-hover:text-[#FFA266] transition-colors">
                      International Silambam Medalist
                    </h4>
                    <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                      Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and discipline that directly shape my engineering stamina.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* PANEL 2 (SLIDE 03): CREATIVE SHOWCASE */}
          {/* ========================================================================= */}
          <div
            id="showcase"
            className="horizontal-panel w-screen h-screen shrink-0 relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/4 left-1/3 w-[550px] h-[450px] bg-[#E88053]/20 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="space-y-3 sm:space-y-3.5 my-auto max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
              {/* Header - Cleanly positioned below floating nav bar */}
              <div className="flex items-end justify-between gap-3 border-b border-[#D4BC98]/25 pb-2.5">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/30 text-[10px] sm:text-[11px] font-mono text-[#FFA266] tracking-wider uppercase backdrop-blur-xl shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#E88053]" />
                    <span>03 // LATEST DEPLOYMENTS</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#FFFDF9] leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    CREATIVE <span className="text-[#FFA266] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">SHOWCASE</span>
                  </h2>
                </div>

                <a
                  href="https://github.com/lakshangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18120D]/80 hover:bg-[#241710] border border-[#D4BC98]/35 hover:border-[#FFA266] backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.14)_inset] hover:shadow-[0_15px_30px_rgba(232,128,83,0.3)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 overflow-hidden"
                  title="View all projects on GitHub"
                >
                  {/* Subtle animated light sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA266]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* GitHub Brand Icon */}
                  <svg
                    className="w-3.5 h-3.5 fill-current text-[#FFA266] group-hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>

                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                    See All Projects
                  </span>

                  <span className="w-5 h-5 rounded-full bg-[#FFA266]/15 border border-[#FFA266]/30 flex items-center justify-center text-[#FFA266] group-hover:bg-[#E88053] group-hover:text-white group-hover:translate-x-0.5 transition-all text-[10px] font-bold">
                    ↗
                  </span>
                </a>
              </div>

              {/* 6 Clean Architectural Project Cards - Proportional & Breathable */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
                {SHOWCASE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-[#D4BC98]/25 bg-[#16110D]/80 hover:bg-[#1E1610]/95 backdrop-blur-2xl overflow-hidden shadow-2xl hover:border-[#FFA266]/70 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(232,128,83,0.22)]"
                  >
                    {/* macOS Browser Window Header */}
                    <div className="px-3.5 py-2 bg-[#1A120B]/90 border-b border-[#D4BC98]/20 flex items-center justify-between backdrop-blur-md">
                      {/* macOS Window Traffic Lights */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>

                      {/* Centered Minimal Domain Pill */}
                      <div className="px-2.5 py-0.5 rounded-full bg-black/60 border border-[#D4BC98]/20 text-[9px] font-mono text-[#EADFC9]/75 truncate max-w-[150px] shadow-inner">
                        {card.domain}
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        {card.githubUrl && (
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F5EBD9]/60 hover:text-white transition-colors"
                            title="View Source Code"
                          >
                            Code ↗
                          </a>
                        )}
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FFA266] hover:text-white font-bold transition-colors"
                          title="Open Live Deployment"
                        >
                          Visit ↗
                        </a>
                      </div>
                    </div>

                    {/* Scaled Desktop Viewport - No Zoom, Real Miniature Desktop Preview */}
                    <div className="relative w-full h-[120px] sm:h-[135px] lg:h-[142px] bg-[#0A0806] overflow-hidden group/screen">
                      <div
                        className="w-[1200px] h-[600px] origin-top-left pointer-events-none select-none"
                        style={{
                          transform: 'scale(0.28)',
                          transformOrigin: '0 0',
                          width: '1200px',
                          height: '600px',
                        }}
                      >
                        <iframe
                          src={card.url}
                          title={card.title}
                          className="w-full h-full border-none bg-white"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A]/40 via-transparent to-transparent opacity-20 pointer-events-none" />

                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/85 hover:bg-[#E88053] hover:text-white border border-white/20 rounded-md font-mono text-[10px] font-bold text-white transition-all flex items-center gap-1 shadow-lg opacity-0 group-hover/screen:opacity-100 duration-200 z-10"
                      >
                        Launch ↗
                      </a>
                    </div>

                    {/* Card Body - Airy, Breathable, Well-Proportioned */}
                    <div className="p-3 sm:p-3.5 space-y-1 bg-[#140E0A]/60 flex-1 flex flex-col justify-center">
                      <h3 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-[#FFA266] transition-colors flex items-center justify-between">
                        <span>{card.title}</span>
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4BC98]/50 hover:text-white transition-colors"
                          title="Open Project"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs text-[#F5EBD9]/85 font-medium leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
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
            <div className="absolute top-1/3 left-1/4 w-[550px] h-[400px] bg-[#E88053]/20 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-5 sm:space-y-6 relative z-10 my-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D4BC98]/25 pb-4 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/35 text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-xl shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                    <span>04 // THE BUILDER’S TRACK RECORD</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    ENGINEERING VELOCITY &amp; REAL IMPACT
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#FFFDF9]/95 max-w-xl bg-[#18120D]/50 backdrop-blur-xl p-3 rounded-xl border border-[#D4BC98]/25 shadow-lg leading-relaxed">
                    Real output over artificial metrics. A track record built through competitive hackathon marathons, production deployments, and peer developer mentorship.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCompetitiveMilestones}
                  className="self-start sm:self-end inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18120D]/80 hover:bg-[#221811] border border-[#D4BC98]/35 hover:border-[#E88053]/70 text-xs font-mono text-[#F5EBD9] hover:text-[#FFFDF9] transition-all shadow-lg group cursor-pointer backdrop-blur-xl shrink-0"
                >
                  <span>Explore Milestones</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#FFA266]" />
                </button>
              </div>

              {/* 4 Clean Authentic Impact Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Pillar 1: Hackathons */}
                <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                        <CounterNumber value="25+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#281A12]/80 border border-[#E88053]/40 text-[#FFA266] shadow-[0_0_15px_rgba(232,128,83,0.2)]">
                        <Trophy className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Competitive Marathons
                      </h3>
                      <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                        Thriving under 24-to-36 hour sprint constraints to build production-grade prototypes, APIs, and working smart contracts from scratch.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/20 font-mono text-[10px] text-[#FFA266] font-semibold">
                    36H MARATHON SPRINTS
                  </div>
                </div>

                {/* Pillar 2: Podium Placements */}
                <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                        <CounterNumber value="20+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#281A12]/80 border border-[#E88053]/40 text-[#FFA266] shadow-[0_0_15px_rgba(232,128,83,0.2)]">
                        <Award className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Podium &amp; Finalist Finishes
                      </h3>
                      <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                        Recognized across premier national platforms including 1st Place Track at NIT Calicut and finalist entry in Smart India Hackathon.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/20 font-mono text-[10px] text-[#FFA266] font-semibold">
                    NATIONAL RECOGNITION
                  </div>
                </div>

                {/* Pillar 3: Deployed Systems */}
                <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                        <CounterNumber value="15+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#281A12]/80 border border-[#E88053]/40 text-[#FFA266] shadow-[0_0_15px_rgba(232,128,83,0.2)]">
                        <Rocket className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Applications Shipped
                      </h3>
                      <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                        Full-stack corporate platforms, AI provenance engines, EVM liquidity vaults, and open-source cryptographic security packages.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/20 font-mono text-[10px] text-[#FFA266] font-semibold">
                    LIVE IN PRODUCTION
                  </div>
                </div>

                {/* Pillar 4: Community Mentorship */}
                <div className="p-5 sm:p-6 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                        <CounterNumber value="200+" />
                      </span>
                      <span className="p-2 rounded-xl bg-[#281A12]/80 border border-[#E88053]/40 text-[#FFA266] shadow-[0_0_15px_rgba(232,128,83,0.2)]">
                        <Globe className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-sans text-[#FFFDF9] tracking-tight">
                        Developers Mentored
                      </h3>
                      <p className="text-xs text-[#F5EBD9] font-sans leading-relaxed">
                        Serving as Campus Ambassador to organize technical workshops, lead peer study circles in Web3 and AI, and inspire future builders.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#D4BC98]/20 font-mono text-[10px] text-[#FFA266] font-semibold">
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
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#18120D]/75 hover:bg-[#221811]/90 border border-[#D4BC98]/35 backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.15)_inset] transition-all"
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
                        ? 'w-7 sm:w-8 bg-[#E88053] shadow-[0_0_12px_rgba(232,128,83,0.6)]'
                        : 'w-2 sm:w-2.5 bg-[#D4BC98]/40 group-hover:bg-[#D4BC98]/70'
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
