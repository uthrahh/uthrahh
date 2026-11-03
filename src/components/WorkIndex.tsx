"use client";

import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { orderedProjects } from "@/lib/projectOrder";

export function WorkIndex() {
  const openProject = useProjectModal();
  return <ProjectsExplorer projects={orderedProjects()} onOpenProject={openProject} />;
}
