'use client';

import React from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 bg-[#050505] overflow-hidden select-none">
      
      {/* Full-Screen Workspace Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/herosection.png"
          alt="Lakshan Ganesan Workspace"
          fill
          priority
          className="object-cover object-right md:object-center filter contrast-105 brightness-100"
          sizes="100vw"
        />
      </div>

      {/* Top HUD Telemetry Metadata Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex justify-between items-start text-[11px] font-mono text-white/70 tracking-wider">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span className="text-white font-semibold">DEV_ENV // ACTIVE</span>
          </div>
          <div>TCR 01:04:32:15 // REC 23.976 FPS</div>
        </div>

        <div className="space-y-0.5 text-right font-mono">
          <div className="text-[#5CE1E6] font-semibold">WEB3 &amp; AI ARCHITECT</div>
          <div>COIMBATORE, IN</div>
        </div>
      </div>

      {/* Main Left-Aligned Typography Content Over Widescreen Background */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col items-start justify-center py-6">
        <div className="max-w-3xl space-y-4 text-left">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono text-[#5CE1E6] tracking-widest uppercase">
            <span>CREATIVE DEVELOPER &amp; ANALYST</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.88] tracking-tight uppercase">
            <span className="block text-outline">HELLO I&apos;M</span>
            <span className="block text-white">LAKSHAN</span>
            <span className="block text-accent-gradient">GANESAN</span>
          </h1>

          {/* Bio Description */}
          <p className="text-xs sm:text-sm font-mono tracking-wider text-white/90 max-w-xl pt-2 leading-relaxed bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10">
            Architecting decentralized systems, smart contracts, and high-performance AI interfaces at the edge of code and intelligence.
          </p>

          {/* Floating Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
            <a
              href="#work"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-black font-mono font-bold text-xs tracking-wider rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center space-x-2 text-center"
              data-cursor="PORTFOLIO"
            >
              <span>▶ VIEW PORTFOLIO</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-full sm:w-auto px-7 py-3.5 bg-black/50 border border-white/25 text-white font-mono text-xs tracking-wider rounded-full hover:bg-black/70 transition-all backdrop-blur-md text-center justify-center flex items-center"
              data-cursor="RESUME"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Scroll Indicator */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/50 tracking-widest uppercase origin-bottom -rotate-90 z-20">
        SCROLL ↓
      </div>

    </section>
  );
};



