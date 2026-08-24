'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-[#080706] via-[#1f100a] to-[#050505] border-t border-[#242424] relative overflow-hidden">
      {/* Wireframe Horizon Texture Background Asset */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#381c12_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Dramatic Sunset Horizon Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C75B32]/18 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 06 CONTACT & COLLABORATION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            LET&apos;S BUILD <span className="text-[#C75B32]">TOGETHER.</span>
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Available for select smart contract architecture, protocol research, and AI integration projects.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="px-7 py-3.5 bg-[#C75B32] text-white font-mono text-xs tracking-widest hover:bg-[#E06D43] transition-colors text-center"
            data-cursor="EMAIL"
          >
            GET IN TOUCH ↗
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-7 py-3.5 border border-[#242424] text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#E8E5DF] transition-colors text-center"
            data-cursor="COPY"
          >
            {copied ? '✓ EMAIL COPIED' : 'COPY EMAIL ADDRESS'}
          </button>
        </div>

        {/* Communication Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#242424] text-xs font-mono text-[#8E8B85]">
          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">EMAIL</span>
            <p className="text-[#E8E5DF]">{PORTFOLIO_DATA.personal.email}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">PHONE</span>
            <p className="text-[#E8E5DF]">{PORTFOLIO_DATA.personal.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">LOCATION</span>
            <p className="text-[#E8E5DF]">{PORTFOLIO_DATA.personal.location}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
