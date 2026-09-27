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
      className={`spotlight group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-paper-raised text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-[58%]" : "aspect-[16/10]"}`}>
        <MediaFrame
          asset={project.cover}
          fill
          className="absolute inset-0"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusPill project={project} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:justify-center lg:p-8" : ""}`}>
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          <span className="font-medium text-accent-strong">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {project.categories.join(" · ")}
        </p>
        <h3
          className={`mt-2.5 font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent-strong ${
            featured ? "text-2xl sm:text-[1.75rem]" : "text-[1.2rem]"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-2 text-[14px] leading-relaxed text-ink-muted ${featured ? "line-clamp-4" : "line-clamp-3"}`}
        >
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.technologies.slice(0, featured ? 6 : 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-paper-sunken px-2.5 py-0.5 font-mono text-[11px] text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
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
