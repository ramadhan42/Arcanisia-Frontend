"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError, apiRequest } from "@/lib/api";
import { profileService } from "@/services/api";
import type { User } from "@/types/api";

const TOKEN_KEY = "arcanisia_auth_token";

export type AuthUser = User;

interface AuthResponse {
  data: {
    user: AuthUser;
    token: string;
  };
}

interface UserResponse {
  data: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    acceptedTerms: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (payload: Record<string, unknown>) => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener("arcanisia:unauthorized", clearSession);
    return () =>
      window.removeEventListener("arcanisia:unauthorized", clearSession);
  }, [clearSession]);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    Promise.resolve().then(async () => {
      if (!storedToken) {
        setIsInitializing(false);
        return;
      }

      setToken(storedToken);

      try {
        const response = await apiRequest<UserResponse>("me", {
          token: storedToken,
        });
        setUser(response.data);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) clearSession();
      } finally {
        setIsInitializing(false);
      }
    });
  }, [clearSession]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiRequest<AuthResponse>("login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        device_name: "arcanisia-web",
      }),
    });

    localStorage.setItem(TOKEN_KEY, response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string,
      acceptedTerms: boolean,
    ) => {
      const response = await apiRequest<AuthResponse>("register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          accepted_terms: acceptedTerms,
        }),
      });

      localStorage.setItem(TOKEN_KEY, response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      if (token) {
        await apiRequest<{ data: null }>("logout", {
          method: "POST",
          token,
        });
      }
    } finally {
      clearSession();
    }
  }, [clearSession, token]);

  const refreshUser = useCallback(async () => {
    if (!token) {
      clearSession();
      return;
    }

    try {
      const response = await apiRequest<UserResponse>("me", { token });
      setUser(response.data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) clearSession();
      throw error;
    }
  }, [clearSession, token]);

  const updateProfile = useCallback(
    async (payload: Record<string, unknown>) => {
      if (!token) throw new ApiError("Silakan masuk terlebih dahulu.", 401);
      const response = await profileService.update(token, payload);
      setUser(response.data);
    },
    [token],
  );

  const deleteAccount = useCallback(
    async (currentPassword: string) => {
      if (!token) throw new ApiError("Silakan masuk terlebih dahulu.", 401);
      await profileService.remove(token, currentPassword);
      clearSession();
    },
    [clearSession, token],
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: user !== null,
      isInitializing,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
      deleteAccount,
    }),
    [
      deleteAccount,
      isInitializing,
      login,
      logout,
      refreshUser,
      register,
      token,
      updateProfile,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }

  return context;
}
