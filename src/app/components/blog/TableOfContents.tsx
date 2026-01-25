"use client";

import { memo, useEffect, useState } from "react";
import { MonoText } from "@/components/ui/typography";
import { blogContent } from "@/lib/content/blog-content";
import { useLanguage } from "@/lib/LanguageContext";
import type { Heading } from "@/types/portfolio";

interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * TableOfContents component - Dynamic table of contents with active state
 *
 * Performance optimizations:
 * - Memoized to prevent re-renders when parent updates
 * - IntersectionObserver for efficient heading tracking
 * - Localized labels via language context
 * - Smooth scroll with enhanced UX
 *
 * Best practices applied:
 * - Wrapped with React.memo() to skip re-renders
 * - displayName for debugging
 * - Debounced scroll updates for performance
 */
export const TableOfContents = memo(({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);
  const { language } = useLanguage();
  const t = blogContent[language].blog;

  useEffect(() => {
    // Use Map for O(1) DOM element lookups instead of repeated document.getElementById()
    // Vercel best practice: cache DOM queries
    const headingElements = new Map<string, HTMLElement>();

    // Build map of heading elements
    for (const { id } of headings) {
      const element = document.getElementById(id);
      if (element) {
        headingElements.set(id, element);
      }
    }

    if (headingElements.size === 0) return;

    // IntersectionObserver to track which heading is visible
    // Optimized rootMargin for better accuracy
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading (top of viewport)
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
          setIsScrolling(false);
        }
      },
      {
        // rootMargin: top, right, bottom, left
        // -88px top: Account for sticky header height
        // -75% bottom: Trigger when heading is 25% of viewport
        rootMargin: "-88px 0px -75% 0px",
        threshold: [0],
      },
    );

    // Observe all heading elements
    for (const element of headingElements.values()) {
      observer.observe(element);
    }

    // Cleanup
    return () => {
      for (const element of headingElements.values()) {
        observer.unobserve(element);
      }
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1.5 sm:space-y-2">
      <MonoText className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground mb-3 sm:mb-4">
        {t.onThisPage}
      </MonoText>

      <ul className="space-y-1 sm:space-y-2 border-l border-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    setIsScrolling(true);

                    // Use element.scrollIntoView() for better browser compatibility
                    // and automatic scroll-padding consideration
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });

                    // Clear scrolling state after animation
                    setTimeout(() => setIsScrolling(false), 800);
                  }
                }}
                className={`
                    relative block py-1 sm:py-1.5 text-xs sm:text-sm transition-all duration-200
                    ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isH3 ? "pl-5 sm:pl-6" : "pl-3 sm:pl-4"}
                    ${
                      isActive
                        ? "text-accent font-medium border-l-2 border-accent -ml-[1px]"
                        : "text-muted-foreground hover:text-foreground border-l-2 border-transparent -ml-[1px] hover:border-border"
                    }
                    ${isScrolling && activeId === heading.id ? "animate-pulse" : ""}
                  `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
