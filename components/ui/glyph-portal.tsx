"use client";

/**
 * Glyph Portal © 2026 Christian Katzmann. MIT.
 * High-performance scroll-driven camera through type, pinned seamlessly with GSAP ScrollTrigger.
 */
import React, { useId, useLayoutEffect, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  /** Layer 1: Base surface of the first section (e.g. video, ambient gradients). */
  layer1?: ReactNode;
  /** Layer 2: Inside the letters and revealed on zoom (e.g. upcoming section). */
  background?: ReactNode;
  /** Optional foreground composition for the opening frame, above the clipped scene. */
  front?: ReactNode;
  /** Scroll travel multiplier (e.g. 1.8 for 1.8 screen heights). */
  scrollLength?: number;
  fontFamily?: string;
  fontWeight?: number;
  annotations?: boolean;
  strokeOutline?: boolean;
  className?: string;
  style?: GlyphPortalStyle;
  /** Called once per rendered scroll frame. */
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
    return {
      x: (width / 2 - pad - left) / 3,
      y: (height / 2 - pad - ascent) / 3,
      radius: 12,
    };
  }

  return {
    x: (bx + 1 - size / 2 - pad - left) / 3,
    y: (by + 1 - size / 2 - pad - ascent) / 3,
    radius: Math.max(8, (size / 2 - 1) / 3),
  };
}

export default function GlyphPortal({
  word = "BUILD",
  focusChar = "U",
  interactive = true,
  layer1,
  background,
  front,
  scrollLength = 1.8,
  fontWeight = 900,
  annotations = true,
  strokeOutline = false,
  className,
  style,
  onProgress,
}: GlyphPortalProps) {
  const uid = `gp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const clipId = `${uid}-clip`;
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(onProgress);

  useIsomorphicLayoutEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  const text = word.trim().normalize("NFC") || "BUILD";
  let characterOffset = 0;
  const characters = Array.from(text, (char) => {
    const index = characterOffset;
    characterOffset += char.length;
    return { char, index };
  });

  const weight = Number.isFinite(fontWeight) ? clamp(fontWeight, 1, 1000) : 900;
  const length = Number.isFinite(scrollLength) ? clamp(scrollLength, 1.2, 4) : 1.8;
  const q = `:where(#${uid})`;

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const field = pin.querySelector<HTMLElement>("[data-gp-field]")!;
    const art = pin.querySelector<SVGSVGElement>("[data-gp-art]")!;
    const clip = pin.querySelector<SVGClipPathElement>(`#${clipId}`)!;
    const glyph = pin.querySelector<SVGTextElement>("[data-gp-glyph]")!;
    const marks = pin.querySelector<SVGGElement>("[data-gp-marks]");
    const choices = pin.querySelector<HTMLElement>("[data-gp-choices]")!;
    const buttons = Array.from(choices.querySelectorAll<HTMLButtonElement>("button"));
    const captionEl = pin.querySelector<HTMLElement>("[data-gp-caption]");
    const frontEl = pin.querySelector<HTMLElement>("[data-gp-front]");

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    let ready = false;

    let W = 1, H = 1, startScale = 1, endScale = 1;
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

      // Default target: requested focus char (e.g. 'U'), or largest ink patch near center
      target =
        candidates.find((candidate) => candidate.index === requested) ??
        [...candidates].sort((a, b) => b.radius - a.radius || Math.abs(a.x - center.x) - Math.abs(b.x - center.x))[0] ??
        (candidates[0] || { x: center.x, y: center.y, radius: 15, index: 0 });

      return true;
    };

    const select = (next: Ink | null) => {
      target = next;
      endScale = target ? Math.max(startScale, Math.hypot(W, H) / (Math.max(6, target.radius) * 1.15)) : startScale * 45;
      container.dataset.gpFocus = target ? Array.from(text.slice(target.index))[0] : "";
      container.dataset.gpFocusIndex = String(target?.index ?? -1);

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

    const paint = (progress: number) => {
      const p = clamp(progress, 0, 1);
      // Smooth cubic ease for cinematic camera glide into the glyph
      const t = clamp(p / 0.88);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const scale = Math.exp(Math.log(startScale) + Math.log(endScale / startScale) * eased);
      const blend = endScale === startScale ? 0 : (1 / scale - 1 / startScale) / (1 / endScale - 1 / startScale);
      const cx = center.x + ((target?.x ?? center.x) - center.x) * blend;
      const cy = center.y + ((target?.y ?? center.y) - center.y) * blend;
      const roll = -2.5 * smooth(0.05, 0.45, t) * (1 - smooth(0.65, 0.95, t));

      const radians = (roll * Math.PI) / 180;
      const dx = W / 2 / scale;
      const dy = (H * 0.5 + H * 0.03 * eased) / scale;

      clip.setAttribute("transform", `scale(${scale}) rotate(${roll})`);
      glyph.setAttribute(
        "transform",
        `translate(${Math.cos(radians) * dx + Math.sin(radians) * dy - cx} ${
          -Math.sin(radians) * dx + Math.cos(radians) * dy - cy
        })`
      );

      if (marks) {
        const transform = `translate(${W / 2} ${H * 0.5 + H * 0.03 * eased}) scale(${scale}) rotate(${roll}) translate(${-cx} ${-cy})`;
        marks.setAttribute("transform", transform);
        marks.style.opacity = String(1 - smooth(0.02, 0.25, p));
      }

      const strokeWrap = pin.querySelector<SVGGElement>("[data-gp-stroke-wrap]");
      const strokeEl = pin.querySelector<SVGTextElement>("[data-gp-stroke]");
      if (strokeWrap && strokeEl) {
        strokeWrap.setAttribute("transform", `scale(${scale}) rotate(${roll})`);
        strokeEl.setAttribute(
          "transform",
          `translate(${Math.cos(radians) * dx + Math.sin(radians) * dy - cx} ${
            -Math.sin(radians) * dx + Math.cos(radians) * dy - cy
          })`
        );
        strokeWrap.style.opacity = String(0.7 * (1 - smooth(0.03, 0.25, p)));
      }

      const layer1El = layer1Ref.current;
      if (layer1El) {
        layer1El.style.opacity = String(1 - smooth(0.72, 0.96, p));
      }

      choosing = interactive && p < 0.05;
      choices.inert = !choosing;
      container.dataset.gpChoosing = String(choosing);

      // Once camera is fully inside ink, release clipPath for seamless transition
      field.style.clipPath = t >= 0.98 ? "none" : `url(#${clipId})`;

      if (captionEl) {
        captionEl.style.opacity = String(1 - smooth(0.01, 0.2, p));
      }
      if (frontEl) {
        frontEl.style.opacity = String(1 - smooth(0.01, 0.25, p));
      }

      container.dataset.gpProgress = p.toFixed(5);

      if (p !== lastProgress) {
        lastProgress = p;
        progressRef.current?.(p);
      }
    };

    const layout = () => {
      W = pin.clientWidth || window.innerWidth;
      H = window.innerHeight;

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

      container.dataset.gpReady = "true";
    };

    layout();
    paint(0);

    // Pin with GSAP ScrollTrigger so the section stays firmly held on screen
    // until the zoom is 100% complete, eliminating blank space & auto-scroll glitches
    const scrollDistance = Math.max(window.innerHeight * 1.3, window.innerHeight * (length - 0.2));

    const st = ScrollTrigger.create({
      id: `portal-pin-${uid}`,
      trigger: container,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      pin: pin,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        paint(self.progress);
      },
    });

    const choose = (event: Event) => {
      if (!choosing || st.progress >= 0.05) return;
      const button = (event.target as Element).closest<HTMLButtonElement>("[data-gp-letter]");
      const next = candidates.find((candidate) => candidate.index === Number(button?.dataset.gpLetter));
      if (!next || next === target) return;
      select(next);
      paint(st.progress);
    };

    choices.addEventListener("pointerover", choose);
    choices.addEventListener("click", choose);

    const onResize = () => {
      layout();
      ScrollTrigger.refresh();
      paint(st.progress);
    };

    window.addEventListener("resize", onResize);

    return () => {
      choices.removeEventListener("pointerover", choose);
      choices.removeEventListener("click", choose);
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  }, [text, focusChar, interactive, weight, length, clipId, uid]);

  return (
    <section
      ref={containerRef}
      id={uid}
      className={className}
      aria-label={text}
      style={{
        position: "relative",
        width: "100%",
        background: "var(--gp-paper, #080808)",
        color: "var(--gp-ink, #FFA266)",
        overflow: "hidden",
        isolation: "isolate",
        ...style,
      } as CSSProperties}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${q} [data-gp-pin]{position:relative;height:100vh;height:100svh;width:100%;overflow:hidden;isolation:isolate;background:var(--gp-paper, #080808);}
        ${q} [data-gp-layer1]{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:1;}
        ${q} [data-gp-field]{position:absolute;inset:0;background:var(--gp-field, #080808);opacity:0;pointer-events:none;z-index:2;}
        ${q}[data-gp-ready] [data-gp-field]{opacity:1;}
        ${q} [data-gp-art]{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:3;}
        ${q} [data-gp-marks]{fill:none;stroke:var(--gp-ink, #FFA266);opacity:.6;}
        ${q} [data-gp-choices]{position:absolute;inset:0;visibility:hidden;pointer-events:none;z-index:4;}
        ${q}[data-gp-choosing=true] [data-gp-choices]{visibility:visible;}
        ${q} [data-gp-letter]{box-sizing:border-box;position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;pointer-events:auto;touch-action:pan-y;}
        ${q} [data-gp-letter]:focus-visible{outline:2px solid var(--gp-ink, #FFA266);outline-offset:5px;}
        ${q} [data-gp-front]{position:absolute;inset:0;opacity:var(--gp-caption,1);pointer-events:none;z-index:20;}
        ${q} [data-gp-caption]{position:absolute;inset:auto 0 6% 0;display:flex;align-items:center;justify-content:center;gap:0.75rem;font:11px/1.4 monospace;letter-spacing:0.15em;text-transform:uppercase;color:var(--gp-ink, #FFA266);opacity:var(--gp-caption,1);pointer-events:none;z-index:20;}
      `,
        }}
      />

      {/* Camera Chamber pinned by GSAP ScrollTrigger */}
      <div ref={pinRef} data-gp-pin>
        {/* Layer 1: Base surface / First Section */}
        {layer1 && (
          <div ref={layer1Ref} data-gp-layer1 aria-hidden="true">
            {layer1}
          </div>
        )}

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
          {strokeOutline && (
            <g data-gp-stroke-wrap>
              <text
                data-gp-stroke
                x="0"
                y="0"
                style={{
                  fontFamily: SOLID_FONT,
                  fontWeight: weight,
                  fontSize: 100,
                  fontKerning: "none",
                  fontVariantLigatures: "none",
                  letterSpacing: 0,
                  fill: "none",
                  stroke: "var(--gp-ink, #FFA266)",
                  strokeWidth: "1.2px",
                }}
              >
                {text}
              </text>
            </g>
          )}
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
          <span>Scroll to zoom through &bull; Enter Accolades</span>
          <span className="text-sm font-bold">↓</span>
        </div>
      </div>
    </section>
  );
}
