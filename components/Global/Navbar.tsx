// ==========================================
// 1. Navbar.tsx
// ==========================================
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { User, ChevronDown } from "lucide-react"; // Import icon User & ChevronDown dari lucide-react[cite: 13]
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import OrdersModal from "../Modals/Orders";

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State baru untuk dropdown
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setIsDropdownOpen(false);
  };

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
    setIsMobileMenuOpen(false);

    if (window.location.pathname !== "/") {
      window.location.assign(`/#${targetId}`);
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
      {/* // Tambahkan di dalam return: */}
      <AnimatePresence>
        {isOrdersOpen && <OrdersModal onClose={() => setIsOrdersOpen(false)} />}
      </AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -120 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed inset-x-0 top-0 z-50 flex max-w-[100vw] items-center justify-between px-7 py-6 transition-all duration-300 lg:px-8 lg:py-5 xl:px-12 ${
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
            className="h-auto w-[142px] object-contain lg:w-[140px] xl:w-[160px]"
            priority
          />
        </motion.div>

        {/* MENU TENGAH */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-14">
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
                  className="group relative cursor-pointer font-gilland text-[12px] font-light tracking-[2px] text-[#F5EDD6CC] xl:text-[14px]"
                >
                  {menu}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* SHOP NOW & MENU MASUK/USER (Kanan) */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 xl:gap-6">
          {/* BUTTON SHOP NOW[cite: 13] */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden flex-shrink-0 lg:block"
          >
            <button
              aria-label="Shop now"
              className="flex h-10 items-center gap-3 rounded-md border border-[#F8C56C] px-3 transition-all duration-300 hover:bg-[#F8C56C]/10 lg:h-auto lg:px-4 lg:py-2.5 xl:gap-4 xl:px-6"
            >
              <Image
                src="/gambar/navbar/Icon.svg"
                alt="Shop Icon"
                width={16}
                height={16}
              />
              <span className="hidden font-graziemille text-[12px] tracking-[1.5px] text-[#F8C56C] lg:inline xl:text-[13px]">
                SHOP NOW
              </span>
            </button>
          </motion.div>

          {/* LOGIC UNTUK MENU MASUK ATAU USER MENU */}
          {isLoggedIn ? (
            <div className="relative hidden lg:block">
              {" "}
              {/* Bungkus dengan relative */}
              {/* Trigger Dropdown */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-[#F8C56C] px-2.5 transition-all duration-300 hover:bg-[#F8C56C]/10 lg:h-auto lg:px-4 lg:py-2.5 xl:gap-4 xl:px-6"
              >
                <div
                  className="h-[18px] w-[18px] flex items-center justify-center shrink-0"
                  style={{ background: goldGradient }}
                >
                  <b className="font-montserrat text-[11px] text-[#091812] leading-none mb-[1px]">
                    {userName.charAt(0).toUpperCase()}
                  </b>
                </div>
                <div className="hidden max-w-[80px] items-center overflow-hidden lg:flex">
                  <span
                    className="font-graziemille text-[13px] tracking-[1.5px] truncate leading-none mt-[2px]"
                    style={goldTextGradient}
                  >
                    {userName.toLowerCase()}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  color="#F8C56C"
                  className={`shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>
              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-[#012421] border border-[#F8C56C]/30 rounded-md py-2 shadow-2xl z-50"
                >
                  <button
                    onClick={() => {
                      setIsOrdersOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] text-[#c9b99a] hover:bg-[#F8C56C]/10 hover:text-[#F8C56C] transition-colors font-graziemille tracking-[1px]"
                  >
                    AKUN SAYA
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[12px] text-[#c9b99a] hover:bg-[#F8C56C]/10 hover:text-[#F8C56C] transition-colors font-graziemille tracking-[1px]"
                  >
                    LOGOUT
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            // Tampilan Menu Masuk (Sebelum Login)
            <button
              onClick={() => setActiveModal("login")}
              aria-label="Masuk"
              className="group hidden h-10 w-10 items-center justify-center gap-2 rounded-md transition-colors hover:bg-white/5 lg:flex lg:h-auto lg:w-auto lg:px-2 lg:py-2 xl:px-4"
            >
              <User
                size={16}
                color="#fdde8a"
                className="transition-transform group-hover:scale-110"
              />
              <span
                className="mt-[2px] hidden font-graziemille text-[12px] leading-[15px] tracking-[2px] lg:inline"
                style={goldTextGradient}
              >
                MASUK
              </span>
            </button>
          )}

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-[#F8C56C] lg:hidden"
          >
            <span className="relative block h-[22px] w-6">
              <span
                className={`absolute left-0 top-0 h-[2px] w-6 rounded-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-[10px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] h-[2px] w-6 rounded-full bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-6 rounded-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[10px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#012F2B] lg:hidden"
          >
            <div className="flex min-h-[100svh] flex-col px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <Image
                  src="/gambar/navbar/logo%20arca%20fix%201.svg"
                  alt="Arcanisia"
                  width={142}
                  height={36}
                  className="h-auto w-[112px]"
                />
                <button
                  type="button"
                  aria-label="Tutup menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative flex h-8 w-8 items-center justify-center text-[#F8C56C]"
                >
                  <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
                </button>
              </div>

              <nav
                aria-label="Navigasi mobile"
                className="mt-10 flex flex-col items-center gap-11"
              >
                {["ABOUT", "COLLECTION", "MISSION", "VALUES"].map((menu) => {
                  const targetId = menu.toLowerCase();

                  return (
                    <a
                      key={menu}
                      href={`/#${targetId}`}
                      onClick={(e) => handleScroll(e, targetId)}
                      className="font-gilland text-[35px] capitalize tracking-[5px] text-[#F5EDD6] transition-colors hover:text-[#F8C56C]"
                    >
                      {menu.toLowerCase()}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-24 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsOrdersOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-6 font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                >
                  <Image
                    src="/gambar/navbar/Icon.svg"
                    alt=""
                    width={21}
                    height={21}
                    className="h-[21px] w-[21px]"
                  />
                  PESANAN SAYA
                </button>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-20 flex h-[57px] w-[222px] items-center justify-center gap-7 rounded-xl border border-[#F8C56C] font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                >
                  <Image
                    src="/gambar/navbar/Icon.svg"
                    alt=""
                    width={21}
                    height={21}
                    className="h-[21px] w-[21px]"
                  />
                  SHOP NOW
                </button>

                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-14 font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal("login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-14 flex items-center gap-6 font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                  >
                    <User size={23} fill="#F8C56C" strokeWidth={1.4} />
                    MASUK
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
