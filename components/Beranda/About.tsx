"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    images?: string[];
    quote?: string;
    paragraphs?: string[];
    statistics?: Array<{ value: string; label: string }>;
  }>("about");
  const renderedStatistics = content.statistics?.length ? content.statistics : statistics;

  const baseImage = content.image ?? "/gambar/seksi%203/borneo2.jpg";
  const galleryImages = content.images?.length
    ? content.images
    : Array.from({ length: 6 }, () => baseImage);
  const totalSlides = galleryImages.length;
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const goToSlide = (nextIndex: number, dir: number) => {
    setDirection(dir);
    setActiveSlide((nextIndex + totalSlides) % totalSlides);
  };
  const goPrev = () => goToSlide(activeSlide - 1, -1);
  const goNext = () => goToSlide(activeSlide + 1, 1);
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

        {/* Ornament */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mt-4 h-[10px] w-[130px] md:mt-5 md:h-[15px] md:w-[204px]"
        >
          <SafeImage
            src="/gambar/seksi%203/ornament.svg"
            alt=""
            fill
            className="object-contain"
            sizes="204px"
          />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="group relative mt-8 aspect-[1.91/1] w-full max-w-[912px] md:mt-12 md:aspect-[1.75/1]"
        >
          <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60, scale: 1.04 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <SafeImage
                src={galleryImages[activeSlide]}
                alt={`Pegunungan hijau Nusantara ${activeSlide + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 80px), 912px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Fade all four edges (top, bottom, left, right) into the section color, keeping the center visible. */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, #00221f 0%, rgba(0,34,31,0) 14%, rgba(0,34,31,0) 86%, #00221f 100%), linear-gradient(to bottom, #00221f 0%, rgba(0,34,31,0) 16%, rgba(0,34,31,0) 84%, #00221f 100%)",
            }}
          />
          </div>

          {/* Slider controls */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Gambar sebelumnya"
            className="group/nav absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A84C]/70 bg-[#00221f]/85 text-[#F8C56C] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)] ring-1 ring-black/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#F8C56C] hover:bg-[#F8C56C] hover:text-[#00221f] hover:shadow-[0_10px_28px_-6px_rgba(201,168,76,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C56C] active:scale-95 md:-left-4 md:h-12 md:w-12 lg:-left-7"
          >
            <ChevronLeft size={22} strokeWidth={2.75} className="-ml-0.5 transition-transform duration-300 group-hover/nav:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Gambar berikutnya"
            className="group/nav absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A84C]/70 bg-[#00221f]/85 text-[#F8C56C] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)] ring-1 ring-black/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#F8C56C] hover:bg-[#F8C56C] hover:text-[#00221f] hover:shadow-[0_10px_28px_-6px_rgba(201,168,76,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C56C] active:scale-95 md:-right-4 md:h-12 md:w-12 lg:-right-7"
          >
            <ChevronRight size={22} strokeWidth={2.75} className="-mr-0.5 transition-transform duration-300 group-hover/nav:translate-x-0.5" />
          </button>

          {/* Slide indicators */}
          <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2 md:bottom-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index, index > activeSlide ? 1 : -1)}
                aria-label={`Ke gambar ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeSlide
                    ? "w-5 bg-[#F8C56C]"
                    : "w-1.5 bg-[#F8C56C]/40 hover:bg-[#F8C56C]/70"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          {...reveal}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="mt-10 max-w-[340px] font-graziemille text-[19px] leading-[1.65] italic sm:max-w-[440px] sm:text-[22px] md:mt-14 md:max-w-[650px] md:text-[28px] md:leading-[1.45]"
          style={goldGradient}
        >
          &quot;{content.quote ?? "Born to reignite national pride through the art of scent the leading narrator of the Nusantara."}&quot;
        </motion.blockquote>

        {/* Paragraphs */}
        <div className="mt-9 flex max-w-[320px] flex-col gap-7 font-graziemille text-[14px] leading-[1.8] sm:max-w-[430px] sm:text-[15px] md:mt-12 md:max-w-[580px] md:gap-8 md:text-[17px] md:leading-[1.85]">
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

        {/* Statistics */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.9, delay: 1.05, ease: "easeOut" }}
          className="mt-12 grid w-full max-w-[340px] grid-cols-3 md:mt-16 md:max-w-[500px]"
        >
          {renderedStatistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative flex min-w-0 flex-col items-center ${
                index > 0
                  ? "before:absolute before:left-0 before:top-1 before:h-8 before:w-px before:bg-[#F8C56C]/70 md:before:h-10"
                  : ""
              }`}
            >
              <span
                className="font-gilland text-[34px] leading-none md:text-[44px]"
                style={goldGradient}
              >
                {stat.value}
              </span>
              <span className="mt-2.5 whitespace-nowrap font-graziemille text-[7px] tracking-[1.5px] text-[#F8C56C] sm:text-[8px] md:mt-3 md:text-[11px] md:tracking-[2px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
