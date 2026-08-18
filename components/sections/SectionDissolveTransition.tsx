'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR false for R3F Canvas
const ScrollDissolveReveal = dynamic(
  () => import('../ui/ScrollDissolveReveal').then((m) => m.ScrollDissolveReveal),
  { ssr: false }
);

export const SectionDissolveTransition: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black border-y border-white/10">
      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto">
        {/* Top Tag */}
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-black/60 border border-white/20 text-[#C75B32] text-xs font-mono font-bold rounded-full backdrop-blur-md">
            // SHADER DISSOLVE TRANSITION
          </span>
        </div>

        {/* Center Headline Badge */}
        <div className="space-y-3 max-w-2xl bg-black/50 border border-white/15 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div className="text-xs font-mono text-[#E88053] tracking-widest uppercase">
            COMMUNITY &amp; COMPETITION
          </div>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            FROM DEMO DAYS TO NATIONAL TRACK WINS.
          </h3>
          <p className="text-xs sm:text-sm font-mono text-white/70">
            Scroll to trigger WebGL Sobel edge detection dissolve transition between builder events.
          </p>
        </div>

        {/* Bottom Marker */}
        <div className="text-[10px] sm:text-xs font-mono text-white/50 flex justify-between items-center">
          <span>📍 BENGALURU ⇄ NIT CALICUT</span>
          <span>SCROLL TO DISSOLVE ↓</span>
        </div>
      </div>

      {/* WebGL R3F Dissolve Scene */}
      <ScrollDissolveReveal
        imageFront="/images/IMG_0400.jpeg"
        imageBack="/images/IMG_8920.JPG"
      />
    </section>
  );
};
