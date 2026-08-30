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
          start: "top top",
          end: "+=2200",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
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
        "relative z-10 w-full h-screen flex items-center justify-center bg-[#080808] overflow-hidden select-none px-6 sm:px-12",
        className
      )}
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="flex flex-wrap items-center justify-center text-center font-mono font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed tracking-tight select-none">
          {words.map((word, i) => (
            <span key={i} className="relative mx-1.5 sm:mx-2.5 my-1.5 inline-block">
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
