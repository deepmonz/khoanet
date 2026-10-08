"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/** True when the light theme is active; updates when the <html> class changes. */
export function useIsLight() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("light"),
    () => false,
  );
}

export function toggleTheme() {
  const light = document.documentElement.classList.toggle("light");
  try {
    localStorage.setItem("theme", light ? "light" : "dark");
  } catch {}
}

export function ThemeToggle() {
  const light = useIsLight();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className="grid size-9 place-items-center rounded-lg border border-line text-muted transition hover:border-line-strong hover:text-fg"
    >
      {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
