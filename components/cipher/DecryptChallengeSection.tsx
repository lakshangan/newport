'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  RefreshCw,
  Bot,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AnimatedCoffeeCup } from '@/components/ui/AnimatedCoffeeCup';
import { DecryptedText } from '@/components/ui/DecryptedText';

// =========================================================================
// CONFIGURATION
// =========================================================================
export const CONTACT_EMAIL = PORTFOLIO_DATA.personal.email || 'lakshanganesan@gmail.com';

// =========================================================================
// ENCRYPTED PAYLOAD & CRYPTOGRAPHIC METADATA (AES-256-GCM + PBKDF2)
// =========================================================================
const CIPHERTEXT_B64 =
  'ssLTEP6PGAvPWwua7BwN1ibrLYFVnxw7nYB1SSd9+X/GPWXyaUe2whObwtDzDFldzGy+QM0tZLBGzyce9M1VHQF54eJ9i5Ohflc7bSq2axnllml84qJacmJsmaQKg0EbS+Q=';
const SALT_B64 = 'YQJxqSJeq67JzLgiZN4AmA==';
const IV_B64 = 'yctUJBZGK+/eF4G8';
const PBKDF2_ITERATIONS = 100000;

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function normalizeKey(input: string): string {
  const trimmed = input.trim().toUpperCase();
  if (trimmed === 'PROOFPASSIONDISCIPLINE') {
    return 'PROOF-PASSION-DISCIPLINE';
  }
  return trimmed.replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function attemptWebCryptoDecrypt(rawKeyInput: string): Promise<string> {
  const normalizedKey = normalizeKey(rawKeyInput);
  if (!normalizedKey) {
    throw new Error('Key cannot be empty');
  }

  const salt = base64ToBytes(SALT_B64);
  const iv = base64ToBytes(IV_B64);
  const encryptedBytes = base64ToBytes(CIPHERTEXT_B64);

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizedKey),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as unknown as BufferSource },
    derivedKey,
    encryptedBytes as unknown as BufferSource
  );

  return new TextDecoder().decode(decryptedBuffer);
}

const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%&*<>[]{}~';

// =========================================================================
// 1. PIXELED ASCII SWIMMING CURRENT BACKGROUND (Inspired by Koi ASCII Grid)
// =========================================================================
const CipherPixelBackground: React.FC<{
  isTyping: boolean;
  status: 'idle' | 'decrypting' | 'scrambling' | 'success' | 'error';
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ isTyping, status, pointerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typingRef = useRef(isTyping);
  const statusRef = useRef(status);

  useEffect(() => {
    typingRef.current = isTyping;
  }, [isTyping]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    const cellSize = 18;
    const glyphs = ['0', '1', ':', '·', '+', '*', '#', '░', '▒'];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // 3 organic swimming ASCII pixel streams (koi-like flow)
    const streams = [
      { phase: 0, speed: 0.42, ampY: 0.24, baseY: 0.26, len: 18, color: '#E06D43' },
      { phase: 2.2, speed: 0.34, ampY: 0.2, baseY: 0.72, len: 20, color: '#F59E0B' },
      { phase: 4.1, speed: -0.29, ampY: 0.18, baseY: 0.5, len: 15, color: '#F2EFE9' },
    ];

    let spreadBoost = 0;

    const render = (now: number) => {
      const t = reduced ? 0 : now * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Smoothly disperse streams toward edges when user is typing
      const targetSpread = typingRef.current ? 1 : 0;
      spreadBoost += (targetSpread - spreadBoost) * 0.08;

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // Draw faint calibrated dot/pixel lattice + active swimming ASCII clusters
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize + cellSize * 0.5;
          const y = r * cellSize + cellSize * 0.5;

          let energy = 0;
          let activeColor = '#F2EFE9';

          for (const s of streams) {
            const headProg = ((t * s.speed + s.phase) % 1.4 + 1.4) % 1.4 - 0.2;
            const headX = headProg * width;
            const edgePush = spreadBoost * (s.baseY < 0.5 ? -height * 0.16 : height * 0.16);
            const headY =
              height * s.baseY +
              edgePush +
              Math.sin(headProg * Math.PI * 2.5 + t * 1.4 + s.phase) * (height * s.ampY * 0.45);

            const dx = x - headX;
            const dy = y - headY;
            const dir = s.speed >= 0 ? 1 : -1;
            const along = dx * dir;

            // Tapered koi-like silhouette in pixel grid space
            if (along <= 32 && along >= -s.len * cellSize) {
              const tailT = 1 - Math.abs(along) / (s.len * cellSize);
              const bodyWidth = (22 + Math.sin(tailT * Math.PI) * 28) * Math.max(0.25, tailT);
              const waveY = Math.sin(along * 0.04 - t * 6) * 8 * (1 - tailT);
              const distY = Math.abs(dy - waveY);

              if (distY < bodyWidth) {
                const localE = (1 - distY / bodyWidth) * Math.pow(tailT, 0.7);
                if (localE > energy) {
                  energy = localE;
                  activeColor = statusRef.current === 'success' ? '#34D399' : s.color;
                }
              }
            }
          }

          // Pointer ripple highlight
          if (px > 0 && py > 0) {
            const pDist = Math.hypot(x - px, y - py);
            if (pDist < 110) {
              const pE = (1 - pDist / 110) * 0.45;
              if (pE > energy) {
                energy = pE;
                activeColor = '#E06D43';
              }
            }
          }

          if (energy > 0.06) {
            const gIdx = Math.min(
              glyphs.length - 1,
              Math.floor((energy * 0.7 + ((c * 7 + r * 13 + Math.floor(t * 6)) % 5) * 0.08) * glyphs.length)
            );
            ctx.fillStyle = activeColor;
            ctx.globalAlpha = Math.min(0.68, energy * 0.65);
            ctx.fillText(glyphs[gIdx], x, y);
          } else if ((c + r) % 2 === 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.035)';
            ctx.globalAlpha = 1;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      ctx.globalAlpha = 1;
      if (!reduced) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [pointerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-90"
    />
  );
};

// =========================================================================
// 2. INTERACTIVE MOCHI CIPHER GUARDIAN ORB (Inspired by Allie Character)
// =========================================================================
const MochiGuardian: React.FC<{
  status: 'idle' | 'decrypting' | 'scrambling' | 'success' | 'error';
  isTyping: boolean;
  pointerOffset: { x: number; y: number };
}> = ({ status, isTyping, pointerOffset }) => {
  const [wink, setWink] = useState(false);

  const eyeX = isTyping ? -2 : Math.max(-4.5, Math.min(4.5, pointerOffset.x * 4.5));
  const eyeY = isTyping ? 3.5 : Math.max(-3.5, Math.min(3.5, pointerOffset.y * 3.5));

  return (
    <motion.button
      type="button"
      onClick={() => {
        setWink(true);
        setTimeout(() => setWink(false), 650);
      }}
      whileHover={{ scale: 1.08, rotate: -4 }}
      whileTap={{ scale: 0.9, scaleY: 0.86 }}
      animate={
        status === 'error'
          ? { x: [-5, 5, -4, 4, 0], rotate: [0, -6, 6, 0] }
          : status === 'success'
          ? { y: [0, -10, 0], rotate: [0, 5, -5, 0] }
          : { y: [0, -5, 0] }
      }
      transition={
        status === 'idle'
          ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.55, ease: 'easeOut' }
      }
      title="Mochi Cipher Guardian — click to say hi"
      aria-label="Mochi Cipher Guardian"
      className="relative group/mochi cursor-pointer focus:outline-none select-none"
    >
      {/* Subtle warm ambient aura */}
      <div className="absolute -inset-2 rounded-full bg-[#E06D43]/25 blur-xl opacity-70 group-hover/mochi:opacity-100 transition-opacity" />

      <svg width="78" height="82" viewBox="0 0 88 92" fill="none" className="relative drop-shadow-[0_14px_22px_rgba(0,0,0,0.65)]">
        <defs>
          <radialGradient id="mochiBodyGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFB067" />
            <stop offset="55%" stopColor="#E06D43" />
            <stop offset="100%" stopColor="#9C3C1C" />
          </radialGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A1918" />
            <stop offset="100%" stopColor="#070707" />
          </linearGradient>
        </defs>

        {/* Left & Right stubby arms */}
        <ellipse cx="13" cy="60" rx="7" ry="10" transform="rotate(-18 13 60)" fill="#C75B32" />
        <ellipse cx="75" cy="60" rx="7" ry="10" transform="rotate(18 75 60)" fill="#C75B32" />

        {/* Mochi Teardrop / Droplet Body */}
        <path
          d="M44 6 C50 6, 51 16, 59 22 C73 32, 78 46, 78 60 C78 78, 63 86, 44 86 C25 86, 10 78, 10 60 C10 46, 15 32, 29 22 C37 16, 38 6, 44 6 Z"
          fill="url(#mochiBodyGrad)"
        />

        {/* Soft knit highlight on crown */}
        <path
          d="M32 24 C38 19, 46 19, 54 24"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Glossy Obsidian Visor */}
        <rect
          x="20"
          y="37"
          width="48"
          height="28"
          rx="14"
          fill="url(#visorGrad)"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
        />
        {/* Visor top specular reflection */}
        <path
          d="M28 41 H60"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Expressive Eyes inside Visor */}
        <g transform={`translate(${eyeX}, ${eyeY})`}>
          {status === 'error' ? (
            <>
              <path d="M29 48 L36 52 L29 56" stroke="#F87171" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M59 48 L52 52 L59 56" stroke="#F87171" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : status === 'success' ? (
            <>
              <path d="M28 53 Q33 46 38 53" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M50 53 Q55 46 60 53" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Left Pac-eye */}
              <circle cx="34" cy="51" r="5.5" fill="#F2EFE9" />
              <path d="M34 51 L39.5 48.2 L39.5 53.8 Z" fill="#0B0B0B" />
              {/* Right Eye (winks on click or decrypting) */}
              {wink || status === 'decrypting' || status === 'scrambling' ? (
                <path d="M49 52 Q54 46.5 59 52" stroke="#F2EFE9" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              ) : (
                <>
                  <circle cx="54" cy="51" r="5.5" fill="#F2EFE9" />
                  <path d="M54 51 L59.5 48.2 L59.5 53.8 Z" fill="#0B0B0B" />
                </>
              )}
            </>
          )}
        </g>
      </svg>
    </motion.button>
  );
};

// =========================================================================
// MAIN SECTION
// =========================================================================
export const DecryptChallengeSection: React.FC = () => {
  const [keyInput, setKeyInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'decrypting' | 'scrambling' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [revealedMessage, setRevealedMessage] = useState('');
  const [scrambleDisplay, setScrambleDisplay] = useState(CIPHERTEXT_B64);
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedAiPrompt, setCopiedAiPrompt] = useState(false);
  const [showAiPromptText, setShowAiPromptText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -1, y: -1 });
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const COOLDOWN_SECONDS = 300;
  const [timeLeft, setTimeLeft] = useState<number>(COOLDOWN_SECONDS);
  const [showLockedMessage, setShowLockedMessage] = useState(false);

  const AI_SOLVER_PROMPT = `I am solving an interactive encrypted payload challenge on a developer's portfolio website.

Here is the exact technical data and discovered contextual clues from the website:

1. CRYPTOGRAPHIC SPECIFICATION:
- Algorithm: AES-256-GCM
- Key Derivation Function (KDF): PBKDF2 with HMAC-SHA256
- Iteration Rounds: 100,000
- Derived Key Length: 256 bits (32 bytes)
- Encrypted Ciphertext (Base64): ${CIPHERTEXT_B64}
- Salt (Base64): ${SALT_B64}
- IV / Nonce (Base64): ${IV_B64}

2. THREE DISCOVERED KEYWORDS:
I searched through the creator's portfolio and found three hidden words:
- Word 1: "PROOF" (From the GenProof AI project showcase)
- Word 2: "PASSION" (From the 25+ Hackathons milestone)
- Word 3: "DISCIPLINE" (From the International Silambam martial arts championship)

3. KEY DERIVATION ORDER:
The creator specified that these three keywords must be ordered correctly and joined:
Candidate Passphrase: "PROOF-PASSION-DISCIPLINE" (also accepts "proof passion discipline")

4. YOUR OBJECTIVE:
With the help of this decoding key and the parameters above, please derive the AES-256-GCM key using PBKDF2, decrypt the ciphertext payload, and tell me the secret plaintext message!`;

  useEffect(() => {
    let startTime = Date.now();
    try {
      const storedStart =
        sessionStorage.getItem('portfolio_stay_start') || sessionStorage.getItem('cipher_session_start');
      if (storedStart) {
        startTime = parseInt(storedStart, 10);
      } else {
        sessionStorage.setItem('portfolio_stay_start', String(startTime));
        sessionStorage.setItem('cipher_session_start', String(startTime));
      }
    } catch {
      startTime = Date.now();
    }

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, COOLDOWN_SECONDS - elapsed);
      setTimeLeft(remaining);
      return remaining;
    };

    updateTimer();
    const timerInterval = setInterval(() => {
      if (updateTimer() <= 0) clearInterval(timerInterval);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    pointerRef.current = { x, y };

    const nx = (x / Math.max(1, r.width) - 0.5) * 2;
    const ny = (y / Math.max(1, r.height) - 0.5) * 2;
    setPointerOffset({ x: nx, y: ny });

    const card = cardRef.current;
    if (card) {
      const cr = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - cr.left}px`);
      card.style.setProperty('--my', `${e.clientY - cr.top}px`);
    }
  };

  const handleSectionMouseLeave = () => {
    pointerRef.current = { x: -1, y: -1 };
    setPointerOffset({ x: 0, y: 0 });
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(CIPHERTEXT_B64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAiPrompt = () => {
    navigator.clipboard.writeText(AI_SOLVER_PROMPT);
    setCopiedAiPrompt(true);
    setTimeout(() => setCopiedAiPrompt(false), 2500);
  };

  const startScrambleAnimation = (targetText: string) => {
    setStatus('scrambling');
    const totalDuration = 1800;
    const intervalMs = 35;
    const totalSteps = Math.floor(totalDuration / intervalMs);
    let step = 0;

    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

    scrambleIntervalRef.current = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const lockedChars = Math.floor(progress * targetText.length);

      let currentScramble = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < lockedChars) {
          currentScramble += targetText[i];
        } else {
          currentScramble += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      setScrambleDisplay(currentScramble);

      if (progress >= 1) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        setRevealedMessage(targetText);
        setScrambleDisplay(targetText);
        setStatus('success');
      }
    }, intervalMs);
  };

  const handleAttemptDecryption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim() || status === 'decrypting' || status === 'scrambling') return;

    setStatus('decrypting');
    setErrorMessage('');

    try {
      const plaintext = await attemptWebCryptoDecrypt(keyInput);
      startScrambleAnimation(plaintext);
    } catch {
      setStatus('error');
      setErrorMessage('Invalid key. Keep exploring the portfolio to find all 3 clues.');
    }
  };

  const handleReset = () => {
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    setStatus('idle');
    setKeyInput('');
    setErrorMessage('');
    setRevealedMessage('');
    setScrambleDisplay(CIPHERTEXT_B64);
  };

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "I cracked your encrypted message (Coffee's on you!)"
  )}&body=${encodeURIComponent(
    `Hey Lakshan,\n\nI successfully decrypted your message!\n\nHere’s how I found the clues and cracked it:\n\n[Write your approach here]\n\nBest,\n[Your Name]`
  )}`;

  const isHintEligible = timeLeft <= 0;
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section
      ref={sectionRef}
      id="decrypt-this"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.08] overflow-hidden select-none scroll-mt-24"
    >
      {/* Animated Pixeled / ASCII Koi-Current Background */}
      <CipherPixelBackground
        isTyping={isTyping}
        status={status}
        pointerRef={pointerRef}
      />

      {/* Soft Vignette so text & hanging card stay crisp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#080808_92%)]"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#11100F]/90 border border-white/[0.1] font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E06D43] animate-pulse" />
            <span>Cryptographic Bounty</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-[68px] uppercase leading-[0.9] tracking-[-0.01em] text-[#F2EFE9] flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
            <span>If you crack this,</span>
            <span className="font-serif italic normal-case tracking-[-0.03em] text-[#E06D43] font-normal">
              coffee&apos;s on me.
            </span>
            <AnimatedCoffeeCup className="w-10 h-10 sm:w-12 sm:h-12 inline-block shrink-0 -mt-1" />
          </h2>

          <p className="text-sm sm:text-[15px] text-white/60 max-w-xl mx-auto font-sans leading-relaxed">
            I locked a secret message behind real AES-256-GCM encryption. Three clues are hidden across this
            portfolio — start typing and watch the pixel currents clear.
          </p>
        </motion.div>

        {/* ===================================================================== */}
        {/* HANGING LANYARD WIRE + PENDULUM SWAYING VAULT CARD                    */}
        {/* ===================================================================== */}
        <div className="relative pt-2">
          {/* Curved Suspension Wire & Clips */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-4xl h-16 pointer-events-none">
            <svg
              viewBox="0 0 900 72"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Main catenary suspension cable */}
              <path
                d="M 20 8 Q 450 38 880 8"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />
              {/* Left clip anchor + vertical cord */}
              <circle cx="195" cy="21" r="4" fill="#E06D43" />
              <line x1="195" y1="21" x2="195" y2="72" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
              {/* Right clip anchor + vertical cord */}
              <circle cx="705" cy="21" r="4" fill="#E06D43" />
              <line x1="705" y1="21" x2="705" y2="72" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Hanging Card Container with Gentle Pendulum Sway */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24, rotate: -1.4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            animate={{
              rotate: status === 'error' ? [-1.5, 1.5, -1, 1, 0] : [0, 0.35, 0, -0.35, 0],
            }}
            transition={
              status === 'error'
                ? { duration: 0.4 }
                : {
                    rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.7 },
                    y: { type: 'spring', stiffness: 220, damping: 20 },
                  }
            }
            whileHover={{ rotate: pointerOffset.x * 0.8, y: -2 }}
            style={{ transformOrigin: '50% -48px' }}
            className="group relative rounded-[28px] bg-[#11100F]/92 backdrop-blur-2xl border border-white/[0.11] hover:border-white/[0.2] transition-colors duration-500 shadow-[0_36px_100px_-20px_rgba(0,0,0,0.95)]"
          >
            {/* Left & Right Metallic Card Grommets / Clips */}
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute -top-3 left-[21.6%] -translate-x-1/2 items-center justify-center w-7 h-5 rounded-md bg-[#1c1a18] border border-white/25 shadow-md z-20"
            >
              <div className="w-2.5 h-1 rounded-full bg-[#E06D43]" />
            </div>
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute -top-3 right-[21.6%] translate-x-1/2 items-center justify-center w-7 h-5 rounded-md bg-[#1c1a18] border border-white/25 shadow-md z-20"
            >
              <div className="w-2.5 h-1 rounded-full bg-[#E06D43]" />
            </div>

            {/* Expressive Mochi Cipher Guardian Perched on Top-Right Corner */}
            <div className="hidden sm:block absolute -top-12 -right-5 z-30">
              <MochiGuardian
                status={status}
                isTyping={isTyping}
                pointerOffset={pointerOffset}
              />
            </div>

            {/* Pointer-Tracking Subtle Specular Spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(224, 109, 67, 0.09), transparent 65%)',
              }}
            />

            {/* Top Unified Telemetry Bar */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07] border-b border-white/[0.07] bg-white/[0.02] rounded-t-[28px] overflow-hidden font-mono">
              <div className="px-5 py-3.5 flex items-center justify-between sm:block space-y-0.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Status</span>
                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    status === 'success' ? 'text-emerald-400' : 'text-[#E06D43]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === 'success' ? 'bg-emerald-400' : 'bg-[#E06D43] animate-pulse'
                    }`}
                  />
                  {status === 'success' ? 'DECRYPTED' : 'ENCRYPTED'}
                </span>
              </div>

              <div className="px-5 py-3.5 flex items-center justify-between sm:block space-y-0.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Cipher</span>
                <span className="text-xs font-medium text-[#F2EFE9]">AES-256-GCM</span>
              </div>

              <div className="px-5 py-3.5 flex items-center justify-between sm:block space-y-0.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Key Derivation</span>
                <span className="text-xs font-medium text-[#F2EFE9]">PBKDF2 · 100K</span>
              </div>

              <div className="px-5 py-3.5 flex items-center justify-between sm:block space-y-0.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Key State</span>
                <span
                  className={`text-xs font-medium ${
                    status === 'success' ? 'text-emerald-400' : 'text-white/65'
                  }`}
                >
                  {status === 'success' ? 'VERIFIED' : 'LOCKED'}
                </span>
              </div>
            </div>

            {/* Main Console Body */}
            <div className="relative z-10 p-6 sm:p-8 space-y-7">
              {/* Ciphertext Block */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white/75">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#E06D43]">
                      {status === 'success' ? (
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <DecryptedText
                      text="ENCRYPTED PAYLOAD"
                      speed={40}
                      encryptedClassName="text-[#E06D43] font-mono"
                      className="tracking-[0.14em] text-[11px] uppercase text-white/60"
                    />
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleCopyPayload}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[11px] font-mono text-white/80 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E06D43]" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div
                  className={`rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-[13px] break-all leading-relaxed select-all tracking-wide transition-colors duration-300 ${
                    status === 'success'
                      ? 'bg-emerald-950/20 border border-emerald-500/35 text-emerald-300'
                      : 'bg-[#080808]/90 border border-white/[0.08] text-white/85'
                  }`}
                >
                  <span className="text-[#E06D43] select-none font-bold mr-2">&gt;</span>
                  <span className={status === 'scrambling' ? 'text-[#E06D43]' : ''}>{scrambleDisplay}</span>
                </div>
              </div>

              {/* Key Input or Decrypted Success State */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="p-6 sm:p-7 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-[0.16em]">
                        <span>Cipher Cracked &bull; Coffee Unlocked</span>
                        <AnimatedCoffeeCup className="w-4 h-4 inline-block shrink-0" />
                      </div>
                      <p className="text-base sm:text-lg font-mono font-semibold text-[#F2EFE9]">
                        &ldquo;{revealedMessage}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        You hunted down all three clues and verified the AES-GCM tag. Send me your breakdown and
                        let&apos;s grab coffee.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-emerald-500/20">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ECE8E1] hover:bg-[#E06D43] text-[#080808] font-mono font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Claim Coffee</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-white/75 hover:text-white transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Vault</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleAttemptDecryption}
                  animate={status === 'error' ? { x: [-6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center justify-between px-1 font-mono text-[11px]">
                    <span className="uppercase tracking-[0.14em] text-white/50">Passphrase</span>
                    <span className="text-white/35">Format: word1-word2-word3</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl bg-[#080808]/90 border border-white/[0.1] focus-within:border-[#E06D43]/70 transition-colors p-1.5">
                    <div className="flex flex-1 items-center min-w-0">
                      <div className="pl-3 pr-2 font-mono text-[#E06D43] select-none flex items-center gap-1.5 shrink-0">
                        <Terminal className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">&gt;</span>
                      </div>
                      <input
                        type="text"
                        value={keyInput}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        onChange={(e) => {
                          setKeyInput(e.target.value);
                          setIsTyping(true);
                          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                          typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1200);
                          if (status === 'error') setStatus('idle');
                        }}
                        disabled={status === 'decrypting' || status === 'scrambling'}
                        placeholder="Enter the 3-word key..."
                        className="w-full bg-transparent px-1 py-2.5 font-mono text-xs sm:text-sm text-[#F2EFE9] placeholder:text-white/30 focus:outline-none tracking-wide"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!keyInput.trim() || status === 'decrypting' || status === 'scrambling'}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-5 py-2.5 rounded-xl bg-[#E06D43] hover:bg-[#ec7c52] disabled:opacity-35 disabled:cursor-not-allowed text-[#080808] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      {status === 'decrypting' || status === 'scrambling' ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-[#080808] border-t-transparent animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Decrypt</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-mono text-rose-400 pl-1 flex items-center gap-1.5 pt-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.p>
                  )}
                </motion.form>
              )}

              {/* Footer & Clue Guide Bar */}
              <div className="pt-4 border-t border-white/[0.07] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs font-serif italic text-white/50">
                    &ldquo;Everything you need is already hidden in plain sight.&rdquo;
                  </p>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        if (!isHintEligible) {
                          setShowLockedMessage(true);
                          setTimeout(() => setShowLockedMessage(false), 4500);
                          return;
                        }
                        setShowHint(!showHint);
                      }}
                      className={`inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border transition-colors cursor-pointer select-none ${
                        !isHintEligible
                          ? 'border-white/[0.1] text-white/60 bg-white/[0.03] hover:border-[#E06D43]/40'
                          : showHint
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                          : 'border-[#E06D43]/50 text-[#E06D43] bg-[#E06D43]/10 hover:bg-[#E06D43]/20'
                      }`}
                    >
                      {!isHintEligible ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#E06D43]" />
                          <span>Clue Guide unlocks in {formatTime(timeLeft)}</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>{showHint ? 'Hide Clue Guide' : 'View Clue Guide'}</span>
                        </>
                      )}
                    </motion.button>

                    {!isHintEligible && showLockedMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] font-sans text-[#F2EFE9]/80 bg-[#080808] border border-[#E06D43]/35 px-3.5 py-2 rounded-xl text-left sm:text-right max-w-sm leading-relaxed"
                      >
                        No shortcuts yet — explore the portfolio to spot the 3 subtle clue words. The guide unlocks
                        after 5 minutes on the site ({formatTime(timeLeft)} remaining).
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Expandable Clue Guide */}
                <AnimatePresence>
                  {showHint && isHintEligible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-2xl bg-[#080808] border border-white/[0.08] p-5 text-xs font-mono text-white/80 space-y-4 overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                        <div className="text-emerald-400 font-semibold text-[11px] tracking-wider uppercase flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Clue Guide Unlocked</span>
                        </div>
                        <span className="text-[10px] text-white/40 hidden sm:inline">
                          Order: Project &rarr; Hackathons &rarr; Martial Art
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl bg-[#131211] border border-white/[0.07] space-y-2">
                          <span className="text-[10px] text-[#E06D43] uppercase tracking-wider block">
                            01 · The 3 Words
                          </span>
                          <div className="space-y-1.5 text-xs text-white/75 font-sans">
                            <p>
                              <strong className="text-white font-mono">1. </strong>GenProof AI &rarr;{' '}
                              <code className="text-[#E06D43] font-mono">PROOF</code>
                            </p>
                            <p>
                              <strong className="text-white font-mono">2. </strong>25+ Hackathons &rarr;{' '}
                              <code className="text-[#E06D43] font-mono">PASSION</code>
                            </p>
                            <p>
                              <strong className="text-white font-mono">3. </strong>Silambam Medalist &rarr;{' '}
                              <code className="text-[#E06D43] font-mono">DISCIPLINE</code>
                            </p>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#131211] border border-white/[0.07] space-y-2">
                          <span className="text-[10px] text-[#E06D43] uppercase tracking-wider block">
                            02 · Key Format
                          </span>
                          <div className="p-2.5 rounded-lg bg-[#080808] border border-[#E06D43]/30 font-mono text-center text-[11px] text-[#E06D43] select-all">
                            PROOF-PASSION-DISCIPLINE
                          </div>
                          <p className="text-[11px] text-white/55 font-sans">
                            Hyphens, spaces, or lowercase all work automatically.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#131211] border border-white/[0.07] space-y-2">
                          <span className="text-[10px] text-[#E06D43] uppercase tracking-wider block">
                            03 · Decrypt &amp; Claim
                          </span>
                          <p className="text-xs text-white/70 font-sans leading-relaxed">
                            Enter the combined key above, click Decrypt, and send me your breakdown!
                          </p>
                        </div>
                      </div>

                      {/* AI Solver Prompt Helper */}
                      <div className="pt-2 border-t border-white/[0.07] space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#131211] border border-white/[0.07]">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#F2EFE9]">
                              <Bot className="w-4 h-4 text-[#E06D43]" />
                              <span>Use an AI Assistant to Solve</span>
                            </div>
                            <p className="text-[11px] text-white/55 font-sans">
                              Copy the structured AES-256-GCM parameters and clues to ChatGPT, Claude, or Gemini.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowAiPromptText(!showAiPromptText)}
                              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[11px] font-mono text-white/80 transition-colors cursor-pointer"
                            >
                              {showAiPromptText ? 'Hide' : 'Preview'}
                            </button>
                            <button
                              type="button"
                              onClick={handleCopyAiPrompt}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E06D43] hover:bg-[#ec7c52] text-[#080808] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              {copiedAiPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedAiPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {showAiPromptText && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="rounded-xl bg-[#040404] border border-white/[0.08] p-4 font-mono text-[11px] text-white/75 whitespace-pre-wrap select-all leading-relaxed max-h-52 overflow-y-auto"
                            >
                              {AI_SOLVER_PROMPT}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DecryptChallengeSection;
