"use client";

import ProductImage from "@/components/ui/ProductImage";
import type { Order, OrderItem, Payment, PaymentOrderSummary } from "@/types/api";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function ProductLine({ item }: { item: OrderItem }) {
  return (
    <article className="flex gap-3 border border-[#c9a84c]/15 bg-[#012724]/70 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-black/25">
        {item.product_image ? (
          <ProductImage
            src={item.product_image}
            alt={item.product_name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] text-[#c9b99a]/40">
            N/A
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-gilland text-base text-[#f8c56c]">{item.product_name}</h3>
        <p className="mt-1 text-xs text-[#c9b99a]/60">
          SKU {item.product_sku}
          {item.product_size ? ` · ${item.product_size}` : ""}
          {` · Qty ${item.quantity}`}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#e6ddc7]">
          <span>Harga: {currency.format(Number(item.unit_price))}</span>
          <span>Subtotal: {currency.format(Number(item.subtotal))}</span>
        </div>
      </div>
    </article>
  );
}

export function OrderDetailBody({ order }: { order: Order | PaymentOrderSummary }) {
  const items = order.items ?? [];
  const paymentMethod = order.payment_method ?? "bank_transfer";
  const total = order.total ?? "0";

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Pesanan</p>
          <p className="mt-1 text-sm text-[#f5edd6]">{order.order_number}</p>
          <p className="mt-1 text-xs text-[#c9b99a]/60">Status: {order.status}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Total</p>
          <p className="mt-1 font-gilland text-xl text-[#f8c56c]">
            {currency.format(Number(total))}
          </p>
          <p className="mt-1 text-xs text-[#c9b99a]/60">
            Metode: {String(paymentMethod).replaceAll("_", " ")}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Pelanggan</p>
          <p className="mt-1 text-sm text-[#f5edd6]">{order.customer_name}</p>
          <p className="mt-1 text-xs text-[#c9b99a]/60">{order.customer_email ?? "—"}</p>
          <p className="text-xs text-[#c9b99a]/60">{order.customer_phone ?? "—"}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Pengiriman</p>
          <p className="mt-1 text-xs leading-relaxed text-[#c9b99a]/75">
            {[order.address, order.city, order.province, order.postal_code]
              .filter(Boolean)
              .join(", ") || "—"}
          </p>
        </div>
      </section>

      <section>
        <p className="mb-3 text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
          Produk ({items.length})
        </p>
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-[#c9b99a]/45">Tidak ada item produk.</p>
          ) : (
            items.map((item) => <ProductLine key={item.id} item={item} />)
          )}
        </div>
      </section>
    </div>
  );
}

export function PaymentDetailBody({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Pembayaran</p>
          <p className="mt-1 text-sm text-[#f5edd6]">#{payment.id}</p>
          <p className="mt-1 text-xs text-[#c9b99a]/60">Status: {payment.status}</p>
          <p className="text-xs text-[#c9b99a]/60">
            Metode: {payment.method.replaceAll("_", " ")}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Jumlah</p>
          <p className="mt-1 font-gilland text-xl text-[#f8c56c]">
            {currency.format(Number(payment.amount))}
          </p>
          {payment.reference && (
            <p className="mt-1 text-xs text-[#c9b99a]/60">Ref: {payment.reference}</p>
          )}
        </div>
      </section>

      {payment.order ? (
        <OrderDetailBody order={payment.order} />
      ) : (
        <p className="text-sm text-[#c9b99a]/45">
          Detail pesanan tidak tersedia untuk pembayaran ini.
        </p>
      )}
    </div>
  );
}
