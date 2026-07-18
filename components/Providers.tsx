"use client";

import { AuthDialogProvider } from "@/contexts/AuthDialogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import CartDrawer from "./commerce/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteContentProvider>
      <AuthProvider>
        <AuthDialogProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </AuthDialogProvider>
      </AuthProvider>
    </SiteContentProvider>
  );
}
