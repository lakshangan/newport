"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  
  const words = text.split(" ");
  // Compress word range to [0.05, 0.78] so all words reveal 100% before the pinned section releases
  const rangeStart = 0.05;
  const rangeEnd = 0.78;
  const totalRange = rangeEnd - rangeStart;

  return (
    <div ref={targetRef} className={cn("relative z-10 min-h-[220vh] bg-[#080808]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-5xl items-center justify-center bg-transparent px-6 sm:px-12 py-20"
        }
      >
        <p
          className={
            "flex flex-wrap items-center justify-center text-center font-mono font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed tracking-tight text-white/15 select-none"
          }
        >
          {words.map((word, i) => {
            const step = totalRange / words.length;
            const start = rangeStart + i * step;
            const end = start + step;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1.5 sm:mx-2.5 my-1.5 inline-block">
      <span className={"absolute inset-0 opacity-20 text-white/20 select-none"}>
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className={"text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
