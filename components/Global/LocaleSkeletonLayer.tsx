"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/contexts/LocaleContext";

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

/** Skip parents when a nested text target already exists (fit text, not whole row). */
function hasNestedTextTarget(el: HTMLElement): boolean {
  const nested = el.querySelectorAll(TEXT_SELECTOR);
  for (const child of nested) {
    if (!(child instanceof HTMLElement) || child === el) continue;
    if (child.closest('[data-locale-fade="ignore"]')) continue;
    if (hasOwnText(child)) return true;
  }
  return false;
}

function pushVisibleRect(rects: SkeletonRect[], rect: DOMRect) {
  if (rect.width < 6 || rect.height < 5) return;
  if (rect.bottom < 0 || rect.top > window.innerHeight) return;
  rects.push({
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: Math.max(rect.height, 8),
  });
}

/** Measure actual glyph boxes so shimmer fits the words, not the flex row. */
function measureTextRects(el: HTMLElement): SkeletonRect[] {
  const result: SkeletonRect[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

  let textNode = walker.nextNode();
  while (textNode) {
    const content = textNode.textContent ?? "";
    if (content.replace(/\s+/g, "").length > 0) {
      range.selectNodeContents(textNode);
      const clientRects = range.getClientRects();
      for (const rect of Array.from(clientRects)) {
        pushVisibleRect(result, rect);
      }
    }
    textNode = walker.nextNode();
  }

  return result;
}

/** Measure logos / media boxes marked for shimmer (not text glyphs). */
function measureMediaRects(el: HTMLElement): SkeletonRect[] {
  const result: SkeletonRect[] = [];
  pushVisibleRect(result, el.getBoundingClientRect());
  return result;
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

  return rects;
}

/**
 * Gold shimmer bars placed exactly over faded-out text / logo while the next
 * language content is loading (including first refresh reveal).
 */
export default function LocaleSkeletonLayer() {
  const { phase } = useLocale();
  const [rects, setRects] = useState<SkeletonRect[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (phase !== "loading") {
      setRects([]);
      return;
    }

    const measure = () => setRects(collectRects());

    measure();
    const raf = window.requestAnimationFrame(measure);
    const interval = window.setInterval(measure, 180);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(interval);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [phase]);

  if (!mounted || phase !== "loading" || rects.length === 0) {
    return null;
  }

  return createPortal(
    <div
      className="locale-skeleton-layer pointer-events-none fixed inset-0 z-[9990]"
      aria-hidden="true"
    >
      {rects.map((rect, index) => (
        <span
          key={`${rect.top}-${rect.left}-${rect.width}-${index}`}
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
