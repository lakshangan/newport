'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple active section indicator
      const sections = ['about', 'showcase', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center pointer-events-none">
      {/* Floating Cylinder Nav Container */}
      <nav
        className={`pointer-events-auto w-full max-w-4xl rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 shadow-2xl backdrop-blur-xl ${
          scrolled
            ? 'bg-[#080808]/90 border-white/20 shadow-black/80'
            : 'bg-[#0c0c0c]/80 border-white/15 shadow-black/50'
        }`}
      >
        {/* Left: Brand Identity */}
        <a
          href="#"
          className="flex items-center space-x-1 font-display font-extrabold text-lg sm:text-xl tracking-wider text-[#E8E5DF] hover:text-[#C75B32] transition-colors pr-2"
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
            className={`transition-colors hover:text-[#E8E5DF] ${
              activeSection === 'about' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            About
          </a>
          <a
            href="#showcase"
            className={`transition-colors hover:text-[#E8E5DF] ${
              activeSection === 'showcase' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            Projects
          </a>
          <a
            href="#experience"
            className={`transition-colors hover:text-[#E8E5DF] ${
              activeSection === 'experience' ? 'text-[#C75B32] font-semibold' : ''
            }`}
          >
            Experience
          </a>
          <a
            href="#contact"
            className={`transition-colors hover:text-[#E8E5DF] ${
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
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-mono tracking-wider rounded-full bg-white/10 hover:bg-[#C75B32] border border-white/15 text-[#E8E5DF] hover:text-white transition-all duration-300 shadow-sm"
            data-cursor="EMAIL"
          >
            <span>LET&apos;S TALK</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#E8E5DF] focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#C75B32]' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-opacity duration-300 ${
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
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#0c0c0c]/95 border border-white/15 rounded-2xl backdrop-blur-2xl z-40 p-6 shadow-2xl flex flex-col space-y-5 text-center pointer-events-auto">
          <div className="flex flex-col space-y-4 font-display text-lg tracking-wider text-[#E8E5DF]">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C75B32]">
              ABOUT
            </a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C75B32]">
              PROJECTS
            </a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C75B32]">
              EXPERIENCE
            </a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C75B32]">
              EXPERIMENTS
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
