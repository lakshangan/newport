'use client';

import React from 'react';
import Image from 'next/image';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#050505] border-t border-white/10 overflow-hidden select-none">
      
      {/* Renaissance Masterpiece Background Artwork */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/about section .png"
          alt="Art x Tech Renaissance Landscape"
          fill
          priority
          className="object-cover object-center filter contrast-105 brightness-95 opacity-65"
          sizes="100vw"
        />
      </div>

      {/* Warm Ambient Dark Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/50 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70 pointer-events-none" />

      {/* Renaissance Editorial Architectural Grid Pattern */}
      <div className="absolute inset-0 z-2 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-2 bg-[radial-gradient(#2d1910_1.5px,transparent_1.5px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      {/* Soft Volumetric Warm Cloud Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-[#C75B32]/14 rounded-full blur-[180px] pointer-events-none z-2" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[450px] bg-[#5CE1E6]/8 rounded-full blur-[160px] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Tag & Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>01 // ART X TECH MANIFESTO</span>
          </div>

          <h2 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#E8E5DF] tracking-tight leading-tight">
            FULL-STACK DEVELOPER &amp; ARCHITECT AT THE INTERSECTION OF <br className="hidden sm:inline" />
            <span className="text-[#C75B32]">ART &amp; CODE.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base tracking-normal text-white/70 max-w-2xl mx-auto leading-relaxed">
            I&apos;m <strong className="text-white font-semibold">Lakshan Ganesan</strong> — an engineer dedicated to <em className="italic text-white">writing maintainable, clean code</em> across EVM protocols, AI agents, and 3D WebGL interfaces.
          </p>
        </div>

        {/* Grand Central Renaissance Editorial Banner */}
        <div className="relative my-16 p-8 sm:p-14 bg-gradient-to-r from-black/90 via-[#1a0e09]/80 to-black/90 border border-[#C75B32]/30 rounded-3xl backdrop-blur-xl shadow-2xl text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C75B32]/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-4xl sm:text-6xl text-[#C75B32] font-mono block mb-2 opacity-60">
            &ldquo;
          </span>
          <blockquote className="font-mono font-bold text-xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-snug">
            The simplest example is <span className="text-[#5CE1E6]">kafka + golang</span> — engineering decentralized systems that <em className="italic text-[#E88053] font-sans lowercase">endure with speed and elegance</em>.
          </blockquote>
          <span className="text-4xl sm:text-6xl text-[#C75B32] font-mono block mt-2 opacity-60">
            &rdquo;
          </span>
        </div>

        {/* Q & A Editorial Section Header */}
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <div className="w-16 h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center font-mono font-extrabold text-xl text-[#C75B32] shadow-2xl">
            Q&amp;A
          </div>
          <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
            TECHNICAL PHILOSOPHY &amp; DISCIPLINE
          </span>
        </div>

        {/* 2-Column Art x Tech Editorial Q&A Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 pt-6">
          
          {/* Left Column Q&A Items */}
          <div className="space-y-12">
            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#5CE1E6] tracking-widest uppercase">
                01 // PARADIGM
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHAT DRIVES THE ART X TECH PARADIGM?
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed pt-1">
                Engineering smart contracts and Web3 protocols demands <em className="italic text-white">mathematical precision and architectural beauty</em>. Every line of code is structured to be clean, modular, and performant.
              </p>
            </div>

            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#5CE1E6] tracking-widest uppercase">
                02 // PROVENANCE &amp; AI
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  HOW DO AI AGENTS &amp; PROVENANCE INTERSECT?
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed pt-1">
                Combining C2PA cryptographic signatures with context-aware AI models ensures <em className="italic text-white">verifiable media provenance and autonomous execution</em> across distributed networks.
              </p>
            </div>
          </div>

          {/* Right Column Q&A Items */}
          <div className="space-y-12">
            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#C75B32] tracking-widest uppercase">
                03 // DEFI &amp; HOOKS
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHAT IS THE ETHOS BEHIND UNISWAP V4 HOOKS?
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed pt-1">
                Developing custom liquidity hooks allows dynamic pool logic and automated yield strategies while maintaining <em className="italic text-white">zero-compromise security and gas efficiency</em>.
              </p>
            </div>

            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#C75B32] tracking-widest uppercase">
                04 // GRAPHICS &amp; WEBGL
              </div>
              <h3 className="font-mono text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHY FOCUS ON LOW-LATENCY SHADERS?
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed pt-1">
                WebGL shaders and Three.js scenes turn complex protocol analytics into <em className="italic text-white">captivating visual masterworks</em> that respond instantly to user interaction.
              </p>
            </div>
          </div>

        </div>

        {/* Technical Skill Tags (JetBrains Mono) */}
        <div className="pt-10 border-t border-white/10 flex flex-wrap justify-center items-center gap-3">
          {[
            'SOLIDITY & EVM',
            'UNISWAP V4 HOOKS',
            'KAFKA + GOLANG',
            'LLM DIAGNOSTIC AGENTS',
            'C2PA MEDIA PROVENANCE',
            'REACT & NEXT.JS',
            'THREE.JS & SHADERS',
          ].map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-black/60 border border-white/15 rounded-full font-mono text-xs text-white/90 hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors"
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
