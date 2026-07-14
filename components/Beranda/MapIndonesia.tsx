import React from "react";

export default function MapIndonesiaPage() {
  // Fungsi helper agar styling tidak berulang-ulang
  // Menggunakan mask-image untuk mewarnai PNG transparan menjadi warna solid #1e6055
  const islandStyle = (
    src: string,
    left: string | number,
    top: string | number,
    width: string | number,
    height: string | number
  ): React.CSSProperties => ({
    position: "absolute" as React.CSSProperties["position"],
    left: left,
    top: top,
    width: width,
    height: height,
    backgroundColor: "#1e6055", // Warna yang diminta untuk semua pulau
    WebkitMaskImage: `url('${src}')`,
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskImage: `url('${src}')`,
    maskSize: "contain",
    maskRepeat: "no-repeat",
  });

  return (
    // Wrapper utama halaman agar peta berada di tengah (Center)
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a", // Background gelap agar peta lebih menonjol
        overflow: "hidden", // Mencegah scroll yang tidak perlu
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "950px",
          height: "343px",
          margin: "0 auto",
          // backgroundColor: "#f5f5f5", // (Opsional) Nyalakan jika ingin melihat batas canvas 950x343
        }}
      >
        {/* 
          PULAU BESAR 
          * Sesuaikan path '/gambar/map/' dengan lokasi folder gambar Anda di public/
        */}
        <div style={islandStyle("/gambar/map/sumatera.svg", "10px", "-10px", "290px", "290px")} />
        <div style={islandStyle("/gambar/map/kalimantan.svg", "310px", "20px", "240px", "230px")} />
        <div style={islandStyle("/gambar/map/jawa.svg", "285px", "255px", "310px", "90px")} />
        <div style={islandStyle("/gambar/map/sulawesi.svg", "540px", "90px", "180px", "180px")} />
        <div style={islandStyle("/gambar/map/papua.svg", "725px", "125px", "250px", "218px")} />

        {/* 
          PULAU KECIL (Nias, Buton, Sumba, Komodo/Alor) 
        */}
        {/* 1.svg (Asumsi: Nias, di sebelah kiri Sumatera) */}
        <div style={islandStyle("/gambar/map/1.svg", "45px", "95px", "20px", "30px")} />

        {/* 2.svg (Asumsi: Buton, di kaki kanan bawah Sulawesi) */}
        <div style={islandStyle("/gambar/map/2.svg", "630px", "230px", "25px", "35px")} />

        {/* 6.svg (Asumsi: Sumba, di bagian selatan tengah) */}
        <div style={islandStyle("/gambar/map/sumba.svg", "610px", "320px", "55px", "30px")} />

        {/* 8.svg (Asumsi: Komodo, di sebelah timur Sumba/NTT) */}
        <div style={islandStyle("/gambar/map/komodo.svg", "635px", "285px", "45px", "25px")} />
      </div>
    </main>
  );
}