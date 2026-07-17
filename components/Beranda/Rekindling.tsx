"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Rekindling() {
  return (
    <section className="rekindling-section relative flex w-full items-center overflow-hidden bg-[#012320]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 15, 14, 0.42), rgba(0, 12, 11, 0.62)),
            url('/gambar/seksi%201/bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <motion.div
        className="rekindling-product pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          backgroundImage: `
            radial-gradient(ellipse 95% 90% at 62% 48%, transparent 25%, rgba(0, 22, 20, 0.28) 72%, rgba(0, 12, 11, 0.68) 100%),
            linear-gradient(to bottom, rgba(0, 13, 12, 0.35), transparent 24%, transparent 72%, rgba(0, 10, 9, 0.72)),
            url('/gambar/seksi%202/produk.png')
          `,
          backgroundRepeat: "no-repeat",
        }}
      />

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
          {"Arcanisia \nRekindling Love \nfor Indonesia"}
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
          A fragrance brand that reignites the flame of love for Indonesia,
          where every scent breathes the soul of the Nusantara.
        </motion.p>
      </div>
    </section>
  );
}
