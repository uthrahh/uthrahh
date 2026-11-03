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

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      data-cursor={on ? "Lamp mode" : "Big light"}
      className="group flex items-center gap-4 text-left"
    >
      <span className="relative block h-[96px] w-[62px] rounded-xl border-2 border-[#3a4456] bg-[#d9d3c5] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
        <span className="absolute left-1/2 top-1/2 h-[64px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#b9b2a2]" />
        <span
          className={`absolute left-1/2 h-[34px] w-[22px] -translate-x-1/2 rounded-md bg-[#ff6a13] shadow-md transition-all duration-300 ${
            on ? "top-[16px]" : "top-[46px]"
          }`}
        />
      </span>
      <span>
        <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4f1ea]">Big light</span>
        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#ffb547]">{on ? "On" : "Off"}</span>
        <span className="mt-2 block max-w-[150px] text-[12px] leading-snug text-[#8d96a6]">
          {on ? "Everything is lit. Flip it back for the lamp." : "Flip it to see every skill at once."}
        </span>
      </span>
    </button>
  );
}

export function SkillsLamp() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const ready = useScrollReady();
  const [bright, setBright] = useState(false);
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
      className={`night skills-room relative overflow-hidden bg-paper ${bright ? "is-bright" : ""}`}
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
            <Switch on={bright} onToggle={() => setBright((b) => !b)} />
          </div>

          {groups.map((g, i) => {
            const lit = bright || i === active;
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
                    <li key={skill} className="rounded-full border border-[#2b3341] bg-[#0f1217] px-2 py-[1px]">
                      <SkillChip skill={skill} compact />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <Lamp />
        </div>

        <div className="pointer-events-none absolute bottom-6 right-[var(--gut)] z-10 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1ea]">
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
