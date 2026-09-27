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

const INITIAL_VISIBLE_COUNT = 7; // 1 featured (2 columns) + 6 regular = 3 full rows

export function ProjectsExplorer({
  projects,
  onOpenProject,
}: {
  projects: Project[];
  onOpenProject: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);
  const [expanded, setExpanded] = useState(false);

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

  const hasFilters = query.trim().length > 0 || activeCategory !== null;
  const canCollapse = !hasFilters && filtered.length > INITIAL_VISIBLE_COUNT;
  const visible = canCollapse && !expanded ? filtered.slice(0, INITIAL_VISIBLE_COUNT) : filtered;

  function reset() {
    setQuery("");
    setActiveCategory(null);
    setExpanded(false);
  }

  const pill = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" data-reveal="">
        <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
          <button type="button" onClick={() => setActiveCategory(null)} aria-pressed={activeCategory === null} className={pill(activeCategory === null)}>
            All <span className="font-mono text-[11px] opacity-70">{projects.length}</span>
          </button>
          {CATEGORIES.filter((c) => counts.get(c)).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory((cur) => (cur === cat ? null : cat))}
              aria-pressed={activeCategory === cat}
              className={pill(activeCategory === cat)}
            >
              {cat} <span className="font-mono text-[11px] opacity-70">{counts.get(cat)}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full shrink-0 lg:w-64">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <SearchIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or tech…"
            className="h-10 w-full rounded-full border border-border bg-paper-raised pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus-ring"
          />
        </div>
      </div>

      <p className="sr-only" role="status">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
      </p>

      {filtered.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => {
              const featured = i === 0 && !hasFilters;
              return (
                <div
                  key={project.slug}
                  data-reveal=""
                  style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}
                  className={featured ? "sm:col-span-2 lg:col-span-3" : ""}
                >
                  <ProjectCard
                    project={project}
                    index={projects.indexOf(project)}
                    featured={featured}
                    onOpen={() => onOpenProject(project.slug)}
                  />
                </div>
              );
            })}
          </div>

          {canCollapse ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-strong"
              >
                {expanded ? "Show fewer" : `Show all ${filtered.length} projects`}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${expanded ? "-rotate-180" : ""}`}
                >
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-ink-muted">
            Nothing matches that search.{" "}
            <button type="button" onClick={reset} className="font-medium text-accent-strong underline underline-offset-4">
              Reset filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
