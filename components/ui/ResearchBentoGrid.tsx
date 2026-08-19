"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiCloudflare, SiDocker, SiGithub, SiSupabase, SiVercel } from "react-icons/si";

import { cn } from "@/lib/utils";

export interface ResearchBentoBrand {
  name: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export interface ResearchBentoGridCopy {
  showcaseTitle: React.ReactNode;
  showcaseDescription: React.ReactNode;
  pricingTitle: React.ReactNode;
  pricingDescription: React.ReactNode;
  pauseTitle: React.ReactNode;
  activeDescription: React.ReactNode;
  pausedDescription: React.ReactNode;
}

export interface ResearchBentoGridProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  monthlyPrice?: number;
  previousPrice?: number;
  currency?: string;
  locale?: string;
  paused?: boolean;
  defaultPaused?: boolean;
  selectedBrand?: number;
  defaultSelectedBrand?: number;
  brands?: readonly ResearchBentoBrand[];
  copy?: Partial<ResearchBentoGridCopy>;
  autoPlay?: boolean;
  brandRotationInterval?: number;
  spotlightInterval?: number;
  userLabel?: string;
  collaboratorLabel?: string;
  onPausedChange?: (paused: boolean) => void;
  onSelectedBrandChange?: (index: number) => void;
}

const spring = { type: "spring", stiffness: 230, damping: 24 } as const;
const LIFTED_TILES = new Set([5, 14, 23, 34, 41, 53, 62, 71, 79, 88, 97, 108, 119, 131, 146, 157, 169, 184, 199, 213, 226, 241]);
const BRIGHT_TILES = new Set([17, 45, 76, 103, 138, 176, 205, 234]);
const INVOICE_BARS = [62, 44, 70, 36, 56];
const DEFAULT_COPY: ResearchBentoGridCopy = {
  showcaseTitle: "Unified Stack for Web3 & AI Engineering",
  showcaseDescription: "From smart contracts to context-aware LLM agents & 3D WebGL visuals, shipping focused builds with modern tools.",
  pricingTitle: <>Senior Execution.<br />Zero Headcount Overhead.</>,
  pricingDescription: "Skip expanding headcount for every sprint. Get consistent protocol research and technical engineering support.",
  pauseTitle: <>Build on your terms.<br />Pause sprint anytime.</>,
  activeDescription: "Currently sprinting on protocol research & AI data pipelines. Pause workspace anytime.",
  pausedDescription: "Workspace on standby mode. Ready to boot up whenever the next feature is ready to ship.",
};

function ArrowCursor({
  className,
  label,
  inverted = false,
  delay = 0,
  active,
  targetLeft,
  targetTop,
}: {
  className?: string;
  label: string;
  inverted?: boolean;
  delay?: number;
  active?: boolean;
  targetLeft?: string;
  targetTop?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("absolute z-30 flex flex-col items-start pointer-events-none", className)}
      animate={reduceMotion
        ? undefined
        : active !== undefined
          ? active
            ? { x: -3, y: -36, rotate: -1.5 }
            : { x: 0, y: 0, rotate: 0 }
          : targetLeft
            ? { left: targetLeft, top: targetTop, x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] }
            : { x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] }}
      transition={active !== undefined
        ? {
            duration: active ? 0.68 : 0.82,
            ease: active ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
          }
        : targetLeft
          ? {
              left: spring,
              top: spring,
              y: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
            }
          : { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="26" height="30" viewBox="0 0 26 30" fill="none" className="h-auto w-[18px] drop-shadow-md sm:w-[22px] lg:w-[26px]">
        <path
          d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z"
          className={cn(
            inverted
              ? "fill-zinc-950 stroke-white dark:fill-white dark:stroke-[#080808]"
              : "fill-[#C75B32] stroke-white dark:stroke-white/70",
          )}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "ml-2.5 -mt-1 px-2.5 py-1 text-[12px] font-mono font-bold tracking-tight sm:ml-3 sm:px-3 sm:text-[14px] lg:ml-4 lg:px-4 lg:py-1.5 lg:text-[15px]",
          inverted
            ? "rounded-full bg-[#f2f2f2] text-black shadow-[0_5px_18px_rgba(0,0,0,0.28)]"
            : cn(
                "rounded-[22px] border border-white/60 bg-[#C75B32] text-white",
                active
                  ? "shadow-[0_5px_18px_rgba(0,0,0,0.24),0_0_14px_rgba(199,91,50,0.4)]"
                  : "shadow-[0_5px_18px_rgba(0,0,0,0.22)]",
              ),
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

const DEFAULT_BRANDS: readonly ResearchBentoBrand[] = [
  { name: "Vercel", icon: SiVercel },
  { name: "GitHub", icon: SiGithub },
  { name: "Supabase", icon: SiSupabase },
  { name: "Cloudflare", icon: SiCloudflare },
  { name: "Docker", icon: SiDocker },
];

function BrandMark({ brand }: { brand: ResearchBentoBrand }) {
  const Icon = brand.icon;
  return <Icon className="size-[58%]" aria-hidden />;
}

function Panel({ className, children, ...props }: React.ComponentProps<"section">) {
  const grainId = React.useId().replace(/:/g, "");

  return (
    <section
      {...props}
      className={cn(
        "relative isolate overflow-hidden rounded-[20px] border border-[#242424] bg-[#0c0c0e]",
        "shadow-[inset_0_1px_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(199,91,50,0.08),transparent_50%)]" />
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 size-full opacity-[0.06] mix-blend-soft-light"
      >
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="11" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </section>
  );
}

function FeatureCopy({ title, children, className }: { title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 z-20 px-5 pb-5 sm:px-7 sm:pb-7", className)}>
      <h3 className="text-[17px] font-bold font-display uppercase leading-[1.1] tracking-tight text-white sm:text-[19px]">{title}</h3>
      <p className="mt-2.5 max-w-[340px] text-[12px] leading-[1.4] font-mono text-[#8E8B85] sm:mt-3 sm:text-[13px]">{children}</p>
    </div>
  );
}

interface DesignsPanelProps {
  brands: readonly ResearchBentoBrand[];
  selectedBrand?: number;
  defaultSelectedBrand: number;
  autoPlay: boolean;
  rotationInterval: number;
  userLabel: string;
  collaboratorLabel: string;
  title: React.ReactNode;
  description: React.ReactNode;
  onSelectedBrandChange?: (index: number) => void;
}

function DesignsPanel({
  brands,
  selectedBrand,
  defaultSelectedBrand,
  autoPlay,
  rotationInterval,
  userLabel,
  collaboratorLabel,
  title,
  description,
  onSelectedBrandChange,
}: DesignsPanelProps) {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedBrand);
  const reduceMotion = useReducedMotion();
  const isControlled = selectedBrand !== undefined;
  const selected = Math.min(Math.max(isControlled ? selectedBrand : internalSelected, 0), brands.length - 1);
  const cursorStops = brands.map((_, index) => `${15 + (70 * index) / Math.max(brands.length - 1, 1)}%`);

  const selectBrand = React.useCallback((index: number) => {
    if (!isControlled) setInternalSelected(index);
    onSelectedBrandChange?.(index);
  }, [isControlled, onSelectedBrandChange]);

  React.useEffect(() => {
    if (!autoPlay || reduceMotion || brands.length < 2) return;
    const interval = setInterval(() => {
      const next = (selected + 1) % brands.length;
      selectBrand(next);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [autoPlay, brands.length, reduceMotion, rotationInterval, selectBrand, selected]);

  return (
    <Panel className="min-h-[360px] sm:min-h-[330px] md:col-span-12 md:min-h-[310px] md:row-span-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 grid h-[78%] grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] gap-px overflow-hidden"
        style={{ maskImage: "linear-gradient(to bottom,black 0%,black 62%,transparent 100%)" }}
      >
        {Array.from({ length: 252 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "border border-white/[0.02] bg-[#0b0b0d]",
              LIFTED_TILES.has(index) && "bg-[#111114]",
              BRIGHT_TILES.has(index) && "bg-[#18181c]",
            )}
          />
        ))}
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-[8%] z-[1] hidden h-[66%] w-[24%] rounded-full bg-[#C75B32]/10 blur-[48px] md:block"
        animate={reduceMotion ? undefined : { x: ["-120%", "520%"] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[76%] bg-[radial-gradient(ellipse_at_50%_18%,transparent_12%,rgba(12,12,14,.1)_58%,#0c0c0e_100%)]" />

      <div className="absolute inset-x-4 top-[9%] z-10 mx-auto flex max-w-[760px] items-center gap-1.5 sm:inset-x-7 sm:top-[12%] sm:gap-2.5">
        {brands.map((brand, index) => (
          <motion.button
            type="button"
            key={brand.name}
            onClick={() => selectBrand(index)}
            aria-label={`Select ${brand.name}`}
            aria-pressed={selected === index}
            className={cn(
              "relative flex aspect-square min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[12px] border bg-[linear-gradient(145deg,#1c1c20_0%,#141418_48%,#0f0f12_100%)] shadow-[inset_0_1px_rgba(255,255,255,.05),0_10px_22px_rgba(0,0,0,.4)] sm:rounded-[14px]",
              selected === index
                ? "border-[#C75B32]/80 text-[#C75B32] shadow-[inset_0_1px_rgba(255,255,255,.1),0_10px_24px_rgba(0,0,0,.5),0_0_20px_rgba(199,91,50,.3)]"
                : "border-white/[0.08] text-white/70 hover:text-white hover:border-white/20",
            )}
            animate={reduceMotion ? undefined : {
              y: selected === index ? -3 : [0, index % 2 ? 1.5 : -1.5, 0],
              scale: selected === index ? 1.02 : 1,
            }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ y: { duration: 5 + index * 0.3, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }, scale: spring }}
          >
            {selected === index && (
              <motion.span
                aria-hidden
                className="absolute inset-[12%] rounded-full bg-[#C75B32]/25 blur-xl"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.span
              className="relative flex size-full items-center justify-center"
              animate={{ scale: selected === index ? 1.08 : 1 }}
              transition={spring}
            >
              <BrandMark brand={brand} />
            </motion.span>
          </motion.button>
        ))}
      </div>

      <ArrowCursor
        label={userLabel}
        className="left-[35%] top-[40%]"
        targetLeft={cursorStops[selected]}
        targetTop="40%"
        delay={0.2}
      />
      <ArrowCursor label={collaboratorLabel} inverted className="left-[58%] top-[54%] sm:left-[62%] sm:top-[56%]" delay={0.9} />

      <FeatureCopy title={title}>{description}</FeatureCopy>
    </Panel>
  );
}

interface InvoicePanelProps {
  monthlyPrice: number;
  previousPrice: number;
  currency: string;
  locale: string;
  autoPlay: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
}

function InvoicePanel({ monthlyPrice, previousPrice, currency, locale, autoPlay, title, description }: InvoicePanelProps) {
  const reduceMotion = useReducedMotion();
  const [invoiceIndex, setInvoiceIndex] = React.useState(0);
  const formatPrice = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [currency, locale],
  );
  const invoices = [
    { label: "Standard Agency Overhead", price: previousPrice, previousPrice: null, accent: false },
    { label: "Senior Solo Execution", price: monthlyPrice, previousPrice, accent: true },
  ];

  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    const interval = setInterval(() => {
      setInvoiceIndex((current) => (current + 1) % invoices.length);
    }, 3900);
    return () => clearInterval(interval);
  }, [autoPlay, invoices.length, reduceMotion]);

  const invoice = invoices[invoiceIndex];

  return (
    <Panel className="min-h-[420px] sm:min-h-[360px] md:col-span-7 md:min-h-[310px] md:row-span-1">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,currentColor .65px,transparent .75px)", backgroundSize: "11px 11px" }} />
      <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[53%]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={invoiceIndex}
            className="absolute left-[15%] top-5 h-[225px] w-[70%] overflow-hidden rounded-[14px] border border-white/10 bg-[linear-gradient(145deg,#1c1c20_0%,#141418_48%,#0f0f12_100%)] p-4 shadow-[inset_0_1px_rgba(255,255,255,.05),0_18px_42px_rgba(0,0,0,.6)] sm:left-auto sm:right-4 sm:h-[250px] sm:w-[89%]"
            initial={reduceMotion ? false : { y: 270, opacity: 0, rotate: -1.25 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 285, opacity: 0, rotate: 1.1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between text-white/60 font-mono">
              <span className="text-[11px] uppercase tracking-wider">{invoice.label}</span>
              <span className="relative mt-0.5 size-3.5 rounded-full bg-[#C75B32]"><span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-l-full bg-white/20" /></span>
            </div>
            <div className="mt-2 flex items-baseline gap-2 whitespace-nowrap font-mono">
              <span className={cn("text-[24px] font-bold tracking-tight sm:text-[28px]", invoice.accent ? "text-[#C75B32]" : "text-white/40")}>
                {formatPrice.format(invoice.price)}
              </span>
              {invoice.previousPrice && (
                <span className="text-[13px] text-white/30 line-through sm:text-[15px]">{formatPrice.format(invoice.previousPrice)}</span>
              )}
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="h-1 w-[42%] rounded-full bg-white/10" />
              <div className="h-1 w-[27%] rounded-full bg-white/5" />
            </div>
            <div className="mt-4 space-y-2.5">
              {INVOICE_BARS.map((width, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <motion.span
                    className="h-2.5 rounded-[3px] bg-white/10"
                    style={{ width: `${width}%` }}
                    animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 3.5, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="h-3 w-[28%] rounded-[4px] bg-[#C75B32]/30" />
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_bottom,transparent,rgba(15,15,18,.6)_52%,#0f0f12_100%)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[48%] bg-[linear-gradient(to_bottom,rgba(12,12,14,0)_0%,rgba(12,12,14,.4)_30%,rgba(12,12,14,.9)_80%,#0c0c0e_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-8%] -bottom-[24%] z-10 h-[48%] rounded-[50%] bg-[#0c0c0e]/80 blur-[38px]"
      />

      <FeatureCopy className="sm:right-1/2 sm:pr-3" title={title}>{description}</FeatureCopy>
    </Panel>
  );
}

interface PausePanelProps {
  paused?: boolean;
  defaultPaused: boolean;
  autoPlay: boolean;
  spotlightInterval: number;
  userLabel: string;
  title: React.ReactNode;
  activeDescription: React.ReactNode;
  pausedDescription: React.ReactNode;
  onPausedChange?: (paused: boolean) => void;
}

function PausePanel({
  paused: controlledPaused,
  defaultPaused,
  autoPlay,
  spotlightInterval,
  userLabel,
  title,
  activeDescription,
  pausedDescription,
  onPausedChange,
}: PausePanelProps) {
  const [internalPaused, setInternalPaused] = React.useState(defaultPaused);
  const [demoLit, setDemoLit] = React.useState(true);
  const reduceMotion = useReducedMotion();
  const isControlled = controlledPaused !== undefined;
  const paused = isControlled ? controlledPaused : internalPaused;
  const arrowLit = autoPlay && demoLit && !reduceMotion;

  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;

    let offTimer: ReturnType<typeof setTimeout> | undefined;
    const illuminate = () => {
      setDemoLit(true);
      offTimer = setTimeout(() => setDemoLit(false), 1500);
    };

    const firstTimer = setTimeout(() => setDemoLit(false), 1500);
    const loopTimer = setInterval(illuminate, spotlightInterval);

    return () => {
      clearTimeout(firstTimer);
      if (offTimer) clearTimeout(offTimer);
      clearInterval(loopTimer);
    };
  }, [autoPlay, reduceMotion, spotlightInterval]);

  const toggle = () => {
    const next = !paused;
    if (!isControlled) setInternalPaused(next);
    onPausedChange?.(next);
  };

  return (
    <Panel className="min-h-[340px] sm:min-h-[320px] md:col-span-5 md:min-h-[310px] md:row-span-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%,currentColor 0 .45px,transparent .7px),radial-gradient(circle at 70% 65%,currentColor 0 .45px,transparent .75px)",
          backgroundSize: "4px 4px,5px 5px",
        }}
      />
      <div className="absolute inset-x-0 top-0 flex h-[66%] items-center justify-center">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ring) => (
          <motion.div
            key={ring}
            aria-hidden
            className="absolute border border-white/[0.04]"
            style={{
              width: 190 + ring * 23,
              height: 100 + ring * 16,
              borderRadius: 23 + ring * 3,
              opacity: Math.max(0.18, 0.72 - ring * 0.045),
            }}
            animate={reduceMotion ? undefined : { scale: [0.995, 1.008, 0.995] }}
            transition={{ duration: 5.2, delay: ring * 0.11, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.button
          type="button"
          onClick={toggle}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
          animate={{ scale: arrowLit ? 1.012 : 1 }}
          className={cn(
            "relative z-10 flex h-[76px] min-w-[170px] items-center justify-center overflow-hidden rounded-[20px] border px-8 font-mono text-[24px] font-bold tracking-tight transition-[border-color,color,box-shadow] duration-500",
            arrowLit
              ? "border-[#C75B32] text-white bg-[#C75B32] shadow-[0_10px_28px_rgba(199,91,50,.5)]"
              : "border-white/15 bg-gradient-to-br from-[#1c1c20] to-[#121215] text-white shadow-[inset_0_1px_rgba(255,255,255,.05),0_10px_30px_rgba(0,0,0,.4)]",
          )}
          aria-pressed={paused}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-[#C75B32]"
            animate={{ opacity: arrowLit ? 1 : 0 }}
            transition={{ duration: arrowLit ? 0.64 : 0.76, ease: arrowLit ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1] }}
          />
          <span className="relative">{paused ? "Resume" : "Pause"}</span>
        </motion.button>
        <ArrowCursor label={userLabel} className="left-[57%] top-[70%]" delay={0.5} active={arrowLit} />
      </div>

      <FeatureCopy title={title}>{paused ? pausedDescription : activeDescription}</FeatureCopy>
    </Panel>
  );
}

export function ResearchBentoGrid({
  monthlyPrice = 2450,
  previousPrice = 8500,
  currency = "USD",
  locale = "en-US",
  paused,
  defaultPaused = false,
  selectedBrand,
  defaultSelectedBrand = 1,
  brands = DEFAULT_BRANDS,
  copy,
  autoPlay = true,
  brandRotationInterval = 2600,
  spotlightInterval = 4400,
  userLabel = "Lakshan",
  collaboratorLabel = "Builder",
  className,
  onPausedChange,
  onSelectedBrandChange,
  ...props
}: ResearchBentoGridProps) {
  const content = { ...DEFAULT_COPY, ...copy };

  if (brands.length === 0) {
    throw new Error("ResearchBentoGrid requires at least one brand.");
  }

  return (
    <div
      {...props}
      className={cn(
        "flex h-full w-full overflow-y-auto bg-[#080808] p-2 text-white sm:p-3",
        className,
      )}
    >
      <div className="m-auto grid w-full max-w-[1120px] grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2">
        <DesignsPanel
          brands={brands}
          selectedBrand={selectedBrand}
          defaultSelectedBrand={defaultSelectedBrand}
          autoPlay={autoPlay}
          rotationInterval={brandRotationInterval}
          userLabel={userLabel}
          collaboratorLabel={collaboratorLabel}
          title={content.showcaseTitle}
          description={content.showcaseDescription}
          onSelectedBrandChange={onSelectedBrandChange}
        />
        <InvoicePanel
          monthlyPrice={monthlyPrice}
          previousPrice={previousPrice}
          currency={currency}
          locale={locale}
          autoPlay={autoPlay}
          title={content.pricingTitle}
          description={content.pricingDescription}
        />
        <PausePanel
          paused={paused}
          defaultPaused={defaultPaused}
          autoPlay={autoPlay}
          spotlightInterval={spotlightInterval}
          userLabel={userLabel}
          title={content.pauseTitle}
          activeDescription={content.activeDescription}
          pausedDescription={content.pausedDescription}
          onPausedChange={onPausedChange}
        />
      </div>
    </div>
  );
}

export default ResearchBentoGrid;
