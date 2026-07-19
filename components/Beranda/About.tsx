"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";

const goldGradient = {
  background:
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const reveal = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: false },
};

const statistics = [
  { value: "6", label: "FRAGRANCES" },
  { value: "100%", label: "NATURAL ORIGINS" },
  { value: "6", label: "ISLANDS" },
];

export default function About() {
  const { section } = useSiteContent();
  const content = section<{
    eyebrow?: string;
    title?: string;
    image?: string;
    quote?: string;
    paragraphs?: string[];
    statistics?: Array<{ value: string; label: string }>;
  }>("about");
  const renderedStatistics = content.statistics?.length ? content.statistics : statistics;
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#00221f,#022421_50%,#00221f)] px-10 py-8 text-center text-[#C9B99A] md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
        <motion.p
          {...reveal}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-graziemille text-[7px] tracking-[5px] text-[#F5EDD6CC] sm:text-[9px] sm:tracking-[7px] md:text-[11px] md:tracking-[8px]"
        >
          {content.eyebrow ?? "ABOUT ARCANISIA"}
        </motion.p>

        <motion.h2
          {...reveal}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-2 font-gilland text-[26px] leading-tight sm:text-[31px] md:mt-3 md:text-[42px]"
          style={goldGradient}
        >
          {content.title ?? "More Than a Fragrance"}
        </motion.h2>

        <motion.div
          {...reveal}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mt-4 h-[10px] w-[130px] md:mt-5 md:h-[15px] md:w-[204px]"
        >
          <Image
            src="/gambar/seksi%203/ornament.svg"
            alt=""
            fill
            className="object-contain"
            sizes="204px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="relative mt-8 aspect-[1.91/1] w-full max-w-[912px] overflow-hidden md:mt-12 md:aspect-[1.75/1]"
        >
          <SafeImage
            src={content.image ?? "/gambar/seksi%203/borneo2.jpg"}
            alt="Pegunungan hijau Nusantara"
            fill
            className="object-cover"
            sizes="(max-width: 768px) calc(100vw - 80px), 912px"
          />
          {/* Fade all four edges (top, bottom, left, right) into the section color, keeping the center visible. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #00221f 0%, rgba(0,34,31,0) 14%, rgba(0,34,31,0) 86%, #00221f 100%), linear-gradient(to bottom, #00221f 0%, rgba(0,34,31,0) 16%, rgba(0,34,31,0) 84%, #00221f 100%)",
            }}
          />
        </motion.div>

        <div
          className="mt-5 flex items-center justify-center gap-[7px] md:mt-7"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B7440]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B7440]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B7440]/60" />
          <span className="h-1.5 w-6 rounded-full bg-[#D6AD55]" />
        </div>

        <motion.blockquote
          {...reveal}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="mt-7 max-w-[340px] font-graziemille text-[19px] leading-[1.65] italic sm:max-w-[440px] sm:text-[22px] md:mt-10 md:max-w-[650px] md:text-[28px] md:leading-[1.45]"
          style={goldGradient}
        >
          &quot;{content.quote ?? "Born to reignite national pride through the art of scent the leading narrator of the Nusantara."}&quot;
        </motion.blockquote>

        <div className="mt-6 flex max-w-[320px] flex-col gap-5 font-graziemille text-[14px] leading-[1.55] sm:max-w-[430px] sm:text-[15px] md:mt-8 md:max-w-[580px] md:text-[17px] md:leading-[1.6]">
          <motion.p
            {...reveal}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-[#C9B99A]"
          >
            {content.paragraphs?.[0] ?? "Arcanisia was born not merely to present fragrance, but to reignite national pride for Indonesia — from its uncharted islands to its rarely uncovered cultural riches — through the fusion of visual art and storytelling aromas."}
          </motion.p>

          <motion.p
            {...reveal}
            transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
            className="text-[#C9B99A99]"
          >
            {content.paragraphs?.[1] ?? "Every bottle is an educational medium and sensory experience that brings the story of Indonesia into everyday life — committed to sustainability and environmental preservation."}
          </motion.p>
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.9, delay: 1.05, ease: "easeOut" }}
          className="mt-8 grid w-full max-w-[310px] grid-cols-3 md:mt-12 md:max-w-[440px]"
        >
          {renderedStatistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative flex min-w-0 flex-col items-center ${
                index > 0
                  ? "before:absolute before:left-0 before:top-1 before:h-6 before:w-px before:bg-[#F8C56C]/70"
                  : ""
              }`}
            >
              <span
                className="font-gilland text-[28px] leading-none md:text-[36px]"
                style={goldGradient}
              >
                {stat.value}
              </span>
              <span className="mt-2 whitespace-nowrap font-graziemille text-[5px] tracking-[1.3px] text-[#F8C56C] sm:text-[6px] md:text-[8px] md:tracking-[1.6px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
