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
    <section id="contact" className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 06 CONTACT & COLLABORATION
          </div>
          <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            LET&apos;S BUILD <span className="text-[#C75B32]">TOGETHER.</span>
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Available for select smart contract architecture, protocol research, and AI integration projects.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="px-7 py-3.5 bg-[#C75B32] text-white font-mono text-xs tracking-widest hover:bg-[#E06D43] transition-colors"
            data-cursor="EMAIL"
          >
            GET IN TOUCH ↗
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-7 py-3.5 border border-[#242424] text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#E8E5DF] transition-colors"
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
