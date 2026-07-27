"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, LoaderCircle } from "lucide-react";

export interface ConfirmState {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
  onConfirm: () => void | Promise<void>;
}

const hideScrollbar = "scrollbar-none";

export default function ConfirmDialog({
  state,
  onClose,
}: {
  state: ConfirmState | null;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const tone = state?.tone ?? "danger";

  const handleConfirm = async () => {
    if (!state) return;
    try {
      setBusy(true);
      await state.onConfirm();
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (!busy) onClose();
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`relative w-full max-w-md overflow-hidden border border-[#c9a84c]/30 bg-[#012f2b] p-7 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] ${hideScrollbar}`}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)",
              }}
            />
            <div className="flex items-start gap-4">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  tone === "danger"
                    ? "bg-red-500/15 text-red-300"
                    : "bg-[#c9a84c]/15 text-[#f8c56c]"
                }`}
              >
                <AlertTriangle size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="font-gilland text-xl text-[#f8c56c]">
                  {state.title ?? "Konfirmasi"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#c9b99a]/80">
                  {state.message}
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="border border-[#c9a84c]/25 px-5 py-2.5 text-xs tracking-[1px] text-[#c9b99a] transition-colors hover:border-[#c9a84c]/50 hover:text-[#f5edd6] disabled:opacity-50"
              >
                {state.cancelLabel ?? "BATAL"}
              </button>
              <button
                type="button"
                onClick={() => void handleConfirm()}
                disabled={busy}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[1px] transition-opacity hover:opacity-90 disabled:opacity-60 ${
                  tone === "danger"
                    ? "bg-red-500 text-white"
                    : "bg-[#f8c56c] text-[#012421]"
                }`}
              >
                {busy && <LoaderCircle size={14} className="animate-spin" />}
                {busy ? "MEMPROSES..." : state.confirmLabel ?? "HAPUS"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
