"use client";

import Image, { type ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

function isLocalPublicAsset(src: string): boolean {
  return (
    src.startsWith("/gambar/") ||
    src.startsWith("/gambar%20") ||
    src.includes("/gambar/") ||
    src.startsWith("/icons/") ||
    src.startsWith("/images/")
  );
}

/**
 * Sharp site imagery (logos, backgrounds, photos, ornaments).
 * Local `/gambar/` assets are served as-is (no Next recompression),
 * matching product cards on the Collections page.
 */
export default function SafeImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  style,
  sizes,
  priority,
  quality = 100,
  ...rest
}: SafeImageProps) {
  const isDataUrl = src.startsWith("data:");
  const isLocalAsset = isLocalPublicAsset(src);

  if (isDataUrl) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            ...style,
          }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      fill={fill}
      style={style}
      sizes={sizes}
      priority={priority}
      quality={quality}
      // Keep original pixels for local assets; avoid soft recompress.
      unoptimized={isLocalAsset || src.startsWith("http")}
      {...rest}
    />
  );
}
