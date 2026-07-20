export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "id";

export const LOCALE_COOKIE = "arcanisia_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "ID",
  en: "EN",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "id" || value === "en";
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
