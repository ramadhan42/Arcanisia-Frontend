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
  const [content, setContent] = useState<SiteContent>(() =>
    getSiteContentFallback(locale),
  );
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

  // Apply buffered CMS payload once fade-out finished (phase → loading).
  useEffect(() => {
    if (phase !== "loading" && phase !== "in" && phase !== "idle") return;
    if (!pendingRemote.current) return;
    const remote = pendingRemote.current;
    pendingRemote.current = null;
    applyRemote(remote);
  }, [applyRemote, phase]);

  // Always swap to the active locale fallback immediately so old-language CMS
  // copy cannot override the new language while the request is in flight.
  useLayoutEffect(() => {
    setContent(fallback);
    setIsLoading(true);
  }, [fallback, locale]);

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
      section: <T extends ContentPayload>(key: SiteContentKey) =>
        ({
          ...(fallback[key] ?? {}),
          ...(content[key] ?? {}),
        }) as T,
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
