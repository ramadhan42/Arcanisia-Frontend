/**
 * Nav section hashes (#about, #collection, #mission, #values):
 * - Set only from intentional navbar menu clicks
 * - Cleared when the section leaves the viewport while scrolling
 * - Never stacked — at most one hash in the URL
 */

export const NAV_SECTION_IDS = [
  "about",
  "collection",
  "mission",
  "values",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

const NAV_SECTION_SET = new Set<string>(NAV_SECTION_IDS);
const SCROLL_LOCK_MS = 900;
const SCROLL_SECTION_KEY = "arcanisia:scrollSection";

let hashLockUntil = 0;

function cleanHashId(value: string): string {
  return value.replace(/^#+/, "").split("#")[0]?.trim() ?? "";
}

export function getCleanLocationHash(): string {
  return cleanHashId(window.location.hash);
}

export function isNavSectionId(id: string): id is NavSectionId {
  return NAV_SECTION_SET.has(id);
}

export function isProductHash(id: string): boolean {
  return id.startsWith("product-");
}

function currentPath(): string {
  return window.location.pathname || "/";
}

function replaceUrl(pathWithOptionalHash: string): void {
  const current = `${window.location.pathname}${window.location.hash}`;
  if (current === pathWithOptionalHash) return;
  window.history.replaceState(null, "", pathWithOptionalHash);
}

/** Collapse stacked hashes like `#collection#about` into a single clean hash. */
export function normalizeLocationHash(): void {
  if (typeof window === "undefined") return;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return;
  if (!raw.includes("#")) return;
  const clean = raw.split("#").find(Boolean)?.trim();
  if (!clean) {
    replaceUrl(currentPath());
    return;
  }
  replaceUrl(`${currentPath()}#${clean}`);
}

/** Write exactly one hash, never concatenating onto an existing one. */
export function setSingleHash(hashId: string): void {
  if (typeof window === "undefined") return;
  const clean = cleanHashId(hashId);
  if (!clean) {
    clearHash();
    return;
  }
  replaceUrl(`${currentPath()}#${clean}`);
}

export function clearHash(): void {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;
  replaceUrl(window.location.pathname || "/");
}

export function setNavSectionHash(sectionId: string): void {
  const clean = cleanHashId(sectionId);
  if (!isNavSectionId(clean)) return;
  hashLockUntil = Date.now() + SCROLL_LOCK_MS;
  setSingleHash(clean);
}

/** Clear nav section hashes only (keeps `#product-*`). */
export function clearNavSectionHash(): void {
  if (typeof window === "undefined") return;
  if (Date.now() < hashLockUntil) return;
  const current = getCleanLocationHash();
  if (!isNavSectionId(current)) return;
  clearHash();
}

export function scrollToSection(
  sectionId: string,
  options: { setHash?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  const clean = cleanHashId(sectionId);
  if (!clean) return;

  const element = document.getElementById(clean);
  if (!element) return;

  element.scrollIntoView({ behavior: "auto", block: "start" });

  if (options.setHash && isNavSectionId(clean)) {
    setNavSectionHash(clean);
    return;
  }

  // Non-navbar navigation: leave product hashes alone, clear nav hashes.
  const current = getCleanLocationHash();
  if (isNavSectionId(current)) {
    hashLockUntil = 0;
    clearHash();
  }
}

export function queueHomeSectionScroll(
  sectionId: string,
  options: { setHash?: boolean } = {},
): void {
  try {
    sessionStorage.setItem(
      SCROLL_SECTION_KEY,
      JSON.stringify({
        id: cleanHashId(sectionId),
        setHash: Boolean(options.setHash),
      }),
    );
  } catch {
    // sessionStorage may be unavailable
  }
}

export function consumeQueuedHomeSectionScroll(): void {
  if (typeof window === "undefined") return;
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(SCROLL_SECTION_KEY);
    if (raw) sessionStorage.removeItem(SCROLL_SECTION_KEY);
  } catch {
    return;
  }
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as { id?: string; setHash?: boolean };
    const id = cleanHashId(parsed.id ?? "");
    if (!id) return;
    window.requestAnimationFrame(() => {
      scrollToSection(id, { setHash: parsed.setHash });
    });
  } catch {
    // ignore malformed payload
  }
}

/** True when the section meaningfully occupies the viewport. */
export function isSectionInViewport(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return rect.bottom > vh * 0.22 && rect.top < vh * 0.78;
}
