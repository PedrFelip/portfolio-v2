"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group rounded-lg border border-border bg-card p-4 sm:p-6 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:shadow-sm hover:-translate-y-0.5">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-foreground pr-2 transition-colors duration-150">
          {project.title}
        </h3>
        {project.dates && (
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap tabular-nums">
            {project.dates}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 6 && (
          <span className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            +{project.technologies.length - 6}
          </span>
        )}
      </div>

      {/* Links */}
      {project.links && (
        <div className="flex flex-wrap gap-3">
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
            >
              <Github className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
              <span>Code</span>
            </Link>
          )}
          {project.links.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
              <span>Demo</span>
            </Link>
          )}
          {project.links.website && (
            <Link
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
              <span>Website</span>
            </Link>
          )}
        </div>
      )}
    </article>
  );
};
