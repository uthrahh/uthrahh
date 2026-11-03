"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { MediaFrame } from "@/components/MediaFrame";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { ArrowUpRight } from "@/components/icons";
import { CatMark } from "./GitCat";
import { useScrollReady } from "./SmoothScroll";
import { scrollToId } from "@/lib/scroll";
import { orderedProjects, shortTitle } from "@/lib/projectOrder";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

const PINNED = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const PAGE_W = 480;
const PAGE_H = 620;

const STATUS_DOT: Record<Project["status"], string> = {
  "Award winner": "#e0a62a",
  "Shipped internally": "#2f9e57",
  Completed: "#2f9e57",
  "Product in development": "#3b82c4",
  "In progress": "#3b82c4",
  "Proof of concept": "#a9b4c2",
};

const pad = (n: number) => String(n).padStart(2, "0");

const TAG: Record<string, string> = {
  "Data Engineering": "Data",
  "Full-Stack": "Full-stack",
  "Software Engineering": "Software",
  "AI & GenAI": "AI",
  "Data Analytics & ML": "Analytics",
};

function Folio({ n, side }: { n: number; side: "l" | "r" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-5 font-mono text-[10px] font-semibold tracking-[0.2em] text-[#8a8173] ${side === "l" ? "left-8" : "right-8"}`}
    >
      {pad(n)}
    </span>
  );
}

function Cover({ count }: { count: number }) {
  return (
    <div className="book-cover relative h-full w-full overflow-hidden bg-[#16130f]">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-5 bg-[linear-gradient(90deg,#000,#2a251d_60%,#16130f)]" />
      <span aria-hidden="true" className="absolute inset-[22px] left-[34px] border border-[#ff6a13]/60" />
      <span aria-hidden="true" className="book-shine pointer-events-none absolute inset-0" />
      <div className="relative flex h-full flex-col items-center px-14 pb-14 pt-20 text-center">
        <CatMark className="h-24 w-24" />
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ffb547]">Volume one</p>
        <h3 className="mt-4 text-[54px] font-black uppercase leading-[0.9] tracking-tight text-[#f4f1ea]">
          The
          <br />
          Project
          <br />
          <span className="text-[#ff6a13]">Book</span>
        </h3>
        <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.24em] text-[#bdb8ab]">{count} case studies</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#f4f1ea]">Pavithra Uthrah R. K.</p>
      </div>
    </div>
  );
}

function Endpaper({ count }: { count: number }) {
  return (
    <div className="page page--left relative h-full w-full bg-[#ece7dc] p-10">
      <span aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_14px,rgba(22,19,15,0.035)_14px,rgba(22,19,15,0.035)_15px)]" />
      <div className="relative flex h-full flex-col justify-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#c2450a]">A note before you start</p>
        <p className="mt-5 text-[1.55rem] font-black uppercase leading-[1.05] tracking-tight text-[#16130f]">
          {count} things I&apos;ve built, one spread each.
        </p>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-[#4a443c]">
          The problem and the build on the left, the thing itself on the right. Pipelines, lakehouses and full-stack
          products, in roughly the order I&apos;d show you across a table.
        </p>
        <p className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#16130f]">
          <span className="h-px w-10 bg-[#ff6a13]" />
          Turn the page for the contents
        </p>
        <CatMark className="mt-10 h-12 w-12 opacity-80" />
      </div>
    </div>
  );
}

function Contents({ list, onJump }: { list: Project[]; onJump: (j: number) => void }) {
  return (
    <div className="page page--right relative h-full w-full bg-[#f7f4ec] p-10">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#c2450a]">Contents</p>
      <h3 className="mt-2 text-[2.3rem] font-black uppercase leading-none tracking-tight text-[#16130f]">Index</h3>
      <span className="mt-3 block h-[3px] w-14 bg-[#ff6a13]" />
      <ol className="mt-4">
        {list.map((p, j) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => onJump(j)}
              data-cursor="Go"
              className="group flex w-full items-baseline gap-2 py-[5px] text-left"
            >
              <span className="shrink-0 font-mono text-[11px] font-bold text-[#c2450a]">{pad(j + 1)}</span>
              <span className="min-w-0 truncate text-[1rem] font-black uppercase tracking-tight text-[#16130f] transition-colors group-hover:text-[#ff6a13]">
                {shortTitle(p)}
              </span>
              <span aria-hidden="true" className="mb-1 min-w-3 flex-1 border-b border-dotted border-[#8a8173]/60" />
              <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#6f685d]">{TAG[p.categories[0]] ?? p.categories[0]}</span>
            </button>
          </li>
        ))}
      </ol>
      <Folio n={3} side="r" />
    </div>
  );
}

function Info({ p, j, spread, onOpen }: { p: Project; j: number; spread: number; onOpen: () => void }) {
  return (
    <div className="page page--left relative flex h-full w-full flex-col bg-[#f7f4ec] p-10">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#c2450a]">
          {pad(j + 1)} / {p.categories[0]}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#16130f]/20 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#16130f]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_DOT[p.status] }} />
          {p.achievement ? `${p.achievement.rank}` : p.status}
        </span>
      </div>
      <h3 className="mt-6 line-clamp-3 text-[2.5rem] font-black uppercase leading-[0.95] tracking-tight text-[#16130f]">
        {shortTitle(p)}
      </h3>
      <p className="mt-4 line-clamp-5 text-[0.98rem] leading-relaxed text-[#4a443c]">{p.summary}</p>
      <dl className="mt-5 space-y-2.5 text-[0.85rem]">
        <div>
          <dt className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#8a8173]">Role</dt>
          <dd className="mt-0.5 font-semibold text-[#16130f]">{p.role}</dd>
        </div>
        <div>
          <dt className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#8a8173]">Context</dt>
          <dd className="mt-0.5 line-clamp-2 text-[#4a443c]">{p.context}</dd>
        </div>
      </dl>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.technologies.slice(0, 6).map((t) => (
          <li key={t} className="rounded-full border border-[#16130f]/20 px-2.5 py-0.5 font-mono text-[10px] text-[#16130f]">
            {t}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onOpen}
        data-cursor="Open"
        data-magnetic=""
        className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#ff6a13] px-6 text-[12px] font-black uppercase tracking-[0.12em] text-[#16130f] transition-colors hover:bg-[#16130f] hover:text-[#f4f1ea]"
      >
        Read the case study <ArrowUpRight size={14} />
      </button>
      <Folio n={spread * 2} side="l" />
    </div>
  );
}

function Plate({ p, j, spread, onOpen }: { p: Project; j: number; spread: number; onOpen: () => void }) {
  return (
    <div className="page page--right relative h-full w-full bg-[#f7f4ec] p-9">
      <button
        type="button"
        onClick={onOpen}
        data-cursor="Open"
        aria-label={`Open case study: ${p.title}`}
        className="group relative block h-[56%] w-full overflow-hidden rounded-md border-[3px] border-[#16130f] bg-[#0f1217] shadow-[7px_7px_0_#16130f]"
      >
        <MediaFrame
          asset={p.cover}
          fill
          lightbox={false}
          className="absolute inset-0"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.2)_0%,transparent_38%)]" />
      </button>
      <span aria-hidden="true" className="absolute left-7 top-7 h-8 w-16 -rotate-12 bg-[#ffb547]/80" />
      <span aria-hidden="true" className="absolute right-7 top-[56%] h-8 w-16 -rotate-12 bg-[#ffb547]/80" />
      <div className="absolute inset-x-9 top-[66%]">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#c2450a]">Fig. {pad(j + 1)}</p>
        <p className="mt-1.5 line-clamp-3 text-[0.9rem] leading-snug text-[#4a443c]">{p.cover.alt}</p>
        <p className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#16130f]">
          <span className="h-px w-6 bg-[#ff6a13]" />
          {p.categories.join(" · ")}
        </p>
      </div>
      <Folio n={spread * 2 + 1} side="r" />
    </div>
  );
}

function Closing() {
  return (
    <div className="page page--left relative flex h-full w-full flex-col justify-center bg-[#f7f4ec] p-10">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#c2450a]">The end, for now</p>
      <h3 className="mt-4 text-[2.4rem] font-black uppercase leading-[0.95] tracking-tight text-[#16130f]">
        That&apos;s the
        <br />
        whole shelf.
      </h3>
      <p className="mt-5 text-[0.98rem] leading-relaxed text-[#4a443c]">
        Want every project in one list, or want to add a page to this book?
      </p>
      <div className="mt-8 flex flex-col items-start gap-3">
        <Link
          href="/work"
          data-cursor="Go"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#16130f] px-6 text-[12px] font-black uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#ff6a13] hover:text-[#16130f]"
        >
          Browse the full list <ArrowUpRight size={14} />
        </Link>
        <button
          type="button"
          onClick={() => scrollToId("missions")}
          data-cursor="Go"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#16130f] px-6 text-[12px] font-black uppercase tracking-[0.12em] text-[#16130f] transition-colors hover:border-[#ff6a13] hover:text-[#c2450a]"
        >
          Work with me <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Book() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const nextLabel = useRef<HTMLSpanElement>(null);
  const spread = useRef(0);
  const ready = useScrollReady();
  const openProject = useProjectModal();
  const list = orderedProjects();
  const N = list.length;
  const L = N + 2;

  // Spread s means s leaves have turned: 0 is the closed cover, L is the last page.
  const goToSpread = (s: number) => {
    const st = ScrollTrigger.getById("book");
    if (!st) return;
    const target = Math.min(L, Math.max(0, s));
    const y = st.start + (target / L) * (st.end - st.start);
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };
  const jump = (j: number) => goToSpread(j + 2);
  const turn = (dir: 1 | -1) => goToSpread(spread.current + dir);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      if (document.querySelector("dialog[open]")) return;
      if (!ScrollTrigger.getById("book")?.isActive) return;
      e.preventDefault();
      turn(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // turn only reads refs and constants, so it is safe to bind once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const el = stage.current;
      if (!ready || !el) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const fit = () => {
          const s = Math.min((window.innerWidth * 0.92) / (PAGE_W * 2), (window.innerHeight * 0.6) / PAGE_H, 1.4);
          el.style.setProperty("--bs", String(s));
        };
        fit();

        const root = section.current!;
        const leaves = Array.from(root.querySelectorAll<HTMLElement>(".leaf"));
        const shift = root.querySelector<HTMLElement>(".book-shift")!;
        gsap.set(shift, { xPercent: -25 });
        leaves.forEach((leaf, i) => gsap.set(leaf, { zIndex: L - i, rotateY: 0 }));

        const apply = (t: number) => {
          const turned = Math.round(t);
          leaves.forEach((leaf, i) => {
            const k = Math.min(1, Math.max(0, t - i));
            leaf.style.setProperty("--shade", String(Math.sin(Math.PI * k) * 0.32));
            leaf.querySelector(".leaf__front")?.toggleAttribute("inert", i !== turned);
            leaf.querySelector(".leaf__back")?.toggleAttribute("inert", i !== turned - 1);
          });
          const project = Math.min(N, Math.max(0, turned - 1));
          if (counter.current) counter.current.textContent = pad(project);
          if (bar.current) bar.current.style.transform = `scaleX(${project / N})`;
          if (hint.current) hint.current.style.opacity = t < 0.15 ? "1" : "0";
          spread.current = turned;
          if (prevBtn.current) prevBtn.current.disabled = turned <= 0;
          if (nextBtn.current) {
            nextBtn.current.disabled = turned >= L;
            nextBtn.current.classList.toggle("book-nudge", turned === 0);
          }
          if (nextLabel.current) nextLabel.current.textContent = turned === 0 ? "Open the book" : turned >= L ? "The end" : "Next page";
        };
        apply(0);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "book",
            trigger: root,
            start: "top top",
            end: () => "+=" + L * window.innerHeight * 0.7,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: fit,
            snap: { snapTo: 1 / L, duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" },
            onUpdate: (self) => apply(self.progress * L),
          },
        });
        tl.to(shift, { xPercent: 0, duration: 1, ease: "power2.inOut" }, 0);
        leaves.forEach((leaf, i) => {
          tl.set(leaf, { zIndex: L + 10 }, i + 0.001)
            .to(leaf, { rotateY: -180, duration: 1, ease: "power2.inOut" }, i)
            .set(leaf, { zIndex: i + 1 }, i + 0.999);
        });
      });
      return () => mm.revert();
    },
    { scope: section, dependencies: [ready, L], revertOnUpdate: true }
  );

  const front = (i: number): ReactNode =>
    i === 0 ? (
      <Cover count={N} />
    ) : i === 1 ? (
      <Contents list={list} onJump={jump} />
    ) : (
      <Plate p={list[i - 2]} j={i - 2} spread={i} onOpen={() => openProject(list[i - 2].slug)} />
    );
  const back = (i: number): ReactNode =>
    i === 0 ? (
      <Endpaper count={N} />
    ) : i <= N ? (
      <Info p={list[i - 1]} j={i - 1} spread={i + 1} onOpen={() => openProject(list[i - 1].slug)} />
    ) : (
      <Closing />
    );

  return (
    <section id="projects" ref={section} className="relative bg-paper">
      {/* Desktop: a book that turns its pages as you scroll */}
      <div className="book-pinned relative h-screen w-full overflow-hidden">
        <div className="absolute left-[var(--gut)] top-[96px] z-10 max-w-2xl">
          <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c2450a]">
            <span>02</span>
            <span className="h-px w-8 bg-[#ff6a13]" />
            <span className="text-[#16130f]">The project book</span>
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,2.8vw,2.5rem)] font-black uppercase leading-none tracking-tight text-[#16130f]">
            Every project gets <span className="text-[#ff6a13]">a page.</span>
          </h2>
          <p className="mt-2 text-[14px] text-[#4a443c]">
            {N} case studies, one spread each. Scroll to turn the page.
          </p>
        </div>

        <div
          ref={stage}
          className="book-stage"
          style={{ "--bs": 0.8 } as CSSProperties}
        >
          <div className="book-shift">
            <div className="book">
              <div aria-hidden="true" className="book__board">
                <CatMark className="h-20 w-20" />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[#bdb8ab]">Thanks for reading</p>
              </div>
              {Array.from({ length: L }, (_, i) => (
                <div key={i} className="leaf" style={{ zIndex: L - i }}>
                  <div className="leaf__face leaf__front">{front(i)}</div>
                  <div className="leaf__face leaf__back">{back(i)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          ref={hint}
          className="pointer-events-none absolute inset-x-0 bottom-[7vh] z-10 flex items-center justify-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#16130f] transition-opacity duration-300"
        >
          <span className="h-px w-10 bg-[#ff6a13]" /> Scroll to open the book <span aria-hidden="true">↓</span>
        </p>

        <div className="absolute bottom-5 right-[var(--gut)] z-20 flex items-center gap-3">
          <button
            ref={prevBtn}
            type="button"
            onClick={() => turn(-1)}
            disabled
            data-cursor="Back"
            aria-label="Previous page"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#16130f] px-5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#16130f] transition-colors hover:border-[#ff6a13] hover:text-[#c2450a] disabled:pointer-events-none disabled:opacity-30"
          >
            <span aria-hidden="true">←</span> Prev
          </button>
          <button
            ref={nextBtn}
            type="button"
            onClick={() => turn(1)}
            data-cursor="Turn"
            aria-label="Next page"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#ff6a13] px-6 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#16130f] transition-colors hover:bg-[#16130f] hover:text-[#f4f1ea] disabled:pointer-events-none disabled:opacity-30"
          >
            <span ref={nextLabel}>Open the book</span> <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-[var(--gut)] z-10 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16130f]">
          <span>
            <span ref={counter}>00</span> / {pad(N)} read
          </span>
          <span className="relative h-[3px] w-28 bg-[#16130f]/15">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[#ff6a13]" />
          </span>
        </div>
      </div>

      {/* Mobile / reduced motion: the same projects as a swipeable row of posters */}
      <div className="book-static px-[var(--gut)] py-16">
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-accent-strong">
          <span>02</span>
          <span className="h-px w-8 bg-accent" />
          <span className="text-ink">The project book</span>
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,8vw,2.8rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          Every project gets <span className="text-accent-strong">a page.</span>
        </h2>
        <p className="mt-3 text-ink-muted">{N} case studies. Swipe through them.</p>
        <div className="-mx-[var(--gut)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gut)] pb-4">
          {list.map((p, j) => (
            <div key={p.slug} className="w-[78vw] max-w-sm shrink-0 snap-center">
              <ProjectCard project={p} index={j} onOpen={() => openProject(p.slug)} />
            </div>
          ))}
        </div>
        <Link href="/work" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-black uppercase tracking-wider text-paper">
          Browse the full list <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
