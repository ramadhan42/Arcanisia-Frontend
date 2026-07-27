"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/contexts/LocaleContext";
import type { ProductDetailProduct } from "@/contexts/ProductDetailContext";
import ProductImage from "@/components/ui/ProductImage";
import SafeImage from "@/components/ui/SafeImage";

const goldGradient =
  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

const easeOut = [0.22, 1, 0.36, 1] as const;

function translateBadge(
  badge: string | undefined,
  t: (key: string) => string,
): string | undefined {
  if (!badge) return undefined;
  const normalized = badge.toUpperCase();
  if (normalized.includes("BEST")) return t("collection.badgeBestSeller");
  if (normalized.includes("COMING") || normalized.includes("SEGERA")) {
    return t("collection.badgeComingSoon");
  }
  if (normalized.includes("TERLARIS")) return t("collection.badgeBestSeller");
  return badge;
}

type CollectionsModalProps = {
  open: boolean;
  onClose: () => void;
  products: ProductDetailProduct[];
  isLoading: boolean;
  errorMessage: string;
  onDiscover: (product: ProductDetailProduct) => void;
};

export default function CollectionsModal({
  open,
  onClose,
  products,
  isLoading,
  errorMessage,
  onDiscover,
}: CollectionsModalProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="collections-modal-root"
          role="presentation"
          className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-5 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <motion.button
            type="button"
            aria-label={t("common.close")}
            className="absolute inset-0 bg-[#001512]/72 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="collections-modal-title"
            className="relative z-10 flex h-[88vh] w-[94vw] max-w-[1400px] flex-col overflow-hidden rounded-sm border border-[#F5EDD6]/14 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:h-[80vh] md:w-[80vw]"
            style={{
              background:
                "linear-gradient(180deg, #022a26 0%, #00221f 42%, #011c19 100%)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.42, ease: easeOut }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #fdde8a88, transparent)",
              }}
            />

            <header className="relative flex shrink-0 items-start justify-between gap-4 border-b border-[#F5EDD6]/10 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <p
                  className="mb-1.5 font-medium uppercase text-[#F5EDD6CC] text-[9px] tracking-[3px] sm:text-[10px]"
                  style={{ fontFamily: "'Grazie mille', serif" }}
                >
                  {t("collection.eyebrow")}
                </p>
                <h2
                  id="collections-modal-title"
                  className="bg-clip-text text-[22px] font-normal leading-tight text-transparent sm:text-[28px] md:text-[32px]"
                  style={{
                    backgroundImage: goldGradient,
                    fontFamily: "'Gilland', sans-serif",
                  }}
                >
                  {t("collection.title")}
                </h2>
                <div className="relative mt-2.5 h-[10px] w-[120px] sm:h-[12px] sm:w-[150px]">
                  <SafeImage
                    src="/gambar/seksi%204/ornamen.svg"
                    alt=""
                    fill
                    className="object-contain object-left"
                    sizes="150px"
                  />
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                aria-label={t("common.close")}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#F5EDD6]/18 text-[#F5EDD6CC] transition-colors hover:border-[#fdde8a]/45 hover:text-[#fdde8a]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </motion.button>
            </header>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6 md:px-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#F5EDD6]/25 [&::-webkit-scrollbar-track]:bg-transparent"
            >
              <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {isLoading && (
                  <p className="col-span-full py-16 text-center font-graziemille text-[#C9B99A]">
                    {t("collection.loading")}
                  </p>
                )}

                {!isLoading && errorMessage && (
                  <p
                    role="alert"
                    className="col-span-full py-16 text-center font-graziemille text-[#ff7b86]"
                  >
                    {errorMessage}
                  </p>
                )}

                {!isLoading && !errorMessage && products.length === 0 && (
                  <p className="col-span-full py-16 text-center font-graziemille text-[#C9B99A]">
                    {t("collection.empty")}
                  </p>
                )}

                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.05, 0.35),
                      ease: easeOut,
                    }}
                    className="relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-sm border border-[#F5EDD6]/10"
                    style={{ backgroundColor: product.bgColor }}
                  >
                    {product.badge && (
                      <div
                        className="absolute left-3 top-3 z-10 px-2 py-1 text-[8px] font-bold tracking-wider text-[#091812] shadow-md sm:left-4 sm:top-4 sm:text-[9px]"
                        style={{ background: goldGradient }}
                      >
                        {translateBadge(product.badge, t)}
                      </div>
                    )}

                    <div className="relative aspect-[1.1/1] w-full overflow-hidden">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 26vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4 text-left sm:p-5 sm:pb-6">
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
                          className="mb-2 bg-clip-text text-[18px] font-normal leading-tight text-transparent sm:text-[20px]"
                          style={{
                            backgroundImage: goldGradient,
                            fontFamily: "'Gilland', sans-serif",
                          }}
                        >
                          {product.name}
                        </h3>
                        <p className="mb-4 text-[10px] tracking-wide text-[#F5EDD6] sm:mb-5 sm:text-[11px]">
                          {product.size}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-row items-center justify-between gap-3">
                        <p
                          className="whitespace-nowrap text-[15px] font-normal text-[#F8C56C] sm:text-[17px]"
                          style={{ fontFamily: "'Gilland', sans-serif" }}
                        >
                          {product.price}
                        </p>

                        <button
                          type="button"
                          onClick={() => onDiscover(product)}
                          className="flex shrink-0 flex-row items-center gap-1 transition-opacity hover:opacity-80"
                          style={{
                            color: "#F5EDD6CC",
                            fontFamily: "'Grazie mille', serif",
                            fontSize: "11px",
                            fontWeight: "500",
                          }}
                        >
                          {t("collection.discover")}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
