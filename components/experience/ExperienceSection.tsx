'use client';

import React from 'react';
import Image from 'next/image';
import { Timeline, TimelineEntry } from '@/components/ui/timeline';

export const ExperienceSection: React.FC = () => {
  const timelineData: TimelineEntry[] = [
    {
      title: '2026',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 bg-[#C75B32] text-white text-[10px] font-mono font-bold uppercase rounded">
                CURRENT ROLE
              </span>
              <span className="text-xs font-mono text-white/50">
                OpenLedger // Web3 &amp; AI
              </span>
            </div>
            <h4 className="text-2xl sm:text-4xl font-extrabold font-display text-white uppercase">
              OpenLedger — Twitter &amp; Technical Researcher
            </h4>
            <p className="text-[#C75B32] text-xs sm:text-sm font-mono">
              Web3 Research / AI Data Pipelines / Protocol Strategy
            </p>
          </div>

          <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Leading technical research on Web3 protocols, AI data pipelines, DeFi ecosystems, and executing content strategy for official X operations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_0400.jpeg"
                alt="OpenLedger Demo Day"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Beyond Abstraction Demo Day</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_0399.jpeg"
                alt="Technical Keynote Presentation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Keynote &amp; Protocol Demo</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2025',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 bg-[#e84393] text-white text-[10px] font-mono font-bold uppercase rounded">
                INCUBATOR COHORT
              </span>
              <span className="text-xs font-mono text-white/50">
                Uniswap Foundation
              </span>
            </div>
            <h4 className="text-2xl sm:text-4xl font-extrabold font-display text-white uppercase">
              Uniswap Foundation — Hook Incubator
            </h4>
            <p className="text-[#C75B32] text-xs sm:text-sm font-mono">
              DeFi / Uniswap v4 Architecture / Smart Contracts
            </p>
          </div>

          <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Selected for specialized program speedrunning Uniswap v4 architecture. Built custom liquidity hooks, dynamic fee modules, and automated yield distribution contracts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative aspect-square sm:aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/image.png"
                alt="Uniswap Hook Incubator Acceptance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Uniswap Hook Incubator 🦄</span>
              </div>
            </div>

            <div className="relative aspect-square sm:aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_8355.jpeg"
                alt="Tech Hub Workshop"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Tech Hub Workshop &amp; Lecture</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2024',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 bg-[#6c5ce7] text-white text-[10px] font-mono font-bold uppercase rounded">
                BLOCKCHAIN INTERN
              </span>
              <span className="text-xs font-mono text-white/50">
                Vodafone Idea Foundation
              </span>
            </div>
            <h4 className="text-2xl sm:text-4xl font-extrabold font-display text-white uppercase">
              Vodafone Idea Foundation — Blockchain Engineering
            </h4>
            <p className="text-[#C75B32] text-xs sm:text-sm font-mono">
              Distributed Systems / Enterprise Ledger / Smart Contracts
            </p>
          </div>

          <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            4-week intensive virtual internship exploring enterprise ledger architectures, smart contract security auditing, and decentralized data storage systems.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_8920.JPG"
                alt="NIT Calicut Web3 Winner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">NIT Calicut Web3 Winner 🏆</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_0397.jpeg"
                alt="Hackathon Team Marathon"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Hackathon Marathon Sprint</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2024',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 bg-gray-700 text-white text-[10px] font-mono font-bold uppercase rounded">
                SYSTEM ANALYST
              </span>
              <span className="text-xs font-mono text-white/50">
                FAMS Private Limited
              </span>
            </div>
            <h4 className="text-2xl sm:text-4xl font-extrabold font-display text-white uppercase">
              FAMS Private Limited — SAP Basis System Analyst
            </h4>
            <p className="text-[#C75B32] text-xs sm:text-sm font-mono">
              Enterprise Infrastructure / Database Performance Tuning
            </p>
          </div>

          <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Gained hands-on exposure to enterprise server infrastructure, database performance tuning, and SAP landscape management.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_0398.jpeg"
                alt="Builder Squad"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Builder Squad &amp; Hackers</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-xl group">
              <Image
                src="/images/IMG_9072.jpeg"
                alt="Midnight Build Session"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-xs font-mono font-bold text-white">Midnight Code &amp; Chaos</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="relative w-full bg-[#080808]">
      <Timeline data={timelineData} />
    </section>
  );
};
