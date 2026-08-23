"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AsciiGlitchRipple } from "@/components/ui/AsciiGlitchRipple";

const WORD_ITEMS = [
  { text: "code.", desc: "EVM Smart Contracts & Protocol Logic", color: "text-[#5CE1E6]" },
  { text: "build.", desc: "High-Performance AI & 3D WebGL Interfaces", color: "text-[#38BDF8]" },
  { text: "learn.", desc: "Web3 Cryptography & Distributed Systems", color: "text-[#C084FC]" },
  { text: "ship.", desc: "Full-Stack Production Applications", color: "text-[#FF6B35]" },
  { text: "innovate.", desc: "C2PA Provenance & Autonomous Agents", color: "text-[#FACC15]" },
  { text: "optimize.", desc: "Low-Latency Edge Execution & Performance", color: "text-[#34D399]" },
  { text: "like.", desc: "Crafting Pixel-Perfect Modern Aesthetics", color: "text-[#F472B6]" },
  { text: "do it.", desc: "Shipping End-to-End Scalable Systems", color: "text-[#FB7185]" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Create GSAP ScrollTrigger timeline to step through active words cleanly on scroll
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2200",
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      onUpdate: (self) => {
        const idx = Math.min(
          WORD_ITEMS.length - 1,
          Math.floor(self.progress * WORD_ITEMS.length)
        );
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#050505] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Subtle Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f26_1px,transparent_1px),linear-gradient(to_bottom,#1f1f26_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Pinned Section Info */}
        <div className="w-full lg:w-5/12 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/60 border border-white/15 text-[#C75B32] text-xs font-mono rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>DISCIPLINE &amp; EXECUTION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-2xl">
            I LOVE<br />
            <span className="text-[#C75B32]">TO.</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono tracking-wider text-white/80 max-w-md leading-relaxed">
            Building minimal, robust, and high-performance technical systems across Web3 protocols, AI agents, and graphics.
          </p>

          {/* Active Highlight Detail Pill */}
          <div className="pt-2">
            <div className="inline-block p-4 bg-[#0c0c0e]/90 border border-white/15 rounded-xl space-y-1 backdrop-blur-xl shadow-2xl transition-all duration-300">
              <span className="text-[10px] font-mono text-[#5CE1E6] uppercase tracking-widest block">
                FOCUS // 0{activeIndex + 1}
              </span>
              <p className="text-xs sm:text-sm font-mono text-white/95">
                {WORD_ITEMS[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Unclipped Stacked Word List */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center space-y-3 sm:space-y-4 py-4">
          {WORD_ITEMS.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-300 cursor-pointer select-none flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3 ${
                  isActive
                    ? `${item.color} translate-x-3 sm:translate-x-6 opacity-100 scale-105 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`
                    : "text-white/40 hover:text-white/80 opacity-40 translate-x-0 scale-100"
                }`}
              >
                <AsciiGlitchRipple as="span" dur={900}>
                  {item.text}
                </AsciiGlitchRipple>

                <span
                  className={`font-mono text-xs sm:text-sm tracking-widest transition-all duration-300 ${
                    isActive ? "opacity-100 text-[#5CE1E6] scale-110" : "opacity-0"
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
