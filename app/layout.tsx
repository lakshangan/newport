import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lakshan-dev.vercel.app'),
  title: 'Lakshan Ganesan | Full Stack Developer (AI & Blockchain)',
  description:
    'Portfolio of Lakshan Ganesan. Full Stack Developer engineering scalable web applications, artificial intelligence systems, and blockchain protocols.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'Lakshan Ganesan',
    'Full Stack Developer',
    'AI Developer',
    'Blockchain Developer',
    'React',
    'Next.js',
    'Node.js',
    'Solidity',
    'Three.js',
    'Portfolio',
  ],
  authors: [{ name: 'Lakshan Ganesan' }],
  openGraph: {
    title: 'Lakshan Ganesan | Full Stack Developer (AI & Blockchain)',
    description:
      'Portfolio of Lakshan Ganesan. Full Stack Developer engineering scalable web applications, AI systems, and blockchain protocols.',
    url: 'https://lakshan-dev.vercel.app',
    siteName: 'Lakshan Ganesan Portfolio',
    images: [
      {
        url: '/images/hero_portrait.jpg',
        width: 1200,
        height: 1600,
        alt: 'Lakshan Ganesan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshan Ganesan | Full Stack Developer (AI & Blockchain)',
    description:
      'Portfolio of Lakshan Ganesan. Full Stack Developer engineering scalable web applications, AI systems, and blockchain protocols.',
    creator: '@lakshangan',
    images: ['/images/hero_portrait.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-[#050505] text-[#f5f5f7] antialiased selection:bg-[#C75B32] selection:text-white font-sans">
        {/* Subtle Film Grain Noise Overlay */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
