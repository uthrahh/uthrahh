"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CatMark } from "./GitCat";
import { useScrollReady } from "./SmoothScroll";
import { useCommandPalette } from "@/components/CommandPalette";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { SearchIcon } from "@/components/icons";
import { getScrollY, scrollToId } from "@/lib/scroll";
import { site } from "@/lib/data/site";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: "home", n: "01", label: "The story" },
  { id: "projects", n: "02", label: "The project book" },
  { id: "skills", n: "03", label: "The toolkit" },
  { id: "under-the-hood", n: "04", label: "Under the hood" },
  { id: "missions", n: "05", label: "Work with me" },
  { id: "contact", n: "06", label: "Contact" },
] as const;

function useChapter(ready: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const els = CHAPTERS.map((c) => document.getElementById(c.id));
    // Pinned sections sit inside a pin-spacer; that wrapper is what holds the
    // section's place in the page.
    const anchors = els.map((el) => el?.closest(".pin-spacer") ?? el);

    const update = () => {
      const y = getScrollY();
      const line = y + window.innerHeight * 0.6;
      let current = 0;
      anchors.forEach((a, i) => {
        if (!a) return;
        if (a.getBoundingClientRect().top + y <= line) current = i;
      });
      setActive((cur) => (cur === current ? cur : current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    ScrollTrigger.addEventListener("refresh", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ScrollTrigger.removeEventListener("refresh", update);
    };
  }, [ready]);

  return active;
}

export function StoryChrome() {
  const ready = useScrollReady();
  const active = useChapter(ready);
  const openPalette = useCommandPalette();
  const openResume = useResumeModal();
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const goTo = (id: string) => (onHome ? scrollToId(id) : router.push(`/#${id}`));

  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={bar} className="scroll-progress" aria-hidden="true" />
      <div className="loader" aria-hidden="true">
        <CatMark className="loader__mark h-20 w-20" />
        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.3em] text-[#16130f]">git checkout both-sides</p>
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-[var(--gut)] pt-4">
        <button
          type="button"
          onClick={() => goTo("home")}
          aria-label="Back to the start"
          className="pointer-events-auto flex items-center gap-3 rounded-full border border-[#16130f]/15 bg-[#f4f1ea]/90 py-1.5 pl-2 pr-5 backdrop-blur-md"
        >
          <CatMark className="h-9 w-9" />
          <span className="text-left leading-none">
            <span className="block text-[15px] font-black uppercase tracking-tight text-[#16130f]">Uthrah</span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#6f685d]">data × app</span>
          </span>
        </button>

        <nav
          aria-label="Primary"
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-[#f4f1ea]/15 bg-[#0f1217]/90 py-1.5 pl-2 pr-1.5 text-[#f4f1ea] backdrop-blur-md"
        >
          <ul className="hidden items-center md:flex">
            {[
              { id: "home", label: "Index", idx: 0 },
              { id: "projects", label: "Work", idx: 1 },
              { id: "missions", label: "Hire me", idx: 4 },
              { id: "contact", label: "Contact", idx: 5 },
            ].map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => goTo(l.id)}
                  aria-current={onHome && active === l.idx ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#ff8a3d] ${
                    onHome && active === l.idx ? "text-[#ff8a3d]" : "text-[#bdb8ab]"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-[#f4f1ea]/15 md:block" />
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="flex h-9 items-center gap-2 rounded-full px-3 text-[#bdb8ab] transition-colors hover:text-[#ff8a3d]"
          >
            <SearchIcon size={14} />
            <span className="font-mono text-[11px] sm:hidden">Menu</span>
            <span className="hidden font-mono text-[11px] sm:inline">{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
          {site.resumeAvailable ? (
            <button
              type="button"
              onClick={openResume}
              className="h-9 rounded-full bg-[#ff6a13] px-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#16130f] transition-colors hover:bg-[#ffb547]"
            >
              Resume
            </button>
          ) : null}
        </nav>
      </header>

      {onHome ? (
      <nav
        aria-label="Chapters"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-full border border-[#f4f1ea]/12 bg-[#0f1217]/80 px-2 py-3 backdrop-blur-md md:flex"
      >
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => scrollToId(c.id)}
            aria-label={`${c.n} ${c.label}`}
            aria-current={active === i ? "true" : undefined}
            className="group relative flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`flex items-center justify-center rounded-full font-mono font-bold transition-all ${
                active === i ? "h-7 w-7 bg-[#ff6a13] text-[10px] text-[#16130f]" : "h-5 w-5 text-[9px] text-[#8d96a6] group-hover:text-[#f4f1ea]"
              }`}
            >
              {c.n.slice(1)}
            </span>
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#0f1217] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#f4f1ea] opacity-0 transition-opacity group-hover:opacity-100">
              {c.label}
            </span>
          </button>
        ))}
      </nav>
      ) : null}

      {onHome ? (
        <button
          type="button"
          onClick={() => scrollToId("projects")}
          className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-[#f4f1ea]/40 bg-[#0f1217]/80 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4f1ea] backdrop-blur-md transition-all hover:border-[#ff6a13] hover:text-[#ff8a3d] md:flex ${
            active === 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          Skip the story <span aria-hidden="true">›</span>
        </button>
      ) : null}
    </>
  );
}
