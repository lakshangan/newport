'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

interface SocialItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const SocialConnectCard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks: SocialItem[] = [
    {
      name: 'GitHub',
      url: PORTFOLIO_DATA.personal.github,
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: PORTFOLIO_DATA.personal.twitter,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: PORTFOLIO_DATA.personal.linkedin,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: PORTFOLIO_DATA.personal.instagram,
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full p-6 sm:p-10 bg-[#0c0c0c]/90 border border-white/15 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C75B32]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Header Titles */}
      <h3 className="font-sans font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-snug">
        Connect with me
      </h3>
      <p className="font-mono text-xs sm:text-sm text-white/60 tracking-wider pt-1.5 pb-6 sm:pb-8">
        Hover over the icons below
      </p>

      {/* Glassmorphic Dock Container */}
      <div className="relative bg-[#161618]/90 border border-white/15 rounded-2xl px-5 sm:px-7 py-3.5 sm:py-4 flex items-center space-x-5 sm:space-x-8 shadow-2xl backdrop-blur-md">
        {/* Animated Tooltip Popup */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-20"
            >
              <div className="relative bg-white text-black font-sans font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                {socialLinks[hoveredIndex].name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Icons List */}
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-xl hover:bg-white/10 relative group"
            aria-label={item.name}
            data-cursor={item.name.toUpperCase()}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialConnectCard;
