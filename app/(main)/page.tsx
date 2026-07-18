"use client";

import HeroSection from "@/components/Beranda/HeroSection";
import Rekindling from "@/components/Beranda/Rekindling";
import About from "@/components/Beranda/About";
import Collections from "@/components/Beranda/Collections";
import Missions from "@/components/Beranda/Missions";
import Honesty from "@/components/Beranda/Honesty";
import Subscribe from "@/components/Beranda/Subscribe";
import FAQPage from "@/components/Beranda/FaqPage";
import MapSection from "@/components/Beranda/Islands";
import { useSiteContent } from "@/contexts/SiteContentContext";

export default function Home() {
  const { error } = useSiteContent();
  return (
    <div>
      {error && (
        <div role="status" className="fixed inset-x-0 bottom-0 z-40 bg-[#7d2f37] px-4 py-2 text-center font-graziemille text-xs text-white">
          Konten terbaru belum tersedia. Menampilkan konten cadangan.
        </div>
      )}
      <HeroSection />

      <Rekindling />

      {/* Tambahkan id="about" agar terhubung dengan menu ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* Tambahkan id="collection" agar terhubung dengan menu COLLECTION */}
      <section id="collection">
        <Collections />
      </section>

      {/* Tambahkan id="mission" agar terhubung dengan menu MISSION */}
      <section id="mission">
        <Missions />
      </section>

      {/* Tambahkan id="values" agar terhubung dengan menu VALUES (menggunakan komponen Honesty) */}
      <section id="values">
        <Honesty />
      </section>

      <MapSection />

      <section id="faq">
        <FAQPage />
      </section>

      <section id="contact">
        <Subscribe />
      </section>
    </div>
  );
}
