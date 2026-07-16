"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { motion } from "framer-motion";

// Data dinamis untuk informasi kontak
const contactData = [
  {
    id: 1,
    title: "LOCATION",
    iconSrc: "/gambar/seksi%208/location.svg",
    lines: ["Jl. Sudirman No. 88", "Jakarta Pusat, Indonesia 10220"],
  },
  {
    id: 2,
    title: "EMAIL",
    iconSrc: "/gambar/seksi%208/email.svg",
    lines: ["hello@arcanisia.com", "support@arcanisia.com"],
  },
  {
    id: 3,
    title: "FOLLOW US",
    iconSrc: "/gambar/seksi%208/ig.svg",
    lines: ["@arcanisia.scent", "@arcanisia_official"],
  },
];

const Subscribe: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "692.3px",
        position: "relative",
        backgroundColor: "#091812",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "center",
        fontSize: "10px",
        color: "#f5edd6",
        fontFamily: "'Grazie mille'",
      }}
    >
      {/* Garis Pembatas Atas */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        style={{
          alignSelf: "stretch",
          height: "1px",
          position: "relative",
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(201, 168, 76, 0.5) 50%, rgba(0, 0, 0, 0))",
        }}
      />

      {/* Bagian Newsletter (Atas) */}
      <div
        style={{
          alignSelf: "stretch",
          height: "501.9px",
          position: "relative",
          background: "linear-gradient(180deg, #071615, #012421)",
          overflow: "hidden",
          flexShrink: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ornamen Lingkaran - Dianimasikan Scale-In bergantian */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "0.7px solid rgba(201, 168, 76, 0.05)",
            boxSizing: "border-box",
            width: "280px",
            height: "280px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "0.7px solid rgba(201, 168, 76, 0.05)",
            boxSizing: "border-box",
            width: "380px",
            height: "380px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "0.7px solid rgba(201, 168, 76, 0.05)",
            boxSizing: "border-box",
            width: "480px",
            height: "480px",
          }}
        />

        {/* Konten Teks & Input */}
        <div
          style={{
            zIndex: 1,
            width: "100%",
            maxWidth: "672px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                letterSpacing: "5px",
                lineHeight: "15px",
              }}
            >
              STAY CONNECTED
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: "672px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 0px 0px",
              boxSizing: "border-box",
              fontSize: "56px",
              fontFamily: "Gilland",
            }}
          >
            <div
              style={{
                position: "relative",
                lineHeight: "72.8px",
                background:
                  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Join the Journey
              <br />
              of the Nusantara
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: "672px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 0px 0px",
              boxSizing: "border-box",
              fontSize: "13px",
              color: "#c9b99a",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", lineHeight: "26px" }}>
              Subscribe to receive exclusive launches, island stories, and first
              access to limited edition fragrances.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 0px 0px",
              textAlign: "left",
              fontSize: "12px",
              color: "rgba(201, 185, 154, 0.4)",
              fontFamily: "Montserrat",
            }}
          >
            <div
              style={{
                height: "51.3px",
                display: "flex",
                alignItems: "flex-start",
                maxWidth: "448px",
                width: "100%",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  backgroundColor: "#012421",
                  borderTop: "0.7px solid rgba(201, 185, 154, 0.7)",
                  borderBottom: "0.7px solid rgba(201, 185, 154, 0.7)",
                  borderLeft: "0.7px solid rgba(201, 185, 154, 0.7)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    position: "relative",
                    fontWeight: "300",
                  }}
                >
                  Enter your email
                </div>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  cursor: "pointer",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 32px",
                  gap: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#091812",
                  transition: "opacity 0.3s ease",
                }}
                className="hover:opacity-90"
              >
                <b
                  style={{
                    position: "relative",
                    letterSpacing: "2px",
                    lineHeight: "15px",
                  }}
                >
                  SUBSCRIBE
                </b>
                <Image
                  src="/gambar/seksi%208/subscribe.svg"
                  style={{
                    height: "14px",
                    width: "14px",
                    position: "relative",
                  }}
                  width={14}
                  height={14}
                  sizes="100vw"
                  alt="Subscribe Icon"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bagian Informasi Kontak (Bawah - Dinamis) */}
      <div
        style={{
          alignSelf: "stretch",
          backgroundColor: "#012421",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 24px",
          textAlign: "left",
          fontSize: "9px",
          color: "#f8c56c",
          fontFamily: "Montserrat",
        }}
      >
        <div
          style={{
            width: "1074px",
            position: "relative",
            maxWidth: "1280px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {contactData.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.2 * index,
                ease: "easeOut",
              }}
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  height: "40px",
                  width: "40px",
                  border: "0.7px solid rgba(201, 168, 76, 0.3)",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={contact.iconSrc}
                  style={{
                    height: "16px",
                    width: "16px",
                    position: "relative",
                  }}
                  width={16}
                  height={16}
                  sizes="100vw"
                  alt={`${contact.title} Icon`}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
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
                      letterSpacing: "2.7px",
                      lineHeight: "13.5px",
                      fontWeight: "600",
                    }}
                  >
                    {contact.title}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "4px 0px 0px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                    color: "#c9b99a",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "21.6px",
                      fontWeight: "300",
                      flexShrink: "0",
                    }}
                  >
                    {contact.lines.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < contact.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
