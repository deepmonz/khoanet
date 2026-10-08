import { cn } from "@/lib/utils";
import { Reveal } from "./fx";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{body}</p>}
    </Reveal>
  );
}
