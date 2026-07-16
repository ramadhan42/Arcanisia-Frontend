import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react"; // Menggunakan module icon

interface CheckoutModalProps {
  product: any;
  onClose: () => void;
  onConfirm: (customerName: string) => void; // Menerima parameter nama customer
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  onClose,
  onConfirm,
}) => {
  // State untuk metode pembayaran terpilih
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  // State untuk menangkap input nama lengkap dari user
  const [customerName, setCustomerName] = useState("");

  if (!product) return null;

  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  // Format harga (contoh: "Rp 890.000")
  const formattedPrice = product.price || "Rp 890.000";

  return (
    <div
      className="flex flex-col w-full max-w-[920px] h-auto md:h-[650px] overflow-hidden rounded-md text-[#c9b99a] font-graziemille shadow-2xl"
      style={{ backgroundColor: product.bgColor || "#012421" }}
    >
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a84c]/15">
        <button
          onClick={onClose}
          className="flex items-center gap-2 hover:text-[#f8c56c] transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-[12px] tracking-[2px]">KEMBALI</span>
        </button>
        <div className="text-[14px] tracking-[4px]">CHECKOUT</div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center border border-[#c9b99a]/50 hover:bg-white/10 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* --- KONTEN UTAMA (GRID 2 KOLOM) --- */}
      <div className="flex flex-col md:flex-row h-full overflow-y-auto">
        {/* KOLOM KIRI: Ringkasan Pesanan */}
        <div className="w-full md:w-[380px] p-8 border-r border-[#c9a84c]/10 flex flex-col">
          <h3 className="text-[12px] tracking-[3px] mb-6">RINGKASAN PESANAN</h3>

          {/* Card Produk Terpilih */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-8 relative"
          >
            <div className="w-[120px] h-[75px] relative rounded-sm overflow-hidden shrink-0">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
              {/* Badge quantity */}
              <div
                className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-[#091812] text-[10px] font-bold"
                style={{ background: goldGradient }}
              >
                1
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] tracking-[2px] text-[#c9b99a]/50 uppercase">
                {product.topTitle}
              </p>
              <h4
                className="text-[18px] font-gilland bg-clip-text text-transparent"
                style={{ backgroundImage: goldGradient }}
              >
                {product.name}
              </h4>
              <p className="text-[12px] text-[#c9b99a]/60 mt-1">
                {product.size || "15 ml Parfum"}
              </p>
            </div>
          </motion.div>

          {/* Rincian Harga */}
          <div className="border-t border-[#c9a84c]/10 pt-6 mb-6 flex flex-col gap-4 text-[14px] text-[#c9b99a]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formattedPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Kirim</span>
              <span className="text-[#f8c56c]">GRATIS</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-[#c9a84c]/20 pt-6 mb-8 flex justify-between items-center text-[#f5edd6]">
            <span className="text-[14px] tracking-[2px]">TOTAL</span>
            <span className="text-[24px] font-gilland text-[#f8c56c]">
              {formattedPrice}
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-[#c9b99a]/40 mt-auto">
            Pengiriman menggunakan kemasan premium Arcanisia. Estimasi tiba 2–4
            hari kerja.
          </p>
        </div>

        {/* KOLOM KANAN: Form Checkout */}
        <div className="flex-1 p-8 overflow-y-auto bg-black/10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* INFORMASI KONTAK */}
          <h3 className="text-[12px] tracking-[3px] mb-5">INFORMASI KONTAK</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 mb-8"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                NAMA LENGKAP
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)} // Mengubah state berdasarkan input
                placeholder="Masukkan nama lengkap"
                className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                NOMOR TELEPON
              </label>
              <input
                type="tel"
                placeholder="+62 812 xxxx xxxx"
                className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
          </motion.div>

          {/* ALAMAT PENGIRIMAN */}
          <h3 className="text-[12px] tracking-[3px] mb-5">ALAMAT PENGIRIMAN</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 mb-8"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                ALAMAT LENGKAP
              </label>
              <input
                type="text"
                placeholder="Jl. Sudirman No. xx, RT/RW"
                className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                  KOTA / KABUPATEN
                </label>
                <input
                  type="text"
                  placeholder="Jakarta"
                  className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                  KODE POS
                </label>
                <input
                  type="text"
                  placeholder="12190"
                  className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-[#c9b99a]/50">
                PROVINSI
              </label>
              <select className="bg-[#011e1b]/50 border border-[#c9a84c]/20 px-4 py-3 text-[12px] text-[#c9b99a] outline-none focus:border-[#c9a84c]/60 appearance-none transition-colors">
                <option value="dki">DKI Jakarta</option>
                <option value="jabar">Jawa Barat</option>
                <option value="jateng">Jawa Tengah</option>
                <option value="jatim">Jawa Timur</option>
                <option value="bali">Bali</option>
              </select>
            </div>
          </motion.div>

          {/* METODE PEMBAYARAN */}
          <h3 className="text-[12px] tracking-[3px] mb-5">METODE PEMBAYARAN</h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3 mb-8 text-[#f5edd6]"
          >
            {/* Option 1 */}
            <div
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`flex items-start p-4 gap-4 border cursor-pointer transition-all ${paymentMethod === "bank_transfer" ? "bg-[#c9a84c]/10 border-[#c9a84c]/60" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"}`}
            >
              <div
                className={`mt-1 w-[14px] h-[14px] rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === "bank_transfer" ? "border-[#f8c56c]" : "border-[#c9a84c]/30"}`}
              >
                {paymentMethod === "bank_transfer" && (
                  <div className="w-[7px] h-[7px] bg-[#f8c56c] rounded-full" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px]">Bank Transfer</span>
                <span className="text-[11px] text-[#c9b99a]/50">
                  BCA · BNI · Mandiri · BRI
                </span>
              </div>
            </div>

            {/* Option 2 */}
            <div
              onClick={() => setPaymentMethod("qris")}
              className={`flex items-start p-4 gap-4 border cursor-pointer transition-all ${paymentMethod === "qris" ? "bg-[#c9a84c]/10 border-[#c9a84c]/60" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"}`}
            >
              <div
                className={`mt-1 w-[14px] h-[14px] rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === "qris" ? "border-[#f8c56c]" : "border-[#c9a84c]/30"}`}
              >
                {paymentMethod === "qris" && (
                  <div className="w-[7px] h-[7px] bg-[#f8c56c] rounded-full" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px]">QRIS</span>
                <span className="text-[11px] text-[#c9b99a]/50">
                  GoPay · OVO · Dana · LinkAja
                </span>
              </div>
            </div>

            {/* Option 3 */}
            <div
              onClick={() => setPaymentMethod("card")}
              className={`flex items-start p-4 gap-4 border cursor-pointer transition-all ${paymentMethod === "card" ? "bg-[#c9a84c]/10 border-[#c9a84c]/60" : "border-[#c9a84c]/15 hover:border-[#c9a84c]/40"}`}
            >
              <div
                className={`mt-1 w-[14px] h-[14px] rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === "card" ? "border-[#f8c56c]" : "border-[#c9a84c]/30"}`}
              >
                {paymentMethod === "card" && (
                  <div className="w-[7px] h-[7px] bg-[#f8c56c] rounded-full" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px]">Kartu Kredit / Debit</span>
                <span className="text-[11px] text-[#c9b99a]/50">
                  Visa · Mastercard
                </span>
              </div>
            </div>
          </motion.div>

          {/* TOMBOL KONFIRMASI */}
          <motion.button
            onClick={() => onConfirm(customerName)} // Mengirim data customerName saat diklik
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 flex items-center justify-center text-[#091812] font-bold text-[10px] tracking-[3px] mb-4"
            style={{ background: goldGradient }}
          >
            KONFIRMASI PESANAN
          </motion.button>

          <p className="text-center text-[9px] text-[#c9b99a]/30">
            Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan Arcanisia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
