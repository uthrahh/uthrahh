"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/ui";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

// Required first row, in this exact order, regardless of featured/array
// order: AutCore, Abov, Women360, FMCG Sales Analytics Pipeline.
const PRIORITY_ORDER = ["autcore", "abov-hr", "women360", "reckitt-sales-analytics-pipeline"];

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
    <section id="projects" className="scroll-mt-6 border-b border-border">
      <Container className="py-5 sm:py-6">
        <SectionHeading eyebrow="Projects" />

        <div className="mt-3">
          <ProjectsExplorer projects={sorted} onOpenProject={openProject} />
        </div>
      </Container>
    </section>
  );
}
