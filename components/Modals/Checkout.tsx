"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { ApiError, fieldError } from "@/lib/api";
import { openMidtransSnap } from "@/lib/midtrans";
import { orderService, paymentSettingsService } from "@/services/api";
import type {
  BuyNowPayload,
  CheckoutPayload,
  Order,
  PaymentMethod,
  PaymentSettingsPublic,
  Product,
  ValidationErrors,
} from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import ProductImage from "@/components/ui/ProductImage";
import {
  hasTypographyField,
  resolveTextStyle,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

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
    method: "cod",
    label: "COD (Bayar di Tempat)",
    description: "Bayar saat barang diterima · diverifikasi admin",
  },
  {
    method: "bank_transfer",
    label: "Bank Transfer",
    description: "Virtual Account — pilih tipe bank (BCA, Mandiri, BNI, dll)",
  },
  {
    method: "qris",
    label: "QRIS",
    description: "Scan QR · GoPay / QRIS",
  },
  {
    method: "card",
    label: "Kartu Kredit / Debit",
    description: "Visa · Mastercard",
  },
];

type CheckoutBankId = NonNullable<CheckoutPayload["payment_bank"]>;

const midtransBanks: Array<{ id: CheckoutBankId; label: string }> = [
  { id: "bca", label: "BCA" },
  { id: "bni", label: "BNI" },
  { id: "bri", label: "BRI" },
  { id: "permata", label: "Permata" },
];

const xenditBanks: Array<{ id: CheckoutBankId; label: string }> = [
  { id: "bca", label: "BCA" },
  { id: "mandiri", label: "Mandiri" },
  { id: "bni", label: "BNI" },
  { id: "bri", label: "BRI" },
  { id: "permata", label: "Permata" },
  { id: "bsi", label: "BSI" },
  { id: "cimb", label: "CIMB" },
  { id: "bjb", label: "BJB" },
  { id: "bnc", label: "BNC" },
  { id: "muamalat", label: "Muamalat" },
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
    shipping_notice?: string;
    shipping_note?: string;
    payment_notice?: string;
    payment_methods?: PaymentMethod[];
    typography?: Record<string, unknown>;
  }>("checkout");
  const checkoutPayload = settings as Record<string, unknown>;
  const shippingLabelDefaults = SECTION_TYPOGRAPHY_FIELDS.checkout?.find((item) => item.key === "shippingLabel")?.defaults;
  const shippingNoteDefaults = SECTION_TYPOGRAPHY_FIELDS.checkout?.find((item) => item.key === "shippingNote")?.defaults;
  const paymentNoticeDefaults = SECTION_TYPOGRAPHY_FIELDS.checkout?.find((item) => item.key === "paymentNotice")?.defaults;
  const shippingLabelStyle = resolveTextStyle(checkoutPayload, "shippingLabel", shippingLabelDefaults);
  const shippingNoteStyle = resolveTextStyle(checkoutPayload, "shippingNote", shippingNoteDefaults);
  const paymentNoticeStyle = resolveTextStyle(checkoutPayload, "paymentNotice", paymentNoticeDefaults);
  const useShippingLabelTypography = hasTypographyField(checkoutPayload, "shippingLabel");
  const useShippingNoteTypography = hasTypographyField(checkoutPayload, "shippingNote");
  const usePaymentNoticeTypography = hasTypographyField(checkoutPayload, "paymentNotice");
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettingsPublic | null>(null);
  const [form, setForm] = useState<CheckoutPayload>({
    customer_name: user?.name ?? "",
    customer_email: user?.email ?? "",
    customer_phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    payment_method: "cod",
    payment_bank: "permata",
  });
  const [errors, setErrors] = useState<ValidationErrors>();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idempotencyKey = useRef(crypto.randomUUID());
  const useMidtrans = paymentSettings?.provider === "midtrans" && paymentSettings.configured;
  const useXendit = paymentSettings?.provider === "xendit" && paymentSettings.configured;
  const availableMethods =
    paymentSettings?.available_methods?.length
      ? paymentSettings.available_methods
      : (["cod"] as PaymentMethod[]);
  const availablePayments = paymentOptions.filter((option) =>
    availableMethods.includes(option.method),
  );
  const bankChoices = useXendit ? xenditBanks : midtransBanks;
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
  const inputClass =
    "bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors";

  useEffect(() => {
    let active = true;
    void paymentSettingsService
      .get()
      .then((response) => {
        if (!active) return;
        setPaymentSettings(response.data);
        setForm((current) => {
          const methods = response.data.available_methods?.length
            ? response.data.available_methods
            : (["cod"] as PaymentMethod[]);
          const nextMethod = methods.includes(current.payment_method)
            ? current.payment_method
            : methods[0];
          const banks =
            response.data.provider === "xendit" ? xenditBanks : midtransBanks;
          const nextBank = banks.some((bank) => bank.id === current.payment_bank)
            ? current.payment_bank
            : banks[0]?.id ?? "bca";

          return {
            ...current,
            payment_method: nextMethod,
            payment_bank: nextBank,
          };
        });
      })
      .catch(() => {
        if (!active) return;
        setPaymentSettings({
          provider: "manual",
          configured: true,
          available_methods: ["cod"],
        });
        setForm((current) => ({ ...current, payment_method: "cod" }));
      });
    return () => {
      active = false;
    };
  }, []);

  const setField = (field: keyof CheckoutPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current?.[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const launchSnap = async (order: Order) => {
    const snapToken = order.payment?.snap_token;
    const clientKey = order.midtrans?.client_key ?? paymentSettings?.midtrans?.client_key;
    const isProduction =
      order.midtrans?.is_production ?? paymentSettings?.midtrans?.is_production ?? false;

    if (!snapToken || !clientKey) {
      setMessage("Pesanan dibuat, tetapi token Midtrans tidak tersedia.");
      onConfirm(order);
      return;
    }

    try {
      await openMidtransSnap(snapToken, clientKey, isProduction, {
        onSuccess: () => onConfirm(order),
        onPending: () => onConfirm(order),
        onError: () => {
          setMessage("Pembayaran Midtrans gagal atau dibatalkan. Pesanan tetap tersimpan.");
          onConfirm(order);
        },
        onClose: () => onConfirm(order),
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Tidak dapat membuka Midtrans Snap.",
      );
      onConfirm(order);
    }
  };

  const launchXenditCard = (order: Order) => {
    const invoiceUrl =
      order.xendit?.invoice_url ?? order.payment?.checkout_url ?? null;

    if (!invoiceUrl) {
      setMessage("Pesanan dibuat, tetapi invoice kartu Xendit tidak tersedia.");
      onConfirm(order);
      return;
    }

    onConfirm(order);
    window.location.assign(invoiceUrl);
  };

  const submit = async () => {
    if (items.length === 0) return;
    if (mode !== "buy-now" && !token) return;

    setIsSubmitting(true);
    setMessage("");
    setErrors(undefined);
    try {
      const payload: CheckoutPayload = {
        ...form,
        payment_bank:
          (useMidtrans || useXendit) && form.payment_method === "bank_transfer"
            ? form.payment_bank ?? bankChoices[0]?.id ?? "bca"
            : undefined,
      };
      const response =
        mode === "buy-now"
          ? await orderService.buyNow(
              token,
              {
                ...payload,
                product_id: items[0].product.id,
                quantity: items[0].quantity,
              } satisfies BuyNowPayload,
              idempotencyKey.current,
            )
          : await orderService.checkout(token!, payload, idempotencyKey.current);

      if (useMidtrans && form.payment_method === "card" && response.data.payment?.snap_token) {
        await launchSnap(response.data);
      } else if (useXendit && form.payment_method === "card" && (response.data.xendit?.invoice_url || response.data.payment?.checkout_url)) {
        launchXenditCard(response.data);
      } else {
        onConfirm(response.data);
      }
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
              <span
                className={
                  useShippingLabelTypography
                    ? textStyleFontClass(shippingLabelStyle)
                    : "text-[#f8c56c]"
                }
                style={
                  useShippingLabelTypography
                    ? textStyleToCss(shippingLabelStyle)
                    : undefined
                }
              >
                {settings.shipping_label ??
                  settings.shipping_notice ??
                  "GRATIS"}
              </span>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between border-t border-[#c9a84c]/20 pt-6 text-[#f5edd6]">
            <span className="text-[14px] tracking-[2px]">TOTAL</span>
            <span className="font-gilland text-[24px] text-[#f8c56c]">
              {currency.format(total)}
            </span>
          </div>

          <p
            className={`mt-auto ${
              settings.shipping_note
                ? useShippingNoteTypography
                  ? textStyleFontClass(shippingNoteStyle)
                  : "text-[11px] leading-relaxed text-[#c9b99a]/40"
                : usePaymentNoticeTypography
                  ? textStyleFontClass(paymentNoticeStyle)
                  : "text-[11px] leading-relaxed text-[#c9b99a]/40"
            }`}
            style={
              settings.shipping_note
                ? useShippingNoteTypography
                  ? textStyleToCss(shippingNoteStyle)
                  : undefined
                : usePaymentNoticeTypography
                  ? textStyleToCss(paymentNoticeStyle)
                  : undefined
            }
          >
            {settings.shipping_note ??
              settings.payment_notice ??
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
                <div key={option.method} className="flex flex-col gap-2">
                  <button
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
                        {useMidtrans && option.method !== "cod"
                          ? paymentSettings?.midtrans?.is_production
                            ? " · Midtrans"
                            : " · Midtrans Sandbox"
                          : ""}
                        {useXendit && option.method !== "cod"
                          ? paymentSettings?.xendit?.is_production
                            ? " · Xendit"
                            : " · Xendit test"
                          : ""}
                      </span>
                    </span>
                  </button>

                  {(useMidtrans || useXendit) && selected && option.method === "bank_transfer" ? (
                    <div className="ml-8 space-y-2">
                      <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
                        Pilih tipe bank (Virtual Account)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {bankChoices.map((bank) => {
                          const bankSelected = form.payment_bank === bank.id;
                          return (
                            <button
                              key={bank.id}
                              type="button"
                              onClick={() => setField("payment_bank", bank.id)}
                              className={`border px-3 py-1.5 text-[11px] tracking-[1px] ${
                                bankSelected
                                  ? "border-[#f8c56c] bg-[#f8c56c]/10 text-[#f8c56c]"
                                  : "border-[#c9a84c]/20 text-[#c9b99a]/70"
                              }`}
                            >
                              {bank.label}
                            </button>
                          );
                        })}
                      </div>
                      {fieldError(errors, "payment_bank") ? (
                        <span className="text-[11px] text-[#ff7b86]">
                          {fieldError(errors, "payment_bank")}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
            {fieldError(errors, "payment_method") && (
              <span className="text-[11px] text-[#ff7b86]">
                {fieldError(errors, "payment_method")}
              </span>
            )}
            {fieldError(errors, "payment") && (
              <span className="text-[11px] text-[#ff7b86]">
                {fieldError(errors, "payment")}
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
            disabled={
              isSubmitting ||
              ((paymentSettings?.provider === "midtrans" || paymentSettings?.provider === "xendit") &&
                !paymentSettings.configured)
            }
            whileHover={isSubmitting ? undefined : { scale: 1.02 }}
            whileTap={isSubmitting ? undefined : { scale: 0.98 }}
            className="mb-4 flex w-full items-center justify-center py-4 text-[10px] font-bold tracking-[3px] text-[#091812] disabled:opacity-60"
            style={{ background: goldGradient }}
          >
            {isSubmitting
              ? "MEMPROSES..."
              : useMidtrans || useXendit
                ? "LANJUTKAN PEMBAYARAN"
                : "KONFIRMASI PESANAN"}
          </motion.button>

          <p className="text-center text-[9px] text-[#c9b99a]/30">
            Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan Arcanisia.
          </p>
        </form>
      </div>
    </div>
  );
}
