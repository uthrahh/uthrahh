"use client";

import { useRef, type CSSProperties } from "react";
import { SkillChip } from "@/components/SkillChip";
import { useScrollReady } from "./SmoothScroll";
import { useStrip } from "./useStrip";
import { skills } from "@/lib/data/skills";

const DESIGN_H = 800;

const ZONES = [
  {
    key: "bronze",
    name: "Bronze",
    note: "Raw: languages and storage",
    color: "#b8693a",
    categories: ["Languages", "Databases"],
  },
  {
    key: "silver",
    name: "Silver",
    note: "Refined: pipelines and services",
    color: "#a9b4c2",
    categories: ["Data Engineering", "Backend & APIs", "Machine Learning"],
  },
  {
    key: "gold",
    name: "Gold",
    note: "Served: analytics, AI and apps",
    color: "#e0a62a",
    categories: ["Data & BI", "AI & GenAI", "Frontend", "Cloud & Tools"],
  },
] as const;

function Gate({ name, note, color }: { name: string; note: string; color: string }) {
  return (
    <div className="relative flex h-[430px] w-[260px] shrink-0 items-end justify-center self-end" aria-hidden="true">
      <span className="absolute bottom-0 left-4 h-[400px] w-3 bg-[#2b3341]" />
      <span className="absolute bottom-0 right-4 h-[400px] w-3 bg-[#2b3341]" />
      <span className="absolute left-4 right-4 top-[26px] h-5 bg-[#2b3341]" />
      <div className="absolute left-1/2 top-0 w-[210px] -translate-x-1/2 border-2 bg-[#0f1217] px-4 py-2 text-center" style={{ borderColor: color }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8d96a6]">{note}</p>
        <p className="text-[22px] font-black uppercase tracking-tight" style={{ color }}>
          {name}
        </p>
      </div>
      <span className="gate-beam absolute left-7 right-7 top-[52px] bottom-0 opacity-70" style={{ "--c": color } as CSSProperties} />
    </div>
  );
}

export function Pipeline() {
  const section = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const scanLabel = useRef<HTMLSpanElement>(null);
  const current = useRef<HTMLElement | null>(null);
  const ready = useScrollReady();

  const crates = ZONES.flatMap((z) =>
    z.categories.flatMap((cat) => {
      const group = skills.find((g) => g.category === cat);
      return group ? [{ zone: z, group }] : [];
    })
  );
  const toolCount = new Set(crates.flatMap((c) => c.group.skills)).size;

  useStrip({
    section,
    wrap,
    parallax: sky,
    parallaxFactor: 0.15,
    designHeight: DESIGN_H,
    ready,
    onUpdate: ({ progress, scale }) => {
      const sec = section.current;
      if (!sec) return;
      sec.style.setProperty("--ss", String(scale));
      if (counter.current) counter.current.textContent = String(Math.round(progress * crates.length)).padStart(2, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;

      const mid = window.innerWidth / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const el of Array.from(sec.querySelectorAll<HTMLElement>("[data-crate]"))) {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      }
      const target: HTMLElement | null = bestDist < 220 ? best : null;
      if (target !== current.current) {
        current.current?.classList.remove("is-scanned");
        target?.classList.add("is-scanned");
        current.current = target;
        if (scanLabel.current) scanLabel.current.textContent = target?.dataset.crate ?? "standing by";
      }
    },
  });

  return (
    <section id="skills" ref={section} className="strip pipeline night relative bg-paper" style={{ "--ss": 0.9 } as CSSProperties}>
      <div ref={sky} className="pipeline__grid strip__parallax" aria-hidden="true" />

      <div className="pipeline__scanner pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center md:flex" aria-hidden="true">
        <div className="border border-[#ff6a13] bg-[#0f1217] px-4 py-2 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8d96a6]">Scanning</p>
          <p className="min-w-[150px] font-mono text-[12px] font-semibold uppercase tracking-wider text-[#ffb547]">
            <span ref={scanLabel}>standing by</span>
          </p>
        </div>
        <span className="pipeline__beam" />
      </div>

      <div className="strip__viewport">
        <div ref={wrap} className="strip__wrap" style={{ height: DESIGN_H }}>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-[110px] h-10 border-t-4 border-[#3a4456] bg-[#2b3341] pipeline__belt" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-[44px] h-[66px] pipeline__legs" />

          <div className="relative flex shrink-0 flex-col justify-start self-stretch px-[8vw] pt-[170px]" style={{ width: 760 }}>
            <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ffb547]">
              <span>03</span>
              <span className="h-px w-10 bg-[#ff6a13]" />
              <span className="text-[#f4f1ea]">The pipeline</span>
            </p>
            <h2 className="mt-6 text-[56px] font-black uppercase leading-[0.95] tracking-tight text-[#f4f1ea]">
              Behind the apps,
              <br />
              <span className="text-[#ffb547]">a pipeline.</span>
            </h2>
            <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-[#bdb8ab]">
              Raw tools go in at Bronze and come out as shipped work at Gold. Hover any skill to see the projects it
              actually went into.
            </p>
            <p className="mt-8 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-[#f4f1ea]">
              <span className="h-px w-12 bg-[#ff6a13]" />
              <span className="street__hint-wide">Scroll sideways</span>
              <span className="street__hint-narrow">Swipe sideways</span>
            </p>
          </div>

          {ZONES.map((z) => (
            <div key={z.key} className="flex shrink-0 items-end self-end pb-[150px]">
              <Gate name={z.name} note={z.note} color={z.color} />
              {crates
                .filter((c) => c.zone.key === z.key)
                .map(({ group }, i) => (
                  <div
                    key={group.category}
                    data-crate={group.category}
                    className="crate relative mr-[40px] flex h-[360px] w-[290px] shrink-0 flex-col border-2 bg-[#161b23] transition-[transform,box-shadow] duration-300"
                    style={{ borderColor: z.color, "--c": z.color } as CSSProperties}
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 text-[#0f1217]" style={{ background: z.color }}>
                      <span className="text-[15px] font-black uppercase tracking-tight">{group.category}</span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider">
                        {z.name} · {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <ul className="flex flex-wrap content-start gap-2 p-4">
                      {group.skills.map((skill) => (
                        <li key={skill} className="rounded-full border border-[#2b3341] bg-[#0f1217] px-3 py-1">
                          <SkillChip skill={skill} />
                        </li>
                      ))}
                    </ul>
                    <span aria-hidden="true" className="mt-auto flex items-center justify-between px-4 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8d96a6]">
                      <span>{group.skills.length} items</span>
                      <span>▮▮▯▮▯▮▮</span>
                    </span>
                  </div>
                ))}
            </div>
          ))}

          <div className="flex shrink-0 flex-col items-start justify-center self-stretch pb-[150px] pl-[40px] pr-[14vw]" style={{ width: 560 }}>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ffb547]">End of the belt</p>
            <p className="mt-4 text-[64px] font-black uppercase leading-[0.92] tracking-tight text-[#f4f1ea]">
              {toolCount} tools,
              <br />
              <span className="text-[#ff6a13]">one stack.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="strip__counter pointer-events-none absolute bottom-6 left-[var(--gut)] z-10 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1ea]">
        <span>
          <span ref={counter}>00</span> / {String(crates.length).padStart(2, "0")} shipped
        </span>
        <span className="relative h-[3px] w-28 bg-[#f4f1ea]/15">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[#ff6a13]" />
        </span>
      </div>
    </section>
  );
}
