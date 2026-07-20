import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutModal from "./Checkout";
import ConfirmationModal from "./Confirmation";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthDialog } from "@/contexts/AuthDialogContext";
import { useCart } from "@/contexts/CartContext";
import type { Order, Product } from "@/types/api";
import ProductImage from "@/components/ui/ProductImage";

// Kumpulan Icon SVG bawaan
const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
);

const OrnamentIcon = () => (
  <svg
    width="80"
    height="10"
    viewBox="0 0 100 10"
    fill="currentColor"
    className="text-[#c9b99a]"
  >
    <path d="M45 5 L50 0 L55 5 L50 10 Z" />
    <line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" strokeWidth="1" />
    <line
      x1="60"
      y1="5"
      x2="100"
      y2="5"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

interface ProductDetailProduct {
  id: number;
  slug: string;
  sku: string;
  image: string;
  name: string;
  bgColor: string;
  badge?: string;
  topTitle: string;
  description: string | null;
  scentNotes: string[];
  size: string;
  price: string;
  rawPrice: string;
  stock: number;
}

interface ProductDetailProps {
  product: ProductDetailProduct;
  onClose: () => void;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ product, onClose }) => {
  // --- STATE MANAJEMEN MODAL ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const pendingAction = useRef<"add" | "buy" | null>(null);
  const { isAuthenticated } = useAuth();
  const { openLogin } = useAuthDialog();
  const { addItem, openCart } = useCart();

  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  // --- HANDLER KONFIRMASI CHECKOUT ---
  const apiProduct: Product = {
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    image: product.image,
    top_title: product.topTitle,
    name: product.name,
    description: product.description,
    scent_notes: product.scentNotes,
    bg_color: product.bgColor,
    size: product.size,
    price: product.rawPrice,
    stock: product.stock,
    is_active: true,
    badge: product.badge ?? null,
  };

  const handleConfirmCheckout = (createdOrder: Order) => {
    setOrder(createdOrder);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const performAddToCart = useCallback(() => {
    setIsAdding(true);
    setMessage("");
    void addItem(product.id, quantity)
      .then(() => {
        setMessage("Produk ditambahkan ke keranjang.");
        openCart();
      })
      .catch((error) =>
        setMessage(
          error instanceof Error
            ? error.message
            : "Produk gagal ditambahkan.",
        ),
      )
      .finally(() => setIsAdding(false));
  }, [addItem, openCart, product.id, quantity]);

  useEffect(() => {
    if (!isAuthenticated || !pendingAction.current) return;
    const action = pendingAction.current;
    pendingAction.current = null;
    if (action === "add") performAddToCart();
    else setIsCheckoutOpen(true);
  }, [isAuthenticated, performAddToCart]);

  const handleAddToCart = () => {
    if (isAuthenticated) performAddToCart();
    else {
      pendingAction.current = "add";
      openLogin();
    }
  };

  const handleBuyNow = () => {
    if (isAuthenticated) setIsCheckoutOpen(true);
    else {
      pendingAction.current = "buy";
      openLogin();
    }
  };

  // --- HANDLER KEMBALI KE BERANDA ---
  const handleGoToBeranda = () => {
    setIsConfirmationOpen(false); // Tutup modal confirmation

    // Memanggil onClose bawaan ProductDetail untuk menutup semua modal
    onClose();

    // Catatan: Jika halaman beranda kamu ada di URL terpisah (bukan sekadar menutup modal),
    // kamu bisa menggunakan Next.js router atau baris di bawah ini:
    // window.location.href = "/";
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row w-full max-w-[920px] h-auto md:h-[550px] text-[#c9b99a] font-graziemille overflow-hidden"
        style={{ backgroundColor: product.bgColor }}
      >
        {/* BAGIAN KIRI: Gambar Produk */}
        <div
          className="relative w-full md:w-[460px] h-[300px] md:h-full shrink-0"
          style={{ backgroundColor: product.bgColor }}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 920px"
            priority
          />
          <div
            className="absolute top-6 left-6 px-4 py-1.5 text-[#091812] font-montserrat font-bold text-[10px] tracking-[2px]"
            style={{ background: goldGradient }}
          >
            {product.badge ?? "ARCANISIA"}
          </div>
        </div>

        {/* BAGIAN KANAN: Detail & Checkout */}
        <div
          className="relative w-full md:w-[460px] flex flex-col p-8 md:p-[40px] shrink-0"
          style={{ backgroundColor: product.bgColor }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-[#c9b99a]/30 text-[#c9b99a] hover:bg-white/10 transition-colors"
          >
            <CloseIcon />
          </button>

          <p className="text-[10px] tracking-[3px] text-[#c9b99a]/70 uppercase mb-2">
            {product.topTitle}
          </p>

          <h2
            className="text-[38px] font-gilland bg-clip-text text-transparent mb-3 leading-none"
            style={{ backgroundImage: goldGradient }}
          >
            {product.name}
          </h2>

          <div className="mb-5 flex items-center text-[#c9b99a]/50">
            <OrnamentIcon />
          </div>

          <p className="text-[13px] leading-relaxed text-[#c9b99a]/80 mb-7 pr-4">
            {product.description ??
              "An olfactory journey inspired by the soul of the Indonesian archipelago."}
          </p>

          <div className="mb-7">
            <p className="text-[10px] tracking-[2.5px] mb-3 text-[#c9b99a]/90">
              SCENT NOTES
            </p>
            <div className="flex flex-wrap gap-2 text-[12px] italic text-[#c9b99a]/80">
              {(product.scentNotes.length > 0
                ? product.scentNotes
                : ["Signature Arcanisia"]
              ).map((note: string) => (
                  <span
                    key={note}
                    className="border border-[#c9a84c]/30 px-3 py-1.5"
                  >
                    {note}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex gap-10 mb-8">
            <div>
              <p className="text-[10px] tracking-[2.5px] mb-3 text-[#c9b99a]/90">
                SIZE
              </p>
              <div
                className="text-[#091812] font-montserrat font-semibold text-[13px] px-6 py-2"
                style={{
                  background: goldGradient,
                  border: "0.5px solid #f8c56c",
                }}
              >
                {product.size}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[2.5px] mb-3 text-[#c9b99a]/90">
                QUANTITY
              </p>
              <div className="flex items-center border border-[#c9a84c]/40 text-[#f5edd6]">
                <button type="button" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 text-lg transition-colors disabled:opacity-30">
                  -
                </button>
                <span className="w-10 text-center text-[14px]">{quantity}</span>
                <button type="button" disabled={quantity >= product.stock} onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 text-lg transition-colors disabled:opacity-30">
                  +
                </button>
              </div>
            </div>
          </div>

          <p className="text-[28px] font-gilland text-[#f8c56c] mb-6 mt-auto">
            {product.price}
          </p>

          <div className="flex gap-3 mb-6 font-montserrat text-[9px] tracking-[2px] font-bold">
            <button
              disabled={product.stock < 1}
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[#091812] hover:opacity-90 transition-opacity"
              style={{ background: goldGradient }}
            >
              BELI SEKARANG <ArrowRightIcon />
            </button>
            <button disabled={isAdding || product.stock < 1} onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#c9a84c]/60 text-[#f8c56c] hover:bg-[#c9a84c]/10 transition-colors disabled:opacity-50">
              <CartIcon /> {isAdding ? "MENAMBAHKAN..." : "TAMBAH KE KERANJANG"}
            </button>
          </div>
          {message && <p role="status" className="mb-3 text-[11px] text-[#f8c56c]">{message}</p>}
          <p className="mb-4 text-[10px] text-[#c9b99a]/50">Stok tersedia: {product.stock}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#c9a84c]/20 pt-5 text-[10px] text-[#c9b99a]/60 font-light">
            <span className="flex items-center gap-1.5">
              <DiamondIcon /> Gratis Ongkos Kirim
            </span>
            <span className="flex items-center gap-1.5">
              <DiamondIcon /> Kemasan Premium
            </span>
            <span className="flex items-center gap-1.5">
              <DiamondIcon /> 100% Parfum Asli
            </span>
          </div>
        </div>
      </div>

      {/* OVERLAY UNTUK CHECKOUT & CONFIRMATION */}
      <AnimatePresence>
        {/* CHECKOUT MODAL */}
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            // Tambahkan onClose() pada overlay untuk menutup modal saat diklik di luarnya
            onClick={() => setIsCheckoutOpen(false)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer" // cursor-pointer menandakan bisa diklik
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              // stopPropagation() mencegah klik di dalam form checkout ikut menutup modal
              onClick={(e) => e.stopPropagation()}
              className="relative shadow-2xl rounded-md cursor-default" // cursor-default kembalikan kursor normal
            >
              <CheckoutModal
                items={[{ product: apiProduct, quantity }]}
                mode="buy-now"
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={handleConfirmCheckout}
              />
            </motion.div>
          </motion.div>
        )}

        {/* CONFIRMATION MODAL */}
        {isConfirmationOpen && order && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            // 1. Ubah onClick di sini agar klik di luar (overlay) kembali ke beranda
            onClick={handleGoToBeranda}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full flex items-center justify-center p-4 cursor-default"
            >
              <ConfirmationModal
                order={order}
                onClose={handleGoToBeranda}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;
