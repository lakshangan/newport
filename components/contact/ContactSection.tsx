'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { SocialConnectCard } from '@/components/ui/SocialConnectCard';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080808] border-t border-[#242424] relative overflow-hidden">
      {/* Background Volumetric Sunset Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C75B32]/15 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8 text-left">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 05 CONTACT &amp; SOCIAL CONNECT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            LET&apos;S BUILD <span className="text-[#C75B32]">TOGETHER.</span>
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Available for select smart contract architecture, protocol research, full-stack builds, and AI integration projects.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="px-7 py-3.5 bg-[#C75B32] text-white font-mono text-xs tracking-widest hover:bg-[#E06D43] transition-colors text-center font-bold rounded-lg shadow-lg"
            data-cursor="EMAIL"
          >
            GET IN TOUCH ↗
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-7 py-3.5 border border-[#333] bg-black/60 text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#5CE1E6] hover:text-[#5CE1E6] transition-colors text-center font-bold rounded-lg shadow-lg"
            data-cursor="COPY"
          >
            {copied ? '✓ EMAIL COPIED' : 'COPY EMAIL ADDRESS'}
          </button>
        </div>

        {/* Renaissance Studio Artwork Background Box with Aligned Social Connect Dock */}
        <div className="relative w-full min-h-[480px] sm:min-h-[580px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black flex items-center justify-end p-5 sm:p-10 lg:p-14">
          {/* Background Studio Artwork Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/image.png"
              alt="Lakshan Ganesan Developer Studio Artwork"
              fill
              priority
              className="object-cover object-left md:object-center filter brightness-95 contrast-105"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* Gradient Shading & Vignette Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/80 z-1 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-1 pointer-events-none" />

          {/* SocialConnectCard Div Aligned Perfectly on the Right Parchment Canvas */}
          <div className="relative z-10 w-full md:w-8/12 lg:w-5/12 ml-auto">
            <SocialConnectCard />
          </div>
        </div>

        {/* Telemetry Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#242424] text-xs font-mono text-[#8E8B85]">
          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">EMAIL</span>
            <p className="text-[#E8E5DF] font-bold">{PORTFOLIO_DATA.personal.email}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">PHONE</span>
            <p className="text-[#E8E5DF] font-bold">{PORTFOLIO_DATA.personal.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#8E8B85]/60 uppercase">LOCATION</span>
            <p className="text-[#E8E5DF] font-bold">{PORTFOLIO_DATA.personal.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
