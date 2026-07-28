"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { siteContentService } from "@/services/api";
import { useLocale } from "@/contexts/LocaleContext";
import { getSiteContentFallback } from "@/lib/siteContentFallback";
import type {
  ContentPayload,
  SiteContent,
  SiteContentKey,
} from "@/types/api";

interface SiteContentContextValue {
  content: SiteContent;
  isLoading: boolean;
  error: string;
  refresh: () => Promise<void>;
  section: <T extends ContentPayload>(key: SiteContentKey) => T;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(
  undefined,
);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const { locale, phase } = useLocale();
  const fallback = useMemo(() => getSiteContentFallback(locale), [locale]);
  // Start empty so hero/etc. hardcoded fallbacks + 2-line layout never paint
  // under the refresh shimmer before the CMS payload arrives.
  const [content, setContent] = useState<SiteContent>({} as SiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const hasLoadedOnce = useRef(false);
  const requestId = useRef(0);
  const pendingRemote = useRef<SiteContent | null>(null);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const applyRemote = useCallback(
    (remoteContent: SiteContent) => {
      setContent({ ...getSiteContentFallback(locale), ...remoteContent });
      hasLoadedOnce.current = true;
      setIsLoading(false);
    },
    [locale],
  );

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setIsLoading(true);
    setError("");
    try {
      const remoteContent = await siteContentService.get(locale);
      if (currentRequest !== requestId.current) return;

      // Don't swap copy mid fade-out — wait until shimmer/loading phase.
      if (phaseRef.current === "out") {
        pendingRemote.current = remoteContent;
        return;
      }

      pendingRemote.current = null;
      applyRemote(remoteContent);
    } catch (requestError) {
      if (currentRequest !== requestId.current) return;
      pendingRemote.current = null;
      setContent(getSiteContentFallback(locale));
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Konten situs gagal dimuat.",
      );
      setIsLoading(false);
    }
  }, [applyRemote, locale]);

  // Apply buffered CMS payload once fade-out finished (phase → loading),
  // or immediately during boot/loading handoff on first refresh.
  useEffect(() => {
    if (phase !== "loading" && phase !== "in" && phase !== "idle") return;
    if (!pendingRemote.current) return;
    const remote = pendingRemote.current;
    pendingRemote.current = null;
    applyRemote(remote);
  }, [applyRemote, phase]);

  // Clear previous locale CMS immediately so old copy/typography cannot linger
  // while the next locale request is in flight.
  useLayoutEffect(() => {
    setContent({} as SiteContent);
    setIsLoading(true);
    pendingRemote.current = null;
  }, [locale]);

  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 0);

    return () => window.clearTimeout(timer);
  }, [refresh]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      isLoading,
      error,
      refresh,
      section: <T extends ContentPayload>(key: SiteContentKey) => {
        // While fetching, do not merge static fallbacks (2-line hero defaults,
        // etc.) — only remote/error-applied content should drive layout.
        if (isLoading) {
          return { ...(content[key] ?? {}) } as T;
        }

        return {
          ...(fallback[key] ?? {}),
          ...(content[key] ?? {}),
        } as T;
      },
    }),
    [content, error, fallback, isLoading, refresh],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error(
      "useSiteContent harus digunakan di dalam SiteContentProvider.",
    );
  }
  return context;
}

/** Prefer CMS copy; while loading return empty so defaults never flash/shimmer. */
export function useCmsText(
  value: string | undefined | null,
  fallback: string,
): string {
  const { isLoading } = useSiteContent();
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  if (isLoading) {
    return "";
  }
  return fallback;
}
