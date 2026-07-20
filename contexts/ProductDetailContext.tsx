"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductDetail from "@/components/Modals/ProductDetail";
import { productService } from "@/services/api";
import type { Product } from "@/types/api";

export interface ProductDetailProduct {
  id: number;
  slug: string;
  sku: string;
  image: string;
  topTitle: string;
  name: string;
  description: string | null;
  scentNotes: string[];
  bgColor: string;
  size: string;
  price: string;
  rawPrice: string;
  stock: number;
  badge?: string;
}

interface ProductDetailContextValue {
  openProduct: (product: ProductDetailProduct) => void;
  openBySlug: (slug: string) => Promise<boolean>;
  close: () => void;
  isOpen: boolean;
}

const formatPrice = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function mapApiProductToDetail(
  product: Product,
  fallback?: Partial<ProductDetailProduct>,
): ProductDetailProduct {
  return {
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    image: product.image ?? fallback?.image ?? "/gambar/seksi%204/button.jpg",
    topTitle: product.top_title ?? fallback?.topTitle ?? "",
    name: product.name,
    description: product.description,
    scentNotes: product.scent_notes ?? fallback?.scentNotes ?? [],
    bgColor: product.bg_color ?? fallback?.bgColor ?? "#134b46",
    size: product.size ?? fallback?.size ?? "",
    price: formatPrice.format(Number(product.price)),
    rawPrice: product.price,
    stock: product.stock,
    badge: product.badge ?? fallback?.badge ?? undefined,
  };
}

const ProductDetailContext = createContext<ProductDetailContextValue | undefined>(
  undefined,
);

export function ProductDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    if (window.location.hash.startsWith("#product-")) {
      window.history.replaceState(null, "", "/#collection");
    }
  }, []);

  const openProduct = useCallback((product: ProductDetailProduct) => {
    setSelectedProduct(product);
    setIsOpen(true);
    window.history.replaceState(null, "", `/#product-${product.slug}`);
  }, []);

  const openBySlug = useCallback(
    async (slug: string): Promise<boolean> => {
      const normalized = slug.trim();
      if (!normalized) return false;

      try {
        const { data } = await productService.show(normalized);
        openProduct(mapApiProductToDetail(data));
        return true;
      } catch {
        // Older APIs only resolved numeric IDs — match slug from the catalog.
        try {
          const response = await productService.list({ per_page: 100 });
          const match = response.data.find(
            (product) => product.slug === normalized,
          );
          if (!match) return false;
          openProduct(mapApiProductToDetail(match));
          return true;
        } catch {
          return false;
        }
      }
    },
    [openProduct],
  );

  // Deep links from footer / share URLs: `#product-<slug>`
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#product-(.+)$/);
      if (!match) return;
      const slug = decodeURIComponent(match[1]);
      void openBySlug(slug);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openBySlug]);

  const value = useMemo<ProductDetailContextValue>(
    () => ({
      openProduct,
      openBySlug,
      close,
      isOpen,
    }),
    [openProduct, openBySlug, close, isOpen],
  );

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative shadow-2xl rounded-sm"
            >
              <ProductDetail product={selectedProduct} onClose={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error(
      "useProductDetail harus digunakan di dalam ProductDetailProvider.",
    );
  }
  return context;
}
