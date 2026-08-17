'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('VIEW');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor], a, button') as HTMLElement | null;

      if (cursorTarget) {
        setIsHovered(true);
        const customText = cursorTarget.getAttribute('data-cursor');
        setHoverText(customText || (cursorTarget.tagName === 'A' ? 'OPEN' : 'VIEW'));
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Center dot / Expanding pill */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-[#C75B32] text-white shadow-lg text-[10px] font-mono tracking-widest font-bold uppercase scale-110'
            : 'w-2.5 h-2.5 bg-[#E8E5DF] ring-4 ring-[#C75B32]/30'
        }`}
      >
        {isHovered && <span>{hoverText}</span>}
      </div>
    </div>
  );
};
