"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { productService } from "@/services/api";
import { useSiteContent } from "@/contexts/SiteContentContext";
import {
  mapApiProductToDetail,
  useProductDetail,
  type ProductDetailProduct,
} from "@/contexts/ProductDetailContext";
import { useTranslation } from "@/contexts/LocaleContext";
import ProductImage from "@/components/ui/ProductImage";
import SafeImage from "@/components/ui/SafeImage";
import CollectionsModal from "@/components/Modals/CollectionsModal";
import {
  normalizeLocationHash,
  queueHomeSectionScroll,
  scrollToSection,
} from "@/lib/sectionHash";

export type CollectionProduct = ProductDetailProduct;

const HOME_PREVIEW_COUNT = 6;

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

type CollectionsProps = {
  /** `preview` = beranda (sebagian produk + CTA). `page` = halaman koleksi lengkap. */
  variant?: "preview" | "page";
};

const Collections = ({ variant = "preview" }: CollectionsProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { section } = useSiteContent();
  const { openProduct } = useProductDetail();
  const isPage = variant === "page";
  const content = section<{
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: string;
    cta_label?: string;
    cta_href?: string;
  }>("collection");
  const [products, setProducts] = useState<CollectionProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  useEffect(() => {
    normalizeLocationHash();
  }, []);

  useEffect(() => {
    let isActive = true;

    productService
      .list({ per_page: 100 })
      .then((response) => {
        if (!isActive) return;

        const collectionProducts = response.data
          .sort((first, second) => first.id - second.id)
          .map((product) => mapApiProductToDetail(product));

        setProducts(collectionProducts);
      })
      .catch((error) => {
        if (!isActive) return;

        setErrorMessage(
          error instanceof Error ? error.message : t("collection.failed"),
        );
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [t]);

  const visibleProducts = useMemo(
    () => (isPage ? products : products.slice(0, HOME_PREVIEW_COUNT)),
    [isPage, products],
  );

  const handleDiscoverClick = async (product: CollectionProduct) => {
    openProduct(product);
    try {
      const { data } = await productService.show(product.slug);
      openProduct(mapApiProductToDetail(data, product));
    } catch {
      // The collection response remains a controlled detail fallback.
    }
  };

  const handleBackToCollection = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    if (pathname === "/") {
      scrollToSection("collection", { setHash: false });
      return;
    }

    queueHomeSectionScroll("collection", { setHash: false });
    window.location.assign("/");
  };

  // Deep-link scroll for `#product-<slug>` (footer / shared URLs).
  // Uses hashchange only — replaceState from Islands CTA must not scroll away.
  useEffect(() => {
    if (isPage) return;

    const scrollFromHash = () => {
      normalizeLocationHash();
      if (!window.location.hash.startsWith("#product-")) return;
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, [isPage]);

  return (
    <section
      className={`relative flex w-full flex-col items-center overflow-hidden px-4 sm:px-6 lg:px-8 ${
        isPage
          ? "page-view pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36"
          : "py-16 md:py-20 lg:py-24"
      }`}
      style={{
        background: "linear-gradient(180deg, #00221f, #022421 50%, #00221f)",
      }}
    >
      {isPage && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 w-full max-w-[1160px] px-2 sm:mb-12 sm:px-0"
        >
          <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
            <a
              href="/#collection"
              onClick={handleBackToCollection}
              className="group inline-flex h-11 items-center gap-2.5 rounded-md px-1 font-graziemille text-[11px] tracking-[2.2px] text-[#F8C56C] transition-colors hover:text-[#fdde8a]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              <span data-locale-text="true">{t("common.back")}</span>
            </a>
          </motion.div>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mb-3 font-medium uppercase text-[#F5EDD6CC] text-[9px] tracking-[3px] sm:text-[10px]"
        style={{ fontFamily: "'Grazie mille', serif" }}
      >
        {content.eyebrow ?? t("collection.eyebrow")}
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
        {content.title ?? t("collection.title")}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative mb-5 h-[13px] w-[165px] sm:h-[15px] sm:w-[190px] md:mb-6 md:w-[213px]"
      >
        <SafeImage
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
        {content.description ?? t("collection.description")}
      </motion.p>

      <div className="mx-auto mb-12 grid w-full max-w-[1160px] grid-cols-1 gap-5 px-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 lg:gap-7">
        {isLoading && (
          <p className="col-span-full py-12 text-center font-graziemille text-[#C9B99A]">
            {t("collection.loading")}
          </p>
        )}

        {!isLoading && errorMessage && (
          <p
            role="alert"
            className="col-span-full py-12 text-center font-graziemille text-[#ff7b86]"
          >
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && visibleProducts.length === 0 && (
          <p className="col-span-full py-12 text-center font-graziemille text-[#C9B99A]">
            {t("collection.empty")}
          </p>
        )}

        {visibleProducts.map((product, index) => (
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
                {translateBadge(product.badge, t)}
              </div>
            )}

            <div className="relative aspect-[1.1/1] w-full overflow-hidden">
              <ProductImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1279px) 50vw, 800px"
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
                  onClick={() => void handleDiscoverClick(product)}
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

      {!isPage && (
        <>
          <motion.div
            initial={{ opacity: 0.12, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.42, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setIsCompleteOpen(true)}
              className="group relative inline-flex items-center justify-center gap-2 rounded-[7px] px-4 py-3"
              style={{
                background:
                  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461) padding-box, linear-gradient(86.7deg, #ffeeab, rgba(255, 238, 171, 0) 25%, rgba(255, 238, 171, 0) 75%, #ffeeab) border-box",
                border: "0.6px solid transparent",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.22)",
              }}
            >
              <span
                data-locale-text="true"
                className="relative font-gilland text-[12px] font-bold leading-none tracking-[1.92px] text-[#124b46]"
              >
                {content.cta_label ?? content.cta ?? t("collection.cta")}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="relative text-[#124b46] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          <CollectionsModal
            open={isCompleteOpen}
            onClose={() => setIsCompleteOpen(false)}
            products={products}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onDiscover={(product) => void handleDiscoverClick(product)}
          />
        </>
      )}
    </section>
  );
};

export default Collections;
