'use client';

import React from 'react';
import { StaggeredGrid, GridPhotoItem } from '@/components/ui/staggered-grid';

const UNIQUE_JOURNEY_ITEMS: Record<string, GridPhotoItem> = {
  routerProtocol: {
    src: '/images/router protocol.jpg',
    title: 'Router Protocol Demo Day',
    subtitle: 'HACKATHON PARTNER // DEMO DAY',
  },
  binanceMeetup: {
    src: '/images/binancemeetup.png',
    title: 'Binance Community Meetup',
    subtitle: 'WEB3 ECOSYSTEM // COMMUNITY',
  },
  sihPrize: {
    src: '/images/sihprize.JPG',
    title: 'Smart India Hackathon Prize',
    subtitle: 'NATIONAL WINNER // MINISTRY OF ED',
  },
  hblClass: {
    src: '/images/hblclass.JPG',
    title: 'Classroom Keynote & Mentoring',
    subtitle: 'COMMUNITY & WORKSHOPS',
  },
  metamaskMeet: {
    src: '/images/metamaskcommunitymeet.png',
    title: 'MetaMask Community Meet',
    subtitle: 'CONSENSYS & ETHEREUM // DEV MEET',
  },
  delhiSih: {
    src: '/images/delhisih.jpg',
    title: 'Smart India Hackathon Delhi',
    subtitle: 'NATIONAL FINALS // HARDWARE & AI',
  },
  guestLecture: {
    src: '/guestLecture.png',
    title: 'Guest Lecture & Technical Talk',
    subtitle: 'KEYNOTE // ACADEMIC INVITE',
  },
  delhiSid: {
    src: '/images/delhi sid.JPG',
    title: 'Delhi Tech Delegation',
    subtitle: 'SUMMIT & NETWORKING',
  },
  img0400: {
    src: '/images/IMG_0400.jpeg',
    title: 'Beyond Abstraction Demo Day',
    subtitle: 'ROUTER X PIVOT // PITCH',
  },
  ministryOfEdu: {
    src: '/images/ministryofedution entepreneurshipprogram.JPG',
    title: 'Ministry of Education Program',
    subtitle: 'ENTREPRENEURSHIP // GOV OF INDIA',
  },
  img8355: {
    src: '/images/IMG_8355.jpeg',
    title: 'Uniswap Hook Incubator',
    subtitle: 'ACCEPTED // DEFI INCUBATOR',
  },
  img0397: {
    src: '/images/IMG_0397.jpeg',
    title: 'Midnight Hackathon Sprint',
    subtitle: 'RED BULL & CODE CHAOS',
  },
  img0399: {
    src: '/images/IMG_0399.jpeg',
    title: 'Technical Keynote & Architecture',
    subtitle: 'LIVE DEMO & PRESENTATION',
  },
  img9072: {
    src: '/images/IMG_9072.jpeg',
    title: 'Formal Tech Delegation',
    subtitle: 'HONORS & RECOGNITION',
  },
  img8920: {
    src: '/images/IMG_8920.JPG',
    title: 'NIT Calicut National Stage',
    subtitle: 'CAMPUS SUMMIT // TRAVEL',
  },
  img0398: {
    src: '/images/IMG_0398.jpeg',
    title: 'Hackathon Builder Squad',
    subtitle: 'TEAM COLLABORATION // STAGE',
  },
  businessPitch: {
    src: '/images/Businesspitch.png',
    title: 'Startup & Business Pitch',
    subtitle: 'VENTURE & DEMO DAY',
  },
  rTalks: {
    src: '/images/Rtalks.png',
    title: 'R Talks Keynote Session',
    subtitle: 'COMMUNITY & TECH TALKS',
  },
  buildOnChainNIT: {
    src: '/images/buildonchainNITkerala.png',
    title: 'Build On-Chain NIT Kerala',
    subtitle: 'WEB3 HACKATHON // NIT',
  },
  web3Class: {
    src: '/images/web3class.png',
    title: 'Web3 & Smart Contract Class',
    subtitle: 'HANDS-ON DEVELOPER LAB',
  },
};

// 21 items carefully distributed across 7 columns x 3 rows with zero horizontal or vertical adjacency clashes
const JOURNEY_GALLERY: GridPhotoItem[] = [
  // Row 1 (Cols 0-6)
  UNIQUE_JOURNEY_ITEMS.routerProtocol,
  UNIQUE_JOURNEY_ITEMS.binanceMeetup,
  UNIQUE_JOURNEY_ITEMS.sihPrize,
  UNIQUE_JOURNEY_ITEMS.hblClass,
  UNIQUE_JOURNEY_ITEMS.metamaskMeet,
  UNIQUE_JOURNEY_ITEMS.delhiSih,
  UNIQUE_JOURNEY_ITEMS.guestLecture,

  // Row 2 (Cols 0-6)
  UNIQUE_JOURNEY_ITEMS.delhiSid,
  UNIQUE_JOURNEY_ITEMS.img0400,
  UNIQUE_JOURNEY_ITEMS.ministryOfEdu,
  UNIQUE_JOURNEY_ITEMS.img8355,
  UNIQUE_JOURNEY_ITEMS.img0397,
  UNIQUE_JOURNEY_ITEMS.img0399,
  UNIQUE_JOURNEY_ITEMS.img9072,

  // Row 3 (Cols 0-6)
  UNIQUE_JOURNEY_ITEMS.businessPitch,
  UNIQUE_JOURNEY_ITEMS.rTalks,
  UNIQUE_JOURNEY_ITEMS.buildOnChainNIT,
  UNIQUE_JOURNEY_ITEMS.web3Class,
  UNIQUE_JOURNEY_ITEMS.img8920,
  UNIQUE_JOURNEY_ITEMS.img0398,
  UNIQUE_JOURNEY_ITEMS.sihPrize,
];

export const TechTicker: React.FC = () => {
  return (
    <section id="proof-of-work" className="relative py-16 bg-[#080808] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Section Header */}
        <div className="space-y-2 border-b border-white/15 pb-6">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 04 PROOF OF WORK &amp; COMMUNITY
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            PROOF OF WORK
          </h2>
          <p className="text-sm font-light text-white/60 max-w-xl">
            A visual archive of national hackathons, stage wins, demo days, tech delegations, and classroom mentoring across my journey.
          </p>
        </div>
      </div>

      {/* GSAP Staggered Grid */}
      <StaggeredGrid
        images={JOURNEY_GALLERY}
        centerText="PROOF OF WORK"
        credits={{
          madeBy: { text: "LAKSHAN GANESAN // 2026", href: "https://github.com/lakshangan" },
          moreDemos: { text: "EXPERIENCE TIMELINE ↗", href: "#experience" },
        }}
        showFooter={true}
      />
    </section>
  );
};
