"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

/**
 * ProjectLink component
 *
 * Design principles (AGENTS.md):
 * - Isolated Controls: crafted UI element, not plain text
 * - 4px grid: consistent spacing and padding
 * - Symmetrical padding: px-3 py-1.5 matching all sides
 * - Borders-only approach: subtle borders, no heavy shadows
 * - Typography: monospace for labels
 * - Animation: 150ms with cubic-bezier easing
 * - Mobile-first: optimized for touch targets
 *
 * Memoized to prevent re-renders
 */
const ProjectLink = memo(({ href, label, icon }: ProjectLinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground/70 hover:text-foreground hover:bg-muted/50 active:scale-95"
  >
    <span className="transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
      {icon}
    </span>
    <span>{label}</span>
  </Link>
));

ProjectLink.displayName = "ProjectLink";

/**
 * ProjectCard component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, minimal depth
 * - Typography: monospace for data (dates, tech, links)
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized for small screens
 * - Card Layouts Vary: internal structure for specific content
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when project prop doesn't change
 * - Flex column layout to push links to bottom consistently
 * - Separates concerns: header, description, tech list, links
 * - Uses Fragment for conditional rendering (Vercel: rendering-conditional-render)
 * - Child component (ProjectLink) handles its own memoization
 */
export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const linkLabels = t.projects.links;
  const techCount = project.technologies.length;
  const displayedTechs = project.technologies.slice(0, 6);
  const remainingTechs = techCount > 6 ? techCount - 6 : 0;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:shadow-sm hover:-translate-y-0.5 sm:p-6">
      {/* Header: Title + Dates */}
      <div className="mb-3 flex flex-col gap-1.5 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-base font-semibold text-foreground pr-2 transition-colors duration-150 sm:text-lg">
          {project.title}
        </h3>
        {project.dates && (
          <span className="whitespace-nowrap tabular-nums font-mono text-xs text-muted-foreground">
            {project.dates}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 flex-grow text-sm leading-relaxed text-muted-foreground sm:mb-4">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
        {displayedTechs.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
          >
            {tech}
          </span>
        ))}
        {remainingTechs > 0 && (
          <span className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            +{remainingTechs}
          </span>
        )}
      </div>

      {/* Links - always pushed to bottom */}
      {project.links && (
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.links.github && (
            <ProjectLink
              href={project.links.github}
              label={linkLabels.code}
              icon={<Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
          )}
          {project.links.demo && (
            <ProjectLink
              href={project.links.demo}
              label={linkLabels.demo}
              icon={<ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
          )}
          {project.links.website && (
            <ProjectLink
              href={project.links.website}
              label={linkLabels.website}
              icon={<ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
          )}
        </div>
      )}
    </article>
  );
});

ProjectCard.displayName = "ProjectCard";
