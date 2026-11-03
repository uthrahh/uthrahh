"use client";

import { useRef } from "react";
import { MediaFrame } from "@/components/MediaFrame";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { useScrollReady } from "./SmoothScroll";
import { useStrip } from "./useStrip";
import { orderedProjects, shortTitle } from "@/lib/projectOrder";
import type { Project } from "@/lib/types";

const DESIGN_H = 800;

const TONES = [
  { body: "#16130f", trim: "#ff6a13", door: "#ff6a13", a1: "#ff6a13", a2: "#f4f1ea", sign: "#f4f1ea" },
  { body: "#ff6a13", trim: "#16130f", door: "#16130f", a1: "#16130f", a2: "#f4f1ea", sign: "#16130f" },
  { body: "#cbc2b2", trim: "#16130f", door: "#ff6a13", a1: "#ff6a13", a2: "#f4f1ea", sign: "#16130f" },
  { body: "#1c222c", trim: "#ffb547", door: "#ffb547", a1: "#ffb547", a2: "#2b3341", sign: "#f4f1ea" },
];

function Awning({ a1, a2 }: { a1: string; a2: string }) {
  const scallops = "a25 18 0 0 1 -50 0 ".repeat(8);
  return (
    <svg viewBox="0 0 400 50" className="relative z-10 -mb-1 block h-[50px] w-[400px] origin-top transition-transform duration-300 group-hover:scale-y-110" aria-hidden="true">
      <defs>
        <clipPath id="awning-clip">
          <path d={`M0 0 H400 V30 ${scallops} Z`} />
        </clipPath>
      </defs>
      <g clipPath="url(#awning-clip)">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={i * 50} y="0" width="50" height="60" fill={i % 2 ? a2 : a1} />
        ))}
      </g>
    </svg>
  );
}

function Shop({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const t = TONES[index % TONES.length];
  const tag = `${project.categories[0]} · ${project.status}`;
  return (
    <div className="relative flex w-[400px] shrink-0 flex-col items-center self-end pb-[110px]">
      {/* street lamp */}
      {index % 2 === 0 ? (
        <span aria-hidden="true" className="absolute -left-[54px] bottom-[110px] block h-[300px] w-1.5 bg-[#16130f]">
          <span className="absolute -top-3 -left-4 h-4 w-9 rounded-t-full bg-[#16130f]" />
          <span className="absolute left-1/2 top-2 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,19,0.5),transparent)]" />
        </span>
      ) : null}

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        className="group relative block w-[400px] text-left outline-offset-8"
      >
        {/* sign */}
        <div className="flex h-14 items-center gap-3 px-6" style={{ background: t.trim === "#16130f" ? "#16130f" : t.body, borderTop: `4px solid ${t.trim}` }}>
          <span className="font-mono text-[13px] font-semibold" style={{ color: t.trim === "#16130f" ? "#ff6a13" : t.trim }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate text-[22px] font-black uppercase tracking-tight" style={{ color: t.trim === "#16130f" ? "#f4f1ea" : t.sign }}>
            {shortTitle(project)}
          </span>
        </div>
        <Awning a1={t.a1} a2={t.a2} />
        {/* facade */}
        <div className="relative -mt-1 h-[300px] w-[400px]" style={{ background: t.body }}>
          <div className="absolute left-7 top-5 h-[210px] w-[250px] overflow-hidden" style={{ border: `6px solid ${t.trim}`, background: "#0f1217" }}>
            <MediaFrame
              asset={project.cover}
              fill
              lightbox={false}
              className="absolute inset-0"
              imgClassName="transition-[transform,filter] duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,transparent_38%,transparent_62%,rgba(255,255,255,0.08)_100%)]" />
          </div>
          <div className="absolute right-7 top-9 h-[170px] w-[80px]" style={{ background: t.door, border: `4px solid ${t.trim}` }}>
            <span className="absolute right-2.5 top-[88px] h-2.5 w-2.5 rounded-full bg-[#f4f1ea]" />
            <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-sm bg-[#f4f1ea] px-1.5 font-mono text-[8px] font-bold uppercase text-[#16130f]">
              open
            </span>
          </div>
          <div className="absolute inset-x-7 bottom-6 flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.trim === "#16130f" ? "#16130f" : t.sign }}>
            <span className="truncate">{project.role}</span>
            <span className="ml-3 shrink-0 underline decoration-2 underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Step inside →
            </span>
          </div>
        </div>
      </button>

      <p className="relative z-10 mt-4 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#16130f]">
        {tag}
      </p>
    </div>
  );
}

export function Street() {
  const section = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const ready = useScrollReady();
  const openProject = useProjectModal();
  const list = orderedProjects();

  useStrip({
    section,
    wrap,
    parallax: sky,
    designHeight: DESIGN_H,
    ready,
    onUpdate: ({ progress }) => {
      if (counter.current) counter.current.textContent = String(Math.round(progress * list.length)).padStart(2, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    },
  });

  return (
    <section id="projects" ref={section} className="strip street relative bg-paper">
      <div ref={sky} className="street__sky strip__parallax" aria-hidden="true" />

      <div className="strip__viewport">
        <div ref={wrap} className="strip__wrap" style={{ height: DESIGN_H }}>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[110px] bg-[#ded8cc]">
            <div className="absolute inset-x-0 bottom-0 h-[46px] bg-[#16130f]">
              <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#f4f1ea_0,#f4f1ea_46px,transparent_46px,transparent_92px)]" />
            </div>
          </div>

          <div className="relative flex shrink-0 flex-col justify-start self-stretch px-[8vw] pt-[170px]" style={{ width: 720 }}>
            <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c2450a]">
              <span>02</span>
              <span className="h-px w-10 bg-[#ff6a13]" />
              <span className="text-[#16130f]">The street</span>
            </p>
            <h2 className="mt-6 text-[56px] font-black uppercase leading-[0.95] tracking-tight text-[#16130f]">
              Every project
              <br />
              has an <span className="text-[#ff6a13]">address.</span>
            </h2>
            <p className="mt-6 max-w-[430px] text-[17px] leading-relaxed text-[#4a443c]">
              {list.length} shopfronts, from lakehouse pipelines to full-stack products. Walk the street and step inside any of them for the case study.
            </p>
            <p className="mt-8 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-[#16130f]">
              <span className="h-px w-12 bg-[#ff6a13]" />
              <span className="street__hint-wide">Scroll sideways</span>
              <span className="street__hint-narrow">Swipe sideways</span>
            </p>
          </div>

          {list.map((project, i) => (
            <div key={project.slug} className="flex shrink-0 items-end self-end pr-[120px]">
              <Shop project={project} index={i} onOpen={() => openProject(project.slug)} />
            </div>
          ))}

          <div className="flex shrink-0 flex-col items-start justify-center self-stretch pb-[110px] pl-[40px] pr-[14vw]" style={{ width: 560 }}>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c2450a]">All projects</p>
            <p className="mt-4 text-[64px] font-black uppercase leading-[0.92] tracking-tight text-[#16130f]">
              {list.length} case
              <br />
              studies
            </p>
            <p className="mt-5 max-w-[360px] text-[16px] leading-relaxed text-[#4a443c]">
              Each one covers the problem, the architecture, and what actually shipped.
            </p>
          </div>
        </div>
      </div>

      <div className="strip__counter pointer-events-none absolute bottom-6 left-[var(--gut)] z-10 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16130f]">
        <span>
          <span ref={counter}>00</span> / {String(list.length).padStart(2, "0")} browsed
        </span>
        <span className="relative h-[3px] w-28 bg-[#16130f]/15">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[#ff6a13]" />
        </span>
      </div>
    </section>
  );
}
