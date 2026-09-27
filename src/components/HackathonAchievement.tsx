"use client";

import { useProjectModal } from "@/components/ProjectModalProvider";
import { getProject } from "@/lib/data/projects";
import type { HackathonEntry } from "@/lib/types";

/**
 * One achievement row under Education. When the hackathon result has a
 * matching project (via `projectSlug`), an extra link opens that project's
 * existing case-study modal directly — no separate/nested page, and the
 * achievement's own text is left exactly as before.
 */
export function HackathonAchievement({ hackathon }: { hackathon: HackathonEntry }) {
  const openProject = useProjectModal();
  const project = hackathon.projectSlug ? getProject(hackathon.projectSlug) : undefined;

  return (
    <li className="border-l-2 border-l-accent px-4 py-3">
      <p className="text-[14px] font-semibold text-ink">{hackathon.result}</p>
      <p className="mt-0.5 text-sm text-ink-muted">{hackathon.name}</p>
      <p className="mt-1.5 font-mono text-[11px] text-ink-faint">{hackathon.organizer}</p>
      {project ? (
        <button
          type="button"
          onClick={() => openProject(project.slug)}
          className="group mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-strong transition-colors hover:text-accent"
        >
          {project.title}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            → Case study ↗
          </span>
        </button>
      ) : null}
    </li>
  );
}
