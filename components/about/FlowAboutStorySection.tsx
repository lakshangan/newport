'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { HiddenClueWord } from '@/components/cipher/HiddenClueWord';
import { cn } from '@/lib/utils';
import { RailToc, type RailTocItem } from '@/components/ui/rail-toc';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

type ChapterId = 'accolades' | 'work' | 'craft';

const CHAPTERS: { id: ChapterId; num: string; label: string }[] = [
  { id: 'accolades', num: '01', label: 'Accolades' },
  { id: 'work', num: '02', label: 'Projects' },
  { id: 'craft', num: '03', label: 'Tech Stack' },
];

interface Accolade {
  num: string;
  tag: string;
  stat: string;
  statNote: string;
  title: string;
  body: React.ReactNode;
  meta: string;
  lead?: boolean;
}

const ACCOLADES: Accolade[] = [
  {
    num: '01',
    tag: '1st Place',
    stat: '1st',
    statNote: 'out of 100+ teams',
    title: 'Build On Chain — NIT Calicut',
    body: 'Built and deployed an audited tokenization protocol and automated yield vault in a 36-hour sprint.',
    meta: 'Solidity · Foundry · DeFi',
    lead: true,
  },
  {
    num: '02',
    tag: 'Top 0.01%',
    stat: 'Top 0.01%',
    statNote: 'out of 50K+ applicants',
    title: 'Smart India Hackathon',
    body: 'Selected as a national finalist in India’s premier hackathon, engineering software for public infrastructure challenges.',
    meta: 'Ministry of Education · Govt. of India',
  },
  {
    num: '03',
    tag: 'Community',
    stat: '200+',
    statNote: 'builders mentored',
    title: 'Tech Hub Lead & Ambassador',
    body: 'Leading hands-on Web3 and AI workshops, mentoring junior developers, and driving tech initiatives on campus.',
    meta: 'Workshops · Mentorship',
  },
  {
    num: '04',
    tag: 'Research',
    stat: 'v4',
    statNote: 'Hook Incubator',
    title: 'Uniswap v4 & OpenLedger',
    body: 'Selected for the Uniswap v4 Hook cohort, researching custom liquidity hooks and decentralized AI data pipelines.',
    meta: 'AMM Hooks · Decentralized AI',
  },
  {
    num: '05',
    tag: 'Discipline',
    stat: 'Bronze',
    statNote: 'International Silambam',
    title: 'International Silambam Medalist',
    body: (
      <>
        Years of martial-arts training taught me precision, reaction speed, and{' '}
        <HiddenClueWord word="discipline" clueIndex={2} /> — the stamina I bring to engineering builds.
      </>
    ),
    meta: 'Physical Mastery · Focus',
  },
];

interface Project {
  id: string;
  title: React.ReactNode;
  plainTitle: string;
  kind: string;
  year: string;
  domain: string;
  url: string;
  githubUrl?: string;
  description: React.ReactNode;
  size: 'lg' | 'sm';
  offset: 'up' | 'down';
}

const PROJECTS: Project[] = [
  {
    id: 'mochi',
    title: 'Mochi',
    plainTitle: 'Mochi Desktop Companion',
    kind: 'Desktop app',
    year: '2025',
    domain: 'mochidesktoppet.vercel.app',
    url: 'https://mochidesktoppet.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/mochi',
    description: 'A cross-platform desktop pet with orb physics, app-context awareness, focus timers and an LED-matrix face.',
    size: 'lg',
    offset: 'up',
  },
  {
    id: 'land-vault',
    title: 'LandVault',
    plainTitle: 'LandVault Protocol',
    kind: 'RWA protocol',
    year: '2025',
    domain: 'land-vault-v2.vercel.app',
    url: 'https://land-vault-v2.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
    description: 'Tokenized real estate with automated yield-distribution contracts on EVM networks.',
    size: 'sm',
    offset: 'down',
  },
  {
    id: 'jayam',
    title: 'Jayam',
    plainTitle: 'Jayam Fashion Institute',
    kind: 'Client site',
    year: '2025',
    domain: 'jayamwebsite.vercel.app',
    url: 'https://jayamwebsite.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/jayam-website-',
    description: 'An editorial site and course catalog for an apparel design institute.',
    size: 'lg',
    offset: 'down',
  },
  {
    id: 'nuna-organic',
    title: 'Nuna Organic',
    plainTitle: 'Nuna Organic',
    kind: 'Brand site',
    year: '2025',
    domain: 'nunaorganic.vercel.app',
    url: 'https://nunaorganic.vercel.app/',
    githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
    description: 'A brand showcase choreographed with GSAP — kinetic transitions and slow, tactile storytelling.',
    size: 'sm',
    offset: 'up',
  },
  {
    id: 'mediocto',
    title: 'MediOcto',
    plainTitle: 'MediOcto AI',
    kind: 'AI product',
    year: '2024',
    domain: 'mediocto-lovat.vercel.app',
    url: 'https://mediocto-lovat.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: 'A mental-wellness companion pairing LLM agent routing with a real-time 3D character.',
    size: 'lg',
    offset: 'up',
  },
  {
    id: 'genproof',
    title: (
      <>
        Gen<HiddenClueWord word="Proof" clueIndex={0} />
      </>
    ),
    plainTitle: 'GenProof AI',
    kind: 'Provenance engine',
    year: '2024',
    domain: 'gen-proof-ai.vercel.app',
    url: 'https://gen-proof-ai.vercel.app/',
    githubUrl: 'https://github.com/lakshangan',
    description: (
      <>
        Cryptographic <HiddenClueWord word="proof" clueIndex={0} /> for media — verifies synthetic AI content with the C2PA standard.
      </>
    ),
    size: 'sm',
    offset: 'down',
  },
];

const CRAFT = [
  {
    num: '01',
    title: 'Full-stack',
    line: 'Fast, scalable web apps from frontend to database.',
    skills: ['Next.js 15', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    num: '02',
    title: 'AI tools',
    line: 'Intelligent LLM agents, neural search, and modern AI workflows.',
    skills: ['Cursor & Copilot', 'Gemini & OpenAI API', 'LangChain & Agents', 'Vector DBs & RAG', 'Claude & Python'],
  },
  {
    num: '03',
    title: 'Web3 & EVM',
    line: 'Audited smart contracts, DeFi vaults, and on-chain protocols.',
    skills: ['Solidity', 'Foundry', 'Uniswap v4 Hooks', 'Hardhat', 'Ethers.js'],
  },
  {
    num: '04',
    title: '3D & Motion',
    line: 'Immersive 60fps web graphics, GLSL shaders, and tactile motion.',
    skills: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'GSAP Motion', 'WebGL'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

/** Splits a line into masked words that rise into place when the line enters. */
const MaskedLine: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <span className={cn('h-line block', className)}>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
        <span className="h-word inline-block will-change-transform">
          {word}
          {' '}
        </span>
      </span>
    ))}
  </span>
);

/** A live, scaled-down render of a deployed site that fills its frame. */
const LivePreview: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={innerRef} className="h-parallax absolute -inset-[6%] will-change-transform">
      <div
        className="origin-top-left pointer-events-none select-none"
        style={{ width: 1440, height: 900, transform: `scale(${scale})` }}
      >
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0 bg-[#111]"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

type Tone = 'dark' | 'light' | 'accent';

const TONES: Record<Tone, { card: string; muted: string; faint: string; rule: string; chip: string }> = {
  dark: {
    card: 'bg-[#131211] text-[#F2EFE9] ring-1 ring-inset ring-white/[0.06]',
    muted: 'text-white/55',
    faint: 'text-white/35',
    rule: 'border-white/[0.08]',
    chip: 'bg-white/[0.06] text-white/70',
  },
  light: {
    card: 'bg-[#ECE8E1] text-[#141312]',
    muted: 'text-black/60',
    faint: 'text-black/40',
    rule: 'border-black/[0.1]',
    chip: 'bg-black/[0.07] text-black/70',
  },
  accent: {
    card: 'bg-[#E06D43] text-[#140B07]',
    muted: 'text-black/65',
    faint: 'text-black/45',
    rule: 'border-black/[0.14]',
    chip: 'bg-black/[0.1] text-black/75',
  },
};

/**
 * Card shell. The outer layer receives scroll-driven 3D depth from GSAP (.h-card),
 * the inner layer tilts toward the pointer — kept separate so they never fight.
 */
const DepthCard: React.FC<{
  id?: string;
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ id, tone = 'dark', className, style, children }) => {
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${px * 7}deg`);
    el.style.setProperty('--rx', `${py * -7}deg`);
  };
  const onLeave = () => {
    innerRef.current?.style.setProperty('--ry', '0deg');
    innerRef.current?.style.setProperty('--rx', '0deg');
  };

  return (
    <div id={id} className="h-skew shrink-0 [perspective:1400px]" style={style}>
      <div className="h-card h-full w-full will-change-transform [transform-style:preserve-3d]">
        <div
          ref={innerRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={cn(
            'group/card relative h-full w-full overflow-hidden rounded-[28px] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] hover:shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)]',
            '[transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateZ(0)]',
            TONES[tone].card,
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ACCOLADE_TONES: Tone[] = ['accent', 'dark', 'light', 'dark', 'dark'];
const CRAFT_TONES: Tone[] = ['dark', 'light', 'dark', 'accent'];

const RAIL_LABELS: Record<string, string> = {
  mochi: 'Mochi',
  'land-vault': 'LandVault',
  jayam: 'Jayam',
  'nuna-organic': 'Nuna Organic',
  mediocto: 'MediOcto',
  genproof: 'GenProof',
};

/** Ids are looked up inside the horizontal track only (the mobile view reuses some ids). */
const RAIL_ITEMS: RailTocItem[] = [
  { id: 'recognition', label: 'Accolades' },
  { id: 'showcase', label: 'Projects' },
  ...PROJECTS.map((p) => ({ id: `work-${p.id}`, label: RAIL_LABELS[p.id] ?? p.plainTitle, depth: 1 })),
  { id: 'technical-expertise', label: 'Tech Stack' },
  { id: 'about-next', label: 'Up next' },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export const FlowAboutStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const chapterRefs = useRef<Record<ChapterId, HTMLDivElement | null>>({
    accolades: null,
    work: null,
    craft: null,
  });

  const scrollToMilestones = () => {
    const el = document.getElementById('competitive-milestones');
    if (!el) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el, { duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  /** Vertical scroll position at which a chapter's first column sits at the left edge. */
  const scrollPositionFor = (id: ChapterId): number | null => {
    const st = ScrollTrigger.getById('about-horizontal');
    const track = trackRef.current;
    const marker = chapterRefs.current[id];
    if (!st || !track || !marker) return null;
    const distance = Math.max(1, track.scrollWidth - window.innerWidth);
    const offset = id === 'accolades' ? 0 : Math.min(distance, marker.offsetLeft);
    return st.start + (offset / distance) * (st.end - st.start);
  };

  const goToChapter = (id: ChapterId) => {
    const target = scrollPositionFor(id);
    if (target === null) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  /** Left edge of an element inside the track, in track coordinates. */
  const trackLeftOf = (id: string): number | null => {
    const track = trackRef.current;
    const el = track?.querySelector<HTMLElement>(`#${id}`);
    if (!track || !el) return null;
    return el.getBoundingClientRect().left - track.getBoundingClientRect().left;
  };

  /** Continuous rail index (2.5 = halfway between items 2 and 3) from the current scroll. */
  const getRailPosition = useCallback((): number => {
    const st = ScrollTrigger.getById('about-horizontal');
    const track = trackRef.current;
    if (!st || !track) return 0;
    const distance = Math.max(1, track.scrollWidth - window.innerWidth);
    const progress = gsap.utils.clamp(0, 1, (window.scrollY - st.start) / Math.max(1, st.end - st.start));
    const reading = progress * distance + window.innerWidth * 0.5;
    const lefts = RAIL_ITEMS.map((item) => trackLeftOf(item.id) ?? Infinity);
    let i = -1;
    for (let k = 0; k < lefts.length; k++) if (lefts[k] <= reading) i = k;
    if (i < 0) return 0;
    if (i >= lefts.length - 1) return lefts.length - 1;
    const span = lefts[i + 1] - lefts[i];
    return i + (span > 0 ? gsap.utils.clamp(0, 1, (reading - lefts[i]) / span) : 0);
  }, []);

  /** Scroll so the chosen rail item lands just right of the rail gutter. */
  const goToRailItem = useCallback((index: number) => {
    const st = ScrollTrigger.getById('about-horizontal');
    const track = trackRef.current;
    const left = trackLeftOf(RAIL_ITEMS[index].id);
    if (!st || !track || left === null) return;
    const distance = Math.max(1, track.scrollWidth - window.innerWidth);
    const gutter = window.innerWidth * 0.06;
    const offset = index === 0 ? 0 : gsap.utils.clamp(0, distance, left - gutter);
    const target = st.start + (offset / distance) * (st.end - st.start);
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  // Let the navbar jump into / read chapters without knowing the layout.
  useEffect(() => {
    const w = window as any;
    w.__aboutGoTo = (id: 'about' | 'showcase') => goToChapter(id === 'showcase' ? 'work' : 'accolades');
    return () => {
      delete w.__aboutGoTo;
      delete w.__aboutChapter;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      const bg = bgRef.current;
      if (!container || !track) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const skewTargets = gsap.utils.toArray<HTMLElement>('.h-skew', track);
      const skewTo = skewTargets.length
        ? gsap.quickTo(skewTargets, 'skewX', { duration: 0.6, ease: 'power3.out' })
        : null;
      let settle: ReturnType<typeof setTimeout> | undefined;
      let lastChapter: ChapterId = 'accolades';

      const chapterAt = (x: number): ChapterId => {
        let current: ChapterId = 'accolades';
        for (const c of CHAPTERS) {
          const el = chapterRefs.current[c.id];
          if (el && el.offsetLeft <= x) current = c.id;
        }
        return current;
      };

      // 1. The main horizontal move — 1:1 with vertical scroll so it feels native.
      const move = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'about-horizontal',
          trigger: container,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (percentRef.current) {
              percentRef.current.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
            }

            const chapter = chapterAt(self.progress * getDistance() + window.innerWidth * 0.55);
            if (chapter !== lastChapter) {
              lastChapter = chapter;
            }
            (window as any).__aboutChapter = chapter;

            // Velocity skew on the project frames — gives the strip some weight.
            if (skewTo && !reduceMotion) {
              skewTo(gsap.utils.clamp(-5, 5, self.getVelocity() / -400));
              clearTimeout(settle);
              settle = setTimeout(() => skewTo(0), 140);
            }
          },
        },
      });

      // 2. Oversized background words drift slower than the content.
      if (bg) {
        gsap.to(bg, {
          x: () => -getDistance() * 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      if (reduceMotion) return;

      // 3. Headline words rise as each line enters from the right.
      gsap.utils.toArray<HTMLElement>('.h-line', track).forEach((line) => {
        gsap.from(line.querySelectorAll('.h-word'), {
          yPercent: 110,
          rotate: 4,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: line,
            containerAnimation: move,
            start: 'left 92%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // 4. Blocks fade up when they enter.
      gsap.utils.toArray<HTMLElement>('.h-reveal', track).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            containerAnimation: move,
            start: 'left 95%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // 5. Project frames open like a shutter, and their content parallaxes inside.
      gsap.utils.toArray<HTMLElement>('.h-frame', track).forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(0% 0% 0% 100%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              containerAnimation: move,
              start: 'left 100%',
              end: 'left 55%',
              scrub: true,
            },
          }
        );
        const inner = frame.querySelector('.h-parallax');
        if (inner) {
          gsap.fromTo(
            inner,
            { xPercent: 4 },
            {
              xPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                containerAnimation: move,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }
      });

      // 6. Cards swing in from depth on the right, sit flat in the middle,
      //    and fold slightly away as they leave on the left.
      gsap.utils.toArray<HTMLElement>('.h-card', track).forEach((card) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: move,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
          .fromTo(
            card,
            { rotateY: -24, z: -260, xPercent: 12, opacity: 0.35, transformOrigin: '0% 50%' },
            { rotateY: 0, z: 0, xPercent: 0, opacity: 1, ease: 'power2.out', duration: 1 }
          )
          .to(card, { rotateY: 0, duration: 0.6 })
          .to(card, {
            rotateY: 16,
            z: -160,
            opacity: 0.45,
            transformOrigin: '100% 50%',
            ease: 'power2.in',
            duration: 1,
          });
      });

      return () => clearTimeout(settle);
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full relative block" aria-label="About — accolades, projects and tech stack">
      <div
        id="about"
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-[#080808] text-[#E8E5DF] scroll-mt-6"
      >
        {/* ------------------------------------------------------------------ */}
        {/* Background: slow-drifting outlined words                           */}
        {/* ------------------------------------------------------------------ */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex items-center gap-[30vw] pl-[60vw] whitespace-nowrap pointer-events-none select-none will-change-transform"
        >
          {['Accolades', 'Projects', 'Tech Stack'].map((word) => (
            <span
              key={word}
              className="font-display uppercase leading-none text-transparent text-[42vh] tracking-tight"
              style={{ WebkitTextStroke: '1px rgba(232,229,223,0.045)' }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Soft warm light that stays put while everything moves past it */}
        <div
          aria-hidden="true"
          className="absolute -bottom-[30vh] left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] rounded-[100%] bg-[radial-gradient(closest-side,rgba(199,91,50,0.10),transparent)] pointer-events-none"
        />

        {/* ------------------------------------------------------------------ */}
        {/* Track                                                               */}
        {/* ------------------------------------------------------------------ */}
        <div
          ref={trackRef}
          className="relative z-10 flex h-full w-max items-stretch will-change-transform"
        >
          {/* ======================= INTRO ======================= */}
          <section className="relative flex h-full w-[58vw] shrink-0 flex-col justify-between pl-[6vw] pr-[4vw] pt-[16vh] pb-[20vh]">
            <div className="h-reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <span className="text-[#E06D43]">(01)</span>
              <span>Overview</span>
            </div>

            <h2 className="font-display uppercase leading-[0.86] tracking-[-0.01em] text-[clamp(64px,15vh,176px)] text-[#F2EFE9]">
              <MaskedLine text="Proven" />
              <MaskedLine text="by" />
              <span className="h-line block">
                <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                  <span className="h-word inline-block font-serif italic normal-case tracking-[-0.03em] text-[#E06D43] text-[0.92em] pr-[0.06em]">
                    results.
                  </span>
                </span>
              </span>
            </h2>

            <div className="h-reveal flex items-end justify-between gap-10">
              <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/55">
                Competitive hackathon wins, national stages, and protocol research. Keep scrolling; the page moves sideways.
              </p>
              <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                Scroll
                <span className="relative flex h-px w-16 overflow-hidden bg-white/15">
                  <span className="absolute inset-y-0 left-0 w-1/2 bg-[#E06D43] animate-[hscroll-hint_1.8s_ease-in-out_infinite]" />
                </span>
              </div>
            </div>
          </section>

          {/* ======================= 01 ACCOLADES ======================= */}
          <div
            id="recognition"
            ref={(el) => {
              chapterRefs.current.accolades = el;
            }}
            className="flex h-full shrink-0 items-center gap-[1.4vw] pl-[1vw] pr-[7vw]"
          >
            {ACCOLADES.map((a, i) => {
              const toneName = ACCOLADE_TONES[i];
              const t = TONES[toneName];
              return (
                <DepthCard
                  key={a.num}
                  tone={toneName}
                  className="flex flex-col justify-between p-7"
                  style={{
                    width: a.lead ? 'clamp(360px, 30vw, 500px)' : 'clamp(300px, 23vw, 380px)',
                    height: 'min(58vh, 560px)',
                    marginTop: i % 2 ? '5vh' : '-5vh',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]', t.chip)}>
                      {a.tag}
                    </span>
                    <span className={cn('font-mono text-[11px] tabular-nums', t.faint)}>
                      {a.num} / {String(ACCOLADES.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <div
                      className={cn(
                        'font-display uppercase leading-[0.8] tracking-[-0.01em] transition-colors duration-500',
                        a.stat.length > 4 ? 'text-[clamp(72px,12vh,140px)]' : 'text-[clamp(88px,16vh,180px)]',
                        toneName === 'dark' && 'group-hover/card:text-[#E06D43]'
                      )}
                    >
                      {a.stat}
                    </div>
                    <div className={cn('mt-2 font-serif italic text-[17px]', t.muted)}>{a.statNote}</div>
                  </div>

                  <div className={cn('space-y-2.5 border-t pt-5', t.rule)}>
                    <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.01em]">{a.title}</h3>
                    <p className={cn('text-[13.5px] leading-relaxed', t.muted)}>{a.body}</p>
                    <div className={cn('pt-1 font-mono text-[10.5px] uppercase tracking-[0.16em]', t.faint)}>{a.meta}</div>
                  </div>
                </DepthCard>
              );
            })}
          </div>

          {/* ======================= 02 PROJECTS ======================= */}
          <div
            id="showcase"
            ref={(el) => {
              chapterRefs.current.work = el;
            }}
            className="flex h-full shrink-0 items-center gap-[1.4vw] pr-[7vw]"
          >
            <section className="relative flex h-full w-[40vw] shrink-0 flex-col justify-between pl-[5vw] pr-[3vw] pt-[16vh] pb-[20vh]">
              <div className="h-reveal font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                <span className="text-[#E06D43]">02</span>
                <span className="mx-2 text-white/20">/</span>
                Featured projects
              </div>

              <h2 className="font-display uppercase leading-[0.86] text-[clamp(64px,15vh,176px)] text-[#F2EFE9]">
                <MaskedLine text="Selected" />
                <span className="h-line block">
                  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <span className="h-word inline-block font-serif italic normal-case tracking-[-0.03em] text-[#E06D43] text-[0.92em]">
                      projects
                    </span>
                  </span>
                </span>
              </h2>

              <div className="h-reveal flex items-end justify-between gap-8">
                <p className="max-w-[30ch] text-[15px] leading-relaxed text-white/55">
                  Every card is a live deployment. Click to launch and interact with it.
                </p>
                <a
                  href="https://github.com/lakshangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/gh inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ECE8E1] px-4 py-2 text-[13px] font-medium text-[#141312] transition-colors hover:bg-[#E06D43]"
                >
                  All on GitHub
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/gh:-translate-y-0.5 group-hover/gh:translate-x-0.5" />
                </a>
              </div>
            </section>

            {PROJECTS.map((p, i) => (
              <DepthCard
                key={p.id}
                id={`work-${p.id}`}
                tone="dark"
                className="flex flex-col p-3"
                style={{
                  width: p.size === 'lg' ? 'min(36vw, 82vh)' : 'min(28vw, 64vh)',
                  marginTop: p.offset === 'up' ? '-6vh' : '6vh',
                }}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.plainTitle} live site`}
                  className="h-frame relative block aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#0b0b0b]"
                >
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.05]">
                    <LivePreview url={p.url} title={p.plainTitle} />
                  </div>
                  <div className="absolute inset-0 bg-[#080808]/20 transition-opacity duration-500 group-hover/card:opacity-0" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#080808]/80 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur-sm">
                    {p.domain}
                  </span>
                  <span className="absolute right-3 top-3 flex h-10 w-10 scale-50 items-center justify-center rounded-full bg-[#E06D43] text-[#080808] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-100 group-hover/card:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>

                <div className="flex flex-1 flex-col px-3 pt-5 pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display uppercase text-[clamp(28px,4.4vh,42px)] leading-none text-[#F2EFE9] transition-colors duration-500 group-hover/card:text-[#E06D43]">
                        {p.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                      {p.kind} · {p.year}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-white/50">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/45">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#E06D43]">
                      Live site ↗
                    </a>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#E06D43]">
                        Source ↗
                      </a>
                    )}
                  </div>
                </div>
              </DepthCard>
            ))}
          </div>

          {/* ======================= 03 TECH STACK ======================= */}
          <div
            id="technical-expertise"
            ref={(el) => {
              chapterRefs.current.craft = el;
            }}
            className="flex h-full shrink-0 items-center gap-[1.4vw] pr-[4vw]"
          >
            <section className="relative flex h-full w-[36vw] shrink-0 flex-col justify-between pl-[5vw] pr-[3vw] pt-[16vh] pb-[20vh]">
              <div className="h-reveal font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                <span className="text-[#E06D43]">03</span>
                <span className="mx-2 text-white/20">/</span>
                Tech stack & tools
              </div>

              <h2 className="font-display uppercase leading-[0.86] text-[clamp(64px,15vh,176px)] text-[#F2EFE9]">
                <MaskedLine text="Tech" />
                <span className="h-line block">
                  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <span className="h-word inline-block font-serif italic normal-case tracking-[-0.03em] text-[#E06D43] text-[0.92em]">
                      stack
                    </span>
                  </span>
                </span>
              </h2>
              <p className="h-reveal max-w-[32ch] text-[15px] leading-relaxed text-white/55">
                The core technologies, frameworks, and modern AI tools I use to engineer fast, resilient software.
              </p>
            </section>

            {CRAFT.map((c, i) => {
              const toneName = CRAFT_TONES[i];
              const t = TONES[toneName];
              return (
                <DepthCard
                  key={c.num}
                  tone={toneName}
                  className="flex flex-col justify-between p-7"
                  style={{
                    width: 'clamp(280px, 21vw, 360px)',
                    height: 'min(60vh, 580px)',
                    marginTop: i % 2 ? '5vh' : '-5vh',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 -top-6 font-display text-[30vh] leading-none text-transparent opacity-[0.14] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-x-3"
                    style={{ WebkitTextStroke: '1.5px currentColor' }}
                  >
                    {c.num}
                  </span>

                  <span className={cn('relative w-fit rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]', t.chip)}>
                    Stack {c.num}
                  </span>

                  <div className="relative space-y-3">
                    <h3 className="font-display uppercase text-[clamp(48px,8.5vh,88px)] leading-[0.88]">{c.title}</h3>
                    <p className={cn('font-serif italic text-[17px] leading-snug', t.muted)}>{c.line}</p>
                  </div>

                  <ul className="relative">
                    {c.skills.map((s) => (
                      <li
                        key={s}
                        className={cn('flex items-center justify-between border-t py-2 font-mono text-[12px]', t.rule, t.muted)}
                      >
                        {s}
                        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-60" />
                      </li>
                    ))}
                  </ul>
                </DepthCard>
              );
            })}
          </div>

          {/* ======================= OUTRO ======================= */}
          <section id="about-next" className="relative flex h-full w-[46vw] shrink-0 flex-col items-start justify-center border-l border-white/[0.08] pl-[6vw] pr-[6vw]">
            <div className="h-reveal mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              Up next
            </div>
            <button
              type="button"
              onClick={scrollToMilestones}
              className="group/next text-left"
              aria-label="Continue to milestones"
            >
              <span className="block font-display uppercase leading-[0.86] text-[clamp(56px,12vh,150px)] text-[#F2EFE9] transition-colors duration-500 group-hover/next:text-[#E06D43]">
                <MaskedLine text="The" />
                <MaskedLine text="milestones" />
              </span>
              <span className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 group-hover/next:border-[#E06D43] group-hover/next:bg-[#E06D43] group-hover/next:text-[#080808]">
                <ArrowDown className="h-6 w-6 transition-transform duration-500 group-hover/next:translate-y-1" />
              </span>
            </button>
          </section>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Bottom rail map + progress                                         */}
        {/* ------------------------------------------------------------------ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22vh] bg-gradient-to-t from-[#080808] via-[#080808]/85 to-transparent"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-[clamp(24px,3vw,56px)] pb-[4vh]">
          <div className="flex items-end justify-between gap-8">
            <RailToc
              items={RAIL_ITEMS}
              title="The map"
              orientation="horizontal"
              indent={9}
              getPosition={getRailPosition}
              onSelectItem={goToRailItem}
              className="pointer-events-auto text-[12.5px]"
            />
            <div className="mb-1 flex shrink-0 items-center gap-2 font-mono text-[11px] tabular-nums tracking-[0.18em] text-white/45">
              <span ref={percentRef}>00</span>
              <span className="text-white/20">%</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5 text-white/30" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlowAboutStorySection;
