"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          {t.projects.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.projects.description}
        </p>
      </div>

      {/* All Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
