"use client";

import { useState } from "react";
import { ExperienceHighlights } from "@/components/ExperienceHighlights";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { trackSpotlight } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import type { ExperienceItem, Workstream } from "@/lib/types";

// Org marks already shipped in /public. Unknown orgs fall back to initials.
const LOGOS: Record<string, string> = {
  KaarTech: "/kaartech.png",
  "AIC - Crescent Innovation and Incubation Council": "/aic-mark.png",
};

function OrgMark({ org }: { org: string }) {
  const src = LOGOS[org];
  return (
    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-8 w-8 object-contain" />
      ) : (
        <span className="font-mono text-sm font-semibold text-neutral-800">{org.slice(0, 2)}</span>
      )}
    </span>
  );
}

function WorkstreamCard({ w }: { w: Workstream }) {
  const openProject = useProjectModal();
  const clickable = Boolean(w.projectSlug);
  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => w.projectSlug && openProject(w.projectSlug)}
      onPointerMove={trackSpotlight}
      className="spotlight group flex h-full flex-col rounded-xl border border-border bg-paper-sunken p-4 text-left transition-colors hover:border-accent/60 disabled:cursor-default disabled:hover:border-border"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-[14.5px] font-semibold leading-snug text-ink">{w.title}</span>
        {clickable ? (
          <ArrowUpRight
            size={15}
            className="mt-0.5 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
          />
        ) : null}
      </span>
      <span className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{w.oneLiner}</span>
      <span className="mt-auto pt-3 font-mono text-[11px] leading-relaxed text-ink-faint">
        {w.technologies.slice(0, 4).join(" · ")}
      </span>
    </button>
  );
}

/**
 * One timeline entry: org mark on the rail, role header, a summary that
 * expands into grouped highlights, and the workstreams as clickable cards
 * that open the matching case study.
 */
export function ExperienceEntry({ exp }: { exp: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="relative grid grid-cols-[48px_1fr] gap-x-5 sm:gap-x-7" data-reveal="">
      <OrgMark org={exp.org} />

      <div className="min-w-0 pb-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h3 className="text-xl font-bold leading-snug tracking-tight text-ink sm:text-[1.4rem]">
              {exp.role}{" "}
              <span className="font-normal text-ink-faint">@</span>{" "}
              {exp.orgUrl ? (
                <a
                  href={exp.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong underline-offset-4 hover:underline"
                >
                  {exp.org}
                </a>
              ) : (
                <span className="text-accent-strong">{exp.org}</span>
              )}
            </h3>
            <p className="mt-1.5 font-mono text-[11.5px] uppercase tracking-wider text-ink-faint">
              {exp.employmentType} · {exp.workMode} · {exp.city}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-paper-raised px-3 py-1 font-mono text-xs text-ink-muted">
            {exp.start} – {exp.end}
          </span>
        </div>

        {exp.summary ? (
          <div className="mt-4 max-w-3xl">
            <ExperienceHighlights
              summary={exp.summary}
              groups={exp.highlightGroups ?? []}
              expanded={expanded}
              onToggle={() => setExpanded((v) => !v)}
            />
          </div>
        ) : null}

        {exp.workstreams.length ? (
          <div className="mt-5">
            <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
              Workstreams
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {exp.workstreams.map((w) => (
                <WorkstreamCard key={w.title} w={w} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
