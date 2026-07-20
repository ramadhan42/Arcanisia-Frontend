"use client";

import { useEffect, useRef } from "react";
import { LOCALE_FADE_MS, useLocale } from "@/contexts/LocaleContext";
import { useSiteContent } from "@/contexts/SiteContentContext";

/** Minimum time the gold skeleton stays visible (even on fast networks). */
const MIN_SKELETON_MS = 650;

/**
 * Keep skeleton placeholders visible during phase=loading for at least
 * MIN_SKELETON_MS and until CMS finished, then fade text back in.
 * Also covers the first refresh EN → ID content handoff.
 */
export default function LocaleTextTransition() {
  const { isReady, isTextFading, phase, finishTextFade } = useLocale();
  const { isLoading } = useSiteContent();
  const loadingStartedAt = useRef(0);
  const finishedForCycle = useRef(false);

  useEffect(() => {
    if (phase === "loading") {
      loadingStartedAt.current = Date.now();
      finishedForCycle.current = false;
    }
  }, [phase]);

  useEffect(() => {
    if (!isReady) return;
    if (phase !== "loading") return;
    if (finishedForCycle.current) return;
    if (isLoading) return;

    const elapsed = Date.now() - loadingStartedAt.current;
    const waitMore = Math.max(0, MIN_SKELETON_MS - elapsed);

    const timer = window.setTimeout(() => {
      finishedForCycle.current = true;
      finishTextFade();
    }, waitMore);

    return () => window.clearTimeout(timer);
  }, [finishTextFade, isLoading, isReady, phase]);

  useEffect(() => {
    if (!isTextFading && phase !== "loading") return;

    const safety = window.setTimeout(() => {
      finishedForCycle.current = true;
      finishTextFade();
    }, LOCALE_FADE_MS + MIN_SKELETON_MS + 2500);

    return () => window.clearTimeout(safety);
  }, [finishTextFade, isTextFading, phase]);

  return null;
}
