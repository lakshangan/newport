'use client';

import React from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 bg-[#08080a] overflow-hidden select-none">
      
      {/* Warm Ambient Volumetric Spotlight Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#C75B32]/45 via-amber-700/20 to-transparent rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Top HUD Telemetry Metadata Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex justify-between items-start text-[11px] font-mono text-white/50 tracking-wider">
        <div className="space-y-0.5">
          <div>TCR 01:04:32:15</div>
          <div>REC 23.976 FPS</div>
        </div>

        <div className="space-y-0.5 text-right">
          <div>ISO 800</div>
          <div>5600K</div>
        </div>
      </div>

      {/* Right Edge Vertical Scroll Indicator */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 tracking-widest uppercase origin-bottom -rotate-90 z-20">
        SCROLL ↓
      </div>

      {/* Main Center Content: Dual-Tone Outlined Typography & Portrait */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-center py-6">
        
        {/* Left Side Typography */}
        <div className="z-20 text-center lg:text-left space-y-0 -mb-4 lg:mb-0 lg:-mr-12">
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[7.5rem] lg:text-[9.5rem] leading-[0.85] tracking-tight uppercase">
            <span className="block text-outline">HELLO</span>
            <span className="block text-white">I&apos;M</span>
          </h1>
        </div>

        {/* Center Studio Portrait */}
        <div className="relative w-[270px] sm:w-[360px] lg:w-[420px] aspect-[3/4] z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-4 lg:my-0 group">
          <Image
            src="/images/hero_portrait.jpg"
            alt="Lakshan Ganesan Studio Portrait"
            fill
            priority
            className="object-cover object-top filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-65 pointer-events-none" />
        </div>

        {/* Right Side Typography */}
        <div className="z-20 text-center lg:text-left space-y-0 -mt-4 lg:mt-0 lg:-ml-12">
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[7.5rem] lg:text-[9.5rem] leading-[0.85] tracking-tight uppercase">
            <span className="block text-white">LAKSHAN</span>
            <span className="block text-outline">GANESAN</span>
          </h1>
        </div>

      </div>

      {/* Bottom Floating Pill Action Controls */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-center space-x-4 pt-4 pb-4">
        <a
          href="#projects"
          className="px-7 py-3.5 bg-white text-black font-mono font-bold text-xs tracking-wider rounded-full hover:scale-105 transition-all shadow-2xl flex items-center space-x-2"
          data-cursor="PORTFOLIO"
        >
          <span>▶ VIEW PORTFOLIO</span>
        </a>

        <a
          href={`mailto:${PORTFOLIO_DATA.personal.email}`}
          className="px-7 py-3.5 bg-white/5 border border-white/20 text-white font-mono text-xs tracking-wider rounded-full hover:bg-white/15 transition-all backdrop-blur-md"
          data-cursor="RESUME"
        >
          <span>VIEW RESUME</span>
        </a>
      </div>

    </section>
  );
};
