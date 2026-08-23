'use client';

import React from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

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
          className="object-cover object-right md:object-center filter contrast-105 brightness-105"
          sizes="100vw"
        />
      </div>

      {/* Light Ambient Overlays - keeps the workspace image bright, warm, and vivid */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080808]/50 via-transparent to-black/15 pointer-events-none" />

      {/* Clean Top Metadata Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex justify-between items-center text-[11px] font-mono tracking-wider">
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
          <span className="text-white font-semibold">DEV_ENV // ACTIVE</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-mono shadow-md">
          <span className="text-[#5CE1E6] font-semibold">WEB3 &amp; AI ARCHITECT</span>
          <span className="text-white/50">|</span>
          <span className="text-white/80">COIMBATORE, IN</span>
        </div>
      </div>

      {/* Main Left-Aligned Typography Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col items-start justify-center py-6">
        <div className="max-w-3xl space-y-5 text-left">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#5CE1E6]/30 text-xs font-mono text-[#5CE1E6] tracking-widest uppercase shadow-xl">
            <span>CREATIVE DEVELOPER &amp; ANALYST</span>
          </div>

          {/* Main Display Headline with ASCII Scramble Hover Effect */}
          <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] tracking-tight uppercase">
            <span className="block text-white/80 font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl tracking-widest mb-1 sm:mb-2">
              <AsciiGlitchRipple dur={1000} className="hover:text-[#5CE1E6] transition-colors">
                HELLO, I&apos;M
              </AsciiGlitchRipple>
            </span>
            <span className="block text-white tracking-tight drop-shadow-2xl">
              <AsciiGlitchRipple dur={1200} className="hover:text-[#C75B32] transition-colors">
                LAKSHAN GANESAN
              </AsciiGlitchRipple>
            </span>
          </h1>

          {/* Clean Bio Description */}
          <p className="text-xs sm:text-sm font-mono tracking-wider text-white/90 max-w-xl pt-2 leading-relaxed bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-2xl">
            Architecting decentralized systems, smart contracts, and high-performance AI interfaces at the edge of code and intelligence.
          </p>

          {/* Floating Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3">
            <a
              href="#work"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-black font-mono font-bold text-xs tracking-wider rounded-full hover:bg-[#5CE1E6] hover:scale-105 transition-all shadow-2xl flex items-center justify-center space-x-2 text-center"
              data-cursor="PORTFOLIO"
            >
              <span>▶ VIEW PORTFOLIO</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-full sm:w-auto px-7 py-3.5 bg-black/60 border border-white/25 text-white font-mono text-xs tracking-wider rounded-full hover:bg-black/80 hover:border-white/40 transition-all backdrop-blur-md text-center justify-center flex items-center shadow-lg"
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

export default HeroSection;



