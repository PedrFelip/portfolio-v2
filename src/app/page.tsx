"use client";

import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.projects.badge}
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">
              {t.projects.title}
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              {t.projects.description}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
            {t.philosophy.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">{t.philosophy.text1}</p>
            <p className="leading-relaxed">{t.philosophy.text2}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
