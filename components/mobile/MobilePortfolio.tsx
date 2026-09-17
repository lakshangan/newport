'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Copy, 
  Check, 
  X, 
  ArrowUp
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

// Custom Monochromatic Apple-Grade Vector SVGs
const AppleDisplayIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
  </svg>
);

const SilambamMedalIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="7" />
    <circle cx="12" cy="14" r="4.5" strokeDasharray="2 2" />
    <path d="M12 11.5L12.7 13.2L14.5 13.5L13.2 14.7L13.5 16.5L12 15.6L10.5 16.5L10.8 14.7L9.5 13.5L11.3 13.2L12 11.5Z" fill="currentColor" fillOpacity="0.25" />
    <path d="M8 3L10.2 7.5M16 3L13.8 7.5" />
    <path d="M5.5 3H10.5M13.5 3H18.5" />
  </svg>
);

const GovtSealIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 6.5V11.5C3 17.1 6.8 22.3 12 23.5C17.2 22.3 21 17.1 21 11.5V6.5L12 2Z" />
    <path d="M8.5 12L10.8 14.3L15.5 9.6" />
  </svg>
);

const HackathonTrophyIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4H18V9C18 12.3 15.3 15 12 15C8.7 15 6 12.3 6 9V4Z" />
    <path d="M6 6H3.5C2.7 6 2 6.7 2 7.5C2 9.4 3.6 11 5.5 11H6" />
    <path d="M18 6H20.5C21.3 6 22 6.7 22 7.5C22 9.4 20.4 11 18.5 11H18" />
    <path d="M12 15V19M8 21H16" />
  </svg>
);

const WinnerStarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5L14.7 8.5L21.2 9.1L16.3 13.5L17.8 19.9L12 16.5L6.2 19.9L7.7 13.5L2.8 9.1L9.3 8.5L12 2.5Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const SihEmblemIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 8H17M7 12H13M7 16H10" />
  </svg>
);

const TechLeadIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <path d="M6.5 9.5L10 12L6.5 14.5M12.5 15H17" />
  </svg>
);

// Curated authentic visual proof of work
const CURATED_PROOF_PHOTOS = [
  {
    src: '/images/IMG_8920.JPG',
    title: 'NIT Calicut National Stage',
    event: "Kerala's Largest Web3 Hackathon",
    tag: '1ST PLACE TRACK',
    location: 'NIT Calicut',
  },
  {
    src: '/images/sihprize.JPG',
    title: 'Smart India Hackathon Prize',
    event: 'National Innovation Winner',
    tag: 'NATIONAL WINNER',
    location: 'New Delhi',
  },
  {
    src: '/campus ambassador certificate.png',
    title: 'MyGov Campus Ambassador Certificate',
    event: 'Ministry of Electronics & IT (MeitY)',
    tag: 'GOVT OF INDIA',
    location: 'National Leadership',
  },
  {
    src: '/images/IMG_0400.jpeg',
    title: 'Beyond Abstraction Demo Day',
    event: 'Router Protocol x Pivot Demo Day',
    tag: 'VENTURE PITCH',
    location: 'Bengaluru',
  },
  {
    src: '/images/IMG_8355.jpeg',
    title: 'Uniswap Hook Incubator',
    event: 'Accepted Developer Cohort',
    tag: 'DEFI INCUBATOR',
    location: 'Tech Hub',
  },
  {
    src: '/images/delhisih.jpg',
    title: 'Smart India Hackathon Finals',
    event: 'National Hardware & AI Finals',
    tag: 'SIH FINALS',
    location: 'New Delhi',
  },
  {
    src: '/images/buildonchainNITkerala.png',
    title: 'Build On-Chain NIT Kerala',
    event: 'Web3 Hackathon Champion',
    tag: 'HACKATHON WIN',
    location: 'NIT Calicut',
  },
  {
    src: '/images/router protocol.jpg',
    title: 'Router Protocol Demo Day',
    event: 'Hackathon Partner Demo Day',
    tag: 'DEMO DAY',
    location: 'Bengaluru',
  },
];

type ProjectCategory = 'ALL' | 'WEB3' | 'AI & WEB';

export const MobilePortfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [activePhoto, setActivePhoto] = useState<typeof CURATED_PROOF_PHOTOS[0] | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Filter projects by clean categories
  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'WEB3') {
      return (
        p.category.toLowerCase().includes('defi') ||
        p.category.toLowerCase().includes('smart contract') ||
        p.technologies.some((t) => ['Solidity', 'Ethereum', 'Thirdweb', 'Hardhat'].includes(t))
      );
    }
    if (selectedCategory === 'AI & WEB') {
      return (
        p.category.toLowerCase().includes('ai') ||
        p.category.toLowerCase().includes('web') ||
        p.technologies.some((t) => ['LLMs', 'Generative AI', 'Python', 'Next.js', 'React'].includes(t))
      );
    }
    return true;
  });

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    }
  };

  const handleCopyDesktopLink = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin || 'https://lakshan-dev.vercel.app';
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] overflow-x-hidden font-sans selection:bg-white/20 selection:text-white pb-16">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. FLOATING APPLE DYNAMIC PILL HEADER
      ────────────────────────────────────────────────────────────────────────── */}
      <header className="fixed top-3 inset-x-3 max-w-md mx-auto z-50">
        <nav className="h-12 px-3.5 rounded-full bg-black/75 backdrop-blur-2xl border border-white/[0.12] flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {/* Identity Wordmark */}
          <a 
            href="#" 
            className="group pl-1.5 py-1 flex items-center transition-transform active:scale-95"
            aria-label="Lakshan - Home"
          >
            <span className="text-[13.5px] font-semibold tracking-tight bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent group-hover:to-white transition-all">
              Lakshan
            </span>
          </a>

          {/* Quick Jump Pills */}
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <a 
              href="#about" 
              className="px-2.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              About
            </a>
            <a 
              href="#achievements" 
              className="px-2.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              Honors
            </a>
            <a 
              href="#work" 
              className="px-2.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              Work
            </a>
            <a 
              href="#contact" 
              className="ml-1 px-3 py-1 rounded-full bg-white text-black font-semibold text-[11px] hover:bg-white/90 active:scale-95 transition-all shadow-sm"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. APPLE KEYNOTE HERO
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92svh] flex flex-col justify-end px-5 pt-20 pb-6 overflow-hidden">
        {/* Subtle Pure Monochromatic Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-white/[0.02] rounded-full blur-[90px]" />
        </div>

        {/* Cinematic Portrait Background with Natural Gradient Mask */}
        <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none select-none overflow-hidden">
          <div 
            className="relative h-[85vh] w-full max-w-md mx-auto"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
            }}
          >
            <Image
              src="/images/mobherosection.png"
              alt="Lakshan Ganesan"
              fill
              priority
              className="object-cover object-[50%_12%] filter contrast-[1.04] brightness-100"
            />
          </div>
          {/* Deep dark gradient scrim for bottom text readability */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#050507] via-[#050507]/90 to-transparent" />
        </div>

        {/* Hero Content with Smooth Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-4"
        >
          {/* Hero Name & Title */}
          <div className="space-y-1">
            <h1 className="text-[11.5vw] xs:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
              Lakshan Ganesan
            </h1>
            <p className="text-sm font-medium text-white/70 tracking-tight">
              Full-Stack Developer <span className="text-white/30">•</span> Web3 &amp; AI Builder
            </p>
          </div>

          {/* Clean, Simple & Casual Bio */}
          <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto font-normal">
            I build fast web apps, smart contracts, and AI tools with a focus on clean design and smooth user experience.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex items-center justify-center gap-2.5 pt-1 w-full max-w-xs">
            <a
              href="#contact"
              className="flex-1 py-2.5 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 active:scale-95 transition-all text-center shadow-lg"
            >
              Get in Touch
            </a>
            <a
              href="/Lakshan_Resume copy.pdf"
              download="Lakshan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium text-xs tracking-tight active:scale-95 transition-all flex items-center justify-center gap-1.5 text-center"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
            </a>
          </div>

          {/* Monochromatic Apple Display Vector Button */}
          <button
            type="button"
            onClick={handleCopyDesktopLink}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] text-white/70 hover:text-white transition-all active:scale-95 shadow-sm"
          >
            <AppleDisplayIcon className="w-3.5 h-3.5 text-white/80" />
            <span>{linkCopied ? 'Desktop Link Copied ✓' : '3D Edition on Desktop'}</span>
            <ArrowUpRight className="w-3 h-3 text-white/40" />
          </button>
        </motion.div>
      </section>



      {/* ──────────────────────────────────────────────────────────────────────────
          2.5 APPLE-STYLE ABOUT SECTION (Casual & Natural Tone, No Numbers)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4"
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 text-white/40">
          <span className="h-px w-5 bg-white/20" />
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider">
            About Me
          </h2>
        </div>

        {/* Natural, Simple Statement */}
        <div className="space-y-2.5">
          <h3 className="text-2xl xs:text-3xl font-bold tracking-tight text-white leading-snug">
            Building with focus. <br />
            <span className="text-white/60">
              From the sports arena to writing code.
            </span>
          </h3>

          <p className="text-xs text-white/70 leading-relaxed font-normal">
            I love building clean, reliable software that feels great to use. As an International Silambam bronze medalist, sports taught me consistency, discipline, and patience — things I rely on every day when engineering web systems and smart contracts.
          </p>
        </div>

        {/* Clean Focus Areas (No Numbers) */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">
                Full Stack Web
              </span>
              <span className="text-[11px] text-white/50">
                Responsive apps, clean UI, scalable backends
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/60 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
              React • Next.js • Node
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">
                AI &amp; Smart Tools
              </span>
              <span className="text-[11px] text-white/50">
                Context-aware chat, automation, and RAG pipelines
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/60 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
              LLMs • Python • LangChain
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">
                Web3 &amp; Protocols
              </span>
              <span className="text-[11px] text-white/50">
                Smart contracts, DeFi logic, and EVM testing
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/60 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
              Solidity • Hardhat • DeFi
            </span>
          </div>
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. KEYNOTE BENTO HONORS & ACHIEVEMENTS (No "06 Featured" or Card Numbers)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        id="achievements" 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4"
      >
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">
            Key Milestones
          </h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">
            Honors &amp; Leadership
          </p>
        </div>

        {/* 6-Card Apple Bento Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Silambam Bronze Medalist */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                <SilambamMedalIcon className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 font-semibold tracking-wider uppercase border border-white/[0.08]">
                BRONZE
              </span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">
                Intl Silambam
              </div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                Bronze Medalist
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed mt-1.5">
                Won bronze at the International Championship.
              </p>
            </div>
          </motion.div>

          {/* Card 2: MyGov Campus Ambassador - MeitY */}
          <motion.div 
            whileHover={{ y: -2 }}
            onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[2])}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3 cursor-pointer active:scale-95 transition-all hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                <GovtSealIcon className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 font-semibold tracking-wider uppercase border border-white/[0.08]">
                GOVT OF INDIA
              </span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">
                Campus Amb.
              </div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                MyGov India • MeitY
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/50 font-mono mt-1.5">
                <span>View Certificate</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Hackathons */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <HackathonTrophyIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">25+</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                Hackathons Competed
              </div>
              <p className="text-[10px] text-white/40 mt-1">20+ Top Tier Finalist Finishes</p>
            </div>
          </motion.div>

          {/* Card 4: NIT Calicut Track Win */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <WinnerStarIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">Track #1</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                NIT Calicut Winner
              </div>
              <p className="text-[10px] text-white/40 mt-1">Build On-Chain Web3 Trophy</p>
            </div>
          </motion.div>

          {/* Card 5: Smart India Hackathon */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <SihEmblemIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">National</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                SIH Finals Winner
              </div>
              <p className="text-[10px] text-white/40 mt-1">Ministry of Education AI Stage</p>
            </div>
          </motion.div>

          {/* Card 6: Campus Tech Hub Lead */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <TechLeadIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">Lead</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">
                Campus Tech Hub
              </div>
              <p className="text-[10px] text-white/40 mt-1">Leading Web3 &amp; AI Workshops</p>
            </div>
          </motion.div>
        </div>

        {/* Minimal Discipline Philosophy Bento */}
        <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-semibold">
              Core Philosophy
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Code should be clean, fast, and helpful. No buzzwords, no unnecessary complexity.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          4. SELECTED WORK (No "06 Items" or Project Numbers)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        id="work" 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-5"
      >
        {/* Section Header (No numbers) */}
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">
            Selected Work
          </h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">
            Things I&apos;ve Built
          </p>
        </div>

        {/* Apple Segmented Control Filter */}
        <div className="p-1 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
          {(['ALL', 'WEB3', 'AI & WEB'] as ProjectCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition-all text-center ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards (No Card Numbers) */}
        <div className="space-y-4">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-white/[0.18] transition-all"
            >
              {/* Category Pill (No Numbers) */}
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-white/70 border border-white/[0.06] font-semibold">
                  {project.category}
                </span>
              </div>

              {/* Title & Concise Casual Tagline */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {project.tagline || project.description}
                </p>
              </div>

              {/* Clean Tech Pills */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {project.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 text-[10px] font-mono text-white/60 bg-white/[0.04] rounded-md border border-white/[0.04]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-full bg-white text-black font-semibold text-xs tracking-tight flex items-center justify-center gap-1 hover:bg-white/90 active:scale-95 transition-all shadow-sm"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium text-xs tracking-tight flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5. ANIMATED PROOF OF WORK (Dynamic Reveal, Better Motion & Cards)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        id="proof" 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4"
      >
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">
            Proof of Work
          </h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">
            Stage Wins &amp; Highlights
          </p>
        </div>

        {/* 2-Column Staggered Animated Grid with Smooth Card Reveals */}
        <div className="grid grid-cols-2 gap-2.5">
          {CURATED_PROOF_PHOTOS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] hover:border-white/25 cursor-pointer shadow-md transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2.5 z-10 pointer-events-none">
                <span className="text-[11px] font-bold text-white tracking-tight leading-tight line-clamp-1 group-hover:text-white/90">
                  {item.title}
                </span>
                <span className="text-[8px] font-mono text-white/70 font-semibold tracking-wider uppercase truncate mt-0.5">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px] font-mono text-white/40 pt-1">
          Tap any card to view full certificate or event details
        </p>
      </motion.section>

      {/* Lightbox Modal for Photo Details */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#111115] border border-white/[0.15] rounded-3xl overflow-hidden shadow-2xl space-y-0"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 active:scale-90 transition-all backdrop-blur-md"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[4/3] w-full bg-black">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Metadata */}
              <div className="p-4 space-y-1.5 bg-[#0E0E12]">
                <div className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-white/[0.08] text-white/80 border border-white/[0.12] uppercase tracking-wider">
                  {activePhoto.tag}
                </div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-white/60">
                  {activePhoto.event}
                </p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/[0.08] mt-2">
                  <span>LOCATION: {activePhoto.location}</span>
                  <span className="text-white/70">VERIFIED CREDENTIAL</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────────────
          6. CAREER & JOURNEY
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4"
      >
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">
            Journey
          </h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">
            Experience &amp; Roles
          </p>
        </div>

        {/* iOS Settings-style Grouped Container */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          {PORTFOLIO_DATA.experience.map((exp, idx) => {
            const isCampusAmbassador = exp.company.toLowerCase().includes('mygov');
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="p-4 space-y-2 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50 font-semibold">
                    {exp.year}
                  </span>
                  {exp.isCurrent ? (
                    <span className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                      Current
                    </span>
                  ) : isCampusAmbassador ? (
                    <span className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-white/[0.06] text-white/70 border border-white/[0.08] font-medium">
                      Govt of India
                    </span>
                  ) : null}
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-xs text-white/50 font-medium">
                  {exp.company}
                </div>
                <p className="text-xs text-white/60 leading-relaxed pt-0.5">
                  {exp.description}
                </p>

                {/* If Campus Ambassador, provide sleek interactive certificate card preview */}
                {isCampusAmbassador && (
                  <div 
                    onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[2])}
                    className="mt-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3 cursor-pointer hover:border-white/20 active:scale-[0.98] transition-all"
                  >
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-black border border-white/10">
                      <Image
                        src="/campus ambassador certificate.png"
                        alt="MyGov Campus Ambassador Certificate"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-white truncate">
                        Official MeitY Certificate
                      </div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1 font-mono">
                        <span>Tap to view certificate</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          7. APPLE-STYLE ACTION CARD (Frictionless Contact)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto"
      >
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.1] p-6 space-y-5 shadow-xl text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Let&apos;s build together.
            </h2>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
              I&apos;m always open to talking about new projects, engineering roles, or interesting ideas.
            </p>
          </div>

          {/* Interactive Tap-to-Copy Email Capsule */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full py-3 px-4 rounded-2xl bg-black/60 border border-white/[0.12] hover:border-white/30 text-white flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2 text-left truncate">
              <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
              <span className="text-xs font-mono truncate">{PORTFOLIO_DATA.personal.email}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-white/70 flex-shrink-0 ml-2">
              {emailCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  <span className="hidden xs:inline text-white/60">Copy</span>
                </>
              )}
            </div>
          </button>

          {/* Direct Send Email Button */}
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Hello%20from%20Portfolio`}
            className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-tight flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-lg"
          >
            <span>Send an Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Social Icons Bar */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-all"
              aria-label="X / Twitter"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. MINIMAL FOOTER
      ────────────────────────────────────────────────────────────────────────── */}
      <footer className="pt-6 px-4 max-w-md mx-auto text-center space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>© 2026 LAKSHAN GANESAN</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
        <p className="text-[10px] font-mono text-white/30">
          Crafted with Next.js &amp; TypeScript
        </p>
      </footer>
    </div>
  );
};

export default MobilePortfolio;
