"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { translate } from "@/lib/i18n";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  resolveLocale,
} from "@/lib/locale";

/** Fade out & fade in duration — must match CSS transition. */
export const LOCALE_FADE_MS = 320;

type LocalePhase = "idle" | "out" | "loading" | "in";

interface LocaleContextValue {
  locale: Locale;
  isReady: boolean;
  isTextFading: boolean;
  phase: LocalePhase;
  setLocale: (locale: Locale) => void;
  finishTextFade: () => void;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function readStoredLocale(): Locale {
  if (typeof document === "undefined") {
    return DEFAULT_LOCALE;
  }

  const cookieMatch = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${LOCALE_COOKIE}=`));

  if (cookieMatch) {
    return resolveLocale(decodeURIComponent(cookieMatch.split("=")[1] ?? ""));
  }

  return DEFAULT_LOCALE;
}

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale;
}

function setTextOpacity(value: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--locale-text-opacity",
    String(value),
  );
}

function setLocalePhase(phase: LocalePhase) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.localePhase = phase;
}

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isReady, setIsReady] = useState(false);
  const [isTextFading, setIsTextFading] = useState(false);
  const [phase, setPhase] = useState<LocalePhase>("idle");
  const localeRef = useRef(locale);
  const switchTimer = useRef<number | null>(null);
  const fadeInDoneTimer = useRef<number | null>(null);
  const didInitialReveal = useRef(false);

  const updatePhase = useCallback((next: LocalePhase) => {
    setPhase(next);
    setLocalePhase(next);
  }, []);

  /**
   * On first refresh/load: fade English defaults out → gold shimmer →
   * apply preferred locale / CMS copy → fade text back in.
   * Avoids a hard English → Indonesian snap.
   */
  useEffect(() => {
    if (didInitialReveal.current) return;
    didInitialReveal.current = true;

    const preferredLocale = readStoredLocale() || initialLocale || DEFAULT_LOCALE;
    setIsReady(true);

    const raf = window.requestAnimationFrame(() => {
      setIsTextFading(true);
      updatePhase("out");
      setTextOpacity(0);

      switchTimer.current = window.setTimeout(() => {
        localeRef.current = preferredLocale;
        persistLocale(preferredLocale);
        setLocaleState(preferredLocale);
        updatePhase("loading");
        switchTimer.current = null;
      }, LOCALE_FADE_MS);
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [initialLocale, updatePhase]);

  useEffect(() => {
    return () => {
      if (switchTimer.current !== null) {
        window.clearTimeout(switchTimer.current);
      }
      if (fadeInDoneTimer.current !== null) {
        window.clearTimeout(fadeInDoneTimer.current);
      }
    };
  }, []);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (localeRef.current === nextLocale) return;

      if (switchTimer.current !== null) {
        window.clearTimeout(switchTimer.current);
      }
      if (fadeInDoneTimer.current !== null) {
        window.clearTimeout(fadeInDoneTimer.current);
        fadeInDoneTimer.current = null;
      }

      setIsTextFading(true);
      updatePhase("out");
      setTextOpacity(0);

      switchTimer.current = window.setTimeout(() => {
        localeRef.current = nextLocale;
        persistLocale(nextLocale);
        setLocaleState(nextLocale);
        updatePhase("loading");
        switchTimer.current = null;
      }, LOCALE_FADE_MS);
    },
    [updatePhase],
  );

  const finishTextFade = useCallback(() => {
    updatePhase("in");
    setTextOpacity(1);
    setIsTextFading(false);

    if (fadeInDoneTimer.current !== null) {
      window.clearTimeout(fadeInDoneTimer.current);
    }

    fadeInDoneTimer.current = window.setTimeout(() => {
      updatePhase("idle");
      fadeInDoneTimer.current = null;
    }, LOCALE_FADE_MS);
  }, [updatePhase]);

  const t = useCallback(
    (key: string, values?: Record<string, string | number>) =>
      translate(locale, key, values),
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      isReady,
      isTextFading,
      phase,
      setLocale,
      finishTextFade,
      t,
    }),
    [finishTextFade, isReady, isTextFading, locale, phase, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale harus digunakan di dalam LocaleProvider.");
  }
  return context;
}

export function useTranslation() {
  const { locale, setLocale, t, isReady, isTextFading, phase } = useLocale();
  return { locale, setLocale, t, isReady, isTextFading, phase };
}
