"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Data JSON Dinamis untuk 4 item di bawah[cite: 22]
const essenceData = [
  {
    id: 1,
    imgSrc: "/gambar/seksi%206/1.svg",
    topTitle: "LOCAL PRIDE",
    mainTitle: "Kebanggaan Lokal",
    description:
      "A deep sense of pride for local identity, products, and craftsmanship that reflects the unique values and artistry of each region.",
  },
  {
    id: 2,
    imgSrc: "/gambar/seksi%206/2.svg",
    topTitle: "SUSTAINABILITY",
    mainTitle: "Keberlanjutan",
    description:
      "Creating products that are environmentally friendly, using materials that can be managed and maintained in a sustainable manner.",
  },
  {
    id: 3,
    imgSrc: "/gambar/seksi%206/3.svg",
    topTitle: "AESTHETICS & ART",
    mainTitle: "Estetika & Seni",
    description:
      "Products with strong visual design rooted in inspiration from the artistic heritage and local craftsmanship of Indonesia.",
  },
  {
    id: 4,
    imgSrc: "/gambar/seksi%206/4.svg",
    topTitle: "EDUCATION & AWARENESS",
    mainTitle: "Edukasi & Kesadaran",
    description:
      "Through perfume, Arcanisia highlights Indonesia's cultural richness, and the extraordinary beauty of its visual landscapes.",
  },
];

const Honesty = () => {
  return (
    // Wrapper luar untuk men-center-kan seluruh body section[cite: 22]
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#012421",
        overflow: "hidden",
      }}
    >
      {/* Container Utama (Lebar Fix 1302px)[cite: 22] */}
      <div
        style={{
          width: "100%",
          height: "857px",
          position: "relative",
          textAlign: "center",
          fontSize: "10px",
          color: "rgba(245, 237, 214, 0.8)",
          fontFamily: "'Grazie mille'",
        }}
      >
        {/* === BAGIAN ATAS ===[cite: 22] */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "377px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            isolation: "isolate",
            minHeight: "360px",
          }}
        >
          {/* Gambar Background Utama - Muncul dari bawah[cite: 22] */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: "100%",
              height: "868px",
              position: "absolute",
              margin: "0",
              top: "-451px",
              left: "0px",
              zIndex: "0",
              flexShrink: "0",
            }}
          >
            <Image
              src="/gambar/seksi%206/bg.png"
              style={{ objectFit: "cover" }}
              fill
              sizes="100vw"
              alt="Background"
            />
          </motion.div>

          {/* Overlay Gradient[cite: 22] */}
          <div
            style={{
              width: "100%",
              height: "412.7px",
              position: "absolute",
              margin: "0",
              top: "0px",
              left: "0px",
              background:
                "linear-gradient(180deg, rgba(1, 36, 33, 0.85), rgba(1, 36, 33, 0.75) 42.31%, #012421 88.94%)",
              zIndex: "1",
              flexShrink: "0",
            }}
          />

          {/* Konten Judul Atas[cite: 22] */}
          <div
            style={{
              width: "100%",
              height: "412.7px",
              margin: "0",
              position: "absolute",
              top: "0px",
              left: "0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 24px",
              boxSizing: "border-box",
              zIndex: "2",
              flexShrink: "0",
            }}
          >
            <div
              style={{
                width: "632px",
                height: "146px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* Subtitle "THE ESSENCE" - Scale in dari tengah berurutan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{
                  width: "631.7px",
                  height: "39px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 0px 0px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "5px",
                    lineHeight: "15px",
                  }}
                >
                  THE ESSENCE
                </div>
              </motion.div>

              {/* Title Utama "Honesty of Nusantara" - Scale in dari tengah berurutan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{
                  width: "632px",
                  height: "76px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "40px",
                  fontFamily: "Gilland",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    lineHeight: "88px",
                    background:
                      "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    flexShrink: "0",
                  }}
                >
                  Honesty of Nusantara
                </div>
              </motion.div>
            </div>

            {/* Gambar Ornamen - Scale in dari tengah berurutan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Image
                src="/gambar/seksi%206/ornamen.svg"
                style={{
                  width: "213.2px",
                  height: "15.3px",
                  position: "relative",
                }}
                width={213.2}
                height={15.3}
                sizes="100vw"
                alt="Ornament"
              />
            </motion.div>
          </div>
        </div>

        {/* === BAGIAN BAWAH (DINAMIS JSON) ===[cite: 22] */}
        <div
          style={{
            position: "absolute",
            top: "377px",
            left: "0px",
            backgroundColor: "#012421",
            width: "100%",
            height: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "90px 130px 107px 129px",
            boxSizing: "border-box",
            fontSize: "7.43px",
            color: "#c9a84c",
            fontFamily: "Montserrat",
          }}
        >
          <div
            style={{
              width: "1043.3px",
              height: "282.6px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {essenceData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                // Penambahan delay (0.2 * index) agar muncul bergantian
                transition={{
                  duration: 0.8,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "238.3px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "33px",
                  }}
                >
                  {/* Gambar Icon Dinamis */}
                  <Image
                    src={item.imgSrc}
                    style={{
                      width: "69.1px",
                      height: "69.1px",
                      position: "relative",
                    }}
                    width={69.1}
                    height={69.1}
                    sizes="100vw"
                    alt={item.topTitle}
                  />

                  <div
                    style={{
                      alignSelf: "stretch",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "19.8px",
                    }}
                  >
                    {/* Top Title */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          letterSpacing: "2.23px",
                          lineHeight: "11.15px",
                          fontWeight: "500",
                        }}
                      >
                        {item.topTitle}
                      </div>
                    </div>

                    {/* Main Title */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "3.3px 0px 0px",
                        fontSize: "16.51px",
                        color: "#f5edd6",
                        fontFamily: "Gilland",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            lineHeight: "24.77px",
                          }}
                        >
                          {item.mainTitle}
                        </div>
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <div
                      style={{
                        width: "198.7px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "13.2px 0px 0px",
                        boxSizing: "border-box",
                        fontSize: "9.08px",
                        color: "rgba(201, 185, 154, 0.7)",
                      }}
                    >
                      <div
                        style={{
                          width: "199px",
                          position: "relative",
                          lineHeight: "17.25px",
                          fontWeight: "300",
                          display: "inline-block",
                          textAlign: "center",
                        }}
                      >
                        {item.description}
                      </div>
                    </div>

                    {/* Garis Bawah (Gold Line) */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "16.5px 0px 0px",
                      }}
                    >
                      <div
                        style={{
                          width: "26.4px",
                          height: "0.8px",
                          position: "relative",
                          backgroundColor: "rgba(201, 168, 76, 0.3)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Honesty;
