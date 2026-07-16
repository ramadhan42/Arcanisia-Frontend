"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { motion } from "framer-motion";

const About: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1295px",
        position: "relative",
        background: "linear-gradient(180deg, #00221f, #022421 50%, #00221f)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontSize: "11.56px",
        color: "rgba(245, 237, 214, 0.8)",
        fontFamily: "'Grazie mille'",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "100px 37px",
          boxSizing: "border-box",
          maxWidth: "986.79px",
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
          {/* Subtitle ABOUT ARCANISIA */}
          <motion.div
            initial={{ opacity: 0, y: -20, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
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
                letterSpacing: "8.48px",
                lineHeight: "10.41px",
              }}
            >
              ABOUT ARCANISIA
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: -30, x: -30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              width: "912.8px",
              height: "73.2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12.3px 0px 0px",
              boxSizing: "border-box",
              fontSize: "37px",
              fontFamily: "Gilland",
            }}
          >
            <div
              style={{
                position: "relative",
                lineHeight: "60.29px",
                background:
                  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              More Than a Fragrance
            </div>
          </motion.div>

          {/* Ornamen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              width: "912.8px",
              height: "33.9px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "18.5px 0px 0px",
              boxSizing: "border-box",
            }}
          >
            <Image
              src="/gambar/seksi%203/ornament.svg"
              alt="Ornament"
              style={{ height: "14.6px", width: "100%", position: "relative" }}
              width={204}
              height={15}
              sizes="100vw"
            />
          </motion.div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "49.3px 0px 0px",
            fontSize: "10.02px",
            color: "#f8c56c",
          }}
        >
          {/* Gambar Pemandangan Borneo - Muncul dari bawah */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            style={{
              width: "912px",
              height: "578px",
              position: "relative",
              overflow: "hidden",
              flexShrink: "0",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "520px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/gambar/seksi%203/borneo2.jpg"
                alt="Borneo Landscape"
                fill
                style={{
                  objectFit: "cover",
                  maskImage:
                    "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
                }}
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Kontainer Teks Bawah */}
          <div
            style={{
              width: "518.1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              maxWidth: "518.07px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "20.04px",
              }}
            >
              <i
                style={{
                  width: "518.1px",
                  position: "relative",
                  lineHeight: "34.08px",
                  display: "inline-block",
                }}
              >
                "Born to reignite national pride through the art of scent the
                leading narrator of the Nusantara."
              </i>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24.7px 0px 0px",
                color: "#c9b99a",
              }}
            >
              <div
                style={{
                  width: "518.1px",
                  position: "relative",
                  lineHeight: "22.05px",
                  display: "inline-block",
                }}
              >
                Arcanisia was born not merely to present fragrance, but to
                reignite national pride for Indonesia — from its uncharted
                islands to its rarely uncovered cultural riches — through the
                fusion of visual art and storytelling aromas.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15.4px 0px 0px",
                color: "rgba(201, 185, 154, 0.6)",
              }}
            >
              <div
                style={{
                  width: "518.1px",
                  position: "relative",
                  lineHeight: "22.05px",
                  display: "inline-block",
                }}
              >
                Every bottle is an educational medium and sensory experience
                that brings the story of Indonesia into everyday life —
                committed to sustainability and environmental preservation.
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistik / Detail Kolom Bawah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "49.3px 0px 0px",
            fontSize: "32.38px",
            color: "#f5edd6",
            fontFamily: "Gilland",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "30.8px 0px 0px",
              boxSizing: "border-box",
              maxWidth: "394.72px",
            }}
          >
            <div
              style={{
                flex: "1",
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
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    lineHeight: "32.38px",
                    background:
                      "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  6
                </div>
              </div>
              <div
                style={{
                  width: "131.6px",
                  height: "15.4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6.2px 0px 0px",
                  boxSizing: "border-box",
                  fontSize: "6.17px",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "1.54px",
                    lineHeight: "9.25px",
                  }}
                >
                  FRAGRANCES
                </div>
              </div>
            </div>

            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                isolation: "isolate",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: "0",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    lineHeight: "32.38px",
                    background:
                      "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  100%
                </div>
              </div>
              <div
                style={{
                  width: "131.6px",
                  height: "15.4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6.2px 0px 0px",
                  boxSizing: "border-box",
                  zIndex: "1",
                  fontSize: "6.17px",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "1.54px",
                    lineHeight: "9.25px",
                  }}
                >
                  NATURAL ORIGINS
                </div>
              </div>
              <div
                style={{
                  width: "0.8px",
                  height: "24.7px",
                  position: "absolute",
                  margin: "0",
                  top: "6.17px",
                  left: "0px",
                  backgroundColor: "#f8c56c",
                  zIndex: "2",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                isolation: "isolate",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: "0",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    lineHeight: "32.38px",
                    background:
                      "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  6
                </div>
              </div>
              <div
                style={{
                  width: "131.6px",
                  height: "15.4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6.2px 0px 0px",
                  boxSizing: "border-box",
                  zIndex: "1",
                  fontSize: "6.17px",
                  fontFamily: "'Grazie mille'",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "1.54px",
                    lineHeight: "9.25px",
                  }}
                >
                  ISLANDS
                </div>
              </div>
              <div
                style={{
                  width: "0.8px",
                  height: "24.7px",
                  position: "absolute",
                  margin: "0",
                  top: "6.17px",
                  left: "0px",
                  backgroundColor: "#f8c56c",
                  zIndex: "2",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default About;
