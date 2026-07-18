"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSiteContent } from "@/contexts/SiteContentContext";

interface LegalDocument {
  slug: string;
  title: string;
  content?: string;
  sections?: Array<{ heading?: string; body: string }>;
}

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const { section, isLoading, error } = useSiteContent();
  const legal = section<{ documents?: LegalDocument[]; pages?: LegalDocument[] }>("legal");
  const document = [...(legal.documents ?? []), ...(legal.pages ?? [])].find(
    (item) => item.slug === slug,
  );

  return (
    <main className="min-h-screen bg-[#012421] px-6 pb-24 pt-36 font-graziemille text-[#c9b99a]">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs tracking-[2px] text-[#f8c56c]">← KEMBALI</Link>
        {isLoading && <p className="mt-12">Memuat dokumen...</p>}
        {!isLoading && error && !document && <p role="alert" className="mt-12 text-[#ff7b86]">{error}</p>}
        {!isLoading && !document && <p className="mt-12">Dokumen tidak ditemukan.</p>}
        {document && (
          <>
            <h1 className="mt-10 font-gilland text-4xl text-[#f8c56c]">{document.title}</h1>
            {document.content && <div className="mt-8 whitespace-pre-wrap text-sm leading-8">{document.content}</div>}
            <div className="mt-8 space-y-8">
              {document.sections?.map((item, index) => (
                <section key={`${item.heading}-${index}`}>
                  {item.heading && <h2 className="font-gilland text-2xl text-[#f8c56c]">{item.heading}</h2>}
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-8">{item.body}</p>
                </section>
              ))}
            </div>
          </>
        )}
      </article>
    </main>
  );
}
