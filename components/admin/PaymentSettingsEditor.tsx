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
  "mt-2 w-full border border-[#c9a84c]/20 bg-[#012421] px-3 py-2.5 text-sm text-[#f5edd6] outline-none focus:border-[#f8c56c]";

const labelClass = "block text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55";

const gatewayMethodOptions: Array<{ id: GatewayPaymentMethod; label: string }> = [
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "qris", label: "QRIS" },
  { id: "card", label: "Kartu Kredit / Debit" },
];

const providerOptions = [
  {
    id: "manual" as const,
    title: "Manual",
    desc: "Checkout COD, diverifikasi admin.",
  },
  {
    id: "midtrans" as const,
    title: "Midtrans",
    desc: "VA & QRIS Core API; kartu via Snap.",
  },
  {
    id: "xendit" as const,
    title: "Xendit",
    desc: "VA & QRIS inline; kartu via invoice.",
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

function StatusPill({ configured, label }: { configured: boolean; label: string }) {
  return (
    <span
      className={`inline-flex px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${
        configured
          ? "bg-emerald-500/15 text-emerald-300"
          : "bg-amber-500/15 text-amber-200"
      }`}
    >
      {configured ? `${label} siap` : `${label} belum lengkap`}
    </span>
  );
}

function MethodToggles({
  methods,
  onChange,
}: {
  methods: GatewayPaymentMethod[];
  onChange: (next: GatewayPaymentMethod[]) => void;
}) {
  return (
    <div>
      <p className={labelClass}>Metode checkout</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {gatewayMethodOptions.map((option) => {
          const active = methods.includes(option.id);
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "border-[#f8c56c]/50 bg-[#f8c56c]/10 text-[#f5edd6]"
                  : "border-[#c9a84c]/15 text-[#c9b99a]/70 hover:border-[#c9a84c]/35"
              }`}
            >
              <input
                type="checkbox"
                className="accent-[#f8c56c]"
                checked={active}
                onChange={(event) =>
                  onChange(toggleMethod(methods, option.id, event.target.checked))
                }
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
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
    <div className="grid min-h-[420px] lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-[#c9a84c]/15 p-4 sm:p-5 lg:border-b-0 lg:border-r">
        <p className={labelClass}>Mode pembayaran</p>
        <div className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:gap-2">
          {providerOptions.map((option) => {
            const active = provider === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setProvider(option.id)}
                className={`min-w-[140px] flex-1 border px-3 py-3 text-left transition-colors lg:min-w-0 lg:flex-none ${
                  active
                    ? "border-[#f8c56c] bg-[#f8c56c]/10 text-[#f8c56c]"
                    : "border-[#c9a84c]/20 text-[#c9b99a]/70 hover:border-[#c9a84c]/40"
                }`}
              >
                <p className="text-sm font-semibold tracking-[1px]">{option.title}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#c9b99a]/55">
                  {option.desc}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="flex min-h-0 flex-col">
        <div className="flex-1 space-y-4 p-4 sm:p-5">
          {provider === "manual" ? (
            <div className="space-y-3">
              <p className="font-gilland text-xl text-[#f8c56c]">Mode Manual</p>
              <p className="max-w-2xl text-sm leading-relaxed text-[#c9b99a]/65">
                Checkout hanya menampilkan COD. Pembayaran menunggu verifikasi admin.
                Kredensial Midtrans/Xendit yang sudah tersimpan tetap aman di database meski
                mode diganti.
              </p>
            </div>
          ) : null}

          {provider === "midtrans" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-gilland text-xl text-[#f8c56c]">Midtrans</p>
                  <p className="mt-1 text-xs text-[#c9b99a]/50">
                    Webhook: {"{APP_URL}"}/api/v1/midtrans/notification
                  </p>
                </div>
                <StatusPill configured={settings.midtrans.configured} label="Midtrans" />
              </div>

              <label className="flex items-center gap-3 text-sm text-[#e6ddc7]">
                <input
                  type="checkbox"
                  className="accent-[#f8c56c]"
                  checked={midtransIsProduction}
                  onChange={(event) => setMidtransIsProduction(event.target.checked)}
                />
                Mode production (matikan untuk Sandbox)
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className={labelClass}>
                  Merchant ID
                  <input
                    value={midtransMerchantId}
                    onChange={(event) => setMidtransMerchantId(event.target.value)}
                    className={inputClass}
                    placeholder="Gxxxxxxxxxx"
                  />
                </label>
                <label className={labelClass}>
                  Client Key
                  <input
                    value={midtransClientKey}
                    onChange={(event) => setMidtransClientKey(event.target.value)}
                    className={inputClass}
                    placeholder="SB-Mid-client-..."
                    autoComplete="off"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
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
              </div>

              <MethodToggles
                methods={midtransEnabledMethods}
                onChange={setMidtransEnabledMethods}
              />
            </div>
          ) : null}

          {provider === "xendit" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-gilland text-xl text-[#f8c56c]">Xendit</p>
                  <p className="mt-1 text-xs text-[#c9b99a]/50">
                    Callback: {"{APP_URL}"}/api/v1/xendit/notification
                  </p>
                </div>
                <StatusPill configured={settings.xendit.configured} label="Xendit" />
              </div>

              <label className="flex items-center gap-3 text-sm text-[#e6ddc7]">
                <input
                  type="checkbox"
                  className="accent-[#f8c56c]"
                  checked={xenditIsProduction}
                  onChange={(event) => setXenditIsProduction(event.target.checked)}
                />
                Mode production / Live (matikan untuk Sandbox)
              </label>

              {!xenditIsProduction ? (
                <p className="text-xs leading-relaxed text-[#c9b99a]/60">
                  Sandbox memakai Secret Key awalan{" "}
                  <span className="text-[#f8c56c]">xnd_development_</span>. Di dashboard Xendit
                  pastikan mode <span className="text-[#f5edd6]">Test</span>, lalu buat Secret Key
                  Money-in Write. Callback token dari Settings → Callbacks.
                </p>
              ) : (
                <p className="text-xs leading-relaxed text-amber-200/80">
                  Live membutuhkan akun production dan key{" "}
                  <span className="text-[#f8c56c]">xnd_production_*</span>.
                </p>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                <label className={labelClass}>
                  Business / Merchant ID (opsional)
                  <input
                    value={xenditMerchantId}
                    onChange={(event) => setXenditMerchantId(event.target.value)}
                    className={inputClass}
                    placeholder="opsional"
                  />
                </label>
                <label className={labelClass}>
                  Callback verification token
                  <input
                    type="text"
                    value={xenditCallbackToken}
                    onChange={(event) => setXenditCallbackToken(event.target.value)}
                    className={inputClass}
                    placeholder="token dari Xendit Callbacks"
                    autoComplete="off"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
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
              </div>

              <MethodToggles
                methods={xenditEnabledMethods}
                onChange={setXenditEnabledMethods}
              />
            </div>
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
        </div>

        <div className="sticky bottom-0 flex items-center justify-end border-t border-[#c9a84c]/15 bg-[#012724]/95 px-4 py-3 sm:px-5">
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
      </div>
    </div>
  );
}

export function paymentSettingsErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Pengaturan pembayaran gagal disimpan.";
}
