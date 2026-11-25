'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  X,
  ArrowUp,
  ChevronDown,
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

const FOCUS_AREAS = [
  {
    id: 'fullstack',
    title: 'Full Stack Web',
    subtitle: 'Responsive apps, clean UI, scalable backends',
    badge: 'React • Next.js • Node',
    detail: 'End-to-end TypeScript applications with Next.js App Router, PostgreSQL, edge caching, and 60fps micro-interactions.',
  },
  {
    id: 'ai',
    title: 'AI & Smart Tools',
    subtitle: 'Context-aware chat, automation, and RAG pipelines',
    badge: 'LLMs • Python • LangChain',
    detail: 'Multi-agent workflows, vector retrieval systems, Gemini & OpenAI integrations, and verifiable C2PA media provenance.',
  },
  {
    id: 'web3',
    title: 'Web3 & Protocols',
    subtitle: 'Smart contracts, DeFi logic, and EVM testing',
    badge: 'Solidity • Hardhat • DeFi',
    detail: 'Audited EVM smart contracts, Foundry fuzz testing, Uniswap v4 liquidity hooks, and decentralized tokenization vaults.',
  },
] as const;

const MOB_NAV = [
  { id: 'about', label: 'About' },
  { id: 'achievements', label: 'Honors' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

type MobNavId = (typeof MOB_NAV)[number]['id'];
type ProjectCategory = 'ALL' | 'WEB3' | 'AI & WEB';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 420, damping: 28 };

export const MobilePortfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [activePhoto, setActivePhoto] = useState<(typeof CURATED_PROOF_PHOTOS)[0] | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeNav, setActiveNav] = useState<MobNavId>('about');
  const [expandedFocus, setExpandedFocus] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 500], [0, 48]);
  const heroImgScale = useTransform(scrollY, [0, 500], [1, 1.06]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 240) {
        setActiveNav('about');
        return;
      }
      const trigger = window.innerHeight * 0.42;
      const order: MobNavId[] = ['contact', 'work', 'achievements', 'about'];
      for (const id of order) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.height > 0 && rect.top <= trigger) {
            setActiveNav(id);
            return;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const handleJumpTo = (e: React.MouseEvent<HTMLAnchorElement>, id: MobNavId) => {
    e.preventDefault();
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] overflow-x-hidden font-sans selection:bg-white/20 selection:text-white pb-16">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. FLOATING APPLE DYNAMIC PILL HEADER (With Bouncy Entrance & Active Pill)
      ────────────────────────────────────────────────────────────────────────── */}
      <header className="fixed top-3 inset-x-3 max-w-md mx-auto z-50">
        <motion.nav
          initial={{ y: -28, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          className="h-12 px-3 rounded-full bg-black/75 backdrop-blur-2xl border border-white/[0.12] flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          {/* Identity Wordmark */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            whileTap={{ scale: 0.92 }}
            className="group pl-2 py-1 flex items-center"
            aria-label="Lakshan - Home"
          >
            <span className="text-[13.5px] font-semibold tracking-tight bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Lakshan
            </span>
          </motion.a>

          {/* Interactive Jump Pills with Sliding Active Pill */}
          <div className="flex items-center gap-0.5 text-[11px] font-medium">
            {MOB_NAV.map((item) => {
              const isActive = activeNav === item.id;
              const isContact = item.id === 'contact';
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleJumpTo(e, item.id)}
                  className={`relative px-2.5 py-1 rounded-full transition-colors active:scale-95 ${
                    isActive
                      ? isContact
                        ? 'text-black font-semibold'
                        : 'text-white font-semibold'
                      : isContact
                      ? 'text-white/85'
                      : 'text-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mob-nav-pill"
                      transition={SPRING_SNAPPY}
                      className={`absolute inset-0 rounded-full ${
                        isContact ? 'bg-white shadow-sm' : 'bg-white/[0.14] border border-white/[0.12]'
                      }`}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. APPLE KEYNOTE HERO (Parallax Portrait + Tactile Buttons)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92svh] flex flex-col justify-end px-5 pt-20 pb-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-white/[0.02] rounded-full blur-[90px]" />
        </div>

        {/* Parallax Portrait Background */}
        <motion.div
          style={{ y: heroImgY, scale: heroImgScale }}
          className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
        >
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
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#050507] via-[#050507]/90 to-transparent" />
        </motion.div>

        {/* Hero Content with Staggered Spring Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-[11.5vw] xs:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
              Lakshan Ganesan
            </h1>
            <p className="text-sm font-medium text-white/70 tracking-tight">
              Full-Stack Developer <span className="text-white/30">•</span> Web3 &amp; AI Builder
            </p>
          </div>

          <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto font-normal">
            I build fast web apps, smart contracts, and AI tools with a focus on clean design and smooth user experience.
          </p>

          <div className="flex items-center justify-center gap-2.5 pt-1 w-full max-w-xs">
            <motion.a
              href="#contact"
              onClick={(e) => handleJumpTo(e, 'contact')}
              whileTap={{ scale: 0.94 }}
              className="flex-1 py-2.5 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 transition-colors text-center shadow-lg"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="/Lakshan_Resume copy.pdf"
              download="Lakshan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.94 }}
              className="flex-1 py-2.5 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium text-xs tracking-tight transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
            </motion.a>
          </div>

          <motion.button
            type="button"
            onClick={handleCopyDesktopLink}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] text-white/70 hover:text-white transition-colors shadow-sm"
          >
            <AppleDisplayIcon className="w-3.5 h-3.5 text-white/80" />
            <span>{linkCopied ? 'Desktop Link Copied ✓' : 'See the alternate design on desktop'}</span>
            <ArrowUpRight className="w-3 h-3 text-white/40" />
          </motion.button>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2.5 APPLE-STYLE ABOUT SECTION (Interactive Focus Accordions)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4 scroll-mt-16"
      >
        <div className="flex items-center gap-2 text-white/40">
          <span className="h-px w-5 bg-white/20" />
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider">About Me</h2>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-2xl xs:text-3xl font-bold tracking-tight text-white leading-snug">
            I turn ideas into products. <br />
            <span className="text-white/60">Fast, thoughtful, and built to scale.</span>
          </h3>

          <p className="text-xs text-white/70 leading-relaxed font-normal">
            Whether it’s designing slick web apps, training AI models, or building on-chain systems — I love solving
            hard problems and shipping things people actually enjoy using.
          </p>
        </div>

        {/* Interactive Tap-to-Expand Focus Areas */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          {FOCUS_AREAS.map((area) => {
            const isOpen = expandedFocus === area.id;
            return (
              <div key={area.id} className="transition-colors hover:bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setExpandedFocus(isOpen ? null : area.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left active:bg-white/[0.04] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-semibold text-white block">{area.title}</span>
                    <span className="text-[11px] text-white/50 block truncate">{area.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-white/60 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      {area.badge}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-white/40"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-3.5 pb-3.5 pt-0.5 text-[11px] text-white/65 leading-relaxed">
                        {area.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. KEYNOTE BENTO HONORS & ACHIEVEMENTS (Tactile Spring Cards)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section
        id="achievements"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-4 scroll-mt-16"
      >
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">Key Milestones</h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">Honors &amp; Leadership</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <motion.div
            whileTap={{ scale: 0.96 }}
            transition={SPRING_SNAPPY}
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
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">Intl Silambam</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">Bronze Medalist</div>
              <p className="text-[10px] text-white/40 leading-relaxed mt-1.5">
                Won bronze at the International Championship.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={SPRING_SNAPPY}
            onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[2])}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3 cursor-pointer hover:border-white/20"
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
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">Campus Amb.</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">MyGov India • MeitY</div>
              <div className="flex items-center gap-1 text-[10px] text-white/50 font-mono mt-1.5">
                <span>View Certificate</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            transition={SPRING_SNAPPY}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <HackathonTrophyIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">25+</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">Hackathons Competed</div>
              <p className="text-[10px] text-white/40 mt-1">20+ Top Tier Finalist Finishes</p>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={SPRING_SNAPPY}
            onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[0])}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3 cursor-pointer hover:border-white/20"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <WinnerStarIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">Track #1</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">NIT Calicut Winner</div>
              <div className="flex items-center gap-1 text-[10px] text-white/50 font-mono mt-1.5">
                <span>View Stage Photo</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={SPRING_SNAPPY}
            onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[1])}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3 cursor-pointer hover:border-white/20"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <SihEmblemIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">National</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">SIH Finals Winner</div>
              <div className="flex items-center gap-1 text-[10px] text-white/50 font-mono mt-1.5">
                <span>View Prize Photo</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            transition={SPRING_SNAPPY}
            className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
              <TechLeadIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">Lead</div>
              <div className="text-[11px] font-medium text-white/70 leading-tight mt-0.5">Campus Tech Hub</div>
              <p className="text-[10px] text-white/40 mt-1">Leading Web3 &amp; AI Workshops</p>
            </div>
          </motion.div>
        </div>

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
          4. SELECTED WORK (Spring Segmented Control + Expandable Details)
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.section
        id="work"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 max-w-md mx-auto space-y-5 scroll-mt-16"
      >
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">Selected Work</h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">Things I&apos;ve Built</p>
        </div>

        {/* Apple Segmented Control with Spring-Sliding Indicator */}
        <div className="p-1 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-between relative">
          {(['ALL', 'WEB3', 'AI & WEB'] as ProjectCategory[]).map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative flex-1 py-1.5 text-[11px] font-medium rounded-full transition-colors text-center ${
                  active ? 'text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="mob-cat-pill"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Project Cards */}
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isExpanded = expandedProject === project.id;
              return (
                <motion.div
                  layout
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-white/[0.18] transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-white/70 border border-white/[0.06] font-semibold">
                      {project.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors"
                    >
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-normal">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden space-y-2.5 pt-2 border-t border-white/[0.06] text-[11px]"
                      >
                        <div>
                          <span className="font-mono uppercase text-[9px] text-white/40 block">Problem</span>
                          <p className="text-white/70 leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                          <span className="font-mono uppercase text-[9px] text-white/40 block">Solution</span>
                          <p className="text-white/70 leading-relaxed">{project.solution}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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

                  <div className="pt-2 flex items-center gap-2">
                    {project.demoUrl && (
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-full bg-white text-black font-semibold text-xs tracking-tight flex items-center justify-center gap-1 hover:bg-white/90 transition-colors shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium text-xs tracking-tight flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5. ANIMATED PROOF OF WORK
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
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">Proof of Work</h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">Stage Wins &amp; Highlights</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CURATED_PROOF_PHOTOS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] hover:border-white/25 cursor-pointer shadow-md"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2.5 z-10 pointer-events-none">
                <span className="text-[11px] font-bold text-white tracking-tight leading-tight line-clamp-1">
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
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={SPRING_SNAPPY}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#111115] border border-white/[0.15] rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 active:scale-90 transition-all backdrop-blur-md"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[4/3] w-full bg-black">
                <Image src={activePhoto.src} alt={activePhoto.title} fill className="object-contain" />
              </div>

              <div className="p-4 space-y-1.5 bg-[#0E0E12]">
                <div className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-white/[0.08] text-white/80 border border-white/[0.12] uppercase tracking-wider">
                  {activePhoto.tag}
                </div>
                <h4 className="text-base font-bold text-white leading-tight">{activePhoto.title}</h4>
                <p className="text-xs text-white/60">{activePhoto.event}</p>
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
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-white/40">Journey</h2>
          <p className="text-lg font-bold text-white tracking-tight mt-0.5">Experience &amp; Roles</p>
        </div>

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
                  <span className="text-xs font-mono text-white/50 font-semibold">{exp.year}</span>
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
                <h3 className="text-sm font-bold text-white tracking-tight">{exp.role}</h3>
                <div className="text-xs text-white/50 font-medium">{exp.company}</div>
                <p className="text-xs text-white/60 leading-relaxed pt-0.5">{exp.description}</p>

                {isCampusAmbassador && (
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActivePhoto(CURATED_PROOF_PHOTOS[2])}
                    className="mt-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3 cursor-pointer hover:border-white/20"
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
                      <div className="text-[11px] font-bold text-white truncate">Official MeitY Certificate</div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1 font-mono">
                        <span>Tap to view certificate</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </motion.div>
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
        className="px-4 py-8 max-w-md mx-auto scroll-mt-16"
      >
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.1] p-6 space-y-5 shadow-xl text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Let&apos;s build together.</h2>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
              I&apos;m always open to talking about new projects, engineering roles, or interesting ideas.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={handleCopyEmail}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-4 rounded-2xl bg-black/60 border border-white/[0.12] hover:border-white/30 text-white flex items-center justify-between group transition-colors"
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
          </motion.button>

          <motion.a
            whileTap={{ scale: 0.96 }}
            href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Hello%20from%20Portfolio`}
            className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-tight flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg"
          >
            <span>Send an Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <div className="pt-2 flex items-center justify-center gap-3">
            {[
              { href: PORTFOLIO_DATA.personal.github, label: 'GitHub', Icon: FaGithub },
              { href: PORTFOLIO_DATA.personal.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
              { href: PORTFOLIO_DATA.personal.twitter, label: 'X / Twitter', Icon: FaXTwitter },
              { href: PORTFOLIO_DATA.personal.instagram, label: 'Instagram', Icon: FaInstagram },
            ].map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                whileTap={{ scale: 0.9 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. MINIMAL FOOTER
      ────────────────────────────────────────────────────────────────────────── */}
      <footer className="pt-6 px-4 max-w-md mx-auto text-center space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>© 2026 LAKSHAN GANESAN</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3" />
          </motion.button>
        </div>
        <p className="text-[10px] font-mono text-white/30">Crafted with Next.js &amp; TypeScript</p>
      </footer>
    </div>
  );
};

export default MobilePortfolio;
