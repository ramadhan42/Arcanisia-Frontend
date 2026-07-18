"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, LoaderCircle, LogOut, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { ApiError } from "@/lib/api";
import { adminService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import CmsEditor from "@/components/admin/CmsEditor";
import ConfirmDialog, { type ConfirmState } from "@/components/admin/ConfirmDialog";
import ToastStack, { type ToastItem, type ToastType } from "@/components/admin/ToastStack";
import StatusSelect from "@/components/admin/StatusSelect";
import type {
  NewsletterSubscriber,
  Order,
  Payment,
  Product,
  SiteContentKey,
  User,
  ValidationErrors,
} from "@/types/api";

type Tab = "overview" | "users" | "products" | "orders" | "payments" | "subscribers" | "cms";
type RecordValue = User | Product | Order | Payment | NewsletterSubscriber;

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Ringkasan" },
  { id: "users", label: "Pengguna" },
  { id: "products", label: "Produk" },
  { id: "orders", label: "Pesanan" },
  { id: "payments", label: "Pembayaran" },
  { id: "subscribers", label: "Subscriber" },
  { id: "cms", label: "Konten Situs" },
];

const cmsKeys: SiteContentKey[] = [
  "hero", "rekindling", "about", "collection", "missions", "values",
  "islands", "faq", "newsletter", "contact", "footer", "legal", "checkout",
];

const resources: Partial<Record<Tab, string>> = {
  users: "users",
  products: "products",
  orders: "orders",
  payments: "payments",
  subscribers: "newsletter-subscribers",
};

const hideScrollbar =
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

function FormMessage({ message, errors }: { message: string; errors?: ValidationErrors }) {
  if (!message && !errors) return null;
  return (
    <div className="rounded border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
      <p>{message}</p>
      {errors && <ul className="mt-2 list-disc pl-5">{Object.values(errors).flat().map((item) => <li key={item}>{item}</li>)}</ul>}
    </div>
  );
}

export default function AdminPage() {
  const { user, token, isInitializing, logout } = useAuth();
  const { refresh: refreshContent } = useSiteContent();
  const [tab, setTab] = useState<Tab>("overview");
  const [records, setRecords] = useState<RecordValue[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<RecordValue | "new" | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [formErrors, setFormErrors] = useState<ValidationErrors>();
  const [isSaving, setIsSaving] = useState(false);
  const [cmsKey, setCmsKey] = useState<SiteContentKey>("hero");
  const [cmsPayload, setCmsPayload] = useState<Record<string, unknown>>({});
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3800);
  }, []);

  const loadResource = useCallback(async () => {
    if (!token || !user?.is_admin) return;
    setIsLoading(true);
    setError("");
    try {
      if (tab === "overview") {
        const entries = await Promise.all(
          Object.entries(resources).map(async ([key, resource]) => {
            const response = await adminService.list<RecordValue>(resource, token, { per_page: 1 });
            return [key, response.meta?.total ?? response.data.length] as const;
          }),
        );
        setCounts(Object.fromEntries(entries));
        return;
      }
      if (tab === "cms") {
        const response = await adminService.getContent(token, cmsKey);
        setCmsPayload(
          (response.data.payload ?? {}) as Record<string, unknown>,
        );
        return;
      }
      const resource = resources[tab];
      if (!resource) return;
      const response = await adminService.list<RecordValue>(resource, token, {
        per_page: 100,
        search: search || undefined,
      });
      setRecords(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Data admin gagal dimuat.");
    } finally {
      setIsLoading(false);
    }
  }, [cmsKey, search, tab, token, user?.is_admin]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadResource(), search ? 300 : 0);
    return () => window.clearTimeout(timer);
  }, [loadResource, search]);

  const beginCreate = () => {
    setEditing("new");
    setForm(
      tab === "users"
        ? { name: "", email: "", password: "", password_confirmation: "", is_admin: false }
        : { sku: "", name: "", slug: "", price: "", stock: 0, is_active: true },
    );
    setFormErrors(undefined);
    setError("");
  };

  const beginEdit = (record: RecordValue) => {
    setEditing(record);
    setForm({ ...record });
    setFormErrors(undefined);
  };

  const saveRecord = async () => {
    if (!token || (tab !== "users" && tab !== "products")) return;
    const resource = resources[tab]!;
    setIsSaving(true);
    setFormErrors(undefined);
    setError("");
    try {
      let payload: Record<string, unknown> | FormData = form;
      if (tab === "products" && form.image_file instanceof File) {
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (key === "image_file" && value instanceof File) data.set("image", value);
          else if (value !== undefined && value !== null) data.set(key, typeof value === "boolean" ? (value ? "1" : "0") : String(value));
        });
        payload = data;
      }
      if (editing === "new") await adminService.create<RecordValue>(resource, token, payload);
      else if (editing) await adminService.update<RecordValue>(resource, editing.id, token, payload);
      const wasNew = editing === "new";
      setEditing(null);
      await loadResource();
      notify("success", wasNew ? "Data berhasil ditambahkan." : "Perubahan berhasil disimpan.");
    } catch (requestError) {
      if (requestError instanceof ApiError) setFormErrors(requestError.errors);
      setError(requestError instanceof Error ? requestError.message : "Data gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const remove = (record: RecordValue) => {
    const resource = resources[tab];
    if (!resource || !token) return;
    setConfirmState({
      title: "Hapus Data",
      message: "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
      confirmLabel: "HAPUS",
      tone: "danger",
      onConfirm: async () => {
        try {
          await adminService.remove(resource, record.id, token);
          await loadResource();
          notify("success", "Data berhasil dihapus.");
        } catch (requestError) {
          notify("error", requestError instanceof Error ? requestError.message : "Data gagal dihapus.");
        }
      },
    });
  };

  const changeStatus = async (record: Order | Payment, status: string) => {
    if (!token || (tab !== "orders" && tab !== "payments")) return;
    try {
      await adminService.updateStatus(tab, record.id, token, status);
      await loadResource();
      notify("success", `Status diperbarui menjadi "${status}".`);
    } catch (requestError) {
      notify("error", requestError instanceof Error ? requestError.message : "Status gagal diubah.");
    }
  };

  const saveCms = async () => {
    if (!token) return;
    setIsSaving(true);
    setError("");
    try {
      await adminService.updateContent(token, cmsKey, cmsPayload);
      await refreshContent();
      notify("success", `Konten "${cmsKey}" berhasil disimpan.`);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Konten gagal disimpan.";
      setError(message);
      notify("error", message);
    } finally {
      setIsSaving(false);
    }
  };

  const exportSubscribers = () => {
    const rows = records as NewsletterSubscriber[];
    const csv = ["id,email,created_at", ...rows.map((item) => `${item.id},"${item.email}",${item.created_at}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "arcanisia-subscribers.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("success", `${rows.length} subscriber diekspor ke CSV.`);
  };

  const columns = useMemo(() => {
    if (tab === "users") return ["name", "email", "is_admin"];
    if (tab === "products") return ["sku", "name", "price", "stock", "is_active"];
    if (tab === "orders") return ["order_number", "customer_name", "total", "status"];
    if (tab === "payments") return ["id", "order_id", "amount", "method", "status"];
    return ["email", "created_at"];
  }, [tab]);

  if (isInitializing) return <div className="flex min-h-screen items-center justify-center bg-[#071d1b] text-[#f8c56c]"><LoaderCircle className="animate-spin" /></div>;
  if (!user || !token) return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex min-h-screen flex-col items-center justify-center bg-[#071d1b] text-[#c9b99a]">
      <h1 className="font-gilland text-3xl text-[#f8c56c]">Autentikasi diperlukan</h1>
      <Link href="/" className="mt-6 border border-[#f8c56c] px-6 py-3 transition-colors hover:bg-[#f8c56c] hover:text-[#012421]">KEMBALI KE BERANDA</Link>
    </motion.div>
  );
  if (!user.is_admin) return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex min-h-screen flex-col items-center justify-center bg-[#071d1b] text-[#c9b99a]">
      <h1 className="font-gilland text-3xl text-[#f8c56c]">Akses ditolak</h1>
      <p className="mt-3">Halaman ini khusus administrator.</p>
      <Link href="/" className="mt-6 border border-[#f8c56c] px-6 py-3 transition-colors hover:bg-[#f8c56c] hover:text-[#012421]">KEMBALI</Link>
    </motion.div>
  );

  const activeTabLabel = tabs.find((item) => item.id === tab)?.label;

  return (
    <main className={`min-h-screen overflow-auto bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(201,168,76,0.08),transparent),linear-gradient(180deg,#071d1b,#04120f)] font-graziemille text-[#d8d0bd] ${hideScrollbar}`}>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-[#c9a84c]/20 bg-[#012f2b]/85 px-6 py-5 backdrop-blur-md"
      >
        <div>
          <p className="text-[9px] tracking-[4px] text-[#c9a84c]/60">ARCANISIA</p>
          <h1 className="mt-1 font-gilland text-2xl text-[#f8c56c]">Dashboard Admin</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline text-[#c9b99a]">Halo, <span className="text-[#f5edd6]">{user.name}</span></span>
          <Link href="/" className="text-[#f8c56c] transition-opacity hover:opacity-75">SITUS</Link>
          <button onClick={() => void logout()} aria-label="Keluar" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a84c]/25 text-[#f8c56c] transition-colors hover:border-[#f8c56c] hover:bg-[#f8c56c]/10"><LogOut size={16} /></button>
        </div>
      </motion.header>
      <div className="grid min-h-[calc(100vh-86px)] lg:grid-cols-[230px_1fr]">
        <nav className={`flex overflow-x-auto border-b border-[#c9a84c]/15 bg-[#012724]/70 p-3 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-5 ${hideScrollbar}`}>
          {tabs.map((item, index) => {
            const active = tab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
                onClick={() => { setTab(item.id); setEditing(null); setSearch(""); }}
                className={`relative min-w-max px-4 py-3 text-left text-sm transition-colors ${active ? "text-[#f8c56c]" : "text-[#c9b99a]/60 hover:text-[#f8c56c]"}`}
              >
                {active && (
                  <motion.span
                    layoutId="admin-tab-active"
                    className="absolute inset-0 -z-0 border border-[#c9a84c]/25 bg-[#c9a84c]/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
        <section className={`overflow-y-auto p-4 sm:p-7 ${hideScrollbar}`}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <AnimatePresence mode="wait">
              <motion.h2
                key={tab}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="font-gilland text-3xl capitalize text-[#f8c56c]"
              >
                {activeTabLabel}
              </motion.h2>
            </AnimatePresence>
            <div className="flex gap-2">
              <button onClick={() => void loadResource()} className="flex items-center gap-2 border border-[#c9a84c]/25 px-3 py-2 text-xs transition-colors hover:border-[#f8c56c] hover:text-[#f8c56c]"><RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> MUAT ULANG</button>
              {(tab === "users" || tab === "products") && <button onClick={beginCreate} className="flex items-center gap-2 bg-[#f8c56c] px-3 py-2 text-xs font-bold text-[#012421] transition-transform hover:scale-[1.03]"><Plus size={14} /> TAMBAH</button>}
              {tab === "subscribers" && <button onClick={exportSubscribers} className="flex items-center gap-2 bg-[#f8c56c] px-3 py-2 text-xs font-bold text-[#012421] transition-transform hover:scale-[1.03]"><Download size={14} /> EXPORT CSV</button>}
            </div>
          </div>
          {error && <FormMessage message={error} errors={formErrors} />}
          <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
          {tab === "overview" && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {Object.entries(resources).map(([key], index) => (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.06 * index, type: "spring", stiffness: 260, damping: 24 }}
                  whileHover={{ y: -4 }}
                  className="border border-[#c9a84c]/15 bg-[#012724]/80 p-5 transition-colors hover:border-[#c9a84c]/40"
                >
                  <p className="text-xs uppercase tracking-[2px] text-[#c9b99a]/50">{key}</p>
                  <p className="mt-3 font-gilland text-4xl text-[#f8c56c]">{counts[key] ?? "—"}</p>
                </motion.article>
              ))}
            </div>
          )}
          {tab === "cms" && (
            <div className="grid gap-5 xl:grid-cols-[220px_1fr]">
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-1">
                {cmsKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setCmsKey(key)}
                    className={`relative px-3 py-2 text-left text-sm capitalize transition-colors ${cmsKey === key ? "text-[#f8c56c]" : "border border-[#c9a84c]/10 text-[#c9b99a]/70 hover:border-[#c9a84c]/30 hover:text-[#f8c56c]"}`}
                  >
                    {cmsKey === key && (
                      <motion.span
                        layoutId="admin-cms-active"
                        className="absolute inset-0 -z-0 bg-[#c9a84c]/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{key}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <p className="text-xs text-[#c9b99a]/50">
                  Edit konten section lewat form. Data tetap disimpan sebagai payload ke API.
                </p>
                {isLoading ? (
                  <div className="flex h-52 items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  <div
                    className={`max-h-[min(640px,calc(100svh-260px))] space-y-4 overflow-y-auto border border-[#c9a84c]/15 bg-[#012724]/40 p-4 sm:p-5 ${hideScrollbar}`}
                  >
                    <CmsEditor
                      sectionKey={cmsKey}
                      payload={cmsPayload}
                      onChange={setCmsPayload}
                    />
                  </div>
                )}
                <button
                  onClick={() => void saveCms()}
                  disabled={isSaving || isLoading}
                  className="flex items-center gap-2 bg-[#f8c56c] px-5 py-3 text-xs font-bold text-[#012421] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSaving ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} />}{" "}
                  {isSaving ? "MENYIMPAN..." : "SIMPAN KONTEN"}
                </button>
              </div>
            </div>
          )}
          {tab !== "overview" && tab !== "cms" && (
            <>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari data..." className="mb-4 w-full max-w-md border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm outline-none transition-colors focus:border-[#f8c56c]" />
              <div className={`overflow-x-auto border border-[#c9a84c]/15 bg-[#012724]/30 ${hideScrollbar}`}>
                {isLoading ? <div className="flex h-52 items-center justify-center"><LoaderCircle className="animate-spin text-[#f8c56c]" /></div> : records.length === 0 ? <p className="p-10 text-center text-[#c9b99a]/45">Belum ada data.</p> : (
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead className="bg-[#012f2b] text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55"><tr>{columns.map((column) => <th key={column} className="px-5 py-4 font-semibold">{column.replaceAll("_", " ")}</th>)}<th className="px-5 py-4 text-right font-semibold">aksi</th></tr></thead>
                    <tbody>{records.map((record, index) => (
                      <motion.tr
                        key={`${tab}-${record.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.025, 0.4), duration: 0.3 }}
                        className="border-t border-[#c9a84c]/10 transition-colors hover:bg-[#c9a84c]/[0.06]"
                      >
                        {columns.map((column) => <td key={column} className="max-w-[280px] truncate px-5 py-4 text-[#e6ddc7]">{String((record as unknown as Record<string, unknown>)[column] ?? "—")}</td>)}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-3">
                            {(tab === "users" || tab === "products") && <button onClick={() => beginEdit(record)} className="text-xs font-semibold tracking-[1px] text-[#f8c56c] transition-opacity hover:opacity-75">EDIT</button>}
                            {tab === "orders" && <StatusSelect value={(record as Order).status} options={["pending", "processing", "shipping", "completed", "cancelled"]} onChange={(status) => void changeStatus(record as Order, status)} />}
                            {tab === "payments" && <StatusSelect value={(record as Payment).status} options={["pending", "paid", "failed", "expired", "cancelled"]} onChange={(status) => void changeStatus(record as Payment, status)} />}
                            {(tab === "users" || tab === "products" || tab === "subscribers") && <button onClick={() => remove(record)} aria-label="Hapus" className="text-red-300 transition-colors hover:text-red-400"><Trash2 size={15} /></button>}
                          </div>
                        </td>
                      </motion.tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            </>
          )}
          </motion.div>
          </AnimatePresence>
        </section>
      </div>
      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setEditing(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.form
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={(event) => { event.preventDefault(); void saveRecord(); }}
              className={`relative max-h-[calc(100svh-32px)] w-full max-w-xl space-y-4 overflow-y-auto border border-[#c9a84c]/25 bg-[#012f2b] p-6 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.85)] ${hideScrollbar}`}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)" }} />
              <h2 className="font-gilland text-2xl text-[#f8c56c]">{editing === "new" ? "Tambah" : "Edit"} {tab === "users" ? "Pengguna" : "Produk"}</h2>
              {(tab === "users" ? ["name", "email", "password", "password_confirmation"] : ["sku", "slug", "name", "top_title", "description", "size", "price", "stock", "bg_color", "badge"]).map((field) => (
                <label key={field} className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">{field.replaceAll("_", " ")}<input type={field.includes("password") ? "password" : field === "price" || field === "stock" ? "number" : "text"} value={String(form[field] ?? "")} onChange={(event) => setForm((current) => ({ ...current, [field]: field === "stock" ? Number(event.target.value) : event.target.value }))} required={["name", "email", "sku", "price", "stock"].includes(field) || (editing === "new" && field === "password")} className="mt-2 w-full border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]" /></label>
              ))}
              {tab === "users" && <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={Boolean(form.is_admin)} onChange={(event) => setForm((current) => ({ ...current, is_admin: event.target.checked }))} /> Administrator</label>}
              {tab === "products" && <><label className="block text-xs">GAMBAR<input type="file" accept="image/*" onChange={(event) => setForm((current) => ({ ...current, image_file: event.target.files?.[0] }))} className="mt-2 block w-full" /></label><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={Boolean(form.is_active)} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} /> Produk aktif</label></>}
              <FormMessage message={error} errors={formErrors} />
              <div className="flex gap-3"><button disabled={isSaving} className="flex flex-1 items-center justify-center gap-2 bg-[#f8c56c] py-3 text-xs font-bold text-[#012421] transition-opacity hover:opacity-90 disabled:opacity-60">{isSaving && <LoaderCircle size={14} className="animate-spin" />}{isSaving ? "MENYIMPAN..." : "SIMPAN"}</button><button type="button" onClick={() => setEditing(null)} className="flex-1 border border-[#c9a84c]/20 py-3 text-xs transition-colors hover:border-[#c9a84c]/50">BATAL</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
