import type { SectionId } from "@/lib/sections";

export const PROFILE = {
  name: "Hariharto Surya",
  location: "Bandung, Indonesia",
  title: "Web App & System Developer",
  tagline: "Building scalable, efficient, and impactful digital solutions.",
  email: "hariharto.surya@gmail.com",
  phone: "+62 811-333-156",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle",
  },
  cvUrl: "/Hariharto_Surya_CV.pdf",
  navCtas: {
    projects: "#projects",
    contact: "#contact",
  } satisfies Record<string, `#${SectionId}`>,
};

export const ABOUT = {
  intro:
    "I’m an Informatics Engineering undergraduate at Parahyangan Catholic University with hands-on experience delivering web products through academic and freelance projects—focused on building systems that feel fast, clear, and dependable.",
  focusAreas: [
    "Web Application Development",
    "System Architecture",
    "Database Design",
  ],
  strengths: [
    "Problem solving with pragmatic trade-offs",
    "Clean, maintainable code and predictable delivery",
    "Scalable systems thinking (performance, data, reliability)",
  ],
};

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "UI/UX", level: 4 },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", level: 3 },
      { name: "API Development", level: 4 },
      { name: "Python", level: 4 },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "SQL", level: 4 },
      { name: "PostgreSQL", level: 3 },
      { name: "MySQL", level: 3 },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", level: 4 },
      { name: "Vercel", level: 4 },
      { name: "Figma", level: 3 },
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
    title: "Python Developer — AI AutoCaption System (Freelance)",
    org: "International Client",
    time: "Jun 2025 — Aug 2025",
    summary:
      "Built an end-to-end AutoCaption AI pipeline combining speech-to-text and emotion overlays for dynamic subtitles.",
    bullets: [
      "Implemented transcription with OpenAI Whisper in a modular, reproducible setup.",
      "Integrated face detection + basic emotion tracking via facial landmarks.",
      "Composited video/audio overlays using MoviePy + OpenCV for final outputs.",
    ],
    tags: ["Python", "Whisper", "OpenCV", "MoviePy", "librosa", "dlib"],
  },
  {
    title: "Company Profile Website (Freelance)",
    org: "CV. Dwijaya Sukses Bersama",
    time: "Jan 2025",
    summary:
      "Delivered a responsive company profile site with a clean, professional layout and performance-first front-end implementation.",
    bullets: [
      "Built responsive UI tailored to stakeholder requirements.",
      "Optimized performance and usability for a fast browsing experience.",
      "Collaborated directly with stakeholders to iterate quickly.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Responsive UI", "Optimization"],
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

