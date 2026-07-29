"use client";

import type { Order, Payment } from "@/types/api";
import { BankTransferInfo } from "@/components/commerce/BankTransferInfo";
import { QrisPaymentInfo } from "@/components/commerce/QrisPaymentInfo";

export function PaymentChannelInfo({
  source,
  compact = false,
}: {
  source: Order | Payment;
  compact?: boolean;
}) {
  return (
    <>
      <BankTransferInfo source={source} compact={compact} />
      <QrisPaymentInfo source={source} compact={compact} />
    </>
  );
}
