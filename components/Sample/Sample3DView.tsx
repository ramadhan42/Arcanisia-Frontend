"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  FALLBACK_SAMPLE_THEME,
  type SamplePageTheme,
} from "@/components/Sample/extractModelPalette";

const ModelViewer = dynamic(() => import("@/components/Sample/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[420px] w-full items-center justify-center rounded-sm border font-graziemille text-sm tracking-[0.2em] lg:min-h-[560px]"
      style={{
        borderColor: `${FALLBACK_SAMPLE_THEME.border}55`,
        backgroundColor: FALLBACK_SAMPLE_THEME.bgDeep,
        color: FALLBACK_SAMPLE_THEME.textMuted,
      }}
    >
      Loading 3D…
    </div>
  ),
});

export default function Sample3DView() {
  const [theme, setTheme] = useState<SamplePageTheme>(FALLBACK_SAMPLE_THEME);
  const handleThemeReady = (next: SamplePageTheme) => {
    setTheme((current) => {
      if (
        current.bg === next.bg &&
        current.bgDeep === next.bgDeep &&
        current.bgCanvas === next.bgCanvas &&
        current.primary === next.primary &&
        current.secondary === next.secondary &&
        current.accent === next.accent &&
        current.border === next.border &&
        current.text === next.text &&
        current.textMuted === next.textMuted &&
        current.ribbon === next.ribbon &&
        current.fog === next.fog
      ) {
        return current;
      }

      return next;
    });
  };

  return (
    <section
      className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-6xl flex-col gap-8 px-5 py-10 transition-colors duration-700 sm:px-8 lg:gap-10 lg:px-10 lg:py-12"
      style={{
        background: `linear-gradient(180deg, ${theme.bgDeep} 0%, ${theme.bg} 42%, ${theme.bgDeep} 100%)`,
        color: theme.text,
      }}
    >
      <header className="max-w-2xl space-y-3">
        <p
          className="font-graziemille text-[10px] tracking-[0.35em] uppercase"
          style={{ color: theme.textMuted }}
        >
          Arcanisia · Demo
        </p>
        <h1 className="font-gilland text-3xl sm:text-4xl" style={{ color: theme.text }}>
          Website 3D Sample
        </h1>
        <p
          className="font-graziemille text-sm leading-relaxed sm:text-base"
          style={{ color: theme.textMuted }}
        >
          Boneka diposisikan di tengah bungkus retail. Warna halaman menyesuaikan
          palet boneka secara otomatis.
        </p>
      </header>

      <div className="h-[min(72vh,680px)] min-h-[420px] w-full lg:min-h-[560px]">
        <ModelViewer onThemeReady={handleThemeReady} />
      </div>

      <p
        className="font-graziemille text-xs tracking-wide"
        style={{ color: `${theme.textMuted}aa` }}
      >
        Model: /gambar/3d/bo_peep_toy_story.glb
      </p>
    </section>
  );
}
