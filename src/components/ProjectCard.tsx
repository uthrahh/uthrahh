"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { trackSpotlight } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { shortTitle } from "@/lib/projectOrder";
import type { Project } from "@/lib/types";

const STATUS_DOT: Record<Project["status"], string> = {
  "Award winner": "bg-gold",
  "Shipped internally": "bg-ok",
  Completed: "bg-ok",
  "Product in development": "bg-cool",
  "In progress": "bg-cool",
  "Proof of concept": "bg-silver",
};

function StatusPill({ project }: { project: Project }) {
  const label = project.achievement
    ? `${project.achievement.rank} · ${project.achievement.event}`
    : project.status;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white backdrop-blur-md">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
      {label}
    </span>
  );
}

/** A project as a poster: the cover fills the card, the text sits on top of it. */
export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={trackSpotlight}
      aria-label={`${project.title}: open case study`}
      className="spotlight group relative block aspect-[10/9] w-full overflow-hidden rounded-2xl border-2 border-ink text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--accent)]"
    >
      <MediaFrame
        asset={project.cover}
        fill
        className="absolute inset-0"
        imgClassName="scale-100 brightness-75 transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-90"
      />

      {/* Fixed dark scrim whatever the page theme, so the text stays legible
          over busy, text-heavy screenshots. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 from-0% via-black/65 via-50% to-transparent to-90% transition-opacity duration-300 group-hover:from-black"
      />

      <div className="absolute left-4 top-4">
        <StatusPill project={project} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
          <span className="font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {project.categories[0]}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[1.45rem] font-black uppercase leading-[1.02] tracking-tight text-white">
          {shortTitle(project)}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/80">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[10.5px] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
          Read case study
          <ArrowUpRight
            size={13}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </button>
  );
}
