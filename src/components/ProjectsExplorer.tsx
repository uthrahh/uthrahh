"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchIcon } from "@/components/icons";
import type { Project, ProjectCategory } from "@/lib/types";

const CATEGORIES: ProjectCategory[] = [
  "Data Engineering",
  "AI & GenAI",
  "Software Engineering",
  "Full-Stack",
  "Data Analytics & ML",
];

/** Every project, filterable by category and searchable by name or tech. */
export function ProjectsExplorer({
  projects,
  onOpenProject,
}: {
  projects: Project[];
  onOpenProject: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);

  const counts = useMemo(() => {
    const map = new Map<ProjectCategory, number>();
    for (const p of projects) for (const c of p.categories) map.set(c, (map.get(c) ?? 0) + 1);
    return map;
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (activeCategory && !p.categories.includes(activeCategory)) return false;
      if (!q) return true;
      return [p.title, p.summary, ...p.technologies, ...p.categories].join(" ").toLowerCase().includes(q);
    });
  }, [projects, query, activeCategory]);

  function reset() {
    setQuery("");
    setActiveCategory(null);
  }

  const pill = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-border-strong text-ink-muted hover:border-ink hover:text-ink"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
          <button type="button" onClick={() => setActiveCategory(null)} aria-pressed={activeCategory === null} className={pill(activeCategory === null)}>
            All <span className="opacity-70">{projects.length}</span>
          </button>
          {CATEGORIES.filter((c) => counts.get(c)).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory((cur) => (cur === cat ? null : cat))}
              aria-pressed={activeCategory === cat}
              className={pill(activeCategory === cat)}
            >
              {cat} <span className="opacity-70">{counts.get(cat)}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full shrink-0 lg:w-72">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <SearchIcon size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or tech…"
            className="h-11 w-full rounded-full border-2 border-border-strong bg-paper-raised pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus-visible:border-ink"
          />
        </div>
      </div>

      <p className="sr-only" role="status">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div
              key={project.slug}
              data-reveal=""
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}
            >
              <ProjectCard
                project={project}
                index={projects.indexOf(project)}
                onOpen={() => onOpenProject(project.slug)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-border-strong p-12 text-center">
          <p className="text-sm text-ink-muted">
            Nothing matches that search.{" "}
            <button type="button" onClick={reset} className="font-semibold text-accent-strong underline underline-offset-4">
              Reset filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
