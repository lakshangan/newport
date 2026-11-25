'use client';

import React, { useState, useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Mail, ArrowDownRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
import { ShinyText } from '@/components/ui/ShinyText';

const NAV_ITEMS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'showcase', label: 'Projects', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'contact', label: 'Contact', num: '04' },
] as const;

type NavId = (typeof NAV_ITEMS)[number]['id'];

const APPLE_SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 19,
  mass: 0.85,
};

const PILL_SPRING = {
  type: 'spring' as const,
  stiffness: 440,
  damping: 22,
  mass: 0.75,
};

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<NavId>('about');
  const [hoveredId, setHoveredId] = useState<NavId | null>(null);
  const [connectOpen, setConnectOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [entered, setEntered] = useState(false);

  const connectRef = useRef<HTMLDivElement>(null);

  const smoothScrollTo = (target: number | HTMLElement) => {
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(target, { duration: 1.05 });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setConnectOpen(false);
    smoothScrollTo(0);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: NavId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setConnectOpen(false);
    setActiveSection(targetId);

    const aboutGoTo = (window as any).__aboutGoTo;
    if ((targetId === 'showcase' || targetId === 'about') && typeof aboutGoTo === 'function') {
      aboutGoTo(targetId);
      return;
    }

    if (targetId === 'showcase') {
      const st = ScrollTrigger.getById('about-horizontal');
      if (st) {
        const targetScroll = st.start + 0.5 * (st.end - st.start);
        smoothScrollTo(targetScroll);
        return;
      }
      const el = document.getElementById('showcase');
      if (el) smoothScrollTo(el);
      return;
    }

    if (targetId === 'about') {
      const st = ScrollTrigger.getById('about-horizontal');
      if (st) {
        smoothScrollTo(st.start);
        return;
      }
      const el = document.getElementById('about');
      if (el) smoothScrollTo(el);
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      smoothScrollTo(targetEl);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // First-time Apple-like elastic bounce entrance (syncs with Preloader completion or fallback)
  useEffect(() => {
    const triggerEnter = () => setEntered(true);

    if (typeof document !== 'undefined' && document.body.style.overflow !== 'hidden') {
      const t = setTimeout(triggerEnter, 120);
      return () => clearTimeout(t);
    }

    window.addEventListener('portfolio-loaded', triggerEnter);
    const fallback = setTimeout(triggerEnter, 2400);
    return () => {
      window.removeEventListener('portfolio-loaded', triggerEnter);
      clearTimeout(fallback);
    };
  }, []);

  // Close quick-connect popover on outside click or Escape
  useEffect(() => {
    if (!connectOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (connectRef.current && !connectRef.current.contains(e.target as Node)) {
        setConnectOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConnectOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [connectOpen]);

  // Accurate real-time section tracking across Lenis & GSAP pinned horizontal sections
  useEffect(() => {
    let rafId = 0;

    const syncScrollState = () => {
      const lenisScroll = (window as any).__lenis?.scroll;
      const scrollY = typeof lenisScroll === 'number' ? lenisScroll : window.scrollY;

      setScrolled((prev) => {
        const next = scrollY > 40;
        return prev === next ? prev : next;
      });

      const st = ScrollTrigger.getById('about-horizontal');
      if (st && scrollY >= st.start - 80 && scrollY <= st.end + 40) {
        const chapter = (window as any).__aboutChapter;
        const nextSection: NavId =
          chapter === 'work'
            ? 'showcase'
            : chapter === 'accolades' || chapter === 'craft'
            ? 'about'
            : (scrollY - st.start) / Math.max(1, st.end - st.start) >= 0.28 &&
              (scrollY - st.start) / Math.max(1, st.end - st.start) < 0.72
            ? 'showcase'
            : 'about';
        setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
      } else {
        const triggerLine = window.innerHeight * 0.45;
        const verticalSections: NavId[] = ['contact', 'experience', 'about'];
        let resolved: NavId = 'about';

        for (const id of verticalSections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerLine) {
              resolved = id;
              break;
            }
          }
        }
        setActiveSection((prev) => (prev === resolved ? prev : resolved));
      }

      rafId = requestAnimationFrame(syncScrollState);
    };

    rafId = requestAnimationFrame(syncScrollState);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
      {/* Floating Capsule with Apple-style Elastic Spring Entrance */}
      <motion.nav
        aria-label="Primary navigation"
        initial={{ y: -44, opacity: 0, scaleX: 0.86, scaleY: 0.78 }}
        animate={
          entered
            ? { y: 0, opacity: 1, scaleX: 1, scaleY: 1 }
            : { y: -44, opacity: 0, scaleX: 0.86, scaleY: 0.78 }
        }
        transition={APPLE_SPRING}
        whileHover={{ scale: 1.008 }}
        className={`relative pointer-events-auto w-full max-w-4xl rounded-full border transition-[padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-3.5 sm:px-5 ${
          scrolled
            ? 'py-1.5 sm:py-2 bg-[#080808]/90 border-white/20 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.09)]'
            : 'py-2 sm:py-2.5 bg-[#0c0c0c]/75 border-white/15 shadow-[0_14px_40px_-15px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]'
        } backdrop-blur-2xl`}
      >
        {/* Left: Brand Identity */}
        <motion.a
          href="#"
          onClick={handleHomeClick}
          initial={{ opacity: 0, scale: 0.85, x: -12 }}
          animate={entered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.85, x: -12 }}
          transition={{ ...APPLE_SPRING, delay: 0.08 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="group flex items-center space-x-1 font-display font-extrabold text-base sm:text-xl tracking-wider text-[#E8E5DF] hover:text-[#E06D43] transition-colors pl-1.5 pr-2 cursor-pointer"
          data-cursor="HOME"
        >
          <AsciiGlitchRipple as="span" dur={900}>
            {PORTFOLIO_DATA.personal.shortName}
          </AsciiGlitchRipple>
          <span className="text-[#E06D43] transition-transform duration-300 group-hover:scale-125 inline-block">.</span>
        </motion.a>

        {/* Center: Interactive Dock with Bouncy Spring Pills */}
        <div
          className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/[0.06]"
          onMouseLeave={() => setHoveredId(null)}
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                initial={{ opacity: 0, y: -12, scale: 0.88 }}
                animate={entered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -12, scale: 0.88 }}
                transition={{ ...APPLE_SPRING, delay: 0.12 + idx * 0.055 }}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.93 }}
                className={`relative px-3.5 lg:px-4 py-1.5 rounded-full text-xs font-mono tracking-widest transition-colors duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-[#F2EFE9] font-semibold'
                    : isHovered
                    ? 'text-[#E8E5DF]'
                    : 'text-[#A09D96]'
                }`}
              >
                {/* Hover Ghost Pill */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    transition={PILL_SPRING}
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                  />
                )}

                {/* Active Bouncy Spring Pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={PILL_SPRING}
                    className="absolute inset-0 rounded-full bg-[#E06D43]/18 border border-[#E06D43]/45 shadow-[0_0_20px_-4px_rgba(224,109,67,0.45)]"
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span
                    className={`text-[9px] transition-colors duration-200 ${
                      isActive ? 'text-[#E06D43]' : 'text-white/30'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Right: Interactive Quick-Connect CTA & Popover */}
        <motion.div
          ref={connectRef}
          initial={{ opacity: 0, scale: 0.85, x: 12 }}
          animate={entered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.85, x: 12 }}
          transition={{ ...APPLE_SPRING, delay: 0.28 }}
          className="hidden md:flex items-center relative"
        >
          <motion.button
            type="button"
            onClick={() => setConnectOpen((prev) => !prev)}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.93 }}
            transition={PILL_SPRING}
            aria-expanded={connectOpen}
            aria-haspopup="true"
            className={`inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 text-xs font-mono tracking-wider rounded-full border transition-colors duration-300 shadow-sm cursor-pointer group ${
              connectOpen
                ? 'bg-[#E06D43] border-[#E06D43] text-[#080808]'
                : 'bg-white/[0.08] hover:bg-[#E06D43]/20 border-white/15 hover:border-[#E06D43]/50 text-[#E8E5DF]'
            }`}
            data-cursor="CONNECT"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  connectOpen ? 'bg-[#080808]' : 'bg-[#E06D43]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  connectOpen ? 'bg-[#080808]' : 'bg-[#E06D43]'
                }`}
              />
            </span>
            {connectOpen ? (
              <span className="font-semibold">CLOSE</span>
            ) : (
              <ShinyText
                text="LET'S TALK"
                color="#E8E5DF"
                shineColor="#FFA266"
                speed={2.5}
              />
            )}
            <span
              className={`text-[10px] transition-transform duration-300 ${
                connectOpen
                  ? 'rotate-45 text-[#080808]'
                  : 'text-[#FFA266] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
            >
              ↗
            </span>
          </motion.button>

          <AnimatePresence>
            {connectOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.94 }}
                transition={PILL_SPRING}
                className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-[#0e0d0c]/95 border border-white/15 p-3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50 origin-top-right"
              >
                <div className="px-2 py-1.5 mb-2 border-b border-white/[0.08] flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    Quick Connect
                  </span>
                  <span className="font-mono text-[10px] text-[#E06D43]">Available</span>
                </div>

                <div className="space-y-1">
                  <motion.button
                    type="button"
                    onClick={handleCopyEmail}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-transparent hover:border-white/10 text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] font-medium text-[#F2EFE9] truncate">
                        {PORTFOLIO_DATA.personal.email}
                      </div>
                      <div className="font-mono text-[10px] text-white/45">
                        {copiedEmail ? 'Copied to clipboard' : 'Copy email address'}
                      </div>
                    </div>
                    <span className="ml-2 shrink-0 text-white/60 group-hover:text-[#E06D43] transition-colors">
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </span>
                  </motion.button>

                  <motion.a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    onClick={() => setConnectOpen(false)}
                    whileHover={{ x: 2 }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.07] text-xs font-mono text-white/75 hover:text-[#F2EFE9] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#E06D43]" />
                      Open mail app
                    </span>
                    <span className="text-white/40 text-[11px]">↗</span>
                  </motion.a>

                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    whileHover={{ x: 2 }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.07] text-xs font-mono text-white/75 hover:text-[#F2EFE9] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowDownRight className="w-3.5 h-3.5 text-[#E06D43]" />
                      Jump to contact section
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-[#E8E5DF] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#E06D43]' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E88053] transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#E06D43]' : ''
              }`}
            />
          </div>
        </motion.button>
      </motion.nav>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={PILL_SPRING}
            className="md:hidden fixed inset-x-4 top-16 bg-[#0c0c0c]/95 border border-white/15 rounded-2xl backdrop-blur-2xl z-40 p-6 shadow-2xl flex flex-col space-y-5 text-center pointer-events-auto origin-top"
          >
            <div className="flex flex-col space-y-3 font-display text-lg tracking-wider text-[#E8E5DF]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`py-1.5 rounded-xl transition-colors ${
                      isActive ? 'text-[#E06D43] bg-[#E06D43]/10' : 'hover:text-[#E06D43]'
                    }`}
                  >
                    <span className="font-mono text-xs mr-2 opacity-50">{item.num}</span>
                    {item.label.toUpperCase()}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full max-w-xs px-5 py-2.5 rounded-full text-xs font-mono tracking-wider bg-white/[0.06] border border-white/15 text-[#E8E5DF] flex items-center justify-center gap-2"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'EMAIL COPIED' : PORTFOLIO_DATA.personal.email}</span>
              </button>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="w-full max-w-xs inline-block px-6 py-2.5 rounded-full text-xs font-mono tracking-widest bg-[#E06D43] text-[#080808] font-semibold shadow-lg"
              >
                LET&apos;S TALK ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
