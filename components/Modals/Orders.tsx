"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipping" | "completed";

interface Order {
  id: string;
  name: string;
  date: string;
  price: string;
  status: string;
  statusColor: string;
  image: string;
  size: string;
  qty: number;
  statusKey?: OrderStatus;
}

interface OrdersModalProps {
  onClose: () => void;
  orders?: Order[];
}

const OrdersModal: React.FC<OrdersModalProps> = ({ onClose, orders = [] }) => {
  const dummyOrders: Order[] = [
    {
      id: "ARC-847213",
      name: "Secret of Buton",
      date: "10 Jul 2026",
      price: "Rp 950.000",
      status: "SELESAI",
      statusColor: "text-[#d7c66e] bg-[#d7c66e]/10",
      image: "/gambar/seksi%204/button.jpg",
      size: "50ml",
      qty: 1,
      statusKey: "completed",
    },
    {
      id: "ARC-847213",
      name: "Reverie of Sumba",
      date: "10 Jul 2026",
      price: "Rp 950.000",
      status: "DALAM PENGIRIMAN",
      statusColor: "text-[#79c9bd] bg-[#79c9bd]/10",
      image: "/gambar/seksi%204/sumba.jpg",
      size: "50ml",
      qty: 1,
      statusKey: "shipping",
    },
    {
      id: "ARC-847213",
      name: "Charm of Nias",
      date: "10 Jul 2026",
      price: "Rp 950.000",
      status: "SEDANG DIPROSES",
      statusColor: "text-[#3ca9d2] bg-[#3ca9d2]/10",
      image: "/gambar/seksi%204/nias.jpg",
      size: "50ml",
      qty: 1,
      statusKey: "processing",
    },
  ];

  const [activeFilter, setActiveFilter] = useState<"all" | OrderStatus>("all");
  const displayedOrders = orders.length > 0 ? orders : dummyOrders;

  const counts = useMemo(
    () => ({
      all: displayedOrders.length,
      pending: displayedOrders.filter(
        (order) => order.statusKey === "pending",
      ).length,
      processing: displayedOrders.filter(
        (order) => order.statusKey === "processing",
      ).length,
      shipping: displayedOrders.filter(
        (order) => order.statusKey === "shipping",
      ).length,
      completed: displayedOrders.filter(
        (order) => order.statusKey === "completed",
      ).length,
    }),
    [displayedOrders],
  );

  const filteredOrders =
    activeFilter === "all"
      ? displayedOrders
      : displayedOrders.filter((order) => order.statusKey === activeFilter);

  const tabs: Array<{
    key: "all" | OrderStatus;
    label: string;
  }> = [
    { key: "all", label: "SEMUA" },
    { key: "pending", label: "MENUNGGU" },
    { key: "processing", label: "DIPROSES" },
    { key: "shipping", label: "DIKIRIM" },
    { key: "completed", label: "SELESAI" },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const statusIcon = (status: OrderStatus | undefined) => {
    if (status === "completed") return <CheckCircle2 size={12} />;
    if (status === "shipping") return <Truck size={12} />;
    return <Box size={12} />;
  };
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
          className="flex h-[50px] shrink-0 overflow-x-auto border-b border-[#c9a84c]/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`relative flex h-full min-w-max flex-1 items-center justify-center gap-2 px-4 text-[8px] font-bold tracking-[3px] transition-colors sm:px-6 sm:text-[9px] ${
                activeFilter === tab.key
                  ? "text-[#f8c56c]"
                  : "text-[#c9b99a]/35 hover:text-[#c9b99a]/70"
              }`}
            >
              {tab.label}
              {counts[tab.key] > 0 && (
                <span
                  className={`flex h-[18px] min-w-[18px] items-center justify-center px-1 text-[9px] tracking-normal ${
                    activeFilter === tab.key
                      ? "bg-[#f8c56c] text-[#012f2b]"
                      : "bg-[#c9a84c]/15 text-[#c9a84c]/55"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              )}
              {activeFilter === tab.key && (
                <span className="absolute inset-x-1 bottom-0 h-[2px] bg-[#f8c56c] sm:inset-x-3" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-3 overflow-y-auto p-3 [scrollbar-width:none] sm:p-5 [&::-webkit-scrollbar]:hidden">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <article
                key={`${order.id}-${order.name}`}
                className="relative flex min-h-[132px] gap-3 border border-[#c9a84c]/15 p-3 transition-colors hover:border-[#c9a84c]/35 sm:min-h-[142px] sm:gap-5 sm:p-4"
              >
                <div className="relative h-[92px] w-[82px] shrink-0 overflow-hidden bg-black/20 sm:h-[108px] sm:w-[108px]">
                  {order.image ? (
                    <Image
                      src={order.image}
                      alt={order.name}
                      fill
                      sizes="(max-width: 639px) 82px, 108px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Box size={24} className="text-[#c9a84c]/30" />
                    </div>
                  )}
                  <span className="absolute left-0 top-0 z-10 flex h-4 min-w-4 items-center justify-center bg-[#f6d77c] px-1 font-montserrat text-[8px] font-bold text-[#183b34]">
                    {order.qty || index + 1}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-montserrat text-[8px] tracking-[3px] text-[#f8c56c]/85 sm:text-[9px]">
                        {order.id}
                      </p>
                      <h3 className="mt-3 truncate font-gilland text-[17px] leading-none text-[#f8c56c] sm:text-[20px]">
                        {order.name}
                      </h3>
                      <p className="mt-2 text-[9px] leading-none text-[#c9b99a]/35 sm:text-[10px]">
                        {order.size} · Qty {order.qty} · {order.date}
                      </p>
                    </div>

                    <span
                      className={`hidden shrink-0 items-center gap-1.5 px-3 py-2 font-montserrat text-[8px] font-semibold tracking-[1.5px] sm:flex ${order.statusColor}`}
                    >
                      {statusIcon(order.statusKey)}
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-2">
                    <span className="font-gilland text-[17px] leading-none text-[#f8c56c] sm:text-[19px]">
                      {order.price}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-2 font-montserrat text-[8px] tracking-[2px] text-[#c9b99a]/30 transition-colors hover:text-[#f8c56c]"
                    >
                      DETAIL <ChevronDown size={12} />
                    </button>
                  </div>

                  <span
                    className={`mt-3 flex w-fit items-center gap-1.5 px-2 py-1 font-montserrat text-[7px] font-semibold tracking-[1px] sm:hidden ${order.statusColor}`}
                  >
                    {statusIcon(order.statusKey)}
                    {order.status}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-[#c9a84c]/30">
              <ShoppingBag size={42} className="mb-4" />
              <p className="font-gilland text-[17px]">Belum ada pesanan.</p>
            </div>
          )}
        </div>

        <footer className="flex h-[54px] shrink-0 items-center justify-between border-t border-[#c9a84c]/10 px-5 text-[9px] text-[#c9b99a]/70 sm:px-7 sm:text-[10px]">
          <span>{displayedOrders.length} pesanan total</span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 font-montserrat text-[8px] tracking-[2.5px] text-[#f8c56c] transition-opacity hover:opacity-75 sm:text-[9px]"
          >
            <ShoppingBag size={14} />
            LANJUT BELANJA
          </button>
        </footer>
      </section>
    </div>
  );
};

export default OrdersModal;
