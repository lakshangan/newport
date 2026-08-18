'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ActionWord {
  text: string;
  gradient: string;
}

const ACTION_WORDS: ActionWord[] = [
  { text: 'cook.', gradient: 'from-purple-400 via-pink-400 to-pink-600' },
  { text: 'ship.', gradient: 'from-pink-500 via-rose-500 to-red-500' },
  { text: 'prompt.', gradient: 'from-orange-500 via-amber-600 to-yellow-600' },
  { text: 'collaborate.', gradient: 'from-amber-300 via-yellow-400 to-amber-500' },
  { text: 'create.', gradient: 'from-emerald-400 via-green-400 to-teal-600' },
  { text: 'inspire.', gradient: 'from-cyan-400 via-sky-400 to-blue-600' },
  { text: 'follow.', gradient: 'from-indigo-400 via-indigo-500 to-purple-600' },
  { text: 'build.', gradient: 'from-[#C75B32] via-[#E88053] to-[#F2A374]' },
];

export const ScrollWordRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate vertical translation to scroll through the word list
  // 8 words total -> scroll from top word to bottom word
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ['18%', `-${(ACTION_WORDS.length - 1.5) * 11}%`]
  );

  return (
    <section ref={containerRef} className="relative h-[320vh] w-full bg-[#050505]">
      {/* Blueprint Grid & Ambient Dark Background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#050505] bg-[linear-gradient(to_right,#1f1f22_1px,transparent_1px),linear-gradient(to_bottom,#1f1f22_1px,transparent_1px)] bg-[size:4rem_4rem]">
        
        {/* Top Header Badge */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-mono tracking-wider text-white/70 bg-white/5 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>you can scroll.</span>
          </div>

          <div className="hidden sm:block text-xs font-mono text-white/40 tracking-widest uppercase">
            // DISCIPLINE IN MOTION
          </div>
        </div>

        {/* Center Main Reveal Phrase */}
        <div className="relative z-10 flex items-center justify-center my-auto w-full max-w-6xl mx-auto">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-3 sm:space-x-5 md:space-x-8 text-center md:text-left">
            
            {/* Left Fixed Anchor Text */}
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] select-none">
              you can
            </span>

            {/* Right Scroll-Driven Word Wheel */}
            <div className="relative h-[1.3em] overflow-hidden flex items-center min-w-[240px] sm:min-w-[380px] md:min-w-[500px]">
              <motion.div style={{ y: yTransform }} className="flex flex-col space-y-2 sm:space-y-4">
                {ACTION_WORDS.map((word, index) => {
                  // Calculate scale and opacity range based on scroll position
                  const step = 1 / (ACTION_WORDS.length - 1);
                  const targetProgress = index * step;

                  return (
                    <WordItem
                      key={index}
                      word={word}
                      index={index}
                      targetProgress={targetProgress}
                      scrollYProgress={scrollYProgress}
                    />
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Ambient Marker */}
        <div className="relative z-20 flex justify-between items-end w-full text-[10px] sm:text-xs font-mono text-white/40">
          <div>// ARCHITECTURE &amp; EXECUTION</div>
          <div>SCROLL TO DISCOVER</div>
        </div>
      </div>
    </section>
  );
};

interface WordItemProps {
  word: ActionWord;
  index: number;
  targetProgress: number;
  scrollYProgress: any;
}

const WordItem: React.FC<WordItemProps> = ({ word, index, targetProgress, scrollYProgress }) => {
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, targetProgress - 0.15),
      targetProgress,
      Math.min(1, targetProgress + 0.15),
    ],
    [0.2, 1, 0.2]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, targetProgress - 0.15),
      targetProgress,
      Math.min(1, targetProgress + 0.15),
    ],
    [0.92, 1.08, 0.92]
  );

  return (
    <motion.span
      style={{ opacity, scale }}
      className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${word.gradient} drop-shadow-2xl inline-block leading-none py-1 select-none transition-all`}
    >
      {word.text}
    </motion.span>
  );
};
