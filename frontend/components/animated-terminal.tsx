"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-media-query";

const command = "khoa build --erp --marketplace --ai --games";

const output = [
  { label: "next.js frontend", status: "ready" },
  { label: "fastapi services", status: "ready" },
  { label: "mongodb · postgres", status: "connected" },
  { label: "redis · celery workers", status: "running" },
  { label: "docker · nginx · ssl", status: "deployed" },
];

export function AnimatedTerminal() {
  const reduced = useReducedMotion();
  const [typedState, setTyped] = useState(0);
  const [linesState, setLines] = useState(0);
  const typed = reduced ? command.length : typedState;
  const lines = reduced ? output.length + 1 : linesState;

  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = 600;
    for (let i = 1; i <= command.length; i++) {
      timers.push(setTimeout(() => setTyped(i), start + i * 45));
    }
    const done = start + command.length * 45 + 400;
    for (let i = 1; i <= output.length + 1; i++) {
      timers.push(setTimeout(() => setLines(i), done + i * 380));
    }
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-elev/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">~/your-project — zsh</span>
      </div>
      <div className="min-h-[232px] p-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        <p className="break-all">
          <span className="text-accent">❯</span> {command.slice(0, typed)}
          {typed < command.length && <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-fg" />}
        </p>
        {output.slice(0, lines).map((l) => (
          <p key={l.label} className="flex gap-2 text-muted">
            <span className="text-emerald-400 light:text-emerald-600">✓</span>
            <span className="flex-1 truncate">{l.label}</span>
            <span className="text-fg">{l.status}</span>
          </p>
        ))}
        {lines > output.length && (
          <p className="mt-2">
            <span className="text-accent-2">→</span> live at{" "}
            <span className="text-accent underline decoration-accent/40 underline-offset-4">https://your-business.com</span>
            <span className="animate-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-fg" />
          </p>
        )}
      </div>
    </div>
  );
}
