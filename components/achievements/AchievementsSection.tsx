'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 04 VERIFIED ACHIEVEMENTS & PROOF
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            ACHIEVEMENTS
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Competitive record across national hackathons, track wins, and global research selections.
          </p>
        </div>

        {/* Clean 4-Column Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111111] border border-[#242424] p-6 space-y-3 hover:border-[#C75B32]/60 transition-colors"
            >
              <div className="font-display text-5xl sm:text-6xl font-extrabold text-[#C75B32] leading-none">
                {item.stat}
              </div>
              <div className="space-y-1 border-t border-[#242424] pt-3">
                <div className="font-mono text-xs font-bold text-[#E8E5DF] uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-[#C75B32]">
                  {item.subtitle}
                </div>
              </div>
              <p className="text-xs font-light text-[#8E8B85] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
