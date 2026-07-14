"use client"

import React, { ButtonHTMLAttributes, ReactNode } from "react";

// Mewarisi atribut standar button (seperti onClick, disabled, tipe)
interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <button
      {...props} // Memungkinkan passing onClick, className, dll
      style={{
        position: "relative",
        borderRadius: "5.11px",
        background:
          "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461) padding-box, linear-gradient(86.7deg, #ffeeab, rgba(255, 238, 171, 0) 25%, rgba(255, 238, 171, 0) 75%, #ffeeab) border-box",
        border: "0.6px solid transparent",
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10.2px 17px",
        textAlign: "center",
        fontSize: "9.28px",
        color: "#124b46",
        fontFamily: "Gilland, sans-serif", // Fallback font ditambahkan
        cursor: "pointer", // Tambahan agar terlihat seperti tombol saat di-hover
        ...style, // Memungkinkan penimpaan style jika diperlukan
      }}
    >
      <b
        style={{
          position: "relative",
          letterSpacing: "1.92px",
          lineHeight: "10.54px",
        }}
      >
        {children}
      </b>
    </button>
  );
};

export default GoldButton;
