import "./../globals.css"; // 1. Pastikan path import ini sesuai dengan lokasi file Navbar.tsx Anda
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';


export const metadata = {
  title: 'Arcanisia Fragrance', //[cite: 2]
  description: 'Where Every Island Tells Its fragrance', //[cite: 2]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page-view min-h-svh bg-[#012320] text-[#f5edd6]">
      <Navbar />
      <div className="page-content bg-[#012320]">
        <main className="bg-[#012320]">{children}</main>
        <Footer />
      </div>
    </main>
  );
}