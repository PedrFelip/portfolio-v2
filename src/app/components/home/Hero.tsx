import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface HeroProps {
  greeting: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  primaryHref: string;
  secondaryHref: string;
  techStack: string[];
}

/**
 * TechBadge component
 *
 * Memoized to prevent re-renders when techStack array changes reference
 * (Vercel: rerender-memo - Extract expensive work into memoized components)
 */
interface TechBadgeProps {
  tech: string;
  index: number;
}

const TechBadge = memo(({ tech, index }: TechBadgeProps) => (
  <span
    className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
    style={{ animationDelay: `${500 + index * 50}ms` }}
  >
    {tech}
  </span>
));

TechBadge.displayName = "TechBadge";

/**
 * Hero section component
 *
 * Fully memoized with proper prop typing to prevent unnecessary re-renders
 * when parent component updates (Vercel: rerender-memo)
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when props don't change
 * - Child components (TechBadge) are memoized separately
 * - displayName for DevTools debugging
 * - Proper TypeScript interfaces for all props
 */
export const Hero = memo(
  ({
    greeting,
    title,
    description,
    ctaPrimary,
    ctaSecondary,
    primaryHref,
    secondaryHref,
    techStack,
  }: HeroProps) => {
    return (
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="mb-4 sm:mb-6 font-mono text-xs sm:text-sm text-muted-foreground animate-fade-in-up">
            {greeting}
          </div>

          {/* Main Title */}
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground animate-fade-in-up animate-delay-100">
            {title}
          </h1>

          {/* Subtitle/Description */}
          <p className="mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg md:text-lg leading-relaxed text-muted-foreground animate-fade-in-up animate-delay-200">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row mb-12 sm:mb-16 animate-fade-in-up animate-delay-300">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-background transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-background hover:text-foreground"
            >
              {ctaPrimary}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex flex-wrap gap-2 animate-fade-in-up animate-delay-400">
            {techStack.map((tech, index) => (
              <TechBadge key={tech} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Hero.displayName = "Hero";
