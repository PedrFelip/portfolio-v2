export type Language = "en" | "pt";

export function getLanguageFromParams(
  params: { lang?: string } | undefined,
): Language {
  if (!params?.lang) return "en";
  const lang = params.lang.toLowerCase();
  return lang === "pt" ? "pt" : "en";
}

export function getLocalizedPath(path: string, lang: Language): string {
  return `/${lang}${path}`;
}

export function getAllLanguageParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}
