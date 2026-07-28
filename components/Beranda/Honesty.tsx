"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTranslation } from "@/contexts/LocaleContext";
import SafeImage from "@/components/ui/SafeImage";
import { normalizeValueItems } from "@/lib/valuesContent";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

const goldText = {
  background:
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Honesty() {
  const { locale, t } = useTranslation();
  const { section, isLoading } = useSiteContent();
  const content = section<{
    eyebrow?: string;
    title?: string;
    background_image?: string;
    items?: Parameters<typeof normalizeValueItems>[0];
    typography?: Record<string, unknown>;
  }>("values");

  const items = isLoading
    ? []
    : normalizeValueItems(content.items, locale);
  const payload = content as Record<string, unknown>;
  const eyebrowDefaults = SECTION_TYPOGRAPHY_FIELDS.values?.find((item) => item.key === "eyebrow")?.defaults;
  const titleDefaults = SECTION_TYPOGRAPHY_FIELDS.values?.find((item) => item.key === "title")?.defaults;
  const eyebrowStyle = resolveTextStyle(payload, "eyebrow", eyebrowDefaults);
  const titleStyle = resolveTextStyle(payload, "title", titleDefaults);
  const useEyebrowTypography = !isLoading && hasTypographyField(payload, "eyebrow");
  const useTitleTypography = !isLoading && hasTypographyField(payload, "title");
  const eyebrowText = isLoading ? "" : (content.eyebrow ?? t("values.eyebrow"));
  const titleText = isLoading ? "" : (content.title ?? t("values.title"));
  const eyebrowLines = splitTextByNewlines(eyebrowText);
  const titleLines = splitTextByNewlines(titleText);

  const renderCmsLines = (text: string) => {
    const lines = splitTextByNewlines(text);
    return lines.map((line, index) => (
      <span
        key={`${line}-${index}`}
        className={
          lines.length > 1 ? "block whitespace-nowrap" : "whitespace-nowrap"
        }
      >
        {line}
      </span>
    ));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#012421] text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[260px] overflow-hidden sm:h-[310px] md:h-[440px] lg:h-[480px]"
      >
        <SafeImage
          src={content.background_image ?? "/gambar/seksi%206/bg.png"}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #012421 0%, rgba(1,36,33,0.88) 14%, rgba(1,36,33,0.42) 40%, rgba(1,36,33,0.42) 58%, rgba(1,36,33,0.88) 84%, #012421 100%)",
          }}
        />
      </div>

      <header className="relative z-10 flex min-h-[150px] w-full flex-col items-center justify-center px-6 py-9 sm:min-h-[200px] md:min-h-[340px] md:py-16 lg:min-h-[377px]">
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`relative z-10 leading-none tracking-[3px] sm:text-[9px] md:text-[12px] md:tracking-[5px] ${
            useEyebrowTypography
              ? textStyleFontClass(eyebrowStyle)
              : "font-graziemille text-[8px] text-[#F5EDD6CC]"
          }`}
          style={useEyebrowTypography ? textStyleToCss(eyebrowStyle) : undefined}
          data-locale-text="true"
        >
          {renderCmsLines(eyebrowText)}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className={`relative z-10 mt-2 leading-tight sm:text-[30px] md:mt-4 md:text-[43px] ${
            useTitleTypography
              ? textStyleFontClass(titleStyle)
              : "font-gilland text-[24px]"
          }`}
          style={{
            ...goldText,
            ...(useTitleTypography
              ? {
                  ...textStyleToCss(titleStyle),
                  color: "transparent",
                }
              : {}),
          }}
          data-locale-text="true"
        >
          {renderCmsLines(titleText)}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 mt-3 h-3 w-[120px] md:mt-5 md:h-4 md:w-[213px]"
        >
          <SafeImage
            src="/gambar/seksi%206/ornamen.svg"
            alt=""
            fill
            className="object-contain"
            sizes="213px"
          />
        </motion.div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-4 gap-x-3 gap-y-10 px-4 pb-12 pt-10 sm:gap-x-5 md:gap-x-6 md:px-12 md:py-20 lg:gap-x-8">
        {items.map((item, index) => (
          <motion.article
            key={`${item.id}-${item.mainTitle}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15 * index,
              ease: "easeOut",
            }}
            className="mx-auto flex w-full max-w-[220px] flex-col items-center md:max-w-[260px]"
          >
            <SafeImage
              src={item.imgSrc}
              width={74}
              height={74}
              className="h-[40px] w-[40px] object-contain sm:h-[54px] sm:w-[54px] md:h-[74px] md:w-[74px]"
              sizes="74px"
              alt=""
            />

            <div className="mt-3 flex w-full flex-col items-center sm:mt-5 md:mt-8">
              <p
                className="font-graziemille text-[6px] font-medium leading-tight tracking-[1px] text-[#C9A84C] sm:text-[8px] sm:tracking-[2px] md:text-[9px] md:tracking-[2.2px]"
                data-locale-text="true"
              >
                {renderCmsLines(item.topTitle)}
              </p>

              <h3
                className="mt-1.5 font-gilland text-[11px] leading-tight text-[#F5EDD6] sm:mt-2 sm:text-[15px] md:text-[19px]"
                data-locale-text="true"
              >
                {renderCmsLines(item.mainTitle)}
              </h3>

              <p
                className="mt-2 font-graziemille text-[8px] font-light leading-[1.55] text-[#C9B99AB3] sm:mt-3 sm:text-[10px] md:mt-4 md:text-[11px] md:leading-[1.6]"
                data-locale-text="true"
              >
                {renderCmsLines(item.description)}
              </p>

              <span className="mt-3 h-px w-[18px] bg-[#C9A84C]/30 sm:mt-5 sm:w-[22px] md:w-[27px]" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
