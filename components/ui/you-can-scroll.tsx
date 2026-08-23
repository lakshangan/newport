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
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wordsContainer = wordsContainerRef.current;
    if (!section || !wordsContainer) return;

    const items = gsap.utils.toArray<HTMLElement>(".scroll-dim-word");
    if (!items || items.length === 0) return;

    // Initialize all items except first to 0.2 opacity
    gsap.set(items, { opacity: (i) => (i === 0 ? 1 : 0.2) });

    // GSAP ScrollTrigger timeline for word dimming scrub animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(
            WORD_ITEMS.length - 1,
            Math.floor(self.progress * WORD_ITEMS.length)
          );
          setActiveIndex(idx);
        },
      },
    });

    timeline.to(items.slice(1), {
      opacity: 1,
      stagger: 0.5,
    }).to(
      items.slice(0, items.length - 1),
      {
        opacity: 0.2,
        stagger: 0.5,
      },
      0
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-36 px-6 sm:px-12 bg-[#050505] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C75B32]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Sticky Section Info */}
        <div className="w-full lg:w-5/12 space-y-6 text-left lg:sticky lg:top-36">
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
            <div className="inline-block p-4 bg-[#0c0c0e] border border-white/15 rounded-xl space-y-1 backdrop-blur-md shadow-2xl">
              <span className="text-[10px] font-mono text-[#5CE1E6] uppercase tracking-widest block">
                FOCUS // 0{activeIndex + 1}
              </span>
              <p className="text-xs font-mono text-white/90">
                {WORD_ITEMS[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Word List with GSAP Scroll Dimmer Scrub Animation */}
        <div ref={wordsContainerRef} className="w-full lg:w-6/12 flex flex-col justify-center space-y-4 sm:space-y-6">
          {WORD_ITEMS.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className={`scroll-dim-word font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight transition-all duration-300 select-none cursor-pointer flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 ${
                  isActive
                    ? "text-[#C75B32] translate-x-2 sm:translate-x-4 opacity-100"
                    : "text-white/30 hover:text-white/80 opacity-20 translate-x-0"
                }`}
              >
                <AsciiGlitchRipple as="span" dur={900}>
                  {item.text}
                </AsciiGlitchRipple>

                <span
                  className={`font-mono text-xs sm:text-sm tracking-widest transition-opacity duration-300 ${
                    isActive ? "opacity-100 text-[#5CE1E6]" : "opacity-0"
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
