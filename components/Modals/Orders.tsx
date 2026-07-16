"use client";
import React from "react";
import Image from "next/image";
import { X, Package, ChevronRight, ShoppingBag } from "lucide-react";

// 1. Definisikan tipe untuk Order
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
}

// 2. Definisikan tipe untuk Props Modal
interface OrdersModalProps {
  onClose: () => void;
  orders?: Order[]; // Optional, agar tidak error jika tidak ada data
}

// 3. Gunakan tipe tersebut pada komponen
const OrdersModal: React.FC<OrdersModalProps> = ({ onClose, orders = [] }) => {
  // Data dummy diletakkan di dalam atau di luar komponen
  const dummyOrders: Order[] = [
    {
      id: "ARC-847213",
      name: "Emerald of Borneo",
      date: "10 Jul 2026",
      price: "Rp 950.000",
      status: "SELESAI",
      statusColor: "text-[#7dcfb6] bg-[#7dcfb6]/10",
      image: "", // Placeholder akan aktif
      size: "50ml",
      qty: 1,
    },
    {
      id: "ARC-612904",
      name: "Whisper of Raja Ampat",
      date: "3 Jul 2026",
      price: "Rp 1.536.400",
      status: "DALAM PENGIRIMAN",
      statusColor: "text-[#4a9eda] bg-[#4a9eda]/10",
      image: "",
      size: "100ml",
      qty: 1,
    },
    {
      id: "ARC-501337",
      name: "Glow of Borobudur",
      date: "28 Jun 2026",
      price: "Rp 1.207.200",
      status: "SEDANG DIPROSES",
      statusColor: "text-[#c9a84c] bg-[#c9a84c]/10",
      image: "",
      size: "30ml",
      qty: 2,
    },
    // ... data lainnya
  ];
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Container: 80% Desktop View */}
      <div className="w-full max-w-[900px] h-[80vh] bg-[#0d1f16] flex flex-col text-[#c9b99a] shadow-2xl rounded-md overflow-hidden font-montserrat border border-[#c9a84c]/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#c9a84c]/15">
          <div>
            <p className="text-[9px] tracking-[4px] uppercase text-[#c9a84c]/50">
              AKUN SAYA
            </p>
            <h2 className="text-[24px] font-gilland text-[#f5edd6] mt-1">
              Pesanan Saya
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#c9a84c]/25 hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* List Pesanan Dinamis */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 space-y-4">
          {dummyOrders.length > 0 ? (
            dummyOrders.map((order) => (
              <div
                key={order.id}
                className="border border-[#c9a84c]/15 p-4 flex gap-4 hover:border-[#c9a84c]/30 transition-all"
              >
                {/* Gambar Produk atau Icon */}
                <div className="w-[64px] h-[80px] bg-black/20 flex items-center justify-center shrink-0 border border-[#c9a84c]/10">
                  {order.image ? (
                    <Image
                      src={order.image}
                      alt={order.name}
                      width={64}
                      height={80}
                      className="object-cover"
                    />
                  ) : (
                    <Package size={24} className="text-[#c9a84c]/30" />
                  )}
                </div>

                {/* Informasi Order */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-[2px] text-[#c9b99a]/60">
                      {order.id}
                    </span>
                    <span
                      className={`px-2 py-1 text-[8px] font-bold tracking-[1px] uppercase ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-gilland text-[18px] text-[#f5edd6]">
                      {order.name}
                    </h4>
                    <p className="text-[10px] text-[#c9b99a]/50 mt-0.5">
                      {order.size} · Qty {order.qty} · {order.date}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[16px] font-gilland text-[#c9a84c]">
                      {order.price}
                    </span>
                    <button className="flex items-center gap-1 text-[9px] tracking-[1px] text-[#c9b99a]/40 hover:text-[#c9a84c] transition-colors">
                      DETAIL <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[#c9a84c]/30">
              <ShoppingBag size={48} className="mb-4" />
              <p className="font-gilland text-[18px]">Belum ada pesanan.</p>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-[#c9a84c]/10 flex justify-between items-center text-[10px] text-[#c9b99a]/40">
          <span>{dummyOrders.length} pesanan total</span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors uppercase tracking-[1px]"
          >
            Lanjut Belanja <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
