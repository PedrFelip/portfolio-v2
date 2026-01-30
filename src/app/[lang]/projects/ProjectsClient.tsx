"use client";

import { memo, useMemo, useState } from "react";
import { FilterTags } from "@/components/projects/FilterTags";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { P } from "@/components/ui";
import type { Project } from "@/types/portfolio";

interface ProjectsClientProps {
  projects: Project[];
  emptyStateLabel: string;
}

// ✅ Memoized card wrapper to prevent unnecessary re-renders (Vercel 5.2)
const AnimatedProjectCard = memo(
  ({ project, delay }: { project: Project; delay: string }) => (
    <div className="animate-in-up" style={{ animationDelay: delay }}>
      <ProjectCard project={project} />
    </div>
  ),
);

AnimatedProjectCard.displayName = "AnimatedProjectCard";

export default function ProjectsClient({
  projects,
  emptyStateLabel,
}: ProjectsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // ✅ useMemo with Set for O(1) lookups (Vercel 7.11)
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        tags.add(tech);
      }
    }
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.technologies.includes(tag)),
    );
  }, [projects, selectedTags]);

  // ✅ Memoized project cards - only recreates when filteredProjects changes
  const projectCards = useMemo(
    () =>
      filteredProjects.map((project, index) => (
        <AnimatedProjectCard
          key={project.id}
          project={project}
          delay={`${index * 50}ms`}
        />
      )),
    [filteredProjects],
  );

  return (
    <>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          allTags={allTags}
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectCards}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <P className="text-muted-foreground">{emptyStateLabel}</P>
        </div>
      ) : null}
    </>
  );
}
