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
    <section id="contact" className="relative w-full min-h-screen flex flex-col justify-between bg-[#080808] border-t border-[#242424] overflow-hidden select-none">
      {/* Background Image mass.png spanning full screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mass.png"
          alt="Lakshan Ganesan Drone & Tech Photography"
          fill
          priority
          className="object-cover object-[75%_center] sm:object-[68%_center] filter brightness-95 contrast-105"
          sizes="100vw"
        />
      </div>

      {/* Full-Screen Gradient Shading & Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 z-1 pointer-events-none" />

      {/* Volumetric Sunset Ambient Glow */}
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[500px] bg-[#C75B32]/15 rounded-full blur-[180px] pointer-events-none z-1" />

      {/* Main Content Area (Full width, centered container) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-24 sm:pt-32 flex-1 flex items-center justify-start">
        <div className="w-full md:w-7/12 lg:w-5/12">
          <SocialConnectCard />
        </div>
      </div>

      {/* Telemetry Footer spanning bottom of full screen */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-8 sm:pb-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/10 gap-4 text-xs font-mono text-[#8E8B85]">
        <div className="space-y-1">
          <span className="text-[#8E8B85]/60 uppercase tracking-widest text-[11px]">PRIMARY EMAIL CONTACT</span>
          <p
            onClick={handleCopyEmail}
            className="text-[#E8E5DF] font-bold text-sm sm:text-base cursor-pointer hover:text-[#5CE1E6] transition-colors flex items-center gap-2"
          >
            <span>{PORTFOLIO_DATA.personal.email}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white/80">
              {copied ? '✓ COPIED' : 'CLICK TO COPY'}
            </span>
          </p>
        </div>

        <div className="text-right text-[11px] text-[#8E8B85]/60 tracking-widest uppercase">
          <span>📍 BENGALURU, INDIA</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
