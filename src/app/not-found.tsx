"use client";

import { useEffect, useState } from "react";
import { NotFound } from "@/components/NotFound";
import type { Language } from "@/lib/i18n";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function RootNotFound() {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detectedLang = navigator.language.includes("pt") ? "pt" : "en";
    setLang(detectedLang);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <LanguageProvider initialLanguage={lang}>
      <NotFound />
    </LanguageProvider>
  );
}
