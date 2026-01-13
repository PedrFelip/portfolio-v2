"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-semibold tracking-tight text-foreground">
        {t.about.title}
      </h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
