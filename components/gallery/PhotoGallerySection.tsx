'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomParallax, ParallaxImage } from '@/components/ui/zoom-parallax';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  event: string;
  tag: string;
  location: string;
  rotation?: string;
  customOverlay?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: '/images/IMG_0397.jpeg',
    title: 'Hackathon Marathon',
    event: 'Build & Ship Sprint',
    tag: 'COMMUNITY',
    location: 'Bengaluru',
    rotation: '-rotate-1',
  },
  {
    id: '2',
    src: '/images/IMG_0400.jpeg',
    title: 'Beyond Abstraction Demo Day',
    event: 'Router x Pivot Demo Day',
    tag: 'DEMO DAY',
    location: 'Bengaluru',
    rotation: 'rotate-1',
  },
  {
    id: '3',
    src: '/images/IMG_8355.jpeg',
    title: 'Tech Hub Workshop',
    event: 'Web3 & AI Speaker Session',
    tag: 'SPEAKER',
    location: 'Tech Hub',
    rotation: '-rotate-2',
  },
  {
    id: '4',
    src: '/images/IMG_0398.jpeg',
    title: 'Builder Squad',
    event: 'Community Meetup & Hackers',
    tag: 'BUILDERS',
    location: 'Campus',
    rotation: 'rotate-2',
  },
  {
    id: '5',
    src: '/images/IMG_0399.jpeg',
    title: 'Project Keynote & Live Demo',
    event: 'Technical Showcase',
    tag: 'KEYNOTE',
    location: 'Auditorium',
    rotation: '-rotate-1',
  },
  {
    id: '6',
    src: '/images/IMG_8920.JPG',
    title: "Kerala's Largest Web3 Hackathon",
    event: '1st Place Track Winner',
    tag: 'WINNER',
    location: 'NIT Calicut',
    rotation: 'rotate-1',
    customOverlay: "KERALA'S LARGEST WEB3 HACKATHON",
  },
  {
    id: '7',
    src: '/images/image.png',
    title: 'Uniswap Hook Incubator',
    event: 'Accepted Developer Cohort',
    tag: 'UNISWAP',
    location: 'Global Cohort',
    rotation: '-rotate-2',
  },
  {
    id: '8',
    src: '/images/IMG_9072.jpeg',
    title: 'Code, Chaos & Midnight Builds',
    event: 'Web3 Hackathon Finalist',
    tag: 'HACKATHON',
    location: 'NIT Calicut',
    rotation: 'rotate-2',
  },
];

export const PhotoGallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'parallax' | 'grid'>('parallax');

  const parallaxImages: ParallaxImage[] = GALLERY_ITEMS.slice(0, 7).map((item) => ({
    src: item.src,
    alt: item.title,
    title: item.title,
    subtitle: item.event,
    tag: item.tag,
    location: item.location,
  }));

  const handleParallaxClick = (img: ParallaxImage) => {
    const item = GALLERY_ITEMS.find((g) => g.src === img.src);
    if (item) {
      setSelectedItem(item);
    }
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#08080a] text-[#f5f5f7] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient Spotlight Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75B32]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Sticky Gallery Header Container */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div className="space-y-3">
            {/* Section Tag */}
            <div className="text-xs font-mono tracking-widest text-[#C75B32]">
              // 02 PROOF OF WORK &amp; COMMUNITY
            </div>

            {/* Display Title */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white">
              THE GALLERY
            </h2>

            <p className="text-base sm:text-lg font-light text-white/60">
              Proof of Work: Community, Code &amp; Chaos.
            </p>
          </div>

          {/* View Mode Switcher Pill */}
          <div className="flex items-center gap-3">
            <div className="bg-[#111115] p-1.5 rounded-full border border-white/15 flex items-center shadow-xl backdrop-blur-md">
              <button
                onClick={() => setViewMode('parallax')}
                className={`px-5 py-2 text-xs font-mono rounded-full transition-all ${
                  viewMode === 'parallax'
                    ? 'bg-[#C75B32] text-white font-bold shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🔍 Zoom Parallax
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-5 py-2 text-xs font-mono rounded-full transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#C75B32] text-white font-bold shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                📷 Polaroid Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode 1: Zoom Parallax Experience */}
      {viewMode === 'parallax' ? (
        <div className="relative w-full overflow-hidden pb-12 z-10">
          <div className="text-center py-4 text-xs font-mono tracking-widest text-white/50 animate-bounce">
            ↓ SCROLL DOWN TO EXPLORE ZOOM PARALLAX WITH TEXT OVERLAYS ↓
          </div>

          <ZoomParallax images={parallaxImages} onImageClick={handleParallaxClick} />
        </div>
      ) : (
        /* View Mode 2: Polaroid Dark Grid Layout */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Column 1 */}
            <div className="space-y-6">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[0])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[0].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[0].src}
                    alt={GALLERY_ITEMS[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[0].title}</span>
                  <span className="px-2.5 py-0.5 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[0].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[3])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[3].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[3].src}
                    alt={GALLERY_ITEMS[3].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[3].title}</span>
                  <span className="px-2.5 py-0.5 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[3].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[6])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[6].rotation}`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black flex flex-col justify-between p-4 text-white">
                  <Image
                    src={GALLERY_ITEMS[6].src}
                    alt={GALLERY_ITEMS[6].title}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-10 space-y-1">
                    <div className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight text-white drop-shadow-md">
                      CONGRATULATIONS!
                    </div>
                    <div className="inline-block bg-[#C75B32] text-white px-2 py-0.5 text-xs font-bold rounded">
                      Lakshan
                    </div>
                  </div>
                  <div className="relative z-10 pt-12 text-[10px] font-mono text-white/90 drop-shadow">
                    ACCEPTED TO UNISWAP HOOK INCUBATOR 🦄
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">UNISWAP INCUBATOR</span>
                  <span className="px-2.5 py-0.5 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] rounded-full font-semibold">
                    DEFI
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[1])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[1].rotation}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[1].src}
                    alt={GALLERY_ITEMS[1].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[1].title}</span>
                  <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[1].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[4])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[4].rotation}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[4].src}
                    alt={GALLERY_ITEMS[4].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[4].title}</span>
                  <span className="px-2.5 py-0.5 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[4].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[7])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[7].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[7].src}
                    alt={GALLERY_ITEMS[7].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[7].title}</span>
                  <span className="px-2.5 py-0.5 bg-gray-500/20 border border-gray-500/40 text-gray-300 text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[7].tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[2])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[2].rotation}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[2].src}
                    alt={GALLERY_ITEMS[2].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#C75B32] text-white px-2.5 py-1 text-[10px] font-mono font-bold rounded-md shadow-md">
                    TECH HUB
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">{GALLERY_ITEMS[2].title}</span>
                  <span className="px-2.5 py-0.5 bg-[#C75B32]/20 border border-[#C75B32]/40 text-[#E88053] text-[10px] rounded-full font-semibold">
                    {GALLERY_ITEMS[2].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[5])}
                className={`group cursor-pointer p-3.5 bg-[#111115] border border-white/12 hover:border-[#C75B32]/60 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${GALLERY_ITEMS[5].rotation}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={GALLERY_ITEMS[5].src}
                    alt={GALLERY_ITEMS[5].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                    <div className="text-sm font-extrabold uppercase font-display tracking-tight text-white drop-shadow">
                      KERALA&apos;S LARGEST WEB3 HACKATHON
                    </div>
                    <div className="text-[10px] font-mono text-amber-400 font-semibold pt-0.5">
                      NIT Calicut // 1st Place Track Winner
                    </div>
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white truncate">NIT Calicut Hackathon</span>
                  <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] rounded-full font-bold">
                    🏆 WINNER
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121215] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>

            {/* Image Preview */}
            <div className="relative w-full md:w-2/3 min-h-[300px] md:min-h-[480px] bg-black">
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Meta Details */}
            <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#18181c] border-t md:border-t-0 md:border-l border-white/10">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-[#C75B32] text-white text-xs font-mono font-bold rounded-full">
                  {selectedItem.tag}
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-sm font-mono text-white/80">
                  {selectedItem.event}
                </p>
                <p className="text-xs font-mono text-white/50">
                  📍 {selectedItem.location}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60 space-y-2">
                <div>// LAKSHAN GANESAN ARCHIVE</div>
                <div>Proof of Work &amp; Community Building</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
