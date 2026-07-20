"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/locale";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const selectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <button
        type="button"
        aria-label={t("nav.language")}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[42px] min-w-[72px] items-center justify-center gap-2 rounded-md border border-[#F8C56C]/70 px-3 transition-all duration-300 hover:bg-[#F8C56C]/10"
      >
        <span
          data-locale-text="true"
          className="font-graziemille text-[12px] tracking-[1.5px] text-[#F8C56C] xl:text-[13px]"
        >
          {LOCALE_LABELS[locale]}
        </span>
        <ChevronDown
          size={14}
          color="#F8C56C"
          strokeWidth={2.2}
          data-locale-fade="ignore"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[88px] overflow-hidden rounded-sm border border-[#7c7135]/45 bg-[#002d28] shadow-2xl"
          >
            {LOCALES.map((option) => {
              const active = option === locale;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectLocale(option)}
                  className={`flex h-11 w-full items-center justify-center font-graziemille text-[12px] tracking-[2px] transition-colors ${
                    active
                      ? "bg-[#F8C56C]/15 text-[#F8C56C]"
                      : "text-[#c9c7b7] hover:bg-[#F8C56C]/8 hover:text-[#F8C56C]"
                  }`}
                >
                  <span data-locale-text="true">{LOCALE_LABELS[option]}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
