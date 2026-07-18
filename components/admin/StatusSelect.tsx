"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

const toneMap: Record<string, { dot: string; text: string; border: string }> = {
  pending: { dot: "bg-amber-400", text: "text-amber-200", border: "border-amber-400/40" },
  processing: { dot: "bg-sky-400", text: "text-sky-200", border: "border-sky-400/40" },
  shipping: { dot: "bg-indigo-400", text: "text-indigo-200", border: "border-indigo-400/40" },
  completed: { dot: "bg-emerald-400", text: "text-emerald-200", border: "border-emerald-400/40" },
  paid: { dot: "bg-emerald-400", text: "text-emerald-200", border: "border-emerald-400/40" },
  cancelled: { dot: "bg-red-400", text: "text-red-200", border: "border-red-400/40" },
  failed: { dot: "bg-red-400", text: "text-red-200", border: "border-red-400/40" },
  expired: { dot: "bg-neutral-400", text: "text-neutral-300", border: "border-neutral-400/40" },
};

const fallback = { dot: "bg-[#c9a84c]", text: "text-[#f8c56c]", border: "border-[#c9a84c]/40" };

const MIN_MENU_WIDTH = 160;

export default function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; placeAbove: boolean } | null>(null);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const tone = toneMap[value] ?? fallback;

  useEffect(() => setMounted(true), []);

  const updatePosition = () => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const estimatedHeight = Math.min(options.length * 42 + 12, 320);
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < estimatedHeight + 16 && rect.top > spaceBelow;
    const width = Math.round(Math.max(rect.width, MIN_MENU_WIDTH));
    // Prefer aligning to the button's left edge; if that overflows the
    // right side of the viewport, align the menu's right edge to the button.
    let left = rect.left;
    if (left + width > window.innerWidth - 8) {
      left = rect.right - width;
    }
    left = Math.min(Math.max(left, 8), window.innerWidth - width - 8);
    setCoords({
      top: placeAbove ? rect.top - 6 : rect.bottom + 6,
      left,
      width,
      placeAbove,
    });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    const onPointerDown = (event: MouseEvent) => {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex min-w-[150px] items-center gap-2 border ${tone.border} bg-[#012724] px-3 py-2 text-xs font-medium capitalize transition-colors hover:border-[#f8c56c]/60 ${tone.text}`}
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
        <span className="flex-1 text-left">{value}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-[#c9b99a]/70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {mounted &&
        coords &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: coords.placeAbove ? 8 : -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: coords.placeAbove ? 8 : -8, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                style={{
                  position: "fixed",
                  top: coords.placeAbove ? undefined : coords.top,
                  bottom: coords.placeAbove ? window.innerHeight - coords.top : undefined,
                  left: coords.left,
                  width: coords.width,
                }}
                className="z-[90] overflow-hidden border border-[#c9a84c]/30 bg-[#012f2b] p-1.5 shadow-[0_20px_60px_-18px_rgba(0,0,0,0.85)]"
              >
                {options.map((option) => {
                  const optionTone = toneMap[option] ?? fallback;
                  const active = option === value;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        if (option !== value) onChange(option);
                      }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs capitalize transition-colors ${
                        active
                          ? "bg-[#c9a84c]/15 text-[#f8c56c]"
                          : "text-[#d8d0bd] hover:bg-[#c9a84c]/8 hover:text-[#f5edd6]"
                      }`}
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${optionTone.dot}`} aria-hidden="true" />
                      <span className="flex-1">{option}</span>
                      {active && <Check size={13} className="shrink-0 text-[#f8c56c]" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
