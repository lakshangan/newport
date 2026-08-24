'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#080705] via-[#1c160b] to-[#080705] border-t border-white/10 relative overflow-hidden">
      {/* Gold & Bronze Metallic Diamond Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2e2412_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#231a0e_25%,transparent_25%,transparent_75%,#231a0e_75%),linear-gradient(45deg,#231a0e_25%,transparent_25%,transparent_75%,#231a0e_75%)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

      {/* Golden Radiance Ambient Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 border-b border-white/15 pb-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest text-[#C75B32]"
          >
            // 04 PROOF OF WORK &amp; DISTINCTIONS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white"
          >
            HIGHLIGHT ACHIEVEMENTS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg font-light text-white/60 max-w-2xl"
          >
            Proven competitive record across 25+ national and international hackathons, track wins, and global research selections.
          </motion.p>
        </div>

        {/* Cards Grid with Framer Motion Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-[#111114] border border-white/10 hover:border-[#C75B32]/60 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Ambient Card Top Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C75B32]/10 rounded-full blur-2xl group-hover:bg-[#C75B32]/25 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start">
                <div className="font-display text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C75B32] via-[#E88053] to-white leading-none">
                  {item.stat}
                </div>
                {item.tag && (
                  <span className="px-3 py-1 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] font-mono font-bold uppercase rounded-full shadow-sm">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 border-t border-white/10 pt-4">
                <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#E88053] transition-colors">
                  {item.label}
                </h3>
                <div className="text-xs font-mono text-[#C75B32]">
                  {item.subtitle}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed pt-1">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
