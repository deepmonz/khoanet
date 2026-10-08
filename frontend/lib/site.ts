// Central content for the site. Items marked TODO need the owner's real details.

export const site = {
  name: "Khoa", // TODO: confirm display name
  domain: "khoa.net",
  email: "hr@khoa.net",
  role: "Full-stack developer",
  title: "Khoa — Full-stack developer for business software, marketplaces & AI",
  description:
    "I design, build and deploy business systems, marketplaces, AI automation and mobile games — from spec to production, with Next.js, FastAPI and MongoDB.",
  url: "https://khoa.net",
  socials: {
    github: "https://github.com/deepmonz", // TODO: confirm public profile
  },
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export const categories = [
  "Flower Industry",
  "Business Software",
  "Marketplace & Fintech",
  "AI & Automation",
  "Mobile Games",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Hue (0–360) used to tint the placeholder visual until screenshots exist. */
  hue: number;
  featured?: boolean;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "floramarket",
    title: "FloraMarket",
    category: "Flower Industry",
    summary:
      "A managed B2B marketplace for fresh-cut flowers sourced from Kunming and Da Lat — dual-currency pricing, minimum-order rules, packing and logistics fees, and a full admin control plane between buyers and growers.",
    highlights: ["Cross-border sourcing", "CNY ↔ VND pricing", "Async order pipeline", "Installable PWA"],
    stack: ["Next.js", "TypeScript", "FastAPI", "MongoDB", "Celery", "Redis", "MinIO"],
    hue: 330,
    featured: true,
  },
  {
    slug: "maket-global",
    title: "Maket Global",
    category: "Marketplace & Fintech",
    summary:
      "A digital-asset marketplace settled in USDT (TRC20) with escrow holds, a double-entry ledger, KYC, disputes, warranty windows and withdrawals.",
    highlights: ["Escrow payments", "Double-entry ledger", "KYC & disputes", "Crypto payouts"],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Celery", "MinIO", "Docker"],
    hue: 160,
    featured: true,
  },
  {
    slug: "hoahoa-flower-erp",
    title: "HoaHoa Flower ERP",
    category: "Flower Industry",
    summary:
      "Wholesale and retail operations for flower importers: tiered pricing, customer credit, first-expiry-first-out batch inventory, unit conversion from crates to stems, a partner API and accounting reports.",
    highlights: ["FEFO batch inventory", "Tiered pricing", "Customer credit", "Partner API"],
    stack: ["Next.js", "FastAPI", "MongoDB", "Motor"],
    hue: 285,
    featured: true,
  },
  {
    slug: "restaurant-os",
    title: "Restaurant OS",
    category: "Business Software",
    summary:
      "Operations platform for a European steakhouse: table service, kitchen display, recipe-based stock deduction, perishable batches and split bills — in English, Spanish and French.",
    highlights: ["Kitchen display", "Recipe-based stock", "Split bills", "EN · ES · FR"],
    stack: ["Next.js", "FastAPI", "MongoDB", "Docker", "Nginx"],
    hue: 20,
    featured: true,
  },
  {
    slug: "construction-procurement",
    title: "Construction Procurement & AP",
    category: "Business Software",
    summary:
      "Purchasing, multi-round deliveries, site warehouses and accounts payable for a general contractor, with live dashboards and Excel export.",
    highlights: ["Purchase orders", "Site inventory", "Payables tracking", "Excel export"],
    stack: ["Next.js", "React 19", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic"],
    hue: 45,
  },
  {
    slug: "flower-shop",
    title: "Flower Shop Platform",
    category: "Flower Industry",
    summary:
      "Online storefront with a back-office for a flower retailer: catalogue, orders, sales analytics, QR codes and email notifications.",
    highlights: ["Storefront + admin", "Sales analytics", "QR codes", "Email flows"],
    stack: ["Next.js", "shadcn/ui", "FastAPI", "MongoDB"],
    hue: 350,
  },
  {
    slug: "ai-deal-scanner",
    title: "AI Deal Scanner",
    category: "AI & Automation",
    summary:
      "A daily crawler for newly listed online businesses. LLMs extract and score each business model, check competitors and search trends, then deliver a digest by Telegram and email.",
    highlights: ["LLM scoring", "Competitor checks", "Trend signals", "Telegram digests"],
    stack: ["Node.js", "TypeScript", "Claude API", "OpenAI", "Telegram"],
    hue: 200,
  },
  {
    slug: "short-video-pipeline",
    title: "Short-video Localization Pipeline",
    category: "AI & Automation",
    summary:
      "An automated pipeline that collects short videos, writes Vietnamese titles, adds AI voice-over and music, and prepares them for publishing on TikTok Vietnam.",
    highlights: ["Batch processing", "AI voice-over", "Auto titles", "Publishing-ready output"],
    stack: ["Python", "AI TTS", "Automation"],
    hue: 255,
  },
  {
    slug: "mobile-games",
    title: "Mobile Games",
    category: "Mobile Games",
    summary: "Mobile titles built with Unity and Cocos Creator. Case studies coming soon.", // TODO: real titles
    highlights: ["Unity", "Cocos Creator", "iOS & Android"],
    stack: ["Unity", "C#", "Cocos Creator", "TypeScript"],
    hue: 110,
    comingSoon: true,
  },
];

export const services = [
  {
    title: "Custom ERP & admin systems",
    body: "Inventory, orders, pricing, credit, accounting and role-based back-offices — modelled on how your business actually runs.",
    tags: ["Inventory", "Accounting", "RBAC", "Reports"],
    icon: "layers",
  },
  {
    title: "Marketplaces & payments",
    body: "Multi-sided platforms with escrow, ledgers, KYC, disputes and payouts — fiat or crypto.",
    tags: ["Escrow", "Ledger", "USDT"],
    icon: "wallet",
  },
  {
    title: "AI & automation",
    body: "LLM-powered pipelines, scrapers, scoring and notification bots that replace hours of manual work.",
    tags: ["LLMs", "Scraping", "Bots"],
    icon: "bot",
  },
  {
    title: "Mobile games",
    body: "Casual and mid-core games with Unity and Cocos, from prototype to store release.",
    tags: ["Unity", "Cocos"],
    icon: "gamepad",
  },
  {
    title: "Websites & WordPress",
    body: "Fast marketing sites, landing pages and WordPress builds that are easy for your team to edit.",
    tags: ["Next.js", "WordPress", "SEO"],
    icon: "globe",
  },
] as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Celery",
  "Docker",
  "Nginx",
  "Linux VPS",
  "MinIO",
  "Unity",
  "Cocos Creator",
  "WordPress",
  "HTML / CSS",
  "Claude API",
  "OpenAI",
];

export const steps = [
  { step: "01", title: "Discovery", body: "We map your workflow, users and data. You get a clear scope and estimate." },
  { step: "02", title: "Spec", body: "A written technical spec and data model, reviewed with you before any code." },
  { step: "03", title: "Build", body: "Weekly demos on a staging server, so you see progress instead of hearing about it." },
  { step: "04", title: "Deploy", body: "Docker, Nginx, SSL and backups on your own server or cloud — you own everything." },
  { step: "05", title: "Support", body: "Monitoring, fixes and new features after launch, on a plan that fits you." },
];
