"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const essenceData = [
  {
    id: 3,
    imgSrc: "/gambar/seksi%206/3.svg",
    topTitle: "AESTHETICS & ART",
    mainTitle: "Estetika & Seni",
    description:
      "Products with strong visual design rooted in inspiration from the artistic heritage and local craftsmanship of Indonesia.",
  },
  {
    id: 4,
    imgSrc: "/gambar/seksi%206/4.svg",
    topTitle: "EDUCATION & AWARENESS",
    mainTitle: "Edukasi & Kesadaran",
    description:
      "Through perfume, Arcanisia highlights Indonesia's cultural richness, and the extraordinary beauty of its visual landscapes.",
  },
  {
    id: 2,
    imgSrc: "/gambar/seksi%206/2.svg",
    topTitle: "SUSTAINABILITY",
    mainTitle: "Keberlanjutan",
    description:
      "Creating products that are environmentally friendly, using materials that can be managed and maintained in a sustainable manner.",
  },
  {
    id: 1,
    imgSrc: "/gambar/seksi%206/1.svg",
    topTitle: "LOCAL PRIDE",
    mainTitle: "Kebanggaan Lokal",
    description:
      "A deep sense of pride for local identity, products, and craftsmanship that reflects the unique values and artistry of each region.",
  },
];

const goldText = {
  background:
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Honesty() {
  return (
    <section className="w-full overflow-hidden bg-[#012421] text-center">
      <header
        className="relative flex h-[86px] w-full flex-col items-center bg-cover bg-center px-6 pt-3 md:h-[377px] md:justify-center md:pt-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(1,36,33,0.76), rgba(1,36,33,0.84) 45%, #012421 100%), url('/gambar/seksi%206/bg.png')",
        }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-graziemille text-[5px] leading-none tracking-[3px] text-[#F5EDD6CC] md:text-[12px] md:tracking-[5px]"
        >
          THE ESSENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-2 font-gilland text-[16px] leading-tight md:mt-4 md:text-[43px]"
          style={goldText}
        >
          Honesty of Nusantara
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative mt-3 h-2 w-[82px] md:mt-5 md:h-4 md:w-[213px]"
        >
          <Image
            src="/gambar/seksi%206/ornamen.svg"
            alt=""
            fill
            className="object-contain"
            sizes="213px"
          />
        </motion.div>
      </header>

      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 px-6 pb-8 pt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-14 md:px-12 md:py-20 xl:grid-cols-4 xl:gap-x-6">
        {essenceData.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15 * index,
              ease: "easeOut",
            }}
            className="mx-auto flex w-full max-w-[170px] flex-col items-center pb-3 md:max-w-[260px] md:pb-0"
          >
            <Image
              src={item.imgSrc}
              width={74}
              height={74}
              className="h-[48px] w-[48px] object-contain md:h-[74px] md:w-[74px]"
              sizes="74px"
              alt=""
            />

            <div className="mt-5 flex w-full flex-col items-center md:mt-8">
              <p className="font-graziemille text-[5px] font-medium leading-none tracking-[2px] text-[#C9A84C] md:text-[9px] md:tracking-[2.2px]">
                {item.topTitle}
              </p>

              <h3 className="mt-1.5 font-gilland text-[12px] leading-tight text-[#F5EDD6] md:text-[19px]">
                {item.mainTitle}
              </h3>

              <p className="mt-3 font-graziemille text-[7.5px] font-light leading-[1.55] text-[#C9B99AB3] md:mt-4 md:text-[11px] md:leading-[1.6]">
                {item.description}
              </p>

              <span className="mt-5 h-px w-[18px] bg-[#C9A84C]/30 md:w-[27px]" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
