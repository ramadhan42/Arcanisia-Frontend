"use client";

import { AuthDialogProvider } from "@/contexts/AuthDialogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ProductDetailProvider } from "@/contexts/ProductDetailContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import type { Locale } from "@/lib/locale";
import LocaleTextTransition from "./Global/LocaleTextTransition";
import LocaleSkeletonLayer from "./Global/LocaleSkeletonLayer";
import SectionHashWatcher from "./Global/SectionHashWatcher";
import CartDrawer from "./commerce/CartDrawer";

export default function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <SiteContentProvider>
        <AuthProvider>
          <AuthDialogProvider>
            <CartProvider>
              <ProductDetailProvider>
                <LocaleTextTransition />
                <LocaleSkeletonLayer />
                <SectionHashWatcher />
                {children}
                <CartDrawer />
              </ProductDetailProvider>
            </CartProvider>
          </AuthDialogProvider>
        </AuthProvider>
      </SiteContentProvider>
    </LocaleProvider>
  );
}
