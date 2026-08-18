"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ScrollAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items: Element[] = gsap.utils.toArray("#you-can-scroll-list li");
    if (!items || items.length === 0) return;

    // Set initial state: first item bright, others dimmed
    gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

    const dimmer = gsap.timeline()
      .to(items.slice(1), { opacity: 1, stagger: 0.5 })
      .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

    const dimmerScrub = ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: "center center",
      end: "center center",
      animation: dimmer,
      scrub: 0.2,
    });

    return () => {
      dimmerScrub?.kill();
    };
  }, []);

  const ACTIONS = [
    "design.",
    "prototype.",
    "solve.",
    "build.",
    "develop.",
    "debug.",
    "learn.",
    "cook.",
    "ship.",
    "prompt.",
    "collaborate.",
    "create.",
    "inspire.",
    "follow.",
    "innovate.",
    "test.",
    "optimize.",
    "teach.",
    "visualize.",
    "transform.",
    "scale.",
    "do it."
  ];

  return (
    <section className="relative w-full py-32 px-6 sm:px-12 bg-[#080808] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 sm:gap-16">
        
        {/* Pinned Left Title */}
        <div className="sticky top-[38vh] space-y-3 md:w-5/12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/5 border border-white/10 text-[#C75B32] text-xs font-mono rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-pulse" />
            <span>DISCIPLINE &amp; EXECUTION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-2xl">
            YOU CAN<br />
            <span className="text-[#C75B32]">SCROLL.</span>
          </h2>
        </div>

        {/* Right Vertical List */}
        <div className="md:w-6/12 w-full pt-4 md:pt-0">
          <ul
            id="you-can-scroll-list"
            className="space-y-6 sm:space-y-8 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white"
          >
            {ACTIONS.map((text, i) => (
              <li
                key={i}
                className="transition-colors duration-300 hover:text-[#C75B32] select-none cursor-pointer"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
