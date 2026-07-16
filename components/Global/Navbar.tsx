// ==========================================
// 1. Navbar.tsx
// ==========================================
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { User, ChevronDown } from "lucide-react"; // Import icon User & ChevronDown dari lucide-react[cite: 13]
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";

export default function Navbar() {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // State untuk mengontrol kemunculan Modal[cite: 13]
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null,
  );

  // State untuk status Login & Nama User
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Fungsi untuk mengganti modal yang aktif[cite: 13]
  const handleSwitchModal = (modalName: "login" | "register") => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Fungsi saat login berhasil
  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    closeModal();
  };

  // Detect scroll direction[cite: 13]
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;

    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Konstanta gradient emas untuk teks & background[cite: 13]
  const goldGradient =
    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";
  const goldTextGradient = {
    background: goldGradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${targetId}`);
    }
  };

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
        {/* LOGO */}
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

        {/* MENU TENGAH */}
        <div className="hidden md:flex items-center gap-14">
          {["ABOUT", "COLLECTION", "MISSION", "VALUES"].map((menu, index) => {
            const targetId = menu.toLowerCase();

            return (
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
                <a
                  href={`/#${targetId}`}
                  onClick={(e) => handleScroll(e, targetId)}
                  className="relative font-gilland font-light text-[14px] text-[#F5EDD6CC] tracking-[2px] group cursor-pointer"
                >
                  {menu}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* SHOP NOW & MENU MASUK/USER (Kanan) */}
        <div className="flex items-center gap-6">
          {/* BUTTON SHOP NOW[cite: 13] */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <button className="flex items-center gap-4 border border-[#F8C56C] px-6 py-2.5 rounded-md hover:bg-[#F8C56C]/10 transition-all duration-300">
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

          {/* LOGIC UNTUK MENU MASUK ATAU USER MENU */}
          {isLoggedIn ? (
            // Tampilan User Menu (Setelah Login)
            <div className="flex items-center gap-4 border border-[#F8C56C] px-6 py-2.5 rounded-md hover:bg-[#F8C56C]/10 transition-all duration-300 cursor-pointer">
              {/* Box Inisial */}
              <div
                className="h-[18px] w-[18px] flex items-center justify-center shrink-0"
                style={{ background: goldGradient }}
              >
                <b className="font-montserrat text-[11px] text-[#091812] leading-none mb-[1px]">
                  {userName.charAt(0).toUpperCase()}
                </b>
              </div>

              {/* Teks Nama */}
              <div className="flex items-center overflow-hidden max-w-[80px]">
                <span
                  className="font-graziemille text-[13px] tracking-[1.5px] truncate leading-none mt-[2px]"
                  style={goldTextGradient}
                >
                  {userName.toLowerCase()}
                </span>
              </div>

              {/* Icon Dropdown */}
              <ChevronDown size={16} color="#F8C56C" className="shrink-0" />
            </div>
          ) : (
            // Tampilan Menu Masuk (Sebelum Login)
            <button
              onClick={() => setActiveModal("login")}
              className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-white/5 transition-colors rounded-md group"
            >
              <User
                size={16}
                color="#fdde8a"
                className="transition-transform group-hover:scale-110"
              />
              <span
                className="font-graziemille text-[12px] tracking-[2px] leading-[15px] mt-[2px]"
                style={goldTextGradient}
              >
                MASUK
              </span>
            </button>
          )}
        </div>
      </motion.nav>

      {/* MODAL RENDER[cite: 13] */}
      <AnimatePresence>
        {activeModal === "login" && (
          <LoginModal
            isOpen={true}
            onClose={closeModal}
            onSwitchToRegister={() => handleSwitchModal("register")}
            onLogin={handleLoginSuccess} // Melempar fungsi handleLoginSuccess ke modal
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeModal === "register" && (
          <RegisterModal
            isOpen={true}
            onClose={closeModal}
            onSwitchToLogin={() => handleSwitchModal("login")}
          />
        )}
      </AnimatePresence>
    </>
  );
}
