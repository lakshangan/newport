'use client';

import React from 'react';
import { ResearchBentoGrid } from '@/components/ui/ResearchBentoGrid';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const DevLabBentoSection: React.FC = () => {
  return (
    <section id="dev-stack-lab" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C75B32]/5 rounded-full blur-[160px] pointer-events-none" />

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
