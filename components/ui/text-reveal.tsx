"use client";

import { FC, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (!wordEls.length) return;

      // Set initial dim opacity for all word elements
      wordEls.forEach((el) => {
        gsap.set(el, { opacity: 0.15, color: "rgba(255,255,255,0.15)" });
      });

      // Create GSAP ScrollTrigger timeline scrubbing on scroll (100% synced with Lenis)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: () => `+=${Math.min(window.innerHeight * 1.4, 1400)}`,
          pinSpacing: true,
          scrub: 0.2,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Sequentially illuminate each word
      wordEls.forEach((wordEl) => {
        tl.to(
          wordEl,
          {
            opacity: 1,
            color: "#ffffff",
            textShadow: "0 0 25px rgba(255,255,255,0.6)",
            duration: 1,
            ease: "none",
          },
          ">-=0.5"
        );
      });

      // Hold all words fully revealed & glowing at the end before unpinning
      tl.to({}, { duration: 2.5 });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      return () => {
        tl.kill();
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [text] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-10 w-full min-h-screen h-screen flex items-center justify-center bg-[#080808] select-none px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden",
        className
      )}
    >
      <div className="max-w-4xl xl:max-w-5xl mx-auto text-center w-full my-auto">
        <p className="flex flex-wrap items-center justify-center text-center font-mono font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-normal md:leading-relaxed tracking-tight select-none">
          {words.map((word, i) => (
            <span key={i} className="relative mx-1 sm:mx-2 my-0.5 sm:my-1 inline-block">
              {/* Dim underlying ghost word */}
              <span className="absolute inset-0 text-white/15 select-none pointer-events-none">
                {word}
              </span>
              {/* GSAP Scroll-animated active word */}
              <span
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                style={{ willChange: "opacity, color, text-shadow" }}
                className="relative text-white/15 transition-none"
              >
                {word}
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
