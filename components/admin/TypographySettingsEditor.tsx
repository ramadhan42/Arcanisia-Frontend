"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  FONT_FAMILY_CLASS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_UNIT_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  normalizeTextStyle,
  textStyleToCss,
  type FontFamilyOption,
  type FontWeightOption,
  type SectionTypography,
  type TextStyleSettings,
  type TypographyFieldConfig,
} from "@/lib/typography";

const PREVIEW_SAMPLE = "Arcanisia Aa Bb 123";

const fieldClass =
  "w-full border border-[#c9a84c]/20 bg-[#012724] px-3 py-2 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const labelClass =
  "block text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55";

const unitSelectClass =
  "h-full min-w-[72px] cursor-pointer appearance-none border border-[#c9a84c]/20 bg-[#012724] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c9b99a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:12px] bg-[right_0.55rem_center] bg-no-repeat px-3 py-2 pr-8 text-sm font-semibold uppercase tracking-normal text-[#f8c56c] outline-none focus:border-[#f8c56c]";

type PreviewOption<T extends string> = {
  value: T;
  label: string;
  optionStyle: CSSProperties;
  optionClassName?: string;
};

type StyleSelectProps<T extends string> = {
  label: string;
  value: T;
  options: PreviewOption<T>[];
  onChange: (value: T) => void;
  triggerStyle: React.CSSProperties;
  triggerClassName?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-[#c9b99a] transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function StyleSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  triggerStyle,
  triggerClassName = "",
}: StyleSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <p className={labelClass}>{label}</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={`mt-2 flex w-full items-center justify-between gap-3 border border-[#c9a84c]/20 bg-[#012724] px-3 py-2.5 text-left text-[#f5edd6] outline-none transition-colors hover:border-[#c9a84c]/40 focus:border-[#f8c56c] ${
          open ? "border-[#f8c56c]" : ""
        }`}
      >
        <span
          className={`min-w-0 flex-1 truncate text-[15px] leading-none ${triggerClassName}`}
          style={triggerStyle}
        >
          {selected?.label ?? value}
        </span>
        <span className="truncate text-[10px] uppercase tracking-[1.5px] text-[#c9b99a]/45">
          {PREVIEW_SAMPLE}
        </span>
        <Chevron open={open} />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto border border-[#c9a84c]/25 bg-[#001a18] shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition-colors ${
                    isActive
                      ? "bg-[#c9a84c]/15"
                      : "hover:bg-[#c9a84c]/08"
                  }`}
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span
                      className={`truncate text-[16px] leading-none text-[#f5edd6] ${option.optionClassName ?? ""}`}
                      style={option.optionStyle}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`truncate text-[13px] leading-none text-[#c9b99a]/75 ${option.optionClassName ?? ""}`}
                      style={option.optionStyle}
                    >
                      {PREVIEW_SAMPLE}
                    </span>
                  </span>
                  {isActive ? (
                    <span className="shrink-0 text-[9px] uppercase tracking-[2px] text-[#f8c56c]">
                      Active
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function StyleRow({
  config,
  style,
  onChange,
}: {
  config: TypographyFieldConfig;
  style: TextStyleSettings;
  onChange: (next: TextStyleSettings) => void;
}) {
  const familyOptions: PreviewOption<FontFamilyOption>[] = FONT_FAMILY_OPTIONS.map(
    (option) => ({
      value: option.value,
      label: option.label,
      optionClassName: FONT_FAMILY_CLASS[option.value],
      optionStyle: {
        fontFamily:
          option.value === "gilland"
            ? "var(--font-gilland), sans-serif"
            : option.value === "graziemille"
              ? "var(--font-graziemille), serif"
              : "inherit",
        fontWeight: Number(style.fontWeight),
      },
    }),
  );

  const weightOptions: PreviewOption<FontWeightOption>[] = FONT_WEIGHT_OPTIONS.map(
    (option) => ({
      value: option.value,
      label: option.label,
      optionClassName: FONT_FAMILY_CLASS[style.fontFamily],
      optionStyle: {
        fontFamily:
          style.fontFamily === "gilland"
            ? "var(--font-gilland), sans-serif"
            : style.fontFamily === "graziemille"
              ? "var(--font-graziemille), serif"
              : "inherit",
        fontWeight: Number(option.value),
      },
    }),
  );

  const previewCss = textStyleToCss(style);

  return (
    <div className="space-y-3 border border-[#c9a84c]/15 bg-[#001c1a]/60 p-4">
      <p className="text-xs tracking-[2px] text-[#f8c56c]">{config.label}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <StyleSelect
          label="Font family"
          value={style.fontFamily}
          options={familyOptions}
          triggerClassName={FONT_FAMILY_CLASS[style.fontFamily]}
          triggerStyle={{
            fontFamily:
              style.fontFamily === "gilland"
                ? "var(--font-gilland), sans-serif"
                : style.fontFamily === "graziemille"
                  ? "var(--font-graziemille), serif"
                  : "inherit",
            fontWeight: Number(style.fontWeight),
          }}
          onChange={(fontFamily) => onChange({ ...style, fontFamily })}
        />

        <StyleSelect
          label="Font weight"
          value={style.fontWeight}
          options={weightOptions}
          triggerClassName={FONT_FAMILY_CLASS[style.fontFamily]}
          triggerStyle={{
            fontFamily:
              style.fontFamily === "gilland"
                ? "var(--font-gilland), sans-serif"
                : style.fontFamily === "graziemille"
                  ? "var(--font-graziemille), serif"
                  : "inherit",
            fontWeight: Number(style.fontWeight),
          }}
          onChange={(fontWeight) => onChange({ ...style, fontWeight })}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className={labelClass}>Font size</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={200}
              step={1}
              value={style.fontSize}
              onChange={(event) =>
                onChange({
                  ...style,
                  fontSize: Number(event.target.value) || style.fontSize,
                })
              }
              className={`${fieldClass} max-w-[120px] flex-1`}
              aria-label="Font size value"
            />
            <select
              aria-label="Font size unit"
              className={unitSelectClass}
              value={style.fontSizeUnit}
              onChange={(event) =>
                onChange({
                  ...style,
                  fontSizeUnit: event.target.value as TextStyleSettings["fontSizeUnit"],
                })
              }
            >
              {FONT_SIZE_UNIT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-[10px] text-[#c9b99a]/45">
            Pilih unit px atau % di dropdown kanan.
          </p>
        </div>

        <div>
          <p className={labelClass}>Line height</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min={0.8}
              max={3}
              step={0.05}
              value={style.lineHeight}
              onChange={(event) =>
                onChange({
                  ...style,
                  lineHeight: Number(event.target.value) || style.lineHeight,
                })
              }
              className={`${fieldClass} max-w-[120px] flex-1`}
              aria-label="Line height"
            />
            <span className="shrink-0 text-sm font-semibold tracking-[1px] text-[#f8c56c]">
              ×
            </span>
          </div>
          <p className="mt-1 text-[10px] text-[#c9b99a]/45">
            Tinggi spasi antar baris (1.0 rapat · 1.4 normal · 1.8 longgar).
          </p>
        </div>
      </div>

      <label className={labelClass}>
        Font color
        <div className="mt-2 flex items-center gap-2">
          <input
            type="color"
            value={style.color.length === 9 ? style.color.slice(0, 7) : style.color}
            onChange={(event) => onChange({ ...style, color: event.target.value })}
            className="h-10 w-12 cursor-pointer border border-[#c9a84c]/20 bg-[#012724] p-1"
          />
          <input
            type="text"
            value={style.color}
            onChange={(event) => onChange({ ...style, color: event.target.value })}
            placeholder="#F8C56C"
            className={fieldClass}
          />
        </div>
      </label>

      <div className="border border-[#c9a84c]/20 bg-[#012421]/80 p-4">
        <p className="mb-3 text-[9px] uppercase tracking-[2px] text-[#c9b99a]/45">
          Live preview
        </p>
        <p
          className={`break-words ${FONT_FAMILY_CLASS[style.fontFamily]}`}
          style={{
            ...previewCss,
            // Keep preview readable in the admin card even for very large sizes.
            fontSize:
              style.fontSizeUnit === "px"
                ? `${Math.min(style.fontSize, 42)}px`
                : previewCss.fontSize,
          }}
        >
          {PREVIEW_SAMPLE}
        </p>
        <p className="mt-2 text-[10px] text-[#c9b99a]/40">
          {style.fontFamily} · {style.fontWeight} · {style.fontSize}
          {style.fontSizeUnit} · LH {style.lineHeight}
        </p>
      </div>
    </div>
  );
}

type TypographySettingsEditorProps = {
  fields: TypographyFieldConfig[];
  value: unknown;
  onChange: (typography: SectionTypography) => void;
};

export default function TypographySettingsEditor({
  fields,
  value,
  onChange,
}: TypographySettingsEditorProps) {
  const current =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as SectionTypography)
      : {};

  return (
    <div className="space-y-4 border border-[#c9a84c]/20 bg-[#012724]/30 p-4">
      <div>
        <p className="font-gilland text-xl text-[#f8c56c]">Typography Settings</p>
        <p className="mt-1 text-xs leading-relaxed text-[#c9b99a]/70">
          Dropdown font family & weight menampilkan contoh teks. Live preview ikut
          berubah saat settings diubah. Break line diatur lewat Enter di field teks.
        </p>
      </div>

      {fields.map((field) => {
        const style = normalizeTextStyle(current[field.key], field.defaults);

        return (
          <StyleRow
            key={field.key}
            config={field}
            style={style}
            onChange={(next) =>
              onChange({
                ...current,
                [field.key]: next,
              })
            }
          />
        );
      })}
    </div>
  );
}
