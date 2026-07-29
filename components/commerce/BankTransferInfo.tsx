"use client";

import type { Order, Payment } from "@/types/api";

type TransferSource = {
  payment_method?: string | null;
  payment?: Pick<Payment, "method" | "bank" | "va_number" | "expiry_time"> | null;
  midtrans?: {
    instructions?: {
      bank?: string | null;
      va_number?: string | null;
      expiry_time?: string | null;
    } | null;
  } | null;
  xendit?: {
    instructions?: {
      bank?: string | null;
      va_number?: string | null;
      expiry_time?: string | null;
    } | null;
  } | null;
};

export function resolveBankTransfer(source: TransferSource | Order | Payment) {
  const isPaymentRecord = "order_id" in source && "method" in source;

  const method = isPaymentRecord
    ? source.method
    : ("payment_method" in source
        ? source.payment_method
        : source.payment?.method) ?? null;

  if (method !== "bank_transfer") {
    return null;
  }

  if (isPaymentRecord) {
    const bank = source.bank ?? null;
    const vaNumber = source.va_number ?? null;
    if (!bank && !vaNumber) {
      return null;
    }

    return {
      bank,
      vaNumber,
      expiryTime: source.expiry_time ?? null,
    };
  }

  const bank =
    source.midtrans?.instructions?.bank ||
    source.xendit?.instructions?.bank ||
    source.payment?.bank ||
    null;
  const vaNumber =
    source.midtrans?.instructions?.va_number ||
    source.xendit?.instructions?.va_number ||
    source.payment?.va_number ||
    null;
  const expiryTime =
    source.midtrans?.instructions?.expiry_time ||
    source.xendit?.instructions?.expiry_time ||
    source.payment?.expiry_time ||
    null;

  if (!bank && !vaNumber) {
    return null;
  }

  return { bank, vaNumber, expiryTime };
}

export function BankTransferInfo({
  source,
  compact = false,
}: {
  source: TransferSource | Order | Payment;
  compact?: boolean;
}) {
  const transfer = resolveBankTransfer(source);

  if (!transfer) {
    return null;
  }

  const bankLabel = transfer.bank
    ? transfer.bank.replaceAll("_", " ").toUpperCase()
    : "BANK TRANSFER";

  if (compact) {
    return (
      <div className="space-y-1 text-xs text-[#c9b99a]/70">
        <p>
          Bank: <span className="text-[#f5edd6]">{bankLabel}</span>
        </p>
        {transfer.vaNumber ? (
          <p>
            VA:{" "}
            <span className="font-mono tracking-[1px] text-[#f8c56c]">
              {transfer.vaNumber}
            </span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="border border-[#c9a84c]/20 bg-black/15 p-3">
      <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
        Virtual Account
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="border border-[#c9a84c]/35 bg-[#f8c56c]/10 px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] text-[#f8c56c]">
          {bankLabel}
        </span>
        <span className="text-[11px] text-[#c9b99a]/50">Tipe bank</span>
      </div>
      {transfer.vaNumber ? (
        <>
          <p className="mt-3 text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
            Nomor VA
          </p>
          <p className="mt-1 break-all font-mono text-lg tracking-[1.5px] text-[#f8c56c]">
            {transfer.vaNumber}
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-[#c9b99a]/55">Nomor VA belum tersedia.</p>
      )}
      {transfer.expiryTime ? (
        <p className="mt-2 text-[11px] text-[#c9b99a]/55">
          Berlaku hingga {transfer.expiryTime}
        </p>
      ) : null}
    </div>
  );
}
