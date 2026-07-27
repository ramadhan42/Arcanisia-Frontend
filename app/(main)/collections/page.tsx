import type { Metadata } from "next";
import Collections from "@/components/Beranda/Collections";

export const metadata: Metadata = {
  title: "Koleksi Lengkap | Arcanisia",
  description:
    "Jelajahi koleksi lengkap wewangian Arcanisia — enam pulau, enam kisah Nusantara.",
};

export default function CollectionsPage() {
  return <Collections variant="page" />;
}
