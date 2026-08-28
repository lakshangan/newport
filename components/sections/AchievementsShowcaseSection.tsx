'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Medal, Sparkles } from "lucide-react";

interface CounterNumberProps {
  value: string | number;
  className?: string;
}

const CounterNumber: React.FC<CounterNumberProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    if (!isInView) return;

    const strVal = String(value);
    const numericMatch = strVal.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(strVal);
      return;
    }

    const targetNum = parseInt(numericMatch[0], 10);
    const suffix = strVal.replace(/\d+/, "");
    const hasLeadingZero = strVal.startsWith("0") && targetNum < 10 && strVal.length > 1;

    const duration = 1800;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * targetNum);

      const formattedCurrent = hasLeadingZero && current < 10 ? `0${current}` : `${current}`;
      setDisplayValue(`${formattedCurrent}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        const finalFormatted = hasLeadingZero && targetNum < 10 ? `0${targetNum}` : `${targetNum}`;
        setDisplayValue(`${finalFormatted}${suffix}`);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export const AchievementsShowcaseSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Renaissance Fresco Artwork Background (Oak Leaves, Parchment Sky, Desk & Castle Towers) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/about section .png"
          alt="Renaissance Fresco Milestones Background"
          fill
          priority
          className="object-cover object-center filter contrast-105 brightness-95 opacity-100"
          sizes="100vw"
        />
      </div>

      {/* Top & Bottom Vignette Transitions for Navigation & Page Flow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080808]/90 via-[#080808]/50 to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808]/90 via-[#080808]/50 to-transparent z-1 pointer-events-none" />

      {/* Center Floating Content Layout (Matched for Warm Parchment Fresco Sky) */}
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-12 relative z-10 text-center space-y-10 sm:space-y-14 my-auto">
        
        {/* Top Floating Badge (Deep Sienna / Dark Renaissance Charcoal) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C0E08]/90 border border-[#9A3412]/50 text-xs font-mono text-[#FDBA74] tracking-widest uppercase backdrop-blur-xl shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA74] animate-pulse" />
          <span>// COMPETITIVE MILESTONES &amp; DISCIPLINE</span>
        </motion.div>

        {/* 3 Floating High-Impact Stats (High Contrast Renaissance Color Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start text-center">
          
          {/* Stat 1: 25+ Hackathons Participated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 group"
          >
            <div className="flex justify-center items-center text-[#0F766E] mb-1">
              <Trophy className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform" />
            </div>

            <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#180D07] drop-shadow-[0_3px_10px_rgba(255,255,255,0.7)]">
              <CounterNumber value="25+" />
            </p>

            <div className="space-y-1">
              <h3 className="font-mono text-xs sm:text-sm font-black text-[#0F766E] tracking-widest uppercase drop-shadow-sm">
                HACKATHONS PARTICIPATED
              </h3>
              <p className="text-xs text-[#292524] font-sans font-medium max-w-xs mx-auto leading-relaxed drop-shadow-sm">
                National &amp; global marathons building real-world Web3, AI, and full-stack software.
              </p>
            </div>
          </motion.div>

          {/* Stat 2: 20+ Finalist Finishes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 group"
          >
            <div className="flex justify-center items-center text-[#9A3412] mb-1">
              <Award className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform" />
            </div>

            <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#9A3412] drop-shadow-[0_3px_10px_rgba(255,255,255,0.6)]">
              <CounterNumber value="20+" />
            </p>

            <div className="space-y-1">
              <h3 className="font-mono text-xs sm:text-sm font-black text-[#9A3412] tracking-widest uppercase drop-shadow-sm">
                FINALIST FINISHES
              </h3>
              <p className="text-xs text-[#292524] font-sans font-medium max-w-xs mx-auto leading-relaxed drop-shadow-sm">
                Top-tier finalist placements delivering production-grade code under 36-hr deadlines.
              </p>
            </div>
          </motion.div>

          {/* Stat 3: International Silambam Bronze Medalist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 group"
          >
            <div className="flex justify-center items-center text-[#854D0E] mb-1">
              <Medal className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[#854D0E] tracking-tight drop-shadow-[0_3px_10px_rgba(255,255,255,0.6)]">
                BRONZE
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-mono text-xs sm:text-sm font-black text-[#854D0E] tracking-widest uppercase drop-shadow-sm">
                INTL SILAMBAM MEDALIST
              </h3>
              <p className="text-xs text-[#292524] font-sans font-medium max-w-xs mx-auto leading-relaxed drop-shadow-sm">
                Bronze Medalist at the International Silambam Championship—combining physical mastery with digital precision.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AchievementsShowcaseSection;
