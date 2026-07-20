import * as THREE from "three";

export type GiftPalette = {
  primary: string;
  secondary: string;
  accent: string;
  ribbon: string;
};

export type SamplePageTheme = GiftPalette & {
  bg: string;
  bgDeep: string;
  bgCanvas: string;
  fog: string;
  text: string;
  textMuted: string;
  border: string;
};

const FALLBACK: GiftPalette = {
  primary: "#e8b4bc",
  secondary: "#f5d0d6",
  accent: "#c97888",
  ribbon: "#d4929f",
};

export const FALLBACK_SAMPLE_THEME: SamplePageTheme = {
  ...FALLBACK,
  bg: "#f7e3e8",
  bgDeep: "#efd0d8",
  bgCanvas: "#f3dbe2",
  fog: "#ebcbd3",
  text: "#6f3f4d",
  textMuted: "#8f5a68",
  border: "#c97888",
};

const hsl = { h: 0, s: 0, l: 0 };

function toHex(color: THREE.Color) {
  return `#${color.getHexString()}`;
}

function lighten(hex: string, amount: number) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color("#ffffff"), amount);
  return toHex(color);
}

function darken(hex: string, amount: number) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color("#000000"), amount);
  return toHex(color);
}

function colorScore(color: THREE.Color) {
  color.getHSL(hsl);
  return hsl.s * 0.7 + (1 - Math.abs(hsl.l - 0.48)) * 0.3;
}

/** Pick wrap colors from the doll's own material palette. */
export function extractModelPalette(root: THREE.Object3D): GiftPalette {
  const samples: THREE.Color[] = [];

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const materials = Array.isArray(obj.material)
      ? obj.material
      : [obj.material];

    for (const material of materials) {
      if (!material || !("color" in material)) continue;
      const color = material.color;
      if (!(color instanceof THREE.Color)) continue;

      color.getHSL(hsl);
      if (hsl.s < 0.04 || hsl.l < 0.04 || hsl.l > 0.98) continue;
      samples.push(color.clone());
    }
  });

  if (!samples.length) return FALLBACK;

  const primary = samples
    .slice()
    .sort((a, b) => colorScore(b) - colorScore(a))[0];

  const primaryHex = toHex(primary);

  return {
    primary: primaryHex,
    secondary: lighten(primaryHex, 0.22),
    accent: darken(primaryHex, 0.18),
    ribbon: darken(primaryHex, 0.08),
  };
}

export function paletteToPageTheme(palette: GiftPalette): SamplePageTheme {
  return {
    ...palette,
    bg: lighten(palette.secondary, 0.16),
    bgDeep: lighten(palette.primary, 0.06),
    bgCanvas: lighten(palette.secondary, 0.1),
    fog: lighten(palette.primary, 0.02),
    text: darken(palette.accent, 0.32),
    textMuted: darken(palette.ribbon, 0.12),
    border: palette.ribbon,
  };
}
