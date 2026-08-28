'use client';

import React from 'react';
import { StaggeredGrid, BentoItem } from '@/components/ui/staggered-grid';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

const TECH_BENTO_ITEMS: BentoItem[] = [
  {
    id: 'solidity',
    title: 'Full-Stack & EVM Contracts',
    subtitle: 'Next.js / Solidity / Hardhat',
    description: 'Architecting end-to-end decentralized web apps, fractionalized real estate vaults, and smart contract protocols.',
    icon: <span className="font-mono text-xs font-bold text-[#C75B32] px-1.5 py-0.5 border border-[#C75B32]/40 rounded bg-[#C75B32]/10">[EVM]</span>,
    image: '/images/IMG_0400.jpeg',
  },
  {
    id: 'ai-ml',
    title: 'AI & Neural Systems',
    subtitle: 'Python / LLM Agents / Next.js',
    description: 'Building full-stack AI web applications, C2PA media provenance engines, and medical LLM triage tools.',
    icon: <span className="font-mono text-xs font-bold text-[#C75B32] px-1.5 py-0.5 border border-[#C75B32]/40 rounded bg-[#C75B32]/10">[AI]</span>,
    image: '/images/IMG_0399.jpeg',
  },
  {
    id: 'web3',
    title: 'Protocol & Web3 Research',
    subtitle: 'Ethereum / OpenLedger / DeFi',
    description: 'Technical research & full-stack development mapping on-chain transaction trails and Web3 infrastructure.',
    icon: <span className="font-mono text-xs font-bold text-[#C75B32] px-1.5 py-0.5 border border-[#C75B32]/40 rounded bg-[#C75B32]/10">[WEB3]</span>,
    image: '/images/IMG_8920.JPG',
  },
  {
    id: 'frontend-3d',
    title: 'Full-Stack & 3D WebGL',
    subtitle: 'Next.js / React / Three.js / Node.js',
    description: 'Constructing high-performance interactive 3D web experiences, custom shaders, and scalable full-stack UIs.',
    icon: <span className="font-mono text-xs font-bold text-[#C75B32] px-1.5 py-0.5 border border-[#C75B32]/40 rounded bg-[#C75B32]/10">[3D]</span>,
    image: '/images/IMG_8355.jpeg',
  },
];

const TECH_IMAGES: string[] = [
  '/images/IMG_0397.jpeg',
  '/images/IMG_0400.jpeg',
  '/images/IMG_8355.jpeg',
  '/images/IMG_0398.jpeg',
  '/images/IMG_0399.jpeg',
  '/images/IMG_8920.JPG',
  '/images/image.png',
  '/images/IMG_9072.jpeg',
];

export const TechTicker: React.FC = () => {
  return (
    <section id="tech-stack" className="relative py-16 bg-[#080808] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Section Header */}
        <div className="space-y-2 border-b border-white/15 pb-6">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 03 TECHNICAL STACK &amp; ARSENAL
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            TECH ARSENAL
          </h2>
          <p className="text-sm font-light text-white/60 max-w-xl">
            Staggered grid view of frameworks, smart contract tools, AI engines, and WebGL graphics.
          </p>
        </div>
      </div>

      {/* GSAP Staggered Grid & Bento Expander */}
      <StaggeredGrid
        images={TECH_IMAGES}
        bentoItems={TECH_BENTO_ITEMS}
        centerText="TECH ARSENAL"
        credits={{
          madeBy: { text: "LAKSHAN GANESAN // 2026", href: "https://github.com/lakshangan" },
          moreDemos: { text: "FEATURED PROJECTS ↗", href: "#work" },
        }}
        showFooter={true}
      />
    </section>
  );
};
