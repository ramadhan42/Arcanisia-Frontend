"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";

type Category = string;

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
      "Kami menggunakan perpaduan bahan alami berkualitas tinggi dan bahan sintetis yang 100% aman sesuai standar IFRA. Hal ini memastikan konsistensi aroma, keamanan kulit, dan pelestarian alam yang berkelanjutan.",
  },
  {
    id: 4,
    category: "produk",
    question: "Apakah Arcanisia tersedia dalam ukuran travel size?",
    answer:
      "Ya, kami menyediakan ukuran travel size 15ml untuk beberapa koleksi unggulan kami, sehingga Anda dapat membawa aroma favorit ke mana pun Anda pergi.",
  },
  {
    id: 5,
    category: "pengiriman",
    question: "Berapa lama waktu pengiriman pesanan saya?",
    answer:
      "Estimasi waktu pengiriman standar adalah 2–5 hari kerja untuk Jabodetabek dan 3–7 hari kerja untuk luar Jabodetabek. Opsi ekspres juga tersedia untuk beberapa wilayah.",
  },
  {
    id: 6,
    category: "pengiriman",
    question: "Apakah pengiriman bisa dikirim ke seluruh Indonesia?",
    answer:
      "Ya, kami melayani pengiriman ke seluruh pelosok Indonesia menggunakan berbagai mitra logistik terpercaya.",
  },
  {
    id: 7,
    category: "retur",
    question:
      "Apakah saya bisa menukar atau mengembalikan produk yang sudah dibeli?",
    answer:
      "Produk dapat ditukar atau dikembalikan maksimal 7 hari setelah diterima, selama belum dibuka, segel masih utuh, dan disertai video unboxing.",
  },
  {
    id: 8,
    category: "keamanan",
    question: "Apakah produk Arcanisia aman untuk kulit sensitif?",
    answer:
      "Semua produk diformulasikan dengan hati-hati dan telah melalui pengujian. Jika memiliki riwayat alergi tertentu, kami menyarankan patch test terlebih dahulu.",
  },
] satisfies Array<{
  id: number;
  category: Category;
  question: string;
  answer: string;
}>;

const categories: Array<{ id: Category; label: string }> = [
  { id: "produk", label: "PRODUK" },
  { id: "pengiriman", label: "PENGIRIMAN" },
  { id: "retur", label: "RETUR & PENGEMBALIAN" },
  { id: "keamanan", label: "KEASLIAN & KEAMANAN" },
];

const goldText = {
  background:
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`relative block h-3 w-3 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      {!open && (
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      )}
    </span>
  );
}

export default function FAQPage() {
  const { section } = useSiteContent();
  const content = section<{
    eyebrow?: string;
    title?: string;
    description?: string;
    support_email?: string;
    categories?: Array<{ id: string; label: string }>;
    items?: Array<{ id: number | string; category: string; question: string; answer: string }>;
  }>("faq");
  const renderedFaqs = (content.items?.length ? content.items : faqData).map(
    (faq, index) => ({ ...faq, uid: `${faq.id ?? "faq"}-${index}` }),
  );
  const renderedCategories = content.categories?.length ? content.categories : categories;
  const [activeCategory, setActiveCategory] = useState<Category>(
    renderedCategories[0]?.id ?? "produk",
  );
  const [activeUid, setActiveUid] = useState<string | null>(
    renderedFaqs[0]?.uid ?? null,
  );

  const visibleFaqs = renderedFaqs.filter(
    (faq) => faq.category === activeCategory,
  );

  const changeCategory = (category: Category) => {
    setActiveCategory(category);
    setActiveUid(
      renderedFaqs.find((faq) => faq.category === category)?.uid ?? null,
    );
  };

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#071d1b,#012421_50%,#071d1b)] px-5 py-14 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-end lg:gap-12"
        >
          <div>
            <p className="font-graziemille text-[8px] tracking-[4px] text-[#C9A84C] md:text-[10px] md:tracking-[5px]">
              {content.eyebrow ?? "PUSAT BANTUAN"}
            </p>
            <h2
              className="mt-3 font-gilland text-[34px] leading-[1.25] md:text-[53px] md:leading-[1.3]"
              style={goldText}
            >
              {content.title ?? "Pertanyaan yang Sering Diajukan"}
            </h2>
          </div>

          <p className="max-w-[560px] font-graziemille text-[12px] leading-[1.8] text-[#C9B99A99] md:text-[14px] md:leading-[1.85]">
            {content.description}{" "}
            <a href={`mailto:${content.support_email ?? "hello@arcanisia.id"}`} className="text-[#C9A84C]">
              {content.support_email ?? "hello@arcanisia.id"}
            </a>
            .
          </p>
        </motion.header>

        <div className="mt-10 grid grid-cols-1 gap-7 lg:mt-16 lg:grid-cols-[252px_minmax(0,1fr)] lg:gap-8">
          <motion.aside
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {renderedCategories.map((category) => {
                const active = category.id === activeCategory;
                const count = renderedFaqs.filter(
                  (faq) => faq.category === category.id,
                ).length;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => changeCategory(category.id)}
                    className={`relative flex min-h-11 items-center justify-between border px-3 text-left font-graziemille text-[8px] tracking-[1px] transition-colors sm:text-[9px] lg:h-10 lg:min-h-0 lg:px-4 lg:text-[11px] lg:tracking-[2px] ${
                      active
                        ? "border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C]"
                        : "border-[#C9A84C]/10 text-[#C9B99A80] hover:bg-[#C9A84C]/5"
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-y-0 left-0 w-[3px] bg-[#C9A84C]" />
                    )}
                    <span>{category.label}</span>
                    <span
                      className={`ml-2 px-1.5 py-0.5 text-[7px] ${
                        active
                          ? "bg-[#C9A84C] text-[#091812]"
                          : "text-[#C9A84C]/40"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-[#C9A84C]/10 pt-5 lg:mt-8 lg:pt-8">
              <p className="font-graziemille text-[8px] tracking-[2px] text-[#C9B99A66] lg:text-[9px]">
                MASIH BUTUH BANTUAN?
              </p>
              <a
                href={`mailto:${content.support_email ?? "hello@arcanisia.id"}`}
                className="mt-3 inline-flex items-center gap-2 font-graziemille text-[10px] tracking-[1.5px] text-[#C9A84CB3]"
              >
                ✉ HUBUNGI KAMI
              </a>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="overflow-hidden border border-[#C9A84C]/15 bg-black/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {visibleFaqs.map((faq, index) => {
                  const open = faq.uid === activeUid;

                  return (
                    <article
                      key={faq.uid}
                      className={`border-b border-[#C9A84C]/15 last:border-b-0 ${
                        open ? "bg-[#C9A84C]/5" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveUid(open ? null : faq.uid)}
                        className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5 md:p-6"
                      >
                        <span className="flex min-w-0 gap-3 md:gap-4">
                          <span className="shrink-0 font-gilland text-[14px] leading-6 text-[#C9A84C66] md:text-[19px] md:leading-7">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-gilland text-[14px] leading-6 md:text-[21px] md:leading-7 ${
                              open ? "text-[#F5EDD6]" : "text-[#F5EDD6CC]"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </span>

                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                            open
                              ? "border-[#C9A84C] bg-[#C9A84C] text-[#071D1B]"
                              : "border-[#C9A84C]/30 text-[#C9A84C]"
                          }`}
                        >
                          <ToggleIcon open={open} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-5 pl-[54px] pr-5 md:pb-6 md:pl-16 md:pr-8">
                              <span className="mb-3 block h-px w-8 bg-[#C9A84C]/30 md:mb-4" />
                              <p className="font-graziemille text-[11px] leading-[1.8] text-[#C9B99ABF] md:text-[14px] md:leading-[1.85]">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
