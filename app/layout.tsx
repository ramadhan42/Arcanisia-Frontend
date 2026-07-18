import localFont from 'next/font/local';
import './globals.css'; // 1. Pastikan path import ini sesuai dengan lokasi file Navbar.tsx Anda
import Providers from "@/components/Providers";

// 1. Konfigurasi Font Gilland[cite: 2]
const gilland = localFont({
  src: [
    {
      path: './fonts/Gilland-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gilland-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gilland',
  display: 'swap',
});

// 2. Konfigurasi Font Grazie Mille[cite: 2]
const grazieMille = localFont({
  src: [
    { path: './fonts/ttf/GrazieMille-News.ttf', weight: '300', style: 'normal' },
    { path: './fonts/ttf/GrazieMille-NewsItalic.ttf', weight: '300', style: 'italic' },
    { path: './fonts/ttf/GrazieMille-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/ttf/GrazieMille-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/ttf/GrazieMille-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: './fonts/ttf/GrazieMille-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/ttf/GrazieMille-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: './fonts/ttf/GrazieMille-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/ttf/GrazieMille-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-graziemille',
  display: 'swap',
});

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
    // Memasukkan variabel CSS font ke dalam tag HTML[cite: 2]
    <html lang="en" className={`${gilland.variable} ${grazieMille.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}