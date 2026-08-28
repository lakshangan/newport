'use client';

import React from 'react';
import Image from 'next/image';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-14 sm:py-20 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Renaissance Artwork Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <Image
          src="/images/about section .png"
          alt="Renaissance Art Texture"
          fill
          priority
          className="object-cover object-center filter contrast-105 brightness-90"
          sizes="100vw"
        />
      </div>

      {/* Renaissance Vitruvian Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-25 pointer-events-none" />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/55 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85 pointer-events-none" />

      {/* Volumetric Warm Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-[#C75B32]/12 rounded-full blur-[140px] pointer-events-none z-2" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#5CE1E6]/8 rounded-full blur-[120px] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Compact Header */}
        <div className="space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/70 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C75B32] animate-pulse" />
            <span>01 // ABOUT THE BUILDER</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-black text-[#E8E5DF] tracking-tight leading-tight">
            Hey, I’m <span className="text-[#C75B32]">Lakshan.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-snug font-medium">
            Full-Stack Developer building applications across <span className="text-[#5CE1E6] font-bold">full-stack web</span>, <span className="text-[#E88053] font-bold">cloud backends</span>, <span className="text-[#C084FC] font-bold">AI systems</span>, and <span className="text-[#FACC15] font-bold">blockchain protocols</span>.
          </p>
        </div>

        {/* 2-Column Compact Editorial Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Left Column: Education & Philosophy */}
          <div className="p-6 sm:p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-[#5CE1E6]/40 transition-colors">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#5CE1E6] tracking-widest uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6]" />
                <span>BUILDING REAL SYSTEMS</span>
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>FIRST-PRINCIPLES ENGINEERING</AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                Studying <strong className="text-white font-semibold">Computer Technology</strong>, I focused on full-stack development enriched with AI and blockchain technologies. I turn concepts into working production products—from Next.js web applications and server backends to AI agent tools and smart contracts.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
              <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ Full-Stack Web</span>
              <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ AI Integration</span>
              <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ DApps &amp; DeFi</span>
              <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">✓ Cloud APIs</span>
            </div>
          </div>

          {/* Right Column: Track Record & Research */}
          <div className="p-6 sm:p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-[#C75B32]/40 transition-colors">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#C75B32] tracking-widest uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C75B32]" />
                <span>TRACK RECORD &amp; RESEARCH</span>
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>COMPETING &amp; GOING DEEPER</AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                Competed in 25+ hackathons with 20+ finalist finishes. <strong className="text-white font-semibold">1st Place Track Winner at Build on Chain</strong>, <strong className="text-white font-semibold">Smart India Hackathon Finalist</strong>, and researcher with <strong className="text-[#5CE1E6] font-semibold">OpenLedger</strong> (AI/Web3 data pipelines) and the <strong className="text-[#E88053] font-semibold">Uniswap Hook Incubator</strong> (Uniswap v4 hooks).
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-white/80">
              <div className="p-2 bg-black/60 border border-[#C75B32]/30 rounded-lg">
                <span className="text-[#C75B32] font-bold block">BUILD ON CHAIN</span>
                <span>Track Winner 🏆</span>
              </div>
              <div className="p-2 bg-black/60 border border-[#5CE1E6]/30 rounded-lg">
                <span className="text-[#5CE1E6] font-bold block">SMART INDIA HACKATHON</span>
                <span>National Finalist 🇮🇳</span>
              </div>
            </div>
          </div>

        </div>

        {/* Skill Pills */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap justify-center items-center gap-2">
          {[
            'FULL-STACK WEB DEVELOPMENT',
            'AI SYSTEMS & LLM AGENTS',
            'BLOCKCHAIN & SOLIDITY EVM',
            'OPENLEDGER TECHNICAL RESEARCH',
            'UNISWAP HOOK INCUBATOR',
            'SYSTEM ARCHITECTURE & APIS',
          ].map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-black/60 border border-white/15 rounded-full font-mono text-[11px] text-white/90 hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors"
            >
              • {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
