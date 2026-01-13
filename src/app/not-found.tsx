"use client";

import Link from "next/link";

import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 grid place-items-center bg-background p-4 overflow-hidden">
      <section className="w-full max-w-sm rounded-lg border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-muted-foreground tabular-nums">
              {t.notFound.subtitle}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              ERR_NOT_FOUND
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              {t.notFound.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t.notFound.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-foreground bg-foreground px-3 py-2 text-xs font-medium text-background transition-colors hover:bg-background hover:text-foreground"
            >
              {t.notFound.cta}
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted"
            >
              {t.nav.projects}
            </Link>
          </div>

          <div className="rounded-md border border-border bg-muted/20 px-3 py-2">
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              {`> ${t.nav.home}  ${t.nav.about}  ${t.nav.projects}  ${t.nav.blog}`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
