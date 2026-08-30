export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: string;
  problem: string;
  concept: string;
  solution: string;
  myRole: string;
  githubUrl?: string;
  demoUrl?: string;
  sceneType: 'landvault' | 'anonxpose' | 'genproof' | 'steganography' | 'rebal' | 'medtech';
}

export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  category: string;
  description: string;
  isCurrent?: boolean;
}

export interface AchievementItem {
  stat: string;
  label: string;
  subtitle: string;
  detail: string;
  tag?: string;
}

export interface PlaygroundItem {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoUrl: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Lakshan Ganesan',
    shortName: 'LAKSHAN G.',
    handle: 'LKG // 001',
    role: 'Full Stack Developer | AI & Blockchain',
    location: 'Coimbatore, India',
    year: '2026',
    status: 'AVAILABLE FOR SELECT PROJECTS',
    email: 'lakshanganesan05@gmail.com',
    phone: '+91 94862 23523',
    github: 'https://github.com/lakshangan',
    linkedin: 'https://www.linkedin.com/in/lakshan-ganesan23317524b/',
    twitter: 'https://x.com/lakshangan',
    instagram: 'https://instagram.com/lakshangan_',
    bioHeadline: 'FULL-STACK DEVELOPER BUILDING WITH AI & BLOCKCHAIN.',
    bioBody:
      'Building scalable full-stack web applications integrated with artificial intelligence and blockchain technology. I design intuitive frontends, robust backend systems, smart contract protocols, and intelligent AI features.',
  },

  heroMetadata: [
    { label: 'PORTFOLIO', value: '2026' },
    { label: 'LOCATION', value: 'COIMBATORE / INDIA' },
    { label: 'DISCIPLINE', value: 'FULL-STACK DEVELOPMENT' },
    { label: 'FOCUS', value: 'FULL STACK / AI / BLOCKCHAIN' },
    { label: 'SYSTEM', value: 'LKG // 001' },
  ],

  projects: [
    {
      id: 'jayam-website',
      number: '01',
      title: 'JAYAM WEBSITE',
      tagline: 'Full-stack corporate platform & bespoke web application.',
      description:
        'A full-stack corporate platform and web application built with modern responsive architecture and motion UI.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'],
      category: 'Full-Stack Web',
      sceneType: 'landvault',
      problem:
        'Traditional legacy business platforms lack modern web speed, responsive mobile adaptation, and interactive UX.',
      concept:
        'Architect a lightning-fast Next.js platform with modular component architecture and streamlined lead pipelines.',
      solution:
        'Engineered an enterprise-grade full-stack website delivering top core web vitals and zero-friction navigation.',
      myRole: 'Full-Stack Developer',
      githubUrl: 'https://github.com/lakshangan/jayam-website-',
      demoUrl: 'https://jayamwebsite.vercel.app/',
    },
    {
      id: 'land-vault',
      number: '02',
      title: 'LAND VAULT V2',
      tagline: 'Tokenizing real estate for decentralized finance.',
      description:
        'A smart contract system for transferring crypto assets and enabling fractionalized real estate ownership on EVM chains.',
      technologies: ['Solidity', 'Ethereum', 'React', 'Thirdweb', 'Hardhat'],
      category: 'Smart Contracts / DeFi',
      sceneType: 'landvault',
      problem:
        'High capital entry barriers and severe illiquidity in traditional real estate prevent fractional participation.',
      concept:
        'Represent physical land deeds as ERC-721/ERC-1155 tokenized vaults with automated yield distribution.',
      solution:
        'Architected fractionalized asset vaults with automated rental dividend distribution and zero-friction secondary trading.',
      myRole: 'Full-Stack & Smart Contract Developer',
      githubUrl: 'https://github.com/lakshangan/Land-vault-v2',
      demoUrl: 'https://land-vault-v2.vercel.app/',
    },
    {
      id: 'nuna-organic',
      number: '03',
      title: 'NUNA NATURAL HAVEN',
      tagline: 'Bespoke organic product showcase & event platform.',
      description:
        'Special event showcase platform with bespoke motion transitions, dynamic gallery layout, and e-commerce UI.',
      technologies: ['React', 'CSS Grid', 'GSAP', 'Tailwind', 'JavaScript'],
      category: 'Web Design & Motion',
      sceneType: 'rebal',
      problem:
        'Organic wellness brands struggle to convey visual product quality through static boilerplate e-commerce templates.',
      concept:
        'Interactive narrative storytelling paired with smooth GSAP scroll triggers and fluid gallery layouts.',
      solution:
        'Delivered a bespoke digital showcase increasing user session engagement and brand presentation depth.',
      myRole: 'Frontend & Motion Developer',
      githubUrl: 'https://github.com/lakshangan/nuna-natural-haven',
      demoUrl: 'https://nunaorganic.vercel.app/',
    },
    {
      id: 'medtech-ai',
      number: '04',
      title: 'MEDIOCTO AI',
      tagline: 'Intelligent AI mental health support companion.',
      description:
        'Context-aware AI mental health support chat interface featuring an interactive animated octopus companion.',
      technologies: ['LLMs', 'Generative AI', 'Next.js', 'Python', 'Tailwind'],
      category: 'Healthcare AI',
      sceneType: 'medtech',
      problem:
        'Traditional mental health intake chatbots feel robotic, clinical, and intimidating for young users.',
      concept:
        'Empathetic conversational LLM agent paired with an interactive animated companion character.',
      solution:
        'Designed an intuitive chat interface enabling supportive dialogue, emotional tracking, and instant coping guidance.',
      myRole: 'Full-Stack AI Developer',
      githubUrl: 'https://github.com/lakshangan',
      demoUrl: 'https://mediocto-lovat.vercel.app/',
    },
    {
      id: 'genproof-ai',
      number: '05',
      title: 'GENPROOF.AI',
      tagline: 'Content provenance and C2PA verification.',
      description:
        'Cryptographic content credentials engine detecting AI-generated synthetic media and verifying asset origin.',
      technologies: ['Python', 'C2PA Standards', 'Next.js', 'AI/ML', 'OpenCV'],
      category: 'AI & Provenance',
      sceneType: 'genproof',
      problem:
        'Generative AI proliferation corrupts visual media authenticity, leaving news organizations without origin verification.',
      concept:
        'Embed tamper-proof cryptographic manifest metadata inside image EXIF payloads backed by on-chain root hashes.',
      solution:
        'Engineered an instant verification drag-and-drop audit platform parsing C2PA manifest history and neural model signatures.',
      myRole: 'Full-Stack AI & Provenance Developer',
      githubUrl: 'https://github.com/lakshangan',
      demoUrl: 'https://gen-proof-ai.vercel.app/',
    },
    {
      id: 'steganography-cli',
      number: '06',
      title: 'STEGANOGRAPHY CLI',
      tagline: 'Experimental hidden-information security tooling.',
      description:
        'A Python CLI tool securely hiding and extracting secret encrypted payloads inside digital image pixels via LSB techniques.',
      technologies: ['Python', 'Cryptography', 'Pillow', 'LSB Algorithm'],
      category: 'Information Security',
      sceneType: 'steganography',
      problem:
        'Standard encryption alerts adversarial surveillance by displaying obvious ciphertext envelopes.',
      concept:
        'LSB (Least Significant Bit) spatial domain modification to embed AES-256 encrypted bytes silently into image RGB channels.',
      solution:
        'Delivered a lightweight CLI tool supporting multi-format image steganography with zero visual perceptual degradation.',
      myRole: 'Full-Stack Security Developer',
      githubUrl: 'https://github.com/lakshangan/steganography',
      demoUrl: 'https://github.com/lakshangan/steganography',
    },
  ] as Project[],

  experience: [
    {
      year: '2026',
      company: 'OpenLedger',
      role: 'Twitter & Technical Researcher',
      category: 'Full-Stack & Web3 Research',
      description:
        'Leading technical research on Web3 protocols, AI data pipelines, DeFi ecosystems, and executing content strategy for official X operations.',
      isCurrent: true,
    },
    {
      year: '2025',
      company: 'Uniswap Foundation',
      role: 'Uniswap Hook Incubator Cohort',
      category: 'DeFi / Full-Stack & Smart Contracts',
      description:
        'Selected for specialized program speedrunning Uniswap v4 architecture. Built custom liquidity hooks and dynamic fee modules.',
    },
    {
      year: '2024',
      company: 'Vodafone Idea Foundation',
      role: 'Full-Stack & Blockchain Engineering Intern',
      category: 'Distributed Systems',
      description:
        '4-week intensive virtual internship exploring enterprise ledger architectures, smart contract security, and decentralized data storage.',
    },
    {
      year: '2024',
      company: 'FAMS Private Limited',
      role: 'SAP Basis System Analyst',
      category: 'Enterprise Infrastructure',
      description:
        'Gained hands-on exposure to enterprise server infrastructure, database performance tuning, and SAP landscape management.',
    },
  ] as ExperienceItem[],

  achievements: [
    {
      stat: '25+',
      label: 'HACKATHONS',
      subtitle: 'Build & Ship Marathons',
      detail: 'Competed in over 25 national and international Web3, AI, and creative technology hackathons.',
    },
    {
      stat: '20+',
      label: 'FINALIST FINISHES',
      subtitle: 'Top-Tier Placements',
      detail: 'Consistent finalist placements delivering high-impact prototypes under high-pressure time limits.',
    },
    {
      stat: '01',
      label: 'TRACK WINNER',
      subtitle: 'Build On Chain @ NIT Calicut',
      detail: "Won 1st Place Track Prize at Kerala's premier Web3 hackathon for smart contract innovation.",
      tag: 'WINNER',
    },
    {
      stat: '01',
      label: 'SIH FINALIST',
      subtitle: 'Smart India Hackathon 2023',
      detail: "Selected as National Finalist in India's flagship government innovation initiative.",
      tag: 'NATIONAL',
    },
    {
      stat: '01',
      label: 'UNESCO-IOC SELECTION',
      subtitle: 'Circle Global Platform',
      detail: 'Selected globally for the UNESCO Intergovernmental Oceanographic Commission ocean literacy network.',
      tag: 'GLOBAL',
    },
  ] as AchievementItem[],

  playground: [
    {
      number: '01',
      title: 'SBK BIRTHDAY 3D',
      category: 'Three.js / Audio-Visual',
      description: 'Interactive 3D audio-visual particle system with spatial audio triggers and custom shaders.',
      tech: ['Three.js', 'Web Audio API', 'GSAP'],
      demoUrl: 'https://sbk-hd.vercel.app',
    },
    {
      number: '02',
      title: 'INTERNOCTO',
      category: 'React / Creative Chaos',
      description: "The official chaotic portfolio for OpenLedger's octopus mascot. High-energy motion & meme-tech.",
      tech: ['React', 'Framer Motion', 'Tailwind'],
      demoUrl: 'https://internocto-portfolio.vercel.app',
    },
    {
      number: '03',
      title: 'IPHONE 3D SHOP',
      category: 'R3F / Product Motion',
      description: 'Immersive 3D product showcase featuring dynamic camera orbits and GSAP scroll transitions.',
      tech: ['React Three Fiber', 'Drei', 'GSAP'],
      demoUrl: 'https://antigravity-test-alpha.vercel.app',
    },
    {
      number: '04',
      title: 'MEDIOCTO AI',
      category: 'AI / Companion Interface',
      description: 'AI mental health support chat interface featuring an interactive animated octopus companion.',
      tech: ['Next.js', 'LLM API', 'Tailwind'],
      demoUrl: 'https://mediocto-lovat.vercel.app/',
    },
    {
      number: '05',
      title: 'NUNA ORGANIC',
      category: 'Web Design / Event',
      description: 'Special event showcase platform with bespoke motion transitions and dynamic gallery layout.',
      tech: ['React', 'CSS Grid', 'GSAP'],
      demoUrl: 'https://nunaorganic.vercel.app/',
    },
  ] as PlaygroundItem[],

  techArsenal: [
    'SOLIDITY',
    'REACT',
    'NEXT.JS',
    'THREE.JS',
    'TYPESCRIPT',
    'NODE.JS',
    'ETHEREUM',
    'WEB3',
    'AI / LLMS',
    'PYTHON',
    'GSAP',
    'HARDHAT',
    'C2PA',
    'TAILWIND CSS',
  ],
};
