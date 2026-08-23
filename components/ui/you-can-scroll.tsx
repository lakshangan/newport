"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AsciiGlitchRipple } from "@/components/ui/AsciiGlitchRipple";

const WORD_ITEMS = [
  { text: "code.", color: "text-[#5CE1E6]", desc: "EVM Smart Contracts & Protocol Logic" },
  { text: "build.", color: "text-[#38BDF8]", desc: "High-Performance AI & 3D WebGL Interfaces" },
  { text: "learn.", color: "text-[#C084FC]", desc: "Web3 Cryptography & Distributed Systems" },
  { text: "ship.", color: "text-[#FF6B35]", desc: "Full-Stack Production Applications" },
  { text: "innovate.", color: "text-[#FACC15]", desc: "C2PA Provenance & Autonomous Agents" },
  { text: "optimize.", color: "text-[#34D399]", desc: "Low-Latency Edge Execution & Performance" },
  { text: "like.", color: "text-[#F472B6]", desc: "Crafting Pixel-Perfect Modern Aesthetics" },
  { text: "do it.", color: "text-[#FB7185]", desc: "Shipping End-to-End Scalable Systems" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wordsList = wordsListRef.current;
    if (!section || !wordsList) return;

    const totalWords = WORD_ITEMS.length;

    // Create GSAP ScrollTrigger timeline to translate words vertically next to 'i love'
    const anim = gsap.to(wordsList, {
      y: () => -(wordsList.scrollHeight - 140),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2400",
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(
            totalWords - 1,
            Math.floor(self.progress * totalWords)
          );
          setActiveIndex(idx);
        },
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#050505] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f26_1px,transparent_1px),linear-gradient(to_bottom,#1f1f26_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-6 relative z-10">
        
        {/* Fixed Left Prefix: "i love" */}
        <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight uppercase text-white drop-shadow-2xl whitespace-nowrap">
          <span className="block">i love&nbsp;</span>
        </div>

        {/* Right Vertically Scrolling Word List Window */}
        <div className="relative h-[1.3em] overflow-hidden flex items-center">
          <div
            ref={wordsListRef}
            className="flex flex-col space-y-4 pt-2"
          >
            {WORD_ITEMS.map((item, i) => {
              const isActive = activeIndex === i;

              return (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight uppercase transition-all duration-300 cursor-pointer whitespace-nowrap leading-none ${
                    isActive
                      ? `${item.color} opacity-100 scale-105 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]`
                      : "text-white/40 hover:text-white/80 opacity-40 scale-95"
                  }`}
                >
                  <AsciiGlitchRipple as="span" dur={900}>
                    {item.text}
                  </AsciiGlitchRipple>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Focus Detail Marker Pill */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="px-5 py-2.5 bg-black/70 border border-white/20 rounded-full backdrop-blur-xl flex items-center space-x-3 shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5CE1E6] animate-pulse" />
          <span className="text-xs sm:text-sm font-mono text-white tracking-wider">
            FOCUS // 0{activeIndex + 1}: <span className="text-[#5CE1E6] font-semibold">{WORD_ITEMS[activeIndex].desc}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
