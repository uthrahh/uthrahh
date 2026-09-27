"use client";

import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/ui";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

// Display order: data engineering proof first (Sentinel is the lead asset),
// then analytics, the hackathon win, and backend/product work.
const PRIORITY_ORDER = [
  "autcore",
  "data-pipeline-sentinel",
  "reckitt-sales-analytics-pipeline",
  "ev-fleet-lakehouse-platform",
  "ai-powered-sap-erp-intelligence-assistant",
  "aic-facility-booking",
  "aic-erp",
  "aic-worklog-automation",
  "abov-hr",
  "last-mile-delivery-tracker",
  "women360",
  "task-goal-tracker",
];

export function ProjectsSection() {
  const openProject = useProjectModal();

  const priority = PRIORITY_ORDER.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter((p): p is Project => Boolean(p));

  const rest = projects
    .filter((p) => !PRIORITY_ORDER.includes(p.slug))
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));

  const sorted = [...priority, ...rest];

  return (
    <Section id="projects" className="border-y border-border bg-paper-sunken/40">
      <Container>
        <SectionHeading
          index="02"
          title="Selected work"
          caption="case studies, click any card"
          description="Data platforms, backend systems and applied AI, each with the problem, the architecture and what actually shipped."
        />

        <div className="mt-10">
          <ProjectsExplorer projects={sorted} onOpenProject={openProject} />
        </div>
      </Container>
    </Section>
  );
}
