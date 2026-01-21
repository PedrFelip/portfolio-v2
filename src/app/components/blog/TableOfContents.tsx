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
 *
 * Best practices applied:
 * - Wrapped with React.memo() to skip re-renders
 * - displayName for debugging
 */
export const TableOfContents = memo(({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
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
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px", // Adjust for header offset
        threshold: 1.0,
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
                    const offset = 80; // Header height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.scrollY - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`
                    block py-1 sm:py-1.5 text-xs sm:text-sm transition-all duration-150
                    ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isH3 ? "pl-5 sm:pl-6" : "pl-3 sm:pl-4"}
                    ${
                      isActive
                        ? "text-accent border-l-2 border-accent -ml-[1px]"
                        : "text-muted-foreground hover:text-foreground border-l-2 border-transparent -ml-[1px]"
                    }
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
