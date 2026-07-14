import type { NextPage } from 'next';
import Image from "next/image";

const MapSection: NextPage = () => {
  return (
    // Section Utama: Lebar 100%, Tinggi minimal 100vh (sepenuh layar), dan konten di-center
    <section 
      style={{ 
        width: "100%", 
        minHeight: "100vh", 
        position: "relative", 
        background: "linear-gradient(180deg, #012421, #071615)", 
        overflow: "hidden", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center", 
        fontSize: "10px", 
        color: "#f5edd6", 
        fontFamily: "Montserrat",
        padding: "40px 20px" // Padding aman untuk atas bawah jika layar terlalu pendek
      }}
    >
      {/* Garis Emas di atas */}
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: "1px", 
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(201, 168, 76, 0.4) 50%, rgba(0, 0, 0, 0))" 
        }} 
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1302px" }}>
        
        {/* --- BAGIAN 1: HEADER (JELAJAH NUSANTARA) --- */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
          <div style={{ letterSpacing: "5px", lineHeight: "15px", fontWeight: "500", marginBottom: "16px" }}>
            JELAJAH NUSANTARA
          </div>
          <div style={{ fontSize: "62px", fontFamily: "Gilland", marginBottom: "20px" }}>
            <div style={{ lineHeight: "74.4px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Six Islands, One Soul
            </div>
          </div>
          {/* Gambar Ornamen */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image 
              src="/gambar/seksi%207/ornamen.svg" 
              style={{ height: "15.3px", width: "213.2px", position: "relative" }} 
              width={213} 
              height={15} 
              sizes="100vw" 
              alt="Ornamen" 
            />
          </div>
        </div>

        {/* --- BAGIAN 2: PETA INDONESIA --- */}
        <div style={{ width: "100%", maxWidth: "950px", height: "344px", position: "relative", marginBottom: "40px", fontSize: "13px", fontFamily: "Gilland" }}>
          {/* Gambar Peta Nias (Asumsi dari komentar Anda) */}
          <Image 
            src="/gambar/seksi%207/map-indonesia.png" 
            style={{ position: "absolute", height: "100%", width: "100%", top: "0", left: "0", objectFit: "contain" }} 
            width={950} 
            height={343} 
            sizes="100vw" 
            alt="Map Indonesia" 
          />
          
          {/* Titik Label Pulau (Menggunakan persentase agar tetap presisi saat di-resize) */}
          <div style={{ position: "absolute", top: "32.26%", left: "0.77%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nias Island</div>
          <div style={{ position: "absolute", top: "93.58%", left: "45.37%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sumba Island</div>
          <div style={{ position: "absolute", top: "74.11%", left: "43.69%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Komodo Island</div>
          <div style={{ position: "absolute", top: "68.59%", left: "60.84%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Buton Island</div>
          <div style={{ position: "absolute", top: "84.86%", left: "66.83%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Alor Island</div>
          <div style={{ position: "absolute", top: "31.1%", left: "91.24%", lineHeight: "26px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Papua Island</div>
        </div>

        {/* --- BAGIAN 3: INFO BOX KOMODO --- */}
        <div style={{ width: "100%", maxWidth: "828.8px", backgroundColor: "#012421", border: "0.4px solid rgba(201, 168, 76, 0.2)", boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", padding: "25.5px", textAlign: "left", fontSize: "5.73px", color: "rgba(201, 185, 154, 0.5)", marginBottom: "40px" }}>
          
          {/* Kolom 1: Region & Titik Emas */}
          <div style={{ width: "230.6px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ letterSpacing: "2.29px", lineHeight: "8.59px" }}>EAST NUSA TENGGARA</div>
            <div style={{ padding: "2.5px 0px 0px", fontSize: "33.1px", fontFamily: "Gilland" }}>
              <div style={{ lineHeight: "36.41px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Komodo</div>
            </div>
            <div style={{ padding: "2.5px 0px 0px", fontSize: "9.55px", color: "#f5edd6", fontFamily: "'Grazie mille'" }}>
              <i style={{ lineHeight: "14.32px" }}>Mystique of Komodo</i>
            </div>
            {/* Indikator Titik */}
            <div style={{ display: "flex", alignItems: "center", padding: "15.3px 0px 0px", gap: "3.8px" }}>
              <div style={{ width: "3.2px", height: "3.2px", borderRadius: "50%", backgroundColor: "#c9a84c", opacity: "0.3" }} />
              <div style={{ width: "3.2px", height: "3.2px", borderRadius: "50%", backgroundColor: "#c9a84c", opacity: "0.3" }} />
              <div style={{ width: "3.2px", height: "3.2px", borderRadius: "50%", backgroundColor: "#c9a84c", opacity: "0.3" }} />
              <div style={{ width: "12.7px", height: "3.2px", borderRadius: "4px", backgroundColor: "#c9a84c" }} />
              <div style={{ width: "3.2px", height: "3.2px", borderRadius: "50%", backgroundColor: "#c9a84c", opacity: "0.3" }} />
              <div style={{ width: "3.2px", height: "3.2px", borderRadius: "50%", backgroundColor: "#c9a84c", opacity: "0.3" }} />
            </div>
          </div>

          {/* Kolom 2: Deskripsi */}
          <div style={{ width: "230.6px", display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: "7.64px", color: "#c9b99a" }}>
            <div style={{ width: "20.4px", height: "0.6px", backgroundColor: "rgba(201, 168, 76, 0.4)" }} />
            <div style={{ padding: "12.7px 0px 0px", lineHeight: "16.04px", fontWeight: "300" }}>
              Volcanic, primal, untamed — the realm of ancient dragons and crystal-clear waters where worlds of fire and sea collide.
            </div>
          </div>

          {/* Kolom 3: Scent Notes */}
          <div style={{ width: "230.6px", display: "flex", flexDirection: "column", alignItems: "flex-start", color: "rgba(201, 168, 76, 0.6)" }}>
            <div style={{ letterSpacing: "2.29px", lineHeight: "8.59px" }}>SCENT NOTES</div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", padding: "10.2px 0px 0px", fontSize: "9.55px", color: "rgba(201, 185, 154, 0.8)", fontFamily: "'Cormorant Garamond'" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "7.6px", marginBottom: "5.1px" }}>
                <div style={{ height: "0.6px", flex: "1", backgroundColor: "rgba(201, 168, 76, 0.15)" }} />
                <i style={{ lineHeight: "14.32px" }}>Wild Grass</i>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7.6px", marginBottom: "5.1px" }}>
                <div style={{ height: "0.6px", flex: "1", backgroundColor: "rgba(201, 168, 76, 0.15)" }} />
                <i style={{ lineHeight: "14.32px" }}>Volcanic Earth</i>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7.6px", marginBottom: "5.1px" }}>
                <div style={{ height: "0.6px", flex: "1", backgroundColor: "rgba(201, 168, 76, 0.15)" }} />
                <i style={{ lineHeight: "14.32px" }}>Warm Musk</i>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7.6px" }}>
                <div style={{ height: "0.6px", flex: "1", backgroundColor: "rgba(201, 168, 76, 0.15)" }} />
                <i style={{ lineHeight: "14.32px" }}>Dried Herbs</i>
              </div>

            </div>
            
            {/* Button Discover */}
            <div style={{ display: "flex", alignItems: "center", padding: "15.3px 0px 0px", gap: "5.1px", fontSize: "6.37px", color: "#c9a84c", cursor: "pointer" }}>
              <div style={{ letterSpacing: "1.59px", lineHeight: "9.55px", fontWeight: "500" }}>DISCOVER FRAGRANCE</div>
              <Image 
                src="/gambar/seksi%207/Icon.svg" 
                style={{ height: "8.3px", width: "8.3px" }} 
                width={8} 
                height={8} 
                sizes="100vw" 
                alt="Arrow Icon" 
              />
            </div>
          </div>
        </div>

        {/* --- BAGIAN 4: BUTTON LIST PULAU --- */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "12px", color: "rgba(201, 185, 154, 0.7)" }}>
          <div style={{ border: "0.7px solid rgba(201, 168, 76, 0.25)", padding: "6px 16px", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>NIAS</div>
          </div>
          <div style={{ border: "0.7px solid rgba(201, 168, 76, 0.25)", padding: "6px 16px", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>BUTON</div>
          </div>
          <div style={{ border: "0.7px solid rgba(201, 168, 76, 0.25)", padding: "6px 16px", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>SUMBA</div>
          </div>
          {/* Active Button */}
          <div style={{ background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", border: "0.7px solid #c9a84c", padding: "6px 16px", color: "#091812", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>KOMODO</div>
          </div>
          <div style={{ border: "0.7px solid rgba(201, 168, 76, 0.25)", padding: "6px 16px", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>ALOR</div>
          </div>
          <div style={{ border: "0.7px solid rgba(201, 168, 76, 0.25)", padding: "6px 16px", cursor: "pointer" }}>
            <div style={{ letterSpacing: "2.4px", lineHeight: "16px", fontWeight: "500" }}>PAPUA</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapSection;