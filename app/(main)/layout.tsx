import localFont from 'next/font/local';
import "./../globals.css"; // 1. Pastikan path import ini sesuai dengan lokasi file Navbar.tsx Anda
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';


export const metadata = {
  title: 'Arcaisia Fragrance', //[cite: 2]
  description: 'Where Every Island Tells Its fragrance', //[cite: 2]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* 2. Tambahkan komponen Navbar di sini agar dirender di atas konten halaman */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
}