'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#"
          className="text-xl md:text-2xl font-display font-bold tracking-wider text-[#E8E5DF] hover:text-[#C75B32] transition-colors"
          data-cursor="HOME"
        >
          {PORTFOLIO_DATA.personal.shortName}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-mono tracking-widest text-[#8E8B85]">
          <a
            href="#about"
            className="hover:text-[#E8E5DF] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C75B32] hover:after:w-full after:transition-all"
          >
            ABOUT
          </a>
          <a
            href="#work"
            className="hover:text-[#E8E5DF] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C75B32] hover:after:w-full after:transition-all"
          >
            WORK
          </a>
          <a
            href="#experience"
            className="hover:text-[#E8E5DF] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C75B32] hover:after:w-full after:transition-all"
          >
            EXPERIENCE
          </a>
          <a
            href="#playground"
            className="hover:text-[#E8E5DF] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C75B32] hover:after:w-full after:transition-all"
          >
            EXPERIMENTS
          </a>
          <a
            href="#contact"
            className="hover:text-[#E8E5DF] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C75B32] hover:after:w-full after:transition-all"
          >
            CONTACT
          </a>
        </div>

        {/* Right: Editorial CTA */}
        <div className="hidden md:block">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center space-x-2 px-5 py-2 text-xs font-mono tracking-widest border border-[#242424] text-[#E8E5DF] hover:border-[#C75B32] hover:bg-[#C75B32] hover:text-white transition-all duration-300"
            data-cursor="EMAIL"
          >
            <span>LET&apos;S TALK</span>
            <span className="text-[#C75B32] group-hover:text-white">↗</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#E8E5DF] focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2.5 bg-[#C75B32]' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[#E8E5DF] transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#C75B32]' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#080808]/95 z-40 p-8 flex flex-col justify-between border-t border-[#242424]">
          <div className="flex flex-col space-y-8 font-display text-4xl tracking-wider text-[#E8E5DF]">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              ABOUT
            </a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>
              WORK
            </a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)}>
              EXPERIENCE
            </a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)}>
              EXPERIMENTS
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              CONTACT
            </a>
          </div>

          <div className="pt-8 border-t border-[#242424]">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="block w-full py-4 text-center text-sm font-mono tracking-widest bg-[#C75B32] text-white"
            >
              LET&apos;S TALK ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
