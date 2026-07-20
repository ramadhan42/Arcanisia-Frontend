import localFont from 'next/font/local';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import Providers from "@/components/Providers";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/locale";

const BRAND_BG = '#012320';

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

export const metadata: Metadata = {
  title: 'Arcanisia Fragrance',
  description: 'Where Every Island Tells Its Fragrance',
};

export const viewport: Viewport = {
  themeColor: BRAND_BG,
  // Do NOT set colorScheme: 'dark' — browsers paint a pure black canvas on refresh.
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialLocale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={initialLocale}
      className={`${gilland.variable} ${grazieMille.variable}`}
      style={{ backgroundColor: BRAND_BG }}
      data-locale-phase="idle"
    >
      <head>
        {/* Earliest paint: brand green before CSS/JS — prevents black canvas flash */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{background:${BRAND_BG}!important;background-color:${BRAND_BG}!important;margin:0;min-height:100%}html{color-scheme:normal}`,
          }}
        />
      </head>
      <body
        style={{
          backgroundColor: BRAND_BG,
          color: '#f5edd6',
          margin: 0,
          minHeight: '100svh',
        }}
      >
        <Providers initialLocale={initialLocale}>{children}</Providers>
      </body>
    </html>
  );
}
