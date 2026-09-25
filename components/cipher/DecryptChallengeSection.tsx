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
  Send,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Zap,
  Bot,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AnimatedCoffeeCup } from '@/components/ui/AnimatedCoffeeCup';

// =========================================================================
// CONFIGURATION
// =========================================================================
// Set your preferred contact email here. Defaults to portfolio data email.
export const CONTACT_EMAIL = PORTFOLIO_DATA.personal.email || 'lakshanganesan@gmail.com';

// =========================================================================
// ENCRYPTED PAYLOAD & CRYPTOGRAPHIC METADATA (AES-256-GCM + PBKDF2)
// =========================================================================
// The secret plaintext is NOT present in this source code.
// It can only be derived and authenticated using the correct 3-clue sequence.
const CIPHERTEXT_B64 =
  'ssLTEP6PGAvPWwua7BwN1ibrLYFVnxw7nYB1SSd9+X/GPWXyaUe2whObwtDzDFldzGy+QM0tZLBGzyce9M1VHQF54eJ9i5Ohflc7bSq2axnllml84qJacmJsmaQKg0EbS+Q=';
const SALT_B64 = 'YQJxqSJeq67JzLgiZN4AmA==';
const IV_B64 = 'yctUJBZGK+/eF4G8';
const PBKDF2_ITERATIONS = 100000;

// Helper: Base64 to Uint8Array with non-shared ArrayBuffer (TypeScript & Web Crypto compatible)
function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Key normalization: tolerates various delimiter formats (hyphens, spaces, colons, underscores)
function normalizeKey(input: string): string {
  const trimmed = input.trim().toUpperCase();
  if (trimmed === 'PROOFPASSIONDISCIPLINE') {
    return 'PROOF-PASSION-DISCIPLINE';
  }
  return trimmed.replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Web Crypto API Decryption (AES-256-GCM with PBKDF2 Key Derivation)
async function attemptWebCryptoDecrypt(rawKeyInput: string): Promise<string> {
  const normalizedKey = normalizeKey(rawKeyInput);
  if (!normalizedKey) {
    throw new Error('Key cannot be empty');
  }

  const salt = base64ToBytes(SALT_B64);
  const iv = base64ToBytes(IV_B64);
  const encryptedBytes = base64ToBytes(CIPHERTEXT_B64);

  // 1. Import raw passphrase as PBKDF2 key material
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizedKey),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // 2. Derive 256-bit AES-GCM decryption key
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

  // 3. Decrypt payload (AES-256-GCM verifies the 16-byte authentication tag automatically)
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as unknown as BufferSource },
    derivedKey,
    encryptedBytes as unknown as BufferSource
  );

  return new TextDecoder().decode(decryptedBuffer);
}

const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%&*<>[]{}~';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 5 Minutes (300 seconds) required stay on website before revealing hint
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

  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize session timer for time spent on the website
  useEffect(() => {
    let startTime = Date.now();
    try {
      const storedStart = sessionStorage.getItem('portfolio_stay_start') || sessionStorage.getItem('cipher_session_start');
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
      const remaining = updateTimer();
      if (remaining <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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

  // Smooth Scramble & Character Resolve Animation
  const startScrambleAnimation = (targetText: string) => {
    setStatus('scrambling');
    const totalDuration = 1800; // 1.8 seconds
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
      // Decryption succeeded! Trigger reveal animation
      startScrambleAnimation(plaintext);
    } catch {
      setStatus('error');
      setErrorMessage('Invalid key. Try looking deeper across the portfolio.');
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

  return (
    <section
      id="decrypt-this"
      className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 bg-[#060505] border-t border-white/[0.08] overflow-hidden select-none scroll-mt-24"
    >
      {/* ========================================================================= */}
      {/* VISIONOS CHROMATIC REFRACTION BACKLIGHTS (Diffuses through frosted glass) */}
      {/* ========================================================================= */}
      {/* Ambient Warm Honey Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      {/* Top-Right Sunset Glow (Visible through top glass panel) */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-gradient-to-br from-amber-400/20 via-orange-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      {/* Bottom-Left Cool Iridescent Refraction (Adds subtle chromatic depth) */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      {/* High-Fidelity Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header - Apple Keynote Floating Glass Eyebrow */}
        <div className="space-y-4 text-center">
          {/* Eyebrow Floating Glass Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.18] text-neutral-200 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)] animate-pulse" />
            <span className="text-white font-medium">Interactive Cryptographic Bounty</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70 drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
              IF YOU CRACK THIS,
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]">
              COFFEE&apos;S ON ME
            </span>
            <AnimatedCoffeeCup className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 inline-block shrink-0 -mt-1 sm:-mt-2" />
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-sans font-normal leading-relaxed tracking-normal">
            I locked a secret message behind real AES-256 encryption. There are 3 clues scattered across this portfolio—hunt
            them down, piece them together, and let&apos;s see if you can break it.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VISIONOS FROSTED GLASS CONSOLE SLAB */}
        {/* ========================================================================= */}
        <div
          onMouseMove={handleMouseMove}
          className="relative rounded-[32px] sm:rounded-[36px] border border-white/[0.18] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] bg-[#0c0a0a]/65 backdrop-blur-3xl backdrop-saturate-[190%] p-6 sm:p-9 space-y-7 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(255,255,255,0.06),0_30px_90px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(245,158,11,0.06)] hover:border-white/[0.28] transition-all duration-300 overflow-hidden group"
        >
          {/* Top Edge Specular Lighting Line (Hallmark of cut Apple Glass) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Diagonal Glass Sheen Highlight */}
          <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl transform -rotate-12" />

          {/* Interactive Mouse Cursor Refraction Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[32px] sm:rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251, 191, 36, 0.12), transparent 75%)`,
            }}
          />

          {/* Telemetry Status Bar - Cut VisionOS Glass Capsules */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
            {/* Status */}
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 space-y-1 group/pill">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium block">
                Status
              </span>
              <span
                className={`font-bold flex items-center gap-1.5 text-xs ${
                  status === 'success' ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'success'
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]'
                      : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)] animate-pulse'
                  }`}
                />
                {status === 'success' ? 'DECRYPTED' : 'ENCRYPTED'}
              </span>
            </div>

            {/* Algorithm */}
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 space-y-1">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium block">
                Algorithm
              </span>
              <span className="font-bold text-white text-xs truncate block drop-shadow-sm">
                AES-256-GCM
              </span>
            </div>

            {/* Key State */}
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 space-y-1">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium block">
                Key State
              </span>
              <span
                className={`font-bold text-xs truncate block ${
                  status === 'success' ? 'text-emerald-400' : 'text-neutral-200'
                }`}
              >
                {status === 'success' ? 'VERIFIED' : 'UNKNOWN'}
              </span>
            </div>

            {/* Salt / IV */}
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 space-y-1">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium block">
                Salt &amp; Nonce
              </span>
              <span className="font-bold text-white text-xs truncate block drop-shadow-sm">
                DETECTED
              </span>
            </div>
          </div>

          {/* Encrypted Payload Window */}
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              {/* Payload Header with Glass Lock Badge */}
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-200 font-semibold">
                <span className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.12] text-amber-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                  {status === 'success' ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </span>
                <span className="tracking-wide text-neutral-300">[ ENCRYPTED PAYLOAD ]</span>
              </div>

              {/* Copy Button - VisionOS Frosted Pill */}
              <button
                type="button"
                onClick={handleCopyPayload}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-white/35 text-xs font-mono text-white transition-all cursor-pointer shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.3)] active:scale-95 backdrop-blur-xl"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Payload</span>
                  </>
                )}
              </button>
            </div>

            {/* Ciphertext / Revealed Text Block - Smoked Frosted Glass */}
            <div
              className={`relative rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm break-all leading-relaxed select-all tracking-wider transition-all duration-300 backdrop-blur-2xl ${
                status === 'success'
                  ? 'border border-emerald-500/40 text-emerald-300 bg-[#09150f]/85 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(52,211,153,0.3),0_0_30px_rgba(16,185,129,0.15)]'
                  : 'border border-white/[0.14] text-neutral-100 bg-black/55 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.15)]'
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-amber-400 select-none font-bold mr-2">&gt;</span>
              <span className={status === 'scrambling' ? 'text-amber-300' : ''}>
                {scrambleDisplay}
              </span>
            </div>
          </div>

          {/* Key Input & Decryption Action */}
          <div className="relative z-10">
            {status === 'success' ? (
              /* Success Card - VisionOS Glass Celebration */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 rounded-3xl bg-emerald-950/25 border border-emerald-500/40 space-y-5 shadow-[0_20px_60px_rgba(16,185,129,0.2),inset_0_1.5px_1px_0_rgba(52,211,153,0.35)] backdrop-blur-3xl text-center sm:text-left relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0 shadow-[0_0_25px_rgba(52,211,153,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.3)]">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      <Check className="w-3.5 h-3.5" />
                      <span className="flex items-center gap-1.5">
                        CIPHER CRACKED &bull; COFFEE UNLOCKED
                        <AnimatedCoffeeCup className="w-4 h-4 inline-block shrink-0 -mt-0.5" />
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
                      &ldquo;{revealedMessage}&rdquo;
                    </p>
                    <p className="text-sm font-sans font-semibold text-amber-300">
                      Now I’m curious.
                    </p>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                      You actually hunted down the clues and solved it. Send me your breakdown and let&apos;s talk shop.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-emerald-500/20">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.5)] active:scale-95"
                  >
                    <span>TELL ME HOW YOU CRACKED IT</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs font-mono text-neutral-200 hover:text-white transition-all active:scale-95 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Input Form with Shake on Error */
              <motion.form
                onSubmit={handleAttemptDecryption}
                animate={
                  status === 'error'
                    ? { x: [-6, 6, -4, 4, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-300 px-1">
                  <span className="font-medium tracking-wide">ENTER DERIVED KEY</span>
                  <span className="text-[10px] text-amber-400/90 font-mono tracking-wider">
                    [PBKDF2 SHA-256 &bull; 100K ROUNDS]
                  </span>
                </div>

                {/* VisionOS Floating Glass Command Capsule */}
                <div className="relative flex items-center rounded-2xl bg-white/[0.05] border border-white/[0.2] focus-within:border-amber-400/90 backdrop-blur-2xl shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_12px_32px_rgba(0,0,0,0.45)] focus-within:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.5),0_0_35px_rgba(245,158,11,0.3)] transition-all duration-300 p-1.5">
                  <div className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <div className="pl-3.5 pr-2 font-mono text-amber-400 select-none text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 opacity-90" />
                    <span>&gt;</span>
                  </div>

                  <input
                    type="text"
                    value={keyInput}
                    onChange={(e) => {
                      setKeyInput(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'decrypting' || status === 'scrambling'}
                    placeholder="Enter the combined key (e.g. clue1-clue2-clue3)"
                    className="flex-1 bg-transparent px-2 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-neutral-400 focus:outline-none tracking-wide"
                  />

                  {/* Liquid Amber Glass Pill CTA */}
                  <button
                    type="submit"
                    disabled={
                      !keyInput.trim() ||
                      status === 'decrypting' ||
                      status === 'scrambling'
                    }
                    className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 hover:from-amber-300 hover:to-orange-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/40 shadow-[0_8px_25px_rgba(245,158,11,0.45),inset_0_1.5px_1px_0_rgba(255,255,255,0.7)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.65),inset_0_1.5px_1px_0_rgba(255,255,255,0.9)] shrink-0 active:scale-95 cursor-pointer"
                  >
                    {/* Glass Bevel Refraction Sheen */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-xl" />

                    {status === 'decrypting' || status === 'scrambling' ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>ATTEMPT DECRYPTION</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-rose-400 pl-2 flex items-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage || 'Invalid key. Try looking deeper.'}</span>
                  </motion.p>
                )}
              </motion.form>
            )}
          </div>

          {/* Hint Area - VisionOS Frosted Disclosure Bar */}
          <div className="relative z-10 pt-3 border-t border-white/[0.1] space-y-3">
            {(() => {
              const isHintEligible = timeLeft <= 0;
              const formatTime = (secs: number) => {
                const m = Math.floor(secs / 60);
                const s = secs % 60;
                return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
              };

              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs font-sans text-neutral-300 flex items-center gap-2">
                    <span className="text-amber-400 font-mono text-sm">&ldquo;</span>
                    Everything you need is already here.
                    <span className="text-amber-400 font-mono text-sm">&rdquo;</span>
                  </p>

                  <div className="flex flex-col items-start sm:items-end gap-1.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isHintEligible) {
                          setShowLockedMessage(true);
                          setTimeout(() => setShowLockedMessage(false), 4500);
                          return;
                        }
                        setShowHint(!showHint);
                      }}
                      className={`inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border transition-all cursor-pointer backdrop-blur-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_6px_20px_rgba(0,0,0,0.3)] active:scale-95 select-none ${
                        !isHintEligible
                          ? 'border-white/[0.16] text-neutral-300 bg-white/[0.05] hover:border-amber-400/50 hover:bg-white/[0.1]'
                          : showHint
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/20'
                          : 'border-amber-400/60 text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 shadow-[0_0_25px_rgba(245,158,11,0.25)] animate-pulse'
                      }`}
                    >
                      {!isHintEligible ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-400/90" />
                          <span>[ Hint Unlocks in {formatTime(timeLeft)} ]</span>
                        </>
                      ) : (
                        <>
                          <Unlock
                            className={`w-3.5 h-3.5 ${
                              showHint ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          />
                          <span>{showHint ? '[ Hide Clue Guide ]' : '[ View Clue Guide 🔓 ]'}</span>
                        </>
                      )}
                    </button>

                    {!isHintEligible && showLockedMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-[11px] font-sans text-amber-200 bg-neutral-900/90 border border-amber-500/40 px-3.5 py-2 rounded-2xl text-left sm:text-right max-w-sm leading-relaxed shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl"
                      >
                        Hey, no shortcuts yet! 😉 Explore the portfolio to track down the 3 hidden words. The clue guide unlocks after you&apos;ve spent 5 minutes on the site (hang tight for {formatTime(timeLeft)})!
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Clue Guide (Revealed after 5 minutes) - VisionOS Bento Glass Tiles */}
            <AnimatePresence>
              {showHint && timeLeft <= 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-3xl bg-black/65 border border-white/[0.16] p-6 text-xs font-mono text-neutral-200 space-y-4 overflow-hidden backdrop-blur-3xl shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.1] pb-3">
                    <div className="text-emerald-400 font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>// 5-MINUTE EXPLORATION COMPLETE &bull; CLUE GUIDE UNLOCKED</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                      [ORDER: PROJECT &rarr; HACKATHONS &rarr; MARTIAL ART]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                    {/* Card 1: Direct Location Clues */}
                    <div className="relative overflow-hidden p-4 rounded-2xl bg-white/[0.04] border border-white/[0.14] hover:border-white/[0.28] space-y-2.5 backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-amber-400 font-bold tracking-wider uppercase">
                          01. THE 3 WORDS
                        </span>
                        <span className="text-[9px] text-neutral-400 font-mono uppercase">Locations</span>
                      </div>
                      <div className="space-y-2 text-xs text-neutral-200 font-sans leading-relaxed">
                        <p>
                          <strong className="text-white font-mono font-bold">Word 1: </strong>
                          In the <span className="text-amber-300 font-semibold">GenProof AI</span> card &rarr;{' '}
                          <code className="text-amber-300 font-mono bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/[0.15] shadow-sm">
                            PROOF
                          </code>
                        </p>
                        <p>
                          <strong className="text-white font-mono font-bold">Word 2: </strong>
                          In the <span className="text-amber-300 font-semibold">25+ Hackathons</span> card &rarr;{' '}
                          <code className="text-amber-300 font-mono bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/[0.15] shadow-sm">
                            PASSION
                          </code>
                        </p>
                        <p>
                          <strong className="text-white font-mono font-bold">Word 3: </strong>
                          In the <span className="text-amber-300 font-semibold">Silambam Medalist</span> milestone &rarr;{' '}
                          <code className="text-amber-300 font-mono bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/[0.15] shadow-sm">
                            DISCIPLINE
                          </code>
                        </p>
                      </div>
                      <div className="text-[10px] font-sans text-neutral-400 pt-2 border-t border-white/[0.08]">
                        Hovering these words on desktop triggers a subtle shimmer!
                      </div>
                    </div>

                    {/* Card 2: Combination & Format */}
                    <div className="relative overflow-hidden p-4 rounded-2xl bg-white/[0.04] border border-white/[0.14] hover:border-white/[0.28] space-y-2.5 backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-amber-400 font-bold tracking-wider uppercase">
                          02. COMBINE THEM
                        </span>
                        <span className="text-[9px] text-neutral-400 font-mono uppercase">Key Format</span>
                      </div>
                      <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                        Chain the three words together with hyphens or spaces:
                      </p>
                      <div className="p-3 rounded-xl bg-white/[0.06] border border-amber-400/40 font-mono text-center text-xs text-amber-300 font-bold select-all tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.15),inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                        PROOF-PASSION-DISCIPLINE
                      </div>
                      <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                        Flexible format: lowercase, uppercase, spaces (<code className="text-white">proof passion discipline</code>) or dashes all work!
                      </p>
                    </div>

                    {/* Card 3: Decrypt & Claim Coffee */}
                    <div className="relative overflow-hidden p-4 rounded-2xl bg-white/[0.04] border border-white/[0.14] hover:border-white/[0.28] space-y-2.5 backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-amber-400 font-bold tracking-wider uppercase">
                          03. DECRYPT &amp; WIN
                        </span>
                        <span className="text-[9px] text-neutral-400 font-mono uppercase">Unlock</span>
                      </div>
                      <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                        Paste the combined key into the input above and click <span className="text-white font-mono font-bold">[ATTEMPT DECRYPTION]</span>.
                      </p>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                        Once the message scrambler unlocks the secret payload, hit the coffee button to send me your solve!
                      </p>
                    </div>
                  </div>

                  {/* AI Assistant Solver Prompt Bar - VisionOS Spotlight Bar */}
                  <div className="pt-2 border-t border-white/[0.1] space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.14] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                          <Bot className="w-4 h-4 text-amber-400" />
                          <span>WANT AN LLM TO HELP CRACK IT?</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          Copy this pre-structured prompt with the ciphertext, parameters, and 3 discovered clue words to ChatGPT, Claude, or Gemini.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setShowAiPromptText(!showAiPromptText)}
                          className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs font-mono text-neutral-200 hover:text-white transition-all cursor-pointer active:scale-95 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]"
                        >
                          {showAiPromptText ? 'Hide Prompt' : 'Preview Prompt'}
                        </button>

                        <button
                          type="button"
                          onClick={handleCopyAiPrompt}
                          className="relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 hover:from-amber-300 hover:to-orange-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_18px_rgba(245,158,11,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.6)] border border-white/30 active:scale-95 cursor-pointer"
                        >
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full" />
                          {copiedAiPrompt ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                              <span className="text-emerald-300 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-white" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Prompt Preview */}
                    <AnimatePresence>
                      {showAiPromptText && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="rounded-2xl bg-black/85 border border-white/[0.14] p-4 font-mono text-[11px] text-neutral-200 whitespace-pre-wrap select-all leading-relaxed max-h-56 overflow-y-auto shadow-inner backdrop-blur-2xl"
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
      </div>
    </section>
  );
};

export default DecryptChallengeSection;
