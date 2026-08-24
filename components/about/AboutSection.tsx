'use client';

import React from 'react';
import Image from 'next/image';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Background Artwork */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/about section .png"
          alt="Artistic Section Background"
          fill
          priority
          className="object-cover object-center filter contrast-105 brightness-95 opacity-55"
          sizes="100vw"
        />
      </div>

      {/* Warm Ambient Dark Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/55 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none" />

      {/* Renaissance Editorial Architectural Grid Pattern */}
      <div className="absolute inset-0 z-2 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 pointer-events-none" />

      {/* Soft Volumetric Warm Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-[#C75B32]/12 rounded-full blur-[180px] pointer-events-none z-2" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-[#5CE1E6]/8 rounded-full blur-[160px] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Tag & Hero Greeting */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>01 // ABOUT THE BUILDER</span>
          </div>

          <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black text-[#E8E5DF] tracking-tight leading-tight">
            Hey, I’m <span className="text-[#C75B32]">Lakshan.</span>
          </h2>

          <p className="font-serif italic text-xl sm:text-3xl text-white/90 max-w-3xl mx-auto leading-snug drop-shadow-md">
            A developer exploring the space between <em className="text-[#5CE1E6] not-italic font-sans font-bold">interfaces</em>, <em className="text-[#E88053] not-italic font-sans font-bold">systems</em>, <em className="text-[#C084FC] not-italic font-sans font-bold">AI</em>, and <em className="text-[#FACC15] not-italic font-sans font-bold">blockchain</em>.
          </p>
        </div>

        {/* 2-Column Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 pt-4">
          
          {/* Left Column: Education & Hands-on Philosophy */}
          <div className="space-y-8 p-8 sm:p-10 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#5CE1E6] tracking-widest uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6]" />
                <span>BEYOND THE CLASSROOM</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>
                  BUILDING REAL SYSTEMS
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed pt-2">
                While studying <strong className="text-white font-semibold">Computer Technology with a focus on Blockchain</strong>, I never really stayed inside the classroom. I kept turning what I learned into things I could actually build — from full-stack applications and AI experiments to DApps, blockchain investigation tools, and DeFi concepts.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">✓ Full-Stack Apps</span>
              <span className="px-3.5 py-1 bg-white/5 border border-white/10 rounded-full">✓ AI Experiments</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">✓ DApps &amp; DeFi</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">✓ On-Chain Forensic Tools</span>
            </div>
          </div>

          {/* Right Column: Hackathons, OpenLedger & Uniswap Incubator */}
          <div className="space-y-8 p-8 sm:p-10 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#C75B32] tracking-widest uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C75B32]" />
                <span>TRACK RECORD &amp; RESEARCH</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>
                  COMPETING &amp; GOING DEEPER
                </AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed pt-2">
                Along the way, I found myself competing, experimenting, and putting those ideas to the test. I’ve taken projects from ideas to working products, represented my work on competitive stages, <strong className="text-white font-semibold">won a track at Build on Chain</strong>, reached the <strong className="text-white font-semibold">finals of Smart India Hackathon</strong>, and competed across national-level AI and technology hackathons.
              </p>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed">
                I’ve also stepped beyond development itself, working with <strong className="text-[#5CE1E6] font-semibold">OpenLedger</strong> on Web3 and DeFi research, product workflows, and ecosystem strategy, while gaining deeper exposure to protocol development through the <strong className="text-[#E88053] font-semibold">Uniswap Hook Incubator</strong>.
              </p>
            </div>

            {/* Achievement Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] font-mono text-white/80">
              <div className="p-2.5 bg-black/60 border border-[#C75B32]/30 rounded-xl">
                <span className="text-[#C75B32] font-bold block">BUILD ON CHAIN</span>
                <span>Track Winner</span>
              </div>
              <div className="p-2.5 bg-black/60 border border-[#5CE1E6]/30 rounded-xl">
                <span className="text-[#5CE1E6] font-bold block">SMART INDIA HACKATHON</span>
                <span>National Finalist</span>
              </div>
            </div>
          </div>

        </div>

        {/* Grand Manifesto Banner: "That's Where I'm at Home" */}
        <div className="relative my-16 p-8 sm:p-14 bg-gradient-to-r from-black/90 via-[#1c0f0a]/90 to-black/90 border border-[#C75B32]/40 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C75B32]/12 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-8 relative z-10 max-w-4xl mx-auto text-center sm:text-left">
            <p className="font-mono text-xs sm:text-sm text-[#C75B32] tracking-widest uppercase">
              // THE EVOLUTION
            </p>
            
            <h3 className="font-sans text-2xl sm:text-4xl font-extrabold text-white leading-snug">
              What started as an interest in writing code has turned into something bigger:
            </h3>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-black/60 border border-white/15 rounded-2xl space-y-2 text-left">
                <span className="text-2xl font-mono text-[#5CE1E6]">01</span>
                <p className="font-mono font-bold text-lg text-white">I like building things.</p>
              </div>

              <div className="p-6 bg-black/60 border border-white/15 rounded-2xl space-y-2 text-left">
                <span className="text-2xl font-mono text-[#E88053]">02</span>
                <p className="font-mono font-bold text-lg text-white">I like understanding how they work.</p>
              </div>

              <div className="p-6 bg-black/60 border border-white/15 rounded-2xl space-y-2 text-left">
                <span className="text-2xl font-mono text-[#FACC15]">03</span>
                <p className="font-mono font-bold text-lg text-white">And I like going deeper than what’s on the surface.</p>
              </div>
            </div>

            {/* Final Statement */}
            <div className="pt-8 text-center">
              <span className="font-serif italic text-3xl sm:text-5xl text-[#5CE1E6] drop-shadow-[0_0_30px_rgba(92,225,230,0.3)]">
                &ldquo;That’s where I’m at home.&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Technical & Strategic Skill Pillars */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-3">
          {[
            'COMPUTER TECHNOLOGY (BLOCKCHAIN)',
            'OPENLEDGER DEFI RESEARCH',
            'UNISWAP HOOK INCUBATOR',
            'BUILD ON CHAIN TRACK WINNER',
            'SMART INDIA HACKATHON FINALIST',
            'AI AGENTS & DAPPS',
            'ON-CHAIN FORENSICS',
            'FULL-STACK & SYSTEM ARCHITECTURE',
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
