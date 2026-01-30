"use client";

import { memo, startTransition, useEffect, useRef, useState } from "react";
import { MonoText } from "@/components/ui/typography";
import { blogContent } from "@/lib/content/blog-content";
import { useLanguage } from "@/lib/LanguageContext";
import type { Heading } from "@/types/portfolio";

interface TableOfContentsProps {
  headings: Heading[];
}

const HEADER_HEIGHT = 88;
const TOP_THRESHOLD = 150;

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export const TableOfContents = memo(({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);
  const { language } = useLanguage();
  const t = blogContent[language].blog;
  const activeIdRef = useLatest(activeId);

  useEffect(() => {
    const headingElements = new Map<string, HTMLElement>();

    for (const { id } of headings) {
      const element = document.getElementById(id);
      if (element) {
        headingElements.set(id, element);
      }
    }

    if (headingElements.size === 0) return;

    let ticking = false;

    const updateActiveHeading = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < TOP_THRESHOLD && headingElements.size > 0) {
        const firstHeadingId = Array.from(headingElements.keys())[0];
        if (firstHeadingId && firstHeadingId !== activeIdRef.current) {
          startTransition(() => setActiveId(firstHeadingId));
        }
        ticking = false;
        return;
      }

      const viewportCenter =
        currentScrollY + HEADER_HEIGHT + window.innerHeight / 2;
      let closestHeadingId = "";
      let minDistance = Infinity;

      for (const [id, element] of headingElements) {
        const rect = element.getBoundingClientRect();
        const elementTop = currentScrollY + rect.top;
        const distance = Math.abs(elementTop - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestHeadingId = id;
        }
      }

      if (closestHeadingId && closestHeadingId !== activeIdRef.current) {
        startTransition(() => setActiveId(closestHeadingId));
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    updateActiveHeading();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings, activeIdRef]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    setIsScrolling(true);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const handleScrollEnd = () => {
      setIsScrolling(false);
      window.removeEventListener("scrollend", handleScrollEnd);
    };

    window.addEventListener("scrollend", handleScrollEnd, { passive: true });

    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
      window.removeEventListener("scrollend", handleScrollEnd);
    }, 1000);

    const handleScrollCleanup = () => {
      window.removeEventListener("scrollend", handleScrollEnd);
      clearTimeout(timeoutId);
    };

    window.addEventListener("scrollend", handleScrollCleanup, {
      passive: true,
    });
  };

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
                onClick={(e) => handleClick(e, heading.id)}
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
