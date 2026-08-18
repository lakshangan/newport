'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export interface ParallaxImage {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  location?: string;
}

export interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: ParallaxImage[];
  className?: string;
  onImageClick?: (image: ParallaxImage) => void;
}

export function ZoomParallax({ images, className, onImageClick }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className={`relative h-[300vh] ${className || ''}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map((item, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1
                  ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]'
                  : ''
              } ${
                index === 2
                  ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 3
                  ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]'
                  : ''
              } ${
                index === 4
                  ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 5
                  ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]'
                  : ''
              } ${
                index === 6
                  ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]'
                  : ''
              }`}
            >
              <div
                onClick={() => onImageClick && onImageClick(item)}
                className="relative h-[25vh] w-[25vw] group overflow-hidden rounded-xl border border-white/20 shadow-2xl bg-black cursor-pointer transition-all duration-300 hover:border-[#C75B32]"
              >
                <img
                  src={item.src || '/placeholder.svg'}
                  alt={item.alt || item.title || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Text Overlay for each Parallax Image */}
                {(item.title || item.subtitle || item.tag) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 flex flex-col justify-end text-white pointer-events-auto">
                    {item.tag && (
                      <span className="self-start px-2 py-0.5 mb-1 text-[9px] font-mono font-bold bg-[#C75B32] text-white rounded-xs uppercase tracking-wider shadow-sm">
                        {item.tag}
                      </span>
                    )}
                    {item.title && (
                      <h4 className="text-xs sm:text-sm font-display font-bold text-white tracking-tight drop-shadow-md leading-tight group-hover:text-[#E88053] transition-colors">
                        {item.title}
                      </h4>
                    )}
                    {item.subtitle && (
                      <p className="text-[10px] sm:text-xs font-mono text-white/80 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
