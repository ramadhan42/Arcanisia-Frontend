"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 1. Data Misi (MOCK DATA / JSON)
const missionData = [
  {
    id: "01",
    title: "Cultural Storytelling",
    description:
      "Telling the beauty of Indonesian culture and islands through the art of fragrance and artistic perfume design.",
  },
  {
    id: "02",
    title: "Accessible Luxury",
    description:
      "Presenting high-quality perfumes at accessible prices, so that more people can experience the splendor of the Nusantara.",
  },
  {
    id: "03",
    title: "Indonesian Aesthetic",
    description:
      "Using designs and packaging that represent the aesthetic values and unique character of Indonesia.",
  },
  {
    id: "04",
    title: "Environmental Stewardship",
    description:
      "Contributing to environmental sustainability by supporting organizations dedicated to the preservation of Indonesia's nature.",
  },
  {
    id: "05",
    title: "Education & Pride",
    description:
      "Becoming an educational medium that cultivates pride and love for the beauty and richness of Indonesia's cultural heritage.",
  },
];

const Missions = () => {
  return (
    // Section Utama
    <section
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#134b46",
        background: "linear-gradient(180deg, rgba(0, 34, 31, 1), #012421)",
      }}
    >
      {/* --- BAGIAN ATAS --- */}
      <div
        style={{
          width: "100%",
          height: "412.7px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 24px",
          boxSizing: "border-box",
          textAlign: "center",
          fontSize: "10px",
          color: "#f5edd6",
          fontFamily: "'Grazie mille'",
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 34, 31, 0.5), #012421), url('/gambar/seksi%205/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
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
          {/* Subtitle "OUR MISSION" */}
          <motion.div
            initial={{ opacity: 0, y: -20, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
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
              OUR MISSION
            </div>
          </motion.div>

          {/* Judul Utama "Guided by Purpose" */}
          <motion.div
            initial={{ opacity: 0, y: -30, x: -30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
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
              Guided by Purpose
            </div>
          </motion.div>
        </div>

        {/* Gambar Ornamen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/gambar/seksi%204/ornamen.svg"
            style={{ width: "213.2px", height: "15.3px", position: "relative" }}
            width={213}
            height={15}
            sizes="100vw"
            alt="Ornament"
          />
        </motion.div>
      </div>

      {/* --- BAGIAN BAWAH --- */}
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "47.6px 17.8px",
          boxSizing: "border-box",
          maxWidth: "761.48px",
          textAlign: "right",
          fontSize: "47.59px",
          color: "#f5edd6",
          fontFamily: "Gilland",
          margin: "0 auto",
          background: "linear-gradient(180deg, rgba(0, 34, 31, 0.5), #012421)",
        }}
      >
        {/* Looping Data JSON Dinamis dengan efek Staggered */}
        {missionData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            // Penambahan delay (0.2 * index) agar muncul bergantian
            transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeOut" }}
            style={{
              alignSelf: "stretch",
              borderBottom: "0.5px solid rgba(201, 168, 76, 0.1)",
              display: "flex",
              alignItems: "flex-start",
              padding: "23.8px 0px",
              gap: "29.7px",
            }}
          >
            {/* Nomor (01, 02, dst) */}
            <div
              style={{
                width: "59.5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  position: "relative",
                  lineHeight: "47.59px",
                  background:
                    "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.id}
              </div>
            </div>

            {/* Garis Vertikal & Titik Emas */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5.9px 0px 0px",
              }}
            >
              <div
                style={{
                  width: "0.7px",
                  height: "17.8px",
                  position: "relative",
                  backgroundColor: "rgba(201, 168, 76, 0.2)",
                  flexShrink: "0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "3px 0px",
                  flexShrink: "0",
                }}
              >
                <div
                  style={{
                    width: "4.5px",
                    height: "4.5px",
                    position: "relative",
                    borderRadius: "16634850px",
                    backgroundColor: "rgba(201, 168, 76, 0.3)",
                  }}
                />
              </div>
              <div
                style={{
                  width: "0.7px",
                  flex: "1",
                  position: "relative",
                  backgroundColor: "rgba(201, 168, 76, 0.1)",
                  flexShrink: "0",
                }}
              />
            </div>

            {/* Judul & Deskripsi */}
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "3px 0px 5.9px",
                textAlign: "left",
                fontSize: "20.82px",
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
                <div style={{ position: "relative", lineHeight: "24.99px" }}>
                  {item.title}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "5.9px 0px 0px",
                  fontSize: "9.67px",
                  color: "rgba(201, 185, 154, 0.6)",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <div
                  style={{
                    width: "416.4px",
                    position: "relative",
                    lineHeight: "19.33px",
                    display: "inline-block",
                  }}
                >
                  {item.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Missions;
