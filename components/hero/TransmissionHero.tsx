'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { GLYPH_SETS, TransmissionEngine, type GlyphSet } from './TransmissionEngine';
import './transmission.css';

gsap.registerPlugin(ScrollTrigger);

const MONO = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace';
const SETS = Object.keys(GLYPH_SETS) as GlyphSet[];

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function TransmissionHero() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<TransmissionEngine | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [glyphs, setGlyphs] = useState<GlyphSet>('ascii');

  /* ------------------------------------------------------------ engine */
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    let disposed = false;
    let engine: TransmissionEngine | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let inView = true;
    const onVis = () => (document.hidden || !inView ? engine?.pause() : engine?.play());

    const fontCheck =
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.load(`500 50px ${MONO}`)
        : Promise.resolve();

    Promise.race([fontCheck, new Promise((r) => setTimeout(r, 2000))]).then(() => {
      if (disposed) return;
      try {
        engine = new TransmissionEngine(canvas, { font: MONO });
      } catch (err) {
        console.warn('[transmission] WebGL unavailable', err);
        setStatus('failed');
        return;
      }
      engineRef.current = engine;
      engine.resize(stage.clientWidth, stage.clientHeight);
      ro = new ResizeObserver(() => engine?.resize(stage.clientWidth, stage.clientHeight));
      ro.observe(stage);
      io = new IntersectionObserver(([e]) => {
        inView = e.isIntersecting;
        onVis();
      });
      if (trackRef.current) io.observe(trackRef.current);
      document.addEventListener('visibilitychange', onVis);
      canvas.addEventListener('webglcontextlost', onLost);
      engine.play();
      setStatus('ready');
    });

    const onLost = (e: Event) => {
      e.preventDefault();
      setStatus('failed');
    };

    return () => {
      disposed = true;
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setStatic(reduced);
  }, [reduced, status]);

  useEffect(() => {
    engineRef.current?.setGlyphs(glyphs);
  }, [glyphs, status]);

  /* ---------------------------------------------- pointer: lens, drag, pulse */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || status !== 'ready') return;
    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const isUi = (e: PointerEvent) => !!(e.target as HTMLElement).closest('button, a');
    let down: { x: number; y: number; moved: number } | null = null;

    const move = (e: PointerEvent) => {
      const p = local(e);
      const eng = engineRef.current;
      if (!eng) return;
      if (down) {
        const dx = p.x - down.x;
        down.moved += Math.abs(dx) + Math.abs(p.y - down.y);
        down.x = p.x;
        down.y = p.y;
        eng.nudgeYaw(dx * 0.008);
      }
      const active = e.pointerType === 'mouse' ? !isUi(e) : !!down;
      eng.setPointer(p.x, p.y, active);
    };

    const press = (e: PointerEvent) => {
      if (isUi(e)) return;
      const p = local(e);
      down = { x: p.x, y: p.y, moved: 0 };
      engineRef.current?.setPointer(p.x, p.y, true);
    };

    const release = (e: PointerEvent) => {
      if (!down) return;
      const p = local(e);
      if (down.moved < 8) engineRef.current?.pulseAt(p.x, p.y);
      down = null;
      if (e.pointerType !== 'mouse') engineRef.current?.setPointer(p.x, p.y, false);
    };

    const leave = (e: PointerEvent) => {
      down = null;
      const p = local(e);
      engineRef.current?.setPointer(p.x, p.y, false);
    };

    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', leave);
    stage.addEventListener('pointerleave', leave);
    return () => {
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      stage.removeEventListener('pointercancel', leave);
      stage.removeEventListener('pointerleave', leave);
    };
  }, [status]);

  /* ------------------------------------------------------ smooth scroll */
  useEffect(() => {
    if (reduced) return;
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      lenisRef.current = (window as any).__lenis;
      return;
    }
    const lenis = new Lenis({ lerp: 0.085 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  /* ------------------------------------------------ intro + scroll story */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: 'expo.out' }, delay: 0.3 })
          .from('.tx-dock button, .tx-hint__in', { opacity: 0, duration: 1.2, stagger: 0.08 });
      }

      const story = { p: 0 };
      const apply = (p: number) => {
        progressRef.current = p;
        const mobile = window.innerWidth < 700;
        const res = smooth(0, 0.34, p);
        engineRef.current?.setState({
          cell: (mobile ? 15 : 20) - res * (mobile ? 7 : 11),
          bloom: 0.3 + 0.7 * smooth(0.12, 0.58, p),
          pitch: 0.28 + 0.9 * smooth(0.3, 0.72, p),
          decode: smooth(0.66, 0.93, p),
        });
      };

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      tl.to(story, { p: 1, duration: 1, onUpdate: () => apply(story.p) }, 0)
        .to('.tx-hint', { opacity: 0, duration: 0.05 }, 0)
        .to('.tx-dock', { opacity: 0, duration: 0.08 }, 0.8)
        .fromTo(
          '.tx-final',
          { opacity: 0, y: 30, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 },
          0.92,
        );

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.7,
        onUpdate(self) {
          if (!reduced) return;
          const p = self.progress > 0.8 ? 1 : self.progress > 0.35 ? 0.6 : 0;
          tl.progress(p);
          apply(p);
        },
      });

      apply(0);
    }, stageRef);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [reduced]);

  // Keep engine in sync once ready
  useEffect(() => {
    if (status !== 'ready') return;
    stRef.current?.update();
    const p = progressRef.current;
    const mobile = window.innerWidth < 700;
    engineRef.current?.setState({
      cell: (mobile ? 15 : 20) - smooth(0, 0.34, p) * (mobile ? 7 : 11),
      bloom: 0.3 + 0.7 * smooth(0.12, 0.58, p),
      pitch: 0.28 + 0.9 * smooth(0.3, 0.72, p),
      decode: smooth(0.66, 0.93, p),
    });
  }, [status]);

  const replay = () => {
    const st = stRef.current;
    if (!st) return;
    if (lenisRef.current) lenisRef.current.scrollTo(st.start, { duration: 2 });
    else window.scrollTo({ top: st.start, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <main className="tx-root" data-status={status}>
      <section ref={trackRef} className="tx-track" aria-label="Transmission — Lakshan Ganesan rendered as live code">
        <div ref={stageRef} className="tx-stage">
          <canvas ref={canvasRef} className="tx-canvas" aria-hidden="true" />

          {/* Hint */}
          <div className="tx-hint" aria-hidden="true">
            <span className="tx-hint__in">Scroll to tune in</span>
          </div>

          {/* Glyph set dock */}
          <div className="tx-dock" role="radiogroup" aria-label="Glyph set" hidden={status !== 'ready'}>
            {SETS.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={glyphs === s}
                className={glyphs === s ? 'is-active' : ''}
                onClick={() => setGlyphs(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Finale - appears at end of scroll */}
          <div className="tx-final">
            <p className="tx-final__kicker">Signal decoded · 100%</p>
            <h2 className="tx-final__title">Decoded.</h2>
            <p className="tx-final__body">What you saw as text was always the builder.</p>
            <button type="button" className="tx-final__btn" onClick={replay}>
              Replay transmission <span aria-hidden="true">↑</span>
            </button>
          </div>

          {status === 'loading' && (
            <div className="tx-loader" role="status">
              Tuning in…
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
