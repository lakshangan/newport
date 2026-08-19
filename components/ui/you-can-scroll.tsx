"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AsciiGlitchRipple } from "@/components/ui/AsciiGlitchRipple";

const FOUR_WORDS = [
  { text: "BUILD.", desc: "EVM Smart Contracts & DeFi Hooks" },
  { text: "DESIGN.", desc: "High-Performance 3D WebGL Interfaces" },
  { text: "LEARN.", desc: "Web3 Protocol & AI Technical Research" },
  { text: "INNOVATE.", desc: "C2PA Provenance & LLM Diagnostic Agents" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(".scroll-word-item");
    if (!items || items.length === 0) return;

    // ScrollTrigger to highlight words sequentially as section scrolls through viewport
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      onUpdate: (self) => {
        const idx = Math.min(
          FOUR_WORDS.length - 1,
          Math.floor(self.progress * FOUR_WORDS.length)
        );
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 sm:py-32 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C75B32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Static Pinned Headline */}
        <div className="w-full lg:w-5/12 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/5 border border-white/10 text-[#C75B32] text-xs font-mono rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>DISCIPLINE &amp; EXECUTION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-2xl">
            I LOVE<br />
            <span className="text-[#C75B32]">TO.</span>
          </h2>

          <p className="text-sm sm:text-base font-light text-white/60 max-w-md leading-relaxed">
            Building minimal, robust, and high-performance technical systems across Web3 protocols, AI agents, and graphics.
          </p>

          {/* Active Highlight Detail Pill */}
          <div className="pt-2">
            <div className="inline-block p-4 bg-[#111114] border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-[#C75B32] uppercase tracking-widest block">
                FOCUS // 0{activeIndex + 1}
              </span>
              <p className="text-xs font-mono text-white/90">
                {FOUR_WORDS[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right 4 Stacked Words */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center space-y-4 sm:space-y-6">
          {FOUR_WORDS.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className={`scroll-word-item font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight transition-all duration-500 select-none cursor-pointer flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 ${
                  isActive
                    ? "text-[#C75B32] translate-x-2 sm:translate-x-4 opacity-100"
                    : "text-white/20 hover:text-white/70 opacity-40 translate-x-0"
                }`}
              >
                <AsciiGlitchRipple as="span" dur={900}>
                  {item.text}
                </AsciiGlitchRipple>

                <span
                  className={`font-mono text-xs sm:text-sm tracking-widest transition-opacity duration-300 ${
                    isActive ? "opacity-100 text-[#C75B32]" : "opacity-0"
                  }`}
                >
                  0{i + 1} ↗
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
