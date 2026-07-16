"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetail from "../Modals/ProductDetail";

// 1. Data Sementara (MOCK DATA)
// Menambahkan properti "badge" untuk Secret of Buton, Breeze of Alor, dan Warmth of Papua
const productsData = [
  {
    id: 1,
    image: "/gambar/seksi%204/button.jpg",
    topTitle: "BUTON ISLAND · SOUTHEAST SULAWESI",
    name: "Secret of Buton",
    bgColor: "#134b46",
    size: "15 ml Parfum",
    price: "Rp 120.000",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    image: "/gambar/seksi%204/sumba.jpg",
    topTitle: "SUMBA ISLAND · EAST NUSA TENGGARA",
    name: "Reverie of Sumba",
    bgColor: "#994121",
    size: "15 ml Parfum",
    price: "Rp 120.000",
  },
  {
    id: 3,
    image: "/gambar/seksi%204/nias.jpg",
    topTitle: "NIAS ISLAND · NORTH SUMATRA",
    name: "Charm of Nias",
    bgColor: "#A71F24",
    size: "15 ml Parfum",
    price: "Rp 120.000",
  },
  {
    id: 4,
    image: "/gambar/seksi%204/komodo.jpg",
    topTitle: "KOMODO ISLAND · EAST NUSA TENGGARA",
    name: "Apex of Komodo",
    bgColor: "#333333",
    size: "15 ml Parfum",
    price: "Rp 120.000",
  },
  {
    id: 5,
    image: "/gambar/seksi%204/alor.jpg",
    topTitle: "ALOR ISLAND · EAST NUSA TENGGARA",
    name: "Breeze of Alor",
    bgColor: "#193B63",
    size: "15 ml Parfum",
    price: "Rp 120.000",
    badge: "COMING SOON",
  },
  {
    id: 6,
    image: "/gambar/seksi%204/papua.jpg",
    topTitle: "PAPUA ISLAND · NORTH OF AUSTRALIA",
    name: "Warmth of Papua",
    bgColor: "#3F281B",
    size: "15 ml Parfum",
    price: "Rp 120.000",
    badge: "COMING SOON",
  },
];

const Collections = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  const handleDiscoverClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section
      className="flex flex-col items-center w-full py-20 overflow-hidden relative"
      // Perubahan background linear-gradient sesuai permintaan
      style={{
        background: "linear-gradient(180deg, #00221f, #022421 50%, #00221f)",
      }}
    >
      {/* Teks "THE COLLECTION" */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-[10px] text-[#F5EDD6] font-medium tracking-widest mb-3 uppercase"
        style={{ fontFamily: "'Grazie mille', serif" }}
      >
        THE COLLECTION
      </motion.p>

      {/* Teks "Six Islands, Six Stories" */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="text-[35px] font-normal text-transparent bg-clip-text text-center mb-6"
        style={{
          backgroundImage: goldGradient,
          fontFamily: "'Gilland', sans-serif",
        }}
      >
        Six Islands, Six Stories
      </motion.h2>

      {/* Gambar Ornamen SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative w-[213px] h-[17px] mb-6"
      >
        <Image
          src="/gambar/seksi%204/ornamen.svg"
          alt="Ornament line"
          fill
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* Teks Deskripsi Panjang */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="text-[14px] text-[#C9B99A] text-center max-w-[650px] leading-relaxed mb-16 px-4"
        style={{ fontFamily: "'Grazie mille', serif", fontWeight: "normal" }}
      >
        Each fragrance is an olfactory journey through the soul of the
        Indonesian archipelago — six islands, six stories, one nation breathed
        into being.
      </motion.p>

      {/* Grid Produk - Gap diubah jadi 10 (gap-10) untuk memberi ruang karena card diperbesar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 max-w-7xl mx-auto px-4">
        {productsData.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeOut" }}
            // Ukuran Card diperbesar dari w-[325px] menjadi w-[350px]
            className="w-full md:w-[350px] h-auto flex flex-col rounded-sm border border-[#2a2a2a] relative"
            style={{ backgroundColor: product.bgColor }}
          >
            {/* BADGE (Hanya muncul jika product.badge ada isinya) */}
            {product.badge && (
              <div
                className="absolute top-4 left-4 z-10 px-2 py-0.5 text-[9px] font-bold text-[#091812] tracking-wider shadow-md"
                style={{ background: goldGradient }}
              >
                {product.badge}
              </div>
            )}

            {/* Bagian Atas: Gambar Produk (Tinggi gambar disesuaikan sedikit menjadi 260px) */}
            <div className="relative w-full h-[320px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={100}
                style={{ objectFit: "cover", transform: "scale(1.1)" }}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Bagian Bawah: Informasi Produk */}
            <div className="flex flex-col flex-1 p-6 pb-7 text-left justify-between">
              <div>
                <p
                  className="text-[10px] font-medium tracking-wider mb-2 uppercase truncate"
                  style={{
                    color: "#C9B99AB2",
                    fontFamily: "'Grazie mille', serif",
                  }}
                >
                  {product.topTitle}
                </p>
                <h3
                  className="text-[22px] font-normal text-transparent bg-clip-text mb-2"
                  style={{
                    backgroundImage: goldGradient,
                    fontFamily: "'Gilland', sans-serif",
                  }}
                >
                  {product.name}
                </h3>
                <p className="text-[11px] text-[#F5EDD6] mb-6 tracking-wide">
                  {product.size}
                </p>
              </div>

              <div className="flex flex-row items-center justify-between mt-auto">
                <p
                  className="text-[18px] text-[#F8C56C] font-normal"
                  style={{ fontFamily: "'Gilland', sans-serif" }}
                >
                  {product.price}
                </p>

                {/* Tombol memanggil Modal */}
                <button
                  onClick={() => handleDiscoverClick(product)}
                  className="flex flex-row items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{
                    color: "#F5EDD6CC",
                    fontFamily: "'Grazie mille', serif",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  DISCOVER
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="w-[260px] h-[40px] flex items-center justify-center gap-3 text-[12px] text-[#124B46] rounded-sm hover:opacity-90 transition-opacity"
        style={{ background: goldGradient, fontWeight: "bold" }}
      >
        VIEW COMPLETE COLLECTION
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </motion.button>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Hindari modal tertutup saat konten diklik
              className="relative shadow-2xl rounded-sm"
            >
              <ProductDetail
                product={selectedProduct}
                onClose={() => setIsModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Collections;
