'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
import { TechText } from '@/components/ui/TechText';
import { ShinyText } from '@/components/ui/ShinyText';
import { CyberGridBackground } from './CyberGridBackground';
import { DevCodeTerminal } from './DevCodeTerminal';
import { 
  ArrowRight, 
  Terminal, 
  Code2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Boxes,
  Sparkles
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export const HeroSection: React.FC = () => {
  const techPills = [
    { label: 'Next.js 14', color: 'border-white/15 text-white/90' },
    { label: 'TypeScript', color: 'border-[#38BDF8]/30 text-[#38BDF8]' },
    { label: 'Python / AI', color: 'border-[#FBBF24]/30 text-[#FBBF24]' },
    { label: 'Solidity / Web3', color: 'border-[#FFA266]/40 text-[#FFA266]' },
    { label: 'Tailwind CSS', color: 'border-[#2DD4BF]/30 text-[#2DD4BF]' },
    { label: 'Docker', color: 'border-[#818CF8]/30 text-[#818CF8]' },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-6 sm:px-10 lg:px-14 bg-[#050505] overflow-hidden select-none">
      
      {/* Modern Developer Blueprint Matrix & Dynamic Particle Atmosphere */}
      <CyberGridBackground />

      {/* Main Hero Content: Left Details & Right Interactive Dev Terminal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* =====================================================================
            LEFT COLUMN: DEVELOPER IDENTITY, HEADLINE & ACTIONS
        ===================================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-center space-y-5 text-left">
          
          {/* Top Status & Availability Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Availability Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400 tracking-wider shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>AVAILABLE FOR SELECT ROLES</span>
            </div>

            {/* Subtitle Badge with Metallic Sheen */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#C75B32]/40 text-xs font-mono tracking-widest uppercase shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
              <ShinyText
                text="FULL STACK • AI & BLOCKCHAIN"
                color="#E88053"
                shineColor="#FFA266"
                speed={2.2}
                className="font-medium text-[11px]"
              />
            </div>
          </div>

          {/* Main Display Headline with TechText from React Bits */}
          <div className="w-full space-y-1 sm:space-y-2">
            <h1 className="sr-only">HELLO, I&apos;M LAKSHAN G</h1>
            
            {/* Sub-greeting with ASCII Glitch */}
            <div className="flex items-center gap-3">
              <span className="block text-white/70 font-mono font-medium text-lg xs:text-xl sm:text-2xl tracking-widest uppercase select-none">
                <AsciiGlitchRipple dur={1000} className="hover:text-[#FFA266] transition-colors">
                  HELLO, I&apos;M
                </AsciiGlitchRipple>
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-[#E88053]/60 to-transparent" />
            </div>

            {/* Interactive Vector Dash TechText Wordmark */}
            <div className="w-full h-24 xs:h-28 sm:h-32 md:h-36 lg:h-36 xl:h-40 relative -ml-1 sm:-ml-2">
              <TechText
                text="LAKSHAN G"
                align="left"
                fontWeight={900}
                fontSize={135}
                color="#FFFFFF"
                accentColor="#E88053"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                draggable
                guides={false}
              />
            </div>
          </div>

          {/* Clean Engineering Statement Card */}
          <div className="relative p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#E88053] border-y border-r border-white/[0.08] backdrop-blur-xl shadow-2xl max-w-xl">
            <p className="text-xs sm:text-[13px] font-mono tracking-wide text-white/85 leading-relaxed">
              Architecting scalable full-stack web applications, intelligent AI features, and blockchain protocols at the edge of code and intelligence.
            </p>
          </div>

          {/* Modern Tech Stack Micro-Chips */}
          <div className="space-y-2 w-full max-w-xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
              <Code2 className="w-3 h-3 text-[#E88053]" />
              <span>CORE TECHNICAL ARSENAL</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {techPills.map((pill, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-md bg-white/[0.03] border ${pill.color} text-[11px] font-mono tracking-wider backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:scale-105 select-none`}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Floating Action CTA Buttons & Quick Social Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            {/* Primary Resume Button */}
            <a
              href="/Lakshan_Resume copy.pdf"
              download="Lakshan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black font-mono font-bold text-xs tracking-wider rounded-full hover:bg-[#FFA266] hover:text-black hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center space-x-2 text-center group"
              data-cursor="RESUME"
            >
              <span>▶ DOWNLOAD RESUME</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Contact Button */}
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="px-6 py-3 bg-white/[0.05] border border-white/20 text-white font-mono text-xs tracking-wider rounded-full hover:bg-white/[0.1] hover:border-[#FFA266]/50 transition-all backdrop-blur-md text-center justify-center flex items-center shadow-lg hover:shadow-[#E88053]/20"
              data-cursor="CONTACT"
            >
              <span>GET IN TOUCH</span>
            </a>

            {/* Quick Social Icon Links */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#FFA266] hover:bg-white/[0.08] transition-all"
                title="GitHub Profile"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#FFA266] hover:bg-white/[0.08] transition-all"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#FFA266] hover:bg-white/[0.08] transition-all"
                title="X (Twitter) Profile"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* =====================================================================
            RIGHT COLUMN: INTERACTIVE LIVE DEV TERMINAL & ARCHITECTURE CONSOLE
        ===================================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center lg:justify-end">
          <DevCodeTerminal />
        </div>

      </div>

      {/* =====================================================================
          BOTTOM HERO TELEMETRY BAR & SCROLL INDICATOR
      ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/50 tracking-wider">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88053]" />
            LKG // 2026
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-white/60">
            LOCATION: COIMBATORE &amp; BENGALURU, IN
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-white/60">
            FOCUS: AI SYSTEMS • WEB3 PROTOCOLS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#FFA266] hover:text-white transition-colors cursor-pointer shrink-0">
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
          <span className="animate-bounce text-xs">↓</span>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
