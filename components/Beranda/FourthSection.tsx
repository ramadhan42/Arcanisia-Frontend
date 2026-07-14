import React from 'react';
import Image from 'next/image';

// 1. Data Sementara (MOCK DATA)
const productsData = [
  {
    id: 1,
    image: "/gambar/seksi%204/button.jpg",
    topTitle: "BUTTON ISLAND - SOUTHEAST SULAWESI",
    name: "Secret of Button",
    bgColor: "#134b46",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  },
  {
    id: 2,
    image: "/gambar/seksi%204/sumba.jpg",
    topTitle: "SUMBA ISLAND · EAST NUSA TENGGARA",
    name: "Reverie of Sumba",
    bgColor: "#994121",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  },
  {
    id: 3,
    image: "/gambar/seksi%204/nias.jpg",
    topTitle: "NIAS ISLAND · NORTH SUMATRA",
    name: "Charm of Nias",
    bgColor: "#A71F24",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  },
  {
    id: 4,
    image: "/gambar/seksi%204/komodo.jpg",
    topTitle: "KOMODO ISLAND · EAST NUSA TENGGARA",
    name: "Apex of Komodo",
    bgColor: "#333333",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  },
  {
    id: 5,
    image: "/gambar/seksi%204/alor.jpg",
    topTitle: "ALOR ISLAND · EAST NUSA TENGGARA",
    name: "Breeze of Alor",
    bgColor: "#193B63",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  },
  {
    id: 6,
    image: "/gambar/seksi%204/papua.jpg",
    topTitle: "PAPUA ISLAND · NORTH OF AUSTRALIA",
    name: "Warmth of Papua",
    bgColor: "#3F281B",
    size: "15 ml Parfum",
    price: "Rp 300.000",
  }
];

const FourthSection = () => {
  const goldGradient = "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

  return (
    <section className="flex flex-col items-center w-full py-20 bg-[#0a0a0a]">
      
      {/* Teks "THE COLLECTION" */}
      <p
        className="text-[10px] text-[#F5EDD6] font-medium tracking-widest mb-3 uppercase"
        style={{ fontFamily: "'Grazie mille', serif" }}
      >
        THE COLLECTION
      </p>

      {/* Teks "Six Islands, Six Stories" */}
      <h2
        className="text-[35px] font-normal text-transparent bg-clip-text text-center mb-6"
        style={{ backgroundImage: goldGradient, fontFamily: "'Gilland', sans-serif" }}
      >
        Six Islands, Six Stories
      </h2>

      {/* Gambar Ornamen SVG */}
      <div className="relative w-[213px] h-[17px] mb-6">
        <Image
          src="/gambar/seksi%204/ornamen.svg"
          alt="Ornament line"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Teks Deskripsi Panjang */}
      <p
        className="text-[14px] text-[#C9B99A] text-center max-w-[650px] leading-relaxed mb-16 px-4"
        style={{ fontFamily: "'Grazie mille', serif", fontWeight: 'normal' }}
      >
        Each fragrance is an olfactory journey through the soul of the Indonesian archipelago — six islands, six stories, one nation breathed into being.
      </p>

      {/* Grid Produk - 3 Kolom per baris untuk Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto px-4">
        
        {/* Render Card secara Dinamis */}
        {productsData.map((product) => (
          <div 
            key={product.id} 
            className="w-full md:w-[325px] h-auto flex flex-col overflow-hidden rounded-sm border border-[#2a2a2a]"
            style={{ backgroundColor: product.bgColor }} // Menggunakan warna dinamis dari data
          >
            
            {/* Bagian Atas: Gambar Produk */}
            <div className="relative w-full h-[240px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 325px"
              />
            </div>

            {/* Bagian Bawah: Informasi Produk */}
            <div className="flex flex-col flex-1 p-5 text-left justify-between">
              <div>
                {/* Title Paling Atas */}
                <p
                  className="text-[10px] font-medium tracking-wider mb-2 uppercase"
                  style={{ color: '#C9B99AB2', fontFamily: "'Grazie mille', serif" }}
                >
                  {product.topTitle}
                </p>

                {/* Nama Produk dengan Gradient */}
                <h3
                  className="text-[20px] font-normal text-transparent bg-clip-text mb-2"
                  style={{ backgroundImage: goldGradient, fontFamily: "'Gilland', sans-serif" }}
                >
                  {product.name}
                </h3>

                {/* Ukuran Parfum */}
                <p className="text-[10px] text-[#F5EDD6] mb-6 tracking-wide">
                  {product.size}
                </p>
              </div>

              {/* Flex Container untuk Harga & Button Discover */}
              <div className="flex flex-row items-center justify-between mt-auto">
                {/* Harga */}
                <p
                  className="text-[16px] text-[#F8C56C] font-normal"
                  style={{ fontFamily: "'Gilland', sans-serif" }}
                >
                  {product.price}
                </p>

                {/* Tombol DISCOVER */}
                <button 
                  className="flex flex-row items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ color: '#F5EDD6CC', fontFamily: "'Grazie mille', serif", fontSize: '12px', fontWeight: '500' }}
                >
                  DISCOVER
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol "VIEW COMPLETE COLLECTION" */}
      <button
        className="w-[260px] h-[40px] flex items-center justify-center gap-3 text-[12px] text-[#124B46] rounded-sm hover:opacity-90 transition-opacity"
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