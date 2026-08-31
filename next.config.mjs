/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', 'gsap'],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
