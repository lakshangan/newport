'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Trophy, Award, Zap, Globe, Rocket } from "lucide-react";

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

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
  icon?: React.ReactNode;
  tag?: string;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  icon,
  tag,
  className,
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-[#0c0c10]/95 border border-white/10 hover:border-[#C75B32]/50 transition-all duration-300 shadow-xl group h-full ${className || ''}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
    >
      {/* SVG Animated Ambient Gradient Background */}
      <AnimatedGradient colors={colors} speed={0.08} blur="medium" />

      {/* Renaissance Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

      {/* Glassmorphism Compact Content Layout */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md bg-black/40 h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white/80 font-mono text-[11px] uppercase tracking-widest">
              {icon}
              <span className="font-bold">{title}</span>
            </div>
            {tag && (
              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-[#C75B32]/40 text-[9px] font-mono text-[#C75B32] uppercase font-semibold tracking-wider shrink-0">
                {tag}
              </span>
            )}
          </div>

          <div>
            <p className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white drop-shadow-lg">
              <CounterNumber value={value} />
            </p>
          </div>
        </div>

        {subtitle && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-[11px] sm:text-xs text-white/75 font-sans leading-snug line-clamp-2">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const StatsBentoSection: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none">
      
      {/* Renaissance Artwork Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Image
          src="/images/about section .png"
          alt="Renaissance Art Texture"
          fill
          className="object-cover object-center filter contrast-105 brightness-90"
        />
      </div>

      {/* Renaissance Architectural Grid Pattern */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-20 pointer-events-none" />

      {/* Warm Ambient Volumetric Glows */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[#C75B32]/12 rounded-full blur-[150px] pointer-events-none z-1" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/8 rounded-full blur-[150px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Compact Renaissance & Tech Header */}
        <div className="space-y-1.5 border-b border-white/10 pb-4 text-left">
          <div className="text-xs font-mono tracking-widest text-[#C75B32] uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>02 // REN&apos;AISSANCE METRICS &amp; TELEMETRY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
            METRICS &amp; IMPACT
          </h2>
          <p className="text-xs sm:text-sm font-light text-white/60 max-w-xl">
            A compact square-cell bento grid tracking competitive hackathons, top placements, and deployed full-stack products.
          </p>
        </div>

        {/* Square-Unit Bento Grid Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 1: Total Hackathons (2x1 Rectangle) */}
          <div className="md:col-span-2 aspect-auto sm:aspect-[2/1]">
            <BentoCard
              title="HACKATHON MARATHONS"
              value="25+"
              subtitle="Competed in 25+ national and international Web3, AI, and full-stack software shipping marathons."
              colors={["#5CE1E6", "#3B82F6", "#1E40AF"]}
              delay={0.1}
              icon={<Trophy className="w-4 h-4 text-[#5CE1E6]" />}
              tag="BUILD &amp; SHIP"
            />
          </div>

          {/* Card 2: Finalist Finishes (1x1 PERFECT SQUARE) */}
          <div className="md:col-span-1 aspect-auto sm:aspect-square">
            <BentoCard
              title="FINALIST FINISHES"
              value="20+"
              subtitle="Consistent top-tier finalist placements delivering production-grade code under 36-hr limits."
              colors={["#C75B32", "#E88053", "#FF6B35"]}
              delay={0.15}
              icon={<Award className="w-4 h-4 text-[#C75B32]" />}
              tag="TOP-TIER"
            />
          </div>

          {/* Card 3: Track Winner (1x1 PERFECT SQUARE) */}
          <div className="md:col-span-1 aspect-auto sm:aspect-square">
            <BentoCard
              title="1ST PLACE WINNER"
              value="01"
              subtitle="Won 1st Place Track Prize at Build On Chain @ NIT Calicut for EVM smart contract innovation."
              colors={["#FACC15", "#E88053", "#C75B32"]}
              delay={0.2}
              icon={<Zap className="w-4 h-4 text-[#FACC15]" />}
              tag="BUILD ON CHAIN"
            />
          </div>

          {/* Card 4: SIH & UNESCO Global (2x1 Rectangle) */}
          <div className="md:col-span-2 aspect-auto sm:aspect-[2/1]">
            <BentoCard
              title="NATIONAL &amp; GLOBAL SELECTIONS"
              value="02"
              subtitle="Smart India Hackathon 2023 National Finalist &amp; UNESCO-IOC Circle Global Platform Selection."
              colors={["#C084FC", "#8B5CF6", "#5CE1E6"]}
              delay={0.25}
              icon={<Globe className="w-4 h-4 text-[#C084FC]" />}
              tag="NATIONAL &amp; GLOBAL"
            />
          </div>

          {/* Card 5: Full-Stack Apps Shipped (3x1 Rectangle) */}
          <div className="md:col-span-3 aspect-auto sm:aspect-[3/1] md:aspect-[3.2/1]">
            <BentoCard
              title="SHIPPED FULL-STACK APPLICATIONS &amp; DAPPS"
              value="15+"
              subtitle="Full-stack web applications, AI provenance verification engines, tokenized real estate smart contract vaults, and security CLI tools deployed and functional."
              colors={["#10B981", "#059669", "#3B82F6"]}
              delay={0.3}
              icon={<Rocket className="w-4 h-4 text-[#10B981]" />}
              tag="PRODUCTION DEPLOYMENTS"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsBentoSection;
