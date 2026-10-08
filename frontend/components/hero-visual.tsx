"use client";

import dynamic from "next/dynamic";
import { useMediaQuery, useReducedMotion } from "@/lib/use-media-query";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/** Loads the WebGL network on larger screens; with reduced motion it renders a still frame. */
export function HeroVisual() {
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 animate-[fadein_1.2s_ease_forwards]">
      {wide && <HeroScene still={reduced} />}
    </div>
  );
}
