"use client";

import { useState } from "react";
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
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof productsData)[number] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  const handleDiscoverClick = (product: (typeof productsData)[number]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section
      className="relative flex w-full flex-col items-center overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24"
      style={{
        background: "linear-gradient(180deg, #00221f, #022421 50%, #00221f)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mb-3 font-medium uppercase text-[#F5EDD6CC] text-[9px] tracking-[3px] sm:text-[10px]"
        style={{ fontFamily: "'Grazie mille', serif" }}
      >
        THE COLLECTION
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mb-5 bg-clip-text px-2 text-center text-[28px] font-normal leading-tight text-transparent sm:text-[34px] md:mb-6 md:text-[40px]"
        style={{
          backgroundImage: goldGradient,
          fontFamily: "'Gilland', sans-serif",
        }}
      >
        Six Islands, Six Stories
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative mb-5 h-[13px] w-[165px] sm:h-[15px] sm:w-[190px] md:mb-6 md:w-[213px]"
      >
        <Image
          src="/gambar/seksi%204/ornamen.svg"
          alt="Ornament line"
          fill
          className="object-contain"
          sizes="213px"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="mb-10 max-w-[650px] px-4 text-center text-[13px] leading-relaxed text-[#C9B99A] sm:text-[14px] md:mb-14 md:text-[15px]"
        style={{ fontFamily: "'Grazie mille', serif", fontWeight: "normal" }}
      >
        Each fragrance is an olfactory journey through the soul of the
        Indonesian archipelago — six islands, six stories, one nation breathed
        into being.
      </motion.p>

      <div className="mx-auto mb-12 grid w-full max-w-[1160px] grid-cols-1 gap-5 px-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 lg:gap-7">
        {productsData.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeOut" }}
            className="relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-sm border border-[#F5EDD6]/10"
            style={{ backgroundColor: product.bgColor }}
          >
            {product.badge && (
              <div
                className="absolute left-3 top-3 z-10 px-2 py-1 text-[8px] font-bold tracking-wider text-[#091812] shadow-md sm:left-4 sm:top-4 sm:text-[9px]"
                style={{ background: goldGradient }}
              >
                {product.badge}
              </div>
            )}

            <div className="relative aspect-[1.1/1] w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={100}
                className="scale-105 object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1279px) 50vw, 370px"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 text-left sm:p-6 sm:pb-7">
              <div>
                <p
                  className="mb-2 truncate text-[9px] font-medium uppercase tracking-wider sm:text-[10px]"
                  style={{
                    color: "#C9B99AB2",
                    fontFamily: "'Grazie mille', serif",
                  }}
                >
                  {product.topTitle}
                </p>
                <h3
                  className="mb-2 bg-clip-text text-[20px] font-normal leading-tight text-transparent sm:text-[22px]"
                  style={{
                    backgroundImage: goldGradient,
                    fontFamily: "'Gilland', sans-serif",
                  }}
                >
                  {product.name}
                </h3>
                <p className="mb-5 text-[10px] tracking-wide text-[#F5EDD6] sm:mb-6 sm:text-[11px]">
                  {product.size}
                </p>
              </div>

              <div className="mt-auto flex flex-row items-center justify-between gap-3">
                <p
                  className="whitespace-nowrap text-[16px] font-normal text-[#F8C56C] sm:text-[18px]"
                  style={{ fontFamily: "'Gilland', sans-serif" }}
                >
                  {product.price}
                </p>

                <button
                  type="button"
                  onClick={() => handleDiscoverClick(product)}
                  className="flex shrink-0 flex-row items-center gap-1 transition-opacity hover:opacity-80"
                  style={{
                    color: "#F5EDD6CC",
                    fontFamily: "'Grazie mille', serif",
                    fontSize: "11px",
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
        type="button"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="flex h-10 w-full max-w-[260px] items-center justify-center gap-3 rounded-sm font-gilland text-[10px] font-normal tracking-[1px] text-[#124B46] transition-opacity hover:opacity-90 sm:text-[11px]"
        style={{ background: goldGradient }}
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
