"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AsciiGlitchRipple } from "@/components/ui/AsciiGlitchRipple";

const FOUR_WORDS = [
  "BUILD.",
  "DESIGN.",
  "LEARN.",
  "INNOVATE.",
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(".scroll-word-item");
    if (!items || items.length === 0) return;

    // Initial state: first item active/bright, others dimmed
    gsap.set(items, { opacity: 0.2, scale: 0.96 });
    if (items[0]) {
      gsap.set(items[0], { opacity: 1, scale: 1.05, color: "#C75B32" });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    const numSteps = items.length;
    items.forEach((item, index) => {
      const stepStart = index / numSteps;

      if (index > 0) {
        // Dim previous item
        tl.to(
          items[index - 1],
          { opacity: 0.25, scale: 0.96, color: "#FFFFFF", duration: 0.4 },
          stepStart
        );
        // Highlight current item
        tl.to(
          item,
          { opacity: 1, scale: 1.05, color: "#C75B32", duration: 0.4 },
          stepStart
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[220vh] bg-[#080808] border-t border-white/10">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        
        {/* Left Pinned Static Title */}
        <div className="w-full md:w-5/12 space-y-4 text-left pt-12 md:pt-0">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/5 border border-white/10 text-[#C75B32] text-xs font-mono rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>DISCIPLINE &amp; EXECUTION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-2xl">
            I LOVE<br />
            <span className="text-[#C75B32]">TO.</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-sm pt-1">
            Scroll to cycle through core operational pillars across Web3 protocols, AI, and graphics.
          </p>
        </div>

        {/* Right 4 Stacked Words */}
        <div className="w-full md:w-6/12 flex flex-col justify-center space-y-6 sm:space-y-8 py-8">
          {FOUR_WORDS.map((word, i) => (
            <div
              key={i}
              className="scroll-word-item font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white transition-all duration-300 select-none cursor-pointer"
            >
              <AsciiGlitchRipple as="span" dur={900}>
                {word}
              </AsciiGlitchRipple>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
