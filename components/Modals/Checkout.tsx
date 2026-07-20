"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { ApiError, fieldError } from "@/lib/api";
import { orderService } from "@/services/api";
import type {
  BuyNowPayload,
  CheckoutPayload,
  Order,
  PaymentMethod,
  Product,
  ValidationErrors,
} from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import ProductImage from "@/components/ui/ProductImage";

interface CheckoutModalProps {
  items: Array<{ product: Product; quantity: number }>;
  mode: "cart" | "buy-now";
  subtotal?: string;
  onClose: () => void;
  onConfirm: (order: Order) => void;
}

const paymentOptions: Array<{
  method: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    method: "bank_transfer",
    label: "Bank Transfer",
    description: "BCA · BNI · Mandiri · BRI",
  },
  {
    method: "qris",
    label: "QRIS",
    description: "GoPay · OVO · Dana · LinkAja",
  },
  {
    method: "card",
    label: "Kartu Kredit / Debit",
    description: "Visa · Mastercard",
  },
];

const hideScrollbar =
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

export default function CheckoutModal({
  items,
  mode,
  subtotal,
  onClose,
  onConfirm,
}: CheckoutModalProps) {
  const { token, user } = useAuth();
  const { section } = useSiteContent();
  const settings = section<{
    shipping_label?: string;
    shipping_note?: string;
    payment_methods?: PaymentMethod[];
  }>("checkout");
  const [form, setForm] = useState<CheckoutPayload>({
    customer_name: user?.name ?? "",
    customer_email: user?.email ?? "",
    customer_phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    payment_method: "bank_transfer",
  });
  const [errors, setErrors] = useState<ValidationErrors>();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idempotencyKey = useRef(crypto.randomUUID());
  const total = useMemo(
    () =>
      subtotal !== undefined
        ? Number(subtotal)
        : items.reduce(
            (sum, item) => sum + Number(item.product.price) * item.quantity,
            0,
          ),
    [items, subtotal],
  );
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";
  const primaryProduct = items[0]?.product;
  const bgColor = primaryProduct?.bg_color || "#012421";
  const availablePayments = settings.payment_methods?.length
    ? paymentOptions.filter((option) =>
        settings.payment_methods?.includes(option.method),
      )
    : paymentOptions;
  const inputClass =
    "bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors";

  const setField = (field: keyof CheckoutPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current?.[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const submit = async () => {
    if (!token || items.length === 0) return;
    setIsSubmitting(true);
    setMessage("");
    setErrors(undefined);
    try {
      const response =
        mode === "buy-now"
          ? await orderService.buyNow(
              token,
              {
                ...form,
                product_id: items[0].product.id,
                quantity: items[0].quantity,
              } satisfies BuyNowPayload,
              idempotencyKey.current,
            )
          : await orderService.checkout(token, form, idempotencyKey.current);
      onConfirm(response.data);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.errors);
        setMessage(error.message);
      } else {
        setMessage("Pesanan gagal dibuat. Silakan coba kembali.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex h-auto w-full max-w-[920px] flex-col overflow-hidden rounded-md font-graziemille text-[#c9b99a] shadow-2xl md:h-[650px]"
      style={{ backgroundColor: bgColor }}
    >
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between border-b border-[#c9a84c]/15 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 transition-colors hover:text-[#f8c56c]"
        >
          <ArrowLeft size={16} />
          <span className="text-[12px] tracking-[2px]">KEMBALI</span>
        </button>
        <div className="text-[14px] tracking-[4px]">CHECKOUT</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup checkout"
          className="flex h-7 w-7 items-center justify-center border border-[#c9b99a]/50 transition-colors hover:bg-white/10"
        >
          <X size={14} />
        </button>
      </div>

      {/* --- KONTEN UTAMA (GRID 2 KOLOM) --- */}
      <div
        className={`flex h-full flex-col overflow-y-auto md:flex-row ${hideScrollbar}`}
      >
        {/* KOLOM KIRI: Ringkasan Pesanan */}
        <div className="flex w-full flex-col border-r border-[#c9a84c]/10 p-8 md:w-[380px]">
          <h3 className="mb-6 text-[12px] tracking-[3px]">RINGKASAN PESANAN</h3>

          <div className={`mb-8 max-h-[210px] space-y-5 overflow-y-auto ${hideScrollbar}`}>
            {items.map(({ product, quantity }, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="relative flex gap-4"
              >
                <div className="relative h-[75px] w-[120px] shrink-0 overflow-hidden rounded-sm">
                  {product.image && (
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  )}
                  <div
                    className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center text-[10px] font-bold text-[#091812]"
                    style={{ background: goldGradient }}
                  >
                    {quantity}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  {product.top_title && (
                    <p className="truncate text-[10px] uppercase tracking-[2px] text-[#c9b99a]/50">
                      {product.top_title}
                    </p>
                  )}
                  <h4
                    className="font-gilland text-[18px] bg-clip-text text-transparent"
                    style={{ backgroundImage: goldGradient }}
                  >
                    {product.name}
                  </h4>
                  <p className="mt-1 text-[12px] text-[#c9b99a]/60">
                    {product.size || "15 ml Parfum"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6 flex flex-col gap-4 border-t border-[#c9a84c]/10 pt-6 text-[14px] text-[#c9b99a]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency.format(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Kirim</span>
              <span className="text-[#f8c56c]">
                {settings.shipping_label ?? "GRATIS"}
              </span>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between border-t border-[#c9a84c]/20 pt-6 text-[#f5edd6]">
            <span className="text-[14px] tracking-[2px]">TOTAL</span>
            <span className="font-gilland text-[24px] text-[#f8c56c]">
              {currency.format(total)}
            </span>
          </div>

          <p className="mt-auto text-[11px] leading-relaxed text-[#c9b99a]/40">
            {settings.shipping_note ??
              "Pengiriman menggunakan kemasan premium Arcanisia. Estimasi tiba 2–4 hari kerja."}
          </p>
        </div>

        {/* KOLOM KANAN: Form Checkout */}
        <form
          className={`flex-1 overflow-y-auto bg-black/10 p-8 ${hideScrollbar}`}
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <h3 className="mb-5 text-[12px] tracking-[3px]">INFORMASI KONTAK</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                NAMA LENGKAP
              </label>
              <input
                type="text"
                required
                value={form.customer_name}
                onChange={(event) =>
                  setField("customer_name", event.target.value)
                }
                placeholder="Masukkan nama lengkap"
                className={inputClass}
              />
              {fieldError(errors, "customer_name") && (
                <span className="text-[11px] text-[#ff7b86]">
                  {fieldError(errors, "customer_name")}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={form.customer_email}
                onChange={(event) =>
                  setField("customer_email", event.target.value)
                }
                placeholder="nama@email.com"
                className={inputClass}
              />
              {fieldError(errors, "customer_email") && (
                <span className="text-[11px] text-[#ff7b86]">
                  {fieldError(errors, "customer_email")}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                NOMOR TELEPON
              </label>
              <input
                type="tel"
                required
                value={form.customer_phone}
                onChange={(event) =>
                  setField("customer_phone", event.target.value)
                }
                placeholder="+62 812 xxxx xxxx"
                className={inputClass}
              />
              {fieldError(errors, "customer_phone") && (
                <span className="text-[11px] text-[#ff7b86]">
                  {fieldError(errors, "customer_phone")}
                </span>
              )}
            </div>
          </motion.div>

          <h3 className="mb-5 text-[12px] tracking-[3px]">ALAMAT PENGIRIMAN</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                ALAMAT LENGKAP
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(event) => setField("address", event.target.value)}
                placeholder="Jl. Sudirman No. xx, RT/RW"
                className={inputClass}
              />
              {fieldError(errors, "address") && (
                <span className="text-[11px] text-[#ff7b86]">
                  {fieldError(errors, "address")}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                  KOTA / KABUPATEN
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(event) => setField("city", event.target.value)}
                  placeholder="Jakarta"
                  className={inputClass}
                />
                {fieldError(errors, "city") && (
                  <span className="text-[11px] text-[#ff7b86]">
                    {fieldError(errors, "city")}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                  KODE POS
                </label>
                <input
                  type="text"
                  required
                  value={form.postal_code}
                  onChange={(event) =>
                    setField("postal_code", event.target.value)
                  }
                  placeholder="12190"
                  className={inputClass}
                />
                {fieldError(errors, "postal_code") && (
                  <span className="text-[11px] text-[#ff7b86]">
                    {fieldError(errors, "postal_code")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                PROVINSI
              </label>
              <input
                type="text"
                required
                value={form.province}
                onChange={(event) => setField("province", event.target.value)}
                placeholder="DKI Jakarta"
                className={inputClass}
              />
              {fieldError(errors, "province") && (
                <span className="text-[11px] text-[#ff7b86]">
                  {fieldError(errors, "province")}
                </span>
              )}
            </div>
          </motion.div>

          <h3 className="mb-5 text-[12px] tracking-[3px]">METODE PEMBAYARAN</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 flex flex-col gap-3 text-[#f5edd6]"
          >
            {availablePayments.map((option) => {
              const selected = form.payment_method === option.method;
              return (
                <button
                  key={option.method}
                  type="button"
                  onClick={() => setField("payment_method", option.method)}
                  className={`flex cursor-pointer items-start gap-4 border p-4 text-left transition-all ${
                    selected
                      ? "border-[#c9a84c]/60 bg-[#c9a84c]/10"
                      : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"
                  }`}
                >
                  <span
                    className={`mt-1 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-[#f8c56c]" : "border-[#c9a84c]/30"
                    }`}
                  >
                    {selected && (
                      <span className="h-[7px] w-[7px] rounded-full bg-[#f8c56c]" />
                    )}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[14px]">{option.label}</span>
                    <span className="text-[11px] text-[#c9b99a]/50">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
            {fieldError(errors, "payment_method") && (
              <span className="text-[11px] text-[#ff7b86]">
                {fieldError(errors, "payment_method")}
              </span>
            )}
          </motion.div>

          {message && (
            <p role="alert" className="mb-4 text-[12px] text-[#ff7b86]">
              {message}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={isSubmitting ? undefined : { scale: 1.02 }}
            whileTap={isSubmitting ? undefined : { scale: 0.98 }}
            className="mb-4 flex w-full items-center justify-center py-4 text-[10px] font-bold tracking-[3px] text-[#091812] disabled:opacity-60"
            style={{ background: goldGradient }}
          >
            {isSubmitting ? "MEMPROSES..." : "KONFIRMASI PESANAN"}
          </motion.button>

          <p className="text-center text-[9px] text-[#c9b99a]/30">
            Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan Arcanisia.
          </p>
        </form>
      </div>
    </div>
  );
}
