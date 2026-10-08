"use client";

import { Command } from "cmdk";
import { ArrowRight, Copy, FileCode2, Mail, Search, SunMoon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, projects, site } from "@/lib/site";
import { toggleTheme } from "./theme-toggle";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const group =
    "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted";
  const item =
    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-soft data-[selected=true]:text-fg";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[15vh] z-50 w-[calc(100%-32px)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 text-muted" />
        <Command.Input
          placeholder="Search projects, pages, actions…"
          className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
      </div>
      <Command.List className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>
        <Command.Group heading="Pages" className={group}>
          {nav.map((n) => (
            <Command.Item key={n.href} value={`page ${n.label}`} onSelect={() => run(() => router.push(n.href))} className={item}>
              <ArrowRight className="size-4" />
              {n.label}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Projects" className={group}>
          {projects.map((p) => (
            <Command.Item
              key={p.slug}
              value={`${p.title} ${p.category} ${p.stack.join(" ")}`}
              onSelect={() => run(() => router.push(`/work#${p.slug}`))}
              className={item}
            >
              <FileCode2 className="size-4" />
              <span className="flex-1 text-fg">{p.title}</span>
              <span className="font-mono text-[11px]">{p.category}</span>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions" className={group}>
          <Command.Item value="toggle theme dark light" onSelect={() => run(toggleTheme)} className={item}>
            <SunMoon className="size-4" />
            Toggle theme
          </Command.Item>
          <Command.Item
            value="copy email"
            onSelect={() => run(() => navigator.clipboard?.writeText(site.email))}
            className={item}
          >
            <Copy className="size-4" />
            Copy email
          </Command.Item>
          <Command.Item
            value="send email contact quote"
            onSelect={() => run(() => (window.location.href = `mailto:${site.email}`))}
            className={item}
          >
            <Mail className="size-4" />
            Send an email
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
