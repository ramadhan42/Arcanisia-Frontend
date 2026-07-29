"use client";

import { useEffect, useState } from "react";
import { Loader2, QrCode } from "lucide-react";
import type { Order, Payment } from "@/types/api";

type InstructionFields = {
  qr_string?: string | null;
  qr_url?: string | null;
  expiry_time?: string | null;
};

type QrisSource = {
  payment_method?: string | null;
  payment?: Pick<
    Payment,
    "method" | "status" | "qr_string" | "qr_url" | "expiry_time" | "expires_at"
  > | null;
  midtrans?: { instructions?: InstructionFields | null } | null;
  xendit?: { instructions?: InstructionFields | null } | null;
};

function extractQrisPayload(source: QrisSource | Order | Payment) {
  const isPaymentRecord = "order_id" in source && "method" in source;

  const qrUrl = isPaymentRecord
    ? source.qr_url
    : source.midtrans?.instructions?.qr_url ||
      source.xendit?.instructions?.qr_url ||
      source.payment?.qr_url ||
      null;

  const qrString = isPaymentRecord
    ? source.qr_string
    : source.midtrans?.instructions?.qr_string ||
      source.xendit?.instructions?.qr_string ||
      source.payment?.qr_string ||
      null;

  return { isPaymentRecord, qrUrl, qrString };
}

export function resolveQrisImageUrl(source: QrisSource | Order | Payment): string | null {
  const { qrUrl, qrString } = extractQrisPayload(source);

  if (qrString) {
    const params = new URLSearchParams({
      size: "320x320",
      margin: "14",
      color: "FFFFFF",
      bgcolor: "012421",
      data: qrString,
    });

    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }

  return qrUrl || null;
}

export function resolveQrisPayment(source: QrisSource | Order | Payment) {
  const { isPaymentRecord } = extractQrisPayload(source);

  const method = isPaymentRecord
    ? source.method
    : ("payment_method" in source
        ? source.payment_method
        : source.payment?.method) ?? null;

  if (method !== "qris") {
    return null;
  }

  const imageUrl = resolveQrisImageUrl(source);
  const expiryTime = isPaymentRecord
    ? source.expiry_time || source.expires_at || null
    : source.midtrans?.instructions?.expiry_time ||
      source.xendit?.instructions?.expiry_time ||
      source.payment?.expiry_time ||
      source.payment?.expires_at ||
      null;
  const status = isPaymentRecord
    ? source.status
    : source.payment?.status || null;

  return {
    imageUrl,
    expiryTime,
    status,
    paid: status === "paid",
  };
}

export function QrisPaymentInfo({
  source,
  compact = false,
}: {
  source: Order | Payment;
  compact?: boolean;
}) {
  const qris = resolveQrisPayment(source);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [qris?.imageUrl]);

  if (!qris) {
    return null;
  }

  if (qris.paid) {
    return (
      <div className="border border-[#8fbf8a]/30 bg-[#8fbf8a]/10 p-3 text-left">
        <p className="text-[10px] uppercase tracking-[2px] text-[#8fbf8a]">QRIS</p>
        <p className="mt-2 text-sm text-[#c9b99a]/80">Pembayaran QRIS sudah berhasil.</p>
      </div>
    );
  }

  const sizeClass = compact ? "h-28 w-28" : "h-40 w-40 sm:h-44 sm:w-44";

  return (
    <div className="relative overflow-hidden border border-[#c9a84c]/30 bg-[linear-gradient(165deg,_#01352f_0%,_#012421_48%,_#011a18_100%)] p-4 text-left">
      <div className="mb-3 flex items-center gap-2">
        <QrCode size={14} className="text-[#d4af37]" />
        <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">QRIS</p>
      </div>

      <div className={`relative mx-auto ${sizeClass} border border-[#c9a84c]/25 bg-[#012421] p-2.5`}>
        {!loaded && qris.imageUrl ? (
          <div className="absolute inset-2.5 flex items-center justify-center">
            <Loader2 size={18} className="animate-spin text-[#f8c56c]/70" />
          </div>
        ) : null}
        {qris.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qris.imageUrl}
            alt="Kode QRIS pembayaran"
            className={`h-full w-full object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[1.5px] text-[#c9b99a]/45">
            QR tidak ada
          </div>
        )}
      </div>

      {qris.expiryTime ? (
        <p className="mt-3 text-center text-[11px] text-[#c9b99a]/55">
          Berlaku hingga {qris.expiryTime}
        </p>
      ) : null}
      <p className="mt-2 text-center text-[12px] text-[#c9b99a]/65">
        Scan dengan e-wallet atau mobile banking untuk menyelesaikan pembayaran.
      </p>
    </div>
  );
}
