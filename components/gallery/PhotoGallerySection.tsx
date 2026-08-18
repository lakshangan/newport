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
  aspectRatio?: string;
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
    aspectRatio: 'aspect-[3/4]',
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
  const [isVibrantBg, setIsVibrantBg] = useState(true);
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
      className={`transition-colors duration-500 relative border-t border-white/10 ${
        isVibrantBg
          ? 'bg-gradient-to-b from-[#f45fa2] via-[#f74895] to-[#f45fa2] text-white'
          : 'bg-[#080808] text-[#E8E5DF]'
      }`}
    >
      {/* Sticky Gallery Header Container */}
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/20 pb-8">
          <div className="space-y-4">
            {/* Boxed Title Badge */}
            <div className="inline-block bg-[#0f1115] text-white border-2 border-white/90 px-6 py-2.5 rounded-lg shadow-2xl">
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
                The Gallery
              </h2>
            </div>

            <p className={`text-base sm:text-lg font-medium tracking-wide ${isVibrantBg ? 'text-white/90' : 'text-[#8E8B85]'}`}>
              Proof of Work: Community, Code &amp; Chaos.
            </p>
          </div>

          {/* Controls: View Switcher & Theme Toggle */}
          <div className="flex items-center flex-wrap gap-3">
            {/* View Mode Toggle */}
            <div className="bg-black/40 p-1 rounded-full border border-white/20 flex items-center shadow-lg">
              <button
                onClick={() => setViewMode('parallax')}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all ${
                  viewMode === 'parallax'
                    ? 'bg-[#C75B32] text-white font-bold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🔍 Zoom Parallax
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#C75B32] text-white font-bold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                📷 Polaroid Grid
              </button>
            </div>

            {/* Background Theme Switcher */}
            <button
              onClick={() => setIsVibrantBg(!isVibrantBg)}
              className={`px-4 py-2 text-xs font-mono rounded-full border transition-all flex items-center space-x-2 shadow-lg ${
                isVibrantBg
                  ? 'bg-black/40 border-white text-white hover:bg-black/60'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span>{isVibrantBg ? '🌸 Vibrant Pink' : '🌑 Dark Mode'}</span>
              <span className="text-[10px]">⇄</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode 1: Zoom Parallax Experience */}
      {viewMode === 'parallax' ? (
        <div className="relative w-full overflow-hidden pb-12">
          <div className="text-center py-4 text-xs font-mono tracking-widest text-white/80 animate-bounce">
            ↓ SCROLL DOWN TO EXPLORE ZOOM PARALLAX WITH TEXT OVERLAYS ↓
          </div>

          <ZoomParallax images={parallaxImages} onImageClick={handleParallaxClick} />
        </div>
      ) : (
        /* View Mode 2: Polaroid Grid Layout */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Column 1 */}
            <div className="space-y-6">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[0])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[0].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[0].src}
                    alt={GALLERY_ITEMS[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[0].title}</span>
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[0].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[3])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[3].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[3].src}
                    alt={GALLERY_ITEMS[3].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[3].title}</span>
                  <span className="px-2 py-0.5 bg-[#C75B32] text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[3].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[6])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[6].rotation}`}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black flex flex-col justify-between p-4 text-white">
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
                    <div className="inline-block bg-[#e84393] text-white px-2 py-0.5 text-xs font-bold rounded">
                      Lakshan
                    </div>
                  </div>
                  <div className="relative z-10 pt-12 text-[10px] font-mono text-white/90 drop-shadow">
                    ACCEPTED TO UNISWAP HOOK INCUBATOR 🦄
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900">UNISWAP INCUBATOR</span>
                  <span className="px-2 py-0.5 bg-[#e84393] text-white text-[10px] rounded-xs font-semibold">
                    DEFI
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[1])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[1].rotation}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[1].src}
                    alt={GALLERY_ITEMS[1].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[1].title}</span>
                  <span className="px-2 py-0.5 bg-[#6c5ce7] text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[1].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[4])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[4].rotation}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[4].src}
                    alt={GALLERY_ITEMS[4].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[4].title}</span>
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[4].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[7])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[7].rotation}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[7].src}
                    alt={GALLERY_ITEMS[7].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[7].title}</span>
                  <span className="px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[7].tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[2])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[2].rotation}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={GALLERY_ITEMS[2].src}
                    alt={GALLERY_ITEMS[2].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#e84393] text-white px-2.5 py-1 text-[10px] font-mono font-bold rounded shadow-md">
                    TECH HUB
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">{GALLERY_ITEMS[2].title}</span>
                  <span className="px-2 py-0.5 bg-[#e84393] text-white text-[10px] rounded-xs font-semibold">
                    {GALLERY_ITEMS[2].tag}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSelectedItem(GALLERY_ITEMS[5])}
                className={`group cursor-pointer p-3 bg-white text-black shadow-2xl rounded-sm transition-all duration-300 hover:scale-[1.02] hover:z-20 ${GALLERY_ITEMS[5].rotation}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
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
                    <div className="text-[10px] font-mono text-yellow-400 font-semibold pt-0.5">
                      NIT Calicut // 1st Place Track Winner
                    </div>
                  </div>
                </div>
                <div className="pt-3 pb-1 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-gray-900 truncate">NIT Calicut Hackathon</span>
                  <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] rounded-xs font-bold">
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
            className="relative max-w-4xl w-full bg-[#121212] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
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
            <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#181818] border-t md:border-t-0 md:border-l border-white/10">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-[#C75B32] text-white text-xs font-mono font-bold rounded">
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
