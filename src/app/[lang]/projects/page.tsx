"use client";

import { useMemo, useState } from "react";
import { FilterTags } from "@/components/FilterTags";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/lib/LanguageContext";
import { getProjects } from "@/lib/projects-data";

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects = useMemo(
    () => getProjects(language as "en" | "pt"),
    [language],
  );

  // Extract all unique technologies from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        tags.add(tech);
      }
    }
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.technologies.includes(tag)),
    );
  }, [projects, selectedTags]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {t.projects.badge}
        </div>
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
          {t.projects.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
          {t.projects.description}
        </p>
      </div>

      {/* Filter Tags */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          allTags={allTags}
        />
      </div>

      {/* All Projects Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            {language === "pt"
              ? "Nenhum projeto encontrado com essas tecnologias."
              : "No projects found with those technologies."}
          </p>
        </div>
      )}
    </div>
  );
}
