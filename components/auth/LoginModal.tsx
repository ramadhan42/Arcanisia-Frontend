// ==========================================
// 2. LoginModal.tsx
// ==========================================
import React, { useState } from "react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginModal: NextPage<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLogin,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleMasuk = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onLogin(emailInput.trim(), passwordInput);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Login gagal. Silakan coba kembali.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose} // Modal tertutup saat klik luar area[cite: 14]
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="h-[100svh] w-full overflow-y-auto bg-[#012f2b] px-[clamp(24px,8.8vw,43px)] pb-9 pt-8 font-graziemille text-[#c9b99a] md:hidden"
      >
        <div className="mx-auto w-full max-w-[402px]">
          <div className="grid h-12 grid-cols-2 border-b border-[#c9a84c]/20">
            <button
              type="button"
              className="relative font-montserrat text-[12px] font-bold tracking-[4px] text-[#f8c56c]"
            >
              MASUK
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#f8c56c]" />
            </button>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-montserrat text-[12px] font-bold tracking-[4px] text-[#c9b99a]/40 transition-colors hover:text-[#f8c56c]"
            >
              DAFTAR
            </button>
          </div>

          <div className="mt-10">
            <h2 className="font-gilland text-[clamp(30px,7.4vw,36px)] leading-none text-[#f8c56c]">
              Selamat Datang
            </h2>
            <p className="mt-4 text-[clamp(15px,4vw,19px)] leading-none text-[#c9b99a]/40">
              Masuk ke akun Arcanisia Anda
            </p>
          </div>

          <form
            className="mt-11"
            onSubmit={(event) => {
              event.preventDefault();
              handleMasuk();
            }}
          >
            <label
              htmlFor="mobile-login-email"
              className="font-montserrat text-[10px] font-medium tracking-[4px] text-[#f5edd6]"
            >
              EMAIL
            </label>
            <input
              id="mobile-login-email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              required
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              className="mt-3 h-[59px] w-full border border-[#c9a84c]/25 bg-[#012724] px-5 text-[15px] text-[#c9b99a] outline-none transition-colors placeholder:text-[#c9b99a]/20 focus:border-[#f8c56c]/60"
            />

            <label
              htmlFor="mobile-login-password"
              className="mt-6 block font-montserrat text-[10px] font-medium tracking-[4px] text-[#f5edd6]"
            >
              PASSWORD
            </label>
            <div className="relative mt-3">
              <input
                id="mobile-login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan password"
                required
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                className="h-[59px] w-full border border-[#c9a84c]/25 bg-[#012724] px-5 pr-14 text-[15px] text-[#c9b99a] outline-none transition-colors placeholder:text-[#c9b99a]/20 focus:border-[#f8c56c]/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute inset-y-0 right-0 flex w-14 items-center justify-center"
              >
                <SafeImage
                  src="/gambar/login/eye.svg"
                  width={19}
                  height={19}
                  alt=""
                />
              </button>
            </div>

            <button
              type="button"
              disabled
              title="Belum tersedia"
              className="mt-5 ml-auto block cursor-not-allowed text-[13px] tracking-[1px] text-[#f8c56c]/50"
            >
              Lupa password? (belum tersedia)
            </button>

            {errorMessage && (
              <p
                role="alert"
                className="mt-5 text-[13px] leading-relaxed text-[#ff7b86]"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex h-[60px] w-full items-center justify-center gap-4 bg-[linear-gradient(256.8deg,#bda461,#fdde8a_24.52%,#bda461_50%,#fdde8a_75.48%,#bda461)] font-montserrat text-[12px] font-bold tracking-[5px] text-[#012421] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "MEMPROSES..." : "MASUK"}
              <span aria-hidden="true" className="text-[21px] font-normal">
                →
              </span>
            </button>
          </form>

          <div className="my-11 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#c9a84c]/25" />
            <span className="text-[12px] tracking-[5px] text-[#f8c56c]">
              ◆◆◆
            </span>
            <span className="h-px flex-1 bg-[#c9a84c]/25" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              disabled
              title="Belum tersedia"
              className="flex h-[63px] w-full cursor-not-allowed items-center justify-center gap-4 border border-[#c9a84c]/20 text-[15px] text-[#c9b99a]/40"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <SafeImage
                  src="/gambar/login/google.svg"
                  width={18}
                  height={18}
                  alt=""
                />
              </span>
              Lanjutkan dengan Google
            </button>

            <button
              type="button"
              disabled
              title="Belum tersedia"
              className="flex h-[63px] w-full cursor-not-allowed items-center justify-center gap-4 border border-[#c9a84c]/20 text-[15px] text-[#c9b99a]/40"
            >
              <SafeImage
                src="/gambar/login/facebook.svg"
                width={28}
                height={28}
                alt=""
              />
              Lanjutkan dengan Facebook
            </button>
          </div>

          <div className="mt-9 flex items-center justify-center gap-7 text-[14px]">
            <span className="text-[#c9b99a]/35">Belum punya akun?</span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[18px] text-[#f8c56c] transition-opacity hover:opacity-80"
            >
              Daftar sekarang
            </button>
          </div>
        </div>
      </motion.div>

      <div className="hidden md:block">
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik dalam area[cite: 14]
        style={{
          width: "100vw",
          height: "100vw",
          maxWidth: "820px",
          maxHeight: "667.2px",
          position: "relative",
          backgroundColor: "#012421",
          overflow: "hidden",
          display: "flex",
          alignItems: "stretch",
          textAlign: "left",
          fontSize: "28px",
          color: "rgba(201, 185, 154, 0.6)",
          fontFamily: "Gilland",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* BAGIAN KIRI (IMAGE BACKGROUND)[cite: 14] */}
        <div
          style={{
            height: "100%",
            width: "341.7px",
            position: "relative",
            backgroundColor: "#0d2a1a",
            overflow: "hidden",
            flexShrink: "0",
          }}
        >
          <SafeImage
            src="/gambar/login/bg.png"
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              flexShrink: "0",
            }}
            width={1001}
            height={667}
            sizes="100vw"
            alt="Background"
          />
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              background:
                "linear-gradient(180deg, rgba(1, 36, 33, 0.7), #012421)",
              width: "100%",
              height: "100%",
              flexShrink: "0",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              width: "261.7px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexShrink: "0",
            }}
          >
            <SafeImage
              src="/gambar/login/logo-arca.svg"
              style={{ width: "100%", height: "43.7px", position: "relative" }}
              width={173}
              height={43.7}
              sizes="100vw"
              alt="Logo"
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "249.1px",
              left: "40px",
              width: "261.7px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexShrink: "0",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  lineHeight: "35px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kisah Wangi
                <br />
                Nusantara
              </div>
            </div>
            <div
              style={{
                width: "261.7px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px 0px 0px",
                boxSizing: "border-box",
                fontSize: "15px",
                fontFamily: "'Grazie mille'",
              }}
            >
              <div
                style={{
                  width: "276px",
                  position: "relative",
                  lineHeight: "22px",
                  display: "inline-block",
                  flexShrink: "0",
                }}
              >
                Daftar dan nikmati pengalaman belanja eksklusif, akses koleksi
                terbaru, dan penawaran spesial anggota.
              </div>
            </div>
          </div>
          {/* Benefit list[cite: 14] */}
          <div
            style={{
              position: "absolute",
              top: "558.2px",
              left: "40px",
              width: "261.7px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexShrink: "0",
              fontSize: "10px",
              color: "rgba(201, 185, 154, 0.5)",
              fontFamily: "'Grazie mille'",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "4px",
                  position: "relative",
                  borderRadius: "50%",
                  backgroundColor: "#c9a84c",
                }}
              />
              <div style={{ position: "relative", lineHeight: "15px" }}>
                Akses koleksi eksklusif
              </div>
            </div>
            <div
              style={{
                width: "261.7px",
                height: "27px",
                display: "flex",
                alignItems: "center",
                padding: "12px 0px 0px",
                boxSizing: "border-box",
                gap: "10px",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "4px",
                  position: "relative",
                  borderRadius: "50%",
                  backgroundColor: "#c9a84c",
                }}
              />
              <div style={{ position: "relative", lineHeight: "15px" }}>
                Histori pesanan lengkap
              </div>
            </div>
            <div
              style={{
                width: "261.7px",
                height: "27px",
                display: "flex",
                alignItems: "center",
                padding: "12px 0px 0px",
                boxSizing: "border-box",
                gap: "10px",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "4px",
                  position: "relative",
                  borderRadius: "50%",
                  backgroundColor: "#c9a84c",
                }}
              />
              <div style={{ position: "relative", lineHeight: "15px" }}>
                Penawaran anggota khusus
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN (FORM LOGIN)[cite: 14] */}
        <div
          style={{
            height: "100%",
            flex: "1",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "40px",
            boxSizing: "border-box",
            position: "relative",
            isolation: "isolate",
            maxHeight: "742.8px",
            textAlign: "center",
            fontSize: "26px",
            color: "rgba(201, 185, 154, 0.5)",
          }}
        >
          {/* TABS MASUK & DAFTAR[cite: 14] */}
          <div
            style={{
              width: "100%",
              height: "27.7px",
              margin: "0",
              borderBottom: "0.7px solid rgba(201, 168, 76, 0.15)",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-around",
              zIndex: "4",
              flexShrink: "0",
              fontSize: "10px",
              color: "rgba(201, 185, 154, 0.4)",
            }}
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 0px 12px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <b
                style={{
                  position: "relative",
                  letterSpacing: "3px",
                  lineHeight: "15px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MASUK
              </b>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  position: "absolute",
                  margin: "0",
                  top: "26px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                }}
              />
            </div>
            <div
              onClick={onSwitchToRegister}
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 0px 12px",
                cursor: "pointer",
              }}
            >
              <b
                className="hover:text-[#c9a84c] transition-colors"
                style={{
                  position: "relative",
                  letterSpacing: "3px",
                  lineHeight: "15px",
                }}
              >
                DAFTAR
              </b>
            </div>
          </div>

          <div
            style={{
              alignSelf: "stretch",
              height: "10.7px",
              position: "relative",
              zIndex: "0",
              flexShrink: "0",
            }}
          />
          <div
            style={{
              width: "398.3px",
              height: "85px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "32px 0px 0px",
              boxSizing: "border-box",
              gap: "4px",
              zIndex: "1",
              flexShrink: "0",
              textAlign: "left",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flexShrink: "0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  lineHeight: "31.2px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Selamat Datang
              </div>
            </div>
            <div
              style={{
                width: "398.3px",
                height: "21px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "4px 0px 0px",
                boxSizing: "border-box",
                flexShrink: "0",
                fontSize: "14px",
                fontFamily: "'Grazie mille'",
              }}
            >
              <div style={{ position: "relative", lineHeight: "16.5px" }}>
                Masuk ke akun Arcanisia Anda
              </div>
            </div>
          </div>

          {/* FORM INPUT LOGIN */}
          <div
            style={{
              width: "398.3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "28px 0px 0px",
              boxSizing: "border-box",
              zIndex: "2",
              flexShrink: "0",
              fontSize: "9px",
              fontFamily: "'Grazie mille'",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: "398.3px",
                  height: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px 0px 6px",
                  boxSizing: "border-box",
                }}
              >
                <label
                  style={{
                    position: "relative",
                    letterSpacing: "3.6px",
                    lineHeight: "13.5px",
                  }}
                >
                  EMAIL
                </label>
              </div>
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="Masukkan email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  width: "398.3px",
                  height: "43.3px",
                  backgroundColor: "rgba(1, 30, 27, 0.8)",
                  border: "0.7px solid rgba(201, 168, 76, 0.2)",
                  boxSizing: "border-box",
                  padding: "12px 16px",
                  fontSize: "12px",
                  color: "rgba(201, 185, 154, 0.8)",
                  outline: "none",
                  fontFamily: "'Grazie mille'",
                }}
              />
            </div>
            <div
              style={{
                width: "398.3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px 0px 0px",
                boxSizing: "border-box",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <label
                  style={{
                    position: "relative",
                    letterSpacing: "3.6px",
                    lineHeight: "13.5px",
                  }}
                >
                  PASSWORD
                </label>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  position: "relative",
                  paddingTop: "6px",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Masukkan password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    width: "398.3px",
                    height: "43.3px",
                    backgroundColor: "rgba(1, 30, 27, 0.8)",
                    border: "0.7px solid rgba(201, 168, 76, 0.2)",
                    boxSizing: "border-box",
                    padding: "12px 48px 12px 16px",
                    fontSize: "12px",
                    color: "rgba(201, 185, 154, 0.8)",
                    outline: "none",
                    fontFamily: "'Grazie mille'",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  style={{
                    position: "absolute",
                    top: "20.17px",
                    right: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                  }}
                >
                  <SafeImage
                    src="/gambar/login/eye.svg"
                    width={15}
                    height={15}
                    alt="Eye Icon"
                  />
                </button>
              </div>
            </div>

            {errorMessage && (
              <p
                role="alert"
                style={{
                  margin: "14px 0 0",
                  fontSize: "11px",
                  lineHeight: "16px",
                  color: "#ff7b86",
                  textAlign: "left",
                }}
              >
                {errorMessage}
              </p>
            )}

            <div
              style={{
                width: "398.3px",
                height: "31px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                padding: "16px 0px 0px",
                boxSizing: "border-box",
                fontSize: "10px",
              }}
            >
              <div
                className="hover:text-[#c9a84c] transition-colors"
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "1px",
                    lineHeight: "15px",
                  }}
                >
                  Lupa password?
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px 0px 0px",
                fontSize: "11px",
                color: "#012421",
              }}
            >
              <button
                type="button"
                onClick={handleMasuk}
                disabled={isSubmitting}
                className="hover:opacity-90 transition-opacity"
                style={{
                  width: "398.3px",
                  height: "44.5px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 0px",
                  boxSizing: "border-box",
                  border: "none",
                  cursor: "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "3.3px",
                    lineHeight: "16.5px",
                    fontWeight: "bold",
                  }}
                >
                  {isSubmitting ? "MEMPROSES..." : "MASUK"}
                </div>
              </button>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                height: "44px",
                display: "flex",
                alignItems: "center",
                padding: "24px 0px 0px",
                boxSizing: "border-box",
                gap: "12px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  flex: "1",
                  backgroundColor: "rgba(201, 168, 76, 0.15)",
                }}
              />
              <div
                style={{
                  height: "1px",
                  flex: "1",
                  backgroundColor: "rgba(201, 168, 76, 0.15)",
                }}
              />
            </div>

            <div
              style={{
                alignSelf: "stretch",
                height: "122.7px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "24px 0px 0px",
                boxSizing: "border-box",
                gap: "8px",
                fontSize: "11px",
                color: "#c9b99a",
              }}
            >
              <button
                className="hover:bg-white/5 transition-colors"
                style={{
                  width: "398.3px",
                  background: "transparent",
                  border: "0.7px solid rgba(201, 168, 76, 0.15)",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 0px",
                  gap: "12px",
                  cursor: "pointer",
                  color: "inherit",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <div
                  style={{
                    height: "21px",
                    width: "21px",
                    borderRadius: "13.52px",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SafeImage
                    src="/gambar/login/google.svg"
                    width={13}
                    height={13}
                    alt="Google"
                  />
                </div>
                <div style={{ position: "relative", lineHeight: "16.5px" }}>
                  Lanjutkan dengan Google
                </div>
              </button>
              <button
                className="hover:bg-white/5 transition-colors"
                style={{
                  width: "398.3px",
                  background: "transparent",
                  border: "0.7px solid rgba(201, 168, 76, 0.15)",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 0px",
                  gap: "12px",
                  cursor: "pointer",
                  color: "inherit",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <SafeImage
                  src="/gambar/login/facebook.svg"
                  width={21}
                  height={21}
                  alt="Facebook"
                />
                <div style={{ position: "relative", lineHeight: "16.5px" }}>
                  Lanjutkan dengan Facebook
                </div>
              </button>
            </div>
          </div>

          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 0px 0px",
              zIndex: "3",
              fontSize: "11px",
              color: "rgba(201, 185, 154, 0.4)",
              fontFamily: "'Grazie mille'",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                height: "24px",
              }}
            >
              <span>Belum punya akun?</span>
              <span
                onClick={onSwitchToRegister}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  fontSize: "16px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Daftar sekarang
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginModal;
