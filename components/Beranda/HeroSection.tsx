"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    // Container utama
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        // Menambahkan linear-gradient di atas gambar url()
        // to top = arah gradasi dari bawah ke atas
        // rgba(0,0,0, 0.1) = bawah lebih terang/transparan
        // rgba(0,0,0, 0.9) = atas lebih gelap/hitam pekat
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('/gambar/seksi%201/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background kedua (Gambar Produk) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/gambar/seksi%201/produk.png"
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            maxWidth: "100%",
            overflow: "hidden",
            objectFit: "cover",
            objectPosition: "bottom", // <-- KUNCI: Ubah ke bottom agar bawahnya tidak terpotong
          }}
          width={1302}
          height={663}
          sizes="100vw"
          alt="Evomi Product Collection"
          priority
        />
      </div>

      {/* Konten Utama (Logo, Teks, Button) */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto mt-12">
        {/* Logo */}
        <Image
          src="/gambar/seksi%201/logo.png"
          alt="Evomi Logo"
          width={245} // Diperbesar 2x dari 128
          height={245} // Diperbesar 2x dari 128
          className="w-48 md:w-54 mb-6 object-contain md:mb-15"
        />

        {/* Heading Teks */}
        <h1
          style={{
            fontSize: "28.0px",
            background:
              "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
            whiteSpace: "nowrap", // Tambahkan di sini
          }}
          className="font-graziemille font-medium italic leading-snug"
        >
          Where Every Island Tells Its fragrance
        </h1>

        {/* Teks Deskripsi */}
        <p
          style={{
            color: "#F5EDD6",
            fontSize: "13.0px",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
          className="font-graziemille font-normal whitespace-nowrap"
        >
          Six fragrances crafted from the soul of the Indonesian archipelago
          each bottle <br />a journey through the Nusantara's most sacred
          landscapes.
        </p>

        {/* Tombol Gold */}
        <div className="w-max cursor-pointer hover:opacity-90 transition-opacity">
          <div
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
                whiteSpace: "nowrap", // Memastikan teks tetap dalam 1 baris
                padding: 3,
              }}
              // KUNCI: Menambahkan class untuk memanggil Gilland dan ketebalan Bold
              className="font-gilland font-bold"
            >
              EXPLORE COLLECTION
            </b>
          </div>
        </div>
      </div>
    </section>
  );
}
