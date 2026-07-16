"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Rekindling() {
  return (
    // Container utama (Diberi warna dasar gelap agar tidak blank saat background slide up)
    <section className="relative w-full py-24 px-6 md:px-35 flex items-center overflow-hidden bg-[#012320]">
      {/* 1. Background (Gambar Produk + Gradient) - Muncul dari bawah seperti di HeroSection */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(1, 35, 32, 0.61) 0%, 
              rgba(1, 35, 32, 0.26) 15%, 
              rgba(1, 35, 32, 0.17) 55%, 
              rgba(1, 35, 32, 0.95) 100%
            ), 
            url('/gambar/seksi%202/produk.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Konten Teks (Berada di atas background) */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-6">
        {/* 2. Heading Teks - Muncul dari atas ke bawah, kiri ke kanan */}
        <motion.h2
          initial={{ opacity: 0, y: -30, x: -30 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            fontSize: "45px",
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2",
          }}
          className="font-gilland font-normal whitespace-pre-line"
        >
          {"Arcanisia \nRekindling Love \nfor Indonesia"}
        </motion.h2>

        {/* 3. Lanjutan Teks - Mengikuti arah yang sama dengan tambahan delay */}
        <motion.p
          initial={{ opacity: 0, y: -20, x: -20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-graziemille font-normal text-[14px]"
          style={{ color: "#C9B99A", maxWidth: "400px" }}
        >
          A fragrance brand that reignites the flame of love for Indonesia,
          where every scent breathes the soul of the Nusantara.
        </motion.p>
      </div>
    </section>
  );
}
