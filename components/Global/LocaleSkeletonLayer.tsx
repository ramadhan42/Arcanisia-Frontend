"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { useSiteContent } from "@/contexts/SiteContentContext";

type SkeletonRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const TEXT_SELECTOR = [
  ".page-content h1",
  ".page-content h2",
  ".page-content h3",
  ".page-content h4",
  ".page-content h5",
  ".page-content h6",
  ".page-content p",
  ".page-content label",
  ".page-content li",
  ".page-content a",
  ".page-content span",
  ".page-content button",
  ".page-content td",
  ".page-content th",
  ".page-content blockquote",
  ".page-content figcaption",
  ".page-content [data-locale-text]",
  "nav a",
  "nav span",
  "nav button",
  "nav p",
  "nav label",
  "nav [data-locale-text]",
  "[data-locale-text]",
].join(", ");

const MEDIA_SHIMMER_SELECTOR = "[data-locale-shimmer]";

function hasOwnText(el: HTMLElement): boolean {
  return (el.textContent ?? "").replace(/\s+/g, "").length > 0;
}

function hasNestedTextTarget(el: HTMLElement): boolean {
  const nested = el.querySelectorAll(TEXT_SELECTOR);
  for (const child of nested) {
    if (!(child instanceof HTMLElement) || child === el) continue;
    if (child.closest('[data-locale-fade="ignore"]')) continue;
    if (hasOwnText(child)) return true;
  }
  return false;
}

function pushVisibleRect(rects: SkeletonRect[], rect: DOMRect | SkeletonRect) {
  const width = rect.width;
  const height = rect.height;
  const top = "top" in rect ? rect.top : 0;
  const left = "left" in rect ? rect.left : 0;
  const bottom = top + height;

  if (width < 4 || height < 4) return;
  if (bottom < 0 || top > window.innerHeight) return;

  rects.push({
    top,
    left,
    width,
    height: Math.max(height, 7),
  });
}

function measureTextRects(el: HTMLElement): SkeletonRect[] {
  const result: SkeletonRect[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let measured = false;

  let textNode = walker.nextNode();
  while (textNode) {
    const content = textNode.textContent ?? "";
    if (content.replace(/\s+/g, "").length > 0) {
      range.selectNodeContents(textNode);
      const clientRects = range.getClientRects();
      for (const rect of Array.from(clientRects)) {
        pushVisibleRect(result, rect);
        measured = true;
      }
    }
    textNode = walker.nextNode();
  }

  if (!measured) {
    pushVisibleRect(result, el.getBoundingClientRect());
  }

  return result;
}

function measureMediaRects(el: HTMLElement): SkeletonRect[] {
  const result: SkeletonRect[] = [];
  pushVisibleRect(result, el.getBoundingClientRect());
  return result;
}

function mergeRects(rects: SkeletonRect[]): SkeletonRect[] {
  if (rects.length <= 1) return rects;

  const sorted = [...rects].sort((a, b) => a.top - b.top || a.left - b.left);
  const merged: SkeletonRect[] = [];

  for (const rect of sorted) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      Math.abs(prev.top - rect.top) < 4 &&
      Math.abs(prev.height - rect.height) < 6 &&
      rect.left <= prev.left + prev.width + 8
    ) {
      const right = Math.max(prev.left + prev.width, rect.left + rect.width);
      prev.left = Math.min(prev.left, rect.left);
      prev.width = right - prev.left;
      prev.height = Math.max(prev.height, rect.height);
      continue;
    }
    merged.push({ ...rect });
  }

  return merged;
}

function collectRects(): SkeletonRect[] {
  if (typeof document === "undefined") return [];

  const rects: SkeletonRect[] = [];

  document.querySelectorAll(TEXT_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.closest('[data-locale-fade="ignore"]')) return;
    if (node.getAttribute("aria-hidden") === "true") return;
    if (node.dataset.localeFade === "ignore") return;
    if (!hasOwnText(node)) return;
    if (hasNestedTextTarget(node)) return;

    rects.push(...measureTextRects(node));
  });

  document.querySelectorAll(MEDIA_SHIMMER_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.closest('[data-locale-fade="ignore"]')) return;
    if (node.getAttribute("aria-hidden") === "true") return;
    rects.push(...measureMediaRects(node));
  });

  return mergeRects(rects);
}

/**
 * Shimmer mirrors the *new* CMS/frontend text metrics only after content is
 * ready — never the previous 2-line/default layout from the prior paint.
 */
export default function LocaleSkeletonLayer() {
  const { phase } = useLocale();
  const { content, isLoading } = useSiteContent();
  const [rects, setRects] = useState<SkeletonRect[]>([]);
  const [mounted, setMounted] = useState(false);

  const active = phase === "loading";
  const canMeasure = active && !isLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) {
      setRects([]);
      return;
    }

    // While CMS is still fetching, keep shimmer empty so old text geometry
    // cannot linger under the gold bars.
    if (!canMeasure) {
      setRects([]);
      return;
    }

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const measure = () => {
      if (cancelled) return;
      setRects(collectRects());
    };

    const measureAfterLayout = () => {
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(measure);
      });
    };

    measureAfterLayout();
    const interval = window.setInterval(measure, 120);
    window.addEventListener("resize", measureAfterLayout);
    window.addEventListener("scroll", measure, true);

    const observer = new MutationObserver(measureAfterLayout);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-locale-text"],
    });

    void document.fonts?.ready.then(() => {
      if (!cancelled) measureAfterLayout();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearInterval(interval);
      window.removeEventListener("resize", measureAfterLayout);
      window.removeEventListener("scroll", measure, true);
      observer.disconnect();
    };
  }, [active, canMeasure, content, isLoading, phase]);

  if (!mounted || !canMeasure || rects.length === 0) {
    return null;
  }

  return createPortal(
    <div
      className="locale-skeleton-layer pointer-events-none fixed inset-0 z-[9990]"
      aria-hidden="true"
    >
      {rects.map((rect, index) => (
        <span
          key={`${Math.round(rect.top)}-${Math.round(rect.left)}-${Math.round(rect.width)}-${Math.round(rect.height)}-${index}`}
          className="locale-skeleton-bar"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
