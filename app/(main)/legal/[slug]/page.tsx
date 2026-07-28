"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTranslation } from "@/contexts/LocaleContext";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

interface LegalDocument {
  slug: string;
  title: string;
  content?: string;
  sections?: Array<{ heading?: string; body: string }>;
}

const goldGradient =
  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { section, isLoading, error } = useSiteContent();
  const legal = section<{
    documents?: LegalDocument[];
    pages?: LegalDocument[];
    typography?: Record<string, unknown>;
  }>("legal");
  const document = [...(legal.documents ?? []), ...(legal.pages ?? [])].find(
    (item) => item.slug === slug,
  );
  const payload = legal as Record<string, unknown>;
  const titleDefaults = SECTION_TYPOGRAPHY_FIELDS.legal?.find((item) => item.key === "pageTitle")?.defaults;
  const contentDefaults = SECTION_TYPOGRAPHY_FIELDS.legal?.find((item) => item.key === "pageContent")?.defaults;
  const titleStyle = resolveTextStyle(payload, "pageTitle", titleDefaults);
  const contentStyle = resolveTextStyle(payload, "pageContent", contentDefaults);
  const useTitleTypography = hasTypographyField(payload, "pageTitle");
  const useContentTypography = hasTypographyField(payload, "pageContent");

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#012421] font-graziemille text-[#c9b99a] scrollbar-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.12),transparent_65%)]"
      />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
            <button
              type="button"
              onClick={handleBack}
              className="group inline-flex h-11 items-center gap-2.5 bg-transparent px-1 font-graziemille text-[11px] tracking-[2.2px] text-[#F8C56C] transition-colors hover:text-[#fdde8a]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              <span data-locale-text="true">{t("common.back")}</span>
            </button>
          </motion.div>
        </motion.div>

        {isLoading && <p className="mt-8 text-sm tracking-[1px]">Memuat dokumen...</p>}
        {!isLoading && error && !document && (
          <p role="alert" className="mt-8 text-[#ff7b86]">
            {error}
          </p>
        )}
        {!isLoading && !document && (
          <p className="mt-8 text-sm tracking-[1px]">Dokumen tidak ditemukan.</p>
        )}

        {document && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-[10px] uppercase tracking-[3px] text-[#c9a84c]/70">
              Legal
            </p>
            <h1
              className={`${
                useTitleTypography
                  ? textStyleFontClass(titleStyle)
                  : "font-gilland text-3xl text-[#f8c56c] md:text-4xl"
              }`}
              style={
                useTitleTypography
                  ? textStyleToCss(titleStyle)
                  : {
                      backgroundImage: goldGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }
              }
            >
              {splitTextByNewlines(document.title).map((line, index, lines) => (
                <span
                  key={`${line}-${index}`}
                  className={lines.length > 1 ? "block whitespace-nowrap" : undefined}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div className="mt-5 h-px w-16 bg-[linear-gradient(90deg,#c9a84c,transparent)]" />

            {document.content && (
              <div
                className={`mt-8 whitespace-pre-line ${
                  useContentTypography
                    ? textStyleFontClass(contentStyle)
                    : "text-sm leading-8 text-[#c9b99a]"
                }`}
                style={useContentTypography ? textStyleToCss(contentStyle) : undefined}
              >
                {document.content}
              </div>
            )}

            <div className="mt-8 space-y-8">
              {document.sections?.map((item, index) => (
                <section key={`${item.heading}-${index}`}>
                  {item.heading && (
                    <h2
                      className={
                        useTitleTypography
                          ? textStyleFontClass(titleStyle)
                          : "font-gilland text-2xl text-[#f8c56c]"
                      }
                      style={useTitleTypography ? textStyleToCss(titleStyle) : undefined}
                    >
                      {item.heading}
                    </h2>
                  )}
                  <p
                    className={`mt-3 whitespace-pre-line ${
                      useContentTypography
                        ? textStyleFontClass(contentStyle)
                        : "text-sm leading-8"
                    }`}
                    style={useContentTypography ? textStyleToCss(contentStyle) : undefined}
                  >
                    {item.body}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </main>
  );
}
