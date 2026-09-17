'use client';

import React, { useState, useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'showcase') {
      const st = ScrollTrigger.getById('about-horizontal');
      if (st) {
        // Slide 1 (Creative Showcase) sits exactly at progress = (1 / 2) * 0.85 = 0.425
        const targetScroll = st.start + 0.425 * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById('showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (targetId === 'about') {
      const st = ScrollTrigger.getById('about-horizontal');
      if (st) {
        window.scrollTo({ top: st.start, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check pinned horizontal scroll section first
      const st = ScrollTrigger.getById('about-horizontal');
      if (st && scrollY >= st.start - 80 && scrollY <= st.end) {
        const progress = Math.max(0, Math.min(1, (scrollY - st.start) / (st.end - st.start)));
        if (progress < 0.28) {
          setActiveSection('about');
        } else if (progress < 0.70) {
          setActiveSection('showcase');
        } else {
          setActiveSection('about');
        }
        return;
      }

      // Regular vertical sections
      const sections = ['contact', 'experience'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (scrollY < 600) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-2.5 sm:top-3.5 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
      {/* Floating Cylinder Nav Container */}
      <nav
        className={`pointer-events-auto w-full max-w-4xl rounded-full border transition-all duration-300 flex items-center justify-between px-3.5 sm:px-6 py-1.5 sm:py-2.5 shadow-2xl backdrop-blur-xl ${
          scrolled
            ? 'bg-[#080808]/90 border-white/20 shadow-black/80'
            : 'bg-[#0c0c0c]/80 border-white/15 shadow-black/50'
        }`}
      >
        {/* Left: Brand Identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-1 font-display font-extrabold text-base sm:text-xl tracking-wider text-[#E8E5DF] hover:text-[#C75B32] transition-colors pr-2 cursor-pointer"
          data-cursor="HOME"
        >
          <AsciiGlitchRipple as="span" dur={900}>
            {PORTFOLIO_DATA.personal.shortName}
          </AsciiGlitchRipple>
          <span className="text-[#C75B32]">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-mono tracking-widest text-[#A09D96]">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className={`transition-colors hover:text-[#E8E5DF] cursor-pointer ${
              activeSection === 'about' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            About
          </a>
          <a
            href="#showcase"
            onClick={(e) => handleNavClick(e, 'showcase')}
            className={`transition-colors hover:text-[#E8E5DF] cursor-pointer ${
              activeSection === 'showcase' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, 'experience')}
            className={`transition-colors hover:text-[#E8E5DF] cursor-pointer ${
              activeSection === 'experience' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`transition-colors hover:text-[#E8E5DF] cursor-pointer ${
              activeSection === 'contact' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            Contact
          </a>
        </div>

        {/* Right: Actions & Contact CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-mono tracking-wider rounded-full bg-white/10 hover:bg-[#C75B32] border border-white/15 text-[#E8E5DF] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
            data-cursor="EMAIL"
          >
            <span>LET&apos;S TALK</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#E8E5DF] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#C75B32]' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E88053] transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#C75B32]' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-16 bg-[#0c0c0c]/95 border border-white/15 rounded-2xl backdrop-blur-2xl z-40 p-6 shadow-2xl flex flex-col space-y-5 text-center pointer-events-auto">
          <div className="flex flex-col space-y-4 font-display text-lg tracking-wider text-[#E8E5DF]">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-[#C75B32]">
              ABOUT
            </a>
            <a href="#showcase" onClick={(e) => handleNavClick(e, 'showcase')} className="hover:text-[#C75B32]">
              PROJECTS
            </a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-[#C75B32]">
              EXPERIENCE
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-[#C75B32]">
              CONTACT
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-center">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-block px-6 py-2.5 rounded-full text-xs font-mono tracking-widest bg-[#C75B32] text-white shadow-lg"
            >
              LET&apos;S TALK ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
