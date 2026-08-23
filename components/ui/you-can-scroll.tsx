"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AsciiGlitchRipple } from "@/components/ui/AsciiGlitchRipple";

const WORD_ITEMS = [
  { text: "code.", desc: "EVM Smart Contracts & Protocol Logic" },
  { text: "build.", desc: "High-Performance AI & 3D WebGL Interfaces" },
  { text: "learn.", desc: "Web3 Cryptography & Distributed Systems" },
  { text: "ship.", desc: "Full-Stack Production Applications" },
  { text: "innovate.", desc: "C2PA Provenance & Autonomous Agents" },
  { text: "optimize.", desc: "Low-Latency Edge Execution & Performance" },
  { text: "like.", desc: "Crafting Pixel-Perfect Modern Aesthetics" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Create GSAP Sticky Scroll Pinning Trigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2200",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
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
      className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 bg-[#050505] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Sticky Section Info */}
        <div className="w-full lg:w-5/12 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-black/50 border border-white/15 text-[#C75B32] text-xs font-mono rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>DISCIPLINE &amp; EXECUTION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-2xl">
            I LOVE<br />
            <span className="text-[#C75B32]">TO.</span>
          </h2>

          <p className="text-sm sm:text-base font-mono tracking-wider text-white/70 max-w-md leading-relaxed">
            Building minimal, robust, and high-performance technical systems across Web3 protocols, AI agents, and graphics.
          </p>

          {/* Active Highlight Detail Pill */}
          <div className="pt-2">
            <div className="inline-block p-4 bg-[#0c0c0e] border border-white/15 rounded-xl space-y-1 backdrop-blur-md shadow-2xl transition-all duration-300">
              <span className="text-[10px] font-mono text-[#5CE1E6] uppercase tracking-widest block">
                FOCUS // 0{activeIndex + 1}
              </span>
              <p className="text-xs font-mono text-white/90">
                {WORD_ITEMS[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Word List with Sticky Progress Highlighting */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center space-y-3 sm:space-y-4">
          {WORD_ITEMS.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`scroll-dim-word font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-300 select-none cursor-pointer flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 ${
                  isActive
                    ? "text-[#C75B32] translate-x-3 sm:translate-x-6 opacity-100 scale-105"
                    : "text-white/20 hover:text-white/70 opacity-30 translate-x-0 scale-100"
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
