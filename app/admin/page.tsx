"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, LoaderCircle, LogOut, Pencil, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { ApiError } from "@/lib/api";
import { adminService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import CmsEditor from "@/components/admin/CmsEditor";
import ConfirmDialog, { type ConfirmState } from "@/components/admin/ConfirmDialog";
import ToastStack, { type ToastItem, type ToastType } from "@/components/admin/ToastStack";
import StatusSelect from "@/components/admin/StatusSelect";
import AdminTablePagination from "@/components/admin/AdminTablePagination";
import OverviewDashboard from "@/components/admin/OverviewDashboard";
import {
  currency,
  OrderDetailBody,
  OrderEditBody,
  OrderProductsCell,
  PaymentDetailBody,
  StatusBadge,
} from "@/components/admin/OrderProductDetail";
import PaymentSettingsEditor, {
  paymentSettingsErrorMessage,
} from "@/components/admin/PaymentSettingsEditor";
import ProductImage from "@/components/ui/ProductImage";
import type {
  DashboardSummary,
  NewsletterSubscriber,
  Order,
  OrderStatus,
  PaginationMeta,
  Payment,
  PaymentSettingsAdmin,
  PaymentSettingsUpdatePayload,
  Product,
  SiteContentKey,
  User,
  ValidationErrors,
} from "@/types/api";
import type { Locale } from "@/lib/locale";
import { normalizeValuesPayloadItems } from "@/lib/valuesContent";

const COLUMN_LABELS: Record<string, string> = {
  image: "gambar",
  name: "nama",
  sku: "sku",
  size: "ukuran",
  price: "harga",
  stock: "stok",
  is_active: "status",
  is_admin: "admin",
  email: "email",
  products: "produk",
  order_number: "no. pesanan",
  customer_name: "pelanggan",
  total: "total",
  status: "status",
  payment_status: "pembayaran",
  amount: "jumlah",
  method: "metode",
  order_status: "status pesanan",
  created_at: "dibuat",
};

type Tab =
  | "overview"
  | "users"
  | "products"
  | "orders"
  | "payments"
  | "subscribers"
  | "cms"
  | "payment-settings";
type RecordValue = User | Product | Order | Payment | NewsletterSubscriber;
type DetailState =
  | { type: "order"; record: Order }
  | { type: "payment"; record: Payment }
  | null;

const TABLE_PAGE_SIZE = 5;
const PAGINATED_TABS: Tab[] = ["users", "products", "orders", "payments", "subscribers"];

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Ringkasan" },
  { id: "users", label: "Pengguna" },
  { id: "products", label: "Produk" },
  { id: "orders", label: "Pesanan" },
  { id: "payments", label: "Pembayaran" },
  { id: "subscribers", label: "Subscriber" },
  { id: "cms", label: "Konten Situs" },
  { id: "payment-settings", label: "Pengaturan Bayar" },
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

const hideScrollbar = "scrollbar-none";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<RecordValue | "new" | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [formErrors, setFormErrors] = useState<ValidationErrors>();
  const [isSaving, setIsSaving] = useState(false);
  const [cmsKey, setCmsKey] = useState<SiteContentKey>("hero");
  const [cmsLocale, setCmsLocale] = useState<Locale>("id");
  const [cmsPayload, setCmsPayload] = useState<Record<string, unknown>>({});
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const [detail, setDetail] = useState<DetailState>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettingsAdmin | null>(null);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.classList.add("scrollbar-none");
    document.body.classList.add("scrollbar-none");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("scrollbar-none");
      document.body.classList.remove("scrollbar-none");
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

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
        const response = await adminService.dashboard(token);
        setDashboard(response.data);
        setMeta(null);
        return;
      }
      if (tab === "cms") {
        const response = await adminService.getContent(token, cmsKey, cmsLocale);
        const payload = (response.data.payload ?? {}) as Record<string, unknown>;

        if (cmsKey === "values") {
          payload.items = normalizeValuesPayloadItems(
            payload.items as Parameters<typeof normalizeValuesPayloadItems>[0],
            cmsLocale,
          );
        }

        setCmsPayload(payload);
        setMeta(null);
        return;
      }
      if (tab === "payment-settings") {
        const response = await adminService.getPaymentSettings(token);
        setPaymentSettings(response.data);
        setMeta(null);
        return;
      }
      const resource = resources[tab];
      if (!resource) return;
      const usePagination = PAGINATED_TABS.includes(tab);
      const response = await adminService.list<RecordValue>(resource, token, {
        page: usePagination ? page : 1,
        per_page: usePagination ? TABLE_PAGE_SIZE : 100,
        search: search || undefined,
      });

      if (
        usePagination &&
        response.meta &&
        response.meta.current_page > response.meta.last_page &&
        response.meta.last_page >= 1
      ) {
        setPage(response.meta.last_page);
        return;
      }

      setRecords(response.data);
      setMeta(
        response.meta ?? {
          current_page: 1,
          last_page: 1,
          per_page: usePagination ? TABLE_PAGE_SIZE : response.data.length,
          total: response.data.length,
        },
      );
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Data admin gagal dimuat.");
    } finally {
      setIsLoading(false);
    }
  }, [cmsKey, cmsLocale, page, search, tab, token, user?.is_admin]);

  useEffect(() => {
    setPage(1);
    setMeta(null);
    setRecords([]);
    setError("");
    setFormErrors(undefined);
    if (PAGINATED_TABS.includes(tab) || tab === "overview" || tab === "cms" || tab === "payment-settings") {
      setIsLoading(true);
    }
  }, [tab]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadResource(), search ? 300 : 0);
    return () => window.clearTimeout(timer);
  }, [loadResource, search]);

  useEffect(() => {
    if (form.image_file instanceof File) {
      const objectUrl = URL.createObjectURL(form.image_file);
      setProductImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setProductImagePreview(typeof form.image === "string" ? form.image : null);
  }, [form.image, form.image_file]);

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

  const beginEdit = async (record: RecordValue) => {
    setFormErrors(undefined);
    setError("");

    if (tab === "orders") {
      if (!token) return;
      try {
        const response = await adminService.show<Order>("orders", record.id, token);
        setEditing(response.data);
        setForm({ status: response.data.status });
      } catch (requestError) {
        notify(
          "error",
          requestError instanceof Error ? requestError.message : "Pesanan gagal dimuat.",
        );
      }
      return;
    }

    setEditing(record);
    setForm({ ...record });
  };

  const openDetail = async (record: Order | Payment) => {
    if (!token) return;
    try {
      if (tab === "orders") {
        const response = await adminService.show<Order>("orders", record.id, token);
        setDetail({ type: "order", record: response.data });
        return;
      }
      if (tab === "payments") {
        const response = await adminService.show<Payment>("payments", record.id, token);
        setDetail({ type: "payment", record: response.data });
      }
    } catch (requestError) {
      notify(
        "error",
        requestError instanceof Error ? requestError.message : "Detail gagal dimuat.",
      );
    }
  };

  const saveRecord = async () => {
    if (!token || (tab !== "users" && tab !== "products" && tab !== "orders")) return;
    if (!editing) return;

    setIsSaving(true);
    setFormErrors(undefined);
    setError("");
    try {
      if (tab === "orders" && editing !== "new") {
        await adminService.updateStatus<Order>(
          "orders",
          editing.id,
          token,
          String(form.status ?? (editing as Order).status),
        );
        setEditing(null);
        await loadResource();
        notify("success", "Status pesanan berhasil diperbarui.");
        return;
      }

      const resource = resources[tab]!;
      let payload: Record<string, unknown> | FormData = form;
      if (tab === "products" && form.image_file instanceof File) {
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (key === "image_file" && value instanceof File) data.set("image", value);
          else if (value !== undefined && value !== null) {
            data.set(key, typeof value === "boolean" ? (value ? "1" : "0") : String(value));
          }
        });
        payload = data;
      }
      if (editing === "new") await adminService.create<RecordValue>(resource, token, payload);
      else await adminService.update<RecordValue>(resource, editing.id, token, payload);
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

    const isOrderOrPayment = tab === "orders" || tab === "payments";
    setConfirmState({
      title: isOrderOrPayment
        ? tab === "orders"
          ? "Hapus Pesanan"
          : "Hapus Pembayaran"
        : "Hapus Data",
      message: isOrderOrPayment
        ? tab === "orders"
          ? "Pesanan dan pembayaran terkait akan dihapus. Stok produk dikembalikan jika masih tertahan. Lanjutkan?"
          : "Pembayaran dan pesanan terkait akan dihapus. Stok produk dikembalikan jika masih tertahan. Lanjutkan?"
        : "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
      confirmLabel: "HAPUS",
      tone: "danger",
      onConfirm: async () => {
        try {
          await adminService.remove(resource, record.id, token);
          setDetail(null);
          setEditing(null);
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
      if (tab === "orders") {
        notify(
          "success",
          `Status pesanan "${status}". Pembayaran ikut diselaraskan otomatis.`,
        );
      } else {
        notify(
          "success",
          `Status pembayaran "${status}". Pesanan ikut diselaraskan otomatis.`,
        );
      }
    } catch (requestError) {
      notify("error", requestError instanceof Error ? requestError.message : "Status gagal diubah.");
    }
  };

  const saveCms = async () => {
    if (!token) return;
    setIsSaving(true);
    setError("");
    try {
      const payload =
        cmsKey === "values"
          ? {
              ...cmsPayload,
              items: normalizeValuesPayloadItems(
                cmsPayload.items as Parameters<typeof normalizeValuesPayloadItems>[0],
                cmsLocale,
              ),
            }
          : cmsPayload;

      await adminService.updateContent(token, cmsKey, payload, cmsLocale);
      if (cmsKey === "values") {
        setCmsPayload(payload);
      }
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

  const savePaymentSettings = async (payload: PaymentSettingsUpdatePayload) => {
    if (!token) return;
    setIsSaving(true);
    setFormErrors(undefined);
    setError("");
    try {
      const response = await adminService.updatePaymentSettings(token, payload);
      setPaymentSettings(response.data);
      notify("success", "Pengaturan pembayaran berhasil disimpan.");
    } catch (requestError) {
      if (requestError instanceof ApiError) setFormErrors(requestError.errors);
      const message = paymentSettingsErrorMessage(requestError);
      setError(message);
      notify("error", message);
      throw requestError;
    } finally {
      setIsSaving(false);
    }
  };

  const exportSubscribers = async () => {
    if (!token) return;
    try {
      await adminService.exportSubscribers(token);
      notify("success", "Subscriber berhasil diekspor ke CSV.");
    } catch (requestError) {
      notify(
        "error",
        requestError instanceof Error ? requestError.message : "Export subscriber gagal.",
      );
    }
  };

  const columns = useMemo(() => {
    if (tab === "users") return ["name", "email", "is_admin"];
    if (tab === "products") return ["image", "name", "sku", "size", "price", "stock", "is_active"];
    if (tab === "orders") return ["products", "customer_name", "total", "status"];
    if (tab === "payments") return ["products", "amount", "method", "status"];
    return ["email", "created_at"];
  }, [tab]);

  const columnLabel = (column: string) =>
    COLUMN_LABELS[column] ?? column.replaceAll("_", " ");

  const cellValue = (record: RecordValue, column: string): string => {
    if (tab === "orders" && column === "payment_status") {
      return (record as Order).payment?.status ?? "—";
    }
    if (tab === "orders" && column === "total") {
      return currency.format(Number((record as Order).total));
    }
    if (tab === "payments" && column === "order_number") {
      return (record as Payment).order?.order_number ?? String((record as Payment).order_id);
    }
    if (tab === "payments" && column === "order_status") {
      return (record as Payment).order?.status ?? "—";
    }
    if (tab === "payments" && column === "amount") {
      return currency.format(Number((record as Payment).amount));
    }
    if (tab === "users" && column === "is_admin") {
      return (record as User).is_admin ? "Ya" : "Tidak";
    }
    return String((record as unknown as Record<string, unknown>)[column] ?? "—");
  };

  const renderCell = (record: RecordValue, column: string) => {
    if (tab === "products") {
      const product = record as Product;

      if (column === "image") {
        return (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#c9a84c]/15 bg-black/30">
            {product.image ? (
              <ProductImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[1px] text-[#c9b99a]/35">
                N/A
              </div>
            )}
          </div>
        );
      }

      if (column === "name") {
        return (
          <div className="min-w-0 max-w-[240px]">
            <p className="truncate font-medium text-[#f5edd6]">{product.name}</p>
            {product.top_title ? (
              <p className="mt-0.5 truncate text-xs text-[#c9b99a]/55">{product.top_title}</p>
            ) : null}
            {product.badge ? (
              <span className="mt-1 inline-block text-[10px] uppercase tracking-[1.5px] text-[#f8c56c]/85">
                {product.badge}
              </span>
            ) : null}
          </div>
        );
      }

      if (column === "price") {
        return (
          <span className="whitespace-nowrap text-[#e6ddc7]">
            {currency.format(Number(product.price))}
          </span>
        );
      }

      if (column === "is_active") {
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${
              product.is_active
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-red-500/15 text-red-300"
            }`}
          >
            {product.is_active ? "Aktif" : "Nonaktif"}
          </span>
        );
      }

      if (column === "stock") {
        return (
          <span className={product.stock <= 0 ? "text-red-300" : "text-[#e6ddc7]"}>
            {product.stock}
          </span>
        );
      }

      return <span className="text-[#e6ddc7]">{String(product[column as keyof Product] ?? "—")}</span>;
    }

    if (tab === "orders") {
      const order = record as Order;

      if (column === "products") {
        return <OrderProductsCell items={order.items ?? []} truncate={false} />;
      }

      if (column === "order_number") {
        return (
          <div className="whitespace-nowrap">
            <p className="font-medium text-[#f5edd6]">{order.order_number ?? "—"}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[1px] text-[#c9b99a]/45">
              {order.source === "buy_now" ? "Beli langsung" : "Keranjang"}
            </p>
          </div>
        );
      }

      if (column === "customer_name") {
        return (
          <div className="min-w-[180px] max-w-[280px]">
            <p className="break-words font-medium text-[#f5edd6]">{order.customer_name ?? "—"}</p>
            <p className="mt-0.5 break-all text-xs text-[#c9b99a]/55">{order.customer_email ?? "—"}</p>
          </div>
        );
      }

      if (column === "total") {
        return (
          <span className="whitespace-nowrap font-medium text-[#f8c56c]">
            {currency.format(Number(order.total ?? 0))}
          </span>
        );
      }

      if (column === "status") {
        return order.status ? (
          <StatusBadge value={String(order.status)} />
        ) : (
          <span className="text-[#c9b99a]/40">—</span>
        );
      }

      if (column === "payment_status") {
        return order.payment?.status ? (
          <StatusBadge value={order.payment.status} kind="payment" />
        ) : (
          <span className="text-[#c9b99a]/40">—</span>
        );
      }
    }

    if (tab === "payments") {
      const payment = record as Payment;

      if (column === "products") {
        return <OrderProductsCell items={payment.order?.items ?? []} truncate={false} />;
      }

      if (column === "order_number") {
        return (
          <div className="min-w-[160px] whitespace-nowrap">
            <p className="font-medium text-[#f5edd6]">
              {payment.order?.order_number ?? `#${payment.order_id}`}
            </p>
            {payment.order?.customer_name ? (
              <p className="mt-0.5 max-w-[220px] break-words text-xs whitespace-normal text-[#c9b99a]/55">
                {payment.order.customer_name}
              </p>
            ) : null}
          </div>
        );
      }

      if (column === "amount") {
        return (
          <span className="whitespace-nowrap font-medium text-[#f8c56c]">
            {currency.format(Number(payment.amount))}
          </span>
        );
      }

      if (column === "method") {
        const method = payment.method ? String(payment.method).replaceAll("_", " ") : "—";
        return <span className="whitespace-nowrap capitalize text-[#e6ddc7]">{method}</span>;
      }

      if (column === "status") {
        return payment.status ? (
          <StatusBadge value={String(payment.status)} kind="payment" />
        ) : (
          <span className="text-[#c9b99a]/40">—</span>
        );
      }

      if (column === "order_status") {
        return payment.order?.status ? (
          <StatusBadge value={payment.order.status} />
        ) : (
          <span className="text-[#c9b99a]/40">—</span>
        );
      }
    }

    return cellValue(record, column);
  };

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
    <main className={`page-content flex h-svh flex-col overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(201,168,76,0.08),transparent),linear-gradient(180deg,#071d1b,#04120f)] font-graziemille text-[#d8d0bd] ${hideScrollbar}`}>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-30 flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-[#c9a84c]/20 bg-[#012f2b]/85 px-6 py-5 backdrop-blur-md"
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
      <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[230px_1fr]">
        <nav className={`flex shrink-0 overflow-x-auto border-b border-[#c9a84c]/15 bg-[#012724]/70 p-3 lg:h-full lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-5 ${hideScrollbar}`}>
          {tabs.map((item, index) => {
            const active = tab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
                onClick={() => { setTab(item.id); setEditing(null); setDetail(null); setSearch(""); setPage(1); }}
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
        <section className={`min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-7 ${hideScrollbar}`}>
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
              {tab === "subscribers" && <button onClick={() => void exportSubscribers()} className="flex items-center gap-2 bg-[#f8c56c] px-3 py-2 text-xs font-bold text-[#012421] transition-transform hover:scale-[1.03]"><Download size={14} /> EXPORT CSV</button>}
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
            <OverviewDashboard
              data={dashboard}
              isLoading={isLoading}
              onNavigate={(nextTab) => {
                setTab(nextTab);
                setEditing(null);
                setDetail(null);
                setSearch("");
                setPage(1);
              }}
            />
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
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-[2px] text-[#c9b99a]/50">Bahasa konten</span>
                  {(["id", "en"] as Locale[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCmsLocale(option)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-[2px] transition-colors ${
                        cmsLocale === option
                          ? "bg-[#f8c56c] text-[#012421]"
                          : "border border-[#c9a84c]/20 text-[#c9b99a]/70 hover:border-[#c9a84c]/40 hover:text-[#f8c56c]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
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
                      locale={cmsLocale}
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
          {tab === "payment-settings" && (
            <div className="space-y-4">
              <p className="max-w-2xl text-sm text-[#c9b99a]/60">
                Pilih Manual (verifikasi admin) atau Midtrans Snap. Kredensial Midtrans disimpan
                terenkripsi di database dan bisa diganti kapan saja.
              </p>
              <PaymentSettingsEditor
                settings={paymentSettings}
                isLoading={isLoading}
                isSaving={isSaving}
                error={error}
                formErrors={formErrors}
                onSave={savePaymentSettings}
              />
            </div>
          )}
          {tab !== "overview" && tab !== "cms" && tab !== "payment-settings" && (
            <>
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari data..."
                className="mb-4 w-full max-w-md border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm outline-none transition-colors focus:border-[#f8c56c]"
              />
              <div className={`overflow-x-auto border border-[#c9a84c]/15 bg-[#012724]/30 ${hideScrollbar}`}>
                {isLoading ? <div className="flex h-52 items-center justify-center"><LoaderCircle className="animate-spin text-[#f8c56c]" /></div> : records.length === 0 ? <p className="p-10 text-center text-[#c9b99a]/45">Belum ada data.</p> : (
                  <table
                    className={`w-full text-left text-sm ${
                      tab === "orders" || tab === "payments"
                        ? "min-w-[1280px] table-auto"
                        : tab === "products"
                          ? "min-w-[980px]"
                          : "min-w-[860px]"
                    }`}
                  >
                    <thead className="bg-[#012f2b] text-[10px] uppercase tracking-[2px] text-[#c9b99a]/55">
                      <tr>
                        {columns.map((column) => (
                          <th
                            key={column}
                            className={`px-4 py-4 font-semibold sm:px-5 ${
                              column === "products" || column === "image" ? "text-center" : ""
                            } ${
                              column === "status" ||
                              column === "payment_status" ||
                              column === "order_status" ||
                              column === "total" ||
                              column === "amount" ||
                              column === "method"
                                ? "whitespace-nowrap"
                                : ""
                            }`}
                          >
                            {columnLabel(column)}
                          </th>
                        ))}
                        <th className="px-4 py-4 text-center font-semibold whitespace-nowrap sm:px-5">aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                      <motion.tr
                        key={`${tab}-${record.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.025, 0.4), duration: 0.3 }}
                        className="border-t border-[#c9a84c]/10 transition-colors hover:bg-[#c9a84c]/[0.06]"
                      >
                        {columns.map((column) => (
                          <td
                            key={column}
                            className={`px-4 py-4 align-middle text-[#e6ddc7] sm:px-5 ${
                              column === "image" || column === "products"
                                ? "w-[1%]"
                                : tab === "orders" || tab === "payments"
                                  ? ""
                                  : "max-w-[280px]"
                            } ${
                              column === "image" ||
                              column === "products" ||
                              tab === "products" ||
                              tab === "orders" ||
                              tab === "payments"
                                ? ""
                                : "truncate"
                            } ${
                              column === "status" ||
                              column === "payment_status" ||
                              column === "order_status" ||
                              column === "total" ||
                              column === "amount" ||
                              column === "method" ||
                              column === "order_number"
                                ? "whitespace-nowrap"
                                : ""
                            }`}
                          >
                            {renderCell(record, column)}
                          </td>
                        ))}
                        <td className="px-4 py-4 align-middle text-center whitespace-nowrap sm:px-5">
                          <div className="inline-flex items-center justify-center gap-2">
                            {tab === "payments" && "status" in record && (
                              <StatusSelect
                                value={String((record as Payment).status ?? "pending")}
                                options={["pending", "paid", "failed", "expired", "cancelled"]}
                                onChange={(status) => void changeStatus(record as Payment, status)}
                              />
                            )}
                            {(tab === "orders" || tab === "payments") && (
                              <button
                                type="button"
                                onClick={() => void openDetail(record as Order | Payment)}
                                aria-label="Detail"
                                title="Detail"
                                className="inline-flex h-8 w-8 items-center justify-center text-[#f8c56c] transition-opacity hover:opacity-75"
                              >
                                <Eye size={16} />
                              </button>
                            )}
                            {(tab === "users" || tab === "products" || tab === "orders") && (
                              <button
                                type="button"
                                onClick={() => void beginEdit(record)}
                                aria-label="Edit"
                                title="Edit"
                                className="inline-flex h-8 w-8 items-center justify-center text-[#f8c56c] transition-opacity hover:opacity-75"
                              >
                                <Pencil size={15} />
                              </button>
                            )}
                            {(tab === "users" || tab === "products" || tab === "subscribers" || tab === "orders" || tab === "payments") && (
                              <button
                                onClick={() => remove(record)}
                                aria-label="Hapus"
                                title="Hapus"
                                className="inline-flex h-8 w-8 items-center justify-center text-red-300 transition-colors hover:text-red-400"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    </tbody>
                  </table>
                )}
              </div>
              {PAGINATED_TABS.includes(tab) && (
                <AdminTablePagination
                  meta={meta}
                  isLoading={isLoading}
                  onPageChange={setPage}
                />
              )}
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
              className={`relative max-h-[calc(100svh-32px)] w-full space-y-4 overflow-y-auto border border-[#c9a84c]/25 bg-[#012f2b] p-6 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.85)] ${
                tab === "orders" ? "max-w-2xl" : "max-w-xl"
              } ${hideScrollbar}`}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)" }} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] tracking-[3px] text-[#c9a84c]/60">
                    {editing === "new" ? "TAMBAH" : "EDIT"}
                  </p>
                  <h2 className="mt-1 font-gilland text-2xl text-[#f8c56c]">
                    {tab === "users" ? "Pengguna" : tab === "orders" ? "Pesanan" : "Produk"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="border border-[#c9a84c]/20 px-3 py-2 text-xs transition-colors hover:border-[#c9a84c]/50"
                >
                  TUTUP
                </button>
              </div>

              {tab === "orders" && editing !== "new" ? (
                <OrderEditBody
                  order={editing as Order}
                  status={(form.status as OrderStatus) ?? (editing as Order).status}
                  onStatusChange={(status) => setForm((current) => ({ ...current, status }))}
                />
              ) : (
                <>
                  {(tab === "users"
                    ? ["name", "email", "password", "password_confirmation"]
                    : ["sku", "slug", "name", "top_title", "description", "size", "price", "stock", "bg_color", "badge"]
                  ).map((field) => (
                    <label key={field} className="block text-xs uppercase tracking-[2px] text-[#c9b99a]/55">
                      {field.replaceAll("_", " ")}
                      <input
                        type={
                          field.includes("password")
                            ? "password"
                            : field === "price" || field === "stock"
                              ? "number"
                              : "text"
                        }
                        value={String(form[field] ?? "")}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            [field]: field === "stock" ? Number(event.target.value) : event.target.value,
                          }))
                        }
                        required={
                          ["name", "email", "sku", "price", "stock"].includes(field) ||
                          (editing === "new" && field === "password")
                        }
                        className="mt-2 w-full border border-[#c9a84c]/20 bg-[#012724] px-4 py-3 text-sm normal-case tracking-normal text-[#f5edd6] outline-none focus:border-[#f8c56c]"
                      />
                    </label>
                  ))}
                  {tab === "users" && (
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(form.is_admin)}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, is_admin: event.target.checked }))
                        }
                      />{" "}
                      Administrator
                    </label>
                  )}
                  {tab === "products" && (
                    <>
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[2px] text-[#c9b99a]/55">Gambar produk</p>
                        <div className="flex items-start gap-4">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-[#c9a84c]/20 bg-black/30">
                            {productImagePreview ? (
                              <ProductImage
                                src={productImagePreview}
                                alt={String(form.name ?? "Preview produk")}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[1px] text-[#c9b99a]/35">
                                N/A
                              </div>
                            )}
                          </div>
                          <label className="block min-w-0 flex-1 text-xs text-[#c9b99a]/55">
                            Unggah gambar
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) =>
                                setForm((current) => ({
                                  ...current,
                                  image_file: event.target.files?.[0],
                                }))
                              }
                              className="mt-2 block w-full text-sm normal-case tracking-normal text-[#e6ddc7] file:mr-3 file:border-0 file:bg-[#f8c56c] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#012421]"
                            />
                          </label>
                        </div>
                      </div>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={Boolean(form.is_active)}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, is_active: event.target.checked }))
                          }
                        />{" "}
                        Produk aktif
                      </label>
                    </>
                  )}
                </>
              )}

              <FormMessage message={error} errors={formErrors} />
              <div className="flex gap-3">
                <button
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#f8c56c] py-3 text-xs font-bold text-[#012421] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isSaving && <LoaderCircle size={14} className="animate-spin" />}
                  {isSaving ? "MENYIMPAN..." : "SIMPAN"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 border border-[#c9a84c]/20 py-3 text-xs transition-colors hover:border-[#c9a84c]/50"
                >
                  BATAL
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detail && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDetail(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className={`relative max-h-[calc(100svh-32px)] w-full max-w-2xl space-y-5 overflow-y-auto border border-[#c9a84c]/25 bg-[#012f2b] p-6 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.85)] ${hideScrollbar}`}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)",
                }}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] tracking-[3px] text-[#c9a84c]/60">DETAIL</p>
                  <h2 className="mt-1 font-gilland text-2xl text-[#f8c56c]">
                    {detail.type === "order" ? "Pesanan & Produk" : "Pembayaran & Produk"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {detail.type === "order" && (
                    <button
                      type="button"
                      onClick={() => {
                        setDetail(null);
                        void beginEdit(detail.record);
                      }}
                      className="border border-[#f8c56c]/40 bg-[#f8c56c]/10 px-3 py-2 text-xs font-semibold tracking-[1px] text-[#f8c56c] transition-colors hover:bg-[#f8c56c]/20"
                    >
                      EDIT
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDetail(null)}
                    className="border border-[#c9a84c]/20 px-3 py-2 text-xs transition-colors hover:border-[#c9a84c]/50"
                  >
                    TUTUP
                  </button>
                </div>
              </div>
              {detail.type === "order" ? (
                <OrderDetailBody order={detail.record} />
              ) : (
                <PaymentDetailBody payment={detail.record} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
