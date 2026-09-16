'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  Send, 
  CheckCircle2, 
  ArrowUp,
  Award,
  Sparkles,
  Trophy,
  Terminal,
  Code2,
  Monitor,
  Copy,
  Check,
  X,
  Layers
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

// Authentic desktop Proof of Work items
const DESKTOP_STAGGERED_PHOTOS = [
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
    src: '/images/router protocol.jpg',
    title: 'Router Protocol Demo Day',
    event: 'Hackathon Partner Demo Day',
    tag: 'DEMO DAY',
    location: 'Bengaluru',
  },
  {
    src: '/images/delhisih.jpg',
    title: 'Smart India Hackathon Delhi',
    event: 'National Finals // Hardware & AI',
    tag: 'SIH FINALS',
    location: 'New Delhi',
  },
  {
    src: '/guestLecture.png',
    title: 'Guest Lecture & Technical Talk',
    event: 'Keynote Speaker // Academic Invite',
    tag: 'KEYNOTE',
    location: 'Auditorium',
  },
  {
    src: '/images/delhi sid.JPG',
    title: 'Delhi Tech Delegation',
    event: 'Summit & Networking',
    tag: 'DELEGATION',
    location: 'New Delhi',
  },
  {
    src: '/images/IMG_0397.jpeg',
    title: 'Midnight Hackathon Sprint',
    event: 'Red Bull & Code Chaos',
    tag: 'HACKATHON',
    location: 'Bengaluru',
  },
  {
    src: '/images/IMG_0399.jpeg',
    title: 'Technical Keynote & Architecture',
    event: 'Live Demo & Presentation',
    tag: 'LIVE DEMO',
    location: 'Auditorium',
  },
  {
    src: '/images/IMG_9072.jpeg',
    title: 'Formal Tech Delegation',
    event: 'Honors & Recognition',
    tag: 'HONORS',
    location: 'State Stage',
  },
  {
    src: '/images/IMG_0398.jpeg',
    title: 'Hackathon Builder Squad',
    event: 'Team Collaboration // Stage',
    tag: 'BUILD SQUAD',
    location: 'Hackathon',
  },
  {
    src: '/images/metamaskcommunitymeet.png',
    title: 'MetaMask Community Meet',
    event: 'Consensys & Ethereum Ecosystem',
    tag: 'DEV MEET',
    location: 'Consensys',
  },
  {
    src: '/images/binancemeetup.png',
    title: 'Binance Community Summit',
    event: 'Web3 Builders & Ecosystem',
    tag: 'COMMUNITY',
    location: 'Summit',
  },
  {
    src: '/images/Businesspitch.png',
    title: 'Startup & Business Pitch',
    event: 'Venture & Demo Day',
    tag: 'VENTURE',
    location: 'Demo Day',
  },
  {
    src: '/images/Rtalks.png',
    title: 'R Talks Keynote Session',
    event: 'Community & Tech Talks',
    tag: 'COMMUNITY',
    location: 'Tech Hub',
  },
  {
    src: '/images/buildonchainNITkerala.png',
    title: 'Build On-Chain NIT Kerala',
    event: 'Web3 Hackathon // NIT',
    tag: 'WEB3 HACK',
    location: 'NIT Calicut',
  },
  {
    src: '/images/web3class.png',
    title: 'Web3 & Smart Contract Class',
    event: 'Hands-on Developer Lab',
    tag: 'DEV LAB',
    location: 'Classroom',
  },
];

// Multilingual greeting cycle inspired by pareekshithpalat.vercel.app
const GREETINGS = [
  'Hello',
  'வணக்கம்',
  'नमस्ते',
  'Bonjour',
  'Hola',
  'Ciao',
  'こんにちは',
  'Hallo',
];

export const MobilePortfolio: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState<typeof DESKTOP_STAGGERED_PHOTOS[0] | null>(null);

  const handleCopyDesktopLink = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin || 'https://lakshan-dev.vercel.app';
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  // Cycle multilingual greeting every 2.4s
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    // Construct mailto link as reliable zero-config mobile delivery
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f5f5f7] overflow-x-hidden font-sans selection:bg-[#C75B32] selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. MINIMAL FLOATING TOP BAR
      ────────────────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 py-3.5 bg-[#08080a]/85 backdrop-blur-lg border-b border-white/5 flex items-center justify-between">
        <a 
          href="#" 
          className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
          <span>LAKSHAN G</span>
        </a>

        <nav className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          <a 
            href="#contact" 
            className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10 hover:bg-[#C75B32] hover:border-[#C75B32] transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. MINIMAL HERO SECTION (Multilingual blur-in + Portrait fade + Italic quote)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end items-center text-center px-5 pt-20 pb-6 overflow-hidden">
        {/* Subtle Ambient Blurred Radial Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C75B32]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl" />
        </div>

        {/* Clear & Visible Portrait Image Centered on Face */}
        <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none select-none overflow-hidden">
          <div 
            className="relative h-[85vh] w-full"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
            }}
          >
            <Image
              src="/images/hero_portrait.jpg"
              alt="Lakshan Ganesan"
              fill
              priority
              className="object-cover object-[50%_15%] filter contrast-105 brightness-100"
            />
          </div>
          {/* Deep dark gradient scrim for bottom text readability */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#08080a] via-[#08080a]/90 to-transparent" />
        </div>

        {/* Text Positioned Down so Face has Full Space Above */}
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center justify-end space-y-3 pb-2">
          {/* Top Tagline / Category Badge */}
          <div>
            <p className="text-[#C75B32] font-mono font-semibold tracking-[0.22em] uppercase text-[10px] sm:text-xs">
              FULL STACK DEVELOPER • AI &amp; BLOCKCHAIN
            </p>
          </div>

          {/* Multilingual Animated Heading */}
          <div className="h-16 sm:h-20 flex items-center justify-center relative w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={GREETINGS[greetingIndex]}
                initial={{ y: 15, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 0.95, filter: 'blur(0px)' }}
                exit={{ y: -15, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-[13vw] sm:text-5xl font-bold text-white tracking-tighter leading-none absolute w-full text-center select-none"
              >
                {GREETINGS[greetingIndex]}
              </motion.h1>
            </AnimatePresence>

            {/* Faint ambient glow clone behind */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${GREETINGS[greetingIndex]}-glow`}
                initial={{ y: 15, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 0.25, filter: 'blur(6px)' }}
                exit={{ y: -15, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-[13vw] sm:text-5xl font-bold text-[#C75B32] tracking-tighter leading-none absolute pointer-events-none w-full text-center select-none"
              >
                {GREETINGS[greetingIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Minimal Italic Motto flanked by subtle hairline lines */}
          <div className="flex items-center gap-3 max-w-xs mx-auto">
            <div className="h-px w-6 bg-white/40 flex-shrink-0" />
            <p className="text-white/80 text-xs font-serif italic tracking-wide leading-relaxed text-center">
              architecting &amp; engineering <br />
              <span className="text-white font-medium not-italic font-mono text-[10px] tracking-wider text-[#E88053] uppercase">
                full stack systems
              </span>
            </p>
            <div className="h-px w-6 bg-white/40 flex-shrink-0" />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href="/Lakshan_Resume copy.pdf"
              download="Lakshan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white text-black font-mono font-semibold text-xs tracking-wider uppercase hover:bg-[#C75B32] hover:text-white transition-all shadow-lg active:scale-95"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/10 transition-all active:scale-95"
            >
              Get in Touch
            </a>
            <button
              type="button"
              onClick={handleCopyDesktopLink}
              className="px-3.5 py-2 rounded-full bg-gradient-to-r from-white/[0.07] to-white/[0.03] border border-white/15 hover:border-[#C75B32]/60 text-white font-mono text-xs tracking-wider flex items-center gap-1.5 transition-all active:scale-95 group shadow-sm"
              title="Copy link to explore the 3D Desktop edition"
            >
              <Monitor className="w-3 h-3 text-[#C75B32]" />
              <span className="text-[11px]">{linkCopied ? 'Copied!' : 'Desktop 3D'}</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#FFA266] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Minimal Bottom Scroll Indicator */}
          <div className="flex flex-col items-center gap-1.5 pt-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/40">
              Scroll
            </span>
            <span className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. ABOUT ME SECTION (Editorial Typography)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              About Me
            </h2>
          </div>

          {/* Display Headline */}
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
            Bridging scalable engineering with <span className="italic text-[#E88053]">intelligent</span> &amp; decentralized systems.
          </h3>

          {/* Editorial Paragraphs */}
          <div className="space-y-4 text-white/80 text-sm leading-relaxed text-justify">
            <p>
              I’m a full-stack engineer and Web3/AI builder with a relentless focus on creating resilient, user-centered digital products. I work comfortably across the entire spectrum — from designing fluid, responsive interfaces to architecting mission-critical smart contracts and backend pipelines.
            </p>
            <p>
              My core engineering focus centers on artificial intelligence, large language models, and decentralized ledger protocols. I turn complex ideas into practical implementations — whether deploying autonomous AI agents, designing fractional real estate protocols, or verifying cryptographic content provenance.
            </p>
            <p>
              Beyond the code, I thrive in high-tempo collaborative environments: competing across 25+ hackathons, securing national finalist titles at Smart India Hackathon and NIT Calicut, and spearheading developer initiatives as College Tech Hub Lead.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10">
            <div>
              <div className="text-xl font-bold text-white font-mono">25+</div>
              <div className="text-[10px] font-mono text-white/50 tracking-wider uppercase">Hackathons</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">20+</div>
              <div className="text-[10px] font-mono text-white/50 tracking-wider uppercase">Finalists</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#E88053] font-mono">01</div>
              <div className="text-[10px] font-mono text-white/50 tracking-wider uppercase">NIT Track Win</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          4. TECHNICAL EXPERTISE SECTION (Minimal Slashed Lists)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              Technical Expertise
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {/* Category 1 */}
            <div className="py-6 space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Full Stack Web</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-white/70 font-mono">
                <span>React</span>
                <span className="text-white/20">/</span>
                <span>Next.js</span>
                <span className="text-white/20">/</span>
                <span>TypeScript</span>
                <span className="text-white/20">/</span>
                <span>Tailwind CSS</span>
                <span className="text-white/20">/</span>
                <span>Node.js</span>
                <span className="text-white/20">/</span>
                <span>PostgreSQL</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="py-6 space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">AI &amp; Machine Learning</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-white/70 font-mono">
                <span>LLMs</span>
                <span className="text-white/20">/</span>
                <span>Python</span>
                <span className="text-white/20">/</span>
                <span>LangChain</span>
                <span className="text-white/20">/</span>
                <span>RAG Pipelines</span>
                <span className="text-white/20">/</span>
                <span>OpenCV</span>
                <span className="text-white/20">/</span>
                <span>C2PA Metadata</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="py-6 space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Blockchain &amp; Web3</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-white/70 font-mono">
                <span>Solidity</span>
                <span className="text-white/20">/</span>
                <span>Ethereum</span>
                <span className="text-white/20">/</span>
                <span>Hardhat</span>
                <span className="text-white/20">/</span>
                <span>Smart Contracts</span>
                <span className="text-white/20">/</span>
                <span>EVM Protocols</span>
                <span className="text-white/20">/</span>
                <span>Thirdweb</span>
              </div>
            </div>

            {/* Category 4 */}
            <div className="py-6 space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Systems &amp; Architecture</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-white/70 font-mono">
                <span>Docker</span>
                <span className="text-white/20">/</span>
                <span>Kafka</span>
                <span className="text-white/20">/</span>
                <span>Microservices</span>
                <span className="text-white/20">/</span>
                <span>CI/CD</span>
                <span className="text-white/20">/</span>
                <span>REST APIs</span>
                <span className="text-white/20">/</span>
                <span>Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5. MY PROJECTS SECTION (Minimalist Cards with Code & Live Demo Links)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="work" className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              My Projects
            </h2>
          </div>

          <div className="space-y-5">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="group p-6 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-white/25 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Number & Category */}
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-wider mb-3">
                  <span>{project.number || `0${idx + 1}`}</span>
                  <span className="text-[#C75B32] font-semibold">{project.category}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-white/70 text-xs leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 text-[10px] font-mono text-white/70 bg-white/5 rounded-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Code & Live Demo */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono font-semibold tracking-wide transition-colors"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-white/30 text-xs font-mono cursor-not-allowed"
                    >
                      <span>Private</span>
                    </button>
                  )}

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C75B32]/15 border border-[#C75B32]/30 hover:bg-[#C75B32]/30 text-white text-xs font-mono font-semibold tracking-wide transition-all"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-white/30 text-xs font-mono cursor-not-allowed"
                    >
                      <span>Demo</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5.5 PROOF OF WORK / STAGGERED GRID & DESKTOP EDITION CALLOUT
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-16 px-4 sm:px-6 border-t border-white/10 bg-[#080808] overflow-hidden">
        <div className="max-w-md mx-auto space-y-8">
          {/* Section Marker Header */}
          <div className="space-y-3 border-b border-white/15 pb-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono tracking-widest text-[#C75B32]">
                // 04 PROOF OF WORK &amp; COMMUNITY
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                21 ARCHIVED
              </span>
            </div>

            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                PROOF OF WORK
              </h2>
              <p className="text-xs text-white/60 font-light leading-relaxed mt-1.5">
                A visual archive of national hackathons, stage wins, demo days, and builder summits. Tap any photo to expand.
              </p>
            </div>
          </div>

          {/* 3-Column Staggered Waterfall Grid (Desktop StaggeredGrid adapted for Mobile) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {DESKTOP_STAGGERED_PHOTOS.filter((_, i) => i % 3 === 0).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(item)}
                  className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer shadow-sm active:scale-95 transition-all duration-300 hover:border-[#C75B32]"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-2 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-white tracking-tight line-clamp-2 leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[8px] font-mono text-[#E88053] font-semibold tracking-wider uppercase truncate mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Offset by pt-7 for authentic staggered rhythm) */}
            <div className="flex flex-col gap-2 sm:gap-2.5 pt-7">
              {DESKTOP_STAGGERED_PHOTOS.filter((_, i) => i % 3 === 1).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(item)}
                  className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer shadow-sm active:scale-95 transition-all duration-300 hover:border-[#C75B32]"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-2 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-white tracking-tight line-clamp-2 leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[8px] font-mono text-[#E88053] font-semibold tracking-wider uppercase truncate mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 (Offset by pt-3.5 for 3-way vertical wave rhythm) */}
            <div className="flex flex-col gap-2 sm:gap-2.5 pt-3.5">
              {DESKTOP_STAGGERED_PHOTOS.filter((_, i) => i % 3 === 2).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(item)}
                  className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer shadow-sm active:scale-95 transition-all duration-300 hover:border-[#C75B32]"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-2 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-white tracking-tight line-clamp-2 leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[8px] font-mono text-[#E88053] font-semibold tracking-wider uppercase truncate mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sleek, Non-Distracting Desktop Experience CTA Pill */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleCopyDesktopLink}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-[#C75B32]/10 border border-white/10 hover:border-[#C75B32]/40 text-white/80 hover:text-white font-mono text-xs transition-all active:scale-95 group shadow-sm"
            >
              <Monitor className="w-3.5 h-3.5 text-[#C75B32]" />
              <span className="text-[11px] tracking-wide">
                {linkCopied ? 'Desktop Link Copied ✓' : 'Experience in 3D on Desktop'}
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#FFA266] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Section Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
            <span>LAKSHAN GANESAN // 2026</span>
            <a href="#experience" className="text-[#E88053] hover:text-white transition-colors">
              EXPERIENCE JOURNEY ↓
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Photo Preview */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#111115] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
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

              {/* Modal Details */}
              <div className="p-4 space-y-1 bg-[#0E0E12]">
                <div className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-[#C75B32]/20 text-[#FFA266] border border-[#C75B32]/30 uppercase tracking-wider mb-1">
                  {activePhoto.tag}
                </div>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-white/70">
                  {activePhoto.event}
                </p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 mt-2">
                  <span>LOCATION: {activePhoto.location}</span>
                  <span className="text-[#C75B32]">ARCHIVE // 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────────────
          6. MY JOURNEY / EXPERIENCE TIMELINE (Vertical Left Timeline)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              My Journey
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-white/15 pl-6 ml-2 space-y-10">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Node Bullet */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#08080a] border-2 border-[#C75B32] group-hover:scale-125 transition-transform" />

                {/* Period Badge */}
                <span className="text-[11px] font-mono text-[#E88053] tracking-widest uppercase block mb-1">
                  {exp.year}
                </span>

                {/* Role in Serif Font */}
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  {exp.role}
                </h3>

                {/* Company Name */}
                <p className="text-white/60 text-xs font-medium mb-3">
                  {exp.company}
                </p>

                {/* Description */}
                <p className="text-white/70 text-xs leading-relaxed text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          7. RECOGNITION & MILESTONES (Clean Stat Badges)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              Key Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {PORTFOLIO_DATA.achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-4"
              >
                <div className="text-lg font-mono font-bold text-[#E88053] flex-shrink-0 pt-0.5">
                  {item.stat}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {item.label}
                    </h4>
                    {item.tag && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#C75B32]/20 text-[#E88053] border border-[#C75B32]/30">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. CONTACT SECTION ("Let's start a project together")
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 px-5 border-t border-white/10 bg-[#08080a]">
        <div className="max-w-md mx-auto space-y-8">
          {/* Section Marker */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C75B32]" />
            <h2 className="text-xs font-mono font-semibold text-white/60 uppercase tracking-widest">
              Contact
            </h2>
          </div>

          {/* Editorial Headline from Reference Site */}
          <div className="space-y-3">
            <h2 className="font-serif text-5xl sm:text-6xl leading-[0.95] text-white">
              Let&apos;s start <br />
              a <span className="italic text-white/90">project</span> <br />
              together.
            </h2>
            <p className="font-serif text-xl sm:text-2xl italic text-white/60 flex items-center gap-2">
              <span>or just say Hello :)</span>
              <ArrowUpRight className="w-5 h-5 text-[#E88053]" />
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              aria-label="X / Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Minimal Form */}
          <form onSubmit={handleContactSubmit} className="space-y-4 pt-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border border-white/20 focus:border-[#C75B32] px-4 py-3 text-sm text-white placeholder:text-white/30 rounded-lg outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border border-white/20 focus:border-[#C75B32] px-4 py-3 text-sm text-white placeholder:text-white/30 rounded-lg outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border border-white/20 focus:border-[#C75B32] px-4 py-3 text-sm text-white placeholder:text-white/30 rounded-lg outline-none resize-none transition-colors"
              />
            </div>

            {submitted ? (
              <div className="p-3 rounded-lg bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Redirecting to your mail client... Thanks for reaching out!</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-white text-black font-mono font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#C75B32] hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Opening Mail...' : 'Send Message'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Direct Email Card */}
          <div className="pt-2 text-center">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-xs font-mono text-white/50 hover:text-[#E88053] transition-colors"
            >
              Direct: {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          9. MINIMAL MOBILE FOOTER
      ────────────────────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-5 border-t border-white/5 bg-[#050505] text-center text-xs font-mono text-white/40 space-y-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <span>© 2026 LAKSHAN GANESAN</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
        <p className="text-[10px] text-white/30">
          Coimbatore, India • Available for select projects
        </p>
      </footer>
    </div>
  );
};

export default MobilePortfolio;
