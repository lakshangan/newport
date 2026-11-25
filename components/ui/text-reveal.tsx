"use client";

import { FC, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Clean Vector Brand Marks (Claude, Gemini, ChatGPT, Antigravity, Codex)    */
/* -------------------------------------------------------------------------- */

const ClaudeLogo: FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#D97757]" fill="currentColor" aria-hidden="true">
    <path d="M12 1.5l1.65 6.35L19.5 4.5l-3.35 5.85L22.5 12l-6.35 1.65L19.5 19.5l-5.85-3.35L12 22.5l-1.65-6.35L4.5 19.5l3.35-5.85L1.5 12l6.35-1.65L4.5 4.5l5.85 3.35L12 1.5z" />
  </svg>
);

const GeminiLogo: FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="50%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C12.4 7.4 16.6 11.6 22 12C16.6 12.4 12.4 16.6 12 22C11.6 16.6 7.4 12.4 2 12C7.4 11.6 11.6 7.4 12 2Z"
      fill="url(#gemini-grad)"
    />
  </svg>
);

const ChatGPTLogo: FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F2EFE9]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a4.5 4.5 0 0 0-3.9 2.25L4.65 11.2a4.5 4.5 0 0 0 1.65 6.15l.45.26" />
    <path d="M19.8 9.25a4.5 4.5 0 0 0-3.9-2.25H9l-3.45 5.95" />
    <path d="M18.75 17.6a4.5 4.5 0 0 0 1.65-6.15l-3.45-5.95a4.5 4.5 0 0 0-6.15-1.65" />
    <path d="M12 21a4.5 4.5 0 0 0 3.9-2.25l3.45-5.95a4.5 4.5 0 0 0-1.65-6.15" />
    <path d="M4.2 14.75A4.5 4.5 0 0 0 8.1 17h6.9l3.45-5.95" />
    <path d="M5.25 6.4A4.5 4.5 0 0 0 3.6 12.55l3.45 5.95a4.5 4.5 0 0 0 6.15 1.65" />
  </svg>
);

const AntigravityLogo: FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E06D43]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3L4.5 19.5L12 15.5L19.5 19.5L12 3Z" fill="currentColor" fillOpacity="0.18" />
    <circle cx="12" cy="11.5" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const CodexLogo: FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#34D399]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="4" />
    <path d="M8 9.5L10.5 12L8 14.5" />
    <path d="M12.5 14.5H16" />
  </svg>
);

const FLOATING_MASCOTS = [
  {
    name: "Claude",
    Logo: ClaudeLogo,
    posClass: "top-[14%] left-[5%] lg:left-[8%]",
    floatY: [-8, 8, -8],
    rotate: [-2, 2, -2],
    duration: 6.2,
    delay: 0,
  },
  {
    name: "Antigravity",
    Logo: AntigravityLogo,
    posClass: "top-[15%] right-[5%] lg:right-[9%]",
    floatY: [7, -9, 7],
    rotate: [2, -2, 2],
    duration: 5.8,
    delay: 0.4,
  },
  {
    name: "Gemini",
    Logo: GeminiLogo,
    posClass: "bottom-[14%] left-[6%] lg:left-[11%]",
    floatY: [8, -7, 8],
    rotate: [-1.5, 2.5, -1.5],
    duration: 6.6,
    delay: 0.7,
  },
  {
    name: "ChatGPT",
    Logo: ChatGPTLogo,
    posClass: "top-[50%] right-[3%] lg:right-[5%]",
    floatY: [-7, 9, -7],
    rotate: [1.5, -2, 1.5],
    duration: 7.0,
    delay: 0.2,
  },
  {
    name: "Codex",
    Logo: CodexLogo,
    posClass: "bottom-[13%] right-[7%] lg:right-[11%]",
    floatY: [-9, 7, -9],
    rotate: [-2, 1.5, -2],
    duration: 6.0,
    delay: 0.9,
  },
] as const;

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const badgesRef = useRef<HTMLDivElement | null>(null);

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

      // Subtle scroll-driven perimeter drift for the background AI badges
      if (badgesRef.current) {
        gsap.fromTo(
          badgesRef.current,
          { y: 24, opacity: 0.35 },
          {
            y: -24,
            opacity: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
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
        {/* Perimeter Floating AI Tool Mascot Logos (Strictly Behind & Around Text) */}
        <div
          ref={badgesRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        >
          {FLOATING_MASCOTS.map(({ name, Logo, posClass, floatY, rotate, duration, delay }) => (
            <motion.div
              key={name}
              animate={{ y: [...floatY], rotate: [...rotate] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
              className={cn(
                "absolute flex items-center gap-2 rounded-full bg-[#11100F]/80 border border-white/[0.08] px-3.5 py-2 backdrop-blur-md shadow-[0_14px_34px_-12px_rgba(0,0,0,0.85)] opacity-75",
                posClass
              )}
            >
              <Logo />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/65">
                {name}
              </span>
            </motion.div>
          ))}
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
