'use client';

import React from 'react';
import { ResearchBentoGrid } from '@/components/ui/ResearchBentoGrid';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const DevLabBentoSection: React.FC = () => {
  return (
    <section id="dev-stack-lab" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#070709] via-[#10141e] to-[#070709] border-t border-white/10 relative overflow-hidden">
      {/* Cloud & Server Node Infrastructure Grid Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2636_1.5px,transparent_1.5px)] bg-[size:18px_18px] opacity-45 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141b29_1px,transparent_1px),linear-gradient(to_bottom,#141b29_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

      {/* Deep Sapphire & Violet Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/8 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 border-b border-white/15 pb-6">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 07 DEV LAB &amp; DEPLOYMENT STACK
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            <AsciiGlitchRipple as="span" dur={900}>
              DEV LAB &amp; WORKFLOW
            </AsciiGlitchRipple>
          </h2>
          <p className="text-sm sm:text-base font-light text-white/60 max-w-xl">
            Interactive bento dashboard mapping multi-cloud infrastructure, solo execution velocity, and sprint orchestration.
          </p>
        </div>

        {/* Interactive Bento Component */}
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#0c0c0e]">
          <ResearchBentoGrid />
        </div>
      </div>
    </section>
  );
};

export default DevLabBentoSection;
