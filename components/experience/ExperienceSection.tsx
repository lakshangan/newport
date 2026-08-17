'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 bg-[#080808] border-t border-[#242424] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 border-b border-[#242424] pb-12">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 03 PROFESSIONAL TRACK RECORD
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            EXPERIENCE
          </h2>
          <p className="text-base sm:text-lg font-light text-[#8E8B85] max-w-xl">
            Roles across technical research, liquidity protocol incubators, and enterprise systems.
          </p>
        </div>

        {/* Editorial Timeline */}
        <div className="space-y-0 divide-y divide-[#242424]">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <div
              key={idx}
              className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group hover:bg-[#111111]/40 transition-colors px-4"
            >
              {/* Left Column: Large Editorial Year */}
              <div className="md:col-span-3 flex flex-col justify-start">
                <span className="font-display text-6xl sm:text-7xl font-extrabold text-[#E8E5DF] group-hover:text-[#C75B32] transition-colors">
                  {exp.year}
                </span>
                {exp.isCurrent && (
                  <span className="inline-block mt-2 font-mono text-[10px] tracking-widest text-[#C75B32] uppercase">
                    ● CURRENT ROLE
                  </span>
                )}
              </div>

              {/* Middle Column: Role & Organization */}
              <div className="md:col-span-4 space-y-2">
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#E8E5DF]">
                  {exp.company}
                </h3>
                <div className="text-sm font-mono text-[#C75B32]">
                  {exp.role}
                </div>
                <div className="text-xs font-mono text-[#8E8B85]/70">
                  {exp.category}
                </div>
              </div>

              {/* Right Column: Description */}
              <div className="md:col-span-5 text-sm sm:text-base font-light text-[#8E8B85] leading-relaxed">
                {exp.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
