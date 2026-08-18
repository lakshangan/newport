'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RevealPhrase {
  text: string;
  gradient: string;
}

const PHRASES: RevealPhrase[] = [
  { text: 'code & architect.', gradient: 'from-[#C75B32] via-[#E88053] to-[#F2A374]' },
  { text: 'design 3D web experiences.', gradient: 'from-purple-400 via-pink-400 to-rose-400' },
  { text: 'develop blockchain protocols.', gradient: 'from-cyan-400 via-sky-400 to-blue-500' },
  { text: 'build intelligent AI models.', gradient: 'from-emerald-400 via-green-400 to-teal-400' },
  { text: 'learn & ship relentlessly.', gradient: 'from-amber-300 via-yellow-400 to-amber-500' },
];

export const ScrollWordRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative h-[220vh] w-full bg-[#080808]">
      {/* Sticky Minimal Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#080808]">
        
        {/* Minimal Radial Spotlight Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C75B32]/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-white/70 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>PHILOSOPHY // 01</span>
          </div>

          <div className="hidden sm:block text-xs font-mono text-white/40 tracking-widest uppercase">
            // DRIVEN TO BUILD
          </div>
        </div>

        {/* Center Sticky Reveal Statement */}
        <div className="relative z-10 flex items-center justify-center my-auto w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
            
            {/* Fixed Prefix Anchor */}
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight select-none">
              I LOVE TO
            </span>

            {/* In-Place Rotating Phrase Switcher */}
            <div className="relative h-[1.4em] min-w-[280px] sm:min-w-[420px] md:min-w-[620px] flex items-center justify-center md:justify-start">
              {PHRASES.map((phrase, index) => (
                <PhraseItem
                  key={index}
                  phrase={phrase}
                  index={index}
                  total={PHRASES.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-20 flex justify-between items-end w-full max-w-7xl mx-auto text-[10px] sm:text-xs font-mono text-white/40">
          <div>// CREATIVE TECHNOLOGY &amp; WEB3</div>
          <div>KEEP SCROLLING ↓</div>
        </div>

      </div>
    </section>
  );
};

interface PhraseItemProps {
  phrase: RevealPhrase;
  index: number;
  total: number;
  scrollYProgress: any;
}

const PhraseItem: React.FC<PhraseItemProps> = ({ phrase, index, total, scrollYProgress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // In-place fade & slide transition per phrase as scroll progresses
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.05),
      start + 0.04,
      end - 0.04,
      Math.min(1, end + 0.05),
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.05),
      start + 0.04,
      end - 0.04,
      Math.min(1, end + 0.05),
    ],
    [24, 0, 0, -24]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.05),
      start + 0.04,
      end - 0.04,
      Math.min(1, end + 0.05),
    ],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`absolute inset-0 flex items-center justify-center md:justify-start font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${phrase.gradient} select-none leading-none`}
    >
      {phrase.text}
    </motion.span>
  );
};
