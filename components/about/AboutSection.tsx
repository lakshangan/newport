'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header Tag */}
        <div className="text-xs font-mono tracking-widest text-[#C75B32]">
          // 01 ABOUT & CORE CAPABILITIES
        </div>

        {/* Clean Headline */}
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
          BUILDING DECENTRALIZED PROTOCOLS <br />
          <span className="text-[#C75B32]">&amp; INTELLIGENT SYSTEMS.</span>
        </h2>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Left: Clean Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-light text-[#8E8B85] leading-relaxed">
            <p>
              I&apos;m <strong className="text-[#E8E5DF]">Lakshan Ganesan</strong>, a developer and technical researcher operating across Web3 protocol research and artificial intelligence.
            </p>
            <p>
              My focus centers on EVM smart contract architecture, cryptographic content provenance, custom Uniswap v4 hooks, and context-aware LLM diagnostic agents. I build minimal, robust, and performant technical systems.
            </p>
          </div>

          {/* Right: Technical Capabilities Box */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#242424] p-8 space-y-4">
            <div className="text-xs font-mono text-[#E8E5DF] tracking-widest uppercase border-b border-[#242424] pb-3">
              TECHNICAL FOCUS
            </div>
            <ul className="space-y-3 font-mono text-xs text-[#8E8B85]">
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-[#C75B32]" />
                <span>SOLICITY &amp; EVM SMART CONTRACTS</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-[#C75B32]" />
                <span>WEB3 PROTOCOL &amp; DEFI RESEARCH</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-[#C75B32]" />
                <span>LLM AGENTS &amp; GENERATIVE AI</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-[#C75B32]" />
                <span>C2PA MEDIA PROVENANCE &amp; FORENSICS</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-[#C75B32]" />
                <span>REACT, NEXT.JS &amp; THREE.JS GRAPHICS</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
