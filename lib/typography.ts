import type { CSSProperties } from "react";

export type FontFamilyOption = "gilland" | "graziemille" | "inherit";
export type FontSizeUnit = "px" | "%";
export type FontWeightOption = "300" | "400" | "500" | "600" | "700";

export type TextStyleSettings = {
  fontFamily: FontFamilyOption;
  fontSize: number;
  fontSizeUnit: FontSizeUnit;
  fontWeight: FontWeightOption;
  color: string;
  /** Unitless CSS line-height — spacing between Enter lines (1 = rapat, 1.6 = longgar). */
  lineHeight: number;
};

export type SectionTypography = Record<string, Partial<TextStyleSettings>>;

export const FONT_FAMILY_OPTIONS: Array<{ value: FontFamilyOption; label: string }> = [
  { value: "gilland", label: "Gilland" },
  { value: "graziemille", label: "Grazie Mille" },
  { value: "inherit", label: "Inherit" },
];

export const FONT_WEIGHT_OPTIONS: Array<{ value: FontWeightOption; label: string }> = [
  { value: "300", label: "Light (300)" },
  { value: "400", label: "Regular (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "SemiBold (600)" },
  { value: "700", label: "Bold (700)" },
];

export const FONT_SIZE_UNIT_OPTIONS: Array<{ value: FontSizeUnit; label: string }> = [
  { value: "px", label: "px" },
  { value: "%", label: "%" },
];

const FONT_FAMILY_CSS: Record<FontFamilyOption, string> = {
  gilland: "var(--font-gilland), sans-serif",
  graziemille: "var(--font-graziemille), serif",
  inherit: "inherit",
};

export const FONT_FAMILY_CLASS: Record<FontFamilyOption, string> = {
  gilland: "font-gilland",
  graziemille: "font-graziemille",
  inherit: "",
};

export function defaultTextStyle(
  overrides: Partial<TextStyleSettings> = {},
): TextStyleSettings {
  return {
    fontFamily: "graziemille",
    fontSize: 16,
    fontSizeUnit: "px",
    fontWeight: "400",
    color: "#F5EDD6",
    lineHeight: 1.4,
    ...overrides,
  };
}

export function normalizeTextStyle(
  value: unknown,
  fallback: Partial<TextStyleSettings> = {},
): TextStyleSettings {
  const source =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const base = defaultTextStyle(fallback);

  const fontFamily = String(source.fontFamily ?? base.fontFamily);
  const fontSizeUnit = String(source.fontSizeUnit ?? base.fontSizeUnit);
  const fontWeight = String(source.fontWeight ?? base.fontWeight);
  const fontSize = Number(source.fontSize ?? base.fontSize);
  const color = String(source.color ?? base.color);
  const lineHeight = Number(source.lineHeight ?? base.lineHeight);

  return {
    fontFamily: (["gilland", "graziemille", "inherit"].includes(fontFamily)
      ? fontFamily
      : base.fontFamily) as FontFamilyOption,
    fontSize: Number.isFinite(fontSize) && fontSize > 0 ? fontSize : base.fontSize,
    fontSizeUnit: (fontSizeUnit === "%" ? "%" : "px") as FontSizeUnit,
    fontWeight: (["300", "400", "500", "600", "700"].includes(fontWeight)
      ? fontWeight
      : base.fontWeight) as FontWeightOption,
    color: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color)
      ? color
      : base.color,
    lineHeight:
      Number.isFinite(lineHeight) && lineHeight >= 0.8 && lineHeight <= 3
        ? Math.round(lineHeight * 100) / 100
        : base.lineHeight,
  };
}

export function getTypographyMap(
  payload: Record<string, unknown> | undefined,
): SectionTypography {
  const typography = payload?.typography;
  if (!typography || typeof typography !== "object" || Array.isArray(typography)) {
    return {};
  }

  return typography as SectionTypography;
}

export function hasTypographyField(
  payload: Record<string, unknown> | undefined,
  field: string,
): boolean {
  const value = getTypographyMap(payload)[field];
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function resolveTextStyle(
  payload: Record<string, unknown> | undefined,
  field: string,
  fallback: Partial<TextStyleSettings> = {},
): TextStyleSettings {
  const map = getTypographyMap(payload);
  return normalizeTextStyle(map[field], fallback);
}

export function textStyleToCss(style: TextStyleSettings): CSSProperties {
  return {
    fontFamily: FONT_FAMILY_CSS[style.fontFamily],
    fontSize: `${style.fontSize}${style.fontSizeUnit}`,
    fontWeight: Number(style.fontWeight),
    color: style.color,
    lineHeight: style.lineHeight,
  };
}

export function textStyleFontClass(style: TextStyleSettings): string {
  return FONT_FAMILY_CLASS[style.fontFamily];
}

/**
 * Split CMS text into lines only where the editor pressed Enter (`\n`).
 * No automatic 1/2/3-line word wrapping.
 */
export function splitTextByNewlines(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/^\n+|\n+$/g, "");
  if (!normalized) {
    return [];
  }

  return normalized.split("\n").map((line) => line.trimEnd());
}

/** @deprecated Use splitTextByNewlines — line breaks come from CMS Enter only. */
export function splitTextByLines(text: string): string[] {
  return splitTextByNewlines(text);
}

export type TypographyFieldConfig = {
  key: string;
  label: string;
  defaults?: Partial<TextStyleSettings>;
};

/** Field configs per beranda CMS section. */
export const SECTION_TYPOGRAPHY_FIELDS: Partial<
  Record<string, TypographyFieldConfig[]>
> = {
  hero: [
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 23,
        fontWeight: "500",
        color: "#F8C56C",
        lineHeight: 1.25,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 13,
        fontWeight: "400",
        color: "#F5EDD6",
        lineHeight: 1.55,
      },
    },
    {
      key: "cta",
      label: "CTA Label",
      defaults: {
        fontFamily: "gilland",
        fontSize: 12,
        fontWeight: "700",
        color: "#124b46",
        lineHeight: 1.2,
      },
    },
  ],
  rekindling: [
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 48,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.15,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 16,
        fontWeight: "400",
        color: "#C9B99A",
        lineHeight: 1.45,
      },
    },
  ],
  about: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 11,
        fontWeight: "400",
        color: "#F5EDD6CC",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 42,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
    {
      key: "quote",
      label: "Quote",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 28,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.35,
      },
    },
  ],
  collection: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "400",
        color: "#C9A84C",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 42,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 14,
        fontWeight: "400",
        color: "#C9B99A",
        lineHeight: 1.55,
      },
    },
  ],
  missions: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 13,
        fontWeight: "400",
        color: "#F5EDD6CC",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 43,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
  ],
  values: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "400",
        color: "#F5EDD6CC",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 43,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
  ],
  islands: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 11,
        fontWeight: "500",
        color: "#C9A84C",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 62,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
    {
      key: "region",
      label: "Region",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 8,
        fontWeight: "400",
        color: "#C9B99A80",
        lineHeight: 1.4,
      },
    },
    {
      key: "name",
      label: "Island Name",
      defaults: {
        fontFamily: "gilland",
        fontSize: 33,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.1,
      },
    },
    {
      key: "subtitle",
      label: "Subtitle",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 10,
        fontWeight: "400",
        color: "#F5EDD6",
        lineHeight: 1.5,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "300",
        color: "#C9B99A",
        lineHeight: 1.7,
      },
    },
    {
      key: "notesLabel",
      label: "Scent Notes Label (teks SCENT NOTES)",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 8,
        fontWeight: "400",
        color: "#C9A84C99",
        lineHeight: 1.3,
      },
    },
    {
      key: "notes",
      label: "Notes (semua baris scent notes)",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 10,
        fontWeight: "400",
        color: "#C9B99ACC",
        lineHeight: 1.5,
      },
    },
    {
      key: "discover",
      label: "Discover CTA",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 8,
        fontWeight: "500",
        color: "#C9A84C",
        lineHeight: 1.3,
      },
    },
  ],
  faq: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 10,
        fontWeight: "400",
        color: "#C9A84C",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 53,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 14,
        fontWeight: "400",
        color: "#C9B99A99",
        lineHeight: 1.55,
      },
    },
  ],
  newsletter: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "400",
        color: "#C9A84C",
        lineHeight: 1.3,
      },
    },
    {
      key: "title",
      label: "Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 56,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.25,
      },
    },
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 14,
        fontWeight: "300",
        color: "#C9B99A",
        lineHeight: 1.6,
      },
    },
  ],
  contact: [
    {
      key: "itemTitle",
      label: "Item Title",
      defaults: {
        fontFamily: "inherit",
        fontSize: 9,
        fontWeight: "600",
        color: "#F8C56C",
        lineHeight: 1.3,
      },
    },
    {
      key: "itemLines",
      label: "Item Lines",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 13,
        fontWeight: "300",
        color: "#C9B99A",
        lineHeight: 1.85,
      },
    },
  ],
  footer: [
    {
      key: "description",
      label: "Description",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 13,
        fontWeight: "400",
        color: "#C9B99A99",
        lineHeight: 1.7,
      },
    },
    {
      key: "groupTitle",
      label: "Group Title",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 11,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.3,
      },
    },
    {
      key: "linkLabel",
      label: "Link Label",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "400",
        color: "#C9B99A80",
        lineHeight: 1.4,
      },
    },
    {
      key: "copyright",
      label: "Copyright",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 11,
        fontWeight: "400",
        color: "#C9B99A4D",
        lineHeight: 1.45,
      },
    },
    {
      key: "legalLink",
      label: "Legal Link (Privasi / Ketentuan / Cookie)",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 10,
        fontWeight: "400",
        color: "#C9B99A4D",
        lineHeight: 1.4,
      },
    },
  ],
  legal: [
    {
      key: "linkLabel",
      label: "Footer Link Label",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 10,
        fontWeight: "400",
        color: "#C9B99A4D",
        lineHeight: 1.4,
      },
    },
    {
      key: "pageTitle",
      label: "Page Title",
      defaults: {
        fontFamily: "gilland",
        fontSize: 36,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.2,
      },
    },
    {
      key: "pageContent",
      label: "Page Content",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 14,
        fontWeight: "400",
        color: "#C9B99A",
        lineHeight: 2,
      },
    },
  ],
  checkout: [
    {
      key: "shippingLabel",
      label: "Shipping Label",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 14,
        fontWeight: "400",
        color: "#F8C56C",
        lineHeight: 1.4,
      },
    },
    {
      key: "shippingNote",
      label: "Shipping Note",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 11,
        fontWeight: "400",
        color: "#C9B99A66",
        lineHeight: 1.6,
      },
    },
    {
      key: "paymentNotice",
      label: "Payment Notice",
      defaults: {
        fontFamily: "graziemille",
        fontSize: 12,
        fontWeight: "400",
        color: "#C9B99A99",
        lineHeight: 1.5,
      },
    },
  ],
};
