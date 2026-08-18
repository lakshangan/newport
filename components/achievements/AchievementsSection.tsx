'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { VolumetricStudio } from '@/components/ui/volumetric-studio';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative w-full overflow-hidden border-t border-white/10">
      <VolumetricStudio className="min-h-[750px] py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="space-y-4 border-b border-white/15 pb-8 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono tracking-widest text-[#C75B32]"
            >
              // 04 PROOF OF WORK & DISTINCTIONS
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50"
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-[#C75B32]/60 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl transition-all duration-300 overflow-hidden"
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
      </VolumetricStudio>
    </section>
  );
};
