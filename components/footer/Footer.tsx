'use client';

import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const Footer: React.FC = () => {
  useEffect(() => {
    // Subtle DevTools easter egg for developers exploring the site
    if (typeof window !== 'undefined') {
      console.log(
        '%c// DECRYPT_THIS %cEverything you need is already here.\n' +
          '%c3 words are hidden naturally across this portfolio.\n' +
          'Hover over the right words to catch their subtle system signal.\n' +
          'Combine them: WORD1-WORD2-WORD3\n' +
          'KDF: PBKDF2 (SHA-256, 100k rounds) → AES-256-GCM',
        'color: #FFA266; font-weight: bold; font-family: monospace; font-size: 13px;',
        'color: #D4BC98; font-style: italic; font-family: monospace;',
        'color: #8E8B85; font-family: monospace; font-size: 11px;'
      );
    }
  }, []);

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

        {/* Right: Copyright & System Status */}
        <div className="text-[11px] text-[#8E8B85]/70 text-center md:text-right space-y-1">
          <div>
            © {PORTFOLIO_DATA.personal.year} {PORTFOLIO_DATA.personal.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[10px] text-[#8E8B85]/40 select-none">
            SYS_INTEGRITY: 200 OK &bull; ALL SYSTEMS OPERATIONAL
          </div>
        </div>

      </div>
    </footer>
  );
};
