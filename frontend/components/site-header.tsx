"use client";

import { Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="relative grid size-2 place-items-center">
            <span className="absolute size-2 rounded-full bg-accent animate-pulse-ring" />
            <span className="size-2 rounded-full bg-accent" />
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden h-9 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition hover:border-line-strong hover:text-fg sm:flex"
          >
            Search
            <kbd className="flex items-center gap-0.5 font-mono text-[11px]">
              <Command className="size-3" />K
            </kbd>
          </button>
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden h-9 items-center rounded-lg bg-fg px-4 text-sm font-medium text-bg transition hover:opacity-90 sm:flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-4 pb-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-base text-muted last:border-0 hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-11 items-center justify-center rounded-lg bg-fg text-sm font-medium text-bg"
          >
            Get a quote
          </Link>
        </nav>
      )}

      <CommandPalette />
    </header>
  );
}
