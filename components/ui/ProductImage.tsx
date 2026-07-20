"use client";

import SafeImage from "@/components/ui/SafeImage";
import type { ComponentProps } from "react";

type ProductImageProps = ComponentProps<typeof SafeImage>;

/**
 * Product photos stay sharp at any display size.
 * Delegates to SafeImage (local assets served without recompression).
 */
export default function ProductImage(props: ProductImageProps) {
  return (
    <SafeImage
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
      {...props}
    />
  );
}
