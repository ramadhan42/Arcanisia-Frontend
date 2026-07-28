"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  type TextStyleSettings,
} from "@/lib/typography";

type CmsStyledTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  text: string;
  payload?: Record<string, unknown>;
  field: string;
  defaults?: Partial<TextStyleSettings>;
  className?: string;
  style?: CSSProperties;
  keepGradient?: boolean;
  children?: ReactNode;
};

/**
 * Renders CMS text with optional typography overrides.
 * Line breaks come only from Enter (`\n`) in the CMS text field.
 */
export default function CmsStyledText({
  as: Tag = "p",
  text,
  payload,
  field,
  defaults,
  className = "",
  style,
  keepGradient = false,
  children,
}: CmsStyledTextProps) {
  const enabled = hasTypographyField(payload, field);
  const settings = resolveTextStyle(payload, field, defaults);
  const lines = splitTextByNewlines(text);
  const fontClass = enabled ? textStyleFontClass(settings) : "";
  const css = enabled ? textStyleToCss(settings) : {};

  const mergedStyle: CSSProperties = {
    ...css,
    ...style,
  };

  if (enabled && keepGradient) {
    mergedStyle.background =
      style?.background ??
      "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";
    mergedStyle.WebkitBackgroundClip = "text";
    mergedStyle.WebkitTextFillColor = "transparent";
    mergedStyle.backgroundClip = "text";
    mergedStyle.color = "transparent";
  }

  const content =
    children ??
    (lines.length > 0
      ? lines.map((line, index) => (
          <span key={`${field}-${index}-${line}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))
      : text);

  return (
    <Tag
      className={[fontClass, className].filter(Boolean).join(" ")}
      style={Object.keys(mergedStyle).length ? mergedStyle : style}
      data-locale-text="true"
    >
      {content}
    </Tag>
  );
}
