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
    <section className="relative w-full py-24 sm:py-36 bg-[#080808] border-t border-white/10 overflow-hidden select-none min-h-[85vh] flex items-center">
      
      {/* Halftone Camera & Hand Artwork Background (number.png) - 100% Vivid Visibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/number.png"
          alt="Halftone Camera & Hand Artwork Background"
          fill
          priority
          className="object-cover object-left md:object-center filter contrast-110 brightness-110 opacity-100"
          sizes="100vw"
        />
      </div>

      {/* Volumetric Center Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#C75B32]/12 rounded-full blur-[170px] pointer-events-none z-1" />
      <div className="absolute bottom-10 right-1/3 w-[450px] h-[300px] bg-[#5CE1E6]/10 rounded-full blur-[150px] pointer-events-none z-1" />

      {/* Subtle Top & Bottom Vignette (Leaves Left Camera Artwork Uncovered) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080808] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808] to-transparent z-1 pointer-events-none" />

      {/* Right-Aligned Floating Content Layout (Fits number.png Open Dark Right Region) */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-10 flex justify-center lg:justify-end">
        <div className="w-full lg:w-9/12 lg:ml-auto text-center md:text-right space-y-12 sm:space-y-16">
          
          {/* Top Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/80 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-xl shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C75B32] animate-pulse" />
            <span>// COMPETITIVE MILESTONES &amp; DISCIPLINE</span>
          </motion.div>

          {/* 3 Floating High-Impact Stats (Positioned cleanly in number.png open right region) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start text-center md:text-right">
            
            {/* Stat 1: 25+ Hackathons Participated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 group"
            >
              <div className="flex justify-center md:justify-end items-center text-[#5CE1E6] mb-1">
                <Trophy className="w-7 h-7 drop-shadow-[0_0_15px_rgba(92,225,230,0.5)] group-hover:scale-110 transition-transform" />
              </div>

              <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                <CounterNumber value="25+" />
              </p>

              <div className="space-y-1">
                <h3 className="font-mono text-xs sm:text-sm font-extrabold text-[#5CE1E6] tracking-widest uppercase drop-shadow-md">
                  HACKATHONS PARTICIPATED
                </h3>
                <p className="text-xs text-white/80 font-sans max-w-xs mx-auto md:ml-auto md:mr-0 leading-relaxed drop-shadow-md">
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
              <div className="flex justify-center md:justify-end items-center text-[#C75B32] mb-1">
                <Award className="w-7 h-7 drop-shadow-[0_0_15px_rgba(199,91,50,0.5)] group-hover:scale-110 transition-transform" />
              </div>

              <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#C75B32] drop-shadow-[0_10px_35px_rgba(199,91,50,0.4)]">
                <CounterNumber value="20+" />
              </p>

              <div className="space-y-1">
                <h3 className="font-mono text-xs sm:text-sm font-extrabold text-[#E88053] tracking-widest uppercase drop-shadow-md">
                  FINALIST FINISHES
                </h3>
                <p className="text-xs text-white/80 font-sans max-w-xs mx-auto md:ml-auto md:mr-0 leading-relaxed drop-shadow-md">
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
              <div className="flex justify-center md:justify-end items-center text-[#FACC15] mb-1">
                <Medal className="w-7 h-7 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex items-center justify-center md:justify-end space-x-2">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[#FACC15] tracking-tight drop-shadow-[0_10px_35px_rgba(250,204,21,0.4)]">
                  BRONZE
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-xs sm:text-sm font-extrabold text-[#FACC15] tracking-widest uppercase drop-shadow-md">
                  INTL SILAMBAM MEDALIST
                </h3>
                <p className="text-xs text-white/80 font-sans max-w-xs mx-auto md:ml-auto md:mr-0 leading-relaxed drop-shadow-md">
                  Bronze Medalist at the International Silambam Championship—combining physical mastery with digital precision.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AchievementsShowcaseSection;
