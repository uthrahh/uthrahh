"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCommandPalette } from "@/components/CommandPalette";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { NAV_SECTIONS } from "@/components/navSections";
import { SearchIcon } from "@/components/icons";
import { site } from "@/lib/data/site";

export function SiteNav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const openPalette = useCommandPalette();
  const openResume = useResumeModal();

  useEffect(() => {
    // Platform only exists in the browser; defaulting to ⌘ keeps SSR stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  function goTo(id: string) {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const initials = site.name
    .replace(/\./g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center gap-2 rounded-full border px-2 py-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-border bg-paper/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <button
          type="button"
          onClick={() => goTo("home")}
          className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-[13px] font-semibold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">
            {site.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </button>

        <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
          {NAV_SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative isolate rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-accent-soft" />
                  ) : null}
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="flex h-9 items-center gap-2 rounded-full border border-border px-3 text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
          >
            <SearchIcon size={14} />
            <span className="hidden font-mono text-[11px] sm:inline">{isMac ? "⌘K" : "Ctrl K"}</span>
            <span className="text-[13px] sm:hidden">Menu</span>
          </button>
          <ThemeToggle />
          {site.resumeAvailable ? (
            <button
              type="button"
              onClick={openResume}
              className="hidden h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-paper transition-colors hover:bg-accent md:flex"
            >
              Resume
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
