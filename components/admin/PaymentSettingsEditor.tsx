"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { ApiError } from "@/lib/api";
import type {
  GatewayPaymentMethod,
  PaymentProvider,
  PaymentSettingsAdmin,
  PaymentSettingsUpdatePayload,
  ValidationErrors,
} from "@/types/api";

type PaymentSettingsEditorProps = {
  settings: PaymentSettingsAdmin | null;
  isLoading: boolean;
  isSaving: boolean;
  error?: string;
  formErrors?: ValidationErrors;
  onSave: (payload: PaymentSettingsUpdatePayload) => Promise<void>;
};

const inputClass =
  "mt-2 w-full border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const gatewayMethodOptions: Array<{ id: GatewayPaymentMethod; label: string }> = [
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "qris", label: "QRIS" },
  { id: "card", label: "Kartu Kredit / Debit" },
];

const providerOptions = [
  {
    id: "manual" as const,
    title: "Manual",
    desc: "Checkout hanya COD, diverifikasi admin.",
  },
  {
    id: "midtrans" as const,
    title: "Midtrans Snap",
    desc: "Bank Transfer & QRIS via Core API /v2/charge; Kartu via Snap.",
  },
  {
    id: "xendit" as const,
    title: "Xendit Invoice",
    desc: "Bank Transfer / QRIS / Kartu via invoice Xendit + webhook.",
  },
];

function toggleMethod(
  methods: GatewayPaymentMethod[],
  method: GatewayPaymentMethod,
  enabled: boolean,
): GatewayPaymentMethod[] {
  if (enabled) {
    return methods.includes(method) ? methods : [...methods, method];
  }
  const next = methods.filter((item) => item !== method);
  return next.length > 0 ? next : methods;
}

export default function PaymentSettingsEditor({
  settings,
  isLoading,
  isSaving,
  error,
  formErrors,
  onSave,
}: PaymentSettingsEditorProps) {
  const [provider, setProvider] = useState<PaymentProvider>("manual");

  const [midtransIsProduction, setMidtransIsProduction] = useState(false);
  const [midtransMerchantId, setMidtransMerchantId] = useState("");
  const [midtransClientKey, setMidtransClientKey] = useState("");
  const [midtransServerKey, setMidtransServerKey] = useState("");
  const [midtransEnabledMethods, setMidtransEnabledMethods] = useState<GatewayPaymentMethod[]>([
    "bank_transfer",
    "qris",
    "card",
  ]);

  const [xenditIsProduction, setXenditIsProduction] = useState(false);
  const [xenditMerchantId, setXenditMerchantId] = useState("");
  const [xenditCallbackToken, setXenditCallbackToken] = useState("");
  const [xenditSecretKey, setXenditSecretKey] = useState("");
  const [xenditEnabledMethods, setXenditEnabledMethods] = useState<GatewayPaymentMethod[]>([
    "bank_transfer",
    "qris",
    "card",
  ]);

  useEffect(() => {
    if (!settings) return;
    setProvider(settings.provider);

    setMidtransIsProduction(settings.midtrans.is_production);
    setMidtransMerchantId(settings.midtrans.merchant_id ?? "");
    setMidtransClientKey(settings.midtrans.client_key ?? "");
    setMidtransServerKey(settings.midtrans.server_key ?? "");
    setMidtransEnabledMethods(
      settings.midtrans.enabled_methods?.length
        ? settings.midtrans.enabled_methods
        : ["bank_transfer", "qris", "card"],
    );

    setXenditIsProduction(settings.xendit.is_production);
    setXenditMerchantId(settings.xendit.merchant_id ?? "");
    setXenditCallbackToken(settings.xendit.callback_token ?? "");
    setXenditSecretKey(settings.xendit.secret_key ?? "");
    setXenditEnabledMethods(
      settings.xendit.enabled_methods?.length
        ? settings.xendit.enabled_methods
        : ["bank_transfer", "qris", "card"],
    );
  }, [settings]);

  const submit = async () => {
    const payload: PaymentSettingsUpdatePayload = { provider };

    if (provider === "midtrans") {
      payload.midtrans = {
        is_production: midtransIsProduction,
        merchant_id: midtransMerchantId.trim() || null,
        client_key: midtransClientKey.trim() || null,
        server_key: midtransServerKey.trim() || undefined,
        enabled_methods: midtransEnabledMethods,
      };
    }

    if (provider === "xendit") {
      payload.xendit = {
        is_production: xenditIsProduction,
        merchant_id: xenditMerchantId.trim() || null,
        callback_token: xenditCallbackToken.trim() || undefined,
        secret_key: xenditSecretKey.trim() || undefined,
        enabled_methods: xenditEnabledMethods,
      };
    }

    await onSave(payload);
  };

  if (isLoading || !settings) {
    return (
      <div className="flex h-52 items-center justify-center">
        <LoaderCircle className="animate-spin text-[#f8c56c]" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 border border-[#c9a84c]/15 bg-[#012724]/40 p-5 sm:p-6">
      <div>
        <p className="text-[10px] uppercase tracking-[2px] text-[#c9b99a]/45">Mode pembayaran</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {providerOptions.map((option) => {
            const active = provider === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setProvider(option.id)}
                className={`border px-4 py-4 text-left transition-colors ${
                  active
                    ? "border-[#f8c56c] bg-[#f8c56c]/10 text-[#f8c56c]"
                    : "border-[#c9a84c]/20 text-[#c9b99a]/70 hover:border-[#c9a84c]/40"
                }`}
              >
                <p className="text-sm font-semibold tracking-[1px]">{option.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#c9b99a]/60">{option.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {provider === "midtrans" ? (
        <div className="space-y-4 border-t border-[#c9a84c]/10 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${
                settings.midtrans.configured
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-amber-500/15 text-amber-200"
              }`}
            >
              {settings.midtrans.configured ? "Midtrans configured" : "Midtrans belum lengkap"}
            </span>
            <span className="text-xs text-[#c9b99a]/50">
              Notifikasi: {"{APP_URL}"}/api/v1/midtrans/notification
            </span>
          </div>

          <label className="flex items-center gap-3 text-sm text-[#e6ddc7]">
            <input
              type="checkbox"
              checked={midtransIsProduction}
              onChange={(event) => setMidtransIsProduction(event.target.checked)}
            />
            Mode production (matikan untuk Sandbox Midtrans)
          </label>

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Merchant ID
            <input
              value={midtransMerchantId}
              onChange={(event) => setMidtransMerchantId(event.target.value)}
              className={inputClass}
              placeholder="Gxxxxxxxxxx"
            />
          </label>

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Client Key
            <input
              value={midtransClientKey}
              onChange={(event) => setMidtransClientKey(event.target.value)}
              className={inputClass}
              placeholder="SB-Mid-client-..."
              autoComplete="off"
            />
          </label>

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Server Key
            <input
              type="text"
              value={midtransServerKey}
              onChange={(event) => setMidtransServerKey(event.target.value)}
              className={inputClass}
              placeholder="SB-Mid-server-..."
              autoComplete="off"
            />
          </label>

          <div>
            <p className="text-xs uppercase tracking-[2px] text-[#c9b99a]/55">Metode checkout Midtrans</p>
            <div className="mt-3 flex flex-wrap gap-4">
              {gatewayMethodOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-2 text-sm text-[#e6ddc7]">
                  <input
                    type="checkbox"
                    checked={midtransEnabledMethods.includes(option.id)}
                    onChange={(event) =>
                      setMidtransEnabledMethods((current) =>
                        toggleMethod(current, option.id, event.target.checked),
                      )
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {provider === "xendit" ? (
        <div className="space-y-4 border-t border-[#c9a84c]/10 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${
                settings.xendit.configured
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-amber-500/15 text-amber-200"
              }`}
            >
              {settings.xendit.configured ? "Xendit configured" : "Xendit belum lengkap"}
            </span>
            <span className="text-xs text-[#c9b99a]/50">
              Callback: {"{APP_URL}"}/api/v1/xendit/notification
            </span>
          </div>

          <label className="flex items-center gap-3 text-sm text-[#e6ddc7]">
            <input
              type="checkbox"
              checked={xenditIsProduction}
              onChange={(event) => setXenditIsProduction(event.target.checked)}
            />
            Mode production / Live (matikan untuk Sandbox / Test Mode)
          </label>

          {!xenditIsProduction ? (
            <p className="text-xs leading-relaxed text-[#c9b99a]/60">
              Sandbox Xendit memakai Secret Key awalan{" "}
              <span className="text-[#f8c56c]">xnd_development_</span>. Di dashboard Xendit,
              pastikan toggle kanan atas = <span className="text-[#f5edd6]">Test</span>, lalu buat
              Secret Key dengan permission Money-in Write. Callback token dari Settings → Callbacks.
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-amber-200/80">
              Mode Live membutuhkan akun Xendit yang sudah diaktifkan production dan key{" "}
              <span className="text-[#f8c56c]">xnd_production_*</span>.
            </p>
          )}

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Business / Merchant ID (opsional)
            <input
              value={xenditMerchantId}
              onChange={(event) => setXenditMerchantId(event.target.value)}
              className={inputClass}
              placeholder="opsional"
            />
          </label>

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Callback verification token
            <input
              type="text"
              value={xenditCallbackToken}
              onChange={(event) => setXenditCallbackToken(event.target.value)}
              className={inputClass}
              placeholder="token dari Xendit Callbacks (bukan secret key)"
              autoComplete="off"
            />
          </label>

          <label className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
            Secret Key {xenditIsProduction ? "(Live)" : "(Test / Sandbox)"}
            <input
              type="text"
              value={xenditSecretKey}
              onChange={(event) => setXenditSecretKey(event.target.value)}
              className={inputClass}
              placeholder={
                xenditIsProduction ? "xnd_production_..." : "xnd_development_..."
              }
              autoComplete="off"
            />
          </label>

          <div>
            <p className="text-xs uppercase tracking-[2px] text-[#c9b99a]/55">Metode checkout Xendit</p>
            <div className="mt-3 flex flex-wrap gap-4">
              {gatewayMethodOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-2 text-sm text-[#e6ddc7]">
                  <input
                    type="checkbox"
                    checked={xenditEnabledMethods.includes(option.id)}
                    onChange={(event) =>
                      setXenditEnabledMethods((current) =>
                        toggleMethod(current, option.id, event.target.checked),
                      )
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {provider === "manual" ? (
        <p className="border-t border-[#c9a84c]/10 pt-5 text-sm text-[#c9b99a]/60">
          Mode manual hanya menampilkan COD di checkout. Kredensial Midtrans/Xendit yang sudah
          tersimpan tetap aman di database meski mode diganti.
        </p>
      ) : null}

      {(error || formErrors) && (
        <div className="rounded border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error ? <p>{error}</p> : null}
          {formErrors ? (
            <ul className="mt-2 list-disc pl-5">
              {Object.values(formErrors)
                .flat()
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          ) : null}
        </div>
      )}

      <button
        type="button"
        disabled={isSaving}
        onClick={() => void submit()}
        className="flex items-center gap-2 bg-[#f8c56c] px-5 py-3 text-xs font-bold text-[#012421] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSaving ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} />}
        {isSaving ? "MENYIMPAN..." : "SIMPAN PENGATURAN"}
      </button>
    </div>
  );
}

export function paymentSettingsErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Pengaturan pembayaran gagal disimpan.";
}
