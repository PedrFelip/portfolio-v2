"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

export const Hero = () => {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Greeting */}
        <div className="mb-4 sm:mb-6 font-mono text-xs sm:text-sm text-muted-foreground animate-fade-in-up">
          {t.hero.greeting}
        </div>

        {/* Main Title */}
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground animate-fade-in-up animate-delay-100">
          {t.hero.title}
        </h1>

        {/* Subtitle/Description */}
        <p className="mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg md:text-lg leading-relaxed text-muted-foreground animate-fade-in-up animate-delay-200">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row mb-12 sm:mb-16 animate-fade-in-up animate-delay-300">
          <Link
            href={getLocalizedLink("/projects")}
            className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-background transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-background hover:text-foreground"
          >
            {t.hero.cta}
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
          </Link>

          <Link
            href={getLocalizedLink("/about")}
            className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>

        {/* Tech Stack Badge */}
        <div className="flex flex-wrap gap-2 animate-fade-in-up animate-delay-400">
          {[
            "Node.js",
            "TypeScript",
            "NestJS",
            "PostgreSQL",
            "Docker",
            "Linux",
          ].map((tech, index) => (
            <span
              key={tech}
              className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
              style={{ animationDelay: `${500 + index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
