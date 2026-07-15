"use client";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

export default function Navbar() {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // State untuk mengontrol kemunculan Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // 🎯 Detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;

    // Hide saat scroll ke bawah
    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Tambah background saat scroll
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -120 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/30 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* 🔥 LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0 cursor-pointer"
        >
          <Image
            src="/gambar/navbar/logo%20arca%20fix%201.svg"
            alt="Logo Arca"
            width={160}
            height={60}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* 🔥 MENU */}
        <div className="hidden md:flex items-center gap-14">
          {["ABOUT", "COLLECTION", "MISSION", "VALUES"].map((menu, index) => (
            <motion.div
              key={menu}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.5,
              }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={`#${menu.toLowerCase()}`}
                className="relative font-gilland font-light text-[14px] text-[#F5EDD6CC] tracking-[2px] group"
              >
                {menu}

                {/* underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>
        {/* 🔥 AUTH & BUTTON SHOP NOW */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative font-gilland font-light text-[14px] text-[#F5EDD6CC] tracking-[2px] group"
            >
              MASUK
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="relative font-gilland font-light text-[14px] text-[#F5EDD6CC] tracking-[2px] group"
            >
              DAFTAR
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <button
              className="flex items-center gap-4 border border-[#F8C56C] px-6 py-2.5 rounded-md hover:bg-[#F8C56C]/10 transition-all duration-300"
            >
              <Image
                src="/gambar/navbar/Icon.svg"
                alt="Shop Icon"
                width={16}
                height={16}
              />
              <span className="font-graziemille text-[13px] text-[#F8C56C] tracking-[1.5px]">
                SHOP NOW
              </span>
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Render komponen Modal di luar <nav> agar z-index modal bekerja sempurna */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
