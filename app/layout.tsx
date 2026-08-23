import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://lakshan-dev.vercel.app'),
  title: 'Lakshan Ganesan — Creative Developer, Web3 & AI',
  description:
    'Cinematic Personal Portfolio of Lakshan Ganesan. Creative Developer & Web3 Research Analyst engineering decentralized intelligence, smart contracts, and high-end interactive digital experiences.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  keywords: [
    'Lakshan Ganesan',
    'Creative Developer',
    'Web3',
    'AI Developer',
    'Blockchain',
    'Solidity',
    'React Three Fiber',
    'Three.js',
    'Portfolio',
  ],
  authors: [{ name: 'Lakshan Ganesan' }],
  openGraph: {
    title: 'Lakshan Ganesan — Creative Developer, Web3 & AI',
    description:
      'Cinematic Personal Portfolio of Lakshan Ganesan. Creative Developer & Web3 Research Analyst.',
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
    title: 'Lakshan Ganesan — Creative Developer, Web3 & AI',
    description:
      'Cinematic Personal Portfolio of Lakshan Ganesan. Creative Developer & Web3 Research Analyst.',
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
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-[#08080a] text-[#f5f5f7] antialiased selection:bg-[#C75B32] selection:text-white font-sans">
        {/* Subtle Film Grain Noise Overlay */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
