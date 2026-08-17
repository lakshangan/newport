'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

// Dynamic import with SSR false for R3F atmospheric scene
const HeroScene = dynamic(() => import('../3d/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
});

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-between pt-32 pb-16 px-6 bg-[#080808]">
      {/* 3D Atmospheric Background Layer */}
      <HeroScene />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Minimal Developer Branding */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-[#111111] border border-[#242424] text-xs font-mono text-[#8E8B85]">
              <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
              <span>STATUS: 0x_ONLINE // COIMBATORE, IN</span>
            </div>

            {/* Clean Razor-Sharp Title */}
            <div className="space-y-2">
              <h1 className="font-display text-6xl sm:text-8xl lg:text-[7rem] font-extrabold tracking-tight uppercase text-[#E8E5DF] leading-[0.9]">
                LAKSHAN <br />
                <span className="text-[#C75B32]">GANESAN</span>
              </h1>
              <p className="font-mono text-sm sm:text-base text-[#8E8B85] tracking-wide pt-1">
                CREATIVE DEVELOPER & WEB3 RESEARCH ANALYST
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-base sm:text-lg font-light text-[#8E8B85] max-w-xl leading-relaxed">
              Engineering EVM smart contract protocols, cryptographic provenance systems, autonomous AI agents, and high-performance web applications.
            </p>

            {/* Minimal Developer CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#work"
                className="px-7 py-3.5 bg-[#C75B32] text-white font-mono text-xs tracking-widest hover:bg-[#E06D43] transition-colors"
                data-cursor="WORK"
              >
                VIEW WORK ↗
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="px-7 py-3.5 border border-[#242424] text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#E8E5DF] transition-colors"
                data-cursor="CONTACT"
              >
                GET IN TOUCH
              </a>
            </div>

          </div>

          {/* Right Column: Clean Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[3/4] border border-[#242424] bg-[#111111] overflow-hidden group shadow-2xl">
              <Image
                src="/images/hero_portrait.jpg"
                alt="Lakshan Ganesan Studio Portrait"
                fill
                priority
                className="object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#080808]/90 border border-[#242424] flex justify-between items-center text-[10px] font-mono text-[#8E8B85]">
                <span>LAKSHAN GANESAN</span>
                <span className="text-[#C75B32]">DEVELOPER</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Telemetry Row */}
      <div className="max-w-7xl mx-auto w-full border-t border-[#242424] pt-6 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#8E8B85] gap-4 relative z-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>PORTFOLIO // 2026</span>
          <span>•</span>
          <span>DISCIPLINE: BLOCKCHAIN / AI</span>
          <span>•</span>
          <span>HANDLE: LKG // 001</span>
        </div>
        <a href="#about" className="text-[#C75B32] hover:underline">
          SCROLL ↓
        </a>
      </div>
    </section>
  );
};
