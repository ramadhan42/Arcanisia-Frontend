"use client";

import type { NextPage } from 'next';
import Image from "next/image";
import { motion } from "framer-motion";

// Data Dinamis untuk Link Menu Footer
const footerLinks = {
  collection: [
    "Secret of Buton",
    "Whisper of Raja Ampat",
    "Mystique of Komodo",
    "Emerald of Borneo",
    "Soul of Lombok",
    "Glow of Borobudur"
  ],
  company: [
    "About Arcanisia",
    "Our Mission",
    "Brand Values",
    "Logo Story",
    "Sustainability"
  ],
  support: [
    "FAQ",
    "Shipping Info",
    "Returns Policy",
    "Track Order",
    "Contact Us"
  ],
  legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy"
  ]
};

const Footer: NextPage = () => {
  return (
    // Wrapper Utama - Menggunakan flex dan justify-center agar konten selalu di tengah
    <footer 
      style={{ 
        width: "100%", 
        position: "relative", 
        backgroundColor: "#061716", 
        overflow: "hidden", 
        display: "flex",
        justifyContent: "center",
        textAlign: "left", 
        fontSize: "11px", 
        color: "#f8c56c", 
        fontFamily: "'Grazie mille'" 
      }}
    >
      {/* Background overlay redup */}
      <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", opacity: "0.03", backgroundColor: "#ffffff" }} />
      
      {/* Kontainer Inner (Maksimal 1280px dan otomatis di tengah) */}
      <div 
        style={{ 
          width: "100%", 
          maxWidth: "1280px", 
          display: "flex", 
          flexDirection: "column", 
          padding: "64px 24px", 
          boxSizing: "border-box",
          zIndex: 1
        }}
      >
        {/* === BAGIAN ATAS (KOLOM-KOLOM) === */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px", width: "100%" }}>
          
          {/* Kolom 1: Logo & Deskripsi - Animasi masuk dari kiri */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ width: "464px", display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: "13px", color: "rgba(201, 185, 154, 0.6)" }}
          >
            <Image 
              src="/gambar/footer/logo arca fix 1.svg" 
              style={{ width: "151.1px", height: "45.7px", position: "relative" }} 
              width={151} 
              height={46} 
              sizes="100vw" 
              alt="Arcanisia Logo" 
            />
            <div style={{ padding: "24px 0px 0px", lineHeight: "22px" }}>
              A luxury fragrance house born from the heart of the Indonesian archipelago. Six islands. Six stories. One nation breathed into being through scent.
            </div>
            <div style={{ padding: "24px 0px 0px" }}>
              <Image 
                src="/gambar/footer/ornamen.svg" 
                style={{ width: "172px", height: "21.6px", position: "relative" }} 
                width={172} 
                height={22} 
                sizes="100vw" 
                alt="Arcanisia Ornament" 
              />
            </div>
          </motion.div>

          {/* Kolom 2: COLLECTION - Animasi slide-up */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: "150px" }}
          >
            <div style={{ letterSpacing: "3.15px", lineHeight: "13.5px", marginBottom: "24px" }}>
              COLLECTION
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "11px", color: "rgba(201, 185, 154, 0.5)" }}>
              {footerLinks.collection.map((item, index) => (
                <div key={index} style={{ lineHeight: "16.5px", cursor: "pointer", transition: "color 0.3s" }} className="hover:text-[#f8c56c]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kolom 3: COMPANY - Animasi slide-up */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: "150px" }}
          >
            <div style={{ letterSpacing: "3.15px", lineHeight: "13.5px", marginBottom: "24px" }}>
              COMPANY
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "rgba(201, 185, 154, 0.5)" }}>
              {footerLinks.company.map((item, index) => (
                <div key={index} style={{ lineHeight: "16.5px", cursor: "pointer", transition: "color 0.3s" }} className="hover:text-[#f8c56c]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kolom 4: SUPPORT - Animasi slide-up */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: "150px" }}
          >
            <div style={{ letterSpacing: "3.15px", lineHeight: "13.5px", marginBottom: "24px" }}>
              SUPPORT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "rgba(201, 185, 154, 0.5)" }}>
              {footerLinks.support.map((item, index) => (
                <div key={index} style={{ lineHeight: "16.5px", cursor: "pointer", transition: "color 0.3s" }} className="hover:text-[#f8c56c]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* === BAGIAN BAWAH (COPYRIGHT & LEGAL) === */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0px 0px", fontSize: "12px", color: "rgba(201, 185, 154, 0.3)" }}
        >
          <div style={{ width: "100%", borderTop: "0.7px solid rgba(201, 168, 76, 0.1)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", padding: "32px 0px 0px", gap: "20px" }}>
            
            {/* Copyright */}
            <div style={{ letterSpacing: "1px", lineHeight: "15px" }}>
              © 2026 Arcanisia Scent. All rights reserved. Made with love for Indonesia.
            </div>
            
            {/* Legal Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", textAlign: "center" }}>
              {footerLinks.legal.map((item, index) => (
                <div key={index} style={{ lineHeight: "15px", cursor: "pointer", transition: "color 0.3s" }} className="hover:text-[#f8c56c]">
                  {item}
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;