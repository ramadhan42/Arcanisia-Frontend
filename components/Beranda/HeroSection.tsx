"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";
import { scrollToSection } from "@/lib/sectionHash";

function splitIntoTwoLines(text: string): string[] {
  if (text.includes("\n")) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const marker = text.match(/a journey/i);
  if (marker && marker.index && marker.index > 0) {
    return [text.slice(0, marker.index).trim(), text.slice(marker.index).trim()];
  }

  const mid = Math.floor(text.length / 2);
  let breakIndex = text.indexOf(" ", mid);
  if (breakIndex === -1) breakIndex = text.lastIndexOf(" ", mid);
  if (breakIndex === -1) return [text];
  return [text.slice(0, breakIndex).trim(), text.slice(breakIndex).trim()];
}

function splitHeroTitle(text: string): string[] {
  if (text.includes("\n")) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  // Keep Indonesian title on two lines so it does not cover the product art.
  const indonesian = text.match(/^(Di Mana Setiap Pulau)\s+(Menceritakan Wanginya)$/i);
  if (indonesian) {
    return [indonesian[1], indonesian[2]];
  }

  return [text];
}

export default function HeroSection() {
  const { section } = useSiteContent();
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

  const description =
    content.description ??
    "Enam wewangian yang diracik dari jiwa Nusantara — setiap botol adalah perjalanan melintasi lanskap paling sakral Indonesia.";
  const descriptionLines = splitIntoTwoLines(description);
  const title =
    content.title ?? "Di Mana Setiap Pulau\nMenceritakan Wanginya";
  const titleLines = splitHeroTitle(title);
  const isMultilineTitle = titleLines.length > 1;

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
          }}
          className={`max-w-[330px] font-graziemille text-[23px] font-medium italic leading-[1.2] md:text-[28px] md:leading-snug ${
            isMultilineTitle
              ? "md:max-w-[420px]"
              : "md:max-w-none md:whitespace-nowrap"
          }`}
        >
          {titleLines.map((line, index) => (
            <span key={`${line}-${index}`} data-locale-text="true">
              {line}
              {index < titleLines.length - 1 && <br />}
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
          }}
          className="max-w-[320px] font-graziemille text-[12px] font-normal md:max-w-none md:whitespace-nowrap md:text-[13px]"
        >
          {descriptionLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < descriptionLines.length - 1 && (
                <>
                  {" "}
                  <br className="hidden md:block" />
                </>
              )}
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
            className="relative font-gilland text-[12px] font-bold leading-none tracking-[1.92px] text-[#124b46]"
          >
            {content.cta ?? content.cta_label ?? "JELAJAHI KOLEKSI"}
          </span>
        </motion.a>
      </div>
    </section>
  );
}
