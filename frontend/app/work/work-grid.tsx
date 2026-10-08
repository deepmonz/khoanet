"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories, projects, type Category } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {(["All", ...categories] as const).map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "h-9 rounded-full border px-4 text-sm transition",
                active === c
                  ? "border-fg bg-fg text-bg"
                  : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {c}
              <span className="ml-2 font-mono text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
