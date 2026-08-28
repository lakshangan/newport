'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Zap, Rocket } from "lucide-react";

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

interface MetricCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  detail: string;
  accentColor: string;
  tag: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  number,
  label,
  detail,
  accentColor,
  tag,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className="p-6 sm:p-7 bg-[#0b0b0f]/85 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-4 hover:border-white/30 transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-white/80">
            {icon}
            <span>{tag}</span>
          </div>
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border"
            style={{
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            VERIFIED
          </span>
        </div>

        <div>
          <p
            className="text-4xl sm:text-6xl font-display font-black tracking-tight drop-shadow-md"
            style={{ color: accentColor }}
          >
            <CounterNumber value={number} />
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-1">
        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
          {label}
        </h4>
        <p className="text-xs text-white/70 font-sans leading-relaxed">
          {detail}
        </p>
      </div>
    </motion.div>
  );
};

export const RenaissanceStatsSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] py-20 sm:py-28 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden select-none flex flex-col justify-center">
      
      {/* Renaissance Artwork Background with Dark Vignette Integration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/images/about section .png"
          alt="Renaissance Artwork Background"
          fill
          priority
          className="object-cover object-center filter contrast-110 brightness-85"
          sizes="100vw"
        />
      </div>

      {/* Renaissance Vitruvian Blueprint Grid Pattern */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-25 pointer-events-none" />

      {/* Dark Vignettes & Soft Gradients for Seamless Theme Integration */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/90 via-black/50 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/90 pointer-events-none" />

      {/* Ambient Volumetric Warm Glows */}
      <div className="absolute top-1/4 left-1/3 w-[550px] h-[400px] bg-[#C75B32]/15 rounded-full blur-[170px] pointer-events-none z-2" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#5CE1E6]/10 rounded-full blur-[150px] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 border border-[#C75B32]/40 text-xs font-mono text-[#C75B32] tracking-widest uppercase backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>03 // REN&apos;AISSANCE TELEMETRY &amp; IMPACT</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            CRAFTSMANSHIP IN NUMBERS
          </h2>

          <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
            Quantifiable track record of competitive marathons, top placements, and deployed production software with live counting telemetry.
          </p>
        </div>

        {/* 4-Card Floating Metric Grid with CountUp Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 25+ Hackathons */}
          <MetricCard
            icon={<Trophy className="w-4 h-4 text-[#5CE1E6]" />}
            number="25+"
            label="Hackathons Participated"
            detail="Competed & shipped under 36-hr marathon constraints across national & global stages."
            accentColor="#5CE1E6"
            tag="MARATHONS"
            delay={0.1}
          />

          {/* Card 2: 20+ Finalist Finishes */}
          <MetricCard
            icon={<Award className="w-4 h-4 text-[#C75B32]" />}
            number="20+"
            label="Finalist Finishes"
            detail="Consistent top-tier finalist placements delivering production-grade code."
            accentColor="#C75B32"
            tag="TOP-TIER"
            delay={0.2}
          />

          {/* Card 3: 01 Track Winner */}
          <MetricCard
            icon={<Zap className="w-4 h-4 text-[#FACC15]" />}
            number="01"
            label="1st Place Track Winner"
            detail="Won 1st Place Track Prize at Build On Chain @ NIT Calicut for EVM smart contract innovation."
            accentColor="#FACC15"
            tag="1ST PLACE"
            delay={0.3}
          />

          {/* Card 4: 15+ Full-Stack Deployments */}
          <MetricCard
            icon={<Rocket className="w-4 h-4 text-[#10B981]" />}
            number="15+"
            label="Full-Stack Apps &amp; DApps"
            detail="Production web platforms, AI provenance credentials, &amp; smart contract vaults."
            accentColor="#10B981"
            tag="DEPLOYED"
            delay={0.4}
          />

        </div>

      </div>
    </section>
  );
};

export default RenaissanceStatsSection;
