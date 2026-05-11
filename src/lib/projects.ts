export type ProjectCategory = "web-apps" | "systems" | "ai";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  problemSolved?: string;
  impact?: string;
  tags: string[];
  imageSrc: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "terangi",
    name: "Terangi — Social Support Information Platform",
    category: "web-apps",
    description: "A safe and anonymous digital platform designed to help people discover support, solutions, guidance, and hope for social issues.",
    problemSolved: "Lack of centralized, accessible, and privacy-first information for individuals facing social and emotional challenges.",
    impact: "Created a calming, secure environment for users to find essential resources and support anonymously.",
    tags: ["Next.js", "React", "Tailwind CSS", "Privacy-first", "UI/UX"],
    imageSrc: "/projects/dashboard.svg",
  },
  {
    slug: "sop-verification",
    name: "Operational SOP Verification System",
    category: "systems",
    description: "A proof-based SOP management system where café employees upload photo evidence to validate operational procedures and daily tasks.",
    problemSolved: "Manual and untrackable operational compliance in retail and F&B environments.",
    impact: "Improved employee accountability and streamlined operational verification workflows for management.",
    tags: ["Next.js", "PostgreSQL", "Supabase", "Workflows", "Mobile-first"],
    imageSrc: "/projects/inventory.svg",
  },
  {
    slug: "ai-autocaption",
    name: "AI AutoCaption & Emotion Detection",
    category: "ai",
    description: "An AI-powered automatic caption generation system combining speech recognition, audio analysis, and facial emotion detection.",
    problemSolved: "Time-consuming manual video subtitling and lack of automated emotional context analysis.",
    impact: "Enabled dynamic, context-aware subtitles and rapid video processing pipeline.",
    tags: ["Python", "OpenAI Whisper", "OpenCV", "dlib", "librosa"],
    imageSrc: "/projects/consultation.svg",
  },
  {
    slug: "plywood-trading",
    name: "Plywood Trading Management System",
    category: "systems",
    description: "An enterprise trading and operational management system for plywood operations, finance, shipment workflows, and tracking.",
    problemSolved: "Fragmented bookkeeping, missing audit trails, and slow manual shipment tracking.",
    impact: "Centralized operations, accelerated financial reporting, and improved shipment visibility.",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Prisma"],
    imageSrc: "/projects/plyledger.png",
    liveUrl: "https://ply-ledger.vercel.app/",
  },
  {
    slug: "pos-system",
    name: "Modern POS System",
    category: "systems",
    description: "A fast, intuitive point-of-sale system tailored for small-to-medium retail businesses with real-time inventory sync.",
    problemSolved: "Clunky legacy POS software with poor UX and slow checkout processes.",
    impact: "Sped up transaction times and simplified employee onboarding with a modern interface.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    imageSrc: "/projects/plyledger.svg",
  },
  {
    slug: "laundry-management",
    name: "Laundry Management System",
    category: "systems",
    description: "A complete management solution for laundry businesses, handling order tracking, customer notifications, and finance.",
    problemSolved: "Lost orders, disorganized tracking, and manual customer updates.",
    impact: "Automated status updates and improved order accuracy for better customer satisfaction.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    imageSrc: "/projects/inventory.svg",
  },
  {
    slug: "qr-wedding",
    name: "QR Wedding System",
    category: "web-apps",
    description: "A digital guest management system for weddings using personalized QR codes for RSVP, check-in, and seating arrangements.",
    problemSolved: "Chaotic manual guest check-ins and inaccurate RSVP tracking.",
    impact: "Ensured a smooth, elegant, and fast entry experience for guests while giving organizers real-time attendance data.",
    tags: ["Next.js", "QR Generation", "Real-time sync"],
    imageSrc: "/projects/consultation.svg",
  },
];

