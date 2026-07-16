"use client";

import HeroSection from "@/components/Beranda/HeroSection";
import SecondSection from "@/components/Beranda/SecondSection";
import AboutContentmargin from "@/components/Beranda/ThirdSection";
import FourthSection from "@/components/Beranda/FourthSection";
import FifthSection from "@/components/Beranda/FifthSection";
import SixthSection from "@/components/Beranda/SixthSection";
import SeventhSection from "@/components/Beranda/SeventhSection";
import EightSection from "@/components/Beranda/EightSection";
import FAQPage from "@/components/Beranda/FaqPage";

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

      <EightSection />

      {/* <MapIndonesiaPage /> */}
    </div>
  );
}
