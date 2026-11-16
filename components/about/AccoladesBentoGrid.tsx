'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Globe, Award, ShieldCheck, Monitor, Zap, Terminal, Activity, ArrowUpRight, Cpu } from 'lucide-react';
import { HiddenClueWord } from '@/components/cipher/HiddenClueWord';
import { cn } from '@/lib/utils';

interface InteractiveBentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const InteractiveBentoCard: React.FC<InteractiveBentoCardProps> = ({
  children,
  className,
  glowColor = 'rgba(232, 128, 83, 0.2)',
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle Apple 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -3.5;
    const tiltY = ((x - centerX) / centerX) * 3.5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={cn(
        'relative bg-[#090A0E]/85 hover:bg-[#11131A]/95 border border-white/[0.09] hover:border-[#FFA266]/60 rounded-2xl xl:rounded-3xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.22)] group overflow-hidden flex flex-col justify-between text-left will-change-transform',
        className
      )}
    >
      {/* Top Specular Hairline Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 75%)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-3.5 xl:p-4">
        {children}
      </div>
    </div>
  );
};

export const AccoladesBentoGrid: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-2 sm:space-y-2.5 lg:space-y-3">
      {/* Bento Layout: Row 1 (Two Hero Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 lg:gap-3.5">
        {/* CARD 1: 1st Place Track Winner NIT Calicut (Span 7) */}
        <InteractiveBentoCard className="lg:col-span-7 min-h-[190px] xl:min-h-[205px]">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E88053]/15 border border-[#E88053]/40 shadow-[0_0_12px_rgba(232,128,83,0.25)]">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFA266]" />
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                1ST PLACE TRACK WINNER
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/90 font-semibold tracking-wider">
                NIT CALICUT
              </span>
              <span className="text-[9px] font-mono text-white/35 font-bold">[01 // EVM]</span>
            </div>
          </div>

          {/* Card Middle: Split Content + Protocol Vault Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-2 items-center">
            {/* Left Column: Description & Metric */}
            <div className="sm:col-span-7 space-y-1 sm:space-y-1.5">
              <h3 className="text-sm sm:text-base xl:text-lg font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight flex items-center gap-2">
                <span>Build On Chain @ NIT Calicut</span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#FFA266]/10 text-[#FFA266] border border-[#FFA266]/20">
                  36H MARATHON
                </span>
              </h3>
              <p className="text-[10.5px] sm:text-[11px] xl:text-[12px] text-white/75 font-sans leading-relaxed line-clamp-3">
                Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour hackathon sprint, placing 1st against top national university engineering teams.
              </p>
            </div>

            {/* Right Column: Live Simulated EVM Vault Terminal Widget */}
            <div className="sm:col-span-5 bg-black/55 border border-white/[0.08] rounded-xl p-2.5 font-mono text-[9px] text-white/80 space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-[8px] text-white/40 pb-1 border-b border-white/[0.06]">
                <span className="flex items-center gap-1 text-[#FFA266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFA266] animate-ping" />
                  VAULT PROTOCOL
                </span>
                <span>BLOCK #894,201</span>
              </div>

              {/* Protocol Flow SVG */}
              <div className="flex items-center justify-between gap-1 text-[8.5px] pt-0.5">
                <div className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-white/90">
                  TOKENIZE
                </div>
                <div className="text-[#FFA266] animate-pulse">───►</div>
                <div className="px-1.5 py-0.5 rounded bg-[#FFA266]/15 border border-[#FFA266]/30 text-[#FFA266] font-bold">
                  YIELD VAULT
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[8px] text-white/50">
                <span>GAS: 21.4 GWEI</span>
                <span className="text-emerald-400 font-bold">AUDIT: 100% PASS</span>
              </div>
            </div>
          </div>

          {/* Footer Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/[0.06] font-mono text-[8.5px] sm:text-[9px]">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              Solidity
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              EVM Smart Contracts
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              Automated Vaults
            </span>
            <span className="ml-auto text-[8.5px] text-[#FFA266] font-mono hidden sm:inline flex items-center gap-1">
              <span>EXPLORE CONTRACT</span>
              <ArrowUpRight className="w-2.5 h-2.5 inline" />
            </span>
          </div>
        </InteractiveBentoCard>

        {/* CARD 2: Smart India Hackathon (Span 5) */}
        <InteractiveBentoCard className="lg:col-span-5 min-h-[190px] xl:min-h-[205px]">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.15] shadow-sm">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFA266]" />
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                NATIONAL STAGE FINALIST
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/90 font-semibold tracking-wider">
                GOVT. OF INDIA
              </span>
              <span className="text-[9px] font-mono text-white/35 font-bold">[02 // SIH]</span>
            </div>
          </div>

          {/* Middle: Title, Radar Scanner & Story */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 py-2 items-center">
            <div className="sm:col-span-7 space-y-1">
              <h3 className="text-sm sm:text-base xl:text-lg font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight flex items-center gap-2">
                <span>Smart India Hackathon</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-white/90 border border-white/[0.12]">
                  TOP 0.01%
                </span>
              </h3>
              <p className="text-[10.5px] sm:text-[11px] xl:text-[12px] text-white/75 font-sans leading-relaxed line-clamp-3">
                Selected among tens of thousands of nationwide applicants in India’s premier national hackathon, engineering software solutions for large-scale public infrastructure.
              </p>
            </div>

            {/* Simulated National Geographic Radar Scanner */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-black/55 border border-white/[0.08]">
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Concentric Radar Rings */}
                <div className="absolute inset-0 rounded-full border border-white/[0.1]" />
                <div className="absolute inset-2 rounded-full border border-white/[0.15]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-[#FFA266]/40 animate-spin" style={{ animationDuration: '8s' }} />

                {/* Rotating Radar Sweep Line */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,162,102,0.35)_360deg)] animate-spin" style={{ animationDuration: '3s' }} />

                {/* Center Node */}
                <div className="w-2 h-2 rounded-full bg-[#FFA266] shadow-[0_0_8px_#FFA266]" />
              </div>
              <span className="text-[8px] font-mono text-white/50 tracking-widest mt-1">
                DELHI // 28.61°N, 77.20°E
              </span>
            </div>
          </div>

          {/* Footer Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/[0.06] font-mono text-[8.5px] sm:text-[9px]">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              National Stage
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              Public Infrastructure
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 group-hover:border-[#FFA266]/30 transition-colors">
              50K+ Applicants
            </span>
          </div>
        </InteractiveBentoCard>
      </div>

      {/* Bento Layout: Row 2 (Three Distinct Engineering Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3.5">
        {/* CARD 3: Campus Tech Lead */}
        <InteractiveBentoCard className="min-h-[160px] xl:min-h-[175px]">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                <Award className="w-3 h-3 text-[#FFA266]" />
                <span>LEADERSHIP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-white/[0.06] border border-white/[0.08] text-[8.5px] font-mono text-white/80">
                  200+ BUILDERS
                </span>
                <span className="text-[8.5px] font-mono text-white/25">[03]</span>
              </div>
            </div>

            {/* Title & Body */}
            <div>
              <h4 className="text-xs sm:text-sm xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                Tech Hub Lead &amp; Ambassador
              </h4>
              <p className="text-[10px] sm:text-[10.5px] xl:text-[11.5px] text-white/70 font-sans leading-relaxed line-clamp-2 mt-0.5">
                Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
              </p>
            </div>

            {/* Mini Workshop Terminal Telemetry */}
            <div className="bg-black/50 border border-white/[0.06] rounded-lg px-2.5 py-1.5 font-mono text-[8px] sm:text-[8.5px] text-white/60 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#FFA266]">
                <Terminal className="w-2.5 h-2.5" />
                <span>$ deploy workshop --students=200+</span>
              </span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
          </div>
        </InteractiveBentoCard>

        {/* CARD 4: Uniswap v4 & OpenLedger */}
        <InteractiveBentoCard className="min-h-[160px] xl:min-h-[175px]">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-[#FFA266]" />
                <span>RESEARCH</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-[#FFA266]/10 border border-[#FFA266]/20 text-[8.5px] font-mono text-[#FFA266]">
                  v4 HOOKS
                </span>
                <span className="text-[8.5px] font-mono text-white/25">[04]</span>
              </div>
            </div>

            {/* Title & Body */}
            <div>
              <h4 className="text-xs sm:text-sm xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                Uniswap v4 &amp; OpenLedger
              </h4>
              <p className="text-[10px] sm:text-[10.5px] xl:text-[11.5px] text-white/70 font-sans leading-relaxed line-clamp-2 mt-0.5">
                Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
              </p>
            </div>

            {/* Visual AMM Curve Widget */}
            <div className="bg-black/50 border border-white/[0.06] rounded-lg px-2.5 py-1.5 font-mono text-[8px] sm:text-[8.5px] flex items-center justify-between">
              <span className="text-white/50">AMM: x * y = k</span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-white/[0.08] text-[#FFA266] font-bold">
                  beforeSwap()
                </span>
                <span className="text-white/30">/</span>
                <span className="px-1.5 py-0.2 rounded bg-white/[0.08] text-white/70">
                  afterSwap()
                </span>
              </div>
            </div>
          </div>
        </InteractiveBentoCard>

        {/* CARD 5: International Silambam Medalist */}
        <InteractiveBentoCard className="min-h-[160px] xl:min-h-[175px]">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
                <Monitor className="w-3 h-3 text-[#FFA266]" />
                <HiddenClueWord word="DISCIPLINE" clueIndex={2} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-amber-700/30 to-amber-500/30 border border-amber-500/40 text-[8.5px] font-mono text-amber-300 font-bold">
                  BRONZE MEDAL
                </span>
                <span className="text-[8.5px] font-mono text-white/25">[05]</span>
              </div>
            </div>

            {/* Title & Body */}
            <div>
              <h4 className="text-xs sm:text-sm xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
                International Silambam Medalist
              </h4>
              <p className="text-[10px] sm:text-[10.5px] xl:text-[11.5px] text-white/70 font-sans leading-relaxed line-clamp-2 mt-0.5">
                Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and{' '}
                <HiddenClueWord word="discipline" clueIndex={2} /> that directly shape my engineering stamina.
              </p>
            </div>

            {/* Kinetic Stamina Telemetry Widget */}
            <div className="bg-black/50 border border-white/[0.06] rounded-lg px-2.5 py-1.5 font-mono text-[8px] sm:text-[8.5px] flex items-center justify-between text-white/60">
              <span className="flex items-center gap-1 text-amber-300">
                <Activity className="w-2.5 h-2.5" />
                <span>REACTION: &lt;120MS</span>
              </span>
              <span className="text-white/40">MARTIAL ART // ENDURANCE</span>
            </div>
          </div>
        </InteractiveBentoCard>
      </div>
    </div>
  );
};

export default AccoladesBentoGrid;
