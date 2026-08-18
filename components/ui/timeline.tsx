"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[#080808] font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-10 space-y-4 border-b border-white/10 mb-12">
        <div className="text-xs font-mono tracking-widest text-[#C75B32]">
          // 03 PROFESSIONAL TRACK RECORD
        </div>
        <h2 className="text-4xl md:text-7xl font-extrabold font-display uppercase tracking-tight text-white max-w-4xl">
          Changelog from my journey
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-xl font-light">
          Roles across Web3 technical research, liquidity incubators, blockchain engineering, and enterprise systems.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center shadow-lg">
                <div className="h-4 w-4 rounded-full bg-[#C75B32] border border-[#C75B32]/50 shadow-[0_0_12px_#C75B32]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-black font-display text-white/90">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white font-display">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#C75B32] via-[#E88053] to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_15px_#C75B32]"
          />
        </div>
      </div>
    </div>
  );
};
