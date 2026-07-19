"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";

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
  const { section } = useSiteContent();
  const content = section<{
    eyebrow?: string;
    title?: string;
    background_image?: string;
    items?: Array<{
      id?: number;
      imgSrc?: string;
      image?: string;
      icon?: string;
      topTitle?: string;
      eyebrow?: string;
      mainTitle?: string;
      title?: string;
      description: string;
    }>;
  }>("values");
  const items: Array<{
    id?: number;
    imgSrc?: string;
    image?: string;
    icon?: string;
    topTitle?: string;
    eyebrow?: string;
    mainTitle?: string;
    title?: string;
    description: string;
  }> = content.items?.length ? content.items : essenceData;
  return (
    <section className="relative w-full overflow-hidden bg-[#012421] text-center">
      {/*
        One continuous background layer that sits BEHIND the content and extends
        past the header, fading into the exact section color (#012421). This
        avoids any element-boundary sub-pixel seam/line under the header.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[260px] bg-cover bg-center sm:h-[310px] md:h-[440px] lg:h-[480px]"
        style={{
          backgroundImage:
            `linear-gradient(180deg, #012421 0%, rgba(1,36,33,0.88) 14%, rgba(1,36,33,0.42) 40%, rgba(1,36,33,0.42) 58%, rgba(1,36,33,0.88) 84%, #012421 100%), url('${content.background_image ?? "/gambar/seksi%206/bg.png"}')`,
        }}
      />

      <header className="relative z-10 flex min-h-[150px] w-full flex-col items-center justify-center px-6 py-9 sm:min-h-[200px] md:min-h-[340px] md:py-16 lg:min-h-[377px]">
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 font-graziemille text-[8px] leading-none tracking-[3px] text-[#F5EDD6CC] sm:text-[9px] md:text-[12px] md:tracking-[5px]"
        >
          {content.eyebrow ?? "THE ESSENCE"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 mt-2 font-gilland text-[24px] leading-tight sm:text-[30px] md:mt-4 md:text-[43px]"
          style={goldText}
        >
          {content.title ?? "Honesty of Nusantara"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 mt-3 h-3 w-[120px] md:mt-5 md:h-4 md:w-[213px]"
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

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-x-6 gap-y-10 px-6 pb-12 pt-10 sm:gap-x-10 md:gap-y-14 md:px-12 md:py-20 xl:grid-cols-4 xl:gap-x-6">
        {items.map((item, index) => (
          <motion.article
            key={`${item.id ?? "item"}-${item.mainTitle ?? item.title ?? item.topTitle ?? item.eyebrow ?? "value"}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15 * index,
              ease: "easeOut",
            }}
            className="mx-auto flex w-full max-w-[220px] flex-col items-center md:max-w-[260px]"
          >
            <SafeImage
              src={item.imgSrc ?? item.icon ?? item.image ?? "/gambar/seksi%206/1.svg"}
              width={74}
              height={74}
              className="h-[54px] w-[54px] object-contain md:h-[74px] md:w-[74px]"
              sizes="74px"
              alt=""
            />

            <div className="mt-5 flex w-full flex-col items-center md:mt-8">
              <p className="font-graziemille text-[8px] font-medium leading-none tracking-[2px] text-[#C9A84C] md:text-[9px] md:tracking-[2.2px]">
                {item.topTitle ?? item.eyebrow}
              </p>

              <h3 className="mt-2 font-gilland text-[15px] leading-tight text-[#F5EDD6] md:text-[19px]">
                {item.mainTitle ?? item.title}
              </h3>

              <p className="mt-3 font-graziemille text-[10px] font-light leading-[1.6] text-[#C9B99AB3] md:mt-4 md:text-[11px] md:leading-[1.6]">
                {item.description}
              </p>

              <span className="mt-5 h-px w-[22px] bg-[#C9A84C]/30 md:w-[27px]" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
