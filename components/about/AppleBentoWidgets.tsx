'use client';

import React from 'react';
import { Trophy, Globe, Award, ShieldCheck, Zap, ArrowUpRight, Flame } from 'lucide-react';
import { HiddenClueWord } from '@/components/cipher/HiddenClueWord';
import { cn } from '@/lib/utils';

// Helper for dynamic spotlight cursor without React state re-renders
const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

/* -------------------------------------------------------------------------
 * 1. Championship Arc Gauge Widget (Build On Chain @ NIT Calicut)
 * Matches the 1,324.32 Circular Arc Speedometer from the reference image
 * ------------------------------------------------------------------------- */
export const ChampionshipArcGaugeWidget: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      onMouseMove={handleCardMouseMove}
      className={cn(
        'relative p-4 sm:p-5 xl:p-6 bg-[#0E0F15]/90 hover:bg-[#131520]/95 border border-white/[0.08] hover:border-[#FFA266]/55 rounded-[24px] xl:rounded-[28px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.22)] transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left will-change-transform hover:-translate-y-1',
        className
      )}
    >
      {/* Top Specular Hairline Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Dynamic Cursor Spotlight via CSS Variables */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(232, 128, 83, 0.18), transparent 80%)`,
        }}
      />

      <div className="relative z-10 space-y-3 sm:space-y-3.5">
        {/* Header: Trophy Chip + NIT Calicut Badge */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E88053]/15 border border-[#FFA266]/40 shadow-[0_0_16px_rgba(232,128,83,0.25)]">
            <Trophy className="w-3.5 h-3.5 text-[#FFA266]" />
            <span className="text-[9.5px] sm:text-[10.5px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
              1ST PLACE TRACK WINNER
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/90 font-semibold tracking-wider">
              NIT CALICUT
            </span>
            <span className="text-[9.5px] font-mono text-white/30 hidden sm:inline">[01 // EVM]</span>
          </div>
        </div>

        {/* Title & 36H Marathon Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-base sm:text-lg xl:text-xl font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
            Build On Chain @ NIT Calicut
          </h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] text-[9.5px] font-mono text-[#FFA266] font-medium w-fit">
            <Zap className="w-3 h-3 text-[#FFA266]" /> 36H CODE SPRINT
          </span>
        </div>

        {/* Narrative */}
        <p className="text-[11.5px] sm:text-xs xl:text-[13px] text-white/80 font-sans leading-relaxed">
          Architected an audited on-chain tokenization protocol and automated liquidity vault under a grueling 36-hour sprint, placing 1st against top national university engineering teams.
        </p>

        {/* Focal Point: Apple Circular Arc Gauge + Architectural Proof Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-white/[0.06]">
          {/* Apple Arc Speedometer Gauge (Matching 1,324.32 in Reference Image) */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/[0.06] relative overflow-hidden">
            <div className="relative w-28 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gaugeGreenGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#FFA266" />
                  </linearGradient>
                </defs>
                {/* Background Track Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  strokeDasharray="238.7"
                  strokeDashoffset="59.6"
                  strokeLinecap="round"
                />
                {/* Active Progress Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="url(#gaugeGreenGold)"
                  strokeWidth="8"
                  strokeDasharray="238.7"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000"
                />
              </svg>
              {/* Metric in Arc Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#10B981] tracking-tight group-hover:scale-105 transition-transform">
                  #1
                </span>
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-white/50">
                  RANK
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-between px-2 text-[8px] font-mono text-white/50 border-t border-white/[0.04] pt-1">
              <span>AUDIT: 100%</span>
              <span className="text-[#10B981] font-bold">100+ TEAMS</span>
            </div>
          </div>

          {/* Proof Badges List */}
          <div className="sm:col-span-7 space-y-1.5">
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] font-mono text-white/50 uppercase">Contract</span>
              <span className="text-[11px] font-bold text-white font-mono">Tokenized Yield Vault</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] font-mono text-white/50 uppercase">Security Audit</span>
              <span className="text-[11px] font-bold text-[#10B981] font-mono">100% Zero Vulnerabilities</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] font-mono text-white/50 uppercase">Execution</span>
              <span className="text-[11px] font-bold text-[#FFA266] font-mono">36h Live Deploy</span>
            </div>
          </div>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.08] font-mono text-[9px]">
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85 group-hover:border-[#FFA266]/35 transition-colors">Solidity</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85 group-hover:border-[#FFA266]/35 transition-colors">EVM Smart Contracts</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85 group-hover:border-[#FFA266]/35 transition-colors">Foundry</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85 group-hover:border-[#FFA266]/35 transition-colors">DeFi Vaults</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * 2. National Stage Milestone Timeline Widget (Smart India Hackathon)
 * Matches the UP NEXT EVENT timeline and TODAY SPENDING segmented progress
 * ------------------------------------------------------------------------- */
export const NationalTimelineWidget: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      onMouseMove={handleCardMouseMove}
      className={cn(
        'relative p-4 sm:p-5 xl:p-6 bg-[#0E0F15]/90 hover:bg-[#131520]/95 border border-white/[0.08] hover:border-[#FFA266]/55 rounded-[24px] xl:rounded-[28px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.22)] transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left will-change-transform hover:-translate-y-1',
        className
      )}
    >
      {/* Top Specular Hairline Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Dynamic Cursor Spotlight via CSS Variables */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 space-y-3 sm:space-y-3.5">
        {/* Header: Finalist Chip + Govt. of India Badge */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.18] shadow-sm">
            <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[9.5px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider">
              NATIONAL STAGE FINALIST
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/90 font-semibold tracking-wider">
              GOVT. OF INDIA
            </span>
            <span className="text-[9.5px] font-mono text-white/30 hidden sm:inline">[02 // SIH]</span>
          </div>
        </div>

        {/* Title & Key Stat Highlight */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-base sm:text-lg xl:text-xl font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
            Smart India Hackathon
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[9.5px] font-mono text-[#34D399] font-bold w-fit">
            ● TOP 0.01% NATIONWIDE
          </span>
        </div>

        {/* Descriptive Narrative */}
        <p className="text-[11.5px] sm:text-xs xl:text-[13px] text-white/80 font-sans leading-relaxed">
          Selected among tens of thousands of nationwide applicants in India’s premier national hackathon, engineering software solutions for national public infrastructure challenges.
        </p>

        {/* Apple Segmented Progress Bar & Multi-Tier Timeline (Matching Reference Image) */}
        <div className="space-y-2 pt-1 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-[9px] font-mono text-white/60">
            <span>SELECTION FUNNEL PROGRESSION</span>
            <span className="text-white font-bold">50,000+ ➔ GRAND FINALE</span>
          </div>

          {/* Segmented Color Track */}
          <div className="w-full h-3 rounded-full bg-white/[0.06] p-0.5 flex items-center gap-1 overflow-hidden">
            <div className="h-full rounded-full bg-[#FFA266] w-[45%]" title="Phase 1: 50,000+ Screening" />
            <div className="h-full rounded-full bg-[#38BDF8] w-[35%]" title="Phase 2: Zonal Prototype" />
            <div className="h-full rounded-full bg-[#10B981] w-[20%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" title="Phase 3: National Grand Finale" />
          </div>

          {/* Timeline Phase Dots */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-left">
            <div className="p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[8px] font-mono text-[#FFA266] uppercase font-bold">● PHASE 1</div>
              <div className="text-[10px] font-bold text-white font-mono mt-0.5">50K+ Ingest</div>
            </div>
            <div className="p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[8px] font-mono text-[#38BDF8] uppercase font-bold">● PHASE 2</div>
              <div className="text-[10px] font-bold text-white font-mono mt-0.5">Zonal Lead</div>
            </div>
            <div className="p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[8px] font-mono text-[#10B981] uppercase font-bold">● FINALE</div>
              <div className="text-[10px] font-bold text-[#10B981] font-mono mt-0.5">Min. of Edu</div>
            </div>
          </div>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.08] font-mono text-[9px]">
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85">Public Infrastructure</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85">High-Throughput Systems</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/85">National Finalist</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * 3. Builder Activity Equalizer Widget (Tech Hub Lead & Campus Ambassador)
 * Matches the M T W T F S S Vertical Bar Chart from the reference image
 * ------------------------------------------------------------------------- */
export const BuilderEqualizerWidget: React.FC<{ className?: string }> = ({ className }) => {
  const bars = [
    { day: 'M', height: 35, active: false },
    { day: 'T', height: 48, active: false },
    { day: 'W', height: 70, active: false },
    { day: 'T', height: 40, active: false },
    { day: 'F', height: 85, active: true },
    { day: 'S', height: 100, active: true },
    { day: 'S', height: 60, active: false },
  ];

  return (
    <div
      onMouseMove={handleCardMouseMove}
      className={cn(
        'relative p-4 sm:p-4.5 xl:p-5 bg-[#0E0F15]/90 hover:bg-[#131520]/95 border border-white/[0.08] hover:border-[#FFA266]/55 rounded-[22px] xl:rounded-[26px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.2)] transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left will-change-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
          <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#FFA266]" /> LEADERSHIP
          </div>
          <span className="text-[9.5px] font-mono text-white/30">[03]</span>
        </div>

        <h4 className="text-sm sm:text-[15px] xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
          Tech Hub Lead &amp; Ambassador
        </h4>

        <p className="text-[10.5px] sm:text-[11px] xl:text-xs text-white/75 font-sans leading-relaxed">
          Leading hands-on Web3, AI, and developer workshops for 200+ students, mentoring junior builders, and driving university technical initiatives.
        </p>

        {/* Weekly Equalizer Bar Chart Component (Matching reference image M T W T F S S) */}
        <div className="p-2.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-[8.5px] font-mono text-white/50">
            <span>WEEKLY WORKSHOP VELOCITY</span>
            <span className="text-[#10B981] font-bold">200+ BUILDERS</span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-12 pt-1 px-1">
            {bars.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'w-full rounded-t-sm transition-all duration-300',
                    bar.active
                      ? 'bg-gradient-to-t from-[#10B981] to-[#34D399] shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                      : 'bg-white/20 group-hover:bg-white/30'
                  )}
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-[8px] font-mono text-white/50">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/[0.06] font-mono text-[8.5px]">
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">Web3 Workshops</span>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">Mentorship</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * 4. Liquidity Waveform Widget (Uniswap v4 & OpenLedger)
 * Matches the NOW PLAYING / WAVEFORM audio player widget from reference
 * ------------------------------------------------------------------------- */
export const LiquidityWaveformWidget: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      onMouseMove={handleCardMouseMove}
      className={cn(
        'relative p-4 sm:p-4.5 xl:p-5 bg-[#0E0F15]/90 hover:bg-[#131520]/95 border border-white/[0.08] hover:border-[#FFA266]/55 rounded-[22px] xl:rounded-[26px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.2)] transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left will-change-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
          <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFA266]" /> PROTOCOL RESEARCH
          </div>
          <span className="text-[9.5px] font-mono text-white/30">[04]</span>
        </div>

        <h4 className="text-sm sm:text-[15px] xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
          Uniswap v4 &amp; OpenLedger
        </h4>

        <p className="text-[10.5px] sm:text-[11px] xl:text-xs text-white/75 font-sans leading-relaxed">
          Selected for the Uniswap v4 Hook Incubator cohort and collaborating on decentralized AI data pipelines and automated liquidity research.
        </p>

        {/* AMM Liquidity Waveform visualizer (Matching Audio Player from Reference) */}
        <div className="p-2.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-1.5">
          <div className="flex items-center justify-between text-[8.5px] font-mono text-white/50">
            <span>AMM BONDING WAVEFORM</span>
            <span className="text-[#38BDF8] font-bold">HOOK: ACTIVE</span>
          </div>

          <div className="relative w-full h-10 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 40" fill="none">
              <defs>
                <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA266" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path
                d="M0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20"
                stroke="url(#waveGlow)"
                strokeWidth="2.5"
                fill="none"
                className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              />
              {/* Dynamic Hook Intercept Nodes */}
              <circle cx="50" cy="20" r="3.5" fill="#FFA266" className="animate-ping" />
              <circle cx="150" cy="20" r="3.5" fill="#10B981" className="animate-pulse" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-white/40">
            <span>beforeSwap()</span>
            <span className="text-[#FFA266]">v4 INCUBATOR</span>
            <span>afterSwap()</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/[0.06] font-mono text-[8.5px]">
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">v4 Liquidity Hooks</span>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">Decentralized AI</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * 5. Stamina Battery Capsule Widget (International Silambam Medalist)
 * Matches the Vertical Green Battery Capsule Widget from the reference image
 * ------------------------------------------------------------------------- */
export const StaminaBatteryWidget: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      onMouseMove={handleCardMouseMove}
      className={cn(
        'relative p-4 sm:p-4.5 xl:p-5 bg-[#0E0F15]/90 hover:bg-[#131520]/95 border border-white/[0.08] hover:border-[#FFA266]/55 rounded-[22px] xl:rounded-[26px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_25px_60px_rgba(232,128,83,0.2)] transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left will-change-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-60 group-hover:via-[#FFA266]/80 transition-opacity duration-300 pointer-events-none z-10" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
          <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#FFA266]" /> <HiddenClueWord word="DISCIPLINE" clueIndex={2} />
          </div>
          <span className="text-[9.5px] font-mono text-white/30">[05]</span>
        </div>

        <h4 className="text-sm sm:text-[15px] xl:text-base font-bold font-sans text-white group-hover:text-[#FFA266] transition-colors tracking-tight">
          International Silambam Medalist
        </h4>

        <p className="text-[10.5px] sm:text-[11px] xl:text-xs text-white/75 font-sans leading-relaxed">
          Bronze Medalist at the International Silambam Championship. Physical mastery, precise execution, and{' '}
          <HiddenClueWord word="discipline" clueIndex={2} /> that directly shape my engineering stamina.
        </p>

        {/* High-Voltage Battery Capsule Component (Matching Apple Battery Widget) */}
        <div className="p-2.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
          {/* Apple Vertical Battery Pill with Lightning Bolt */}
          <div className="relative w-10 h-14 rounded-xl bg-white/[0.08] border border-white/20 p-1 flex flex-col justify-end overflow-hidden shrink-0">
            <div className="w-full h-full rounded-lg bg-gradient-to-t from-[#10B981] via-[#34D399] to-[#FFA266] flex flex-col items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)]">
              <Zap className="w-4 h-4 text-white fill-white animate-pulse" />
            </div>
            {/* Battery Terminal Cap */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-t bg-white/40" />
          </div>

          <div className="space-y-0.5 flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-mono text-white/50">STAMINA LEVEL</span>
              <span className="text-[10.5px] font-mono font-bold text-[#10B981]">100% MAXIMUM</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono">
              &lt;120ms Reaction Speed
            </div>
            <div className="text-[8.5px] font-mono text-[#FFA266]">
              BRONZE MEDAL // GLOBAL STAGE
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/[0.06] font-mono text-[8.5px]">
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">Physical Mastery</span>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/80">Engineering Stamina</span>
        </div>
      </div>
    </div>
  );
};
