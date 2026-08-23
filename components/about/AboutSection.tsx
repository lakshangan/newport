'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#080808] via-[#120a07] to-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Soft Volumetric Warm Cloud Atmosphere (Matching Reference Style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#C75B32]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[#5CE1E6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Tag & Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#C75B32]/30 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>01 // ART X TECH MANIFESTO</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#E8E5DF] tracking-tight leading-tight">
            CRAFTING PROTOCOLS AT THE INTERSECTION OF <br className="hidden sm:inline" />
            <span className="text-[#C75B32]">ART &amp; CODE.</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono tracking-wider text-white/60 max-w-xl mx-auto leading-relaxed">
            I&apos;m <strong className="text-white font-semibold">Lakshan Ganesan</strong> — an engineer and technical researcher designing high-performance smart contracts, AI agents, and WebGL graphics.
          </p>
        </div>

        {/* Grand Central Editorial Quote Banner (Matching Reference Image Style) */}
        <div className="relative my-16 p-8 sm:p-14 bg-gradient-to-r from-black/80 via-[#180d09]/70 to-black/80 border border-white/15 rounded-3xl backdrop-blur-xl shadow-2xl text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C75B32]/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-4xl sm:text-6xl text-[#C75B32] font-serif block mb-2 opacity-60">
            &ldquo;
          </span>
          <blockquote className="font-display font-bold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-snug">
            Decentralization and intelligence are not merely tools — they are the <span className="text-[#5CE1E6]">modern canvas</span> of technical architecture.
          </blockquote>
          <span className="text-4xl sm:text-6xl text-[#C75B32] font-serif block mt-2 opacity-60">
            &rdquo;
          </span>
        </div>

        {/* Floating Q & A Editorial Header Icon */}
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <div className="w-16 h-16 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center font-display font-extrabold text-xl text-[#C75B32] shadow-2xl">
            Q&amp;A
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
            PHILOSOPHY &amp; DISCIPLINE
          </span>
        </div>

        {/* 2-Column Art x Tech Editorial Q&A Grid (Exact Layout from Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 pt-6">
          
          {/* Left Column Q&A Items */}
          <div className="space-y-12">
            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#5CE1E6] tracking-widest uppercase">
                01 // PARADIGM
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHAT DRIVES THE ART X TECH PARADIGM?
                </AsciiGlitchRipple>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/70 leading-relaxed pt-1">
                Engineering smart contracts and Web3 protocols demands the same precision as classical sculpture. Every line of code is structured to endure on public ledgers while delivering seamless, beautiful human interfaces.
              </p>
            </div>

            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#5CE1E6] tracking-widest uppercase">
                02 // PROVENANCE &amp; AI
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  HOW DO AI &amp; PROVENANCE INTERSECT?
                </AsciiGlitchRipple>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/70 leading-relaxed pt-1">
                With C2PA digital signatures and context-aware LLM agents, we restore authenticity and cryptographic trust to digital media in an era of infinite synthetic content.
              </p>
            </div>
          </div>

          {/* Right Column Q&A Items */}
          <div className="space-y-12">
            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#C75B32] tracking-widest uppercase">
                03 // DEFI &amp; HOOKS
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHAT IS THE ETHOS BEHIND DEFI HOOKS?
                </AsciiGlitchRipple>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/70 leading-relaxed pt-1">
                Designing custom Uniswap v4 hooks allows dynamic execution policies, optimizing yield and automated market making with zero-compromise security.
              </p>
            </div>

            <div className="space-y-3 border-b border-white/10 pb-8">
              <div className="text-[11px] font-mono text-[#C75B32] tracking-widest uppercase">
                04 // GRAPHICS &amp; WEBGL
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                <AsciiGlitchRipple dur={1000}>
                  WHY FOCUS ON LOW-LATENCY GRAPHICS?
                </AsciiGlitchRipple>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/70 leading-relaxed pt-1">
                WebGL shaders and interactive R3F scenes convert complex cryptographic telemetry into intuitive visual experiences that engage developers and creators alike.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Technical Arsenal Pills */}
        <div className="pt-10 border-t border-white/10 flex flex-wrap justify-center items-center gap-3">
          {[
            'SOLIDITY & EVM',
            'UNISWAP V4 HOOKS',
            'LLM DIAGNOSTIC AGENTS',
            'C2PA MEDIA PROVENANCE',
            'REACT & NEXT.JS',
            'THREE.JS & SHADERS',
          ].map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-black/60 border border-white/15 rounded-full font-mono text-xs text-white/80 hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors"
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
