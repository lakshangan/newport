'use client';

import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width || 300, dimensions.height || 300),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={cn("absolute inset-0", blurClass)}>
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${(index * 25) % 60}%`,
                left: `${(index * 35) % 60}%`,
                "--background-gradient-speed": `${Math.max(1, 1 / speed)}s`,
                "--tx-1": (index * 0.3) - 0.4,
                "--ty-1": (index * 0.2) - 0.3,
                "--tx-2": (index * 0.4) - 0.2,
                "--ty-2": (index * 0.3) - 0.5,
                "--tx-3": (index * 0.2) - 0.5,
                "--ty-3": (index * 0.4) - 0.2,
                "--tx-4": (index * 0.5) - 0.3,
                "--ty-4": (index * 0.1) - 0.4,
              } as React.CSSProperties
            }
            width={circleSize * (0.8 + (index * 0.2))}
            height={circleSize * (0.8 + (index * 0.2))}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-40 dark:opacity-30"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export { AnimatedGradient };
