"use client";

/**
 * Glyph Portal © 2026 Christian Katzmann. MIT.
 * Adapted & enhanced for smooth scroll camera through type.
 */
import React, { useId, useLayoutEffect, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type GlyphPortalStyle = CSSProperties & {
  "--gp-paper"?: string;
  "--gp-ink"?: string;
  "--gp-field"?: string;
  "--gp-foreground"?: string;
};

export type GlyphPortalProps = {
  word?: string;
  /** First matching character. Omit to choose the largest safe patch of ink. */
  focusChar?: string;
  /** Hover, tap, or use arrow keys to choose a letter before scrolling. */
  interactive?: boolean;
  /** Decorative, inert, mounted once. Fill its parent with an image, video, or canvas. */
  background?: ReactNode;
  /** Optional foreground composition for the opening frame, above the clipped scene. */
  front?: ReactNode;
  children?: ReactNode;
  /** Scroll travel in visible container heights, clamped to 1–8. */
  scrollLength?: number;
  fontFamily?: string;
  fontWeight?: number;
  annotations?: boolean;
  enterLabel?: string;
  className?: string;
  style?: GlyphPortalStyle;
  /** Called once per rendered scroll frame, never through React state. */
  onProgress?: (progress: number) => void;
};

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const SOLID_FONT = '"Arial Black", Impact, "Trebuchet MS", sans-serif';

type Ink = { x: number; y: number; radius: number; index: number };
type Letter = { index: number; x: number; y: number; width: number; height: number };

/** Largest opaque square, in linear time. Unlike a stem guess, it works in O, S and Ø. */
function interior(context: CanvasRenderingContext2D, char: string, font: string): Omit<Ink, "index"> | null {
  const canvas = context.canvas;
  context.font = font;
  const m = context.measureText(char);
  const pad = 8;
  const left = Math.ceil(m.actualBoundingBoxLeft || 0);
  const ascent = Math.ceil(m.actualBoundingBoxAscent || 70);
  const descent = Math.ceil(m.actualBoundingBoxDescent || 20);
  const right = Math.ceil(m.actualBoundingBoxRight || 60);

  canvas.width = Math.max(1, left + right + pad * 2);
  canvas.height = Math.max(1, ascent + descent + pad * 2);
  context.font = font;
  context.fontKerning = "none";
  context.fillStyle = "#ffffff";
  context.fillText(char, pad + left, pad + ascent);

  const { width, height } = canvas;
  const pixels = context.getImageData(0, 0, width, height).data;
  const rows = new Uint16Array(width + 1);
  let size = 0, bx = 0, by = 0;

  for (let y = 0; y < height; y++) {
    let diagonal = 0;
    for (let x = 0; x < width; x++) {
      const above = rows[x + 1];
      rows[x + 1] = pixels[(y * width + x) * 4 + 3] > 200
        ? Math.min(above, rows[x], diagonal) + 1 : 0;
      diagonal = above;
      if (rows[x + 1] > size) { size = rows[x + 1]; bx = x; by = y; }
    }
  }

  if (size < 3) {
    // Fallback disk in center of glyph box if raster scan is thin
    return {
      x: (width / 2 - pad - left) / 3,
      y: (height / 2 - pad - ascent) / 3,
      radius: 12,
    };
  }

  // Scan at 3× SVG size. Inscribe a disk in the square, with room for raster disagreement.
  return {
    x: (bx + 1 - size / 2 - pad - left) / 3,
    y: (by + 1 - size / 2 - pad - ascent) / 3,
    radius: Math.max(8, (size / 2 - 1) / 3),
  };
}

export default function GlyphPortal({
  word = "BUILD",
  focusChar,
  interactive = true,
  background,
  front,
  children,
  scrollLength = 2.5,
  fontFamily = SOLID_FONT,
  fontWeight = 900,
  annotations = true,
  className,
  style,
  onProgress,
}: GlyphPortalProps) {
  const uid = `gp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const clipId = `${uid}-clip`;
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(onProgress);
  useIsomorphicLayoutEffect(() => { progressRef.current = onProgress; }, [onProgress]);

  const text = word.trim().normalize("NFC") || "BUILD";
  let characterOffset = 0;
  const characters = Array.from(text, (char) => {
    const index = characterOffset;
    characterOffset += char.length;
    return { char, index };
  });

  const length = Number.isFinite(scrollLength) ? clamp(scrollLength, 1.5, 6) : 2.5;
  const weight = Number.isFinite(fontWeight) ? clamp(fontWeight, 1, 1000) : 900;
  const q = `:where(#${uid})`;

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pin = section.querySelector<HTMLElement>("[data-gp-pin]")!;
    const field = section.querySelector<HTMLElement>("[data-gp-field]")!;
    const art = section.querySelector<SVGSVGElement>("[data-gp-art]")!;
    const clip = section.querySelector<SVGClipPathElement>(`#${clipId}`)!;
    const glyph = section.querySelector<SVGTextElement>("[data-gp-glyph]")!;
    const marks = section.querySelector<SVGGElement>("[data-gp-marks]");
    const choices = section.querySelector<HTMLElement>("[data-gp-choices]")!;
    const buttons = Array.from(choices.querySelectorAll<HTMLButtonElement>("button"));

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    let disposed = false;
    let raf = 0;
    let dirty = true;
    let active = true;
    let ready = false;

    let W = 1, H = 1, travel = 1, startScale = 1, endScale = 1;
    let center = { x: 0, y: 0 }, target: Ink | null = null;
    let lastProgress = -1;
    let candidates: Ink[] = [], letters: Letter[] = [];
    let choosing = false;
    let bounds = { x: 0, y: 0, width: 1, height: 1 };

    const readInk = () => {
      if (!context) return false;
      const scanFont = `${weight} 300px ${SOLID_FONT}`;
      context.font = `${weight} 100px ${SOLID_FONT}`;
      context.fontKerning = "none";
      const metrics = context.measureText(text);
      const advances = Array.from({ length: text.length }, (_, i) => context.measureText(text.slice(0, i)).width);

      bounds = {
        x: -(metrics.actualBoundingBoxLeft || 0),
        y: -(metrics.actualBoundingBoxAscent || 75),
        width: Math.max(10, (metrics.actualBoundingBoxLeft || 0) + (metrics.actualBoundingBoxRight || metrics.width)),
        height: Math.max(10, (metrics.actualBoundingBoxAscent || 75) + (metrics.actualBoundingBoxDescent || 25)),
      };

      if (!bounds.width || !bounds.height) return false;
      center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
      const requested = focusChar ? text.indexOf(focusChar.normalize("NFC")) : -1;

      let offset = 0;
      candidates = [];
      letters = [];

      for (const char of Array.from(text)) {
        context.font = `${weight} 100px ${SOLID_FONT}`;
        const m = context.measureText(char);
        letters.push({
          index: offset,
          x: advances[offset] - (m.actualBoundingBoxLeft || 0),
          y: -(m.actualBoundingBoxAscent || 75),
          width: Math.max(10, (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width)),
          height: Math.max(10, (m.actualBoundingBoxAscent || 75) + (m.actualBoundingBoxDescent || 25)),
        });

        const found = interior(context, char, scanFont);
        if (found) {
          candidates.push({ ...found, x: found.x + advances[offset], index: offset });
        }
        offset += char.length;
      }

      // Default to the largest patch of ink, prioritizing central letters like 'U' or 'I'
      target =
        candidates.find((candidate) => candidate.index === requested) ??
        [...candidates].sort((a, b) => b.radius - a.radius || Math.abs(a.x - center.x) - Math.abs(b.x - center.x))[0] ??
        (candidates[0] || { x: center.x, y: center.y, radius: 15, index: 0 });

      return true;
    };

    const select = (next: Ink | null) => {
      target = next;
      endScale = target ? Math.max(startScale, Math.hypot(W, H) / (Math.max(6, target.radius) * 1.15)) : startScale * 40;
      section.dataset.gpFocus = target ? Array.from(text.slice(target.index))[0] : "";
      section.dataset.gpFocusIndex = String(target?.index ?? -1);

      for (const button of buttons) {
        const selected = Number(button.dataset.gpLetter) === target?.index;
        button.setAttribute("aria-checked", String(selected));
        button.tabIndex = selected ? 0 : -1;
      }

      if (marks) {
        const u = 1 / Math.max(0.001, startScale);
        const y = bounds.y + bounds.height + 25 * u;
        const x = bounds.x;
        const right = x + bounds.width;
        const cross = target ? `M${target.x - 9 * u} ${target.y}h${18 * u}M${target.x} ${target.y - 9 * u}v${18 * u}` : "";
        const annotationPath = marks.querySelector("path");
        if (annotationPath) {
          annotationPath.setAttribute("d", `M${x} ${y}H${right}M${x} ${y - 5 * u}v${10 * u}M${right} ${y - 5 * u}v${10 * u}${cross}`);
          annotationPath.setAttribute("stroke-width", String(u));
        }
      }
    };

    const calculateProgress = () => {
      const rect = section.getBoundingClientRect();
      const totalTravel = section.offsetHeight - window.innerHeight;
      if (totalTravel <= 0) return 0;
      return clamp(-rect.top / totalTravel, 0, 1);
    };

    const paint = (progress: number) => {
      const p = clamp(progress, 0, 1);
      // Smooth cubic ease for cinematic camera glide into the glyph
      const t = clamp(p / 0.85);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const scale = Math.exp(Math.log(startScale) + Math.log(endScale / startScale) * eased);
      const blend = endScale === startScale ? 0 : (1 / scale - 1 / startScale) / (1 / endScale - 1 / startScale);
      const cx = center.x + ((target?.x ?? center.x) - center.x) * blend;
      const cy = center.y + ((target?.y ?? center.y) - center.y) * blend;
      const roll = -3 * smooth(0.05, 0.45, t) * (1 - smooth(0.65, 0.95, t));

      const radians = (roll * Math.PI) / 180;
      const dx = W / 2 / scale;
      const dy = (H * 0.5 + H * 0.04 * eased) / scale;

      clip.setAttribute("transform", `scale(${scale}) rotate(${roll})`);
      glyph.setAttribute(
        "transform",
        `translate(${Math.cos(radians) * dx + Math.sin(radians) * dy - cx} ${
          -Math.sin(radians) * dx + Math.cos(radians) * dy - cy
        })`
      );

      if (marks) {
        const transform = `translate(${W / 2} ${H * 0.5 + H * 0.04 * eased}) scale(${scale}) rotate(${roll}) translate(${-cx} ${-cy})`;
        marks.setAttribute("transform", transform);
        marks.style.opacity = String(1 - smooth(0.02, 0.2, p));
      }

      choosing = interactive && p < 0.06;
      choices.inert = !choosing;
      section.dataset.gpChoosing = String(choosing);

      // Once camera is fully inside ink, release clipPath for seamless transition
      field.style.clipPath = t >= 0.98 ? "none" : `url(#${clipId})`;

      section.style.setProperty("--gp-caption", String(1 - smooth(0.01, 0.2, p)));
      section.style.setProperty("--gp-field-scale", String(1 + 0.15 * smooth(0, 0.85, p)));
      section.dataset.gpProgress = p.toFixed(5);

      if (p !== lastProgress) {
        lastProgress = p;
        progressRef.current?.(p);
      }
    };

    const layout = () => {
      if (!section.clientWidth) return;
      W = pin.clientWidth || window.innerWidth;
      H = window.innerHeight;

      section.style.setProperty("--gp-height", `${H}px`);
      travel = Math.max(1, H * (length - 1));
      art.setAttribute("viewBox", `0 0 ${W} ${H}`);

      ready = readInk();
      if (!ready) return;

      const wordHeight = H * 0.42;
      startScale = Math.min((W * 0.86) / bounds.width, wordHeight / bounds.height);

      select(target);

      for (const button of buttons) {
        const letter = letters.find((item) => item.index === Number(button.dataset.gpLetter));
        if (!letter) continue;
        Object.assign(button.style, {
          left: `${W / 2 + (letter.x - center.x) * startScale}px`,
          top: `${H * 0.5 + (letter.y - center.y) * startScale - Math.max(0, 44 - letter.height * startScale) / 2}px`,
          width: `${Math.max(1, letter.width * startScale)}px`,
          height: `${Math.max(44, letter.height * startScale)}px`,
        });
      }

      section.dataset.gpReady = "true";
      section.dataset.gpMotion = "on";
    };

    const frame = () => {
      raf = 0;
      if (disposed) return;
      if (dirty) {
        dirty = false;
        layout();
      }
      if (ready) {
        paint(calculateProgress());
      }
    };

    const schedule = () => {
      if (!raf && active) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => schedule();
    const resize = () => {
      dirty = true;
      schedule();
    };

    const choose = (event: Event) => {
      if (!choosing || calculateProgress() >= 0.05) return;
      const button = (event.target as Element).closest<HTMLButtonElement>("[data-gp-letter]");
      const next = candidates.find((candidate) => candidate.index === Number(button?.dataset.gpLetter));
      if (!next || next === target) return;
      select(next);
      paint(calculateProgress());
    };

    choices.addEventListener("pointerover", choose);
    choices.addEventListener("click", choose);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    const observer = new ResizeObserver(resize);
    observer.observe(section);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { rootMargin: "50% 0px" }
    );
    visibility.observe(section);

    layout();
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      choices.removeEventListener("pointerover", choose);
      choices.removeEventListener("click", choose);
    };
  }, [text, focusChar, interactive, weight, length, clipId]);

  return (
    <section
      ref={sectionRef}
      id={uid}
      className={className}
      aria-label={text}
      style={{
        position: "relative",
        height: `${length * 100}vh`,
        background: "var(--gp-paper, #080808)",
        color: "var(--gp-ink, #FFA266)",
        isolation: "isolate",
        ...style,
      } as CSSProperties}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${q} [data-gp-pin]{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;isolation:isolate;}
        ${q} [data-gp-field]{position:absolute;inset:0;background:var(--gp-field, #080808);opacity:0;pointer-events:none;}
        ${q}[data-gp-ready] [data-gp-field]{opacity:1;}
        ${q} [data-gp-art]{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;}
        ${q} [data-gp-marks]{fill:none;stroke:var(--gp-ink, #FFA266);opacity:.6;}
        ${q} [data-gp-choices]{position:absolute;inset:0;visibility:hidden;pointer-events:none;}
        ${q}[data-gp-choosing=true] [data-gp-choices]{visibility:visible;}
        ${q} [data-gp-letter]{box-sizing:border-box;position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;pointer-events:auto;touch-action:pan-y;}
        ${q} [data-gp-letter]:focus-visible{outline:2px solid var(--gp-ink, #FFA266);outline-offset:5px;}
        ${q} [data-gp-front]{position:absolute;inset:0;opacity:var(--gp-caption,1);pointer-events:none;z-index:20;}
        ${q} [data-gp-caption]{position:absolute;inset:auto 0 6% 0;display:flex;align-items:center;justify-content:center;gap:0.75rem;font:11px/1.4 monospace;letter-spacing:0.15em;text-transform:uppercase;color:var(--gp-ink, #FFA266);opacity:var(--gp-caption,1);pointer-events:none;z-index:20;}
      `,
        }}
      />

      {/* Sticky Camera Chamber */}
      <div data-gp-pin>
        {/* The Field revealed inside the letters and taking over on zoom */}
        <div data-gp-field aria-hidden="true">
          {background}
        </div>

        {/* Scaled SVG Live Camera Lens & Glyph Clip */}
        <svg data-gp-art aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <text
                data-gp-glyph
                x="0"
                y="0"
                style={{
                  fontFamily: SOLID_FONT,
                  fontWeight: weight,
                  fontSize: 100,
                  fontKerning: "none",
                  fontVariantLigatures: "none",
                  letterSpacing: 0,
                }}
              >
                {text}
              </text>
            </clipPath>
          </defs>
          {annotations && (
            <g data-gp-marks>
              <path />
            </g>
          )}
        </svg>

        {/* Interactive letter selection handles */}
        <div data-gp-choices role="radiogroup" aria-label="Choose letter to zoom through" inert>
          {characters.map(({ char, index }, i) => (
            <button
              type="button"
              role="radio"
              aria-checked="false"
              tabIndex={-1}
              data-gp-letter={index}
              key={index}
              aria-label={`${char}, letter ${i + 1} of ${characters.length}`}
            />
          ))}
        </div>

        {/* Foreground Header */}
        {front && <div data-gp-front>{front}</div>}

        {/* Bottom Scroll Caption */}
        <div data-gp-caption>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-ping" />
          <span>Scroll down to enter &bull; Zoom through</span>
          <span className="text-sm font-bold">↓</span>
        </div>
      </div>
    </section>
  );
}
