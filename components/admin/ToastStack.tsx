"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

export type ToastType = "success" | "error";

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

export default function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const success = toast.type === "success";
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-3 border bg-[#012f2b]/95 p-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur ${
                success
                  ? "border-[#c9a84c]/40"
                  : "border-red-400/40"
              }`}
            >
              <span
                className={success ? "text-[#f8c56c]" : "text-red-300"}
                aria-hidden="true"
              >
                {success ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              </span>
              <p className="flex-1 pt-0.5 text-sm leading-snug text-[#f5edd6]">
                {toast.message}
              </p>
              <button
                type="button"
                aria-label="Tutup notifikasi"
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 text-[#c9b99a]/50 transition-colors hover:text-[#f5edd6]"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
