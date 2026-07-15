"use client";

import HeroSection from "@/components/Beranda/HeroSection";
import SecondSection from "@/components/Beranda/SecondSection";
import AboutContentmargin from "@/components/Beranda/ThirdSection";
import FourthSection from "@/components/Beranda/FourthSection";
import FifthSection from "@/components/Beranda/FifthSection";
import SixthSection from "@/components/Beranda/SixthSection";
import EigthSection from "@/components/Beranda/EigthSection";
import SeventhSection from "@/components/Beranda/SeventhSection";
import MapIndonesiaPage from "@/components/Beranda/MapIndonesia";
import FAQPage from "@/components/Beranda/FaqPage";
// import MissionSection from "@/components/Beranda/FifthSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <SecondSection />

      <AboutContentmargin />

      <FourthSection />

      <FifthSection />

      <SixthSection />

      <SeventhSection />

      <FAQPage />

      <EigthSection />

      {/* <MapIndonesiaPage /> */}
    </div>
  );
}
