"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Package, QrCode, X } from "lucide-react";
import type { Order } from "@/types/api";
import ProductImage from "@/components/ui/ProductImage";
import { orderService } from "@/services/api";
import { resolveQrisImageUrl } from "@/components/commerce/QrisPaymentInfo";

interface ConfirmationModalProps {
  order: Order;
  onClose: () => void;
  onOrderUpdate?: (order: Order) => void;
}

const hideScrollbar =
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#c9a84c]/35 [&::-webkit-scrollbar-track]:bg-transparent";

const goldGradient =
  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  order: initialOrder,
  onClose,
  onOrderUpdate,
}) => {
  const [order, setOrder] = useState(initialOrder);
  const [isSyncing, setIsSyncing] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);

  const firstItem = order.items[0];
  const displayName = order.customer_name?.trim() || "Customer";
  const vaNumber =
    order.midtrans?.instructions?.va_number ||
    order.xendit?.instructions?.va_number ||
    order.payment?.va_number;
  const vaBank =
    order.midtrans?.instructions?.bank ||
    order.xendit?.instructions?.bank ||
    order.payment?.bank ||
    "transfer";
  const qrImageUrl = resolveQrisImageUrl(order);
  const hasQris =
    Boolean(qrImageUrl) ||
    Boolean(order.midtrans?.instructions?.qr_string) ||
    Boolean(order.xendit?.instructions?.qr_string) ||
    Boolean(order.payment?.qr_string) ||
    order.payment_method === "qris";
  const paymentStatus = order.payment?.status ?? "pending";
  const isPaid = paymentStatus === "paid";
  const paymentGateway = order.payment?.gateway;
  const isGatewayPending =
    (paymentGateway === "midtrans" || paymentGateway === "xendit") &&
    paymentStatus === "pending";
  const expiryTime =
    order.midtrans?.instructions?.expiry_time ||
    order.xendit?.instructions?.expiry_time ||
    order.payment?.expires_at ||
    null;

  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);

  useEffect(() => {
    setQrLoaded(false);
  }, [qrImageUrl]);

  useEffect(() => {
    if (!isGatewayPending || !paymentGateway) {
      return;
    }

    let cancelled = false;

    const syncStatus = async () => {
      try {
        setIsSyncing(true);
        const response = await orderService.syncGatewayStatus(
          order.order_number,
          paymentGateway,
        );
        if (cancelled) {
          return;
        }
        setOrder(response.data);
        onOrderUpdate?.(response.data);
      } catch {
        // Keep showing local pending status if sync fails.
      } finally {
        if (!cancelled) {
          setIsSyncing(false);
        }
      }
    };

    void syncStatus();
    const intervalId = window.setInterval(() => {
      void syncStatus();
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [isGatewayPending, paymentGateway, order.order_number, onOrderUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative flex h-[min(100dvh,630px)] w-full max-w-[900px] flex-col overflow-hidden text-[#c9b99a] shadow-2xl md:h-[630px] md:rounded-md font-graziemille"
      style={{ backgroundColor: "#012421" }}
    >
      <div className="flex w-full shrink-0 items-center justify-between border-b border-[#c9a84c]/15 px-6 py-4 sm:px-8 sm:py-5">
        <span className="text-[11px] tracking-[4px] uppercase text-[#c9b99a]">
          {hasQris && !isPaid ? "PEMBAYARAN QRIS" : "PESANAN DIKONFIRMASI"}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center border border-[#c9a84c]/30 transition-colors hover:bg-white/10"
        >
          <X size={16} className="text-[#c9a84c]" />
        </button>
      </div>

      <div
        className={`min-h-0 w-full flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8 ${hideScrollbar}`}
      >
        <div className="mx-auto flex w-full max-w-[550px] flex-col items-center text-center">
          {!hasQris || isPaid ? (
            <>
              <div className="mb-4 text-[#d4af37]">
                <CheckCircle size={56} strokeWidth={1} />
              </div>

              <h2
                className="mb-3 font-gilland text-[32px] leading-tight text-transparent sm:text-[42px] bg-clip-text"
                style={{ backgroundImage: goldGradient }}
              >
                Terima Kasih, {displayName}
              </h2>

              <p className="mb-4 max-w-[550px] text-[13px] font-light leading-relaxed text-[#c9b99a]/80 sm:text-[14px]">
                Pesanan Anda telah kami terima. Status pembayaran saat ini{" "}
                <span className="mx-1 font-gilland text-[15px] font-normal text-[#d4af37] sm:text-[16px]">
                  {paymentStatus}
                </span>
                . Pesanan akan diproses sesuai status pembayaran di sistem.
              </p>

              {isPaid ? (
                <p className="mb-4 text-[12px] text-[#8fbf8a]">
                  Pembayaran berhasil. Pesanan diproses.
                </p>
              ) : null}

              <p className="mb-6 text-[11px] uppercase tracking-[3px] text-[#d4af37]">
                NO. PESANAN: {order.order_number}
              </p>
            </>
          ) : (
            <>
              <p className="mb-1 text-[10px] uppercase tracking-[3px] text-[#c9b99a]/55">
                Terima kasih, {displayName}
              </p>
              <h2
                className="mb-2 font-gilland text-[28px] leading-tight text-transparent sm:text-[34px] bg-clip-text"
                style={{ backgroundImage: goldGradient }}
              >
                Scan untuk Bayar
              </h2>
              <p className="mb-5 text-[11px] uppercase tracking-[3px] text-[#d4af37]">
                {order.order_number}
              </p>
            </>
          )}

          {vaNumber ? (
            <div className="mb-5 w-full border border-[#c9a84c]/30 p-4 text-left sm:p-5">
              <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55">
                Virtual Account
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="border border-[#c9a84c]/35 bg-[#f8c56c]/10 px-2.5 py-1 text-[10px] uppercase tracking-[2px] text-[#f8c56c]">
                  {String(vaBank).toUpperCase()}
                </span>
                <span className="text-[12px] text-[#c9b99a]/55">Tipe bank</span>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
                Nomor VA
              </p>
              <p className="mt-1 break-all font-mono text-[18px] tracking-[1.5px] text-[#f8c56c] sm:text-[22px] sm:tracking-[2px]">
                {vaNumber}
              </p>
              <p className="mt-3 text-[12px] text-[#c9b99a]/60">
                Transfer tepat sebesar {order.total} sebelum{" "}
                {expiryTime || "batas waktu pembayaran"}.
              </p>
            </div>
          ) : null}

          {hasQris && !isPaid ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-5 w-full"
            >
              <div className="relative overflow-hidden border border-[#c9a84c]/35 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.12),_transparent_55%),linear-gradient(180deg,_rgba(1,28,25,0.9),_rgba(1,20,18,0.95))] px-4 py-5 sm:px-6 sm:py-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fdde8a]/70 to-transparent" />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#f5edd6]">
                    <QrCode size={16} className="text-[#d4af37]" />
                    <span className="text-[10px] uppercase tracking-[2.5px]">QRIS</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 border border-[#c9a84c]/25 bg-black/20 px-2.5 py-1 text-[9px] uppercase tracking-[2px] text-[#c9b99a]/80">
                    {isSyncing ? (
                      <Loader2 size={11} className="animate-spin text-[#d4af37]" />
                    ) : (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                      </span>
                    )}
                    Menunggu bayar
                  </span>
                </div>

                <div className="mx-auto mb-4 flex max-w-[280px] flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute -left-0.5 -top-0.5 h-5 w-5 border-l-2 border-t-2 border-[#d4af37]" />
                    <div className="absolute -right-0.5 -top-0.5 h-5 w-5 border-r-2 border-t-2 border-[#d4af37]" />
                    <div className="absolute -bottom-0.5 -left-0.5 h-5 w-5 border-b-2 border-l-2 border-[#d4af37]" />
                    <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 border-b-2 border-r-2 border-[#d4af37]" />

                    <div className="relative mx-auto aspect-square w-full max-w-[240px] bg-white p-3 shadow-[0_0_0_1px_rgba(201,168,76,0.25)] sm:max-w-[260px]">
                      {!qrLoaded && qrImageUrl ? (
                        <div className="absolute inset-3 flex items-center justify-center bg-[#f7f3e8]">
                          <Loader2 size={22} className="animate-spin text-[#012421]/40" />
                        </div>
                      ) : null}

                      {qrImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={qrImageUrl}
                          alt="Kode QRIS pembayaran"
                          className={`h-full w-full object-contain transition-opacity duration-300 ${
                            qrLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => setQrLoaded(true)}
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#f7f3e8] text-[#012421]/55">
                          <QrCode size={36} strokeWidth={1.25} />
                          <span className="text-[10px] uppercase tracking-[2px]">
                            QR belum tersedia
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mx-auto max-w-[320px] text-center">
                  <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55">
                    Total pembayaran
                  </p>
                  <p
                    className="mt-1 font-gilland text-[28px] leading-none text-transparent sm:text-[32px] bg-clip-text"
                    style={{ backgroundImage: goldGradient }}
                  >
                    {order.total}
                  </p>
                  {expiryTime ? (
                    <p className="mt-3 text-[11px] leading-relaxed text-[#c9b99a]/55">
                      Berlaku hingga{" "}
                      <span className="text-[#f5edd6]/90">{expiryTime}</span>
                    </p>
                  ) : null}
                  <p className="mt-3 text-[12px] leading-relaxed text-[#c9b99a]/70">
                    Buka aplikasi e-wallet atau mobile banking, lalu scan kode QR di atas.
                    Status akan diperbarui otomatis setelah pembayaran berhasil.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}

          {hasQris && isPaid ? (
            <div className="mb-5 w-full border border-[#8fbf8a]/35 bg-[#8fbf8a]/10 px-4 py-4 text-center">
              <p className="text-[11px] uppercase tracking-[2px] text-[#8fbf8a]">
                QRIS terbayar
              </p>
              <p className="mt-2 text-[13px] text-[#c9b99a]/75">
                Terima kasih. Pesanan Anda sedang diproses.
              </p>
            </div>
          ) : null}

          <div className="mb-2 flex h-[100px] w-full items-stretch border border-[#c9a84c]/30 bg-transparent text-left sm:h-[115px]">
            <div className="relative flex h-full w-[140px] shrink-0 items-center justify-center bg-black/10 sm:w-[180px]">
              {firstItem?.product_image ? (
                <ProductImage
                  src={firstItem.product_image}
                  alt={firstItem.product_name || "Product image"}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              ) : (
                <Package size={28} className="text-[#c9b99a]/40" />
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
              <p className="mb-1 text-[9px] uppercase tracking-[3px] text-[#c9b99a]/60">
                {order.items.length} ITEM · {order.payment_method.replace("_", " ")}
              </p>
              <h4
                className="mb-1 font-gilland text-[16px] text-transparent sm:text-[18px] bg-clip-text"
                style={{ backgroundImage: goldGradient }}
              >
                {firstItem?.product_name || "Pesanan Arcanisia"}
              </h4>
              <p className="text-[12px] text-[#c9b99a]/60">
                {firstItem?.product_size || "Arcanisia"} · {order.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 justify-center border-t border-[#c9a84c]/15 px-6 py-4 sm:px-8 sm:py-5">
        <button
          type="button"
          onClick={onClose}
          className="px-10 py-3.5 text-[11px] font-bold tracking-[3px] text-[#091812] transition-opacity hover:opacity-90"
          style={{ background: goldGradient }}
        >
          KEMBALI KE BERANDA
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmationModal;
