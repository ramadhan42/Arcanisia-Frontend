import type { NextPage } from "next";
import Image from "next/image";

const OrdersModal: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#0d1f16",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "768px",
        textAlign: "left",
        fontSize: "9px",
        color: "rgba(201, 168, 76, 0.5)",
        fontFamily: "Montserrat",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          borderBottom: "0.7px solid rgba(201, 168, 76, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "122.9px",
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
                letterSpacing: "4.5px",
                lineHeight: "13.5px",
              }}
            >
              AKUN SAYA
            </div>
          </div>
          <div
            style={{
              width: "122.9px",
              height: "38px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "2px 0px 0px",
              boxSizing: "border-box",
              fontSize: "24px",
              color: "#f5edd6",
              fontFamily: "'Cormorant Garamond'",
            }}
          >
            <div style={{ position: "relative", lineHeight: "36px" }}>
              <span
                style={{ fontWeight: "300", lineHeight: "36px" }}
              >{`Pesanan `}</span>
              <i style={{ fontWeight: "300", lineHeight: "36px" }}>Saya</i>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "36px",
            width: "36px",
            border: "0.7px solid rgba(201, 168, 76, 0.25)",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: "15px", width: "100%", position: "relative" }}
            width={15}
            height={15}
            sizes="100vw"
            alt=""
            src={""}
          />
        </div>
      </div>
      <div
        style={{
          alignSelf: "stretch",
          height: "42.2px",
          borderBottom: "0.7px solid rgba(201, 168, 76, 0.1)",
          boxSizing: "border-box",
          overflow: "hidden",
          flexShrink: "0",
          display: "flex",
          alignItems: "flex-start",
          padding: "0px 8px",
          textAlign: "center",
          color: "rgba(201, 185, 154, 0.4)",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            width: "110.2px",
            position: "relative",
            color: "#c9a84c",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "14.33px",
              left: "22px",
              letterSpacing: "2.25px",
              lineHeight: "13.5px",
              fontWeight: "600",
            }}
          >
            SEMUA
          </div>
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "71.25px",
              backgroundColor: "#c9a84c",
              width: "18.9px",
              height: "14px",
              fontSize: "8px",
              color: "#091812",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: "7px",
                letterSpacing: "2.25px",
                lineHeight: "12px",
                fontWeight: "600",
              }}
            >
              3
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "40.5px",
              left: "0px",
              backgroundColor: "#c9a84c",
              width: "110.2px",
              height: "1px",
            }}
          />
        </div>
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 20px",
          }}
        >
          <div
            style={{
              position: "relative",
              letterSpacing: "2.25px",
              lineHeight: "13.5px",
              fontWeight: "600",
            }}
          >
            MENUNGGU
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            width: "129.6px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "14.33px",
              left: "21px",
              letterSpacing: "2.25px",
              lineHeight: "13.5px",
              fontWeight: "600",
            }}
          >
            DIPROSES
          </div>
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "92.26px",
              backgroundColor: "rgba(201, 168, 76, 0.2)",
              width: "17.3px",
              height: "14px",
              fontSize: "8px",
              color: "rgba(201, 168, 76, 0.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: "7px",
                letterSpacing: "2.25px",
                lineHeight: "12px",
                fontWeight: "600",
              }}
            >
              1
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            width: "116.8px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "14.33px",
              left: "21px",
              letterSpacing: "2.25px",
              lineHeight: "13.5px",
              fontWeight: "600",
            }}
          >
            DIKIRIM
          </div>
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "79.54px",
              backgroundColor: "rgba(201, 168, 76, 0.2)",
              width: "17.3px",
              height: "14px",
              fontSize: "8px",
              color: "rgba(201, 168, 76, 0.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: "7px",
                letterSpacing: "2.25px",
                lineHeight: "12px",
                fontWeight: "600",
              }}
            >
              1
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            width: "117.4px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "14.33px",
              left: "21px",
              letterSpacing: "2.25px",
              lineHeight: "13.5px",
              fontWeight: "600",
            }}
          >
            SELESAI
          </div>
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "80.14px",
              backgroundColor: "rgba(201, 168, 76, 0.2)",
              width: "17.3px",
              height: "14px",
              fontSize: "8px",
              color: "rgba(201, 168, 76, 0.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: "7px",
                letterSpacing: "2.25px",
                lineHeight: "12px",
                fontWeight: "600",
              }}
            >
              1
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          alignSelf: "stretch",
          flex: "1",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          color: "#c9a84c",
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
              alignSelf: "stretch",
              height: "149.4px",
              border: "0.7px solid rgba(201, 168, 76, 0.15)",
              boxSizing: "border-box",
              overflow: "hidden",
              flexShrink: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "20px",
                gap: "16px",
              }}
            >
              <Image
                style={{ height: "80px", width: "64px", objectFit: "cover" }}
                width={64}
                height={80}
                sizes="100vw"
                alt=""
                src={""}
              />
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
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
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
                      }}
                    >
                      ARC-847213
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(201, 168, 76, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 10px",
                      gap: "6px",
                    }}
                  >
                    <Image
                      style={{
                        height: "10px",
                        width: "10px",
                        position: "relative",
                      }}
                      width={10}
                      height={10}
                      sizes="100vw"
                      alt=""
                      src={""}
                    />
                    <div
                      style={{
                        position: "relative",
                        letterSpacing: "1.35px",
                        lineHeight: "13.5px",
                        fontWeight: "600",
                      }}
                    >
                      SELESAI
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "606.7px",
                    height: "28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "6px 0px 0px",
                    boxSizing: "border-box",
                    fontSize: "18px",
                    color: "#f5edd6",
                    fontFamily: "'Cormorant Garamond'",
                  }}
                >
                  <div style={{ position: "relative", lineHeight: "21.6px" }}>
                    Emerald of Borneo
                  </div>
                </div>
                <div
                  style={{
                    width: "606.7px",
                    height: "17px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "2px 0px 0px",
                    boxSizing: "border-box",
                    fontSize: "10px",
                    color: "rgba(201, 185, 154, 0.5)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "15px",
                      fontWeight: "300",
                    }}
                  >
                    50ml · Qty 1 · 10 Jul 2026
                  </div>
                </div>
                <div
                  style={{
                    width: "606.7px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0px 0px",
                    boxSizing: "border-box",
                    gap: "20px",
                    fontSize: "20px",
                    fontFamily: "'Cormorant Garamond'",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ position: "relative", lineHeight: "30px" }}>
                      Rp 950.000
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "9px",
                      color: "rgba(201, 185, 154, 0.4)",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          letterSpacing: "1.8px",
                          lineHeight: "13.5px",
                        }}
                      >
                        DETAIL
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "13px",
                          position: "relative",
                        }}
                        width={13}
                        height={13}
                        sizes="100vw"
                        alt=""
                        src={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px 0px 0px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                height: "149.4px",
                border: "0.7px solid rgba(201, 168, 76, 0.15)",
                boxSizing: "border-box",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  padding: "20px",
                  gap: "16px",
                }}
              >
                <Image
                  style={{ height: "80px", width: "64px", objectFit: "cover" }}
                  width={64}
                  height={80}
                  sizes="100vw"
                  alt=""
                  src={""}
                />
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
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
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
                        }}
                      >
                        ARC-612904
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(125, 207, 182, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px 10px",
                        gap: "6px",
                        color: "#7dcfb6",
                      }}
                    >
                      <Image
                        style={{
                          height: "10px",
                          width: "10px",
                          position: "relative",
                        }}
                        width={10}
                        height={10}
                        sizes="100vw"
                        alt=""
                        src={""}
                      />
                      <div
                        style={{
                          position: "relative",
                          letterSpacing: "1.35px",
                          lineHeight: "13.5px",
                          fontWeight: "600",
                        }}
                      >
                        DALAM PENGIRIMAN
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "28px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "6px 0px 0px",
                      boxSizing: "border-box",
                      fontSize: "18px",
                      color: "#f5edd6",
                      fontFamily: "'Cormorant Garamond'",
                    }}
                  >
                    <div style={{ position: "relative", lineHeight: "21.6px" }}>
                      Whisper of Raja Ampat
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "17px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "2px 0px 0px",
                      boxSizing: "border-box",
                      fontSize: "10px",
                      color: "rgba(201, 185, 154, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        lineHeight: "15px",
                        fontWeight: "300",
                      }}
                    >
                      100ml · Qty 1 · 3 Jul 2026
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "42px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0px 0px",
                      boxSizing: "border-box",
                      gap: "20px",
                      fontSize: "20px",
                      fontFamily: "'Cormorant Garamond'",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ position: "relative", lineHeight: "30px" }}>
                        Rp 1.536.400
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "9px",
                        color: "rgba(201, 185, 154, 0.4)",
                        fontFamily: "Montserrat",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            letterSpacing: "1.8px",
                            lineHeight: "13.5px",
                          }}
                        >
                          DETAIL
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: "13px",
                            position: "relative",
                          }}
                          width={13}
                          height={13}
                          sizes="100vw"
                          alt=""
                          src={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px 0px 0px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                height: "149.4px",
                border: "0.7px solid rgba(201, 168, 76, 0.15)",
                boxSizing: "border-box",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  padding: "20px",
                  gap: "16px",
                }}
              >
                <Image
                  style={{ height: "80px", width: "64px", objectFit: "cover" }}
                  width={64}
                  height={80}
                  sizes="100vw"
                  alt=""
                  src={""}
                />
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
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
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
                        }}
                      >
                        ARC-501337
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(74, 158, 218, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px 10px",
                        gap: "6px",
                        color: "#4a9eda",
                      }}
                    >
                      <Image
                        style={{
                          height: "10px",
                          width: "10px",
                          position: "relative",
                        }}
                        width={10}
                        height={10}
                        sizes="100vw"
                        alt=""
                        src={""}
                      />
                      <div
                        style={{
                          position: "relative",
                          letterSpacing: "1.35px",
                          lineHeight: "13.5px",
                          fontWeight: "600",
                        }}
                      >
                        SEDANG DIPROSES
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "28px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "6px 0px 0px",
                      boxSizing: "border-box",
                      fontSize: "18px",
                      color: "#f5edd6",
                      fontFamily: "'Cormorant Garamond'",
                    }}
                  >
                    <div style={{ position: "relative", lineHeight: "21.6px" }}>
                      Glow of Borobudur
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "17px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "2px 0px 0px",
                      boxSizing: "border-box",
                      fontSize: "10px",
                      color: "rgba(201, 185, 154, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        lineHeight: "15px",
                        fontWeight: "300",
                      }}
                    >
                      30ml · Qty 2 · 28 Jun 2026
                    </div>
                  </div>
                  <div
                    style={{
                      width: "606.7px",
                      height: "42px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0px 0px",
                      boxSizing: "border-box",
                      gap: "20px",
                      fontSize: "20px",
                      fontFamily: "'Cormorant Garamond'",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ position: "relative", lineHeight: "30px" }}>
                        Rp 1.207.200
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "9px",
                        color: "rgba(201, 185, 154, 0.4)",
                        fontFamily: "Montserrat",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            letterSpacing: "1.8px",
                            lineHeight: "13.5px",
                          }}
                        >
                          DETAIL
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: "13px",
                            position: "relative",
                          }}
                          width={13}
                          height={13}
                          sizes="100vw"
                          alt=""
                          src={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          alignSelf: "stretch",
          borderTop: "0.7px solid rgba(201, 168, 76, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
          gap: "20px",
          fontSize: "10px",
          color: "rgba(201, 185, 154, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "relative",
              lineHeight: "15px",
              fontWeight: "300",
            }}
          >
            3 pesanan total
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textAlign: "center",
            color: "rgba(201, 168, 76, 0.6)",
          }}
        >
          <Image
            style={{ height: "12px", width: "12px", position: "relative" }}
            width={12}
            height={12}
            sizes="100vw"
            alt=""
            src={""}
          />
          <div
            style={{
              position: "relative",
              letterSpacing: "2px",
              lineHeight: "15px",
              fontWeight: "500",
            }}
          >
            LANJUT BELANJA
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
