'use client';

import React from 'react';
import ScrollDissolveReveal from '../ui/ScrollDissolveReveal';

export const SectionDissolveTransition: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808] border-y border-white/10">
      <ScrollDissolveReveal
        imageFront="/images/intro1.png"
        imageBack="/images/number.png"
      >
        {/* Top Tag */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <span className="px-3.5 py-1 bg-black/70 border border-[#5CE1E6]/40 text-[#5CE1E6] text-xs font-mono font-bold rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
            // SHADER DISSOLVE TRANSITION
          </span>
        </div>

        {/* Center Headline Badge */}
        <div className="space-y-3 max-w-2xl bg-black/60 border border-white/20 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl pointer-events-auto my-auto">
          <div className="text-xs font-mono text-[#E88053] tracking-widest uppercase flex items-center gap-2">
            <span>STORY</span>
            <span>→</span>
            <span>MILESTONES</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            FROM CRAFTSMANSHIP TO PROVEN IMPACT.
          </h3>
          <p className="text-xs sm:text-sm font-mono text-white/70 leading-relaxed">
            WebGL Sobel edge detection dissolve transition connecting builder story into competitive achievements &amp; national track wins.
          </p>
        </div>

        {/* Bottom Marker */}
        <div className="text-[10px] sm:text-xs font-mono text-white/60 flex justify-between items-center pointer-events-auto">
          <span>01 — ABOUT THE BUILDER</span>
          <span className="animate-bounce">KEEP SCROLLING TO DISSOLVE ↓</span>
          <span>02 — MILESTONES</span>
        </div>
      </ScrollDissolveReveal>
    </section>
  );
};

export default SectionDissolveTransition;
