"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const footerGroups = [
  {
    title: "COLLECTION",
    links: [
      "Secret of Buton",
      "Whisper of Raja Ampat",
      "Mystique of Komodo",
      "Emerald of Borneo",
      "Soul of Lombok",
      "Glow of Borobudur",
    ],
  },
  {
    title: "COMPANY",
    links: [
      "About Arcanisia",
      "Our Mission",
      "Brand Values",
      "Logo Story",
      "Sustainability",
    ],
  },
  {
    title: "SUPPORT",
    links: [
      "FAQ",
      "Shipping Info",
      "Returns Policy",
      "Track Order",
      "Contact Us",
    ],
  },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#061716] font-graziemille text-[#F8C56C]">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.02]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-7 pb-7 pt-7 md:px-12 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-14 md:gap-y-12 lg:grid-cols-[minmax(300px,2fr)_repeat(3,minmax(130px,1fr))] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex max-w-[465px] flex-col items-start"
          >
            <Image
              src="/gambar/footer/logo%20arca%20fix%201.svg"
              width={151}
              height={46}
              className="h-auto w-[137px] md:w-[151px]"
              alt="Arcanisia"
            />

            <p className="mt-5 max-w-[215px] text-[8px] leading-4 text-[#C9B99A99] md:mt-6 md:max-w-[430px] md:text-[13px] md:leading-[1.7]">
              A luxury fragrance house born from the heart of the Indonesian
              archipelago. Six islands. Six stories. One nation breathed into
              being through scent.
            </p>

            <Image
              src="/gambar/footer/ornamen.svg"
              width={162}
              height={12}
              className="mt-5 h-auto w-[82px] md:mt-6 md:w-[162px]"
              alt=""
            />
          </motion.div>

          {footerGroups.map((group, index) => (
            <motion.nav
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: "easeOut",
              }}
              aria-label={group.title}
            >
              <h2 className="text-[7px] tracking-[3px] text-[#F8C56C] md:text-[11px] md:tracking-[3.15px]">
                {group.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-[13px] md:mt-6 md:gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[8px] leading-4 text-[#C9B99A80] transition-colors hover:text-[#F8C56C] md:text-[12px]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-9 border-t border-[#C9A84C]/10 pt-6 text-[#C9B99A4D] md:mt-16 md:pt-8"
        >
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p className="max-w-[155px] text-[7px] leading-[1.45] tracking-[0.5px] md:max-w-none md:text-[11px]">
              © 2026 Arcanisia Scent. All rights reserved. Made with love for
              Indonesia.
            </p>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[6px] transition-colors hover:text-[#F8C56C] md:text-[10px]"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
