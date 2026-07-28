"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";
import {
  isNavSectionId,
  queueHomeSectionScroll,
  scrollToSection,
  setSingleHash,
} from "@/lib/sectionHash";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

type LinkClassName = string;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Maps footer link labels (by slug) to their on-page section id.
const SECTION_BY_LABEL: Record<string, string> = {
  "about-arcanisia": "about",
  "our-mission": "mission",
  "brand-values": "values",
  "logo-story": "about",
  sustainability: "mission",
  faq: "faq",
  "shipping-info": "faq",
  "returns-policy": "faq",
  "track-order": "contact",
  "contact-us": "contact",
};

// Resolves the effective destination for a footer link based on its group and
// label, so links work even when the CMS stores placeholder hrefs like "#".
function resolveHref(groupTitle: string, label: string, rawHref?: string): string {
  const group = (groupTitle ?? "").trim().toUpperCase();
  const raw = (rawHref ?? "").trim();

  // COLLECTION group → open the matching product modal via deep link.
  if (group === "COLLECTION") {
    if (raw.includes("product-")) return raw;
    return `/#product-${slugify(label)}`;
  }

  // A meaningful, explicit href always wins (admin-configured routes/anchors).
  if (raw && raw !== "#" && raw !== "/#" && raw !== "/") return raw;

  // Otherwise infer the section from the label.
  const mapped = SECTION_BY_LABEL[slugify(label)];
  if (mapped) return `/#${mapped}`;

  return raw || "#";
}

function getHashId(href: string): string | null {
  if (!href) return null;
  const index = href.indexOf("#");
  if (index < 0) return null;
  const id = href.slice(index + 1).trim();
  return id.length ? id : null;
}

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function Footer() {
  const { section } = useSiteContent();
  const pathname = usePathname();
  const footer = section<{
    logo?: string;
    description?: string;
    copyright?: string;
    legal_links?: Array<{ label: string; slug?: string; href?: string }>;
    groups?: Array<{ title: string; links: Array<{ label: string; href: string } | string> }>;
    typography?: Record<string, unknown>;
  }>("footer");
  const legal = section<{
    links?: Array<{ label: string; slug?: string; href?: string }>;
    pages?: Array<{ slug: string; title: string }>;
    typography?: Record<string, unknown>;
  }>("legal");

  const footerPayload = footer as Record<string, unknown>;
  const legalPayload = legal as Record<string, unknown>;
  const descriptionDefaults = SECTION_TYPOGRAPHY_FIELDS.footer?.find((item) => item.key === "description")?.defaults;
  const groupTitleDefaults = SECTION_TYPOGRAPHY_FIELDS.footer?.find((item) => item.key === "groupTitle")?.defaults;
  const linkLabelDefaults = SECTION_TYPOGRAPHY_FIELDS.footer?.find((item) => item.key === "linkLabel")?.defaults;
  const copyrightDefaults = SECTION_TYPOGRAPHY_FIELDS.footer?.find((item) => item.key === "copyright")?.defaults;
  const legalLinkDefaults = SECTION_TYPOGRAPHY_FIELDS.footer?.find((item) => item.key === "legalLink")?.defaults
    ?? SECTION_TYPOGRAPHY_FIELDS.legal?.find((item) => item.key === "linkLabel")?.defaults;
  const descriptionStyle = resolveTextStyle(footerPayload, "description", descriptionDefaults);
  const groupTitleStyle = resolveTextStyle(footerPayload, "groupTitle", groupTitleDefaults);
  const linkLabelStyle = resolveTextStyle(footerPayload, "linkLabel", linkLabelDefaults);
  const copyrightStyle = resolveTextStyle(footerPayload, "copyright", copyrightDefaults);
  const legalLinkStyle = resolveTextStyle(
    hasTypographyField(footerPayload, "legalLink") ? footerPayload : legalPayload,
    hasTypographyField(footerPayload, "legalLink") ? "legalLink" : "linkLabel",
    legalLinkDefaults,
  );
  const useDescriptionTypography = hasTypographyField(footerPayload, "description");
  const useGroupTitleTypography = hasTypographyField(footerPayload, "groupTitle");
  const useLinkLabelTypography = hasTypographyField(footerPayload, "linkLabel");
  const useCopyrightTypography = hasTypographyField(footerPayload, "copyright");
  const useLegalLinkTypography =
    hasTypographyField(footerPayload, "legalLink") ||
    hasTypographyField(legalPayload, "linkLabel");

  const legalLinks =
    footer.legal_links?.length
      ? footer.legal_links
      : legal.links?.length
        ? legal.links
        : (legal.pages ?? []).map((page) => ({
            label: page.title,
            slug: page.slug,
            href: `/legal/${page.slug}`,
          }));

  const descriptionLines = splitTextByNewlines(footer.description ?? "");
  const copyrightLines = splitTextByNewlines(footer.copyright ?? "");

  const goToHash = (hashId: string) => {
    const cleanId = hashId.replace(/^#+/, "").split("#")[0]?.trim();
    if (!cleanId) return;

    // Deep link to a specific product modal (e.g. "product-secret-of-buton").
    const isProduct = cleanId.startsWith("product-");
    // Footer / content links scroll only — nav hashes are navbar-only.
    const setHash = isProduct;

    if (pathname !== "/") {
      if (isNavSectionId(cleanId)) {
        queueHomeSectionScroll(cleanId, { setHash: false });
        window.location.assign("/");
        return;
      }
      window.location.assign(`/#${cleanId}`);
      return;
    }

    if (isProduct) {
      scrollToSection("collection", { setHash: false });
      if (window.location.hash === `#${cleanId}`) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else {
        setSingleHash(cleanId);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      return;
    }

    scrollToSection(cleanId, { setHash });
  };

  const renderLink = (
    label: string,
    href: string,
    className: LinkClassName,
  ) => {
    const safeHref = href || "#";
    const hashId = getHashId(safeHref)?.replace(/^#+/, "").split("#")[0]?.trim();

    // Same-page section anchor (e.g. "/#about", "#collection") or a product
    // deep link (e.g. "/#product-secret-of-buton"): handle in-app.
    if (hashId) {
      return (
        <a
          href={`/#${hashId}`}
          onClick={(event) => {
            event.preventDefault();
            goToHash(hashId);
          }}
          className={className}
        >
          {label}
        </a>
      );
    }

    // External links / mail / tel: open normally.
    if (isExternal(safeHref)) {
      return (
        <a
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      );
    }

    // Internal route (e.g. "/legal/privacy-policy"): client-side navigation.
    if (safeHref.startsWith("/")) {
      return (
        <Link href={safeHref} className={className}>
          {label}
        </Link>
      );
    }

    // Fallback: inert placeholder link.
    return (
      <span className={`${className} cursor-default opacity-70`}>{label}</span>
    );
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#061716] font-graziemille text-[#F8C56C]">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.02]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-7 pb-7 pt-7 md:px-12 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-14 md:gap-y-12 lg:grid-cols-[minmax(300px,2fr)_minmax(0,3fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex max-w-[465px] flex-col items-start"
          >
            <SafeImage
              src={footer.logo ?? "/gambar/footer/logo%20arca%20fix%201.svg"}
              width={151}
              height={46}
              className="h-auto w-[137px] object-contain md:w-[151px]"
              alt="Arcanisia"
            />

            <p
              className={`mt-5 md:mt-6 ${
                useDescriptionTypography
                  ? textStyleFontClass(descriptionStyle)
                  : "max-w-[215px] text-[8px] leading-4 text-[#C9B99A99] md:max-w-[430px] md:text-[13px] md:leading-[1.7]"
              }`}
              style={useDescriptionTypography ? textStyleToCss(descriptionStyle) : undefined}
            >
              {descriptionLines.length > 0
                ? descriptionLines.map((line, index) => (
                    <span
                      key={`${line}-${index}`}
                      className={
                        descriptionLines.length > 1
                          ? "block whitespace-nowrap"
                          : "whitespace-nowrap"
                      }
                    >
                      {line}
                    </span>
                  ))
                : footer.description}
            </p>

            <SafeImage
              src="/gambar/footer/ornamen.svg"
              width={162}
              height={12}
              className="mt-5 h-auto w-[82px] md:mt-6 md:w-[162px]"
              alt=""
            />
          </motion.div>

          {/* Koleksi / Perusahaan / Bantuan — digeser ~10% ke kanan */}
          <div className="contents md:contents lg:grid lg:grid-cols-3 lg:gap-12 lg:pl-[7%]">
            {(footer.groups ?? []).map((group, index) => (
              <motion.nav
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                }}
                aria-label={group.title}
              >
              <h2
                className={`tracking-[3px] md:tracking-[3.15px] ${
                  useGroupTitleTypography
                    ? textStyleFontClass(groupTitleStyle)
                    : "text-[7px] text-[#F8C56C] md:text-[11px]"
                }`}
                style={useGroupTitleTypography ? textStyleToCss(groupTitleStyle) : undefined}
              >
                {group.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-[13px] md:mt-6 md:gap-3">
                {group.links.map((link) => {
                  const item = typeof link === "string" ? { label: link, href: "#" } : link;
                  const href = resolveHref(group.title, item.label, item.href);
                  return (
                    <li key={item.label}>
                      <span
                        style={
                          useLinkLabelTypography
                            ? textStyleToCss(linkLabelStyle)
                            : undefined
                        }
                      >
                        {renderLink(
                          item.label,
                          href,
                          useLinkLabelTypography
                            ? `${textStyleFontClass(linkLabelStyle)} transition-colors hover:opacity-80`
                            : "text-[8px] leading-4 text-[#C9B99A80] transition-colors hover:text-[#F8C56C] md:text-[12px]",
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-9 border-t border-[#C9A84C]/10 pt-6 text-[#C9B99A4D] md:mt-16 md:pt-8"
        >
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p
              className={
                useCopyrightTypography
                  ? textStyleFontClass(copyrightStyle)
                  : "max-w-[155px] text-[7px] leading-[1.45] tracking-[0.5px] md:max-w-none md:text-[11px]"
              }
              style={useCopyrightTypography ? textStyleToCss(copyrightStyle) : undefined}
            >
              {copyrightLines.length > 0
                ? copyrightLines.map((line, index) => (
                    <span
                      key={`${line}-${index}`}
                      className={
                        copyrightLines.length > 1
                          ? "block whitespace-nowrap"
                          : undefined
                      }
                    >
                      {line}
                    </span>
                  ))
                : footer.copyright}
            </p>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {legalLinks.map((link) => (
                <span
                  key={link.label}
                  style={useLegalLinkTypography ? textStyleToCss(legalLinkStyle) : undefined}
                >
                  {renderLink(
                    link.label,
                    link.href ?? `/legal/${link.slug ?? ""}`,
                    useLegalLinkTypography
                      ? `${textStyleFontClass(legalLinkStyle)} transition-colors hover:text-[#F8C56C]`
                      : "text-[6px] transition-colors hover:text-[#F8C56C] md:text-[10px]",
                  )}
                </span>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
