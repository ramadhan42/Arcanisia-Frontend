"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const islands = [
  { name: "Sumatra", key: "sumatra" },
  { name: "Jawa", key: "jawa" },
  { name: "Kalimantan", key: "kalimantan" },
  { name: "Sulawesi", key: "sulawesi" },
  { name: "Papua", key: "papua" },
];

export default function IndonesiaMapPage() {
  const [active, setActive] = useState<string>("");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">

      {/* TITLE */}
      <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-widest">
        PETA INDONESIA
      </h1>

      {/* MAP */}
      <div className="relative w-full max-w-6xl h-[400px] md:h-[500px]">

        {/* SUMATRA */}
        <motion.img
          src="/map/sumatra.svg"
          className="absolute left-0 top-10 w-[28%]"
          animate={{
            filter: active === "sumatra" ? "brightness(1.2) sepia(1) hue-rotate(20deg) saturate(5)" : "none",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* JAWA */}
        <motion.img
          src="/map/jawa.svg"
          className="absolute left-[30%] bottom-10 w-[25%]"
          animate={{
            filter: active === "jawa" ? "brightness(1.2) sepia(1) hue-rotate(20deg) saturate(5)" : "none",
          }}
        />

        {/* KALIMANTAN */}
        <motion.img
          src="/map/kalimantan.svg"
          className="absolute left-[35%] top-0 w-[25%]"
          animate={{
            filter: active === "kalimantan" ? "brightness(1.2) sepia(1) hue-rotate(20deg) saturate(5)" : "none",
          }}
        />

        {/* SULAWESI */}
        <motion.img
          src="/map/sulawesi.svg"
          className="absolute left-[60%] top-[20%] w-[18%]"
          animate={{
            filter: active === "sulawesi" ? "brightness(1.2) sepia(1) hue-rotate(20deg) saturate(5)" : "none",
          }}
        />

        {/* PAPUA */}
        <motion.img
          src="/map/papua.svg"
          className="absolute right-0 top-[15%] w-[25%]"
          animate={{
            filter: active === "papua" ? "brightness(1.2) sepia(1) hue-rotate(20deg) saturate(5)" : "none",
          }}
        />
      </div>

      {/* MENU */}
      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {islands.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => setActive(item.key)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full border transition-all duration-300
              ${
                active === item.key
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-white/30 hover:border-yellow-400"
              }`}
          >
            {item.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}