import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

// Alternates the two sides of the work (data, then apps) so the street reads
// as one body of work, with everything not listed following in file order.
const ORDER = [
  "data-pipeline-sentinel",
  "abov-hr",
  "reckitt-sales-analytics-pipeline",
  "women360",
  "ev-fleet-lakehouse-platform",
  "task-goal-tracker",
  "autcore",
  "aic-erp",
  "aic-worklog-automation",
  "last-mile-delivery-tracker",
  "aic-facility-booking",
];

export function orderedProjects(): Project[] {
  const rank = (slug: string) => {
    const i = ORDER.indexOf(slug);
    return i === -1 ? ORDER.length : i;
  };
  return [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));
}

/** "Sentinel: Databricks Pipeline Observability…" -> "Sentinel" */
export function shortTitle(p: Project) {
  return p.title.includes(":") ? p.title.split(":")[0] : p.title;
}
