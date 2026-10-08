import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChartColumn,
  Mail,
  Plug,
  Scale,
  ShieldCheck,
  Tags,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedTerminal } from "@/components/animated-terminal";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CountUp, Reveal, SpotlightCard } from "@/components/fx";
import { HeroVisual } from "@/components/hero-visual";
import { SectionHeading } from "@/components/section-heading";
import { businesses, capabilities, features, problems, roadmap, site, traction } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  boxes: Boxes,
  tags: Tags,
  wallet: Wallet,
  scale: Scale,
  chart: ChartColumn,
  plug: Plug,
  shield: ShieldCheck,
};

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />
      <Problem />
      <Product />
      <Traction />
      <Engineering />
      <Roadmap />
      <Founder />
      <Contact />
    </>
  );
}

function LiveDot() {
  return (
    <span className="relative grid size-1.5 place-items-center">
      <span className="absolute size-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
      <span className="size-1.5 rounded-full bg-emerald-400" />
    </span>
  );
}

function Hero() {
  return (
    <section className="noise relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)] blur-2xl" />
      <div className="absolute -right-40 top-40 -z-10 h-[420px] w-[620px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
        <HeroVisual />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/60 px-3 py-1 text-xs text-muted backdrop-blur">
              <LiveDot />
              Live at {businesses.map((b) => b.domain).join(" · ")}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
              Built inside a flower business. <span className="text-gradient">Made for all of them.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m {site.name}. I run two flower businesses in Vietnam — {businesses[0].name} and{" "}
              {businesses[1].name} — on software I designed and built myself. {site.product} is that software, now
              becoming a product for every flower shop, wholesaler and importer.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fg px-6 text-sm font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition hover:opacity-90"
              >
                Invest or partner
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#product"
                className="inline-flex h-12 items-center rounded-xl border border-line-strong bg-elev/50 px-6 text-sm font-medium backdrop-blur transition hover:border-fg/30"
              >
                See the product
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <AnimatedTerminal />
        </Reveal>
      </div>
    </section>
  );
}

function CapabilityMarquee() {
  return (
    <section className="border-y border-line bg-elev/30 py-6">
      <div className="mask-fade-x flex overflow-hidden">
        <ul className="animate-marquee flex shrink-0 gap-10 pr-10">
          {[...capabilities, ...capabilities].map((t, i) => (
            <li key={i} aria-hidden={i >= capabilities.length} className="whitespace-nowrap font-mono text-sm text-muted">
              <span className="mr-2 text-accent">◆</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="The problem"
        title="Flowers die. Spreadsheets don't notice."
        body="Many flower shops still run on notebooks, chat messages and generic sales apps built for products that never expire."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-elev/40 p-6">
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function InventoryMock() {
  const rows = [
    ["ROSE-RED-60", "B-2410", "3d", "1,240"],
    ["TULIP-WHT-40", "B-2407", "5d", "860"],
    ["HYDRANGEA-BL", "B-2399", "1d", "96"],
  ];
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-line bg-bg font-mono text-[11px]">
      <div className="grid grid-cols-[1.6fr_1fr_0.7fr_0.8fr] border-b border-line px-3 py-2 text-muted">
        <span>SKU</span>
        <span>Batch</span>
        <span>Expiry</span>
        <span className="text-right">Stems</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="grid grid-cols-[1.6fr_1fr_0.7fr_0.8fr] border-b border-line px-3 py-2 last:border-0">
          <span className="truncate">{r[0]}</span>
          <span className="text-muted">{r[1]}</span>
          <span className={r[2] === "1d" ? "text-amber-400 light:text-amber-600" : "text-muted"}>{r[2]}</span>
          <span className="text-right">{r[3]}</span>
        </div>
      ))}
    </div>
  );
}

function Product() {
  return (
    <section id="product" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="The product"
        title={
          <>
            {site.product}: built for how flowers are <span className="text-gradient">actually sold.</span>
          </>
        }
        body="Every feature exists because one of my own shops needed it — and it has been used on real orders every day since."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = icons[f.icon];
          // First and last cards span two columns so the 7 cards fill the grid evenly.
          const wide = i === 0 || i === features.length - 1;
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.06} className={cn(wide && "md:col-span-2")}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="grid size-10 place-items-center rounded-lg border border-line bg-soft text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {f.tags.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                {i === 0 && <InventoryMock />}
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Traction() {
  const metrics = traction.filter((m): m is typeof m & { value: number } => m.value !== null);
  return (
    <section id="traction" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Traction"
        title="Not a prototype. A system that runs real businesses."
        body={`${site.product} handles daily sales, stock and money for two flower businesses owned and run by its founder — and 155 partner shops already order through it.`}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {businesses.map((b, i) => (
          <Reveal key={b.domain} delay={i * 0.08}>
            <SpotlightCard className="h-full overflow-hidden p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl"
                style={{ background: `hsl(${b.hue} 80% 55% / 0.16)` }}
              />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                  <LiveDot />
                  live
                </span>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-fg"
                >
                  {b.domain}
                  <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight">{b.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">{b.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{b.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      {metrics.length >= 2 && (
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="bg-bg p-6 sm:p-8">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-2 font-mono text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CodeSample() {
  const k = "text-accent-2";
  const f = "text-accent";
  const s = "text-emerald-400 light:text-emerald-600";
  const c = "text-muted";
  return (
    <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6">
      <code>
        <span className={c}># pricing — one tier for the whole order, decided on the server</span>
        {"\n"}
        <span className={k}>if</span> customer <span className={k}>and</span> customer.type <span className={k}>in</span> (
        <span className={s}>&quot;wholesale&quot;</span>, <span className={s}>&quot;vip&quot;</span>):
        {"\n"}
        {"    "}tier = <span className={s}>&quot;wholesale&quot;</span>
        {"\n"}
        <span className={k}>elif</span> retail_subtotal &gt;= settings.<span className={f}>wholesale_threshold</span>:
        {"\n"}
        {"    "}tier = <span className={s}>&quot;wholesale&quot;</span>  <span className={c}># auto, by order value</span>
        {"\n"}
        <span className={k}>else</span>:
        {"\n"}
        {"    "}tier = <span className={s}>&quot;retail&quot;</span>
      </code>
    </pre>
  );
}

function Engineering() {
  const points = [
    ["Money is exact", "Amounts are whole đồng, calculated on the server — never trusted from the client."],
    ["All-or-nothing", "Sales and stock receipts run in database transactions, so stock and money never disagree."],
    ["A ledger for stock", "Every change is a recorded stock movement; current stock is derived from that history."],
    ["Ready to integrate", "A partner API with signed webhooks lets shops order straight from their supplier."],
  ];
  return (
    <section className="relative border-y border-line bg-elev/20 py-24">
      <div className="bg-dots mask-fade-y absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
        <div>
          <SectionHeading eyebrow="Under the hood" title="Built like financial software." />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <dt className="flex items-center gap-2 font-medium">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {t}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{b}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-elev/70 backdrop-blur">
            <div className="border-b border-line p-5">
              <ArchitectureDiagram />
            </div>
            <CodeSample />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Roadmap"
        title="From two shops to the whole flower trade."
        body="Prove it in my own businesses, then with independent shops, then connect them all in one wholesale network."
      />
      <div className="relative mt-14 grid gap-8 lg:grid-cols-5 lg:gap-5">
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-accent via-accent-2 to-transparent lg:left-0 lg:top-[11px] lg:h-px lg:w-full lg:bg-gradient-to-r" />
        {roadmap.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <div className="relative pl-10 lg:pl-0 lg:pt-10">
              <span className="absolute left-0 top-0 grid size-6 place-items-center rounded-full border border-accent/60 bg-bg">
                <span className={cn("size-2 rounded-full", i === 0 ? "bg-emerald-400" : "bg-accent")} />
              </span>
              <p className={cn("font-mono text-xs uppercase tracking-wider", i === 0 ? "text-emerald-400 light:text-emerald-600" : "text-accent")}>
                {r.step}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Founder() {
  const facts = [
    ["Operator", "Runs two flower businesses: importing, wholesale and retail."],
    ["Engineer", "Designed and built the whole system — data model, API, apps and servers."],
    ["Track record", "Has also shipped systems for restaurants, construction and online marketplaces."],
  ];
  return (
    <section id="founder" className="scroll-mt-20 relative border-y border-line bg-elev/20 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <figure className="relative max-w-sm overflow-hidden rounded-3xl border border-line-strong bg-elev shadow-[0_0_80px_-20px_var(--accent-2)]">
            <Image
              src="/founder.jpg"
              alt={`${site.name}, ${site.role}`}
              width={896}
              height={1196}
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12 font-mono text-xs text-white/80">
              {site.name} · {site.role}
            </figcaption>
          </figure>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Founder" title="Built by an operator, not a consultant." />
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I import and sell fresh flowers through {businesses[0].name} and {businesses[1].name}, and I wrote the
                software that runs them. When a batch of roses goes unsold, it&apos;s my stock that gets thrown away. When a wholesale
                customer pays late, it&apos;s my cash flow.
              </p>
              <p>
                That&apos;s why {site.product} handles what generic tools ignore: expiry dates, two price books, credit,
                and units that change from crate to stem. Every feature was tested on my own
                orders before anyone else uses it.
              </p>
            </div>
          </Reveal>
          <dl className="mt-10 grid gap-5 sm:grid-cols-3">
            {facts.map(([t, b], i) => (
              <Reveal key={t} delay={0.12 + i * 0.06}>
                <dt className="font-mono text-xs uppercase tracking-wider text-accent">{t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{b}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.3}>
            <Link href="/work" className="group mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
              See everything I&apos;ve built <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <Reveal>
        <div className="noise relative isolate overflow-hidden rounded-3xl border border-line-strong bg-elev px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
          <div className="absolute left-1/2 top-full -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Let&apos;s grow the flower trade together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">
            I&apos;m talking with investors, accelerator programs and the first pilot shops. If you back founders — or
            you run a flower business — I&apos;d like to hear from you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={mail(`${site.product} — investment & partnership`)}
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fg px-6 text-sm font-medium text-bg shadow-[0_0_50px_-10px_var(--accent)] transition hover:opacity-90"
            >
              <Mail className="size-4" />
              {site.email}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={mail(`${site.product} — pilot shop`)}
              className="inline-flex h-12 items-center rounded-xl border border-line-strong bg-bg/50 px-6 text-sm font-medium transition hover:border-fg/30"
            >
              Join the pilot
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
