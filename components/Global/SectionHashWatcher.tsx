"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearNavSectionHash,
  consumeQueuedHomeSectionScroll,
  getCleanLocationHash,
  isNavSectionId,
  isSectionInViewport,
  normalizeLocationHash,
} from "@/lib/sectionHash";

/**
 * Keeps homepage nav hashes (#about/#collection/#mission/#values) honest:
 * clear them once the matching section leaves the viewport while scrolling.
 */
export default function SectionHashWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    normalizeLocationHash();
    if (pathname === "/") {
      consumeQueuedHomeSectionScroll();
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const syncHashWithViewport = () => {
      normalizeLocationHash();
      const hash = getCleanLocationHash();
      if (!isNavSectionId(hash)) return;
      if (!isSectionInViewport(hash)) {
        clearNavSectionHash();
      }
    };

    syncHashWithViewport();
    window.addEventListener("scroll", syncHashWithViewport, { passive: true });
    window.addEventListener("resize", syncHashWithViewport);
    window.addEventListener("hashchange", syncHashWithViewport);

    return () => {
      window.removeEventListener("scroll", syncHashWithViewport);
      window.removeEventListener("resize", syncHashWithViewport);
      window.removeEventListener("hashchange", syncHashWithViewport);
    };
  }, [pathname]);

  return null;
}
