"use client";

import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_UNIT_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  normalizeTextStyle,
  type SectionTypography,
  type TextStyleSettings,
  type TypographyFieldConfig,
} from "@/lib/typography";

const fieldClass =
  "w-full border border-[#c9a84c]/20 bg-[#012724] px-3 py-2 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const labelClass =
  "block text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55";

const selectClass =
  "w-full cursor-pointer appearance-none border border-[#c9a84c]/20 bg-[#012724] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c9b99a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:14px] bg-[right_0.75rem_center] bg-no-repeat px-3 py-2 pr-9 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const unitSelectClass =
  "h-full min-w-[72px] cursor-pointer appearance-none border border-[#c9a84c]/20 bg-[#012724] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c9b99a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:12px] bg-[right_0.55rem_center] bg-no-repeat px-3 py-2 pr-8 text-sm font-semibold uppercase tracking-normal text-[#f8c56c] outline-none focus:border-[#f8c56c]";

type TypographySettingsEditorProps = {
  fields: TypographyFieldConfig[];
  value: unknown;
  onChange: (typography: SectionTypography) => void;
};

function StyleRow({
  config,
  style,
  onChange,
}: {
  config: TypographyFieldConfig;
  style: TextStyleSettings;
  onChange: (next: TextStyleSettings) => void;
}) {
  return (
    <div className="space-y-3 border border-[#c9a84c]/15 bg-[#001c1a]/60 p-4">
      <p className="text-xs tracking-[2px] text-[#f8c56c]">{config.label}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>
          Font family
          <select
            className={`${selectClass} mt-2`}
            value={style.fontFamily}
            onChange={(event) =>
              onChange({
                ...style,
                fontFamily: event.target.value as TextStyleSettings["fontFamily"],
              })
            }
          >
            {FONT_FAMILY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Font weight
          <select
            className={`${selectClass} mt-2`}
            value={style.fontWeight}
            onChange={(event) =>
              onChange({
                ...style,
                fontWeight: event.target.value as TextStyleSettings["fontWeight"],
              })
            }
          >
            {FONT_WEIGHT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
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
    </div>
  );
}

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
          Atur font family, size (+ unit px/%), line height (spasi antar baris),
          warna, dan weight. Break line teks diatur lewat Enter di field teks.
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
