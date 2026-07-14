"use client";

import HeroSection from "@/components/Beranda/HeroSection";
import SecondSection from "@/components/Beranda/SecondSection";
import AboutContentmargin from "@/components/Beranda/ThirdSection";
import NextPage from "@/components/Beranda/FourthSection";
import Image from "next/image";
import FourthSection from "@/components/Beranda/FourthSection";
import PetaIndonesiaPage from "@/components/PetaIndonesiaPage";
// import MissionSection from "@/components/Beranda/FifthSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <SecondSection />

      <AboutContentmargin />

      {/* <PetaIndonesiaPage /> */}

      <FourthSection />

      {/* <NextPage /> */}

      {/* <MissionSection /> */}
    </div>
  );
}
