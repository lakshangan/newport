'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { Trophy, Award, Globe, Zap, CheckCircle2, ExternalLink, Sparkles, Monitor, ShieldCheck, ArrowDown, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { HiddenClueWord } from '@/components/cipher/HiddenClueWord';
import { cn } from '@/lib/utils';

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

interface TechExpertiseDomain {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const TECHNICAL_EXPERTISE: TechExpertiseDomain[] = [
  {
    id: 'fullstack',
    num: '01',
    category: 'FULL-STACK',
    title: 'Full-Stack Architecture',
    description: 'High-throughput web applications, server actions, and type-safe relational schemas designed for scale.',
    skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    icon: Layers,
  },
  {
    id: 'web3',
    num: '02',
    category: 'WEB3 & EVM',
    title: 'Smart Contracts & DeFi',
    description: 'Audited EVM smart contracts, Uniswap v4 liquidity hooks, tokenized RWA vaults, and protocol security.',
    skills: ['Solidity', 'Foundry', 'Hardhat', 'Uniswap v4', 'Ethers.js'],
    icon: ShieldCheck,
  },
  {
    id: 'ai',
    num: '03',
    category: 'AI SYSTEMS',
    title: 'AI & Neural Systems',
    description: 'Autonomous multi-agent pipelines, RAG semantic search, multimodal LLMs, and cryptographic C2PA provenance.',
    skills: ['Python', 'LangChain', 'LLM Agents', 'Vector DBs', 'C2PA'],
    icon: Cpu,
  },
  {
    id: 'graphics',
    num: '04',
    category: 'CREATIVE 3D',
    title: '3D & Creative UI',
    description: 'GPU-accelerated interactive 3D web spaces, custom GLSL fragment shaders, physics simulation, and 60fps motion.',
    skills: ['Three.js', 'R3F', 'GLSL', 'GSAP', 'WebGL'],
    icon: Monitor,
  },
];

interface AppleSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

const AppleSpotlightCard: React.FC<AppleSpotlightCardProps> = ({
  children,
  className,
  glowColor = 'rgba(232, 128, 83, 0.18)',
  onClick,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative bg-[#0C0907]/85 hover:bg-[#140F0A]/95 border border-white/[0.12] hover:border-[#FFA266]/70 backdrop-blur-3xl shadow-[0_24px_50px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.14)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.22)] transition-all duration-300 group overflow-hidden',
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

const TechExpertiseCard: React.FC<{ tech: TechExpertiseDomain }> = ({ tech }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const IconComponent = tech.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative p-4 sm:p-4.5 lg:p-5 bg-[#0C0907]/85 hover:bg-[#140F0A]/95 border border-white/[0.12] hover:border-[#FFA266]/70 rounded-3xl backdrop-blur-3xl shadow-[0_24px_50px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.14)] hover:shadow-[0_25px_50px_rgba(232,128,83,0.2)] transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between overflow-hidden text-left"
    >
      {/* Subtle Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 128, 83, 0.16), transparent 80%)`,
        }}
      />

      <div className="space-y-2 sm:space-y-2.5 relative z-10">
        {/* Header: Index number + Glass Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FFA266]">
              {tech.num}
            </span>
            <span className="text-white/20 font-mono text-[11px] sm:text-xs">//</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/70 uppercase tracking-wider font-semibold">
              {tech.category}
            </span>
          </div>
          <span className="p-1.5 sm:p-2 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[#FFA266] group-hover:border-[#FFA266]/50 group-hover:bg-[#E88053] group-hover:text-white transition-all duration-300 shadow-sm">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
            {tech.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-white/75 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
            {tech.description}
          </p>
        </div>

        {/* Clean Tech Pills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
          {tech.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[9px] sm:text-[10px] font-mono text-white/80 group-hover:border-white/20 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FlowAboutStorySection: React.FC = () => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalBgRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToCompetitiveMilestones = () => {
    const el = document.getElementById('competitive-milestones');
    if (el) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
      const targetProgress = (targetIndex / 2) * 0.85;
      const targetScroll = start + targetProgress * (end - start);
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 0.85 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
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

    // Total scroll duration: calibrated for smooth, effortless wheel travel (avoids 4400px sluggish drag)
    const getPanelWidth = () => container.offsetWidth || window.innerWidth;
    const totalDistance = Math.round(
      Math.min(getPanelWidth() * 0.95, 1350) * (totalPanels - 1) + 400
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'about-horizontal',
        trigger: container,
        pin: true,
        pinSpacing: true,
        // scrub: 0.35 pairs flawlessly with Lenis (lerp: 0.085) with zero sluggish input delay
        scrub: 0.35,
        start: 'top top',
        end: () => `+=${totalDistance}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const moveProgress = Math.min(1, self.progress / 0.85);
          const index = Math.min(
            totalPanels - 1,
            Math.floor(moveProgress * totalPanels)
          );
          setActiveSlide(index);
        },
      },
    });

    // Horizontal shift of panels precisely matching container width
    tl.to(
      track,
      {
        x: () => -(getPanelWidth() * (totalPanels - 1)),
        ease: 'none',
        duration: 0.85,
        force3D: true,
      },
      0
    );

    if (bg) {
      tl.to(
        bg,
        {
          x: () => {
            const width = getPanelWidth();
            const maxScroll = Math.max(0, bg.offsetWidth - width);
            return -maxScroll;
          },
          ease: 'none',
          duration: 0.85,
          force3D: true,
        },
        0
      );
    }

    // Resting buffer on Panel 3 before unpinning
    tl.to({}, { duration: 0.15 });

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  });

  return (
    <div className="w-full relative block" aria-label="About the Builder Story Scroll">
      {/* ========================================================================= */}
      {/* PINNED HORIZONTAL SCROLL: RECOGNITION, SHOWCASE, TECHNICAL EXPERTISE */}
      {/* ========================================================================= */}
      <div
        id="about"
        ref={horizontalContainerRef}
        className="relative w-full h-screen overflow-hidden bg-[#0C0907] select-none scroll-mt-6"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        {/* Continuous Panoramic Studio & Engineering Workspace Background */}
        {/* Sized with natural 2048:768 aspect ratio (266.67vh) so the full height is visible with ZERO zoom */}
        <div
          ref={horizontalBgRef}
          className="absolute inset-y-0 left-0 h-full w-[266.67vh] min-w-full pointer-events-none select-none z-0 overflow-hidden will-change-transform"
          style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
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
            {/* Luminous warm ambient vignette with deep optical base so cards pop with crisp Apple-grade contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/90 via-[#0C0907]/45 to-[#0C0907]/65 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(12,9,7,0.55)_100%)] pointer-events-none" />
          </div>
        </div>

        <div
          ref={horizontalTrackRef}
          className="flex flex-row w-[300%] h-full will-change-transform relative z-10"
          style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
        >

          {/* ========================================================================= */}
          {/* PANEL 1 (SLIDE 02): RECOGNITION & COLLEGE ACHIEVEMENTS */}
          {/* ========================================================================= */}
          <div
            id="recognition"
            className="horizontal-panel w-1/3 min-w-[33.333333%] max-w-[33.333333%] h-full shrink-0 relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-22 md:pt-24 pb-14 sm:pb-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows - Warm Studio Golden Hour */}
            <div className="absolute top-1/4 left-1/4 w-[550px] h-[400px] bg-[#E88053]/20 rounded-full blur-[150px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[160px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-3 sm:space-y-4 lg:space-y-4.5 relative z-10 my-auto">
              {/* Apple Keynote Eyebrow & Headline */}
              <div className="space-y-1.5 sm:space-y-2 border-b border-white/[0.1] pb-2.5 sm:pb-3 text-left">
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[10px] sm:text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                  <span>02 // LEADERSHIP &amp; ACCOLADES</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  PROVEN ON NATIONAL &amp; GLOBAL STAGES
                </h2>
                <p className="text-xs sm:text-sm md:text-[14px] text-white/80 font-sans leading-relaxed max-w-2xl font-normal">
                  Combining competitive hackathon execution, decentralized protocol research, and campus community leadership with unwavering discipline.
                </p>
              </div>

              {/* Apple Keynote Bento Grid: 2 Headline Breakthroughs + 3 Distinct Pillars */}
              <div className="space-y-2.5 sm:space-y-3 lg:space-y-3.5">
                {/* Row 1: Two Major Headline Breakthroughs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                  {/* Card 1: 1st Place Track Winner NIT Calicut */}
                  <AppleSpotlightCard className="p-3.5 sm:p-4 lg:p-5 rounded-3xl hover:-translate-y-1">
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E88053]/15 border border-[#E88053]/30 shadow-sm">
                          <Trophy className="w-3.5 h-3.5 text-[#E88053]" /> 1ST PLACE TRACK WINNER
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/90 font-semibold tracking-wider">
                          NIT CALICUT
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight drop-shadow-sm">
                        Build On Chain @ NIT Calicut
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/75 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour hackathon marathon, placing 1st against top national university engineering teams.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.08] font-mono text-[9px] sm:text-[10px] mt-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">Solidity</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">EVM Smart Contracts</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">DeFi Vaults</span>
                    </div>
                  </AppleSpotlightCard>

                  {/* Card 2: Smart India Hackathon Finalist */}
                  <AppleSpotlightCard className="p-3.5 sm:p-4 lg:p-5 rounded-3xl hover:-translate-y-1">
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.15] shadow-sm">
                          <Globe className="w-3.5 h-3.5 text-[#FFA266]" /> NATIONAL STAGE FINALIST
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/90 font-semibold tracking-wider">
                          GOVT. OF INDIA
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight drop-shadow-sm">
                        Smart India Hackathon
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/75 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Selected among tens of thousands of nationwide applicants in India’s premier government hackathon, engineering software solutions addressing national public infrastructure challenges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.08] font-mono text-[9px] sm:text-[10px] mt-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">National Finalist</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">Full-Stack Systems</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-white/20 transition-colors">Public Infrastructure</span>
                    </div>
                  </AppleSpotlightCard>
                </div>

                {/* Row 2: Three Distinct Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
                  {/* Card 3: Campus Tech Lead */}
                  <AppleSpotlightCard className="p-3 sm:p-3.5 lg:p-4 rounded-2xl hover:-translate-y-1">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                          <Award className="w-3.5 h-3.5 text-[#E88053]" /> LEADERSHIP
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88053]/50" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                        Tech Hub Lead &amp; Campus Ambassador
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/70 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
                      </p>
                    </div>
                  </AppleSpotlightCard>

                  {/* Card 4: Uniswap & OpenLedger */}
                  <AppleSpotlightCard className="p-3 sm:p-3.5 lg:p-4 rounded-2xl hover:-translate-y-1">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#E88053]" /> RESEARCH
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88053]/50" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                        Uniswap v4 &amp; OpenLedger
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/70 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
                      </p>
                    </div>
                  </AppleSpotlightCard>

                  {/* Card 5: International Silambam */}
                  <AppleSpotlightCard className="p-3 sm:p-3.5 lg:p-4 rounded-2xl hover:-translate-y-1">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                          <Monitor className="w-3.5 h-3.5 text-[#E88053]" /> <HiddenClueWord word="DISCIPLINE" clueIndex={2} />
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88053]/50" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                        International Silambam Medalist
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/70 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and{' '}
                        <HiddenClueWord word="discipline" clueIndex={2} /> that directly shape my engineering stamina.
                      </p>
                    </div>
                  </AppleSpotlightCard>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 2 (SLIDE 03): CREATIVE SHOWCASE */}
          {/* ========================================================================= */}
          <div
            id="showcase"
            className="horizontal-panel w-1/3 min-w-[33.333333%] max-w-[33.333333%] h-full shrink-0 relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-22 md:pt-24 pb-14 sm:pb-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/4 left-1/3 w-[550px] h-[450px] bg-[#E88053]/20 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="space-y-2.5 sm:space-y-3 lg:space-y-3.5 my-auto max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
              {/* Header - Apple Keynote Eyebrow & Headline */}
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 border-b border-white/[0.1] pb-2.5 sm:pb-3 text-left">
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[10px] sm:text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E88053]" />
                    <span>03 // LATEST DEPLOYMENTS</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                    CREATIVE <span className="text-[#FFA266] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">SHOWCASE</span>
                  </h2>
                </div>

                <a
                  href="https://github.com/lakshangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] hover:border-[#FFA266] backdrop-blur-2xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 shrink-0 overflow-hidden text-xs font-mono text-white"
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

                  <span className="font-mono font-bold uppercase tracking-wider text-white group-hover:text-[#FFA266] transition-colors">
                    See All Projects
                  </span>

                  <span className="w-4 h-4 rounded-full bg-[#FFA266]/15 border border-[#FFA266]/30 flex items-center justify-center text-[#FFA266] group-hover:bg-[#E88053] group-hover:text-white transition-all text-[9px] font-bold">
                    ↗
                  </span>
                </a>
              </div>

              {/* 6 Clean Architectural Project Cards - Proportional & Breathable */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
                {SHOWCASE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-white/[0.12] hover:border-[#FFA266]/70 bg-[#0C0907]/85 hover:bg-[#140F0A]/95 backdrop-blur-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.14)] hover:shadow-[0_25px_50px_rgba(232,128,83,0.2)] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
                  >
                    {/* macOS Sequoia Glass Window Header */}
                    <div className="px-3 py-1.5 sm:py-2 bg-black/60 border-b border-white/[0.1] flex items-center justify-between backdrop-blur-md">
                      {/* macOS Window Traffic Lights */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm" />
                      </div>

                      {/* Centered Minimal Domain Pill */}
                      <div className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[9px] font-mono text-white/70 truncate max-w-[140px]">
                        {card.domain}
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        {card.githubUrl && (
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors"
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

                    {/* Scaled Desktop Viewport */}
                    <div
                      className="relative w-full h-[85px] sm:h-[95px] lg:h-[105px] xl:h-[125px] bg-[#0A0806] overflow-hidden group/screen"
                      style={{ contain: 'paint layout', transform: 'translate3d(0,0,0)' }}
                    >
                      <div
                        className="w-[1200px] h-[600px] origin-top-left pointer-events-none select-none"
                        style={{
                          transform: 'scale(0.24) translate3d(0,0,0)',
                          transformOrigin: '0 0',
                          width: '1200px',
                          height: '600px',
                          contain: 'strict',
                        }}
                      >
                        <iframe
                          src={card.url}
                          title={card.title}
                          className="w-full h-full border-none bg-white"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/60 via-transparent to-transparent opacity-30 pointer-events-none" />

                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/85 hover:bg-[#E88053] hover:text-white border border-white/20 rounded-lg font-mono text-[9px] font-bold text-white transition-all flex items-center gap-1 shadow-lg opacity-0 group-hover/screen:opacity-100 duration-200 z-10"
                      >
                        Launch ↗
                      </a>
                    </div>

                    {/* Card Body */}
                    <div className="p-2.5 sm:p-3 space-y-1 bg-transparent flex-1 flex flex-col justify-center">
                      <h3 className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-[#FFA266] transition-colors flex items-center justify-between">
                        <span>
                          {card.id === 'genproof' ? (
                            <>
                              Gen<HiddenClueWord word="Proof" clueIndex={0} /> AI
                            </>
                          ) : (
                            card.title
                          )}
                        </span>
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                          title="Open Project"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </h3>
                      <p className="font-sans text-[10px] sm:text-[11px] text-white/75 font-normal leading-relaxed line-clamp-2">
                        {card.id === 'genproof' ? (
                          <>
                            Cryptographic <HiddenClueWord word="proof" clueIndex={0} /> verification engine implementing C2PA open standards to detect and verify synthetic AI media.
                          </>
                        ) : (
                          card.description
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 3 (SLIDE 04): TECHNICAL EXPERTISE */}
          {/* ========================================================================= */}
          <div
            id="technical-expertise"
            className="horizontal-panel w-1/3 min-w-[33.333333%] max-w-[33.333333%] h-full shrink-0 relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-22 md:pt-24 pb-14 sm:pb-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/3 left-1/4 w-[550px] h-[400px] bg-[#E88053]/20 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="max-w-7xl mx-auto w-full space-y-3 sm:space-y-4 lg:space-y-4.5 relative z-10 my-auto">
              {/* Header */}
              <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-3 border-b border-white/[0.1] pb-2.5 sm:pb-3 text-left">
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[10px] sm:text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                    <span>04 // CORE ARCHITECTURAL CAPABILITIES</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                    TECHNICAL <span className="text-[#FFA266] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">EXPERTISE</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-[14px] text-white/80 font-sans leading-relaxed max-w-xl font-normal">
                    Deconstructing complex engineering challenges into resilient full-stack systems, audited EVM protocols, autonomous AI agents, and high-performance WebGL graphics.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCompetitiveMilestones}
                  className="self-center inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] hover:border-[#FFA266] text-xs font-mono text-white transition-all shadow-lg group cursor-pointer backdrop-blur-2xl shrink-0"
                >
                  <span>Explore Milestones</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#FFA266]" />
                </button>
              </div>

              {/* 4 Clean Minimal Technical Expertise Cards - 2x2 on Mobile, 4-col on Desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
                {TECHNICAL_EXPERTISE.map((tech) => (
                  <TechExpertiseCard key={tech.id} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apple Dynamic Island Floating Navigation Capsule */}
        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0E0C0A]/85 hover:bg-[#15110E]/95 border border-white/[0.14] backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all"
          >
            {[
              { id: 0, label: 'Accolades' },
              { id: 1, label: 'Showcase' },
              { id: 2, label: 'Expertise' },
            ].map((slide) => {
              const isActive = activeSlide === slide.id;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => advanceToSlide(slide.id)}
                  className={`relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-tight transition-all duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-black font-bold shadow-md'
                      : 'text-white/60 hover:text-white font-medium'
                  }`}
                  aria-label={`Go to slide ${slide.id + 1}: ${slide.label}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSlideIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E88053] to-[#FFA266] shadow-[0_0_16px_rgba(232,128,83,0.55)]"
                    />
                  )}
                  <span className="relative z-10 font-bold">0{slide.id + 1}</span>
                  <span className="relative z-10 hidden xs:inline">{slide.label}</span>
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
