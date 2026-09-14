"use client";

import React, { useEffect, useRef } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Cybernetic Particle Wave Canvas Field
 * Tailored for Lakshan's portfolio palette: Deep obsidian base with
 * radiant amber (#C75B32, #FFA266) & electric cyan telemetry waves.
 */
function PortalCanvasField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let width = 1;
    let height = 1;

    const draw = (time: number) => {
      frame = 0;
      const t = motion.matches ? 0 : time / 6500;

      // Dark obsidian background
      context.fillStyle = "#080808";
      context.fillRect(0, 0, width, height);

      // Multi-layer ambient radiant glows (Warm Copper & Deep Cyan)
      const glow1 = context.createRadialGradient(
        width * 0.7,
        height * 0.35,
        0,
        width * 0.55,
        height * 0.45,
        width * 0.75
      );
      glow1.addColorStop(0, "rgba(232, 128, 83, 0.45)");
      glow1.addColorStop(0.4, "rgba(199, 91, 50, 0.22)");
      glow1.addColorStop(1, "rgba(8, 8, 8, 0)");
      context.fillStyle = glow1;
      context.fillRect(0, 0, width, height);

      const glow2 = context.createRadialGradient(
        width * 0.25,
        height * 0.75,
        0,
        width * 0.3,
        height * 0.7,
        width * 0.5
      );
      glow2.addColorStop(0, "rgba(92, 225, 230, 0.18)");
      glow2.addColorStop(0.5, "rgba(20, 45, 60, 0.1)");
      glow2.addColorStop(1, "rgba(8, 8, 8, 0)");
      context.fillStyle = glow2;
      context.fillRect(0, 0, width, height);

      // Flowing Harmonic Vector Lines
      const lineCount = 38;
      for (let line = -4; line < lineCount; line++) {
        context.beginPath();
        for (let x = -10; x <= width + 10; x += 12) {
          const u = x / width;
          const bend =
            Math.sin(u * 4.2 + t + line * 0.05) * height * 0.12 +
            Math.cos(u * 7.5 - t * 0.8) * height * 0.045 +
            Math.sin(u * 2 - t * 0.4) * height * 0.03;
          const y = (line * height) / (lineCount - 6) + bend;
          if (x === -10) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        const isHighlight = line % 6 === 0;
        const isCyan = line % 9 === 0;

        if (isCyan) {
          context.strokeStyle = "#5CE1E6";
          context.globalAlpha = 0.35;
          context.lineWidth = 1.2;
        } else if (isHighlight) {
          context.strokeStyle = "#FFA266";
          context.globalAlpha = 0.45;
          context.lineWidth = 1.4;
        } else {
          context.strokeStyle = "#C75B32";
          context.globalAlpha = 0.18;
          context.lineWidth = 0.75;
        }

        context.stroke();
      }

      // Subtle Cyber Matrix Noise Grid
      context.globalAlpha = 1;
      context.fillStyle = "rgba(8, 8, 8, 0.08)";
      context.fillRect(0, 0, width, height);

      if (visible && !motion.matches && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    };

    const refresh = () => {
      cancelAnimationFrame(frame);
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    intersectionObserver.observe(canvas);

    motion.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", refresh);
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function PortalTransitionSection() {
  useEffect(() => {
    // Notify GSAP ScrollTrigger to recalculate once the portal mounts
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      }
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full bg-[#080808] z-20">
      <GlyphPortal
        word="BUILD"
        scrollLength={2.2}
        interactive={true}
        annotations={true}
        enterLabel="Enter Arena"
        fontFamily='var(--font-display), "Bebas Neue", "Arial Black", sans-serif'
        fontWeight={900}
        style={{
          "--gp-paper": "#080808",
          "--gp-ink": "#FFA266",
          "--gp-field": "#080808",
          "--gp-foreground": "#FFFDF9",
        }}
        background={<PortalCanvasField />}
        front={
          <div className="absolute top-10 sm:top-14 left-0 right-0 px-6 sm:px-12 flex justify-between items-center pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#D4BC98]/20 text-[10px] sm:text-xs font-mono text-[#FFA266] uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
              <span>// 01.5 TRANSITION</span>
            </div>
            <div className="hidden sm:block text-[11px] font-mono text-white/40 tracking-wider">
              SCROLL THROUGH TYPE
            </div>
          </div>
        }
      />
    </section>
  );
}

export default PortalTransitionSection;
