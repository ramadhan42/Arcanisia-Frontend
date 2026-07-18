"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
  RefreshCw,
  ShoppingBag,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { orderService } from "@/services/api";
import type { Order, OrderStatus, PaginationMeta } from "@/types/api";

const labels: Record<OrderStatus, string> = {
  pending: "MENUNGGU",
  processing: "DIPROSES",
  shipping: "DIKIRIM",
  completed: "SELESAI",
  cancelled: "DIBATALKAN",
};

const statusTabs = [
  "",
  "pending",
  "processing",
  "shipping",
  "completed",
  "cancelled",
] as const;

type StatusFilter = (typeof statusTabs)[number];

type StatusCounts = Record<"all" | OrderStatus, number>;

const emptyCounts: StatusCounts = {
  all: 0,
  pending: 0,
  processing: 0,
  shipping: 0,
  completed: 0,
  cancelled: 0,
};

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const hideScrollbar =
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

export default function OrdersModal({ onClose }: { onClose: () => void }) {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [counts, setCounts] = useState<StatusCounts>(emptyCounts);
  const [status, setStatus] = useState<StatusFilter>("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCounts = useCallback(async () => {
    if (!token) return;

    const results = await Promise.all(
      statusTabs.map(async (value) => {
        const response = await orderService.list(token, {
          page: 1,
          per_page: 1,
          status: value || undefined,
        });
        return [value || "all", response.meta?.total ?? response.data.length] as const;
      }),
    );

    setCounts(
      results.reduce(
        (next, [key, total]) => ({ ...next, [key]: total }),
        { ...emptyCounts },
      ),
    );
  }, [token]);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await orderService.list(token, {
        page,
        status: status || undefined,
      });
      setOrders(response.data);
      setMeta(response.meta);
      void loadCounts().catch(() => undefined);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Pesanan gagal dimuat.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [loadCounts, page, status, token]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const tabCount = (value: StatusFilter) =>
    value ? counts[value] : counts.all;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="orders-title"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[calc(100svh-24px)] w-full max-w-[920px] flex-col overflow-hidden rounded-md border border-[#c9a84c]/20 bg-[#012f2b] font-graziemille text-[#c9b99a] shadow-2xl sm:h-[min(650px,calc(100svh-32px))]"
      >
        <header className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#c9a84c]/15 px-5 sm:h-[92px] sm:px-7">
          <div>
            <p className="text-[8px] tracking-[4px] text-[#c9a84c]/60 sm:text-[9px]">
              AKUN SAYA
            </p>
            <h2
              id="orders-title"
              className="mt-2 font-gilland text-[24px] leading-none text-[#f8c56c] sm:text-[27px]"
            >
              Pesanan Saya
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pesanan saya"
            className="flex h-10 w-10 items-center justify-center border border-[#c9a84c]/30 text-[#c9a84c]/70 transition-colors hover:bg-white/5 hover:text-[#f8c56c] sm:h-11 sm:w-11"
          >
            <X size={17} />
          </button>
        </header>

        <nav
          aria-label="Filter status pesanan"
          className={`flex h-[50px] shrink-0 overflow-x-auto border-b border-[#c9a84c]/10 ${hideScrollbar}`}
        >
          {statusTabs.map((value) => {
            const active = status === value;
            const count = tabCount(value);

            return (
              <button
                key={value || "all"}
                type="button"
                onClick={() => {
                  setStatus(value);
                  setPage(1);
                  setExpanded(null);
                }}
                className={`relative flex h-full min-w-max flex-1 items-center justify-center gap-2 px-4 text-[8px] font-bold tracking-[3px] transition-colors sm:px-5 sm:text-[9px] ${
                  active
                    ? "text-[#f8c56c]"
                    : "text-[#c9b99a]/35 hover:text-[#c9b99a]/70"
                }`}
              >
                <span>{value ? labels[value] : "SEMUA"}</span>
                {count > 0 && (
                  <span
                    className={`flex h-[18px] min-w-[18px] items-center justify-center px-1 text-[9px] tracking-normal ${
                      active
                        ? "bg-[#f8c56c] text-[#012f2b]"
                        : "bg-[#c9a84c]/15 text-[#c9a84c]/55"
                    }`}
                  >
                    {count}
                  </span>
                )}
                {active && (
                  <span className="absolute inset-x-1 bottom-0 h-[2px] bg-[#f8c56c] sm:inset-x-2" />
                )}
              </button>
            );
          })}
        </nav>

        <div
          className={`flex-1 space-y-3 overflow-y-auto p-3 sm:p-5 ${hideScrollbar}`}
        >
          {isLoading && (
            <div className="flex h-full min-h-[220px] items-center justify-center">
              <LoaderCircle className="animate-spin text-[#f8c56c]" />
            </div>
          )}
          {!isLoading && error && (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-[#ff7b86]">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-4 flex items-center gap-2 text-[#f8c56c]"
              >
                <RefreshCw size={14} /> COBA LAGI
              </button>
            </div>
          )}
          {!isLoading && !error && orders.length === 0 && (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-[#c9a84c]/40">
              <Box size={42} />
              <p className="mt-4 font-gilland text-lg">Belum ada pesanan.</p>
            </div>
          )}
          {!isLoading &&
            !error &&
            orders.map((order) => (
              <article
                key={order.id}
                className="border border-[#c9a84c]/15 p-4 transition-colors hover:border-[#c9a84c]/35"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] tracking-[3px] text-[#f8c56c]">
                      {order.order_number}
                    </p>
                    <p className="mt-2 text-xs text-[#c9b99a]/55">
                      {new Date(
                        order.ordered_at ?? order.created_at,
                      ).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#c9a84c]/10 px-3 py-2 text-[8px] tracking-[1px] text-[#f8c56c]">
                      {labels[order.status]}
                    </span>
                    <p className="mt-3 font-gilland text-lg text-[#f8c56c]">
                      {currency.format(Number(order.total))}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[10px] text-[#c9b99a]/55">
                  Pembayaran: {order.payment?.status ?? "pending"} ·{" "}
                  {order.payment_method.replace("_", " ")}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(expanded === order.id ? null : order.id)
                  }
                  className="mt-3 flex items-center gap-2 text-[9px] tracking-[2px] text-[#f8c56c]"
                >
                  DETAIL{" "}
                  {expanded === order.id ? (
                    <ChevronUp size={13} />
                  ) : (
                    <ChevronDown size={13} />
                  )}
                </button>
                {expanded === order.id && (
                  <div className="mt-4 space-y-3 border-t border-[#c9a84c]/10 pt-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-black/20">
                          {item.product_image && (
                            <Image
                              src={item.product_image}
                              alt={item.product_name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-gilland text-base text-[#f8c56c]">
                            {item.product_name}
                          </h3>
                          <p className="text-xs text-[#c9b99a]/55">
                            {item.product_size} · Qty {item.quantity}
                          </p>
                          <p className="text-xs">
                            {currency.format(Number(item.subtotal))}
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs leading-relaxed text-[#c9b99a]/60">
                      {order.address}, {order.city}, {order.province}{" "}
                      {order.postal_code}
                    </p>
                  </div>
                )}
              </article>
            ))}
        </div>

        <footer className="flex h-[54px] shrink-0 items-center justify-between border-t border-[#c9a84c]/10 px-5 text-[9px] text-[#c9b99a]/70 sm:px-7 sm:text-[10px]">
          <span>{counts.all} pesanan total</span>
          <div className="flex items-center gap-4">
            {meta && meta.last_page > 1 && (
              <>
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((value) => value - 1)}
                  className="disabled:opacity-30"
                >
                  SEBELUMNYA
                </button>
                <span>
                  {page} / {meta.last_page}
                </span>
                <button
                  type="button"
                  disabled={page >= meta.last_page}
                  onClick={() => setPage((value) => value + 1)}
                  className="disabled:opacity-30"
                >
                  BERIKUTNYA
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-3 font-montserrat text-[8px] tracking-[2.5px] text-[#f8c56c] transition-opacity hover:opacity-75 sm:text-[9px]"
            >
              <ShoppingBag size={14} />
              LANJUT BELANJA
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
