"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError } from "@/lib/api";
import { cartService } from "@/services/api";
import type { Cart } from "@/types/api";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cart: Cart | null;
  isLoading: boolean;
  error: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  refresh: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated, isInitializing } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const requireToken = useCallback(() => {
    if (!token) throw new ApiError("Silakan masuk untuk menggunakan keranjang.", 401);
    return token;
  }, [token]);

  const refresh = useCallback(async () => {
    if (!token) {
      setCart(null);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      setCart((await cartService.get(token)).data);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Keranjang gagal dimuat.",
      );
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) return;

    const timer = window.setTimeout(
      () => void refresh().catch(() => undefined),
      0,
    );

    return () => window.clearTimeout(timer);
  }, [isAuthenticated, isInitializing, refresh]);

  const mutate = useCallback(
    async (request: (authToken: string) => Promise<{ data: Cart }>) => {
      setError("");
      try {
        const response = await request(requireToken());
        setCart(response.data);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Keranjang gagal diperbarui.",
        );
        throw requestError;
      }
    },
    [requireToken],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart: isAuthenticated ? cart : null,
      isLoading,
      error,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      refresh,
      addItem: (productId, quantity) =>
        mutate((authToken) => cartService.add(authToken, productId, quantity)),
      updateItem: (itemId, quantity) =>
        mutate((authToken) => cartService.update(authToken, itemId, quantity)),
      removeItem: async (itemId) => {
        try {
          await cartService.remove(requireToken(), itemId);
          await refresh();
        } catch (requestError) {
          setError(requestError instanceof Error ? requestError.message : "Item gagal dihapus.");
          throw requestError;
        }
      },
      clear: async () => {
        try {
          await cartService.clear(requireToken());
          await refresh();
        } catch (requestError) {
          setError(requestError instanceof Error ? requestError.message : "Keranjang gagal dikosongkan.");
          throw requestError;
        }
      },
    }),
    [
      cart,
      error,
      isAuthenticated,
      isLoading,
      isOpen,
      mutate,
      refresh,
      requireToken,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus digunakan di dalam CartProvider.");
  return context;
}
