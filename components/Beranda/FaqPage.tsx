"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IconMinus = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPlus = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2V10M2 6H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMail = () => (
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
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

type CategoryType = "produk" | "pengiriman" | "retur" | "keamanan";

const faqData = [
  {
    id: 1,
    category: "produk",
    question: "Apa yang membedakan Arcanisia dari parfum merek lain?",
    answer:
      "Arcanisia lahir dari jiwa Nusantara — setiap botol adalah narasi budaya, bukan sekadar wewangian. Kami menggabungkan bahan-bahan alami khas kepulauan Indonesia yang jarang ditemukan di parfum komersial global, dikurasi oleh maestro parfumer lokal yang berdedikasi pada autentisitas dan keberlanjutan.",
  },
  {
    id: 2,
    category: "produk",
    question: "Berapa lama ketahanan (longevity) setiap wewangian Arcanisia?",
    answer:
      "Ketahanan wewangian Arcanisia bervariasi antara 8 hingga 12 jam, tergantung pada jenis kulit dan kondisi lingkungan. Formula Extrait de Parfum kami dirancang untuk memberikan daya tahan maksimal sepanjang hari.",
  },
  {
    id: 3,
    category: "produk",
    question: "Apakah bahan baku Arcanisia 100% alami dan aman?",
    answer:
      "Kami menggunakan perpaduan bahan alami berkualitas tinggi dan bahan sintetis yang 100% aman (safe synthetics) sesuai standar IFRA. Hal ini memastikan konsistensi aroma, keamanan kulit, dan pelestarian alam yang berkelanjutan.",
  },
  {
    id: 4,
    category: "produk",
    question: "Apakah Arcanisia tersedia dalam ukuran travel size?",
    answer:
      "Ya, kami menyediakan ukuran travel size 15ml untuk beberapa koleksi unggulan kami, sehingga Anda dapat dengan mudah membawa aroma favorit ke mana pun Anda pergi.",
  },
  {
    id: 5,
    category: "pengiriman",
    question: "Berapa lama waktu pengiriman pesanan saya?",
    answer:
      "Estimasi waktu pengiriman standar adalah 2-5 hari kerja untuk wilayah Jabodetabek, dan 3-7 hari kerja untuk luar Jabodetabek. Kami juga menyediakan opsi pengiriman ekspres untuk beberapa wilayah.",
  },
  {
    id: 6,
    category: "pengiriman",
    question: "Apakah pengiriman bisa dikirim ke seluruh Indonesia?",
    answer:
      "Ya, kami melayani pengiriman ke seluruh pelosok Indonesia menggunakan berbagai mitra logistik terpercaya kami.",
  },
  {
    id: 7,
    category: "retur",
    question:
      "Apakah saya bisa menukar atau mengembalikan produk yang sudah dibeli?",
    answer:
      "Produk yang sudah dibeli dapat ditukar atau dikembalikan maksimal 7 hari setelah barang diterima, asalkan belum dibuka, segel utuh, dan Anda menyertakan video unboxing sebagai bukti kerusakan atau kesalahan pengiriman.",
  },
  {
    id: 8,
    category: "keamanan",
    question: "Apakah produk Arcanisia aman untuk kulit sensitif?",
    answer:
      "Semua produk kami diformulasikan dengan sangat hati-hati dan telah melalui uji coba keamaan (dermatologically tested). Namun, jika Anda memiliki riwayat alergi tertentu, kami sarankan untuk melakukan patch test terlebih dahulu.",
  },
];

const categoriesData: { id: CategoryType; label: string }[] = [
  { id: "produk", label: "PRODUK" },
  { id: "pengiriman", label: "PENGIRIMAN" },
  { id: "retur", label: "RETUR & PENGEMBALIAN" },
  { id: "keamanan", label: "KEASLIAN & KEAMANAN" },
];

const FAQPage: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("produk");
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleCategoryChange = (categoryId: CategoryType) => {
    if (activeCategory === categoryId) return; // Mencegah re-render jika klik menu yang sama
    setActiveCategory(categoryId);
    const firstOfCategory = faqData.find((faq) => faq.category === categoryId);
    setActiveId(firstOfCategory ? firstOfCategory.id : null);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "821px",
        background: "linear-gradient(180deg, #071d1b, #012421 50%, #071d1b)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "96px 24px",
        boxSizing: "border-box",
        overflowX: "hidden", // Mencegah horizontal scroll saat animasi slide
      }}
    >
      {/* HEADER SECTION - Animasi Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "1280px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            boxSizing: "border-box",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "64px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#c9a84c",
                letterSpacing: "5px",
                fontSize: "10px",
                fontFamily: "'Grazie mille'",
                marginBottom: "16px",
              }}
            >
              PUSAT BANTUAN
            </div>
            <div
              style={{
                fontSize: "53px",
                fontFamily: "Gilland",
                lineHeight: "74px",
                background:
                  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pertanyaan yang
              <br />
              Sering Diajukan
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              fontSize: "14px",
              color: "rgba(201, 185, 154, 0.6)",
            }}
          >
            <div style={{ lineHeight: "26px" }}>
              <span>{`Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu melalui live chat atau email `}</span>
              <span style={{ color: "#c9a84c" }}>hello@arcanisia.id</span>
              <span>.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTENT SECTION */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          display: "grid",
          gridTemplateColumns: "252px 1fr",
          gap: "32px",
        }}
      >
        {/* SIDEBAR - Animasi Scroll Tertunda (Stagger) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {categoriesData.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = faqData.filter(
                (faq) => faq.category === cat.id,
              ).length;
              return (
                <motion.div
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  whileHover={{ backgroundColor: "rgba(201, 168, 76, 0.12)" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "252px",
                    height: "40.3px",
                    position: "relative",
                    backgroundColor: isActive
                      ? "rgba(201, 168, 76, 0.08)"
                      : "transparent",
                    border: isActive
                      ? "0.7px solid rgba(201, 168, 76, 0.5)"
                      : "none",
                    boxSizing: "border-box",
                    color: isActive ? "#c9a84c" : "rgba(201, 185, 154, 0.5)",
                    cursor: "pointer",
                    borderRadius: "4px", // Tambahan kecil untuk memperhalus sudut hover
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      style={{
                        position: "absolute",
                        top: "0.67px",
                        left: "0",
                        backgroundColor: "#c9a84c",
                        width: "3px",
                        height: "100%",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: "12.33px",
                      left: "16.67px",
                      letterSpacing: "2px",
                      fontWeight: isActive ? "bold" : "normal",
                      fontSize: "12px",
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "13.33px",
                      right: "16px",
                      backgroundColor: isActive ? "#c9a84c" : "transparent",
                      padding: isActive ? "0 6px" : "0",
                      height: isActive ? "14px" : "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                      color: isActive ? "#091812" : "rgba(201, 168, 76, 0.3)",
                      letterSpacing: "2px",
                      borderRadius: isActive ? "2px" : "0",
                    }}
                  >
                    {count}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            style={{
              borderTop: "0.7px solid rgba(201, 168, 76, 0.1)",
              marginTop: "32px",
              paddingTop: "32px",
              color: "rgba(201, 185, 154, 0.4)",
            }}
          >
            <div style={{ letterSpacing: "2.7px", fontSize: "9px" }}>
              MASIH BUTUH BANTUAN?
            </div>
            <motion.div
              whileHover={{ color: "#c9a84c", x: 5 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                gap: "8px",
                fontSize: "10px",
                color: "rgba(201, 168, 76, 0.7)",
                cursor: "pointer",
              }}
            >
              <IconMail />
              <div style={{ letterSpacing: "1.5px" }}>Hubungi Kami</div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ LIST - Animasi Perpindahan Menu & Scroll */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          style={{
            border: "0.7px solid rgba(201, 168, 76, 0.12)",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Tambahan sedikit kontras
            boxSizing: "border-box",
            color: "rgba(201, 168, 76, 0.4)",
            position: "relative",
            overflow: "hidden", // Memastikan animasi keluar/masuk tidak melebar
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {faqData
                .filter((faq) => faq.category === activeCategory)
                .map((faq, index) => {
                  const isActive = activeId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      style={{
                        backgroundColor: isActive
                          ? "rgba(201, 168, 76, 0.05)"
                          : "transparent",
                        borderBottom: "0.7px solid rgba(201, 168, 76, 0.12)",
                        display: "flex",
                        flexDirection: "column",
                        color: isActive ? "#c9a84c" : "inherit",
                      }}
                    >
                      {/* Animasi saat Card Card interaktif dihover */}
                      <motion.div
                        whileHover={{
                          backgroundColor: "rgba(201, 168, 76, 0.08)",
                        }}
                        whileTap={{ scale: 0.99 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          padding: "24px",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleAccordion(faq.id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            maxWidth: "85%",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "19px",
                              lineHeight: "28px",
                              minWidth: "24px",
                            }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div
                            style={{
                              fontSize: "21px",
                              lineHeight: "28px",
                              color: isActive
                                ? "#f5edd6"
                                : "rgba(245, 237, 214, 0.8)",
                            }}
                          >
                            {faq.question}
                          </div>
                        </div>

                        {/* Animasi perputaran icon */}
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            height: "28px",
                            width: "28px",
                            backgroundColor: isActive
                              ? "#c9a84c"
                              : "transparent",
                            border: `0.7px solid ${
                              isActive ? "#c9a84c" : "rgba(201, 168, 76, 0.25)"
                            }`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isActive ? "#071d1b" : "#c9a84c",
                            borderRadius: "50%", // Membuatnya bulat lebih estetik
                          }}
                        >
                          {isActive ? <IconMinus /> : <IconPlus />}
                        </motion.div>
                      </motion.div>

                      {/* Animasi buka tutup akordeon */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 20,
                            }}
                            style={{ overflow: "hidden", width: "100%" }}
                          >
                            <div
                              style={{
                                padding: "0px 24px 24px 64px",
                                fontSize: "14px",
                                color: "rgba(201, 185, 154, 0.75)",
                              }}
                            >
                              <div
                                style={{
                                  width: "32px",
                                  height: "1px",
                                  backgroundColor: "rgba(201, 168, 76, 0.3)",
                                  marginBottom: "16px",
                                }}
                              />
                              <div style={{ lineHeight: "26px" }}>
                                {faq.answer}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
