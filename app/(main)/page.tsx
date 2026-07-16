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

export default function Home() {
  return (
    <div>
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

      <FAQPage />

      <Subscribe />
    </div>
  );
}
