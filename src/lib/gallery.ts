export type GalleryCategory =
  | "all"
  | "web-systems"
  | "ai-systems"
  | "sop-systems"
  | "dashboard-ui"
  | "mobile-responsive"
  | "academic-systems"
  | "operational";

export type GalleryItem = {
  id: string;
  title: string;
  subtitle?: string;
  category: GalleryCategory;
  imageSrc: string;
  projectSlug?: string;
  tags?: string[];
  /** Width weight for masonry: 1 = normal, 2 = wide */
  span?: 1 | 2;

  /* ── Extended detail fields ── */
  year?: string;
  role?: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoSrc?: string;

  /** Short elevator-pitch description */
  shortDescription?: string;
  /** Detailed project explanation (1-3 paragraphs) */
  detailedDescription?: string;
  /** Challenges faced during the project */
  challenges?: string[];
  /** Solutions implemented to overcome challenges */
  solutions?: string[];
  /** Full tech stack used */
  technologies?: string[];
  /** Key features of the project */
  features?: string[];
  /** Architecture / system design summary */
  architecture?: string;
  /** Development process / methodology */
  developmentProcess?: string;
  /** Results / impact of the project */
  results?: string[];
  /** Additional screenshots / media */
  screenshots?: string[];
  /** Device mockup images: { src, label, device: 'desktop'|'mobile'|'tablet' } */
  mockupImages?: Array<{ src: string; label?: string; device?: "desktop" | "mobile" | "tablet" | "dashboard" }>;
};

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "web-systems", label: "Web Systems" },
  { id: "dashboard-ui", label: "Dashboard UI" },
  { id: "operational", label: "Operational" },
  { id: "academic-systems", label: "Academic" },
  { id: "mobile-responsive", label: "Mobile" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "terangi-main",
    title: "Terangi",
    subtitle: "Social Support Platform",
    category: "web-systems",
    imageSrc: "/projects/terangi.png",
    projectSlug: "terangi",
    tags: ["Next.js", "React", "Privacy-first"],
    span: 2,
    year: "2026",
    role: "Full-Stack Developer & UI/UX Designer",
    client: "Social Impact Project",
    liveUrl: "https://terangi.vercel.app/",
    shortDescription:
      "A safe and anonymous digital platform designed to help people discover support, solutions, guidance, and hope for social issues.",
    detailedDescription:
      "Terangi is a privacy-first social support information platform built to provide accessible, centralized resources for individuals facing social and emotional challenges. The platform creates a calming, secure environment where users can find essential support anonymously — covering topics from mental health to community aid programs. Every design decision prioritizes user safety and emotional comfort, resulting in a platform that feels like a digital sanctuary rather than just a resource directory.",
    challenges: [
      "Creating a genuinely safe digital space that doesn't feel clinical or impersonal",
      "Implementing privacy-first architecture while maintaining meaningful content discovery",
      "Designing for emotional sensitivity — ensuring the UI calms rather than overwhelms",
      "Building accessible navigation for users in potentially distressed states",
    ],
    solutions: [
      "Implemented warm, calming color palettes with gentle micro-animations for emotional comfort",
      "Built anonymous browsing with zero tracking — no cookies, no analytics fingerprinting",
      "Designed progressive content disclosure to prevent information overload",
      "Created keyboard-first navigation and screen-reader optimized components",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel", "Privacy-first Architecture"],
    features: [
      "Anonymous browsing with zero tracking",
      "Categorized resource discovery",
      "Calming, accessibility-first UI",
      "Progressive content disclosure",
      "Mobile-responsive design",
      "Dark mode optimized",
    ],
    architecture:
      "Serverless JAMstack architecture deployed on Vercel with static generation for maximum performance. Content is structured in a modular, category-based system for easy scaling and maintenance.",
    developmentProcess:
      "Research-driven design process starting with user empathy mapping, followed by iterative prototyping with focus groups. Development used an agile sprint model with accessibility audits at every stage.",
    results: [
      "Created a calming, secure digital sanctuary for support discovery",
      "Achieved 100% Lighthouse accessibility score",
      "Zero-tracking architecture ensuring complete user privacy",
      "Sub-second page loads through static generation",
    ],
    screenshots: ["/projects/terangi.png"],
  },
  {
    id: "unpar-scraper-dashboard",
    title: "UNPAR Scraper",
    subtitle: "Publication Intelligence Dashboard",
    category: "academic-systems",
    imageSrc: "/projects/unpar-scraper-mockup.png",
    projectSlug: "unpar-scraper",
    tags: ["Python", "Flask", "React"],
    span: 1,
    year: "2025",
    role: "Full-Stack Developer & System Architect",
    client: "UNPAR University",
    videoSrc: "/projects/unpar-scraper.mp4",
    shortDescription:
      "An integrated platform for automated scraping, synchronization, and visualization of UNPAR lecturer publication data from multiple academic sources.",
    detailedDescription:
      "The UNPAR Scraper is a comprehensive publication intelligence system that automates the collection, synchronization, and visualization of academic publication data across multiple fragmented repositories. Before this system, tracking 48+ lecturers' publication outputs was a manual, error-prone process spread across isolated academic databases. This platform unifies everything into a single command-center dashboard with real-time monitoring, analytics, and intelligent search capabilities.",
    challenges: [
      "Scraping data from multiple heterogeneous academic sources with inconsistent structures",
      "Synchronizing real-time data across fragmented repositories without API access",
      "Building a performant dashboard that handles thousands of publication records",
      "Creating intelligent deduplication across different citation formats",
    ],
    solutions: [
      "Developed custom Selenium and BeautifulSoup4 scrapers with adaptive parsing strategies",
      "Implemented Socket.IO for real-time scraping progress and live data updates",
      "Built paginated, filterable dashboard with Recharts for analytics visualization",
      "Created fuzzy-matching deduplication engine using string similarity algorithms",
    ],
    technologies: [
      "Python", "Flask", "Selenium", "BeautifulSoup4", "React", "Vite",
      "PostgreSQL", "Recharts", "Socket.IO", "TypeScript",
    ],
    features: [
      "Automated multi-source scraping engine",
      "Real-time scraping progress via WebSocket",
      "Publication analytics & visualization",
      "Intelligent deduplication engine",
      "Lecturer profile management",
      "Export and reporting tools",
    ],
    architecture:
      "Microservice architecture with Python Flask backend handling scraping orchestration and a React Vite frontend for the intelligence dashboard. PostgreSQL for persistent storage with Socket.IO bridging real-time communication between scraping workers and the UI.",
    developmentProcess:
      "Started with reverse-engineering academic source structures, then built modular scrapers. The dashboard was developed iteratively — starting with data tables, then adding charts, real-time updates, and finally the command-center UI.",
    results: [
      "Automated monitoring of 48+ UNPAR lecturers' publications",
      "Unified data from 3+ fragmented academic repositories",
      "Real-time scraping with live progress tracking",
      "Reduced manual publication tracking effort by 95%",
    ],
    screenshots: ["/projects/unpar-scraper-mockup.png"],
  },
  {
    id: "plyledger-system",
    title: "PlyLedger",
    subtitle: "Plywood Trading Management",
    category: "operational",
    imageSrc: "/projects/plyledger.png",
    projectSlug: "plywood-trading",
    tags: ["Next.js", "TypeScript", "Prisma"],
    span: 1,
    year: "2026",
    role: "Full-Stack Developer",
    client: "Dwi Jaya Sukses Bersama",
    liveUrl: "https://ply-ledger.vercel.app/",
    shortDescription:
      "An enterprise trading and operational management system for plywood operations, finance, shipment workflows, and tracking.",
    detailedDescription:
      "PlyLedger is a comprehensive enterprise system built for Dwi Jaya Sukses Bersama to centralize their plywood trading operations. The system handles everything from financial bookkeeping and invoice management to shipment tracking and operational reporting. Before PlyLedger, the company relied on fragmented spreadsheets and manual processes — leading to missed shipments, inconsistent financial records, and slow reporting cycles.",
    challenges: [
      "Migrating from fragmented spreadsheet-based workflows to a unified system",
      "Handling complex multi-currency trading calculations with real-time rates",
      "Building a shipment tracking system that integrates with existing logistics processes",
      "Ensuring data integrity across financial transactions with audit trails",
    ],
    solutions: [
      "Designed a modular system architecture that maps to existing business processes",
      "Implemented Prisma ORM with PostgreSQL for robust, type-safe data operations",
      "Built real-time shipment tracking with status-based workflow automation",
      "Created comprehensive audit logging for all financial mutations",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Vercel"],
    features: [
      "Financial bookkeeping & invoice management",
      "Shipment tracking & logistics",
      "Customer & supplier management",
      "Comprehensive reporting dashboard",
      "Audit trail for all transactions",
      "Role-based access control",
    ],
    architecture:
      "Monolithic Next.js application with Prisma ORM connecting to PostgreSQL. Server-side rendering for dashboard performance with API routes handling business logic. Deployed on Vercel with database on Supabase.",
    developmentProcess:
      "Discovery phase with stakeholder interviews to map business processes, followed by database schema design, core CRUD operations, and iterative UI refinement based on operational feedback.",
    results: [
      "Centralized operations replacing 5+ fragmented spreadsheets",
      "Accelerated financial reporting from days to minutes",
      "Complete shipment visibility with real-time tracking",
      "Zero data loss with comprehensive audit trails",
    ],
    screenshots: ["/projects/plyledger.png"],
  },
  {
    id: "sop-dashboard",
    title: "SOP Verification",
    subtitle: "Operational Compliance Dashboard",
    category: "sop-systems",
    imageSrc: "/projects/sop-showcase.png",
    projectSlug: "sop-verification",
    tags: ["Next.js", "Supabase", "Mobile-first"],
    span: 2,
    year: "2026",
    role: "Full-Stack Developer",
    client: "F&B Operations",
    videoSrc: "/projects/sop-desktop.mp4",
    shortDescription:
      "A proof-based SOP management system where café employees upload photo evidence to validate operational procedures and daily tasks.",
    detailedDescription:
      "The SOP Verification System transforms how F&B businesses handle operational compliance. Instead of relying on checklists and trust, employees now photograph their completed tasks — creating an auditable, visual proof trail. Managers can review compliance in real-time from any device, identify bottlenecks, and ensure consistent operational standards across all shifts and locations.",
    challenges: [
      "Making SOP compliance effortless for frontline employees with varying tech literacy",
      "Handling large volumes of photo uploads without degrading mobile performance",
      "Building a review workflow that doesn't bottleneck busy managers",
      "Ensuring the system works reliably in low-connectivity café environments",
    ],
    solutions: [
      "Designed a mobile-first UI with large touch targets and minimal text input",
      "Implemented optimized image compression and progressive uploads",
      "Built smart notification system with batch review capabilities",
      "Added offline-capable PWA features with background sync",
    ],
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript", "Mobile-first PWA"],
    features: [
      "Photo-based task verification",
      "Real-time compliance dashboard",
      "Shift-based task scheduling",
      "Manager review & approval workflow",
      "Analytics & compliance scoring",
      "Multi-location support",
    ],
    architecture:
      "Next.js frontend with Supabase backend handling authentication, file storage, and real-time subscriptions. Optimized for mobile-first usage with progressive web app capabilities.",
    developmentProcess:
      "Ethnographic research in café environments to understand pain points, rapid prototyping with employee testing, iterative development with weekly stakeholder feedback cycles.",
    results: [
      "Improved employee accountability with visual proof trails",
      "Real-time operational visibility for managers",
      "Reduced compliance verification time by 80%",
      "Scalable system supporting multiple locations",
    ],
    screenshots: ["/projects/sop-showcase.png"],
  },
];
