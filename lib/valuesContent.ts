import enMessages from "@/messages/en.json";
import idMessages from "@/messages/id.json";
import type { Locale } from "@/lib/locale";

export type ValueItem = {
  id: number;
  topTitle: string;
  mainTitle: string;
  description: string;
  imgSrc: string;
};

export type RawValueItem = {
  id?: string | number;
  topTitle?: string;
  eyebrow?: string;
  mainTitle?: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  imgSrc?: string;
};

export const VALUE_ICON_PATHS = [
  "/gambar/seksi%206/1.svg",
  "/gambar/seksi%206/2.svg",
  "/gambar/seksi%206/3.svg",
  "/gambar/seksi%206/4.svg",
] as const;

const valueCatalogs: Record<Locale, ValueItem[]> = {
  id: idMessages.values.items.map((item) => ({
    id: item.id,
    topTitle: item.topTitle,
    mainTitle: item.mainTitle,
    description: item.description,
    imgSrc: item.imgSrc,
  })),
  en: enMessages.values.items.map((item) => ({
    id: item.id,
    topTitle: item.topTitle,
    mainTitle: item.mainTitle,
    description: item.description,
    imgSrc: item.imgSrc,
  })),
};

export function getDefaultValueItems(locale: Locale): ValueItem[] {
  return valueCatalogs[locale];
}

function parseValueId(id: string | number | undefined): number | null {
  if (id === undefined || id === null || String(id).trim() === "") {
    return null;
  }

  const parsed = Number.parseInt(String(id), 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function resolveImage(item?: RawValueItem, fallback?: string): string {
  return item?.imgSrc || item?.icon || item?.image || fallback || "";
}

export function sortValueItems<T extends { id?: string | number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const left = parseValueId(a.id) ?? Number.MAX_SAFE_INTEGER;
    const right = parseValueId(b.id) ?? Number.MAX_SAFE_INTEGER;

    return left - right;
  });
}

function pickSourceItem(
  items: RawValueItem[],
  slot: number,
  index: number,
): RawValueItem | undefined {
  const byId = items.find((item) => parseValueId(item.id) === slot);
  if (byId) {
    return byId;
  }

  // Legacy CMS rows without ids keep positional order instead of
  // matching every slot to the first item.
  return items[index];
}

export function normalizeValueItems(
  items: RawValueItem[] | undefined,
  locale: Locale,
): ValueItem[] {
  const fallback = getDefaultValueItems(locale);
  const sourceItems = Array.isArray(items) ? items : [];

  return Array.from({ length: 4 }, (_, index) => {
    const slot = index + 1;
    const source = pickSourceItem(sourceItems, slot, index);
    const fallbackItem = fallback.find((item) => item.id === slot) ?? fallback[index];

    return {
      id: slot,
      topTitle:
        source?.topTitle ||
        source?.eyebrow ||
        fallbackItem?.topTitle ||
        "",
      mainTitle:
        source?.mainTitle ||
        source?.title ||
        fallbackItem?.mainTitle ||
        "",
      description: source?.description || fallbackItem?.description || "",
      imgSrc: resolveImage(source, fallbackItem?.imgSrc || VALUE_ICON_PATHS[index]),
    };
  });
}

export function serializeValueItems(items: ValueItem[]): RawValueItem[] {
  return items.map((item) => ({
    id: String(item.id).padStart(2, "0"),
    eyebrow: item.topTitle,
    topTitle: item.topTitle,
    title: item.mainTitle,
    mainTitle: item.mainTitle,
    description: item.description,
    icon: item.imgSrc,
    imgSrc: item.imgSrc,
  }));
}

export function normalizeValuesPayloadItems(
  items: RawValueItem[] | undefined,
  locale: Locale,
): RawValueItem[] {
  return serializeValueItems(normalizeValueItems(items, locale));
}
