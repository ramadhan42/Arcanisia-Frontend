"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/contexts/LocaleContext";
import enMessages from "@/messages/en.json";
import idMessages from "@/messages/id.json";
import type { Locale } from "@/lib/locale";

type Category = string;

type FaqItem = {
  id: number | string;
  category: string;
  question: string;
  answer: string;
};

type FaqCategory = { id: Category; label: string };

const faqCatalogs: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    categories: FaqCategory[];
    items: FaqItem[];
  }
> = {
  id: idMessages.faq,
  en: enMessages.faq,
};

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
  const { locale, t } = useTranslation();
  const catalog = faqCatalogs[locale];

  const renderedCategories = catalog.categories;
  const renderedFaqs = useMemo(
    () =>
      catalog.items.map((faq, index) => ({
        ...faq,
        uid: `${locale}-${faq.id ?? "faq"}-${index}`,
      })),
    [catalog.items, locale],
  );

  const [activeCategory, setActiveCategory] = useState<Category>(
    renderedCategories[0]?.id ?? "produk",
  );
  const [activeUid, setActiveUid] = useState<string | null>(
    renderedFaqs[0]?.uid ?? null,
  );

  useEffect(() => {
    const nextCategory = renderedCategories[0]?.id ?? "produk";
    setActiveCategory(nextCategory);
    setActiveUid(
      renderedFaqs.find((faq) => faq.category === nextCategory)?.uid ?? null,
    );
  }, [locale, renderedCategories, renderedFaqs]);

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
            <p
              className="font-graziemille text-[8px] tracking-[4px] text-[#C9A84C] md:text-[10px] md:tracking-[5px]"
              data-locale-text="true"
            >
              {t("faq.eyebrow")}
            </p>
            <h2
              className="mt-3 font-gilland text-[34px] leading-[1.25] md:text-[53px] md:leading-[1.3]"
              style={goldText}
              data-locale-text="true"
            >
              {t("faq.title")}
            </h2>
          </div>

          <p
            className="max-w-[560px] font-graziemille text-[12px] leading-[1.8] text-[#C9B99A99] md:text-[14px] md:leading-[1.85]"
            data-locale-text="true"
          >
            {t("faq.description")}{" "}
            <a
              href="mailto:hello@arcanisia.id"
              className="text-[#C9A84C]"
              data-locale-fade="ignore"
            >
              hello@arcanisia.id
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
                    key={`${locale}-${category.id}`}
                    type="button"
                    onClick={() => changeCategory(category.id)}
                    className={`flex items-center justify-between rounded-sm border px-3 py-3 text-left transition-colors lg:px-4 ${
                      active
                        ? "border-[#C9A84C]/55 bg-[#C9A84C]/10 text-[#F8C56C]"
                        : "border-[#C9A84C]/15 text-[#C9B99A99] hover:border-[#C9A84C]/35 hover:text-[#F5EDD6]"
                    }`}
                  >
                    <span
                      className="font-graziemille text-[10px] tracking-[1.5px] md:text-[11px]"
                      data-locale-text="true"
                    >
                      {category.label}
                    </span>
                    <span
                      className="font-graziemille text-[10px] tracking-[1px]"
                      data-locale-fade="ignore"
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.aside>

          <div className="overflow-hidden border border-[#C9A84C]/15 bg-black/20">
            {visibleFaqs.map((faq, index) => {
              const open = activeUid === faq.uid;

              return (
                <div
                  key={faq.uid}
                  className={
                    index < visibleFaqs.length - 1
                      ? "border-b border-[#C9A84C]/15"
                      : ""
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveUid(open ? null : faq.uid)}
                    className="flex w-full items-start gap-4 px-4 py-4 text-left md:gap-5 md:px-6 md:py-5"
                  >
                    <span
                      className="mt-0.5 font-graziemille text-[16px] tracking-[2px] text-[#C9A84C] md:text-[19px]"
                      data-locale-fade="ignore"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex-1 font-gilland text-[16px] leading-[1.35] text-[#F5EDD6] md:text-[19px]"
                      data-locale-text="true"
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`mt-1 text-[#C9A84C] ${open ? "opacity-100" : "opacity-70"}`}
                      data-locale-fade="ignore"
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
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          className="px-4 pb-5 pl-[3.25rem] font-graziemille text-[13px] leading-[1.8] text-[#C9B99A99] md:px-6 md:pb-6 md:pl-[4.25rem] md:text-[14px]"
                          data-locale-text="true"
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
