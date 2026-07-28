"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";
import { scrollToSection } from "@/lib/sectionHash";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

export default function HeroSection() {
  const { section, isLoading } = useSiteContent();
  const content = section<{
    title?: string;
    description?: string;
    cta?: string;
    cta_label?: string;
    cta_href?: string;
    background_image?: string;
    product_image?: string;
    logo_image?: string;
  }>("hero");

  // While CMS is fetching, keep copy empty so defaults never drive
  // shimmer geometry or a visible flash under the locale handoff.
  const description = isLoading
    ? ""
    : (content.description ??
      "Enam wewangian yang diracik dari jiwa Nusantara — setiap botol adalah perjalanan melintasi lanskap paling sakral Indonesia.");
  const title = isLoading
    ? ""
    : (content.title ?? "Cerita Setiap Pulau\nyang Berbisik Tapi Terdengar");
  const payload = content as Record<string, unknown>;
  const titleDefaults = SECTION_TYPOGRAPHY_FIELDS.hero?.find((item) => item.key === "title")?.defaults;
  const descriptionDefaults = SECTION_TYPOGRAPHY_FIELDS.hero?.find((item) => item.key === "description")?.defaults;
  const ctaDefaults = SECTION_TYPOGRAPHY_FIELDS.hero?.find((item) => item.key === "cta")?.defaults;
  const titleStyle = resolveTextStyle(payload, "title", titleDefaults);
  const descriptionStyle = resolveTextStyle(payload, "description", descriptionDefaults);
  const ctaStyle = resolveTextStyle(payload, "cta", ctaDefaults);
  const useTitleTypography = !isLoading && hasTypographyField(payload, "title");
  const useDescriptionTypography = !isLoading && hasTypographyField(payload, "description");
  const useCtaTypography = !isLoading && hasTypographyField(payload, "cta");
  const titleLines = splitTextByNewlines(title);
  const descriptionLines = splitTextByNewlines(description);
  const isMultilineTitle = titleLines.length > 1;
  const isMultilineDescription = descriptionLines.length > 1;

  return (
    <section className="relative flex h-[min(100svh,650px)] min-h-[580px] w-full flex-col items-center justify-start overflow-hidden pt-24 md:h-auto md:min-h-screen md:justify-center md:pt-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <SafeImage
          src={content.background_image ?? "/gambar/seksi%201/bg.jpg"}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(1, 35, 32, 0.12), rgba(1, 35, 32, 0.28))",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 aspect-[16/9] w-full md:inset-0 md:h-auto md:aspect-auto"
        initial={{ opacity: 0.2, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        {/* Mobile: tampilkan seluruh komposisi agar botol di kedua sisi tidak terpotong. */}
        <SafeImage
          src={content.product_image ?? "/gambar/seksi%201/produk.png"}
          fill
          className="object-contain object-bottom md:hidden"
          sizes="100vw"
          alt="Evomi Product Collection"
          priority
        />

        {/* Desktop: pertahankan komposisi hero yang sudah ada. */}
        <SafeImage
          src={content.product_image ?? "/gambar/seksi%201/produk.png"}
          fill
          className="hidden object-cover object-bottom md:block"
          sizes="100vw"
          alt="Evomi Product Collection"
          priority
        />
      </motion.div>

      {/* Fade bagian atas dan bawah hero agar menyatu dengan navbar & section berikutnya. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, #012320 0%, rgba(1,35,32,0) 14%, rgba(1,35,32,0) 82%, #012320 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-5 text-center md:mt-12 md:px-6">
        <motion.div
          initial={{ opacity: 0.15, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        >
          <SafeImage
            src={content.logo_image ?? "/gambar/seksi%201/logo.png"}
            alt="Evomi Logo"
            width={245}
            height={245}
            className="mb-5 h-auto w-32 object-contain sm:w-36 md:mb-15 md:w-54"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0.12, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
            ...(useTitleTypography
              ? {
                  ...textStyleToCss(titleStyle),
                  color: "transparent",
                }
              : {}),
          }}
          className={`${useTitleTypography ? textStyleFontClass(titleStyle) : "font-graziemille font-medium"} italic leading-[1.2] ${
            isMultilineTitle
              ? "max-w-[min(100%,22rem)] text-[20px] sm:text-[23px] md:max-w-[26rem] md:text-[28px] md:leading-snug"
              : "max-w-[330px] text-[23px] md:max-w-none md:text-[28px] md:leading-snug md:whitespace-nowrap"
          }`}
        >
          {titleLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              data-locale-text="true"
              className={isMultilineTitle ? "block whitespace-nowrap" : undefined}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0.12, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
          style={{
            color: "#F5EDD6",
            marginBottom: "32px",
            lineHeight: "1.6",
            ...(useDescriptionTypography ? textStyleToCss(descriptionStyle) : {}),
          }}
          className={`${useDescriptionTypography ? textStyleFontClass(descriptionStyle) : "font-graziemille font-normal"} text-[12px] md:text-[13px] ${
            isMultilineDescription ? "" : "max-w-[320px] md:max-w-none md:whitespace-nowrap"
          }`}
        >
          {descriptionLines.map((line, index) => (
            <span
              key={index}
              // Each CMS Enter line stays on exactly one visual row (no soft wrap).
              className={isMultilineDescription ? "block whitespace-nowrap" : undefined}
            >
              {line}
            </span>
          ))}
        </motion.p>

        <motion.a
          href={content.cta_href ?? "#collection"}
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("collection", { setHash: false });
          }}
          initial={{ opacity: 0.12, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.42, ease: "easeOut" }}
          className="group relative inline-flex items-center justify-center rounded-[7px] px-4 py-3"
          style={{
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461) padding-box, linear-gradient(86.7deg, #ffeeab, rgba(255, 238, 171, 0) 25%, rgba(255, 238, 171, 0) 75%, #ffeeab) border-box",
            border: "0.6px solid transparent",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.22)",
          }}
        >
          <span
            data-locale-text="true"
            className={`relative leading-none tracking-[1.92px] ${
              useCtaTypography
                ? textStyleFontClass(ctaStyle)
                : "font-gilland text-[12px] font-bold text-[#124b46]"
            }`}
            style={useCtaTypography ? textStyleToCss(ctaStyle) : undefined}
          >
            {isLoading
              ? ""
              : (content.cta ?? content.cta_label ?? "JELAJAHI KOLEKSI")}
          </span>
        </motion.a>
      </div>
    </section>
  );
}
