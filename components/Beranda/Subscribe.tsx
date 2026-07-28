"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { newsletterService } from "@/services/api";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SafeImage from "@/components/ui/SafeImage";
import {
  hasTypographyField,
  resolveTextStyle,
  splitTextByNewlines,
  textStyleFontClass,
  textStyleToCss,
  SECTION_TYPOGRAPHY_FIELDS,
} from "@/lib/typography";

const goldGradient =
  "linear-gradient(256.8deg, #bda461, #fdde8a 24.52%, #bda461 50%, #fdde8a 75.48%, #bda461)";

const goldText = {
  background: goldGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Subscribe() {
  const { section } = useSiteContent();
  const newsletter = section<{
    eyebrow?: string;
    title?: string;
    description?: string;
    placeholder?: string;
    button?: string;
    button_label?: string;
    button_icon?: string;
    typography?: Record<string, unknown>;
  }>("newsletter");
  const contact = section<{
    items?: Array<{ title: string; icon?: string; icon_src?: string; lines: string[] }>;
    typography?: Record<string, unknown>;
  }>("contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const payload = newsletter as Record<string, unknown>;
  const contactPayload = contact as Record<string, unknown>;
  const eyebrowDefaults = SECTION_TYPOGRAPHY_FIELDS.newsletter?.find((item) => item.key === "eyebrow")?.defaults;
  const titleDefaults = SECTION_TYPOGRAPHY_FIELDS.newsletter?.find((item) => item.key === "title")?.defaults;
  const descriptionDefaults = SECTION_TYPOGRAPHY_FIELDS.newsletter?.find((item) => item.key === "description")?.defaults;
  const contactTitleDefaults = SECTION_TYPOGRAPHY_FIELDS.contact?.find((item) => item.key === "itemTitle")?.defaults;
  const contactLinesDefaults = SECTION_TYPOGRAPHY_FIELDS.contact?.find((item) => item.key === "itemLines")?.defaults;
  const eyebrowStyle = resolveTextStyle(payload, "eyebrow", eyebrowDefaults);
  const titleStyle = resolveTextStyle(payload, "title", titleDefaults);
  const descriptionStyle = resolveTextStyle(payload, "description", descriptionDefaults);
  const contactTitleStyle = resolveTextStyle(contactPayload, "itemTitle", contactTitleDefaults);
  const contactLinesStyle = resolveTextStyle(contactPayload, "itemLines", contactLinesDefaults);
  const useEyebrowTypography = hasTypographyField(payload, "eyebrow");
  const useTitleTypography = hasTypographyField(payload, "title");
  const useDescriptionTypography = hasTypographyField(payload, "description");
  const useContactTitleTypography = hasTypographyField(contactPayload, "itemTitle");
  const useContactLinesTypography = hasTypographyField(contactPayload, "itemLines");
  const eyebrowText = newsletter.eyebrow ?? "STAY CONNECTED";
  const titleText = newsletter.title ?? "Join the Journey of the Nusantara";
  const descriptionText = newsletter.description ?? "";
  const eyebrowLines = splitTextByNewlines(eyebrowText);
  const titleLines = splitTextByNewlines(titleText);
  const descriptionLines = splitTextByNewlines(descriptionText);

  const renderCmsLines = (lines: string[]) =>
    lines.map((line, index) => (
      <span
        key={`${line}-${index}`}
        className={
          lines.length > 1 ? "block whitespace-nowrap" : "whitespace-nowrap"
        }
      >
        {line}
      </span>
    ));

  const subscribe = async () => {
    setIsSubmitting(true);
    setMessage("");
    try {
      await newsletterService.subscribe(email.trim());
      setEmail("");
      setMessage("Terima kasih. Email Anda telah terdaftar.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Pendaftaran newsletter gagal.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="w-full overflow-hidden bg-[#012421] font-graziemille">
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)]" />

      <div className="relative flex min-h-[315px] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#071615,#012421)] px-6 py-5 md:min-h-[502px] md:px-10 md:py-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A84C]/5 md:h-[480px] md:w-[480px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A84C]/5 md:h-[380px] md:w-[380px]" />

        <div className="relative z-10 flex w-full max-w-[672px] flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`tracking-[5px] md:text-[10px] ${
              useEyebrowTypography
                ? textStyleFontClass(eyebrowStyle)
                : "text-[7px] text-[#F5EDD6]"
            }`}
            style={useEyebrowTypography ? textStyleToCss(eyebrowStyle) : undefined}
          >
            {renderCmsLines(eyebrowLines)}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className={`mt-3 leading-[1.4] md:text-[56px] md:leading-[1.3] ${
              useTitleTypography
                ? textStyleFontClass(titleStyle)
                : "font-gilland text-[34px]"
            }`}
            style={{
              ...goldText,
              ...(useTitleTypography
                ? {
                    ...textStyleToCss(titleStyle),
                    color: "transparent",
                  }
                : {}),
            }}
          >
            {renderCmsLines(titleLines)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className={`mt-3 md:text-[13px] ${
              useDescriptionTypography
                ? textStyleFontClass(descriptionStyle)
                : "text-[10px] leading-[1.7] text-[#C9B99A] md:leading-[2]"
            }`}
            style={useDescriptionTypography ? textStyleToCss(descriptionStyle) : undefined}
          >
            {renderCmsLines(descriptionLines)}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="mt-8 flex w-full max-w-[448px] flex-col text-left md:mt-10 md:h-[52px] md:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void subscribe();
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email"
              placeholder={newsletter.placeholder ?? "Enter your email"}
              className="h-[42px] w-full border border-[#C9B99AB3] bg-[#012421] px-4 font-sans text-[10px] font-light text-[#F5EDD6] outline-none placeholder:text-[#C9B99A40] focus:border-[#F8C56C] md:h-full md:flex-1 md:border-r-0 md:px-5 md:text-[12px]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[39px] w-full items-center justify-center gap-2 font-graziemille text-[8px] font-bold tracking-[2px] text-[#091812] transition-opacity hover:opacity-90 md:h-full md:w-auto md:px-8 md:text-[10px]"
              style={{ background: goldGradient }}
            >
              {isSubmitting
                ? "SENDING..."
                : (newsletter.button ?? newsletter.button_label ?? "SUBSCRIBE")}
              <SafeImage
                src={newsletter.button_icon ?? "/gambar/seksi%208/subscribe.svg"}
                width={14}
                height={14}
                className="object-contain"
                alt=""
              />
            </button>
          </motion.form>
          {message && <p role="status" className="mt-3 text-xs text-[#F8C56C]">{message}</p>}
        </div>
      </div>

      <div className="bg-[#012421] px-5 pb-5 pt-5 md:px-10 md:py-16">
        <div className="mx-auto flex w-full max-w-[1074px] flex-col gap-7 md:flex-row md:items-start md:justify-between md:gap-10">
          {(contact.items ?? []).map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.15 * index,
                ease: "easeOut",
              }}
              className="flex items-start gap-4 text-left"
            >
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center border border-[#C9A84C]/30 md:h-10 md:w-10">
                <SafeImage
                  src={item.icon ?? item.icon_src ?? "/gambar/seksi%208/email.svg"}
                  width={17}
                  height={17}
                  className="object-contain"
                  alt=""
                />
              </div>

              <div className="pt-0.5">
                <h3
                  className={`tracking-[3px] ${
                    useContactTitleTypography
                      ? textStyleFontClass(contactTitleStyle)
                      : "font-sans text-[9px] font-semibold text-[#F8C56C]"
                  }`}
                  style={
                    useContactTitleTypography
                      ? textStyleToCss(contactTitleStyle)
                      : undefined
                  }
                >
                  {item.title}
                </h3>
                <div
                  className={`mt-1 ${
                    useContactLinesTypography
                      ? textStyleFontClass(contactLinesStyle)
                      : "font-graziemille text-[13px] font-light leading-[1.85] text-[#C9B99A] md:text-[12px] md:leading-[1.8]"
                  }`}
                  style={
                    useContactLinesTypography
                      ? textStyleToCss(contactLinesStyle)
                      : undefined
                  }
                >
                  {(item.lines ?? []).map((line, lineIndex) => (
                    <p key={`${line}-${lineIndex}`} className="whitespace-nowrap">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
