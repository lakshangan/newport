'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const PlaygroundSection: React.FC = () => {
  return (
    <section id="playground" className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 05 CREATIVE LAB & EXPERIMENTS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            PLAYGROUND
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Interactive 3D web applications, motion experiments, and AI companion interfaces.
          </p>
        </div>

        {/* Clean Playground Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.playground.map((item) => (
            <a
              key={item.number}
              href={item.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#111111] border border-[#242424] p-6 flex flex-col justify-between space-y-6 hover:border-[#C75B32]/60 transition-colors group"
              data-cursor="LAUNCH"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-[#8E8B85]">
                  <span className="text-[#C75B32] font-bold">{item.number}</span>
                  <span className="text-[10px] bg-[#080808] px-2 py-0.5 border border-[#242424]">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold uppercase text-[#E8E5DF] group-hover:text-[#C75B32] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-light text-[#8E8B85] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#242424] flex justify-between items-center text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-[#8E8B85]">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-[#C75B32] group-hover:underline">
                  LAUNCH ↗
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
