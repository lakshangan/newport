'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Trophy, Award, Zap, Globe, Rocket, Terminal, Activity, Layers, Cpu, CheckCircle2 } from "lucide-react";

interface CounterNumberProps {
  value: string | number;
  className?: string;
}

const CounterNumber: React.FC<CounterNumberProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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

    const duration = 1600;
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

export const StatsBentoSection: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-20 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/8 rounded-full blur-[150px] pointer-events-none z-1" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-1.5 border-b border-white/10 pb-4 text-left">
          <div className="text-xs font-mono tracking-widest text-[#5CE1E6] uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#5CE1E6] animate-pulse" />
            <span>// 02 KEY METRICS &amp; TELEMETRY WORKSPACE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
            AGENT BENTO METRICS
          </h2>
          <p className="text-xs sm:text-sm font-light text-white/60 max-w-xl">
            Compact multi-agent workspace grid tracking competitive marathons, top placements, and deployed full-stack products.
          </p>
        </div>

        {/* Outer Dark Agent Bento Container */}
        <div className="p-4 sm:p-6 rounded-[2rem] bg-[#07070a] border border-white/10 shadow-2xl space-y-4">
          
          {/* Top Row: 3 Equal Compact Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Hackathon Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-[#0e0e14] border border-white/10 p-5 flex flex-col justify-between hover:border-[#5CE1E6]/40 transition-all group"
            >
              <AnimatedGradient colors={["#5CE1E6", "#3B82F6", "#1E40AF"]} speed={0.08} blur="medium" />

              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#5CE1E6]" />
                    Hackathon Pipeline
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 text-[9px] font-mono text-[#5CE1E6] uppercase">
                    25+ MARATHONS
                  </span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Visualise 25+ hackathons &amp; rapid software shipping workflows in real time.
                </p>
              </div>

              <div className="relative z-10 mt-4 p-3 bg-[#08080c] border border-white/10 rounded-xl space-y-2 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Total Competed:</span>
                  <span className="text-2xl font-bold text-[#5CE1E6] font-display">
                    <CounterNumber value="25+" />
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[10px] text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5CE1E6] animate-ping" />
                  <span>Sprint Duration: 36h Max</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Finalist Monitor */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative overflow-hidden rounded-2xl bg-[#0e0e14] border border-white/10 p-5 flex flex-col justify-between hover:border-[#C75B32]/40 transition-all group"
            >
              <AnimatedGradient colors={["#C75B32", "#E88053", "#FF6B35"]} speed={0.08} blur="medium" />

              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C75B32]" />
                    Finalist Monitor
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#C75B32]/10 border border-[#C75B32]/30 text-[9px] font-mono text-[#C75B32] uppercase">
                    20+ PLACEMENTS
                  </span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Track 20+ top-tier placements &amp; high-impact prototype success rates.
                </p>
              </div>

              <div className="relative z-10 mt-4 p-3 bg-[#08080c] border border-white/10 rounded-xl space-y-2 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Finalist Placements:</span>
                  <span className="text-2xl font-bold text-[#C75B32] font-display">
                    <CounterNumber value="20+" />
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/50">
                  <span>Success Rate: ~80%</span>
                  <span className="text-[#C75B32] font-bold">TOP-TIER</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Victory Feed */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-[#0e0e14] border border-white/10 p-5 flex flex-col justify-between hover:border-[#FACC15]/40 transition-all group"
            >
              <AnimatedGradient colors={["#FACC15", "#E88053", "#C75B32"]} speed={0.08} blur="medium" />

              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#FACC15]" />
                    Victory Feed
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/30 text-[9px] font-mono text-[#FACC15] uppercase">
                    1ST PLACE
                  </span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Real-time log of 1st place track wins &amp; EVM smart contract innovations.
                </p>
              </div>

              <div className="relative z-10 mt-4 p-3 bg-[#08080c] border border-white/10 rounded-xl space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-white/80">
                  <span className="truncate">🏆 Build On Chain @ NIT Calicut</span>
                  <span className="text-[#FACC15] font-bold font-display text-sm">
                    <CounterNumber value="01" />
                  </span>
                </div>
                <div className="text-[10px] text-white/50 truncate">
                  EVM Smart Contract Innovation
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Row: 2 Wider Compact Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Card 4: Global Stage (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="md:col-span-3 relative overflow-hidden rounded-2xl bg-[#0e0e14] border border-white/10 p-5 flex flex-col justify-between hover:border-[#C084FC]/40 transition-all group"
            >
              <AnimatedGradient colors={["#C084FC", "#8B5CF6", "#5CE1E6"]} speed={0.08} blur="medium" />

              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#C084FC]" />
                    Global Recognition
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 text-[9px] font-mono text-[#C084FC] uppercase">
                    2 SELECTIONS
                  </span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Selected across India&apos;s flagship Smart India Hackathon &amp; UNESCO-IOC Ocean Platform.
                </p>
              </div>

              <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 bg-[#08080c] border border-white/10 rounded-xl space-y-0.5">
                  <span className="text-[#C084FC] font-bold block">Smart India Hackathon</span>
                  <span className="text-[10px] text-white/50">National Stage Finalist</span>
                </div>
                <div className="p-2.5 bg-[#08080c] border border-white/10 rounded-xl space-y-0.5">
                  <span className="text-[#5CE1E6] font-bold block">UNESCO-IOC Network</span>
                  <span className="text-[10px] text-white/50">Circle Global Selection</span>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Deployment Inspector (Spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 relative overflow-hidden rounded-2xl bg-[#0e0e14] border border-white/10 p-5 flex flex-col justify-between hover:border-[#10B981]/40 transition-all group"
            >
              <AnimatedGradient colors={["#10B981", "#059669", "#3B82F6"]} speed={0.08} blur="medium" />

              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                    <Rocket className="w-4 h-4 text-[#10B981]" />
                    Deployment Inspector
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[9px] font-mono text-[#10B981] uppercase">
                    15+ DEPLOYMENTS
                  </span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Full-stack web apps, AI provenance engines, &amp; EVM vaults.
                </p>
              </div>

              <div className="relative z-10 mt-4 p-3 bg-[#08080c] border border-white/10 rounded-xl flex justify-between items-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-xs text-white/60 block">Shipped Applications:</span>
                  <span className="text-[10px] text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED DEPLOYED
                  </span>
                </div>
                <span className="text-2xl font-bold text-[#10B981] font-display">
                  <CounterNumber value="15+" />
                </span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsBentoSection;
