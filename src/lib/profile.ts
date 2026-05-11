import type { SectionId } from "@/lib/sections";

export const PROFILE = {
  name: "Hariharto Surya",
  brand: "HS Labs",
  location: "Bandung, Indonesia",
  title: "Fullstack Developer • System Builder ",
  tagline: "Building Digital Systems for Real-World Solutions",
  email: "hariharto.surya@gmail.com",
  phone: "+62 811-333-156",
  socials: {
    github: "https://github.com/harihartosuryaangestiono",
    linkedin: "https://www.linkedin.com/in/hariharto-surya-25054624b",
    whatsapp: "https://wa.me/62811333156",
  },
  cvUrl: "/Hariharto_Surya_CV.pdf",
  navCtas: {
    projects: "#projects",
    contact: "#contact",
  } satisfies Record<string, `#${SectionId}`>,
};

export const ABOUT = {
  intro:
    "Informatics Engineering undergraduate with experience building real-world web applications, operational systems, and AI-powered solutions through freelance and academic projects.",
  focusAreas: [
    "Fullstack Web Development",
    "AI Systems",
    "Operational Management Systems",
    "UI/UX Design",
    "Business Workflow Solutions",
    "Problem Solving",
  ],
  strengths: [
    "Building systems and solving operational/business problems",
    "Architecting scalable and resilient solutions",
    "Delivering seamless cinematic digital experiences",
  ],
};

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "UI/UX Explorer", level: 4 },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", level: 4 },
      { name: "Python", level: 4 },
      { name: "JavaScript", level: 4 },
    ],
  },
  {
    group: "Database & Cloud",
    items: [
      { name: "SQL", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Supabase", level: 4 },
    ],
  },
  {
    group: "AI & Tech",
    items: [
      { name: "OpenAI API", level: 4 },
      { name: "AI Systems", level: 4 },
    ],
  },
] as const;

export type TimelineItem = {
  title: string;
  org: string;
  time: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
};

export const JOURNEY: TimelineItem[] = [
  {
    title: "Freelance Projects",
    org: "Independent",
    time: "Ongoing",
    summary:
      "Developing various operational systems, POS systems, laundry management systems, and QR wedding systems for real-world business needs.",
    tags: ["Fullstack", "System Builder", "Operations"],
  },
  {
    title: "AI AutoCaption System (Freelance)",
    org: "International Client",
    time: "Jun 2025 — Aug 2025",
    summary:
      "Built an end-to-end AutoCaption AI pipeline combining speech recognition, audio analysis, and facial emotion detection.",
    bullets: [
      "Implemented transcription with OpenAI Whisper.",
      "Integrated face detection and emotion tracking via facial landmarks.",
    ],
    tags: ["Python", "Whisper", "OpenCV", "librosa", "dlib"],
  },
  {
    title: "Company Profile Website (Freelance)",
    org: "CV. Dwijaya Sukses Bersama",
    time: "Jan 2025",
    summary:
      "Delivered a responsive company profile site with a clean, professional layout and performance-first front-end implementation.",
    tags: ["HTML", "CSS", "JavaScript", "Optimization"],
  },
  {
    title: "Head of Event — ISEC 2023",
    org: "Informatics Student Association",
    time: "2023",
    summary:
      "Led a sports & e-sports competition event; coordinated divisions, permissions, and execution planning.",
  },
  {
    title: "Vice Coordinator Logistics — FTIS Graduation Day",
    org: "Parahyangan Catholic University",
    time: "2023",
    summary:
      "Coordinated equipment procurement/borrowing, tracking, and accountability for event logistics.",
  },
];

