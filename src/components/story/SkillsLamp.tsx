"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SkillChip } from "@/components/SkillChip";
import { useScrollReady } from "./SmoothScroll";
import { skills } from "@/lib/data/skills";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PINNED = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

// Data side first, then the app side, so the lamp tells the story in order.
const ORDER = [
  "Data Engineering",
  "Languages",
  "Databases",
  "Data & BI",
  "Cloud & Tools",
  "Backend & APIs",
  "Frontend",
  "AI & GenAI",
  "Machine Learning",
];

const CARD_W = 320;
const CARD_H = 172;
const COL_X = [300, 644, 988];
const ROW_Y = [118, 385, 652];

/** Where the lamp stands for card i: on its top edge, near the left. */
function perch(i: number) {
  return { x: COL_X[i % 3] + 46, y: ROW_Y[Math.floor(i / 3)] - 4 };
}

function Lamp() {
  return (
    <div className="lamp absolute left-0 top-0 z-20 h-0 w-0" aria-hidden="true">
      <svg
        width="520"
        height="380"
        viewBox="-140 -250 520 380"
        className="absolute overflow-visible"
        style={{ left: -140, top: -250, transformOrigin: "140px 250px", transform: "scale(0.72)" }}
      >
        <defs>
          <linearGradient id="lamp-cone" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="lamp__body">
          <ellipse cx="0" cy="0" rx="40" ry="6" fill="#000" opacity="0.35" />
          <rect x="-28" y="-17" width="56" height="14" rx="7" fill="#d9d3c5" />
          <path d="M0 -15 L-20 -66" stroke="#cfc8b8" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="-20" cy="-66" r="7.5" fill="#ff6a13" />
          <path d="M-20 -66 L34 -100" stroke="#cfc8b8" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="34" cy="-100" r="7.5" fill="#ff6a13" />
          <g className="lamp__head">
            <path className="lamp__cone" d="M86 -116 L320 -214 L320 14 L86 -84 Z" fill="url(#lamp-cone)" />
            <path d="M34 -114 C58 -116 78 -110 86 -100 C78 -90 58 -84 34 -86 Z" fill="#ff6a13" />
            <ellipse cx="86" cy="-100" rx="6" ry="15" fill="#ffe2b8" />
          </g>
        </g>
      </svg>
    </div>
  );
}


type Mode = "tour" | "data" | "sde" | "all";
type Side = "data" | "sde" | "both";

// Which side of the work a skill belongs to. Categories decide most of it;
// the ones that straddle both sides are listed one by one.
const CATEGORY_SIDE: Record<string, Side> = {
  "Data Engineering": "data",
  "Data & BI": "data",
  "AI & GenAI": "data",
  "Machine Learning": "data",
  "Backend & APIs": "sde",
  Frontend: "sde",
};
const SKILL_SIDE: Record<string, Side> = {
  Python: "both",
  SQL: "data",
  TypeScript: "sde",
  JavaScript: "sde",
  Java: "sde",
  C: "sde",
  "C++": "sde",
  PostgreSQL: "both",
  SQLite: "sde",
  "Azure Databricks": "data",
  Docker: "sde",
  "Git / GitHub": "both",
  "Alembic migrations": "sde",
  pytest: "both",
};
const sideOf = (category: string, skill: string): Side => CATEGORY_SIDE[category] ?? SKILL_SIDE[skill] ?? "both";
const inSpotlight = (mode: Mode, side: Side) => (mode !== "data" && mode !== "sde") || side === "both" || side === mode;

const SIDE_BUTTONS = [
  { mode: "data", label: "Data & AI" },
  { mode: "sde", label: "SDE" },
  { mode: "all", label: "All" },
] as const;

const HINT: Record<Mode, string> = {
  tour: "Or pick a side to spotlight just those tools, or All to light everything.",
  data: "Showing the data and AI tools. Press it again for the lamp tour.",
  sde: "Showing the software development tools. Press it again for the lamp tour.",
  all: "Every light is on. Press All again for the lamp tour.",
};

function SideFilter({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div role="group" aria-label="Spotlight a side">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4f1ea]">Spotlight</p>
      <div className="mt-3 flex gap-2">
        {SIDE_BUTTONS.map((b) => (
          <button
            key={b.mode}
            type="button"
            aria-pressed={mode === b.mode}
            onClick={() => onChange(mode === b.mode ? "tour" : b.mode)}
            data-cursor={mode === b.mode ? "Lamp tour" : b.mode === "all" ? "Light all" : "Spotlight"}
            className={`rounded-full border-2 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
              mode === b.mode
                ? "border-[#ff6a13] bg-[#ff6a13] text-[#16130f]"
                : "border-[#3a4456] text-[#f4f1ea] hover:border-[#ff6a13] hover:text-[#ff8a3d]"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-[270px] text-[12px] leading-snug text-[#8d96a6]">{HINT[mode]}</p>
    </div>
  );
}

export function SkillsLamp() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const ready = useScrollReady();
  const [mode, setMode] = useState<Mode>("tour");
  const [active, setActive] = useState(0);

  const groups = ORDER.flatMap((cat) => {
    const g = skills.find((s) => s.category === cat);
    return g ? [g] : [];
  });
  const n = groups.length;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const s = Math.min(window.innerWidth / 1360, window.innerHeight / 850, 1.25);
      el.style.setProperty("--ls", String(s));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const lamp = root.current?.querySelector<HTMLElement>(".lamp");
        const body = root.current?.querySelector<SVGGElement>(".lamp__body");
        const head = root.current?.querySelector<SVGGElement>(".lamp__head");
        const cone = root.current?.querySelector<SVGPathElement>(".lamp__cone");
        if (!lamp || !body || !head || !cone) return;

        gsap.set(lamp, { x: perch(0).x, y: perch(0).y });
        gsap.set(body, { svgOrigin: "0 0" });
        gsap.set(head, { rotation: 69, svgOrigin: "34 -100" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + (n - 1) * window.innerHeight * 0.6,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" },
            onUpdate: (self) => {
              const t = self.progress * (n - 1);
              const idx = Math.min(n - 1, Math.floor(t + 0.5));
              setActive((cur) => (cur === idx ? cur : idx));
              if (counter.current) counter.current.textContent = String(idx + 1).padStart(2, "0");
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        for (let i = 0; i < n - 1; i++) {
          const a = perch(i);
          const b = perch(i + 1);
          const peak = Math.min(a.y, b.y) - 90;
          // the hop: x glides while y arcs up and back down
          tl.to(lamp, { x: b.x, duration: 0.6, ease: "power1.inOut" }, i + 0.1);
          tl.to(
            lamp,
            {
              keyframes: [
                { y: peak, duration: 0.3, ease: "power2.out" },
                { y: b.y, duration: 0.3, ease: "power2.in" },
              ],
            },
            i + 0.1
          );
          // squash and stretch, like a Pixar lamp
          tl.to(body, { scaleY: 0.8, scaleX: 1.12, duration: 0.1, ease: "power1.in" }, i)
            .to(body, { scaleY: 1.14, scaleX: 0.92, duration: 0.2, ease: "power2.out" }, i + 0.1)
            .to(body, { scaleY: 1.05, scaleX: 0.98, duration: 0.4 }, i + 0.3)
            .to(body, { scaleY: 0.86, scaleX: 1.1, duration: 0.1, ease: "power1.in" }, i + 0.7)
            .to(body, { scaleY: 1, scaleX: 1, duration: 0.2, ease: "elastic.out(1,0.5)" }, i + 0.8);
          // the head tips up in the air and settles back onto the card
          tl.to(head, { rotation: 38, duration: 0.3, ease: "power2.out" }, i + 0.1).to(
            head,
            { rotation: 69, duration: 0.3, ease: "power2.in" },
            i + 0.4
          );
          // the light dips while airborne
          tl.to(cone, { opacity: 0.2, duration: 0.2 }, i + 0.1).to(cone, { opacity: 1, duration: 0.15 }, i + 0.7);
        }
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [ready, n], revertOnUpdate: true }
  );

  return (
    <section
      id="skills"
      ref={root}
      className={`night skills-room relative overflow-hidden bg-paper ${mode === "all" ? "is-bright" : ""} ${mode === "data" || mode === "sde" ? "is-filtered" : ""}`}
    >
      <div aria-hidden="true" className="skills-glow pointer-events-none absolute inset-0" />

      {/* Desktop: the lamp hops between skill sets as you scroll */}
      <div className="lamp-pinned relative h-screen w-full">
        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 h-[830px] w-[1330px]"
          style={{ transform: "translate(-50%, -50%) scale(var(--ls, 0.85))", "--ls": 0.85 } as CSSProperties}
        >
          <div className="absolute left-0 top-[150px] w-[290px]">
            <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ffb547]">
              <span>03</span>
              <span className="h-px w-8 bg-[#ff6a13]" />
              <span className="text-[#f4f1ea]">Toolkit</span>
            </p>
            <h2 className="mt-5 text-[44px] font-black uppercase leading-[0.95] tracking-tight text-[#f4f1ea]">
              One lamp,
              <br />
              one skill set
              <br />
              <span className="text-[#ff6a13]">at a time.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#bdb8ab]">
              Scroll and the lamp hops to the next set. Hover a skill to see the projects it went into.
            </p>
          </div>
          <div className="absolute bottom-[40px] left-0">
            <SideFilter mode={mode} onChange={setMode} />
          </div>

          {groups.map((g, i) => {
            const lit =
              mode === "all" ||
              (mode === "tour" ? i === active : g.skills.some((s) => inSpotlight(mode, sideOf(g.category, s))));
            return (
              <div
                key={g.category}
                data-lit={lit}
                className="skillcard absolute border-2 bg-[#161b23] p-4"
                style={{ left: COL_X[i % 3], top: ROW_Y[Math.floor(i / 3)], width: CARD_W, height: CARD_H }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[15px] font-black uppercase tracking-tight text-[#f4f1ea]">{g.category}</p>
                  <span className="font-mono text-[10px] text-[#8d96a6]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-full border border-[#2b3341] bg-[#0f1217] px-2 py-[1px] transition-opacity duration-500 ${
                        inSpotlight(mode, sideOf(g.category, skill)) ? "" : "opacity-25"
                      }`}
                    >
                      <SkillChip skill={skill} compact />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <Lamp />
        </div>

        <div
          className={`pointer-events-none absolute bottom-6 right-[var(--gut)] z-10 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1ea] transition-opacity duration-300 ${
            mode === "tour" ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>
            <span ref={counter}>01</span> / {String(n).padStart(2, "0")} skill sets
          </span>
          <span className="relative h-[3px] w-28 bg-[#f4f1ea]/15">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[#ff6a13]" />
          </span>
        </div>
      </div>

      {/* Mobile / reduced motion: every set, already lit */}
      <div className="lamp-static px-[var(--gut)] py-20">
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ffb547]">
          <span>03</span>
          <span className="h-px w-8 bg-[#ff6a13]" />
          <span className="text-[#f4f1ea]">Toolkit</span>
        </p>
        <h2 className="mt-5 text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-[0.95] tracking-tight text-[#f4f1ea]">
          Every skill set,
          <br />
          <span className="text-[#ff6a13]">lights on.</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.category} className="rounded-2xl border-2 border-[#ff6a13]/50 bg-[#161b23] p-5">
              <p className="text-[15px] font-black uppercase tracking-tight text-[#f4f1ea]">{g.category}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-[#2b3341] bg-[#0f1217] px-2 py-[1px]">
                    <SkillChip skill={skill} compact />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
