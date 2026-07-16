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

      <About />

      <Collections />

      <Missions />

      <Honesty />

      <MapSection />

      <FAQPage />

      <Subscribe />
    </div>
  );
}
