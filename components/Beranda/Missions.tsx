"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const missionData = [
  {
    id: "01",
    title: "Cultural Storytelling",
    description:
      "Telling the beauty of Indonesian culture and islands through the art of fragrance and artistic perfume design.",
  },
  {
    id: "02",
    title: "Accessible Luxury",
    description:
      "Presenting high-quality perfumes at accessible prices, so that more people can experience the splendor of the Nusantara.",
  },
  {
    id: "03",
    title: "Indonesian Aesthetic",
    description:
      "Using designs and packaging that represent the aesthetic values and unique character of Indonesia.",
  },
  {
    id: "04",
    title: "Environmental Stewardship",
    description:
      "Contributing to environmental sustainability by supporting organizations dedicated to the preservation of Indonesia's nature.",
  },
  {
    id: "05",
    title: "Education & Pride",
    description:
      "Becoming an educational medium that cultivates pride and love for the beauty and richness of Indonesia's cultural heritage.",
  },
];

const goldText = {
  background:
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Missions() {
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#00221f,#012421)]">
      <header
        className="relative flex h-[112px] w-full flex-col items-center bg-cover bg-center px-6 pt-4 text-center md:h-[413px] md:justify-center md:pt-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,34,31,0.58), #012421), url('/gambar/seksi%205/bg.png')",
        }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-graziemille text-[6px] leading-none tracking-[3px] text-[#F5EDD6CC] md:text-[13px] md:tracking-[5px]"
        >
          OUR MISSION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-2 font-gilland text-[20px] leading-tight md:mt-4 md:text-[43px]"
          style={goldText}
        >
          Guided by Purpose
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative mt-3 h-2 w-[100px] md:mt-5 md:h-4 md:w-[213px]"
        >
          <Image
            src="/gambar/seksi%205/ornamen.svg"
            alt=""
            fill
            className="object-contain"
            sizes="213px"
          />
        </motion.div>
      </header>

      <div className="mx-auto w-full max-w-[762px] px-[22px] pb-10 pt-8 md:px-[18px] md:pb-12 md:pt-12">
        {missionData.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.15 * index,
              ease: "easeOut",
            }}
            className="grid grid-cols-[42px_8px_minmax(0,1fr)] items-start gap-x-3 border-b border-[#C9A84C]/10 py-[15px] first:pt-0 md:grid-cols-[60px_8px_minmax(0,1fr)] md:gap-x-[30px] md:py-6"
          >
            <span
              className="text-right font-gilland text-[31px] leading-none md:text-[48px]"
              style={goldText}
            >
              {item.id}
            </span>

            <span className="flex h-full min-h-[52px] flex-col items-center pt-1 md:min-h-[70px] md:pt-1.5">
              <span className="h-[14px] w-px bg-[#C9A84C]/20 md:h-[18px]" />
              <span className="my-1 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]/30" />
              <span className="w-px flex-1 bg-[#C9A84C]/10" />
            </span>

            <div className="min-w-0 pt-px text-left md:pt-0.5">
              <h3 className="font-gilland text-[14px] leading-[1.15] text-[#F5EDD6] md:text-[23px] md:leading-[1.1]">
                {item.title}
              </h3>
              <p className="mt-1.5 max-w-[430px] font-graziemille text-[9.5px] leading-[1.35] text-[#C9B99A99] md:mt-2 md:text-[12px] md:leading-[1.65]">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
