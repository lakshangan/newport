'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { Trophy, Award, Globe, Zap, CheckCircle2, ExternalLink, Sparkles, Monitor, ShieldCheck, ArrowDown, Layers, Cpu } from 'lucide-react';
import { HiddenClueWord } from '@/components/cipher/HiddenClueWord';

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
      className="relative p-3.5 sm:p-4 lg:p-5 bg-[#16100B]/60 hover:bg-[#1E150F]/75 border border-[#D4BC98]/25 hover:border-[#FFA266]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.08)_inset] hover:shadow-[0_20px_40px_rgba(232,128,83,0.18)] transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between overflow-hidden text-left"
    >
      {/* Subtle Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 128, 83, 0.15), transparent 80%)`,
        }}
      />

      <div className="space-y-2 sm:space-y-2.5 relative z-10">
        {/* Header: Index number + Glass Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FFA266]">
              {tech.num}
            </span>
            <span className="text-[#D4BC98]/30 font-mono text-[11px] sm:text-xs">//</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#F5EBD9]/70 uppercase tracking-wider font-semibold">
              {tech.category}
            </span>
          </div>
          <span className="p-1.5 sm:p-2 rounded-xl bg-[#281A12]/70 border border-[#D4BC98]/20 text-[#FFA266] group-hover:border-[#FFA266]/50 group-hover:bg-[#E88053] group-hover:text-white transition-all duration-300 shadow-sm">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors tracking-tight">
            {tech.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#F5EBD9]/80 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
            {tech.description}
          </p>
        </div>

        {/* Clean Tech Pills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
          {tech.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/40 border border-[#D4BC98]/15 text-[9px] sm:text-[10px] font-mono text-[#F5EBD9]/85 group-hover:border-[#FFA266]/30 transition-colors"
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
      const targetProgress = (targetIndex / 2) * 0.85;
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
    const getPanelWidth = () => container.offsetWidth || window.innerWidth;
    const totalDistance = getPanelWidth() * (totalPanels - 1) + 600;

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
          className="flex flex-row w-[300%] h-full will-change-transform relative z-10"
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

            <div className="max-w-7xl mx-auto w-full space-y-2.5 sm:space-y-3.5 lg:space-y-4 relative z-10 my-auto">
              {/* Header */}
              <div className="space-y-1 sm:space-y-1.5 border-b border-[#D4BC98]/25 pb-2 sm:pb-2.5 text-left">
                <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/35 text-[9px] sm:text-[10px] font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-xl shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                  <span>02 // LEADERSHIP &amp; ACCOLADES</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  PROVEN ON NATIONAL &amp; GLOBAL STAGES
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm font-medium text-[#FFFDF9]/95 max-w-2xl bg-[#18120D]/50 backdrop-blur-xl p-2 sm:p-2.5 rounded-xl border border-[#D4BC98]/25 shadow-lg leading-relaxed line-clamp-2">
                  Combining competitive hackathon execution, decentralized protocol research, and campus community leadership with unwavering discipline.
                </p>
              </div>

              {/* Natural Editorial Grid: 2 Headline Breakthroughs + 3 Distinct Pillars */}
              <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                {/* Row 1: Two Major Headline Breakthroughs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                  {/* Card 1: 1st Place Track Winner NIT Calicut */}
                  <div className="p-3 sm:p-3.5 lg:p-4.5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.14)_inset] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                          <Trophy className="w-3 h-3 text-[#E88053]" /> 1ST PLACE TRACK WINNER
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#E88053]/20 border border-[#E88053]/40 text-[#FFA266] font-semibold">
                          NIT CALICUT
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-[#FFFDF9] mb-1 group-hover:text-[#FFA266] transition-colors drop-shadow-sm">
                        Build On Chain @ NIT Calicut
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#F5EBD9] font-sans leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3">
                        Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour hackathon marathon, placing 1st against top national university engineering teams.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1.5 sm:pt-2 border-t border-[#D4BC98]/20 font-mono text-[9px] sm:text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Solidity</span>
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">EVM Smart Contracts</span>
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">DeFi Vaults</span>
                    </div>
                  </div>

                  {/* Card 2: Smart India Hackathon Finalist */}
                  <div className="p-3 sm:p-3.5 lg:p-4.5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#E88053]/70 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.14)_inset] transition-all duration-300 group hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFFDF9] uppercase tracking-wider">
                          <Globe className="w-3 h-3 text-[#E88053]" /> NATIONAL STAGE FINALIST
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4BC98]/20 border border-[#D4BC98]/40 text-[#FFFDF9] font-semibold">
                          GOVT. OF INDIA
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold font-sans text-[#FFFDF9] mb-1 group-hover:text-[#FFA266] transition-colors drop-shadow-sm">
                        Smart India Hackathon
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#F5EBD9] font-sans leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3">
                        Selected among tens of thousands of nationwide applicants in India’s premier government hackathon, engineering software solutions addressing national public infrastructure challenges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1.5 sm:pt-2 border-t border-[#D4BC98]/20 font-mono text-[9px] sm:text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">National Finalist</span>
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Full-Stack Systems</span>
                      <span className="px-2 py-0.5 rounded bg-[#251A13]/80 border border-[#D4BC98]/30 text-[#F2E5D0]">Public Infrastructure</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Three Distinct Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3.5">
                  {/* Card 3: Campus Tech Lead */}
                  <div className="p-2.5 sm:p-3 lg:p-3.5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-1">
                      <Award className="w-3 h-3 text-[#E88053]" /> LEADERSHIP
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold font-sans text-[#FFFDF9] mb-1 group-hover:text-[#FFA266] transition-colors">
                      Tech Hub Lead &amp; Campus Ambassador
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#F5EBD9] font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                      Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
                    </p>
                  </div>

                  {/* Card 4: Uniswap & OpenLedger */}
                  <div className="p-2.5 sm:p-3 lg:p-3.5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3 h-3 text-[#E88053]" /> RESEARCH
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold font-sans text-[#FFFDF9] mb-1 group-hover:text-[#FFA266] transition-colors">
                      Uniswap v4 &amp; OpenLedger
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#F5EBD9] font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                      Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
                    </p>
                  </div>

                  {/* Card 5: International Silambam */}
                  <div className="p-2.5 sm:p-3 lg:p-3.5 bg-[#18120D]/60 hover:bg-[#221811]/75 border border-[#D4BC98]/30 hover:border-[#FFA266]/60 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider mb-1">
                      <Monitor className="w-3 h-3 text-[#E88053]" /> <HiddenClueWord word="DISCIPLINE" clueIndex={2} />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold font-sans text-[#FFFDF9] mb-1 group-hover:text-[#FFA266] transition-colors">
                      International Silambam Medalist
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#F5EBD9] font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                      Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and{' '}
                      <HiddenClueWord word="discipline" clueIndex={2} /> that directly shape my engineering stamina.
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
            className="horizontal-panel w-1/3 min-w-[33.333333%] max-w-[33.333333%] h-full shrink-0 relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-22 md:pt-24 pb-14 sm:pb-16 overflow-hidden bg-transparent"
          >
            {/* Ambient Volumetric Glows */}
            <div className="absolute top-1/4 left-1/3 w-[550px] h-[450px] bg-[#E88053]/20 rounded-full blur-[160px] pointer-events-none z-1" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/18 rounded-full blur-[150px] pointer-events-none z-1" />

            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 my-auto max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
              {/* Header - Cleanly positioned below floating nav bar */}
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 border-b border-[#D4BC98]/25 pb-1.5 sm:pb-2">
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/30 text-[9px] sm:text-[10px] font-mono text-[#FFA266] tracking-wider uppercase backdrop-blur-xl shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#E88053]" />
                    <span>03 // LATEST DEPLOYMENTS</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFDF9] leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    CREATIVE <span className="text-[#FFA266] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">SHOWCASE</span>
                  </h2>
                </div>

                <a
                  href="https://github.com/lakshangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#18120D]/80 hover:bg-[#241710] border border-[#D4BC98]/35 hover:border-[#FFA266] backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.14)_inset] hover:shadow-[0_15px_30px_rgba(232,128,83,0.3)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 overflow-hidden text-[11px] sm:text-xs"
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

                  <span className="font-mono font-bold uppercase tracking-wider text-[#FFFDF9] group-hover:text-[#FFA266] transition-colors">
                    See All Projects
                  </span>

                  <span className="w-4 h-4 rounded-full bg-[#FFA266]/15 border border-[#FFA266]/30 flex items-center justify-center text-[#FFA266] group-hover:bg-[#E88053] group-hover:text-white transition-all text-[9px] font-bold">
                    ↗
                  </span>
                </a>
              </div>

              {/* 6 Clean Architectural Project Cards - Proportional & Breathable */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3.5">
                {SHOWCASE_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-[#D4BC98]/25 bg-[#16110D]/80 hover:bg-[#1E1610]/95 backdrop-blur-2xl overflow-hidden shadow-2xl hover:border-[#FFA266]/70 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(232,128,83,0.2)]"
                  >
                    {/* macOS Browser Window Header */}
                    <div className="px-2.5 py-1.5 bg-[#1A120B]/90 border-b border-[#D4BC98]/20 flex items-center justify-between backdrop-blur-md">
                      {/* macOS Window Traffic Lights */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>

                      {/* Centered Minimal Domain Pill */}
                      <div className="px-2 py-0.5 rounded-full bg-black/60 border border-[#D4BC98]/20 text-[9px] font-mono text-[#EADFC9]/75 truncate max-w-[130px] shadow-inner">
                        {card.domain}
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2 font-mono text-[9px]">
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

                    {/* Scaled Desktop Viewport */}
                    <div className="relative w-full h-[85px] sm:h-[95px] lg:h-[105px] xl:h-[125px] bg-[#0A0806] overflow-hidden group/screen">
                      <div
                        className="w-[1200px] h-[600px] origin-top-left pointer-events-none select-none"
                        style={{
                          transform: 'scale(0.24)',
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
                        className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-black/85 hover:bg-[#E88053] hover:text-white border border-white/20 rounded font-mono text-[9px] font-bold text-white transition-all flex items-center gap-1 shadow-lg opacity-0 group-hover/screen:opacity-100 duration-200 z-10"
                      >
                        Launch ↗
                      </a>
                    </div>

                    {/* Card Body */}
                    <div className="p-2 sm:p-2.5 space-y-0.5 bg-[#140E0A]/60 flex-1 flex flex-col justify-center">
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
                          className="text-[#D4BC98]/50 hover:text-white transition-colors"
                          title="Open Project"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </h3>
                      <p className="font-sans text-[10px] sm:text-[11px] text-[#F5EBD9]/85 font-medium leading-relaxed line-clamp-2">
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

            <div className="max-w-7xl mx-auto w-full space-y-2.5 sm:space-y-3.5 lg:space-y-4 relative z-10 my-auto">
              {/* Header */}
              <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-3 border-b border-[#D4BC98]/25 pb-2 sm:pb-2.5 text-left">
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#18120D]/80 border border-[#D4BC98]/35 text-[9px] sm:text-[10px] font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-xl shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
                    <span>04 // CORE ARCHITECTURAL CAPABILITIES</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    TECHNICAL <span className="text-[#FFA266] drop-shadow-[0_0_25px_rgba(232,128,83,0.5)]">EXPERTISE</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm font-medium text-[#FFFDF9]/95 max-w-xl bg-[#18120D]/50 backdrop-blur-xl p-2 sm:p-2.5 rounded-xl border border-[#D4BC98]/25 shadow-lg leading-relaxed line-clamp-2">
                    Deconstructing complex engineering challenges into resilient full-stack systems, audited EVM protocols, autonomous AI agents, and high-performance WebGL graphics.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCompetitiveMilestones}
                  className="self-center inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#18120D]/80 hover:bg-[#221811] border border-[#D4BC98]/35 hover:border-[#E88053]/70 text-xs font-mono text-[#F5EBD9] hover:text-[#FFFDF9] transition-all shadow-lg group cursor-pointer backdrop-blur-xl shrink-0"
                >
                  <span>Explore Milestones</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#FFA266]" />
                </button>
              </div>

              {/* 4 Clean Minimal Technical Expertise Cards - 2x2 on Mobile, 4-col on Desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {TECHNICAL_EXPERTISE.map((tech) => (
                  <TechExpertiseCard key={tech.id} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Centered Apple-Style Dotted Status Bar */}
        <div className="absolute bottom-2.5 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#18120D]/75 hover:bg-[#221811]/90 border border-[#D4BC98]/35 backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.15)_inset] transition-all"
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
