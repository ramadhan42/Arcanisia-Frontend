"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { useAuth } from "./AuthContext";

type Dialog = "login" | "register" | null;

interface AuthDialogContextValue {
  openLogin: (afterLogin?: () => void) => void;
  openRegister: (afterLogin?: () => void) => void;
  close: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextValue | undefined>(
  undefined,
);

export function AuthDialogProvider({ children }: { children: React.ReactNode }) {
  const { login, register } = useAuth();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const finish = useCallback(() => {
    setDialog(null);
    const action = pendingAction;
    setPendingAction(null);
    if (action) window.setTimeout(action, 0);
  }, [pendingAction]);

  const value = useMemo<AuthDialogContextValue>(
    () => ({
      openLogin: (action) => {
        setPendingAction(() => action ?? null);
        setDialog("login");
      },
      openRegister: (action) => {
        setPendingAction(() => action ?? null);
        setDialog("register");
      },
      close: () => {
        setDialog(null);
        setPendingAction(null);
      },
    }),
    [],
  );

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
      {dialog === "login" && (
        <LoginModal
          isOpen
          onClose={value.close}
          onSwitchToRegister={() => setDialog("register")}
          onLogin={async (email, password) => {
            await login(email, password);
            finish();
          }}
        />
      )}
      {dialog === "register" && (
        <RegisterModal
          isOpen
          onClose={value.close}
          onSwitchToLogin={() => setDialog("login")}
          onRegister={async (...arguments_) => {
            await register(...arguments_);
            finish();
          }}
        />
      )}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog harus digunakan di dalam AuthDialogProvider.");
  }
  return context;
}
