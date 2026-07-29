"use client";

import { useState } from "react";
import { LoaderCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Order } from "@/types/api";
import CheckoutModal from "@/components/Modals/Checkout";
import ConfirmationModal from "@/components/Modals/Confirmation";
import ProductImage from "@/components/ui/ProductImage";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function CartDrawer() {
  const {
    cart,
    isLoading,
    error,
    isOpen,
    closeCart,
    updateItem,
    removeItem,
    clear,
    refresh,
  } = useCart();
  const [busyItem, setBusyItem] = useState<number | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  if (!isOpen && !isCheckoutOpen && !order) return null;

  const changeQuantity = async (itemId: number, quantity: number) => {
    setBusyItem(itemId);
    try {
      await updateItem(itemId, quantity);
    } catch {
      // The context exposes the mutation error in the drawer.
    } finally {
      setBusyItem(null);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/70 font-graziemille" onClick={closeCart}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Keranjang belanja"
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col border-l border-[#c9a84c]/20 bg-[#012f2b] text-[#c9b99a] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[#c9a84c]/15 px-6 py-5">
              <div>
                <p className="text-[9px] tracking-[4px] text-[#c9a84c]/60">BELANJA</p>
                <h2 className="mt-2 font-gilland text-2xl text-[#f8c56c]">Keranjang Anda</h2>
              </div>
              <button type="button" onClick={closeCart} aria-label="Tutup keranjang"><X /></button>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {isLoading && <div className="flex h-40 items-center justify-center"><LoaderCircle className="animate-spin" /></div>}
              {!isLoading && error && (
                <div className="py-12 text-center text-sm text-[#ff7b86]">
                  <p>{error}</p>
                  <button className="mt-4 text-[#f8c56c]" onClick={() => void refresh()}>COBA LAGI</button>
                </div>
              )}
              {!isLoading && !error && !cart?.items.length && (
                <div className="flex h-64 flex-col items-center justify-center text-[#c9a84c]/45">
                  <ShoppingBag size={44} />
                  <p className="mt-4 font-gilland text-lg">Keranjang masih kosong.</p>
                </div>
              )}
              {cart?.items.map((item) => (
                <article key={item.id} className="flex gap-4 border border-[#c9a84c]/15 p-3">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-black/20">
                    {item.product.image && (
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <h3 className="truncate font-gilland text-lg text-[#f8c56c]">{item.product.name}</h3>
                      <button type="button" disabled={busyItem === item.id} onClick={() => void removeItem(item.id).catch(() => undefined)} aria-label={`Hapus ${item.product.name}`}><Trash2 size={15} /></button>
                    </div>
                    <p className="text-xs text-[#c9b99a]/50">{item.product.size}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-[#c9a84c]/25">
                        <button type="button" disabled={item.quantity <= 1 || busyItem === item.id} onClick={() => void changeQuantity(item.id, item.quantity - 1)} className="p-2 disabled:opacity-30"><Minus size={12} /></button>
                        <span className="w-7 text-center text-xs">{item.quantity}</span>
                        <button type="button" disabled={item.quantity >= item.product.stock || busyItem === item.id} onClick={() => void changeQuantity(item.id, item.quantity + 1)} className="p-2 disabled:opacity-30"><Plus size={12} /></button>
                      </div>
                      <span className="font-gilland text-[#f8c56c]">{currency.format(Number(item.line_total ?? item.subtotal))}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {cart && cart.items.length > 0 && (
              <footer className="border-t border-[#c9a84c]/15 p-5">
                <div className="mb-4 flex justify-between font-gilland text-xl text-[#f8c56c]"><span>Subtotal</span><span>{currency.format(Number(cart.subtotal))}</span></div>
                <button type="button" onClick={() => { setIsCheckoutOpen(true); closeCart(); }} className="w-full bg-[#f8c56c] py-4 text-[10px] font-bold tracking-[3px] text-[#012421]">CHECKOUT KERANJANG</button>
                <button type="button" onClick={() => void clear().catch(() => undefined)} className="mt-3 w-full py-2 text-[9px] tracking-[2px] text-[#c9b99a]/55">KOSONGKAN KERANJANG</button>
              </footer>
            )}
          </aside>
        </div>
      )}
      {isCheckoutOpen && cart && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/80 p-3">
          <CheckoutModal
            mode="cart"
            subtotal={cart.subtotal}
            items={cart.items.map((item) => ({ product: item.product, quantity: item.quantity }))}
            onClose={() => setIsCheckoutOpen(false)}
            onConfirm={(createdOrder) => {
              setOrder(createdOrder);
              setIsCheckoutOpen(false);
              void refresh().catch(() => undefined);
            }}
          />
        </div>
      )}
      {order && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3">
          <ConfirmationModal
            order={order}
            onClose={() => setOrder(null)}
            onOrderUpdate={setOrder}
          />
        </div>
      )}
    </>
  );
}
