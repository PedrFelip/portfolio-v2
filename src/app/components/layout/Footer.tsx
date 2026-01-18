"use client";

import { useLanguage } from "@/lib/LanguageContext";

/**
 * Footer component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Typography: monospace for data
 * - Consistent container: matches Navigation and Section components
 */
export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-mono text-muted-foreground">
          © {t.footer.year} Pedro Felipe.
        </p>
      </div>
    </footer>
  );
};
