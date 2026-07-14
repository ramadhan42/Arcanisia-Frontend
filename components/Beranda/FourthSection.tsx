import React from 'react';
import Image from 'next/image';

const FourthSection = () => {
  // Disimpan sebagai variabel agar mudah digunakan kembali pada teks dan tombol
  const goldGradient = "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  return (
    // Gunakan background gelap (misal: bg-[#0a0a0a]) agar teks berwarna emas dan terang lebih menonjol.
    // Sesuaikan warna background section dengan tema utama Arcanisia Anda.
    <section className="flex flex-col items-center w-full py-20 bg-[#0a0a0a]">
      
      {/* 1. Teks "THE COLLECTION" */}
      <p
        className="text-[10px] text-[#F5EDD6] font-medium tracking-widest mb-3 uppercase"
        style={{ fontFamily: "'Grazie mille', serif" }}
      >
        THE COLLECTION
      </p>

      {/* 2. Teks "Six Islands, Six Stories" */}
      <h2
        className="text-[35px] font-normal text-transparent bg-clip-text text-center mb-6"
        style={{ backgroundImage: goldGradient, fontFamily: "'Gilland', sans-serif" }}
      >
        Six Islands, Six Stories
      </h2>

      {/* 3. Gambar Ornamen SVG */}
      <div className="relative w-[213px] h-[17px] mb-6">
        <Image
          src="/gambar/seksi%204/ornamen.svg"
          alt="Ornament line"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* 4. Teks Deskripsi Panjang */}
      <p
        className="text-[14px] text-[#C9B99A] text-center max-w-[650px] leading-relaxed mb-16 px-4"
        style={{ fontFamily: "'Grazie mille', serif", fontWeight: 'normal' }}
      >
        Each fragrance is an olfactory journey through the soul of the Indonesian archipelago — six islands, six stories, one nation breathed into being.
      </p>

      {/* 5. Grid Produk (Diset 3 kolom untuk desktop, 1 untuk mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Card Produk 1 */}
        <div className="w-[325px] h-[427px] flex flex-col overflow-hidden bg-transparent border border-[#2a2a2a] rounded-sm">
          
          {/* Bagian Atas: Gambar Produk */}
          <div className="relative w-full h-[240px]">
            <Image
              src="/gambar/seksi%204/button.jpg"
              alt="Secret of Buton"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 325px"
            />
          </div>

          {/* Bagian Bawah: Informasi Produk */}
          <div className="flex flex-col items-center justify-center flex-1 p-5 text-center">
            
            {/* Title Paling Atas */}
            <p
              className="text-[10px] font-medium tracking-wider mb-3"
              style={{ color: '#C9B99AB2', fontFamily: "'Grazie mille', serif" }}
            >
              BUTON ISLAND · SOUTHEAST SULAWESI
            </p>

            {/* Nama Produk dengan Gradient */}
            <h3
              className="text-[20px] font-normal text-transparent bg-clip-text mb-4"
              style={{ backgroundImage: goldGradient, fontFamily: "'Gilland', sans-serif" }}
            >
              Secret of Buton
            </h3>

            {/* Ukuran Parfum */}
            <p className="text-[10px] text-[#F5EDD6] mb-2 tracking-wide">
              15 ml Parfum
            </p>

            {/* Harga */}
            <p
              className="text-[16px] text-[#F8C56C] font-normal"
              style={{ fontFamily: "'Gilland', sans-serif" }}
            >
              Rp 300.000
            </p>
          </div>
        </div>

        {/* Space kosong untuk 5 produk lainnya agar grid-nya rapi */}
        {/* Anda tinggal men-duplikat card di atas saat datanya sudah siap */}
      </div>

      {/* 6. Tombol "VIEW COMPLETE COLLECTION" */}
      <button
        className="w-[260px] h-[40px] flex items-center justify-center gap-3 text-[14px] text-[#124B46] rounded-sm hover:opacity-90 transition-opacity"
        style={{ background: goldGradient, fontWeight: 'bold' }}
      >
        VIEW COMPLETE COLLECTION
        {/* Panah Kanan SVG */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>

    </section>
  );
};

export default FourthSection;