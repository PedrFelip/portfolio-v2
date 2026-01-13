"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Greeting */}
      <div className="mb-6 font-mono text-sm text-muted-foreground">
        {t.hero.greeting}
      </div>

      {/* Main Title */}
      <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        {t.hero.title}
      </h1>

      {/* Subtitle/Description */}
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {t.hero.description}
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        <Link
          href="/projects"
          className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-background hover:text-foreground"
        >
          {t.hero.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted"
        >
          {t.hero.ctaSecondary}
        </Link>
      </div>

      {/* Tech Stack Badge */}
      <div className="mt-16 flex flex-wrap gap-2">
        {["Node.js", "TypeScript", "Go", "PostgreSQL", "Docker", "Linux"].map(
          (tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ),
        )}
      </div>
    </section>
  );
};
