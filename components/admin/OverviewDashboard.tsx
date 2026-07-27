"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
  Mail,
} from "lucide-react";
import type {
  DashboardSummary,
  DashboardSalesPoint,
  NewsletterSubscriber,
  Payment,
  User,
} from "@/types/api";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const statusTone: Record<string, string> = {
  pending: "bg-amber-400",
  processing: "bg-sky-400",
  shipping: "bg-indigo-400",
  completed: "bg-emerald-400",
  cancelled: "bg-red-400",
  paid: "bg-emerald-400",
  failed: "bg-red-400",
  expired: "bg-neutral-400",
};

type OverviewTab = "users" | "products" | "orders" | "payments" | "subscribers";

function SalesChart({
  series,
  metric,
}: {
  series: DashboardSalesPoint[];
  metric: "orders_count" | "paid_revenue" | "order_revenue";
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 640;
  const height = 220;
  const padX = 18;
  const padY = 24;

  const values = series.map((point) => Number(point[metric]));
  const max = Math.max(...values, 1);
  const points = series.map((point, index) => {
    const x = padX + (index / Math.max(series.length - 1, 1)) * (width - padX * 2);
    const y = height - padY - (Number(point[metric]) / max) * (height - padY * 2);
    return { x, y, point, index };
  });

  const linePath = points
    .map((item, index) => `${index === 0 ? "M" : "L"} ${item.x} ${item.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? padX} ${height - padY} L ${padX} ${height - padY} Z`;
  const active = hover === null ? null : points[hover];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[220px] w-full overflow-visible"
        role="img"
        aria-label="Grafik penjualan"
      >
        {[0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - padY - ratio * (height - padY * 2);
          return (
            <line
              key={ratio}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              stroke="rgba(201,168,76,0.12)"
              strokeDasharray="4 6"
            />
          );
        })}
        <motion.path
          d={areaPath}
          fill="url(#salesFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#f8c56c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8c56c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f8c56c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {points.map((item) => (
          <g key={item.point.date}>
            <circle
              cx={item.x}
              cy={item.y}
              r={hover === item.index ? 5.5 : 3.5}
              fill={hover === item.index ? "#f5edd6" : "#f8c56c"}
              className="transition-all"
            />
            <rect
              x={item.x - 16}
              y={padY}
              width={32}
              height={height - padY * 2}
              fill="transparent"
              onMouseEnter={() => setHover(item.index)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            />
          </g>
        ))}
        {active && (
          <g>
            <line
              x1={active.x}
              x2={active.x}
              y1={padY}
              y2={height - padY}
              stroke="rgba(248,197,108,0.35)"
              strokeDasharray="3 4"
            />
          </g>
        )}
      </svg>
      <div className="mt-2 flex justify-between px-1 text-[10px] tracking-[1px] text-[#c9b99a]/45">
        <span>{series[0]?.label}</span>
        <span>{series[Math.floor(series.length / 2)]?.label}</span>
        <span>{series.at(-1)?.label}</span>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 border border-[#c9a84c]/30 bg-[#012f2b]/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
          >
            <p className="text-[#c9b99a]/60">{active.point.label}</p>
            <p className="mt-1 text-[#f8c56c]">
              {metric === "orders_count"
                ? `${active.point.orders_count} pesanan`
                : currency.format(Number(active.point[metric]))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBars({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;

  return (
    <article className="border border-[#c9a84c]/15 bg-[#012724]/80 p-5">
      <h3 className="font-gilland text-xl text-[#f8c56c]">{title}</h3>
      <div className="mt-5 space-y-3">
        {entries.map(([status, value], index) => (
          <div key={status}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="capitalize text-[#d8d0bd]">{status}</span>
              <span className="text-[#c9b99a]/55">{value}</span>
            </div>
            <div className="h-2 overflow-hidden bg-[#012421]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / total) * 100}%` }}
                transition={{ delay: 0.08 * index, duration: 0.55, ease: "easeOut" }}
                className={`h-full ${statusTone[status] ?? "bg-[#c9a84c]"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function MiniTable({
  title,
  actionLabel,
  onAction,
  headers,
  rows,
  empty,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
  headers: string[];
  rows: Array<{ id: string | number; cells: string[]; tone?: string }>;
  empty: string;
}) {
  return (
    <article className="border border-[#c9a84c]/15 bg-[#012724]/70">
      <div className="flex items-center justify-between border-b border-[#c9a84c]/10 px-5 py-4">
        <h3 className="font-gilland text-xl text-[#f8c56c]">{title}</h3>
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1 text-[10px] tracking-[2px] text-[#f8c56c] transition-opacity hover:opacity-75"
        >
          {actionLabel} <ArrowUpRight size={13} />
        </button>
      </div>
      {rows.length === 0 ? (
        <p className="p-8 text-center text-sm text-[#c9b99a]/40">{empty}</p>
      ) : (
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.3) }}
                  className="border-t border-[#c9a84c]/10 transition-colors hover:bg-[#c9a84c]/[0.07]"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${row.id}-${cellIndex}`}
                      className={`max-w-[180px] truncate px-5 py-3 ${
                        cellIndex === 0 ? "text-[#f5edd6]" : "text-[#c9b99a]/75"
                      }`}
                    >
                      {cellIndex === row.cells.length - 1 && row.tone ? (
                        <span className="inline-flex items-center gap-2 capitalize">
                          <span className={`h-1.5 w-1.5 rounded-full ${row.tone}`} />
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

export default function OverviewDashboard({
  data,
  isLoading,
  onNavigate,
}: {
  data: DashboardSummary | null;
  isLoading: boolean;
  onNavigate: (tab: OverviewTab) => void;
}) {
  const [metric, setMetric] = useState<"orders_count" | "paid_revenue" | "order_revenue">(
    "paid_revenue",
  );

  const cards = useMemo(() => {
    if (!data) return [];
    return [
      {
        key: "orders" as const,
        label: "Pesanan",
        value: String(data.orders_count),
        hint: `${data.pending_orders_count} pending`,
        icon: ShoppingBag,
      },
      {
        key: "payments" as const,
        label: "Pendapatan",
        value: currency.format(Number(data.paid_revenue)),
        hint: `${data.pending_payments_count} pembayaran pending`,
        icon: CreditCard,
      },
      {
        key: "users" as const,
        label: "Pengguna",
        value: String(data.users_count),
        hint: "Akun terdaftar",
        icon: Users,
      },
      {
        key: "subscribers" as const,
        label: "Subscriber",
        value: String(data.subscribers_count),
        hint: "Newsletter aktif",
        icon: Mail,
      },
      {
        key: "products" as const,
        label: "Produk",
        value: String(data.products_count),
        hint: `${data.active_products_count} aktif`,
        icon: Package,
      },
    ];
  }, [data]);

  if (isLoading && !data) {
    return (
      <div className="flex h-52 items-center justify-center text-[#f8c56c]">
        Memuat ringkasan...
      </div>
    );
  }

  if (!data) {
    return (
      <p className="border border-[#c9a84c]/15 bg-[#012724]/50 p-8 text-center text-[#c9b99a]/50">
        Ringkasan belum tersedia.
      </p>
    );
  }

  const userRows = (data.recent_users as User[]).map((item) => ({
    id: item.id,
    cells: [item.name, item.email, item.is_admin ? "admin" : "user"],
    tone: item.is_admin ? "bg-[#f8c56c]" : "bg-sky-400",
  }));

  const paymentRows = (data.recent_payments as Payment[]).map((item) => ({
    id: item.id,
    cells: [
      item.order?.order_number ?? `#${item.order_id}`,
      currency.format(Number(item.amount)),
      item.status,
    ],
    tone: statusTone[item.status],
  }));

  const subscriberRows = (data.recent_subscribers as NewsletterSubscriber[]).map((item) => ({
    id: item.id,
    cells: [
      item.email,
      new Date(item.subscribed_at ?? item.created_at).toLocaleDateString("id-ID"),
      "aktif",
    ],
    tone: "bg-emerald-400",
  }));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.key}
              type="button"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.05 * index, type: "spring", stiffness: 260, damping: 24 }}
              whileHover={{ y: -4 }}
              onClick={() => onNavigate(card.key)}
              className="border border-[#c9a84c]/15 bg-[#012724]/80 p-5 text-left transition-colors hover:border-[#c9a84c]/45"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/50">{card.label}</p>
                <Icon size={15} className="text-[#f8c56c]/70" />
              </div>
              <p className="mt-3 font-gilland text-3xl text-[#f8c56c]">{card.value}</p>
              <p className="mt-2 text-xs text-[#c9b99a]/50">{card.hint}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article className="border border-[#c9a84c]/15 bg-[#012724]/80 p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">14 hari terakhir</p>
              <h3 className="mt-1 font-gilland text-2xl text-[#f8c56c]">Grafik Penjualan & Orders</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["paid_revenue", "Pendapatan"],
                  ["order_revenue", "Nilai Order"],
                  ["orders_count", "Jumlah Order"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMetric(key)}
                  className={`px-3 py-1.5 text-[10px] tracking-[1.5px] transition-colors ${
                    metric === key
                      ? "bg-[#f8c56c] font-bold text-[#012421]"
                      : "border border-[#c9a84c]/20 text-[#c9b99a]/70 hover:border-[#c9a84c]/45 hover:text-[#f8c56c]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <SalesChart series={data.sales_series} metric={metric} />
          </div>
        </article>

        <div className="grid gap-4">
          <StatusBars title="Status Pesanan" data={data.orders_by_status} />
          <StatusBars title="Status Pembayaran" data={data.payments_by_status} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <MiniTable
          title="Pengguna Terbaru"
          actionLabel="LIHAT SEMUA"
          onAction={() => onNavigate("users")}
          headers={["nama", "email", "peran"]}
          rows={userRows}
          empty="Belum ada pengguna."
        />
        <MiniTable
          title="Pembayaran Terbaru"
          actionLabel="LIHAT SEMUA"
          onAction={() => onNavigate("payments")}
          headers={["order", "jumlah", "status"]}
          rows={paymentRows}
          empty="Belum ada pembayaran."
        />
        <MiniTable
          title="Subscriber Terbaru"
          actionLabel="LIHAT SEMUA"
          onAction={() => onNavigate("subscribers")}
          headers={["email", "tanggal", "status"]}
          rows={subscriberRows}
          empty="Belum ada subscriber."
        />
      </div>
    </div>
  );
}
