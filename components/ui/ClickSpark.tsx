'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, type CSSProperties, type ReactNode } from 'react';

export type ClickSparkShape = 'line' | 'streak' | 'dot' | 'star';

export type ClickSparkEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

export interface ClickSparkProps {
  sparkColor?: string | string[];
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  sparkWidth?: number;
  duration?: number;
  easing?: ClickSparkEasing;
  extraScale?: number;
  shape?: ClickSparkShape;
  randomness?: number;
  gravity?: number;
  spread?: number;
  direction?: number;
  glow?: number;
  ring?: boolean;
  layer?: 'front' | 'back';
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ClickSparkHandle {
  spark: (x?: number, y?: number) => void;
}

interface Settings {
  colors: string[];
  size: number;
  radius: number;
  count: number;
  width: number;
  duration: number;
  ease: (t: number) => number;
  shape: ClickSparkShape;
  randomness: number;
  gravity: number;
  spread: number;
  direction: number;
  glow: number;
  ring: boolean;
  disabled: boolean;
}

interface Spark {
  angle: number;
  reach: number;
  scale: number;
  life: number;
  spin: number;
  color: string;
  clear: string;
  glow: number;
}

interface Burst {
  x: number;
  y: number;
  start: number;
  sparks: Spark[];
  settings: Settings;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ratio: number;
  left: number;
  top: number;
}

const EASINGS: Record<string, (t: number) => number> = {
  linear: t => t,
  'ease-in': t => t * t,
  'ease-out': t => 1 - Math.pow(1 - t, 3),
  'ease-in-out': t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  spring: t => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2)
};

const SHAPES: ClickSparkShape[] = ['line', 'streak', 'dot', 'star'];
const MAX_BURSTS = 32;
const GRAVITY = 500;
const REDUCED_MS = 320;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const toColors = (value: string | string[]): string[] => {
  const list = (Array.isArray(value) ? value : [value]).filter(Boolean);
  return list.length ? list : ['#ffffff'];
};

const starPath = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number) => {
  const pinch = radius * 0.16;
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(rotation) * radius, y + Math.sin(rotation) * radius);
  for (let i = 1; i <= 4; i++) {
    const a = rotation + (i * Math.PI) / 2;
    const mid = a - Math.PI / 4;
    ctx.quadraticCurveTo(
      x + Math.cos(mid) * pinch,
      y + Math.sin(mid) * pinch,
      x + Math.cos(a) * radius,
      y + Math.sin(a) * radius
    );
  }
  ctx.closePath();
};

const channels = (ctx: CanvasRenderingContext2D, color: string): number[] => {
  ctx.fillStyle = color;
  const normal = String(ctx.fillStyle);
  const hex = /^#([0-9a-f]{6})$/i.exec(normal);
  if (hex) {
    const value = parseInt(hex[1], 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  }
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(normal);
  if (rgb)
    return rgb[1]
      .split(',')
      .slice(0, 3)
      .map(part => parseFloat(part));
  return [0, 0, 0];
};

export const ClickSpark = forwardRef<ClickSparkHandle, ClickSparkProps>(
  (
    {
      sparkColor = '#fff',
      sparkSize = 14,
      sparkRadius = 30,
      sparkCount = 8,
      sparkWidth = 2,
      duration = 500,
      easing = 'ease-out',
      extraScale = 1,
      shape = 'line',
      randomness = 0.2,
      gravity = 0,
      spread = 360,
      direction = 0,
      glow = 0,
      ring = false,
      layer = 'front',
      disabled = false,
      className = '',
      style,
      children
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const layerRef = useRef<HTMLSpanElement>(null);
    const engineRef = useRef<ClickSparkHandle | null>(null);
    const settings: Settings = {
      colors: toColors(sparkColor),
      size: Math.max(0, sparkSize),
      radius: Math.max(0, sparkRadius),
      count: Math.max(0, Math.round(sparkCount)),
      width: Math.max(0.5, sparkWidth),
      duration: Math.max(50, duration),
      ease: EASINGS[easing] ?? EASINGS['ease-out'],
      shape: SHAPES.includes(shape) ? shape : 'line',
      randomness: clamp(randomness, 0, 1),
      gravity,
      spread: clamp(spread, 0, 360),
      direction,
      glow: Math.max(0, glow),
      ring,
      disabled
    };
    const settingsRef = useRef<Settings>(settings);
    settingsRef.current = settings;

    useEffect(() => {
      const root = rootRef.current;
      const layer = layerRef.current;
      if (!root || !layer) return undefined;

      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      const bursts: Burst[] = [];
      let raf = 0;
      let lastPress = { time: 0, x: 0, y: 0 };

      const drop = (s: Settings, elapsed: number) => 0.5 * s.gravity * GRAVITY * elapsed * elapsed;

      const remove = (burst: Burst) => {
        burst.canvas.remove();
        const index = bursts.indexOf(burst);
        if (index >= 0) bursts.splice(index, 1);
      };

      const frame = (now: number) => {
        raf = 0;
        for (let i = bursts.length - 1; i >= 0; i--) {
          const b = bursts[i];
          const elapsed = (now - b.start) / 1000;
          const progress = Math.min(1, (now - b.start) / b.settings.duration);
          if (progress >= 1) {
            remove(b);
            continue;
          }
          const dt = b.settings.ease(progress);
          const ctx = b.ctx;
          const ratio = b.ratio;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, b.canvas.width, b.canvas.height);
          ctx.setTransform(ratio, 0, 0, ratio, -b.left * ratio, -b.top * ratio);

          for (const s of b.sparks) {
            const life = smoothstep(0, 1, (1 - progress) / s.life);
            if (life <= 0) continue;
            const distance = s.reach * b.settings.radius * dt;
            const size = b.settings.size * s.scale * (b.settings.shape === 'line' ? 1 : life);
            const thick = b.settings.width * s.scale;
            const x = b.x + Math.cos(s.angle) * distance;
            const y = b.y + Math.sin(s.angle) * distance + drop(b.settings, elapsed);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(s.angle + s.spin * progress * 4);
            ctx.fillStyle = s.color;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = thick;

            if (b.settings.shape === 'line') {
              ctx.beginPath();
              ctx.moveTo(-size / 2, 0);
              ctx.lineTo(size / 2, 0);
              ctx.stroke();
            } else if (b.settings.shape === 'streak') {
              ctx.beginPath();
              ctx.ellipse(0, 0, size, thick, 0, 0, Math.PI * 2);
              ctx.fill();
            } else if (b.settings.shape === 'dot') {
              ctx.beginPath();
              ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (b.settings.shape === 'star') {
              starPath(ctx, 0, 0, size, 0);
              ctx.fill();
            }
            ctx.restore();
          }
        }
        if (bursts.length > 0) {
          raf = requestAnimationFrame(frame);
        }
      };

      const spawn = (clientX: number, clientY: number) => {
        const s = settingsRef.current;
        if (s.disabled) return;
        const rect = root.getBoundingClientRect();
        const heading = (s.direction * Math.PI) / 180;
        const arc = (s.spread * Math.PI) / 180;
        const step = s.count > 1 ? arc / (s.spread >= 360 ? s.count : s.count - 1) : 0;
        const offset = Math.floor(Math.random() * s.colors.length);

        const sparks: Spark[] = Array.from({ length: s.count }, (_, i) => {
          const base = s.spread >= 360 ? heading + step * i : s.count > 1 ? heading - arc / 2 + step * i : heading;
          const jitter = (Math.random() - 0.5) * s.randomness;
          return {
            angle: base + jitter * (step || arc || 1) * 0.9,
            reach: 1 + (Math.random() - 0.5) * 0.7 * s.randomness,
            scale: 1 + (Math.random() - 0.5) * 0.8 * s.randomness,
            life: 1 + (Math.random() - 0.5) * 0.5 * s.randomness,
            spin: Math.random() - 0.5,
            color: s.colors[(i + offset) % s.colors.length],
            clear: '',
            glow: 0
          };
        });

        const reach = s.radius * (1 + 0.35 * s.randomness) + s.size * (1 + 0.4 * s.randomness) + 20;
        const box = {
          left: Math.max(clientX - reach, 0),
          top: Math.max(clientY - reach, 0),
          right: Math.min(clientX + reach, window.innerWidth),
          bottom: Math.min(clientY + reach, window.innerHeight)
        };
        if (box.right - box.left < 1 || box.bottom - box.top < 1) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil((box.right - box.left) * ratio);
        canvas.height = Math.ceil((box.bottom - box.top) * ratio);
        Object.assign(canvas.style, {
          position: 'absolute',
          left: `${box.left - rect.left}px`,
          top: `${box.top - rect.top}px`,
          width: `${box.right - box.left}px`,
          height: `${box.bottom - box.top}px`,
          display: 'block',
          pointerEvents: 'none'
        });
        canvas.setAttribute('aria-hidden', 'true');
        layer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          canvas.remove();
          return;
        }

        for (const spark of sparks) {
          const [r, g, b] = channels(ctx, spark.color);
          spark.clear = `rgba(${r}, ${g}, ${b}, 0)`;
        }

        bursts.push({
          x: clientX,
          y: clientY,
          start: performance.now(),
          sparks,
          settings: { ...s },
          canvas,
          ctx,
          ratio,
          left: box.left,
          top: box.top
        });

        while (bursts.length > MAX_BURSTS) remove(bursts[0]);
        if (!raf) raf = requestAnimationFrame(frame);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        lastPress = { time: performance.now(), x: event.clientX, y: event.clientY };
        spawn(event.clientX, event.clientY);
      };

      const onClick = (event: MouseEvent) => {
        if ('pointerType' in event && (event as any).pointerType === 'mouse') return;
        if (event.detail === 0) {
          const target = event.target instanceof Element ? event.target : root;
          const rect = target.getBoundingClientRect();
          spawn(rect.left + rect.width / 2, rect.top + rect.height / 2);
          return;
        }
        const recent =
          performance.now() - lastPress.time < 700 &&
          Math.hypot(event.clientX - lastPress.x, event.clientY - lastPress.y) < 12;
        if (!recent) spawn(event.clientX, event.clientY);
      };

      root.addEventListener('pointerdown', onPointerDown);
      root.addEventListener('click', onClick);

      engineRef.current = {
        spark: (x?: number, y?: number) => {
          const rect = root.getBoundingClientRect();
          spawn(rect.left + (x ?? rect.width / 2), rect.top + (y ?? rect.height / 2));
        }
      };

      return () => {
        cancelAnimationFrame(raf);
        root.removeEventListener('pointerdown', onPointerDown);
        root.removeEventListener('click', onClick);
        for (const burst of [...bursts]) remove(burst);
        engineRef.current = null;
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        spark: (x?: number, y?: number) => engineRef.current?.spark(x, y)
      }),
      []
    );

    return (
      <div ref={rootRef} className={`relative isolate h-full w-full ${className}`.trim()} style={style}>
        {children}
        <span
          ref={layerRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 overflow-visible ${layer === 'back' ? 'z-[-1]' : 'z-[9999]'}`}
        />
      </div>
    );
  }
);

ClickSpark.displayName = 'ClickSpark';

export default ClickSpark;
