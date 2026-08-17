'use client';

import React, { useState } from 'react';

export const SteganographyScene: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const rawMatrix = [
    '01001100 01000001 01001011 01010011 01001000 01000001 01001110',
    '01010011 01010100 01000101 01000111 01000001 01001110 01001111',
    '01010000 01000001 01011001 01001100 01001111 01000001 01000100',
    '01010011 01000101 01000011 01010010 01000101 01010100 00110000',
  ];

  const revealedDecoded = [
    'LSB_PAYLOAD_UNLOCKED :: KEY_0x7F9A',
    'SECRET_MSG: "HIDDEN IN THE LIGHT"',
    'ALGORITHM: LSB_SPATIAL_PIXEL_AES256',
    'STATUS: VERIFIED // CHECKSUM_PASS',
  ];

  return (
    <div
      className="w-full h-full min-h-[300px] bg-[#111111] border border-[#242424] p-6 font-mono text-xs relative flex flex-col justify-between overflow-hidden group cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="SCAN"
    >
      {/* Top Status Header */}
      <div className="flex justify-between items-center text-[10px] text-[#8E8B85] border-b border-[#242424] pb-2">
        <span>IMAGE_PIXEL_MATRIX // [LSB_DECODER]</span>
        <span className={isHovered ? 'text-[#C75B32] font-bold' : 'text-[#8E8B85]'}>
          {isHovered ? '● DECRYPTING...' : '○ ENCRYPTED'}
        </span>
      </div>

      {/* Center Matrix / Revealed Text */}
      <div className="my-6 space-y-3">
        {(isHovered ? revealedDecoded : rawMatrix).map((line, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 ${
              isHovered ? 'text-[#E8E5DF] bg-[#C75B32]/10 p-2 border-l-2 border-[#C75B32]' : 'text-[#8E8B85]/60'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Hover Scanner Beam Bar */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-[#C75B32] transition-all duration-700 ease-in-out ${
          isHovered ? 'top-full opacity-100' : 'top-0 opacity-0'
        }`}
      />

      {/* Bottom Footer */}
      <div className="text-[10px] text-[#8E8B85] flex justify-between items-center border-t border-[#242424] pt-2">
        <span>HOVER TO SCAN MATRIX</span>
        <span className="text-[#C75B32]">PYTHON // LSB</span>
      </div>
    </div>
  );
};
