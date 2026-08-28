"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Zap, Rocket } from "lucide-react";

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

const WORD_ITEMS = [
  { text: "code.", color: "text-[#5CE1E6]" },
  { text: "build.", color: "text-[#E88053]" },
  { text: "learn.", color: "text-[#C084FC]" },
  { text: "ship.", color: "text-[#FF6B35]" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!words.length) return;

    words.forEach((word, idx) => {
      if (idx === 0) {
        gsap.set(word, { opacity: 1, y: "0%", force3D: true });
      } else {
        gsap.set(word, { opacity: 0, y: "100%", force3D: true });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2200",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        fastScrollEnd: true,
        preventOverlaps: true,
      },
    });

    for (let i = 1; i < words.length; i++) {
      const prevWord = words[i - 1];
      const currWord = words[i];

      tl.to(prevWord, { opacity: 0, y: "-100%", duration: 1, ease: "power2.inOut", force3D: true }, `step-${i}`)
        .fromTo(
          currWord,
          { opacity: 0, y: "100%", force3D: true },
          { opacity: 1, y: "0%", duration: 1, ease: "power2.inOut", force3D: true },
          `step-${i}`
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen h-screen flex flex-col items-center justify-between py-12 bg-[#080808] overflow-hidden select-none"
    >
      {/* Renaissance Artwork Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/about section .png"
          alt="Renaissance Artwork Background"
          fill
          priority
          className="object-cover object-center filter contrast-[1.03] brightness-95"
          sizes="100vw"
        />
      </div>

      {/* Renaissance Blueprint Overlay */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#2a1810_1px,transparent_1px),linear-gradient(to_bottom,#2a1810_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

      {/* Top & Bottom Vignette Transitions */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080808] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-black/30 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-10 my-auto flex flex-col justify-between h-full py-8 space-y-8">
        
        {/* Top: Animated Rotating Title Phrase */}
        <div className="w-full flex items-center justify-center sm:justify-start text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-none pt-4">
          <span className="text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] whitespace-nowrap mr-3 shrink-0">
            I LOVE TO
          </span>

          <div className="relative h-[1.3em] font-display font-black uppercase tracking-tight inline-flex items-center min-w-[220px] sm:min-w-[400px]">
            {WORD_ITEMS.map((item, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                style={{ willChange: "transform, opacity" }}
                className={`absolute left-0 top-0 w-full h-full flex items-center ${item.color} font-display font-black uppercase tracking-tight select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Center / Right Sky: Floating Metrics Panel with Counting Number Effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-auto">
          
          {/* Card 1: Hackathons Participated */}
          <div className="p-4 sm:p-5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-xl space-y-2 shadow-2xl hover:border-[#5CE1E6]/50 transition-all">
            <div className="flex justify-between items-center text-xs font-mono text-[#5CE1E6]">
              <Trophy className="w-4 h-4" />
              <span>MARATHONS</span>
            </div>
            <p className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
              <CounterNumber value="25+" />
            </p>
            <p className="text-[11px] text-white/70 font-mono uppercase font-semibold">
              Hackathons Participated
            </p>
          </div>

          {/* Card 2: Finalist Finishes */}
          <div className="p-4 sm:p-5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-xl space-y-2 shadow-2xl hover:border-[#C75B32]/50 transition-all">
            <div className="flex justify-between items-center text-xs font-mono text-[#C75B32]">
              <Award className="w-4 h-4" />
              <span>TOP-TIER</span>
            </div>
            <p className="text-3xl sm:text-5xl font-display font-black text-[#C75B32] tracking-tight drop-shadow-md">
              <CounterNumber value="20+" />
            </p>
            <p className="text-[11px] text-white/70 font-mono uppercase font-semibold">
              Finalist Finishes
            </p>
          </div>

          {/* Card 3: 1st Place Winner */}
          <div className="p-4 sm:p-5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-xl space-y-2 shadow-2xl hover:border-[#FACC15]/50 transition-all">
            <div className="flex justify-between items-center text-xs font-mono text-[#FACC15]">
              <Zap className="w-4 h-4" />
              <span>1ST PLACE</span>
            </div>
            <p className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight drop-shadow-md">
              <CounterNumber value="01" />
            </p>
            <p className="text-[11px] text-white/70 font-mono uppercase font-semibold">
              Track Winner @ NIT Calicut
            </p>
          </div>

          {/* Card 4: Full-Stack Deployments */}
          <div className="p-4 sm:p-5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-xl space-y-2 shadow-2xl hover:border-[#10B981]/50 transition-all">
            <div className="flex justify-between items-center text-xs font-mono text-[#10B981]">
              <Rocket className="w-4 h-4" />
              <span>SHIPPED</span>
            </div>
            <p className="text-3xl sm:text-5xl font-display font-black text-[#10B981] tracking-tight drop-shadow-md">
              <CounterNumber value="15+" />
            </p>
            <p className="text-[11px] text-white/70 font-mono uppercase font-semibold">
              Full-Stack Apps &amp; DApps
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
