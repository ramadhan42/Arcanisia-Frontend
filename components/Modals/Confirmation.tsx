import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, X, Package } from "lucide-react";
import type { Order } from "@/types/api";

interface ConfirmationModalProps {
  order: Order;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  // Gunakan nama "Customer" jika input nama kosong
  const firstItem = order.items[0];
  const displayName = order.customer_name?.trim() || "Customer";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      // Background disesuaikan dengan warna produk
      // Ukuran diperkecil 10%: max-w jadi 900px dan tinggi di desktop jadi 630px
      className="w-full max-w-[900px] min-h-[100vh] md:min-h-0 md:h-[630px] md:rounded-md text-[#c9b99a] font-graziemille shadow-2xl flex flex-col items-center relative overflow-hidden"
      style={{ backgroundColor: "#012421" }}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between px-8 py-5 border-b border-[#c9a84c]/15">
        <span className="text-[11px] tracking-[4px] uppercase text-[#c9b99a]">
          PESANAN DIKONFIRMASI
        </span>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center border border-[#c9a84c]/30 hover:bg-white/10 transition-colors"
        >
          <X size={16} className="text-[#c9a84c]" />
        </button>
      </div>

      {/* Konten Utama */}
      <div className="w-full flex-1 px-8 py-10 flex flex-col items-center justify-center text-center overflow-y-auto">
        {/* Icon Sukses */}
        <div className="mb-5 text-[#d4af37]">
          <CheckCircle size={64} strokeWidth={1} />
        </div>

        {/* Judul dengan Nama Dinamis */}
        <h2
          className="text-[42px] font-gilland bg-clip-text text-transparent mb-3 leading-tight"
          style={{ backgroundImage: goldGradient }}
        >
          Terima Kasih, {displayName}
        </h2>

        {/* Deskripsi */}
        <p className="text-[14px] text-[#c9b99a]/80 leading-relaxed max-w-[550px] mb-6 font-light">
          Pesanan Anda telah kami terima. Status pembayaran saat ini{" "}
          <span className="font-gilland text-[#d4af37] mx-1 font-normal text-[16px]">
            {order.payment?.status ?? "pending"}
          </span>
          . Pesanan akan diproses sesuai status pembayaran di sistem.
        </p>

        {/* No Pesanan */}
        <p className="text-[11px] tracking-[3px] text-[#d4af37] mb-8 uppercase">
          NO. PESANAN: {order.order_number}
        </p>

        {/* Card Produk (Diperkecil sedikit secara proporsional) */}
        <div className="w-full max-w-[450px] border border-[#c9a84c]/30 bg-transparent flex items-stretch text-left mb-10 h-[115px]">
          {/* Sisi Kiri: Gambar Produk */}
          <div className="relative w-[180px] h-full shrink-0 bg-black/10 flex items-center justify-center">
            {firstItem?.product_image ? (
              <Image
                src={firstItem.product_image}
                alt={firstItem.product_name || "Product image"}
                fill
                className="object-cover"
              />
            ) : (
              // Fallback Icon jika gambar hilang
              <Package size={28} className="text-[#c9b99a]/40" />
            )}
          </div>

          {/* Sisi Kanan: Detail Produk */}
          <div className="flex flex-col justify-center p-5 flex-1">
            <p className="text-[9px] tracking-[3px] text-[#c9b99a]/60 uppercase mb-1">
              {order.items.length} ITEM · {order.payment_method.replace("_", " ")}
            </p>
            <h4
              className="text-[18px] font-gilland bg-clip-text text-transparent mb-1"
              style={{ backgroundImage: goldGradient }}
            >
              {firstItem?.product_name || "Pesanan Arcanisia"}
            </h4>
            <p className="text-[12px] text-[#c9b99a]/60">
              {firstItem?.product_size || "Arcanisia"} · {order.total}
            </p>
          </div>
        </div>

        {/* Tombol Beranda */}
        <button
          onClick={onClose}
          className="px-10 py-3.5 text-[#091812] font-bold text-[11px] tracking-[3px] hover:opacity-90 transition-opacity"
          style={{ background: goldGradient }}
        >
          KEMBALI KE BERANDA
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmationModal;
