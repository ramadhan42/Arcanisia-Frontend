// ==========================================
// 1. Navbar.tsx
// ==========================================
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  User,
  ShoppingBag,
  Package,
  LogOut,
  ShieldCheck,
  Languages,
} from "lucide-react";
import OrdersModal from "../Modals/Orders";
import ProfileModal from "../Modals/Profile";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthDialog } from "@/contexts/AuthDialogContext";
import { useCart } from "@/contexts/CartContext";
import { orderService } from "@/services/api";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/contexts/LocaleContext";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/locale";
import {
  queueHomeSectionScroll,
  scrollToSection,
} from "@/lib/sectionHash";

const navMenus = [
  { id: "about", labelKey: "nav.about" },
  { id: "collection", labelKey: "nav.collection" },
  { id: "mission", labelKey: "nav.mission" },
  { id: "values", labelKey: "nav.values" },
] as const;

function DropdownCountBadge({ count }: { count: number }) {
  if (!count) return null;

  return (
    <span
      data-locale-fade="ignore"
      className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F8C56C] px-1.5 text-[10px] font-bold text-[#012421]"
    >
      {count}
    </span>
  );
}

function AccountLanguageToggle() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className="flex h-12 w-full items-center gap-3.5 px-5 font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7]">
      <Languages
        size={18}
        strokeWidth={1.7}
        className="shrink-0"
        data-locale-fade="ignore"
      />
      <span data-locale-text="true" className="flex-1">
        {t("nav.language")}
      </span>
      <div className="flex items-center gap-1" data-locale-fade="ignore">
        {LOCALES.map((option: Locale) => {
          const active = option === locale;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setLocale(option)}
              aria-label={option === "id" ? t("nav.languageId") : t("nav.languageEn")}
              aria-pressed={active}
              data-locale-fade="ignore"
              className={`min-w-8 rounded-full px-2 py-1 font-graziemille text-[11px] tracking-[1px] transition-colors ${
                active
                  ? "bg-[#F8C56C] text-[#012421]"
                  : "border border-[#F8C56C]/35 text-[#c9c7b7] hover:border-[#F8C56C] hover:text-[#F8C56C]"
              }`}
            >
              {LOCALE_LABELS[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const { user, isAuthenticated, logout, token } = useAuth();
  const { openLogin } = useAuthDialog();
  const { cart, openCart } = useCart();
  const { t, locale, setLocale } = useTranslation();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const mobileAccountMenuRef = useRef<HTMLDivElement>(null);
  const userName = user?.name ?? "";
  const userEmail = user?.email ?? "";
  const userInitial = userName.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const insideDesktop = accountMenuRef.current?.contains(target);
      const insideMobile = mobileAccountMenuRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const refreshOrdersCount = useCallback(async () => {
    if (!token) {
      setOrdersCount(0);
      return;
    }

    try {
      const response = await orderService.list(token, { page: 1, per_page: 1 });
      setOrdersCount(response.meta?.total ?? response.data.length);
    } catch {
      setOrdersCount(0);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setOrdersCount(0);
      return;
    }

    void refreshOrdersCount();
  }, [isAuthenticated, token, isDropdownOpen, isOrdersOpen, refreshOrdersCount]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
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
    setIsDropdownOpen(false);

    if (window.location.pathname !== "/") {
      queueHomeSectionScroll(targetId, { setHash: true });
      window.location.assign("/");
      return;
    }

    scrollToSection(targetId, { setHash: true });
  };

  const handleShopNow = () => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== "/") {
      queueHomeSectionScroll("collection", { setHash: false });
      window.location.assign("/");
      return;
    }
    scrollToSection("collection", { setHash: false });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "auto" });
      window.history.replaceState(null, "", "/");
    }
  };

  return (
    <>
      {/* // Tambahkan di dalam return: */}
      <AnimatePresence>
        {isOrdersOpen && <OrdersModal onClose={() => setIsOrdersOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {isProfileOpen && user && (
          <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />
        )}
      </AnimatePresence>
      <motion.nav
        initial={false}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 flex max-w-[100vw] items-center justify-between px-7 py-6 transition-all duration-300 lg:px-8 lg:py-5 xl:px-12 ${
          scrolled ? "bg-[#012320]/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="Arcanisia — Beranda"
            className="block cursor-pointer"
          >
            <span data-locale-shimmer="true" className="inline-block">
              <SafeImage
                src="/gambar/navbar/logo%20arca%20fix%201.svg"
                alt="Logo Arca"
                width={160}
                height={60}
                className="h-auto w-[142px] object-contain lg:w-[140px] xl:w-[160px]"
                priority
              />
            </span>
          </Link>
        </motion.div>

        {/* MENU TENGAH */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-14">
          {navMenus.map((menu) => {
            const targetId = menu.id;

            return (
              <motion.div key={menu.id} initial={false} whileHover={{ y: -2 }}>
                <a
                  href={`/#${targetId}`}
                  onClick={(e) => handleScroll(e, targetId)}
                  data-locale-text="true"
                  className="group relative cursor-pointer font-gilland text-[12px] font-light tracking-[2px] text-[#F5EDD6CC] xl:text-[14px]"
                >
                  {t(menu.labelKey)}
                  <span
                    aria-hidden="true"
                    data-locale-fade="ignore"
                    className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F8C56C] transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* SHOP NOW & MENU MASUK/USER (Kanan) */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 xl:gap-6">
          {!isAuthenticated && <LanguageSwitcher />}
          {/* BUTTON SHOP NOW[cite: 13] */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden flex-shrink-0 lg:block"
          >
            <button
              type="button"
              aria-label={t("nav.shopNow")}
              onClick={handleShopNow}
              className="flex h-[42px] items-center gap-3 rounded-md border border-[#F8C56C] px-4 transition-all duration-300 hover:bg-[#F8C56C]/10 xl:gap-4 xl:px-6"
            >
              <SafeImage
                src="/gambar/navbar/Icon.svg"
                alt="Shop Icon"
                width={16}
                height={16}
              />
              <span
                data-locale-text="true"
                className="hidden font-graziemille text-[12px] tracking-[1.5px] text-[#F8C56C] lg:inline xl:text-[13px]"
              >
                {t("nav.shopNow")}
              </span>
            </button>
          </motion.div>

          {/* LOGIC UNTUK MENU MASUK ATAU USER MENU */}
          {isAuthenticated ? (
            <div ref={accountMenuRef} className="relative hidden lg:block">
              {/* Trigger Dropdown — avatar bulat, inisial saja */}
              <button
                type="button"
                aria-label={t("nav.openAccountMenu", { name: userName })}
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((open) => !open)}
                data-locale-fade="ignore"
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-[#F8C56C]/50"
                style={{ background: goldGradient }}
              >
                <b className="font-montserrat text-[15px] font-bold leading-none text-[#091812]">
                  {userInitial}
                </b>
              </button>
              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    key="account-dropdown-desktop"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute right-0 top-full z-50 mt-2 w-[240px] overflow-hidden rounded-lg border border-[#7c7135]/45 bg-[#002d28]/95 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="flex h-20 flex-col justify-center px-5 font-graziemille">
                      <p className="truncate text-[16px] leading-none text-[#F8C56C]">
                        {userName.toLowerCase()}
                      </p>
                      <p className="mt-3 truncate text-[12px] leading-none text-[#c9c7b7]">
                        {userEmail.toLowerCase()}
                      </p>
                    </div>

                    <div className="border-y border-[#7c7135]/35">
                      {user?.is_admin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#f8c56c] transition-colors hover:bg-[#F8C56C]/8"
                        >
                        <ShieldCheck size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                          <span data-locale-text="true">{t("nav.adminDashboard")}</span>
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(true);
                          setIsDropdownOpen(false);
                        }}
                        className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/12 hover:text-[#F8C56C] focus:outline-none focus:ring-2 focus:ring-[#F8C56C]/45"
                      >
                        <User size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                        <span data-locale-text="true">{t("nav.myProfile")}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsOrdersOpen(true);
                          setIsDropdownOpen(false);
                        }}
                        className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/8 hover:text-[#F8C56C]"
                      >
                        <Package size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                        <span data-locale-text="true" className="flex-1">{t("nav.myOrders")}</span>
                        <DropdownCountBadge count={ordersCount} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openCart();
                          setIsDropdownOpen(false);
                        }}
                        className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/8 hover:text-[#F8C56C]"
                      >
                        <ShoppingBag size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                        <span data-locale-text="true" className="flex-1">{t("nav.cart")}</span>
                        <DropdownCountBadge count={cart?.items_count ?? 0} />
                      </button>

                      <AccountLanguageToggle />
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#ff6673] transition-colors hover:bg-[#ff6673]/8"
                    >
                      <LogOut size={18} strokeWidth={1.8} data-locale-fade="ignore" />
                      <span data-locale-text="true">{t("nav.logout")}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Tampilan Menu Masuk (Sebelum Login)
            <button
              type="button"
              onClick={() => openLogin()}
              aria-label={t("nav.login")}
              className="group hidden h-[42px] items-center justify-center gap-2 rounded-md px-2 transition-colors hover:bg-white/5 lg:flex xl:px-4"
            >
              <User
                size={16}
                color="#fdde8a"
                data-locale-fade="ignore"
                className="transition-transform group-hover:scale-110"
              />
              <span
                data-locale-text="true"
                className="mt-[2px] hidden font-graziemille text-[12px] leading-[15px] tracking-[2px] lg:inline"
                style={goldTextGradient}
              >
                {t("nav.login")}
              </span>
            </button>
          )}

          <button
            type="button"
            aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              if (isMobileMenuOpen) setIsDropdownOpen(false);
              setIsMobileMenuOpen((open) => !open);
            }}
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
                <Link
                  href="/"
                  onClick={handleLogoClick}
                  aria-label="Arcanisia — Beranda"
                  className="block"
                >
                  <span data-locale-shimmer="true" className="inline-block">
                    <SafeImage
                      src="/gambar/navbar/logo%20arca%20fix%201.svg"
                      alt="Arcanisia"
                      width={142}
                      height={36}
                      className="h-auto w-[112px]"
                    />
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label={t("nav.closeMenu")}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
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
                {navMenus.map((menu) => {
                  const targetId = menu.id;

                  return (
                    <a
                      key={menu.id}
                      href={`/#${targetId}`}
                      onClick={(e) => handleScroll(e, targetId)}
                      data-locale-text="true"
                      className="font-gilland text-[35px] capitalize tracking-[5px] text-[#F5EDD6] transition-colors hover:text-[#F8C56C]"
                    >
                      {t(menu.labelKey).toLowerCase()}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-16 flex flex-col items-center">
                {!isAuthenticated && (
                  <div className="mb-5 flex items-center gap-3">
                    {LOCALES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLocale(option)}
                        className={`min-w-[64px] rounded-md border px-4 py-2 font-graziemille text-[12px] tracking-[2px] transition-colors ${
                          locale === option
                            ? "border-[#F8C56C] bg-[#F8C56C]/15 text-[#F8C56C]"
                            : "border-[#F8C56C]/30 text-[#c9c7b7] hover:border-[#F8C56C] hover:text-[#F8C56C]"
                        }`}
                      >
                        <span data-locale-text="true">{LOCALE_LABELS[option]}</span>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleShopNow}
                  className="flex h-[57px] w-[222px] items-center justify-center gap-7 rounded-xl border border-[#F8C56C] font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                >
                  <span data-locale-fade="ignore" className="inline-flex">
                    <SafeImage
                      src="/gambar/navbar/Icon.svg"
                      alt=""
                      width={21}
                      height={21}
                      className="h-[21px] w-[21px]"
                    />
                  </span>
                  <span data-locale-text="true">{t("nav.shopNow")}</span>
                </button>

                {isAuthenticated ? (
                  <div ref={mobileAccountMenuRef} className="flex flex-col items-center">
                    <button
                      type="button"
                      aria-label={t("nav.openAccountMenu", { name: userName })}
                      aria-expanded={isDropdownOpen}
                      onClick={() => setIsDropdownOpen((open) => !open)}
                      data-locale-fade="ignore"
                      className="mt-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105"
                      style={{ background: goldGradient }}
                    >
                      <b className="font-montserrat text-[20px] font-bold leading-none text-[#091812]">
                        {userInitial}
                      </b>
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          key="account-dropdown-mobile"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="mt-2 w-[min(280px,calc(100vw-48px))] overflow-hidden rounded-lg border border-[#7c7135]/45 bg-[#002d28]/95 backdrop-blur-xl shadow-2xl"
                        >
                          <div className="flex h-20 flex-col justify-center px-5 font-graziemille">
                            <p className="truncate text-[16px] leading-none text-[#F8C56C]">
                              {userName.toLowerCase()}
                            </p>
                            <p className="mt-3 truncate text-[12px] leading-none text-[#c9c7b7]">
                              {userEmail.toLowerCase()}
                            </p>
                          </div>

                          <div className="border-y border-[#7c7135]/35">
                            {user?.is_admin && (
                              <Link
                                href="/admin"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#f8c56c] transition-colors hover:bg-[#F8C56C]/8"
                              >
                                <ShieldCheck size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                                <span data-locale-text="true">{t("nav.adminDashboard")}</span>
                              </Link>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setIsProfileOpen(true);
                                setIsDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/12 hover:text-[#F8C56C] focus:outline-none focus:ring-2 focus:ring-[#F8C56C]/45"
                            >
                              <User size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                              <span data-locale-text="true">{t("nav.myProfile")}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setIsOrdersOpen(true);
                                setIsDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/8 hover:text-[#F8C56C]"
                            >
                              <Package size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                              <span data-locale-text="true" className="flex-1">{t("nav.myOrders")}</span>
                              <DropdownCountBadge count={ordersCount} />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                openCart();
                                setIsDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#c9c7b7] transition-colors hover:bg-[#F8C56C]/8 hover:text-[#F8C56C]"
                            >
                              <ShoppingBag size={18} strokeWidth={1.7} data-locale-fade="ignore" />
                              <span data-locale-text="true" className="flex-1">{t("nav.cart")}</span>
                              <DropdownCountBadge count={cart?.items_count ?? 0} />
                            </button>

                            <AccountLanguageToggle />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              void handleLogout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex h-12 w-full items-center gap-3.5 px-5 text-left font-gilland text-[13px] tracking-[0.3px] text-[#ff6673] transition-colors hover:bg-[#ff6673]/8"
                          >
                            <LogOut size={18} strokeWidth={1.8} data-locale-fade="ignore" />
                            <span data-locale-text="true">{t("nav.logout")}</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      openLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-14 flex items-center gap-6 font-graziemille text-[15px] tracking-[4px] text-[#F8C56C]"
                  >
                    <User
                      size={23}
                      fill="#F8C56C"
                      strokeWidth={1.4}
                      data-locale-fade="ignore"
                    />
                    <span data-locale-text="true">{t("nav.login")}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
