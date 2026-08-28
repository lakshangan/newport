'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-[#080808] border-t border-[#242424] text-xs font-mono text-[#8E8B85]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Brand Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-display text-2xl font-bold uppercase text-[#E8E5DF]">
            {PORTFOLIO_DATA.personal.shortName}
          </div>
          <div className="text-[11px] text-[#8E8B85]/70">
            FULL-STACK DEVELOPER / AI / BLOCKCHAIN
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap justify-center gap-8 tracking-widest text-[#E8E5DF]">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C75B32] transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C75B32] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={PORTFOLIO_DATA.personal.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C75B32] transition-colors"
          >
            X (TWITTER)
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="hover:text-[#C75B32] transition-colors"
          >
            EMAIL
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-[11px] text-[#8E8B85]/70 text-center md:text-right">
          © {PORTFOLIO_DATA.personal.year} {PORTFOLIO_DATA.personal.name}. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
};
