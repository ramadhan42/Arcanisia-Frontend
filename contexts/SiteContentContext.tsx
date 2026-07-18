"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { siteContentService } from "@/services/api";
import type {
  ContentPayload,
  SiteContent,
  SiteContentKey,
} from "@/types/api";

const fallbackContent: SiteContent = {
  hero: {
    eyebrow: "A Journey Through the Archipelago",
    title: "Where Every Island Tells Its Fragrance",
    description:
      "Discover the soul of Indonesia through a collection of fragrances inspired by its islands.",
  },
  collection: {
    eyebrow: "THE COLLECTION",
    title: "Six Islands, Six Stories",
    description:
      "Each fragrance is an olfactory journey through the soul of the Indonesian archipelago — six islands, six stories, one nation breathed into being.",
  },
  faq: {
    eyebrow: "PUSAT BANTUAN",
    title: "Pertanyaan yang Sering Diajukan",
    description:
      "Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu melalui email.",
    categories: [],
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
          { label: "Secret of Buton", href: "/#collection" },
          { label: "Whisper of Raja Ampat", href: "/#collection" },
          { label: "Mystique of Komodo", href: "/#collection" },
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
    shipping_label: "GRATIS",
    shipping_note:
      "Pengiriman menggunakan kemasan premium Arcanisia. Estimasi tiba 2–4 hari kerja.",
    payment_methods: ["bank_transfer", "qris", "card"],
  },
};

interface SiteContentContextValue {
  content: SiteContent;
  isLoading: boolean;
  error: string;
  refresh: () => Promise<void>;
  section: <T extends ContentPayload>(key: SiteContentKey) => T;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(
  undefined,
);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const remoteContent = await siteContentService.get();
      setContent({ ...fallbackContent, ...remoteContent });
    } catch (requestError) {
      setContent(fallbackContent);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Konten situs gagal dimuat.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 0);

    return () => window.clearTimeout(timer);
  }, [refresh]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      isLoading,
      error,
      refresh,
      section: <T extends ContentPayload>(key: SiteContentKey) =>
        ({
          ...(fallbackContent[key] ?? {}),
          ...(content[key] ?? {}),
        }) as T,
    }),
    [content, error, isLoading, refresh],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error(
      "useSiteContent harus digunakan di dalam SiteContentProvider.",
    );
  }
  return context;
}
