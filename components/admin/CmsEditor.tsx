"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ImagePlus, Plus, Trash2, Upload } from "lucide-react";
import type { SiteContentKey } from "@/types/api";
import type { Locale } from "@/lib/locale";
import {
  normalizeValueItems,
  serializeValueItems,
  VALUE_ICON_PATHS,
  type ValueItem,
} from "@/lib/valuesContent";
import { SECTION_TYPOGRAPHY_FIELDS } from "@/lib/typography";
import TypographySettingsEditor from "@/components/admin/TypographySettingsEditor";

type Payload = Record<string, unknown>;
type ImageVariant = "banner" | "square" | "icon" | "logo";

const hideScrollbar = "scrollbar-none";

const fieldClass =
  "mt-2 w-full border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const labelClass =
  "block text-xs uppercase tracking-[2px] text-[#c9b99a]/55";

const selectClass =
  "mt-2 w-full cursor-pointer appearance-none border border-[#c9a84c]/20 bg-[#012724] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c9b99a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:14px] bg-[right_0.75rem_center] bg-no-repeat px-4 py-3 pr-10 text-sm normal-case tracking-normal text-[#f5edd6] outline-none transition-colors focus:border-[#f8c56c]";

const ASSET_OPTIONS = [
  "/gambar/seksi%201/bg.jpg",
  "/gambar/seksi%201/logo.png",
  "/gambar/seksi%201/produk.png",
  "/gambar/seksi%202/produk.png",
  "/gambar/seksi%203/borneo2.jpg",
  "/gambar/seksi%203/ornament.svg",
  "/gambar/seksi%204/alor.jpg",
  "/gambar/seksi%204/bg.png",
  "/gambar/seksi%204/button.jpg",
  "/gambar/seksi%204/komodo.jpg",
  "/gambar/seksi%204/nias.jpg",
  "/gambar/seksi%204/papua.jpg",
  "/gambar/seksi%204/sumba.jpg",
  "/gambar/seksi%204/ornamen.svg",
  "/gambar/seksi%205/bg.png",
  "/gambar/seksi%205/ornamen.svg",
  "/gambar/seksi%206/1.svg",
  "/gambar/seksi%206/2.svg",
  "/gambar/seksi%206/3.svg",
  "/gambar/seksi%206/4.svg",
  "/gambar/seksi%206/bg.png",
  "/gambar/seksi%206/ornamen.svg",
  "/gambar/seksi%207/map-indonesia.png",
  "/gambar/seksi%207/ornamen.svg",
  "/gambar/seksi%208/email.svg",
  "/gambar/seksi%208/ig.svg",
  "/gambar/seksi%208/location.svg",
  "/gambar/seksi%208/subscribe.svg",
  "/gambar/footer/logo%20arca%20fix%201.svg",
  "/gambar/footer/ornamen.svg",
  "/gambar/login/bg.png",
  "/gambar/login/logo-arca.svg",
  "/gambar/navbar/logo%20arca%20fix%201.svg",
  "/gambar/navbar/Icon.svg",
];

const CONTACT_ICON_OPTIONS = [
  {
    label: "LOCATION",
    value: "/gambar/seksi%208/location.svg",
  },
  {
    label: "EMAIL",
    value: "/gambar/seksi%208/email.svg",
  },
  {
    label: "FOLLOW US",
    value: "/gambar/seksi%208/ig.svg",
  },
] as const;

const previewBox: Record<ImageVariant, string> = {
  banner: "h-28 w-full max-w-[320px]",
  square: "h-28 w-28",
  icon: "h-[72px] w-[72px]",
  logo: "h-20 w-40",
};

function asString(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.readAsDataURL(file);
  });
}

function MediaPreview({
  src,
  variant = "square",
  iconSize = 28,
}: {
  src: string;
  variant?: ImageVariant;
  iconSize?: number;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-[#c9a84c]/25 bg-[#012421]/50 text-[#c9b99a]/35 ${previewBox[variant]}`}
      >
        <ImagePlus size={18} />
      </div>
    );
  }

  const isDataUrl = src.startsWith("data:");

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-[#c9a84c]/25 bg-[#012421]/70 p-2 ${previewBox[variant]}`}
    >
      {isDataUrl || variant === "icon" || variant === "logo" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="max-h-full max-w-full object-contain"
          style={
            variant === "icon"
              ? { width: iconSize, height: iconSize }
              : undefined
          }
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          className="object-contain p-1"
          unoptimized
          sizes="320px"
        />
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className={labelClass}>
      {label}
      {multiline ? (
        <>
          <textarea
            value={value}
            rows={rows}
            onChange={(event) => onChange(event.target.value)}
            className={`${fieldClass} ${hideScrollbar} whitespace-pre-wrap`}
          />
          <span className="mt-1 block text-[10px] font-normal normal-case tracking-normal text-[#c9b99a]/45">
            Tekan Enter untuk break line di beranda.
          </span>
        </>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  variant = "square",
  assets = ASSET_OPTIONS,
  allowUpload = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: ImageVariant;
  assets?: string[];
  allowUpload?: boolean;
}) {
  const handleUpload = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className="space-y-3 rounded border border-[#c9a84c]/15 bg-[#001c1a]/40 p-4">
      <div className="flex flex-wrap items-start gap-4">
        <MediaPreview src={value} variant={variant} />
        <div className="min-w-0 flex-1 space-y-3">
          <p className={labelClass}>{label}</p>
          <input
            type="text"
            value={value.startsWith("data:") ? "" : value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/gambar/... atau pilih/upload"
            className={`${fieldClass} mt-0`}
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={assets.includes(value) ? value : ""}
              onChange={(event) => {
                if (event.target.value) onChange(event.target.value);
              }}
              className={`${selectClass} mt-0 min-w-[200px] flex-1 py-2 text-xs`}
            >
              <option value="">Pilih aset lokal...</option>
              {assets.map((asset) => (
                <option key={asset} value={asset}>
                  {decodeURIComponent(asset)}
                </option>
              ))}
            </select>
            {allowUpload && (
              <label className="inline-flex cursor-pointer items-center gap-2 border border-[#f8c56c]/50 px-3 py-2 text-xs tracking-[1px] text-[#f8c56c] hover:bg-[#f8c56c]/10">
                <Upload size={14} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    void handleUpload(event.target.files?.[0]);
                    event.currentTarget.value = "";
                  }}
                />
              </label>
            )}
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="border border-red-300/40 px-3 py-2 text-xs text-red-300"
              >
                Hapus
              </button>
            )}
          </div>
          {value.startsWith("data:") && (
            <p className="text-[11px] text-[#c9b99a]/45">
              Gambar upload tersimpan sebagai data URL di payload CMS.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactIconField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const selected =
    CONTACT_ICON_OPTIONS.find((option) => option.value === value)?.value ??
    value;

  const handleUpload = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className="space-y-4 rounded border border-[#c9a84c]/15 bg-[#001c1a]/40 p-4">
      <p className={labelClass}>{label}</p>

      <div className="flex items-start gap-4 text-left">
        <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center border border-[#C9A84C]/30 bg-[#012421]">
          {selected ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected}
              alt=""
              width={17}
              height={17}
              className="object-contain"
            />
          ) : (
            <span className="text-[9px] text-[#c9b99a]/30">—</span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-[9px] font-semibold tracking-[3px] text-[#F8C56C]">
            Preview kartu kontak
          </p>
          <p className="mt-1 text-[12px] font-light text-[#C9B99A]">
            Ikon fit di dalam kotak kartu, sama seperti di beranda.
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {CONTACT_ICON_OPTIONS.map((option) => {
          const active = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-[#f8c56c] bg-[#c9a84c]/10"
                  : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#C9A84C]/30 bg-[#012421]">
                <Image
                  src={option.value}
                  width={17}
                  height={17}
                  alt=""
                  className="object-contain"
                  unoptimized
                />
              </span>
              <span className="text-[10px] tracking-[2px] text-[#f8c56c]">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 border border-[#f8c56c]/50 px-3 py-2 text-xs tracking-[1px] text-[#f8c56c] hover:bg-[#f8c56c]/10">
          <Upload size={14} />
          Tambah / Ganti Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              void handleUpload(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="border border-red-300/40 px-3 py-2 text-xs text-red-300"
          >
            Hapus gambar
          </button>
        )}
      </div>

      <label className={labelClass}>
        Path / URL ikon
        <input
          type="text"
          value={value.startsWith("data:") ? "" : value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/gambar/seksi%208/location.svg"
          className={fieldClass}
        />
      </label>
      {value.startsWith("data:") && (
        <p className="text-[11px] text-[#c9b99a]/45">
          Upload aktif: gambar kustom sedang dipakai pada kartu ini.
        </p>
      )}
    </div>
  );
}

function StringListField({
  label,
  values,
  onChange,
  placeholder = "Item baru",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className={labelClass}>{label}</p>
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="flex items-center gap-1 text-xs text-[#f8c56c]"
        >
          <Plus size={14} /> Tambah
        </button>
      </div>
      {values.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}
            className={fieldClass + " mt-0"}
          />
          <button
            type="button"
            aria-label="Hapus item"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
            className="shrink-0 border border-[#c9a84c]/20 px-3 text-red-300"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

function ObjectListEditor<T extends Record<string, unknown>>({
  label,
  items,
  blank,
  onChange,
  renderItem,
}: {
  label: string;
  items: T[];
  blank: T;
  onChange: (items: T[]) => void;
  renderItem: (
    item: T,
    update: (patch: Partial<T>) => void,
  ) => ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-gilland text-xl text-[#f8c56c]">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...items, { ...blank }])}
          className="flex items-center gap-1 border border-[#c9a84c]/25 px-3 py-2 text-xs text-[#f8c56c]"
        >
          <Plus size={14} /> Tambah
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={`${label}-${index}`}
          className="space-y-3 border border-[#c9a84c]/15 bg-[#001c1a]/60 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[2px] text-[#c9b99a]/45">
              #{index + 1}
            </p>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="text-red-300"
              aria-label="Hapus item"
            >
              <Trash2 size={15} />
            </button>
          </div>
          {renderItem(item, (patch) => {
            const next = [...items];
            next[index] = { ...item, ...patch };
            onChange(next);
          })}
        </div>
      ))}
    </div>
  );
}

function setField(payload: Payload, key: string, value: unknown): Payload {
  return { ...payload, [key]: value };
}

interface CmsEditorProps {
  sectionKey: SiteContentKey;
  payload: Payload;
  onChange: (payload: Payload) => void;
  locale?: Locale;
}

export default function CmsEditor({
  sectionKey,
  payload,
  onChange,
  locale = "id",
}: CmsEditorProps) {
  const update = (key: string, value: unknown) =>
    onChange(setField(payload, key, value));

  const typographyFields = SECTION_TYPOGRAPHY_FIELDS[sectionKey] ?? [];
  const typographyBlock =
    typographyFields.length > 0 ? (
      <TypographySettingsEditor
        fields={typographyFields}
        value={payload.typography}
        onChange={(typography) => update("typography", typography)}
      />
    ) : null;

  if (sectionKey === "hero") {
    return (
      <div className="space-y-4">
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <TextField
          label="CTA Label"
          value={asString(payload.cta_label ?? payload.cta)}
          onChange={(v) => onChange({ ...payload, cta_label: v, cta: v })}
        />
        <TextField label="CTA Href" value={asString(payload.cta_href)} onChange={(v) => update("cta_href", v)} />
        <ImageField label="Background Image" value={asString(payload.background_image)} onChange={(v) => update("background_image", v)} variant="banner" />
        <ImageField label="Product Image" value={asString(payload.product_image)} onChange={(v) => update("product_image", v)} variant="square" />
        <ImageField label="Logo Image" value={asString(payload.logo_image)} onChange={(v) => update("logo_image", v)} variant="logo" />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "rekindling") {
    return (
      <div className="space-y-4">
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={4} />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <ImageField label="Background Image" value={asString(payload.background_image)} onChange={(v) => update("background_image", v)} variant="banner" />
        <ImageField label="Product Image" value={asString(payload.product_image)} onChange={(v) => update("product_image", v)} variant="square" />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "about") {
    const paragraphs = asArray<string>(payload.paragraphs);
    const statistics = asArray<{ value?: string; label?: string }>(payload.statistics);
    return (
      <div className="space-y-5">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <ImageField label="Image" value={asString(payload.image)} onChange={(v) => update("image", v)} variant="banner" />
        <TextField label="Quote" value={asString(payload.quote)} onChange={(v) => update("quote", v)} multiline />
        <StringListField label="Paragraphs" values={paragraphs} onChange={(v) => update("paragraphs", v)} placeholder="Paragraf..." />
        <ObjectListEditor
          label="Statistics"
          items={statistics}
          blank={{ value: "", label: "" }}
          onChange={(v) => update("statistics", v)}
          renderItem={(item, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Value" value={asString(item.value)} onChange={(v) => patch({ value: v })} />
              <TextField label="Label" value={asString(item.label)} onChange={(v) => patch({ label: v })} />
            </div>
          )}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "collection") {
    return (
      <div className="space-y-4">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <TextField label="CTA Label" value={asString(payload.cta_label)} onChange={(v) => update("cta_label", v)} />
        <StringListField
          label="Product Slugs"
          values={asArray<string>(payload.product_slugs)}
          onChange={(v) => update("product_slugs", v)}
          placeholder="secret-of-buton"
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "missions") {
    const missions = asArray<{ id?: string; title?: string; description?: string }>(
      payload.items ?? payload.missions,
    );
    return (
      <div className="space-y-5">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <ImageField
          label="Background Image"
          value={asString(payload.background_image)}
          onChange={(v) => update("background_image", v)}
          variant="banner"
          assets={ASSET_OPTIONS.filter((asset) => asset.includes("seksi%205"))}
        />
        <ObjectListEditor
          label="Missions"
          items={missions}
          blank={{ id: "", title: "", description: "" }}
          onChange={(v) => onChange({ ...payload, items: v, missions: v })}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <TextField label="ID / Number" value={asString(item.id)} onChange={(v) => patch({ id: v })} />
              <TextField label="Title" value={asString(item.title)} onChange={(v) => patch({ title: v })} />
              <TextField label="Description" value={asString(item.description)} onChange={(v) => patch({ description: v })} multiline />
            </div>
          )}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "values") {
    const items = normalizeValueItems(
      asArray<{
        id?: string | number;
        topTitle?: string;
        eyebrow?: string;
        mainTitle?: string;
        title?: string;
        description?: string;
        icon?: string;
        image?: string;
        imgSrc?: string;
      }>(payload.items),
      locale,
    );

    const updateItems = (nextItems: ValueItem[]) => {
      update("items", serializeValueItems(nextItems));
    };

    return (
      <div className="space-y-5">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <ImageField label="Background Image" value={asString(payload.background_image)} onChange={(v) => update("background_image", v)} variant="banner" />
        <div className="space-y-4">
          <p className="font-gilland text-xl text-[#f8c56c]">Values</p>
          <p className="text-xs leading-relaxed text-[#c9b99a]/70">
            Empat nilai ditampilkan berurutan dari kiri ke kanan di beranda. Logo 1–4 mengikuti urutan yang sama dengan frontend.
          </p>
          {items.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 border border-[#c9a84c]/15 bg-[#001c1a]/60 p-4"
            >
              <p className="text-xs tracking-[2px] text-[#c9b99a]/45">
                Nilai {item.id} · Logo {item.id}
              </p>
              <TextField
                label="Top Title"
                value={item.topTitle}
                onChange={(v) => {
                  const next = [...items];
                  next[index] = { ...item, topTitle: v };
                  updateItems(next);
                }}
                multiline
                rows={2}
              />
              <TextField
                label="Main Title"
                value={item.mainTitle}
                onChange={(v) => {
                  const next = [...items];
                  next[index] = { ...item, mainTitle: v };
                  updateItems(next);
                }}
                multiline
                rows={2}
              />
              <TextField
                label="Description"
                value={item.description}
                onChange={(v) => {
                  const next = [...items];
                  next[index] = { ...item, description: v };
                  updateItems(next);
                }}
                multiline
                rows={4}
              />
              <ImageField
                label="Icon / Image"
                value={item.imgSrc}
                onChange={(v) => {
                  const next = [...items];
                  next[index] = { ...item, imgSrc: v || VALUE_ICON_PATHS[index] };
                  updateItems(next);
                }}
                variant="icon"
                assets={ASSET_OPTIONS.filter(
                  (asset) =>
                    asset.includes("seksi%206") &&
                    asset.endsWith(".svg") &&
                    !asset.includes("ornamen") &&
                    !asset.includes("bg"),
                )}
              />
            </div>
          ))}
        </div>
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "islands") {
    const items = asArray<{
      id?: string;
      region?: string;
      name?: string;
      subtitle?: string;
      description?: string;
      notes?: string[];
      product_slug?: string;
      label_position?: { top?: string; left?: string };
    }>(payload.items);
    return (
      <div className="space-y-5">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <TextField
          label="Scent Notes Label"
          value={asString(payload.notes_label)}
          onChange={(v) => update("notes_label", v)}
          multiline
          rows={2}
        />
        <ObjectListEditor
          label="Islands"
          items={items}
          blank={{
            id: "",
            region: "",
            name: "",
            subtitle: "",
            description: "",
            notes: [],
            product_slug: "",
            label_position: { top: "50%", left: "50%" },
          }}
          onChange={(v) => update("items", v)}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="ID" value={asString(item.id)} onChange={(v) => patch({ id: v })} />
                <TextField label="Name" value={asString(item.name)} onChange={(v) => patch({ name: v })} />
                <TextField label="Region" value={asString(item.region)} onChange={(v) => patch({ region: v })} />
                <TextField label="Product Slug" value={asString(item.product_slug)} onChange={(v) => patch({ product_slug: v })} />
              </div>
              <TextField label="Subtitle" value={asString(item.subtitle)} onChange={(v) => patch({ subtitle: v })} />
              <TextField label="Description" value={asString(item.description)} onChange={(v) => patch({ description: v })} multiline />
              <StringListField
                label="Notes (baris 1, 2, 3, … — font diatur di Typography)"
                values={asArray<string>(item.notes)}
                onChange={(v) => patch({ notes: v })}
                placeholder="Scent note"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Label Top"
                  value={asString(item.label_position?.top)}
                  onChange={(v) =>
                    patch({
                      label_position: {
                        top: v,
                        left: item.label_position?.left ?? "0%",
                      },
                    })
                  }
                />
                <TextField
                  label="Label Left"
                  value={asString(item.label_position?.left)}
                  onChange={(v) =>
                    patch({
                      label_position: {
                        top: item.label_position?.top ?? "0%",
                        left: v,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "faq") {
    const categories = asArray<{ id?: string; label?: string }>(payload.categories);
    const items = asArray<{ category?: string; question?: string; answer?: string }>(payload.items);
    return (
      <div className="space-y-5">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <ObjectListEditor
          label="Categories"
          items={categories}
          blank={{ id: "", label: "" }}
          onChange={(v) => update("categories", v)}
          renderItem={(item, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="ID" value={asString(item.id)} onChange={(v) => patch({ id: v })} />
              <TextField label="Label" value={asString(item.label)} onChange={(v) => patch({ label: v })} />
            </div>
          )}
        />
        <ObjectListEditor
          label="FAQ Items"
          items={items}
          blank={{ category: "", question: "", answer: "" }}
          onChange={(v) => update("items", v)}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <label className={labelClass}>
                Category
                <select
                  value={asString(item.category)}
                  onChange={(event) => patch({ category: event.target.value })}
                  className={selectClass}
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label || category.id}
                    </option>
                  ))}
                </select>
              </label>
              <TextField label="Question" value={asString(item.question)} onChange={(v) => patch({ question: v })} />
              <TextField label="Answer" value={asString(item.answer)} onChange={(v) => patch({ answer: v })} multiline rows={4} />
            </div>
          )}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "newsletter") {
    return (
      <div className="space-y-4">
        <TextField label="Eyebrow" value={asString(payload.eyebrow)} onChange={(v) => update("eyebrow", v)} multiline rows={2} />
        <TextField label="Title" value={asString(payload.title)} onChange={(v) => update("title", v)} multiline rows={3} />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <TextField label="Placeholder" value={asString(payload.placeholder)} onChange={(v) => update("placeholder", v)} />
        <TextField
          label="Button Label"
          value={asString(payload.button_label ?? payload.button)}
          onChange={(v) => onChange({ ...payload, button_label: v, button: v })}
        />
        <ImageField
          label="Button Icon"
          value={asString(payload.button_icon)}
          onChange={(v) => update("button_icon", v)}
          variant="icon"
          assets={ASSET_OPTIONS.filter((asset) => asset.includes("seksi%208"))}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "contact") {
    const items = asArray<{
      title?: string;
      icon?: string;
      icon_src?: string;
      lines?: string[];
    }>(payload.items);
    return (
      <div className="space-y-5">
        <ObjectListEditor
          label="Contact Items"
          items={items}
          blank={{
            title: "LOCATION",
            icon: "/gambar/seksi%208/location.svg",
            lines: [""],
          }}
          onChange={(v) => update("items", v)}
          renderItem={(item, patch) => {
            const iconValue = asString(item.icon ?? item.icon_src);
            return (
              <div className="space-y-4">
                <div className="flex items-start gap-4 border border-[#c9a84c]/15 bg-[#012421]/40 p-4">
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center border border-[#C9A84C]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iconValue || "/gambar/seksi%208/email.svg"}
                      alt=""
                      width={17}
                      height={17}
                      className="object-contain"
                    />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[9px] font-semibold tracking-[3px] text-[#F8C56C]">
                      {asString(item.title) || "JUDUL KARTU"}
                    </h3>
                    <div className="mt-1 text-[13px] font-light leading-[1.85] text-[#C9B99A]">
                      {(item.lines?.length ? item.lines : ["Baris kontak..."]).map(
                        (line, index) => (
                          <p key={`${line}-${index}`}>{line || "—"}</p>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <TextField
                  label="Title"
                  value={asString(item.title)}
                  onChange={(v) => {
                    const matched = CONTACT_ICON_OPTIONS.find(
                      (option) => option.label === v.trim().toUpperCase(),
                    );
                    patch(
                      matched
                        ? { title: v, icon: matched.value, icon_src: matched.value }
                        : { title: v },
                    );
                  }}
                  multiline
                  rows={2}
                />
                <ContactIconField
                  label="Icon Kartu"
                  value={iconValue}
                  onChange={(v) => patch({ icon: v, icon_src: v })}
                />
                <StringListField
                  label="Lines"
                  values={asArray<string>(item.lines)}
                  onChange={(v) => patch({ lines: v })}
                />
              </div>
            );
          }}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "footer") {
    const groups = asArray<{
      title?: string;
      links?: Array<{ label?: string; href?: string }>;
    }>(payload.groups);
    const legalLinks = asArray<{
      label?: string;
      slug?: string;
      href?: string;
    }>(payload.legal_links);
    const defaultLegalLinks =
      locale === "en"
        ? [
            { label: "Privacy Policy", slug: "privacy-policy", href: "/legal/privacy-policy" },
            { label: "Terms of Service", slug: "terms-of-service", href: "/legal/terms-of-service" },
            { label: "Cookie Policy", slug: "cookie-policy", href: "/legal/cookie-policy" },
          ]
        : [
            { label: "Kebijakan Privasi", slug: "privacy-policy", href: "/legal/privacy-policy" },
            { label: "Ketentuan Layanan", slug: "terms-of-service", href: "/legal/terms-of-service" },
            { label: "Kebijakan Cookie", slug: "cookie-policy", href: "/legal/cookie-policy" },
          ];

    return (
      <div className="space-y-5">
        <ImageField label="Logo" value={asString(payload.logo)} onChange={(v) => update("logo", v)} variant="logo" />
        <TextField label="Description" value={asString(payload.description)} onChange={(v) => update("description", v)} multiline />
        <TextField label="Copyright" value={asString(payload.copyright)} onChange={(v) => update("copyright", v)} multiline rows={2} />
        <ObjectListEditor
          label="Link Groups"
          items={groups}
          blank={{ title: "", links: [{ label: "", href: "#" }] }}
          onChange={(v) => update("groups", v)}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <TextField label="Group Title" value={asString(item.title)} onChange={(v) => patch({ title: v })} multiline rows={2} />
              <ObjectListEditor
                label="Links"
                items={asArray<{ label?: string; href?: string }>(item.links)}
                blank={{ label: "", href: "#" }}
                onChange={(v) => patch({ links: v })}
                renderItem={(link, patchLink) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField label="Label" value={asString(link.label)} onChange={(v) => patchLink({ label: v })} />
                    <TextField label="Href" value={asString(link.href)} onChange={(v) => patchLink({ href: v })} />
                  </div>
                )}
              />
            </div>
          )}
        />
        <ObjectListEditor
          label="Legal Links (bawah footer)"
          items={legalLinks.length ? legalLinks : defaultLegalLinks}
          blank={{ label: "", slug: "", href: "/legal/" }}
          onChange={(v) => update("legal_links", v)}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <TextField
                label="Teks Link"
                value={asString(item.label)}
                onChange={(v) => patch({ label: v })}
                multiline
                rows={2}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Slug"
                  value={asString(item.slug)}
                  onChange={(v) =>
                    patch({
                      slug: v,
                      href: v ? `/legal/${v}` : asString(item.href),
                    })
                  }
                />
                <TextField
                  label="Href"
                  value={asString(item.href)}
                  onChange={(v) => patch({ href: v })}
                />
              </div>
              <p className="text-[10px] text-[#c9b99a]/45">
                Atur teks Kebijakan Privasi, Ketentuan Layanan, dan Kebijakan Cookie di sini.
              </p>
            </div>
          )}
        />
        {!legalLinks.length ? (
          <button
            type="button"
            className="border border-[#c9a84c]/30 px-3 py-2 text-[11px] tracking-[1px] text-[#f8c56c] transition-colors hover:border-[#f8c56c]"
            onClick={() => update("legal_links", defaultLegalLinks)}
          >
            Muat 3 link legal default
          </button>
        ) : null}
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "legal") {
    const pages = asArray<{ slug?: string; title?: string; content?: string }>(
      payload.pages,
    );
    const links = asArray<{ label?: string; slug?: string; href?: string }>(
      payload.links,
    );
    return (
      <div className="space-y-5">
        <ObjectListEditor
          label="Footer Legal Links"
          items={links}
          blank={{ label: "", slug: "", href: "" }}
          onChange={(v) => update("links", v)}
          renderItem={(item, patch) => (
            <div className="grid gap-3 sm:grid-cols-3">
              <TextField label="Label" value={asString(item.label)} onChange={(v) => patch({ label: v })} />
              <TextField label="Slug" value={asString(item.slug)} onChange={(v) => patch({ slug: v })} />
              <TextField label="Href" value={asString(item.href)} onChange={(v) => patch({ href: v })} />
            </div>
          )}
        />
        <ObjectListEditor
          label="Legal Pages"
          items={pages}
          blank={{ slug: "", title: "", content: "" }}
          onChange={(v) => update("pages", v)}
          renderItem={(item, patch) => (
            <div className="space-y-3">
              <TextField label="Slug" value={asString(item.slug)} onChange={(v) => patch({ slug: v })} />
              <TextField label="Title" value={asString(item.title)} onChange={(v) => patch({ title: v })} multiline rows={2} />
              <TextField label="Content" value={asString(item.content)} onChange={(v) => patch({ content: v })} multiline rows={5} />
            </div>
          )}
        />
        {typographyBlock}
      </div>
    );
  }

  if (sectionKey === "checkout") {
    const methods = asArray<string>(payload.payment_methods);
    const options = ["cod", "bank_transfer", "qris", "card"];
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className={labelClass}>Payment Methods (CMS / fallback manual)</p>
          <p className="text-xs normal-case tracking-normal text-[#c9b99a]/55">
            Mode Manual di Pengaturan Pembayaran memakai COD. Bank Transfer / QRIS / Kartu
            dikonfigurasi per Midtrans atau Xendit.
          </p>
          <div className="flex flex-wrap gap-4">
            {options.map((method) => (
              <label key={method} className="flex items-center gap-2 text-sm normal-case tracking-normal">
                <input
                  type="checkbox"
                  checked={methods.includes(method)}
                  onChange={(event) => {
                    update(
                      "payment_methods",
                      event.target.checked
                        ? [...methods, method]
                        : methods.filter((item) => item !== method),
                    );
                  }}
                />
                {method}
              </label>
            ))}
          </div>
        </div>
        <TextField
          label="Payment Notice"
          value={asString(payload.payment_notice)}
          onChange={(v) => update("payment_notice", v)}
          multiline
        />
        <TextField
          label="Shipping Notice / Label"
          value={asString(payload.shipping_notice ?? payload.shipping_label)}
          onChange={(v) => onChange({ ...payload, shipping_notice: v, shipping_label: v })}
          multiline
        />
        <TextField
          label="Shipping Note"
          value={asString(payload.shipping_note)}
          onChange={(v) => update("shipping_note", v)}
          multiline
        />
        {typographyBlock}
      </div>
    );
  }

  return (
    <p className="text-sm text-[#c9b99a]/50">
      Form editor untuk section ini belum tersedia.
    </p>
  );
}
