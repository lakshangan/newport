'use client';

import React from 'react';
import Image from 'next/image';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
import { Code, Server, Cpu, Layers, Terminal, Trophy, Sparkles, CheckCircle2, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Renaissance Artwork Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
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
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />

      {/* Atmospheric Warm Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/90 via-black/65 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/90 pointer-events-none" />

      {/* Volumetric Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-[#C75B32]/15 rounded-full blur-[160px] pointer-events-none z-2" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[#5CE1E6]/10 rounded-full blur-[140px] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Compact Header */}
        <div className="space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/70 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-2xl">
            <Compass className="w-3.5 h-3.5 text-[#C75B32] animate-spin" style={{ animationDuration: '12s' }} />
            <span>01 // REN&apos;AISSANCE &amp; TECH ARCHITECTURE</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-[#E8E5DF] tracking-tight leading-tight">
            Hey, I’m <span className="text-[#C75B32]">Lakshan.</span>
          </h2>

          <p className="font-sans text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto leading-snug drop-shadow-md font-medium">
            Full-Stack Developer fusing <span className="text-[#C75B32] font-bold">Renaissance Craftsmanship</span> with modern software systems—spanning <span className="text-[#5CE1E6] font-bold">Web &amp; Cloud</span>, <span className="text-[#E88053] font-bold">Artificial Intelligence</span>, and <span className="text-[#C084FC] font-bold">Blockchain Protocols</span>.
          </p>
        </div>

        {/* SECTION 01: Mindset & Terminal Status (Compact Card) */}
        <div className="p-6 sm:p-8 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Terminal className="w-24 h-24 text-white" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#5CE1E6] tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6]" />
                SYS_MINDSET // FIRST PRINCIPLES
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>CRAFTSMANSHIP AT EVERY LAYER</AsciiGlitchRipple>
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 text-[#5CE1E6] rounded-full">STATUS: ACTIVE</span>
              <span className="px-2.5 py-1 bg-[#C75B32]/10 border border-[#C75B32]/30 text-[#C75B32] rounded-full">FOCUS: FULL-STACK / AI / WEB3</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed">
                Just as Renaissance polymaths combined geometry, art, and mechanics, I build software from first principles—striving for clean architecture, low latency, and intuitive interfaces. From responsive Next.js frontends down to Node.js/Python APIs, LLM agents, and Solidity smart contracts.
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                My journey combines academic computer technology with rapid real-world execution: competing in 25+ hackathons, winning premier Web3 tracks, researching protocols with OpenLedger, and building custom Uniswap v4 liquidity hooks.
              </p>
            </div>

            <div className="p-4 bg-[#0c0c0e] border border-white/10 rounded-xl space-y-2 font-mono text-[11px] text-white/70">
              <div className="text-[#C75B32] font-bold pb-1 border-b border-white/10 uppercase">// DAILY STACK &amp; TOOLING</div>
              <div className="flex justify-between items-center py-0.5">
                <span>Frontend Frameworks</span>
                <span className="text-white font-semibold">Next.js 14 / React</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span>Backend &amp; Languages</span>
                <span className="text-white font-semibold">Node.js / Python / TS</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span>AI &amp; Models</span>
                <span className="text-white font-semibold">LLMs / C2PA / OpenCV</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span>Blockchain &amp; EVM</span>
                <span className="text-white font-semibold">Solidity / Hardhat</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span>Styling &amp; Motion</span>
                <span className="text-white font-semibold">Tailwind / GSAP / Three.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 02: Deconstructed Capability Grid */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-white/10 pb-4 text-left">
            <span className="text-xs font-mono text-[#C75B32] tracking-widest uppercase">// 02 // TECHNICAL DECONSTRUCTION</span>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-tight">
              FOUR CORE CAPABILITIES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Full-Stack Web */}
            <div className="p-5 bg-black/50 border border-white/10 rounded-xl hover:border-[#5CE1E6]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 flex items-center justify-center text-[#5CE1E6] group-hover:scale-105 transition-transform">
                <Code className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#5CE1E6] uppercase tracking-widest">PILLAR // 01</span>
                <h4 className="text-base font-bold font-mono text-white uppercase">FULL-STACK WEB</h4>
              </div>
              <p className="text-xs text-white/70 leading-normal font-sans">
                Architecting high-speed Next.js applications, serverless routes, stateful React systems, and responsive Tailwind layouts.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1 text-[10px] font-mono text-[#5CE1E6]">
                <span>Next.js</span> • <span>React</span> • <span>TS</span> • <span>Tailwind</span>
              </div>
            </div>

            {/* Pillar 2: Cloud Backends & APIs */}
            <div className="p-5 bg-black/50 border border-white/10 rounded-xl hover:border-[#E88053]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#E88053]/10 border border-[#E88053]/30 flex items-center justify-center text-[#E88053] group-hover:scale-105 transition-transform">
                <Server className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#E88053] uppercase tracking-widest">PILLAR // 02</span>
                <h4 className="text-base font-bold font-mono text-white uppercase">CLOUD BACKENDS &amp; APIS</h4>
              </div>
              <p className="text-xs text-white/70 leading-normal font-sans">
                Building scalable Node.js &amp; Python APIs, relational database integrations, authentication, and cloud middleware.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1 text-[10px] font-mono text-[#E88053]">
                <span>Node.js</span> • <span>Python</span> • <span>PostgreSQL</span>
              </div>
            </div>

            {/* Pillar 3: AI & Intelligence */}
            <div className="p-5 bg-black/50 border border-white/10 rounded-xl hover:border-[#FACC15]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#FACC15]/10 border border-[#FACC15]/30 flex items-center justify-center text-[#FACC15] group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#FACC15] uppercase tracking-widest">PILLAR // 03</span>
                <h4 className="text-base font-bold font-mono text-white uppercase">AI &amp; INTELLIGENCE</h4>
              </div>
              <p className="text-xs text-white/70 leading-normal font-sans">
                Integrating LLM conversational agents, C2PA synthetic media credentials, neural model pipelines, and OpenCV vision.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1 text-[10px] font-mono text-[#FACC15]">
                <span>LLMs</span> • <span>C2PA</span> • <span>OpenCV</span> • <span>TensorFlow</span>
              </div>
            </div>

            {/* Pillar 4: Blockchain & Smart Contracts */}
            <div className="p-5 bg-black/50 border border-white/10 rounded-xl hover:border-[#C084FC]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#C084FC]/10 border border-[#C084FC]/30 flex items-center justify-center text-[#C084FC] group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#C084FC] uppercase tracking-widest">PILLAR // 04</span>
                <h4 className="text-base font-bold font-mono text-white uppercase">BLOCKCHAIN &amp; DAPPS</h4>
              </div>
              <p className="text-xs text-white/70 leading-normal font-sans">
                Developing Solidity EVM smart contracts, tokenized real estate vaults, custom Uniswap v4 liquidity hooks, and forensics.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1 text-[10px] font-mono text-[#C084FC]">
                <span>Solidity</span> • <span>EVM</span> • <span>Hardhat</span> • <span>Web3.js</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 03: Compact Achievements & Research Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Hackathon Track Record Summary */}
          <div className="lg:col-span-2 p-6 sm:p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#C75B32] tracking-widest uppercase flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#C75B32]" />
                <span>03 // PROVING GROUNDS &amp; HACKATHONS</span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                <AsciiGlitchRipple dur={1000}>HIGH-PRESSURE SHIPPING</AsciiGlitchRipple>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                Hackathons are where theory meets execution. With over <strong className="text-white font-semibold">25+ hackathons</strong> and <strong className="text-white font-semibold">20+ finalist finishes</strong>, I’ve battle-tested my ability to deliver complete production prototypes under 36-hour limits.
              </p>
            </div>

            {/* Placement Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 font-mono text-xs">
              <div className="p-3 bg-black/60 border border-[#C75B32]/40 rounded-xl space-y-0.5">
                <span className="text-[#C75B32] font-extrabold text-sm block">TRACK WINNER</span>
                <span className="text-white font-semibold block text-xs">Build On Chain @ NIT Calicut</span>
                <span className="text-white/60 text-[10px]">1st Place Web3 Track</span>
              </div>

              <div className="p-3 bg-black/60 border border-[#5CE1E6]/40 rounded-xl space-y-0.5">
                <span className="text-[#5CE1E6] font-extrabold text-sm block">NATIONAL FINALIST</span>
                <span className="text-white font-semibold block text-xs">Smart India Hackathon</span>
                <span className="text-white/60 text-[10px]">Top National Stage</span>
              </div>

              <div className="p-3 bg-black/60 border border-[#C084FC]/40 rounded-xl space-y-0.5">
                <span className="text-[#C084FC] font-extrabold text-sm block">GLOBAL SELECTION</span>
                <span className="text-white font-semibold block text-xs">UNESCO-IOC Network</span>
                <span className="text-white/60 text-[10px]">Circle Global Platform</span>
              </div>
            </div>
          </div>

          {/* Ecosystem Research Card */}
          <div className="p-6 sm:p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#5CE1E6] tracking-widest uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#5CE1E6]" />
                <span>ECOSYSTEM RESEARCH</span>
              </div>
              <h4 className="font-mono text-lg font-bold text-white uppercase">RESEARCH &amp; PROTOCOLS</h4>
              <ul className="space-y-2.5 text-xs font-sans text-white/80">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5CE1E6] shrink-0 mt-0.5" />
                  <span><strong>OpenLedger:</strong> Leading Web3 protocol technical research, AI data pipelines, &amp; DeFi strategy.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E88053] shrink-0 mt-0.5" />
                  <span><strong>Uniswap Foundation:</strong> Built custom liquidity hooks &amp; dynamic fee modules for Uniswap v4.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C084FC] shrink-0 mt-0.5" />
                  <span><strong>Vodafone Idea:</strong> Explored enterprise ledger systems &amp; decentralized data security.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-white/60">
              ✓ Combining research depth with production full-stack shipping.
            </div>
          </div>

        </div>

        {/* SECTION 04: Renaissance Manifesto Banner */}
        <div className="relative my-10 p-6 sm:p-10 bg-gradient-to-r from-black/90 via-[#1c0f0a]/90 to-black/90 border border-[#C75B32]/40 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C75B32]/12 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10 max-w-4xl mx-auto text-center sm:text-left">
            <p className="font-mono text-xs text-[#C75B32] tracking-widest uppercase">
              // THE CORE PHILOSOPHY
            </p>
            
            <h3 className="font-sans text-xl sm:text-3xl font-extrabold text-white leading-snug">
              What started as curiosity for code has evolved into a clear building ethos:
            </h3>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-black/60 border border-white/15 rounded-xl space-y-1 text-left">
                <span className="text-xl font-mono text-[#5CE1E6]">01</span>
                <p className="font-mono font-bold text-sm text-white uppercase">BUILD COMPLETE PRODUCTS</p>
                <p className="text-[11px] text-white/60 font-sans">Connecting UI design, server backends, and smart contracts.</p>
              </div>

              <div className="p-4 bg-black/60 border border-white/15 rounded-xl space-y-1 text-left">
                <span className="text-xl font-mono text-[#E88053]">02</span>
                <p className="font-mono font-bold text-sm text-white uppercase">MASTER THE UNDERLYING LOGIC</p>
                <p className="text-[11px] text-white/60 font-sans">Understanding how networks, compilers, and AI models work.</p>
              </div>

              <div className="p-4 bg-black/60 border border-white/15 rounded-xl space-y-1 text-left">
                <span className="text-xl font-mono text-[#FACC15]">03</span>
                <p className="font-mono font-bold text-sm text-white uppercase">DELIVER HIGH-IMPACT RESULTS</p>
                <p className="text-[11px] text-white/60 font-sans">Translating rapid prototypes into production architecture.</p>
              </div>
            </div>

            {/* Final Statement */}
            <div className="pt-4 text-center">
              <span className="font-sans font-bold uppercase text-2xl sm:text-4xl text-[#5CE1E6] drop-shadow-[0_0_25px_rgba(92,225,230,0.3)] tracking-tight">
                &ldquo;That’s where I’m at home.&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 05: Compact Skill Pills */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap justify-center items-center gap-2">
          {[
            'FULL-STACK WEB DEVELOPMENT',
            'NEXT.JS 14 / REACT / TYPESCRIPT',
            'NODE.JS & PYTHON BACKEND APIS',
            'AI SYSTEMS & LLM AGENTS',
            'C2PA SYNTHETIC MEDIA PROVENANCE',
            'BLOCKCHAIN & SOLIDITY EVM',
            'OPENLEDGER TECHNICAL RESEARCH',
            'UNISWAP HOOK INCUBATOR',
            'BUILD ON CHAIN TRACK WINNER',
            'SMART INDIA HACKATHON FINALIST',
          ].map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-black/60 border border-white/15 rounded-full font-mono text-[11px] text-white/90 hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors"
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
