"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const sections = [
  { id: "home", label: "Profile", icon: "home" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "projects", label: "Projects", icon: "grid" },
  { id: "skills", label: "Skills", icon: "layers" },
  { id: "education", label: "Education", icon: "cap" },
  { id: "interests", label: "Interests", icon: "spark" },
  // { id: "articles", label: "Articles", icon: "article" },
  { id: "languages", label: "Languages", icon: "globe" },
] as const;

type IconName = (typeof sections)[number]["icon"];

function NavIcon({ name }: { name: IconName }) {
  const common = { stroke: "currentColor", strokeWidth: 1.3, fill: "none" } as const;
  switch (name) {
    case "home":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 8.5 8 3l6 5.5" {...common} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 7.5V13a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.5" {...common} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 13v-4h3v4" {...common} strokeLinejoin="round" />
        </svg>
      );
    case "grid":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="1.5" y="1.5" width="5.5" height="5.5" {...common} />
          <rect x="9" y="1.5" width="5.5" height="5.5" {...common} />
          <rect x="1.5" y="9" width="5.5" height="5.5" {...common} />
          <rect x="9" y="9" width="5.5" height="5.5" {...common} />
        </svg>
      );
    case "briefcase":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="1.5" y="5" width="13" height="8.5" rx="1" {...common} />
          <path d="M5.5 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5" {...common} />
          <path d="M1.5 9h13" {...common} />
        </svg>
      );
    case "layers":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 2 14 5.5 8 9 2 5.5Z" {...common} strokeLinejoin="round" />
          <path d="M2 8.5 8 12l6-3.5" {...common} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 11.5 8 15l6-3.5" {...common} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cap":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 3 14.5 6 8 9 1.5 6Z" {...common} strokeLinejoin="round" />
          <path d="M4.5 7.4V11c0 1 1.6 2 3.5 2s3.5-1 3.5-2V7.4" {...common} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 6.3V10" {...common} strokeLinecap="round" />
        </svg>
      );
    case "spark":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 2v3.5M8 10.5V14M2 8h3.5M10.5 8H14" {...common} strokeLinecap="round" />
          <path d="M4.3 4.3l2.1 2.1M9.6 9.6l2.1 2.1M11.7 4.3l-2.1 2.1M6.4 9.6l-2.1 2.1" {...common} strokeLinecap="round" />
        </svg>
      );
    // "article" is unused while the Articles nav entry above is commented
    // out — its icon value was dropped from the `sections` array, which
    // narrows `IconName` and makes this case unreachable per that type.
    // Restore both together if Articles comes back.
    // case "article":
    //   return (
    //     <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
    //       <rect x="2" y="2" width="12" height="12" rx="1" {...common} />
    //       <path d="M4.5 6h7M4.5 8.5h7M4.5 11h4" {...common} strokeLinecap="round" />
    //     </svg>
    //   );
    case "globe":
      return (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" {...common} />
          <path d="M2 8h12" {...common} />
          <path d="M8 2c2.2 2 2.2 10 0 12M8 2c-2.2 2-2.2 10 0 12" {...common} />
        </svg>
      );
  }
}

export function FloatingNav() {
  const [active, setActive] = useState<string>("");
  const ticking = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        if (ticking.current) return;
        ticking.current = true;
        requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActive(visible.target.id);
          ticking.current = false;
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(id: string) {
    // On a separate route (e.g. /privacy, /terms) the one-page section IDs
    // don't exist on the current DOM, so getElementById silently finds
    // nothing — navigate back to the home page with the hash instead.
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Desktop: compact floating left rail, icon-only with hover labels */}
      <nav
        aria-label="Primary"
        className="glass fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-stretch gap-1 rounded-lg p-1.5 backdrop-blur-md lg:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              aria-current={isActive ? "true" : undefined}
              title={s.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-sm transition-colors ${
                isActive ? "bg-accent-soft text-accent" : "text-ink-muted hover:text-ink"
              }`}
            >
              <NavIcon name={s.icon} />
              <span
                aria-hidden="true"
                className={`absolute -right-1 top-1/2 h-1 w-1 -translate-y-1/2 translate-x-full rounded-full transition-colors ${
                  isActive ? "bg-accent" : "bg-transparent"
                }`}
              />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-sm border border-border bg-paper px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
            </button>
          );
        })}
        <div className="mt-1 flex justify-center border-t border-border pt-1.5">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile / tablet: floating bottom bar. More destinations than fit in
          one row now that Interests/Languages have nav icons too, so the
          bar scrolls horizontally within itself rather than either
          compressing icons to illegible sizes or overflowing the page. */}
      <nav
        aria-label="Primary"
        className="glass fixed inset-x-4 bottom-4 z-40 flex items-center gap-1 overflow-x-auto rounded-lg px-2 py-2 backdrop-blur-md lg:hidden"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              aria-label={s.label}
              aria-current={isActive ? "true" : undefined}
              className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm transition-colors ${
                isActive ? "bg-accent-soft text-accent" : "text-ink-muted"
              }`}
            >
              <NavIcon name={s.icon} />
            </button>
          );
        })}
        <div className="flex min-h-11 min-w-11 shrink-0 items-center justify-center">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
