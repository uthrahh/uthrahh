"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GitCat } from "./GitCat";
import { useScrollReady } from "./SmoothScroll";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { scrollToId } from "@/lib/scroll";
import { site } from "@/lib/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PINNED = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const TERMINAL = [
  { t: "$ pytest -q", k: "cmd" },
  { t: "39 passed in 4.2s", k: "ok" },
  { t: "$ curl /api/pipelines", k: "cmd" },
  { t: "HTTP/2 200", k: "ok" },
  { t: "> OPTIMIZE gold.fact_sales", k: "cmd" },
] as const;

/** Types the terminal out once, a character at a time. */
function Terminal() {
  const total = TERMINAL.reduce((n, l) => n + l.t.length, 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const id = window.setInterval(
      () => {
        n = reduce ? total : n + 1;
        setTyped(n);
        if (n >= total) window.clearInterval(id);
      },
      reduce ? 0 : 38
    );
    return () => window.clearInterval(id);
  }, [total]);

  const starts = TERMINAL.map((_, i) => TERMINAL.slice(0, i).reduce((n, l) => n + l.t.length, 0));
  return (
    <div className="absolute left-[60px] top-[150px] h-[280px] w-[480px] overflow-hidden rounded-xl border border-[#2b3341] bg-[#151a22] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex h-9 items-center gap-2 border-b border-[#2b3341] px-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#2b3341]" />
        ))}
      </div>
      <div className="relative px-6 pt-5 font-mono text-[15px] leading-[2.05] text-[#f4f1ea]">
        {TERMINAL.map((l, i) => {
          const shown = Math.max(0, Math.min(l.t.length, typed - starts[i]));
          return (
            <div key={i} className={l.k === "ok" ? "text-[#ffb547]" : "text-[#f4f1ea]"}>
              {l.t.slice(0, shown) || " "}
              {shown > 0 && shown < l.t.length ? <span className="caret ml-0.5 inline-block h-4 w-2 bg-[#ffb547] align-middle" /> : null}
            </div>
          );
        })}
        {typed >= total ? <span className="caret inline-block h-4 w-2 bg-[#ffb547] align-middle" /> : null}
        <div aria-hidden="true" className="absolute right-5 top-5 flex flex-col gap-0 font-mono text-[11px] leading-[2.05] text-[#8d96a6]">
          {["01", "02", "03", "04", "05", "06"].map((n, i) => (
            <span key={n} className="flex items-center gap-2">
              {n}
              <span className={`h-px ${i === 0 ? "w-8 bg-[#f4f1ea]" : "w-3 bg-[#2b3341]"}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cylinder({ label, className }: { label: string; className: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <path d="M8 28 V122 C8 146 112 146 112 122 V28" fill="#1c222c" stroke="#2b3341" strokeWidth="3" />
      <ellipse cx="60" cy="28" rx="52" ry="18" fill="#2b3341" stroke="#3a4456" strokeWidth="3" />
      <path d="M8 62 C8 82 112 82 112 62 M8 94 C8 114 112 114 112 94" fill="none" stroke="#2b3341" strokeWidth="3" />
      <text x="60" y="108" textAnchor="middle" fontSize="30" fontWeight="800" fill="#ffb547" fontFamily="var(--font-jetbrains), monospace">
        {label}
      </text>
    </svg>
  );
}

function DataWorld() {
  return (
    <div className="relative h-[640px] w-[760px]">
      {[
        [30, 40], [140, 90], [300, 30], [430, 80], [560, 50], [690, 120], [620, 220], [90, 200],
      ].map(([x, y], i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-[#8d96a6] opacity-60" style={{ left: x, top: y }} />
      ))}
      <Terminal />
      <svg viewBox="0 0 760 640" className="pointer-events-none absolute inset-0" fill="none" aria-hidden="true">
        <path d="M120 440 C100 420 90 380 150 330" stroke="#ffb547" strokeWidth="1.5" opacity="0.5" />
        <path d="M400 430 C410 410 420 400 440 400" stroke="#ffb547" strokeWidth="1.5" opacity="0.5" />
      </svg>
      <div className="absolute left-[10px] top-[450px] w-[220px] rounded-md border border-[#2b3341] bg-[#1c222c] p-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
        {[0, 1, 2, 3].map((r) => (
          <div key={r} className="mb-2 flex h-8 items-center justify-between rounded-sm bg-[#151a22] px-3 last:mb-0">
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8d96a6]" />
              <span className={`h-1.5 w-1.5 rounded-full ${r % 2 ? "bg-[#ffb547]" : "bg-[#2b3341]"}`} />
            </span>
            {r === 1 ? (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 21 8 12 13 3 8Z M3 12.5 12 17.5 21 12.5 M3 16.5 12 21.5 21 16.5" fill="none" stroke="#ff6a13" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="h-1 w-10 rounded-full bg-[#2b3341]" />
            )}
          </div>
        ))}
      </div>
      <Cylinder label="Δ" className="absolute left-[330px] top-[440px] h-[170px] w-[128px]" />
      <Cylinder label="SQL" className="absolute left-[480px] top-[480px] h-[150px] w-[112px]" />
    </div>
  );
}

function AppWorld() {
  return (
    <div className="relative h-[640px] w-[760px]">
      <div className="absolute left-[-50px] top-[150px] h-[330px] w-[590px] overflow-hidden rounded-xl border-[3px] border-[#16130f] bg-[#ece7dc] shadow-[10px_10px_0_#16130f]">
        <div className="flex h-9 items-center gap-2 bg-[#ff6a13] px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#16130f] opacity-70" />
          ))}
        </div>
        <div className="relative p-9">
          <div className="h-6 w-60 bg-[#16130f]" />
          <div className="mt-6 h-2.5 w-80 bg-[#bdb4a2]" />
          <div className="mt-3 h-2.5 w-72 bg-[#bdb4a2]" />
          <div className="mt-3 h-2.5 w-64 bg-[#bdb4a2]" />
          <div className="mt-8 h-10 w-32 rounded-full bg-[#ff6a13]" />
          <div className="absolute right-9 top-8 h-36 w-52 bg-[#cbc2b2]">
            <svg viewBox="0 0 208 144" className="h-full w-full" aria-hidden="true">
              <circle cx="150" cy="40" r="16" fill="#ff6a13" />
              <path d="M0 144 L60 60 L100 108 L140 76 L208 144 Z" fill="#16130f" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute left-[-10px] top-[505px] flex gap-3">
        {["#16130f", "#ff6a13", "#ffb547", "#cbc2b2"].map((c) => (
          <span key={c} className="h-8 w-8" style={{ background: c }} />
        ))}
      </div>
      <div className="absolute left-[-40px] top-[550px] flex h-[110px] w-[150px] items-center justify-center rounded-2xl bg-[#ded8cc] text-[64px] font-black text-[#16130f]">
        Aa
      </div>
      <div className="absolute left-[150px] top-[575px] h-14 w-28 rounded-full bg-[#ff6a13]">
        <span className="absolute right-1.5 top-1.5 h-11 w-11 rounded-full bg-[#f4f1ea]" />
      </div>
      <div className="absolute left-[420px] top-[320px] h-[310px] w-[165px] rounded-[28px] border-[7px] border-[#16130f] bg-[#ece7dc]">
        <div className="h-14 rounded-t-[20px] bg-[#ff6a13]" />
        <div className="mx-4 mt-5 h-16 rounded-md bg-[#ded8cc]" />
        <div className="mx-4 mt-3 h-16 rounded-md bg-[#ded8cc]" />
        <div className="mx-4 mt-3 h-2 w-20 rounded-full bg-[#bdb4a2]" />
      </div>
      <svg viewBox="0 0 40 48" className="absolute left-[370px] top-[395px] h-12 w-10" aria-hidden="true">
        <path d="M4 2 L4 36 L13 28 L19 42 L25 39 L19 26 L31 26 Z" fill="#16130f" stroke="#f4f1ea" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="absolute left-[60px] top-[100px] rounded-md bg-[#16130f] px-3 py-1.5 font-mono text-[13px] text-[#ffb547]">{"<Button variant=\"primary\" />"}</span>
    </div>
  );
}

/** A headline split down the middle: ink on the paper side, cream on the night side. */
function SplitLine({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative text-center ${className}`}>
      <span className="block text-[#16130f]" style={{ clipPath: "inset(0 50% 0 0)" }}>
        {children}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block text-[#f4f1ea]" style={{ clipPath: "inset(0 0 0 50%)" }}>
        {children}
      </span>
    </div>
  );
}

export function Story() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ready = useScrollReady();
  const openResume = useResumeModal();

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const s = Math.min((el.clientWidth * 0.5) / 720, (el.clientHeight * 0.8) / 640, 1.3);
      el.style.setProperty("--s", String(s));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        gsap.set([".story__l2", ".story__l3", ".story__l4", ".story__cat", ".story__caption"], { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.current,
            start: "top top",
            end: "+=340%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });
        tl.to(".story__cue", { autoAlpha: 0, y: 16, duration: 0.08 }, 0)
          .to(".story__l1", { autoAlpha: 0, y: -26, duration: 0.14 }, 0.14)
          .fromTo(".story__l2", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.24)
          .to(".story__vs", { autoAlpha: 0, scale: 0.7, duration: 0.14 }, 0.22)
          .to(".story__art-app", { xPercent: -110, duration: 0.42 }, 0.26)
          .to(".story__art-data", { xPercent: 110, duration: 0.42 }, 0.26)
          .to(".story__l2", { autoAlpha: 0, y: -26, duration: 0.1 }, 0.5)
          .fromTo(".story__cat", { autoAlpha: 0, yPercent: 24, scale: 0.92 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.26 }, 0.48)
          .fromTo(".story__l3", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.58)
          .to(".story__l3", { autoAlpha: 0, y: -26, duration: 0.1 }, 0.78)
          .fromTo(".story__l4", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.84)
          .fromTo(".story__caption", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <header id="home" ref={root} className="relative">
      <h1 className="sr-only">
        {site.name}: professional data engineer and freelance software and application developer
      </h1>

      {/* Desktop: pinned, scroll-driven story */}
      <div
        ref={stage}
        className="story-pinned relative h-screen w-full overflow-hidden"
        style={{ "--s": 0.8 } as CSSProperties}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#f4f1ea]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(25%-1px),rgba(22,19,15,0.06)_calc(25%-1px),rgba(22,19,15,0.06)_25%)]" />
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#0f1217]">
          <div className="dot-grid absolute inset-0 opacity-60" style={{ "--dot": "rgba(244,241,234,0.1)" } as CSSProperties} />
        </div>

        <div className="story__art-app absolute inset-y-0 left-0 w-1/2">
          <div className="absolute bottom-0 right-0" style={{ width: 760, height: 640, transform: "scale(var(--s))", transformOrigin: "bottom right" }}>
            <AppWorld />
          </div>
        </div>
        <div className="story__art-data absolute inset-y-0 right-0 w-1/2">
          <div className="absolute bottom-0 left-0" style={{ width: 760, height: 640, transform: "scale(var(--s))", transformOrigin: "bottom left" }}>
            <DataWorld />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[13%] z-10 font-black uppercase leading-none tracking-tight text-[clamp(1.5rem,3.2vw,3.3rem)]">
          <div className="story__l1 flex">
            <div className="w-1/2 pr-5 text-right text-[#16130f]">
              Every <span className="text-[#ff6a13]">product</span>
              <span className="mt-3 ml-auto block h-px w-1/3 bg-[#16130f]/40" />
            </div>
            <div className="w-1/2 pl-5 text-left text-[#f4f1ea]">
              Has two <span className="text-[#ffb547]">sides…</span>
              <span className="mt-3 block h-px w-1/3 bg-[#f4f1ea]/40" />
            </div>
          </div>
          <SplitLine className="story__l2 absolute inset-x-0 top-0">
            The app. <span className="text-[#ff6a13]">The data.</span>
          </SplitLine>
          <SplitLine className="story__l3 absolute inset-x-0 top-0">Most engineers pick a side.</SplitLine>
          <SplitLine className="story__l4 absolute inset-x-0 top-0">
            This one checked out <span className="text-[#ff6a13]">both branches.</span>
          </SplitLine>
        </div>

        <div className="story__vs pointer-events-none absolute left-1/2 top-[55%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center">
          <span className="rounded-l-full bg-[#ded8cc] py-3 pl-8 pr-9 text-[clamp(1.1rem,2.2vw,2.2rem)] font-black uppercase text-[#ff6a13]">App</span>
          <span
            className="-mx-6 z-10 flex h-[clamp(3rem,5vw,4.6rem)] w-[clamp(3rem,5vw,4.6rem)] items-center justify-center bg-[#ff6a13] text-[0.8rem] font-black uppercase text-[#16130f]"
            style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
          >
            vs
          </span>
          <span className="rounded-r-full bg-[#1c222c] py-3 pl-9 pr-8 text-[clamp(1.1rem,2.2vw,2.2rem)] font-black uppercase text-[#ffb547]">Data</span>
        </div>

        <div className="story__cue absolute bottom-[12%] left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6a13] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#16130f] shadow-[0_10px_30px_-10px_rgba(255,106,19,0.7)]">
            Scroll down <span aria-hidden="true">↓</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-1/2 z-[5] h-[74%] -translate-x-1/2">
          <div className="story__cat h-full">
            <GitCat className="h-full w-auto" />
          </div>
        </div>

        <div className="story__caption absolute bottom-[5%] left-1/2 z-10 -translate-x-1/2">
          <span className="whitespace-nowrap rounded-md bg-[#f4f1ea] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#16130f] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]">
            Data engineer + freelance app developer · Chennai
          </span>
        </div>
      </div>

      {/* Mobile / reduced motion: the same story, laid out statically */}
      <div className="story-static bg-paper px-[var(--gut)] pb-16 pt-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          {site.name} · Chennai
        </p>
        <p className="mt-4 text-[clamp(2rem,9vw,3.4rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          Every product has <span className="text-accent-strong">two sides.</span>
        </p>
        <p className="mt-5 max-w-md text-ink-muted">{site.tagline}</p>
        <div className="my-8 flex justify-center">
          <GitCat className="h-72 w-auto" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-paper-raised p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-strong">The app side</p>
            <p className="mt-2 font-bold text-ink">Freelance software and application developer</p>
            <p className="mt-1 text-sm text-ink-muted">Next.js, React, Django, FastAPI, PostgreSQL.</p>
          </div>
          <div className="night rounded-2xl border border-border bg-paper-raised p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-strong">The data side</p>
            <p className="mt-2 font-bold text-ink">Professional data engineer</p>
            <p className="mt-1 text-sm text-ink-muted">PySpark, Databricks, Delta Lake, SQL, Power BI.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollToId("projects")}
            className="inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-sm font-bold uppercase tracking-wider text-accent-ink"
          >
            See the work
          </button>
          {site.resumeAvailable ? (
            <button
              type="button"
              onClick={openResume}
              className="inline-flex min-h-12 items-center rounded-full border-2 border-ink px-7 text-sm font-bold uppercase tracking-wider text-ink"
            >
              Resume
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
