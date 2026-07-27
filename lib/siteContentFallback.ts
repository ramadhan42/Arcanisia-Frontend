import type { Locale } from "@/lib/locale";
import type { SiteContent } from "@/types/api";

const fallbackId: SiteContent = {
  hero: {
    title: "Di Mana Setiap Pulau\nMenceritakan Wanginya",
    description:
      "Enam wewangian yang diracik dari jiwa Nusantara — setiap botol adalah perjalanan melintasi lanskap paling sakral Indonesia.",
    cta_label: "JELAJAHI KOLEKSI",
    cta_href: "#collection",
    background_image: "/gambar/seksi%201/bg.jpg",
    product_image: "/gambar/seksi%201/produk.png",
    logo_image: "/gambar/seksi%201/logo.png",
  },
  collection: {
    eyebrow: "KOLEKSI KAMI",
    title: "Enam Pulau, Enam Kisah",
    description:
      "Setiap wewangian adalah perjalanan olfaktori melintasi jiwa Nusantara — enam pulau, enam kisah, satu bangsa yang dihidupkan melalui aroma.",
    cta_label: "LIHAT KOLEKSI LENGKAP",
    cta_href: "#",
  },
  missions: {
    eyebrow: "MISI KAMI",
    title: "Dipandu oleh Tujuan",
    missions: [],
    items: [],
  },
  faq: {
    eyebrow: "PUSAT BANTUAN",
    title: "Pertanyaan yang Sering Diajukan",
    description:
      "Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu melalui email.",
    categories: [],
    items: [],
  },
  values: {
    eyebrow: "ESENSI KAMI",
    title: "Kejujuran Nusantara",
    items: [],
  },
  islands: {
    eyebrow: "JELAJAH NUSANTARA",
    title: "Enam Pulau, Satu Jiwa",
    items: [],
  },
  newsletter: {
    eyebrow: "TETAP TERHUBUNG",
    title: "Bergabung dalam Perjalanan Nusantara",
    description:
      "Berlangganan untuk menerima peluncuran eksklusif, kisah pulau, dan akses awal ke wewangian edisi terbatas.",
  },
  contact: {
    items: [
      {
        title: "LOKASI",
        icon: "/gambar/seksi%208/location.svg",
        lines: ["Jl. Sudirman No. 88", "Jakarta Pusat, Indonesia 10220"],
      },
      {
        title: "EMAIL",
        icon: "/gambar/seksi%208/email.svg",
        lines: ["hello@arcanisia.com", "support@arcanisia.com"],
      },
      {
        title: "IKUTI KAMI",
        icon: "/gambar/seksi%208/ig.svg",
        lines: ["@arcanisia.scent", "@arcanisia_official"],
      },
    ],
  },
  footer: {
    description:
      "Rumah wewangian mewah yang lahir dari jantung kepulauan Indonesia. Enam pulau. Enam kisah. Satu bangsa yang dihidupkan melalui aroma.",
    groups: [
      {
        title: "KOLEKSI",
        links: [
          { label: "Secret of Buton", href: "/#product-secret-of-buton" },
          {
            label: "Whisper of Raja Ampat",
            href: "/#product-whisper-of-raja-ampat",
          },
          { label: "Mystique of Komodo", href: "/#product-mystique-of-komodo" },
        ],
      },
      {
        title: "PERUSAHAAN",
        links: [
          { label: "Tentang Arcanisia", href: "/#about" },
          { label: "Misi Kami", href: "/#mission" },
          { label: "Nilai Merek", href: "/#values" },
        ],
      },
      {
        title: "BANTUAN",
        links: [
          { label: "FAQ", href: "/#faq" },
          { label: "Hubungi Kami", href: "/#contact" },
        ],
      },
    ],
    copyright:
      "© 2026 Arcanisia Scent. Hak cipta dilindungi. Dibuat dengan cinta untuk Indonesia.",
  },
  legal: {
    links: [
      { label: "Kebijakan Privasi", slug: "privacy-policy" },
      { label: "Ketentuan Layanan", slug: "terms-of-service" },
      { label: "Kebijakan Cookie", slug: "cookie-policy" },
    ],
  },
  checkout: {
    shipping_label: "GRATIS",
    shipping_note:
      "Pengiriman menggunakan kemasan premium Arcanisia. Estimasi tiba 2–4 hari kerja.",
    payment_methods: ["bank_transfer", "qris", "card"],
  },
};

const fallbackEn: SiteContent = {
  hero: {
    title: "Where Every Island Tells Its Fragrance",
    description:
      "Six fragrances crafted from the soul of the Indonesian archipelago — each bottle a journey through the Nusantara's most sacred landscapes.",
    cta_label: "EXPLORE COLLECTION",
    cta_href: "#collection",
    background_image: "/gambar/seksi%201/bg.jpg",
    product_image: "/gambar/seksi%201/produk.png",
    logo_image: "/gambar/seksi%201/logo.png",
  },
  collection: {
    eyebrow: "THE COLLECTION",
    title: "Six Islands, Six Stories",
    description:
      "Each fragrance is an olfactory journey through the soul of the Indonesian archipelago — six islands, six stories, one nation breathed into being.",
    cta_label: "VIEW COMPLETE COLLECTION",
    cta_href: "#",
  },
  missions: {
    eyebrow: "OUR MISSION",
    title: "Guided by Purpose",
    missions: [],
    items: [],
  },
  faq: {
    eyebrow: "HELP CENTER",
    title: "Frequently Asked Questions",
    description:
      "Can't find the answer you're looking for? Our team is ready to help via email.",
    categories: [],
    items: [],
  },
  values: {
    eyebrow: "THE ESSENCE",
    title: "Honesty of Nusantara",
    items: [],
  },
  islands: {
    eyebrow: "EXPLORE THE ARCHIPELAGO",
    title: "Six Islands, One Soul",
    items: [],
  },
  newsletter: {
    eyebrow: "STAY CONNECTED",
    title: "Join the Journey of the Nusantara",
    description:
      "Subscribe to receive exclusive launches, island stories, and first access to limited edition fragrances.",
  },
  contact: {
    items: [
      {
        title: "LOCATION",
        icon: "/gambar/seksi%208/location.svg",
        lines: ["Jl. Sudirman No. 88", "Jakarta Pusat, Indonesia 10220"],
      },
      {
        title: "EMAIL",
        icon: "/gambar/seksi%208/email.svg",
        lines: ["hello@arcanisia.com", "support@arcanisia.com"],
      },
      {
        title: "FOLLOW US",
        icon: "/gambar/seksi%208/ig.svg",
        lines: ["@arcanisia.scent", "@arcanisia_official"],
      },
    ],
  },
  footer: {
    description:
      "A luxury fragrance house born from the heart of the Indonesian archipelago. Six islands. Six stories. One nation breathed into being through scent.",
    groups: [
      {
        title: "COLLECTION",
        links: [
          { label: "Secret of Buton", href: "/#product-secret-of-buton" },
          {
            label: "Whisper of Raja Ampat",
            href: "/#product-whisper-of-raja-ampat",
          },
          { label: "Mystique of Komodo", href: "/#product-mystique-of-komodo" },
        ],
      },
      {
        title: "COMPANY",
        links: [
          { label: "About Arcanisia", href: "/#about" },
          { label: "Our Mission", href: "/#mission" },
          { label: "Brand Values", href: "/#values" },
        ],
      },
      {
        title: "SUPPORT",
        links: [
          { label: "FAQ", href: "/#faq" },
          { label: "Contact Us", href: "/#contact" },
        ],
      },
    ],
    copyright:
      "© 2026 Arcanisia Scent. All rights reserved. Made with love for Indonesia.",
  },
  legal: {
    links: [
      { label: "Privacy Policy", slug: "privacy-policy" },
      { label: "Terms of Service", slug: "terms-of-service" },
      { label: "Cookie Policy", slug: "cookie-policy" },
    ],
  },
  checkout: {
    shipping_label: "FREE",
    shipping_note:
      "Shipping uses premium Arcanisia packaging. Estimated arrival 2–4 business days.",
    payment_methods: ["bank_transfer", "qris", "card"],
  },
};

export function getSiteContentFallback(locale: Locale): SiteContent {
  return locale === "en" ? fallbackEn : fallbackId;
}
