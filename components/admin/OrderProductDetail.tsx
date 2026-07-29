"use client";

import type { ReactNode } from "react";
import ProductImage from "@/components/ui/ProductImage";
import StatusSelect from "@/components/admin/StatusSelect";
import { PaymentChannelInfo } from "@/components/commerce/PaymentChannelInfo";
import type {
  Order,
  OrderItem,
  OrderStatus,
  Payment,
  PaymentOrderSummary,
} from "@/types/api";

export const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

const orderStatusTone: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-200",
  processing: "bg-sky-500/15 text-sky-200",
  shipping: "bg-indigo-500/15 text-indigo-200",
  completed: "bg-emerald-500/15 text-emerald-200",
  cancelled: "bg-red-500/15 text-red-200",
};

const paymentStatusTone: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-200",
  paid: "bg-emerald-500/15 text-emerald-200",
  failed: "bg-red-500/15 text-red-200",
  expired: "bg-neutral-500/15 text-neutral-300",
  cancelled: "bg-red-500/15 text-red-200",
};

export function StatusBadge({
  value,
  kind = "order",
}: {
  value: string;
  kind?: "order" | "payment";
}) {
  const tone =
    (kind === "payment" ? paymentStatusTone[value] : orderStatusTone[value]) ??
    "bg-[#c9a84c]/15 text-[#f8c56c]";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${tone}`}
    >
      {value}
    </span>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">{label}</p>
      <div className="mt-1.5 text-sm text-[#f5edd6]">{children}</div>
    </div>
  );
}

export function ProductLine({ item }: { item: OrderItem }) {
  return (
    <article className="flex gap-3 border border-[#c9a84c]/15 bg-[#012724]/70 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#c9a84c]/10 bg-black/25">
        {item.product_image ? (
          <ProductImage
            src={item.product_image}
            alt={item.product_name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[1px] text-[#c9b99a]/40">
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

export function OrderProductsCell({
  items,
  truncate = true,
}: {
  items: OrderItem[];
  truncate?: boolean;
}) {
  const primary = items[0];
  const extra = Math.max(items.length - 1, 0);

  if (!primary) {
    return <span className="text-xs text-[#c9b99a]/40">Tidak ada produk</span>;
  }

  return (
    <div className={`flex items-center gap-3 ${truncate ? "min-w-[220px]" : "min-w-[260px]"}`}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#c9a84c]/15 bg-black/30">
        {primary.product_image ? (
          <ProductImage
            src={primary.product_image}
            alt={primary.product_name}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[1px] text-[#c9b99a]/35">
            N/A
          </div>
        )}
        {extra > 0 ? (
          <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center bg-[#f8c56c] px-1 text-[10px] font-bold text-[#012421]">
            +{extra}
          </span>
        ) : null}
      </div>
      <div className={truncate ? "min-w-0" : "min-w-0 max-w-[320px]"}>
        <p className={`font-medium text-[#f5edd6] ${truncate ? "truncate" : "break-words"}`}>
          {primary.product_name}
        </p>
        <p className={`mt-0.5 text-xs text-[#c9b99a]/55 ${truncate ? "truncate" : "break-words"}`}>
          SKU {primary.product_sku}
          {primary.product_size ? ` · ${primary.product_size}` : ""}
          {` · Qty ${primary.quantity}`}
        </p>
        {extra > 0 ? (
          <p className="mt-0.5 text-[10px] uppercase tracking-[1px] text-[#f8c56c]/80">
            +{extra} produk lainnya
          </p>
        ) : null}
      </div>
    </div>
  );
}

function OrderMeta({ order }: { order: Order | PaymentOrderSummary }) {
  const paymentMethod = order.payment_method ?? "bank_transfer";
  const total = order.total ?? "0";
  const paymentStatus =
    "payment" in order ? (order as Order).payment?.status : undefined;
  const fullOrder = "payment" in order ? (order as Order) : null;

  return (
    <section className="grid gap-4 border border-[#c9a84c]/15 bg-[#012724]/40 p-4 sm:grid-cols-2">
      <Field label="Pesanan">
        <p className="font-medium">{order.order_number}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusBadge value={order.status} />
          {paymentStatus ? <StatusBadge value={paymentStatus} kind="payment" /> : null}
        </div>
        {order.ordered_at ? (
          <p className="mt-2 text-xs text-[#c9b99a]/60">{dateTime.format(new Date(order.ordered_at))}</p>
        ) : null}
      </Field>
      <Field label="Total">
        <p className="font-gilland text-xl text-[#f8c56c]">{currency.format(Number(total))}</p>
        <p className="mt-1 text-xs capitalize text-[#c9b99a]/60">
          Metode: {String(paymentMethod).replaceAll("_", " ")}
        </p>
        {fullOrder ? (
          <div className="mt-3">
            <PaymentChannelInfo source={fullOrder} />
          </div>
        ) : null}
      </Field>
      <Field label="Pelanggan">
        <p className="font-medium">{order.customer_name}</p>
        <p className="mt-1 text-xs text-[#c9b99a]/60">{order.customer_email ?? "—"}</p>
        <p className="text-xs text-[#c9b99a]/60">{order.customer_phone ?? "—"}</p>
      </Field>
      <Field label="Pengiriman">
        <p className="text-xs leading-relaxed text-[#c9b99a]/75">
          {[order.address, order.city, order.province, order.postal_code]
            .filter(Boolean)
            .join(", ") || "—"}
        </p>
      </Field>
    </section>
  );
}

function OrderItemsSection({ items }: { items: OrderItem[] }) {
  return (
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
  );
}

export function OrderDetailBody({ order }: { order: Order | PaymentOrderSummary }) {
  const items = order.items ?? [];

  return (
    <div className="space-y-5">
      <OrderMeta order={order} />
      <OrderItemsSection items={items} />
    </div>
  );
}

export function OrderEditBody({
  order,
  status,
  onStatusChange,
}: {
  order: Order;
  status: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
}) {
  return (
    <div className="space-y-5">
      <OrderMeta order={{ ...order, status }} />
      <div className="border border-[#c9a84c]/15 bg-[#012724]/40 p-4">
        <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Ubah status pesanan</p>
        <div className="mt-3">
          <StatusSelect
            value={status}
            options={["pending", "processing", "shipping", "completed", "cancelled"]}
            onChange={(value) => onStatusChange(value as OrderStatus)}
          />
        </div>
        <p className="mt-3 text-xs text-[#c9b99a]/50">
          Status hanya bisa berubah sesuai alur yang diizinkan (mis. pending → processing).
        </p>
      </div>
      <OrderItemsSection items={order.items ?? []} />
    </div>
  );
}

export function PaymentDetailBody({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 border border-[#c9a84c]/15 bg-[#012724]/40 p-4 sm:grid-cols-2">
        <Field label="Pembayaran">
          <p className="font-medium">#{payment.id}</p>
          <div className="mt-2">
            <StatusBadge value={payment.status} kind="payment" />
          </div>
          <p className="mt-2 text-xs capitalize text-[#c9b99a]/60">
            Metode: {payment.method.replaceAll("_", " ")}
          </p>
          {payment.gateway ? (
            <p className="mt-1 text-xs capitalize text-[#c9b99a]/50">
              Gateway: {payment.gateway}
            </p>
          ) : null}
        </Field>
        <Field label="Jumlah">
          <p className="font-gilland text-xl text-[#f8c56c]">
            {currency.format(Number(payment.amount))}
          </p>
          {payment.reference ? (
            <p className="mt-1 text-xs text-[#c9b99a]/60">Ref: {payment.reference}</p>
          ) : null}
          <div className="mt-3">
            <PaymentChannelInfo source={payment} />
          </div>
        </Field>
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

