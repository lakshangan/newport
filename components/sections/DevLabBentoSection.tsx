'use client';

import React from 'react';
import { ResearchBentoGrid } from '@/components/ui/ResearchBentoGrid';

export const DevLabBentoSection: React.FC = () => {
  return (
    <section id="dev-stack-lab" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#070709] via-[#10141e] to-[#070709] border-t border-white/10 relative overflow-hidden">
      {/* Cloud & Server Node Infrastructure Grid Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2636_1.5px,transparent_1.5px)] bg-[size:18px_18px] opacity-45 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141b29_1px,transparent_1px),linear-gradient(to_bottom,#141b29_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

      {/* Deep Sapphire & Violet Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/8 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Interactive Bento Component */}
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#0c0c0e]">
          <ResearchBentoGrid />
        </div>
      </div>
    </section>
  );
};

export default DevLabBentoSection;
