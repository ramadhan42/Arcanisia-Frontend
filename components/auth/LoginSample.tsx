// import type { NextPage } from 'next';
// import Image from "next/image";



// const Login: NextPage = () => {
//     return (
//         <div style={{ width: "100%", height: "667.2px", position: "relative", backgroundColor: "#012421", overflow: "hidden", display: "flex", alignItems: "flex-start", maxWidth: "820px", textAlign: "left", fontSize: "28px", color: "rgba(201, 185, 154, 0.6)", fontFamily: "Gilland", }}>
//             <div style={{ height: "667.2px", width: "341.7px", position: "relative", backgroundColor: "#0d2a1a", overflow: "hidden", flexShrink: "0", }}>

//                 {/* path image public\gambar\login\bg.png */}
//                 <Image style={{ position: "absolute", top: "0px", left: "-659px", width: "1001px", height: "667px", objectFit: "cover", flexShrink: "0", }} width={1001} height={667} sizes="100vw" alt="" />
//                 <div style={{ position: "absolute", top: "0px", left: "0px", background: "linear-gradient(180deg, rgba(1, 36, 33, 0.7), #012421)", width: "341.7px", height: "667.2px", flexShrink: "0", }} />
//                 <div style={{ position: "absolute", top: "40px", left: "40px", width: "261.7px", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: "0", }}>

//                     {/* path image public\gambar\login\logo-arca.svg */}
//                     <Image style={{ width: "100%", height: "43.7px", position: "relative", }} width={173} height={43.7} sizes="100vw" alt="" />
//                 </div>
//                 <div style={{ position: "absolute", top: "249.1px", left: "40px", width: "261.7px", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: "0", }}>
//                     <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
//                         <div style={{ position: "relative", lineHeight: "35px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}>Kisah Wangi<br />Nusantara</div>
//                     </div>
//                     <div style={{ width: "261.7px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "12px 0px 0px", boxSizing: "border-box", fontSize: "15px", fontFamily: "'Grazie mille'", }}>
//                         <div style={{ width: "276px", position: "relative", lineHeight: "22px", display: "inline-block", flexShrink: "0", }}>Daftar dan nikmati pengalaman belanja eksklusif, akses koleksi terbaru, dan penawaran spesial anggota.</div>
//                     </div>
//                 </div>
//                 <div style={{ position: "absolute", top: "558.2px", left: "40px", width: "261.7px", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: "0", fontSize: "10px", color: "rgba(201, 185, 154, 0.5)", fontFamily: "'Grazie mille'", }}>
//                     <div style={{ alignSelf: "stretch", display: "flex", alignItems: "center", gap: "10px", }}>
//                         <div style={{ height: "4px", width: "4px", position: "relative", borderRadius: "22369600px", backgroundColor: "#c9a84c", }} />
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
//                             <div style={{ position: "relative", lineHeight: "15px", }}>Akses koleksi eksklusif</div>
//                         </div>
//                     </div>
//                     <div style={{ width: "261.7px", height: "27px", display: "flex", alignItems: "center", padding: "12px 0px 0px", boxSizing: "border-box", gap: "10px", }}>
//                         <div style={{ height: "4px", width: "4px", position: "relative", borderRadius: "22369600px", backgroundColor: "#c9a84c", }} />
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
//                             <div style={{ position: "relative", lineHeight: "15px", }}>Histori pesanan lengkap</div>
//                         </div>
//                     </div>
//                     <div style={{ width: "261.7px", height: "27px", display: "flex", alignItems: "center", padding: "12px 0px 0px", boxSizing: "border-box", gap: "10px", }}>
//                         <div style={{ height: "4px", width: "4px", position: "relative", borderRadius: "22369600px", backgroundColor: "#c9a84c", }} />
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
//                             <div style={{ position: "relative", lineHeight: "15px", }}>Penawaran anggota khusus</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: "100%", flex: "1", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "40px", boxSizing: "border-box", position: "relative", isolation: "isolate", maxHeight: "742.8px", textAlign: "center", fontSize: "26px", color: "rgba(201, 185, 154, 0.5)", }}>
//                 <div style={{ alignSelf: "stretch", height: "27.7px", position: "relative", zIndex: "0", flexShrink: "0", }} />
//                 <div style={{ width: "398.3px", height: "85px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "32px 0px 0px", boxSizing: "border-box", gap: "4px", zIndex: "1", flexShrink: "0", textAlign: "left", }}>
//                     <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: "0", }}>
//                         <div style={{ position: "relative", lineHeight: "31.2px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}>Selamat Datang</div>
//                     </div>
//                     <div style={{ width: "398.3px", height: "21px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "4px 0px 0px", boxSizing: "border-box", flexShrink: "0", fontSize: "14px", fontFamily: "'Grazie mille'", }}>
//                         <div style={{ position: "relative", lineHeight: "16.5px", }}>Masuk ke akun Arcanisia Anda</div>
//                     </div>
//                 </div>
//                 <div style={{ width: "398.3px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "28px 0px 0px", boxSizing: "border-box", zIndex: "2", flexShrink: "0", fontSize: "9px", fontFamily: "'Grazie mille'", }}>
//                     <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", }}>
//                         <div style={{ width: "398.3px", height: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px 0px 6px", boxSizing: "border-box", }}>
//                             <div style={{ position: "relative", letterSpacing: "3.6px", lineHeight: "13.5px", }}>EMAIL</div>
//                         </div>
//                         <div style={{ width: "398.3px", height: "43.3px", backgroundColor: "rgba(1, 30, 27, 0.8)", border: "0.7px solid rgba(201, 168, 76, 0.2)", boxSizing: "border-box", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "12px 16px", fontSize: "12px", color: "rgba(201, 185, 154, 0.25)", }}>
//                             <div style={{ alignSelf: "stretch", position: "relative", }}>nama@email.com</div>
//                         </div>
//                     </div>
//                     <div style={{ width: "398.3px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 0px 0px", boxSizing: "border-box", textAlign: "left", }}>
//                         <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
//                             <div style={{ position: "relative", letterSpacing: "3.6px", lineHeight: "13.5px", }}>PASSWORD</div>
//                         </div>
//                         <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "6px 0px 0px", fontSize: "12px", color: "rgba(201, 185, 154, 0.25)", }}>
//                             <div style={{ alignSelf: "stretch", height: "43.3px", position: "relative", }}>
//                                 <div style={{ position: "absolute", top: "0px", left: "0px", backgroundColor: "rgba(1, 30, 27, 0.8)", border: "0.7px solid rgba(201, 168, 76, 0.2)", boxSizing: "border-box", width: "398.3px", height: "43.3px", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "12px 48px 12px 16px", }}>
//                                     <div style={{ alignSelf: "stretch", position: "relative", }}>Masukkan password</div>
//                                 </div>
//                                 <div style={{ position: "absolute", top: "14.17px", left: "369.33px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", }}>
//                                     {/* path image public\gambar\login\logo-arca.svg */}
//                                     <Image style={{ width: "100%", height: "15px", position: "relative", }} width={15} height={15} sizes="100vw" alt="" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div style={{ width: "398.3px", height: "31px", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "16px 0px 0px", boxSizing: "border-box", fontSize: "10px", }}>
//                         <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
//                             <div style={{ position: "relative", letterSpacing: "1px", lineHeight: "15px", }}>Lupa password?</div>
//                         </div>
//                     </div>
//                     <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 0px 0px", fontSize: "11px", color: "#012421", }}>
//                         <div style={{ width: "398.3px", height: "44.5px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 0px", boxSizing: "border-box", gap: "8px", }}>
//                             <div style={{ position: "relative", letterSpacing: "3.3px", lineHeight: "16.5px", }}>MASUK</div>
//                             {/* <Image style={{ height: "13px", width: "13px", position: "relative", }} width={13} height={13} sizes="100vw" alt="" /> */}
//                         </div>
//                     </div>
//                     <div style={{ alignSelf: "stretch", height: "44px", display: "flex", alignItems: "center", padding: "24px 0px 0px", boxSizing: "border-box", gap: "12px", }}>
//                         <div style={{ height: "1px", flex: "1", position: "relative", backgroundColor: "rgba(201, 168, 76, 0.15)", }} />
//                         {/* <Image style={{ height: "9px", width: "24.1px", position: "relative", }} width={24.1} height={9} sizes="100vw" alt="" /> */}
//                         <div style={{ height: "1px", flex: "1", position: "relative", backgroundColor: "rgba(201, 168, 76, 0.15)", }} />
//                     </div>
//                     <div style={{ alignSelf: "stretch", height: "122.7px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "24px 0px 0px", boxSizing: "border-box", gap: "8px", fontSize: "11px", color: "#c9b99a", }}>
//                         <div style={{ width: "398.3px", border: "0.7px solid rgba(201, 168, 76, 0.15)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0px", gap: "12px", flexShrink: "0", }}>
//                             <div style={{ height: "21px", width: "21px", borderRadius: "13.52px", backgroundColor: "#fff", display: "flex", alignItems: "flex-start", padding: "4px", boxSizing: "border-box", }}>
//                                 {/* path image public\gambar\login\google.svg */}
//                                 <Image style={{ height: "13px", width: "100%", position: "relative", }} width={13} height={13} sizes="100vw" alt="" />
//                             </div>
//                             <div style={{ position: "relative", lineHeight: "16.5px", }}>Lanjutkan dengan Google</div>
//                         </div>
//                         <div style={{ width: "398.3px", border: "0.7px solid rgba(201, 168, 76, 0.15)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0px", gap: "12px", flexShrink: "0", }}>
//                             {/* path image public\gambar\login\facebook.svg */}
//                             <Image style={{ height: "21px", width: "21px", position: "relative", }} width={21} height={21} sizes="100vw" alt="" />
//                             <div style={{ position: "relative", lineHeight: "16.5px", }}>Lanjutkan dengan Facebook</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "24px 0px 0px", zIndex: "3", flexShrink: "0", fontSize: "11px", color: "rgba(201, 185, 154, 0.4)", fontFamily: "'Grazie mille'", }}>
//                     <div style={{ alignSelf: "stretch", height: "24px", position: "relative", }}>
//                         <div style={{ position: "absolute", top: "4.67px", left: "84.2px", lineHeight: "16.5px", }}>{`Belum punya akun? `}</div>
//                         <div style={{ position: "absolute", top: "0px", left: "190.54px", width: "129.6px", height: "24px", fontSize: "16px", }}>
//                             <div style={{ position: "absolute", top: "0px", left: "5px", lineHeight: "24px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}>Daftar sekarang</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ height: "27.7px", margin: "0", position: "absolute", top: "40px", left: "40px", borderBottom: "0.7px solid rgba(201, 168, 76, 0.15)", boxSizing: "border-box", display: "flex", alignItems: "flex-start", zIndex: "4", flexShrink: "0", fontSize: "10px", color: "rgba(201, 185, 154, 0.4)", }}>
//                     <div style={{ alignSelf: "stretch", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0px 0px 12px", position: "relative", isolation: "isolate", }}>
//                         <b style={{ position: "relative", letterSpacing: "3px", lineHeight: "15px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", zIndex: "0", flexShrink: "0", }}>MASUK</b>
//                         <div style={{ width: "199.2px", height: "1px", position: "absolute", margin: "0", top: "26px", left: "0px", background: "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)", zIndex: "1", flexShrink: "0", }} />
//                     </div>
//                     <div style={{ alignSelf: "stretch", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0px 0px 12px", }}>
//                         <b style={{ position: "relative", letterSpacing: "3px", lineHeight: "15px", }}>DAFTAR</b>
//                     </div>
//                 </div>
//             </div>
//         </div>);
// };

// export default Login;
