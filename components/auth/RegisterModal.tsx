// ==========================================
// 3. RegisterModal.tsx
// ==========================================
import type { NextPage } from "next";
import Image from "next/image";
import { motion } from "framer-motion";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: NextPage<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  if (!isOpen) return null;

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
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
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
        {/* BAGIAN KIRI (IMAGE BACKGROUND) */}
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
          <Image
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
            <Image
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
              top: "246.1px",
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
          <div
            style={{
              position: "absolute",
              top: "552.2px",
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "relative", lineHeight: "15px" }}>
                  Akses koleksi eksklusif
                </div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "relative", lineHeight: "15px" }}>
                  Histori pesanan lengkap
                </div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "relative", lineHeight: "15px" }}>
                  Penawaran anggota khusus
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN (FORM DAFTAR) */}
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
            fontSize: "26px",
            color: "rgba(201, 185, 154, 0.4)",
          }}
        >
          {/* TABS MASUK & DAFTAR */}
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
              onClick={onSwitchToLogin}
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
                MASUK
              </b>
            </div>

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
                DAFTAR
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
              color: "rgba(201, 185, 154, 0.5)",
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
                Bergabung dengan Kami
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
                Buat akun dan mulai perjalanan aromatik Anda
              </div>
            </div>
          </div>

          {/* FORM INPUT DAFTAR */}
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
              color: "#f5edd6",
              fontFamily: "'Grazie mille'",
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
                  NAMA LENGKAP
                </label>
              </div>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
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
                placeholder="nama@email.com"
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
                  type="password"
                  placeholder="Min. 6 karakter"
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
                <div
                  style={{
                    position: "absolute",
                    top: "20.17px",
                    right: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src="/gambar/login/eye.svg"
                    width={15}
                    height={15}
                    alt="Eye Icon"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                width: "398.3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px 0px 0px",
                boxSizing: "border-box",
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
                  KONFIRMASI PASSWORD
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
                  type="password"
                  placeholder="Ulangi password"
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
                <div
                  style={{
                    position: "absolute",
                    top: "20.17px",
                    right: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src="/gambar/login/eye.svg"
                    width={15}
                    height={15}
                    alt="Eye Icon"
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                width: "398.3px",
                height: "34px",
                display: "flex",
                alignItems: "flex-start",
                padding: "16px 0px 0px",
                boxSizing: "border-box",
                gap: "12px",
                fontSize: "10px",
                color: "rgba(201, 185, 154, 0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  paddingTop: "2px",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    height: "14px",
                    width: "14px",
                    cursor: "pointer",
                    accentColor: "#c9a84c",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "relative", lineHeight: "16.25px" }}>
                  <span style={{ lineHeight: "16.25px" }}>
                    Saya menyetujui{" "}
                  </span>
                  <span
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      textDecoration: "underline",
                      background:
                        "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: "16.25px",
                    }}
                  >
                    Syarat & Ketentuan
                  </span>
                  <span style={{ lineHeight: "16.25px" }}> dan </span>
                  <span
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      textDecoration: "underline",
                      background:
                        "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: "16.25px",
                    }}
                  >
                    Kebijakan Privasi
                  </span>
                  <span style={{ lineHeight: "16.25px" }}> Arcanisia.</span>
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
                textAlign: "center",
                fontSize: "11px",
                color: "#091812",
              }}
            >
              <button
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
                  BUAT AKUN
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
              <span style={{ color: "rgba(201, 185, 154, 0.4)" }}>
                Sudah punya akun?
              </span>
              <span
                onClick={onSwitchToLogin}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  fontSize: "16px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Masuk di sini
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterModal;
