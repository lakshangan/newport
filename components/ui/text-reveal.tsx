"use client";

import { FC, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const FloatingAiLogosScene = dynamic(
  () => import("@/components/3d/FloatingAiLogosScene").then((m) => m.FloatingAiLogosScene),
  { ssr: false }
);

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
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (!wordEls.length) return;

      wordEls.forEach((el) => {
        gsap.set(el, { opacity: 0.15, color: "rgba(255,255,255,0.15)" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

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
          ">-=0.4"
        );
      });

      tl.to({}, { duration: 1.5 });

      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0.25, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

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
        "relative z-10 w-full min-h-[175vh] bg-[#080808]",
        className
      )}
    >
      <div className="sticky top-0 w-full h-screen min-h-screen flex items-center justify-center bg-[#080808] select-none px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* 3D Sculpted AI Mascot Logos (Behind & Around Perimeter) */}
        <div ref={backdropRef} className="pointer-events-none absolute inset-0 z-0">
          <FloatingAiLogosScene />
        </div>

        {/* Center Text Block (Always Above z-10) */}
        <div className="relative z-10 max-w-3xl xl:max-w-4xl mx-auto text-center w-full my-auto">
          <p className="flex flex-wrap items-center justify-center text-center font-mono font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-normal md:leading-relaxed tracking-tight select-none">
            {words.map((word, i) => (
              <span key={i} className="relative mx-1 sm:mx-2 my-0.5 sm:my-1 inline-block">
                <span className="absolute inset-0 text-white/15 select-none pointer-events-none">
                  {word}
                </span>
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
    </div>
  );
};
