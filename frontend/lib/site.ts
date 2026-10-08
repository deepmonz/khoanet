// Central content for the site. Items marked TODO need the owner's real details.
// Positioning: founder site for Flomrg — software built inside the owner's own flower
// businesses (Hoa Mera, Mộc An), now being turned into a product. Used for startup funding.

export const site = {
  name: "Khoa", // TODO: confirm display name
  product: "Flomrg",
  domain: "khoa.net",
  email: "hr@khoa.net",
  role: "Founder, Flomrg",
  title: "Khoa — Founder of Flomrg, the operating system for flower businesses",
  description:
    "I run two flower businesses in Vietnam on software I built myself. Flomrg turns it into a product for every flower shop, wholesaler and importer.",
  url: "https://khoa.net",
  socials: {
    github: "https://github.com/deepmonz", // TODO: confirm public profile
  },
};

export const nav = [
  { label: "Product", href: "/#product" },
  { label: "Traction", href: "/#traction" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Founder", href: "/#founder" },
  { label: "Work", href: "/work" },
];

/** The founder's own businesses that run on Flomrg in production. */
export const businesses = [
  {
    name: "Hoa Mera",
    url: "https://hoamera.com",
    domain: "hoamera.com",
    tagline: "Imported fresh flowers",
    body: "Imports fresh flowers and sells them wholesale and retail. Pricing, batches, wastage, customer credit and accounts all run on Flomrg.",
    hue: 25,
  },
  {
    name: "Mộc An",
    url: "https://mocan.shop",
    domain: "mocan.shop",
    tagline: "Floral supply co.",
    body: "Supplies flower shops. 155 partner shops order directly through the Flomrg partner API, each seeing its own negotiated prices.",
    hue: 150,
  },
];

/**
 * Traction numbers shown in the "Traction" section. Fill in real figures from Flomrg's
 * reports (revenue by month, orders, stock movements). Entries with `value: null` are hidden.
 * Never put estimated or made-up numbers here — funders will verify them.
 */
export const traction: { label: string; value: number | null; suffix?: string }[] = [
  { label: "Flower businesses running on Flomrg", value: 2 },
  { label: "Months in daily production use", value: 6 },
  { label: "Orders processed", value: 3280, suffix: "+" },
  { label: "Wholesale customers managed", value: 835, suffix: "+" },
  { label: "Partner shops ordering via API", value: 155 },
  { label: "Reduction in flower wastage", value: 10, suffix: "%" },
];

export const problems = [
  {
    title: "Stock that dies in days",
    body: "Fresh flowers last days, not months. Without batch and expiry tracking, shops sell the wrong stock first and throw the rest away.",
  },
  {
    title: "Two price books at once",
    body: "The same shop sells retail and wholesale. Prices change by customer type and order size, and staff calculate them by hand.",
  },
  {
    title: "Trade runs on credit",
    body: "Wholesale customers take goods now and pay later. Debts live in notebooks and chat messages, and cash flow is a guess.",
  },
  {
    title: "Units that never match",
    body: "Flowers arrive by the crate, sell by the bunch and by the stem. Generic POS tools can't convert between them, so stock counts drift.",
  },
];

export const features = [
  {
    title: "Batch inventory, first-expiry-first-out",
    body: "Every delivery is a batch with an expiry date. Sales automatically take the oldest stock first, and wastage is recorded instead of disappearing.",
    tags: ["FEFO", "Wastage log", "Stock ledger"],
    icon: "boxes",
  },
  {
    title: "Automatic wholesale pricing",
    body: "Retail, wholesale and tiered prices. When an order passes a threshold, the whole order switches to wholesale prices, calculated on the server.",
    tags: ["Price tiers", "Thresholds"],
    icon: "tags",
  },
  {
    title: "Customer credit",
    body: "Sell now, collect later. Every customer has a running balance, payments and due debts.",
    tags: ["Debt", "Payments"],
    icon: "wallet",
  },
  {
    title: "Unit conversion",
    body: "Buy in crates, sell in bunches or stems. Stock is stored in one base unit and converted automatically.",
    tags: ["Crate → stem"],
    icon: "scale",
  },
  {
    title: "Accounting & reports",
    body: "Profit and loss, cash flow, revenue by product and staff, expenses and inventory value.",
    tags: ["P&L", "Cash flow", "Staff"],
    icon: "chart",
  },
  {
    title: "Partner API & webhooks",
    body: "Retail shops order directly from their supplier with their own prices, and get signed webhooks when an order is confirmed.",
    tags: ["B2B ordering", "Webhooks"],
    icon: "plug",
  },
  {
    title: "Roles & permissions",
    body: "Admin, manager, sales and warehouse roles. Sales staff only see their own orders; warehouse staff only touch stock.",
    tags: ["4 roles", "Audit-friendly"],
    icon: "shield",
  },
] as const;

export const roadmap = [
  {
    step: "Live",
    title: "Running two businesses",
    body: "Flomrg runs Hoa Mera and Mộc An every day — sales, stock, credit and accounts.",
  },
  {
    step: "Next",
    title: "Pilot shops",
    body: "Onboard independent flower shops as full Flomrg users, starting with the 155 shops that already order from Mộc An.",
  },
  {
    step: "Next",
    title: "Multi-tenant SaaS",
    body: "One platform with self-serve sign-up and a monthly subscription, instead of one installation per business.",
  },
  {
    step: "Building",
    title: "FloraMarket",
    body: "A wholesale marketplace connecting growers and importers in Da Lat and Kunming with flower shops.",
  },
  {
    step: "Planned",
    title: "Southeast Asia",
    body: "Take the same model to flower markets across the region.",
  },
];

export const capabilities = [
  "FEFO batch inventory",
  "Wastage tracking",
  "Retail & wholesale pricing",
  "Customer credit",
  "Crate → bunch → stem",
  "Partner API",
  "Signed webhooks",
  "Profit & loss",
  "Cash flow",
  "Role-based access",
  "Installable web app",
  "Multi-business ready",
];

export const categories = [
  "Flower Industry",
  "Business Software",
  "Marketplace & Fintech",
  "AI & Automation",
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
    slug: "flomrg",
    title: "Flomrg",
    category: "Flower Industry",
    summary:
      "The operating system behind Hoa Mera and Mộc An: wholesale and retail pricing, customer credit, first-expiry-first-out batch inventory, crate-to-stem unit conversion, a partner API and accounting reports.",
    highlights: ["Live in 2 businesses", "3,280+ orders", "155 partner shops", "FEFO batch inventory"],
    stack: ["Next.js", "FastAPI", "MongoDB", "Docker"],
    hue: 285,
    featured: true,
  },
  {
    slug: "floramarket",
    title: "FloraMarket",
    category: "Flower Industry",
    summary:
      "In development: a managed B2B marketplace for fresh-cut flowers sourced from Kunming and Da Lat — dual-currency pricing, minimum-order rules, packing and logistics fees, and an admin control plane between buyers and growers.",
    highlights: ["Cross-border sourcing", "CNY ↔ VND pricing", "Async order pipeline", "Installable PWA"],
    stack: ["Next.js", "TypeScript", "FastAPI", "MongoDB", "Celery", "Redis", "MinIO"],
    hue: 330,
    featured: true,
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
    slug: "restaurant-os",
    title: "Restaurant OS",
    category: "Business Software",
    summary:
      "Operations platform for a European steakhouse: table service, kitchen display, recipe-based stock deduction, perishable batches and split bills — in English, Spanish and French.",
    highlights: ["Kitchen display", "Recipe-based stock", "Split bills", "EN · ES · FR"],
    stack: ["Next.js", "FastAPI", "MongoDB", "Docker", "Nginx"],
    hue: 20,
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
    slug: "maket-global",
    title: "Maket Global",
    category: "Marketplace & Fintech",
    summary:
      "A digital-asset marketplace settled in USDT (TRC20) with escrow holds, a double-entry ledger, KYC, disputes, warranty windows and withdrawals.",
    highlights: ["Escrow payments", "Double-entry ledger", "KYC & disputes", "Crypto payouts"],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Celery", "MinIO", "Docker"],
    hue: 160,
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
      "An automated pipeline that collects short flower videos, writes Vietnamese titles, adds AI voice-over and music, and prepares them for publishing on TikTok Vietnam.",
    highlights: ["Batch processing", "AI voice-over", "Auto titles", "Publishing-ready output"],
    stack: ["Python", "AI TTS", "Automation"],
    hue: 255,
  },
];
