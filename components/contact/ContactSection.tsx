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
          className="object-cover object-[75%_center] sm:object-[68%_center] filter brightness-105 contrast-[1.02]"
          sizes="100vw"
        />
      </div>

      {/* Localized text backdrop on left side only - zero overlay over face and subject */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-3/5 lg:w-5/12 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-1 pointer-events-none" />

      {/* Subtle bottom edge shade strictly for the email footer */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-1 pointer-events-none" />

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
