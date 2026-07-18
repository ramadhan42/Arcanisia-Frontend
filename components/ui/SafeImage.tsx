"use client";

import Image, { type ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Next/Image cannot reliably render data-URL uploads from CMS.
 * Fall back to a plain img when the source is a data URL.
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
  ...rest
}: SafeImageProps) {
  if (src.startsWith("data:")) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
          sizes={sizes}
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
      unoptimized={src.startsWith("http")}
      {...rest}
    />
  );
}
