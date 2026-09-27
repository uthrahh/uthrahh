"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { trackSpotlight } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
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

export function ProjectCard({
  project,
  index,
  featured = false,
  onOpen,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={trackSpotlight}
      aria-label={`${project.title}: open case study`}
      className={`spotlight group relative block w-full overflow-hidden rounded-2xl border border-border text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] ${
        featured ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <MediaFrame
        asset={project.cover}
        fill
        className="absolute inset-0"
        imgClassName="scale-100 brightness-75 transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-90"
      />

      {/* Scrim: fixed dark gradient regardless of site theme, so overlaid text
          stays legible even over busy, text-heavy screenshots — sustained
          dark opacity through the text zone (bottom ~45%), not just a thin
          edge fade. A light backdrop-blur gives the text zone a frosted-glass
          read without dropping its opacity — the screenshot stays visible
          through the blur, but contrast for the text on top is unchanged. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 from-0% via-black/60 via-45% to-transparent to-85% backdrop-blur-[2px] transition-opacity duration-300 group-hover:from-black/98"
      />

      <div className="absolute left-4 top-4">
        <StatusPill project={project} />
      </div>

      <div className={`absolute inset-x-0 bottom-0 p-5 ${featured ? "sm:p-7" : ""}`}>
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
          <span className="font-medium text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {project.categories.join(" · ")}
        </p>
        <h3
          className={`mt-1.5 font-display text-white ${
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-1.5 leading-relaxed text-white/80 ${
            featured ? "line-clamp-3 text-[15px] sm:max-w-2xl" : "line-clamp-2 text-sm"
          }`}
        >
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, featured ? 6 : 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/70 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
          Read case study
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </button>
  );
}
