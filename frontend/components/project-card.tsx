import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./fx";

/**
 * Abstract dashboard mock in a browser frame, tinted per project.
 * Placeholder until real (anonymised) screenshots are added.
 */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const h = project.hue;
  const bars = [38, 62, 45, 80, 56, 92, 70, 84];
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-bg", className)}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 truncate rounded bg-soft px-2 py-0.5 font-mono text-[10px] text-muted">
          admin / {project.slug}
        </span>
      </div>
      <div className="relative flex h-44 gap-3 p-3">
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl"
          style={{ background: `hsl(${h} 80% 60% / 0.25)` }}
        />
        <div className="hidden w-16 shrink-0 flex-col gap-2 sm:flex">
          {[70, 50, 60, 40, 55].map((w, i) => (
            <span
              key={i}
              className="h-2 rounded-full"
              style={{ width: `${w}%`, background: i === 0 ? `hsl(${h} 80% 60% / 0.8)` : "var(--line-strong)" }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-line bg-elev p-2">
                <span className="block h-1.5 w-8 rounded-full bg-line-strong" />
                <span
                  className="mt-2 block h-2.5 w-12 rounded-full"
                  style={{ background: `hsl(${h + i * 25} 75% 60% / ${0.9 - i * 0.2})` }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-md border border-line bg-elev p-2">
            {bars.map((b, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${b}%`,
                  background: `linear-gradient(to top, hsl(${h} 80% 55% / 0.25), hsl(${h} 85% 62% / 0.85))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <SpotlightCard id={project.slug} className="group flex h-full scroll-mt-24 flex-col p-3">
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.category}</span>
          {project.comingSoon ? (
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">soon</span>
          ) : (
            <ArrowUpRight className="size-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          )}
        </div>
        <h3 className={cn("mt-2 font-semibold tracking-tight", large ? "text-2xl" : "text-xl")}>{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.map((t) => (
            <li key={t} className="rounded-md bg-soft px-2 py-1 text-xs text-fg/80">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-5 font-mono text-[11px] leading-5 text-muted">{project.stack.join(" · ")}</p>
      </div>
    </SpotlightCard>
  );
}
