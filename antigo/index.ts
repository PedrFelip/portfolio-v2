import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { en } from "./en";
import { pt } from "./pt";

export type Locale = "pt" | "en";

const translations = { pt, en };

// Get stored locale or default to Portuguese
const storedLocale = browser
  ? (localStorage.getItem("locale") as Locale) || "pt"
  : "pt";

export const locale = writable<Locale>(storedLocale);
export const t = writable(translations[storedLocale]);

locale.subscribe((value) => {
  if (browser) {
    localStorage.setItem("locale", value);
  }
  t.set(translations[value]);
});

export function setLocale(newLocale: Locale) {
  locale.set(newLocale);
}
