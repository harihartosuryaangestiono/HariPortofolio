export type ProjectCategory = "web-apps" | "systems";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  features?: Array<{
    label: string;
    icon:
      | "rbac"
      | "dashboard"
      | "sales"
      | "payments"
      | "smart-input"
      | "realtime-calc";
  }>;
  tags: string[];
  imageSrc: string;
  liveUrl: string;
  githubUrl?: string;
  caseStudyUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "plyledger",
    name: "PlyLedger — Plywood Trading Bookkeeping System",
    category: "systems",
    description:
      "A modern web-based bookkeeping and trading management system for the plywood industry, featuring role-based access, financial dashboard, and transaction tracking.",
    features: [
      { label: "Role-Based Access", icon: "rbac" },
      { label: "Financial Dashboard", icon: "dashboard" },
      { label: "Sales & Purchases", icon: "sales" },
      { label: "Payment Tracking", icon: "payments" },
      { label: "Smart Product Input", icon: "smart-input" },
      { label: "Real-time Calculation", icon: "realtime-calc" },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL/Supabase", "Prisma", "Vercel"],
    imageSrc: "/projects/plyledger.png",
    liveUrl: "https://ply-ledger.vercel.app/",
    githubUrl: "https://github.com/example/plyledger",
    caseStudyUrl: "https://example.com",
  },
  {
    slug: "inventory-management-system",
    name: "Inventory Management System",
    category: "systems",
    description:
      "A robust stock + purchase workflow with audit trails, role-based access, and real-time low-stock signals—built for operational clarity at scale.",
    tags: ["Next.js", "PostgreSQL", "RBAC", "Queues", "Prisma"],
    imageSrc: "/projects/inventory.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/inventory-system",
  },
  {
    slug: "social-consultation-platform",
    name: "Social Consultation Platform",
    category: "web-apps",
    description:
      "A consultation marketplace with scheduling, secure messaging, and admin tooling—designed for trust, speed, and delightful UX.",
    tags: ["Next.js", "Node.js", "WebSockets", "Stripe", "S3"],
    imageSrc: "/projects/consultation.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/consultation-platform",
  },
  {
    slug: "ecommerce-dashboard",
    name: "E-commerce Dashboard",
    category: "web-apps",
    description:
      "A metrics-forward dashboard for orders, customers, and product performance with snappy filtering, charts, and thoughtful data density.",
    tags: ["React", "Next.js", "Tailwind", "PostgreSQL", "ETL"],
    imageSrc: "/projects/dashboard.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ecommerce-dashboard",
  },
];

