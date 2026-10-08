import { ArrowRight, Bot, Gamepad2, Globe, Layers, Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { AnimatedTerminal } from "@/components/animated-terminal";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CountUp, Reveal, SpotlightCard } from "@/components/fx";
import { HeroVisual } from "@/components/hero-visual";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects, services, site, stack, steps } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = { layers: Layers, wallet: Wallet, bot: Bot, gamepad: Gamepad2, globe: Globe };

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <Stats />
      <FeaturedWork />
      <Services />
      <Engineering />
      <Process />
      <Contact />
    </>
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
              <span className="relative grid size-1.5 place-items-center">
                <span className="absolute size-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="size-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl">
              Software that runs <span className="text-gradient">real businesses.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m {site.name} — a full-stack developer who designs, builds and deploys ERP systems,
              marketplaces, AI automation and mobile games. From the first spec to your production server.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fg px-6 text-sm font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition hover:opacity-90"
              >
                Get a quote
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/work"
                className="inline-flex h-12 items-center rounded-xl border border-line-strong bg-elev/50 px-6 text-sm font-medium backdrop-blur transition hover:border-fg/30"
              >
                See my work
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

function StackMarquee() {
  return (
    <section className="border-y border-line bg-elev/30 py-6">
      <div className="mask-fade-x flex overflow-hidden">
        <ul className="animate-marquee flex shrink-0 gap-10 pr-10">
          {[...stack, ...stack].map((t, i) => (
            <li key={i} aria-hidden={i >= stack.length} className="whitespace-nowrap font-mono text-sm text-muted">
              <span className="mr-2 text-accent">◆</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: projects.length, suffix: "", label: "Systems built" },
    { value: 6, suffix: "", label: "Industries served" },
    { value: stack.length, suffix: "+", label: "Technologies in production" },
    { value: 100, suffix: "%", label: "Code & servers you own" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-bg p-6 sm:p-8">
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 font-mono text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Built for real operations."
          body="Marketplaces, ERPs and platforms running inventory, payments and orders — not demo apps."
        />
        <Link href="/work" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          All projects <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} large />
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
        <span className="text-right">Qty</span>
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

function Services() {
  return (
    <section id="services" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Services"
        title="What I can build for you."
        body="One engineer across the whole stack — so nothing gets lost between design, backend and deployment."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          const wide = i === 0;
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.06} className={cn(wide && "md:col-span-2")}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="grid size-10 place-items-center rounded-lg border border-line bg-soft text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                {wide && <InventoryMock />}
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
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
        <span className={c}># orders/router.py</span>
        {"\n"}
        <span className={f}>@router.post</span>(<span className={s}>&quot;/orders&quot;</span>, response_model=OrderOut)
        {"\n"}
        <span className={k}>async def</span> <span className={f}>create_order</span>(body: OrderIn, user=Depends(<span className={f}>current_user</span>)):
        {"\n"}
        {"    "}order = <span className={k}>await</span> orders.<span className={f}>reserve_stock</span>(body, user)
        {"\n"}
        {"    "}<span className={f}>notify_seller</span>.<span className={f}>delay</span>(order.id)  <span className={c}># Celery job</span>
        {"\n"}
        {"    "}<span className={k}>return</span> order
      </code>
    </pre>
  );
}

function Engineering() {
  const points = [
    ["Spec-first", "Every project starts with a written spec and data model you can review."],
    ["Typed end to end", "TypeScript on the frontend, Pydantic on the API — fewer surprises in production."],
    ["Built to scale", "Async APIs, background workers and caching where the load actually is."],
    ["Shipped, not handed off", "Dockerised deploys with Nginx, SSL and backups on infrastructure you own."],
  ];
  return (
    <section className="relative border-y border-line bg-elev/20 py-24">
      <div className="bg-dots mask-fade-y absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Engineering" title="Modern stack. Boring reliability." />
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

function Process() {
  return (
    <section id="process" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Process"
        title="How we'll work together."
        body="Clear steps, weekly demos and no black boxes — you always know what is being built and why."
      />
      <div className="relative mt-14 grid gap-8 lg:grid-cols-5 lg:gap-5">
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-accent via-accent-2 to-transparent lg:left-0 lg:top-[11px] lg:h-px lg:w-full lg:bg-gradient-to-r" />
        {steps.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.08}>
            <div className="relative pl-10 lg:pl-0 lg:pt-10">
              <span className="absolute left-0 top-0 grid size-6 place-items-center rounded-full border border-accent/60 bg-bg">
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-xs text-accent">{p.step}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-6xl px-4 pb-28 sm:px-6">
      <Reveal>
        <div className="noise relative isolate overflow-hidden rounded-3xl border border-line-strong bg-elev px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
          <div className="absolute left-1/2 top-full -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">
            Tell me what your business needs. I&apos;ll reply with questions, a proposed scope and an estimate.
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}`}
            className="group mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-fg px-6 text-sm font-medium text-bg shadow-[0_0_50px_-10px_var(--accent)] transition hover:opacity-90"
          >
            <Mail className="size-4" />
            {site.email}
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
