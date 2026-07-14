"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    // Container utama
    <section
      className="relative w-full py-24 px-6 md:px-35 flex items-center overflow-hidden"
      style={{
        // Layer 1: Gradient untuk meredupkan atas & bawah (0-5% dan 95-100%)
        // Layer 2: Gambar produk utama
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
    >
      {/* Konten Teks (Berada di atas background) */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-6">
        <h2
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
        </h2>

        <p
          className="font-graziemille font-normal text-[14px]"
          style={{ color: "#C9B99A", maxWidth: "400px" }}
        >
          A fragrance brand that reignites the flame of love for Indonesia,
          where every scent breathes the soul of the Nusantara.
        </p>
      </div>
    </section>
  );
}
