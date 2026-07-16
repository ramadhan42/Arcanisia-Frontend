import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Icon Checkmark untuk menggantikan gambar yang hilang
const CheckCircleIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#f8c56c]"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

interface ConfirmationModalProps {
  product: any;
  orderId: string;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  product,
  orderId,
  onClose,
}) => {
  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-[915px] bg-[#012421] text-[#c9b99a] font-graziemille shadow-2xl flex flex-col items-center relative"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between px-8 py-6 border-b border-[#c9a84c]/15">
        <span className="text-[10px] tracking-[4px] uppercase">
          PESANAN DIKONFIRMASI
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center border border-[#c9b99a]/30 hover:bg-white/10 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Konten Utama */}
      <div className="w-full px-8 py-16 flex flex-col items-center text-center">
        {/* Icon Sukses */}
        <div className="mb-6">
          <CheckCircleIcon />
        </div>

        {/* Judul */}
        <h2
          className="text-[40px] font-gilland bg-clip-text text-transparent mb-4"
          style={{ backgroundImage: goldGradient }}
        >
          Terima Kasih, Rama
        </h2>

        {/* Deskripsi */}
        <p className="text-[14px] leading-relaxed max-w-[500px] mb-6">
          Pesanan Anda telah kami terima. Kami akan segera memproses pengiriman
          <span className="font-gilland text-[#f8c56c] mx-1">
            {product.name}
          </span>{" "}
          ke alamat Anda.
        </p>

        {/* No Pesanan */}
        <p className="text-[10px] tracking-[3px] text-[#f8c56c] mb-12">
          NO. PESANAN: {orderId}
        </p>

        {/* Card Produk */}
        <div className="w-full max-w-[500px] border border-[#c9a84c]/30 bg-[#03221d] p-4 flex items-center gap-6 text-left mb-12">
          <div className="relative w-[150px] h-[85px] shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[2px] text-[#c9b99a]/50 uppercase">
              {product.topTitle}
            </p>
            <h4
              className="text-[18px] font-gilland bg-clip-text text-transparent"
              style={{ backgroundImage: goldGradient }}
            >
              {product.name}
            </h4>
            <p className="text-[12px] text-[#c9b99a]/60">
              {product.size || "15 ml Parfum"}
            </p>
          </div>
        </div>

        {/* Tombol Beranda */}
        <button
          onClick={onClose}
          className="px-12 py-4 text-[#091812] font-bold text-[10px] tracking-[3px] hover:opacity-90 transition-opacity"
          style={{ background: goldGradient }}
        >
          KEMBALI KE BERANDA
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmationModal;
