"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative flex h-[min(100svh,650px)] min-h-[580px] w-full flex-col items-center justify-start overflow-hidden pt-24 md:h-auto md:min-h-screen md:justify-center md:pt-0"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('/gambar/seksi%201/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 aspect-[16/9] w-full md:inset-0 md:h-auto md:aspect-auto"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Mobile: tampilkan seluruh komposisi agar botol di kedua sisi tidak terpotong. */}
        <Image
          src="/gambar/seksi%201/produk.png"
          fill
          className="object-contain object-bottom md:hidden"
          sizes="100vw"
          alt="Evomi Product Collection"
          priority
        />

        {/* Desktop: pertahankan komposisi hero yang sudah ada. */}
        <Image
          src="/gambar/seksi%201/produk.png"
          fill
          className="hidden object-cover object-bottom md:block"
          sizes="100vw"
          alt="Evomi Product Collection"
          priority
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-5 text-center md:mt-12 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/gambar/seksi%201/logo.png"
            alt="Evomi Logo"
            width={245}
            height={245}
            className="mb-5 h-auto w-32 object-contain sm:w-36 md:mb-15 md:w-54"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
          }}
          className="max-w-[330px] font-graziemille text-[23px] font-medium italic leading-tight md:max-w-none md:whitespace-nowrap md:text-[28px] md:leading-snug"
        >
          Where Every Island Tells Its Fragrance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          style={{
            color: "#F5EDD6",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
          className="max-w-[320px] font-graziemille text-[12px] font-normal md:max-w-none md:whitespace-nowrap md:text-[13px]"
        >
          Six fragrances crafted from the soul of the Indonesian archipelago
          each bottle <br className="hidden md:block" /> a journey through the Nusantara&apos;s most sacred
          landscapes.
        </motion.p>

        <motion.div
          className="w-max cursor-pointer hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <a
            href="#collection"
            style={{
              position: "relative",
              borderRadius: "7.11px",
              background:
                "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461) padding-box, linear-gradient(86.7deg, #ffeeab, rgba(255, 238, 171, 0) 25%, rgba(255, 238, 171, 0) 75%, #ffeeab) border-box",
              border: "0.6px solid transparent",
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 12px",
              textAlign: "center",
              fontSize: "12.0px",
              color: "#124b46",
              fontFamily: "Gilland, sans-serif",
            }}
          >
            <b
              style={{
                position: "relative",
                letterSpacing: "1.92px",
                lineHeight: "10.54px",
                whiteSpace: "nowrap",
                padding: 3,
              }}
              className="font-gilland font-bold"
            >
              EXPLORE COLLECTION
            </b>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
