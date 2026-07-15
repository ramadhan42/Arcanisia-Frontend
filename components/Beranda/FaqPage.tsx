"use client";

import type { NextPage } from "next";
import Image from "next/image";
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
  // Produk
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
  // Pengiriman
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
  // Retur
  {
    id: 7,
    category: "retur",
    question:
      "Apakah saya bisa menukar atau mengembalikan produk yang sudah dibeli?",
    answer:
      "Produk yang sudah dibeli dapat ditukar atau dikembalikan maksimal 7 hari setelah barang diterima, asalkan belum dibuka, segel utuh, dan Anda menyertakan video unboxing sebagai bukti kerusakan atau kesalahan pengiriman.",
  },
  // Keamanan
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
  const [activeId, setActiveId] = useState<number | null>(1); // 1 is open by default

  const toggleAccordion = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const handleCategoryChange = (categoryId: CategoryType) => {
    setActiveCategory(categoryId);
    // Optionally open the first FAQ of the selected category automatically:
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
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: "10px",
          color: "#c9a84c",
          fontFamily: "'Grazie mille'",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <div
        style={{
          width: "100%",
          maxWidth: "1104px",
          height: "169px",
          display: "grid",
          boxSizing: "border-box",
          gridTemplateColumns: "repeat(2, 532px)",
          gridTemplateRows: "169px",
          gap: "40px",
        }}
      >
        <div
          style={{
            height: "169px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gridColumn: "1",
            gridRow: "1 / span 2",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                position: "relative",
                letterSpacing: "5px",
                lineHeight: "15px",
              }}
            >
              PUSAT BANTUAN
            </div>
          </div>
          <div
            style={{
              width: "532px",
              height: "154px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px 0px 0px",
              boxSizing: "border-box",
              fontSize: "48px",
              fontFamily: "Gilland",
            }}
          >
            <div
              style={{
                position: "relative",
                lineHeight: "69px",
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
        </div>

        {/* teks tidak menemukan jawaban */}
        <div
          style={{
            height: "169px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            gridColumn: "2",
            gridRow: "1 / span 2",
            fontSize: "12px",
            color: "rgba(201, 185, 154, 0.6)",
          }}
        >
          <div
            style={{
              width: "532px",
              position: "relative",
              lineHeight: "25.2px",
              display: "inline-block",
            }}
          >
            <span
              style={{ lineHeight: "25.2px" }}
            >{`Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu melalui live chat atau email `}</span>
            <span style={{ color: "#c9a84c", lineHeight: "25.2px" }}>
              hello@arcanisia.id
            </span>
            <span style={{ lineHeight: "25.2px" }}>.</span>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "1104px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "64px 0px 0px",
          boxSizing: "border-box",
          color: "rgba(201, 185, 154, 0.5)",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "grid",
            gridTemplateColumns: "repeat(4, 252px)",
            gridTemplateRows: "395.927001953125px",
            gap: "32px",
          }}
        >
          <div
            style={{
              height: "290.5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gridColumn: "1",
              gridRow: "1",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              {categoriesData.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = faqData.filter(
                  (faq) => faq.category === cat.id,
                ).length;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
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
                      color: isActive ? "#c9a84c" : "inherit",
                      cursor: "pointer",
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0.67px",
                          left: "0.67px",
                          backgroundColor: "#c9a84c",
                          width: "2px",
                          height: "39px",
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "12.33px",
                        left: "16.67px",
                        letterSpacing: "2px",
                        lineHeight: "15px",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    >
                      {cat.label}
                    </div>
                    {isActive ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "13.33px",
                          right: "16px",
                          backgroundColor: "#c9a84c",
                          padding: "0 6px",
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          color: "#091812",
                          letterSpacing: "2px",
                        }}
                      >
                        {count}
                      </div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          top: "14.33px",
                          right: "16px",
                          fontSize: "8px",
                          letterSpacing: "2px",
                          lineHeight: "12px",
                          color: "rgba(201, 168, 76, 0.3)",
                        }}
                      >
                        {count}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "32px 0px 0px",
                fontSize: "9px",
                color: "rgba(201, 185, 154, 0.4)",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  borderTop: "0.7px solid rgba(201, 168, 76, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "32px 0px 0px",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      letterSpacing: "2.7px",
                      lineHeight: "13.5px",
                    }}
                  >
                    MASIH BUTUH BANTUAN?
                  </div>
                </div>
                <div
                  style={{
                    width: "252px",
                    height: "27px",
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0px 0px",
                    boxSizing: "border-box",
                    gap: "8px",
                    fontSize: "10px",
                    color: "rgba(201, 168, 76, 0.7)",
                  }}
                >
                  {/* hubungi kami icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconMail />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      letterSpacing: "1.5px",
                      lineHeight: "15px",
                    }}
                  >
                    Hubungi Kami
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "0.7px solid rgba(201, 168, 76, 0.12)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gridColumn: "2 / span 3",
              gridRow: "1",
              fontSize: "16px",
              color: "rgba(201, 168, 76, 0.4)",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
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
                        alignSelf: "stretch",
                        backgroundColor: isActive
                          ? "rgba(201, 168, 76, 0.03)"
                          : "transparent",
                        borderBottom: "0.7px solid rgba(201, 168, 76, 0.12)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        color: isActive ? "#c9a84c" : "inherit",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          height: "70px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          padding: "20px 24px",
                          boxSizing: "border-box",
                          gap: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleAccordion(faq.id)}
                      >
                        <div
                          style={{
                            width: "718.7px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                          }}
                        >
                          <div
                            style={{
                              height: "18px",
                              width: "20px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              padding: "2px 0px 0px",
                              boxSizing: "border-box",
                              minWidth: "20px",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                lineHeight: "16px",
                              }}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              fontSize: "18px",
                              color: isActive
                                ? "#f5edd6"
                                : "rgba(245, 237, 214, 0.8)",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                lineHeight: "25.2px",
                              }}
                            >
                              {faq.question}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            padding: "2px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              height: "28px",
                              width: "28px",
                              backgroundColor: isActive
                                ? "#c9a84c"
                                : "transparent",
                              border: `0.7px solid ${isActive ? "#c9a84c" : "rgba(201, 168, 76, 0.25)"}`,
                              boxSizing: "border-box",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: isActive ? "#071d1b" : "#c9a84c",
                            }}
                          >
                            {isActive ? <IconMinus /> : <IconPlus />}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden", width: "100%" }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                padding: "0px 24px 20px 60px",
                                fontSize: "12px",
                                color: "rgba(201, 185, 154, 0.75)",
                              }}
                            >
                              <div
                                style={{
                                  width: "32px",
                                  height: "1px",
                                  position: "relative",
                                  backgroundColor: "rgba(201, 168, 76, 0.3)",
                                }}
                              />
                              <div
                                style={{
                                  width: "734.7px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  padding: "16px 0px 0px",
                                  boxSizing: "border-box",
                                }}
                              >
                                <div
                                  style={{
                                    width: "735px",
                                    position: "relative",
                                    lineHeight: "25.2px",
                                    display: "inline-block",
                                  }}
                                >
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default FAQPage;
