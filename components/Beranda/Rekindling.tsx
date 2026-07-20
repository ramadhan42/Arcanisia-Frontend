"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";

export default function Rekindling() {
  const { section } = useSiteContent();
  const content = section<{ title?: string; description?: string; background_image?: string; product_image?: string }>("rekindling");
  return (
    <section className="rekindling-section relative flex w-full items-center overflow-hidden bg-[#012320]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <SafeImage
          src={content.background_image ?? "/gambar/seksi%201/bg.jpg"}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #012320 0%, rgba(1, 35, 32, 0.6) 12%, rgba(1, 35, 32, 0.5) 50%, rgba(1, 35, 32, 0.6) 88%, #012320 100%)",
          }}
        />
      </div>

      <motion.div
        className="rekindling-product pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <SafeImage
          src={content.product_image ?? "/gambar/seksi%202/produk.png"}
          alt=""
          fill
          className="object-cover object-[76%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 95% 90% at 62% 48%, transparent 25%, rgba(0, 22, 20, 0.28) 72%, rgba(0, 12, 11, 0.68) 100%),
              linear-gradient(to bottom, #012320 0%, rgba(1, 35, 32, 0.5) 14%, rgba(1, 35, 32, 0.12) 40%, rgba(1, 35, 32, 0.12) 60%, rgba(1, 35, 32, 0.5) 86%, #012320 100%)
            `,
          }}
        />
      </motion.div>

      <div className="rekindling-content relative z-20 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transformOrigin: "center left",
          }}
          className="font-gilland whitespace-pre-line font-normal"
        >
          {content.title ?? "Arcanisia \nRekindling Love \nfor Indonesia"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-graziemille font-normal"
          style={{
            color: "#C9B99A",
            transformOrigin: "center left",
          }}
        >
          {content.description}
        </motion.p>
      </div>
    </section>
  );
}
