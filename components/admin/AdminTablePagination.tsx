"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { PaginationMeta } from "@/types/api";

function buildPages(current: number, last: number): Array<number | "…"> {
  if (last <= 5) {
    return Array.from({ length: last }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, last, current, current - 1, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= last).sort((a, b) => a - b);
  const result: Array<number | "…"> = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("…");
    }
    result.push(page);
  });

  return result;
}

export default function AdminTablePagination({
  meta,
  onPageChange,
  isLoading = false,
}: {
  meta: PaginationMeta | null;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) {
  if (!meta || meta.total === 0) {
    return null;
  }

  const from = meta.total === 0 ? 0 : (meta.current_page - 1) * meta.per_page + 1;
  const to = Math.min(meta.current_page * meta.per_page, meta.total);
  const canPrev = meta.current_page > 1;
  const canNext = meta.current_page < meta.last_page;
  const pages = buildPages(meta.current_page, meta.last_page);

  return (
    <div className="mt-4 flex flex-col gap-3 border border-[#c9a84c]/15 bg-[#012724]/55 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs tracking-[0.5px] text-[#c9b99a]/65">
        Menampilkan{" "}
        <span className="text-[#f5edd6]">
          {from}–{to}
        </span>{" "}
        dari <span className="text-[#f8c56c]">{meta.total}</span> data
        <span className="ml-2 text-[#c9b99a]/40">· {meta.per_page}/halaman</span>
      </p>

      {meta.last_page > 1 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            aria-label="Halaman pertama"
            disabled={!canPrev || isLoading}
            onClick={() => onPageChange(1)}
            className="flex h-9 w-9 items-center justify-center border border-[#c9a84c]/20 text-[#f8c56c] transition-colors hover:border-[#f8c56c]/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronsLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={!canPrev || isLoading}
            onClick={() => onPageChange(meta.current_page - 1)}
            className="flex h-9 items-center gap-1 border border-[#c9a84c]/20 px-3 text-[10px] tracking-[1.5px] text-[#f8c56c] transition-colors hover:border-[#f8c56c]/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={14} /> PREV
          </button>

          <div className="mx-1 flex items-center gap-1">
            {pages.map((page, index) =>
              page === "…" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-xs text-[#c9b99a]/40"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  disabled={isLoading}
                  onClick={() => onPageChange(page)}
                  className={`flex h-9 min-w-9 items-center justify-center px-2 text-xs transition-colors ${
                    page === meta.current_page
                      ? "bg-[#f8c56c] font-bold text-[#012421]"
                      : "border border-[#c9a84c]/20 text-[#d8d0bd] hover:border-[#f8c56c]/45 hover:text-[#f8c56c]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={!canNext || isLoading}
            onClick={() => onPageChange(meta.current_page + 1)}
            className="flex h-9 items-center gap-1 border border-[#c9a84c]/20 px-3 text-[10px] tracking-[1.5px] text-[#f8c56c] transition-colors hover:border-[#f8c56c]/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            NEXT <ChevronRight size={14} />
          </button>
          <button
            type="button"
            aria-label="Halaman terakhir"
            disabled={!canNext || isLoading}
            onClick={() => onPageChange(meta.last_page)}
            className="flex h-9 w-9 items-center justify-center border border-[#c9a84c]/20 text-[#f8c56c] transition-colors hover:border-[#f8c56c]/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronsRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
